"use client";

import Image from "next/image";
import Container from "../Container";

export default function Hero() {
  return (
    <section
      id="hero"
      className="border-b border-dh-street-gray/60 bg-dh-black"
    >
      <Container>
        <div className="grid gap-6 py-6 sm:gap-7 sm:py-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center md:gap-10 md:py-12 lg:py-14">
          {/* Text side */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/80 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-dh-electric-mint/80 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint shadow-[0_0_12px_rgba(30,255,203,0.9)]" />
              Digital Hooligan • App Studio
            </p>

            <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.1rem]">
              Break the rules.
              <span className="block text-dh-electric-mint">
                Ship dangerous ideas.
              </span>
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-dh-street-gray/80 sm:text-[0.95rem] sm:leading-relaxed">
              Digital Hooligan is a one-person app studio for misfit builders
              and collectors. Sneaker drops, collectibles, and money-saving
              tools — built fast, loud, and a little bit reckless.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1 sm:gap-3 sm:pt-2">
              <a
                href="#apps"
                className="inline-flex items-center justify-center rounded-xl border border-dh-electric-mint/80 bg-dh-electric-mint px-4 py-2 text-sm font-semibold text-dh-black shadow-[0_0_22px_rgba(30,255,203,0.7)] transition hover:translate-y-[1px] hover:bg-dh-electric-mint/95 sm:px-5 sm:py-2.5"
              >
                Explore the apps
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-dh-street-gray/60 bg-dh-black px-3.5 py-1.5 text-xs font-medium text-dh-street-gray/90 transition hover:border-dh-electric-mint/60 hover:text-white sm:px-4 sm:py-2 sm:text-sm"
              >
                Talk to the hooligan
              </a>
            </div>
          </div>

          {/* Image side */}
          <div className="relative h-52 sm:h-60 md:h-72 lg:h-80">
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-dh-electric-mint/30 bg-gradient-to-br from-dh-black via-dh-black to-dh-electric-mint/10 shadow-[0_0_40px_rgba(30,255,203,0.55)]" />
            <div className="relative h-full w-full p-2.5 sm:p-3.5 md:p-4">
              <Image
                src="/hero/digital-hooligan-hero.png"
                alt="Digital Hooligan hero artwork"
                fill
                className="rounded-2xl object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
