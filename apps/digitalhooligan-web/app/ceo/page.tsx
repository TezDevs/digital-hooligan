// apps/digitalhooligan-web/app/ceo/page.tsx

"use client";

import React from "react";
import Link from "next/link";

type HealthResponse = {
    ok: boolean;
    status: string;
    service: string;
    timestamp: string;
    checks: {
        appRegistry: {
            ok: boolean;
            totalEntries: number;
        };
        apiVersions: {
            apps: string;
            ai: string;
        };
    };
};

type SuggestionPriority = "high" | "medium" | "low";
type SuggestionCategory =
    | "go-to-market"
    | "product-shaping"
    | "stability"
    | "internal-tools"
    | "experiments"
    | "discovery";

type Suggestion = {
    id: string;
    appId: string | null;
    title: string;
    description: string;
    priority: SuggestionPriority;
    category: SuggestionCategory;
};

type SuggestionsResponse = {
    ok: true;
    generatedAt: string;
    totalSuggestions: number;
    suggestions: Suggestion[];
};

/**
 * Simpler state shape = no TypeScript union headaches.
 */
type AiStripState = {
    status: "idle" | "loading" | "ready" | "error";
    health: HealthResponse | null;
    suggestions: SuggestionsResponse | null;
};

export default function CeoOverviewPage() {
    const [aiState, setAiState] = React.useState<AiStripState>({
        status: "idle",
        health: null,
        suggestions: null,
    });

    React.useEffect(() => {
        let isCancelled = false;

        async function load() {
            // just set a plain loading state; no spreading unions
            setAiState({
                status: "loading",
                health: null,
                suggestions: null,
            });

            try {
                const [healthRes, suggestionsRes] = await Promise.all([
                    fetch("/api/health"),
                    fetch("/api/ai/suggestions"),
                ]);

                if (!healthRes.ok || !suggestionsRes.ok) {
                    throw new Error("One or more AI endpoints returned a non-200 status");
                }

                const healthJson = (await healthRes.json()) as HealthResponse;
                const suggestionsJson =
                    (await suggestionsRes.json()) as SuggestionsResponse;

                if (isCancelled) return;

                setAiState({
                    status: "ready",
                    health: healthJson,
                    suggestions: suggestionsJson,
                });
            } catch (err) {
                console.error("Failed to load AI strip data:", err);
                if (isCancelled) return;
                setAiState({
                    status: "error",
                    health: null,
                    suggestions: null,
                });
            }
        }

        load();

        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Top header */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            CEO dashboard
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            One place to see money, products, deals, and app health across
                            Digital Hooligan. Now with a small AI “brain” that watches your
                            registry and suggests what to work on next.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-[0.75rem] text-slate-300">
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-300 ring-1 ring-emerald-500/60">
                            <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-400" />
                            Today: systems nominal
                        </span>
                    </div>
                </div>

                {/* Tab row restored */}
                <nav className="mb-6 overflow-x-auto">
                    <div className="flex gap-2 text-sm">
                        <CeoTab href="/ceo" label="Overview" active />
                        <CeoTab href="/ceo/tasks" label="Tasks" />
                        <CeoTab href="/ceo/deals" label="Deals" />
                        <CeoTab href="/ceo/finance" label="Finance" />
                        <CeoTab href="/ceo/performance" label="Performance" />
                        <CeoTab href="/ceo/ai-hub" label="AI Hub" />
                        <CeoTab href="/ceo/dev-workbench" label="Dev WB" />
                        <CeoTab href="/ceo/settings" label="Settings" />
                        <CeoTab href="/ceo/logout" label="Logout" />
                    </div>
                </nav>

                {/* Snapshot row – simple placeholders for now */}
                <section className="mb-6 grid gap-4 md:grid-cols-4">
                    <SnapshotCard
                        label="Money"
                        value="$0"
                        hint="Revenue wiring comes later"
                    />
                    <SnapshotCard
                        label="Products"
                        value="Registry-driven"
                        hint="See apps & bots in Labs"
                    />
                    <SnapshotCard
                        label="Deals"
                        value="0"
                        hint="Future gov + freelance pipeline"
                    />
                    <SnapshotCard
                        label="App performance"
                        value="Mock"
                        hint="Real metrics wire in later"
                    />
                </section>

                {/* AI summary strip */}
                <AiSummaryStrip aiState={aiState} />
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
            <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-900 px-3 py-1.5 text-xs font-semibold">
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

function SnapshotCard(props: { label: string; value: string; hint?: string }) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 shadow-sm shadow-black/40">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                {props.label}
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-50">{props.value}</p>
            {props.hint && (
                <p className="mt-1 text-xs text-slate-400/90">{props.hint}</p>
            )}
        </div>
    );
}

function AiSummaryStrip({ aiState }: { aiState: AiStripState }) {
    if (aiState.status === "loading" || aiState.status === "idle") {
        return (
            <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            AI quick brain
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                            Warming up… fetching health and suggestion signals.
                        </p>
                    </div>
                    <div className="h-2 w-24 animate-pulse rounded-full bg-slate-700/60" />
                </div>
            </section>
        );
    }

    if (aiState.status === "error" || !aiState.health || !aiState.suggestions) {
        return (
            <section className="mb-8 rounded-2xl border border-rose-700/60 bg-rose-950/40 p-4 shadow-sm shadow-black/40">
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-100">
                            AI quick brain
                        </h2>
                        <p className="mt-1 text-xs text-rose-100/80">
                            Couldn&apos;t reach AI endpoints right now. The dashboard is fine,
                            but the assistant won&apos;t have fresh signals until this is
                            resolved.
                        </p>
                    </div>
                    <Link
                        href="/ceo/ai-hub"
                        className="rounded-full border border-rose-500/70 bg-rose-500/10 px-3 py-1.5 text-[0.7rem] font-medium text-rose-100 hover:bg-rose-500/20"
                    >
                        Debug in AI Hub →
                    </Link>
                </div>
            </section>
        );
    }

    // status === "ready" and we have data
    const { health, suggestions } = aiState;

    const totalApps = health.checks.appRegistry.totalEntries;
    const totalSuggestions = suggestions.totalSuggestions;

    const highPriority = suggestions.suggestions.filter(
        (s) => s.priority === "high",
    );
    const topThree = highPriority.slice(0, 3);

    return (
        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
            <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                        AI quick brain
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                        Tiny assistant layer on top of your app registry and mock metrics.
                        Full control lives in the AI Hub; this is just the snapshot.
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2 text-[0.7rem]">
                    <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-slate-200 ring-1 ring-slate-700/70">
                        <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-400" />
                        {health.status === "healthy"
                            ? "AI surface online"
                            : "AI surface degraded"}
                    </span>
                    <Link
                        href="/ceo/ai-hub"
                        className="inline-flex items-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1.5 font-medium text-emerald-200 hover:bg-emerald-500/20"
                    >
                        Open AI Hub →
                    </Link>
                </div>
            </div>

            {/* Chips row */}
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-200">
                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 ring-1 ring-slate-700/70">
                    <span className="mr-1.5 text-xs">📦</span>
                    {totalApps} app{totalApps === 1 ? "" : "s"} in registry
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 ring-1 ring-slate-700/70">
                    <span className="mr-1.5 text-xs">💡</span>
                    {totalSuggestions} suggestion
                    {totalSuggestions === 1 ? "" : "s"} in AI queue
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 ring-1 ring-emerald-500/60">
                    <span className="mr-1.5 text-xs">🔥</span>
                    {highPriority.length} high-priority item
                    {highPriority.length === 1 ? "" : "s"}
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 ring-1 ring-slate-700/70">
                    <span className="mr-1.5 text-xs">⏱</span>
                    Snapshot as of{" "}
                    {new Date(health.timestamp).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>

            {/* Top suggestions list */}
            <div className="mt-2 space-y-1.5 text-[0.75rem] text-slate-200">
                {topThree.length === 0 ? (
                    <p className="text-[0.75rem] text-slate-400">
                        No high-priority items detected yet. Once your registry and metrics
                        evolve, this strip will highlight the sharpest next moves.
                    </p>
                ) : (
                    topThree.map((s) => (
                        <div
                            key={s.id}
                            className="flex items-start gap-2 rounded-xl bg-slate-950/90 px-3 py-2"
                        >
                            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[0.7rem] text-emerald-300 ring-1 ring-emerald-500/60">
                                {s.appId ? "App" : "Global"}
                            </span>
                            <div>
                                <p className="text-[0.75rem] font-medium text-slate-100">
                                    {s.title}
                                    {s.appId && (
                                        <span className="ml-1.5 rounded-full bg-slate-900/90 px-1.5 py-0.5 text-[0.65rem] text-slate-300">
                                            app: {s.appId}
                                        </span>
                                    )}
                                </p>
                                <p className="mt-0.5 text-[0.7rem] text-slate-300">
                                    {s.description}
                                </p>
                                <p className="mt-0.5 text-[0.65rem] text-slate-500">
                                    Priority: {s.priority} · Category: {s.category}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}