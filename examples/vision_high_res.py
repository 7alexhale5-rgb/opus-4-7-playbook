"""Vision call on Opus 4.7 at full resolution (up to 2576 px).

Returned bounding boxes / coordinates are 1:1 with the original image pixels.
No scale-factor math needed. Budget ~4,784 tokens per full-res image.

Run:
    export ANTHROPIC_API_KEY=...
    pip install anthropic
    python examples/vision_high_res.py path/to/image.png
"""
from __future__ import annotations
import base64
import mimetypes
import sys
from pathlib import Path

import anthropic


def image_to_source(path: Path) -> dict:
    """Build the `source` block expected by the Messages API."""
    mime, _ = mimetypes.guess_type(path.name)
    if mime is None:
        # Default to png; adjust if you handle additional formats
        mime = "image/png"
    data = base64.standard_b64encode(path.read_bytes()).decode("ascii")
    return {"type": "base64", "media_type": mime, "data": data}


def main(image_path: str) -> None:
    path = Path(image_path).expanduser().resolve()
    if not path.exists():
        raise FileNotFoundError(path)

    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=16_000,
        thinking={"type": "adaptive"},
        output_config={"effort": "xhigh"},
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "image", "source": image_to_source(path)},
                    {
                        "type": "text",
                        "text": (
                            "Describe the image in detail. If there are distinct "
                            "regions, return their bounding boxes as pixel-exact "
                            "(x1, y1, x2, y2) tuples in the original image space."
                        ),
                    },
                ],
            }
        ],
    )
    for block in response.content:
        if getattr(block, "type", None) == "text":
            print(block.text)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("usage: python vision_high_res.py path/to/image.png")
        sys.exit(2)
    main(sys.argv[1])
