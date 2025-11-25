"use client";

import Container from "../layout/Container";

export default function Hero() {
  return (
    <section className="border-b border-dh-street-gray/70 bg-gradient-to-b from-dh-black via-[#050508] to-black">
      <Container className="pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-dh-graffiti-yellow">
            Digital Hooligan · Smart Chaos · Street-Tech
          </p>

          {/* Headline */}
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Break the rules.
            <br />
            <span className="dh-graffiti-underline">Ship dangerous ideas.</span>
          </h1>

          {/* Subcopy */}
          <p className="mt-4 max-w-xl text-sm text-neutral-300 sm:text-base">
            A rogue dev studio building neon-fast tools for traders, sneakerheads,
            and digital misfits. No suits. Just sharp code, clean execution, and
            a little bit of chaos.
          </p>

          {/* CTA Row */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className="rounded-full border border-dh-electric-mint/70 bg-dh-electric-mint/15 
                         px-6 py-3 text-dh-electric-mint text-sm font-mono uppercase tracking-[0.18em]
                         transition-transform transition-colors duration-150
                         hover:bg-dh-electric-mint/25 hover:scale-[1.03]
                         active:scale-[0.97]"
            >
              Explore Projects →
            </button>

            <button
              className="rounded-full border border-dh-street-gray/80 bg-dh-black 
                         px-6 py-3 text-sm font-mono uppercase tracking-[0.18em]
                         text-neutral-200 transition-transform transition-colors duration-150
                         hover:border-dh-graffiti-yellow/80 hover:text-dh-graffiti-yellow
                         active:scale-[0.97]"
            >
              Enter Hooligan Labs
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
