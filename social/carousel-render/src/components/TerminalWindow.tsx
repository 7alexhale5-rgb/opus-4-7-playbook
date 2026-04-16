import type { ReactNode } from "react";

type TerminalWindowProps = {
  title: string;
  accent?: string;
  children: ReactNode;
};

/**
 * macOS-style window chrome around a code block. Adds visual anchor and
 * communicates "this is code" without reading the content.
 *
 * Dot colors are classic traffic-light (red/yellow/green) desaturated to avoid
 * competing with the slide accent.
 */
export function TerminalWindow({
  title,
  accent = "#22D3EE",
  children,
}: TerminalWindowProps) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-zinc-800/80 bg-black/60 shadow-2xl backdrop-blur-sm"
      style={{
        boxShadow: `0 40px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px ${accent}22 inset`,
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-zinc-800/80 bg-zinc-950/70 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
        </div>
        <span className="font-mono text-[14px] tracking-tight text-zinc-500">
          {title}
        </span>
      </div>
      {/* Body */}
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
