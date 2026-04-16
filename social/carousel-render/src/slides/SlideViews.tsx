import { IG_HANDLE } from "../config";
import { SlideCanvas } from "../components/SlideCanvas";

const CYAN = "#22D3EE";
const AMBER = "#F59E0B";
const LIME = "#A3E635";
const ROSE = "#F43F5E";

export function Slide01() {
  return (
    <SlideCanvas accent={CYAN}>
      <div className="flex min-h-0 flex-1 flex-col">
        <h1
          className="font-sans text-[52px] font-bold leading-[1.08] tracking-tight"
          style={{ color: CYAN }}
        >
          Your Anthropic SDK is already throwing 400s on Opus 4.7.
        </h1>
        <p className="mt-10 max-w-[980px] font-sans text-[28px] font-medium leading-snug text-zinc-200">
          Five request shapes that worked yesterday return an error today. Swipe
          for the fix.
        </p>
        <div className="relative mt-auto flex flex-1 items-end justify-center pb-4">
          <span
            className="select-none font-mono font-bold leading-none tracking-tighter"
            style={{
              color: CYAN,
              fontSize: 320,
              textShadow: `0 0 80px ${CYAN}33`,
            }}
          >
            400
          </span>
        </div>
      </div>
    </SlideCanvas>
  );
}

export function Slide02() {
  return (
    <SlideCanvas accent={AMBER}>
      <div className="flex min-h-0 flex-1 flex-col">
        <h2
          className="font-sans text-[44px] font-bold leading-tight tracking-tight"
          style={{ color: AMBER }}
        >
          5 things that now return 400
        </h2>
        <ol className="mt-12 space-y-5 font-mono text-[26px] leading-relaxed text-zinc-200">
          <li>
            <span className="text-zinc-500">1.</span>{" "}
            <code className="text-amber-100">temperature</code>
          </li>
          <li>
            <span className="text-zinc-500">2.</span>{" "}
            <code className="text-amber-100">top_p</code>
          </li>
          <li>
            <span className="text-zinc-500">3.</span>{" "}
            <code className="text-amber-100">top_k</code>
          </li>
          <li>
            <span className="text-zinc-500">4.</span>{" "}
            <code className="text-amber-100">
              thinking: {`{budget_tokens}`}
            </code>
          </li>
          <li>
            <span className="text-zinc-500">5.</span>{" "}
            <code className="text-amber-100">assistant prefill</code>
          </li>
        </ol>
        <p className="mt-auto pt-8 font-sans text-[22px] leading-snug text-zinc-400">
          Remove them. No migration flags. They&apos;re gone.
        </p>
      </div>
    </SlideCanvas>
  );
}

export function Slide03() {
  return (
    <SlideCanvas accent={LIME}>
      <div className="flex min-h-0 flex-1 flex-col">
        <h2 className="font-sans text-[48px] font-bold tracking-tight text-zinc-100">
          Meet{" "}
          <code className="font-mono text-[48px]" style={{ color: LIME }}>
            xhigh
          </code>
          .
        </h2>
        <div className="mt-10 flex flex-1 flex-col justify-center gap-0 font-mono text-[22px]">
          {[
            ["max", "frontier problems only"],
            ["xhigh", "NEW. default for coding / agentic"],
            ["high", "API default"],
            ["medium", "cost-sensitive"],
            ["low", "latency-sensitive"],
          ].map(([label, note], i) => (
            <div
              key={label}
              className="flex border-l-4 py-3 pl-5"
              style={{
                borderColor: LIME,
                opacity: 1 - i * 0.04,
                background:
                  i === 1
                    ? `linear-gradient(90deg, ${LIME}22 0%, transparent 85%)`
                    : undefined,
              }}
            >
              <span className="w-40 shrink-0 font-semibold text-zinc-100">
                {label}
              </span>
              <span className="text-zinc-500">←</span>
              <span className="pl-3 text-zinc-300">{note}</span>
            </div>
          ))}
        </div>
        <p className="mt-auto font-mono text-[19px] leading-relaxed text-zinc-400">
          <code style={{ color: LIME }}>
            output_config: {"{"}&quot;effort&quot;: &quot;xhigh&quot;{"}"}
          </code>{" "}
          — no <code className="text-zinc-300">budget_tokens</code> anymore.
        </p>
      </div>
    </SlideCanvas>
  );
}

export function Slide04() {
  return (
    <SlideCanvas accent={ROSE}>
      <div className="flex min-h-0 flex-1 flex-col">
        <h2 className="font-sans text-[46px] font-bold leading-[1.12] tracking-tight text-zinc-50">
          New tokenizer.
          <br />
          Your budgets are wrong.
        </h2>
        <div className="mt-8 space-y-4 font-sans text-[24px] leading-relaxed text-zinc-300">
          <p>Same prompt → 1.0–1.35× more tokens on 4.7.</p>
          <p>
            Raise <code className="font-mono text-zinc-100">max_tokens</code> by{" "}
            <strong style={{ color: ROSE }}>≥35%</strong>.
          </p>
          <p>
            Minimum <strong className="text-zinc-100">64,000</strong> at{" "}
            <code className="font-mono text-zinc-200">xhigh</code> or{" "}
            <code className="font-mono text-zinc-200">max</code>.
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-6 pt-10">
          <div className="flex items-end gap-10 px-2">
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-[100px] rounded-t-md bg-zinc-700"
                style={{ height: 140 }}
              />
              <span className="font-mono text-[18px] text-zinc-500">4.6</span>
            </div>
            <div className="relative flex flex-col items-center gap-3">
              <div
                className="absolute -right-2 -top-10 rounded-md px-2 py-1 font-mono text-[16px] font-bold text-[#0A0A0A]"
                style={{ backgroundColor: ROSE }}
              >
                +35%
              </div>
              <div
                className="w-[100px] rounded-t-md"
                style={{ height: 189, backgroundColor: ROSE }}
              />
              <span className="font-mono text-[18px] text-zinc-400">4.7</span>
            </div>
          </div>
        </div>
      </div>
    </SlideCanvas>
  );
}

export function Slide05() {
  return (
    <SlideCanvas accent={CYAN}>
      <div className="flex min-h-0 flex-1 flex-col">
        <p className="font-sans text-[22px] font-medium text-zinc-400">
          Thinking rewrite:
        </p>
        <div className="flex flex-1 flex-col justify-center">
          <pre
            className="font-mono text-[24px] leading-[1.55] tracking-tight text-zinc-200"
            style={{ fontSize: 26 }}
          >
            <code>
              <span className="text-rose-400">- </span>
              <span className="text-zinc-500">
                thinking={"{"}&quot;type&quot;: &quot;enabled&quot;,
                &quot;budget_tokens&quot;: 8000{"}"}
              </span>
              {"\n"}
              <span className="text-emerald-400">+ </span>
              <span className="text-zinc-200">
                thinking={"{"}&quot;type&quot;: &quot;adaptive&quot;{"}"}
              </span>
              {"\n"}
              <span className="text-emerald-400">+ </span>
              <span className="text-zinc-200">
                output_config={"{"}&quot;effort&quot;: &quot;xhigh&quot;{"}"}
              </span>
            </code>
          </pre>
        </div>
        <p className="mt-auto font-sans text-[21px] leading-snug text-zinc-500">
          Effort replaces the integer dial. Simpler. Strict on{" "}
          <code className="font-mono text-zinc-400">low</code> /{" "}
          <code className="font-mono text-zinc-400">medium</code>.
        </p>
      </div>
    </SlideCanvas>
  );
}

export function Slide06() {
  return (
    <SlideCanvas accent={AMBER}>
      <div className="flex min-h-0 flex-1 flex-col">
        <h2 className="font-sans text-[42px] font-bold leading-tight tracking-tight text-zinc-50">
          Things to remove from your prompts.
        </h2>
        <ul className="mt-14 space-y-8 font-sans text-[28px] font-medium leading-snug text-zinc-400">
          <li className="relative pl-2">
            <span
              className="text-zinc-600 line-through decoration-amber-500/80 decoration-2"
              style={{ textDecorationColor: AMBER }}
            >
              &quot;Be concise.&quot;
            </span>
          </li>
          <li>
            <span
              className="text-zinc-600 line-through decoration-amber-500/80 decoration-2"
              style={{ textDecorationColor: AMBER }}
            >
              &quot;After every 3 tool calls, summarize.&quot;
            </span>
          </li>
          <li>
            <span
              className="text-zinc-600 line-through decoration-amber-500/80 decoration-2"
              style={{ textDecorationColor: AMBER }}
            >
              &quot;Double-check your work.&quot;
            </span>
          </li>
        </ul>
        <p className="mt-auto pt-6 font-sans text-[21px] leading-relaxed text-zinc-500">
          4.7 calibrates length and self-verifies. More scaffolding = worse
          output.
        </p>
      </div>
    </SlideCanvas>
  );
}

export function Slide07() {
  return (
    <SlideCanvas accent={ROSE}>
      <div className="flex min-h-0 flex-1 flex-col">
        <h2 className="font-sans text-[40px] font-bold leading-tight tracking-tight text-zinc-50">
          Silent default: thinking is now hidden.
        </h2>
        <div className="mt-8 space-y-5 font-sans text-[22px] leading-relaxed text-zinc-300">
          <p>
            <code className="font-mono text-[20px] text-zinc-200">
              thinking.display
            </code>{" "}
            flipped from shown →{" "}
            <code className="font-mono text-rose-200">&quot;omitted&quot;</code>.
          </p>
          <p>If your UI streams reasoning, set:</p>
          <pre className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-5 font-mono text-[19px] leading-relaxed text-zinc-200">
            {`thinking={"type": "adaptive", "display": "summarized"}`}
          </pre>
          <p className="text-zinc-400">
            Or your users see a blank &quot;thinking…&quot; panel for 30 seconds.
          </p>
        </div>
      </div>
    </SlideCanvas>
  );
}

export function Slide08() {
  return (
    <SlideCanvas accent={LIME}>
      <div className="flex min-h-0 flex-1 flex-col">
        <h2 className="font-sans text-[42px] font-bold tracking-tight text-zinc-50">
          The model can pace itself now.
        </h2>
        <div className="mt-8 space-y-4 font-sans text-[22px] leading-relaxed text-zinc-300">
          <p>
            Advisory token countdown across a full agentic loop. Min{" "}
            <span className="font-mono text-lime-200">20k</span>.
          </p>
          <pre className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950/90 p-5 font-mono text-[17px] leading-[1.5] text-zinc-200">
            {`output_config={
  "effort": "xhigh",
  "task_budget": {"type": "tokens", "total": 128000},
}
betas=["task-budgets-2026-03-13"]`}
          </pre>
          <p className="text-[20px] text-zinc-500">
            Messages API only. Not on Claude Code / Cowork yet.
          </p>
        </div>
      </div>
    </SlideCanvas>
  );
}

export function Slide09() {
  return (
    <SlideCanvas accent={CYAN}>
      <div className="flex min-h-0 flex-1 flex-col">
        <h2
          className="font-sans text-[44px] font-bold tracking-tight"
          style={{ color: CYAN }}
        >
          Claude Code tune-up (30 min).
        </h2>
        <ol className="mt-10 space-y-6 font-mono text-[21px] leading-snug text-zinc-200">
          <li className="flex gap-3">
            <span className="text-zinc-600">1.</span>
            <span>
              Pin subagent <code className="text-cyan-200">model:</code> lines
              to <code className="text-zinc-100">claude-opus-4-7</code> /{" "}
              <code className="text-zinc-100">claude-sonnet-4-6</code> /{" "}
              <code className="text-zinc-100">claude-haiku-4-5</code>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-zinc-600">2.</span>
            <span>
              Drop the operating-notes file into{" "}
              <code className="text-zinc-300">~/.claude/references/</code>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-zinc-600">3.</span>
            <span>
              Add the Opus 4.7 section to your global{" "}
              <code className="text-zinc-300">CLAUDE.md</code>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-zinc-600">4.</span>
            <span>
              If you use CARL: add the{" "}
              <code className="text-cyan-200">opus-4-7</code> domain +{" "}
              <code className="text-zinc-300">ALWAYS_ON=true</code>.
            </span>
          </li>
        </ol>
        <p className="mt-auto font-sans text-[21px] text-zinc-500">
          Templates + interactive installer in the repo.
        </p>
      </div>
    </SlideCanvas>
  );
}

export function Slide10() {
  return (
    <SlideCanvas accent={CYAN} showSwipe={false} gridBackground>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
        <h2
          className="font-sans text-[72px] font-bold tracking-tight"
          style={{ color: CYAN, textShadow: `0 0 60px ${CYAN}44` }}
        >
          Full playbook.
        </h2>
        <p className="mt-10 max-w-[920px] font-sans text-[26px] leading-relaxed text-zinc-300">
          Docs. Templates. Working examples. Migration scripts.
        </p>
        <pre className="mt-10 rounded-xl border border-cyan-500/30 bg-black/40 px-8 py-6 font-mono text-[22px] leading-normal text-cyan-100 backdrop-blur-sm">
          github.com/7alexhale5-rgb/opus-4-7-playbook
        </pre>
        <p className="mt-8 font-sans text-[22px] text-zinc-400">
          Star it. Clone it. Use it.
        </p>
        <p className="mt-10 max-w-[900px] font-sans text-[20px] leading-relaxed text-zinc-500">
          Follow <span className="font-semibold text-zinc-300">@{IG_HANDLE}</span>{" "}
          — daily engineering notes from building with Claude.
        </p>
        <div className="mt-16 flex items-center gap-3">
          <span
            className="h-1 w-10 rounded-full"
            style={{ backgroundColor: CYAN }}
          />
          <span className="font-sans text-[22px] font-semibold tracking-[0.35em] text-zinc-300">
            PRETTYFLY
          </span>
        </div>
      </div>
    </SlideCanvas>
  );
}
