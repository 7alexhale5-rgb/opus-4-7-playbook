import type { ReactNode } from "react";
import { Chrome } from "./Chrome";

type SlideCanvasProps = {
  accent: string;
  showSwipe?: boolean;
  gridBackground?: boolean;
  children: ReactNode;
};

export function SlideCanvas({
  accent,
  showSwipe = true,
  gridBackground = false,
  children,
}: SlideCanvasProps) {
  return (
    <div
      className="relative box-border overflow-hidden bg-[#0A0A0A] text-zinc-100"
      style={{
        width: 1080,
        height: 1350,
        ...(gridBackground
          ? {
              backgroundColor: "#0A0A0A",
              backgroundImage: `
                linear-gradient(rgba(34, 211, 238, 0.07) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 238, 0.07) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }
          : {}),
      }}
    >
      <div className="relative z-10 box-border flex h-full w-full flex-col px-14 pb-[120px] pt-16">
        {children}
      </div>
      <Chrome showSwipe={showSwipe} swipeTint={accent} />
    </div>
  );
}
