import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hooligan Labs · Digital Hooligan",
  description:
    "Hooligan Labs is the experiment playground where PennyWize, DropSignal, HypeWatch, and Ops Toys are built, tested, and promoted.",
};

type Experiment = {
  name: string;
  track: string;
  status: string;
  description: string;
  href: string;
  phase: string;
};

const experiments: Experiment[] = [
  {
    name: "PennyWize",
    track: "Penny stocks & data",
    status: "In design / early build",
    description:
      "Penny stock scraper that turns noisy tickers into watchlists, alerts, and a future social layer around the data.",
    href: "/pennywize",
    phase: "Moving from Labs into a dedicated web app, then mobile.",
  },
  {
    name: "DropSignal",
    track: "Sneakers & streetwear",
    status: "Concept + initial systems",
    description:
      "Price-drop radar for sneakers and streetwear, with assist-mode alerts first and add-to-cart flows in a later phase.",
    href: "/dropsignal",
    phase: "Early bot + alert logic; dedicated web UI and mobile to follow.",
  },
  {
    name: "HypeWatch",
    track: "Collectibles & slabs",
    status: "Labs exploration",
    description:
      "Collectible price watcher for cards, figures, mags, watches, and display pieces you actually flex.",
    href: "/hypewatch",
    phase: "Labs exploration until the data model and UX feel right.",
  },
  {
    name: "Ops Toys",
    track: "Ops & automation",
    status: "Internal use",
    description:
      "A drawer of tiny automation tools for infra, logging, deployments, and dev workflow painkillers.",
    href: "/ops-toys",
    phase: "Internal-first; selected toys may be opened up later.",
  },
];

export default function LabsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
      {/* Intro */}
      <section className="border-b border-white/5 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-red-200">
            HOOLIGAN LABS
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            The experiment yard behind Digital Hooligan.
          </h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            This is where{" "}
            <span className="font-medium text-slate-100">
              PennyWize, DropSignal, HypeWatch, and Ops Toys
            </span>{" "}
            get built, broken, and promoted. Phase 0 lives here: scripts, bots,
            dashboards, and prototypes that may grow into full products if they earn it.
          </p>
        </div>
      </section>

      {/* Experiment tracks */}
      <section className="border-b border-white/5 bg-slate-950/80 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-slate-50">
              Current experiment tracks
            </h2>
            <p className="max-w-sm text-xs text-slate-400">
              This isn&apos;t a launch board. It&apos;s the honest state of work-in-progress
              toys and tools, including rough edges and half-finished ideas.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {experiments.map((exp) => (
              <article
                key={exp.name}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-black/85 p-5"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.14),transparent_65%)] opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        {exp.track}
                      </p>
                      <h3 className="text-base font-semibold text-slate-50">{exp.name}</h3>
                    </div>
                    <span className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-[11px] text-slate-300">
                      {exp.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300">{exp.description}</p>
                  <p className="text-[11px] text-slate-400">{exp.phase}</p>

                  <div className="mt-2 flex items-center justify-between gap-3 text-[11px]">
                    <Link
                      href={exp.href}
                      className="inline-flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 font-semibold text-black shadow shadow-red-500/40 transition-colors hover:bg-red-400"
                    >
                      View details <span aria-hidden="true">↗</span>
                    </Link>
                    <span className="text-slate-500">Promoted when the signal is real.</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline & phases */}
      <section className="border-b border-white/5 bg-black px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-50">
              The Hooligan Labs pipeline
            </h2>
            <p className="text-sm text-slate-300">
              Ideas don&apos;t jump straight to “polished app”. They earn their way up through
              phases, with real usage and feedback guiding what gets built next.
            </p>
            <ol className="space-y-2 text-sm text-slate-300">
              <li>
                <span className="font-semibold text-slate-100">Phase 0 · Script / bot</span>{" "}
                – A scrappy tool, often CLI or bot-based, used internally to prove
                there&apos;s something there.
              </li>
              <li>
                <span className="font-semibold text-slate-100">Phase 1 · Web app</span>{" "}
                – A focused, opinionated UI that exposes the useful parts to real users.
              </li>
              <li>
                <span className="font-semibold text-slate-100">Phase 2 · Mobile app</span>{" "}
                – iOS and Android builds once the usage and value justify being in
                people&apos;s pockets.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Phase 3 · APIs & integrations
                </span>{" "}
                – Integrations, partner access, and more serious contracts if it&apos;s worth
                turning into a platform.
              </li>
            </ol>
          </div>

          <aside className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              WHAT WE SHARE PUBLICLY
            </p>
            <p>
              This page is the public window into ongoing work. Internal planning, ops, and
              build telemetry remain restricted.
            </p>
            <ul className="mt-1 space-y-1.5">
              <li>• What we&apos;re exploring now</li>
              <li>• The current status (even if it&apos;s messy)</li>
              <li>• The likely path from prototype to product</li>
            </ul>
            <p className="pt-2 text-[11px] text-slate-500">
              Want a sharper view of capability and delivery? See Services and the Gov page.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                href="/services"
                className="inline-flex items-center rounded-full border border-slate-700 bg-black px-3 py-1.5 text-[11px] font-semibold text-slate-100 transition-colors hover:border-red-500/60"
              >
                Services
              </Link>
              <Link
                href="/gov"
                className="inline-flex items-center rounded-full border border-slate-700 bg-black px-3 py-1.5 text-[11px] font-semibold text-slate-100 transition-colors hover:border-red-500/60"
              >
                Government
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Footer row / navigation */}
      <section className="bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm text-slate-200">
            <p className="font-semibold text-slate-50">Keep an eye on the experiments.</p>
            <p className="text-xs text-slate-400">
              As projects level up, they&apos;ll move into dedicated pages with clearer
              flows and sharper UX.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/pennywize"
              className="inline-flex items-center justify-center rounded-full bg-red-500 px-4 py-2 font-semibold text-black shadow shadow-red-500/40 transition-colors hover:bg-red-400"
            >
              View PennyWize
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-black px-4 py-2 font-semibold text-slate-100 transition-colors hover:border-red-500/60"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
