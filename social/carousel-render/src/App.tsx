import { SlideIndexSchema } from "./slideMeta";
import {
  Slide01,
  Slide02,
  Slide03,
  Slide04,
  Slide05,
  Slide06,
  Slide07,
  Slide08,
  Slide09,
  Slide10,
} from "./slides/SlideViews";

function parseSlideParam(): number {
  const raw = new URLSearchParams(window.location.search).get("slide");
  const n = raw ? Number.parseInt(raw, 10) : 1;
  const parsed = SlideIndexSchema.safeParse(n);
  return parsed.success ? parsed.data : 1;
}

function parseEmbed(): boolean {
  return new URLSearchParams(window.location.search).get("embed") === "1";
}

export default function App() {
  const slide = parseSlideParam();
  const embed = parseEmbed();

  const body = (() => {
    switch (slide) {
      case 1:
        return <Slide01 />;
      case 2:
        return <Slide02 />;
      case 3:
        return <Slide03 />;
      case 4:
        return <Slide04 />;
      case 5:
        return <Slide05 />;
      case 6:
        return <Slide06 />;
      case 7:
        return <Slide07 />;
      case 8:
        return <Slide08 />;
      case 9:
        return <Slide09 />;
      case 10:
        return <Slide10 />;
      default:
        return <Slide01 />;
    }
  })();

  if (embed) {
    return body;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 py-12">
      {import.meta.env.DEV ? (
        <p className="font-mono text-sm text-zinc-500">
          Dev: ?slide=1…10 — Export uses embed=1 for a flush 1080×1350 frame.
        </p>
      ) : null}
      {body}
    </div>
  );
}
