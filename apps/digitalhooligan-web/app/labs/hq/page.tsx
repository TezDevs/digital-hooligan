// apps/digitalhooligan-web/app/labs/hq/page.tsx

"use client";

import React from "react";
import Link from "next/link";

/**
 * Local mirror of /api/apps/registry response.
 * Keeps Labs HQ decoupled from server-only types.
 */

type AppsRegistryEntry = {
    id: string;
    name: string;
    kind: string;
    lifecycle: string;
    marketingPath?: string | null;
    ceoPath?: string | null;
    labsPath?: string | null;
    metricsKeys?: string[] | null;
};

type AppsRegistrySummary = {
    total: number;
    byKind: Record<string, number>;
    byLifecycle: Record<string, number>;
    internal?: number;
    external?: number;
    bots?: number;

};

type AppsRegistryResponse = {
    ok: true;
    type: "apps_registry";
    apps: AppsRegistryEntry[];
    summary: AppsRegistrySummary;
    timestamp: string;
};

/**
 * Filters are shared across the "ready" state and components.
 * Pulling them out into their own alias avoids indexing into the union type.
 */
type AppsRegistryFilters = {
    kind: "all" | "public-app" | "internal-tool";
    lifecycle: "all" | string;
};

type AppsRegistryState =
    | { status: "loading" }
    | { status: "error"; message: string }
    | {
        status: "ready";
        data: AppsRegistryResponse;
        filteredApps: AppsRegistryEntry[];
        filters: AppsRegistryFilters;
    };

type AppsReadyState = Extract<AppsRegistryState, { status: "ready" }>;

export default function LabsHqPage() {
    const [appsState, setAppsState] = React.useState<AppsRegistryState>({
        status: "loading",
    });

    React.useEffect(() => {
        void loadRegistry();
    }, []);

    async function loadRegistry() {
        setAppsState({ status: "loading" });

        try {
            const res = await fetch("/api/apps/registry");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as AppsRegistryResponse;

            const filters: AppsRegistryFilters = {
                kind: "all",
                lifecycle: "all",
            };

            setAppsState({
                status: "ready",
                data,
                filters,
                filteredApps: applyFilters(data.apps, filters),
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/apps/registry.";
            setAppsState({ status: "error", message });
        }
    }

    function updateFilters(next: AppsRegistryFilters) {
        setAppsState((prev) => {
            if (prev.status !== "ready") return prev;

            const filtered = applyFilters(prev.data.apps, next);

            return {
                ...prev,
                filters: next,
                filteredApps: filtered,
            };
        });
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            Hooligan Labs HQ
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Internal R&amp;D home for experiments, app ideas, and wiring
                            status. The registry browser below is the source of truth for what
                            exists under Digital Hooligan.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-300">
                        <span className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-300 ring-1 ring-emerald-500/70">
                            Mode: labs / registry
                        </span>
                        <Link
                            href="/ceo"
                            className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[0.75rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                        >
                            ← Back to CEO dashboard
                        </Link>
                    </div>
                </div>

                {/* Layout: registry browser + experiments/backlog */}
                <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)]">
                    <RegistryBrowserCard
                        state={appsState}
                        onRefresh={() => void loadRegistry()}
                        onChangeFilters={updateFilters}
                    />
                    <LabsSideColumn />
                </section>
            </div>
        </main>
    );
}

/* ---------- Helpers ---------- */

function applyFilters(
    apps: AppsRegistryEntry[],
    filters: AppsRegistryFilters,
): AppsRegistryEntry[] {
    return apps.filter((app) => {
        if (filters.kind !== "all" && app.kind !== filters.kind) {
            return false;
        }

        if (
            filters.lifecycle !== "all" &&
            app.lifecycle !== filters.lifecycle
        ) {
            return false;
        }

        return true;
    });
}

/* ---------- Registry browser card ---------- */

function RegistryBrowserCard(props: {
    state: AppsRegistryState;
    onRefresh: () => void;
    onChangeFilters: (next: AppsRegistryFilters) => void;
}) {
    const { state, onRefresh, onChangeFilters } = props;

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Apps registry browser
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                        Live view of{" "}
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                            APP_REGISTRY
                        </code>{" "}
                        via{" "}
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                            /api/apps/registry
                        </code>
                        . Use this to answer “what exists?” before you add new apps.
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
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
                    Loading registry snapshot…
                </div>
            )}

            {state.status === "error" && (
                <div className="rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.85rem] text-rose-100">
                    <p className="font-semibold">Couldn&apos;t load registry.</p>
                    <p className="mt-1 text-[0.8rem]">{state.message}</p>
                    <p className="mt-2 text-[0.75rem] text-rose-100/90">
                        Hit{" "}
                        <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                            /api/apps/registry
                        </code>{" "}
                        directly in your browser or Insomnia/Kong to debug the payload.
                    </p>
                </div>
            )}

            {state.status === "ready" && (
                <>
                    <RegistrySummaryRow state={state} />
                    <RegistryFilters state={state} onChangeFilters={onChangeFilters} />
                    <RegistryTable state={state} />
                    <p className="mt-3 text-[0.7rem] text-slate-400">
                        This table is intentionally simple: it&apos;s a direct reflection of{" "}
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                            APP_REGISTRY
                        </code>{" "}
                        and the registry endpoint. Any new app should show up here first,
                        then in CEO + AI views.
                    </p>
                </>
            )}
        </div>
    );
}

function RegistrySummaryRow({ state }: { state: AppsReadyState }) {
    // Be defensive: if data/summary aren’t ready yet, don’t crash the page.
    const summary = state?.data?.summary;

    if (!summary) {
        return null;
    }

    return (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="font-medium text-slate-50">
                        {summary.total} apps
                    </span>
                </span>

                {typeof summary.internal === "number" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-1 text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                        <span className="font-mono text-[0.7rem]">
                            {summary.internal} internal
                        </span>
                    </span>
                )}

                {typeof summary.external === "number" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-1 text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        <span className="font-mono text-[0.7rem]">
                            {summary.external} external
                        </span>
                    </span>
                )}

                {typeof summary.bots === "number" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-1 text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                        <span className="font-mono text-[0.7rem]">
                            {summary.bots} bots
                        </span>
                    </span>
                )}
            </div>

            <div className="text-[0.7rem] text-slate-500">
                <span className="font-mono text-slate-400">
                    Labs registry snapshot
                </span>
            </div>
        </div>
    );
}

function RegistryFilters(props: {
    state: AppsReadyState;
    onChangeFilters: (next: AppsRegistryFilters) => void;
}) {
    const { state, onChangeFilters } = props;
    const { filters, data } = state;

    // All lifecycle info lives under data.summary.byLifecycle
    const summary = data?.summary;
    const byLifecycle = summary?.byLifecycle;

    // Guard against missing data when Labs HQ is loading or partially populated.
    if (!summary || !byLifecycle) {
        return null;
    }

    const lifecycleOptions = [
        "all",
        ...Object.keys(byLifecycle).sort(),
    ];

    return (
        <div className="mb-3 flex flex-wrap items-center gap-3 text-[0.8rem]">
            <div className="flex items-center gap-1.5">
                <span className="text-[0.75rem] text-slate-300">Kind:</span>
                <select
                    value={filters.kind}
                    onChange={(event) =>
                        onChangeFilters({
                            ...filters,
                            kind: event.target.value as AppsRegistryFilters["kind"],
                        })
                    }
                    className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[0.8rem] text-slate-100"
                >
                    <option value="all">All</option>
                    <option value="public-app">Public apps</option>
                    <option value="internal-tool">Internal tools</option>
                </select>
            </div>

            <div className="flex items-center gap-1.5">
                <span className="text-[0.75rem] text-slate-300">Lifecycle:</span>
                <select
                    value={filters.lifecycle}
                    onChange={(event) =>
                        onChangeFilters({
                            ...filters,
                            lifecycle: event.target.value,
                        })
                    }
                    className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[0.8rem] text-slate-100"
                >
                    {lifecycleOptions.map((value) => (
                        <option key={value} value={value}>
                            {value === "all" ? "All" : value}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

function RegistryTable({ state }: { state: AppsReadyState }) {
    const { filteredApps } = state;

    if (filteredApps.length === 0) {
        return (
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.8rem] text-slate-300">
                No apps match the current filters yet. Try switching kind or lifecycle.
            </div>
        );
    }

    return (
        <div className="max-h-64 overflow-auto rounded-xl border border-slate-800 bg-slate-950/80">
            <table className="min-w-full text-left text-[0.8rem]">
                <thead className="sticky top-0 bg-slate-950">
                    <tr className="border-b border-slate-800 text-[0.75rem] text-slate-400">
                        <th className="px-3 py-2 font-medium">Name</th>
                        <th className="px-3 py-2 font-medium">Kind</th>
                        <th className="px-3 py-2 font-medium">Lifecycle</th>
                        <th className="px-3 py-2 font-medium">CEO / Labs</th>
                        <th className="px-3 py-2 font-medium">Marketing</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredApps.map((app) => (
                        <tr
                            key={app.id}
                            className="border-b border-slate-800/70 last:border-b-0"
                        >
                            <td className="px-3 py-2 align-top">
                                <div className="flex flex-col">
                                    <span className="font-medium text-slate-100">
                                        {app.name}
                                    </span>
                                    <span className="text-[0.7rem] text-slate-400">
                                        {app.id}
                                    </span>
                                </div>
                            </td>
                            <td className="px-3 py-2 align-top text-[0.75rem] text-slate-300">
                                {app.kind}
                            </td>
                            <td className="px-3 py-2 align-top text-[0.75rem] text-slate-300">
                                {app.lifecycle}
                            </td>
                            <td className="px-3 py-2 align-top text-[0.75rem]">
                                <div className="flex flex-col gap-1">
                                    {app.ceoPath ? (
                                        <span className="text-emerald-200">
                                            CEO:{" "}
                                            <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem]">
                                                {app.ceoPath}
                                            </code>
                                        </span>
                                    ) : (
                                        <span className="text-slate-400">CEO: none yet</span>
                                    )}
                                    {app.labsPath ? (
                                        <span className="text-sky-200">
                                            Labs:{" "}
                                            <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem]">
                                                {app.labsPath}
                                            </code>
                                        </span>
                                    ) : (
                                        <span className="text-slate-400">Labs: none yet</span>
                                    )}
                                </div>
                            </td>
                            <td className="px-3 py-2 align-top text-[0.75rem]">
                                {app.marketingPath ? (
                                    <span className="text-slate-200">
                                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem]">
                                            {app.marketingPath}
                                        </code>
                                    </span>
                                ) : app.kind === "public-app" ? (
                                    <span className="text-amber-200">
                                        No marketing route yet
                                    </span>
                                ) : (
                                    <span className="text-slate-500">Internal-only</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ---------- Side column: experiments + backlog (static for now) ---------- */

function LabsSideColumn() {
    return (
        <div className="flex flex-col gap-4">
            <ExperimentsCard />
            <IdeaBacklogCard />
        </div>
    );
}

function ExperimentsCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Active experiments
            </p>
            <p className="mt-1 text-sm text-slate-200">
                High-signal experiments you&apos;re running inside Labs right now.
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                <li>
                    • CEO dashboard + AI Hub wiring as the internal command center.
                </li>
                <li>
                    • Early mock flows for PennyWize, DropSignal, and HypeWatch
                    assist-mode.
                </li>
                <li>
                    • Dev Workbench diagnostics + health endpoints to keep wiring honest.
                </li>
            </ul>
            <p className="mt-3 text-[0.7rem] text-slate-400">
                Later this card can read from a Labs experiments table or an internal
                /labs API.
            </p>
        </div>
    );
}

function IdeaBacklogCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Idea backlog
            </p>
            <p className="mt-1 text-sm text-slate-200">
                Parking spot for ideas that might turn into real registry entries
                later.
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                <li>• Small AI dev assistant inside Dev Workbench.</li>
                <li>• Labs-only &quot;playground&quot; app for scraping / ETL toys.</li>
                <li>• Tiny “dropbot” for tracking 1–3 personal watch items.</li>
            </ul>
            <p className="mt-3 text-[0.7rem] text-slate-400">
                Once you have a simple backing store for Labs, this card can show real
                backlog items and link directly into app registry entries.
            </p>
        </div>
    );
}