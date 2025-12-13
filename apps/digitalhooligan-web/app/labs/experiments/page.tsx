"use client";

import React from "react";
import Link from "next/link";
import { appRegistry, type AppRegistryEntry, type AppId } from "@/lib/appRegistry";

/* ---------- Types ---------- */

type ExperimentStatus = "idea" | "planned" | "running" | "completed" | "paused";
type ExperimentImpact = "low" | "medium" | "high";

type Experiment = {
    id: string;
    title: string;
    appId: AppId | null; // null = cross-portfolio / infra
    summary: string;
    status: ExperimentStatus;
    impact: ExperimentImpact;
    createdAt: string; // ISO
    updatedAt?: string;
    tags?: string[];
};

/* ---------- Seed data (matches your Labs copy roughly) ---------- */

const SEED_EXPERIMENTS: Experiment[] = [
    {
        id: "exp_pennywize_mvp",
        title: "PennyWize MVP feature list",
        appId: "pennywize" as AppId,
        summary: "Scraper inputs, alert rules, simple UI for first penny-stock testers.",
        status: "running",
        impact: "high",
        createdAt: "2025-12-05T14:00:00.000Z",
        tags: ["pennywize", "mvp", "feed"],
    },
    {
        id: "exp_dropsignal_assist_mode",
        title: "DropSignal assist-mode alerts",
        appId: "dropsignal" as AppId,
        summary: "Assist-mode alerts for sneaker / streetwear drops using external sites.",
        status: "planned",
        impact: "medium",
        createdAt: "2025-12-05T15:30:00.000Z",
        tags: ["dropsignal", "assist-mode"],
    },
    {
        id: "exp_hypewatch_collector_beta",
        title: "HypeWatch collector beta",
        appId: "hypewatch" as AppId,
        summary: "Tiny closed beta for collectible tracking with a handful of friendly testers.",
        status: "idea",
        impact: "medium",
        createdAt: "2025-12-06T11:00:00.000Z",
        tags: ["hypewatch", "beta"],
    },
    {
        id: "exp_ops_toys_first_automation",
        title: "Ops Toys first automation",
        appId: "ops-toys" as AppId,
        summary: "Pick one pain point in dev ops, automate the boring part, and log it here.",
        status: "planned",
        impact: "high",
        createdAt: "2025-12-06T13:15:00.000Z",
        tags: ["ops-toys", "automation"],
    },
];

/* ---------- Labels & helpers ---------- */

const STATUS_LABEL: Record<ExperimentStatus, string> = {
    idea: "Idea",
    planned: "Planned",
    running: "In progress",
    completed: "Completed",
    paused: "Paused",
};

const IMPACT_LABEL: Record<ExperimentImpact, string> = {
    low: "Low impact",
    medium: "Medium impact",
    high: "High impact",
};

function statusClasses(status: ExperimentStatus): string {
    const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium";
    switch (status) {
        case "running":
            return `${base} bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/40`;
        case "planned":
            return `${base} bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/40`;
        case "idea":
            return `${base} bg-slate-600/30 text-slate-200 ring-1 ring-slate-500/50`;
        case "completed":
            return `${base} bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/40`;
        case "paused":
            return `${base} bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/40`;
    }
}

function impactClasses(impact: ExperimentImpact): string {
    const base = "inline-flex items-center rounded-full px-2 py-0.5 text-[0.7rem]";
    switch (impact) {
        case "high":
            return `${base} bg-rose-500/10 text-rose-200 ring-1 ring-rose-500/40`;
        case "medium":
            return `${base} bg-amber-500/10 text-amber-200 ring-1 ring-amber-500/40`;
        case "low":
        default:
            return `${base} bg-slate-600/40 text-slate-200 ring-1 ring-slate-500/40`;
    }
}

/* ---------- Page ---------- */

export default function LabsExperimentsPage() {
    const [statusFilter, setStatusFilter] = React.useState<ExperimentStatus | "all">("all");
    const [appFilter, setAppFilter] = React.useState<AppId | "all">("all");
    const [search, setSearch] = React.useState("");

    // Map app id -> registry entry for quick lookup
    const registryById = React.useMemo(() => {
        const map = new Map<AppId, AppRegistryEntry>();
        for (const entry of appRegistry as AppRegistryEntry[]) {
            map.set(entry.id as AppId, entry);
        }
        return map;
    }, []);

    const experiments = React.useMemo(() => {
        return SEED_EXPERIMENTS.filter((exp) => {
            if (statusFilter !== "all" && exp.status !== statusFilter) return false;
            if (appFilter !== "all" && exp.appId !== appFilter) return false;

            if (search.trim().length > 0) {
                const q = search.trim().toLowerCase();
                const app = exp.appId ? registryById.get(exp.appId as AppId) : null;
                const haystack = [
                    exp.title,
                    exp.summary,
                    app?.name ?? "",
                    app?.shortName ?? "",
                    (exp.tags ?? []).join(" "),
                ]
                    .join(" ")
                    .toLowerCase();

                if (!haystack.includes(q)) return false;
            }

            return true;
        });
    }, [statusFilter, appFilter, search, registryById]);

    const appOptions = React.useMemo(() => {
        const ids = new Set<string>();
        SEED_EXPERIMENTS.forEach((exp) => {
            if (exp.appId) ids.add(exp.appId);
        });
        return Array.from(ids);
    }, []);

    const lastUpdated = React.useMemo(() => {
        const dates = SEED_EXPERIMENTS.map((exp) => exp.updatedAt ?? exp.createdAt);
        const latest = dates.sort().at(-1);
        return latest ? new Date(latest).toISOString() : null;
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header / breadcrumbs */}
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="mb-1 text-[0.75rem] uppercase tracking-[0.18em] text-slate-500">
                            Labs &gt; Experiments
                        </p>
                        <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
                            Experiments by app
                        </h1>
                        <p className="mt-1 max-w-xl text-sm text-slate-400">
                            Where each app or bot sits in the Labs lifecycle. Later this grid can pull real status from
                            a Labs DB and link directly into app-specific dashboards.
                        </p>
                    </div>

                    <Link
                        href="/ceo/labs-hq"
                        className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900"
                    >
                        ← Back to Labs HQ
                    </Link>
                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-3">
                        <div className="flex flex-col text-[0.7rem] text-slate-400">
                            <span className="mb-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                                Status
                            </span>
                            <select
                                className="rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1 text-[0.8rem] text-slate-100"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value as ExperimentStatus | "all")
                                }
                            >
                                <option value="all">All</option>
                                <option value="idea">Idea</option>
                                <option value="planned">Planned</option>
                                <option value="running">In progress</option>
                                <option value="completed">Completed</option>
                                <option value="paused">Paused</option>
                            </select>
                        </div>

                        <div className="flex flex-col text-[0.7rem] text-slate-400">
                            <span className="mb-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                                App
                            </span>
                            <select
                                className="rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1 text-[0.8rem] text-slate-100"
                                value={appFilter}
                                onChange={(e) => setAppFilter(e.target.value as AppId | "all")}
                            >
                                <option value="all">All apps</option>
                                {appOptions.map((id) => {
                                    const app = registryById.get(id as AppId);
                                    return (
                                        <option key={id} value={id}>
                                            {app?.name ?? id}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                            Search
                        </label>
                        <input
                            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-500"
                            placeholder="Filter by experiment, app, or tag…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Experiments list */}
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
                    <div className="border-b border-slate-800 px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
                        Experiments ({experiments.length})
                    </div>

                    {experiments.length === 0 ? (
                        <div className="px-4 py-6 text-sm text-slate-400">
                            No experiments match the current filters yet. Adjust filters or add a new experiment.
                        </div>
                    ) : (
                        <ul className="divide-y divide-slate-800/90">
                            {experiments.map((exp) => {
                                const app = exp.appId ? registryById.get(exp.appId as AppId) : null;

                                return (
                                    <li key={exp.id} className="px-4 py-3">
                                        <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="text-sm font-medium text-slate-50">
                                                        {exp.title}
                                                    </span>
                                                    <span className={statusClasses(exp.status)}>
                                                        {STATUS_LABEL[exp.status]}
                                                    </span>
                                                    <span className={impactClasses(exp.impact)}>
                                                        {IMPACT_LABEL[exp.impact]}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-[0.8rem] text-slate-300">
                                                    {exp.summary}
                                                </p>
                                                <div className="mt-1 flex flex-wrap gap-2 text-[0.7rem] text-slate-400">
                                                    {app && (
                                                        <span>
                                                            App:{" "}
                                                            <span className="text-slate-200">
                                                                {app.name} ({app.id})
                                                            </span>
                                                        </span>
                                                    )}
                                                    {exp.tags && exp.tags.length > 0 && (
                                                        <span>
                                                            Tags:{" "}
                                                            <span className="text-slate-300">
                                                                {exp.tags.join(", ")}
                                                            </span>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <div className="border-t border-slate-800 px-4 py-2 text-[0.7rem] text-slate-500">
                        Snapshot timestamp:{" "}
                        {lastUpdated ? lastUpdated : "not tracked yet. (Mock data)"}
                    </div>
                </div>
            </div>
        </main>
    );
}