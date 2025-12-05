// apps/digitalhooligan-web/app/ceo/performance/page.tsx

"use client";

import React from "react";
import Link from "next/link";

type AppPerformanceStatus = "healthy" | "watch" | "unknown";

type AppPerformanceEntry = {
    id: string;
    name: string;
    uptimePercent: number | null;
    latencyP50Ms: number | null;
    latencyP95Ms: number | null;
    status: AppPerformanceStatus;
};

type PerformanceResponse = {
    ok: true;
    type: "ceo_performance_summary";
    overallUptimePercent: number | null;
    appsReporting: number;
    appsHealthy: number;
    entries: AppPerformanceEntry[];
    timestamp: string;
};

type PerformanceState =
    | { status: "loading" }
    | { status: "ready"; data: PerformanceResponse }
    | { status: "error"; message: string };

export default function CeoPerformancePage() {
    const [state, setState] = React.useState<PerformanceState>({
        status: "loading",
    });

    async function loadPerformance() {
        setState({ status: "loading" });

        try {
            const res = await fetch("/api/ceo/performance");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as PerformanceResponse;
            setState({ status: "ready", data });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/ceo/performance.";

            setState({ status: "error", message });
        }
    }

    React.useEffect(() => {
        void loadPerformance();
    }, []);

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
                            Snapshot of uptime and latency across Digital Hooligan apps. This
                            view is powered by a typed{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">
                                /api/ceo/performance
                            </code>{" "}
                            endpoint so CEO, Labs, and Dev Workbench can all see the same
                            numbers.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={loadPerformance}
                        className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                    >
                        Refresh
                    </button>
                </div>

                {/* Tabs row */}
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

                {/* States */}
                {state.status === "loading" && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-300 shadow-sm shadow-black/40">
                        Loading performance snapshot…
                    </div>
                )}

                {state.status === "error" && (
                    <div className="rounded-2xl border border-rose-500/60 bg-rose-950/40 p-4 text-sm text-rose-100 shadow-sm shadow-black/40">
                        <p className="font-semibold">Couldn&apos;t load performance data.</p>
                        <p className="mt-1 text-[0.85rem]">{state.message}</p>
                        <p className="mt-2 text-[0.75rem] text-rose-100/90">
                            Hit{" "}
                            <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                                /api/ceo/performance
                            </code>{" "}
                            directly in browser or Insomnia to debug the payload.
                        </p>
                    </div>
                )}

                {state.status === "ready" && (
                    <>
                        {/* Top summary row */}
                        <section className="mb-6 grid gap-4 md:grid-cols-3">
                            <SummaryCard
                                label="Overall uptime"
                                value={
                                    state.data.overallUptimePercent != null
                                        ? `${state.data.overallUptimePercent.toFixed(2)}%`
                                        : "n/a"
                                }
                                note="Average across apps reporting metrics."
                            />
                            <SummaryCard
                                label="Apps reporting"
                                value={state.data.appsReporting.toString()}
                                note="Apps with performance metrics available."
                            />
                            <SummaryCard
                                label="Healthy apps"
                                value={`${state.data.appsHealthy}/${state.data.entries.length}`}
                                note='Marked "healthy" when uptime ≥ 99.5%.'
                            />
                        </section>

                        {/* Per-app grid */}
                        <section className="mb-6 grid gap-4 md:grid-cols-2">
                            {state.data.entries.map((entry) => (
                                <AppCard key={entry.id} entry={entry} />
                            ))}
                        </section>

                        <p className="text-[0.7rem] text-slate-400">
                            Numbers here are mock but intentionally conservative. Later, you
                            can wire this to real metrics to spot regressions before users
                            complain.
                        </p>
                        <p className="mt-1 text-[0.7rem] text-slate-400">
                            Source of truth:{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                /api/ceo/performance
                            </code>
                            . Last updated:{" "}
                            <span className="text-slate-300">
                                {new Date(state.data.timestamp).toLocaleString()}
                            </span>
                            .
                        </p>
                    </>
                )}
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

function SummaryCard(props: { label: string; value: string; note: string }) {
    const { label, value, note } = props;
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {label}
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-50 md:text-2xl">
                {value}
            </p>
            <p className="mt-2 text-[0.75rem] text-slate-400">{note}</p>
        </div>
    );
}

function AppCard({ entry }: { entry: AppPerformanceEntry }) {
    const statusLabel =
        entry.status === "healthy"
            ? "Healthy"
            : entry.status === "watch"
                ? "Watch"
                : "Unknown";

    const statusTone =
        entry.status === "healthy"
            ? "bg-emerald-500/10 text-emerald-200 ring-emerald-500/60"
            : entry.status === "watch"
                ? "bg-amber-500/10 text-amber-200 ring-amber-500/60"
                : "bg-slate-900/80 text-slate-300 ring-slate-700/80";

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-2 flex items-center justify-between gap-2">
                <div>
                    <p className="text-[0.8rem] font-semibold text-slate-100">
                        {entry.name}
                    </p>
                    <p className="text-[0.7rem] text-slate-400">id: {entry.id}</p>
                </div>
                <span
                    className={
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium ring-1 " +
                        statusTone
                    }
                >
                    {statusLabel}
                </span>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-3 text-[0.8rem] text-slate-200">
                <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-400">
                        Uptime
                    </p>
                    <p className="mt-1 text-[0.9rem] font-semibold text-slate-50">
                        {entry.uptimePercent != null
                            ? `${entry.uptimePercent.toFixed(2)}%`
                            : "n/a"}
                    </p>
                </div>
                <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-400">
                        Latency (P50 / P95)
                    </p>
                    <p className="mt-1 text-[0.9rem] font-semibold text-slate-50">
                        {entry.latencyP50Ms != null && entry.latencyP95Ms != null
                            ? `${entry.latencyP50Ms}ms / ${entry.latencyP95Ms}ms`
                            : "n/a"}
                    </p>
                </div>
            </div>

            <p className="mt-3 text-[0.7rem] text-slate-400">
                Later, this card can link to deeper performance dashboards and real
                incident history.
            </p>
        </div>
    );
}