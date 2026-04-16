"""Thin wrapper that adds the Opus 4.7 task-budgets beta to any Messages call.

Features:
    - Injects the `task-budgets-2026-03-13` beta header automatically
    - Enforces the 20,000-token minimum with a clear error
    - Kill switch via the ANTHROPIC_TASK_BUDGET env var: set to empty
      string or "0" to disable the feature without a code change
    - Respects `remaining` when resuming a paused loop
    - Drop-in: same keyword args as client.messages.create()

Run:
    export ANTHROPIC_API_KEY=...
    export ANTHROPIC_TASK_BUDGET_TOKENS=128000   # or leave unset to disable
    pip install anthropic
    python examples/budgeted_wrapper.py
"""
from __future__ import annotations
import os
from typing import Any, Optional

import anthropic

BETA_HEADER = "task-budgets-2026-03-13"
MIN_BUDGET_TOKENS = 20_000


def _budget_from_env() -> Optional[int]:
    raw = os.environ.get("ANTHROPIC_TASK_BUDGET_TOKENS", "").strip()
    if not raw or raw == "0":
        return None
    value = int(raw)
    if value < MIN_BUDGET_TOKENS:
        raise ValueError(
            f"ANTHROPIC_TASK_BUDGET_TOKENS={value} is below the minimum "
            f"({MIN_BUDGET_TOKENS}). Raise the env var or unset to disable."
        )
    return value


def budgeted_create(
    client: anthropic.Anthropic,
    *,
    messages: list[dict[str, Any]],
    model: str = "claude-opus-4-7",
    max_tokens: int = 128_000,
    effort: str = "xhigh",
    task_budget_tokens: Optional[int] = None,
    remaining: Optional[int] = None,
    **kwargs: Any,
) -> Any:
    """Issue a Messages call with optional task_budget.

    If task_budget_tokens is None, reads from ANTHROPIC_TASK_BUDGET_TOKENS.
    If the env var is unset or zero, calls without a budget (kill switch).
    """
    budget = task_budget_tokens if task_budget_tokens is not None else _budget_from_env()

    output_config: dict[str, Any] = {"effort": effort}
    betas: list[str] = list(kwargs.pop("betas", []))

    if budget is not None:
        if budget < MIN_BUDGET_TOKENS:
            raise ValueError(
                f"task_budget_tokens={budget} is below the minimum ({MIN_BUDGET_TOKENS})."
            )
        task_budget: dict[str, Any] = {"type": "tokens", "total": budget}
        if remaining is not None:
            task_budget["remaining"] = remaining
        output_config["task_budget"] = task_budget
        if BETA_HEADER not in betas:
            betas.append(BETA_HEADER)

        return client.beta.messages.create(
            model=model,
            max_tokens=max_tokens,
            output_config=output_config,
            messages=messages,
            betas=betas,
            **kwargs,
        )

    # Kill-switch path — regular Messages API, no betas
    return client.messages.create(
        model=model,
        max_tokens=max_tokens,
        output_config=output_config,
        messages=messages,
        **kwargs,
    )


if __name__ == "__main__":
    client = anthropic.Anthropic()
    response = budgeted_create(
        client,
        messages=[{"role": "user", "content": "Plan a 3-step research loop on a topic of your choice."}],
    )
    for block in response.content:
        if getattr(block, "type", None) == "text":
            print(block.text)
