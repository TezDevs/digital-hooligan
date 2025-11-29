import Image from "next/image";
import Container from "../layout/Container";

export default function About() {
    return (
        <section
            id="about"
            aria-labelledby="about-title"
            className="border-t border-dh-street-gray/60 bg-dh-black"
        >
            <Container>
                <div className="py-16 sm:py-20 lg:py-24">
                    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-16">
                        {/* Photo */}
                        <div className="flex justify-center md:justify-start">
                            <div className="relative h-48 w-48 overflow-hidden rounded-3xl border border-dh-electric-mint/60 bg-dh-black/90 shadow-[0_0_40px_rgba(30,255,203,0.35)] sm:h-56 sm:w-56">
                                <Image
                                    src="/about/tez-headshot.jpg"
                                    alt="Courtez “Tez” Cannady, founder of Digital Hooligan"
                                    fill
                                    sizes="(min-width: 768px) 14rem, 12rem"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Copy */}
                        <div>
                            <p className="text-xs font-mono uppercase tracking-[0.25em] text-dh-electric-mint">
                                About the Hooligan
                            </p>
                            <h2
                                id="about-title"
                                className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl"
                            >
                                I build dangerous little tools with serious fundamentals.
                            </h2>

                            <p className="mt-4 max-w-2xl text-sm text-dh-street-gray md:text-base">
                                I&apos;m Courtez (&quot;Tez&quot;), the founder of Digital Hooligan. I was born
                                in Charleston, SC and built my career around systems where failure isn&apos;t an
                                option—defense, government, and payment operations.
                            </p>

                            <p className="mt-3 max-w-2xl text-sm text-dh-street-gray md:text-base">
                                I hold a B.S. in Information Technology Management and certifications including
                                AWS Certified Cloud Practitioner, AWS Certified Solutions Architect, Google
                                Professional Project Management, PSPO, and CSM. That mix of engineering,
                                architecture, and delivery discipline shapes every app that ships from this studio.
                            </p>

                            <p className="mt-3 max-w-2xl text-sm text-dh-street-gray md:text-base">
                                I currently live in Virginia and when I&apos;m not building, you&apos;ll catch me
                                strength training, watching anime, reading manga, gaming, or experimenting with new
                                web stacks.
                            </p>

                            {/* Quick tags */}
                            <div className="mt-5 flex flex-wrap gap-2">
                                <span className="inline-flex items-center rounded-full border border-dh-electric-mint/40 bg-dh-electric-mint/10 px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-dh-electric-mint">
                                    Founder / Engineer
                                </span>
                                <span className="inline-flex items-center rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-dh-street-gray">
                                    Defense &amp; Gov Ops
                                </span>
                                <span className="inline-flex items-center rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-dh-street-gray">
                                    Payments &amp; Real-time
                                </span>
                                <span className="inline-flex items-center rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-dh-street-gray">
                                    Anime / Manga / Games
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
