import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-900 bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#ef44441a,_transparent_60%),radial-gradient(circle_at_bottom,_#22c55e1a,_transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center md:py-24">
        {/* Left: copy */}
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Digital Hooligan LLC
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
            Out-of-the-box thinking for{" "}
            <span className="text-red-500">
              apps, bots &amp; internal tools
            </span>
            .
          </h1>

          <p className="mt-4 text-sm text-zinc-300 sm:text-base">
            A tiny, veteran-led web studio blending graffiti energy with clean
            engineering. We build street-smart tools, dashboards, and automation
            for people who actually ship things.
          </p>

          {/* Tagline chips */}
          <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-wide text-zinc-300">
            <span className="rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1">
              Out-of-the-box thinking
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1">
              Web design + engineering
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1">
              Apps, sites &amp; internal tools
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1">
              Bots, scrapers &amp; automation
            </span>
          </div>

          {/* Primary CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/apps"
              className="inline-flex items-center rounded-full border border-red-500 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-100 shadow-[0_0_25px_rgba(248,113,113,0.45)] transition hover:bg-red-500/20"
            >
              View apps &amp; experiments
            </Link>

            <Link
              href="/labs"
              className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:bg-zinc-900"
            >
              Explore Hooligan Labs
            </Link>
          </div>

          {/* Subtle Gov link */}
          <p className="mt-3 text-xs text-zinc-500">
            Working with government or enterprise teams?{" "}
            <Link
              href="/gov"
              className="underline underline-offset-4 hover:text-zinc-300"
            >
              View the Gov &amp; Enterprise overview
            </Link>
            .
          </p>
        </div>

        {/* Right: abstract panel */}
        <div className="flex flex-1 justify-center md:justify-end">
          <div className="relative h-64 w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4 shadow-[0_0_40px_rgba(0,0,0,0.85)] backdrop-blur">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono uppercase tracking-wide">
                Hooligan Ops View
              </span>
              <span className="rounded-full border border-zinc-800 px-2 py-0.5 text-[10px] text-emerald-300">
                Online
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2">
                <div>
                  <p className="text-xs text-zinc-400">PennyWize</p>
                  <p className="text-[11px] text-zinc-300">
                    Penny-stock radar / scrapers
                  </p>
                </div>
                <span className="text-[11px] text-emerald-400">Live</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2">
                <div>
                  <p className="text-xs text-zinc-400">DropSignal</p>
                  <p className="text-[11px] text-zinc-300">
                    Sneaker &amp; streetwear price alerts
                  </p>
                </div>
                <span className="text-[11px] text-yellow-400">In build</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2">
                <div>
                  <p className="text-xs text-zinc-400">Ops Toys</p>
                  <p className="text-[11px] text-zinc-300">
                    Internal ops automation drawer
                  </p>
                </div>
                <span className="text-[11px] text-sky-400">Labs</span>
              </div>
            </div>

            <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-700/70 to-transparent" />

            <p className="mt-3 text-[11px] text-zinc-400">
              Built for high-signal work: dashboards, bots, and internal tools
              that keep you out of spreadsheets and into shipping.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}