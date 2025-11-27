"use client";

import Image from "next/image";
import Container from "../layout/Container"; // if your Container path is different, keep your existing import

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-dh-street-gray/60 bg-dh-black">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-56 -right-40 h-96 w-96 rounded-full bg-dh-electric-mint/20 blur-3xl" />
        <div className="absolute -bottom-64 -left-32 h-96 w-96 rounded-full bg-dh-rebel-red/15 blur-3xl" />
      </div>

      <Container>
        <div className="relative grid items-center gap-12 py-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:py-20 lg:py-24">
          {/* LEFT: text */}
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

            {/* main chips */}
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

            {/* skills */}
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

          {/* RIGHT: hero image card */}
          <div className="flex justify-center md:justify-end">
            <div className="relative h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] lg:h-[360px] lg:w-[360px]">
              {/* outer glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_top,rgba(30,255,203,0.35),transparent_60%),radial-gradient(circle_at_bottom,rgba(244,63,94,0.25),transparent_60%)] opacity-80 blur-2xl"
              />

              {/* main card */}
              <div className="relative flex h-full w-full items-center justify-center rounded-[32px] border border-dh-electric-mint/50 bg-gradient-to-br from-dh-deep-void/95 via-dh-black to-dh-electric-mint/10 shadow-[0_0_80px_rgba(30,255,203,0.7)]">
                {/* inner glow */}
                <div className="absolute inset-px rounded-[30px] bg-[radial-gradient(circle_at_0_0,rgba(30,255,203,0.28),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(244,63,94,0.3),transparent_55%)] opacity-70 mix-blend-screen" />

                {/* image */}
                <div className="relative h-[82%] w-[82%] overflow-hidden rounded-[26px] border border-dh-street-gray/40">
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
