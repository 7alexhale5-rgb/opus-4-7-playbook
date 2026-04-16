import type { ReactNode } from "react";
import { Chrome } from "./Chrome";

type SlideCanvasProps = {
  accent: string;
  slideIndex: number;
  totalSlides?: number;
  showSwipe?: boolean;
  /** Subtle accent-tinted radial vignette at frame edges. Default on. */
  vignette?: boolean;
  /** Low-opacity dot texture. Default on. Adds depth without noise. */
  dotTexture?: boolean;
  /** Overriding background (e.g. a grid) used on specific slides. */
  backgroundStyle?: React.CSSProperties;
  children: ReactNode;
};

/**
 * The one-frame container. All slides mount inside this.
 *
 * Composition order (back → front):
 *   1. Base: near-black (#0A0A0A)
 *   2. Optional custom backgroundStyle layer (grid, etc.)
 *   3. Dot texture (SVG-as-CSS, low opacity)
 *   4. Accent vignette (radial gradients at top-right + bottom-left)
 *   5. Content (padded, respects chrome safe-zones)
 *   6. Chrome (brand, slide index, handle, swipe)
 */
export function SlideCanvas({
  accent,
  slideIndex,
  totalSlides = 10,
  showSwipe = true,
  vignette = true,
  dotTexture = true,
  backgroundStyle,
  children,
}: SlideCanvasProps) {
  return (
    <div
      className="relative box-border overflow-hidden bg-[#0A0A0A] text-zinc-100"
      style={{
        width: 1080,
        height: 1350,
        ...(backgroundStyle ?? {}),
      }}
    >
      {/* Dot texture — subtle, consistent across slides */}
      {dotTexture ? (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      ) : null}

      {/* Accent vignette — creates depth at frame edges in the slide's accent color */}
      {vignette ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: `radial-gradient(ellipse at 85% 15%, ${accent}14 0%, transparent 50%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: `radial-gradient(ellipse at 15% 88%, ${accent}10 0%, transparent 45%)`,
            }}
          />
        </>
      ) : null}

      {/* Content — respects top (brand row) and bottom (footer row) safe zones */}
      <div className="relative z-10 box-border flex h-full w-full flex-col px-14 pb-[110px] pt-[118px]">
        {children}
      </div>

      {/* Chrome layer — always on top */}
      <Chrome
        slideIndex={slideIndex}
        totalSlides={totalSlides}
        showSwipe={showSwipe}
        accent={accent}
      />
    </div>
  );
}
