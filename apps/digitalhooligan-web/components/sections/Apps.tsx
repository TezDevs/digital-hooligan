"use client";

import Image from "next/image";
import Link from "next/link";

const apps = [
    {
        slug: "pennywize",
        name: "PennyWize",
        phase: "Building",
        tagline:
            "The penny stock scraper that digs through the sketchy corners of the market so you don’t have to.",
        icon: "/apps/pennywize.png",
    },
    {
        slug: "dropsignal",
        name: "DropSignal",
        phase: "Discovery → Building",
        tagline:
            "Bot-powered radar for sneaker and streetwear deals before your size disappears.",
        icon: "/apps/dropsignal.png",
    },
    {
        slug: "hypewatch",
        name: "HypeWatch",
        phase: "Discovery",
        tagline:
            "Price tracking for collectibles you actually flex: cards, figures, magazines, watches, and more.",
        icon: "/apps/hypewatch.png",
    },
    {
        slug: "ops-toys",
        name: "Ops Toys",
        phase: "Discovery",
        tagline:
            "A drawer full of tiny automation toys that keep infra, logging, and dev workflow less painful.",
        icon: "/apps/ops-toys.png",
    },
];

export default function AppsSection() {
    return (
        <section
            id="apps"
            className="border-t border-dh-street-gray/40 bg-dh-black/90 px-4 py-16 sm:px-6 lg:px-8"
        >
            <div className="mx-auto max-w-6xl">
                <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                            Hooligan Apps
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-dh-offwhite sm:text-3xl">
                            Tools first. Apps with attitude.
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm text-dh-street-gray">
                            Each app starts life as a scrappy bot in Hooligan Labs, then grows
                            into a full web app and eventually a mobile experience.
                        </p>
                    </div>
                </header>

                <div className="grid gap-6 md:grid-cols-2">
                    {apps.map((app) => (
                        <Link
                            key={app.slug}
                            href={`/${app.slug}`}
                            className="group rounded-2xl border border-dh-street-gray/40 bg-gradient-to-br from-dh-black/80 to-dh-black/40 p-4 transition duration-200 hover:border-dh-electric-mint/70 hover:shadow-[0_0_24px_rgba(30,255,203,0.25)]"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-dh-street-gray/30 bg-dh-black/80">
                                    <Image
                                        src={app.icon}
                                        alt={`${app.name} icon`}
                                        width={32}
                                        height={32}
                                        className="h-8 w-8 object-contain"
                                    />
                                </div>

                                <div className="flex-1 space-y-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <h3 className="text-sm font-semibold text-dh-offwhite sm:text-base">
                                            {app.name}
                                        </h3>
                                        <span className="inline-flex items-center gap-1 rounded-full border border-dh-electric-mint/60 bg-dh-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                                            <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                            {app.phase}
                                        </span>
                                    </div>
                                    <p className="text-xs text-dh-street-gray sm:text-sm">
                                        {app.tagline}
                                    </p>
                                    <p className="text-xs font-medium text-dh-electric-mint group-hover:translate-x-0.5 group-hover:text-dh-electric-mint/90">
                                        Learn more →
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
