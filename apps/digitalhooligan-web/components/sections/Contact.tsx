import Container from "../layout/Container";

const PHONE = "540-287-6266";
const EMAIL = "ceo@digitalhooligan.io"; // placeholder CEO email
const GITHUB = "https://github.com/TezDevs";

export default function Contact() {
    return (
        <section
            id="contact"
            className="scroll-mt-24 border-t border-dh-street-gray/60 bg-dh-black"
        >
            <Container>
                <div className="py-16 md:py-20">
                    {/* Tag */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-electric-mint">
                        <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                        <span>Contact</span>
                    </div>

                    <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
                        {/* Left: copy */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold leading-snug text-white md:text-3xl">
                                Ready to ship something dangerous, weird, or high-leverage?
                            </h2>
                            <p className="text-sm text-dh-street-gray/80 md:text-base">
                                Whether it&apos;s a scraper, a bot, a custom API, or a full
                                product experiment, Digital Hooligan is a one-person strike
                                team. You bring the idea and constraints&mdash;I handle the
                                architecture, build, and iteration.
                            </p>

                            <ul className="mt-4 space-y-2 text-sm text-dh-street-gray/80">
                                <li className="flex items-start gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>Rapid prototypes for new app or feature ideas.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>
                                        Scrapers, automation, and internal tools that actually save
                                        hours.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                                    <span>
                                        APIs and backend services to power your frontends or bots.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Right: contact card */}
                        <div className="space-y-4">
                            <div className="rounded-2xl border border-dh-street-gray/60 bg-gradient-to-br from-dh-black via-[#050608] to-[#050608] p-5 shadow-[0_0_0_rgba(0,0,0,0)]">
                                <p className="text-xs font-mono uppercase tracking-[0.25em] text-dh-street-gray">
                                    Direct line
                                </p>
                                <p className="mt-3 text-sm font-semibold text-white">
                                    Courtez &quot;Tez&quot; Cannady
                                </p>
                                <p className="text-xs text-dh-street-gray/80">
                                    Founder &amp; Chief Hooligan
                                </p>

                                <div className="mt-4 space-y-3 text-sm">
                                    <a
                                        href={`tel:${PHONE}`}
                                        className="flex items-center justify-between gap-2 rounded-xl border border-dh-street-gray/70 bg-dh-black/60 px-3 py-2 text-dh-street-gray transition hover:border-dh-electric-mint/70 hover:text-white"
                                    >
                                        <span className="text-xs font-mono uppercase tracking-[0.2em]">
                                            Phone
                                        </span>
                                        <span className="font-medium">{PHONE}</span>
                                    </a>

                                    <a
                                        href={`mailto:${EMAIL}`}
                                        className="flex items-center justify-between gap-2 rounded-xl border border-dh-street-gray/70 bg-dh-black/60 px-3 py-2 text-dh-street-gray transition hover:border-dh-electric-mint/70 hover:text-white"
                                    >
                                        <span className="text-xs font-mono uppercase tracking-[0.2em]">
                                            Email
                                        </span>
                                        <span className="truncate text-sm font-medium">
                                            {EMAIL}
                                        </span>
                                    </a>

                                    <a
                                        href={GITHUB}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-between gap-2 rounded-xl border border-dh-street-gray/70 bg-dh-black/60 px-3 py-2 text-dh-street-gray transition hover:border-dh-electric-mint/70 hover:text-white"
                                    >
                                        <span className="text-xs font-mono uppercase tracking-[0.2em]">
                                            GitHub
                                        </span>
                                        <span className="text-sm font-medium">TezDevs</span>
                                    </a>
                                </div>

                                <p className="mt-4 text-[11px] text-dh-street-gray/70">
                                    Drop a message with what you&apos;re trying to build, what
                                    stack you&apos;re on, and how fast you need it. I&apos;ll
                                    reply with options, not buzzwords.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
