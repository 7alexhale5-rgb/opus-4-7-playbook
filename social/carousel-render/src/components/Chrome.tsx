import { BRAND_NAME, FOOTER_LABEL } from "../config";

type ChromeProps = {
  slideIndex: number;
  totalSlides: number;
  showSwipe: boolean;
  accent: string;
};

/**
 * Persistent chrome on every slide: brand mark (top-left), slide index (top-right),
 * footer handle (bottom-left), swipe indicator (bottom-right).
 *
 * Designed to sit outside the content flex so slides can use their full frame
 * without thinking about these elements.
 */
export function Chrome({
  slideIndex,
  totalSlides,
  showSwipe,
  accent,
}: ChromeProps) {
  const indexStr = slideIndex.toString().padStart(2, "0");
  const totalStr = totalSlides.toString().padStart(2, "0");

  return (
    <>
      {/* Top row — brand + slide index */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-14 pt-12">
        <div className="flex items-center gap-3">
          <span
            className="h-[3px] w-8 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="font-sans text-[13px] font-semibold tracking-[0.32em] text-zinc-400">
            {BRAND_NAME}
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[14px] tabular-nums text-zinc-500">
          <span style={{ color: accent }}>{indexStr}</span>
          <span className="text-zinc-700">/</span>
          <span>{totalStr}</span>
        </div>
      </div>

      {/* Bottom row — footer handle + swipe */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-14 pb-10 pt-6"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0) 100%)",
        }}
      >
        <p className="font-mono text-[15px] leading-none tracking-tight text-zinc-500">
          {FOOTER_LABEL}
        </p>
        {showSwipe ? (
          <span
            className="flex items-center gap-2 font-mono text-[16px] font-semibold tabular-nums"
            style={{ color: accent }}
          >
            <span className="text-zinc-500">swipe</span>
            <span>›››</span>
          </span>
        ) : (
          <span className="w-8" aria-hidden />
        )}
      </div>
    </>
  );
}
