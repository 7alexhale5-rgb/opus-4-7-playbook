# Carousel PNG renderer

React + Vite + Tailwind. Each slide is a fixed **1080×1350** frame; `?slide=1…10` selects the slide; **`embed=1`** removes dev chrome for exports.

```bash
npm install
npx playwright install chromium
npm run dev              # preview at http://localhost:5173/?slide=1
npm run export           # build + write PNGs to ../export/png-1x and ../export/png-2x
```

Design tokens and typography: [`DESIGN_BRIEF.md`](DESIGN_BRIEF.md). Handle / export targets: [`LOCK.md`](LOCK.md).
