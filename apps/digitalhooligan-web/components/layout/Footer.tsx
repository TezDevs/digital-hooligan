"use client";

import Link from "next/link";
import Container from "./Container";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-dh-street-gray/60 bg-dh-black/95 py-8">
            <Container>
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    {/* Brand + tagline */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-lg border border-dh-electric-mint/60 bg-dh-black shadow-[0_0_14px_rgba(30,255,203,0.7)]" />
                            <div className="flex flex-col leading-tight">
                                <span className="text-sm font-semibold text-white">
                                    Digital Hooligan
                                </span>
                                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-dh-street-gray">
                                    App Studio · Hooligan Labs
                                </span>
                            </div>
                        </div>
                        <p className="text-[11px] text-dh-street-gray">
                            Small, sharp tools for misfits, hustlers, and collectors of the
                            internet.
                        </p>
                    </div>

                    {/* Quick nav */}
                    <nav className="flex flex-wrap gap-4 text-xs font-medium text-dh-street-gray">
                        <Link
                            href="/"
                            className="transition hover:text-dh-electric-mint"
                        >
                            Home
                        </Link>
                        <Link
                            href="/#apps"
                            className="transition hover:text-dh-electric-mint"
                        >
                            Apps
                        </Link>
                        <Link
                            href="/labs"
                            className="transition hover:text-dh-electric-mint"
                        >
                            Labs
                        </Link>
                        <Link
                            href="/#street-card"
                            className="transition hover:text-dh-electric-mint"
                        >
                            About
                        </Link>
                        <Link
                            href="/#contact"
                            className="transition hover:text-dh-electric-mint"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>

                <div className="mt-6 flex flex-col gap-2 border-t border-dh-street-gray/40 pt-4 text-[11px] text-dh-street-gray md:flex-row md:items-center md:justify-between">
                    <p>
                        © {year} Digital Hooligan. Built by Courtez Cannady · TezDevs.
                    </p>
                    <p className="text-[10px]">
                        Break the rules. Ship dangerous ideas. Keep the uptime respectable.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
