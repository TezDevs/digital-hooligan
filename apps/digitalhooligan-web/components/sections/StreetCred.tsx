"use client";

import Link from "next/link";

const cards = [
  {
    title: "Built in the real world",
    body: "Years in defense, government, and enterprise projects. High-stakes systems, compliance, and shipping under constraint – not just toy apps.",
    tag: "Receipts, not promises",
  },
  {
    title: "Ops & incident scars",
    body: "On-call rotations, incident management, and keeping real-time systems alive. Logs, dashboards, and root cause hunts are part of the daily toolkit.",
    tag: "We’ve broken prod before",
  },
  {
    title: "Solo founder energy",
    body: "Design, build, ship, repeat. From infra to UI copy, everything is pushed forward by a single brain obsessed with the craft.",
    tag: "No big team to hide behind",
  },
  {
    title: "Let’s build something dangerous",
    body: "Digital Hooligan exists to ship weird, sharp-edged tools – bots, scrapers, and automations that would never pass a corporate committee.",
    tag: "Break the rules. Ship anyway.",
  },
];

export default function StreetCred() {
  return (
    <section
      id="street-cred"
      className="border-t border-dh-street-gray/40 bg-dh-black px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
            Street cred
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-dh-offwhite sm:text-3xl">
            Why trust a hooligan?
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-dh-street-gray">
            Digital Hooligan isn&apos;t a giant studio. It&apos;s a founder
            with real-world engineering scars, shipping tools that would make a
            risk-averse manager nervous.
          </p>
        </header>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className="group flex flex-col justify-between rounded-2xl border border-dh-street-gray/40 bg-gradient-to-br from-dh-black/85 to-dh-black/40 p-4 transition duration-200 ease-out hover:-translate-y-1 hover:border-dh-electric-mint/70 hover:shadow-[0_0_24px_rgba(30,255,203,0.28)] sm:p-5"
            >
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-dh-offwhite sm:text-base">
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed text-dh-street-gray sm:text-sm">
                  {card.body}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px]">
                <span className="inline-flex items-center gap-1 rounded-full border border-dh-electric-mint/50 bg-dh-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-dh-electric-mint group-hover:border-dh-electric-mint group-hover:bg-dh-electric-mint/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint group-hover:shadow-[0_0_8px_rgba(30,255,203,0.9)]" />
                  {card.tag}
                </span>
                {card.title === "Let’s build something dangerous" && (
                  <Link
                    href="#contact"
                    className="hidden text-[11px] font-medium text-dh-street-gray hover:text-dh-electric-mint/90 sm:inline-flex sm:items-center"
                  >
                    Let&apos;s talk →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
