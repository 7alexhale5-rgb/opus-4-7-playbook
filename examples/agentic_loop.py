"""Agentic loop with tools, running at xhigh effort on Opus 4.7.

Pattern: the model calls tools, you execute them, feed results back, repeat
until the model returns a stop_reason of 'end_turn'. The Anthropic SDK's
typed tool-use blocks make the dispatch loop small.

Run:
    export ANTHROPIC_API_KEY=...
    pip install anthropic
    python examples/agentic_loop.py
"""
from __future__ import annotations
import json
from typing import Any

import anthropic

TOOLS: list[dict[str, Any]] = [
    {
        "name": "get_weather",
        "description": "Get current weather for a city.",
        "input_schema": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    },
]


def execute_tool(name: str, args: dict[str, Any]) -> str:
    """Dispatch a tool call. Replace with your real implementations."""
    if name == "get_weather":
        return json.dumps({"city": args["city"], "temp_c": 18, "conditions": "cloudy"})
    return json.dumps({"error": f"unknown tool: {name}"})


def run(prompt: str, max_iterations: int = 10) -> str:
    client = anthropic.Anthropic()
    messages: list[dict[str, Any]] = [{"role": "user", "content": prompt}]

    for _ in range(max_iterations):
        response = client.messages.create(
            model="claude-opus-4-7",
            max_tokens=64_000,
            thinking={"type": "adaptive"},
            output_config={"effort": "xhigh"},
            tools=TOOLS,
            messages=messages,
        )

        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "end_turn":
            # Collect final text
            return "".join(
                b.text for b in response.content if getattr(b, "type", None) == "text"
            )

        if response.stop_reason == "tool_use":
            tool_results: list[dict[str, Any]] = []
            for block in response.content:
                if block.type == "tool_use":
                    result = execute_tool(block.name, block.input)
                    tool_results.append(
                        {
                            "type": "tool_result",
                            "tool_use_id": block.id,
                            "content": result,
                        }
                    )
            messages.append({"role": "user", "content": tool_results})
            continue

        # Unknown stop reason — bail rather than loop forever
        return f"[stopped: {response.stop_reason}]"

    return "[max iterations reached without end_turn]"


if __name__ == "__main__":
    print(run("What's the weather in Paris? Then tell me what to wear."))
