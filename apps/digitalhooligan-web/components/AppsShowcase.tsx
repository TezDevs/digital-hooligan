"use client";

import { useState } from "react";
import Image from "next/image";

type AppMeta = {
    id: string;
    name: string;
    tag: string;
    blurb: string;
    imageSrc: string;
};

const APPS: AppMeta[] = [
    {
        id: "pennywize",
        name: "PennyWize",
        tag: "Penny stock radar",
        blurb:
            "Scrapes news and price action on sketchy little tickers so you see the chaos before everyone else.",
        imageSrc: "/apps/pennywize.png",
    },
    {
        id: "dropsignal",
        name: "DropSignal",
        tag: "Sneaker drop alerts",
        blurb:
            "Tracks restocks and price drops so you can snipe pairs while everyone else is still scrolling.",
        imageSrc: "/apps/dropsignal.png",
    },
    {
        id: "hypewatch",
        name: "HypeWatch",
        tag: "Collectible tracking",
        blurb:
            "Keeps an eye on cards, toys, and other weird collectibles so you know when the market moves.",
        imageSrc: "/apps/hypewatch.png",
    },
    {
        id: "labs",
        name: "Hooligan Labs",
        tag: "Experiments from the lab",
        blurb:
            "Prototypes, bots, and dashboards that might be half-broken today and indispensable tomorrow.",
        imageSrc: "/apps/hooligan-labs.png",
    },
];

export default function AppsShowcase() {
    const [activeId, setActiveId] = useState<string>(APPS[0]?.id ?? "pennywize");

    const active = APPS.find((app) => app.id === activeId) ?? APPS[0];

    return (
        <div className="space-y-4 sm:space-y-5">
            {/* Active app detail card */}
            <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
                <div className="relative overflow-hidden rounded-2xl border border-dh-electric-mint/30 bg-gradient-to-br from-dh-black via-dh-black to-dh-electric-mint/15">
                    <div className="relative h-48 w-full sm:h-56 md:h-64">
                        <Image
                            src={active.imageSrc}
                            alt={active.name}
                            fill
                            className="object-contain rounded-2xl"
                        />
                    </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-dh-electric-mint/80">
                        {active.tag}
                    </p>
                    <h3 className="text-lg font-semibold text-white sm:text-xl">
                        {active.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-dh-street-gray/80 sm:text-[0.95rem]">
                        {active.blurb}
                    </p>
                </div>
            </div>

            {/* App selector list */}
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {APPS.map((app) => {
                    const isActive = app.id === active.id;
                    return (
                        <button
                            key={app.id}
                            type="button"
                            onClick={() => setActiveId(app.id)}
                            className={`flex flex-1 items-center justify-between rounded-2xl border px-3 py-2 text-left text-sm transition sm:min-w-[10rem] ${isActive
                                    ? "border-dh-electric-mint/80 bg-dh-black text-white shadow-[0_0_18px_rgba(30,255,203,0.6)]"
                                    : "border-dh-street-gray/60 bg-dh-black/70 text-dh-street-gray/80 hover:border-dh-electric-mint/60 hover:text-white"
                                }`}
                        >
                            <span className="font-medium">{app.name}</span>
                            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-dh-street-gray/70">
                                {isActive ? "Selected" : "Tap to view"}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
