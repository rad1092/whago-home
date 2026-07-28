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
switched="false"
nginx_replaced="false"

rollback() {
  exit_code=$?
  trap - ERR
  set +e

  if [[ "$switched" == "true" ]]; then
    if [[ -n "$previous_home" ]]; then
      sudo ln -sfn "$previous_home" "$home_root/current.next"
      sudo mv -Tf "$home_root/current.next" "$home_root/current"
      sudo systemctl restart whago-home.service
    else
      sudo systemctl stop whago-home.service
    fi

    if [[ -n "$previous_tools" ]]; then
      sudo ln -sfn "$previous_tools" "$tools_root/current.next"
      sudo mv -Tf "$tools_root/current.next" "$tools_root/current"
    fi
  fi

  if [[ "$nginx_replaced" == "true" && -f "$backup_dir/nginx.conf" ]]; then
    sudo install -m 0644 "$backup_dir/nginx.conf" "$nginx_config"
    sudo nginx -t
    sudo systemctl reload nginx.service
  fi

  echo "Deployment failed; the previous release was restored." >&2
  exit "$exit_code"
}

trap rollback ERR

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
node "$work_root/repolens/dist/src/cli.js" \
  "$work_root/repolens" \
  --format html \
  --output "$tools_release/repolens/index.html" \
  --offline
node "$work_root/repolens/dist/src/cli.js" \
  "$work_root/repolens" \
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

sudo ln -sfn "$home_release" "$home_root/current.next"
sudo mv -Tf "$home_root/current.next" "$home_root/current"
sudo ln -sfn "$tools_release" "$tools_root/current.next"
sudo mv -Tf "$tools_root/current.next" "$tools_root/current"
switched="true"

sudo install -m 0644 \
  "$home_release/ops/whago-home.service" \
  /etc/systemd/system/whago-home.service
sudo systemctl daemon-reload
sudo systemctl enable whago-home.service
sudo systemctl restart whago-home.service

for _ in {1..20}; do
  if curl --fail --silent --show-error \
    http://127.0.0.1:3100/healthz >/dev/null; then
    break
  fi
  sleep 1
done
curl --fail --silent --show-error \
  http://127.0.0.1:3100/healthz >/dev/null

sudo cp "$nginx_config" "$backup_dir/nginx.conf"
sudo install -m 0644 "$home_release/ops/nginx-whago.conf" "$nginx_config"
nginx_replaced="true"
sudo nginx -t
sudo systemctl reload nginx.service

for path in / /healthz /daymark/ /repolens/ /siteboard/; do
  curl --fail --silent --show-error \
    --resolve "whago.net:443:127.0.0.1" \
    "https://whago.net$path" >/dev/null
done

for path in / /daymark/ /repolens/ /siteboard/; do
  headers="$(
    curl --head --silent --show-error \
      --resolve "whago.net:443:127.0.0.1" \
      "https://whago.net$path"
  )"
  grep -qi '^x-frame-options: DENY' <<<"$headers"
  grep -qi "^content-security-policy: frame-ancestors 'none'" <<<"$headers"
done

sudo systemctl stop \
  localfit-frontend.service \
  localfit-backend.service \
  2>/dev/null || true

trap - ERR
echo "WHAGO release $release_id is live."
