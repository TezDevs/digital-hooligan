import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DropSignal · Digital Hooligan",
  description:
    "DropSignal is hype intelligence and trend radar for sneakers and streetwear—assist-mode alerts, research context, and a drops timeline. Not resale advice.",
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

export default function DropSignalPage() {
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
              DropSignal
            </h1>
            <span className={chip}>
              <span className="h-2 w-2 rounded-full bg-dh-rebel-red" />
              <span className="uppercase tracking-[0.18em] text-[11px] text-dh-offwhite/90">
                Status · Assist-mode MVP
              </span>
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-semibold text-dh-offwhite">
              Hype intelligence. Trend radar. Clean alerts.
            </p>
            <p className={subtle}>
              DropSignal is a{" "}
              <span className="font-semibold text-dh-offwhite">
                research-driven drops workflow
              </span>{" "}
              for sneakers and streetwear: assist-mode alerts, context for why
              something matters, and a timeline view that’s built for
              operators—not hype spam.
            </p>
            <p className="text-xs text-dh-street-gray/70">
              Not resale advice. No guaranteed checkout. No “profit” promises.
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
              Built to cut through noise: a calm signal layer with enough
              context to decide what to watch.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className={card}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/80">
                Feature
              </p>
              <h3 className="mt-2 text-base font-semibold text-dh-offwhite">
                Assist-mode alerts
              </h3>
              <p className="mt-2 text-sm text-dh-street-gray/80">
                Notifications and signals designed to assist your
                workflow—without pretending to be a magic “buy button.”
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-dh-street-gray/80">
                <li>• Restocks, price drops, and notable movement</li>
                <li>• Rules per brand / retailer / category</li>
                <li>• Low-noise alert formatting</li>
              </ul>
            </div>

            <div className={card}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/80">
                Feature
              </p>
              <h3 className="mt-2 text-base font-semibold text-dh-offwhite">
                Research context
              </h3>
              <p className="mt-2 text-sm text-dh-street-gray/80">
                Quick context to answer “why is this trending?”—category notes,
                references, and evidence buckets.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-dh-street-gray/80">
                <li>• Brief “what changed” summaries</li>
                <li>• Source buckets and timestamps</li>
                <li>• Built for later citations</li>
              </ul>
            </div>

            <div className={card}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/80">
                Feature
              </p>
              <h3 className="mt-2 text-base font-semibold text-dh-offwhite">
                Drops timeline
              </h3>
              <p className="mt-2 text-sm text-dh-street-gray/80">
                A structured timeline for upcoming drops, changes, and watch
                targets—so you can plan instead of panic-refresh.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-dh-street-gray/80">
                <li>• Calendar-ish view of key dates</li>
                <li>• “Watch / ignore” controls</li>
                <li>• Notes per item</li>
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
                  DropSignal is not resale advice and not a guaranteed checkout
                  tool.
                </p>
                <p className="text-xs text-dh-street-gray/80">
                  It’s assist-mode intelligence: alerts + context + a cleaner
                  workflow around drops.
                </p>
              </div>

              <span className={`${chip} mt-2 w-fit md:mt-0`}>
                <span className="h-2 w-2 rounded-full bg-dh-rebel-red" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-dh-offwhite/90">
                  No guarantees · No “profit” claims
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-b border-dh-street-gray/40 bg-dh-black px-4 py-12 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
          <div className={card}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/80">
              Status / Phase
            </p>
            <h2 className="mt-2 text-lg font-semibold text-dh-offwhite">
              Assist mode first (current)
            </h2>
            <p className="mt-2 text-sm text-dh-street-gray/80">
              Prove signal quality and workflow value before adding heavier
              integrations.
            </p>

            <div className="mt-4 space-y-2 text-sm text-dh-street-gray/80">
              <div className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-dh-rebel-red" />
                <span>
                  Alert routing + user rules (brands/retailers/categories)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-dh-rebel-red" />
                <span>Timeline view with notes and change tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-dh-rebel-red" />
                <span>Context blocks with timestamps and evidence buckets</span>
              </div>
            </div>
          </div>

          <div className={card}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/80">
              Roadmap
            </p>
            <h2 className="mt-2 text-lg font-semibold text-dh-offwhite">
              Grown-up mode comes later
            </h2>

            <ol className="mt-4 space-y-3 text-sm text-dh-street-gray/80">
              <li>
                <span className="font-semibold text-dh-offwhite">
                  Phase 1 · Assist mode
                </span>{" "}
                — Alerts + timeline + context (no heavy coupling).
              </li>
              <li>
                <span className="font-semibold text-dh-offwhite">
                  Phase 2 · Workflow / Pro mode
                </span>{" "}
                — Saved playbooks, exports, and operator-grade filtering.
              </li>
              <li>
                <span className="font-semibold text-dh-offwhite">
                  Phase 3 · Retailer integrations
                </span>{" "}
                — “Grown-up mode” integrations where appropriate (without hype
                promises).
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
          <div className="space-y-1 text-sm text-dh-offwhite">
            <p className="font-semibold text-dh-offwhite">
              Want DropSignal built for your workflow?
            </p>
            <p className="text-xs text-dh-street-gray/80">
              Short email. Clear constraints. We’ll keep it tight and shippable.
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
