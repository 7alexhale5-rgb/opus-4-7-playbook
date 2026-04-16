#!/usr/bin/env bash
# Pins the `model:` line in Claude Code agent frontmatter to explicit
# Opus 4.7 / Sonnet 4.6 / Haiku 4.5 IDs.
#
# Idempotent. Creates .bak files you can remove after verifying.
# Prints a summary of what changed.
#
# Usage:
#   ./migration/pin-agents.sh [path-to-agents-dir]
#
# Default path: ~/.claude/agents

set -u
AGENTS_DIR="${1:-$HOME/.claude/agents}"

if [ ! -d "$AGENTS_DIR" ]; then
  echo "error: agents directory not found: $AGENTS_DIR"
  exit 1
fi

cd "$AGENTS_DIR" || exit 1

declare -a CHANGED=()

replace() {
  local file="$1" from="$2" to="$3"
  if [ -f "$file" ] && grep -qE "^model: ${from}$" "$file"; then
    sed -i.bak "s/^model: ${from}$/model: ${to}/" "$file"
    CHANGED+=("$file: $from -> $to")
  fi
}

# Opus-tier: replace `model: opus` with the pinned ID
for f in *.md; do
  [ -e "$f" ] || continue
  if grep -qE "^model: opus$" "$f"; then
    sed -i.bak 's/^model: opus$/model: claude-opus-4-7/' "$f"
    CHANGED+=("$f: opus -> claude-opus-4-7")
  fi
done

# Haiku-tier
for f in *.md; do
  [ -e "$f" ] || continue
  if grep -qE "^model: haiku$" "$f"; then
    sed -i.bak 's/^model: haiku$/model: claude-haiku-4-5/' "$f"
    CHANGED+=("$f: haiku -> claude-haiku-4-5")
  fi
done

# Sonnet-tier
for f in *.md; do
  [ -e "$f" ] || continue
  if grep -qE "^model: sonnet$" "$f"; then
    sed -i.bak 's/^model: sonnet$/model: claude-sonnet-4-6/' "$f"
    CHANGED+=("$f: sonnet -> claude-sonnet-4-6")
  fi
done

echo "agents pinned: ${#CHANGED[@]}"
for line in "${CHANGED[@]}"; do
  echo "  $line"
done

echo ""
echo "verify:"
grep -H '^model:' *.md 2>/dev/null || true

echo ""
echo "backups:  *.bak files created next to each changed file"
echo "rollback: for f in *.bak; do mv \"\$f\" \"\${f%.bak}\"; done"
echo "cleanup:  rm -f *.bak"
