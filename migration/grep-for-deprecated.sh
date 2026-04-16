#!/usr/bin/env bash
# Scans a directory for Opus 4.7 breaking-change hotspots.
# Reports every occurrence of a deprecated param, beta header, or model ID.
# Read-only — never modifies anything.
#
# Usage:
#   ./migration/grep-for-deprecated.sh [path]
#
# Default path: current directory.

set -u
ROOT="${1:-$PWD}"

echo "== deprecated-param scan: $ROOT =="

scan() {
  local label="$1" pattern="$2"
  echo ""
  echo "-- $label --"
  grep -rInE --include='*.py' --include='*.ts' --include='*.tsx' \
             --include='*.js' --include='*.jsx' --include='*.json' \
             --include='*.md' --include='*.yaml' --include='*.yml' \
             "$pattern" "$ROOT" 2>/dev/null || echo "  (no matches)"
}

scan "sampling params (remove on 4.7)"       '\btemperature\s*[:=]|\btop_p\s*[:=]|\btop_k\s*[:=]'
scan "extended thinking (replace with adaptive)" 'thinking\s*[:=]\s*\{[^}]*(enabled|budget_tokens)'
scan "assistant prefill (remove)"            '"role"\s*:\s*"assistant".*\[.*(prefill|pre-fill)'
scan "deprecated beta headers"               'effort-2025-11-24|interleaved-thinking-2025-05-14|fine-grained-tool-streaming-2025-05-14'
scan "old Opus model IDs"                    'claude-opus-4-6|claude-3-opus|claude-3-5-sonnet-202|claude-3-5-haiku-202'
scan "display default callers (may need summarized)" 'thinking\.display|"display"\s*:\s*"shown"'

echo ""
echo "== scan complete =="
echo ""
echo "next steps: docs/02-migration-checklist.md"
