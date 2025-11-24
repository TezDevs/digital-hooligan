"use client";

import Container from "../layout/Container";

export default function Hero() {
  return (
    <section className="border-b border-dh-street-gray/70 bg-gradient-to-b from-dh-black via-[#050508] to-black pb-16 pt-12">
      <Container>
        <p className="text-xs font-mono uppercase tracking-[0.35em] text-dh-graffiti-yellow">
          Digital Hooligan · Smart Chaos · Street-Tech
        </p>

        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          Break the rules.{" "}
          <span className="dh-graffiti-underline">Ship dangerous ideas.</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm text-neutral-300 sm:text-base">
          A rogue dev studio building neon-fast tools for traders, sneakerheads,
          and digital misfits. No suits. Just sharp code and clean execution.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-full border border-dh-electric-mint/70 bg-dh-electric-mint/15 px-5 py-2 text-sm font-medium uppercase tracking-wide shadow-[0_0_18px_rgba(30,255,203,0.7)] hover:bg-dh-electric-mint/30">
            Explore the Apps
          </button>
          <button className="rounded-full border border-dh-street-gray/80 bg-dh-black px-5 py-2 text-sm font-medium uppercase tracking-wide hover:border-dh-graffiti-yellow/80">
            Peek inside Hooligan Labs
          </button>
        </div>
      </Container>
    </section>
  );
}

