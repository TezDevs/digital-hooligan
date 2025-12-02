export default function Hero() {
  const highlights = [
    "Out-of-the-box ops brain",
    "Apps, bots & automation toys",
    "Gov & enterprise ready",
    "Labs-first experiments",
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-black via-slate-950 to-black"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(94,234,212,0.2),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 md:py-24 lg:flex-row lg:items-center lg:py-28 lg:px-8">
        {/* Left: main copy */}
        <div className="flex-1 space-y-6">
          <p className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-400/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-emerald-300">
            DIGITAL HOOLIGAN LLC · HOOLIGAN LABS
          </p>

          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-slate-50">
              Apps, bots, & dashboards
            </span>
            <span className="mt-1 block bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-500 bg-clip-text text-transparent">
              for hooligan-minded builders.
            </span>
          </h1>

          <p className="max-w-xl text-balance text-sm text-slate-300 sm:text-base">
            Digital Hooligan is a one-person studio building{" "}
            <span className="font-medium text-slate-100">
              tool-first apps with a social layer
            </span>{" "}
            around the data: price-watching for sneakers and collectibles,
            penny-stock scrapers, ops automation toys, and internal dashboards
            for operators, founders, and gov/enterprise teams.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-medium text-black shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-300"
            >
              Talk services & builds
            </a>
            <a
              href="/labs"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-400/60 hover:bg-slate-900"
            >
              Explore Hooligan Labs
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Single-member LLC · Software, SaaS & automation
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1">
              NAICS 541511 · SAM.gov in registered
            </span>
          </div>
        </div>

        {/* Right: highlight cards */}
        <div className="flex-1">
          <div className="mx-auto grid max-w-md gap-4 sm:grid-cols-2 sm:gap-5">
            {highlights.map((item) => (
              <div
                key={item}
                className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/80 to-black/90 p-4 shadow-lg shadow-black/60"
              >
                <div className="absolute inset-px rounded-2xl border border-white/5/40" />
                <div className="relative space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    HOOLIGAN MODE
                  </p>
                  <p className="text-sm font-semibold text-slate-50">
                    {item}
                  </p>
                  <p className="text-xs text-slate-400">
                    Designed like something you’d hide behind a CEO dashboard,
                    but safe enough for legal to sign off on.
                  </p>
                </div>
              </div>
            ))}

            <div className="relative col-span-full mt-1 overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-500/15 via-sky-500/10 to-fuchsia-500/20 p-4 text-xs text-emerald-100">
              <p className="font-semibold text-emerald-200">
                Built for sneakers, collectibles & ops.
              </p>
              <p className="mt-1 text-slate-100/80">
                <span className="font-medium text-emerald-200">
                  PennyWize, DropSignal, HypeWatch, Ops Toys
                </span>{" "}
                live here — starting as bots & dashboards, graduating to web +
                mobile apps when they earn it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}