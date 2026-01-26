import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/nav/Breadcrumb";

export const metadata: Metadata = {
  title: "Services · Digital Hooligan",
  description:
    "Implementation and rollout of defined systems — not open-ended consulting.",
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-white shadow shadow-dh-rebel-red/30 transition hover:bg-dh-rebel-red/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-rebel-red/60";

const panel = "rounded-2xl border border-dh-border bg-dh-panel p-5";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-dh-carbon text-dh-text">
      <section className="border-b border-dh-border px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Systems", href: "/apps" },
              { label: "Services" },
            ]}
          />

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Deploying Operator-Grade Systems
          </h1>
          <p className="max-w-3xl text-sm text-dh-muted sm:text-base">
            Implementation and rollout of defined systems — not open-ended
            consulting.
          </p>
        </div>
      </section>

      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <article className={panel}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-steel-blue">
                RadixOS Deployments
              </p>
              <p className="mt-3 text-sm text-dh-muted">
                <span className="font-semibold text-dh-text">
                  We deploy RadixOS into defined operating environments.
                </span>
              </p>
              <p className="mt-3 text-sm text-dh-muted">That includes:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
                <li>Decision object definitions</li>
                <li>Ownership mapping</li>
                <li>Review cadence setup</li>
                <li>Explainability standards</li>
              </ul>
              <p className="mt-3 text-sm text-dh-muted">
                Deployments are scoped, documented, and{" "}
                <span className="font-semibold text-dh-text">
                  designed to support later review
                </span>
                .
              </p>
            </article>

            <article className={panel}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-steel-blue">
                Solum Integrations
              </p>
              <p className="mt-3 text-sm text-dh-muted">
                We integrate Solum into research and monitoring workflows where
                signal clarity matters.
              </p>
              <p className="mt-3 text-sm text-dh-muted">
                Signals remain assistive. Judgment remains human. Boundaries
                stay explicit.
              </p>
            </article>

            <article className={panel}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-steel-blue">
                OpsToys Rollouts
              </p>
              <p className="mt-3 text-sm text-dh-muted">
                OpsToys are deployed as focused sprints with clear entry and
                exit criteria.
              </p>
              <p className="mt-3 text-sm text-dh-muted">
                Each rollout ends with:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
                <li>Working artifacts</li>
                <li>Clear usage guidance</li>
                <li>Explicit limitations</li>
              </ul>
            </article>
          </div>

          {/* Who this is for / not for */}
          <div className="grid gap-6 border-t border-dh-border pt-6 md:grid-cols-2">
            <div className={panel}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted/80">
                Who this is for
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
                <li>
                  Operators who want explicit boundaries and scoped delivery
                </li>
                <li>
                  Teams that need ownership + review cadence to survive turnover
                </li>
                <li>Programs where explainability and auditability matter</li>
              </ul>
            </div>

            <div className={panel}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted/80">
                Who this is not for
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
                <li>Open-ended “do everything” advisory arrangements</li>
                <li>
                  Work that requires implied guarantees or fixed timelines
                </li>
                <li>Engagements where boundaries cannot be documented</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dh-border pt-6">
            <p className="text-sm text-dh-muted">
              Deployments are scoped. Boundaries are explicit. Judgment remains
              human.
            </p>
            <Link href="/contact" className={primaryCta}>
              Request a deployment discussion →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
