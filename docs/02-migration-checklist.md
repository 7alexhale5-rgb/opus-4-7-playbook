# Migration Checklist: 4.6 → 4.7

Work from top to bottom. Every item maps to a concrete edit.

## Code (Messages API)

- [ ] Swap model IDs: `claude-opus-4-6` → `claude-opus-4-7`
- [ ] Remove `temperature` from every call (returns 400 on 4.7)
- [ ] Remove `top_p` from every call
- [ ] Remove `top_k` from every call
- [ ] Replace `thinking: {type: "enabled", budget_tokens: N}` with `thinking: {type: "adaptive"}`
- [ ] Remove assistant-message prefills; move those instructions to the system prompt or use structured outputs
- [ ] Remove deprecated beta headers:
  - [ ] `effort-2025-11-24`
  - [ ] `interleaved-thinking-2025-05-14`
  - [ ] `fine-grained-tool-streaming-2025-05-14`
- [ ] Set `output_config.effort` explicitly per call — see `03-effort-levels.md`
- [ ] If you stream reasoning to users: set `thinking.display: "summarized"` (default is now `"omitted"`)
- [ ] Raise `max_tokens` by ≥35% vs prior defaults to absorb tokenizer inflation; minimum 64k at `xhigh` / `max`

## Prompts

- [ ] Delete global "be concise" and "keep it short" scaffolding — length calibrates natively now
- [ ] Delete forced progress-update scaffolding ("report progress every N tool calls")
- [ ] Keep skill-specific instructions that serve a narrow purpose (e.g., "no preamble" for an extraction step)
- [ ] Audit any prompt that relies on the model generalizing from one item to another — make each intended item explicit
- [ ] If you prompt "double-check your work" at the end of long traces, consider removing; 4.7 self-verifies more often

## Images

- [ ] If you downsampled to ≤1568 px previously, decide whether to pass full resolution now (up to 2576 px / 3.75 MP)
- [ ] Remove scale-factor coordinate math — bounding boxes are now 1:1 with actual pixels
- [ ] Budget ~4,784 tokens per full-resolution image (~3× the 4.6 cost); downsample if you don't need the fidelity

## Agentic loops (optional — opt in)

- [ ] Decide whether to adopt `task_budget` (public beta). See `06-task-budgets.md`.
- [ ] If yes: add beta header `task-budgets-2026-03-13` and size the budget from observed p99 × 1.2, minimum 20k.
- [ ] Wrap with a kill switch (env var or feature flag) so you can disable without redeploying.

## Claude Code users (if applicable)

- [ ] If you maintain custom subagents (`~/.claude/agents/*.md`), pin `model:` lines to explicit IDs (`claude-opus-4-7`, `claude-sonnet-4-6`, `claude-haiku-4-5`) instead of aliases
- [ ] If you have CARL / memory / prompt-inject files, add an Opus 4.7 behavior section so future sessions don't regress on the breaking-change rules
- [ ] Default Claude Code effort is now `xhigh`. Set it explicitly in scripts / CI invocations if you ever bypass the IDE.

## Verification

- [ ] Run your test suite before and after the swap; diff failures
- [ ] Pick a canonical task (a representative prompt + expected output shape) and compare 4.6 vs 4.7 on tool-call count, output length, and quality
- [ ] For production: 24h observation on logs (error rates, cost per task) before declaring the migration done
- [ ] If cost per task moves >1.3× at equivalent workload, investigate tokenizer impact before retuning prompts

## Shortcut (Claude Code)

```
/claude-api migrate this project to claude-opus-4-7
```

The bundled `claude-api` skill automates most of the Messages-API edits above. You still review the prompt changes by hand.
