import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PennyWize · Digital Hooligan",
  description:
    "PennyWize is a signal + research assist for noisy tickers—scanner-style signals, ticker briefings, and explainability. Not financial advice.",
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-black shadow shadow-dh-rebel-red/30 transition hover:opacity-90";

const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-slate-700 bg-black/40 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-black/60";

const linkStyle =
  "font-semibold text-sky-300 underline underline-offset-2 transition hover:text-sky-200";

export default function PennyWizePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
      {/* Hero */}
      <section className="border-b border-white/5 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-dh-rebel-red" />
              Hooligan Labs · Product page
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              Status: MVP planning
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              PennyWize
            </h1>

            <p className="max-w-3xl text-balance text-sm text-slate-300 sm:text-base">
              <span className="font-semibold text-slate-100">
                Signals. Context. Clarity.
              </span>{" "}
              PennyWize is a{" "}
              <span className="font-semibold text-slate-100">
                signal + research assist
              </span>{" "}
              for noisy tickers—built to help you scan, brief, and understand
              what’s moving without pretending to predict markets.
            </p>

            <p className="max-w-3xl text-xs text-slate-400">
              PennyWize does{" "}
              <span className="font-semibold text-slate-200">not</span> provide
              buy/sell recommendations, predictions, or investment advice. Any
              information surfaced is informational and experimental.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/contact" className={primaryCta}>
              Contact Digital Hooligan
            </Link>
            <Link href="/labs" className={neutralCta}>
              Back to Labs
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-white/5 bg-slate-950/70 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              What it does
            </p>
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              A scanner board with receipts, not vibes.
            </h2>
            <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
              PennyWize is designed like an operator’s board: quick signal
              surfaces, fast briefings, and “show your work” explainability so
              you can decide what matters.
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-black/80 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Feature 01
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">
                Scanner board
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                A compact board of tickers showing “something changed” signals
                (volume spikes, unusual mentions, volatility shifts) so you can
                triage fast.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Output is a starting point for research—not a recommendation.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-black/80 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Feature 02
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">
                Ticker briefing
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                A short, readable briefing per ticker: what moved, what sources
                were detected, and what the system thinks is relevant context
                (with clear uncertainty).
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Built for speed: scan → brief → decide whether to dig deeper.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-black/80 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Feature 03
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">
                Explainability
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                “Show your work” traces: which inputs were used, what was
                ignored, and what assumptions were applied—so the output is
                auditable, not magical.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Designed for disciplined users who want receipts.
              </p>
            </article>
          </div>

          {/* What it's not */}
          <aside className="rounded-2xl border border-dh-rebel-red/25 bg-dh-rebel-red/5 p-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-red-200">
                  What it’s not
                </p>
                <p className="text-sm text-slate-200">
                  PennyWize is{" "}
                  <span className="font-semibold text-slate-50">
                    not a buy/sell signal
                  </span>
                  , not a prediction engine, and not financial advice. It’s a
                  research assist that helps you organize signals and context.
                </p>
              </div>
              <div className="text-xs text-slate-300">
                <p className="font-semibold text-slate-200">No promises:</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>No “this will go up” predictions</li>
                  <li>No trade recommendations</li>
                  <li>No guaranteed accuracy claims</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Sources note */}
          <div className="rounded-2xl border border-slate-800 bg-black/70 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Sources &amp; citations
            </p>
            <p className="mt-2 text-sm text-slate-300">
              PennyWize is built to surface inputs alongside outputs. The UI
              will include a “sources” area per ticker briefing so you can see
              what was referenced.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Note: this page is describing the product direction; it does not
              publish live citations.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-b border-white/5 bg-black px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                Status / Phase
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs text-slate-200">
                <span className="h-2 w-2 rounded-full bg-dh-rebel-red" />
                <span className="font-semibold uppercase tracking-[0.2em]">
                  Phase 1 · MVP
                </span>
              </div>
              <p className="text-sm text-slate-300">
                The near-term goal is a tight MVP: scanner board, basic briefing
                output, and a minimal explainability trail.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-50">
                Roadmap
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <span className="font-semibold text-slate-100">
                    Phase 1 (MVP):
                  </span>{" "}
                  scanner board, ticker briefing, explainability traces.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Phase 2 (Workflow / Pro mode):
                  </span>{" "}
                  watchlists, saved briefings, filters, and faster triage UX.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Phase 3 (Sources / Evidence):
                  </span>{" "}
                  clearer source panels, evidence weighting, and more transparent
                  uncertainty handling.
                </li>
              </ul>
            </div>
          </div>

          <aside className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-300">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Good fit for
            </p>
            <ul className="space-y-2">
              <li>• People who want signals + context in one place</li>
              <li>• Operator-style workflows: scan → brief → decide</li>
              <li>• Builders who want auditable inputs and outputs</li>
            </ul>
            <p className="text-xs text-slate-400">
              Want this embedded in a dashboard or integrated with internal
              workflows?{" "}
              <Link href="/contact" className={linkStyle}>
                Reach out
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>

      {/* CTA Row */}
      <section className="bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm text-slate-200">
            <p className="font-semibold text-slate-50">
              Want a research assist like this for your domain?
            </p>
            <p className="text-xs text-slate-400">
              A short email with constraints and desired outputs is enough to
              start.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link href="/contact" className={primaryCta}>
              Contact Digital Hooligan
            </Link>
            <Link href="/labs" className={neutralCta}>
              Back to Labs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
