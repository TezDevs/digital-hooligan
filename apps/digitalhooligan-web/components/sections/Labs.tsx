import Link from "next/link";
import Container from "../layout/Container";

type Experiment = {
  name: string;
  track: string;
  status: string;
  description: string;
  href: string;
};

const experiments: Experiment[] = [
  {
    name: "PennyWize",
    track: "Penny stocks & data",
    status: "In design / early build",
    description:
      "Scrapes, filters, and flags sketchy tickers — watchlists, alerts, and a future social layer.",
    href: "/pennywize",
  },
  {
    name: "DropSignal",
    track: "Sneakers & streetwear",
    status: "Concept + initial systems",
    description:
      "Price-drop and restock radar with assist-mode alerts first, grown-up flows later.",
    href: "/dropsignal",
  },
  {
    name: "HypeWatch",
    track: "Collectibles & slabs",
    status: "Labs exploration",
    description:
      "Tracks prices for cards, figures, mags, watches, and display pieces you actually flex.",
    href: "/hypewatch",
  },
  {
    name: "Ops Toys",
    track: "Ops & automation",
    status: "In development",
    description:
      "Tiny automation utilities for infra, logging, deployments, and dev workflow painkillers.",
    href: "/ops-toys",
  },
];

export default function Labs() {
  return (
    <section id="labs" className="border-b border-dh-street-gray/40 bg-dh-black">
      <Container>
        <div className="py-16 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-deep-void/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-electric-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                <span>Hooligan Labs</span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
                Experiments that ship forward.
              </h2>
              <p className="mt-2 text-sm text-dh-street-gray/80 md:text-base">
                Labs is the sandbox: bots, scrapers, dashboards, and prototypes.
                When something proves itself, it graduates into a hardened app.
              </p>
            </div>

            <Link
              href="/labs"
              className="inline-flex w-fit items-center justify-center rounded-full border border-dh-electric-mint/70 bg-dh-electric-mint/10 px-5 py-2.5 text-sm font-medium text-dh-electric-mint transition hover:bg-dh-electric-mint/20"
            >
              Explore Labs →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {experiments.map((exp) => (
              <article
                key={exp.name}
                className="group relative overflow-hidden rounded-2xl border border-dh-street-gray/60 bg-gradient-to-b from-dh-deep-void/80 to-black/90 p-5 transition hover:border-dh-electric-mint/60"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(77,163,255,0.14),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-dh-street-gray/70">
                        {exp.track}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-white">
                        {exp.name}
                      </h3>
                    </div>
                    <span className="rounded-full border border-dh-street-gray/60 bg-dh-black/60 px-3 py-1 text-[11px] text-dh-street-gray">
                      {exp.status}
                    </span>
                  </div>

                  <p className="text-sm text-dh-street-gray/80">{exp.description}</p>

                  <Link
                    href={exp.href}
                    className="inline-flex items-center gap-1 rounded-full border border-dh-street-gray/60 bg-dh-black/50 px-3 py-1 text-[11px] font-semibold text-dh-offwhite transition hover:border-dh-electric-mint/60 hover:text-dh-electric-mint"
                  >
                    View details <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
