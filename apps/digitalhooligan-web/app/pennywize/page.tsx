import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PennyWize · Digital Hooligan",
  description:
    "PennyWize is a signal + research assist for penny-stock activity—built for scanning, context, and clarity (not predictions or buy/sell advice).",
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-white shadow shadow-dh-rebel-red/30 transition hover:bg-dh-rebel-red/90";
const secondaryCta =
  "inline-flex items-center justify-center rounded-full border border-slate-700 bg-black px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-dh-rebel-red/60 hover:text-white";

export default function PennyWizePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
      {/* Hero */}
      <section className="border-b border-white/5 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            HOOLIGAN LABS · PRODUCT PAGE
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                PennyWize
              </h1>
              <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
                <span className="font-semibold text-slate-100">
                  Signals. Context. Clarity.
                </span>{" "}
                PennyWize is a{" "}
                <span className="font-medium text-slate-100">
                  signal + research assist
                </span>{" "}
                for penny-stock activity—built to help you scan faster, collect
                context, and keep your notes straight.
              </p>

              <div className="rounded-2xl border border-slate-800 bg-black/60 p-4 text-sm text-slate-300">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Important note
                </p>
                <p className="mt-2">
                  PennyWize does{" "}
                  <span className="font-semibold text-slate-100">not</span>{" "}
                  provide financial advice. It is not predictive and does not
                  generate buy/sell calls.
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-black/60 px-3 py-1 text-xs">
                <span className="h-2 w-2 rounded-full bg-dh-rebel-red" />
                <span className="font-semibold uppercase tracking-[0.2em]">
                  Status: Discovery
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/contact" className={primaryCta}>
              Contact Digital Hooligan
            </Link>
            <Link href="/labs" className={secondaryCta}>
              Back to Labs
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-white/5 bg-slate-950/70 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              FEATURES
            </p>
            <h2 className="text-balance text-xl font-semibold text-slate-50 sm:text-2xl">
              Built like a terminal-minded scanner, not a hype machine.
            </h2>
            <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
              The goal is to reduce noise, capture context, and keep a clean
              audit trail of what you saw and why it mattered.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                SCANNER BOARD
              </p>
              <h3 className="text-sm font-semibold text-slate-50">
                Fast scan surface
              </h3>
              <p className="text-xs text-slate-300">
                A single board to watch unusual activity, filter signals, and
                keep your short list tight.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                TICKER BRIEFING
              </p>
              <h3 className="text-sm font-semibold text-slate-50">
                Context on demand
              </h3>
              <p className="text-xs text-slate-300">
                Pulls together basic background, recent notes, and “what
                changed” so you’re not starting from zero every time.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                EXPLAINABILITY
              </p>
              <h3 className="text-sm font-semibold text-slate-50">
                Why this showed up
              </h3>
              <p className="text-xs text-slate-300">
                Clear “reason codes” for alerts (rule hits, thresholds, sources)
                so you can trust the workflow.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-black/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              WHAT IT’S NOT
            </p>
            <p className="mt-2 text-sm text-slate-300">
              PennyWize is{" "}
              <span className="font-semibold text-slate-100">not</span> a
              buy/sell engine, not a prediction model, and not financial advice.
              It’s a scanning + context tool that helps you do research with
              less friction.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              SOURCES &amp; CITATIONS
            </p>
            <p className="mt-2 text-sm text-slate-300">
              UI will include a “sources &amp; citations” panel to show where
              each fact came from (links, timestamps, and evidence notes). This
              page does not provide real citations yet—only the intended UI copy.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-b border-white/5 bg-black px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-50">
              Status &amp; roadmap
            </h2>
            <p className="text-sm text-slate-300">
              Build order is simple: ship a tight MVP, then add workflow and
              evidence depth.
            </p>

            <ol className="space-y-3 text-sm text-slate-300">
              <li>
                <span className="font-semibold text-slate-100">
                  Phase 1 · MVP
                </span>{" "}
                — scanner board, saved watchlists, basic alert rules, and ticker
                briefing.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Phase 2 · Workflow / pro mode
                </span>{" "}
                — tagging, notes, review queues, and “why this fired” drilldowns
                for heavier users.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Phase 3 · Sources &amp; evidence
                </span>{" "}
                — stronger provenance: linked sources, timestamps, and
                human-readable evidence trails.
              </li>
            </ol>
          </div>

          <aside className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              SAFE POSITIONING
            </p>
            <ul className="space-y-1.5">
              <li>• Signal + context, not predictions</li>
              <li>• No buy/sell calls</li>
              <li>• Evidence-first UI</li>
              <li>• Research assist workflow</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* CTA Row */}
      <section className="bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm text-slate-200">
            <p className="font-semibold text-slate-50">
              Want to build around PennyWize?
            </p>
            <p className="text-xs text-slate-400">
              A short email with your constraints and goals is perfect.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/contact" className={primaryCta}>
              Contact Digital Hooligan
            </Link>
            <Link href="/labs" className={secondaryCta}>
              Back to Labs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
