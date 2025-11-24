"use client";

import Container from "../layout/Container";

export default function BrandStory() {
  return (
    <section
      id="what"
      className="border-b border-dh-street-gray/70 bg-dh-black py-12"
    >
      <Container>
        <div className="mb-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-dh-rebel-red via-dh-spray-pink to-dh-electric-mint" />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Built for misfits who still ship clean code.
            </h2>
            <p className="mt-3 text-sm text-neutral-300">
              Digital Hooligan is a rogue dev studio that mixes street energy
              with operator discipline. We build sharp, focused tools for
              people who actually use them—traders, sneakerheads, and
              builders who live online.
            </p>
          </div>

          <div className="space-y-3 text-sm text-neutral-300">
            <p>We&apos;re not another faceless SaaS brand:</p>
            <ul className="space-y-2">
              <li>• No bloated dashboards. Only signal.</li>
              <li>• No corporate speak. Just straight talk + results.</li>
              <li>• No bland UI. Neon, graffiti, and grit by design.</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
