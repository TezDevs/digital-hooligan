"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "./Product";

type AppMeta = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconSrc: string;
  iconAlt: string;
  accent: "mint" | "purple" | "amber";
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  statusLabel: string;
  statusTone: "success" | "warning" | "info";
};

const APPS: AppMeta[] = [
  {
    slug: "dropsignal",
    name: "DropSignal",
    shortName: "DropSignal",
    tagline: "Never miss a hype move.",
    description:
      "DropSignal monitors hype drops, restocks, and signal feeds so you can move before everyone else. Configure watchlists, alert channels, and custom rules that fit your style.",
    iconSrc: "/products/dropsignal.png",
    iconAlt: "DropSignal app icon",
    accent: "mint",
    primaryActionLabel: "Launch DropSignal",
    secondaryActionLabel: "View roadmap",
    statusLabel: "Concept build · Monorepo app",
    statusTone: "info",
  },
  {
    slug: "pennywize",
    name: "PennyWize",
    shortName: "PennyWize",
    tagline: "Penny stock signal engine.",
    description:
      "PennyWize surfaces unusual volume, price spikes, and news on micro-cap tickers. Build alert pipelines and dashboards that keep your feed clean and actionable.",
    iconSrc: "/products/pennywize-badge.png",
    iconAlt: "PennyWize bear app icon",
    accent: "purple",
    primaryActionLabel: "View concept",
    secondaryActionLabel: "Join interest list",
    statusLabel: "Early concept · Labs app",
    statusTone: "warning",
  },
  {
    slug: "hypewatch",
    name: "HypeWatch",
    shortName: "HypeWatch",
    tagline: "Collectible and hype asset radar.",
    description:
      "HypeWatch tracks social buzz, price action, and sentiment around the brands and tickers you care about. One feed for the alley: charts, mentions, and alerts.",
    iconSrc: "/products/hypewatch.png",
    iconAlt: "HypeWatch app icon",
    accent: "amber",
    primaryActionLabel: "View concept",
    secondaryActionLabel: "Join interest list",
    statusLabel: "In discovery · Labs app",
    statusTone: "success",
  },
];


export default function AppGrid() {
  const [selectedSlug, setSelectedSlug] = useState<AppMeta["slug"]>("dropsignal");
  const selectedApp =
    APPS.find((app) => app.slug === selectedSlug) ?? APPS[0];

  const statusToneClass =
    selectedApp.statusTone === "success"
      ? "text-emerald-400"
      : selectedApp.statusTone === "warning"
        ? "text-amber-300"
        : "text-dh-electric-mint";

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Featured / selected app card */}
      <div className="relative overflow-hidden rounded-3xl border border-dh-street-gray/70 bg-black/80 px-6 py-6 sm:px-8 sm:py-7 shadow-[0_0_0_rgba(0,0,0,0)] transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(30,255,203,0.45)]">
        {/* subtle background glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top_left,_rgba(30,255,203,0.12),transparent_60%),_radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),transparent_60%)] opacity-80" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Icon */}
          <div className="flex items-center justify-center md:justify-start">
            <div className="relative h-40 w-40 sm:h-48 sm:w-48 rounded-[2rem] bg-gradient-to-b from-black to-zinc-950 border border-dh-street-gray/60 shadow-[0_0_30px_rgba(0,0,0,0.7)]">
              <div className="absolute inset-[10%] rounded-[1.75rem] bg-zinc-950" />
              <div className="relative flex h-full w-full items-center justify-center">
                <Image
                  src={selectedApp.iconSrc}
                  alt={selectedApp.iconAlt}
                  width={192}
                  height={192}
                  className="h-32 w-32 object-contain drop-shadow-[0_0_24px_rgba(30,255,203,0.55)]"
                />
              </div>
            </div>
          </div>

          {/* Text + actions */}
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 mb-1">
                Selected App
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-1">
                {selectedApp.name}
              </h3>
              <p className="text-sm sm:text-base text-dh-electric-mint mb-1">
                {selectedApp.tagline}
              </p>
              <p className="text-sm text-neutral-300 leading-relaxed max-w-xl">
                {selectedApp.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-full bg-dh-electric-mint px-4 py-1.5 text-xs font-semibold text-black uppercase tracking-[0.18em] shadow-[0_0_24px_rgba(30,255,203,0.7)] hover:bg-emerald-300"
              >
                {selectedApp.primaryActionLabel}
              </button>
              {selectedApp.secondaryActionLabel && (
                <button
                  type="button"
                  className="rounded-full border border-dh-street-gray/80 bg-black/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-200 hover:border-dh-electric-mint/60"
                >
                  {selectedApp.secondaryActionLabel}
                </button>
              )}

              <div className="ml-auto flex items-center gap-2 text-[11px] text-neutral-400">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                <span className={statusToneClass}>{selectedApp.statusLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row of other apps */}
      <div className="grid gap-4 md:grid-cols-3">
        {APPS.map((app) => (
          <Product
            key={app.slug}
            name={app.name}
            label="Hooligan App"
            description={app.description}
            iconSrc={app.iconSrc}
            iconAlt={app.iconAlt}
            accent={app.accent}
            isSelected={app.slug === selectedSlug}
            onClick={() => setSelectedSlug(app.slug)}
          />
        ))}
      </div>
    </div>
  );
}
