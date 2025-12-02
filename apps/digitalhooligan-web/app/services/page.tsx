import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Services · Digital Hooligan",
    description:
        "Services offered by Digital Hooligan LLC – tool-first apps, bots, internal dashboards, and gov/enterprise-ready prototypes.",
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
            {/* Intro */}
            <section className="border-b border-white/5 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-5xl space-y-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
                        SERVICES
                    </p>
                    <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                        Tool-first builds for teams that actually ship.
                    </h1>
                    <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
                        Digital Hooligan LLC is a{" "}
                        <span className="font-medium text-slate-100">
                            small, focused studio
                        </span>{" "}
                        that designs, builds, and operates web apps, bots, dashboards, and
                        automation toys. Ideal for sneaker/collectible data plays, internal
                        tools, and early gov/enterprise prototypes that need discipline
                        without the bureaucracy.
                    </p>
                </div>
            </section>

            {/* Three core service buckets */}
            <section className="border-b border-white/5 bg-slate-950/70 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
                    {/* 1. Short focused builds */}
                    <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                            SHORT, FOCUSED BUILDS
                        </p>
                        <h2 className="text-sm font-semibold text-slate-50">
                            MVPs, dashboards & proof-of-concepts
                        </h2>
                        <p className="text-xs text-slate-300">
                            4–8 week projects that get you from idea to{" "}
                            <span className="font-medium text-slate-100">clickable reality</span>{" "}
                            with metrics and observability baked in from day one.
                        </p>
                        <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
                            <li>• Web dashboards for internal programs</li>
                            <li>• Data scrapers and price watchers</li>
                            <li>• Simple APIs & internal tools</li>
                        </ul>
                    </div>

                    {/* 2. Labs-style experiments */}
                    <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                            LABS-STYLE EXPERIMENTS
                        </p>
                        <h2 className="text-sm font-semibold text-slate-50">
                            Experiments with a real upgrade path
                        </h2>
                        <p className="text-xs text-slate-300">
                            Build small, weird, and controlled first. If it works, promote it
                            into a public app, mobile experience, or partner integration
                            instead of throwing it away.
                        </p>
                        <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
                            <li>• Hype-testing new ideas</li>
                            <li>• “Shadow mode” tools alongside existing systems</li>
                            <li>• Internal-only dashboards with clear success metrics</li>
                        </ul>
                    </div>

                    {/* 3. Gov & enterprise */}
                    <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                            GOV & ENTERPRISE READY
                        </p>
                        <h2 className="text-sm font-semibold text-slate-50">
                            Prototypes for serious environments
                        </h2>
                        <p className="text-xs text-slate-300">
                            Background in defense/government work, used to requirements, test
                            plans, and paperwork. NAICS 541511, SAM.gov in progress, with an
                            eye on future task orders and contracts.
                        </p>
                        <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
                            <li>• Internal portals and dashboards</li>
                            <li>• Data visualization & alerting surfaces</li>
                            <li>• Early-stage tools ahead of full contracts</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* How projects run */}
            <section className="border-b border-white/5 bg-black px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-50">
                            How projects usually run
                        </h2>
                        <ol className="space-y-2 text-sm text-slate-300">
                            <li>
                                <span className="font-semibold text-slate-100">
                                    1. Quick discovery
                                </span>{" "}
                                – A short email or call to clarify the problem, environment, and
                                constraints.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-100">
                                    2. Lightweight plan
                                </span>{" "}
                                – Milestones, rough timeline, and what “done” looks like. Just
                                enough structure; no 80-page decks.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-100">
                                    3. Build & iterate
                                </span>{" "}
                                – Short build cycles with demos and adjustments instead of
                                disappearing for months.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-100">
                                    4. Handoff or ongoing care
                                </span>{" "}
                                – Clear documentation and handoff, with the option for
                                maintenance or future improvements.
                            </li>
                        </ol>
                    </div>

                    <aside className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                            GOOD FIT PROJECTS
                        </p>
                        <ul className="space-y-1.5">
                            <li>• You want a focused, opinionated builder.</li>
                            <li>• You care about dashboards, observability, and uptime.</li>
                            <li>• You&apos;re okay starting small and upgrading if it works.</li>
                            <li>• You&apos;re willing to give feedback during the build.</li>
                        </ul>
                        <p className="pt-2 text-[11px] text-slate-500">
                            Future state: projects and tasks from here will surface inside the
                            internal CEO dashboard, with the AI assistant helping schedule and
                            prioritize work.
                        </p>
                    </aside>
                </div>
            </section>

            {/* CTA row */}
            <section className="bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1 text-sm text-slate-200">
                        <p className="font-semibold text-slate-50">
                            Ready to talk about a project?
                        </p>
                        <p className="text-xs text-slate-400">
                            A short, honest email with your constraints and goals is perfect.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-black shadow shadow-emerald-500/40 hover:bg-emerald-300"
                        >
                            Jump to contact
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-black px-4 py-2 text-xs font-semibold text-slate-100 hover:border-emerald-400/70"
                        >
                            Back to homepage
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}