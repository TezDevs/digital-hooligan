"use client";

import Link from "next/link";
import Container from "../Container";

type LabItem = {
    name: string;
    role: string;
    phase: "discovery" | "building" | "polishing";
    blurb: string;
};

const LABS: LabItem[] = [
    {
        name: "PennyWize",
        role: "Penny stock signal lab",
        phase: "polishing",
        blurb:
            "Tuning the penny stock scraper so signal is clean, noise is low, and alerts land where they actually help you make moves.",
    },
    {
        name: "DropSignal",
        role: "Sneaker & streetwear radar",
        phase: "building",
        blurb:
            "Experimenting with bots and scrapers that track drops, restocks, and price swings across sneakers and urban streetwear.",
    },
    {
        name: "HypeWatch",
        role: "Collectibles watchtower",
        phase: "discovery",
        blurb:
            "Exploring datasets around graded cards, figures, magazines, and other display pieces to understand what ‘hype’ really looks like.",
    },
    {
        name: "Ops Toys",
        role: "Infra & workflow helpers",
        phase: "discovery",
        blurb:
            "Sketching tiny tools that smooth out logging, monitoring, deployments, and dev workflow so building Hooligan apps feels less painful.",
    },
];

function PhasePill({ phase }: { phase: LabItem["phase"] }) {
    const base =
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium border";

    const tone =
        phase === "polishing"
            ? "border-emerald-400/50 text-emerald-200 bg-emerald-500/10"
            : phase === "building"
                ? "border-dh-electric-mint/50 text-dh-electric-mint bg-dh-electric-mint/10"
                : "border-purple-400/50 text-purple-200 bg-purple-500/10";

    const label =
        phase === "polishing"
            ? "Polishing"
            : phase === "building"
                ? "Building"
                : "Discovery";

    return <span className={`${base} ${tone}`}>{label}</span>;
}

export default function LabsSection() {
    return (
        <section
            id="labs"
            className="border-t border-dh-street-gray/60 bg-dh-black py-16 sm:py-20"
        >
            <Container>
                {/* Heading row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-dh-graffiti-yellow/80">
                            Hooligan Labs
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                            The experimental shelf.
                        </h2>
                        <p className="mt-3 max-w-xl text-sm text-dh-street-gray/80 sm:text-base">
                            Labs is where ideas live before they turn into full products.
                            Scrapers, bots, internal dashboards, weird little experiments —
                            they all start here before they graduate to the main Apps lineup.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-2 text-xs text-dh-street-gray/80 sm:items-end">
                        <p className="max-w-xs text-right sm:text-left md:text-right">
                            Expect things to be rough, fast, and a little chaotic here. That&apos;s
                            the point — this is where Digital Hooligan breaks things on
                            purpose to see what&apos;s possible.
                        </p>
                        <Link
                            href="/labs"
                            className="inline-flex items-center gap-1 rounded-full border border-dh-electric-mint/40 bg-dh-black px-3 py-1.5 text-xs font-medium text-dh-electric-mint/90 shadow-[0_0_22px_rgba(30,255,203,0.35)] transition hover:border-dh-electric-mint hover:text-dh-electric-mint"
                        >
                            Explore the Labs page
                            <span aria-hidden>↗</span>
                        </Link>
                    </div>
                </div>

                {/* Labs list */}
                <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2">
                    {LABS.map((lab) => (
                        <article
                            key={lab.name}
                            className="group rounded-2xl border border-dh-street-gray/70 bg-gradient-to-br from-dh-black/90 via-dh-black to-dh-black/80 p-4 shadow-[0_16px_60px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:-translate-y-1 hover:border-dh-graffiti-yellow/70 hover:shadow-[0_18px_80px_rgba(250,204,21,0.35)] sm:p-5"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-semibold text-white sm:text-lg">
                                        {lab.name}
                                    </h3>
                                    <p className="mt-1 text-xs font-mono uppercase tracking-[0.18em] text-dh-graffiti-yellow/80">
                                        {lab.role}
                                    </p>
                                </div>

                                <PhasePill phase={lab.phase} />
                            </div>

                            <p className="mt-3 text-sm leading-relaxed text-dh-street-gray/80">
                                {lab.blurb}
                            </p>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}
