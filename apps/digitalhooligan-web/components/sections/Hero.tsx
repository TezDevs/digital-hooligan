import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-zinc-50">
      {/* Soft radial background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#22c55e26,_transparent_55%),radial-gradient(circle_at_bottom_right,_#22c55e1a,_transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center md:py-24">
        {/* Left column: main copy */}
        <div className="max-w-xl">
          {/* Studio pill */}
          <div className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-[11px] font-medium tracking-[0.2em] text-emerald-300">
            DIGITAL HOOLIGAN
          </div>

          {/* Tagline */}
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Out-of-the-box software &amp; web design studio for people who hate
            boring tools and forgettable sites.
          </p>

          {/* Main headline */}
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
            Build things that{" "}
            <span className="text-emerald-400">don&apos;t look corporate.</span>
          </h1>

          {/* Lead paragraph */}
          <p className="mt-5 text-sm text-zinc-300 sm:text-base">
            Digital Hooligan blends brand-first web design with hands-on
            engineering. Studio work ranges from custom marketing sites and
            product pages to internal tools, dashboards, automations, and the
            apps in the lab—PennyWize, DropSignal, HypeWatch, Ops Toys.
          </p>

          {/* Primary CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/apps"
              className="inline-flex items-center rounded-full border border-emerald-500 bg-emerald-500 px-5 py-2.5 text-sm font-medium text-black shadow-[0_0_25px_rgba(16,185,129,0.45)] transition hover:bg-emerald-400"
            >
              Explore the apps
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-200 transition hover:bg-zinc-800"
            >
              See what we offer
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center rounded-full border border-transparent px-3 py-2 text-xs font-medium text-zinc-300 transition hover:text-zinc-100"
            >
              <span className="mr-1.5">Talk about a project</span>
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Supporting line */}
          <p className="mt-6 max-w-lg text-xs text-zinc-500">
            From public-facing web design to internal tools and automations,
            every build is opinionated, brand-aware, and wired for real-world
            workflows—across both public and private sectors.
          </p>
        </div>

        {/* Right column: Hooligan Playbook card */}
        <div className="flex flex-1 justify-center md:justify-end">
          <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                  Hooligan Playbook
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-100">
                  Brand-first web
                </p>
                <p className="mt-1 text-[11px] text-zinc-400">
                  Custom sites, landing pages, and product microsites that
                  actually feel like your brand.
                </p>
              </div>
              <div className="mt-1 inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-medium text-emerald-300">
                Web &amp; UI
              </div>
            </div>

            {/* Two columns: tools & data */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-3 py-3">
                <p className="text-[11px] font-medium text-zinc-200">
                  Tools &amp; ops
                </p>
                <p className="mt-1 text-[11px] text-zinc-400">
                  Internal dashboards, workflow helpers, and small automations
                  inspired by Ops Toys.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-3 py-3">
                <p className="text-[11px] font-medium text-zinc-200">
                  Data &amp; signals
                </p>
                <p className="mt-1 text-[11px] text-zinc-400">
                  Patterns from PennyWize, DropSignal, HypeWatch—alerts, watch
                  lists, and price tracking.
                </p>
              </div>
            </div>

            {/* Founder blurb */}
            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-3 py-3">
              <p className="text-[11px] text-zinc-300">
                Everything is built by{" "}
                <span className="font-medium">
                  Courtez M. Cannady (TezDevs)
                </span>
                : one studio, one brain, direct access to the person shipping
                your code and your visuals.
              </p>
            </div>

            {/* Chips */}
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-medium text-zinc-300">
              <span className="rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1">
                Out-of-the-box thinking
              </span>
              <span className="rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1">
                Web design + engineering
              </span>
              <span className="rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1">
                Apps, sites &amp; internal tools
              </span>
              <span className="rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1">
                Custom automations &amp; dashboards
              </span>
              <span className="rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1">
                Public &amp; private sector friendly
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}