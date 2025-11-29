"use client";

import Container from "../layout/Container";

export default function StreetCredSection() {
  return (
    <section
      id="street-cred"
      className="border-y border-dh-street-gray/60 bg-gradient-to-b from-dh-black via-[#050509] to-dh-black py-16 md:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          {/* Street Cred */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-dh-graffiti-yellow">
                Street Cred
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Not a “idea guy” — an ops-minded builder with receipts.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-dh-street-gray sm:text-base">
                Digital Hooligan is backed by real-world engineering, ops, and
                product experience — not just vibes. I&apos;ve shipped in high
                stakes environments and brought that same discipline to indie
                products.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Experience */}
              <div className="flex flex-col rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-dh-street-gray">
                  Background
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Engineering &amp; Ops
                </p>
                <p className="mt-2 text-xs text-dh-street-gray">
                  Built and tested systems in defense, gov, and payments-style
                  environments where downtime isn&apos;t an option.
                </p>
              </div>

              {/* Leadership */}
              <div className="flex flex-col rounded-2xl border border-dh-street-gray/60 bg-dh-black/80 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-dh-street-gray">
                  Operator
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Systems thinker
                </p>
                <p className="mt-2 text-xs text-dh-street-gray">
                  I design products with monitoring, incident response, and real
                  workflows in mind — not as an afterthought.
                </p>
              </div>

              {/* Credentials */}
              <div className="flex flex-col rounded-2xl border border-dh-electric-mint/60 bg-dh-black/90 p-4 shadow-[0_0_26px_rgba(30,255,203,0.45)]">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-dh-electric-mint">
                  Credentials
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-dh-street-gray">
                  <li>• B.S. Information Technology Management</li>
                  <li>• AWS Certified Cloud Practitioner</li>
                  <li>• AWS Certified Solutions Architect</li>
                  <li>• Google Professional Project Management</li>
                  <li>• PSPO &amp; CSM</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Digital Hooligan */}
          <div id="why-dh" className="space-y-5">
            <div className="rounded-3xl border border-dh-street-gray/60 bg-dh-black/80 p-6 shadow-[0_0_30px_rgba(0,0,0,0.7)]">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-dh-graffiti-yellow">
                Why Digital Hooligan
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Break the rules, keep the uptime.
              </h3>
              <p className="mt-3 text-sm text-dh-street-gray">
                Digital Hooligan lives where creativity, systems thinking, and
                business reality overlap. I&apos;m not trying to build “yet
                another” SaaS — I&apos;m building sharp tools for people who
                actually feel the pain of bad ops, messy money, and chaotic
                workflows.
              </p>

              <div className="mt-4 space-y-3 text-sm text-dh-street-gray">
                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-dh-electric-mint" />
                  <p>
                    <span className="font-medium text-white">
                      Ops-first mindset:
                    </span>{" "}
                    features are designed with logging, alerts, and failure
                    modes in mind.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-dh-graffiti-yellow" />
                  <p>
                    <span className="font-medium text-white">
                      Builder, not just strategist:
                    </span>{" "}
                    I&apos;m hands-on with architecture, code, and tooling.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-dh-rebel-red" />
                  <p>
                    <span className="font-medium text-white">
                      Community and culture aware:
                    </span>{" "}
                    products like PennyWize and DropSignal are built for real
                    subcultures — sneakerheads, collectors, indie builders.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-dh-street-gray/60 bg-dh-black px-5 py-4 text-xs text-dh-street-gray">
              <p>
                TL;DR: If you want shiny decks, there are bigger studios. If you
                want <span className="text-white">dangerous ideas that can
                  actually ship and survive production</span>, that&apos;s what
                Digital Hooligan is built for.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
