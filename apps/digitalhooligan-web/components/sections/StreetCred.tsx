import Link from "next/link";

export default function StreetCred() {
  return (
    <section
      id="street-cred"
      className="border-t border-zinc-800 bg-black px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Street Cred
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              Who&apos;s behind Digital Hooligan?
            </h2>
            <p className="mt-3 max-w-xl text-sm text-zinc-400">
              Digital Hooligan LLC is a single-member software studio run by
              Courtez M. Cannady (TezDevs) focused on custom software, ops
              tooling, and automation for real operators—engineers, traders,
              analysts, and teams doing work that actually matters.
            </p>
          </div>

          <div className="max-w-md text-xs text-zinc-500">
            <p>
              The public site shows off the apps and brand. This section is the
              &quot;grown-up&quot; snapshot: real company, real code, and
              services aligned to{" "}
              <span className="font-medium text-zinc-300">
                NAICS 541511 – Custom Computer Programming Services
              </span>
              .
            </p>
          </div>
        </div>

        {/* Grid: profiles + contracting snapshot */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {/* Profile / links */}
          <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
            <h3 className="text-sm font-semibold text-zinc-50">
              Operator in Charge
            </h3>
            <p className="text-sm text-zinc-400">
              <span className="font-medium text-zinc-100">
                Courtez M. Cannady
              </span>{" "}
              (<span className="font-mono text-emerald-300">TezDevs</span>) is
              the founder and hands-on engineer behind Digital Hooligan LLC.
              Background in engineering, test management, and real systems work
              with defense and government-focused environments.
            </p>
            <div className="space-y-2 text-sm">
              <Link
                href="https://github.com/TezDevs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-zinc-200 transition hover:border-emerald-500/60 hover:text-emerald-100"
              >
                <span className="font-mono text-xs">GitHub</span>
                <span className="text-xs text-zinc-400">TezDevs</span>
              </Link>
              <div>
                <Link
                  href="https://www.linkedin.com/in/courtez-cannady-a"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-zinc-200 transition hover:border-emerald-500/60 hover:text-emerald-100"
                >
                  <span className="font-mono text-xs">LinkedIn</span>
                  <span className="text-xs text-zinc-400">
                    Courtez M. Cannady
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Apps & portfolio */}
          <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
            <h3 className="text-sm font-semibold text-zinc-50">
              Street apps & experiments
            </h3>
            <p className="text-sm text-zinc-400">
              Digital Hooligan is the umbrella for a set of focused tools:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-400">
              <li>
                <span className="font-medium text-zinc-100">PennyWize</span> – a
                penny-stock and micro-cap focused data + alerting tool with a
                public-facing site and eventual web app.
              </li>
              <li>
                <span className="font-medium text-zinc-100">DropSignal</span> –{" "}
                sneaker and streetwear drop radar for price alerts and future
                assist-mode tooling.
              </li>
              <li>
                <span className="font-medium text-zinc-100">HypeWatch</span> –{" "}
                collectibles tracking (cards, figures, magazines, watches) with
                a focus on price and demand signals.
              </li>
              <li>
                <span className="font-medium text-zinc-100">Ops Toys</span> –{" "}
                ops automation toys: small, sharp tools for infra, logging, and
                developer workflows.
              </li>
            </ul>
            <p className="mt-3 text-xs text-zinc-500">
              These aren&apos;t just logos. They are where the patterns for
              automation, dashboards, and integrations get battle-tested before
              being applied to customer work.
            </p>
          </div>

          {/* Contracting snapshot */}
          <div className="space-y-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-5">
            <h3 className="text-sm font-semibold text-emerald-200">
              Contracting Snapshot
            </h3>
            <dl className="space-y-2 text-xs text-zinc-200">
              <div>
                <dt className="font-semibold text-zinc-100">Legal entity</dt>
                <dd className="text-zinc-400">
                  Digital Hooligan LLC (single-member LLC, U.S.-based)
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-100">Primary NAICS</dt>
                <dd className="text-zinc-400">
                  <span className="font-mono text-emerald-300">541511</span>{" "}
                  – Custom Computer Programming Services.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-100">
                  What 541511 means here
                </dt>
                <dd className="text-zinc-400">
                  Custom web apps and internal portals, APIs and system
                  integrations, automation scripts/RPA, dashboards and reporting
                  tools, and custom modules plugged into larger systems—plus the
                  product sites that sit in front of them (like PennyWize)
                  where needed.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-100">Work focus</dt>
                <dd className="text-zinc-400">
                  Mission-focused tools for teams who need software tailored to
                  their workflow, not just another template site.
                </dd>
              </div>
            </dl>

            <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
              <p>
                Actively aligning with federal and enterprise contracting
                expectations (SAM.gov, legal docs, banking, and internal
                controls) while keeping the Digital Hooligan brand loud and
                sharp.
              </p>
              <p>
                For details on specific capabilities, see the{" "}
                <Link
                  href="/services"
                  className="font-medium text-emerald-300 underline decoration-emerald-500/70 underline-offset-4 hover:text-emerald-100"
                >
                  Services
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}