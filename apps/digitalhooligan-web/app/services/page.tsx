import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Services | Digital Hooligan – Custom Software (NAICS 541511)",
    description:
        "Digital Hooligan LLC provides custom software services under NAICS 541511: web apps, APIs, automations, dashboards, integrations, and supporting product sites.",
};

const services = [
    {
        tag: "541511 core",
        title: "Custom Web Apps & Internal Portals",
        summary:
            "Full-stack web applications tailored to a specific mission, team, or workflow—not generic templates dropped on top of your process.",
        bullets: [
            "Internal tools and mission portals",
            "Role-based access, audit-friendly logging",
            "Built for long-term maintainability",
        ],
    },
    {
        tag: "APIs & integration",
        title: "APIs, System Integrations & Data Plumbing",
        summary:
            "Clean, well-documented APIs and integration layers so systems actually talk to each other.",
        bullets: [
            "REST/JSON APIs for new and legacy systems",
            "Data ingestion, transformation, and routing",
            "Auth, rate limiting, and observability baked in",
        ],
    },
    {
        tag: "Automation / RPA",
        title: "Automation Scripts & RPA",
        summary:
            "Targeted automations and bots to remove repetitive keystrokes and copy/paste from your team’s day.",
        bullets: [
            "Task automation and workflow orchestration",
            "RPA-style scripts for repetitive processes",
            "Alerting when something breaks instead of silent failure",
        ],
    },
    {
        tag: "Dashboards",
        title: "Dashboards, Reporting & Data Visualization",
        summary:
            "Operational dashboards and mission-centric views so decision makers aren’t flying blind.",
        bullets: [
            "Real-time status boards and KPIs",
            "Executive and operator views from the same data",
            "Exportable reports for stakeholders and oversight",
        ],
    },
    {
        tag: "Modules",
        title: "Custom Modules for Existing Platforms",
        summary:
            "Targeted modules and plug-ins that extend existing enterprise or government systems instead of replacing them.",
        bullets: [
            "Add-on components for internal systems",
            "Bridges between COTS tools and custom code",
            "Designed to respect existing security and data boundaries",
        ],
    },
    {
        tag: "UX / UI & sites",
        title: "UX / UI & Supporting Product Sites",
        summary:
            "Interaction design for real operators plus the product/marketing sites that sit in front of those tools—like PennyWize’s public face.",
        bullets: [
            "Task-focused app screens for power users",
            "Accessible, dark-mode-friendly interfaces",
            "Product landing pages and sites that support real software",
        ],
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-black text-zinc-100">
            <div className="mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-10 border-b border-zinc-800 pb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                        Services
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Custom Software & Product Sites for Real Workflows
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm text-zinc-400">
                        Digital Hooligan LLC operates primarily under{" "}
                        <span className="font-medium text-zinc-200">
                            NAICS 541511 – Custom Computer Programming Services
                        </span>
                        . That means writing, modifying, testing, and supporting software
                        that is tailored to a particular customer, mission, or use case.
                    </p>
                    <p className="mt-3 max-w-3xl text-sm text-zinc-400">
                        In practice, that looks like custom web apps and internal portals,
                        APIs and integrations, automation scripts and bots, dashboards and
                        reporting, and focused UX/UI for complex workflows. We also build
                        the front-door product and marketing sites that sit in front of that
                        software—like a PennyWize landing site—when it supports the overall
                        engagement.
                    </p>
                    <p className="mt-3 text-xs text-zinc-500">
                        The primary focus is still software that actually does something for
                        your operators. Supporting “commodity” sites are in-scope when
                        they’re part of that picture or required by contract or regulation.
                    </p>
                </header>

                {/* Services grid */}
                <section aria-label="Custom software services">
                    <div className="grid gap-6 md:grid-cols-2">
                        {services.map((service) => (
                            <article
                                key={service.title}
                                className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 shadow-[0_0_40px_rgba(34,197,94,0.15)]"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-base font-semibold text-zinc-50">
                                        {service.title}
                                    </h2>
                                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                                        {service.tag}
                                    </span>
                                </div>
                                <p className="mt-3 text-sm text-zinc-400">{service.summary}</p>
                                <ul className="mt-3 flex-1 list-disc space-y-1 pl-5 text-xs text-zinc-400">
                                    {service.bullets.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>

                {/* CTA back into the main site */}
                <section className="mt-12 flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                            Next steps
                        </p>
                        <h2 className="mt-2 text-lg font-semibold text-zinc-50">
                            Have a workflow, dashboard, or integration in mind?
                        </h2>
                        <p className="mt-2 text-sm text-zinc-400">
                            Tell us about the mission, the data, and the users. We&apos;ll
                            scope a small, concrete slice of custom software that fits under
                            NAICS 541511—and the supporting site or landing page if you need
                            one.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 md:items-end">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center justify-center rounded-xl border border-emerald-500/70 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/25 hover:text-emerald-100"
                        >
                            Talk about a project
                        </Link>
                        <Link
                            href="/#street-cred"
                            className="inline-flex items-center justify-center text-xs text-zinc-400 underline decoration-zinc-600 underline-offset-4 hover:text-emerald-200 hover:decoration-emerald-400"
                        >
                            Or review Street Cred and past work →
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}