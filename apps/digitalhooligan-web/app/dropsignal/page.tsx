import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DropSignal · Digital Hooligan",
  description:
    "DropSignal is hype intelligence and trend radar for releases—assist-mode alerts, research context, and a drops timeline. Not resale advice.",
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-black shadow shadow-dh-rebel-red/30 transition hover:opacity-90";

const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-slate-700 bg-black/40 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-black/60";

const linkStyle =
  "font-semibold text-sky-300 underline underline-offset-2 transition hover:text-sky-200";

export default function DropSignalPage() {
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
              Status: Assist-mode planning
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              DropSignal
            </h1>

            <p className="max-w-3xl text-balance text-sm text-slate-300 sm:text-base">
              Hype intelligence and trend radar for releases. DropSignal focuses
              on{" "}
              <span className="font-semibold text-slate-100">
                assist-mode alerts
              </span>
              , research context, and a clean drops timeline—without pretending
              to be resale advice.
            </p>

            <p className="max-w-3xl text-xs text-slate-400">
              DropSignal does{" "}
              <span className="font-semibold text-slate-200">not</span> provide
              resale guarantees, pricing predictions, or “flip” recommendations.
              It’s informational and experimental.
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
              A release board for people who hate noise.
            </h2>
            <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
              DropSignal is built to help you track what’s coming, what changed,
              and where the signal came from—so you can decide how to act.
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-black/80 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Feature 01
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">
                Assist-mode alerts
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Notifications designed to assist—not “autobuy.” Track restocks,
                drops movement, and changes across the sources you care about.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Early focus: fewer alerts, higher usefulness.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-black/80 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Feature 02
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">
                Research context
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                A quick context panel per release: what changed, which sources
                referenced it, and what’s still uncertain.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Built to reduce doomscrolling and conflicting screenshots.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-black/80 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Feature 03
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">
                Drops timeline
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                A timeline view that helps you track upcoming releases, changes,
                and key timestamps—clean enough to use daily.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Designed like a board, not a hype landing page.
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
                  DropSignal is{" "}
                  <span className="font-semibold text-slate-50">
                    not resale advice
                  </span>
                  , not a prediction engine, and not a guaranteed checkout tool.
                  It’s an assist-mode research and alerting surface.
                </p>
              </div>
              <div className="text-xs text-slate-300">
                <p className="font-semibold text-slate-200">No promises:</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>No “profit” predictions</li>
                  <li>No guaranteed restock detection</li>
                  <li>No retailer-affiliated claims</li>
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
              DropSignal is designed to show “why you saw this”—with a sources
              panel per alert so you can trace where the info came from.
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
                  Phase 1 · Assist mode
                </span>
              </div>
              <p className="text-sm text-slate-300">
                Assist-mode first: useful alerts with context, not “autobuy”
                flows.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-50">
                Roadmap
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <span className="font-semibold text-slate-100">
                    Phase 1 (Assist mode):
                  </span>{" "}
                  alerts + context panels + clean drops timeline.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Phase 2 (Workflow / Pro mode):
                  </span>{" "}
                  filters, watchlists, better source traceability, fewer noisy
                  pings.
                </li>
                <li>
                  <span className="font-semibold text-slate-100">
                    Phase 3 (Retailer integrations “grown-up mode”):
                  </span>{" "}
                  optional integrations and workflows where appropriate—still
                  transparent, still not advice.
                </li>
              </ul>
            </div>
          </div>

          <aside className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-300">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Good fit for
            </p>
            <ul className="space-y-2">
              <li>• People tracking releases across multiple sources</li>
              <li>• Teams building a release ops board for a community</li>
              <li>• Builders who want signal + context + traceability</li>
            </ul>
            <p className="text-xs text-slate-400">
              Want this as a private dashboard for a shop, group, or internal
              ops?{" "}
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
              Want an assist-mode alerting tool for your product?
            </p>
            <p className="text-xs text-slate-400">
              Send a short email with your sources, constraints, and desired
              outputs.
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
