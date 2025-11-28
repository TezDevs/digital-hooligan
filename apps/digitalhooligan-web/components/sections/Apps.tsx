"use client";

import { useState } from "react";
import Image from "next/image";

type AppMeta = {
    id: string;
    name: string;
    tagline: string;
    description: string;
    status: "live" | "building" | "idea";
    imageSrc: string;
    imageAlt: string;
    tags: string[];
};

const APPS: AppMeta[] = [
    {
        id: "pennywize",
        name: "PennyWize",
        tagline: "Penny stock radar with signal, not noise.",
        description:
            "Scrapes news, filings, and price action so you can catch momentum early without drowning in spammy Discords and Twitter threads.",
        status: "building",
        imageSrc: "/apps/pennywize.png",
        imageAlt: "PennyWize app artwork",
        tags: ["Market radar", "News scraper", "Retail traders"],
    },
    {
        id: "dropsignal",
        name: "DropSignal",
        tagline: "Sneaker & collectible drop alerts.",
        description:
            "Track drops, restocks, and price dips across your favorite pairs and collectibles — without babysitting every app and site.",
        status: "building",
        imageSrc: "/apps/dropsignal.png",
        imageAlt: "DropSignal app artwork",
        tags: ["Sneakers", "Collectibles", "Price alerts"],
    },
    {
        id: "hypewatch",
        name: "HypeWatch",
        tagline: "Your collectible price dashboard.",
        description:
            "Grade-style watchlist for your grails — cards, toys, NFTs, kicks. One place to see what’s mooning, dumping, or quietly creeping up.",
        status: "idea",
        imageSrc: "/apps/hypewatch.png",
        imageAlt: "HypeWatch app artwork",
        tags: ["Collectibles", "Watchlist", "Dashboard"],
    },
];

export default function Apps() {
    const [selected, setSelected] = useState<AppMeta>(APPS[0]);

    return (
        <section
            id="apps"
            className="border-b border-dh-street-gray/60 bg-dh-black/95"
        >
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
                {/* Header */}
                <div className="max-w-2xl">
                    <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        Apps from the Digital Hooligan garage
                    </h2>
                    <p className="mt-2 max-w-xl text-sm text-dh-street-gray sm:text-base">
                        Each project is built for people who live on signal: drops,
                        side-hustles, collectibles, and niche trades. No bloat, no
                        overthinking — just sharp tools.
                    </p>
                </div>

                {/* Selected app detail panel */}
                <div className="mt-6 rounded-3xl border border-dh-street-gray/60 bg-dh-black/70 px-4 py-6 sm:px-6 sm:py-7 lg:mt-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
                        <div className="w-full max-w-sm">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-dh-electric-mint/30 bg-dh-black">
                                <Image
                                    src={selected.imageSrc}
                                    alt={selected.imageAlt}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/70 bg-dh-black/80 px-3 py-1 text-xs text-dh-street-gray">
                                <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                {selected.status === "live" && "Live"}
                                {selected.status === "building" && "In the lab"}
                                {selected.status === "idea" && "On the whiteboard"}
                            </div>

                            <h3 className="mt-3 text-lg font-semibold text-white sm:text-xl">
                                {selected.name}
                            </h3>
                            <p className="mt-1 text-sm text-dh-street-gray">
                                {selected.tagline}
                            </p>
                            <p className="mt-3 text-sm text-dh-street-gray/90 sm:text-base">
                                {selected.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {selected.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-3 py-1 text-xs text-dh-street-gray"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* App tiles */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {APPS.map((app) => {
                        const isActive = app.id === selected.id;
                        return (
                            <button
                                key={app.id}
                                type="button"
                                onClick={() => setSelected(app)}
                                className={`flex flex-col items-start rounded-2xl border bg-dh-black/70 p-4 text-left transition sm:p-5 ${isActive
                                        ? "border-dh-electric-mint/70 shadow-[0_0_25px_rgba(30,255,203,0.25)]"
                                        : "border-dh-street-gray/60 hover:border-dh-electric-mint/60 hover:bg-dh-black"
                                    }`}
                            >
                                <span className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-2.5 py-1 text-[11px] font-medium text-dh-street-gray">
                                    <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    {app.status === "live" && "Live"}
                                    {app.status === "building" && "In the lab"}
                                    {app.status === "idea" && "Idea stage"}
                                </span>

                                <h3 className="mt-3 text-sm font-semibold text-white sm:text-base">
                                    {app.name}
                                </h3>
                                <p className="mt-1 text-xs text-dh-street-gray sm:text-sm">
                                    {app.tagline}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
