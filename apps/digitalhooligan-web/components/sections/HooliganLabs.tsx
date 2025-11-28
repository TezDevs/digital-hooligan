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
            "Custom APIs and backend services that power scrapers, dashboards, and client-facing tools—built fast, hardened over time.",
        status: "Available soon",
    },
];

export default function HooliganLabs() {
    return (
        <section
            id="labs"
            className="border-y border-dh-street-gray/60 bg-gradient-to-b from-dh-black to-[#050608]"
        >
            <Container>
                <div className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between md:py-20">
                    {/* Left: intro / logo */}
                    <div className="max-w-lg space-y-5">
                        <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-electric-mint">
                            <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                            <span>Hooligan Labs</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-dh-street-gray/60 bg-dh-black">
                                {/* Update the src path if your icon lives somewhere else */}
                                <Image
                                    src="/apps/hooligan-labs.png"
                                    alt="Hooligan Labs icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-xl font-semibold text-white">
                                    Where bad ideas and backend services get ship-tested.
                                </h2>
                                <p className="text-xs text-dh-street-gray/80">
                                    Tiny experiments, bots, APIs, and tools that may or may not
                                    belong on a production server—yet.
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-dh-street-gray/80 md:text-base">
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
                                className="group relative overflow-hidden rounded-2xl border border-dh-street-gray/60 bg-gradient-to-br from-dh-black/80 via-dh-black to-[#050608] p-4 shadow-[0_0_0_rgba(0,0,0,0)] transition hover:border-dh-electric-mint/70 hover:shadow-[0_0_40px_rgba(30,255,203,0.3)]"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="rounded-full border border-dh-street-gray/70 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-dh-street-gray">
                                        {lab.label}
                                    </span>
                                    <span className="text-[10px] font-mono uppercase tracking-[0.26em] text-dh-electric-mint/90">
                                        {lab.status}
                                    </span>
                                </div>

                                <h3 className="mt-3 text-sm font-semibold text-white md:text-base">
                                    {lab.name}
                                </h3>
                                <p className="mt-2 text-xs text-dh-street-gray/80 md:text-sm">
                                    {lab.blurb}
                                </p>

                                <div className="mt-3 flex items-center gap-2 text-[11px] text-dh-street-gray/70">
                                    <span className="h-1 w-8 rounded-full bg-dh-electric-mint/50 transition-all group-hover:w-10 group-hover:bg-dh-electric-mint" />
                                    <span>Tap for early experiments and APIs soon.</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
