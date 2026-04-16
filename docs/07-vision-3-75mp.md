# Vision: 3.75 MP

Opus 4.7 is the first Claude with high-resolution image support: **2,576 px / 3.75 MP**, up from 1,568 px / 1.15 MP on 4.6. Coordinates are now 1:1 with actual pixels — no scale-factor math.

If you're doing computer use, chart/document understanding, screenshot analysis, or any workflow that returns bounding boxes, this changes your pipeline.

## What changed

| Dimension | 4.6 | 4.7 |
|---|---|---|
| Max edge | 1,568 px | 2,576 px |
| Max area | 1.15 MP | 3.75 MP |
| Coordinate system | scaled (needed conversion) | 1:1 with actual pixels |
| Tokens per full-res image | ~1,600 | ~4,784 |

## Remove your scale-factor math

If you had conversion code like:

```python
# 4.6 — scale bounding boxes back up to original image dimensions
scale = original_w / claude_w
x1_real = int(bbox.x1 * scale)
y1_real = int(bbox.y1 * scale)
```

Delete it. On 4.7 the returned coordinates are already in the original image's pixel space, as long as you pass the image at or below 2576 px on the max edge. If you downsample before sending, scale factors still apply — but most workloads stop downsampling now.

## Token budget implications

A full-resolution 2576 px image costs roughly 3× what a 4.6 full-res image cost (~4,784 vs ~1,600 tokens). If you process many images per request, this adds up quickly.

Rule of thumb:

- **Chart / document / screenshot analysis with detail matters:** pass full resolution, accept the cost
- **Gist-level summarization ("what's in this image"):** downsample to 1024–1568 px, cost drops to ~1,600–2,500 tokens with minimal quality loss for coarse tasks
- **Batch processing where the per-image answer is low-stakes:** downsample aggressively

## Where it matters most

- **Computer use.** Element detection accuracy and click-coordinate precision improve substantially at full resolution. The internal visual-acuity benchmark moved from 54.5% on 4.6 to 98.5% on 4.7 — largely driven by the resolution bump plus coordinate fidelity.
- **Chart and figure transcription.** Axis labels, legend text, data labels that were illegible at 1568 px are readable at 2576 px.
- **Document understanding.** Small print, footnotes, and table cell boundaries resolve correctly at full resolution.

## Gotchas

- **Aspect ratios and cropping.** The 2576 px cap is on the max edge, not the total dimension. A 2576×2576 image is 6.63 MP and may still be downsampled internally to fit the 3.75 MP area limit. Check the API response metadata if coordinate fidelity is critical.
- **Multiple images per message.** Each counts against your token budget independently. A 10-screenshot batch at full res is ~48,000 tokens of image input.
- **Non-JPEG / PNG formats.** Supported formats are unchanged; only the resolution ceiling moved.
