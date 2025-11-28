"use client";

import Container from "../layout/Container";

const PILLARS = [
  "ICAM / Zero Trust",
  "C4ISR Mission Systems",
  "Fintech & Trading",
  "Real-time Monitoring",
];

const BADGES = [
  {
    label: "14+ years shipping systems",
    detail: "Defense, government, fintech, and ops.",
  },
  {
    label: "Operator-first mindset",
    detail: "Built from the perspective of people on the hook.",
  },
  {
    label: "Secure by default",
    detail: "Identity, access, and telemetry baked in.",
  },
];

export default function StreetCred() {
  return (
    <section className="bg-dh-black border-t border-dh-street-gray/40">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start md:py-20">
          {/* LEFT: copy */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-dh-graffiti-yellow/80">
              <span className="h-1 w-1 rounded-full bg-dh-electric-mint shadow-[0_0_10px_rgba(30,255,203,0.9)]" />
              <span>Street Cred</span>
            </div>

            <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
              Battle-tested in missions that can&apos;t fail.
            </h2>

            <p className="text-sm leading-relaxed text-dh-street-gray sm:text-[15px]">
              Before Digital Hooligan, the work was shipping identity, security,
              and real-time mission systems for government, defense, and
              fintech. The same discipline shows up in every tool here—just
              wrapped in neon instead of khaki.
            </p>

            {/* Pillars */}
            <div className="mt-4 flex flex-wrap gap-2">
              {PILLARS.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-dh-street-gray/60 bg-dh-deep-void/70 px-3 py-1.5 text-[11px] text-dh-soft-white/80 backdrop-blur-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint/80 shadow-[0_0_10px_rgba(30,255,203,0.9)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: badges */}
          <div className="space-y-3 rounded-2xl border border-dh-street-gray/50 bg-gradient-to-b from-dh-deep-void/90 to-black/90 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.75)]">
            <div className="text-xs font-medium uppercase tracking-[0.22em] text-dh-soft-white/70">
              Receipts, not vibes
            </div>

            <div className="space-y-3">
              {BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-xl border border-dh-street-gray/50 bg-black/50 px-4 py-3 text-sm"
                >
                  <div className="text-dh-electric-mint/90">
                    {badge.label}
                  </div>
                  <div className="mt-1 text-[12px] leading-relaxed text-dh-street-gray/80">
                    {badge.detail}
                  </div>
                </div>
              ))}
            </div>

            <p className="pt-1 text-[11px] text-dh-street-gray/70">
              Translation: these apps aren&apos;t just pretty dashboards. They&apos;re
              built by someone who&apos;s had pagers, radios, and P&amp;L on the line.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
