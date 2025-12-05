// apps/digitalhooligan-web/app/ceo/ai-hub/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import type { WeeklyPlanResponse } from "@/app/api/ai/weekly-plan/route";
import type {
    AiHealthResponse,
    AiEndpointStatus,
} from "@/app/api/health/ai/route";

type AiAppSummaryResponse = {
    ok: true;
    type: "ai_app_summary";
    appId: string;
    appName: string;
    headline: string;
    bullets: string[];
    wiringNotes: string[];
    suggestions: string[];
    timestamp: string;
};

type AppSummaryState =
    | { status: "idle"; currentAppId: string }
    | {
        status: "loading";
        currentAppId: string;
    }
    | {
        status: "ready";
        currentAppId: string;
        data: AiAppSummaryResponse;
    }
    | {
        status: "error";
        currentAppId: string;
        message: string;
    };

type WeeklyPlanState =
    | { status: "loading" }
    | { status: "ready"; data: WeeklyPlanResponse }
    | { status: "error"; message: string };

type AiHealthState =
    | { status: "loading" }
    | { status: "ready"; data: AiHealthResponse }
    | { status: "error"; message: string };

const DEFAULT_APP_ID = "pennywize";

export default function CeoAiHubPage() {
    const [summaryState, setSummaryState] = React.useState<AppSummaryState>({
        status: "idle",
        currentAppId: DEFAULT_APP_ID,
    });

    const [weeklyPlanState, setWeeklyPlanState] =
        React.useState<WeeklyPlanState>({
            status: "loading",
        });

    const [aiHealthState, setAiHealthState] = React.useState<AiHealthState>({
        status: "loading",
    });

    async function loadAppSummary(appId: string) {
        setSummaryState({
            status: "loading",
            currentAppId: appId,
        });

        try {
            const res = await fetch(
                `/api/ai/app-summary?appId=${encodeURIComponent(appId)}`,
            );
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as AiAppSummaryResponse;
            setSummaryState({
                status: "ready",
                currentAppId: appId,
                data,
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/ai/app-summary.";
            setSummaryState({
                status: "error",
                currentAppId: appId,
                message,
            });
        }
    }

    async function loadWeeklyPlan() {
        setWeeklyPlanState({ status: "loading" });

        try {
            const res = await fetch("/api/ai/weekly-plan");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as WeeklyPlanResponse;
            setWeeklyPlanState({ status: "ready", data });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/ai/weekly-plan.";
            setWeeklyPlanState({ status: "error", message });
        }
    }

    async function loadAiHealth() {
        setAiHealthState({ status: "loading" });

        try {
            const res = await fetch("/api/health/ai");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as AiHealthResponse;
            setAiHealthState({ status: "ready", data });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/health/ai.";
            setAiHealthState({ status: "error", message });
        }
    }

    React.useEffect(() => {
        void loadAppSummary(DEFAULT_APP_ID);
        void loadWeeklyPlan();
        void loadAiHealth();
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            AI Hub
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Internal assistants that sit on top of your own wiring. No magic:
                            just typed JSON from the CEO and Labs endpoints, with views built
                            so you can upgrade to real LLMs later.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-300">
                        <span className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-300 ring-1 ring-emerald-500/70">
                            Mode: assistant mockups
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
                        <CeoTab href="/ceo/ai-hub" label="AI Hub" active />
                        <CeoTab href="/ceo/dev-workbench" label="Dev WB" />
                        <CeoTab href="/ceo/settings" label="Settings" />
                        <CeoTab href="/ceo/logout" label="Logout" />
                    </div>
                </nav>

                {/* Layout: app summary on the left, weekly plan on the right */}
                <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1.2fr)]">
                    <AppSummaryAssistant
                        state={summaryState}
                        onAppChange={(appId) => void loadAppSummary(appId)}
                    />
                    <WeeklyPlanAssistant
                        state={weeklyPlanState}
                        onRefresh={() => void loadWeeklyPlan()}
                    />
                </section>

                {/* AI endpoints health below assistants */}
                <section className="mt-4">
                    <AiHealthCard
                        state={aiHealthState}
                        onRefresh={() => void loadAiHealth()}
                    />
                </section>

                <p className="mt-6 text-[0.7rem] text-slate-400">
                    All of this is intentionally simple and mocked. The important part is
                    the wiring: everything runs through internal APIs like{" "}
                    <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                        /api/ai/app-summary
                    </code>
                    ,{" "}
                    <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                        /api/ai/weekly-plan
                    </code>{" "}
                    and{" "}
                    <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                        /api/health/ai
                    </code>
                    , which you can later back with real probes and LLM calls.
                </p>
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

function AppSummaryAssistant({
    state,
    onAppChange,
}: {
    state: AppSummaryState;
    onAppChange: (appId: string) => void;
}) {
    const currentAppId = state.currentAppId;

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        App summary assistant
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                        Quick narrative of one app at a time so you can remember what it
                        does, how wired it is, and what to do next.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-[0.8rem]">
                    <label className="text-[0.75rem] text-slate-300" htmlFor="ai-app">
                        Focus app:
                    </label>
                    <select
                        id="ai-app"
                        value={currentAppId}
                        onChange={(event) => onAppChange(event.target.value)}
                        className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[0.8rem] text-slate-100"
                    >
                        <option value="pennywize">PennyWize</option>
                        <option value="dropsignal">DropSignal</option>
                        <option value="hypewatch">HypeWatch</option>
                        <option value="ops-toys">Ops Toys</option>
                    </select>
                </div>
            </div>

            {state.status === "loading" && (
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
                    Summarising app wiring and next moves…
                </div>
            )}

            {state.status === "error" && (
                <div className="rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.85rem] text-rose-100">
                    <p className="font-semibold">Couldn&apos;t load app summary.</p>
                    <p className="mt-1 text-[0.8rem]">{state.message}</p>
                    <p className="mt-2 text-[0.75rem] text-rose-100/90">
                        Hit{" "}
                        <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                            /api/ai/app-summary?appId={currentAppId}
                        </code>{" "}
                        directly in browser or Insomnia to debug the payload.
                    </p>
                </div>
            )}

            {state.status === "ready" && (
                <>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Headline
                    </p>
                    <p className="mt-1 text-sm text-slate-50">
                        {state.data.headline}
                    </p>

                    {state.data.bullets.length > 0 && (
                        <div className="mt-3">
                            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                What this app is trying to do
                            </p>
                            <ul className="mt-1 space-y-1.5 list-disc pl-4 text-[0.85rem]">
                                {state.data.bullets.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {state.data.wiringNotes.length > 0 && (
                        <div className="mt-3">
                            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Wiring snapshot
                            </p>
                            <ul className="mt-1 space-y-1.5 list-disc pl-4 text-[0.85rem]">
                                {state.data.wiringNotes.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {state.data.suggestions.length > 0 && (
                        <div className="mt-3">
                            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Suggested next moves
                            </p>
                            <ul className="mt-1 space-y-1.5 list-disc pl-4 text-[0.85rem]">
                                {state.data.suggestions.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <p className="mt-3 text-[0.7rem] text-slate-400">
                        Source of truth:{" "}
                        <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                            /api/ai/app-summary?appId={currentAppId}
                        </code>
                        . Last updated:{" "}
                        <span className="text-slate-300">
                            {new Date(state.data.timestamp).toLocaleString()}
                        </span>
                        .
                    </p>
                </>
            )}

            {state.status === "idle" && (
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
                    Pick an app to summarise and the assistant will pull from its
                    registry entry and health data.
                </div>
            )}
        </div>
    );
}

function WeeklyPlanAssistant({
    state,
    onRefresh,
}: {
    state: WeeklyPlanState;
    onRefresh: () => void;
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Weekly plan assistant
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                        One calm suggestion for the week that stitches together product,
                        gov, admin, infra, and Labs work.
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
                    Pulling together a weekly plan…
                </div>
            )}

            {state.status === "error" && (
                <div className="rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.85rem] text-rose-100">
                    <p className="font-semibold">Weekly plan assistant failed.</p>
                    <p className="mt-1 text-[0.8rem]">{state.message}</p>
                    <p className="mt-2 text-[0.75rem] text-rose-100/90">
                        Hit{" "}
                        <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                            /api/ai/weekly-plan
                        </code>{" "}
                        directly to debug the payload.
                    </p>
                </div>
            )}

            {state.status === "ready" && (
                <>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Headline
                    </p>
                    <p className="mt-1 text-sm text-slate-50">
                        {state.data.headline}
                    </p>
                    <p className="mt-1 text-[0.8rem] text-slate-300">
                        Timeframe: {state.data.timeframeLabel}
                    </p>

                    {state.data.suggestedFocus.length > 0 && (
                        <div className="mt-3">
                            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                If you only did three things…
                            </p>
                            <ul className="mt-1 space-y-1.5 list-disc pl-4 text-[0.85rem]">
                                {state.data.suggestedFocus.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-3 space-y-2">
                        {state.data.sections.map((section) => (
                            <div
                                key={section.id}
                                className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2 text-[0.85rem]"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <p className="font-medium text-slate-100">
                                            {section.title}
                                        </p>
                                        <p className="mt-0.5 text-[0.75rem] text-slate-400">
                                            {section.summary}
                                        </p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-300">
                                        {section.area.toUpperCase()}
                                    </span>
                                </div>
                                {section.items.length > 0 && (
                                    <ul className="mt-1 space-y-1.5 list-disc pl-4 text-[0.8rem]">
                                        {section.items.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    <p className="mt-3 text-[0.7rem] text-slate-400">
                        Source of truth:{" "}
                        <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                            /api/ai/weekly-plan
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
    );
}

function AiHealthCard({
    state,
    onRefresh,
}: {
    state: AiHealthState;
    onRefresh: () => void;
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        AI endpoints health
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                        Quick readout of which AI-related routes are live, planned, or
                        missing so Dev Workbench and future agents aren&apos;t guessing.
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
                    Checking AI routes…
                </div>
            )}

            {state.status === "error" && (
                <div className="rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.85rem] text-rose-100">
                    <p className="font-semibold">Couldn&apos;t load AI routes health.</p>
                    <p className="mt-1 text-[0.8rem]">{state.message}</p>
                    <p className="mt-2 text-[0.75rem] text-rose-100/90">
                        Hit{" "}
                        <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                            /api/health/ai
                        </code>{" "}
                        directly in browser or Insomnia to debug the payload.
                    </p>
                </div>
            )}

            {state.status === "ready" && (
                <>
                    <div className="grid gap-3 md:grid-cols-3">
                        {state.data.endpoints.map((endpoint) => (
                            <div
                                key={endpoint.id}
                                className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2 text-[0.8rem]"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <p className="font-medium text-slate-100">
                                            {endpoint.id}
                                        </p>
                                        <p className="mt-0.5 text-[0.7rem] text-slate-400">
                                            {endpoint.path}
                                        </p>
                                    </div>
                                    <StatusBadge status={endpoint.status} />
                                </div>
                                <p className="mt-1 text-[0.75rem] text-slate-300">
                                    {endpoint.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-3 text-[0.7rem] text-slate-400">
                        Source of truth:{" "}
                        <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                            /api/health/ai
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
    );
}

function StatusBadge({ status }: { status: AiEndpointStatus }) {
    const base =
        "inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] font-medium ring-1";

    let tone =
        "bg-slate-900/80 text-slate-300 ring-slate-700/80";
    // make label a generic string, seeded with the raw status
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