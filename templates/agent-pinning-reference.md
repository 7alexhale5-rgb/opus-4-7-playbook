# Agent / Subagent Model Pinning

If you maintain custom subagents (e.g. `~/.claude/agents/*.md`) or any workflow config that spawns Claude instances, pin explicit model IDs instead of aliases. Aliases are convenient but non-deterministic across Anthropic routing changes.

## Frontmatter pattern

Each agent definition has a YAML frontmatter block. The `model:` key takes either an alias or an explicit ID.

Prefer explicit IDs in production:

```yaml
---
name: my-agent
description: …
tools: Read, Glob, Grep, Write, Edit
model: claude-opus-4-7     # not `opus`
---
```

## Tier mapping

| Agent role | Model ID |
|---|---|
| Deep reasoning, architecture, review, research, security | `claude-opus-4-7` |
| Standard implementation, test writing, refactoring, stakeholder review | `claude-sonnet-4-6` |
| File search, quick fix, classification, background parallel work | `claude-haiku-4-5` |

## Rationale

Pinning makes the choice visible in version control. When a new model ships, you change the pin deliberately per agent rather than hoping an alias resolves to the right tier. You also avoid silent behavior shifts when Anthropic rebalances what `opus` / `sonnet` / `haiku` point to.

## Bulk swap (Unix)

From your agents directory:

```bash
# Opus-tier agents
for f in research.md architect.md implementer.md tester.md reviewer.md; do
  sed -i.bak 's/^model: opus$/model: claude-opus-4-7/' "$f"
done

# Haiku-tier
for f in scout.md quickfix.md; do
  sed -i.bak 's/^model: haiku$/model: claude-haiku-4-5/' "$f"
done

# Sonnet-tier
sed -i.bak 's/^model: sonnet$/model: claude-sonnet-4-6/' stakeholder-reviewer.md

# Verify
grep '^model:' *.md
```

Remove `.bak` files once verified.

## What to do at the next model release

When Opus 4.8 ships, decide per-agent whether to upgrade. Pinning forces the question instead of silently inheriting the upgrade. For production-critical paths this is a feature, not friction.
