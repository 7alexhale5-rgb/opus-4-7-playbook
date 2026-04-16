# Tokenizer Re-budgeting

Opus 4.7 ships a new tokenizer. The same input text produces 1.0–1.35× more tokens than on 4.6. The multiplier varies by content — code-heavy inputs tend toward the high end; prose tends lower.

This is a silent change. Your budgets look identical; your outputs truncate.

## What to do

1. **Raise `max_tokens` by ≥35%** vs the defaults you used on 4.6.
2. **Minimum `max_tokens` = 64,000** when running at `xhigh` or `max` effort.
3. **Re-budget your compaction triggers.** If you had "compact at 150K tokens," compact sooner — you'll hit it with less actual content.
4. **Audit client-side token estimators.** If you compute a pre-call estimate (e.g., to decide whether to split a request), re-measure against 4.7 responses. A stale estimator silently under-allocates.
5. **Watch image budgets separately.** Full-resolution images on 4.7 cost ~3× their 4.6 tokens (~4,784 per image at 2576 px). See `07-vision-3-75mp.md`.

## How to measure on your own traffic

Do not trust generic multipliers. Measure:

```python
# Run the same 50-100 representative prompts on both models
for prompt in corpus:
    r46 = client.messages.create(model="claude-opus-4-6", ...)
    r47 = client.messages.create(model="claude-opus-4-7", ...)
    print(prompt_id, r46.usage.input_tokens, r47.usage.input_tokens)
```

Compute the 50th and 95th percentile ratios. Use the 95th to set `max_tokens`. Use the 50th to set cost projections.

If you can't A/B, default to 35% headroom and monitor truncation-error rates in production for the first week.

## Cost implications

Per-MTok pricing is unchanged from 4.6. Your per-call cost goes up by the tokenizer ratio on the input side (and, if you cap outputs, potentially down slightly as the model calibrates length). Budget for the input delta, not a symmetric increase.

## What not to do

- Do not "just cut prompts in half" to get back to the old token counts. The model needed that context; removing it degrades output.
- Do not set `max_tokens` astronomically high "just in case." It's a ceiling, not a guarantee — but it does affect billing on some routes and confuses capacity planning.
- Do not assume the ratio is stable across workloads. Re-measure when you add a new feature or a new content domain.
