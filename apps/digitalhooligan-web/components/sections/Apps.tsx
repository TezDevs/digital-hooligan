"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "../Container";

type AppCard = {
    name: string;
    slug?: string; // only for those with detail pages
    tagline: string;
    status: string;
    statusTone: "live" | "beta" | "soon";
    description: string;
    iconSrc?: string; // adjust these to match your actual icon file names
};

const APPS: AppCard[] = [
    {
        name: "PennyWize",
        slug: "pennywize",
        tagline: "Penny stock radar bot → web app → mobile.",
        status: "Bot first • Web app next",
        statusTone: "beta",
        description:
            "A penny stock scraper that surfaces unusual volume, price action, and watchlist ideas so you can spend less time refreshing charts and more time executing.",
        iconSrc: "/apps/pennywize.png",
    },
    {
        name: "DropSignal",
        slug: "dropsignal",
        tagline: "Sneakers + streetwear price-drop radar.",
        status: "Assist mode alerts • Grown-up mode later",
        statusTone: "beta",
        description:
            "DropSignal tracks price drops and restocks for sneakers and urban streetwear — think Jordans, Kith, Mitchell & Ness — starting with assist-mode alerts and later add-to-cart integrations via official retailers.",
        iconSrc: "/apps/dropsignal.png",
    },
    {
        name: "HypeWatch",
        tagline: "Collectibles price tracking for display-worthy stuff.",
        status: "Concept lab • Coming soon",
        statusTone: "soon",
        description:
            "HypeWatch focuses on display pieces — graded cards, figures, magazines, watches, and other shelf-worthy collectibles — with alerts around market moves and grail finds.",
        iconSrc: "/apps/hypewatch.png",
    },
    {
        name: "Ops Toys",
        tagline: "Ops automation toys for infra + logs + workflow.",
        status: "Idea drawer • Coming soon",
        statusTone: "soon",
        description:
            "A drawer full of small ops toys: helpers for infra, logging, deployment hygiene, and dev workflow. Think of it as a toolbox that quietly keeps your stack less painful.",
        iconSrc: "/apps/opstoys.png",
    },
];

function StatusPill({
    tone,
    children,
}: {
    tone: AppCard["statusTone"];
    children: React.ReactNode;
}) {
    const base =
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border shadow-sm";
    const toneClasses =
        tone === "live"
            ? "border-emerald-500/50 text-emerald-300 bg-emerald-500/10"
            : tone === "beta"
                ? "border-dh-electric-mint/50 text-dh-electric-mint bg-dh-electric-mint/5"
                : "border-yellow-400/40 text-yellow-200 bg-yellow-400/10";

    return <span className={`${base} ${toneClasses}`}>{children}</span>;
}

export default function AppsSection() {
    return (
        <section
            id="apps"
            className="border-t border-dh-street-gray/60 bg-dh-black/70 py-16 sm:py-20"
        >
            <Container>
                {/* Heading row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-dh-electric-mint/80">
                            Hooligan Apps
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                            Tools first. Apps second. Social later.
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm text-dh-street-gray/80 sm:text-base">
                            Everything here starts as a bot or internal tool. Once it proves
                            itself, it graduates into a full web app and eventually a mobile
                            app with a social layer wrapped around the data.
                        </p>
                    </div>

                    <p className="max-w-xs text-xs text-dh-street-gray/80">
                        Long-term, these apps plug into a shared Hooligan dashboard and API
                        layer. For now, they&apos;re focused on doing one job extremely
                        well.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2">
                    {APPS.map((app) => {
                        const hasDetail = Boolean(app.slug);
                        const href = hasDetail ? `/${app.slug}` : undefined;

                        const CardInner = (
                            <article className="group relative flex h-full flex-col rounded-2xl border border-dh-street-gray/70 bg-gradient-to-br from-dh-black/90 via-dh-black to-dh-black/80 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.75)] transition-transform duration-300 hover:-translate-y-1 hover:border-dh-electric-mint/70 hover:shadow-[0_18px_80px_rgba(30,255,203,0.40)] sm:p-5">
                                {/* Glow accent */}
                                <div className="pointer-events-none absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-dh-electric-mint/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="flex items-start gap-4">
                                    {/* Icon or placeholder */}
                                    <div className="relative flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-xl border border-dh-street-gray/70 bg-dh-black/80 shadow-[0_0_22px_rgba(30,255,203,0.4)]">
                                        {app.iconSrc ? (
                                            <Image
                                                src={app.iconSrc}
                                                alt={app.name}
                                                fill
                                                className="object-contain p-1.5"
                                            />
                                        ) : (
                                            <span className="text-lg font-semibold text-dh-electric-mint">
                                                {app.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-base font-semibold text-white sm:text-lg">
                                                {app.name}
                                            </h3>
                                            <StatusPill tone={app.statusTone}>{app.status}</StatusPill>
                                        </div>

                                        <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-dh-electric-mint/80">
                                            {app.tagline}
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-4 text-sm leading-relaxed text-dh-street-gray/80">
                                    {app.description}
                                </p>

                                {/* Footer row */}
                                <div className="mt-4 flex items-center justify-between gap-3">
                                    {hasDetail ? (
                                        <Link
                                            href={href!}
                                            className="inline-flex items-center gap-1 text-xs font-medium text-dh-electric-mint/90 underline-offset-4 hover:text-dh-electric-mint hover:underline"
                                        >
                                            Learn more
                                            <span aria-hidden>→</span>
                                        </Link>
                                    ) : (
                                        <span className="text-xs text-dh-street-gray/70">
                                            Detail page coming soon.
                                        </span>
                                    )}

                                    <span className="text-[10px] uppercase tracking-[0.2em] text-dh-street-gray/60">
                                        Digital Hooligan Labs
                                    </span>
                                </div>
                            </article>
                        );

                        // Card wrapper allows future per-card links if desired
                        return hasDetail ? (
                            <div key={app.name} className="h-full">
                                {CardInner}
                            </div>
                        ) : (
                            <div key={app.name} className="h-full">
                                {CardInner}
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
