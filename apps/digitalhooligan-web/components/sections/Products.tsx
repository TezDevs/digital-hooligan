"use client";

import Container from "../layout/Container";

type Product = {
  name: string;
  tag: string;
  description: string;
  badgeClass: string;
};

const products: Product[] = [
  {
    name: "PennyWize",
    tag: "Stocks · Alerts",
    description:
      "Penny stock intel for degens with discipline. Fast, focused alerts without bloated dashboards.",
    badgeClass:
      "border-dh-spray-pink text-dh-spray-pink",
  },
  {
    name: "SneakerScout",
    tag: "Sneakers · Deals",
    description:
      "Price-drop radar for sneaker fiends. Tracks under-retail heat, restocks, and quiet steals.",
    badgeClass:
      "border-dh-graffiti-yellow text-dh-graffiti-yellow",
  },
  {
    name: "Hooligan Labs",
    tag: "R&D · Experiments",
    description:
      "A skunkworks for bots, scrapers, dashboards, and prototypes that shouldn’t exist — but do.",
    badgeClass:
      "border-dh-circuit-blue text-dh-circuit-blue",
  },
];

export default function Products() {
  return (
    <section
      id="apps"
      className="border-b border-dh-street-gray/70 bg-gradient-to-b from-dh-black to-[#050508] py-12"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-dh-graffiti-yellow">
              The Hooligan stack
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Tools for people who play offense.
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-400">
            Apps · Dashboards · Scrapers · Labs
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.name}
              className="group relative overflow-hidden rounded-2xl border border-dh-street-gray/70 bg-gradient-to-b from-[#111111] to-[#050507] p-5 shadow-[0_0_18px_rgba(0,0,0,0.6)] transition-transform duration-200 hover:-translate-y-1 hover:border-dh-electric-mint/70 hover:shadow-[0_0_24px_rgba(30,255,203,0.5)]"
            >
              <div
                className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${p.badgeClass}`}
              >
                {p.tag}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-xs text-neutral-300">{p.description}</p>

              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-dh-electric-mint/15 via-dh-spray-pink/10 to-transparent opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
