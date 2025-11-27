"use client";

import Image from "next/image";
import Container from "../layout/Container"; // keep your existing path if different

export default function Hero() {
  return (
    <section className="border-b border-dh-street-gray/60 bg-dh-black">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-20 lg:gap-16 lg:py-24">
          {/* LEFT: text & chips */}
          <div className="space-y-8">
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-dh-graffiti-yellow/80">
              <span className="h-1 w-1 rounded-full bg-dh-electric-mint shadow-[0_0_10px_rgba(30,255,203,0.9)]" />
              <span>Builder</span>
            </div>

            {/* heading & subcopy */}
            <div className="space-y-4">
              <h1 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                Designed by a builder who actually deploys.
              </h1>

              <p className="max-w-2xl text-sm leading-relaxed text-dh-street-gray sm:text-base">
                Digital Hooligan is led by{" "}
                <span className="font-medium text-dh-electric-mint">
                  Courtez Cannady
                </span>
                — engineer, product thinker, and operator with 14+ years across
                ICAM, C4ISR, fintech, and U.S. Marine Corps mission systems.
              </p>

              <p className="max-w-xl text-sm leading-relaxed text-dh-street-gray/80 sm:text-[15px]">
                The mission isn&apos;t noise — it&apos;s execution. Sharp tools,
                clean UI, and decisive engineering designed for speed and
                utility.
              </p>
            </div>

            {/* primary chips */}
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/80 px-4 py-2 text-xs font-medium text-dh-electric-mint shadow-[0_0_18px_rgba(30,255,203,0.5)] transition hover:-translate-y-0.5 hover:border-dh-electric-mint hover:shadow-[0_0_30px_rgba(30,255,203,0.7)]">
                <span className="text-lg">🧠</span>
                <span>Systems Thinking</span>
              </button>

              <button className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/70 bg-dh-black/80 px-4 py-2 text-xs font-medium text-dh-soft-white transition hover:-translate-y-0.5 hover:border-dh-electric-mint/60">
                <span className="text-lg">🧪</span>
                <span>Apps in the Lab</span>
              </button>

              <button className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/70 bg-dh-black/80 px-4 py-2 text-xs font-medium text-dh-soft-white transition hover:-translate-y-0.5 hover:border-dh-electric-mint/60">
                <span className="text-lg">🧬</span>
                <span>Hooligan Labs</span>
              </button>
            </div>

            {/* skills grid */}
            <div className="mt-4 grid gap-2 text-[11px] text-dh-soft-white/70 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "TypeScript",
                "React / Next.js",
                "Tailwind",
                "Full-stack Engineering",
                "ICAM / Security",
                "Real-time Systems",
                "Fintech & Alerts",
                "Automation / Bots",
              ].map((skill) => (
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

          {/* RIGHT: compact hero card with tight glow */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-[260px] sm:w-[320px] lg:w-[360px]">
              {/* tight glow just around the card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_center,rgba(30,255,203,0.5),transparent_70%)] blur-2xl opacity-80"
              />

              {/* card */}
              <div className="relative overflow-hidden rounded-[24px] border border-dh-electric-mint/60 bg-gradient-to-br from-dh-deep-void via-dh-black to-dh-deep-void shadow-[0_0_40px_rgba(30,255,203,0.7)]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/hero/dh-hero-bear.png"
                    alt="Digital Hooligan bear tagging a wall with neon graffiti."
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
