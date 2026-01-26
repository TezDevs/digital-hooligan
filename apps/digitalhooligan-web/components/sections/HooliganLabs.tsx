import Image from "next/image";
import Container from "../layout/Container";

const experiments = [
  {
    label: "Signal bots",
    name: "PennyWize Engine",
    blurb:
      "Scrapes, filters, and flags sketchy penny stock moves so you can spot chaos before the herd.",
    status: "In active build",
  },
  {
    label: "Sneaker / drop radar",
    name: "DropSignal",
    blurb:
      "Price-drop & restock radar for hype releases. Built for people who live in release calendars.",
    status: "Prototype",
  },
  {
    label: "Infra & ops",
    name: "Hooligan Ops Stack",
    blurb:
      "Central dashboards, logging, and cost tracking glue that keeps the chaos actually shippable.",
    status: "Designing",
  },
  {
    label: "APIs & services",
    name: "DH API Services",
    blurb:
      "Custom APIs and backend services that power scrapers, dashboards, and client-facing tools—built in bounded sprints, hardened over time.",
    status: "Available soon",
  },
];

export default function HooliganLabs() {
  return (
    <section id="labs" className="border-y border-dh-border bg-dh-carbon">
      <Container>
        <div className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between md:py-20">
          {/* Left: intro / logo */}
          <div className="max-w-lg space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-dh-steel-blue/40 bg-dh-panel/40 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-steel-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-dh-steel-blue" />
              <span>Hooligan Labs</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-[1.4rem] border border-dh-border bg-dh-panel shadow-[0_0_32px_rgba(0,0,0,0.35)] md:h-48 md:w-48">
                <Image
                  src="/apps/hooligan-labs.png"
                  alt="Hooligan Labs icon"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-dh-text">
                  Where bad ideas and backend services get ship-tested.
                </h2>
                <p className="text-xs text-dh-muted">
                  Tiny experiments, bots, APIs, and tools that may or may not
                  belong on a production server—yet.
                </p>
              </div>
            </div>

            <p className="text-sm text-dh-muted md:text-base">
              This is the sandbox where Digital Hooligan prototypes scrapers,
              dashboards, and backend services. If something proves itself here,
              it graduates into a full app or a stable API you can build on.
            </p>
          </div>

          {/* Right: experiments grid */}
          <div className="grid w-full gap-4 md:max-w-xl">
            {experiments.map((lab) => (
              <article
                key={lab.name}
                className="group relative overflow-hidden rounded-2xl border border-dh-border bg-dh-panel/70 p-4 transition hover:border-dh-steel-blue/60 hover:shadow-[0_0_40px_rgba(77,163,255,0.14)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-dh-border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-dh-muted">
                    {lab.label}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.26em] text-dh-steel-blue/90">
                    {lab.status}
                  </span>
                </div>

                <h3 className="mt-3 text-sm font-semibold text-dh-text md:text-base">
                  {lab.name}
                </h3>
                <p className="mt-2 text-xs text-dh-muted md:text-sm">
                  {lab.blurb}
                </p>

                <div className="mt-3 flex items-center gap-2 text-[11px] text-dh-muted/80">
                  <span className="h-1 w-8 rounded-full bg-dh-steel-blue/40 transition-all group-hover:w-10 group-hover:bg-dh-steel-blue/70" />
                  <span>Public details ship as each experiment graduates.</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
