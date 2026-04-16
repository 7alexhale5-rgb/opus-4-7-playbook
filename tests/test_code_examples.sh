#!/usr/bin/env bash
# Verifies that every code example in examples/ and migration/ is syntactically
# valid without executing it. Python via py_compile, shell via bash -n.

set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FAILED=0

# Python examples
while IFS= read -r -d '' f; do
  if python3 -m py_compile "$f" 2>/dev/null; then
    echo "py ok: ${f#$ROOT/}"
  else
    python3 -m py_compile "$f"
    echo "py FAIL: ${f#$ROOT/}"
    FAILED=$((FAILED+1))
  fi
done < <(find "$ROOT/examples" -type f -name "*.py" -print0 2>/dev/null)

# Shell scripts
while IFS= read -r -d '' f; do
  if bash -n "$f" 2>/dev/null; then
    echo "sh ok: ${f#$ROOT/}"
  else
    bash -n "$f"
    echo "sh FAIL: ${f#$ROOT/}"
    FAILED=$((FAILED+1))
  fi
done < <(find "$ROOT/migration" "$ROOT/examples" -type f -name "*.sh" -print0 2>/dev/null)

# Clean up pyc artifacts
find "$ROOT" -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true

if [ "$FAILED" -eq 0 ]; then
  echo "code-examples: clean"
  exit 0
fi
echo "code-examples: FAILED ($FAILED files)"
exit 1
