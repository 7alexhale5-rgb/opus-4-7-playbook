# Twitter / X Thread — 10 tweets

Mirrors the IG carousel. Same arc, punchier for Twitter.

Replace `{{IG_HANDLE}}` or remove the line. Replace the first-person voice ("I") if you're not posting under your own handle.

---

**Tweet 1 (hook)**

Anthropic shipped Opus 4.7 yesterday.

If you run an SDK app, 5 request shapes that worked on 4.6 now return HTTP 400. Plus a silent default that makes streaming UIs look hung.

Thread on what changed and how to fix it 🧵

---

**Tweet 2**

The 5 things that now 400 on Opus 4.7:

```
1. temperature
2. top_p
3. top_k
4. thinking: {budget_tokens: N}
5. assistant prefill
```

No migration flag. No deprecation warning. Just remove them.

---

**Tweet 3**

New effort level: `xhigh`.

Slots between `high` and `max`. Intended default for coding, agentic loops, repeated tool calls.

```python
output_config={"effort": "xhigh"}
```

API default is still `high`. Set it explicitly in scripts and CI.

---

**Tweet 4**

4.7 has a new tokenizer. Same prompt produces 1.0–1.35x more tokens than 4.6.

Raise `max_tokens` by at least 35% or your output truncates. Minimum 64,000 at `xhigh` or `max`.

This one bit me. Measure on your own traffic before retuning.

---

**Tweet 5**

Thinking rewrite:

```diff
- thinking={"type": "enabled", "budget_tokens": 8000}
+ thinking={"type": "adaptive"}
+ output_config={"effort": "xhigh"}
```

Adaptive is the only mode now. Effort controls depth. The integer budget is gone.

---

**Tweet 6**

Silent default change: `thinking.display` flipped from shown to "omitted".

If your UI streams reasoning, set:

```python
thinking={"type": "adaptive", "display": "summarized"}
```

Or users watch a blank "thinking…" panel for 30 seconds.

---

**Tweet 7**

Prompt hygiene — delete these:

- "be concise" at global scope
- "after every N tool calls, report progress"
- "double-check your work"

4.7 calibrates length and self-verifies. Your scaffolding is now noise.

---

**Tweet 8**

Task budgets (public beta): the model paces itself across an entire agentic loop, not just one response.

```python
output_config={
  "effort": "xhigh",
  "task_budget": {"type": "tokens", "total": 128000},
}
betas=["task-budgets-2026-03-13"]
```

Min 20k. Messages API only.

---

**Tweet 9**

Vision got 3.75MP (up from 1.15MP) with 1:1 pixel coordinates.

Delete your scale-factor math. Budget ~4,784 tokens per full-res image (~3x the old cost). Huge for computer-use agents and document understanding.

---

**Tweet 10 (CTA)**

Full migration kit — docs, templates, working examples, interactive installer:

github.com/7alexhale5-rgb/opus-4-7-playbook

MIT. One `bash migration/install.sh` gets your Claude Code env aligned. Star it if useful.

---

## Posting notes

- Post tweet 1 with a strong visual (the IG slide 1 export works). Subsequent tweets can run text-only or with the corresponding carousel frame.
- Keep each tweet under 280 chars — some of these are close. Cut filler if you hit the wall.
- Reply-chain order matters. Don't orphan tweets.
- Pin tweet 1 for 48 hours.
- Cross-post tweet 1 to LinkedIn with a "full thread here" link, or use the dedicated LinkedIn post.
