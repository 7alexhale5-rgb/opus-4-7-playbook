import type { ReactNode } from "react";

type KickerProps = {
  accent: string;
  children: ReactNode;
};

/**
 * Small uppercase eyebrow label above a headline. Adds typographic hierarchy
 * without stealing weight from the main statement.
 */
export function Kicker({ accent, children }: KickerProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-[2px] w-6 rounded-full"
        style={{ backgroundColor: accent }}
      />
      <span
        className="font-mono text-[14px] font-semibold uppercase tracking-[0.22em]"
        style={{ color: accent }}
      >
        {children}
      </span>
    </div>
  );
}
