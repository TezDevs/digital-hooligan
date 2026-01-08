import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Company · Digital Hooligan",
  description:
    "Company profile for Digital Hooligan LLC – a veteran-owned NAICS 541511 software studio building web apps, bots, dashboards, and automation tools.",
};

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
      {/* Intro */}
      <section className="border-b border-white/5 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            COMPANY PROFILE
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Digital Hooligan LLC.
          </h1>
          <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
            Digital Hooligan LLC is a{" "}
            <span className="font-semibold text-slate-100">
              small, independent software studio
            </span>{" "}
            focused on custom web apps, bots, dashboards, and automation tools.
            The studio blends product thinking, engineering discipline, and
            operations experience from defense and enterprise environments.
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-b border-white/5 bg-slate-950/80 px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
          {/* Legal / ownership */}
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4 text-xs text-slate-300">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              LEGAL
            </p>
            <ul className="space-y-1.5">
              <li>
                <span className="font-medium text-slate-100">Legal name:</span>{" "}
                Digital Hooligan LLC
              </li>
              <li>
                <span className="font-medium text-slate-100">Structure:</span>{" "}
                Single-member LLC
              </li>
              <li>
                <span className="font-medium text-slate-100">Ownership:</span>{" "}
                Veteran-owned small business (VSOB)
              </li>
              <li>
                <span className="font-medium text-slate-100">SBA:</span> Meets
                Small Business Administration (SBA) small business size
                standards for NAICS 541511
              </li>
              <li>
                <span className="font-medium text-slate-100">
                  Primary NAICS:
                </span>{" "}
                541511 – Custom Computer Programming Services
              </li>
            </ul>
          </div>

          {/* Focus areas */}
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4 text-xs text-slate-300">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              FOCUS AREAS
            </p>
            <ul className="space-y-1.5">
              <li>• Custom web applications and internal tools</li>
              <li>• Data dashboards and monitoring surfaces</li>
              <li>• Bots, scrapers, and automation workflows</li>
              <li>• Early-stage prototypes and proofs of concept</li>
            </ul>
          </div>

          {/* Gov & enterprise */}
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4 text-xs text-slate-300">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              GOVERNMENT &amp; ENTERPRISE
            </p>
            <ul className="space-y-1.5">
              <li>• NAICS 541511 – custom software services</li>
              <li>• SAM.gov registered under this NAICS</li>
              <li>• Experience in defense / government programs</li>
              <li>• Focus on unclassified and remote-friendly work</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How the studio operates + gov link */}
      <section className="border-b border-white/5 bg-black px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
          <div className="space-y-3 text-sm text-slate-300">
            <h2 className="text-lg font-semibold text-slate-50">
              How the studio operates.
            </h2>
            <p>
              Digital Hooligan is intentionally small and hands-on. You work
              directly with the builder, not a rotating cast of account
              managers. Projects are scoped to be{" "}
              <span className="font-semibold text-slate-100">
                focused, measurable, and shippable
              </span>
              .
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                • Short discovery to clarify constraints, environment, and
                goals.
              </li>
              <li>
                • Transparent milestones and simple updates—not endless decks.
              </li>
              <li>
                • Preference for dashboards, observability, and clear outcomes.
              </li>
              <li>
                • Comfortable collaborating with existing dev, test, or ops
                teams.
              </li>
            </ul>
          </div>

          <aside className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              GOVERNMENT SERVICES
            </p>
            <p>
              For how NAICS 541511 maps to real project types and missions, see
              the{" "}
              <Link
                href="/gov"
                className="font-semibold text-emerald-300 underline-offset-2 hover:underline"
              >
                Government &amp; enterprise services
              </Link>{" "}
              page.
            </p>
            <p className="text-[11px] text-slate-500">
              Good fit for unclassified or low-side work, small task orders, and
              teams that want to experiment before scaling a full vendor team.
            </p>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm text-slate-200">
            <p className="font-semibold text-slate-50">
              Want to talk about a project or contract?
            </p>
            <p className="text-xs text-slate-400">
              A short, direct email with your environment, constraints, and
              goals is perfect—no giant RFP required to start the conversation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-black shadow shadow-dh-rebel-red/30 transition hover:opacity-90"
            >
              Contact Digital Hooligan
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-black px-4 py-2 font-semibold text-slate-100 hover:border-emerald-400/70"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
