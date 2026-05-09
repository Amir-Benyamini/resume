#!/usr/bin/env bash
# Render Amir-Benyamini-Resume.pdf from static/index.html via Chrome headless.
# macOS path. Adjust CHROME for Linux/Windows if needed.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/static/index.html"
OUT="$ROOT/Amir-Benyamini-Resume.pdf"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -x "$CHROME" ]; then
  echo "ERROR: Chrome not found at $CHROME" >&2
  echo "Edit scripts/build-pdf.sh and point CHROME at your browser binary." >&2
  exit 1
fi

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf-no-header \
  --virtual-time-budget=2000 \
  --print-to-pdf="$OUT" \
  "file://$SRC"

SIZE_KB=$(( $(wc -c < "$OUT") / 1024 ))
echo "✓ wrote Amir-Benyamini-Resume.pdf  (${SIZE_KB} KB)"
