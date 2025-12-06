// apps/digitalhooligan-web/app/ceo/dev-workbench/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import type {
    AppHealthEntry,
    AppHealthStatus,
    AppsHealthResponse,
} from "@/app/api/health/apps/route";

/**
 * Local mirror of /api/ai/app-summary response.
 */
type AiAppSummaryResponse = {
    ok: true;
    type: "ai_app_summary";
    appId: string;
    appName: string;
    headline: string;
    bullets: string[];
    suggestions: string[];
    timestamp: string;
};

type AiSummaryState =
    | { status: "idle"; appId: string }
    | { status: "loading"; appId: string }
    | {
        status: "ready";
        appId: string;
        data: AiAppSummaryResponse;
    }
    | { status: "error"; appId: string; message: string };

const DEFAULT_APP_ID = "pennywize";

/**
 * Health state wiring for /api/health/apps
 */

type AppsHealthState =
    | { status: "loading" }
    | { status: "ready"; entries: AppHealthEntry[]; timestamp: string }
    | { status: "error"; message: string };

export default function DevWorkbenchPage() {
    const [summaryState, setSummaryState] = React.useState<AiSummaryState>({
        status: "idle",
        appId: DEFAULT_APP_ID,
    });

    const [inputAppId, setInputAppId] = React.useState<string>(DEFAULT_APP_ID);

    const [healthState, setHealthState] = React.useState<AppsHealthState>({
        status: "loading",
    });

    // Load health snapshot once on mount.
    React.useEffect(() => {
        void loadHealthSnapshot();
    }, []);

    async function loadHealthSnapshot() {
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

    async function runSummary(appId: string) {
        if (!appId.trim()) {
            return;
        }

        const cleaned = appId.trim();
        setSummaryState({ status: "loading", appId: cleaned });

        try {
            const params = new URLSearchParams({ appId: cleaned });
            const res = await fetch(`/api/ai/app-summary?${params.toString()}`);

            if (!res.ok) {
                throw new Error(`AI summary API returned ${res.status}`);
            }

            const data = (await res.json()) as AiAppSummaryResponse;

            setSummaryState({
                status: "ready",
                appId: cleaned,
                data,
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error calling /api/ai/app-summary.";
            setSummaryState({
                status: "error",
                appId: cleaned,
                message,
            });
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <header className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            Dev Workbench
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Internal console for wiring checks, health endpoints, and now a
                            tiny AI helper that can read summaries for any app id.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-300">
                        <span className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-300 ring-1 ring-emerald-500/70">
                            Mode: dev / diagnostics
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
                        <CeoTab href="/ceo/performance" label="Performance" />
                        <CeoTab href="/ceo/ai-hub" label="AI Hub" />
                        <CeoTab href="/ceo/dev-workbench" label="Dev WB" active />
                        <CeoTab href="/ceo/settings" label="Settings" />
                        <CeoTab href="/ceo/logout" label="Logout" />
                    </div>
                </nav>

                {/* Layout: left = status panels, right = AI helper + notes */}
                <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)]">
                    <DevStatusColumn
                        healthState={healthState}
                        onRefreshHealth={() => void loadHealthSnapshot()}
                    />
                    <DevAiColumn
                        summaryState={summaryState}
                        inputAppId={inputAppId}
                        onChangeInput={setInputAppId}
                        onRunSummary={() => void runSummary(inputAppId)}
                        onRerun={() => void runSummary(summaryState.appId)}
                    />
                </section>
            </div>
        </main>
    );
}

/* ---------- Shared tab component ---------- */

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

/* ---------- Left column: status + wiring notes (now backed by health API) ---------- */

function DevStatusColumn(props: {
    healthState: AppsHealthState;
    onRefreshHealth: () => void;
}) {
    const { healthState, onRefreshHealth } = props;

    return (
        <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
                <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Systems snapshot
                        </p>
                        <p className="mt-1 text-sm text-slate-200">
                            High-level readout of how the Digital Hooligan stack is doing,
                            now backed by{" "}
                            <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                                /api/health/apps
                            </code>
                            .
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onRefreshHealth}
                        className="inline-flex items-center self-start rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[0.75rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                    >
                        Refresh
                    </button>
                </div>

                {healthState.status === "loading" && (
                    <p className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
                        Loading app health snapshot…
                    </p>
                )}

                {healthState.status === "error" && (
                    <div className="rounded-xl border border-amber-500/60 bg-amber-950/40 px-3 py-3 text-[0.85rem] text-amber-50">
                        <p className="font-semibold">Health API unavailable.</p>
                        <p className="mt-1 text-[0.8rem]">{healthState.message}</p>
                        <p className="mt-2 text-[0.75rem] text-amber-100/90">
                            Hit{" "}
                            <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem]">
                                /api/health/apps
                            </code>{" "}
                            directly in the browser or Insomnia/Kong to debug.
                        </p>
                    </div>
                )}

                {healthState.status === "ready" && (
                    <div>
                        <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                            {healthState.entries.map((entry) => (
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
                            Snapshot timestamp: {healthState.timestamp}. Later this can be
                            driven by real checks (pings, error rates, queue depth) instead of
                            mocks.
                        </p>
                    </div>
                )}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Dev wiring checklist
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.85rem]">
                    <li>• Can hit /api/apps/registry from browser + Insomnia/Kong.</li>
                    <li>• Can hit /api/ai/app-summary?appId=pennywize.</li>
                    <li>• Can hit /api/health/apps and see per-app status.</li>
                    <li>• CEO → Labs → AI Hub paths working in local + Vercel.</li>
                    <li>• Feature branches pushing clean previews before merge.</li>
                </ul>
                <p className="mt-3 text-[0.7rem] text-slate-400">
                    Later: tie each checklist item to automated checks or CI jobs that
                    report into this view.
                </p>
            </div>
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

/* ---------- Right column: Dev AI helper ---------- */

function DevAiColumn(props: {
    summaryState: AiSummaryState;
    inputAppId: string;
    onChangeInput: (value: string) => void;
    onRunSummary: () => void;
    onRerun: () => void;
}) {
    const { summaryState, inputAppId, onChangeInput, onRunSummary, onRerun } =
        props;

    const hasRun =
        summaryState.status === "ready" || summaryState.status === "error";

    return (
        <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
                <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Dev assistant (AI)
                        </p>
                        <p className="mt-1 text-sm text-slate-200">
                            Tiny helper that hits{" "}
                            <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                                /api/ai/app-summary
                            </code>{" "}
                            for any app id. Use this as a scratch pad while you shape the
                            summary contract and assistant behavior.
                        </p>
                    </div>
                    <div className="flex flex-col items-stretch gap-2 self-start text-[0.75rem] md:flex-row md:items-center">
                        <label className="flex items-center gap-1.5">
                            <span className="text-[0.7rem] text-slate-300">appId:</span>
                            <input
                                type="text"
                                value={inputAppId}
                                onChange={(event) => onChangeInput(event.target.value)}
                                className="w-36 rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[0.8rem] text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70"
                                placeholder="pennywize"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={onRunSummary}
                            className="inline-flex items-center justify-center rounded-full border border-emerald-500/70 bg-emerald-500/10 px-3 py-1 text-[0.75rem] font-medium text-emerald-200 hover:bg-emerald-500/20"
                        >
                            Run summary
                        </button>
                        {hasRun && (
                            <button
                                type="button"
                                onClick={onRerun}
                                className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[0.75rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                            >
                                Rerun last
                            </button>
                        )}
                    </div>
                </div>

                {summaryState.status === "idle" && (
                    <p className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
                        Enter an app id and hit <span className="font-semibold">Run</span>{" "}
                        to see what the AI summary endpoint returns. Great for tweaking the
                        response shape before wiring into other assistants.
                    </p>
                )}

                {summaryState.status === "loading" && (
                    <p className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
                        Calling{" "}
                        <code className="bg-slate-900 px-1 py-0.5 text-[0.7rem]">
                            /api/ai/app-summary
                        </code>{" "}
                        for{" "}
                        <span className="font-semibold">{summaryState.appId}</span>…
                    </p>
                )}

                {summaryState.status === "error" && (
                    <div className="rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.85rem] text-rose-100">
                        <p className="font-semibold">
                            Error calling AI summary for {summaryState.appId}.
                        </p>
                        <p className="mt-1 text-[0.8rem]">{summaryState.message}</p>
                        <p className="mt-2 text-[0.75rem] text-rose-100/90">
                            Hit{" "}
                            <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                                /api/ai/app-summary?appId={summaryState.appId}
                            </code>{" "}
                            directly in the browser or Insomnia/Kong to debug.
                        </p>
                    </div>
                )}

                {summaryState.status === "ready" && (
                    <div className="space-y-3">
                        <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-3 text-[0.9rem]">
                            <p className="text-[0.8rem] font-semibold text-emerald-200">
                                {summaryState.data.headline}
                            </p>
                            {summaryState.data.bullets?.length > 0 && (
                                <ul className="mt-2 space-y-1.5 text-[0.85rem] text-slate-200">
                                    {summaryState.data.bullets.map((item, index) => (
                                        <li key={index}>• {item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {summaryState.data.suggestions?.length > 0 && (
                            <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-3 text-[0.85rem]">
                                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    Suggested next moves
                                </p>
                                <ul className="mt-2 space-y-1.5">
                                    {summaryState.data.suggestions.map((item, index) => (
                                        <li key={index}>• {item}</li>
                                    ))}
                                </ul>
                                <p className="mt-2 text-[0.7rem] text-slate-400">
                                    Later, Dev Workbench can turn these into buttons that trigger
                                    test runs, API checks, or GitHub actions.
                                </p>
                            </div>
                        )}

                        <p className="text-[0.7rem] text-slate-400">
                            Timestamp: {summaryState.data.timestamp}. You can copy/paste this
                            payload or inspect it in the network tab while you iterate on the
                            endpoint design.
                        </p>
                    </div>
                )}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Notes for future Dev AI
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.85rem]">
                    <li>• Let the assistant see recent build + deploy logs.</li>
                    <li>• Wire in /api/health/* so it can point at failing services.</li>
                    <li>• Let it open GitHub branches/PR links directly from here.</li>
                    <li>• Eventually, let it draft PR descriptions or test plans.</li>
                </ul>
                <p className="mt-3 text-[0.7rem] text-slate-400">
                    For now, this column is just text, but it keeps the roadmap visible
                    while you build the plumbing.
                </p>
            </div>
        </div>
    );
}