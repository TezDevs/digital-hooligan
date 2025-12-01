"use client";

import Link from "next/link";
import Container from "./Container";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-dh-street-gray/40 bg-dh-black/95 px-4 py-8 sm:px-6 lg:px-8">
            <Container>
                <div className="mx-auto max-w-6xl space-y-8 text-sm text-dh-street-gray">
                    {/* Top grid */}
                    <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
                        {/* Brand blurb */}
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dh-electric-mint">
                                Digital Hooligan LLC
                            </p>
                            <p className="max-w-md text-sm leading-relaxed">
                                A one-person studio shipping scrappy tools, bots, and apps
                                around money, sneakers, collectibles, and ops — with an ops-first
                                mindset and a little bit of chaos.
                            </p>
                        </div>

                        {/* Nav */}
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dh-offwhite/80">
                                Navigate
                            </p>
                            <nav className="flex flex-col gap-1 text-sm">
                                <Link
                                    href="/#apps"
                                    className="hover:text-dh-electric-mint/80"
                                >
                                    Apps
                                </Link>
                                <Link
                                    href="/labs"
                                    className="hover:text-dh-electric-mint/80"
                                >
                                    Labs
                                </Link>
                                <Link
                                    href="/#street-cred"
                                    className="hover:text-dh-electric-mint/80"
                                >
                                    About
                                </Link>
                                <Link
                                    href="/#contact"
                                    className="hover:text-dh-electric-mint/80"
                                >
                                    Contact
                                </Link>
                                <Link
                                    href="/ceo"
                                    className="hover:text-dh-electric-mint/80"
                                >
                                    CEO console
                                </Link>
                            </nav>
                        </div>

                        {/* Contact + socials */}
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dh-offwhite/80">
                                Contact
                            </p>
                            <div className="space-y-1 text-sm">
                                <p>Virginia, USA</p>
                                <p>
                                    <a
                                        href="tel:+15402876266"
                                        className="hover:text-dh-electric-mint/80"
                                    >
                                        540-287-6266
                                    </a>
                                </p>
                                <p>
                                    <a
                                        href="mailto:hello@digitalhooligan.io"
                                        className="hover:text-dh-electric-mint/80"
                                    >
                                        hello@digitalhooligan.io
                                    </a>
                                </p>
                            </div>

                            <div className="space-y-1 text-sm">
                                <a
                                    href="https://github.com/TezDevs"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-dh-electric-mint/80"
                                >
                                    TezDevs on GitHub
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/courtez-cannady-a"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-dh-electric-mint/80"
                                >
                                    Courtez M. Cannady on LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom row */}
                    <div className="flex flex-col items-start justify-between gap-3 border-t border-dh-street-gray/40 pt-4 text-[11px] sm:flex-row sm:items-center">
                        <p className="text-dh-street-gray">
                            © {year} Digital Hooligan LLC. All rights reserved.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/terms"
                                className="hover:text-dh-electric-mint/80"
                            >
                                Terms
                            </Link>
                            <Link
                                href="/privacy"
                                className="hover:text-dh-electric-mint/80"
                            >
                                Privacy
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
