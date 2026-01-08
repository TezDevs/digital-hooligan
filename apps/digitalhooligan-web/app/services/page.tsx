import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services · Digital Hooligan",
  description:
    "Services offered by Digital Hooligan LLC – tool-first apps, bots, internal dashboards, and gov/enterprise-ready prototypes.",
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-4 py-2 text-xs font-semibold text-black shadow shadow-dh-rebel-red/30 transition hover:opacity-90";

const secondaryCta =
  "inline-flex items-center justify-center rounded-full border border-dh-steel-blue/60 bg-transparent px-4 py-2 text-xs font-semibold text-dh-steel-blue transition hover:border-dh-steel-blue hover:bg-dh-steel-blue/10";

const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-dh-border bg-transparent px-4 py-2 text-xs font-semibold text-dh-text transition hover:bg-white/5";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-dh-carbon text-dh-text">
      {/* Intro */}
      <section className="border-b border-dh-border px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-steel-blue">
            Services
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Tool-first builds for teams that actually ship.
          </h1>
          <p className="max-w-3xl text-sm text-dh-muted sm:text-base">
            Digital Hooligan LLC is a{" "}
            <span className="font-medium text-dh-text">small, focused studio</span>{" "}
            that designs, builds, and operates web apps, bots, dashboards, and
            automation toys. Ideal for internal tools, early prototypes, and
            disciplined delivery in environments that can’t afford fragile code.
          </p>
        </div>
      </section>

      {/* Three core service buckets */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {/* 1. Short focused builds */}
          <div className="space-y-2 rounded-2xl border border-dh-border bg-dh-panel p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              Short, focused builds
            </p>
            <h2 className="text-sm font-semibold text-dh-text">
              MVPs, dashboards & proof-of-concepts
            </h2>
            <p className="text-xs text-dh-muted">
              4–8 week projects that get you from idea to{" "}
              <span className="font-medium text-dh-text">clickable reality</span>{" "}
              with observability baked in from day one.
            </p>
            <ul className="mt-2 space-y-1 text-[11px] text-dh-muted">
              <li>• Web dashboards for internal programs</li>
              <li>• Targeted scrapers and monitoring jobs</li>
              <li>• Simple APIs & internal tools</li>
            </ul>
          </div>

          {/* 2. Labs-style experiments */}
          <div className="space-y-2 rounded-2xl border border-dh-border bg-dh-panel p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              Labs-style experiments
            </p>
            <h2 className="text-sm font-semibold text-dh-text">
              Experiments with a real upgrade path
            </h2>
            <p className="text-xs text-dh-muted">
              Build small and controlled first. If it works, promote it into a
              product, integration, or hardened internal tool instead of throwing
              it away.
            </p>
            <ul className="mt-2 space-y-1 text-[11px] text-dh-muted">
              <li>• Hype-testing new ideas</li>
              <li>• “Shadow mode” tools alongside existing systems</li>
              <li>• Clear success metrics before scaling</li>
            </ul>
          </div>

          {/* 3. Gov & enterprise */}
          <div className="space-y-2 rounded-2xl border border-dh-border bg-dh-panel p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              Gov & enterprise ready
            </p>
            <h2 className="text-sm font-semibold text-dh-text">
              Prototypes for serious environments
            </h2>
            <p className="text-xs text-dh-muted">
              Used to requirements, test discipline, and “ship it clean.”
              Digital Hooligan is <span className="font-medium text-dh-text">SAM.gov registered</span>{" "}
              and operates as <span className="font-medium text-dh-text">SDVOSB / VOSB</span> with{" "}
              <span className="font-medium text-dh-text">SBA 8(a)</span>.
            </p>
            <ul className="mt-2 space-y-1 text-[11px] text-dh-muted">
              <li>• Internal portals and dashboards</li>
              <li>• Data visualization & alerting surfaces</li>
              <li>• Early-stage tools ahead of larger contracts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How projects run */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-dh-text">
              How projects usually run
            </h2>
            <ol className="space-y-2 text-sm text-dh-muted">
              <li>
                <span className="font-semibold text-dh-text">1. Quick discovery</span>{" "}
                – Clarify the problem, environment, constraints, and success criteria.
              </li>
              <li>
                <span className="font-semibold text-dh-text">2. Lightweight plan</span>{" "}
                – Milestones, rough timeline, and what “done” looks like. No giant decks.
              </li>
              <li>
                <span className="font-semibold text-dh-text">3. Build & iterate</span>{" "}
                – Short cycles with demos and adjustments instead of disappearing for months.
              </li>
              <li>
                <span className="font-semibold text-dh-text">4. Handoff or ongoing care</span>{" "}
                – Clean docs, clean code, and a clear support story.
              </li>
            </ol>
          </div>

          <aside className="space-y-3 rounded-2xl border border-dh-border bg-dh-panel p-4 text-xs text-dh-muted">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-muted">
              Good fit projects
            </p>
            <ul className="space-y-1.5">
              <li>• You want a focused, opinionated builder.</li>
              <li>• You care about dashboards, observability, and uptime.</li>
              <li>• You’re okay starting small and upgrading if it works.</li>
              <li>• You’ll give feedback during the build.</li>
            </ul>
            <p className="pt-2 text-[11px] text-dh-muted/80">
              If you need more visibility, we can provide simple weekly status updates and a
              structured handoff package.
            </p>
          </aside>
        </div>
      </section>

      {/* CTA row */}
      <section className="bg-dh-carbon px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-dh-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-dh-text">
              Ready to talk about a project?
            </p>
            <p className="text-xs text-dh-muted">
              A short email with your constraints and goals is perfect.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/#contact" className={primaryCta}>
              Jump to contact
            </Link>
            <Link href="/contact" className={secondaryCta}>
              Contact page
            </Link>
            <Link href="/" className={neutralCta}>
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
