// apps/digitalhooligan-web/app/ceo/ai-hub/page.tsx

"use client";

import React from "react";
import Link from "next/link";

/**
 * Local mirror of /api/ai/app-summary response.
 * If the backend adds extra fields, they are simply ignored on the client.
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
    | { status: "loading"; appId: string }
    | {
        status: "ready";
        appId: string;
        data: AiAppSummaryResponse;
    }
    | { status: "error"; appId: string; message: string };

const DEFAULT_APP_ID = "pennywize";

export default function AiHubPage() {
    const [summaryState, setSummaryState] = React.useState<AiSummaryState>({
        status: "loading",
        appId: DEFAULT_APP_ID,
    });

    React.useEffect(() => {
        void loadSummary(DEFAULT_APP_ID);
    }, []);

    async function loadSummary(appId: string) {
        setSummaryState({ status: "loading", appId });

        try {
            const params = new URLSearchParams({ appId });
            const res = await fetch(`/api/ai/app-summary?${params.toString()}`);

            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as AiAppSummaryResponse;

            setSummaryState({
                status: "ready",
                appId,
                data,
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error calling /api/ai/app-summary.";
            setSummaryState({
                status: "error",
                appId,
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
                            AI Hub
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Internal AI surface for wiring summaries, assistant hints, and
                            future copilots that sit on top of your apps, deals, and health
                            feeds.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-300">
                        <span className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-300 ring-1 ring-emerald-500/70">
                            Mode: assist preview
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
                        <CeoTab href="/ceo/ai-hub" label="AI Hub" active />
                        <CeoTab href="/ceo/dev-workbench" label="Dev WB" />
                        <CeoTab href="/ceo/settings" label="Settings" />
                        <CeoTab href="/ceo/logout" label="Logout" />
                    </div>
                </nav>

                {/* Layout: app insight + wiring notes */}
                <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)]">
                    <AppInsightCard
                        state={summaryState}
                        onRefresh={() => void loadSummary(DEFAULT_APP_ID)}
                    />
                    <AiWiringNotesCard />
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

/* ---------- App insight card (AI) ---------- */

function AppInsightCard(props: {
    state: AiSummaryState;
    onRefresh: () => void;
}) {
    const { state, onRefresh } = props;

    const appLabel =
        state.status === "ready"
            ? `${state.data.appName} (${state.data.appId})`
            : state.appId;

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        App insight (AI)
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                        Early assistant-style summary for{" "}
                        <span className="font-semibold text-emerald-200">
                            {appLabel}
                        </span>{" "}
                        pulled from{" "}
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                            /api/ai/app-summary
                        </code>
                        . Later, this is how a CEO copilot and Labs assistants get their
                        briefings.
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
                    Calling <code className="bg-slate-900 px-1 py-0.5 text-[0.7rem]">
                        /api/ai/app-summary
                    </code>{" "}
                    for {state.appId}…
                </div>
            )}

            {state.status === "error" && (
                <div className="rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.85rem] text-rose-100">
                    <p className="font-semibold">
                        Couldn&apos;t load AI summary for {state.appId}.
                    </p>
                    <p className="mt-1 text-[0.8rem]">{state.message}</p>
                    <p className="mt-2 text-[0.75rem] text-rose-100/90">
                        Hit{" "}
                        <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                            /api/ai/app-summary?appId={state.appId}
                        </code>{" "}
                        directly in your browser or Insomnia/Kong to debug the payload.
                    </p>
                </div>
            )}

            {state.status === "ready" && (
                <div className="space-y-3">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-3 text-[0.9rem]">
                        <p className="text-[0.8rem] font-semibold text-emerald-200">
                            {state.data.headline}
                        </p>
                        {state.data.bullets?.length > 0 && (
                            <ul className="mt-2 space-y-1.5 text-[0.85rem] text-slate-200">
                                {state.data.bullets.map((item, index) => (
                                    <li key={index}>• {item}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {state.data.suggestions?.length > 0 && (
                        <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-3 text-[0.85rem]">
                            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Suggested next moves
                            </p>
                            <ul className="mt-2 space-y-1.5">
                                {state.data.suggestions.map((item, index) => (
                                    <li key={index}>• {item}</li>
                                ))}
                            </ul>
                            <p className="mt-2 text-[0.7rem] text-slate-400">
                                Later this card can trigger tasks, deals, or Dev Workbench
                                nudges directly from these suggestions.
                            </p>
                        </div>
                    )}

                    <p className="text-[0.7rem] text-slate-400">
                        Timestamp: {state.data.timestamp}. This is intentionally a tiny
                        surface — it proves the wiring for future CEO / Labs / Dev WB
                        assistants that all read from the same summary endpoint.
                    </p>
                </div>
            )}
        </div>
    );
}

/* ---------- Side card: wiring notes ---------- */

function AiWiringNotesCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                AI wiring notes
            </p>
            <p className="mt-1 text-sm text-slate-200">
                This column is the design doc in disguise for how your future
                assistants should behave.
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                <li>
                    • <span className="font-semibold">Input:</span> app id +
                    registry/health context from{" "}
                    <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem]">
                        /api/apps/registry
                    </code>{" "}
                    and{" "}
                    <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem]">
                        /api/health/*
                    </code>
                    .
                </li>
                <li>
                    • <span className="font-semibold">Output:</span> headline, bullets,
                    and concrete next moves that map to Tasks, Deals, or Dev Workbench
                    actions.
                </li>
                <li>
                    • <span className="font-semibold">Later:</span> assistants in Dev WB
                    can call the same summary endpoint, plus GitHub + CI, to suggest
                    branch-level work.
                </li>
            </ul>
            <p className="mt-3 text-[0.7rem] text-slate-400">
                Once you&apos;re happy with the endpoint contract, this card can be
                replaced by a real chat-style assistant that reads the same summary and
                lets you respond in natural language.
            </p>
        </div>
    );
}