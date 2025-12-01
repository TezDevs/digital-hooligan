"use client";

import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-800 bg-black/80 text-zinc-400 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:flex-row lg:items-start lg:justify-between">
                {/* Brand / tagline */}
                <div className="space-y-3">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/60 bg-emerald-500/10 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                            DH
                        </span>
                        <span className="text-sm font-semibold text-zinc-100">
                            Digital Hooligan
                        </span>
                    </Link>
                    <p className="max-w-sm text-xs text-zinc-500">
                        Digital Hooligan LLC – a small, loud lab for ops toys, bots, and
                        web apps that make infrastructure, price watching, and workflows a
                        little less painful.
                    </p>
                </div>

                {/* Internal navigation */}
                <div className="flex flex-1 flex-wrap gap-8 text-xs sm:text-sm">
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
                            Site
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/#apps"
                                    className="transition hover:text-emerald-300"
                                >
                                    Apps
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/labs"
                                    className="transition hover:text-emerald-300"
                                >
                                    Hooligan Labs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#street-cred"
                                    className="transition hover:text-emerald-300"
                                >
                                    Street Cred
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#contact"
                                    className="transition hover:text-emerald-300"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
                            Experiments
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/pennywize"
                                    className="transition hover:text-emerald-300"
                                >
                                    PennyWize
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dropsignal"
                                    className="transition hover:text-emerald-300"
                                >
                                    DropSignal
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/hypewatch"
                                    className="transition hover:text-emerald-300"
                                >
                                    HypeWatch
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/ops-toys"
                                    className="transition hover:text-emerald-300"
                                >
                                    Ops Toys
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
                            Connect
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://github.com/TezDevs"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="transition hover:text-emerald-300"
                                >
                                    GitHub – TezDevs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/courtez-cannady-a"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="transition hover:text-emerald-300"
                                >
                                    LinkedIn – Courtez M. Cannady
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
                            Legal
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="transition hover:text-emerald-300"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="transition hover:text-emerald-300"
                                >
                                    Terms of Use
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-zinc-800">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-[11px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>
                        © {year} Digital Hooligan LLC. All rights reserved. Built in the lab
                        and deployed to the streets.
                    </p>

                    <div className="flex items-center gap-3">
                        <p className="text-[11px] text-zinc-600">
                            Nothing here is financial, investment, tax, or legal advice. Use
                            your own judgment and talk to a professional when in doubt.
                        </p>

                        {/* Hidden-ish CEO login */}
                        <Link
                            href="/ceo/login"
                            aria-label="CEO login"
                            className="text-[10px] text-zinc-700 underline decoration-zinc-900 underline-offset-4 hover:text-emerald-300 hover:decoration-emerald-400"
                        >
                            ceo
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}