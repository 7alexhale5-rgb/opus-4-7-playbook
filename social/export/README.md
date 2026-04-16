# Instagram carousel exports

PNG sets generated from [`../carousel-render`](../carousel-render) (Geist fonts, 1080×1350 layout).

| Folder | Size | Use |
|--------|------|-----|
| `png-1x/` | 1080 × 1350 | Upload to Instagram / Facebook carousels |
| `png-2x/` | 2160 × 2700 | Archival / sharper source before platform compression |

Files are ordered: `carousel-01-hook.png` … `carousel-10-cta.png`.

## Regenerate

```bash
cd social/carousel-render
npm install
npx playwright install chromium   # once per machine
npm run export
```

Production handle and export notes: [`../carousel-render/LOCK.md`](../carousel-render/LOCK.md).

Caption and hashtags: [`../instagram-carousel.md`](../instagram-carousel.md) (Caption section).
