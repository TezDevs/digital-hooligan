"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../layout/Container";

type AppConfig = {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  image: string;
  href: string;
  cta: string;
};

const APPS: AppConfig[] = [
  {
    id: "pennywize",
    name: "PennyWize",
    tag: "Finance • Micro-markets",
    blurb:
      "Real-time penny stock alerts, micro-market intelligence, and pattern detection so you never miss the weird moves.",
    image: "/images/hero/dh-hero-bear.png", // TODO: swap to real PennyWize art
    href: "/pennywize",
    cta: "View details →",
  },
  {
    id: "dropsignal",
    name: "DropSignal",
    tag: "Signals • Price drops",
    blurb:
      "Price-drop and restock radar that surfaces changes quickly—designed for people who live in release calendars and alerts. Timing depends on the source signals available.",
    image: "/images/hero/dh-hero-bear.png", // TODO: swap to real DropSignal art
    href: "/dropsignal",
    cta: "View details →",
  },
  {
    id: "opstoys",
    name: "Ops Toys",
    tag: "Ops • Automation drawer",
    blurb:
      "Tiny utilities for infra, logging, and dev workflow—built as a tool drawer, not another monolithic platform.",
    image: "/images/hero/dh-hero-bear.png", // TODO: swap to real Ops Toys art
    href: "/ops-toys",
    cta: "View details →",
  },
];

const chipBase =
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.25em]";
const secondaryPill =
  "inline-flex w-fit items-center gap-2 rounded-full border border-dh-steel-blue/60 bg-dh-steel-blue/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-dh-steel-blue transition hover:bg-dh-steel-blue/15";
const dot = "h-1.5 w-1.5 rounded-full bg-dh-steel-blue";

export default function Products() {
  const [activeId, setActiveId] = useState<string>(APPS[0].id);

  const active = useMemo(
    () => APPS.find((app) => app.id === activeId) ?? APPS[0],
    [activeId],
  );

  return (
    <section className="border-t border-dh-border bg-dh-carbon">
      <Container>
        <div className="py-16 lg:py-20">
          {/* label */}
          <div
            className={[
              chipBase,
              "border-dh-border bg-dh-panel/50 text-dh-muted",
            ].join(" ")}
          >
            <span className={dot} />
            <span>The Hooligan Stack</span>
          </div>

          {/* top detail panel */}
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-stretch">
            <div className="flex flex-col justify-between space-y-4 rounded-3xl border border-dh-border bg-dh-panel p-6 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
              <div className="space-y-3">
                <div className="text-[11px] uppercase tracking-[0.25em] text-dh-muted/80">
                  {active.tag}
                </div>
                <h2 className="text-2xl font-semibold text-dh-text sm:text-3xl">
                  {active.name}
                </h2>
                <p className="text-sm leading-relaxed text-dh-muted sm:text-[15px]">
                  {active.blurb}
                </p>
              </div>

              <Link href={active.href} className={secondaryPill}>
                <span className={dot} />
                {active.cta}
              </Link>
            </div>

            <div className="overflow-hidden rounded-3xl border border-dh-border bg-dh-panel shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
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
                      ? "border-dh-steel-blue/70 bg-dh-panel shadow-[0_0_40px_rgba(77,163,255,0.18)]"
                      : "border-dh-border bg-dh-carbon/40 hover:border-dh-steel-blue/50 hover:bg-dh-panel/60",
                  ].join(" ")}
                >
                  <div className="mb-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-dh-muted/80">
                    <span className="h-1 w-1 rounded-full bg-dh-steel-blue/80" />
                    <span>{app.tag}</span>
                  </div>
                  <div className="text-sm font-medium text-dh-text">
                    {app.name}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-dh-muted/80">
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
