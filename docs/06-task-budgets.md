# Task Budgets (Public Beta)

Task budgets are a new mechanism that lets the model pace itself across an entire agentic loop — thinking, tool calls, tool results, output — rather than just within a single response. The model is informed of the remaining budget and adapts depth accordingly.

This is public beta on Opus 4.7, Messages API only. Not available on Claude Code / Cowork yet.

## The call shape

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

Note the `client.beta.messages.create` (not `client.messages.create`) and the explicit `betas=` header. Forgetting either yields an error.

## Rules

- **Minimum total: 20,000 tokens.** Below this returns 400.
- **Soft cap, not hard.** `max_tokens` remains the true ceiling. `task_budget` is advisory — the model will try to finish within it.
- **Too-small budgets cause refusal-like behavior.** The model interprets a clearly-insufficient budget as "cannot complete the task at this size" and may return a terse refusal. Size from observed task cost, not aspiration.
- **`remaining` is for resumed loops.** If your agent pauses and resumes, set `remaining` to the unspent budget from the previous run.

## When to use it

Good fits:

- Multi-hour agentic research loops where you want graceful early termination
- Tool-heavy tasks with unpredictable exploration depth
- Batch jobs where you want per-task cost predictability, not per-call
- Any workload where you've historically hit `max_tokens` truncation and want the model to wrap instead

Bad fits:

- Single-turn prompts (use `max_tokens` directly)
- Latency-sensitive user-facing requests (the overhead of planning within a budget can slow the first token)
- Workloads where you already have deterministic tool caps (e.g., "max 3 searches, then synthesize")

## Sizing the budget

Do not guess. Instrument your current workload and pull the p99 total token cost (input + output + tool results) per task. Size the budget at `p99 × 1.2` to leave headroom.

```python
# Example sizing from historical Langfuse / observability data
p99_tokens = 95_000  # your number will differ
budget = max(20_000, int(p99_tokens * 1.2))  # 114,000 here
```

If you don't have historical data, run a week without budgets first, collect p99, then turn them on.

## Wrapper pattern

See `examples/budgeted_wrapper.py` for a thin wrapper that:

1. Adds the `task-budgets-2026-03-13` beta header automatically
2. Enforces the 20k minimum with a clear error
3. Makes the feature toggleable via an environment variable (kill switch)

The kill switch matters. A failing budget can silently degrade quality; you want one-flag disable without a redeploy.

## What task budgets do not do

- They do not cap your bill — `max_tokens` does. A runaway prompt with a large budget will still consume whatever the ceiling allows.
- They do not guarantee completion. The model may run out and return a partial result with a clear status.
- They are not a substitute for retry logic. If the task inherently needs more budget than you allocated, retry with a larger budget rather than expecting a smaller one to succeed next time.
