import Container from "../layout/Container";

export default function About() {
  return (
    <section id="about" className="border-b border-dh-street-gray/40 bg-[#050608]">
      <Container>
        <div className="py-12 md:py-16">
          <div className="space-y-8">
            {/* About copy */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-dh-electric-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint" />
                <span>About</span>
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                About Digital Hooligan
              </h2>

              <p className="text-sm text-dh-street-gray/80 sm:text-base">
                Digital Hooligan LLC is a{" "}
                <span className="font-semibold text-dh-offwhite">
                  single-member software studio
                </span>{" "}
                focused on web apps, APIs, dashboards, and automation. The goal:
                build tools that feel a little rebellious on the surface, but
                are disciplined enough for gov &amp; enterprise environments.
              </p>

              <p className="text-sm text-dh-street-gray/80 sm:text-base">
                The studio is led by an engineer and test manager with hands-on
                experience in{" "}
                <span className="font-semibold text-dh-offwhite">
                  defense and government programs
                </span>
                , used to requirements, verification, and real-world constraints.
              </p>

              <p className="text-sm text-dh-street-gray/80 sm:text-base">
                Strategy is simple:{" "}
                <span className="font-semibold text-dh-offwhite">
                  tool-first apps with a data layer
                </span>{" "}
                and a social layer built around what users are watching, buying,
                and tracking—whether that&apos;s sneakers, collectibles, or stocks.
              </p>
            </div>

            {/* Top pills */}
            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1 rounded-2xl border border-dh-street-gray/60 bg-dh-black/60 p-4">
                <p className="text-xs font-semibold text-white">Gov &amp; enterprise</p>
                <p className="text-[11px] text-dh-street-gray/80">
                  NAICS 541511 · SAM.gov registered · SDVOSB / VOSB · SBA 8(a) · built with
                  paperwork and discipline in mind.
                </p>
              </div>

              <div className="space-y-1 rounded-2xl border border-dh-street-gray/60 bg-dh-black/60 p-4">
                <p className="text-xs font-semibold text-white">Apps &amp; automations</p>
                <p className="text-[11px] text-dh-street-gray/80">
                  Price-watching, alerts, dashboards, and ops automation toys that evolve into
                  real products when they prove themselves.
                </p>
              </div>

              <div className="space-y-1 rounded-2xl border border-dh-street-gray/60 bg-dh-black/60 p-4">
                <p className="text-xs font-semibold text-white">Long-term view</p>
                <p className="text-[11px] text-dh-street-gray/80">
                  Foundation today for future marketplaces, APIs, and B2B/B2G integrations tomorrow—
                  starting small, built to grow up.
                </p>
              </div>
            </div>

            {/* Company snapshot card */}
            <div className="space-y-3 rounded-3xl border border-dh-street-gray/60 bg-dh-black/60 p-5 sm:p-6">
              <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-dh-street-gray/70">
                Company snapshot
              </p>

              <div className="grid gap-4 text-xs text-dh-street-gray/80 sm:grid-cols-2">
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-dh-offwhite">Entity</p>
                    <p>Digital Hooligan LLC · single-member</p>
                  </div>
                  <div>
                    <p className="font-medium text-dh-offwhite">Ownership</p>
                    <p>SDVOSB · VOSB · SBA 8(a)</p>
                  </div>
                  <div>
                    <p className="font-medium text-dh-offwhite">Registration</p>
                    <p>SAM.gov registered · UEI/CAGE available upon request</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-dh-offwhite">Focus</p>
                    <p>Web apps, dashboards, APIs, automation tools</p>
                  </div>
                  <div>
                    <p className="font-medium text-dh-offwhite">NAICS</p>
                    <p>541511 (Custom Computer Programming Services)</p>
                  </div>
                  <div>
                    <p className="font-medium text-dh-offwhite">Audience</p>
                    <p>
                      Sneakerheads, collectors, traders, operators · gov &amp; enterprise teams
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
