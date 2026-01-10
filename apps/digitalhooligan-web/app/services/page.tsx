import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services · Digital Hooligan",
  description:
    "Fixed-scope offers for discovery, prototypes, production increments, and automation retainers — with clear deliverables and a clean handoff.",
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-4 py-2 text-xs font-semibold text-white shadow shadow-dh-rebel-red/30 transition hover:bg-dh-rebel-red/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-rebel-red/60";

const secondaryCta =
  "inline-flex items-center justify-center rounded-full border border-dh-steel-blue/60 bg-transparent px-4 py-2 text-xs font-semibold text-dh-steel-blue transition hover:border-dh-steel-blue hover:bg-dh-steel-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-steel-blue/50";

const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-dh-border bg-transparent px-4 py-2 text-xs font-semibold text-dh-text transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-steel-blue/40";

type Offer = {
  id: string;
  name: string;
  tier1Name: string;
  startingAt: string;
  blurb: string[];
};

const OFFERS: Offer[] = [
  {
    id: "signal-to-spec",
    name: "Signal-to-Spec Discovery",
    tier1Name: "Tier 1 — Rapid Discovery",
    startingAt: "$2,500",
    blurb: [
      "Use this when you’re not sure what to build first — or you’ve got competing priorities and unclear risks.",
      "We turn “ideas” into a scoped plan: requirements, data sources, constraints, and acceptance criteria.",
      "You leave with clarity, not a pitch deck.",
    ],
  },
  {
    id: "prototype-sprint",
    name: "Prototype Sprint",
    tier1Name: "Tier 1 — Proof-of-Concept Sprint",
    startingAt: "$9,500",
    blurb: [
      "Build something real enough to test assumptions.",
      "We prioritize the riskiest parts first, then ship a demoable slice with clear notes on what’s proven and what’s not.",
    ],
  },
  {
    id: "build-ship",
    name: "Build & Ship Increment",
    tier1Name: "Tier 1 — 4-Week Increment",
    startingAt: "$24,000",
    blurb: [
      "Ship a real increment, not a fragile prototype.",
      "We scope a release slice, build it with reliability in mind, and deliver with the artifacts your team needs to operate it.",
    ],
  },
  {
    id: "retainer",
    name: "Automation & Integrations Retainer",
    tier1Name: "Tier 1 — Essential",
    startingAt: "$2,500 / month",
    blurb: [
      "For teams who need a reliable builder in the loop.",
      "We handle small builds, integrations, automation, and quality improvements — with a clear intake path and scope boundaries.",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-dh-carbon text-dh-text">
      {/* Hero */}
      <section className="border-b border-dh-border px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-steel-blue">
            Services
          </p>

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Offers built for shipping.
          </h1>

          <p className="max-w-3xl text-sm text-dh-muted sm:text-base">
            Fixed‑scope tiers with clear deliverables and a clean handoff.
          </p>
        </div>
      </section>

      {/* Offers */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-dh-text">Choose your entry point.</h2>
            <p className="max-w-3xl text-sm text-dh-muted">
              Start with discovery, validate with a prototype, or ship an increment.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {OFFERS.map((offer) => (
              <article
                key={offer.id}
                id={offer.id}
                className="space-y-3 rounded-2xl border border-dh-border bg-dh-panel p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
                  Offer
                </p>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-dh-text">{offer.name}</h3>

                  <div className="space-y-2 text-sm text-dh-muted">
                    {offer.blurb.map((line, idx) => (
                      <p key={`${offer.id}-blurb-${idx}`}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center rounded-full border border-dh-border bg-dh-carbon px-3 py-1 text-[11px] font-semibold text-dh-text">
                    {offer.tier1Name}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-dh-border bg-dh-carbon px-3 py-1 text-[11px] font-semibold text-dh-text">
                    Starting at {offer.startingAt}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Link href="/contact" className={primaryCta}>
                    Book a fit check
                  </Link>
                  <Link href="/contact" className={secondaryCta}>
                    Request a scoped quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-dh-text">How we work</h2>

            <ol className="space-y-2 text-sm text-dh-muted">
              <li>
                <span className="font-semibold text-dh-text">1. Align</span> — outcome, constraints, success
                signals
              </li>
              <li>
                <span className="font-semibold text-dh-text">2. Ship</span> — fixed scope, weekly demos, clean
                PRs
              </li>
              <li>
                <span className="font-semibold text-dh-text">3. Handoff</span> — docs, runbook, what shipped +
                what’s next
              </li>
            </ol>

            <div className="space-y-2 text-sm text-dh-muted">
              <p>We run short cycles with explicit scope.</p>
              <p>You’ll see progress weekly, not at the end.</p>
              <p>
                Deliverables are defined up front, and anything outside scope goes through a written add‑on/change
                order path.
              </p>
              <p>You get a clean repo, handoff notes, and the context to keep moving.</p>
            </div>
          </div>

          <aside className="space-y-3 rounded-2xl border border-dh-border bg-dh-panel p-5 text-sm text-dh-muted">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-muted">
              Credibility strip
            </p>
            <ul className="space-y-1.5">
              <li className="text-sm">• Fixed‑scope tiers + written change control</li>
              <li className="text-sm">• Weekly demos + visible artifacts</li>
              <li className="text-sm">• Clean repo + handoff notes</li>
              <li className="text-sm">• Security‑first defaults (practices, not certifications)</li>
              <li className="text-sm">• Support only when contracted (no implied SLA)</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* CTAs */}
      <section className="bg-dh-carbon px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6 border-t border-dh-border pt-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-dh-text">Start here</p>
            <p className="text-xs text-dh-muted">
              Choose the smallest tier that produces a decision or a shippable artifact — then expand via a new
              tier or change order.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 rounded-2xl border border-dh-border bg-dh-panel p-5">
              <Link href="/contact" className={primaryCta}>
                Book a fit check
              </Link>
              <p className="text-xs text-dh-muted">
                Bring a 1‑paragraph problem statement + any links/screenshots.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-dh-border bg-dh-panel p-5">
              <Link href="/contact" className={secondaryCta}>
                Request a scoped quote
              </Link>
              <p className="text-xs text-dh-muted">Tell us the outcome + deadline + constraints.</p>
            </div>

            <div className="space-y-2 rounded-2xl border border-dh-border bg-dh-panel p-5">
              <Link href="/contact" className={neutralCta}>
                Start with Discovery
              </Link>
              <p className="text-xs text-dh-muted">
                If requirements are fuzzy, this is the right first move.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Link href="/labs" className={neutralCta}>
              See proof &amp; build notes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
