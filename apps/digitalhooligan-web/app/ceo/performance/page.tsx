// apps/digitalhooligan-web/app/ceo/performance/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";
import { getMockMetricValue } from "@/lib/mockMetrics";

type MetricSnapshot = {
    users: number | null;
    mrr: number | null;
    uptime: number | null;
    errorsPerMin: number | null;
};

const LIFECYCLE_ORDER: AppRegistryEntry["lifecycle"][] = [
    "live",
    "beta",
    "alpha",
    "building",
    "design",
    "idea",
    "paused",
];

const KIND_LABEL: Record<AppRegistryEntry["kind"], string> = {
    "public-app": "Public app",
    "internal-tool": "Internal tool",
    bot: "Automation bot",
    infra: "Infra component",
};

function buildMetrics(entry: AppRegistryEntry): MetricSnapshot {
    const keys = entry.metricsKeys ?? {};

    return {
        users:
            keys.users != null ? getMockMetricValue(keys.users) : null,
        mrr: keys.mrr != null ? getMockMetricValue(keys.mrr) : null,
        uptime:
            keys.uptime != null ? getMockMetricValue(keys.uptime) : null,
        errorsPerMin:
            keys.errorsPerMin != null
                ? getMockMetricValue(keys.errorsPerMin)
                : null,
    };
}

export default function CeoPerformancePage() {
    const [filter, setFilter] = React.useState("");
    const [showInternal, setShowInternal] = React.useState(false);

    const entriesWithMetrics = React.useMemo(() => {
        let list = APP_REGISTRY.map((entry) => ({
            entry,
            metrics: buildMetrics(entry),
        }));

        if (filter.trim().length > 0) {
            const q = filter.trim().toLowerCase();
            list = list.filter(({ entry }) => {
                const tags = entry.tags?.join(" ") ?? "";
                return (
                    entry.id.toLowerCase().includes(q) ||
                    entry.name.toLowerCase().includes(q) ||
                    tags.toLowerCase().includes(q)
                );
            });
        }

        if (showInternal) {
            list = list.filter(({ entry }) => entry.internalOnly);
        }

        list.sort((a, b) => {
            const aIndex = LIFECYCLE_ORDER.indexOf(a.entry.lifecycle);
            const bIndex = LIFECYCLE_ORDER.indexOf(b.entry.lifecycle);
            if (aIndex !== bIndex) return aIndex - bIndex;
            return a.entry.name.localeCompare(b.entry.name);
        });

        return list;
    }, [filter, showInternal]);

    const total = APP_REGISTRY.length;
    const withUsers = entriesWithMetrics.filter(
        ({ metrics }) => metrics.users != null,
    ).length;
    const withUptime = entriesWithMetrics.filter(
        ({ metrics }) => metrics.uptime != null,
    ).length;

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            App performance
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Registry-backed view of mock performance for each app and internal
                            tool. This shell is where real metrics (users, MRR, uptime,
                            incidents) will live.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-[0.75rem] text-slate-300">
                        <Link
                            href="/ceo"
                            className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-slate-200 ring-1 ring-slate-700/80 hover:text-emerald-200 hover:ring-emerald-500/70"
                        >
                            <span className="mr-1 text-xs">←</span>
                            Back to overview
                        </Link>
                    </div>
                </div>

                {/* Tabs row (Performance active) */}
                <nav className="mb-6 overflow-x-auto">
                    <div className="flex gap-2 text-sm">
                        <CeoTab href="/ceo" label="Overview" />
                        <CeoTab href="/ceo/tasks" label="Tasks" />
                        <CeoTab href="/ceo/deals" label="Deals" />
                        <CeoTab href="/ceo/finance" label="Finance" />
                        <CeoTab href="/ceo/performance" label="Performance" active />
                        <CeoTab href="/ceo/ai-hub" label="AI Hub" />
                        <CeoTab href="/ceo/dev-workbench" label="Dev WB" />
                        <CeoTab href="/ceo/settings" label="Settings" />
                        <CeoTab href="/ceo/logout" label="Logout" />
                    </div>
                </nav>

                {/* Stats + controls */}
                <section className="mb-6 grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1.6fr)]">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Portfolio metrics
                                </p>
                                <p className="mt-1 text-sm text-slate-200">
                                    {total} apps in registry · {withUsers} with mock user counts ·{" "}
                                    {withUptime} with mock uptime
                                </p>
                            </div>
                            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.7rem] text-slate-300 ring-1 ring-slate-700/70">
                                {entriesWithMetrics.length} shown after filters
                            </span>
                        </div>

                        <div className="flex flex-col gap-3 md:flex-row md:items-center">
                            <div className="flex-1">
                                <label className="mb-1 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Filter
                                </label>
                                <input
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    placeholder="Search by id, name, or tag…"
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500/70 focus:outline-none focus:ring-1 focus:ring-emerald-500/60"
                                />
                            </div>
                            <label className="flex items-center gap-2 text-xs text-slate-300">
                                <input
                                    type="checkbox"
                                    checked={showInternal}
                                    onChange={(e) => setShowInternal(e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                                />
                                Show internal-only tools only
                            </label>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-300 shadow-sm shadow-black/40">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            How this connects
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4">
                            <li>
                                Uses the same registry and metric keys as{" "}
                                <span className="font-medium">Dev Workbench</span> and{" "}
                                <span className="font-medium">AI Hub</span>.
                            </li>
                            <li>
                                Each card points at{" "}
                                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.65rem] text-emerald-300">
                                    /api/apps/[id]?includeMetrics=true
                                </code>{" "}
                                and{" "}
                                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.65rem] text-emerald-300">
                                    /api/ai/app-summary/[id]
                                </code>{" "}
                                for assistants or Insomnia tests.
                            </li>
                            <li>
                                Later, swap the mock metric adapter to real sources (analytics,
                                billing, infra) without changing this shell.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* App cards */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Per-app performance
                        </h2>
                        <p className="text-xs text-slate-400">
                            One card per registry entry, with mock metrics for now. Use this
                            to sanity-check ids and metric wiring.
                        </p>
                    </div>

                    {entriesWithMetrics.length === 0 ? (
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-300">
                            No apps match the current filters. Clear the search box or toggle
                            off the internal-only filter.
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {entriesWithMetrics.map(({ entry, metrics }) => (
                                <PerformanceCard
                                    key={entry.id}
                                    entry={entry}
                                    metrics={metrics}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

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

function PerformanceCard({
    entry,
    metrics,
}: {
    entry: AppRegistryEntry;
    metrics: MetricSnapshot;
}) {
    const kindLabel = KIND_LABEL[entry.kind];
    const audienceLabel = entry.internalOnly ? "Internal-only" : "User-facing";

    const apiDetailUrl = `/api/apps/${entry.id}?includeMetrics=true`;
    const aiSummaryUrl = `/api/ai/app-summary/${entry.id}`;

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/90 text-xl">
                        {entry.icon?.type === "emoji" ? entry.icon.value : "⛓"}
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                            <h3 className="text-sm font-semibold text-slate-50">
                                {entry.name}
                            </h3>
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-slate-400">
                                {entry.lifecycle}
                            </span>
                        </div>
                        <p className="mt-1 text-[0.75rem] text-slate-400 line-clamp-2">
                            {entry.description}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[0.65rem] text-slate-400">
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5">
                                {kindLabel}
                            </span>
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5">
                                {audienceLabel}
                            </span>
                            <code className="rounded bg-slate-900 px-2 py-0.5 text-[0.65rem] text-slate-300">
                                id: {entry.id}
                            </code>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1 text-[0.65rem] text-slate-400">
                    {entry.ceoPath && (
                        <Link
                            href={entry.ceoPath}
                            className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-0.5 text-[0.65rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                        >
                            CEO →
                        </Link>
                    )}
                    {entry.labsPath && (
                        <Link
                            href={entry.labsPath}
                            className="rounded-full border border-slate-800 bg-slate-950/80 px-2 py-0.5 text-[0.65rem] text-slate-300 hover:border-emerald-500/60 hover:text-emerald-200"
                        >
                            Labs →
                        </Link>
                    )}
                </div>
            </div>

            {/* Metrics row */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-3 text-[0.7rem] text-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                    {metrics.users != null ? (
                        <MetricPill label="Users" value={metrics.users.toLocaleString()} />
                    ) : (
                        <MetricPill label="Users" value="—" dim />
                    )}

                    {metrics.mrr != null ? (
                        <MetricPill
                            label="MRR"
                            value={`$${metrics.mrr.toFixed(0)}/mo`}
                        />
                    ) : (
                        <MetricPill label="MRR" value="—" dim />
                    )}

                    {metrics.uptime != null ? (
                        <MetricPill
                            label="Uptime"
                            value={`${metrics.uptime.toFixed(1)}%`}
                        />
                    ) : (
                        <MetricPill label="Uptime" value="—" dim />
                    )}

                    {metrics.errorsPerMin != null ? (
                        <MetricPill
                            label="Errors/min"
                            value={metrics.errorsPerMin.toFixed(2)}
                        />
                    ) : (
                        <MetricPill label="Errors/min" value="—" dim />
                    )}
                </div>
                <p className="mt-1 text-[0.65rem] text-slate-500">
                    All values are mock for now. Swap the metric adapter to real sources
                    later without changing this page.
                </p>
            </div>

            {/* API links */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] text-slate-300">
                <div className="min-w-0">
                    <p className="text-[0.65rem] font-medium text-slate-400">
                        API endpoints
                    </p>
                    <div className="mt-0.5 space-y-0.5">
                        <code className="block max-w-full truncate rounded bg-slate-950 px-2 py-0.5 text-[0.65rem] text-slate-300">
                            {apiDetailUrl}
                        </code>
                        <code className="block max-w-full truncate rounded bg-slate-950 px-2 py-0.5 text-[0.65rem] text-slate-300">
                            {aiSummaryUrl}
                        </code>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <Link
                        href={apiDetailUrl}
                        className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 text-[0.65rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                    >
                        View app JSON →
                    </Link>
                    <Link
                        href={aiSummaryUrl}
                        className="rounded-full border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-[0.65rem] text-slate-300 hover:border-emerald-500/60 hover:text-emerald-200"
                    >
                        View AI summary →
                    </Link>
                </div>
            </div>
        </div>
    );
}

function MetricPill({
    label,
    value,
    dim,
}: {
    label: string;
    value: string;
    dim?: boolean;
}) {
    const base =
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] ring-1";
    const activeClasses =
        "bg-emerald-500/10 text-emerald-200 ring-emerald-500/60";
    const dimClasses = "bg-slate-900/80 text-slate-400 ring-slate-700/70";

    return (
        <span className={`${base} ${dim ? dimClasses : activeClasses}`}>
            <span className="mr-1 text-[0.65rem] uppercase tracking-[0.16em]">
                {label}
            </span>
            <span>{value}</span>
        </span>
    );
}