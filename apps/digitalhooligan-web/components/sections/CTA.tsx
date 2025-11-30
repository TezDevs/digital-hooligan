"use client";

import Link from "next/link";
import Container from "../Container";

export default function CTA() {
    return (
        <section
            id="cta"
            className="border-t border-dh-street-gray/40 bg-gradient-to-b from-dh-black to-[#060708] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
            <Container>
                <div className="mx-auto max-w-5xl space-y-8">
                    {/* Heading */}
                    <header className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dh-graffiti-yellow">
                            Let&apos;s build something dangerous
                        </p>
                        <h2 className="text-3xl font-semibold tracking-tight text-dh-offwhite sm:text-4xl">
                            Need an ops-minded builder who actually ships?
                        </h2>
                        <p className="max-w-3xl text-sm leading-relaxed text-dh-street-gray sm:text-base">
                            Whether it&apos;s a money tool, a sneaker or collectibles product,
                            or a weird internal ops dashboard, Digital Hooligan treats your
                            idea like a system — with uptime, observability, and execution
                            baked in from day one.
                        </p>
                    </header>

                    {/* Cards row */}
                    <div className="grid gap-4 md:grid-cols-[1.1fr_1.1fr_1.3fr]">
                        {/* GOOD FIT card – now readable */}
                        <div className="rounded-2xl border border-dh-street-gray/40 bg-dh-black/80 p-4 transition duration-200 hover:border-dh-electric-mint/50 hover:bg-dh-black/90 sm:p-5">
                            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-dh-offwhite/85">
                                Good fit if you need
                            </p>
                            <ul className="space-y-1.5 text-sm leading-relaxed text-dh-street-gray">
                                <li>• A founder-friendly technical partner</li>
                                <li>• Prototypes that can survive production</li>
                                <li>• Someone who respects both vibes &amp; infra</li>
                            </ul>
                        </div>

                        {/* HOW I THINK card – keep the glow */}
                        <div className="rounded-2xl border border-dh-electric-mint/60 bg-dh-black/90 p-[1px] shadow-[0_0_42px_rgba(30,255,203,0.45)]">
                            <div className="h-full rounded-2xl bg-gradient-to-br from-dh-black via-dh-black to-[#041917] p-4 sm:p-5">
                                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-dh-electric-mint">
                                    How I think
                                </p>
                                <ul className="space-y-1.5 text-sm leading-relaxed text-dh-offwhite/90">
                                    <li>• Ops-first product thinking</li>
                                    <li>• Clear communication, low drama</li>
                                    <li>• Experiments in Hooligan Labs before launch</li>
                                </ul>
                            </div>
                        </div>

                        {/* CTA card */}
                        <div className="rounded-2xl border border-dh-street-gray/40 bg-dh-black/90 p-5 sm:p-6">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-dh-graffiti-yellow">
                                Call to action
                            </p>
                            <h3 className="text-lg font-semibold text-dh-offwhite sm:text-xl">
                                Tell me what you&apos;re trying to build.
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-dh-street-gray">
                                A few lines about your idea, who it&apos;s for, and why it has
                                to exist. I&apos;ll respond with concrete next steps — not a
                                vague &quot;let&apos;s chat&quot; calendar link.
                            </p>

                            <div className="mt-5">
                                <Link
                                    href="#contact"
                                    className="inline-flex w-full items-center justify-center rounded-full bg-dh-electric-mint px-4 py-2.5 text-sm font-semibold text-dh-black shadow-[0_0_32px_rgba(30,255,203,0.55)] transition hover:brightness-110"
                                >
                                    Jump to contact
                                </Link>
                                <p className="mt-3 text-[11px] leading-relaxed text-dh-street-gray">
                                    Prefer async? Use the contact section to send an email or
                                    connect via LinkedIn — whatever fits your flow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
