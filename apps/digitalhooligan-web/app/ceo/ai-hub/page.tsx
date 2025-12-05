// apps/digitalhooligan-web/app/ceo/ai-hub/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

type AppSummaryState =
    | { status: "idle" }
    | { status: "loading"; appId: string }
    | {
        status: "ready";
        appId: string;
        headline: string;
        summary: string;
        tags: string[];
        metrics?: {
            users?: number | null;
            mrr?: number | null;
            uptime?: number | null;
        };
    }
    | { status: "error"; appId: string; message: string };

const LIFECYCLE_ORDER: AppRegistryEntry["lifecycle"][] = [
    "live",
    "beta",
    "alpha",
    "building",
    "design",
    "idea",
    "paused",
];

export default function CeoAiHubPage() {
    const apps = React.useMemo(
        () =>
            [...APP_REGISTRY].sort((a, b) => {
                const aIndex = LIFECYCLE_ORDER.indexOf(a.lifecycle);
                const bIndex = LIFECYCLE_ORDER.indexOf(b.lifecycle);
                if (aIndex !== bIndex) return aIndex - bIndex;
                return a.name.localeCompare(b.name);
            }),
        [],
    );

    const [selectedAppId, setSelectedAppId] = React.useState<string>(
        apps[0]?.id ?? "",
    );

    const [summaryState, setSummaryState] = React.useState<AppSummaryState>({
        status: "idle",
    });

    async function handleGenerateSummary() {
        if (!selectedAppId) return;

        setSummaryState({ status: "loading", appId: selectedAppId });

        try {
            const res = await fetch(`/api/ai/app-summary/${selectedAppId}`);
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = await res.json();

            setSummaryState({
                status: "ready",
                appId: selectedAppId,
                headline: data.headline ?? "High-level briefing",
                summary:
                    data.summary ??
                    "No summary text returned. Check the /api/ai/app-summary route.",
                tags: Array.isArray(data.tags) ? data.tags : [],
                metrics: data.metricsSnapshot ?? {},
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Something went wrong while calling /api/ai/app-summary.";

            setSummaryState({
                status: "error",
                appId: selectedAppId,
                message,
            });
        }
    }

    const selectedApp = apps.find((a) => a.id === selectedAppId) ?? apps[0];

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
                            Central wiring room for AI briefings and suggestions across
                            Digital Hooligan. This panel hits{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">
                                /api/ai/app-summary/[id]
                            </code>{" "}
                            so future assistants (and Insomnia) all share one source of
                            truth.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-300">
                        <Link
                            href="/ceo"
                            className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-slate-200 ring-1 ring-slate-700/80 hover:text-emerald-200 hover:ring-emerald-500/70"
                        >
                            <span className="mr-1 text-xs">←</span>
                            Back to overview
                        </Link>
                    </div>
                </div>

                {/* Tabs row (AI Hub active) */}
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

                {/* Top row: wiring explanation */}
                <section className="mb-6 grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1.7fr)]">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                            AI wiring overview
                        </p>
                        <p className="mt-1 text-sm text-slate-200">
                            Each app or bot gets a summary endpoint that the CEO dashboard,
                            Labs, and assistants can all reuse. No more one-off prompts per
                            screen.
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-xs text-slate-300">
                            <li>
                                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                                    /api/ai/app-summary/[id]
                                </code>{" "}
                                generates a high-level briefing for a single app.
                            </li>
                            <li>
                                CEO pages and Labs can call this directly, or via a future
                                internal assistant.
                            </li>
                            <li>
                                You can hit the same endpoint from{" "}
                                <span className="font-medium">Insomnia / Kong</span> when
                                testing.
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-300 shadow-sm shadow-black/40">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            How assistants will use this
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4">
                            <li>
                                CEO assistant: pull today&apos;s headline and top actions from
                                app summaries + metrics.
                            </li>
                            <li>
                                Labs assistant: look at experiments, registry, and summaries to
                                suggest next builds.
                            </li>
                            <li>
                                Future: per-app tuning (tone, length, risk level) based on
                                metadata in the registry.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Main row: assistant panel + API cheatsheet */}
                <section className="grid gap-4 md:grid-cols-[minmax(0,2.1fr),minmax(0,1.5fr)]">
                    {/* Assistant panel */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <div className="mb-3 flex items-center justify-between gap-2">
                            <div>
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    App briefing assistant
                                </p>
                                <p className="mt-1 text-sm text-slate-200">
                                    Pick an app or bot, then generate a CEO-ready briefing. Under
                                    the hood this calls{" "}
                                    <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                                        /api/ai/app-summary/{`{id}`}
                                    </code>
                                    .
                                </p>
                            </div>
                            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.7rem] text-slate-300 ring-1 ring-slate-700/70">
                                Preview wiring
                            </span>
                        </div>

                        {/* App picker + button */}
                        <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-end">
                            <div className="flex-1">
                                <label className="mb-1 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    App / bot
                                </label>
                                <select
                                    value={selectedAppId}
                                    onChange={(e) => setSelectedAppId(e.target.value)}
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-emerald-500/70 focus:outline-none focus:ring-1 focus:ring-emerald-500/60"
                                >
                                    {apps.map((app) => (
                                        <option key={app.id} value={app.id}>
                                            {app.name} ({app.id})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={handleGenerateSummary}
                                disabled={!selectedAppId || summaryState.status === "loading"}
                                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm shadow-emerald-500/40 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-900/40 disabled:text-emerald-300/60"
                            >
                                {summaryState.status === "loading"
                                    ? "Generating…"
                                    : "Generate CEO briefing"}
                            </button>
                        </div>

                        {/* Selected app meta */}
                        {selectedApp && (
                            <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-300">
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-slate-900/80 text-base">
                                    {selectedApp.icon?.type === "emoji"
                                        ? selectedApp.icon.value
                                        : "⛓"}
                                </span>
                                <span className="font-medium text-slate-100">
                                    {selectedApp.name}
                                </span>
                                <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.16em] text-slate-400">
                                    {selectedApp.lifecycle}
                                </span>
                                {selectedApp.internalOnly ? (
                                    <span className="rounded-full bg-slate-900/90 px-2 py-0.5 text-[0.65rem] text-slate-400">
                                        Internal-only
                                    </span>
                                ) : (
                                    <span className="rounded-full bg-slate-900/90 px-2 py-0.5 text-[0.65rem] text-slate-400">
                                        User-facing
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Summary panel */}
                        <SummaryPanel state={summaryState} />
                    </div>

                    {/* API cheatsheet */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-300 shadow-sm shadow-black/40">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            API cheatsheet (for Insomnia / Kong)
                        </p>

                        <div className="mt-2 space-y-2">
                            <div>
                                <p className="mb-1 text-[0.7rem] font-medium text-slate-300">
                                    1. Basic request
                                </p>
                                <code className="block rounded-lg bg-slate-950 px-3 py-2 text-[0.7rem] text-slate-100">
                                    GET /api/ai/app-summary/pennywize
                                </code>
                                <p className="mt-1 text-[0.7rem] text-slate-400">
                                    In Insomnia: set method to <b>GET</b>, URL to{" "}
                                    <code>http://localhost:3000/api/ai/app-summary/pennywize</code>{" "}
                                    (or change the id).
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-[0.7rem] font-medium text-slate-300">
                                    2. Example response shape
                                </p>
                                <pre className="max-h-40 overflow-auto rounded-lg bg-slate-950 px-3 py-2 text-[0.7rem] text-slate-200">
                                    {`{
  "ok": true,
  "appId": "pennywize",
  "headline": "Quick PennyWize briefing",
  "summary": "Short paragraph about what matters right now…",
  "tags": ["pennywize", "ceo-briefing"],
  "metricsSnapshot": {
    "users": 128,
    "mrr": 4200,
    "uptime": 99.92
  }
}`}
                                </pre>
                            </div>

                            <div>
                                <p className="mb-1 text-[0.7rem] font-medium text-slate-300">
                                    3. Next steps
                                </p>
                                <ul className="space-y-1.5 list-disc pl-4 text-[0.7rem]">
                                    <li>
                                        Add per-app tuning later (tone, length, “spice level”) via
                                        APP_REGISTRY metadata.
                                    </li>
                                    <li>
                                        Let a future CEO assistant call this endpoint for whatever
                                        app is in focus.
                                    </li>
                                    <li>
                                        Mirror this wiring in Labs so experiment outcomes can tweak
                                        the summaries.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
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

function SummaryPanel({ state }: { state: AppSummaryState }) {
    if (state.status === "idle") {
        return (
            <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/70 px-4 py-6 text-[0.8rem] text-slate-400">
                Pick an app and hit{" "}
                <span className="font-semibold text-slate-200">
                    Generate CEO briefing
                </span>{" "}
                to see the output of <code>/api/ai/app-summary/[id]</code>.
            </div>
        );
    }

    if (state.status === "loading") {
        return (
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-6 text-[0.8rem] text-slate-300">
                Generating summary for{" "}
                <span className="font-semibold text-slate-100">{state.appId}</span>…
            </div>
        );
    }

    if (state.status === "error") {
        return (
            <div className="rounded-xl border border-rose-500/60 bg-rose-950/40 px-4 py-4 text-[0.8rem] text-rose-100">
                <p className="font-semibold">Something went wrong.</p>
                <p className="mt-1 text-rose-100/90">
                    Couldn&apos;t load{" "}
                    <code className="rounded bg-rose-900/40 px-1 py-0.5 text-[0.7rem]">
                        /api/ai/app-summary/{state.appId}
                    </code>
                    .
                </p>
                <p className="mt-1 text-[0.75rem] text-rose-100/80">
                    {state.message}
                </p>
            </div>
        );
    }

    // ready
    const { appId, headline, summary, tags, metrics } = state;

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-[0.8rem] text-slate-200">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                        CEO briefing
                    </p>
                    <h2 className="mt-1 text-sm font-semibold text-slate-50">
                        {headline}
                    </h2>
                </div>
                <code className="rounded-full bg-slate-900 px-2.5 py-1 text-[0.65rem] text-slate-300">
                    appId: {appId}
                </code>
            </div>

            <p className="text-[0.8rem] leading-relaxed text-slate-200">{summary}</p>

            {metrics && (
                <div className="mt-3 flex flex-wrap gap-2 text-[0.7rem] text-slate-200">
                    {metrics.users != null && (
                        <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.7rem] ring-1 ring-slate-700/70">
                            <span className="mr-1 text-[0.65rem] uppercase tracking-[0.16em]">
                                Users
                            </span>
                            {metrics.users}
                        </span>
                    )}
                    {metrics.mrr != null && (
                        <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.7rem] ring-1 ring-slate-700/70">
                            <span className="mr-1 text-[0.65rem] uppercase tracking-[0.16em]">
                                MRR
                            </span>
                            ${metrics.mrr}/mo
                        </span>
                    )}
                    {metrics.uptime != null && (
                        <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.7rem] ring-1 ring-slate-700/70">
                            <span className="mr-1 text-[0.65rem] uppercase tracking-[0.16em]">
                                Uptime
                            </span>
                            {metrics.uptime}%
                        </span>
                    )}
                </div>
            )}

            {tags && tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1 text-[0.65rem] text-slate-300">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem]"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}