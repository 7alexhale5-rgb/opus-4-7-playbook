# Carousel production lock (inputs)

| Input | Value |
|-------|--------|
| **IG handle** | `realalexhale` (footer: `@realalexhale`) |
| **Brand mark** | `PRETTYFLY` (top-left on every slide) |
| **Slide index** | `NN / 10` top-right, accent-tinted on active number |
| **Export 1×** | 1080 × 1350 PNG → `../export/png-1x/` |
| **Export 2×** | 2160 × 2700 PNG → `../export/png-2x/` (`deviceScaleFactor: 2`) |
| **Accent rotation** | cyan · amber · lime · rose · cyan · amber · rose · lime · cyan · cyan |
| **Typography** | Geist Variable (sans) + Geist Mono Variable (code) |
| **Code chrome** | macOS-style window (`TerminalWindow` component) |
| **Background** | dot texture + accent radial vignette (slide 10: grid + center glow) |

## Design anchors

- Every slide has a kicker eyebrow in the accent color above the headline
- Code slides get `TerminalWindow` chrome (title bar + traffic-light dots)
- Stats / comparisons get a dedicated data-viz component (bar chart on slide 4, gauge on slide 8)
- Brand mark + slide index persist on every slide for rhythm across the swipe

Source of truth for copy: [`../instagram-carousel.md`](../instagram-carousel.md).
Renderer entry: [`src/slides/SlideViews.tsx`](./src/slides/SlideViews.tsx).
