# Effort Levels

Opus 4.7 adds a new level, `xhigh`, between `high` and `max`, and changes how strictly the low tiers are respected. If you're on 4.7 and reasoning feels shallow, raise the knob — don't engineer around it.

## The five levels

| Level | Use for |
|---|---|
| `low` | Short scoped tasks, subagents, latency-sensitive paths, classification jobs |
| `medium` | Cost-sensitive drop-in replacement for simple work |
| `high` (API default) | Intelligence-sensitive baseline — most production workloads |
| `xhigh` | Coding, agentic loops, exploratory work, detailed web / KB search |
| `max` | Frontier problems only — often overthinks structured outputs |

Opus 4.7 respects `low` and `medium` more strictly than 4.6 did. If you were relying on "medium behaves like high" — that reliance is gone. Budget explicitly.

## A practical default rule

1. `high` everywhere by default.
2. `xhigh` when the task needs repeated tool calls, agentic reasoning, or deep KB search.
3. `max` only when you have measured evidence a frontier problem needs it.
4. `low` / `medium` only in explicit cost/latency optimizations, never as a "cheaper but good enough" swap without a benchmark.

## Invocation

```python
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=64000,
    thinking={"type": "adaptive"},
    output_config={"effort": "xhigh"},
    messages=[...],
)
```

`output_config.effort` replaces the per-call dial that `budget_tokens` used to provide on 4.6.

## Claude Code specifics

- The Claude Code IDE default effort is now `xhigh`. The Messages API default remains `high`. If you bounce between them, set effort explicitly in scripts and CI invocations.
- The `/effort` slash command in Claude Code changes the current session's level. Use `/effort xhigh` for coding/agentic sessions; use `/effort max` only when you genuinely need frontier reasoning and accept the latency.

## Why this matters more on 4.7

Fewer tool calls and shorter responses on 4.7 do not always mean shallower reasoning — the model self-verifies and calibrates more. But when depth really matters and you're seeing thin output, it's almost always an effort problem, not a prompt problem. Raise effort first. Rewrite the prompt second.
