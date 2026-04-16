#!/usr/bin/env bash
# Interactive installer for the Opus 4.7 Claude Code environment pieces.
#
# What it does (each step is opt-in via prompt):
#   1. Drops operating-notes.md into ~/.claude/references/
#   2. Drops the CARL opus-4-7 domain into ~/.carl/ and appends to manifest
#   3. Appends the global CLAUDE.md snippet to ~/.claude/CLAUDE.md
#
# Nothing is installed without confirmation. Nothing overwrites existing
# files without a prompt.
#
# Usage:
#   bash migration/install.sh
#
# From inside a checked-out opus-4-7-playbook repo.

set -u
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

confirm() {
  local msg="$1"
  read -r -p "$msg [y/N] " reply
  [[ "$reply" =~ ^[Yy]$ ]]
}

copy_if_ok() {
  local src="$1" dst="$2"
  mkdir -p "$(dirname "$dst")"
  if [ -f "$dst" ]; then
    if ! confirm "exists: $dst -- overwrite?"; then
      echo "  skipped"
      return 0
    fi
  fi
  cp "$src" "$dst"
  echo "  wrote: $dst"
}

echo "opus-4-7-playbook: interactive install"
echo "each step prompts separately. Ctrl-C to abort."
echo ""

if confirm "1/3: install operating-notes.md to ~/.claude/references/?"; then
  copy_if_ok "$REPO_ROOT/templates/operating-notes.md" \
             "$HOME/.claude/references/opus-4-7-operating-notes.md"
fi

if confirm "2/3: install CARL opus-4-7 domain to ~/.carl/?"; then
  if [ ! -f "$HOME/.carl/manifest" ]; then
    echo "  no ~/.carl/manifest — skipping (this step is for CARL users)"
  else
    copy_if_ok "$REPO_ROOT/templates/carl-opus-4-7" "$HOME/.carl/opus-4-7"
    if grep -q "^OPUS-4-7_STATE=" "$HOME/.carl/manifest"; then
      echo "  manifest already registers OPUS-4-7 — skipping"
    else
      cat >> "$HOME/.carl/manifest" <<'EOF'

# ============================================================================
# OPUS-4-7 - Behavior policy for Claude Opus 4.7 (released 2026-04-16)
# ============================================================================
OPUS-4-7_STATE=active
OPUS-4-7_ALWAYS_ON=true
EOF
      echo "  appended to ~/.carl/manifest"
    fi
  fi
fi

if confirm "3/3: append Opus 4.7 pointer section to ~/.claude/CLAUDE.md?"; then
  if [ ! -f "$HOME/.claude/CLAUDE.md" ]; then
    echo "  ~/.claude/CLAUDE.md does not exist — creating"
    touch "$HOME/.claude/CLAUDE.md"
  fi
  if grep -q "Opus 4.7 Operating Notes" "$HOME/.claude/CLAUDE.md"; then
    echo "  already contains Opus 4.7 section — skipping"
  else
    cat "$REPO_ROOT/templates/CLAUDE-md-global-snippet.md" >> "$HOME/.claude/CLAUDE.md"
    echo "  appended to ~/.claude/CLAUDE.md"
  fi
fi

echo ""
echo "install complete."
echo "next: restart Claude Code (or open a fresh session) so the new rules load."
