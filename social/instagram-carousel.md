# Instagram Carousel — 10 slides

Built to stop-the-scroll for engineers. Each slide: one idea, high-contrast, scannable in under 2 seconds.

**Global visual direction**

- Dark theme, off-black background (`#0A0A0A`) or deep navy. Avoid pure `#000`.
- One accent color per slide — rotate across the carousel for rhythm. Suggested: cyan `#22D3EE`, amber `#F59E0B`, lime `#A3E635`, rose `#F43F5E`.
- Heavy-weight sans-serif for the hook (Geist, Inter Black, Söhne Mighty). Mono (JetBrains Mono, Berkeley Mono) for code.
- Consistent 1080×1350 (4:5 ratio — IG's best real estate).
- Edge-to-edge number-as-art for stat slides. Code slides: code block fills 60% of the frame.
- Leave a 120 px safe zone at bottom for IG's CTA overlays.

**Author byline on every slide**
Small mono footer, bottom-left: `@{{IG_HANDLE}} · opus 4.7 playbook`.

**Swipe indicator**
Small ">>" in the bottom-right corner of slides 1–9. Slide 10 shows the CTA instead.

---

## Slide 1 — HOOK

**Background:** off-black. One large number in an accent color (e.g., cyan).

**Main text (top, huge):**
> Your Anthropic SDK is already throwing 400s on Opus 4.7.

**Sub (middle, medium weight):**
> Five request shapes that worked yesterday return an error today. Swipe for the fix.

**Visual anchor (bottom):** oversized `400` rendered in mono, cyan, filling the lower half.

---

## Slide 2 — THE FIVE

**Background:** dark, accent amber.

**Headline (top):**
> 5 things that now return 400

**Body (numbered list, each on its own line, mono):**
1. `temperature`
2. `top_p`
3. `top_k`
4. `thinking: {budget_tokens}`
5. assistant prefill

**Footer (small):**
> Remove them. No migration flags. They're gone.

---

## Slide 3 — THE NEW KNOB

**Background:** dark, accent lime.

**Headline:**
> Meet `xhigh`.

**Body (staircase graphic, 5 steps labelled):**
```
max    ← frontier problems only
xhigh  ← NEW. default for coding / agentic
high   ← API default
medium ← cost-sensitive
low    ← latency-sensitive
```

**Footer:**
> `output_config: {"effort": "xhigh"}` — no `budget_tokens` anymore.

---

## Slide 4 — THE SILENT COST

**Background:** dark, accent rose.

**Headline (two-line, big):**
> New tokenizer.
> Your budgets are wrong.

**Body:**
> Same prompt → 1.0–1.35× more tokens on 4.7.
>
> Raise `max_tokens` by **≥35%**.
> Minimum **64,000** at `xhigh` or `max`.

**Visual:** two stacked bars, labeled "4.6" and "4.7", the 4.7 bar visibly longer with `+35%` callout.

---

## Slide 5 — ADAPTIVE IS THE ONLY MODE

**Background:** dark, accent cyan. Code-forward slide.

**Headline (small, top):**
> Thinking rewrite:

**Code block (mono, large, centered):**
```diff
- thinking={"type": "enabled", "budget_tokens": 8000}
+ thinking={"type": "adaptive"}
+ output_config={"effort": "xhigh"}
```

**Footer:**
> Effort replaces the integer dial. Simpler. Strict on `low` / `medium`.

---

## Slide 6 — DELETE YOUR SCAFFOLDING

**Background:** dark, accent amber.

**Headline:**
> Things to remove from your prompts.

**Body (three crossed-out lines, strike-through visual):**
> ~~"Be concise."~~
> ~~"After every 3 tool calls, summarize."~~
> ~~"Double-check your work."~~

**Footer:**
> 4.7 calibrates length and self-verifies. More scaffolding = worse output.

---

## Slide 7 — THE UI THAT LOOKS HUNG

**Background:** dark, accent rose.

**Headline:**
> Silent default: thinking is now hidden.

**Body:**
> `thinking.display` flipped from shown → `"omitted"`.
>
> If your UI streams reasoning, set:
>
> ```python
> thinking={"type": "adaptive", "display": "summarized"}
> ```
>
> Or your users see a blank "thinking…" panel for 30 seconds.

---

## Slide 8 — TASK BUDGETS (beta)

**Background:** dark, accent lime.

**Headline:**
> The model can pace itself now.

**Body:**
> Advisory token countdown across a full agentic loop. Min 20k.
>
> ```python
> output_config={
>   "effort": "xhigh",
>   "task_budget": {"type": "tokens", "total": 128000},
> }
> betas=["task-budgets-2026-03-13"]
> ```
>
> Messages API only. Not on Claude Code / Cowork yet.

---

## Slide 9 — IF YOU RUN CLAUDE CODE

**Background:** dark, accent cyan.

**Headline:**
> Claude Code tune-up (30 min).

**Numbered body (mono, tight):**
1. Pin subagent `model:` lines to `claude-opus-4-7` / `claude-sonnet-4-6` / `claude-haiku-4-5`.
2. Drop the operating-notes file into `~/.claude/references/`.
3. Add the Opus 4.7 section to your global CLAUDE.md.
4. If you use CARL: add the `opus-4-7` domain + `ALWAYS_ON=true`.

**Footer:**
> Templates + interactive installer in the repo.

---

## Slide 10 — CTA

**Background:** off-black with a subtle grid (like engineering graph paper). Accent: cyan.

**Headline (huge, centered):**
> Full playbook.

**Body (centered):**
> Docs. Templates. Working examples. Migration scripts.
>
> ```
> github.com/7alexhale5-rgb/opus-4-7-playbook
> ```
>
> Star it. Clone it. Use it.

**Below the URL, small:**
> Follow **@{{IG_HANDLE}}** — daily engineering notes from building with Claude.

**Bottom corner:** small PrettyFly wordmark.

---

## Caption (post body)

Opus 4.7 shipped yesterday. Here's what actually changed for people building on the API — 10 slides of breaking changes, new knobs, and the silent defaults that will break your app if you ship blind.

Full playbook (free, MIT, docs + templates + working examples):
github.com/7alexhale5-rgb/opus-4-7-playbook

→ Save this. You'll want it when you migrate.

**Hashtags** (use some, not all — IG caps at 30 but 8–15 performs best):

`#Anthropic #ClaudeAI #ClaudeOpus #AIEngineering #LLM #ArtificialIntelligence #MachineLearning #SoftwareEngineering #DeveloperTools #AI #GenerativeAI #BuildInPublic #Startups #TechTwitter #CodingLife`

---

## Notes for production

- Build all 10 in one Figma file, 1080×1350 artboards, consistent grid, shared text styles
- Export each as PNG @ 2x for retina
- Stage in drafts before posting — IG carousels can't be edited order-wise once published
- Post at 10am–noon ET or 7–9pm ET on weekdays for dev-community reach
- Follow up with the Twitter thread within 1 hour of IG — people who see it on IG will search for more
