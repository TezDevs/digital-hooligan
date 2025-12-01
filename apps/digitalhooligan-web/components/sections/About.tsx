// components/sections/About.tsx

import Image from "next/image";

export default function AboutSection() {
    return (
        <section
            id="about"
            className="relative border-t border-white/5 bg-black py-20 sm:py-24"
        >
            <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-start">
                {/* Left: text */}
                <div className="flex-1">
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400/80">
                        About
                    </p>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">
                        The hooligan behind the keyboard
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
                        I&apos;m a U.S. Marine Corps veteran and technologist, born in
                        Charleston, SC and currently based in Virginia. I hold a Bachelor
                        of Science in Information Technology Management and I&apos;m
                        certified as an AWS Certified Cloud Practitioner, AWS Certified
                        Solutions Architect, Google Professional Project Manager, PSPO, and
                        CSM.
                    </p>
                    <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                        When I&apos;m not building tools and automation, you&apos;ll usually
                        find me strength training, watching anime, reading manga, gaming, or
                        experimenting with new ideas in web development. Digital Hooligan is
                        where all of that energy shows up as apps, bots, APIs, and ops toys
                        that make founders&apos; lives easier.
                    </p>
                </div>

                {/* Right: headshot + snapshot */}
                <div className="w-full max-w-sm space-y-4">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/70 shadow-[0_0_40px_rgba(0,0,0,0.7)]">
                        <Image
                            src="/tez-headshot.jpg" // <-- update this path/filename if your image is different
                            alt="Courtez Cannady headshot"
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 320px, 60vw"
                            priority
                        />
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-zinc-950/70 p-5 text-sm text-zinc-200 shadow-[0_0_40px_rgba(0,0,0,0.7)]">
                        <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400/80">
                            Snapshot
                        </h3>
                        <dl className="mt-4 space-y-3">
                            <div className="flex justify-between gap-4">
                                <dt className="text-zinc-400">Background</dt>
                                <dd className="text-right">
                                    U.S. Marine Corps veteran, IT management, product &amp; ops
                                </dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-zinc-400">Focus</dt>
                                <dd className="text-right">
                                    Product management, APIs, automation, and dashboards
                                </dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-zinc-400">Stack</dt>
                                <dd className="text-right">
                                    Next.js, TypeScript, Tailwind, AWS, Stripe, modern APIs
                                </dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-zinc-400">Off-duty</dt>
                                <dd className="text-right">
                                    Strength training, anime, manga, games, and tinkering with new
                                    tools
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
