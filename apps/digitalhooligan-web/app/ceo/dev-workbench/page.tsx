// apps/digitalhooligan-web/app/ceo/dev-workbench/page.tsx

"use client";

import React from "react";
import Link from "next/link";

/**
 * Local copies of the health types used by the diagnostics panel.
 * These mirror /api/health/ai and /api/health/apps.
 */

type AiEndpointStatus = "ok" | "missing" | "planned";

type AiEndpointHealth = {
    id: string;
    path: string;
    description: string;
    status: AiEndpointStatus;
};

type AiHealthResponse = {
    ok: true;
    type: "ai_routes_health";
    endpoints: AiEndpointHealth[];
    timestamp: string;
};

type AiHealthState =
    | { status: "loading" }
    | { status: "ready"; data: AiHealthResponse }
    | { status: "error"; message: string };

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

export default function DevWorkbenchPage() {
    const [aiHealth, setAiHealth] = React.useState<AiHealthState>({
        status: "loading",
    });
    const [appsHealth, setAppsHealth] = React.useState<AppsHealthState>({
        status: "loading",
    });

    React.useEffect(() => {
        void loadAiHealth();
        void loadAppsHealth();
    }, []);

    async function loadAiHealth() {
        setAiHealth({ status: "loading" });

        try {
            const res = await fetch("/api/health/ai");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as AiHealthResponse;
            setAiHealth({ status: "ready", data });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/health/ai.";
            setAiHealth({ status: "error", message });
        }
    }

    async function loadAppsHealth() {
        setAppsHealth({ status: "loading" });

        try {
            const res = await fetch("/api/health/apps");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as AppsHealthResponse;

            const good = data.apps.filter((a) => a.status === "good").length;
            const needsWiring = data.apps.filter(
                (a) => a.status === "needs_wiring",
            ).length;
            const ideaOnly = data.apps.filter((a) => a.status === "idea_only").length;

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
                            Dev Workbench
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Internal view for branch work, diagnostics, and future AI
                            assistants that help you ship without getting lost in wiring.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-300">
                        <span className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-300 ring-1 ring-emerald-500/70">
                            Mode: diagnostics prototype
                        </span>
                    </div>
                </div>

                {/* CEO tabs row */}
                <nav className="mb-6 overflow-x-auto">
                    <div className="flex gap-2 text-sm">
                        <CeoTab href="/ceo" label="Overview" />
                        <CeoTab href="/ceo/tasks" label="Tasks" />
                        <CeoTab href="/ceo/deals" label="Deals" />
                        <CeoTab href="/ceo/finance" label="Finance" />
                        <CeoTab href="/ceo/performance" label="Performance" />
                        <CeoTab href="/ceo/ai-hub" label="AI Hub" />
                        <CeoTab href="/ceo/dev-workbench" label="Dev WB" active />
                        <CeoTab href="/ceo/settings" label="Settings" />
                        <CeoTab href="/ceo/logout" label="Logout" />
                    </div>
                </nav>

                {/* Layout: diagnostics + notes */}
                <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr),minmax(0,1.1fr)]">
                    <DevDiagnosticsCard
                        aiState={aiHealth}
                        appsState={appsHealth}
                        onRefreshAi={() => void loadAiHealth()}
                        onRefreshApps={() => void loadAppsHealth()}
                    />
                    <DevNotesCard />
                </section>
            </div>
        </main>
    );
}

/* ---------- Shared tab + basic components ---------- */

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

/* ---------- Main diagnostics card ---------- */

function DevDiagnosticsCard(props: {
    aiState: AiHealthState;
    appsState: AppsHealthState;
    onRefreshAi: () => void;
    onRefreshApps: () => void;
}) {
    const { aiState, appsState, onRefreshAi, onRefreshApps } = props;

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Health diagnostics
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                        Quick snapshot of AI routes and app registry wiring, pulled straight
                        from the health endpoints. Use this before you assume a bug is in
                        your code.
                    </p>
                </div>
                <div className="flex flex-col items-end gap-2 text-[0.75rem]">
                    <button
                        type="button"
                        onClick={onRefreshAi}
                        className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                    >
                        Refresh AI
                    </button>
                    <button
                        type="button"
                        onClick={onRefreshApps}
                        className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                    >
                        Refresh apps
                    </button>
                </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
                <DiagnosticsAiCard state={aiState} />
                <DiagnosticsAppsCard state={appsState} />
            </div>

            <p className="mt-3 text-[0.7rem] text-slate-400">
                Both sections are backed by the same endpoints used elsewhere:{" "}
                <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                    /api/health/ai
                </code>{" "}
                and{" "}
                <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                    /api/health/apps
                </code>
                . When in doubt, hit them directly in your browser or Insomnia/Kong.
            </p>
        </div>
    );
}

function DiagnosticsAiCard({ state }: { state: AiHealthState }) {
    if (state.status === "loading") {
        return (
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
                Checking AI routes…
            </div>
        );
    }

    if (state.status === "error") {
        return (
            <div className="rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.85rem] text-rose-100">
                <p className="font-semibold">AI routes health failed.</p>
                <p className="mt-1 text-[0.8rem]">{state.message}</p>
                <p className="mt-2 text-[0.75rem] text-rose-100/90">
                    Hit{" "}
                    <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                        /api/health/ai
                    </code>{" "}
                    directly to debug.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2 text-[0.85rem]">
            <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    AI routes
                </p>
                <span className="text-[0.7rem] text-slate-400">
                    {state.data.endpoints.length} endpoints
                </span>
            </div>
            <div className="space-y-1.5">
                {state.data.endpoints.map((endpoint) => (
                    <div
                        key={endpoint.id}
                        className="rounded-lg border border-slate-800 bg-slate-950/90 px-2 py-1.5"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-[0.8rem] font-medium text-slate-100">
                                    {endpoint.id}
                                </p>
                                <p className="text-[0.7rem] text-slate-400">
                                    {endpoint.path}
                                </p>
                            </div>
                            <StatusBadge status={endpoint.status} />
                        </div>
                        <p className="mt-0.5 text-[0.75rem] text-slate-300">
                            {endpoint.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DiagnosticsAppsCard({ state }: { state: AppsHealthState }) {
    if (state.status === "loading") {
        return (
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
                Counting apps from the registry…
            </div>
        );
    }

    if (state.status === "error") {
        return (
            <div className="rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.85rem] text-rose-100">
                <p className="font-semibold">Apps health failed.</p>
                <p className="mt-1 text-[0.8rem]">{state.message}</p>
                <p className="mt-2 text-[0.75rem] text-rose-100/90">
                    Hit{" "}
                    <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                        /api/health/apps
                    </code>{" "}
                    directly to debug.
                </p>
            </div>
        );
    }

    const { counts, data } = state;

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2 text-[0.85rem]">
            <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Apps registry
                </p>
                <span className="text-[0.7rem] text-slate-400">
                    {counts.total} total
                </span>
            </div>

            <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[0.7rem]">
                <AppsHealthChip status="good" value={counts.good} label="Good" />
                <AppsHealthChip
                    status="needs_wiring"
                    value={counts.needsWiring}
                    label="Needs wiring"
                />
                <AppsHealthChip
                    status="idea_only"
                    value={counts.ideaOnly}
                    label="Idea-only"
                />
            </div>

            <div className="max-h-44 space-y-1.5 overflow-auto pr-1 text-[0.8rem]">
                {data.apps.map((app) => (
                    <div
                        key={app.id}
                        className="rounded-lg border border-slate-800 bg-slate-950/90 px-2 py-1.5"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="font-medium text-slate-100">
                                    {app.name}{" "}
                                    <span className="text-[0.7rem] text-slate-400">
                                        ({app.id})
                                    </span>
                                </p>
                                <p className="text-[0.7rem] text-slate-400">
                                    {app.kind} · lifecycle: {app.lifecycle}
                                </p>
                            </div>
                            <AppHealthBadge status={app.status} />
                        </div>
                        {app.missing.length > 0 && (
                            <p className="mt-0.5 text-[0.75rem] text-slate-300">
                                Missing:{" "}
                                {app.missing
                                    .map((key) => `"${key}"`)
                                    .join(", ")}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ---------- Status badges + chips ---------- */

function StatusBadge({ status }: { status: AiEndpointStatus }) {
    const base =
        "inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] font-medium ring-1";

    let tone =
        "bg-slate-900/80 text-slate-300 ring-slate-700/80";
    let label: string = status;

    if (status === "ok") {
        tone =
            "bg-emerald-500/10 text-emerald-200 ring-emerald-500/60";
        label = "OK";
    } else if (status === "planned") {
        tone =
            "bg-amber-500/10 text-amber-200 ring-amber-500/60";
        label = "Planned";
    } else if (status === "missing") {
        tone =
            "bg-rose-500/10 text-rose-200 ring-rose-500/60";
        label = "Missing";
    }

    return <span className={base + " " + tone}>{label}</span>;
}

function AppHealthBadge({ status }: { status: AppHealthStatus }) {
    const base =
        "inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] font-medium ring-1";

    let tone =
        "bg-slate-900/80 text-slate-300 ring-slate-700/80";
    let label: string;

    if (status === "good") {
        tone =
            "bg-emerald-500/10 text-emerald-200 ring-emerald-500/60";
        label = "Good";
    } else if (status === "needs_wiring") {
        tone =
            "bg-amber-500/10 text-amber-200 ring-amber-500/60";
        label = "Needs wiring";
    } else {
        tone =
            "bg-sky-500/10 text-sky-200 ring-sky-500/60";
        label = "Idea only";
    }

    return <span className={base + " " + tone}>{label}</span>;
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

/* ---------- Right-hand notes card (static for now) ---------- */

function DevNotesCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Dev notes / future wiring
            </p>
            <p className="mt-1 text-sm text-slate-200">
                Space for quick notes about branches, WIP features, and where AI
                assistants should plug into your stack.
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                <li>
                    • Next wiring: let Dev Workbench suggest test commands and Insomnia
                    routes based on the current feature branch.
                </li>
                <li>
                    • Later: show CI status, open PRs, and recent deploys here so you can
                    debug from one screen.
                </li>
                <li>
                    • Use the health diagnostics on the left before assuming a bug is in
                    your UI — sometimes it&apos;s just a missing endpoint.
                </li>
            </ul>
        </div>
    );
}