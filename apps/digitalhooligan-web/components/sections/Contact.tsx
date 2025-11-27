"use client";

import React from "react";

export default function Contact() {
    return (
        <section
            id="contact"
            className="relative w-full mt-4 mb-8 border border-dh-street-gray/70 bg-dh-black/80 rounded-3xl px-4 py-6 sm:px-8 sm:py-8 overflow-hidden"
        >
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.18),transparent_55%),_radial-gradient(circle_at_bottom,_rgba(34,197,94,0.18),transparent_55%)] opacity-80" />

            <div className="relative z-10 grid gap-6 md:grid-cols-[1.4fr,1fr] items-start">
                {/* Left: text */}
                <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-dh-graffiti-yellow mb-2">
                        CONTACT
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                        Want to collab, hire, or get early access?
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-3">
                        Digital Hooligan is a one-person studio — which means if you reach
                        out, you&apos;re talking directly to the builder, designer, and
                        incident manager behind every app on this page.
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        Got an idea, a partnership, or a problem you want automated?
                        Drop a line and we&apos;ll see if it belongs in the lab.
                    </p>
                </div>

                {/* Right: contact options */}
                <div className="md:pl-6">
                    <div className="rounded-2xl border border-dh-street-gray bg-black/70 p-4 sm:p-5 flex flex-col gap-4">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 mb-1">
                                PRIMARY
                            </p>
                            <a
                                href="mailto:your.email@digitalhooligan.io"
                                className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-dh-electric-mint hover:text-dh-graffiti-yellow underline-offset-4 hover:underline"
                            >
                                your.email@digitalhooligan.io
                            </a>
                            <p className="mt-1 text-xs text-neutral-500">
                                Replace this with your real email before going live.
                            </p>
                        </div>

                        <div className="border-t border-dh-street-gray/70 pt-3">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 mb-1">
                                SOCIAL / GITHUB (OPTIONAL)
                            </p>
                            <ul className="space-y-1 text-xs sm:text-sm text-neutral-200">
                                <li>
                                    <span className="text-neutral-500">GitHub:&nbsp;</span>
                                    <span className="font-medium">github.com/TezDevs</span>
                                </li>
                                <li>
                                    <span className="text-neutral-500">X / Twitter:&nbsp;</span>
                                    <span className="text-neutral-400">
                                        @your_handle (update later)
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <p className="mt-2 text-[11px] sm:text-xs text-neutral-500 leading-relaxed">
                            No giant contact form yet — just direct channels.
                            Simple, fast, and human.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
