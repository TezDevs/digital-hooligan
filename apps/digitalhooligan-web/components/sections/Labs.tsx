import Link from "next/link";

export default function Labs() {
  return (
    <section
      id="labs"
      className="border-b border-white/5 bg-black px-4 py-16 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Hooligan Labs
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
              The public-facing R&amp;D corner where{" "}
              <span className="font-medium text-slate-100">
                PennyWize, DropSignal, HypeWatch, and Ops Toys
              </span>{" "}
              are born, broken, rebuilt, and promoted from “toy” to “product”.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-xs text-slate-300">
            <p className="font-semibold text-slate-100">
              Labs · public overview
            </p>
            <p className="mt-1">
              The Labs page highlights what we can share publicly. Internal
              build dashboards and ops tooling remain restricted.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              EXPERIMENT TRACKS
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
              <li>• Price-watching for sneakers &amp; streetwear</li>
              <li>• Collectible &amp; slab price dashboards</li>
              <li>• Penny-stock scrapers &amp; signals</li>
              <li>• Ops automation “toys” for infra and logging</li>
            </ul>
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              PIPELINE
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
              <li>• Phase 0: internal script or bot</li>
              <li>• Phase 1: web app with dashboards</li>
              <li>• Phase 2: mobile app (Apple &amp; Google Play)</li>
              <li>• Phase 3: API &amp; automations for partners</li>
            </ul>
          </div>

          <div className="space-y-3 rounded-2xl border border-red-500/40 bg-gradient-to-b from-red-500/15 via-slate-950 to-black p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-200">
              BUILD DISCIPLINE
            </p>
            <p className="text-sm text-slate-100">
              Experiments are treated like real software: logs, dashboards,
              clear ownership, and a path from prototype to product when the
              signal is real.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-black/60 px-3 py-1 text-slate-200">
                Tight scopes
              </span>
              <span className="rounded-full bg-black/60 px-3 py-1 text-slate-200">
                Fast iteration
              </span>
              <span className="rounded-full bg-black/60 px-3 py-1 text-slate-200">
                Maintainable code
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-xs">
          <Link
            href="/labs"
            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-3.5 py-1.5 font-medium text-slate-100 transition-colors hover:border-red-500/60"
          >
            Open Labs overview ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
