"use client";

import Image from "next/image";
import Container from "../layout/Container";

const skills = [
  "TypeScript",
  "React / Next.js",
  "Tailwind",
  "Full-stack Engineering",
  "ICAM / Security",
  "Real-time Systems",
  "Fintech & Alerts",
  "Automation / Bots",
];

export default function StreetCred() {
  return (
    <section className="border-b border-dh-street-gray/70 bg-dh-black">
      <Container>
        <div className="grid gap-10 py-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.6fr)] md:items-center">
          {/* Left: hero copy */}
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-dh-graffiti-yellow">
              BUILDER
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-white">
              Designed by a builder who actually deploys.
            </h1>
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              Digital Hooligan is led by{" "}
              <span className="font-semibold text-neutral-50">
                Courtez Cannady
              </span>
              — engineer, product thinker, and operator with 14+ years across
              ICAM, C4ISR, fintech, and U.S. Marine Corps mission systems.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              The mission isn&apos;t noise — it&apos;s execution. Sharp tools,
              clean UI, and decisive engineering designed for speed and utility.
            </p>

            {/* little brand badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/70 bg-black/70 px-3 py-1">
                <Image
                  src="/products/brand-systems.png"
                  alt="Systems brand graphic"
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full object-contain"
                />
                <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                  Systems thinking
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/70 bg-black/70 px-3 py-1">
                <Image
                  src="/products/future-apps.png"
                  alt="Future apps graphic"
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full object-contain"
                />
                <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                  Apps in the lab
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/70 bg-black/70 px-3 py-1">
                <Image
                  src="/products/hooligan-labs.png"
                  alt="Hooligan Labs graphic"
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full object-contain"
                />
                <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                  Hooligan Labs
                </span>
              </div>
            </div>
          </div>

          {/* Right: hero visual + skill chips */}
          <div className="space-y-6">
            <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-[2rem] bg-gradient-to-b from-zinc-900 to-black border border-dh-street-gray/70 shadow-[0_0_40px_rgba(30,255,203,0.4)]">
              <Image
                src="/products/dh-hero-graffiti-bear.png"
                alt="Digital Hooligan graffiti bear"
                width={192}
                height={192}
                className="h-40 w-40 object-contain drop-shadow-[0_0_30px_rgba(30,255,203,0.7)]"
              />
            </div>

            {/* skill chips */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-xl border border-dh-street-gray/70 bg-black/70 px-3 py-2 text-xs text-neutral-200"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
