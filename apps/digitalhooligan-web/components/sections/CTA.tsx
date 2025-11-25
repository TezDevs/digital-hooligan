"use client";

import Container from "../layout/Container";

export default function CTA() {
  return (
    <section className="bg-gradient-to-b from-[#050507] via-dh-black to-[#0a0a0a] py-16">
      <Container>
        <div className="flex flex-col items-center text-center">
          {/* Spray streak */}
          <div className="mb-6 h-[2px] w-28 rounded-full bg-gradient-to-r from-dh-rebel-red via-dh-spray-pink to-dh-electric-mint" />

          <h2 className="text-3xl font-semibold">
            Join the crew. Build faster. Break rules cleanly.
          </h2>

          <p className="mt-3 max-w-xl text-sm text-neutral-300">
            Get updates on new tools, drops, and experiments from Hooligan Labs.
            No spam. No fluff. Just signal.
          </p>

          {/* Email box placeholder */}
          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              disabled
              placeholder="Email feature coming soon..."
              className="w-full rounded-lg border border-dh-street-gray/70 bg-[#111] px-4 py-2 text-sm text-neutral-200 placeholder:text-neutral-500"
            />

            <button className="rounded-lg border border-dh-electric-mint/60 bg-dh-electric-mint/15 px-6 py-2 text-sm font-semibold uppercase tracking-wide shadow-[0_0_18px_rgba(30,255,203,0.5)] transition hover:bg-dh-electric-mint/30">
              Notify Me
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
