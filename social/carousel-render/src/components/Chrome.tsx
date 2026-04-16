import { FOOTER_LABEL } from "../config";

type ChromeProps = {
  showSwipe: boolean;
  swipeTint: string;
};

export function Chrome({ showSwipe, swipeTint }: ChromeProps) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-14 pb-12 pt-8"
      style={{
        background:
          "linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 100%)",
      }}
    >
      <p className="max-w-[70%] font-mono text-[17px] leading-tight tracking-tight text-zinc-500">
        {FOOTER_LABEL}
      </p>
      {showSwipe ? (
        <span
          className="font-mono text-[20px] font-semibold tabular-nums"
          style={{ color: swipeTint, opacity: 0.85 }}
        >
          &gt;&gt;
        </span>
      ) : (
        <span className="w-8" aria-hidden />
      )}
    </div>
  );
}
