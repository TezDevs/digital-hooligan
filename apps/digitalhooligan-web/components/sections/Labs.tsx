"use client";

import React from "react";

const experiments = [
    {
        label: "SneakerScout Lite",
        description: "Lightweight sneaker drop radar focused on price drops and restocks.",
        status: "In concept",
    },
    {
        label: "CollectibleWatch Lite",
        description: "Fast view of card, toy, and collectible price swings across markets.",
        status: "Prototype",
    },
    {
        label: "Hooligan Alerts Engine",
        description: "Shared alert engine powering PennyWize, DropSignal and HypeWatch.",
        status: "Planning",
    },
];

export default function Labs() {
    return (
        <section
            id="labs"
            className="relative w-full mt-4 border border-dh-street-gray/70 bg-dh-black/80 rounded-3xl px-4 py-6 sm:px-8 sm:py-8 overflow-hidden"
        >
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_60%),_radial-gradient(circle_at_bottom,_rgba(236,72,153,0.16),transparent_60%)] opacity-70" />

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                {/* Left: Heading & copy */}
                <div className="max-w-xl">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-dh-graffiti-yellow mb-2">
                        HOOLIGAN LABS
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                        Experiments, side quests, and future drops.
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-2">
                        Not everything ships to production. Some ideas live here first — as
                        scrappy prototypes, internal tools, or half-finished toys that might
                        evolve into full Hooligan apps later.
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        This section stays honest: what&apos;s real, what&apos;s in the lab,
                        and what&apos;s still just notes in the notebook.
                    </p>
                </div>

                {/* Right: Experiments list */}
                <div className="mt-2 md:mt-0 md:max-w-sm w-full">
                    <div className="rounded-2xl border border-dh-street-gray bg-black/80 p-4 sm:p-5 flex flex-col gap-3">
                        <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-[0.18em] mb-1">
                            ACTIVE EXPERIMENTS
                        </p>

                        <div className="flex flex-col gap-3">
                            {experiments.map((exp) => (
                                <div
                                    key={exp.label}
                                    className="rounded-xl border border-dh-street-gray/80 bg-black/80 px-3 py-3"
                                >
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <span className="text-xs sm:text-sm font-medium text-white">
                                            {exp.label}
                                        </span>
                                        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-dh-electric-mint">
                                            {exp.status}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-neutral-400 leading-snug">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="mt-2 text-[11px] sm:text-xs text-neutral-500">
                            Want early access or to collab on an experiment? Reach out via the
                            contact section below.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
