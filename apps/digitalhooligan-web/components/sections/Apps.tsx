"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "../layout/Container";

type AppCard = {
    name: string;
    tagline: string;
    status: string;
    badge?: string;
    href: string;
    iconSrc: string;
    iconAlt: string;
};

const APPS: AppCard[] = [
    {
        name: "PennyWize",
        tagline: "Smart cash-flow autopilot for solo builders & small teams.",
        status: "Prototype",
        badge: "Digital Hooligan Labs",
        href: "/pennywize",
        iconSrc: "/apps/pennywize-icon.png",
        iconAlt: "PennyWize app icon",
    },
    {
        name: "DropSignal",
        tagline: "Price-drop radar for sneakerheads and collectors.",
        status: "Concept",
        badge: "Sneaker & Collectible Ops",
        href: "/dropsignal",
        iconSrc: "/apps/dropsignal-icon.png",
        iconAlt: "DropSignal app icon",
    },
    {
        name: "Ops Toys (R&D)",
        tagline: "Internal tools & experiments that may never see the light of day.",
        status: "Internal only",
        badge: "Hooligan Labs",
        href: "#",
        iconSrc: "/apps/ops-toys-icon.png",
        iconAlt: "Ops Toys experimental tools icon",
    },
];

export default function AppsSection() {
    return (
        <section
            id="apps"
            className="border-t border-dh-street-gray/60 bg-gradient-to-b from-dh-black via-dh-black to-black/90"
        >
            <Container className="py-12 sm:py-14 lg:py-16">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-dh-electric-mint/80">
                            Hooligan Apps
                        </h2>
                        <p className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
                            A small arsenal of slightly dangerous tools.
                        </p>
                    </div>
                    <p className="max-w-md text-sm text-dh-street-gray/80">
                        Built for solo founders, sneakerheads, and collectors who want
                        more signal and less spreadsheet chaos.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="mt-8 grid gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {APPS.map((app) => (
                        <article
                            key={app.name}
                            className="group relative flex flex-col rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4 sm:p-5 shadow-[0_0_0_rgba(0,0,0,0.6)] transition-all duration-200 hover:-translate-y-1.5 hover:border-dh-electric-mint/80 hover:shadow-[0_0_28px_rgba(30,255,203,0.45)]"
                        >
                            {/* Top row: icon + metadata */}
                            <div className="flex items-start gap-3">
                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-dh-street-gray/60 bg-black/60">
                                    <Image
                                        src={app.iconSrc}
                                        alt={app.iconAlt}
                                        fill
                                        sizes="40px"
                                        className="object-contain"
                                    />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="truncate text-sm font-semibold text-white">
                                            {app.name}
                                        </h3>
                                        <span className="rounded-full border border-dh-street-gray/50 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-dh-street-gray/80">
                                            {app.status}
                                        </span>
                                    </div>
                                    {app.badge && (
                                        <p className="mt-1 text-[11px] text-dh-street-gray/70">
                                            {app.badge}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Tagline */}
                            <p className="mt-3 text-sm leading-relaxed text-dh-street-gray/90">
                                {app.tagline}
                            </p>

                            {/* Footer row: learn more link */}
                            <div className="mt-4 flex items-center justify-between text-[11px] text-dh-street-gray/70">
                                <span className="rounded-full bg-white/5 px-2 py-0.5">
                                    Early stage experiment
                                </span>

                                <LearnMoreLink href={app.href} disabled={app.href === "#"} />
                            </div>

                            {/* Glow accent on hover */}
                            <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-100 group-hover:bg-[radial-gradient(circle_at_top,_rgba(30,255,203,0.35),_transparent_60%)]" />
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}

type LearnMoreLinkProps = {
    href: string;
    disabled?: boolean;
};

function LearnMoreLink({ href, disabled }: LearnMoreLinkProps) {
    if (disabled) {
        return (
            <span className="inline-flex items-center gap-1 opacity-60">
                <span>Coming soon</span>
            </span>
        );
    }

    return (
        <Link
            href={href}
            className="inline-flex items-center gap-1 font-medium text-dh-electric-mint/90 transition-colors group-hover:text-dh-electric-mint"
        >
            <span>Learn more</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
            </span>
        </Link>
    );
}
