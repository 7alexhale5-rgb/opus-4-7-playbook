import { ACCENTS, IG_HANDLE } from "../config";
import { SlideCanvas } from "../components/SlideCanvas";
import { Kicker } from "../components/Kicker";
import { TerminalWindow } from "../components/TerminalWindow";

const { cyan, amber, lime, rose, violet } = ACCENTS;

/* ────────────────────────────────────────────────────────────────────
 * Slide 1 — Hook: "Your SDK is already 400ing"
 * Giant 400 bleeds off-frame; broken param names orbit it as proof tags.
 * ──────────────────────────────────────────────────────────────────── */
export function Slide01() {
  const brokenParams = [
    { label: "temperature", top: "60%", left: "6%", rotate: -6 },
    { label: "top_p", top: "68%", left: "24%", rotate: 4 },
    { label: "top_k", top: "56%", left: "80%", rotate: -3 },
    { label: "budget_tokens", top: "82%", left: "72%", rotate: 5 },
    { label: "prefill", top: "78%", left: "14%", rotate: -4 },
  ];

  return (
    <SlideCanvas accent={cyan} slideIndex={1}>
      <div className="flex min-h-0 flex-1 flex-col">
        <Kicker accent={cyan}>Opus 4.7 · shipped 2026-04-16</Kicker>
        <h1
          className="mt-5 font-sans text-[60px] font-bold leading-[1.03] tracking-tight"
          style={{ color: "#fff" }}
        >
          Your Anthropic SDK is{" "}
          <span style={{ color: cyan }}>already throwing 400s.</span>
        </h1>
        <p className="mt-7 max-w-[880px] font-sans text-[26px] font-medium leading-snug text-zinc-300">
          Five request shapes that worked on 4.6 return an error on 4.7. One
          silent default makes streaming UIs look hung. Swipe for the fix.
        </p>

        {/* Visual anchor — giant 400 with orbiting proof tags */}
        <div className="relative flex-1">
          <span
            className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 select-none font-mono font-black leading-none tracking-tighter"
            style={{
              color: cyan,
              fontSize: 460,
              textShadow: `0 0 120px ${cyan}55, 0 0 40px ${cyan}33`,
              opacity: 0.95,
            }}
          >
            400
          </span>
          {brokenParams.map((p) => (
            <span
              key={p.label}
              className="absolute whitespace-nowrap rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-1 font-mono text-[15px] text-rose-200"
              style={{
                top: p.top,
                left: p.left,
                transform: `rotate(${p.rotate}deg)`,
                textDecoration: "line-through",
                textDecorationColor: `${rose}cc`,
              }}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </SlideCanvas>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Slide 2 — The 5 breaking params, each with a REJECTED pill.
 * ──────────────────────────────────────────────────────────────────── */
export function Slide02() {
  const rows = [
    { n: "01", code: "temperature", reason: "sampling param" },
    { n: "02", code: "top_p", reason: "sampling param" },
    { n: "03", code: "top_k", reason: "sampling param" },
    { n: "04", code: "thinking.budget_tokens", reason: "use adaptive + effort" },
    { n: "05", code: "assistant prefill", reason: "use structured output" },
  ];

  return (
    <SlideCanvas accent={amber} slideIndex={2}>
      <div className="flex min-h-0 flex-1 flex-col">
        <Kicker accent={amber}>Breaking changes · 4.6 → 4.7</Kicker>
        <h2 className="mt-5 font-sans text-[52px] font-bold leading-tight tracking-tight text-zinc-50">
          5 things that now{" "}
          <span style={{ color: amber }}>return 400.</span>
        </h2>

        <ol className="mt-12 flex-1 space-y-4 font-mono text-[26px]">
          {rows.map((r) => (
            <li
              key={r.n}
              className="flex items-center gap-5 rounded-xl border border-zinc-800/70 bg-zinc-900/40 px-5 py-4"
            >
              <span
                className="font-sans text-[15px] font-semibold tabular-nums"
                style={{ color: amber }}
              >
                {r.n}
              </span>
              <code className="flex-1 text-zinc-100">{r.code}</code>
              <span
                className="rounded-md px-2.5 py-1 font-sans text-[13px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${rose}22`,
                  color: rose,
                  border: `1px solid ${rose}55`,
                }}
              >
                400
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-8 font-sans text-[22px] leading-snug text-zinc-400">
          No migration flag. No deprecation. Remove them.
        </p>
      </div>
    </SlideCanvas>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Slide 3 — Meet xhigh. Staircase with glow on the new level.
 * ──────────────────────────────────────────────────────────────────── */
export function Slide03() {
  const levels = [
    { label: "max", note: "frontier problems only", is_new: false, tone: "dim" },
    { label: "xhigh", note: "NEW · default for coding & agentic loops", is_new: true, tone: "hot" },
    { label: "high", note: "API default", is_new: false, tone: "bright" },
    { label: "medium", note: "cost-sensitive", is_new: false, tone: "dim" },
    { label: "low", note: "latency-sensitive", is_new: false, tone: "dim" },
  ];

  return (
    <SlideCanvas accent={lime} slideIndex={3}>
      <div className="flex min-h-0 flex-1 flex-col">
        <Kicker accent={lime}>New effort level</Kicker>
        <h2 className="mt-5 font-sans text-[56px] font-bold leading-tight tracking-tight text-zinc-50">
          Meet{" "}
          <code
            className="font-mono font-black"
            style={{ color: lime, textShadow: `0 0 40px ${lime}66` }}
          >
            xhigh
          </code>
          .
        </h2>

        <div className="mt-12 flex flex-1 flex-col justify-center gap-2.5 font-mono">
          {levels.map((lvl) => {
            const isNew = lvl.is_new;
            return (
              <div
                key={lvl.label}
                className="relative flex items-center overflow-hidden rounded-lg border px-6 py-4"
                style={{
                  borderColor: isNew ? `${lime}88` : "rgba(63,63,70,0.5)",
                  background: isNew
                    ? `linear-gradient(90deg, ${lime}22 0%, ${lime}06 70%, transparent 100%)`
                    : "rgba(24,24,27,0.35)",
                  boxShadow: isNew ? `0 0 32px ${lime}22` : "none",
                }}
              >
                <span
                  className={`w-44 shrink-0 font-bold ${
                    isNew ? "text-[30px]" : "text-[22px]"
                  }`}
                  style={{
                    color: isNew
                      ? lime
                      : lvl.tone === "bright"
                      ? "#fafafa"
                      : "#a1a1aa",
                  }}
                >
                  {lvl.label}
                </span>
                <span
                  className="font-sans text-[19px]"
                  style={{
                    color: isNew ? "#e4e4e7" : "#71717a",
                  }}
                >
                  {lvl.note}
                </span>
                {isNew ? (
                  <span
                    className="ml-auto rounded-full px-3 py-1 font-sans text-[12px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: lime, color: "#0A0A0A" }}
                  >
                    new
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>

        <p className="mt-8 font-mono text-[19px] leading-relaxed text-zinc-500">
          <code style={{ color: lime }}>
            output_config={"{"}&quot;effort&quot;: &quot;xhigh&quot;{"}"}
          </code>{" "}
          · replaces <code className="text-zinc-400">budget_tokens</code>.
        </p>
      </div>
    </SlideCanvas>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Slide 4 — Tokenizer silent cost. Real bar chart with labels + axis.
 * ──────────────────────────────────────────────────────────────────── */
export function Slide04() {
  return (
    <SlideCanvas accent={rose} slideIndex={4}>
      <div className="flex min-h-0 flex-1 flex-col">
        <Kicker accent={rose}>Silent default · tokenizer</Kicker>
        <h2 className="mt-5 font-sans text-[54px] font-bold leading-[1.1] tracking-tight text-zinc-50">
          New tokenizer.
          <br />
          <span style={{ color: rose }}>Your budgets are wrong.</span>
        </h2>

        <div className="mt-6 space-y-3 font-sans text-[22px] leading-relaxed text-zinc-300">
          <p>
            Same prompt →{" "}
            <span className="font-mono text-zinc-100">1.0–1.35×</span> more
            tokens on 4.7.
          </p>
          <p>
            Raise <code className="font-mono text-zinc-100">max_tokens</code> by{" "}
            <strong style={{ color: rose }}>≥35%</strong>. Minimum{" "}
            <strong className="text-zinc-100">64,000</strong> at{" "}
            <code className="font-mono text-zinc-200">xhigh</code>.
          </p>
        </div>

        {/* Bar chart — real proportions, labeled */}
        <div className="mt-10 flex flex-1 items-end justify-center">
          <div className="relative flex h-full w-full max-w-[700px] items-end gap-16 rounded-2xl border border-zinc-800/60 bg-zinc-950/40 px-10 pb-16 pt-12">
            {/* Gridlines */}
            <div className="absolute inset-x-10 top-12 bottom-16 z-0">
              {[0, 25, 50, 75, 100].map((p) => (
                <div
                  key={p}
                  className="absolute inset-x-0 border-t border-zinc-800/50"
                  style={{ bottom: `${p}%` }}
                />
              ))}
            </div>

            {/* 4.6 bar */}
            <div className="relative z-10 flex flex-1 flex-col items-center gap-4">
              <span className="font-mono text-[20px] font-bold text-zinc-200">
                1.0×
              </span>
              <div
                className="w-full rounded-t-lg bg-zinc-700"
                style={{ height: 220 }}
              />
              <span className="font-mono text-[18px] font-semibold text-zinc-400">
                Opus 4.6
              </span>
            </div>

            {/* 4.7 bar — taller, accent-colored, callout */}
            <div className="relative z-10 flex flex-1 flex-col items-center gap-4">
              <div
                className="rounded-md px-2.5 py-1 font-mono text-[15px] font-black"
                style={{ backgroundColor: rose, color: "#0A0A0A" }}
              >
                +35%
              </div>
              <span className="font-mono text-[20px] font-bold text-zinc-100">
                1.35×
              </span>
              <div
                className="w-full rounded-t-lg"
                style={{
                  height: 297,
                  backgroundColor: rose,
                  boxShadow: `0 0 40px ${rose}66`,
                }}
              />
              <span
                className="font-mono text-[18px] font-semibold"
                style={{ color: rose }}
              >
                Opus 4.7
              </span>
            </div>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Slide 5 — Adaptive is the only mode. Diff in a terminal window.
 * ──────────────────────────────────────────────────────────────────── */
export function Slide05() {
  return (
    <SlideCanvas accent={cyan} slideIndex={5}>
      <div className="flex min-h-0 flex-1 flex-col">
        <Kicker accent={cyan}>Adaptive thinking</Kicker>
        <h2 className="mt-5 font-sans text-[52px] font-bold leading-tight tracking-tight text-zinc-50">
          Adaptive is the{" "}
          <span style={{ color: cyan }}>only thinking mode</span> now.
        </h2>
        <p className="mt-4 font-sans text-[22px] text-zinc-400">
          <code className="font-mono text-zinc-300">budget_tokens</code>{" "}
          returns 400. Depth is now controlled by effort.
        </p>

        <div className="mt-10 flex flex-1 items-center">
          <TerminalWindow title="messages.create.py — diff" accent={cyan}>
            <pre className="font-mono text-[22px] leading-[1.65] tracking-tight">
              <code>
                <span className="text-rose-400">- </span>
                <span className="text-zinc-500 line-through decoration-rose-500/40">
                  thinking={"{"}&quot;type&quot;: &quot;enabled&quot;,
                  &quot;budget_tokens&quot;: 8000{"}"}
                </span>
                {"\n"}
                <span className="text-emerald-400">+ </span>
                <span className="text-zinc-100">
                  thinking={"{"}&quot;type&quot;: &quot;adaptive&quot;{"}"}
                </span>
                {"\n"}
                <span className="text-emerald-400">+ </span>
                <span className="text-zinc-100">
                  output_config={"{"}&quot;effort&quot;: &quot;xhigh&quot;{"}"}
                </span>
              </code>
            </pre>
          </TerminalWindow>
        </div>

        <p className="mt-6 font-sans text-[20px] leading-snug text-zinc-500">
          Simpler shape. Strict on <code className="font-mono">low</code> /{" "}
          <code className="font-mono">medium</code>. Raise effort — don&apos;t
          prompt around shallow reasoning.
        </p>
      </div>
    </SlideCanvas>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Slide 6 — Delete your scaffolding. Big X marks, meaningful presence.
 * ──────────────────────────────────────────────────────────────────── */
export function Slide06() {
  const lines = [
    { text: '"Be concise."', why: "4.7 calibrates length natively" },
    {
      text: '"After every 3 tool calls, summarize progress."',
      why: "4.7 emits built-in progress updates",
    },
    {
      text: '"Double-check your work before returning."',
      why: "4.7 self-verifies more often",
    },
  ];

  return (
    <SlideCanvas accent={amber} slideIndex={6}>
      <div className="flex min-h-0 flex-1 flex-col">
        <Kicker accent={amber}>Prompt hygiene</Kicker>
        <h2 className="mt-5 font-sans text-[52px] font-bold leading-tight tracking-tight text-zinc-50">
          Delete your{" "}
          <span style={{ color: amber }}>scaffolding.</span>
        </h2>

        <ul className="mt-12 flex-1 space-y-7 font-sans">
          {lines.map((l) => (
            <li key={l.text} className="flex items-start gap-5">
              <span
                className="mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-[20px] font-bold"
                style={{
                  borderColor: `${amber}66`,
                  color: amber,
                  backgroundColor: `${amber}14`,
                }}
              >
                ✕
              </span>
              <div>
                <p
                  className="text-[26px] font-medium leading-snug"
                  style={{
                    color: "#71717a",
                    textDecoration: "line-through",
                    textDecorationColor: `${amber}88`,
                  }}
                >
                  {l.text}
                </p>
                <p className="mt-1.5 font-mono text-[16px] leading-relaxed text-zinc-500">
                  → {l.why}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 font-sans text-[20px] leading-snug text-zinc-400">
          More scaffolding now means worse output. Trust the model.
        </p>
      </div>
    </SlideCanvas>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Slide 7 — The hung UI. Mini mock of a "thinking…" panel that would look dead.
 * ──────────────────────────────────────────────────────────────────── */
export function Slide07() {
  return (
    <SlideCanvas accent={rose} slideIndex={7}>
      <div className="flex min-h-0 flex-1 flex-col">
        <Kicker accent={rose}>Silent default · display</Kicker>
        <h2 className="mt-5 font-sans text-[50px] font-bold leading-[1.1] tracking-tight text-zinc-50">
          Thinking is now{" "}
          <span style={{ color: rose }}>hidden by default.</span>
        </h2>
        <p className="mt-4 font-sans text-[22px] leading-relaxed text-zinc-300">
          <code className="font-mono text-zinc-100">thinking.display</code>{" "}
          flipped <code className="font-mono text-zinc-500">shown</code> →{" "}
          <code className="font-mono text-rose-200">
            &quot;omitted&quot;
          </code>{" "}
          on 4.7.
        </p>

        {/* Mock of a streaming UI that would look hung */}
        <div className="mt-8 flex flex-1 items-center gap-6">
          <div className="flex flex-1 flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
            <div className="flex items-center gap-3 text-zinc-400">
              <span
                className="flex h-3 w-3 rounded-full"
                style={{ backgroundColor: rose }}
              />
              <span className="font-mono text-[16px]">thinking…</span>
            </div>
            <div className="h-[2px] w-3/5 rounded-full bg-zinc-800" />
            <div className="h-[2px] w-2/5 rounded-full bg-zinc-800" />
            <div className="h-[2px] w-1/2 rounded-full bg-zinc-800" />
            <p className="mt-2 font-mono text-[14px] text-zinc-600">
              (30 seconds later, still nothing)
            </p>
          </div>
          <div className="flex items-center font-mono text-[40px] text-zinc-600">
            →
          </div>
          <div className="flex flex-1 flex-col gap-3 rounded-xl border border-emerald-500/30 bg-zinc-950/60 p-6">
            <div className="flex items-center gap-3 text-emerald-300">
              <span className="flex h-3 w-3 rounded-full bg-emerald-400" />
              <span className="font-mono text-[16px]">summarized</span>
            </div>
            <p className="font-mono text-[15px] leading-[1.7] text-zinc-200">
              Considering the API shape…
              <br />
              Checking for sampling params…
              <br />
              Drafting migration diff…
            </p>
          </div>
        </div>

        <p className="mt-6 font-mono text-[18px] leading-relaxed text-zinc-400">
          Fix ·{" "}
          <code className="text-zinc-100">
            thinking={"{"}type:&apos;adaptive&apos;, display:&apos;summarized&apos;{"}"}
          </code>
        </p>
      </div>
    </SlideCanvas>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Slide 8 — Task budgets. Gauge + terminal code.
 * ──────────────────────────────────────────────────────────────────── */
export function Slide08() {
  return (
    <SlideCanvas accent={lime} slideIndex={8}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center gap-4">
          <Kicker accent={lime}>Task budgets</Kicker>
          <span
            className="rounded-md px-2 py-0.5 font-mono text-[12px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${violet}22`,
              color: violet,
              border: `1px solid ${violet}66`,
            }}
          >
            beta
          </span>
        </div>
        <h2 className="mt-5 font-sans text-[50px] font-bold leading-tight tracking-tight text-zinc-50">
          The model can{" "}
          <span style={{ color: lime }}>pace itself</span> now.
        </h2>
        <p className="mt-4 font-sans text-[22px] leading-relaxed text-zinc-300">
          Advisory token countdown across a full agentic loop. Min{" "}
          <span className="font-mono text-lime-200">20k</span>. Messages API
          only.
        </p>

        {/* Gauge/progress visual */}
        <div className="mt-8 rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-5">
          <div className="mb-2 flex items-center justify-between font-mono text-[15px] text-zinc-400">
            <span>agentic loop budget</span>
            <span>
              <span className="text-zinc-100">98,400</span> /{" "}
              <span className="text-lime-300">128,000</span> tokens
            </span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full"
              style={{
                width: "77%",
                background: `linear-gradient(90deg, ${lime} 0%, ${lime}88 100%)`,
                boxShadow: `0 0 16px ${lime}88`,
              }}
            />
          </div>
        </div>

        <div className="mt-6 flex-1">
          <TerminalWindow title="beta.messages.create.py" accent={lime}>
            <pre className="font-mono text-[17px] leading-[1.65] text-zinc-200">
              <code>
                <span className="text-zinc-500">output_config</span>={"{"}
                {"\n"}
                {"  "}<span className="text-emerald-300">&quot;effort&quot;</span>:{" "}
                <span className="text-amber-200">&quot;xhigh&quot;</span>,
                {"\n"}
                {"  "}<span className="text-emerald-300">&quot;task_budget&quot;</span>:{" "}
                {"{"}
                <span className="text-emerald-300">&quot;type&quot;</span>:{" "}
                <span className="text-amber-200">&quot;tokens&quot;</span>,{" "}
                <span className="text-emerald-300">&quot;total&quot;</span>:{" "}
                <span className="text-cyan-200">128000</span>
                {"}"},
                {"\n"}
                {"}"}
                {"\n"}
                <span className="text-zinc-500">betas</span>=[
                <span className="text-amber-200">
                  &quot;task-budgets-2026-03-13&quot;
                </span>
                ]
              </code>
            </pre>
          </TerminalWindow>
        </div>
      </div>
    </SlideCanvas>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Slide 9 — Claude Code tune-up. Numbered steps with progress indicator.
 * ──────────────────────────────────────────────────────────────────── */
export function Slide09() {
  const steps = [
    {
      n: 1,
      title: "Pin subagent models",
      body: "claude-opus-4-7 · claude-sonnet-4-6 · claude-haiku-4-5",
    },
    {
      n: 2,
      title: "Drop operating-notes.md",
      body: "~/.claude/references/opus-4-7-operating-notes.md",
    },
    {
      n: 3,
      title: "Add section to global CLAUDE.md",
      body: "pointer block linking to the notes file",
    },
    {
      n: 4,
      title: "If using CARL: add opus-4-7 domain",
      body: "always-on rules for model / effort / thinking / tokenizer",
    },
  ];

  return (
    <SlideCanvas accent={cyan} slideIndex={9}>
      <div className="flex min-h-0 flex-1 flex-col">
        <Kicker accent={cyan}>Claude Code · 30-minute tune-up</Kicker>
        <h2 className="mt-5 font-sans text-[50px] font-bold leading-tight tracking-tight text-zinc-50">
          Align your{" "}
          <span style={{ color: cyan }}>Claude Code env</span> in four steps.
        </h2>

        <ol className="mt-10 flex flex-1 flex-col gap-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex items-start gap-5 rounded-xl border border-zinc-800/70 bg-zinc-950/40 px-5 py-4"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[22px] font-bold tabular-nums"
                style={{
                  borderColor: `${cyan}88`,
                  color: cyan,
                  backgroundColor: `${cyan}14`,
                }}
              >
                {s.n}
              </span>
              <div className="pt-1">
                <p className="font-sans text-[22px] font-semibold text-zinc-100">
                  {s.title}
                </p>
                <p className="mt-1 font-mono text-[16px] leading-snug text-zinc-400">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 font-sans text-[20px] text-zinc-500">
          Templates + interactive installer in the repo →
        </p>
      </div>
    </SlideCanvas>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Slide 10 — CTA. Grid background, URL-as-hero, follow prompt.
 * ──────────────────────────────────────────────────────────────────── */
export function Slide10() {
  return (
    <SlideCanvas
      accent={cyan}
      slideIndex={10}
      showSwipe={false}
      vignette={false}
      dotTexture={false}
      backgroundStyle={{
        backgroundColor: "#0A0A0A",
        backgroundImage: `
          linear-gradient(rgba(34, 211, 238, 0.09) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 211, 238, 0.09) 1px, transparent 1px),
          radial-gradient(ellipse at 50% 40%, ${cyan}18 0%, transparent 55%)
        `,
        backgroundSize: "44px 44px, 44px 44px, 100% 100%",
      }}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-8 text-center">
        <Kicker accent={cyan}>The full playbook · MIT · free</Kicker>
        <h2
          className="font-sans text-[88px] font-black leading-[0.95] tracking-tight"
          style={{ color: "#fff", textShadow: `0 0 80px ${cyan}55` }}
        >
          Ship the{" "}
          <span style={{ color: cyan }}>migration</span>
          <br />
          in an afternoon.
        </h2>
        <p className="max-w-[820px] font-sans text-[24px] leading-snug text-zinc-300">
          Docs · templates · working examples · migration scripts · CI tests ·
          Instagram carousel source.
        </p>

        <div
          className="mt-4 flex items-center gap-4 rounded-xl border-2 px-8 py-5 font-mono text-[26px]"
          style={{
            borderColor: `${cyan}55`,
            backgroundColor: `${cyan}0c`,
            backdropFilter: "blur(6px)",
            color: "#e0f9ff",
          }}
        >
          <span className="text-zinc-500">→</span>
          <span>github.com/7alexhale5-rgb/opus-4-7-playbook</span>
        </div>

        <p className="mt-6 font-sans text-[20px] leading-relaxed text-zinc-400">
          Follow{" "}
          <span className="font-semibold text-zinc-100">@{IG_HANDLE}</span>{" "}
          for daily engineering notes from building with Claude.
        </p>

        <div className="mt-10 flex items-center gap-3">
          <span
            className="h-[2px] w-10 rounded-full"
            style={{ backgroundColor: cyan }}
          />
          <span className="font-sans text-[22px] font-semibold tracking-[0.4em] text-zinc-200">
            PRETTYFLY
          </span>
        </div>
      </div>
    </SlideCanvas>
  );
}
