# LinkedIn Post

Long-form, engineering-leader angle. Less "hey look" energy than Twitter, more "here's what I changed and why."

Replace the first-person voice ("I") if posting under a different handle. Replace `{{IG_HANDLE}}` if cross-linking.

---

**Post body**

Anthropic shipped Claude Opus 4.7 yesterday. Five minutes into testing, I had five HTTP 400s in my SDK logs.

Opus 4.7 is not a drop-in for 4.6. It's a better model and a different contract. If you build on Anthropic's API, here's what to know before you ship the model swap on Monday.

**What breaks without warning:**

- `temperature`, `top_p`, `top_k` return 400. No deprecation period.
- `thinking: {type: "enabled", budget_tokens: N}` returns 400. Replaced by `{type: "adaptive"}` + a new `output_config.effort` parameter.
- Assistant-message prefill: gone.
- The `thinking.display` default silently flipped from shown to "omitted". If your UI streams reasoning to users, set `"summarized"` explicitly — otherwise the panel looks hung.
- Three beta headers retired. If you still pass them, remove.

**What's better:**

- New effort level `xhigh` between `high` and `max`. Intended default for coding and agentic loops. Significantly stronger self-verification. SWE-bench Verified moved from 80.8% on 4.6 to 87.6% on 4.7.
- Vision went from 1.15 MP to 3.75 MP. Coordinates are 1:1 with actual image pixels — you can delete scale-factor math from computer-use agents.
- Task budgets (public beta) let the model pace itself across a full agentic loop. Minimum 20k tokens. Messages API only.

**The silent-cost trap:**

4.7 ships a new tokenizer. Same prompt → 1.0–1.35× more tokens than on 4.6. Pricing per MTok is unchanged, but your `max_tokens` budget is effectively ~30% smaller. Raise it by at least 35% or you'll see truncation errors you never saw before.

**Prompt hygiene:**

4.7 calibrates response length natively and self-verifies more often. Scaffolding like "be concise" (at global scope), "after every 3 tool calls, summarize progress", and "double-check your work" is now noise, and in some cases actively degrades output. I audited my prompts and deleted more than I added.

**If you run Claude Code:**

I packaged everything I changed — operating notes, CARL rules, per-project snippets, agent model-pinning reference, interactive installer, working examples — into a free MIT-licensed kit:

github.com/7alexhale5-rgb/opus-4-7-playbook

Clone and run `bash migration/install.sh`. Each step is opt-in with a prompt.

If your team is on Anthropic, do your migration this week. The longer you run 4.6 in production, the more 4.7-tuned prompts and templates you'll have to re-verify later.

---

## Tags (LinkedIn allows freeform — pick 3-5)

`Anthropic` `Claude` `AI Engineering` `LLM` `Developer Tools`

## Posting notes

- Post Tuesday–Thursday 8–10am ET for engineering-audience reach
- Use a single image (the IG carousel slide 1 export works) or no image — LinkedIn text posts often outperform image posts for engineering content
- Engage replies within 2 hours of posting — algorithm rewards early engagement
- If you have a newsletter or substack, cross-post with a "subscribe for more" CTA at the end
