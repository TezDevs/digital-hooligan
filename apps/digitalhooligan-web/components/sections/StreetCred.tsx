import Link from "next/link";

export default function StreetCred() {
  return (
    <section
      id="street-cred"
      className="border-t border-white/5 bg-black px-4 py-12 sm:px-6 md:py-16 lg:px-8"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        {/* Left: Heading & copy */}
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            STREET CRED
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
            Built by someone who&apos;s lived in test plans and ticket queues.
          </h2>
          <p className="max-w-md text-sm text-slate-300">
            Digital Hooligan pulls from years of engineering and test work in
            defense, government, and enterprise environments—requirements,
            traceability, and &quot;did we prove it?&quot; all included.
          </p>
        </div>

        {/* Right: Cred cards */}
        <div className="grid max-w-md gap-3 text-xs text-slate-200">
          {/* Gov & enterprise card with NAICS + /gov chip */}
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              GOVERNMENT &amp; ENTERPRISE
            </p>
            <p className="text-slate-300">
              Work history across defense and government programs, used to
              requirements, verification, and living inside structured
              processes when it matters. Operates as a veteran-owned small
              business under NAICS 541511.
            </p>
            <div className="mt-2 inline-flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-700 bg-black px-3 py-1 text-[11px] text-slate-200">
                NAICS 541511 · SAM.gov registered
              </span>
              <Link
                href="/gov"
                className="rounded-full border border-emerald-500/60 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300 hover:border-emerald-300"
              >
                View gov services →
              </Link>
            </div>
          </div>

          {/* Build style */}
          <div className="space-y-1 rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              BUILD STYLE
            </p>
            <p className="text-slate-300">
              Short, focused builds with real demos over slide decks. Strong
              bias toward dashboards, logs, and observability from day one.
            </p>
          </div>

          {/* Small on purpose */}
          <div className="space-y-1 rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              SMALL ON PURPOSE
            </p>
            <p className="text-slate-300">
              You work directly with the builder. No handoffs through layers of
              account managers before a single line of code ships.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}