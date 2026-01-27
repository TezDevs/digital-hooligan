import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/nav/Breadcrumb";

export const metadata: Metadata = {
  title: "Decision Infrastructure for Operators — Digital Hooligan",
  description:
    "Digital Hooligan designs decision infrastructure for operators. OpsToys sprints, RadixOS governance, and evidence-first execution.",
  alternates: { canonical: "https://digitalhooligan.io/" },
  openGraph: {
    title: "Decision Infrastructure for Operators",
    description:
      "A decision infrastructure company for operators. Enter through OpsToys. Govern work with RadixOS. Evidence over vibes.",
    url: "https://digitalhooligan.io/",
    siteName: "Digital Hooligan",
    type: "website",
  },
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-white shadow shadow-dh-rebel-red/30 transition hover:bg-dh-rebel-red/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-rebel-red/60";

const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-dh-border bg-transparent px-5 py-2.5 text-sm font-semibold text-dh-text transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-dh-steel-blue/40";

const tile =
  "rounded-2xl border border-dh-border bg-dh-panel p-5 transition hover:bg-white/5";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dh-carbon text-dh-text">
      {/* Hero */}
      <section className="border-b border-dh-border px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <Breadcrumb items={[{ label: "Home" }]} />

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Two Spines. Clear Boundaries.
          </h1>
          <p className="max-w-3xl text-sm text-dh-muted sm:text-base">
            Decision infrastructure for operators who want judgment to stay
            human, auditable, and explainable.
          </p>
        </div>
      </section>

      {/* Journey Tiles (explicit entry points) */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-5">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-muted/80">
              Start Here
            </p>
            <h2 className="text-xl font-semibold text-dh-text">
              Three clear entry points
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/apps" className={tile}>
              <p className="text-sm font-semibold text-dh-text">
                Understand the Systems
              </p>
              <p className="mt-2 text-sm text-dh-muted">
                A map of spines, product lines, and boundaries.
              </p>
              <p className="mt-3 text-sm text-dh-steel-blue">Go to Systems →</p>
            </Link>

            <Link href="/ops-toys" className={tile}>
              <p className="text-sm font-semibold text-dh-text">
                Deploy Operator Kits
              </p>
              <p className="mt-2 text-sm text-dh-muted">
                Focused kits that slot into existing workflows.
              </p>
              <p className="mt-3 text-sm text-dh-steel-blue">Go to OpsToys →</p>
            </Link>

            <Link href="/operator-notes" className={tile}>
              <p className="text-sm font-semibold text-dh-text">
                Read How We Operate
              </p>
              <p className="mt-2 text-sm text-dh-muted">
                Operator notes, discipline, and decision hygiene.
              </p>
              <p className="mt-3 text-sm text-dh-steel-blue">
                Go to Operator Notes →
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* RadixOS */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-5">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-steel-blue">
              RadixOS — Decision Operating System
            </p>
            <h2 className="text-xl font-semibold text-dh-text">
              Decision Operating System
            </h2>
          </header>

          <div className="max-w-4xl space-y-3 text-sm text-dh-muted sm:text-base">
            <p>
              RadixOS is the spine for how decisions are made, recorded,
              reviewed, and{" "}
              <span className="text-dh-text font-semibold">
                revisited over time
              </span>
              .
            </p>
            <p>
              It defines ownership. It preserves context.{" "}
              <span className="text-dh-text font-semibold">
                It is designed to make judgment legible without replacing it.
              </span>
            </p>
            <p>
              RadixOS does not collapse thinking into tools. It structures
              responsibility so decisions and results can be examined{" "}
              <span className="text-dh-text font-semibold">with context</span> —
              especially when things don’t go as planned.
            </p>
          </div>

          <div className="pt-2">
            <Link href="/apps" className={primaryCta}>
              Explore the systems →
            </Link>
          </div>
        </div>
      </section>

      {/* Solum */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-5">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-steel-blue">
              Solum — Signals + Research Assist
            </p>
            <h2 className="text-xl font-semibold text-dh-text">
              Signals + Research Assist
            </h2>
          </header>

          <div className="max-w-4xl space-y-3 text-sm text-dh-muted sm:text-base">
            <p>
              Solum surfaces signals and evidence that support decision-making
              without telling you what to do.
            </p>
            <p>
              It focuses on explainability: What changed. Why it surfaced. What
              evidence is available. What’s missing.
            </p>
            <p>
              <span className="text-dh-text font-semibold">
                Signals remain separate from decisions by design.
              </span>
            </p>
          </div>

          <div className="pt-2">
            <Link href="/dropsignal" className={neutralCta}>
              View signal lenses →
            </Link>
          </div>
        </div>
      </section>

      {/* OpsToys */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-5">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-steel-blue">
              OpsToys — Packaged Operator Kits
            </p>
            <h2 className="text-xl font-semibold text-dh-text">
              Packaged Operator Kits
            </h2>
          </header>

          <div className="max-w-4xl space-y-3 text-sm text-dh-muted sm:text-base">
            <p>
              OpsToys are focused execution kits — runbooks, utilities, and
              sprintable systems —{" "}
              <span className="text-dh-text font-semibold">
                designed to address common sources of operational drag
              </span>
              .
            </p>
            <p>
              They are not spines. They are not decision systems. They are
              practical tools that slot into existing workflows.
            </p>
          </div>

          <div className="pt-2">
            <Link href="/ops-toys" className={neutralCta}>
              See OpsToys →
            </Link>
          </div>
        </div>
      </section>

      {/* What This Site Is Not */}
      <section className="bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <header className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-muted">
              What This Site Is Not
            </p>
            <p className="max-w-4xl text-sm text-dh-muted sm:text-base">
              This site is not a unified platform. It is not a single interface
              for everything. It does not promise outcomes or outsource
              responsibility.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-dh-border bg-dh-panel p-5">
              <p className="text-sm font-semibold text-dh-text">Is</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
                <li>Decision infrastructure</li>
                <li>Signal + context systems</li>
                <li>Operator-owned judgment</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-dh-border bg-dh-panel p-5">
              <p className="text-sm font-semibold text-dh-text">Is Not</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-dh-muted">
                <li>A unified platform</li>
                <li>A prediction engine</li>
                <li>An advisory service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
