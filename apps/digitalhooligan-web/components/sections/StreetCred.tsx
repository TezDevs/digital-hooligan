export default function StreetCred() {
  const pillars = [
    {
      title: "Defense & gov program experience",
      body: "Background in engineering and test management on defense/government work, used to high-stakes systems and strict requirements.",
    },
    {
      title: "Tool-first mindset",
      body: "Everything starts as a tool that solves a painful problem, then grows into a product when it earns usage and trust.",
    },
    {
      title: "Dashboard-driven ops",
      body: "Internal CEO and Labs dashboards keep an eye on uptime, alerts, builds, and experiments so nothing drifts in the dark.",
    },
    {
      title: "Built for future audits",
      body: "Thinking ahead to logging, traceability, and documentation so working with enterprises and agencies is easier later.",
    },
  ];

  return (
    <section
      id="street-cred"
      className="border-b border-white/5 bg-black px-4 py-16 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Street cred meets enterprise brain
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
              The brand looks like a graffiti-covered alley in the future, but
              the thinking is old-school disciplined: requirements, test plans,
              documentation, and dashboards.
            </p>
          </div>
          <p className="max-w-sm text-xs text-slate-400">
            No fake wall of logos. Just the reality of the work done so far, and
            the systems being built to support bigger, more serious projects.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                PILLAR
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                {pillar.title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-400">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-400">
          <span className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1">
            Gov & enterprise-ready mindset
          </span>
          <span className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1">
            Sneaker & collectible culture native
          </span>
          <span className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1">
            Automation, observability & dashboards
          </span>
        </div>
      </div>
    </section>
  );
}