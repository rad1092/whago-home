#!/usr/bin/env bash
# One-time rename of the Nginx site file from its old project name
# (sites-available/localfit) to sites-available/whago. Run it on the server
# as the deployment user. The old file stays in place as a backup.
set -Eeuo pipefail

old_config="/etc/nginx/sites-available/localfit"
new_config="/etc/nginx/sites-available/whago"
old_link="/etc/nginx/sites-enabled/localfit"
new_link="/etc/nginx/sites-enabled/whago"

if [[ "$EUID" -eq 0 ]]; then
  echo "Run this script as the deployment user, not root." >&2
  exit 2
fi

if sudo test -f "$new_config"; then
  echo "Already renamed: $new_config exists."
  exit 0
fi

if ! sudo test -f "$old_config"; then
  echo "Nothing to rename: $old_config is missing." >&2
  exit 2
fi

if ! sudo nginx -t; then
  echo "The current Nginx configuration does not pass nginx -t. Fix that first." >&2
  exit 2
fi

restore() {
  trap - ERR INT TERM
  set +e
  if sudo test -L "$new_link"; then sudo unlink "$new_link"; fi
  if ! sudo test -e "$old_link"; then sudo ln -s "$old_config" "$old_link"; fi
  if sudo test -f "$new_config"; then sudo mv "$new_config" "$new_config.failed"; fi
  sudo nginx -t && sudo systemctl reload nginx.service
  echo "Rename failed; the previous site file is active again." >&2
  exit 1
}
trap restore ERR INT TERM

sudo install -m 0644 "$old_config" "$new_config"
sudo ln -s "$new_config" "$new_link"
if sudo test -L "$old_link"; then
  sudo unlink "$old_link"
fi
sudo nginx -t
sudo systemctl reload nginx.service

trap - ERR INT TERM
echo "Nginx now loads $new_config. $old_config is kept as a backup."
