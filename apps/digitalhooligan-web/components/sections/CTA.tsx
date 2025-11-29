"use client";

import Link from "next/link";
import Container from "../layout/Container";

export default function CTASection() {
    return (
        <section className="border-y border-dh-street-gray/60 bg-gradient-to-b from-[#050509] via-dh-black to-dh-black py-16 md:py-24">
            <Container>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:items-center">
                    {/* Left: main pitch */}
                    <div className="space-y-5">
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-dh-graffiti-yellow">
                            Let&apos;s build something dangerous
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                            Need an ops-minded builder who actually ships?
                        </h2>
                        <p className="max-w-xl text-sm text-dh-street-gray sm:text-base">
                            Whether it&apos;s a money tool, a sneaker or collectibles
                            product, or a weird internal ops dashboard, Digital Hooligan
                            treats your idea like a system — with uptime, observability, and
                            execution baked in from day one.
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4 text-xs text-dh-street-gray shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dh-street-gray">
                                    Good fit if you need
                                </p>
                                <ul className="mt-2 space-y-1.5">
                                    <li>• A founder-friendly technical partner</li>
                                    <li>• Prototypes that can survive production</li>
                                    <li>• Someone who respects both vibes &amp; infra</li>
                                </ul>
                            </div>
                            <div className="rounded-2xl border border-dh-electric-mint/60 bg-dh-black/90 p-4 text-xs text-dh-street-gray shadow-[0_0_26px_rgba(30,255,203,0.45)]">
                                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dh-electric-mint">
                                    How I think
                                </p>
                                <ul className="mt-2 space-y-1.5">
                                    <li>• Ops-first product thinking</li>
                                    <li>• Clear communication, low drama</li>
                                    <li>• Experiments in Hooligan Labs before launch</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right: call-to-action card */}
                    <div className="rounded-3xl border border-dh-street-gray/60 bg-dh-black/85 p-6 shadow-[0_0_32px_rgba(0,0,0,0.8)]">
                        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-dh-graffiti-yellow">
                            Call to action
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                            Tell me what you&apos;re trying to build.
                        </h3>
                        <p className="mt-3 text-sm text-dh-street-gray">
                            A few lines about your idea, who it&apos;s for, and why it has to
                            exist. I&apos;ll respond with concrete next steps — not a vague
                            “let&apos;s chat” calendar link.
                        </p>

                        <div className="mt-5 flex flex-col gap-3">
                            <Link
                                href="#contact"
                                className="inline-flex items-center justify-center rounded-full bg-dh-electric-mint px-5 py-2.5 text-sm font-medium text-dh-black transition hover:bg-dh-electric-mint/90"
                            >
                                Jump to contact
                            </Link>
                            <div className="text-[11px] text-dh-street-gray">
                                Prefer async? Use the contact section to send an email or
                                connect via LinkedIn — whatever fits your flow.
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
