"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Container from "../layout/Container";

type AppDefinition = {
  slug: string;
  name: string;
  label: string;
  status: string;
  imageSrc: string;
  tagline: string;
  description: string;
  href: string;
};

const APPS: AppDefinition[] = [
  {
    slug: "pennywize",
    name: "PennyWize",
    label: "Flagship",
    status: "Active",
    imageSrc: "/apps/pennywize.png",
    tagline: "Hunt penny stocks like a maniac, not a fool.",
    description:
      "Real-time penny stock scrapes, smart alerts, and a hooligan-approved dashboard so you never miss cheap chaos turning into real money.",
    href: "/pennywize",
  },
  {
    slug: "dropsignal",
    name: "DropSignal",
    label: "Signal bot",
    status: "Prototype",
    imageSrc: "/apps/dropsignal.png",
    tagline: "Spray-paint alerts all over your watchlist.",
    description:
      "Price-drop and restock radar for hype releases. Built for people who live in release calendars and push notifications.",
    href: "/dropsignal",
  },
  {
    slug: "hypewatch",
    name: "HypeWatch",
    label: "Collectors",
    status: "Designing",
    imageSrc: "/apps/hypewatch.png",
    tagline: "Track hype before it becomes history.",
    description:
      "A collector-focused view of markets: cards, kicks, and whatever else is volatile enough to be fun.",
    href: "/hypewatch",
  },
  {
    slug: "labs",
    name: "Hooligan Labs",
    label: "Experiment",
    status: "In the lab",
    imageSrc: "/apps/hooligan-labs.png",
    tagline: "Where the dangerous ideas get built first.",
    description:
      "Small experiments, scrapers, and bots that graduate into full apps once they prove they can survive outside the lab.",
    href: "/ops-toys",
  },
];

const tagChip =
  "inline-flex items-center gap-2 rounded-full border border-dh-steel-blue/40 bg-dh-panel/40 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-steel-blue";

const secondaryLink =
  "inline-flex items-center justify-center rounded-full border border-dh-steel-blue/60 bg-dh-steel-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-dh-steel-blue transition hover:bg-dh-steel-blue/15";

export default function AppsShowcase() {
  const [activeSlug, setActiveSlug] = useState<string>(APPS[0]?.slug ?? "pennywize");

  const activeApp = useMemo(
    () => APPS.find((app) => app.slug === activeSlug) ?? APPS[0],
    [activeSlug],
  );

  return (
    <section id="apps" className="scroll-mt-24 border-y border-dh-border bg-dh-carbon">
      <Container>
        <div className="py-12 md:py-16">
          {/* Tag */}
          <div className={tagChip}>
            <span className="h-1.5 w-1.5 rounded-full bg-dh-steel-blue" />
            <span>App Studio</span>
          </div>

          {/* Heading + subtitle */}
          <div className="mt-4 max-w-2xl space-y-2">
            <h2 className="text-2xl font-semibold leading-snug text-dh-text md:text-3xl">
              A small gang of{" "}
              <span className="text-dh-steel-blue">dangerous little apps.</span>
            </h2>
            <p className="text-sm text-dh-muted md:text-base">
              Click an icon to see what kind of chaos it&apos;s built for.
            </p>
          </div>

          {/* Main layout: flagship card + side list */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)] lg:items-stretch">
            {/* Left: active app card */}
            <article className="group relative overflow-hidden rounded-2xl border border-dh-border bg-dh-panel p-5 shadow-[0_0_26px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-dh-steel-blue/60 hover:shadow-[0_0_40px_rgba(77,163,255,0.16)]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-dh-steel-blue/10 via-transparent to-dh-steel-blue/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
                {/* Icon */}
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-3xl border border-dh-border bg-dh-carbon transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1 group-hover:rotate-1">
                  <Image
                    src={activeApp.imageSrc}
                    alt={`${activeApp.name} icon`}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Text */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-dh-border bg-dh-carbon/40 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-dh-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-dh-steel-blue" />
                    <span>{activeApp.label}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-dh-text md:text-2xl">
                      {activeApp.name}
                    </h3>
                    <p className="text-sm font-medium text-dh-steel-blue md:text-base">
                      {activeApp.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-dh-muted md:text-[15px]">
                    {activeApp.description}
                  </p>

                  <div className="pt-1">
                    <Link href={activeApp.href} className={secondaryLink}>
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Right: app list */}
            <div className="flex flex-col gap-3">
              {APPS.map((app) => {
                const isActive = app.slug === activeSlug;

                return (
                  <button
                    key={app.slug}
                    type="button"
                    onClick={() => setActiveSlug(app.slug)}
                    className={clsx(
                      "group flex items-center justify-between gap-3 rounded-2xl border bg-dh-panel/60 px-4 py-3 text-left transition-all duration-200",
                      isActive
                        ? "border-dh-steel-blue/70 shadow-[0_0_32px_rgba(77,163,255,0.18)]"
                        : "border-dh-border hover:border-dh-steel-blue/50 hover:bg-dh-panel",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-dh-border bg-dh-carbon transition-transform duration-200 group-hover:scale-110">
                        <Image
                          src={app.imageSrc}
                          alt={`${app.name} icon`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-dh-text md:text-sm">
                          {app.name}
                        </p>
                        <p className="text-[11px] text-dh-muted">
                          {app.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.26em] text-dh-muted">
                        {isActive ? "Active" : app.status}
                      </span>
                      <span className="h-0.5 w-6 rounded-full bg-dh-border transition-all duration-200 group-hover:w-8 group-hover:bg-dh-steel-blue/70" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
