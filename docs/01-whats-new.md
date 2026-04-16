# What's New in Opus 4.7

Claude Opus 4.7 shipped on 2026-04-16. Pricing is unchanged from 4.6 ($5 / $25 per MTok; 1M context at standard pricing; 128k max output). The API shape is not unchanged. Five things return HTTP 400 on 4.7 that were fine on 4.6. A sixth is a silent default change you can miss for days if you ship blind.

Read this first before you swap model IDs.

## Breaking changes (Messages API)

| # | Change | Old → New |
|---|---|---|
| 1 | Extended thinking removed | `thinking: {type: "enabled", budget_tokens: N}` → `thinking: {type: "adaptive"}` |
| 2 | Sampling params removed | `temperature` / `top_p` / `top_k` → omit; guide via prompting |
| 3 | Assistant prefill removed | prefill message → structured outputs or system instructions |
| 4 | Beta headers retired | `effort-2025-11-24`, `interleaved-thinking-2025-05-14`, `fine-grained-tool-streaming-2025-05-14` → remove |
| 5 | Thinking display silent default | `thinking.display` default was shown — now `"omitted"` |
| 6 | New tokenizer | ~1.0–1.35× more tokens per input than 4.6 |

(1) through (4) return 400 on 4.7 if you send them. (5) does not error, but a UI that streamed reasoning before will look like it hung. (6) does not error either, but budgets tuned for 4.6 will truncate.

## Behavior changes (not errors — prompt hygiene)

- **Literal instruction-following.** 4.7 follows instructions more strictly and generalizes less. Prompts that relied on implicit generalization will underperform; prompts that were already specific perform better.
- **Calibrated response length.** Output length now tracks task complexity natively. "Be concise" scaffolding at global scope is mostly redundant and can hurt complex tasks.
- **Fewer tool calls, more reasoning.** If you need more tool use, raise effort — don't prompt around it.
- **Built-in progress updates** during long agentic traces. Strip "after every N tool calls, summarize" scaffolding.
- **More direct tone, fewer emoji** by default.
- **Fewer subagents** chosen by default — steer with explicit prompting if you want them.

## New capabilities

- **`xhigh` effort level.** Slots between `high` and `max`. Intended default for coding, agentic loops, and repeated tool use. See `03-effort-levels.md`.
- **Task budgets (public beta).** Advisory token countdown across the full agentic loop. Minimum 20k, soft cap (not hard), Messages API only (not Claude Code / Cowork yet). See `06-task-budgets.md`.
- **3.75 MP vision** (2576 px) with 1:1 pixel coordinates. Up from 1.15 MP / 1568 px. See `07-vision-3-75mp.md`.
- **Real-time cyber safeguards.** Legit security-research use requires enrollment at `claude.com/form/cyber-use-case`.

## Benchmarks (vs 4.6)

| Benchmark | 4.6 | 4.7 |
|---|---|---|
| SWE-bench Verified | 80.8% | 87.6% |
| SWE-bench Pro | 53.4% | 64.3% |
| CursorBench | 58% | 70% |
| Visual acuity (internal) | 54.5% | 98.5% |
| Internal 93-task coding suite | baseline | +13% |

The Rakuten team reports 3× production resolution rate on SWE-Bench-style tasks. Treat benchmark deltas as directional; measure on your own traffic before pricing decisions.

## Sources

- Anthropic migration guide: <https://platform.claude.com/docs/en/about-claude/models/migration-guide>
- Release post: <https://www.anthropic.com/news/claude-opus-4-7>
- Overview: <https://platform.claude.com/docs/en/about-claude/models/overview>
- Adaptive thinking: <https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking>
- Effort: <https://platform.claude.com/docs/en/build-with-claude/effort>
- Task budgets: <https://platform.claude.com/docs/en/build-with-claude/task-budgets>
