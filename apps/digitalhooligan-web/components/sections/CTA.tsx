import Container from "../layout/Container";

export default function CTA() {
    return (
        <section
            id="cta"
            className="border-y border-dh-street-gray/60 bg-dh-black/90"
        >
            <Container>
                <div className="flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
                    {/* Copy block */}
                    <div className="max-w-xl space-y-4">
                        <p className="text-xs font-mono uppercase tracking-[0.35em] text-dh-electric-mint">
                            Break the rules. Ship dangerous ideas.
                        </p>
                        <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                            Need a rogue engineer to turn your wild concept into a real app?
                        </h2>
                        <p className="text-sm text-dh-street-gray/80 md:text-base">
                            Digital Hooligan is a one-person lab for weird, high-leverage
                            builds&mdash;from scrapers and bots to full product experiments.
                            Fast iterations, honest feedback, and zero corporate fluff.
                        </p>
                    </div>

                    {/* Buttons block */}
                    <div className="flex flex-col gap-3 md:min-w-[260px] md:flex-row md:items-center md:justify-end md:gap-4">
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-full border border-dh-electric-mint bg-dh-electric-mint px-6 py-3 text-sm font-semibold text-dh-black shadow-[0_0_30px_rgba(30,255,203,0.75)] transition hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(30,255,203,0.9)]"
                        >
                            Book a build session
                        </a>

                        <a
                            href="#labs"
                            className="inline-flex items-center justify-center rounded-full border border-dh-street-gray px-6 py-3 text-sm font-medium text-dh-street-gray transition hover:border-dh-electric-mint/70 hover:text-white"
                        >
                            Browse Hooligan Labs
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}
