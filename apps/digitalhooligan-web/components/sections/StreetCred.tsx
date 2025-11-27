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
        <div className="grid gap-10 py-10 md:grid-cols-[minmax(0,2.1fr)_minmax(0,1.6fr)] md:items-center">
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

          {/* Right: BIG hero visual + skill chips */}
          <div className="space-y-6">
            <div className="relative mx-auto md:ml-auto flex h-60 w-60 sm:h-72 sm:w-72 lg:h-80 lg:w-80 items-center justify-center rounded-[2.4rem] bg-gradient-to-b from-zinc-900 to-black border border-dh-street-gray/70 shadow-[0_0_55px_rgba(30,255,203,0.5)]">
              <Image
                src="/products/dh-hero-graffiti-bear.png"
                alt="Digital Hooligan graffiti bear"
                width={260}
                height={260}
                className="h-52 w-52 sm:h-60 sm:w-60 object-contain drop-shadow-[0_0_40px_rgba(30,255,203,0.8)]"
              />
              {/* soft outer glow ring */}
              <div className="pointer-events-none absolute inset-[-18%] rounded-[3rem] bg-[radial-gradient(circle_at_top,_rgba(30,255,203,0.4),transparent_65%)] opacity-70" />
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
