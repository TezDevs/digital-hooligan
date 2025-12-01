import Link from "next/link";

const products = [
    {
        name: "PennyWize",
        stage: "Bot → Web app → Mobile",
        kpi: "Watchlists created",
        kpiValue: "—",
        status: "Shipping soon",
    },
    {
        name: "DropSignal",
        stage: "Sneakers & streetwear alerts",
        kpi: "Signals sent",
        kpiValue: "—",
        status: "Assist mode first, add-to-cart later",
    },
    {
        name: "HypeWatch",
        stage: "Collectibles price radar",
        kpi: "Collections tracked",
        kpiValue: "—",
        status: "Concept / design",
    },
    {
        name: "Ops Toys",
        stage: "Internal ops automation",
        kpi: "Workflows",
        kpiValue: "—",
        status: "Internal tooling",
    },
];

const todayFocus = [
    "Tighten Hooligan Labs landing copy",
    "Define DropSignal Phase 1 'assist mode' flows",
    "Outline MVP metrics for CEO dashboard (revenue, users, uptime)",
];

const parkingLot = [
    "Research Stripe / Paddle stack for SaaS billing",
    "Decide long-term data warehouse strategy (e.g., Postgres + ClickHouse)",
    "First-pass design for AI assistant to watch code + dashboards",
];

const recentEvents = [
    {
        label: "Digital Hooligan LLC registered",
        type: "Company",
    },
    {
        label:
            "Initial Labs apps pages live (PennyWize, DropSignal, Ops Toys, HypeWatch)",
        type: "Product",
    },
    {
        label: "Brand + hero + footer polish pass",
        type: "Site",
    },
    {
        label: "Roadmap: assist-mode alerts before add-to-cart integrations",
        type: "Strategy",
    },
];

export default function CeoDashboardPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:py-12">
                {/* Top bar */}
                <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm text-slate-400 transition hover:text-emerald-400"
                        >
                            <span aria-hidden="true" className="mr-1">
                                ←
                            </span>
                            Back to site
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                CEO Dashboard
                            </h1>
                            <p className="mt-1 max-w-xl text-sm text-slate-400">
                                One place to see where Digital Hooligan is headed: revenue,
                                burn, product health, ops, and what Future You should focus on
                                today.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 text-right text-sm text-slate-400">
                        <div className="inline-flex items-center justify-end gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Phase 1 · Static dashboard shell
                        </div>
                        <p className="text-xs text-slate-500">
                            Future: wire this to live Stripe, infra, and app metrics.
                        </p>
                        <Link
                            href="/ceo/logout"
                            className="text-xs text-slate-500 underline-offset-2 hover:text-emerald-300 hover:underline"
                        >
                            Logout
                        </Link>
                    </div>
                </header>

                {/* KPI strip */}
                <section aria-label="Key metrics" className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            MRR (placeholder)
                        </p>
                        <p className="mt-2 text-2xl font-semibold">$0</p>
                        <p className="mt-1 text-xs text-slate-500">
                            Ready for first dollars from apps & APIs.
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Active products
                        </p>
                        <p className="mt-2 text-2xl font-semibold">4</p>
                        <p className="mt-1 text-xs text-slate-500">
                            PennyWize, DropSignal, HypeWatch, Ops Toys.
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Burn / month
                        </p>
                        <p className="mt-2 text-2xl font-semibold">TBD</p>
                        <p className="mt-1 text-xs text-slate-500">
                            Will pull from Vercel, Cloudflare, infra, and SaaS tools.
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Focus today
                        </p>
                        <p className="mt-2 text-2xl font-semibold">Build & Ship</p>
                        <p className="mt-1 text-xs text-slate-500">
                            Labs detail, PennyWize, DropSignal assist mode.
                        </p>
                    </div>
                </section>

                {/* Revenue & runway */}
                <section className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                        <div className="flex items-center justify-between gap-2">
                            <h2 className="text-sm font-semibold text-slate-100">
                                Revenue & MRR (future hookup)
                            </h2>
                            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                                Stripe / billing later
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                            This panel will eventually show live MRR, new subscribers, churn,
                            and product-level breakdowns.
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                                <p className="text-xs text-slate-400">Current MRR</p>
                                <p className="mt-1 text-lg font-semibold">$0</p>
                            </div>
                            <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                                <p className="text-xs text-slate-400">Projected MRR (12 mo)</p>
                                <p className="mt-1 text-lg font-semibold">TBD</p>
                            </div>
                            <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                                <p className="text-xs text-slate-400">APIs / tools</p>
                                <p className="mt-1 text-sm">Not monetized yet</p>
                            </div>
                            <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                                <p className="text-xs text-slate-400">Apps</p>
                                <p className="mt-1 text-sm">MVPs in progress</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                        <div className="flex items-center justify-between gap-2">
                            <h2 className="text-sm font-semibold text-slate-100">
                                Cash, costs & runway (future hookup)
                            </h2>
                            <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-xs text-sky-300">
                                Bank / accounting later
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                            Here you&apos;ll see bank balance, monthly burn, and how many
                            months of runway you have at current spend.
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                                <p className="text-xs text-slate-400">Bank balance</p>
                                <p className="mt-1 text-lg font-semibold">Connect later</p>
                            </div>
                            <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                                <p className="text-xs text-slate-400">Monthly burn</p>
                                <p className="mt-1 text-lg font-semibold">TBD</p>
                            </div>
                            <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                                <p className="text-xs text-slate-400">Runway</p>
                                <p className="mt-1 text-sm">Calculated once data is wired</p>
                            </div>
                            <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                                <p className="text-xs text-slate-400">Notes</p>
                                <p className="mt-1 text-sm">
                                    Keep infra + SaaS lean while apps ramp.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product health */}
                <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <h2 className="text-sm font-semibold text-slate-100">
                            Product health overview
                        </h2>
                        <p className="text-xs text-slate-500">
                            Quick snapshot of each app: where it is and what matters.
                        </p>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {products.map((product) => (
                            <article
                                key={product.name}
                                className="flex flex-col justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/40 p-4 text-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-50">
                                            {product.name}
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-400">
                                            {product.stage}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                                        {product.status}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                                    <div>
                                        <p className="text-slate-400">{product.kpi}</p>
                                        <p className="mt-0.5 text-sm font-semibold">
                                            {product.kpiValue}
                                        </p>
                                    </div>
                                    <p className="text-slate-500">
                                        Later: hook to real usage (alerts sent, watchlists, etc.).
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Ops & incidents + Timeline */}
                <section className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                        <div className="flex items-center justify-between gap-2">
                            <h2 className="text-sm font-semibold text-slate-100">
                                Ops & reliability
                            </h2>
                            <span className="rounded-full bg-lime-500/10 px-2 py-0.5 text-xs text-lime-300">
                                No incidents logged
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                            This will be fed by Ops Toys / monitoring: uptime, incidents,
                            pages, and how quickly you respond.
                        </p>
                        <div className="mt-4 space-y-3 text-sm">
                            <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                                <p className="text-xs text-slate-400">Status</p>
                                <p className="mt-1 text-sm font-semibold">
                                    All green (static marketing site)
                                </p>
                            </div>
                            <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3">
                                <p className="text-xs text-slate-400">What&apos;s next</p>
                                <ul className="mt-1 list-disc pl-4 text-xs text-slate-300">
                                    <li>Decide uptime SLOs for each app / API.</li>
                                    <li>Choose logging / metrics stack to plug in later.</li>
                                    <li>
                                        Add simple incident log (CSV / DB) once services go live.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                        <h2 className="text-sm font-semibold text-slate-100">
                            Recent milestones
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Lightweight timeline of big moves. Later this could sync from
                            Notion / GitHub / Stripe events.
                        </p>
                        <ol className="mt-4 space-y-3 text-sm">
                            {recentEvents.map((event, index) => (
                                <li
                                    key={event.label}
                                    className="flex gap-3 rounded-lg border border-slate-800/80 bg-slate-950/40 p-3"
                                >
                                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                                    <div>
                                        <p className="font-medium text-slate-50">
                                            {event.label}
                                        </p>
                                        <p className="mt-0.5 text-xs text-slate-400">
                                            Type: {event.type} · #{index + 1}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* Today vs Parking lot */}
                <section className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                        <h2 className="text-sm font-semibold text-slate-100">
                            Today&apos;s focus
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Three high-leverage moves for the current you. Keep this tight.
                        </p>
                        <ul className="mt-3 space-y-2 text-sm">
                            {todayFocus.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-2 rounded-lg border border-slate-800/80 bg-slate-950/40 p-2.5"
                                >
                                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                                    <p className="text-slate-200">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                        <h2 className="text-sm font-semibold text-slate-100">
                            Parking lot (don&apos;t lose the ideas)
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Big ideas, but not for right now. This keeps the main focus clean.
                        </p>
                        <ul className="mt-3 space-y-2 text-sm">
                            {parkingLot.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-2 rounded-lg border border-slate-800/80 bg-slate-950/40 p-2.5"
                                >
                                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-500" />
                                    <p className="text-slate-200">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Founder notes */}
                <section className="rounded-xl border border-dashed border-slate-800 bg-slate-900/50 p-5">
                    <h2 className="text-sm font-semibold text-slate-100">
                        Founder notes (scratchpad)
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                        Use this section later as a real-time journal: what you&apos;re
                        trying, what&apos;s working, what&apos;s not. For now, this is
                        simple static copy.
                    </p>
                    <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-300">
                        Digital Hooligan is still in builder mode. Goal: make this
                        dashboard the single source of truth for money, momentum, and risk
                        across the entire Hooligan universe.
                    </div>
                </section>

                <footer className="mt-2 border-t border-slate-900 pt-4 text-xs text-slate-500">
                    <p>
                        This is a static Phase 1 shell. Future phases will connect Stripe,
                        bank data, infra metrics, and usage from each app.
                    </p>
                </footer>
            </div>
        </main>
    );
}
