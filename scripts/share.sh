#!/usr/bin/env bash
#
# Serve the built site locally and expose it on a public URL.
#
# Nothing is deployed. The site is served from this machine by `astro preview`,
# and Cloudflare forwards a public hostname to it over an outbound tunnel, so
# no router port has to be opened. The URL lives exactly as long as this script
# runs: close it, sleep the Mac, or drop the network and the link goes dead.
#
# Usage:  npm run share            (or  PORT=5000 npm run share)

set -euo pipefail

PORT="${PORT:-4321}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG="$(mktemp -t aditya-tunnel)"

PREVIEW_PID=""
TUNNEL_PID=""

cleanup() {
  # Kill whole process groups. `astro preview` spawns a child that survives a
  # plain kill of its parent and would keep the port bound for the next run.
  [[ -n "$TUNNEL_PID" ]] && kill -- "-$TUNNEL_PID" 2>/dev/null || true
  [[ -n "$PREVIEW_PID" ]] && kill -- "-$PREVIEW_PID" 2>/dev/null || true
  rm -f "$LOG"
}
trap cleanup EXIT INT TERM

cd "$ROOT"

# Homebrew installs land in different prefixes and ~/.local/bin is not always
# on PATH for non-login shells, so look in the usual places before giving up.
CLOUDFLARED=""
for candidate in \
  "$(command -v cloudflared 2>/dev/null || true)" \
  "$HOME/.local/bin/cloudflared" \
  "/opt/homebrew/bin/cloudflared" \
  "/usr/local/bin/cloudflared"
do
  if [[ -n "$candidate" && -x "$candidate" ]]; then CLOUDFLARED="$candidate"; break; fi
done

if [[ -z "$CLOUDFLARED" ]]; then
  cat >&2 <<'MISSING'
cloudflared was not found. Install it with either:

  brew install cloudflared

or, without Homebrew:

  curl -fsSL -o /tmp/cf.tgz \
    https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-arm64.tgz
  tar xzf /tmp/cf.tgz -C /tmp
  mkdir -p ~/.local/bin && mv /tmp/cloudflared ~/.local/bin/ && chmod +x ~/.local/bin/cloudflared
MISSING
  exit 1
fi

echo "▸ Building…"
npm run build --silent

echo "▸ Starting local server on http://localhost:$PORT"
set -m   # give each job its own process group so cleanup can kill the tree
npx astro preview --port "$PORT" >/dev/null 2>&1 &
PREVIEW_PID=$!
set +m

# Wait until the server actually accepts connections. cloudflared will happily
# publish a URL that points at a closed port, which fails confusingly later.
for _ in $(seq 1 40); do
  curl -fs -o /dev/null "http://localhost:$PORT/" && break
  sleep 0.25
done

if ! curl -fs -o /dev/null "http://localhost:$PORT/"; then
  echo "Local server did not come up on port $PORT." >&2
  exit 1
fi

echo "▸ Opening public tunnel…"
set -m
"$CLOUDFLARED" tunnel --url "http://localhost:$PORT" --no-autoupdate >"$LOG" 2>&1 &
TUNNEL_PID=$!
set +m

# cloudflared prints the hostname it was assigned a moment after starting.
URL=""
for _ in $(seq 1 60); do
  URL="$(grep -Eo 'https://[a-z0-9-]+\.trycloudflare\.com' "$LOG" | head -1 || true)"
  [[ -n "$URL" ]] && break
  sleep 0.5
done

if [[ -z "$URL" ]]; then
  echo "Tunnel did not report a URL. cloudflared output follows:" >&2
  cat "$LOG" >&2
  exit 1
fi

LAN_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"

echo
echo "  ┌──────────────────────────────────────────────────────────────┐"
printf '    PUBLIC   %s\n' "$URL"
printf '    LOCAL    http://localhost:%s\n' "$PORT"
[[ -n "$LAN_IP" ]] && printf '    NETWORK  http://%s:%s\n' "$LAN_IP" "$PORT"
echo "  └──────────────────────────────────────────────────────────────┘"
echo
echo "  The public link works from anywhere, for anyone, while this runs."
echo "  It dies on Ctrl-C, on closing this terminal, on sleep, or on losing"
echo "  the network. Each run is issued a different URL."
echo
echo "  Press Ctrl-C to stop."
echo

wait "$TUNNEL_PID"
