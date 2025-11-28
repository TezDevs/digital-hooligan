"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

type AppId = "pennywize" | "dropsignal" | "hypewatch" | "labs";

type AppConfig = {
    id: AppId;
    name: string;
    tagline: string;
    description: string;
    badgeLabel: string;
    imageSrc: string;
};

const APPS: AppConfig[] = [
    {
        id: "pennywize",
        name: "PennyWize",
        tagline: "Hunt penny stocks like a maniac, not a fool.",
        description:
            "Real-time penny stock scrapes, smart alerts, and a hooligan-approved dashboard so you never miss cheap chaos turning into real money.",
        badgeLabel: "Flagship",
        imageSrc: "/apps/pennywize.png",
    },
    {
        id: "dropsignal",
        name: "DropSignal",
        tagline: "Spray-paint alerts all over your watchlist.",
        description:
            "Price-drop radar for the stuff you obsess over. We watch the charts so you can keep causing trouble elsewhere.",
        badgeLabel: "Price Alerts",
        imageSrc: "/apps/dropsignal.png",
    },
    {
        id: "hypewatch",
        name: "HypeWatch",
        tagline: "Track hype before it becomes history.",
        description:
            "Sneakers, cards, collectibles – if people flex it on social, HypeWatch tracks it, charts it, and pings you when it moves.",
        badgeLabel: "Collectibles",
        imageSrc: "/apps/hypewatch.png",
    },
    {
        id: "labs",
        name: "Hooligan Labs",
        tagline: "Where the dangerous ideas get built first.",
        description:
            "Experimental tools, bots, and prototypes. Some become products, some explode. All of them break the rules.",
        badgeLabel: "R&D",
        imageSrc: "/apps/hooligan-labs.png",
    },
];

export default function AppsShowcase() {
    const [activeId, setActiveId] = useState<AppId>("pennywize");
    const activeApp = APPS.find((a) => a.id === activeId)!;

    return (
        <div id="apps" className="scroll-mt-24 border-y border-dh-street-gray/60 bg-[#050608] pt-10 pb-16 md:pt-14 md:pb-20">
            <header className="max-w-2xl space-y-3">
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-dh-electric-mint/80">
                    App Studio
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    A small gang of{" "}
                    <span className="text-dh-electric-mint">dangerous little apps</span>.
                </h2>
                <p className="text-sm md:text-base text-dh-street-gray">
                    Click an icon to see what kind of chaos it&apos;s built for.
                </p>
            </header>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-stretch">
                {/* Active app panel */}
                <div className="relative overflow-hidden rounded-3xl border border-dh-street-gray/50 bg-gradient-to-br from-dh-black via-dh-black to-dh-electric-mint/10 p-6 md:p-8 shadow-[0_0_30px_rgba(30,255,203,0.35)] transition-shadow duration-300">
                    <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/70 px-3 py-1 text-xs text-dh-electric-mint/90">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-dh-electric-mint animate-pulse" />
                        {activeApp.badgeLabel}
                    </div>

                    <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center">
                        <div className="relative h-32 w-32 shrink-0 md:h-40 md:w-40">
                            <div className="absolute inset-0 rounded-3xl bg-dh-electric-mint/20 blur-2xl" />
                            <div className="relative rounded-3xl border border-dh-electric-mint/60 bg-dh-black/90 p-3 shadow-[0_0_40px_rgba(30,255,203,0.6)] transition-transform duration-300 ease-out">
                                <Image
                                    key={activeApp.id}
                                    src={activeApp.imageSrc}
                                    alt={`${activeApp.name} icon`}
                                    width={256}
                                    height={256}
                                    className="h-full w-full rounded-2xl object-contain transform transition-transform duration-300 ease-out"
                                />
                            </div>
                        </div>

                        <div className="space-y-3 md:flex-1">
                            <h3 className="text-2xl md:text-3xl font-semibold">
                                {activeApp.name}
                            </h3>
                            <p className="text-sm font-medium text-dh-electric-mint/90">
                                {activeApp.tagline}
                            </p>
                            <p className="text-sm md:text-base text-dh-street-gray leading-relaxed">
                                {activeApp.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* App list / icons */}
                <div className="grid gap-4">
                    {APPS.map((app) => {
                        const isActive = app.id === activeId;
                        return (
                            <button
                                key={app.id}
                                onClick={() => setActiveId(app.id)}
                                className={clsx(
                                    "group flex items-center gap-4 rounded-2xl border px-4 py-3 text-left",
                                    "bg-dh-black/60 transition-all duration-200 ease-out",
                                    "hover:bg-dh-black hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(30,255,203,0.35)]",
                                    isActive
                                        ? "border-dh-electric-mint/80 shadow-[0_0_24px_rgba(30,255,203,0.45)] scale-[1.02]"
                                        : "border-dh-street-gray/50 hover:border-dh-electric-mint/60"
                                )}
                            >
                                <div className="relative h-10 w-10 shrink-0">
                                    <div className="absolute inset-0 rounded-xl bg-dh-electric-mint/0 transition-opacity duration-200 group-hover:bg-dh-electric-mint/10" />
                                    <Image
                                        src={app.imageSrc}
                                        alt={`${app.name} icon`}
                                        width={64}
                                        height={64}
                                        className={clsx(
                                            "relative h-full w-full rounded-xl object-contain transition-transform duration-200 ease-out",
                                            isActive
                                                ? "scale-110"
                                                : "group-hover:scale-110 group-active:scale-95"
                                        )}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-semibold">{app.name}</p>
                                        {isActive && (
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-dh-electric-mint">
                                                Active
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-dh-street-gray line-clamp-1">
                                        {app.tagline}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
