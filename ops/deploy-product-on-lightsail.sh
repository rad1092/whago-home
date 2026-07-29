#!/usr/bin/env bash
set -Eeuo pipefail

umask 022

usage() {
  echo "Usage: $0 daymark|repolens|siteboard <git-ref> [--bootstrap|--verify-public]" >&2
}

product="${1:-}"
product_ref="${2:-}"
deployment_mode="${3:-}"

if [[ $# -lt 2 || $# -gt 3 ]]; then
  usage
  exit 2
fi

if [[ "$EUID" -eq 0 ]]; then
  echo "Run this script as an unprivileged deployment user, not root." >&2
  exit 2
fi

case "$deployment_mode" in
  "" | --bootstrap | --verify-public) ;;
  *)
    usage
    exit 2
    ;;
esac

if [[ ! "$product_ref" =~ ^[A-Za-z0-9][A-Za-z0-9._/-]{0,199}$ ]] ||
  [[ "$product_ref" == *..* ]] ||
  [[ "$product_ref" == *//* ]] ||
  [[ "$product_ref" == */. ]] ||
  [[ "$product_ref" == *.lock ]]; then
  echo "Ref contains unsupported characters or path components: $product_ref" >&2
  exit 2
fi

case "$product" in
  daymark)
    repository_url="https://github.com/rad1092/daymark.git"
    artifact_name="dist"
    origin_host="daymark.whago.net"
    page_marker="Daymark"
    ;;
  repolens)
    repository_url="https://github.com/rad1092/repolens.git"
    artifact_name="docs"
    origin_host="repolens.whago.net"
    page_marker="RepoLens"
    ;;
  siteboard)
    repository_url="https://github.com/rad1092/siteboard.git"
    artifact_name="dist"
    origin_host="siteboard.whago.net"
    page_marker="Siteboard"
    ;;
  *)
    usage
    exit 2
    ;;
esac

for command_name in \
  curl \
  find \
  flock \
  git \
  npm \
  node \
  sha256sum \
  sort \
  sudo \
  xargs; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Required command is unavailable: $command_name" >&2
    exit 2
  fi
done

product_root="/srv/whago-products/$product"
releases_root="$product_root/releases"
current_link="$product_root/current"
next_link="$product_root/current.next"
rollback_link="$product_root/current.rollback"
build_dir=""
release_id=""
release_dir=""
previous_release=""
switched="false"
release_created="false"

deploy_user="$(id -un)"
deploy_group="$(id -gn)"
node_major="$(node -p 'Number(process.versions.node.split(".")[0])')"
if [[ ! "$node_major" =~ ^[0-9]+$ || "$node_major" -lt 22 ]]; then
  echo "Node.js 22 or newer is required; found major version $node_major." >&2
  exit 2
fi

exec 9>"/tmp/whago-deploy.lock"
if ! flock -n 9; then
  echo "Another WHAGO deployment is running." >&2
  exit 3
fi

sudo install -d -o "$deploy_user" -g "$deploy_group" "$releases_root"

if sudo test -L "$current_link"; then
  previous_release="$(sudo readlink -f "$current_link" 2>/dev/null || true)"
elif sudo test -e "$current_link"; then
  echo "Refusing to replace a non-symlink current path: $current_link" >&2
  exit 2
fi

if [[ -n "$previous_release" &&
  "$previous_release" != "$releases_root/"* ]]; then
  echo "Current release points outside the product release directory." >&2
  exit 2
fi
if [[ "$deployment_mode" == "--bootstrap" && -n "$previous_release" ]]; then
  echo "Bootstrap mode is only allowed before the first $product release." >&2
  exit 2
fi

remove_transition_links() {
  local link_path

  for link_path in "$next_link" "$rollback_link"; do
    if sudo test -L "$link_path"; then
      sudo unlink "$link_path"
    elif sudo test -e "$link_path"; then
      echo "Refusing to remove a non-symlink transition path: $link_path" >&2
      return 1
    fi
  done
}

restore_current_link() {
  if [[ -n "$previous_release" ]]; then
    sudo ln -sfnT "$previous_release" "$rollback_link"
    sudo mv -Tf "$rollback_link" "$current_link"
    return
  fi

  if sudo test -L "$current_link"; then
    sudo unlink "$current_link"
  elif sudo test -e "$current_link"; then
    echo "Refusing to remove a non-symlink current path during rollback." >&2
    return 1
  fi
}

cleanup_build_dir() {
  if [[ -n "$build_dir" &&
    "$build_dir" == "/tmp/whago-${product}-build."* &&
    -d "$build_dir" ]]; then
    rm -rf -- "$build_dir"
  fi
}

rollback() {
  local exit_code="${1:-1}"
  local rollback_failed="false"

  trap - ERR INT TERM
  set +e

  if [[ "$switched" == "true" ]] && ! restore_current_link; then
    rollback_failed="true"
  fi
  if ! remove_transition_links; then
    rollback_failed="true"
  fi
  cleanup_build_dir

  if [[ "$rollback_failed" == "true" ]]; then
    echo "$product deployment failed and rollback needs manual inspection." >&2
  else
    echo "$product deployment failed; the previous release was restored." >&2
  fi
  if [[ "$release_created" == "true" ]]; then
    echo "Failed release retained for inspection: $release_dir" >&2
  fi
  exit "$exit_code"
}

trap 'rollback $?' ERR
trap 'rollback 130' INT
trap 'rollback 143' TERM

remove_transition_links

build_dir="$(mktemp -d "/tmp/whago-${product}-build.XXXXXX")"
source_dir="$build_dir/source"
staged_artifact="$build_dir/$artifact_name"

git clone \
  --depth 1 \
  --filter=blob:none \
  --no-checkout \
  "$repository_url" \
  "$source_dir"
git -C "$source_dir" fetch --force --depth 1 origin "$product_ref"
git -C "$source_dir" checkout --detach FETCH_HEAD

commit_sha="$(git -C "$source_dir" rev-parse HEAD)"
short_sha="$(git -C "$source_dir" rev-parse --short=12 HEAD)"
release_id="$(date -u +%Y%m%dT%H%M%SZ)-$short_sha"
release_dir="$releases_root/$release_id"

if sudo test -e "$release_dir" || sudo test -L "$release_dir"; then
  echo "Release already exists: $release_dir" >&2
  false
fi

npm --prefix "$source_dir" ci
case "$product" in
  daymark | siteboard)
    npm --prefix "$source_dir" test
    npm --prefix "$source_dir" run lint
    npm --prefix "$source_dir" run build
    ;;
  repolens)
    npm --prefix "$source_dir" run ci
    ;;
esac

source_artifact="$source_dir/$artifact_name"
if [[ ! -d "$source_artifact" || ! -f "$source_artifact/index.html" ]]; then
  echo "Expected $artifact_name artifact is missing an index.html file." >&2
  false
fi
if [[ -n "$(find "$source_artifact" -type l -print -quit)" ]]; then
  echo "Artifact contains a symbolic link and will not be deployed." >&2
  false
fi

cp -a "$source_artifact" "$staged_artifact"

artifact_hash="$(
  cd "$staged_artifact"
  find . -type f ! -name release.json -print0 |
    LC_ALL=C sort -z |
    xargs -0 sha256sum |
    sha256sum |
    cut -d ' ' -f 1
)"
built_at="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
expected_release_json="$(
  printf \
    '{"product":"%s","release":"%s","commit":"%s","ref":"%s","artifact":"%s","builtAt":"%s"}' \
    "$product" \
    "$release_id" \
    "$commit_sha" \
    "$product_ref" \
    "$artifact_hash" \
    "$built_at"
)"
printf '%s\n' "$expected_release_json" > "$staged_artifact/release.json"

install -d "$release_dir"
release_created="true"
cp -a "$staged_artifact" "$release_dir/$artifact_name"
printf '%s\n' \
  "product=$product" \
  "release=$release_id" \
  "commit=$commit_sha" \
  "ref=$product_ref" \
  "artifact=$artifact_hash" \
  "built_at=$built_at" \
  > "$release_dir/RELEASE"

copied_hash="$(
  cd "$release_dir/$artifact_name"
  find . -type f ! -name release.json -print0 |
    LC_ALL=C sort -z |
    xargs -0 sha256sum |
    sha256sum |
    cut -d ' ' -f 1
)"
if [[ "$copied_hash" != "$artifact_hash" ]]; then
  echo "Copied artifact hash does not match the verified build." >&2
  false
fi
copied_release_json="$(cat "$release_dir/$artifact_name/release.json")"
if [[ "$copied_release_json" != "$expected_release_json" ]]; then
  echo "Copied release metadata does not match the staged release." >&2
  false
fi
sudo chown -R root:root "$release_dir"
sudo chmod -R u=rwX,go=rX "$release_dir"

sudo ln -sfnT "$release_dir" "$next_link"
switched="true"
sudo mv -Tf "$next_link" "$current_link"

if [[ "$deployment_mode" == "--bootstrap" ]]; then
  trap - ERR INT TERM
  remove_transition_links
  cleanup_build_dir
  echo "$product release $release_id is seeded for the initial Nginx bootstrap."
  exit 0
fi

curl_options=(
  --fail
  --silent
  --show-error
  --connect-timeout 5
  --max-time 20
  --resolve "$origin_host:443:127.0.0.1"
)

origin_release="$(
  curl "${curl_options[@]}" \
    "https://$origin_host/release.json?release=$release_id"
)"
if [[ "$origin_release" != "$expected_release_json" ]]; then
  echo "Local origin release metadata does not match the deployed release." >&2
  false
fi

origin_page="$(
  curl "${curl_options[@]}" \
    "https://$origin_host/?release=$release_id"
)"
if ! grep -Fq "$page_marker" <<<"$origin_page"; then
  echo "Local origin page does not contain the expected product marker." >&2
  false
fi

# The current symlink now points at a locally verified product release.
trap - ERR INT TERM
remove_transition_links
cleanup_build_dir

echo "$product release $release_id is live at the local origin."

if [[ "$deployment_mode" == "--verify-public" ]]; then
  if ! public_release="$(
    curl --fail --silent --show-error \
      --connect-timeout 10 \
      --max-time 30 \
      "https://$origin_host/release.json?release=$release_id"
  )"; then
    echo "Public DNS verification failed; the origin-verified release remains active." >&2
    exit 4
  fi
  if [[ "$public_release" != "$expected_release_json" ]]; then
    echo "Public release metadata differs; the origin-verified release remains active." >&2
    exit 4
  fi
  echo "$product release $release_id is verified through public DNS."
else
  echo "Public DNS verification was not requested; use --verify-public when needed."
fi
