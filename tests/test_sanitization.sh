#!/usr/bin/env bash
# Sanitization test: fails if any file leaks personal or proprietary references.
# Run before commit. CI-enforced.
#
# The test file itself is excluded by filename. Patterns are read from a
# sidecar block file so the blocklist doesn't appear as a literal here.

set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PATTERNS_FILE="$(dirname "$0")/sanitization-patterns.txt"
FAILED=0

if [ ! -f "$PATTERNS_FILE" ]; then
  echo "sanitization: missing $PATTERNS_FILE"
  exit 2
fi

while IFS= read -r pattern; do
  # Skip empty lines and comments
  [ -z "$pattern" ] && continue
  [[ "$pattern" =~ ^# ]] && continue

  HITS=$(grep -rIlE --exclude-dir=.git \
    --exclude="test_sanitization.sh" \
    --exclude="sanitization-patterns.txt" \
    "$pattern" "$ROOT" 2>/dev/null || true)

  if [ -n "$HITS" ]; then
    echo "LEAK: pattern '$pattern' found in:"
    echo "$HITS" | sed 's|^|  |'
    FAILED=$((FAILED+1))
  fi
done < "$PATTERNS_FILE"

if [ "$FAILED" -eq 0 ]; then
  echo "sanitization: clean"
  exit 0
fi

echo ""
echo "sanitization: FAILED ($FAILED leaks)"
exit 1
