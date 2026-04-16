# Adaptive Thinking

On Opus 4.7, adaptive thinking is the only thinking mode. The `{type: "enabled", budget_tokens: N}` shape used on 4.6 now returns HTTP 400. Depth is controlled through effort, not a budget integer.

## The new shape

```python
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=64000,
    thinking={"type": "adaptive"},
    output_config={"effort": "xhigh"},
    messages=[...],
)
```

The adaptive mode decides per turn how much to think. Effort biases that decision. You do not hand-tune a token budget anymore.

## The silent default that bites

`thinking.display` now defaults to `"omitted"` on 4.7 — thinking content is not returned to the client unless you ask for it. On 4.6 it was shown.

If you have a UI that surfaces reasoning (a "thinking…" panel, a streaming trace, a transparency view), **set `display: "summarized"` explicitly** or your UI will look hung.

```python
thinking={"type": "adaptive", "display": "summarized"}
```

Three values are available:

| Value | Behavior |
|---|---|
| `"omitted"` (default) | Thinking blocks not returned |
| `"summarized"` | Model returns periodic summaries suitable for a user-facing trace |
| `"detailed"` | Full thinking returned (higher token cost, rarely needed for product UIs) |

## What to do with the `budget_tokens` you used to pass

Delete it. Replace the intent with effort:

| Old 4.6 intent | New 4.7 equivalent |
|---|---|
| `budget_tokens: 4000` (quick reasoning) | `effort: "high"` |
| `budget_tokens: 16000` (deep reasoning) | `effort: "xhigh"` |
| `budget_tokens: 32000` (maximum thinking) | `effort: "max"` |

These are rough mappings. Measure your own traffic; do not assume linear equivalence.

## Streaming considerations

When streaming with `display: "summarized"`, the thinking events arrive in the stream before output events, same as before. Your stream handler can distinguish them via `type`. If you have an adaptor that routed `thinking_delta` events, it still works — only the gate (returned vs omitted) changed.

## When adaptive thinking is "off"

There is no "off" on 4.7 for Opus calls — the model internally reasons either way. What changed is whether the reasoning is visible in the response. Sending `{type: "adaptive"}` with `display: "omitted"` is functionally equivalent to not requesting thinking on earlier models for clients that never consumed thinking blocks.
