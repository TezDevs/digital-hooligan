import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Government & Enterprise Services · Digital Hooligan",
    description:
        "Overview of the custom software services Digital Hooligan LLC provides under NAICS 541511 for government and enterprise teams.",
};

export default function GovServicesPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
            {/* Intro */}
            <section className="border-b border-white/5 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-5xl space-y-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                        GOVERNMENT &amp; ENTERPRISE
                    </p>
                    <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                        Services under NAICS 541511.
                    </h1>
                    <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
                        Digital Hooligan LLC operates under{" "}
                        <span className="font-medium text-slate-100">
                            NAICS 541511 – Custom Computer Programming Services
                        </span>
                        {" "}as a{" "}
                        <span className="font-medium text-slate-100">
                            veteran-owned small business (VSOB) that meets SBA small business
                            standards
                        </span>
                        . The studio focuses on small, focused builds that support mission
                        teams with modern, maintainable software.
                    </p>
                </div>
            </section>

            {/* Core service areas */}
            <section className="border-b border-white/5 bg-slate-950/80 px-4 py-10 sm:px-6 md:py-14 lg:px-8">
                <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
                    <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4 text-xs text-slate-300">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                            CUSTOM APPLICATIONS
                        </p>
                        <h2 className="text-sm font-semibold text-slate-50">
                            Web apps &amp; internal tools
                        </h2>
                        <ul className="mt-1 space-y-1.5">
                            <li>• Mission dashboards and status boards</li>
                            <li>• Workflow tools for analysts and operators</li>
                            <li>• Lightweight portals for programs and teams</li>
                            <li>• Internal self-service tools for busy staff</li>
                        </ul>
                    </div>

                    <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4 text-xs text-slate-300">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                            DATA &amp; AUTOMATION
                        </p>
                        <h2 className="text-sm font-semibold text-slate-50">
                            Bots, scrapers &amp; integrations
                        </h2>
                        <ul className="mt-1 space-y-1.5">
                            <li>• Data collection and transformation pipelines</li>
                            <li>• Targeted scrapers and monitoring jobs</li>
                            <li>• Alerting &amp; notification surfaces around key signals</li>
                            <li>• Integrations with existing systems and APIs</li>
                        </ul>
                    </div>

                    <div className="space-y-2 rounded-2xl border border-slate-800 bg-black/80 p-4 text-xs text-slate-300">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                            PROTOTYPES &amp; POCS
                        </p>
                        <h2 className="text-sm font-semibold text-slate-50">
                            Try it before you scale it
                        </h2>
                        <ul className="mt-1 space-y-1.5">
                            <li>• Early-stage tools to de-risk bigger contracts</li>
                            <li>• Shadow-mode tools alongside existing workflows</li>
                            <li>• Rapid iterations with real user feedback</li>
                            <li>• Clear handoff path to larger teams or vendors</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Environments & fit */}
            <section className="border-b border-white/5 bg-black px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
                    <div className="space-y-3 text-sm text-slate-300">
                        <h2 className="text-lg font-semibold text-slate-50">
                            Where Digital Hooligan fits.
                        </h2>
                        <p>
                            The studio is a strong fit for missions that need{" "}
                            <span className="font-medium text-slate-100">
                                focused, low-bureaucracy builds
                            </span>{" "}
                            that still respect requirements, security, and test discipline.
                        </p>
                        <ul className="space-y-2">
                            <li>• Unclassified or low-side work with remote-friendly teams</li>
                            <li>• Small task orders that benefit from one strong builder</li>
                            <li>• Programs that want to experiment before scaling a full team</li>
                            <li>• Offices that need internal tools but can&apos;t wait 18 months</li>
                        </ul>
                    </div>

                    <aside className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                            DELIVERY STYLE
                        </p>
                        <ul className="space-y-1.5">
                            <li>• Clear milestones and simple reporting</li>
                            <li>• Preference for readable code and docs</li>
                            <li>• Comfortable with requirements, test plans, and audits</li>
                            <li>• Bias toward dashboards, logs, and observability</li>
                        </ul>
                    </aside>
                </div>
            </section>

            {/* How engagements work */}
            <section className="border-b border-white/5 bg-slate-950/80 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-5xl space-y-6 text-sm text-slate-300">
                    <h2 className="text-lg font-semibold text-slate-50">
                        How a typical engagement works.
                    </h2>
                    <ol className="space-y-3 text-xs sm:text-sm">
                        <li>
                            <span className="font-semibold text-slate-100">
                                1. Short discovery
                            </span>{" "}
                            – Understand the environment, constraints, mission, and systems
                            you already have in place.
                        </li>
                        <li>
                            <span className="font-semibold text-slate-100">
                                2. Scope a focused build
                            </span>{" "}
                            – Define a small, high-impact slice: a dashboard, tool, or
                            automation that can show value quickly.
                        </li>
                        <li>
                            <span className="font-semibold text-slate-100">
                                3. Build, demo, refine
                            </span>{" "}
                            – Ship early versions behind the scenes, collect feedback, and
                            refine until it&apos;s useful day-to-day.
                        </li>
                        <li>
                            <span className="font-semibold text-slate-100">
                                4. Hand off or extend
                            </span>{" "}
                            – Either continue iterating with Digital Hooligan, or hand off
                            clean code and docs to a larger internal or vendor team.
                        </li>
                    </ol>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1 text-sm text-slate-200">
                        <p className="font-semibold text-slate-50">
                            Exploring work under NAICS 541511?
                        </p>
                        <p className="text-xs text-slate-400">
                            A short description of the environment, mission, and scope is
                            enough to start the conversation.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 font-semibold text-black shadow shadow-emerald-500/40 hover:bg-emerald-300"
                        >
                            Contact Digital Hooligan
                        </Link>
                        <Link
                            href="/company"
                            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-black px-4 py-2 font-semibold text-slate-100 hover:border-emerald-400/70"
                        >
                            View company profile
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}