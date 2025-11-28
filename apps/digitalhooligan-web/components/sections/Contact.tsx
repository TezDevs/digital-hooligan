import Link from "next/link";

export default function Contact() {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-dh-street-gray/60 bg-dh-black/90 px-6 py-10 md:px-10 md:py-12">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-16 top-0 h-40 w-40 rounded-full border border-dh-electric-mint/25 blur-xl" />
                <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full border border-dh-electric-mint/25 blur-xl" />
            </div>

            <div className="relative grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
                {/* Text */}
                <div className="space-y-4">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-dh-electric-mint/80">
                        Contact
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                        Let&apos;s build something{" "}
                        <span className="text-dh-electric-mint">reckless</span>.
                    </h2>
                    <p className="text-sm md:text-base text-dh-street-gray">
                        Have a wild idea, a product you&apos;re scared to ship, or a system
                        you want a hooligan to break and rebuild? Reach out and let&apos;s
                        talk scope, chaos, and timelines.
                    </p>

                    <div className="space-y-2 text-sm text-dh-street-gray">
                        <p>
                            Email:{" "}
                            <a
                                href="mailto:your-email@digitalhooligan.io"
                                className="text-dh-electric-mint hover:underline"
                            >
                                your-email@digitalhooligan.io
                            </a>
                        </p>
                        <p className="text-xs text-dh-street-gray/80">
                            Short brief, links, screenshots – whatever helps tell the story.
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link
                            href="mailto:your-email@digitalhooligan.io"
                            className="inline-flex items-center justify-center rounded-full border border-dh-electric-mint/70 bg-dh-electric-mint/10 px-5 py-2.5 text-sm font-medium text-dh-electric-mint hover:bg-dh-electric-mint hover:text-dh-black transition"
                        >
                            Email Digital Hooligan
                        </Link>
                    </div>
                </div>

                {/* Side badge */}
                <div className="relative rounded-3xl border border-dh-electric-mint/40 bg-gradient-to-br from-dh-black via-dh-black to-dh-electric-mint/15 p-5 text-sm text-dh-street-gray">
                    <div className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-dh-electric-mint/80">
                        What to expect
                    </div>
                    <ul className="space-y-2 text-xs md:text-sm">
                        <li>• Quick async back-and-forth via email.</li>
                        <li>• Honest scope check – what&apos;s possible, what&apos;s not.</li>
                        <li>• No spam, no mailing list, just real collaboration.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
