#!/usr/bin/env bash
set -Eeuo pipefail

release_id="${1:-$(date -u +%Y%m%dT%H%M%SZ)}"
home_ref="${WHAGO_HOME_REF:-main}"
daymark_ref="${DAYMARK_REF:-main}"
repolens_ref="${REPOLENS_REF:-main}"
siteboard_ref="${SITEBOARD_REF:-main}"

home_root="/srv/whago-home"
tools_root="/srv/whago-tools"
home_release="$home_root/releases/$release_id"
tools_release="$tools_root/releases/$release_id"
backup_dir="$home_root/backups/$release_id"
nginx_config="/etc/nginx/sites-available/localfit"
service_unit="/etc/systemd/system/whago-home.service"
service_unit_backup="$backup_dir/whago-home.service"
work_root=""

if [[ ! "$release_id" =~ ^[A-Za-z0-9._-]+$ ]]; then
  echo "Release id may contain only letters, numbers, dots, underscores, and hyphens." >&2
  exit 2
fi

if [[ -e "$home_release" || -e "$tools_release" ]]; then
  echo "Release already exists: $release_id" >&2
  exit 2
fi

exec 9>"/tmp/whago-deploy.lock"
if ! flock -n 9; then
  echo "Another WHAGO deployment is running." >&2
  exit 3
fi

sudo install -d -o ubuntu -g ubuntu \
  "$home_root/releases" \
  "$home_root/backups" \
  "$tools_root/releases" \
  "$backup_dir"

previous_home="$(readlink -f "$home_root/current" 2>/dev/null || true)"
previous_tools="$(readlink -f "$tools_root/current" 2>/dev/null || true)"
home_switched="false"
tools_switched="false"
nginx_replaced="false"
service_unit_existed="false"
service_unit_replaced="false"
previous_service_active="false"
previous_service_enabled="false"

cleanup_work_root() {
  if [[ -z "$work_root" || ! -e "$work_root" ]]; then
    return 0
  fi

  case "$work_root" in
    "/tmp/whago-build-$release_id."*) find "$work_root" -depth -delete ;;
    *)
      echo "Refusing to clean an unexpected work directory: $work_root" >&2
      return 1
      ;;
  esac
}

restore_current_link() {
  local root="$1"
  local previous="$2"
  local rollback_link="$root/current.rollback"

  if [[ -n "$previous" ]]; then
    sudo ln -sfnT "$previous" "$rollback_link"
    sudo mv -Tf "$rollback_link" "$root/current"
    return
  fi

  if [[ -L "$root/current" ]]; then
    sudo unlink "$root/current"
  elif [[ -e "$root/current" ]]; then
    echo "Refusing to remove a non-symlink current path: $root/current" >&2
    return 1
  fi
}

remove_transition_links() {
  local transition_link

  for transition_link in \
    "$home_root/current.next" \
    "$home_root/current.rollback" \
    "$tools_root/current.next" \
    "$tools_root/current.rollback"; do
    if [[ -L "$transition_link" ]]; then
      sudo unlink "$transition_link"
    elif [[ -e "$transition_link" ]]; then
      echo "Refusing to remove a non-symlink transition path: $transition_link" >&2
      return 1
    fi
  done
}

rollback() {
  local exit_code="${1:-1}"
  local rollback_failed="false"

  trap - ERR INT TERM
  set +e

  if [[ "$tools_switched" == "true" ]]; then
    if ! restore_current_link "$tools_root" "$previous_tools"; then
      rollback_failed="true"
    fi
  fi

  if [[ "$home_switched" == "true" ]]; then
    if ! restore_current_link "$home_root" "$previous_home"; then
      rollback_failed="true"
    fi
  fi

  if [[
    "$previous_service_active" != "true" &&
      (
        "$service_unit_existed" == "true" ||
          "$service_unit_replaced" == "true"
      )
  ]]; then
    if ! sudo systemctl stop whago-home.service; then
      rollback_failed="true"
    fi
  fi

  if [[
    "$previous_service_enabled" != "true" &&
      (
        "$service_unit_existed" == "true" ||
          "$service_unit_replaced" == "true"
      )
  ]]; then
    if ! sudo systemctl disable whago-home.service; then
      rollback_failed="true"
    fi
  fi

  if [[ "$service_unit_replaced" == "true" ]]; then
    if [[ "$service_unit_existed" == "true" ]]; then
      if ! sudo install -m 0644 "$service_unit_backup" "$service_unit"; then
        rollback_failed="true"
      fi
    else
      if [[ -f "$service_unit" || -L "$service_unit" ]]; then
        if ! sudo unlink "$service_unit"; then
          rollback_failed="true"
        fi
      elif [[ -e "$service_unit" ]]; then
        echo "Refusing to remove a non-symlink service unit: $service_unit" >&2
        rollback_failed="true"
      fi
    fi

    if ! sudo systemctl daemon-reload; then
      rollback_failed="true"
    fi
  fi

  if [[ "$home_switched" == "true" || "$service_unit_replaced" == "true" ]]; then
    if [[ "$previous_service_enabled" == "true" ]] &&
      ! sudo systemctl enable whago-home.service; then
      rollback_failed="true"
    fi

    if [[ "$previous_service_active" == "true" ]] &&
      ! sudo systemctl restart whago-home.service; then
      rollback_failed="true"
    fi
  fi

  if [[ "$nginx_replaced" == "true" && -f "$backup_dir/nginx.conf" ]]; then
    if ! sudo install -m 0644 "$backup_dir/nginx.conf" "$nginx_config" ||
      ! sudo nginx -t ||
      ! sudo systemctl reload nginx.service; then
      rollback_failed="true"
    fi
  fi

  if ! remove_transition_links; then
    rollback_failed="true"
  fi

  if ! cleanup_work_root; then
    rollback_failed="true"
  fi

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

if sudo test -f "$service_unit"; then
  sudo cp "$service_unit" "$service_unit_backup"
  service_unit_existed="true"
fi

if sudo systemctl is-active --quiet whago-home.service; then
  previous_service_active="true"
fi

if sudo systemctl is-enabled --quiet whago-home.service; then
  previous_service_enabled="true"
fi

git clone --depth 1 https://github.com/rad1092/whago-home.git "$home_release"
git -C "$home_release" fetch --depth 1 origin "$home_ref"
git -C "$home_release" checkout --detach FETCH_HEAD
npm --prefix "$home_release" ci
npm --prefix "$home_release" test
npm --prefix "$home_release" run build:server
npm --prefix "$home_release" prune --omit=dev

work_root="$(mktemp -d "/tmp/whago-build-$release_id.XXXXXX")"

git clone --depth 1 https://github.com/rad1092/daymark.git "$work_root/daymark"
git -C "$work_root/daymark" fetch --depth 1 origin "$daymark_ref"
git -C "$work_root/daymark" checkout --detach FETCH_HEAD
npm --prefix "$work_root/daymark" ci
npm --prefix "$work_root/daymark" run lint
npm --prefix "$work_root/daymark" test
npm --prefix "$work_root/daymark" run build
install -d "$tools_release/daymark"
cp -a "$work_root/daymark/dist/." "$tools_release/daymark/"

git clone --depth 1 https://github.com/rad1092/siteboard.git "$work_root/siteboard"
git -C "$work_root/siteboard" fetch --depth 1 origin "$siteboard_ref"
git -C "$work_root/siteboard" checkout --detach FETCH_HEAD
npm --prefix "$work_root/siteboard" ci
npm --prefix "$work_root/siteboard" run lint
npm --prefix "$work_root/siteboard" test
npm --prefix "$work_root/siteboard" run build
install -d "$tools_release/siteboard"
cp -a "$work_root/siteboard/dist/." "$tools_release/siteboard/"

git clone --depth 1 https://github.com/rad1092/repolens.git "$work_root/repolens"
git -C "$work_root/repolens" fetch --depth 1 origin "$repolens_ref"
git -C "$work_root/repolens" checkout --detach FETCH_HEAD
npm --prefix "$work_root/repolens" ci
npm --prefix "$work_root/repolens" run check
install -d "$tools_release/repolens"
ln -s "$home_release" "$work_root/whago-home"
node "$work_root/repolens/dist/src/cli.js" \
  "$work_root/whago-home" \
  --format html \
  --output "$tools_release/repolens/index.html" \
  --offline
node "$work_root/repolens/dist/src/cli.js" \
  "$work_root/whago-home" \
  --format json \
  --output "$tools_release/repolens/report.json" \
  --offline

home_sha="$(git -C "$home_release" rev-parse HEAD)"
daymark_sha="$(git -C "$work_root/daymark" rev-parse HEAD)"
repolens_sha="$(git -C "$work_root/repolens" rev-parse HEAD)"
siteboard_sha="$(git -C "$work_root/siteboard" rev-parse HEAD)"

printf '%s\n' \
  "release=$release_id" \
  "whago-home=$home_sha" \
  "daymark=$daymark_sha" \
  "repolens=$repolens_sha" \
  "siteboard=$siteboard_sha" \
  > "$tools_release/RELEASE"

sudo ln -sfnT "$home_release" "$home_root/current.next"
sudo ln -sfnT "$tools_release" "$tools_root/current.next"
home_switched="true"
sudo mv -Tf "$home_root/current.next" "$home_root/current"
tools_switched="true"
sudo mv -Tf "$tools_root/current.next" "$tools_root/current"

service_unit_replaced="true"
sudo install -m 0644 \
  "$home_release/ops/whago-home.service" \
  "$service_unit"
sudo systemctl daemon-reload
sudo systemctl enable whago-home.service
sudo systemctl restart whago-home.service

for _ in {1..20}; do
  if curl --fail --silent --show-error \
    --connect-timeout 2 \
    --max-time 5 \
    http://127.0.0.1:3100/healthz >/dev/null; then
    break
  fi
  sleep 1
done
curl --fail --silent --show-error \
  --connect-timeout 2 \
  --max-time 5 \
  http://127.0.0.1:3100/healthz >/dev/null

sudo cp "$nginx_config" "$backup_dir/nginx.conf"
nginx_replaced="true"
sudo install -m 0644 "$home_release/ops/nginx-whago.conf" "$nginx_config"
sudo nginx -t
sudo systemctl reload nginx.service

for path in / /healthz /daymark/ /repolens/ /siteboard/; do
  curl --fail --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --resolve "whago.net:443:127.0.0.1" \
    "https://whago.net$path" >/dev/null
done

for path in / /daymark/ /repolens/ /siteboard/; do
  headers="$(
    curl --head --silent --show-error \
      --fail \
      --connect-timeout 5 \
      --max-time 20 \
      --resolve "whago.net:443:127.0.0.1" \
      "https://whago.net$path"
  )"
  grep -qi '^x-frame-options: DENY' <<<"$headers"
  grep -qi "^content-security-policy: frame-ancestors 'none'" <<<"$headers"
done

# The new release is committed after all mandatory health and security checks
# pass. Everything below is best-effort cleanup and must not roll back a live,
# verified release.
trap - ERR INT TERM

sudo systemctl stop \
  localfit-frontend.service \
  localfit-backend.service \
  2>/dev/null || true

if ! cleanup_work_root; then
  echo "Warning: the temporary build directory could not be removed." >&2
fi

echo "WHAGO release $release_id is live."
