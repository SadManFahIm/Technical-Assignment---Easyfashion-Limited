#!/usr/bin/env bash
# scripts/publish-badges.sh
# Publishes the generated badge JSON files (coverage/tests.json,
# coverage/coverage.json) to the orphan `ci-badges` branch so the README
# endpoint badges always show live data. Uses the GitHub REST API directly —
# no third-party Actions required.
#
# Required env: GITHUB_TOKEN, GITHUB_REPOSITORY
# Run from the repo root after scripts/write-badges.mjs.

set -euo pipefail

BRANCH="ci-badges"
API="repos/${GITHUB_REPOSITORY}"
AUTH="Authorization: Bearer ${GITHUB_TOKEN}"
CTYPE="Accept: application/vnd.github+json"
FILES=("coverage/tests.json" "coverage/coverage.json")

publish() {
  local path="$1"
  local url="https://api.github.com/${API}/contents/${path}"
  local content sha payload

  content=$(base64 -w0 "${path}")
  sha=$(curl -sfS -H "${AUTH}" -H "${CTYPE}" "${url}?ref=${BRANCH}" | jq -r '.sha // empty' || true)

  if [ -n "$sha" ]; then
    payload=$(jq -n --arg msg "chore: update ${path} badge" \
      --arg content "$content" --arg sha "$sha" --arg branch "$BRANCH" \
      '{message: $msg, content: $content, sha: $sha, branch: $branch}')
  else
    payload=$(jq -n --arg msg "chore: add ${path} badge" \
      --arg content "$content" --arg branch "$BRANCH" \
      '{message: $msg, content: $content, branch: $branch}')
  fi

  curl -sfS -X PUT -H "${AUTH}" -H "${CTYPE}" -d "$payload" "$url" > /dev/null
  echo "published ${path} to ${BRANCH}"
}

# Ensure the branch exists — create it from the default branch if missing
# (normal runs use the pre-seeded orphan ci-badges branch).
if ! curl -sfS -H "${AUTH}" -H "${CTYPE}" "https://api.github.com/${API}/branches/${BRANCH}" > /dev/null 2>&1; then
  echo "${BRANCH} missing — creating from default branch"
  default_branch=$(curl -sfS -H "${AUTH}" -H "${CTYPE}" "https://api.github.com/${API}" | jq -r '.default_branch')
  base_sha=$(curl -sfS -H "${AUTH}" -H "${CTYPE}" "https://api.github.com/${API}/branches/${default_branch}" | jq -r '.commit.sha')
  curl -sfS -X POST -H "${AUTH}" -H "${CTYPE}" \
    -d "{\"ref\":\"refs/heads/${BRANCH}\",\"sha\":\"${base_sha}\"}" \
    "https://api.github.com/${API}/git/refs" > /dev/null
fi

for f in "${FILES[@]}"; do
  [ -f "$f" ] || { echo "missing $f — run scripts/write-badges.mjs first" >&2; exit 1; }
  publish "$f"
done
