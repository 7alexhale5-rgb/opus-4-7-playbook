"""Minimal Opus 4.7 call. The smallest shape that runs on the current SDK.

Run:
    export ANTHROPIC_API_KEY=...
    pip install anthropic
    python examples/minimal_call.py
"""
from __future__ import annotations
import anthropic


def main() -> None:
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=64_000,                  # >=64k at xhigh/max
        thinking={"type": "adaptive"},      # adaptive is the only mode on 4.7
        output_config={"effort": "high"},   # raise to "xhigh" for coding/agentic work
        messages=[{"role": "user", "content": "What is the capital of France?"}],
    )
    # Note: no `temperature`, `top_p`, `top_k`, `budget_tokens`, or prefill —
    # each of those returns HTTP 400 on Opus 4.7.
    for block in response.content:
        if block.type == "text":
            print(block.text)


if __name__ == "__main__":
    main()
