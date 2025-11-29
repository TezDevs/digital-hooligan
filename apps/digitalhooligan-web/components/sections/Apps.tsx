"use client";

import Container from "../Container";
import AppsShowcase from "../AppsShowcase";

export default function Apps() {
    return (
        <section
            id="apps"
            className="border-b border-dh-street-gray/60 bg-dh-black"
        >
            <Container>
                <div className="space-y-6 py-8 sm:space-y-7 sm:py-10 md:space-y-8 md:py-14">
                    {/* Header */}
                    <div className="space-y-3 sm:space-y-4">
                        <p className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/80 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-dh-electric-mint/80 sm:text-xs">
                            Live tools • Not pitch decks
                        </p>

                        <div className="space-y-2 sm:space-y-3">
                            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">
                                Apps for misfits, hustlers, and collectors.
                            </h2>
                            <p className="max-w-2xl text-sm leading-relaxed text-dh-street-gray/80 sm:text-[0.95rem]">
                                Sneaker price drops, collectible tracking, and money-saving
                                tools. Built fast, opinionated, and tuned for the weird corners
                                of the internet — not the enterprise demo circuit.
                            </p>
                        </div>
                    </div>

                    {/* Apps grid / interactive showcase */}
                    <div className="rounded-3xl border border-dh-street-gray/60 bg-dh-black/70 p-3 sm:p-4 md:p-5">
                        <AppsShowcase />
                    </div>
                </div>
            </Container>
        </section>
    );
}
