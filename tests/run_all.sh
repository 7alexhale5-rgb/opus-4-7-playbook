#!/usr/bin/env bash
# Aggregate test runner. Returns non-zero if any test fails.
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FAILS=0
for t in \
  "$ROOT/tests/test_sanitization.sh" \
  "$ROOT/tests/test_code_examples.sh"; do
  echo "== $(basename "$t") =="
  bash "$t" || FAILS=$((FAILS+1))
  echo ""
done

echo "== test_links.py =="
python3 "$ROOT/tests/test_links.py" || FAILS=$((FAILS+1))

echo ""
if [ "$FAILS" -eq 0 ]; then
  echo "ALL TESTS PASSED"
  exit 0
fi
echo "TESTS FAILED: $FAILS"
exit 1
