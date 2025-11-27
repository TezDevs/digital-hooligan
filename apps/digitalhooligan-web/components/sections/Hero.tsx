"use client";

import Image from "next/image";
import Container from "../layout/Container"; // adjust if your Container path is different

const SKILLS = [
    "TypeScript",
    "React / Next.js",
    "Tailwind",
    "Full-stack Engineering",
    "ICAM / Security",
    "Real-time Systems",
    "Fintech & Alerts",
    "Automation / Bots",
];

export default function Hero() {
    return (
        <section className="bg-dh-black border-b border-dh-street-gray/60">
            <Container>
                <div className="flex flex-col items-start gap-10 py-16 md:flex-row md:items-center md:py-20">
                    {/* LEFT: text */}
                    <div className="max-w-xl space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-dh-graffiti-yellow/80">
                            <span className="h-1 w-1 rounded-full bg-dh-electric-mint shadow-[0_0_10px_rgba(30,255,203,0.9)]" />
                            <span>Builder</span>
                        </div>

                        <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                            Designed by a builder who actually deploys.
                        </h1>

                        <p className="text-sm leading-relaxed text-dh-street-gray sm:text-base">
                            Digital Hooligan is led by{" "}
                            <span className="font-medium text-dh-electric-mint">
                                Courtez Cannady
                            </span>
                            — engineer, product thinker, and operator with 14+ years across
                            ICAM, C4ISR, fintech, and U.S. Marine Corps mission systems.
                        </p>

                        <p className="text-sm leading-relaxed text-dh-street-gray/80 sm:text-[15px]">
                            The mission isn&apos;t noise — it&apos;s execution. Sharp tools, clean
                            UI, and decisive engineering designed for speed and utility.
                        </p>

                        {/* skills row */}
                        <div className="mt-4 grid gap-2 text-[11px] text-dh-soft-white/70 sm:grid-cols-2 lg:grid-cols-4">
                            {SKILLS.map((skill) => (
                                <div
                                    key={skill}
                                    className="inline-flex items-center justify-start gap-2 rounded-full border border-dh-street-gray/50 bg-dh-deep-void/60 px-3 py-1.5 backdrop-blur-sm"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint/80 shadow-[0_0_10px_rgba(30,255,203,0.9)]" />
                                    <span>{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: clean image card */}
                    <div className="w-full max-w-[420px]">
                        <div className="overflow-hidden rounded-[24px] border border-dh-street-gray/70 bg-dh-deep-void shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                            <Image
                                src="/images/hero/dh-hero-bear.png"
                                alt="Digital Hooligan bear tagging a wall with neon graffiti."
                                width={1200}
                                height={900}
                                className="block h-full w-full object-cover object-center"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
