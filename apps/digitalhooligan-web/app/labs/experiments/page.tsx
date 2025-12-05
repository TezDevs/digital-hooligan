// apps/digitalhooligan-web/app/labs/experiments/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

type ExperimentStatus = "idea" | "planned" | "running" | "completed" | "paused";

type Experiment = {
    id: string;
    appId: string | null; // null = cross-portfolio / global
    title: string;
    summary: string;
    status: ExperimentStatus;
    impact: "low" | "medium" | "high";
    createdAt: string; // ISO string
    updatedAt: string;
    tags?: string[];
};

const STATUS_LABEL: Record<ExperimentStatus, string> = {
    idea: "Idea",
    planned: "Planned",
    running: "Running",
    completed: "Completed",
    paused: "Paused",
};

const STATUS_ORDER: ExperimentStatus[] = [
    "running",
    "planned",
    "idea",
    "completed",
    "paused",
];

const IMPACT_LABEL: Record<Experiment["impact"], string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
};

// Starter seed – these are illustrative, we can evolve them any time.
const SEED_EXPERIMENTS: Experiment[] = [
    {
        id: "pennywize-ai-summary-v0",
        appId: "pennywize",
        title: "AI-powered stock summary for PennyWize watchlist",
        summary:
            "Use /api/ai/app-summary/pennywize to generate a short briefing for the current PennyWize watchlist, then surface it in CEO or Labs views.",
        status: "idea",
        impact: "high",
        createdAt: "2025-12-04T12:00:00.000Z",
        updatedAt: "2025-12-04T12:00:00.000Z",
        tags: ["ai", "summary", "pennywize"],
    },
    {
        id: "dropsignal-drop-alert-tuning",
        appId: "dropsignal",
        title: "Tune alert sensitivity for DropSignal",
        summary:
            "Experiment with different threshold presets for price-drop alerts (aggressive vs. conservative) and see which feels best for sneaker drops.",
        status: "planned",
        impact: "medium",
        createdAt: "2025-12-03T18:30:00.000Z",
        updatedAt: "2025-12-03T19:10:00.000Z",
        tags: ["alerts", "thresholds", "ux"],
    },
    {
        id: "ops-toys-ci-notify",
        appId: "ops-toys",
        title: "CI build notification via Ops Toys",
        summary:
            "Small internal experiment: when a GitHub branch build finishes, send a concise status ping into a future internal channel using Ops Toys.",
        status: "idea",
        impact: "medium",
        createdAt: "2025-12-02T15:00:00.000Z",
        updatedAt: "2025-12-02T15:00:00.000Z",
        tags: ["internal", "ops", "ci"],
    },
    {
        id: "global-ai-suggestions-calibration",
        appId: null,
        title: "Calibrate AI suggestion categories",
        summary:
            "Use /api/ai/suggestions output during real sessions and adjust categories/wording so the CEO overview feels sharp and not noisy.",
        status: "running",
        impact: "high",
        createdAt: "2025-12-04T10:00:00.000Z",
        updatedAt: "2025-12-04T12:20:00.000Z",
        tags: ["ai", "ceo", "suggestions"],
    },
];

export default function LabsExperimentsPage() {
    const [statusFilter, setStatusFilter] = React.useState<ExperimentStatus | "all">(
        "all",
    );
    const [appFilter, setAppFilter] = React.useState<string>("all");
    const [search, setSearch] = React.useState("");

    // Map appId → registry entry for linking
    const registryById = React.useMemo(() => {
        const map = new Map<string, AppRegistryEntry>();
        for (const entry of APP_REGISTRY) {
            map.set(entry.id, entry);
        }
        return map;
    }, []);

    const experiments = React.useMemo(() => {
        let list = [...SEED_EXPERIMENTS];

        if (statusFilter !== "all") {
            list = list.filter((exp) => exp.status === statusFilter);
        }

        if (appFilter !== "all") {
            list = list.filter((exp) => exp.appId === appFilter);
        }

        if (search.trim().length > 0) {
            const q = search.trim().toLowerCase();
            list = list.filter((exp) => {
                const tags = exp.tags?.join(" ") ?? "";
                return (
                    exp.title.toLowerCase().includes(q) ||
                    exp.summary.toLowerCase().includes(q) ||
                    tags.toLowerCase().includes(q)
                );
            });
        }

        list.sort((a, b) => {
            const aIndex = STATUS_ORDER.indexOf(a.status);
            const bIndex = STATUS_ORDER.indexOf(b.status);
            if (aIndex !== bIndex) return aIndex - bIndex;

            return (
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
        });

        return list;
    }, [statusFilter, appFilter, search]);

    const uniqueApps = React.useMemo(() => {
        const ids = Array.from(
            new Set(SEED_EXPERIMENTS.map((exp) => exp.appId).filter(Boolean)),
        ) as string[];
        return ids
            .map((id) => registryById.get(id))
            .filter(Boolean) as AppRegistryEntry[];
    }, [registryById]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header / breadcrumbs */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <Link
                                href="/labs/hq"
                                className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 font-medium text-[0.7rem] text-slate-300 ring-1 ring-slate-700/80 hover:text-emerald-300 hover:ring-emerald-500/70"
                            >
                                <span className="mr-1 text-[0.7rem]">←</span>
                                Labs HQ
                            </Link>
                            <span className="inline-flex items-center rounded-full bg-slate-900/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400 ring-1 ring-slate-800/80">
                                Labs · Experiments
                            </span>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            AI experiment log
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            A lightweight log for experiments across PennyWize, DropSignal,
                            HypeWatch, Ops Toys, and global AI behavior. Today it&apos;s seeded
                            in code; later it can sync with a real store.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right text-[0.75rem] text-slate-400">
                        <p className="max-w-xs text-xs text-slate-400">
                            Future: attach real outcomes, metrics deltas, and notes so you
                            can see which experiments actually moved the needle.
                        </p>
                        <Link
                            href="/ceo/ai-hub"
                            className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-[0.7rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                        >
                            Jump to AI Hub →
                        </Link>
                    </div>
                </div>

                {/* Controls / filters */}
                <section className="mb-6 grid gap-4 md:grid-cols-[minmax(0,2.2fr),minmax(0,1.8fr)]">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Filters
                                </p>
                                <p className="mt-1 text-sm text-slate-200">
                                    {SEED_EXPERIMENTS.length} total experiments ·{" "}
                                    {experiments.length} shown
                                </p>
                            </div>
                            <Link
                                href="/labs/app-registry"
                                className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 text-[0.7rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                            >
                                View app registry →
                            </Link>
                        </div>

                        <div className="grid gap-3 md:grid-cols-3">
                            <div className="md:col-span-1">
                                <label className="mb-1 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Status
                                </label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value as ExperimentStatus | "all")
                                    }
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-emerald-500/70 focus:outline-none focus:ring-1 focus:ring-emerald-500/60"
                                >
                                    <option value="all">All statuses</option>
                                    <option value="running">Running</option>
                                    <option value="planned">Planned</option>
                                    <option value="idea">Idea</option>
                                    <option value="completed">Completed</option>
                                    <option value="paused">Paused</option>
                                </select>
                            </div>

                            <div className="md:col-span-1">
                                <label className="mb-1 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    App / bot
                                </label>
                                <select
                                    value={appFilter}
                                    onChange={(e) => setAppFilter(e.target.value)}
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-emerald-500/70 focus:outline-none focus:ring-1 focus:ring-emerald-500/60"
                                >
                                    <option value="all">All apps</option>
                                    <option value="__global">Global only</option>
                                    {uniqueApps.map((entry) => (
                                        <option key={entry.id} value={entry.id}>
                                            {entry.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-1">
                                <label className="mb-1 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Search
                                </label>
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Title, summary, tag…"
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500/70 focus:outline-none focus:ring-1 focus:ring-emerald-500/60"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-300 shadow-sm shadow-black/40">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            How to use this log
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4">
                            <li>
                                Each card is one experiment: an idea, metric tweak, or AI
                                behavior change you want to track.
                            </li>
                            <li>
                                Today, the log is seeded in code. Later, this page can talk to a
                                DB or even a Notion-like store.
                            </li>
                            <li>
                                Assistants can read this log plus{" "}
                                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.65rem] text-emerald-300">
                                    /api/ai/suggestions
                                </code>{" "}
                                to avoid repeating failed experiments.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Experiment cards */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Experiments
                        </h2>
                        <p className="text-xs text-slate-400">
                            Track what you tried, when, and for which app. Later: outcomes +
                            metrics deltas.
                        </p>
                    </div>

                    {experiments.length === 0 ? (
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-300">
                            No experiments match the current filters. Clear search or select a
                            different status/app.
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {experiments.map((exp) => (
                                <ExperimentCard
                                    key={exp.id}
                                    exp={exp}
                                    registryById={registryById}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

function ExperimentCard({
    exp,
    registryById,
}: {
    exp: Experiment;
    registryById: Map<string, AppRegistryEntry>;
}) {
    const app = exp.appId ? registryById.get(exp.appId) : null;

    const statusLabel = STATUS_LABEL[exp.status];
    const impactLabel = IMPACT_LABEL[exp.impact];

    const statusClasses = getStatusClasses(exp.status);
    const impactClasses = getImpactClasses(exp.impact);

    const created = new Date(exp.createdAt);
    const updated = new Date(exp.updatedAt);

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
                <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                        <h3 className="text-sm font-semibold text-slate-50">
                            {exp.title}
                        </h3>
                        <span
                            className={`rounded-full px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] ${statusClasses}`}
                        >
                            {statusLabel}
                        </span>
                    </div>
                    <p className="mt-1 text-[0.75rem] text-slate-300 line-clamp-3">
                        {exp.summary}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-1 text-[0.65rem] text-slate-400">
                    <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] ${impactClasses}`}
                    >
                        Impact: {impactLabel}
                    </span>
                    <span className="text-[0.65rem] text-slate-500">
                        Updated:{" "}
                        {updated.toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-300">
                {app ? (
                    <>
                        <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.7rem] text-slate-200 ring-1 ring-slate-700/70">
                            <span className="mr-1.5 text-sm">
                                {app.icon?.type === "emoji" ? app.icon.value : "⛓"}
                            </span>
                            {app.name}
                        </span>
                        <code className="rounded bg-slate-900 px-2 py-0.5 text-[0.65rem] text-slate-300">
                            appId: {app.id}
                        </code>
                    </>
                ) : (
                    <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.7rem] text-slate-200 ring-1 ring-slate-700/70">
                        🌐 Global / cross-portfolio
                    </span>
                )}
                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.65rem] text-slate-400">
                    Created:{" "}
                    {created.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                    })}
                </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 text-[0.65rem] text-slate-300">
                {exp.tags && exp.tags.length > 0 ? (
                    exp.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-300"
                        >
                            #{tag}
                        </span>
                    ))
                ) : (
                    <span className="text-slate-500">No tags yet.</span>
                )}
            </div>

            {/* Links */}
            <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-[0.7rem] text-slate-300">
                <div className="min-w-0 text-[0.65rem] text-slate-500">
                    <p className="truncate">
                        id:{" "}
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.65rem] text-slate-300">
                            {exp.id}
                        </code>
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {app?.ceoPath && (
                        <Link
                            href={app.ceoPath}
                            className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 text-[0.65rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                        >
                            CEO →
                        </Link>
                    )}
                    {app?.labsPath && (
                        <Link
                            href={app.labsPath}
                            className="rounded-full border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-[0.65rem] text-slate-300 hover:border-emerald-500/60 hover:text-emerald-200"
                        >
                            Labs →
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

function getStatusClasses(status: ExperimentStatus): string {
    switch (status) {
        case "running":
            return "bg-emerald-500/10 text-emerald-200 ring-1 ring-emerald-500/60";
        case "planned":
            return "bg-sky-500/10 text-sky-200 ring-1 ring-sky-500/60";
        case "idea":
            return "bg-slate-900/80 text-slate-200 ring-1 ring-slate-700/70";
        case "completed":
            return "bg-slate-900/80 text-slate-300 ring-1 ring-slate-600/70";
        case "paused":
            return "bg-amber-500/10 text-amber-200 ring-1 ring-amber-500/60";
        default:
            return "bg-slate-900/80 text-slate-200 ring-1 ring-slate-700/70";
    }
}

function getImpactClasses(impact: Experiment["impact"]): string {
    switch (impact) {
        case "high":
            return "bg-emerald-500/10 text-emerald-200 ring-emerald-500/60 ring-1";
        case "medium":
            return "bg-sky-500/10 text-sky-200 ring-sky-500/60 ring-1";
        case "low":
            return "bg-slate-900/80 text-slate-300 ring-slate-700/70 ring-1";
        default:
            return "bg-slate-900/80 text-slate-300 ring-slate-700/70 ring-1";
    }
}