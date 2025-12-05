// apps/digitalhooligan-web/app/ceo/page.tsx

"use client";

import React from "react";
import Link from "next/link";

/**
 * These types mirror /api/health/apps but are kept local to the client.
 */

type AppHealthStatus = "good" | "needs_wiring" | "idea_only";

type AppsHealthEntry = {
    id: string;
    name: string;
    kind: string;
    lifecycle: string;
    status: AppHealthStatus;
    missing: string[];
};

type AppsHealthResponse = {
    ok: true;
    type: "apps_health";
    apps: AppsHealthEntry[];
    timestamp: string;
};

type AppsHealthState =
    | { status: "loading" }
    | {
        status: "ready";
        data: AppsHealthResponse;
        counts: {
            total: number;
            good: number;
            needsWiring: number;
            ideaOnly: number;
        };
    }
    | { status: "error"; message: string };

export default function CeoOverviewPage() {
    const [appsHealth, setAppsHealth] = React.useState<AppsHealthState>({
        status: "loading",
    });

    React.useEffect(() => {
        void loadAppsHealth();
    }, []);

    async function loadAppsHealth() {
        setAppsHealth({ status: "loading" });

        try {
            const res = await fetch("/api/health/apps");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as AppsHealthResponse;

            const good = data.apps.filter((app) => app.status === "good").length;
            const needsWiring = data.apps.filter(
                (app) => app.status === "needs_wiring",
            ).length;
            const ideaOnly = data.apps.filter(
                (app) => app.status === "idea_only",
            ).length;

            setAppsHealth({
                status: "ready",
                data,
                counts: {
                    total: data.apps.length,
                    good,
                    needsWiring,
                    ideaOnly,
                },
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/health/apps.";
            setAppsHealth({ status: "error", message });
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            CEO dashboard
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            One place to see money, products, deals, and app health across
                            Digital Hooligan.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-300">
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-300 ring-1 ring-emerald-500/70">
                            Today: systems nominal
                        </span>
                    </div>
                </div>

                {/* CEO tabs row */}
                <nav className="mb-6 overflow-x-auto">
                    <div className="flex gap-2 text-sm">
                        <CeoTab href="/ceo" label="Overview" active />
                        <CeoTab href="/ceo/tasks" label="Tasks" />
                        <CeoTab href="/ceo/deals" label="Deals" />
                        <CeoTab href="/ceo/finance" label="Finance" />
                        <CeoTab href="/ceo/performance" label="Performance" />
                        <CeoTab href="/ceo/ai-hub" label="AI Hub" />
                        <CeoTab href="/ceo/dev-workbench" label="Dev WB" />
                        <CeoTab href="/ceo/settings" label="Settings" />
                        <CeoTab href="/ceo/logout" label="Logout" />
                    </div>
                </nav>

                {/* Top snapshot row */}
                <section className="mb-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <SnapshotCard
                        title="Money"
                        value="$4,250"
                        subtitle="Est. MRR across all live products once initial apps ship."
                        footer="Pipeline blend from gov + SaaS assumptions."
                        icon="💰"
                    />
                    <SnapshotCard
                        title="Products"
                        value="3 live"
                        subtitle="PennyWize, DropSignal, HypeWatch (plus Ops Toys internally)."
                        footer="Roadmaps live in CEO dashboard + Labs HQ."
                        icon="📦"
                    />
                    <SnapshotCard
                        title="Deals"
                        value="2 open"
                        subtitle="Active opportunities + proposals across gov + freelance + apps."
                        footer="See full pipeline in the Deals tab."
                        icon="🤝"
                    />
                    <SnapshotCard
                        title="App performance"
                        value="99.92%"
                        subtitle="All apps healthy + 0 open incidents (for now)."
                        footer="Dig deeper in App performance for latency + incidents."
                        icon="📈"
                    />
                </section>

                {/* Mid-row: app portfolio + focus / copilot */}
                <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1.2fr)]">
                    <AppsPortfolioCard
                        state={appsHealth}
                        onRefresh={() => void loadAppsHealth()}
                    />

                    <div className="flex flex-col gap-4">
                        <TodayFocusCard />
                        <CeoCopilotCard />
                    </div>
                </section>

                {/* Bottom row: admin / notes */}
                <section className="mt-4 grid gap-4 md:grid-cols-2">
                    <AdminGovRiskCard />
                    <NotesCard />
                </section>
            </div>
        </main>
    );
}

/* ---------- shared tab + tiny components ---------- */

function CeoTab({
    href,
    label,
    active,
}: {
    href: string;
    label: string;
    active?: boolean;
}) {
    if (active) {
        return (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900">
                {label}
            </span>
        );
    }

    return (
        <Link
            href={href}
            className="inline-flex items-center rounded-full bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 ring-1 ring-slate-700/80 hover:bg-slate-800 hover:text-emerald-200 hover:ring-emerald-500/70"
        >
            {label}
        </Link>
    );
}

function SnapshotCard(props: {
    title: string;
    value: string;
    subtitle: string;
    footer: string;
    icon: string;
}) {
    const { title, value, subtitle, footer, icon } = props;

    return (
        <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {title}
                    </p>
                    <p className="mt-1 text-xl font-semibold text-slate-50">{value}</p>
                    <p className="mt-1 text-[0.8rem] text-slate-300">{subtitle}</p>
                </div>
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-lg">
                    <span aria-hidden>{icon}</span>
                </div>
            </div>
            <p className="mt-3 text-[0.75rem] text-slate-400">{footer}</p>
        </div>
    );
}

/* ---------- Apps portfolio snapshot (uses /api/health/apps) ---------- */

function AppsPortfolioCard({
    state,
    onRefresh,
}: {
    state: AppsHealthState;
    onRefresh: () => void;
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        App portfolio snapshot
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                        Quick view of how many apps, bots, and internal tools exist in the
                        registry. Backed by{" "}
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                            /api/health/apps
                        </code>{" "}
                        so it stays in sync with Labs.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onRefresh}
                    className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[0.75rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                >
                    Refresh
                </button>
            </div>

            {state.status === "loading" && (
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
                    Counting apps from the registry…
                </div>
            )}

            {state.status === "error" && (
                <div className="rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.85rem] text-rose-100">
                    <p className="font-semibold">Couldn&apos;t load apps health.</p>
                    <p className="mt-1 text-[0.8rem]">{state.message}</p>
                    <p className="mt-2 text-[0.75rem] text-rose-100/90">
                        Hit{" "}
                        <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                            /api/health/apps
                        </code>{" "}
                        directly in browser or Insomnia/Kong to debug the payload.
                    </p>
                </div>
            )}

            {state.status === "ready" && (
                <>
                    <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-[0.8rem] text-slate-300">
                            <span className="font-medium text-slate-50">
                                {state.counts.total}
                            </span>{" "}
                            total entries in the registry.
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 text-[0.7rem]">
                            <AppsHealthChip
                                status="good"
                                value={state.counts.good}
                                label="Good"
                            />
                            <AppsHealthChip
                                status="needs_wiring"
                                value={state.counts.needsWiring}
                                label="Needs wiring"
                            />
                            <AppsHealthChip
                                status="idea_only"
                                value={state.counts.ideaOnly}
                                label="Idea-only"
                            />
                        </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2 text-[0.85rem]">
                            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Live / beta
                            </p>
                            <p className="mt-1 text-[0.8rem] text-slate-300">
                                Anything currently live, in beta, or being dogfooded.
                            </p>
                            <p className="mt-2 text-[0.8rem] text-slate-400">
                                Filter from Labs HQ using lifecycle tags and the registry to get
                                a more exact count.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2 text-[0.85rem]">
                            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Internal-only
                            </p>
                            <p className="mt-1 text-[0.8rem] text-slate-300">
                                CEO, Labs HQ, and ops toys that stay behind the curtain.
                            </p>
                            <p className="mt-2 text-[0.8rem] text-slate-400">
                                Use the kind field in the registry to separate public apps from
                                internal tools.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2 text-[0.85rem]">
                            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Public-ready
                            </p>
                            <p className="mt-1 text-[0.8rem] text-slate-300">
                                User-facing apps and products that have a real marketing route
                                and basic metrics wiring.
                            </p>
                            <p className="mt-2 text-[0.8rem] text-slate-400">
                                Once the registry is fully wired, this box can show a concrete
                                count and list.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2 text-[0.85rem]">
                            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Registry detail
                            </p>
                            <p className="mt-1 text-[0.8rem] text-slate-300">
                                For lifecycle breakdowns and per-app routes, use{" "}
                                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem]">
                                    /ceo/apps
                                </code>{" "}
                                or{" "}
                                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem]">
                                    /labs/app-registry
                                </code>{" "}
                                when those views are live.
                            </p>
                        </div>
                    </div>

                    <p className="mt-3 text-[0.7rem] text-slate-400">
                        This card is intentionally simple: it just reflects whatever the{" "}
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                            APP_REGISTRY
                        </code>{" "}
                        and apps health endpoint say. As the registry grows, this becomes
                        the single source of truth for &quot;what exists.&quot;
                    </p>
                </>
            )}
        </div>
    );
}

function AppsHealthChip(props: {
    status: AppHealthStatus;
    value: number;
    label: string;
}) {
    const { status, value, label } = props;

    const base =
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-medium ring-1";

    let tone =
        "bg-slate-900/80 text-slate-300 ring-slate-700/80";

    if (status === "good") {
        tone =
            "bg-emerald-500/10 text-emerald-200 ring-emerald-500/60";
    } else if (status === "needs_wiring") {
        tone =
            "bg-amber-500/10 text-amber-200 ring-amber-500/60";
    } else if (status === "idea_only") {
        tone =
            "bg-sky-500/10 text-sky-200 ring-sky-500/60";
    }

    return (
        <span className={base + " " + tone}>
            <span>{value}</span>
            <span>{label}</span>
        </span>
    );
}

/* ---------- Other right-hand cards (static content for now) ---------- */

function TodayFocusCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Today&apos;s focus
            </p>
            <p className="mt-1 text-sm text-slate-200">
                High-impact moves for future Tez across product, gov, and admin.
            </p>

            <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                <li className="flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2">
                    <div>
                        <p className="font-medium text-slate-100">
                            Finish CEO dashboard shell + navigation
                        </p>
                        <p className="mt-0.5 text-[0.75rem] text-slate-400">Today</p>
                    </div>
                    <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.7rem] text-sky-200">
                        Product
                    </span>
                </li>
                <li className="flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2">
                    <div>
                        <p className="font-medium text-slate-100">
                            Check SAM.gov + Navy Federal status
                        </p>
                        <p className="mt-0.5 text-[0.75rem] text-slate-400">This week</p>
                    </div>
                    <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.7rem] text-emerald-200">
                        Gov
                    </span>
                </li>
                <li className="flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2">
                    <div>
                        <p className="font-medium text-slate-100">
                            Outline PennyWize + DropSignal MVPs
                        </p>
                        <p className="mt-0.5 text-[0.75rem] text-slate-400">
                            This week (deep work)
                        </p>
                    </div>
                    <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.7rem] text-fuchsia-200">
                        Product
                    </span>
                </li>
            </ul>
        </div>
    );
}

function CeoCopilotCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                CEO copilot (preview)
            </p>
            <p className="mt-1 text-sm text-slate-200">
                Tiny readout that stitches Tasks, Deals, Performance, and Dev Workbench
                into one suggestion.
            </p>

            <div className="mt-3 space-y-2 text-[0.85rem]">
                <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2">
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Today&apos;s headline
                    </p>
                    <p className="mt-1 text-slate-200">
                        Finish the CEO shell, then make one concrete move on revenue.
                    </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2">
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Deals snapshot
                    </p>
                    <p className="mt-1 text-slate-200">
                        You have active deals across gov, freelance, and product. Keep 1–3
                        truly alive; park the rest.
                    </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2">
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Dev / refactor nudge
                    </p>
                    <p className="mt-1 text-slate-200">
                        Pick one small refactor or UI polish task on the current feature
                        branch, ship it, and let Dev Workbench + your AI pair programmer
                        handle the details later.
                    </p>
                </div>
            </div>

            <p className="mt-3 text-[0.7rem] text-slate-400">
                Future wiring: this panel can read live data from Tasks, Deals,
                Performance, and GitHub (Dev Workbench) to generate a fresh briefing
                every morning.
            </p>
        </div>
    );
}

function AdminGovRiskCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Admin / gov / risk
            </p>
            <p className="mt-1 text-sm text-slate-200">
                Quick admin checklist for Digital Hooligan LLC.
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                <li>• LLC + EIN complete.</li>
                <li>• SAM.gov: entity in review.</li>
                <li>• Navy Federal business account: in review.</li>
                <li>• Next: VSOB / SDVOSB and NAICS cleanup.</li>
            </ul>
        </div>
    );
}

function NotesCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Notes
            </p>
            <p className="mt-1 text-sm text-slate-200">
                Space for quick notes, reminders, or future wiring ideas.
            </p>
            <p className="mt-3 text-[0.8rem] text-slate-300">
                Later this can sync with Tasks, Labs HQ, and the CEO AI copilot so
                you&apos;re never starting from a blank page when planning the week.
            </p>
        </div>
    );
}