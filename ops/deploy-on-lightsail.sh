#!/usr/bin/env bash
set -Eeuo pipefail

release_id="${1:-$(date -u +%Y%m%dT%H%M%SZ)}"
home_ref="${WHAGO_HOME_REF:-main}"
verify_public="${WHAGO_VERIFY_PUBLIC_DNS:-0}"

if [[ "$EUID" -eq 0 ]]; then
  echo "Run this script as an unprivileged deployment user, not root." >&2
  exit 2
fi

home_root="/srv/whago-home"
home_release="$home_root/releases/$release_id"
backup_dir="$home_root/backups/$release_id"
nginx_config="/etc/nginx/sites-available/localfit"
service_name="whago-home.service"
build_dir=""

if [[ ! "$release_id" =~ ^[A-Za-z0-9._-]+$ ]]; then
  echo "Release id may contain only letters, numbers, dots, underscores, and hyphens." >&2
  exit 2
fi

if [[ ! "$home_ref" =~ ^[A-Za-z0-9][A-Za-z0-9._/-]{0,199}$ ]] ||
  [[ "$home_ref" == *..* ]] ||
  [[ "$home_ref" == *//* ]]; then
  echo "WHAGO_HOME_REF contains unsupported characters or path components." >&2
  exit 2
fi
if [[ "$verify_public" != "0" && "$verify_public" != "1" ]]; then
  echo "WHAGO_VERIFY_PUBLIC_DNS must be 0 or 1." >&2
  exit 2
fi

if sudo test -e "$home_release" || sudo test -L "$home_release"; then
  echo "Release already exists: $release_id" >&2
  exit 2
fi

if ! sudo test -f "$nginx_config"; then
  echo "Existing Nginx configuration is required for a safe rollback: $nginx_config" >&2
  exit 2
fi
if ! sudo nginx -t; then
  echo "The currently installed Nginx configuration is not a safe rollback target." >&2
  exit 2
fi

exec 9>"/tmp/whago-deploy.lock"
if ! flock -n 9; then
  echo "Another WHAGO deployment is running." >&2
  exit 3
fi

deploy_user="$(id -un)"
deploy_group="$(id -gn)"
sudo install -d -o "$deploy_user" -g "$deploy_group" \
  "$home_root/releases" \
  "$home_root/backups" \
  "$backup_dir"

if sudo test -e "$home_root/current" &&
  ! sudo test -L "$home_root/current"; then
  echo "Refusing to replace a non-symlink home current path." >&2
  exit 2
fi
previous_home="$(sudo readlink -f "$home_root/current" 2>/dev/null || true)"
if [[ -n "$previous_home" &&
  "$previous_home" != "$home_root/releases/"* ]]; then
  echo "Home current points outside the home release directory." >&2
  exit 2
fi
home_switched="false"
nginx_replaced="false"
service_was_active="false"
service_was_enabled="false"
service_changed="false"

if sudo systemctl is-active --quiet "$service_name"; then
  service_was_active="true"
fi

if sudo systemctl is-enabled --quiet "$service_name"; then
  service_was_enabled="true"
fi

restore_current_link() {
  local previous="$1"
  local rollback_link="$home_root/current.rollback"

  if [[ -n "$previous" ]]; then
    sudo ln -sfnT "$previous" "$rollback_link"
    sudo mv -Tf "$rollback_link" "$home_root/current"
    return
  fi

  if [[ -L "$home_root/current" ]]; then
    sudo unlink "$home_root/current"
  elif [[ -e "$home_root/current" ]]; then
    echo "Refusing to remove a non-symlink current path." >&2
    return 1
  fi
}

remove_transition_links() {
  local transition_link

  for transition_link in \
    "$home_root/current.next" \
    "$home_root/current.rollback"; do
    if [[ -L "$transition_link" ]]; then
      sudo unlink "$transition_link"
    elif [[ -e "$transition_link" ]]; then
      echo "Refusing to remove a non-symlink transition path: $transition_link" >&2
      return 1
    fi
  done
}

restore_service_state() {
  local restore_failed="false"

  if [[ "$service_was_enabled" == "true" ]]; then
    if ! sudo systemctl enable "$service_name"; then
      restore_failed="true"
    fi
  else
    if ! sudo systemctl disable "$service_name" 2>/dev/null; then
      restore_failed="true"
    fi
  fi

  if [[ "$service_was_active" == "true" ]]; then
    if ! sudo systemctl restart "$service_name"; then
      restore_failed="true"
    fi
  else
    if ! sudo systemctl stop "$service_name" 2>/dev/null; then
      restore_failed="true"
    fi
  fi

  [[ "$restore_failed" == "false" ]]
}

cleanup_build_dir() {
  if [[ -n "$build_dir" &&
    "$build_dir" == /tmp/whago-home-build.* &&
    -d "$build_dir" ]]; then
    rm -rf -- "$build_dir"
  fi
}

rollback() {
  local exit_code="${1:-1}"
  local rollback_failed="false"

  trap - ERR INT TERM
  set +e

  if [[ "$home_switched" == "true" ]] &&
    ! restore_current_link "$previous_home"; then
    rollback_failed="true"
  fi

  if [[ "$nginx_replaced" == "true" && -f "$backup_dir/nginx.conf" ]]; then
    if ! sudo install -m 0644 "$backup_dir/nginx.conf" "$nginx_config" ||
      ! sudo nginx -t ||
      ! sudo systemctl reload nginx.service; then
      rollback_failed="true"
    fi
  fi

  if [[ "$service_changed" == "true" ]]; then
    if ! restore_service_state; then
      rollback_failed="true"
    fi
  fi

  if ! remove_transition_links; then
    rollback_failed="true"
  fi

  cleanup_build_dir

  if [[ "$rollback_failed" == "true" ]]; then
    echo "Deployment failed and rollback needs manual inspection." >&2
  else
    echo "Deployment failed; the previous state was restored." >&2
  fi

  echo "The failed release was retained for inspection: $release_id" >&2
  exit "$exit_code"
}

trap 'rollback $?' ERR
trap 'rollback 130' INT
trap 'rollback 143' TERM

remove_transition_links

build_dir="$(mktemp -d /tmp/whago-home-build.XXXXXX)"
source_dir="$build_dir/source"

git clone --depth 1 https://github.com/rad1092/whago-home.git "$source_dir"
git -C "$source_dir" fetch --depth 1 origin "$home_ref"
git -C "$source_dir" checkout --detach FETCH_HEAD

npm --prefix "$source_dir" ci
npm --prefix "$source_dir" test
npm --prefix "$source_dir" run lint
npm --prefix "$source_dir" run build:static

home_sha="$(git -C "$source_dir" rev-parse HEAD)"
artifact_hash="$(
  cd "$source_dir/out"
  find . -type f ! -name release.json -print0 |
    LC_ALL=C sort -z |
    xargs -0 sha256sum |
    sha256sum |
    cut -d ' ' -f 1
)"
expected_release_json="$(
  printf '{"release":"%s","commit":"%s","artifact":"%s"}' \
    "$release_id" \
    "$home_sha" \
    "$artifact_hash"
)"
printf '%s\n' "$expected_release_json" > "$source_dir/out/release.json"

install -d "$home_release"
cp -a "$source_dir/out" "$home_release/out"
install -m 0644 \
  "$source_dir/ops/nginx-whago.conf" \
  "$home_release/nginx-whago.conf"
copied_hash="$(
  cd "$home_release/out"
  find . -type f ! -name release.json -print0 |
    LC_ALL=C sort -z |
    xargs -0 sha256sum |
    sha256sum |
    cut -d ' ' -f 1
)"
if [[ "$copied_hash" != "$artifact_hash" ]]; then
  echo "Copied static artifact hash does not match the verified build." >&2
  false
fi
printf '%s\n' \
  "release=$release_id" \
  "whago-home=$home_sha" \
  "artifact=$artifact_hash" \
  > "$home_release/RELEASE"
sudo chown -R root:root "$home_release"
sudo chmod -R u=rwX,go=rX "$home_release"

sudo cp "$nginx_config" "$backup_dir/nginx.conf"

sudo ln -sfnT "$home_release" "$home_root/current.next"
home_switched="true"
sudo mv -Tf "$home_root/current.next" "$home_root/current"

nginx_replaced="true"
sudo install -m 0644 "$home_release/nginx-whago.conf" "$nginx_config"
sudo nginx -t
sudo systemctl reload nginx.service

# Nginx now serves the exported files directly. The previous Next.js unit is
# retained on disk for rollback, while its process and boot registration stop.
if sudo systemctl cat "$service_name" >/dev/null 2>&1; then
  service_changed="true"
  sudo systemctl disable --now "$service_name"
  if sudo systemctl is-active --quiet "$service_name"; then
    echo "The previous application service is still active." >&2
    false
  fi
  if sudo systemctl is-enabled --quiet "$service_name"; then
    echo "The previous application service is still enabled." >&2
    false
  fi
fi

for path in / /healthz /robots.txt /sitemap.xml /release.json /daymark/ /siteboard/; do
  curl --fail --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "whago.net:443:127.0.0.1" \
    "https://whago.net$path" >/dev/null
done

origin_release="$(
  curl --fail --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "whago.net:443:127.0.0.1" \
    https://whago.net/release.json
)"
if [[ "$origin_release" != "$expected_release_json" ]]; then
  echo "Origin release metadata does not match the built artifact." >&2
  false
fi

page_html="$(
  curl --fail --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "whago.net:443:127.0.0.1" \
    https://whago.net/
)"
grep -q "WHAGO" <<<"$page_html"
grep -q "Daymark" <<<"$page_html"
grep -q "RepoLens" <<<"$page_html"
grep -q "Siteboard" <<<"$page_html"
grep -q "FirstCall" <<<"$page_html"
grep -q "gh-dep-risk" <<<"$page_html"

daymark_move_html="$(
  curl --fail --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "whago.net:443:127.0.0.1" \
    https://whago.net/daymark/
)"
grep -q "기존 자료를 챙겨" <<<"$daymark_move_html"

siteboard_move_html="$(
  curl --fail --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "whago.net:443:127.0.0.1" \
    https://whago.net/siteboard/
)"
grep -q "기존 작업을 챙겨" <<<"$siteboard_move_html"

www_daymark_move_html="$(
  curl --fail --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "www.whago.net:443:127.0.0.1" \
    https://www.whago.net/daymark/
)"
grep -q "기존 자료를 챙겨" <<<"$www_daymark_move_html"

www_siteboard_move_html="$(
  curl --fail --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "www.whago.net:443:127.0.0.1" \
    https://www.whago.net/siteboard/
)"
grep -q "기존 작업을 챙겨" <<<"$www_siteboard_move_html"

for asset in /data-move.css /data-move.js; do
  curl --fail --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "www.whago.net:443:127.0.0.1" \
    "https://www.whago.net$asset" >/dev/null
done

home_headers="$(
  curl --head --silent --show-error \
    --fail \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "whago.net:443:127.0.0.1" \
    https://whago.net/
)"
grep -qi '^x-frame-options: DENY' <<<"$home_headers"
grep -qi "^content-security-policy: .*frame-ancestors 'none'" <<<"$home_headers"

www_home_headers="$(
  curl --head --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "www.whago.net:443:127.0.0.1" \
    https://www.whago.net/
)"
grep -qi '^HTTP/.* 301' <<<"$www_home_headers"
grep -qi '^location: https://whago.net/' <<<"$www_home_headers"

www_http_daymark_headers="$(
  curl --head --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "www.whago.net:80:127.0.0.1" \
    http://www.whago.net/daymark/
)"
grep -qi '^HTTP/.* 301' <<<"$www_http_daymark_headers"
grep -qi '^location: https://www.whago.net/daymark/' <<<"$www_http_daymark_headers"

www_http_siteboard_headers="$(
  curl --head --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "www.whago.net:80:127.0.0.1" \
    http://www.whago.net/siteboard/
)"
grep -qi '^HTTP/.* 301' <<<"$www_http_siteboard_headers"
grep -qi '^location: https://www.whago.net/siteboard/' <<<"$www_http_siteboard_headers"

redirect_headers="$(
  curl --head --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "whago.net:443:127.0.0.1" \
    https://whago.net/repolens/
)"
grep -qi '^HTTP/.* 308' <<<"$redirect_headers"
grep -qi '^location: https://repolens.whago.net/' <<<"$redirect_headers"

for product in daymark repolens siteboard; do
  product_html="$(
    curl --fail --silent --show-error \
      --connect-timeout 5 \
      --max-time 20 \
      --resolve "$product.whago.net:443:127.0.0.1" \
      "https://$product.whago.net/"
  )"
  grep -qi "$product" <<<"$product_html"

  curl --fail --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "$product.whago.net:443:127.0.0.1" \
    "https://$product.whago.net/healthz" >/dev/null
done

# Everything below follows a verified release and stays outside rollback.
trap - ERR INT TERM
remove_transition_links
cleanup_build_dir

echo "WHAGO static release $release_id is live at the local origin."

if [[ "$verify_public" == "1" ]]; then
  if ! public_release="$(
    curl --fail --silent --show-error \
      --connect-timeout 10 \
      --max-time 30 \
      "https://whago.net/release.json?release=$release_id"
  )"; then
    echo "Public DNS verification failed; the origin-verified release remains active." >&2
    exit 4
  fi
  if [[ "$public_release" != "$expected_release_json" ]]; then
    echo "Public home metadata differs; the origin-verified release remains active." >&2
    exit 4
  fi
  for product in daymark repolens siteboard; do
    if ! curl --fail --silent --show-error \
      --connect-timeout 10 \
      --max-time 30 \
      "https://$product.whago.net/healthz" >/dev/null; then
      echo "Public $product health verification failed; deployed releases remain active." >&2
      exit 4
    fi
  done
  echo "WHAGO and product health endpoints are verified through public DNS."
else
  echo "Public DNS verification was skipped; set WHAGO_VERIFY_PUBLIC_DNS=1 when needed."
fi
