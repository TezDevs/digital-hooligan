import Link from "next/link";
import Container from "../layout/Container";

export default function CTA() {
    return (
        <section
            id="cta"
            className="scroll-mt-24 border-t border-dh-street-gray/60 bg-[#040506]"
        >
            <Container>
                <div className="py-12 md:py-16">
                    {/* Tag */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/70 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-electric-mint">
                        <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                        <span>Let&apos;s build</span>
                    </div>

                    <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] md:items-center">
                        {/* Left: copy */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold leading-snug text-white md:text-3xl">
                                Got a weird idea, a noisy data problem, or a tool you wish
                                existed?
                            </h2>
                            <p className="text-sm text-dh-street-gray/80 md:text-base">
                                Digital Hooligan is a one-person skunkworks for scrapers, bots,
                                dashboards, and APIs. If you&apos;re tired of slide decks and
                                want a working build, this is your back alley.
                            </p>

                            <ul className="mt-3 space-y-2 text-sm text-dh-street-gray/80">
                                <li className="flex items-start gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>Prototype a new product or feature in weeks, not quarters.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>Automate the ugly work with scrapers, bots, and internal tools.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>Design + build backend services and APIs you can ship on.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Right: call-to-action card */}
                        <div className="rounded-2xl border border-dh-street-gray/60 bg-gradient-to-br from-dh-black via-[#050608] to-[#050608] p-5 shadow-[0_0_26px_rgba(30,255,203,0.25)]">
                            <p className="text-[11px] font-mono uppercase tracking-[0.26em] text-dh-street-gray">
                                Ready when you are
                            </p>

                            <p className="mt-3 text-sm text-dh-street-gray/80 md:text-base">
                                Send a note with what you&apos;re trying to build, what stack
                                you&apos;re on, and how fast you need it. I&apos;ll reply with
                                options, tradeoffs, and a path to a working build.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link
                                    href="#contact"
                                    className="inline-flex items-center justify-center rounded-full border border-dh-electric-mint bg-dh-electric-mint px-4 py-2 text-xs font-medium text-dh-black transition hover:brightness-110"
                                >
                                    Talk to the hooligan
                                </Link>
                                <Link
                                    href="#apps"
                                    className="inline-flex items-center justify-center rounded-full border border-dh-street-gray/70 bg-dh-black px-4 py-2 text-xs font-medium text-dh-street-gray transition hover:border-dh-electric-mint/70 hover:text-white"
                                >
                                    Browse the apps
                                </Link>
                            </div>

                            <p className="mt-4 text-[11px] text-dh-street-gray/70">
                                No big-agency overhead. Just a senior engineer shipping weird,
                                useful things under a neon bear.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
