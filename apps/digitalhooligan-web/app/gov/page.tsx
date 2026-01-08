import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Government & Enterprise Services · Digital Hooligan",
  description:
    "Overview of the custom software services Digital Hooligan LLC provides under NAICS 541511 for government and enterprise teams.",
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-4 py-2 font-semibold text-black shadow shadow-dh-rebel-red/30 transition hover:opacity-90";

const secondaryCta =
  "inline-flex items-center justify-center rounded-full border border-dh-steel-blue/60 bg-transparent px-4 py-2 font-semibold text-dh-steel-blue transition hover:border-dh-steel-blue hover:bg-dh-steel-blue/10";

export default function GovServicesPage() {
  return (
    <main className="min-h-screen bg-dh-carbon text-dh-text">
      {/* Intro */}
      <section className="border-b border-dh-border px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-muted">
              Government &amp; enterprise
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Services under NAICS 541511.
            </h1>
            <p className="max-w-3xl text-sm text-dh-muted sm:text-base">
              Digital Hooligan LLC operates under{" "}
              <span className="font-medium text-dh-text">
                NAICS 541511 – Custom Computer Programming Services
              </span>{" "}
              as a veteran-owned small business focused on small, focused builds
              supporting mission teams with modern, maintainable software.
            </p>
          </div>

          {/* Credentials */}
          <div className="rounded-2xl border border-dh-border bg-dh-panel p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              SAM.gov &amp; certifications
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-dh-border bg-dh-carbon/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dh-muted">
                  Registration
                </p>
                <p className="mt-1 text-sm font-semibold text-dh-text">
                  SAM.gov Registered
                </p>
              </div>

              <div className="rounded-2xl border border-dh-border bg-dh-carbon/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dh-muted">
                  Certification
                </p>
                <p className="mt-1 text-sm font-semibold text-dh-text">SDVOSB</p>
                <p className="text-xs text-dh-muted">
                  Service-Disabled Veteran-Owned Small Business
                </p>
              </div>

              <div className="rounded-2xl border border-dh-border bg-dh-carbon/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dh-muted">
                  Certification
                </p>
                <p className="mt-1 text-sm font-semibold text-dh-text">VOSB</p>
                <p className="text-xs text-dh-muted">
                  Veteran-Owned Small Business
                </p>
              </div>

              <div className="rounded-2xl border border-dh-border bg-dh-carbon/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dh-muted">
                  Program
                </p>
                <p className="mt-1 text-sm font-semibold text-dh-text">SBA 8(a)</p>
                <p className="text-xs text-dh-muted">
                  Business Development Program
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-dh-muted">
              UEI / CAGE and additional registration details available upon request.
            </p>
          </div>
        </div>
      </section>

      {/* Core service areas */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="space-y-2 rounded-2xl border border-dh-border bg-dh-panel p-4 text-xs text-dh-muted">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              Custom applications
            </p>
            <h2 className="text-sm font-semibold text-dh-text">
              Web apps &amp; internal tools
            </h2>
            <ul className="mt-1 space-y-1.5">
              <li>• Mission dashboards and status boards</li>
              <li>• Workflow tools for analysts and operators</li>
              <li>• Lightweight portals for programs and teams</li>
              <li>• Internal self-service tools for busy staff</li>
            </ul>
          </div>

          <div className="space-y-2 rounded-2xl border border-dh-border bg-dh-panel p-4 text-xs text-dh-muted">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              Data &amp; automation
            </p>
            <h2 className="text-sm font-semibold text-dh-text">
              Bots, scrapers &amp; integrations
            </h2>
            <ul className="mt-1 space-y-1.5">
              <li>• Data collection and transformation pipelines</li>
              <li>• Targeted scrapers and monitoring jobs</li>
              <li>• Alerting &amp; notification surfaces around key signals</li>
              <li>• Integrations with existing systems and APIs</li>
            </ul>
          </div>

          <div className="space-y-2 rounded-2xl border border-dh-border bg-dh-panel p-4 text-xs text-dh-muted">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              Prototypes &amp; POCs
            </p>
            <h2 className="text-sm font-semibold text-dh-text">
              Try it before you scale it
            </h2>
            <ul className="mt-1 space-y-1.5">
              <li>• Early-stage tools to de-risk bigger contracts</li>
              <li>• Shadow-mode tools alongside existing workflows</li>
              <li>• Rapid iterations with real user feedback</li>
              <li>• Clear handoff path to larger teams or vendors</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Environments & fit */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
          <div className="space-y-3 text-sm text-dh-muted">
            <h2 className="text-lg font-semibold text-dh-text">
              Where Digital Hooligan fits.
            </h2>
            <p>
              A strong fit for missions that need{" "}
              <span className="font-medium text-dh-text">
                focused, low-bureaucracy builds
              </span>{" "}
              that still respect requirements, security, and test discipline.
            </p>
            <ul className="space-y-2">
              <li>• Unclassified or low-side work with remote-friendly teams</li>
              <li>• Small task orders that benefit from one strong builder</li>
              <li>• Programs that want to validate quickly before scaling</li>
              <li>• Offices that need internal tools without 18-month waits</li>
            </ul>
          </div>

          <aside className="space-y-3 rounded-2xl border border-dh-border bg-dh-panel p-4 text-xs text-dh-muted">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-muted">
              Delivery style
            </p>
            <ul className="space-y-1.5">
              <li>• Clear milestones and simple reporting</li>
              <li>• Preference for readable code and docs</li>
              <li>• Comfortable with requirements, test plans, and audits</li>
              <li>• Bias toward dashboards, logs, and observability</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* How engagements work */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6 text-sm text-dh-muted">
          <h2 className="text-lg font-semibold text-dh-text">
            How a typical engagement works.
          </h2>
          <ol className="space-y-3 text-xs sm:text-sm">
            <li>
              <span className="font-semibold text-dh-text">1. Short discovery</span>{" "}
              – Understand the environment, constraints, mission, and systems in place.
            </li>
            <li>
              <span className="font-semibold text-dh-text">2. Scope a focused build</span>{" "}
              – Define a small, high-impact slice that proves value quickly.
            </li>
            <li>
              <span className="font-semibold text-dh-text">3. Build, demo, refine</span>{" "}
              – Ship early versions, collect feedback, and refine until it’s useful.
            </li>
            <li>
              <span className="font-semibold text-dh-text">4. Hand off or extend</span>{" "}
              – Continue iterating, or hand off clean code and docs to a larger team.
            </li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dh-carbon px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-dh-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-dh-text">
              Exploring work under NAICS 541511?
            </p>
            <p className="text-xs text-dh-muted">
              A short description of the environment, mission, and scope is enough to start.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link href="/contact" className={primaryCta}>
              Contact Digital Hooligan
            </Link>
            <Link href="/company" className={secondaryCta}>
              View company profile
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
