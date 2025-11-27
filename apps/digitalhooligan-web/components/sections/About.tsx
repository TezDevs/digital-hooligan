"use client";

import React from "react";

export default function About() {
    return (
        <section
            id="about"
            className="relative w-full mt-16 border border-dh-street-gray/70 bg-dh-black/80 rounded-3xl px-6 py-10 sm:px-10 sm:py-12"
        >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                {/* Left: heading + story */}
                <div className="max-w-xl">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-dh-graffiti-yellow mb-2">
                        WHAT WE DO
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                        A one-person app studio for rule-breaking tools.
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-3">
                        Digital Hooligan is a solo-run lab for scrappy, hyper-focused apps —
                        built for people who camp drops, chase deals, and live in dashboards.
                        No bloated platforms, no enterprise fluff. Just fast, sharp tools that
                        feel like they were built by someone who actually uses them.
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        Every app under the Hooligan banner shares the same DNA:
                        realtime-first, signal-heavy, and obsessed with surfacing the{" "}
                        <span className="text-neutral-100">one piece of information</span>{" "}
                        you actually need to make a move.
                    </p>
                </div>

                {/* Right: quick bullets */}
                <div className="mt-4 md:mt-0 md:max-w-sm w-full">
                    <div className="rounded-2xl border border-dh-street-gray bg-black/70 p-4 sm:p-5 space-y-3">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                            CURRENT FOCUS
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-neutral-200">
                            <li>• PennyWize – penny stock signal + alert engine</li>
                            <li>• DropSignal – price-drop radar for deals & drops</li>
                            <li>• HypeWatch – collectibles & hype asset tracking</li>
                        </ul>
                        <p className="pt-2 border-t border-dh-street-gray/70 text-[11px] sm:text-xs text-neutral-500">
                            Designed, built, and shipped by Courtez “TezDevs” Cannady —
                            this site is the lab, the playground, and the portfolio.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
