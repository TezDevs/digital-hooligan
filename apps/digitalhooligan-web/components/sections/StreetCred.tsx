"use client";

import Container from "../layout/Container";

export default function StreetCred() {
  return (
    <section
      id="crew"
      className="border-b border-dh-street-gray/70 bg-dh-black py-16"
    >
      <Container>
        <div className="mb-10 h-[2px] w-20 rounded-full bg-gradient-to-r from-dh-electric-mint via-dh-circuit-blue to-dh-rebel-red" />

        <div className="grid gap-10 md:grid-cols-2">
          {/* LEFT: Operator Intro */}
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-dh-graffiti-yellow">
              Operator Profile
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight">
              Designed by a builder who actually deploys.
            </h2>

            <p className="mt-4 text-sm text-neutral-300">
              Digital Hooligan is led by{" "}
              <span className="dh-graffiti-underline font-medium">
                Courtez Cannady
              </span>
              — engineer, product thinker, and operator with 14+ years
              across ICAM, C4ISR, fintech, and U.S. Marine Corps mission systems.
            </p>

            <p className="mt-4 text-sm text-neutral-300">
              The mission isn’t noise — it’s execution. Sharp tools, clean UI,
              and decisive engineering designed for speed and utility.
            </p>
          </div>

          {/* RIGHT: Skill Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              "TypeScript",
              "React / Next.js",
              "Tailwind",
              "Full-stack Engineering",
              "ICAM / Security",
              "Real-time Systems",
              "Fintech & Alerts",
              "Automation / Bots",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-dh-street-gray/70 bg-[#0c0c0c] p-4 text-neutral-200 shadow-[0_0_10px_rgba(0,0,0,0.4)] transition hover:border-dh-electric-mint/60 hover:shadow-[0_0_18px_rgba(30,255,203,0.4)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
