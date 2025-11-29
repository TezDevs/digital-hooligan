import Container from "../layout/Container";

const streetCredItems = [
  {
    badge: "Defense",
    title: "Systems built for zero-failure zones",
    body: "Years of engineering and test leadership on defense and government contracts where downtime is not an option.",
  },
  {
    badge: "Payments",
    title: "Real-time ops & incident muscle",
    body: "Hands-on experience running critical payment and real-time systems with clear playbooks when things go sideways.",
  },
  {
    badge: "Product",
    title: "From idea to shipped",
    body: "Able to move from fuzzy idea, to architecture, to backlog, to shipping a working product without a 10-person committee.",
  },
  {
    badge: "Delivery",
    title: "Calm under fire",
    body: "Used to leading teams through high-pressure rollouts, outages, and postmortems without losing the plot.",
  },
];

export default function StreetCred() {
  return (
    <section
      id="street-cred"
      aria-labelledby="street-cred-title"
      className="border-t border-dh-street-gray/60 bg-dh-black/90"
    >
      <Container>
        <div className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            {/* Street Cred side */}
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-dh-electric-mint">
                Street Cred
              </p>
              <h2
                id="street-cred-title"
                className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl"
              >
                Not just a cool logo. Real scars. Real reps.
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-dh-street-gray md:text-base">
                Digital Hooligan is backed by years of engineering and operations work in
                environments where things can’t just “sort of” work. Defense, government,
                and payments — the kinds of systems that punish sloppy thinking.
              </p>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {streetCredItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-dh-street-gray/70 bg-dh-black/80 p-4 shadow-[0_0_24px_rgba(30,255,203,0.08)]"
                  >
                    <dt className="flex items-center gap-2 text-sm font-semibold text-white">
                      <span className="inline-flex h-6 min-w-[1.8rem] items-center justify-center rounded-full border border-dh-electric-mint/60 bg-dh-electric-mint/10 text-[0.65rem] font-mono uppercase tracking-[0.16em] text-dh-electric-mint">
                        {item.badge}
                      </span>
                      {item.title}
                    </dt>
                    <dd className="mt-2 text-xs text-dh-street-gray md:text-sm">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Why DH side */}
            <aside className="rounded-3xl border border-dh-street-gray/70 bg-[radial-gradient(circle_at_top,_rgba(30,255,203,0.16),transparent_55%),_rgba(5,5,5,0.96)] p-6 shadow-[0_0_36px_rgba(30,255,203,0.2)] md:p-7">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-dh-graffiti-yellow">
                Why Digital Hooligan
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                A one-person studio with enterprise-grade discipline.
              </p>
              <p className="mt-4 text-sm text-dh-street-gray md:text-base">
                I&apos;m Courtez (&quot;Tez&quot;), blending engineering, test management, and
                product thinking into a small, dangerous studio. Digital Hooligan exists to
                ship sharp, opinionated tools — fast — without losing the reliability you
                expect from mission-critical systems.
              </p>

              <ul className="mt-4 space-y-3 text-sm text-dh-street-gray md:text-base">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-dh-electric-mint" />
                  <span>
                    <span className="font-medium text-white">Strong fundamentals.</span>{" "}
                    B.S. in Information Technology Management with a career built around
                    complex, high-stakes systems.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-dh-electric-mint" />
                  <span>
                    <span className="font-medium text-white">Certified & battle-tested.</span>{" "}
                    AWS cloud, agile delivery, and project leadership credentials inform how
                    every app is planned, built, and operated.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-dh-electric-mint" />
                  <span>
                    <span className="font-medium text-white">Human, not corporate.</span>{" "}
                    Strength training, anime, manga, games, and web dev all shape the
                    personality and tone of the products coming out of this lab.
                  </span>
                </li>
              </ul>

              {/* Mini badges / logos */}
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-dh-electric-mint/40 bg-dh-black/80 px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-dh-electric-mint">
                  AWS Certified
                </span>
                <span className="inline-flex items-center rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-dh-street-gray">
                  PSPO &amp; CSM
                </span>
                <span className="inline-flex items-center rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-dh-street-gray">
                  Google Project Mgmt
                </span>
                <span className="inline-flex items-center rounded-full border border-dh-street-gray/60 bg-dh-black/80 px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-dh-street-gray">
                  Defense &amp; Payments
                </span>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
