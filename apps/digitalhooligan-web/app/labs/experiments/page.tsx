"use client";

import React from "react";
import Link from "next/link";
import {
    appRegistry,
    type AppId,
    type AppRegistryEntry,
} from "@/lib/appRegistry";

/* ---------- Types ---------- */

type ExperimentStatus = "idea" | "planned" | "running" | "completed" | "paused";

type ExperimentImpact = "low" | "medium" | "high";

type Experiment = {
    id: string;
    appId: AppId | null; // null = cross-portfolio / global
    title: string;
    summary: string;
    status: ExperimentStatus;
    impact: ExperimentImpact;
    createdAt: string; // ISO string
    updatedAt: string;
    tags?: string[];
};

/* ---------- Static lookup helpers ---------- */

const STATUS_LABEL: Record<ExperimentStatus, string> = {
    idea: "Idea",
    planned: "Planned",
    running: "Running",
    completed: "Completed",
    paused: "Paused",
};

const IMPACT_LABEL: Record<ExperimentImpact, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
};

function getStatusClasses(status: ExperimentStatus): string {
    switch (status) {
        case "idea":
            return "bg-slate-900/80 text-slate-200 ring-slate-700";
        case "planned":
            return "bg-sky-900/60 text-sky-200 ring-sky-700";
        case "running":
            return "bg-emerald-900/60 text-emerald-200 ring-emerald-700";
        case "completed":
            return "bg-emerald-950/80 text-emerald-200 ring-emerald-800";
        case "paused":
            return "bg-amber-950/80 text-amber-200 ring-amber-800";
        default:
            return "bg-slate-900/80 text-slate-200 ring-slate-700";
    }
}

function getImpactClasses(impact: ExperimentImpact): string {
    switch (impact) {
        case "low":
            return "bg-slate-900/80 text-slate-200 ring-slate-700";
        case "medium":
            return "bg-amber-900/70 text-amber-100 ring-amber-700";
        case "high":
            return "bg-rose-900/70 text-rose-100 ring-rose-700";
        default:
            return "bg-slate-900/80 text-slate-200 ring-slate-700";
    }
}

/* ---------- Seed data (draft experiments) ---------- */

const SEED_EXPERIMENTS: Experiment[] = [
    {
        id: "exp_pennywize_mvp_features",
        appId: "pennywize",
        title: "PennyWize MVP feature list",
        summary:
            "Clarify scraper inputs, alert rules, and a simple UI for the first wave of testers.",
        status: "planned",
        impact: "high",
        createdAt: "2025-12-05T12:00:00.000Z",
        updatedAt: "2025-12-06T12:00:00.000Z",
        tags: ["design", "mvp"],
    },
    {
        id: "exp_dropsignal_assist_mode",
        appId: "dropsignal",
        title: "DropSignal assist-mode specs",
        summary:
            "Lock down assist-mode alerts and retailer targets. Design flow for 'add to watch' and 'link out'.",
        status: "idea",
        impact: "medium",
        createdAt: "2025-12-05T15:30:00.000Z",
        updatedAt: "2025-12-06T12:15:00.000Z",
        tags: ["assist-mode", "alerts"],
    },
    {
        id: "exp_hypewatch_collector_beta",
        appId: "hypewatch",
        title: "HypeWatch collector beta",
        summary:
            "Tiny closed beta with a few friendly collectors to validate watchlist and pricing UX.",
        status: "idea",
        impact: "medium",
        createdAt: "2025-12-05T16:00:00.000Z",
        updatedAt: "2025-12-06T12:30:00.000Z",
        tags: ["beta", "collectibles"],
    },
    {
        id: "exp_ops_toys_first_automation",
        appId: "ops-toys",
        title: "Ops Toys: first automation",
        summary:
            "Pick one pain point (logs, branches, or deployments) and build a tiny helper script to smooth it.",
        status: "running",
        impact: "high",
        createdAt: "2025-12-04T10:00:00.000Z",
        updatedAt: "2025-12-06T11:45:00.000Z",
        tags: ["automation", "devops"],
    },
    {
        id: "exp_cross_ceo_contract",
        appId: null,
        title: "Define first CEO copilot data contract",
        summary:
            "Document the inputs/outputs for CEO-facing assistants, including registry, health, and deals feeds.",
        status: "idea",
        impact: "high",
        createdAt: "2025-12-05T18:00:00.000Z",
        updatedAt: "2025-12-06T13:00:00.000Z",
        tags: ["ai", "contracts"],
    },
];

/* ---------- Page component ---------- */

export default function LabsExperimentsPage() {
    const [statusFilter, setStatusFilter] = React.useState<
        ExperimentStatus | "all"
    >("all");
    const [appFilter, setAppFilter] = React.useState<string>("all");
    const [search, setSearch] = React.useState("");

    // Map appId -> registry entry for linking
    const registryById = React.useMemo(() => {
        const map = new Map<AppId, AppRegistryEntry>();
        for (const entry of appRegistry) {
            map.set(entry.id, entry);
        }
        return map;
    }, []);

    const experiments = React.useMemo(() => {
        let list: Experiment[] = [...SEED_EXPERIMENTS];

        if (statusFilter !== "all") {
            list = list.filter((exp) => exp.status === statusFilter);
        }

        if (appFilter !== "all") {
            list = list.filter((exp) => exp.appId === (appFilter as AppId));
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (exp) =>
                    exp.title.toLowerCase().includes(q) ||
                    exp.summary.toLowerCase().includes(q)
            );
        }

        return list;
    }, [statusFilter, appFilter, search]);

    const uniqueApps = React.useMemo(() => {
        const ids = Array.from(
            new Set(
                SEED_EXPERIMENTS.map((exp) => exp.appId).filter(
                    (id): id is AppId => id !== null
                )
            )
        );

        return ids
            .map((id) => registryById.get(id))
            .filter((app): app is AppRegistryEntry => Boolean(app));
    }, [registryById]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-950/90 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pt-12">
                {/* Header / breadcrumbs */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
                            <span className="rounded-full bg-slate-900/70 px-2 py-0.5 text-slate-300">
                                Labs
                            </span>
                            <span className="text-slate-500">Experiments</span>
                        </div>
                        <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
                            Labs Experiments
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-400">
                            Internal notebook for how apps, bots, and infrastructure move from
                            idea → design → build → polish across Digital Hooligan.
                        </p>
                    </div>

                    <div className="flex gap-2 text-xs text-slate-400">
                        <Link
                            href="/ceo"
                            className="rounded-full border border-slate-700/70 bg-slate-950/60 px-3 py-1 hover:border-slate-500 hover:text-slate-200"
                        >
                            ← Back to CEO overview
                        </Link>
                        <Link
                            href="/labs/hq"
                            className="rounded-full border border-slate-700/70 bg-slate-950/60 px-3 py-1 hover:border-slate-500 hover:text-slate-200"
                        >
                            Labs HQ
                        </Link>
                    </div>
                </div>

                {/* Filters */}
                <section className="mb-6 rounded-2xl border border-slate-900 bg-slate-950/60 p-4 shadow-sm shadow-black/40">
                    <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Filters
                        </h2>
                        <p className="text-xs text-slate-500">
                            Use this view to keep track of what&apos;s moving and what&apos;s
                            stuck before it hits a real sprint.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-wrap gap-2 text-xs">
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value as ExperimentStatus | "all")
                                }
                                className="rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1 text-xs text-slate-100 outline-none ring-0 focus:border-slate-500"
                            >
                                <option value="all">All statuses</option>
                                <option value="idea">Idea</option>
                                <option value="planned">Planned</option>
                                <option value="running">Running</option>
                                <option value="completed">Completed</option>
                                <option value="paused">Paused</option>
                            </select>

                            <select
                                value={appFilter}
                                onChange={(e) => setAppFilter(e.target.value)}
                                className="rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1 text-xs text-slate-100 outline-none ring-0 focus:border-slate-500"
                            >
                                <option value="all">All apps</option>
                                {uniqueApps.map((app) => (
                                    <option key={app.id} value={app.id}>
                                        {app.name}
                                    </option>
                                ))}
                                <option value="__cross">Cross-portfolio</option>
                            </select>
                        </div>

                        <div className="flex w-full gap-2 md:w-auto">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search experiments…"
                                className="h-8 w-full rounded-full border border-slate-800 bg-slate-950/80 px-3 text-xs text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-slate-500 md:w-64"
                            />
                        </div>
                    </div>
                </section>

                {/* Experiments list */}
                <section className="space-y-3">
                    {experiments.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 px-4 py-10 text-center text-sm text-slate-500">
                            No experiments match this filter yet. Adjust filters or add
                            another draft entry.
                        </div>
                    ) : (
                        experiments.map((exp) => (
                            <ExperimentCard
                                key={exp.id}
                                exp={exp}
                                registryById={registryById}
                            />
                        ))
                    )}
                </section>

                {/* Footer note */}
                <p className="mt-6 text-[0.7rem] text-slate-500">
                    Later, this view can sync with a Labs database and wire into Tasks,
                    Deals, and the CEO dashboard so you always know what&apos;s moving
                    from idea to production.
                </p>
            </div>
        </main>
    );
}

/* ---------- Experiment card ---------- */

function ExperimentCard({
    exp,
    registryById,
}: {
    exp: Experiment;
    registryById: Map<AppId, AppRegistryEntry>;
}) {
    const app = exp.appId ? registryById.get(exp.appId) : null;
    const statusLabel = STATUS_LABEL[exp.status];
    const impactLabel = IMPACT_LABEL[exp.impact];

    const statusClasses = getStatusClasses(exp.status);
    const impactClasses = getImpactClasses(exp.impact);

    return (
        <article className="rounded-2xl border border-slate-900 bg-slate-950/70 p-4 shadow-sm shadow-black/40">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
                        {app ? (
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-slate-200">
                                {app.name}
                            </span>
                        ) : (
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-slate-300">
                                Cross-portfolio
                            </span>
                        )}
                        <span className="text-slate-600">Experiment</span>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-50">
                        {exp.title}
                    </h3>
                    <p className="text-xs text-slate-400">{exp.summary}</p>

                    {exp.tags && exp.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {exp.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-row gap-2 md:flex-col md:items-end">
                    <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] font-medium ring-1 ${statusClasses}`}
                    >
                        {statusLabel}
                    </span>
                    <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] font-medium ring-1 ${impactClasses}`}
                    >
                        Impact: {impactLabel}
                    </span>
                </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[0.65rem] text-slate-500">
                <span>
                    Created{" "}
                    {new Date(exp.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                    })}{" "}
                    · Updated{" "}
                    {new Date(exp.updatedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                    })}
                </span>
            </div>
        </article>
    );
}