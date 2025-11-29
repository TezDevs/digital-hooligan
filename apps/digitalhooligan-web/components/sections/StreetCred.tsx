"use client";

import Container from "../Container";

export default function StreetCred() {
  return (
    <section
      id="why"
      className="border-b border-dh-street-gray/60 bg-dh-black"
    >
      <Container>
        <div className="grid gap-8 py-10 sm:py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start md:gap-12 lg:py-16">
          {/* Left side: Why Digital Hooligan? */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Why Digital Hooligan?
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-dh-street-gray/80 sm:text-[0.95rem]">
              You&apos;re not looking for an “enterprise partner.” You want
              someone who can think like a user, build like an engineer, and
              ship without asking for permission. That&apos;s the entire point
              of Digital Hooligan.
            </p>

            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
              <div className="rounded-3xl border border-dh-street-gray/60 bg-dh-black/60 px-4 py-4 sm:px-5 sm:py-5">
                <h3 className="text-sm font-semibold text-white">
                  Hands-on builder
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-dh-street-gray/80">
                  From infra to UI — not just specs. I actually ship the thing.
                </p>
              </div>

              <div className="rounded-3xl border border-dh-street-gray/60 bg-dh-black/60 px-4 py-4 sm:px-5 sm:py-5">
                <h3 className="text-sm font-semibold text-white">
                  Ops &amp; reliability brain
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-dh-street-gray/80">
                  Background in real-time, always-on systems. Alerts, playbooks,
                  steady hands.
                </p>
              </div>

              <div className="rounded-3xl border border-dh-street-gray/60 bg-dh-black/60 px-4 py-4 sm:px-5 sm:py-5">
                <h3 className="text-sm font-semibold text-white">
                  Built for weird niches
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-dh-street-gray/80">
                  Sneakerheads, collectors, side hustlers — the overlooked edges
                  of the internet.
                </p>
              </div>
            </div>
          </div>

          {/* Right side: Not a startup factory / cards */}
          <div className="space-y-5 sm:space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-dh-electric-mint/40 bg-dh-black/80 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-dh-electric-mint/80">
              <span className="h-1.5 w-1.5 rounded-full bg-dh-electric-mint shadow-[0_0_10px_rgba(30,255,203,0.8)]" />
              Why DH?
            </p>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Not a startup factory.{" "}
                <span className="text-dh-electric-mint">A trouble lab.</span>
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-dh-street-gray/80 sm:text-[0.95rem]">
                I don&apos;t ship pitch decks. I ship working tools — scrapers,
                dashboards, bots, and weird little apps that solve real problems
                for real people. Digital Hooligan is my label for all the
                experiments that made it out of the lab.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-dh-electric-mint/40 bg-dh-black/70 px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-dh-electric-mint">
                  Built &amp; shipped
                </p>
                <p className="mt-2 text-xs leading-relaxed text-dh-street-gray/80 sm:text-sm">
                  Multiple live apps and experiments — PennyWize, DropSignal,
                  HypeWatch, Hooligan Labs prototypes — all designed, built, and
                  deployed solo.
                </p>
              </div>

              <div className="rounded-3xl border border-dh-street-gray/60 bg-dh-black/70 px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/70">
                  How I work
                </p>
                <p className="mt-2 text-xs leading-relaxed text-dh-street-gray/80 sm:text-sm">
                  Small, fast, dangerous. Tight scopes, short feedback loops,
                  and shipping useful things instead of endless plans.
                </p>
              </div>

              {/* SDVOSB card */}
              <div className="rounded-3xl border border-dh-street-gray/60 bg-dh-black/70 px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-dh-street-gray/70">
                  SDVOSB
                </p>
                <p className="mt-2 text-xs leading-relaxed text-dh-street-gray/80 sm:text-sm">
                  Digital Hooligan operates as a Service-Disabled Veteran-Owned
                  Small Business (SDVOSB). I was Honorably discharged after serving
                  four years on active dutyfrom 2007–2011 as a troposcatter communications
                  operator, including a year in Iraq — that mindset of reliability,
                  service, and calm under pressure shows up in how I build and
                  ship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
