#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${OPS_HOST:-root@5.75.189.90}"
DEST="${OPS_DEST:-/opt/paradise-city}"

ssh "$HOST" "mkdir -p '$DEST'"
rsync -avz --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude .DS_Store \
  "$ROOT/" \
  "$HOST:$DEST/"

ssh "$HOST" "cd '$DEST' && docker compose up -d --build"
echo "deployed → $HOST:$DEST"
