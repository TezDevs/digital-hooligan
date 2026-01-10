import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PennyWize · Digital Hooligan",
  description:
    "PennyWize is a signal + research assist for noisy penny-stock tickers—scanner boards, briefings, and explainability. No predictions. No buy/sell calls.",
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-white shadow shadow-dh-rebel-red/30 transition hover:bg-dh-rebel-red/90";
const secondaryCta =
  "inline-flex items-center justify-center rounded-full border border-dh-street-gray/60 bg-dh-black/60 px-5 py-2.5 text-sm font-semibold text-dh-offwhite transition hover:border-dh-rebel-red/60 hover:text-dh-rebel-red";
const chip =
  "inline-flex items-center gap-2 rounded-full border border-dh-street-gray/60 bg-dh-black/60 px-3 py-1 text-xs font-medium text-dh-offwhite";
const card =
  "rounded-2xl border border-dh-street-gray/40 bg-dh-black/60 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.65)]";
const subtle = "text-sm text-dh-street-gray/80 sm:text-[15px]";

export default function PennyWizePage() {
  return (
    <main className="min-h-screen bg-dh-black text-dh-offwhite">
      {/* Hero */}
      <section className="border-b border-dh-street-gray/40 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-street-gray/80">
            Hooligan Labs · Product
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-dh-offwhite sm:text-4xl">
              PennyWize
            </h1>
            <span className={chip}>
              <span className="h-2 w-2 rounded-full bg-dh-rebel-red" />
              <span className="uppercase tracking-[0.18em] text-[11px] text-dh-offwhite/90">
                Status · Discovery
              </span>
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-semibold text-dh-offwhite">
              Signals. Context. Clarity.
            </p>
            <p className={subtle}>
              PennyWize is a{" "}
              <span className="font-semibold text-dh-offwhite">
                signal + research assist
              </span>{" "}
              for noisy tickers: scanner boards, briefings, and explainability
              that help you understand what changed and why it matters.
            </p>

            {/* D-FIN-01 (verbatim) */}
            <p className="text-xs leading-relaxed text-dh-street-gray/70">
              Signals and information are provided for research and awareness only. They are not financial,
              investment, legal, or tax advice, and do not constitute a recommendation to buy or sell any
              security.
            </p>
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

      {/* Features + What it’s not */}
      <section className="border-b border-dh-street-gray/40 bg-dh-black px-4 py-12 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-dh-offwhite">
              What it does
            </h2>
            <p className={subtle}>
              Built for “weird move” detection without turning into a hype
              machine. The output is structured context you can act on
              responsibly.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className={card}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/80">
                Feature
              </p>
              <h3 className="mt-2 text-base font-semibold text-dh-offwhite">
                Scanner board
              </h3>
              <p className="mt-2 text-sm text-dh-street-gray/80">
                A clean board of unusual tickers and movement patterns—built to
                reduce noise, not amplify it.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-dh-street-gray/80">
                <li>• Filters for volume/float/volatility</li>
                <li>• “Why it surfaced” labels</li>
                <li>• Watchlist-friendly layout</li>
              </ul>
            </div>

            <div className={card}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/80">
                Feature
              </p>
              <h3 className="mt-2 text-base font-semibold text-dh-offwhite">
                Ticker briefing
              </h3>
              <p className="mt-2 text-sm text-dh-street-gray/80">
                A short, structured briefing that summarizes the day’s relevant
                changes and what sources were involved.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-dh-street-gray/80">
                <li>• What changed since last check</li>
                <li>• Source buckets (news, filings, socials)</li>
                <li>• Links-ready output for later citations</li>
              </ul>
            </div>

            <div className={card}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/80">
                Feature
              </p>
              <h3 className="mt-2 text-base font-semibold text-dh-offwhite">
                Explainability
              </h3>
              <p className="mt-2 text-sm text-dh-street-gray/80">
                “Show your work” tracing—what inputs drove the alert and what
                evidence supports the summary.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-dh-street-gray/80">
                <li>• Evidence-first summaries</li>
                <li>• Confidence cues (not predictions)</li>
                <li>• Audit-friendly trail for later</li>
              </ul>
            </div>
          </div>

          {/* What it’s not */}
          <div className="rounded-2xl border border-dh-rebel-red/40 bg-dh-black/60 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.65)]">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-rebel-red/90">
                  What it’s not
                </p>
                <p className="text-sm text-dh-offwhite">
                  PennyWize is not a buy/sell bot. It does not predict prices or
                  tell you what to trade.
                </p>
                <p className="text-xs text-dh-street-gray/80">
                  It’s a signal + research workflow: surface changes, attach
                  context, and make it easier to do your own diligence.
                </p>
              </div>

              <span className={`${chip} mt-2 w-fit md:mt-0`}>
                <span className="h-2 w-2 rounded-full bg-dh-rebel-red" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-dh-offwhite/90">
                  No predictions · No advice
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Status / Phase + Roadmap */}
      <section className="border-b border-dh-street-gray/40 bg-dh-black px-4 py-12 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
          <div className={card}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/80">
              Status / Phase
            </p>
            <h2 className="mt-2 text-lg font-semibold text-dh-offwhite">
              Phase 1 MVP (current target)
            </h2>
            <p className="mt-2 text-sm text-dh-street-gray/80">
              A tight, shippable slice: scanner → briefing → explainability
              trail.
            </p>

            <div className="mt-4 space-y-2 text-sm text-dh-street-gray/80">
              <div className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-dh-rebel-red" />
                <span>Scanner board with sensible filters and watchlists</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-dh-rebel-red" />
                <span>
                  Briefing output per ticker (what changed + where it came from)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-dh-rebel-red" />
                <span>
                  Explainability panel (inputs, evidence buckets, timestamps)
                </span>
              </div>
            </div>
          </div>

          <div className={card}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/80">
              Roadmap
            </p>
            <h2 className="mt-2 text-lg font-semibold text-dh-offwhite">
              Promoted when the signal is real
            </h2>

            <ol className="mt-4 space-y-3 text-sm text-dh-street-gray/80">
              <li>
                <span className="font-semibold text-dh-offwhite">
                  Phase 1 · MVP
                </span>{" "}
                — Scanner board + ticker briefings + explainability.
              </li>
              <li>
                <span className="font-semibold text-dh-offwhite">
                  Phase 2 · Workflow / Pro mode
                </span>{" "}
                — Saved rules, exports, alert routing, and operator-grade
                filtering.
              </li>
              <li>
                <span className="font-semibold text-dh-offwhite">
                  Phase 3 · Sources & evidence
                </span>{" "}
                — Stronger provenance: evidence links, source snapshots, and
                audit trails.
              </li>
            </ol>

            <div className="mt-5 rounded-xl border border-dh-street-gray/40 bg-dh-black/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-street-gray/80">
                Sources & citations
              </p>
              <p className="mt-2 text-sm text-dh-street-gray/80">
                UI will include a “sources” panel designed for citations and
                evidence links. (No public citations are shown here yet.)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA row */}
      <section className="bg-dh-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t border-dh-street-gray/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 text-sm text-dh-offwhite">
            <p className="font-semibold text-dh-offwhite">
              Want to build around PennyWize?
            </p>
            <p className="text-xs text-dh-street-gray/80">
              A short email with your constraints and goals is perfect.
            </p>

            {/* D-FIN-01 (verbatim) — footer placement */}
            <p className="text-xs leading-relaxed text-dh-street-gray/70">
              Signals and information are provided for research and awareness only. They are not financial,
              investment, legal, or tax advice, and do not constitute a recommendation to buy or sell any
              security.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
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
