import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Glow / background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[-6rem] h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute right-[-4rem] top-40 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:pb-24 lg:pt-24">
        {/* Left: copy / CTAs */}
        <div className="max-w-xl space-y-6">
          {/* Tagline */}
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
              <span className="inline-flex h-6 items-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 text-[10px] font-semibold tracking-[0.25em]">
                Digital Hooligan Studio
              </span>
            </p>
            <p className="text-[11px] text-zinc-500">
              A small, loud software studio shipping tools, automations, and web
              apps for ops teams, traders, collectors, and anyone with real work
              to do.
            </p>
          </div>

          {/* Main heading */}
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
            Rebel tools.
            <span className="block text-emerald-300">
              Grown-up execution.
            </span>
          </h1>

          {/* Subcopy */}
          <p className="text-balance text-sm text-zinc-400 sm:text-base">
            Digital Hooligan designs and builds custom software and internal
            tools alongside its own products—PennyWize, DropSignal, HypeWatch,
            Ops Toys. Think focused web apps and portals, APIs and integrations,
            automation workflows, and dashboards that make messy work feel a
            little less painful.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#apps"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-500/70 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 shadow-[0_0_40px_rgba(16,185,129,0.45)] transition hover:bg-emerald-500/25 hover:text-emerald-50"
            >
              Explore the apps
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-emerald-500/60 hover:text-emerald-100"
            >
              Talk about a project
            </Link>

            <Link
              href="/company"
              className="inline-flex items-center justify-center text-xs text-zinc-500 underline decoration-zinc-600 underline-offset-4 hover:text-emerald-200 hover:decoration-emerald-400"
            >
              View company profile →
            </Link>
          </div>

          {/* Small “what we actually do” line */}
          <p className="max-w-md text-xs text-zinc-500">
            Studio work spans public and private sectors: prototypes, internal
            tools, automations, and integrations where working directly with the
            engineer shipping the code is an advantage.
          </p>
        </div>

        {/* Right: studio snapshot tile (mature, abstract) */}
        <div className="relative w-full max-w-md self-stretch lg:max-w-sm">
          <div className="mt-2 h-full rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4 shadow-[0_0_80px_rgba(16,185,129,0.30)] sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Studio snapshot
            </p>

            <div className="mt-4 space-y-3 text-xs text-zinc-300">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-medium text-zinc-100">
                    Custom builds
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Web apps, internal portals, workflows, and automations tied
                    to real teams and data.
                  </p>
                </div>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                  Studio
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-2">
                  <p className="font-semibold text-zinc-100">Ops & infra</p>
                  <p className="mt-1 text-zinc-500">
                    Ops Toys-style tooling: infra, logging, and dev workflow
                    helpers.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-2">
                  <p className="font-semibold text-zinc-100">
                    Signals & markets
                  </p>
                  <p className="mt-1 text-zinc-500">
                    Patterns from PennyWize, DropSignal, HypeWatch for data and
                    alerts.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-2 text-[11px] text-zinc-400">
                <p>
                  Built by{" "}
                  <span className="font-medium text-zinc-100">
                    Courtez M. Cannady (TezDevs)
                  </span>{" "}
                  – founder and engineer. No mystery agency; just direct access
                  to the person shipping your code.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-zinc-500">
              <span className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-0.5">
                Single-member studio
              </span>
              <span className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-0.5">
                Custom tools & internal apps
              </span>
              <span className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-0.5">
                Public & private sector friendly
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}