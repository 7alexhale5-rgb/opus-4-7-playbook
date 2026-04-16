# Opus 4.7 Operating Notes

Drop this file at `~/.claude/references/opus-4-7-operating-notes.md` (or anywhere your workflow can reference it). It is the single source of truth for Opus 4.7 behavior so you can update one file instead of N when a new model ships.

---

Released 2026-04-16. Pricing unchanged from 4.6 (Opus $5 / $25 per MTok, 1M context standard pricing, 128k max output). New tokenizer yields 1.0–1.35× more tokens per input — budget `max_tokens` upward.

## Current model IDs

| Tier | ID | Use for |
|---|---|---|
| Opus | `claude-opus-4-7` | Deep reasoning, agentic loops, production coding |
| Sonnet | `claude-sonnet-4-6` | Standard implementation, review, research, multi-round tool use |
| Haiku | `claude-haiku-4-5` | Fast / cheap work, classification, parallel subagents |

## Breaking changes vs 4.6 (Messages API)

1. Extended thinking removed — `{type: "enabled", budget_tokens: N}` returns 400. Use `{type: "adaptive"}` and control depth via `output_config.effort`.
2. Sampling params removed — `temperature`, `top_p`, `top_k` non-default return 400. Omit them.
3. Thinking content hidden by default — `thinking.display` defaults to `"omitted"` (silent change). Set `"summarized"` if you stream reasoning to users.
4. Prefill removed — no assistant-message prefills. Use structured outputs or system instructions.
5. New tokenizer — add ≥35% headroom to `max_tokens`. Minimum 64k at `xhigh` / `max`.

## Effort levels

| Level | Use for |
|---|---|
| low | Short scoped tasks, subagents, latency-sensitive |
| medium | Cost-sensitive drop-in |
| high (default) | Intelligence-sensitive baseline |
| xhigh | Coding, agentic, exploratory work |
| max | Frontier problems only — often overthinks on structured outputs |

Opus 4.7 respects low/medium more strictly than 4.6. If reasoning is shallow, raise effort — don't prompt around it.

## Behavior changes (not breaking — prompt hygiene)

- Literal instruction-following — no silent generalization
- Calibrated response length — remove "be concise" global scaffolding
- Fewer tool calls, more reasoning — raise effort to increase tool usage
- More direct tone, fewer emoji
- Built-in progress updates — remove "after every N tool calls" scaffolding
- Fewer subagents by default — steerable via explicit prompting
- Real-time cyber safeguards — apply at `https://claude.com/form/cyber-use-case` for legit security work

## Vision: 3.75 MP

First Claude with high-res: 2576 px / 3.75 MP (up from 1568 px / 1.15 MP). Coordinates are 1:1 with actual pixels — no scale-factor math. Up to ~4,784 tokens per full-res image (~3× prior). Downsample when you don't need the fidelity.

## Task budgets (public beta)

```python
response = client.beta.messages.create(
    model="claude-opus-4-7",
    max_tokens=128000,
    output_config={
        "effort": "xhigh",
        "task_budget": {"type": "tokens", "total": 128000},
    },
    betas=["task-budgets-2026-03-13"],
    messages=[...],
)
```

- Minimum 20k. Below → 400.
- Soft cap, not hard.
- Too-small budgets cause refusal-like behavior — size from observed p99 × 1.2.
- Messages API only — not on Claude Code / Cowork yet.

## Minimal Opus 4.7 call

```python
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=64000,
    thinking={"type": "adaptive"},
    output_config={"effort": "xhigh"},
    messages=[{"role": "user", "content": "..."}],
)
```

For UIs that stream reasoning: `thinking={"type": "adaptive", "display": "summarized"}`.

## Migration checklist (4.6 → 4.7)

- [ ] Swap `claude-opus-4-6` → `claude-opus-4-7`
- [ ] Remove `temperature` / `top_p` / `top_k`
- [ ] Replace `thinking: {enabled, budget_tokens}` → `thinking: {adaptive}` + `output_config.effort`
- [ ] Remove assistant prefills
- [ ] If surfacing thinking to users: add `thinking.display: "summarized"`
- [ ] Re-tune `max_tokens` (≥64k at xhigh/max; add ≥35% headroom)
- [ ] Re-budget image tokens; drop scale-factor coordinate math
- [ ] Remove deprecated beta headers: `effort-2025-11-24`, `interleaved-thinking-2025-05-14`, `fine-grained-tool-streaming-2025-05-14`
- [ ] Remove forced-progress scaffolding and length-control prompts; re-baseline
- [ ] Optional: adopt `task_budget` (beta)

## Sources

- <https://platform.claude.com/docs/en/about-claude/models/migration-guide>
- <https://platform.claude.com/docs/en/about-claude/models/overview>
- <https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking>
- <https://platform.claude.com/docs/en/build-with-claude/effort>
- <https://platform.claude.com/docs/en/build-with-claude/task-budgets>
- <https://www.anthropic.com/news/claude-opus-4-7>
