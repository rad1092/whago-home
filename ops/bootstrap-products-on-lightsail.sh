#!/usr/bin/env bash
set -Eeuo pipefail

umask 022

if [[ "$EUID" -eq 0 ]]; then
  echo "Run this script as an unprivileged deployment user, not root." >&2
  exit 2
fi

verify_public="${WHAGO_VERIFY_PUBLIC_DNS:-0}"
if [[ "$verify_public" != "0" && "$verify_public" != "1" ]]; then
  echo "WHAGO_VERIFY_PUBLIC_DNS must be 0 or 1." >&2
  exit 2
fi

for command_name in \
  certbot \
  curl \
  flock \
  getent \
  grep \
  openssl \
  sed \
  sudo \
  systemctl \
  tr; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Required command is unavailable: $command_name" >&2
    exit 2
  fi
done

script_dir="$(
  cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
  pwd
)"
source_nginx_config="$script_dir/nginx-whago.conf"
nginx_config="/etc/nginx/sites-available/localfit"
certificate_name="whago.net"
certificate_path="/etc/letsencrypt/live/$certificate_name/fullchain.pem"
bootstrap_id="$(date -u +%Y%m%dT%H%M%SZ)"
backup_dir="/srv/whago-home/backups/product-bootstrap-$bootstrap_id"
config_changed="false"
nginx_stopped="false"

domains=(
  "whago.net"
  "www.whago.net"
  "daymark.whago.net"
  "repolens.whago.net"
  "siteboard.whago.net"
)

exec 9>"/tmp/whago-deploy.lock"
if ! flock -n 9; then
  echo "Another WHAGO deployment is running." >&2
  exit 3
fi

if ! sudo test -f "$nginx_config" ||
  ! sudo test -f "$source_nginx_config"; then
  echo "Both the installed and bootstrap Nginx configurations are required." >&2
  exit 2
fi
if ! sudo test -f "$certificate_path"; then
  echo "Existing Certbot lineage is missing: $certificate_name" >&2
  exit 2
fi
if ! sudo systemctl is-active --quiet nginx.service; then
  echo "Nginx must be active before product bootstrap." >&2
  exit 2
fi
if ! sudo nginx -t; then
  echo "The installed Nginx configuration is not a safe rollback target." >&2
  exit 2
fi

for domain in "${domains[@]}"; do
  if ! getent hosts "$domain" >/dev/null; then
    echo "DNS does not resolve yet: $domain" >&2
    exit 2
  fi
done

for product in daymark repolens siteboard; do
  case "$product" in
    repolens) artifact_name="docs" ;;
    *) artifact_name="dist" ;;
  esac
  product_root="/srv/whago-products/$product"
  release_target="$(sudo readlink -f "$product_root/current" 2>/dev/null || true)"
  if [[ -z "$release_target" ||
    "$release_target" != "$product_root/releases/"* ||
    ! -f "$release_target/$artifact_name/index.html" ||
    ! -f "$release_target/$artifact_name/release.json" ]]; then
    echo "Seed $product first: deploy-product-on-lightsail.sh $product <ref> --bootstrap" >&2
    exit 2
  fi
  if ! grep -Fq "\"product\":\"$product\"" \
    "$release_target/$artifact_name/release.json"; then
    echo "Seeded release metadata does not match $product." >&2
    exit 2
  fi
done

for migration_file in \
  /srv/whago-home/current/out/daymark/index.html \
  /srv/whago-home/current/out/siteboard/index.html \
  /srv/whago-home/current/out/data-move.css \
  /srv/whago-home/current/out/data-move.js; do
  if [[ ! -f "$migration_file" ]]; then
    echo "Existing-origin migration asset is missing: $migration_file" >&2
    exit 2
  fi
done

deploy_user="$(id -un)"
deploy_group="$(id -gn)"
sudo install -d -o "$deploy_user" -g "$deploy_group" "$backup_dir"
sudo install -m 0644 "$nginx_config" "$backup_dir/localfit.before-bootstrap.conf"

restore_nginx() {
  local restore_failed="false"

  trap - ERR INT TERM
  set +e

  if [[ "$config_changed" == "true" ]]; then
    if ! sudo install -m 0644 \
      "$backup_dir/localfit.before-bootstrap.conf" \
      "$nginx_config" ||
      ! sudo nginx -t; then
      restore_failed="true"
    fi
  fi

  if [[ "$nginx_stopped" == "true" ]]; then
    if ! sudo systemctl start nginx.service; then
      restore_failed="true"
    fi
  elif [[ "$config_changed" == "true" ]]; then
    if ! sudo systemctl reload nginx.service; then
      restore_failed="true"
    fi
  fi

  if [[ "$restore_failed" == "true" ]]; then
    echo "Product bootstrap failed and Nginx needs manual inspection." >&2
  else
    echo "Product bootstrap failed; the previous Nginx configuration is active." >&2
  fi
}

fail_and_restore() {
  local exit_code="${1:-1}"
  restore_nginx
  exit "$exit_code"
}

trap 'fail_and_restore $?' ERR
trap 'fail_and_restore 130' INT
trap 'fail_and_restore 143' TERM

certificate_sans() {
  sudo openssl x509 \
    -in "$certificate_path" \
    -noout \
    -ext subjectAltName |
    tr ',' '\n' |
    sed -n 's/^[[:space:]]*DNS://p'
}

missing_san="false"
current_sans="$(certificate_sans)"
for domain in "${domains[@]}"; do
  if ! grep -Fxq "$domain" <<<"$current_sans"; then
    missing_san="true"
  fi
done

if [[ "$missing_san" == "true" ]]; then
  # The standalone authenticator must own port 80. Persist the same stop/start
  # hooks in Certbot's renewal configuration so future renewals remain usable.
  certbot_domain_names=()
  while IFS= read -r existing_domain; do
    [[ -n "$existing_domain" ]] || continue
    if [[ "$existing_domain" == \*.* ]]; then
      echo "Standalone HTTP validation cannot preserve wildcard SAN: $existing_domain" >&2
      false
    fi
    if [[ ! "$existing_domain" =~ ^[A-Za-z0-9][A-Za-z0-9.-]*$ ]]; then
      echo "Existing certificate contains an unsupported DNS SAN: $existing_domain" >&2
      false
    fi
    if ! getent hosts "$existing_domain" >/dev/null; then
      echo "Existing certificate SAN no longer resolves: $existing_domain" >&2
      false
    fi
    certbot_domain_names+=("$existing_domain")
  done <<<"$current_sans"

  for domain in "${domains[@]}"; do
    if ! grep -Fxq "$domain" <<<"$current_sans"; then
      certbot_domain_names+=("$domain")
    fi
  done

  certbot_domains=()
  for domain in "${certbot_domain_names[@]}"; do
    certbot_domains+=("-d" "$domain")
  done
  nginx_stopped="true"
  sudo certbot certonly \
    --standalone \
    --preferred-challenges http \
    --non-interactive \
    --cert-name "$certificate_name" \
    --expand \
    --pre-hook "systemctl stop nginx.service" \
    --post-hook "systemctl start nginx.service" \
    "${certbot_domains[@]}"

  if ! sudo systemctl is-active --quiet nginx.service; then
    echo "Nginx did not restart after certificate expansion." >&2
    false
  fi
  nginx_stopped="false"

  current_sans="$(certificate_sans)"
  for domain in "${certbot_domain_names[@]}"; do
    if ! grep -Fxq "$domain" <<<"$current_sans"; then
      echo "Expanded certificate is missing SAN: $domain" >&2
      false
    fi
  done
fi

config_changed="true"
sudo install -m 0644 "$source_nginx_config" "$nginx_config"
sudo nginx -t
sudo systemctl reload nginx.service

for product in daymark repolens siteboard; do
  origin_host="$product.whago.net"
  curl_options=(
    --fail
    --silent
    --show-error
    --connect-timeout 5
    --max-time 20
    --resolve "$origin_host:443:127.0.0.1"
  )
  page_html="$(curl "${curl_options[@]}" "https://$origin_host/")"
  if ! grep -qi "$product" <<<"$page_html"; then
    echo "Local product origin marker is missing: $product" >&2
    false
  fi
  release_json="$(curl "${curl_options[@]}" "https://$origin_host/release.json")"
  if ! grep -Fq "\"product\":\"$product\"" <<<"$release_json"; then
    echo "Local product release metadata is invalid: $product" >&2
    false
  fi
  curl "${curl_options[@]}" "https://$origin_host/healthz" >/dev/null
done

for migration_path in /daymark/ /siteboard/ /data-move.css /data-move.js; do
  curl --fail --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "whago.net:443:127.0.0.1" \
    "https://whago.net$migration_path" >/dev/null
done

trap - ERR INT TERM
config_changed="false"
echo "Product origins, migration pages, and certificate SANs are bootstrapped."
echo "Nginx backup retained at $backup_dir."

if [[ "$verify_public" == "1" ]]; then
  for domain in "${domains[@]}"; do
    if ! curl --fail --silent --show-error \
      --connect-timeout 10 \
      --max-time 30 \
      "https://$domain/" >/dev/null; then
      echo "Public DNS verification failed for $domain; origin configuration remains active." >&2
      exit 4
    fi
  done
  echo "All WHAGO domains are reachable through public DNS."
else
  echo "Public DNS verification was skipped; set WHAGO_VERIFY_PUBLIC_DNS=1 when needed."
fi
