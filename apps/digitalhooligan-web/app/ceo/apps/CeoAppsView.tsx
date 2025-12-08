"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type AppPaths = {
    marketing?: string;
    ceo?: string;
    labs?: string;
};

type AppRegistryItem = {
    id: string;
    slug: string;
    name: string;
    tagline?: string;
    kind: string;
    lifecycle: string;
    owner?: string;
    tags?: string[];
    description?: string;
    stage?: string;
    paths?: AppPaths;
    [key: string]: unknown;
};

export type AppHealthStatus =
    | "healthy"
    | "degraded"
    | "down"
    | "unknown"
    | string;

type HealthApp = {
    appId: string;
    status: AppHealthStatus;
    uptime90d?: number;
    lastChecked?: string;
    note?: string;
};

type AiState = {
    summary: string | null;
};

type CeoAppsViewProps = {
    apps: AppRegistryItem[];
    healthApps: HealthApp[] | null;
    initialAppId?: string;
};

function formatHealthStatus(status: AppHealthStatus | undefined) {
    const normalized = (status ?? "unknown").toString().toLowerCase();

    const label =
        {
            healthy: "Healthy",
            degraded: "Degraded",
            down: "Down",
            unknown: "Unknown",
        }[normalized] ?? status ?? "Unknown";

    const color =
        {
            healthy: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40",
            degraded: "bg-amber-500/15 text-amber-300 ring-amber-500/40",
            down: "bg-red-500/15 text-red-300 ring-red-500/40",
            unknown: "bg-slate-500/15 text-slate-300 ring-slate-500/40",
        }[normalized] ?? "bg-slate-500/15 text-slate-300 ring-slate-500/40";

    return { label, color };
}

export function CeoAppsView({
    apps,
    healthApps,
    initialAppId,
}: CeoAppsViewProps) {
    const searchParams = useSearchParams();

    const appIdFromUrl = searchParams.get("appId") || undefined;

    const effectiveAppId = useMemo(
        () => appIdFromUrl ?? initialAppId ?? apps[0]?.id,
        [appIdFromUrl, initialAppId, apps]
    );

    const selected = useMemo(() => {
        if (!apps.length) return undefined;

        if (!effectiveAppId) return apps[0];

        return (
            apps.find(
                (app) =>
                    app.id === effectiveAppId ||
                    app.slug === effectiveAppId ||
                    app.paths?.ceo?.includes(`appId=${effectiveAppId}`)
            ) ?? apps[0]
        );
    }, [apps, effectiveAppId]);

    const health = useMemo(() => {
        if (!healthApps || !selected) return null;

        return (
            healthApps.find(
                (h) => h.appId === selected.id || h.appId === selected.slug
            ) ?? null
        );
    }, [healthApps, selected]);

    const [ai, setAi] = useState<AiState>({
        summary: null,
    });

    useEffect(() => {
        // If there is no selected app yet, do nothing (keep previous AI state).
        if (!selected?.id) return;

        let cancelled = false;

        fetch(`/api/ai/app-summary?appId=${encodeURIComponent(selected.id)}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                return res.json();
            })
            .then((data: { summary?: string }) => {
                if (!cancelled) {
                    setAi({
                        summary: data.summary ?? null,
                    });
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setAi({
                        summary: null,
                    });
                }
            });

        return () => {
            cancelled = true;
        };
    }, [selected?.id]);

    if (!selected) {
        return null;
    }

    const { label: healthLabel, color: healthColor } = formatHealthStatus(
        health?.status
    );

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
                {/* Header */}
                <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
                            CEO / Apps
                        </p>
                        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                            App Registry &amp; Detail
                        </h1>
                        <p className="mt-2 max-w-xl text-sm text-slate-400">
                            High-level snapshot of your Digital Hooligan apps. Select an app
                            from the left to view paths, health, and AI notes on the right.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                        <Link
                            href="/ceo"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200 hover:border-emerald-400 hover:text-emerald-100"
                        >
                            <span aria-hidden={true}>🏴‍☠️</span>
                            <span>Back to CEO dashboard</span>
                        </Link>
                        <Link
                            href="/labs/app-registry"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-300 hover:border-emerald-400 hover:text-emerald-100"
                        >
                            <span aria-hidden={true}>🧪</span>
                            <span>Labs App Registry</span>
                        </Link>
                    </div>
                </header>

                {/* Main layout */}
                <section className="grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
                    {/* Left: app list */}
                    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
                        <div className="border-b border-slate-800 px-4 py-3">
                            <h2 className="text-sm font-semibold text-slate-50">
                                App registry
                            </h2>
                            <p className="text-xs text-slate-400">
                                Source of truth from{" "}
                                <span className="font-mono text-emerald-300">
                                    /api/registry/apps
                                </span>
                                .
                            </p>
                        </div>

                        <div className="max-h-[420px] overflow-y-auto">
                            <ul className="divide-y divide-slate-800 text-sm">
                                {apps.map((app) => {
                                    const isSelected = app.id === selected.id;
                                    return (
                                        <li key={app.id}>
                                            <Link
                                                href={`/ceo/apps?appId=${encodeURIComponent(app.id)}`}
                                                className={`flex flex-col gap-1 px-4 py-3 transition-colors ${isSelected
                                                        ? "bg-emerald-500/5 ring-1 ring-emerald-500/30"
                                                        : "hover:bg-slate-900/60"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-[0.9rem] font-medium text-slate-50">
                                                        {app.name}
                                                    </span>
                                                    <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-slate-400">
                                                        {app.kind}
                                                    </span>
                                                </div>
                                                {app.tagline && (
                                                    <p className="text-[0.75rem] text-slate-400">
                                                        {app.tagline}
                                                    </p>
                                                )}
                                                <div className="flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-500">
                                                    <span className="font-mono text-slate-500">
                                                        {app.id}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="capitalize text-slate-400">
                                                        {app.lifecycle}
                                                    </span>
                                                    {app.stage && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-slate-400">
                                                                Stage: {app.stage}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Right: detail panel */}
                    <div className="flex flex-col gap-4">
                        {/* Summary card */}
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold tracking-tight">
                                        {selected.name}
                                    </h2>
                                    {selected.tagline && (
                                        <p className="mt-1 text-sm text-slate-400">
                                            {selected.tagline}
                                        </p>
                                    )}
                                    <p className="mt-2 text-xs text-slate-500">
                                        <span className="font-mono text-slate-500">
                                            {selected.id}
                                        </span>{" "}
                                        · slug:{" "}
                                        <span className="font-mono text-slate-400">
                                            {selected.slug}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex flex-col items-end gap-2 text-xs">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-slate-300">
                                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                        <span className="capitalize">{selected.lifecycle}</span>
                                    </span>
                                    {selected.owner && (
                                        <span className="rounded-full bg-slate-900 px-3 py-1 text-slate-300">
                                            Owner: {selected.owner}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {selected.tags && selected.tags.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1 text-[0.7rem] text-slate-300">
                                    {selected.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-slate-900 px-2 py-0.5"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Paths + health + AI summary */}
                        <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.3fr)]">
                            {/* Left column: paths + health */}
                            <div className="flex flex-col gap-4">
                                {/* Paths */}
                                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
                                    <h3 className="text-sm font-semibold text-slate-50">
                                        Paths
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Quick links to public / internal views for this app.
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                        <Link
                                            href={selected.paths?.marketing ?? "#"}
                                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${selected.paths?.marketing
                                                    ? "bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20"
                                                    : "cursor-not-allowed bg-slate-900 text-slate-500"
                                                }`}
                                        >
                                            <span aria-hidden={true}>🌐</span>
                                            <span>Marketing</span>
                                        </Link>

                                        <Link
                                            href={
                                                selected.paths?.ceo ??
                                                `/ceo/apps?appId=${encodeURIComponent(selected.id)}`
                                            }
                                            className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-slate-200 hover:bg-slate-800"
                                        >
                                            <span aria-hidden={true}>📊</span>
                                            <span>CEO view</span>
                                        </Link>

                                        <Link
                                            href={selected.paths?.labs ?? "/labs/app-registry"}
                                            className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-slate-200 hover:bg-slate-800"
                                        >
                                            <span aria-hidden={true}>🧪</span>
                                            <span>Labs</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Health */}
                                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
                                    <h3 className="text-sm font-semibold text-slate-50">
                                        Health
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Snapshot from{" "}
                                        <span className="font-mono text-emerald-300">
                                            /api/health/apps
                                        </span>
                                        .
                                    </p>

                                    {health ? (
                                        <div className="mt-3 space-y-2 text-xs">
                                            <span
                                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.7rem] ring-1 ${healthColor}`}
                                            >
                                                <span className="h-2 w-2 rounded-full bg-current" />
                                                <span>{healthLabel}</span>
                                            </span>

                                            {typeof health.uptime90d === "number" && (
                                                <p className="text-slate-300">
                                                    <span className="font-medium">
                                                        90-day uptime:{" "}
                                                    </span>
                                                    {health.uptime90d.toFixed(2)}%
                                                </p>
                                            )}

                                            {health.lastChecked && (
                                                <p className="text-slate-400">
                                                    Last checked:{" "}
                                                    <span className="font-mono">
                                                        {new Date(health.lastChecked).toLocaleString()}
                                                    </span>
                                                </p>
                                            )}

                                            {health.note && (
                                                <p className="text-slate-300">{health.note}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="mt-3 text-xs text-slate-500">
                                            No health data for this app yet. Once the{" "}
                                            <span className="font-mono text-emerald-300">
                                                /api/health/apps
                                            </span>{" "}
                                            endpoint is wired in, this panel will populate
                                            automatically.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right column: AI summary */}
                            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
                                <h3 className="text-sm font-semibold text-slate-50">
                                    AI summary
                                </h3>
                                <p className="mt-1 text-xs text-slate-400">
                                    Generated from{" "}
                                    <span className="font-mono text-emerald-300">
                                        /api/ai/app-summary
                                    </span>{" "}
                                    for this app ID.
                                </p>

                                {ai.summary ? (
                                    <p className="mt-3 text-sm leading-relaxed text-slate-200">
                                        {ai.summary}
                                    </p>
                                ) : (
                                    <p className="mt-3 text-xs text-slate-500">
                                        AI summary is not available yet. Once the AI backend is
                                        wired up, we&apos;ll surface a quick brief of what this app
                                        is doing, who it serves, and what to watch.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}