"use client";

import { useState } from "react";
import Image from "next/image";
import { AppIcon } from "../ui/AppIcon";

type App = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconUrl: string | null;
};

const apps: App[] = [
  {
    id: "dropsignal",
    name: "DropSignal",
    tagline: "Never miss a hype move.",
    description:
      "DropSignal monitors hype drops, restocks, and signal feeds so you can move before everyone else. Configure watchlists, alert channels, and custom rules that fit your style.",
    iconUrl: "/products/dropsignal.png",
  },
  {
    id: "pennywize",
    name: "PennyWize",
    tagline: "Micro-cap intel with teeth.",
    description:
      "PennyWize surfaces unusual volume, price spikes, and news on micro-cap tickers. Build alert pipelines and dashboards that keep your feed clean and actionable.",
    iconUrl: "/products/pennywize-badge.png",
  },
  {
    id: "hypewatch",
    name: "HypeWatch",
    tagline: "Watch the hype cycle in real-time.",
    description:
      "HypeWatch tracks social buzz, price action, and sentiment around the brands and tickers you care about. One feed for the alley: charts, mentions, and alerts.",
    iconUrl: "/products/hypewatch.png",
  },
];

export function AppGrid() {
  const [selectedId, setSelectedId] = useState<string>(apps[0].id);
  const selectedApp = apps.find((app) => app.id === selectedId) ?? apps[0];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-white">Hooligan Apps</h2>
        <p className="text-xs text-white/45">
          Tap an app to spotlight it, then dive into its control room.
        </p>
      </div>

      {/* Spotlight panel */}
      <div className="mb-8 overflow-hidden rounded-3xl border border-white/8 bg-[#050509] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.9)]">
        <div className="relative flex flex-col gap-5 md:flex-row">
          {/* glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-100 blur-3xl">
            <div className="absolute -inset-10 bg-gradient-to-tr from-[#1EFFCB11] via-[#FF4DB211] to-[#00C8FF11]" />
          </div>

          {/* Large image */}
          <div className="flex shrink-0 items-center justify-center md:w-1/3">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40 p-3">
              {selectedApp.iconUrl && (
                <Image
                  src={selectedApp.iconUrl}
                  alt={selectedApp.name}
                  width={260}
                  height={260}
                  className="h-52 w-52 rounded-3xl object-cover"
                />
              )}
            </div>
          </div>

          {/* Text side */}
          <div className="flex flex-1 flex-col justify-between gap-4 md:w-2/3">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#1EFFCB]">
                Selected app
              </p>
              <h3 className="text-lg font-semibold text-white">
                {selectedApp.name}
              </h3>
              <p className="text-sm text-[#1EFFCB]">{selectedApp.tagline}</p>
              <p className="text-xs leading-relaxed text-white/75">
                {selectedApp.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <button className="rounded-full bg-[#1EFFCB] px-4 py-2 font-medium text-black shadow-lg shadow-[#1EFFCB55] hover:bg-[#14cba0]">
                Launch {selectedApp.name}
              </button>
              <button className="rounded-full border border-white/15 px-4 py-2 font-medium text-white/80 hover:border-[#FF4DB2] hover:text-white">
                View roadmap
              </button>

              <span className="ml-auto hidden items-center gap-2 text-white/45 md:inline-flex">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#1EFFCB]" />
                Concept build · Monorepo app
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3-up app grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {apps.map((app) => {
          const isActive = app.id === selectedId;

          return (
            <button
              key={app.id}
              type="button"
              onClick={() => setSelectedId(app.id)}
              className={`group relative flex flex-col items-stretch overflow-hidden rounded-3xl border bg-[#050509] p-4 text-left shadow-[0_18px_45px_rgba(0,0,0,0.75)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EFFCB]/70 ${
                isActive
                  ? "border-[#1EFFCB] shadow-[0_22px_60px_rgba(0,0,0,0.9)]"
                  : "border-white/5 hover:-translate-y-1 hover:border-[#1EFFCB] hover:shadow-[0_26px_70px_rgba(0,0,0,0.9)]"
              }`}
            >
              {/* Glow on hover / active */}
              <div
                className={`pointer-events-none absolute inset-0 blur-2xl transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <div className="absolute -inset-10 bg-gradient-to-tr from-[#1EFFCB22] via-[#FF4DB222] to-[#00C8FF22]" />
              </div>

              <div className="relative flex flex-1 flex-col gap-3">
                <div className="flex items-center gap-3">
                  {/* Animated icon */}
                  <div
                    className={`shrink-0 transform transition-transform duration-300 ${
                      isActive
                        ? "-translate-y-1 scale-110 -rotate-3"
                        : "group-hover:-translate-y-1 group-hover:scale-110 group-hover:-rotate-3"
                    }`}
                  >
                    <AppIcon src={app.iconUrl} alt={app.name} size={60} />
                  </div>

                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#1EFFCB]">
                      Hooligan App
                    </p>
                    <h3 className="text-sm font-semibold text-white">
                      {app.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-white/70">
                  {app.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-1 text-[11px] text-white/45">
                  <span className="inline-flex items-center gap-1">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full transition-colors ${
                        isActive ? "bg-[#FF4DB2]" : "bg-[#1EFFCB]"
                      }`}
                    />
                    {isActive ? "Spotlighted" : "Tap to spotlight"}
                  </span>
                  <span
                    className={`transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    View details →
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
