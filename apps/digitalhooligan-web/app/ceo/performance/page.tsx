// apps/digitalhooligan-web/app/ceo/performance/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import type {
    AppHealthEntry,
    AppHealthStatus,
    AppsHealthResponse,
} from "@/app/api/health/apps/route";

/**
 * Local state for the health snapshot pulled from /api/health/apps.
 */

type AppsHealthState =
    | { status: "loading" }
    | { status: "ready"; entries: AppHealthEntry[]; timestamp: string }
    | { status: "error"; message: string };

export default function CeoPerformancePage() {
    const [healthState, setHealthState] = React.useState<AppsHealthState>({
        status: "loading",
    });

    React.useEffect(() => {
        void loadHealth();
    }, []);

    async function loadHealth() {
        setHealthState({ status: "loading" });

        try {
            const res = await fetch("/api/health/apps");
            if (!res.ok) {
                throw new Error(`Health API returned ${res.status}`);
            }

            const data = (await res.json()) as AppsHealthResponse;

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
                            apps. Later this can plug into real uptime, latency, and incident
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

                {/* CEO nav tabs */}
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

                {/* Layout: headline metrics + health snapshot */}
                <section className="grid gap-4 lg:grid-cols-2">
                    <PerformanceSummaryCard />
                    <AppHealthSnapshotCard
                        state={healthState}
                        onRefresh={() => void loadHealth()}
                    />
                </section>

                {/* Future section placeholder */}
                <section className="mt-4 grid gap-4 lg:grid-cols-2">
                    <IncidentsPlaceholderCard />
                    <LatencyPlaceholderCard />
                </section>
            </div>
        </main>
    );
}

/* ---------- Shared CEO tab component ---------- */

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

/* ---------- Left card: high-level performance summary (mock for now) ---------- */

function PerformanceSummaryCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Reliability snapshot
            </p>
            <p className="mt-1 text-sm text-slate-200">
                Quick read on uptime, stability, and incidents. Numbers are mocked for
                now, but structure maps cleanly to future metrics.
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
                <MetricChip label="Overall uptime (30d)" value="99.92%" tone="good" />
                <MetricChip label="Open incidents" value="0" tone="good" />
                <MetricChip label="Apps in good standing" value="5 / 6" tone="warn" />
            </div>

            <p className="mt-3 text-[0.7rem] text-slate-400">
                Later, this card can pull from a metrics store (CloudWatch, Grafana,
                etc.) and incident tracker instead of static values.
            </p>
        </div>
    );
}

function MetricChip({
    label,
    value,
    tone,
}: {
    label: string;
    value: string;
    tone: "good" | "warn" | "bad";
}) {
    let bg = "bg-slate-900";
    let ring = "ring-slate-700";
    let text = "text-slate-100";

    if (tone === "good") {
        bg = "bg-emerald-500/10";
        ring = "ring-emerald-500/60";
        text = "text-emerald-200";
    } else if (tone === "warn") {
        bg = "bg-amber-500/10";
        ring = "ring-amber-500/60";
        text = "text-amber-200";
    } else if (tone === "bad") {
        bg = "bg-rose-500/10";
        ring = "ring-rose-500/60";
        text = "text-rose-200";
    }

    return (
        <div
            className={`flex flex-col justify-between rounded-xl ${bg} px-3 py-3 ring-1 ${ring}`}
        >
            <p className="text-[0.7rem] text-slate-300">{label}</p>
            <p className={`mt-1 text-base font-semibold ${text}`}>{value}</p>
        </div>
    );
}

/* ---------- Right card: app health snapshot from /api/health/apps ---------- */

function AppHealthSnapshotCard(props: {
    state: AppsHealthState;
    onRefresh: () => void;
}) {
    const { state, onRefresh } = props;

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
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
                        . This is the same feed powering Dev Workbench.
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

            {state.status === "loading" && (
                <p className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
                    Loading app health snapshot…
                </p>
            )}

            {state.status === "error" && (
                <div className="rounded-xl border border-amber-500/60 bg-amber-950/40 px-3 py-3 text-[0.85rem] text-amber-50">
                    <p className="font-semibold">Health data unavailable.</p>
                    <p className="mt-1 text-[0.8rem]">{state.message}</p>
                    <p className="mt-2 text-[0.75rem] text-amber-100/90">
                        Try hitting{" "}
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem]">
                            /api/health/apps
                        </code>{" "}
                        directly in the browser or Insomnia/Kong to debug.
                    </p>
                </div>
            )}

            {state.status === "ready" && (
                <div>
                    <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                        {state.entries.map((entry) => (
                            <li key={entry.id} className="flex items-start gap-2">
                                <span className="mt-[0.1rem] text-xs">
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
                    <p className="mt-3 text-[0.7rem] text-slate-400">
                        Snapshot timestamp: {state.timestamp}. Later, incidents and latency
                        charts can sit alongside this list.
                    </p>
                </div>
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

/* ---------- Extra placeholders so the page feels complete ---------- */

function IncidentsPlaceholderCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Incidents & risk (future)
            </p>
            <p className="mt-1 text-sm text-slate-200">
                Slot reserved for a small incidents timeline – even if it&apos;s just a
                list of &quot;stuff that went wrong&quot; with links to Dev Workbench
                or GitHub.
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.85rem] text-slate-300">
                <li>• Track incident date, blast radius, and root cause.</li>
                <li>• Map each incident back to an app or service.</li>
                <li>• Allow quick jump to the relevant logs or PR.</li>
            </ul>
            <p className="mt-3 text-[0.7rem] text-slate-400">
                For now this is just copy, but it pins the design so we don&apos;t lose
                the idea.
            </p>
        </div>
    );
}

function LatencyPlaceholderCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Latency & usage (future)
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
            <p className="mt-3 text-[0.7rem] text-slate-400">
                No real metrics yet, but the card keeps a parking spot for when the
                data is ready.
            </p>
        </div>
    );
}