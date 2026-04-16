<!--
  Paste this into ~/CLAUDE.md or ~/.claude/CLAUDE.md.
  It points future sessions at the detailed operating notes and encodes
  the behavior policy in a few scannable lines.
-->

## Opus 4.7 Operating Notes

Operating on Claude Opus 4.7 (released 2026-04-16). Full reference: `~/.claude/references/opus-4-7-operating-notes.md`.

TL;DR: adaptive-only thinking, no sampling params (`temperature` / `top_p` / `top_k` return 400), default `high` effort with `xhigh` on deep-reasoning skills, literal instruction-following, calibrated response length (don't re-add length-control scaffolding), 1.0–1.35× tokenizer inflation (add ≥35% `max_tokens` headroom). Pin model IDs: `claude-opus-4-7` / `claude-sonnet-4-6` / `claude-haiku-4-5` in production paths.
