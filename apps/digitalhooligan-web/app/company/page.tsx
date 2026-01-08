import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Company · Digital Hooligan",
  description:
    "Company profile for Digital Hooligan LLC – a veteran-owned NAICS 541511 software studio building web apps, bots, dashboards, and automation tools.",
};

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-black shadow shadow-dh-rebel-red/30 transition hover:opacity-90";

const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-dh-border bg-transparent px-4 py-2 text-sm font-semibold text-dh-text transition hover:bg-white/5";

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-dh-carbon text-dh-text">
      {/* Intro */}
      <section className="border-b border-dh-border px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-muted">
            Company profile
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Digital Hooligan LLC.
          </h1>
          <p className="max-w-3xl text-sm text-dh-muted sm:text-base">
            Digital Hooligan LLC is a{" "}
            <span className="font-semibold text-dh-text">
              small, independent software studio
            </span>{" "}
            focused on custom web apps, bots, dashboards, and automation tools.
            The studio blends product thinking, engineering discipline, and
            operations experience from defense and enterprise environments.
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {/* Legal / ownership */}
          <div className="space-y-2 rounded-2xl border border-dh-border bg-dh-panel p-4 text-xs text-dh-muted">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              Legal
            </p>
            <ul className="space-y-1.5">
              <li>
                <span className="font-medium text-dh-text">Legal name:</span>{" "}
                Digital Hooligan LLC
              </li>
              <li>
                <span className="font-medium text-dh-text">Structure:</span>{" "}
                Single-member LLC
              </li>
              <li>
                <span className="font-medium text-dh-text">Ownership:</span>{" "}
                SDVOSB · VOSB · SBA 8(a)
              </li>
              <li>
                <span className="font-medium text-dh-text">Primary NAICS:</span>{" "}
                541511 – Custom Computer Programming Services
              </li>
              <li>
                <span className="font-medium text-dh-text">Registration:</span>{" "}
                SAM.gov registered
              </li>
              <li>
                <span className="font-medium text-dh-text">UEI/CAGE:</span>{" "}
                Available upon request
              </li>
            </ul>
          </div>

          {/* Focus areas */}
          <div className="space-y-2 rounded-2xl border border-dh-border bg-dh-panel p-4 text-xs text-dh-muted">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              Focus areas
            </p>
            <ul className="space-y-1.5">
              <li>• Custom web applications and internal tools</li>
              <li>• Data dashboards and monitoring surfaces</li>
              <li>• Bots, scrapers, and automation workflows</li>
              <li>• Early-stage prototypes and proofs of concept</li>
            </ul>
          </div>

          {/* Gov & enterprise */}
          <div className="space-y-2 rounded-2xl border border-dh-border bg-dh-panel p-4 text-xs text-dh-muted">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
              Government & enterprise
            </p>
            <ul className="space-y-1.5">
              <li>• NAICS 541511 – custom software services</li>
              <li>• SAM.gov registered</li>
              <li>• Delivery discipline for requirements and audits</li>
              <li>• Focus on unclassified and remote-friendly work</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How the studio operates + gov link */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
          <div className="space-y-3 text-sm text-dh-muted">
            <h2 className="text-lg font-semibold text-dh-text">
              How the studio operates.
            </h2>
            <p>
              Digital Hooligan is intentionally small and hands-on. You work
              directly with the builder, not a rotating cast of account
              managers. Projects are scoped to be{" "}
              <span className="font-semibold text-dh-text">
                focused, measurable, and shippable
              </span>
              .
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>• Short discovery to clarify constraints and environment.</li>
              <li>• Transparent milestones and simple updates.</li>
              <li>• Preference for dashboards, observability, and clear outcomes.</li>
              <li>• Comfortable collaborating with dev, test, and ops teams.</li>
            </ul>
          </div>

          <aside className="space-y-3 rounded-2xl border border-dh-border bg-dh-panel p-4 text-xs text-dh-muted">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-muted">
              Government services
            </p>
            <p>
              For how NAICS 541511 maps to real project types and missions, see{" "}
              <Link
                href="/gov"
                className="font-semibold text-dh-steel-blue hover:underline underline-offset-2"
              >
                Government &amp; enterprise services
              </Link>
              .
            </p>
            <p className="text-[11px] text-dh-muted/80">
              Good fit for unclassified or low-side work, small task orders, and
              teams that want to validate quickly before scaling.
            </p>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dh-carbon px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-dh-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-dh-text">
              Want to talk about a project or contract?
            </p>
            <p className="text-xs text-dh-muted">
              A short, direct email with your environment, constraints, and goals
              is perfect—no giant RFP required to start.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/#contact" className={primaryCta}>
              Contact Digital Hooligan
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
