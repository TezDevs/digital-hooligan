"use client";

import Container from "../Container";

export default function Contact() {
    return (
        <section
            id="contact"
            className="border-t border-dh-street-gray/60 bg-dh-black"
        >
            <Container>
                <div className="grid gap-8 py-10 sm:py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start md:gap-12 lg:py-16">
                    {/* Left: heading & pitch */}
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <p className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/80 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-dh-electric-mint/80">
                            Let&apos;s talk
                        </p>

                        <div className="space-y-3 sm:space-y-4">
                            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                Need a hooligan in your corner?
                            </h2>
                            <p className="max-w-xl text-sm leading-relaxed text-dh-street-gray/80 sm:text-[0.95rem]">
                                Whether it&apos;s a weird niche product, internal tooling, or
                                experiments you can&apos;t run in a big org, I can help you
                                scope it, build it, and ship it.
                            </p>
                        </div>

                        <div className="space-y-2 text-sm text-dh-street-gray/80">
                            <p>
                                <span className="font-medium text-white">Phone:</span>{" "}
                                <a href="tel:15402876266" className="hover:text-dh-electric-mint">
                                    (540) 287-6266
                                </a>
                            </p>
                            <p>
                                <span className="font-medium text-white">Email:</span>{" "}
                                <a
                                    href="mailto:ceo@digitalhooligan.io"
                                    className="hover:text-dh-electric-mint"
                                >
                                    ceo@digitalhooligan.io
                                </a>
                            </p>
                            <p>
                                <span className="font-medium text-white">GitHub:</span>{" "}
                                <a
                                    href="https://github.com/TezDevs"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-dh-electric-mint"
                                >
                                    github.com/TezDevs
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Right: simple “how this works” card */}
                    <div className="space-y-4">
                        <div className="rounded-3xl border border-dh-street-gray/60 bg-dh-black/70 px-4 py-4 sm:px-5 sm:py-5">
                            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/70">
                                How this works
                            </p>
                            <p className="mt-2 text-xs leading-relaxed text-dh-street-gray/80 sm:text-sm">
                                Shoot me a message with what you&apos;re trying to build, what
                                you&apos;ve tried, and where you&apos;re stuck. If it&apos;s a
                                fit, we&apos;ll sketch a small, dangerous project and ship
                                something real.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
