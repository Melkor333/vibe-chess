#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

SPEC="bombadil/chess-trainer.spec.ts"
PORT=1234
RESULTS="bombadil/results"

cleanup() {
  echo "Cleaning up..."
  if [[ -n "${SERVER_PID:-}" ]]; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

echo "Building..."
gleam build

echo "Starting server on port $PORT..."
python3 -m http.server "$PORT" > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to be ready with timeout
for i in $(seq 1 30); do
  if curl -s --max-time 2 "http://localhost:$PORT" >/dev/null 2>&1; then
    echo "Server ready."
    break
  fi
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "Server died. Abort."
    exit 1
  fi
  sleep 1
done

if ! kill -0 "$SERVER_PID" 2>/dev/null; then
  echo "Server failed to start. Abort."
  exit 1
fi

echo "Running bombadil (Fairphone 4: 412x915)"
set +e
# Bombadil runs forever. We limit it to 60 sec here.
timeout 60 bombadil test "http://localhost:$PORT" "$SPEC" \
  --output-path "$RESULTS" \
  --exit-on-violation \
  --width 412 \
  --height 915 \
  --device-scale-factor 2 \
  --headless \
  --no-sandbox

EXIT=$?
set -e
if test "$EXIT" -eq 124; then
  echo "Nothing found in 60 seconds! Everything good."
  exit
fi
exit $EXIT
