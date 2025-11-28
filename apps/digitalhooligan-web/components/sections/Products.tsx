"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "../layout/Container";

type AppConfig = {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  image: string;
  pill: string;
};

const APPS: AppConfig[] = [
  {
    id: "pennywize",
    name: "PennyWize",
    tag: "Finance • Micro-markets",
    blurb:
      "Real-time penny stock alerts, micro-market intelligence, and pattern detection so you never miss the weird moves.",
    image: "/images/hero/dh-hero-bear.png", // TODO: swap to real PennyWize art
    pill: "View project →",
  },
  {
    id: "sneakerscout",
    name: "SneakerScout",
    tag: "Sneakers • Price drops",
    blurb:
      "Smart sneaker price-drop radar and automated scraper that surfaces under-retail steals before the herd.",
    image: "/images/hero/dh-hero-bear.png", // TODO: swap to real SneakerScout art
    pill: "View project →",
  },
  {
    id: "hooliganlabs",
    name: "Hooligan Labs",
    tag: "R&D • Prototyping",
    blurb:
      "A skunkworks for bots, dashboards, scrapers, and neon-fast experiments that may or may not behave.",
    image: "/images/hero/dh-hero-bear.png", // TODO: swap to real Labs art
    pill: "View experiments →",
  },
];


export default function Products() {
  const [activeId, setActiveId] = useState<string>(APPS[0].id);
  const active = APPS.find((app) => app.id === activeId) ?? APPS[0];

  return (
    <section className="bg-dh-black border-t border-dh-street-gray/40">
      <Container>
        <div className="py-16 lg:py-20">
          {/* label */}
          <div className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-dh-graffiti-yellow/80">
            <span className="h-1 w-1 rounded-full bg-dh-electric-mint shadow-[0_0_10px_rgba(30,255,203,0.9)]" />
            <span>The Hooligan Stack</span>
          </div>

          {/* top detail panel */}
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-stretch">
            <div className="flex flex-col justify-between space-y-4 rounded-3xl border border-dh-street-gray/60 bg-gradient-to-b from-dh-deep-void/90 to-black/95 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.75)]">
              <div className="space-y-3">
                <div className="text-[11px] uppercase tracking-[0.25em] text-dh-soft-white/60">
                  {active.tag}
                </div>
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                  {active.name}
                </h2>
                <p className="text-sm leading-relaxed text-dh-street-gray sm:text-[15px]">
                  {active.blurb}
                </p>
              </div>

              <button className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-dh-soft-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint shadow-[0_0_10px_rgba(30,255,203,0.9)]" />
                {active.pill}
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-dh-street-gray/60 bg-dh-deep-void shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <Image
                src={active.image}
                alt={active.name}
                width={960}
                height={720}
                className="block h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* app icons grid */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {APPS.map((app) => {
              const isActive = app.id === activeId;
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => setActiveId(app.id)}
                  className={[
                    "group flex flex-col items-start rounded-2xl border px-4 py-3 text-left transition-all",
                    isActive
                      ? "border-dh-electric-mint/80 bg-dh-deep-void shadow-[0_0_40px_rgba(30,255,203,0.35)]"
                      : "border-dh-street-gray/60 bg-black/40 hover:border-dh-electric-mint/60 hover:bg-dh-deep-void/70",
                  ].join(" ")}
                >
                  <div className="mb-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-dh-soft-white/60">
                    <span className="h-1 w-1 rounded-full bg-dh-electric-mint/80 shadow-[0_0_10px_rgba(30,255,203,0.9)]" />
                    <span>{app.tag}</span>
                  </div>
                  <div className="text-sm font-medium text-white">{app.name}</div>
                  <p className="mt-1 text-[11px] leading-relaxed text-dh-street-gray/80 line-clamp-2">
                    {app.blurb}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
