import Link from "next/link";
import Container from "../layout/Container";

export default function CTA() {
    return (
        <section
            id="cta"
            aria-labelledby="cta-title"
            className="border-t border-dh-street-gray/60 bg-gradient-to-b from-dh-black via-dh-black to-black"
        >
            <Container>
                <div className="py-16 sm:py-20 lg:py-24">
                    <div className="overflow-hidden rounded-3xl border border-dh-street-gray/70 bg-[radial-gradient(circle_at_top,_rgba(30,255,203,0.16),transparent_55%),_rgba(5,5,5,0.98)] px-6 py-8 shadow-[0_0_40px_rgba(30,255,203,0.35)] sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
                        <div className="max-w-xl">
                            <p className="text-xs font-mono uppercase tracking-[0.25em] text-dh-electric-mint">
                                Let&apos;s build something a little dangerous
                            </p>
                            <h2
                                id="cta-title"
                                className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl"
                            >
                                Have a sharp idea that doesn&apos;t fit the corporate playbook?
                            </h2>
                            <p className="mt-4 text-sm text-dh-street-gray sm:text-base">
                                Digital Hooligan is a one-person studio for apps that move fast, feel different,
                                and still respect uptime. If you&apos;re thinking about a product, prototype, or
                                ops tool you can&apos;t stop talking about, let&apos;s sketch it out.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-0">
                            <Link
                                href="#contact"
                                className="inline-flex items-center justify-center rounded-full bg-dh-electric-mint px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:brightness-110"
                            >
                                Talk to Tez
                            </Link>
                            <Link
                                href="#apps"
                                className="inline-flex items-center justify-center rounded-full border border-dh-street-gray/70 bg-dh-black/80 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-dh-street-gray transition hover:border-dh-electric-mint/70 hover:text-dh-electric-mint"
                            >
                                View the builds
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
