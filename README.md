# Opus 4.7 Playbook

> Ship-ready migration kit for Anthropic's new Opus 4.7 model — breaking changes, new effort levels, tokenizer re-budgeting, task budgets, and drop-in config templates. Works with direct SDK code and with Claude Code environments.

Opus 4.7 went GA on 2026-04-16. Five API params return HTTP 400 on 4.7 that were fine on 4.6. One silent default change will make your streaming UI look hung. A new tokenizer quietly uses up to 35% more tokens per request. The playbook is everything you need to ship the migration in an afternoon.

## TL;DR

- `temperature`, `top_p`, `top_k`, `budget_tokens`, and assistant prefill all return 400 now. Remove them.
- Replace `thinking: {type: "enabled", budget_tokens: N}` with `thinking: {type: "adaptive"}`. Depth is controlled by `output_config.effort` — new levels `low / medium / high / xhigh / max`.
- If your UI streams reasoning, set `thinking.display: "summarized"` — the default just became `"omitted"`.
- Raise `max_tokens` by at least 35% to absorb the new tokenizer. Minimum 64,000 at `xhigh` / `max`.
- `xhigh` is the new default for coding and agentic work. `max` often overthinks structured outputs.
- Task budgets (beta) let the model pace itself across a full agentic loop. Messages API only. Opt-in.

Full breaking-change detail: [`docs/01-whats-new.md`](docs/01-whats-new.md).
Full checklist: [`docs/02-migration-checklist.md`](docs/02-migration-checklist.md).

## The 30-second migration

```python
# Before (4.6)
client.messages.create(
    model="claude-opus-4-6",
    max_tokens=32_000,
    temperature=0.7,                                 # remove
    thinking={"type": "enabled", "budget_tokens": 8_000},   # replace
    messages=[...],
)

# After (4.7)
client.messages.create(
    model="claude-opus-4-7",
    max_tokens=64_000,                               # +35% headroom
    thinking={"type": "adaptive"},                   # no budget_tokens
    output_config={"effort": "xhigh"},               # depth control
    messages=[...],
)
```

That is the minimum diff. It is also sufficient for most codebases. See [`examples/minimal_call.py`](examples/minimal_call.py) for the runnable version and [`examples/agentic_loop.py`](examples/agentic_loop.py) for the tool-calling pattern.

## Quick install (Claude Code users)

If you run Claude Code and want the operating notes, CARL rules, and global pointer in your environment:

```bash
git clone https://github.com/7alexhale5-rgb/opus-4-7-playbook
cd opus-4-7-playbook
bash migration/install.sh     # interactive — nothing installs without a prompt
```

What it offers (each step is opt-in):

1. Drops [`templates/operating-notes.md`](templates/operating-notes.md) into `~/.claude/references/`
2. Installs the [`templates/carl-opus-4-7`](templates/carl-opus-4-7) CARL domain (if you use CARL)
3. Appends the [`templates/CLAUDE-md-global-snippet.md`](templates/CLAUDE-md-global-snippet.md) pointer to your global CLAUDE.md

For per-project config, copy [`templates/CLAUDE-md-project-snippet.md`](templates/CLAUDE-md-project-snippet.md) into each project's CLAUDE.md.

If you don't run Claude Code, the docs are still the fastest migration reference on the internet — start with [`docs/02-migration-checklist.md`](docs/02-migration-checklist.md) and work top-to-bottom.

## What's in this repo

| Path | What |
|---|---|
| [`docs/`](docs/) | Migration checklist, effort-level rubric, adaptive thinking, tokenizer re-budgeting, task budgets, vision at 3.75 MP |
| [`templates/`](templates/) | Copy-paste config for Claude Code: operating notes, CARL domain, global + project CLAUDE.md snippets, agent-pinning reference |
| [`examples/`](examples/) | Runnable Python — minimal call, agentic loop, task-budget wrapper, full-resolution vision |
| [`migration/`](migration/) | Shell scripts — pin agent model IDs, scan a repo for deprecated params, interactive installer |
| [`social/`](social/) | Instagram carousel, Twitter thread, LinkedIn post — use as-is or adapt |
| [`tests/`](tests/) | CI-enforced sanitization, code-syntax, and link checks |

## Who this is for

- Engineers with an Anthropic SDK app that needs to move to 4.7 this week
- Claude Code users who want their subagents and skills aligned to the new model's strengths
- Agents / builders who want a spec-complete reference instead of reading five docs pages to find one API shape

## Sources

Every factual claim in the docs cites Anthropic's primary sources:

- [Migration guide](https://platform.claude.com/docs/en/about-claude/models/migration-guide)
- [Model overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking)
- [Effort](https://platform.claude.com/docs/en/build-with-claude/effort)
- [Task budgets](https://platform.claude.com/docs/en/build-with-claude/task-budgets)
- [Release post](https://www.anthropic.com/news/claude-opus-4-7)

## Contributing

PRs welcome. Two hard rules:

1. `bash tests/run_all.sh` must pass locally before you open a PR.
2. No personal / proprietary references — the sanitization test blocks them in CI.

## License

MIT. See [LICENSE](LICENSE).

---

Built by [Alex Hale](https://github.com/7alexhale5-rgb) / [PrettyFly](https://prettyflyforai.com). If this kit saves you a day, say hi.
