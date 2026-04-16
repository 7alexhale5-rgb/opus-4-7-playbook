# DESIGN_BRIEF — Opus 4.7 Instagram carousel (code export)

## Canvas

- **Logical size:** 1080 × 1350 px (4:5).
- **Exports:** 1× PNG at viewport 1080×1350; 2× PNG via Playwright `deviceScaleFactor: 2` (output 2160×2700).

## Color

- **Background:** `#0A0A0A` (slides 1–9); slide 10 same base with cyan grid overlay.
- **Accents (rotate):**
  - Cyan `#22D3EE` — slides 1, 5, 9, 10 accent
  - Amber `#F59E0B` — slides 2, 6
  - Lime `#A3E635` — slides 3, 8
  - Rose `#F43F5E` — slides 4, 7
- **Text:** primary `#f4f4f5`, secondary `#a1a1aa`, body muted `#71717a` where needed.

## Typography (ua-ux alignment)

- **UI / hooks:** Geist Variable (sans), heavy weights for headlines.
- **Code / lists / footer:** Geist Mono Variable.
- **Scale (logical px):** hook 52–56, headline 40–44, sub 26–28, body 22–24, code 20–26 depending on slide, footer 18px mono.

## Layout

- **Horizontal padding:** 56 px.
- **Top padding:** 64 px for text-first slides; code-forward slides adjust for vertical centering.
- **Safe zone:** reserve **120 px** at bottom for IG UI; chrome (footer + swipe) sits in the lower band with `padding-bottom: 48px` from canvas bottom, footer text above the riskiest overlap zone.

## Chrome (every slide)

- **Footer left (mono, 18px, tertiary color):** `@prettyflyforai · opus 4.7 playbook`
- **Swipe:** `>>` bottom-right slides 1–9 (18px mono, accent at 70% opacity).
- **Slide 10:** no `>>`; CTA block + PrettyFly wordmark.

## Slide-specific

| # | Key visual |
|---|------------|
| 1 | Giant `400` in mono, accent cyan, lower half |
| 2 | Numbered mono list, amber headline |
| 3 | 5-step ladder, lime |
| 4 | Two-bar comparison + `+35%` callout, rose |
| 5 | Diff block ~60% frame height, cyan |
| 6 | Three struck lines, amber |
| 7 | Body + Python snippet in rose |
| 8 | Task budget Python block, lime |
| 9 | Four-step mono list, cyan |
| 10 | Graph-paper grid, centered CTA, URL block, wordmark |

## Quality gates

- sRGB, opaque PNG.
- `document.fonts.ready` before screenshot.
- Copy matches `instagram-carousel.md` (ASCII quotes in code).
