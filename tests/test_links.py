#!/usr/bin/env python3
"""Verify every internal markdown link resolves. External URLs are reported
but not treated as failures (no network in CI by default)."""
from __future__ import annotations
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)\s]+)\)")

def main() -> int:
    failed = 0
    total_internal = 0
    for md in ROOT.rglob("*.md"):
        if ".git" in md.parts:
            continue
        text = md.read_text(encoding="utf-8", errors="ignore")
        for match in LINK_RE.finditer(text):
            target = match.group(1).split("#", 1)[0]
            if not target:
                continue
            if target.startswith(("http://", "https://", "mailto:")):
                continue
            total_internal += 1
            # Resolve relative to the markdown file's directory
            abs_target = (md.parent / target).resolve()
            if not abs_target.exists():
                # Allow pointer-only references like ~/foo that the reader would install
                if target.startswith("~/"):
                    continue
                print(f"BROKEN LINK: {md.relative_to(ROOT)} -> {target}")
                failed += 1
    print(f"links: checked {total_internal} internal, {failed} broken")
    return 0 if failed == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
