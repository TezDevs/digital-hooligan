// components/sections/Services.tsx

export default function ServicesSection() {
    const pillars = [
        {
            key: "build",
            label: "A. Build",
            title: "Day 1 stack to MVP",
            points: [
                "Day 1 Tech Stack Setup",
                "Dev Sandbox & Cloud Environment Setup",
                "Landing Page + Brand Starter Site",
                "Custom Web App / Micro-SaaS Build",
            ],
        },
        {
            key: "automate",
            label: "B. Automate",
            title: "Bots, APIs & Ops Toys",
            points: [
                "API & Platform Development",
                "API Integration & Orchestration",
                "Bots & Ops Toys Automations",
                "Data Pipelines, Reports & Auto-Exports",
            ],
        },
        {
            key: "product",
            label: "C. Product",
            title: "Product, not just code",
            points: [
                "Product Discovery & Strategy",
                "Roadmapping & Prioritization",
                "MVP Scoping & Release Planning",
                "Product Analytics & Iteration Planning",
            ],
        },
        {
            key: "ship",
            label: "D + E. Ship & Advise",
            title: "Dashboards, delivery & coaching",
            points: [
                "CEO Metrics Dashboard Build-Out",
                "Engineering / Delivery Workflow Setup",
                "Infra, Logging & Incident Flows",
                "Advisory & Product Coaching for founders",
            ],
        },
    ];

    return (
        <section
            id="services"
            className="relative py-20 sm:py-24 border-t border-white/5 bg-gradient-to-b from-black via-zinc-950 to-black"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400/80">
                            Services
                        </p>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">
                            What Digital Hooligan can ship for you
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-300">
                            Hands-on help across build, automation, product management, and
                            “ship smarter” ops. Product Management and API development are
                            first-class citizens here, not afterthoughts.
                        </p>
                    </div>

                    <div className="text-sm text-zinc-400">
                        <p className="max-w-xs">
                            Want the full menu?{" "}
                            <a
                                href="/services"
                                className="font-medium text-emerald-400 hover:text-emerald-300 underline decoration-dotted underline-offset-4"
                            >
                                View all services →
                            </a>
                        </p>
                    </div>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {pillars.map((pillar) => (
                        <article
                            key={pillar.key}
                            className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-zinc-950/60 p-5 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-400/60"
                        >
                            <div>
                                <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400/90">
                                    {pillar.label}
                                </p>
                                <h3 className="mt-2 text-base font-semibold text-white">
                                    {pillar.title}
                                </h3>
                                <ul className="mt-3 space-y-1.5 text-xs text-zinc-300">
                                    {pillar.points.map((point) => (
                                        <li key={point} className="flex gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400/80" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4 text-xs text-zinc-400">
                                <a
                                    href="/services"
                                    className="inline-flex items-center gap-1 font-medium text-emerald-400 hover:text-emerald-300"
                                >
                                    Learn more
                                    <span aria-hidden="true">↗</span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
