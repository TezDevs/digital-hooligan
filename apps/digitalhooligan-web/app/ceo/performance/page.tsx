"use client";

import React from "react";
import Link from "next/link";

/* ---------- Types ---------- */

type AppHealthStatus = "ok" | "degraded" | "down";

type StackHealthApp = {
    id: string;
    name: string;
    status: AppHealthStatus;
    note: string;
};

type StackHealthReady = {
    ok: boolean;
    timestamp: string;
    apps: StackHealthApp[];
};

type StackHealthState =
    | { status: "loading" }
    | { status: "ready"; data: StackHealthReady }
    | { status: "error"; message: string };

/* ---------- Page ---------- */

export default function PerformancePage() {
    const [stackState, setStackState] = React.useState<StackHealthState>({
        status: "loading",
    });

    React.useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const res = await fetch("/api/health/stack");
                if (!res.ok) {
                    throw new Error(`Stack health responded with ${res.status}`);
                }

                const data = (await res.json()) as StackHealthReady;

                if (cancelled) return;
                setStackState({ status: "ready", data });
            } catch (err: unknown) {
                if (cancelled) return;
                const message =
                    err instanceof Error
                        ? err.message
                        : "Unexpected error calling /api/health/stack.";
                setStackState({ status: "error", message });
            }
        }

        void load();
        const id = setInterval(() => {
            void load();
        }, 60_000);

        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <header className="mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            Performance
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            High-level health and reliability view across Digital Hooligan
                            apps. Later this can plug into real uptime, latency, and
                            incident feeds.
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

                {/* Main grid:
           - First row: Reliability + App health side-by-side on desktop (lg:grid-cols-2)
           - Second row: Incidents + Latency placeholders
        */}
                <section className="space-y-4">
                    <div className="grid gap-4 lg:grid-cols-2">
                        <ReliabilitySnapshotCard state={stackState} />
                        <AppHealthSnapshotCard state={stackState} />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        <IncidentsFutureCard />
                        <LatencyFutureCard />
                    </div>
                </section>
            </div>
        </main>
    );
}

/* ---------- Shared: CEO tab ---------- */

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

/* ---------- Card: Reliability snapshot ---------- */

function ReliabilitySnapshotCard(props: { state: StackHealthState }) {
    const { state } = props;

    // For now we keep uptime numbers mocked, but color them based on stack ok.
    const uptimeText = "99.92%";
    const period = "Overall uptime (30d)";

    const isOk = state.status === "ready" ? state.data.ok : null;

    let uptimeTone =
        "bg-emerald-500/10 text-emerald-200 ring-emerald-500/70";
    if (isOk === false) {
        uptimeTone = "bg-amber-500/10 text-amber-100 ring-amber-500/80";
    }
    if (isOk === null) {
        uptimeTone =
            "bg-slate-900/80 text-slate-200 ring-slate-700/80";
    }

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Reliability snapshot
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                        Quick read on uptime, stability, and incidents. Numbers are
                        mocked for now, but structure maps cleanly to future metrics.
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[0.75rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                >
                    Refresh
                </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                    <p className="text-[0.7rem] text-slate-400">{period}</p>
                    <div className="mt-1 flex items-baseline justify-between">
                        <p className={`text-xl font-semibold ${uptimeTone.split(" ")[1]}`}>
                            {uptimeText}
                        </p>
                        <span
                            className={[
                                "inline-flex items-center rounded-full px-2 py-0.5 text-[0.7rem] font-medium",
                                "ring-1",
                                uptimeTone,
                            ].join(" ")}
                        >
                            {isOk === null
                                ? "Checking stack…"
                                : isOk
                                    ? "Stack healthy"
                                    : "Attention needed"}
                        </span>
                    </div>
                    <p className="mt-2 text-[0.75rem] text-slate-400">
                        Later, this can pull from a metrics store (CloudWatch, Grafana,
                        etc.) and incident tracker instead of static values.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                    <p className="text-[0.7rem] text-slate-400">Apps in good standing</p>
                    <div className="mt-1 flex items-baseline justify-between">
                        <p className="text-xl font-semibold text-slate-50">
                            {state.status === "ready"
                                ? state.data.apps.filter((a) => a.status === "ok").length
                                : "-"}
                            {state.status === "ready" && (
                                <span className="text-sm text-slate-400">
                                    {" "}
                                    / {state.data.apps.length}
                                </span>
                            )}
                        </p>
                    </div>
                    <p className="mt-2 text-[0.75rem] text-slate-400">
                        Later, this slot can call deeper health endpoints for latency,
                        error rates, and incident counts.
                    </p>
                </div>
            </div>

            {state.status === "ready" && (
                <p className="mt-3 text-[0.7rem] text-slate-500">
                    Snapshot timestamp: {state.data.timestamp}
                </p>
            )}
            {state.status === "loading" && (
                <p className="mt-3 text-[0.7rem] text-slate-500">
                    Loading stack health…
                </p>
            )}
            {state.status === "error" && (
                <p className="mt-3 text-[0.7rem] text-amber-300">
                    Error loading stack health: {state.message}
                </p>
            )}
        </div>
    );
}

/* ---------- Card: App health snapshot ---------- */

function AppHealthSnapshotCard(props: { state: StackHealthState }) {
    const { state } = props;

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        App health snapshot
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                        Per-app view backed by{" "}
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                            /api/health/stack
                        </code>
                        . This is the same feed powering Dev Workbench later.
                    </p>
                </div>
            </div>

            {state.status === "loading" && (
                <p className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
                    Loading app health…
                </p>
            )}

            {state.status === "error" && (
                <div className="rounded-xl border border-amber-500/70 bg-amber-950/40 px-3 py-3 text-[0.85rem] text-amber-50">
                    <p className="font-semibold">Unable to load app health snapshot.</p>
                    <p className="mt-1 text-[0.8rem]">{state.message}</p>
                </div>
            )}

            {state.status === "ready" && (
                <ul className="mt-2 space-y-1.5 text-[0.85rem]">
                    {state.data.apps.map((app, index) => (
                        <li key={app.id ?? String(index)}>
                            <Link
                                href={`/ceo/apps?appId=${encodeURIComponent(app.id)}`}
                                className="flex items-start gap-2 rounded-md px-2 py-1 -mx-2 hover:bg-slate-900/80 transition-colors"
                            >
                                <span className="mt-[0.3rem]">
                                    <StatusDot status={app.status} />
                                </span>
                                <div>
                                    <span className="font-medium text-slate-100">
                                        {app.name}
                                    </span>
                                    <span className="mx-1 text-[0.75rem] text-slate-400">
                                        ({app.id})
                                    </span>
                                    <span className="text-[0.8rem] text-slate-300">
                                        {" "}
                                        {app.note}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
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

/* ---------- Card: Incidents (future) ---------- */

function IncidentsFutureCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Incidents &amp; risk (future)
            </p>
            <p className="mt-1 text-sm text-slate-300">
                Slot reserved for a small incidents timeline — even if it’s just a
                list of “stuff that went wrong” with links to Dev Workbench or
                GitHub.
            </p>
            <ul className="mt-2 space-y-1.5 text-[0.85rem] text-slate-300">
                <li>• Track incident date, blast radius, and root cause.</li>
                <li>• Map each incident back to an app or service.</li>
                <li>• Allow quick jump to the relevant logs or PR.</li>
            </ul>
            <p className="mt-3 text-[0.7rem] text-slate-500">
                For now this is just copy, but it pins the design so you don’t lose
                the idea.
            </p>
        </div>
    );
}

/* ---------- Card: Latency & usage (future) ---------- */

function LatencyFutureCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Latency &amp; usage (future)
            </p>
            <p className="mt-1 text-sm text-slate-300">
                Long-term home for simple charts: requests, p95 latency, or anything
                else that matters to CEO Tez.
            </p>
            <ul className="mt-2 space-y-1.5 text-[0.85rem] text-slate-300">
                <li>• One chart per app or a combined “stack health” view.</li>
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