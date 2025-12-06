"use client";

import React from "react";
import Link from "next/link";

/* ---------- Types shared with /api/health/apps ---------- */

type AppHealthStatus = "ok" | "degraded" | "down";

type AppHealthEntry = {
    id: string;
    name: string;
    status: AppHealthStatus;
    note: string;
};

type AppsHealthResponse = {
    ok: boolean;
    entries: AppHealthEntry[];
    timestamp: string;
};

type AppsHealthState =
    | { status: "loading" }
    | { status: "ready"; entries: AppHealthEntry[]; timestamp: string }
    | { status: "error"; message: string };

/* ---------- Page ---------- */

export default function PerformancePage() {
    const [healthState, setHealthState] = React.useState<AppsHealthState>({
        status: "loading",
    });

    React.useEffect(() => {
        void loadHealthSnapshot();
    }, []);

    async function loadHealthSnapshot() {
        setHealthState({ status: "loading" });

        try {
            const res = await fetch("/api/health/apps");
            if (!res.ok) throw new Error(`Health API ${res.status}`);

            const data: AppsHealthResponse = await res.json();

            setHealthState({
                status: "ready",
                entries: data.entries,
                timestamp: data.timestamp,
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error calling /api/health/apps.";
            setHealthState({ status: "error", message });
        }
    }

    const metrics = summariseHealth(healthState);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <header className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            Performance
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            High-level health and reliability view across Digital Hooligan
                            apps. Backed by{" "}
                            <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                                /api/health/apps
                            </code>
                            . Later this can plug into real uptime, latency, and incident
                            feeds.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-300">
                        <span className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-300 ring-1 ring-emerald-500/70">
                            Mode: CEO / reliability
                        </span>
                        <Link
                            href="/ceo"
                            className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[0.75rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                        >
                            ← Back to CEO overview
                        </Link>
                    </div>
                </header>

                {/* CEO tabs */}
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

                {/* Top: Reliability snapshot + App health snapshot (2 columns on desktop) */}
                <section className="mb-6 grid gap-4 lg:grid-cols-2">
                    <ReliabilitySnapshotCard
                        healthState={healthState}
                        metrics={metrics}
                        onRefresh={() => void loadHealthSnapshot()}
                    />
                    <AppHealthSnapshotCard healthState={healthState} />
                </section>

                {/* Bottom: future sections (keep mostly static for now) */}
                <section className="grid gap-4 md:grid-cols-2">
                    <IncidentsPanel />
                    <LatencyPanel />
                </section>
            </div>
        </main>
    );
}

/* ---------- Small helpers ---------- */

function summariseHealth(state: AppsHealthState) {
    if (state.status !== "ready") {
        return {
            totalApps: 0,
            okCount: 0,
            nonOkCount: 0,
        };
    }

    const totalApps = state.entries.length;
    const okCount = state.entries.filter((e) => e.status === "ok").length;
    const nonOkCount = totalApps - okCount;

    return { totalApps, okCount, nonOkCount };
}

/* ---------- Shared CEO tab component ---------- */

function CeoTab(props: {
    href: string;
    label: string;
    active?: boolean;
}) {
    const { href, label, active } = props;

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

/* ---------- Reliability snapshot card ---------- */

function ReliabilitySnapshotCard(props: {
    healthState: AppsHealthState;
    metrics: { totalApps: number; okCount: number; nonOkCount: number };
    onRefresh: () => void;
}) {
    const { healthState, metrics, onRefresh } = props;

    const uptimeDisplay = "99.92%"; // keep a friendly static placeholder for now

    const appsInGoodStandingText =
        metrics.totalApps === 0
            ? "–"
            : `${metrics.okCount} / ${metrics.totalApps}`;

    const openIncidentsText =
        metrics.totalApps === 0 ? "–" : String(metrics.nonOkCount);

    return (
        <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Reliability snapshot
                    </p>
                    <p className="mt-1 max-w-md text-sm text-slate-200">
                        Quick read on uptime, stability, and incidents. Numbers are mocked
                        for now but status is backed by{" "}
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                            /api/health/apps
                        </code>
                        .
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onRefresh}
                    className="inline-flex items-center self-start rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[0.75rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                >
                    Refresh
                </button>
            </div>

            {/* Stat tiles */}
            <div className="grid flex-1 gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3">
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate-400">
                        Overall uptime (30d)
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-emerald-300">
                        {uptimeDisplay}
                    </p>
                    <p className="mt-1 text-[0.75rem] text-slate-400">
                        Placeholder. Later this can come from real monitoring.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3">
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate-400">
                        Open incidents
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-amber-300">
                        {openIncidentsText}
                    </p>
                    <p className="mt-1 text-[0.75rem] text-slate-400">
                        Counts apps that are not in an &quot;ok&quot; state.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3">
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-slate-400">
                        Apps in good standing
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-sky-300">
                        {appsInGoodStandingText}
                    </p>
                    <p className="mt-1 text-[0.75rem] text-slate-400">
                        Matches the per-app snapshot on this page and Dev Workbench.
                    </p>
                </div>
            </div>

            {healthState.status === "loading" && (
                <p className="mt-3 text-[0.75rem] text-slate-400">
                    Loading health snapshot…
                </p>
            )}

            {healthState.status === "error" && (
                <p className="mt-3 text-[0.75rem] text-amber-300">
                    Health API unavailable: {healthState.message}
                </p>
            )}

            {healthState.status === "ready" && (
                <p className="mt-3 text-[0.7rem] text-slate-500">
                    Snapshot timestamp: {healthState.timestamp}.
                </p>
            )}
        </div>
    );
}

/* ---------- App health snapshot card ---------- */

function AppHealthSnapshotCard(props: { healthState: AppsHealthState }) {
    const { healthState } = props;

    return (
        <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        App health snapshot
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                        Per-app view backed by{" "}
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                            /api/health/apps
                        </code>
                        . Same feed powers Dev Workbench.
                    </p>
                </div>
            </div>

            {healthState.status === "loading" && (
                <p className="mt-2 text-[0.85rem] text-slate-300">
                    Loading app health…
                </p>
            )}

            {healthState.status === "error" && (
                <p className="mt-2 text-[0.85rem] text-amber-200">
                    Couldn&apos;t load app health: {healthState.message}
                </p>
            )}

            {healthState.status === "ready" && (
                <>
                    <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                        {healthState.entries.map((entry) => (
                            <li key={entry.id} className="flex items-start gap-2">
                                <span className="mt-[0.2rem]">
                                    <StatusDot status={entry.status} />
                                </span>
                                <div>
                                    <span className="font-medium text-slate-100">
                                        {entry.name}
                                    </span>
                                    <span className="mx-1 text-[0.75rem] text-slate-400">
                                        ({entry.id})
                                    </span>
                                    <span className="text-[0.8rem] text-slate-300">
                                        – {entry.note}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-[0.7rem] text-slate-500">
                        This list should feel familiar from Dev Workbench. Later we can
                        link each entry to incidents, latency charts, or PRs.
                    </p>
                </>
            )}
        </div>
    );
}

function StatusDot({ status }: { status: AppHealthStatus }) {
    let tone = "bg-slate-500";

    if (status === "ok") tone = "bg-emerald-500";
    if (status === "degraded") tone = "bg-amber-400";
    if (status === "down") tone = "bg-rose-500";

    return (
        <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${tone} shadow-[0_0_0_3px_rgba(15,23,42,0.9)]`}
        />
    );
}

/* ---------- Bottom stub cards ---------- */

function IncidentsPanel() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Incidents &amp; risk (future)
            </p>
            <p className="mt-1 text-sm text-slate-200">
                Slot reserved for a small incidents timeline — even if it&apos;s just a
                list of &quot;stuff that went wrong&quot; with links to Dev Workbench
                or GitHub.
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.85rem] text-slate-300">
                <li>• Track incident date, blast radius, and root cause.</li>
                <li>• Map each incident back to an app or service.</li>
                <li>• Allow quick jump to the relevant logs or PR.</li>
            </ul>
            <p className="mt-3 text-[0.7rem] text-slate-500">
                For now this is just copy, but it keeps the design so we don&apos;t
                lose the idea.
            </p>
        </div>
    );
}

function LatencyPanel() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Latency &amp; usage (future)
            </p>
            <p className="mt-1 text-sm text-slate-200">
                Long-term home for simple charts: requests, p95 latency, or anything
                else that matters to CEO Tez.
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.85rem] text-slate-300">
                <li>• One chart per app or a combined &quot;stack health&quot; view.</li>
                <li>• Highlight regressions when a new deploy lands.</li>
                <li>• Feed this data into AI Hub for smarter summaries.</li>
            </ul>
            <p className="mt-3 text-[0.7rem] text-slate-500">
                No real metrics yet, but the card keeps a parking spot for when the
                data is ready.
            </p>
        </div>
    );
}