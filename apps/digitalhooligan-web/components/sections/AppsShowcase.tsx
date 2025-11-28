"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Container from "../layout/Container";

type AppDefinition = {
    slug: string;
    name: string;
    label: string;
    status: string;
    imageSrc: string;
    tagline: string;
    description: string;
};

const apps: AppDefinition[] = [
    {
        slug: "pennywize",
        name: "PennyWize",
        label: "Flagship",
        status: "Active",
        imageSrc: "/images/apps/pennywize.png",
        tagline: "Hunt penny stocks like a maniac, not a fool.",
        description:
            "Real-time penny stock scrapes, smart alerts, and a hooligan-approved dashboard so you never miss cheap chaos turning into real money.",
    },
    {
        slug: "dropsignal",
        name: "DropSignal",
        label: "Signal bot",
        status: "Prototype",
        imageSrc: "/images/apps/dropsignal.png",
        tagline: "Spray-paint alerts all over your watchlist.",
        description:
            "Price-drop and restock radar for hype releases. Built for people who live in release calendars and push notifications.",
    },
    {
        slug: "hypewatch",
        name: "HypeWatch",
        label: "Collectors",
        status: "Designing",
        imageSrc: "/images/apps/hypewatch.png",
        tagline: "Track hype before it becomes history.",
        description:
            "A collector-focused view of markets: cards, kicks, and whatever else is volatile enough to be fun.",
    },
    {
        slug: "labs",
        name: "Hooligan Labs",
        label: "Experiments",
        status: "In the lab",
        imageSrc: "/images/apps/hooligan-lab.png",
        tagline: "Where the dangerous ideas get built first.",
        description:
            "Small experiments, scrapers, and bots that graduate into full apps once they prove they can survive outside the lab.",
    },
];

export default function AppsShowcase() {
    const [activeSlug, setActiveSlug] = useState<string>("pennywize");
    const activeApp =
        apps.find((app) => app.slug === activeSlug) ?? apps[0];

    return (
        <section
            id="apps"
            className="scroll-mt-24 border-y border-dh-street-gray/60 bg-[#050608]"
        >
            <Container>
                {/* Match Labs spacing pattern */}
                <div className="py-12 md:py-16">
                    {/* Tag */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-electric-mint">
                        <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                        <span>App Studio</span>
                    </div>

                    {/* Heading + subtitle */}
                    <div className="mt-4 max-w-2xl space-y-2">
                        <h2 className="text-2xl font-semibold leading-snug text-white md:text-3xl">
                            A small gang of{" "}
                            <span className="text-dh-electric-mint">
                                dangerous little apps.
                            </span>
                        </h2>
                        <p className="text-sm text-dh-street-gray/80 md:text-base">
                            Click an icon to see what kind of chaos it&apos;s built for.
                        </p>
                    </div>

                    {/* Main layout: flagship card + side list */}
                    <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)] lg:items-stretch">
                        {/* Left: flagship / active app card */}
                        <article className="relative overflow-hidden rounded-2xl border border-dh-street-gray/60 bg-gradient-to-br from-dh-black via-[#050608] to-[#050608] p-5 shadow-[0_0_40px_rgba(30,255,203,0.3)]">
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
                                {/* Icon */}
                                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-3xl border border-dh-street-gray/60 bg-dh-black">
                                    <Image
                                        src={activeApp.imageSrc}
                                        alt={`${activeApp.name} icon`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                {/* Text */}
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/70 bg-dh-black/70 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-dh-street-gray">
                                        <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                        <span>{activeApp.label}</span>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-xl font-semibold text-white md:text-2xl">
                                            {activeApp.name}
                                        </h3>
                                        <p className="text-sm font-medium text-dh-electric-mint md:text-base">
                                            {activeApp.tagline}
                                        </p>
                                    </div>

                                    <p className="text-sm text-dh-street-gray/80 md:text-[15px]">
                                        {activeApp.description}
                                    </p>
                                </div>
                            </div>
                        </article>

                        {/* Right: app list */}
                        <div className="flex flex-col gap-3">
                            {apps.map((app) => {
                                const isActive = app.slug === activeSlug;

                                return (
                                    <button
                                        key={app.slug}
                                        type="button"
                                        onClick={() => setActiveSlug(app.slug)}
                                        className={clsx(
                                            "group flex items-center justify-between gap-3 rounded-2xl border bg-dh-black/60 px-4 py-3 text-left transition",
                                            isActive
                                                ? "border-dh-electric-mint/80 shadow-[0_0_32px_rgba(30,255,203,0.4)]"
                                                : "border-dh-street-gray/60 hover:border-dh-electric-mint/60 hover:bg-dh-black"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-dh-street-gray/60 bg-dh-black">
                                                <Image
                                                    src={app.imageSrc}
                                                    alt={`${app.name} icon`}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs font-semibold text-white md:text-sm">
                                                    {app.name}
                                                </p>
                                                <p className="text-[11px] text-dh-street-gray/80">
                                                    {app.tagline}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[10px] font-mono uppercase tracking-[0.26em] text-dh-electric-mint/90">
                                                {isActive ? "Active" : app.status}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
