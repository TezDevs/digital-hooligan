import Link from "next/link";

export default function ServicesPage() {
    const year = new Date().getFullYear();

    return (
        <main className="min-h-screen bg-black px-4 pb-20 pt-24 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
                {/* Header */}
                <header className="space-y-4">
                    <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-400">
                        Digital Hooligan Studio · Services
                    </p>
                    <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                        What Digital Hooligan can build for you.
                    </h1>
                    <p className="max-w-3xl text-sm text-zinc-400 sm:text-base">
                        Digital Hooligan is a small, opinionated software and web design
                        studio. Work spans brand-first websites, product pages, and internal
                        tools all the way to custom automations, dashboards, and the kinds
                        of glue code that keep real-world systems moving.
                    </p>
                </header>

                {/* Grid of offerings */}
                <section className="grid gap-4 md:grid-cols-2">
                    {/* Custom web apps & portals */}
                    <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                            Web apps & internal portals
                        </p>
                        <h2 className="text-sm font-semibold text-zinc-100">
                            Custom tools that feel like your brand
                        </h2>
                        <p className="text-sm text-zinc-400">
                            Focused web apps and internal portals for ops, analysts, traders,
                            or field teams. Think small, sharp products—not bloated platforms.
                        </p>
                        <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-zinc-400">
                            <li>Internal dashboards and command centers</li>
                            <li>Role-based, authenticated tools for small teams</li>
                            <li>Lightweight “single-purpose” apps to replace spreadsheets</li>
                        </ul>
                    </div>

                    {/* Marketing sites & product pages */}
                    <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                            Marketing sites & product pages
                        </p>
                        <h2 className="text-sm font-semibold text-zinc-100">
                            Brand-first web design with teeth
                        </h2>
                        <p className="text-sm text-zinc-400">
                            Opinionated marketing sites, landing pages, and product detail
                            pages that look like you—leveraging the same visual language as
                            Digital Hooligan itself.
                        </p>
                        <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-zinc-400">
                            <li>Single-page or multi-section marketing sites</li>
                            <li>Product launch pages and feature breakdowns</li>
                            <li>Portfolio, studio, or capability sites</li>
                        </ul>
                    </div>

                    {/* APIs & system integrations */}
                    <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                            APIs & system integrations
                        </p>
                        <h2 className="text-sm font-semibold text-zinc-100">
                            Glue code between the tools you already use
                        </h2>
                        <p className="text-sm text-zinc-400">
                            Connect the things that don&apos;t talk nicely on their own:
                            internal systems, third-party APIs, and custom data feeds.
                        </p>
                        <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-zinc-400">
                            <li>REST/JSON APIs for internal or partner use</li>
                            <li>Data ingestion and transformation pipelines</li>
                            <li>Bridging legacy tools with modern dashboards</li>
                        </ul>
                    </div>

                    {/* Automation & workflows */}
                    <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                            Automation & workflows
                        </p>
                        <h2 className="text-sm font-semibold text-zinc-100">
                            Make the boring parts of your job less painful
                        </h2>
                        <p className="text-sm text-zinc-400">
                            Small, targeted automations and scripts that do the tedious
                            string-pulling: data checks, notifications, and “if this, then
                            that” workflows.
                        </p>
                        <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-zinc-400">
                            <li>Scheduled jobs and monitoring scripts</li>
                            <li>Alerting & signal-based notifications</li>
                            <li>Ops Toys–style helper tools for infra and logging</li>
                        </ul>
                    </div>

                    {/* Dashboards & data views */}
                    <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                            Dashboards & reporting
                        </p>
                        <h2 className="text-sm font-semibold text-zinc-100">
                            Signals, not noise
                        </h2>
                        <p className="text-sm text-zinc-400">
                            Lightweight dashboards and reporting views inspired by PennyWize,
                            DropSignal, and HypeWatch: clear signals instead of clutter.
                        </p>
                        <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-zinc-400">
                            <li>KPIs and health views for ops or product teams</li>
                            <li>Alert-driven views for prices, inventory, or events</li>
                            <li>Readable charts for people who don&apos;t live in BI tools</li>
                        </ul>
                    </div>

                    {/* UX/UI & product support */}
                    <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                            UX/UI & product support
                        </p>
                        <h2 className="text-sm font-semibold text-zinc-100">
                            Front-end craft from someone who ships their own apps
                        </h2>
                        <p className="text-sm text-zinc-400">
                            User flows, low-friction interfaces, and UI polish for existing
                            products—especially where dev teams are busy and design has
                            drifted.
                        </p>
                        <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-zinc-400">
                            <li>Interface refactors and component systems</li>
                            <li>Interaction tweaks and mobile-first passes</li>
                            <li>Design/dev pairing on new features or tools</li>
                        </ul>
                    </div>
                </section>

                {/* Gov / enterprise note */}
                <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-zinc-300">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        For public-sector & enterprise buyers
                    </p>
                    <p className="mt-2 text-sm text-zinc-400">
                        Digital Hooligan LLC can support custom development work under{" "}
                        <span className="font-medium text-zinc-100">
                            NAICS 541511 – Custom Computer Programming Services
                        </span>{" "}
                        when needed for contracting, while still operating as a
                        design-forward studio. The same skills used to build PennyWize,
                        DropSignal, HypeWatch, and Ops Toys apply to internal portals,
                        dashboards, and automation inside larger organizations.
                    </p>
                    <p className="mt-2 text-xs text-zinc-500">
                        If you&apos;re exploring contracts, teaming arrangements, or pilot
                        projects, reach out for a capabilities snapshot or to talk through
                        scope.
                    </p>
                </section>

                {/* CTA row */}
                <section className="flex flex-wrap gap-3 text-sm">
                    <Link
                        href="/#contact"
                        className="inline-flex items-center justify-center rounded-xl border border-emerald-500/70 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 shadow-[0_0_40px_rgba(16,185,129,0.45)] transition hover:bg-emerald-500/25 hover:text-emerald-50"
                    >
                        Talk about a project
                    </Link>
                    <Link
                        href="/company"
                        className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-emerald-500/60 hover:text-emerald-100"
                    >
                        View company profile
                    </Link>
                    <p className="text-xs text-zinc-500">
                        Prefer email or a capabilities sheet? Use the contact form and
                        mention what you&apos;re trying to ship in {year}.
                    </p>
                </section>
            </div>
        </main>
    );
}