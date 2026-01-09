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
    phase: "Exploration until the data model and UX feel right.",
  },
  {
    name: "Ops Toys",
    track: "Ops & automation",
    status: "In development",
    description:
      "A drawer of tiny automation tools for infra, logging, deployments, and dev workflow painkillers.",
    href: "/ops-toys",
    phase: "Shipping starter utilities; details live on the public page.",
  },
];

const secondaryPill =
  "inline-flex items-center gap-1 rounded-full border border-[#4DA3FF]/70 bg-transparent px-3 py-1 text-[11px] font-semibold text-[#4DA3FF] transition hover:border-[#4DA3FF] hover:bg-[#4DA3FF]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DA3FF]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dh-carbon";

const neutralPill =
  "inline-flex items-center rounded-full border border-dh-border bg-transparent px-3 py-1.5 text-[11px] font-semibold text-dh-text transition hover:bg-white/5";

export default function LabsPage() {
  return (
    <main className="min-h-screen bg-dh-carbon text-dh-text">
      {/* Intro */}
      <section className="border-b border-dh-border px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-steel-blue">
            Hooligan Labs
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            The experiment yard behind Digital Hooligan.
          </h1>
          <p className="max-w-3xl text-sm text-dh-muted sm:text-base">
            This is where{" "}
            <span className="font-medium text-dh-text">
              PennyWize, DropSignal, HypeWatch, and Ops Toys
            </span>{" "}
            get built, tested, and promoted. Phase 0 lives here: scripts, bots,
            dashboards, and prototypes that may grow into full products if they
            earn it.
          </p>
        </div>
      </section>

      {/* Experiment tracks */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-dh-text">
              Current experiment tracks
            </h2>
            <p className="max-w-sm text-xs text-dh-muted">
              Not a launch board — just the honest state of work-in-progress toys
              and tools.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {experiments.map((exp) => (
              <article
                key={exp.name}
                className="group relative overflow-hidden rounded-2xl border border-dh-border bg-dh-panel p-5"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(77,163,255,0.16),transparent_65%)] opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dh-muted">
                        {exp.track}
                      </p>
                      <h3 className="text-base font-semibold text-dh-text">
                        {exp.name}
                      </h3>
                    </div>
                    <span className="rounded-full border border-dh-border bg-dh-carbon/40 px-3 py-1 text-[11px] text-dh-muted">
                      {exp.status}
                    </span>
                  </div>

                  <p className="text-sm text-dh-muted">{exp.description}</p>
                  <p className="text-[11px] text-dh-muted/90">{exp.phase}</p>

                  <div className="mt-2 flex items-center justify-between gap-3 text-[11px]">
                    <Link href={exp.href} className={secondaryPill}>
                      View details <span aria-hidden="true">↗</span>
                    </Link>
                    <span className="text-dh-muted/80">
                      Promoted when the signal is real.
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline & phases */}
      <section className="border-b border-dh-border bg-dh-carbon px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-dh-text">
              The Hooligan Labs pipeline
            </h2>
            <p className="text-sm text-dh-muted">
              Ideas don&apos;t jump straight to “polished app.” They earn their
              way up through phases, with real usage and feedback guiding what
              gets built next.
            </p>
            <ol className="space-y-2 text-sm text-dh-muted">
              <li>
                <span className="font-semibold text-dh-text">
                  Phase 0 · Script / bot
                </span>{" "}
                – Scrappy tools used to prove there&apos;s something there.
              </li>
              <li>
                <span className="font-semibold text-dh-text">
                  Phase 1 · Web app
                </span>{" "}
                – A focused UI that exposes the useful parts to real users.
              </li>
              <li>
                <span className="font-semibold text-dh-text">
                  Phase 2 · Mobile app
                </span>{" "}
                – iOS and Android once the value justifies being in people&apos;s
                pockets.
              </li>
              <li>
                <span className="font-semibold text-dh-text">
                  Phase 3 · APIs & integrations
                </span>{" "}
                – Integrations and partner access if it’s worth platform work.
              </li>
            </ol>
          </div>

          <aside className="space-y-3 rounded-2xl border border-dh-border bg-dh-panel p-4 text-xs text-dh-muted">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-dh-muted">
              What we share publicly
            </p>
            <p>
              This page is the public window into ongoing work. Internal
              planning, ops, and telemetry remain restricted.
            </p>
            <ul className="mt-1 space-y-1.5">
              <li>• What we&apos;re exploring now</li>
              <li>• The current status (even if it&apos;s messy)</li>
              <li>• The likely path from prototype to product</li>
            </ul>
            <p className="pt-2 text-[11px] text-dh-muted/80">
              Want a sharper view of capability and delivery? See Services and
              Gov.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link href="/services" className={neutralPill}>
                Services
              </Link>
              <Link href="/gov" className={neutralPill}>
                Government
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Footer row / navigation */}
      <section className="bg-dh-carbon px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-dh-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-dh-text">
              Keep an eye on the experiments.
            </p>
            <p className="text-xs text-dh-muted">
              As projects level up, they&apos;ll move into dedicated pages with
              clearer flows and sharper UX.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link href="/" className={neutralPill}>
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
