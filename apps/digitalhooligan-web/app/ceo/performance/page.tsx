// apps/digitalhooligan-web/app/ceo/performance/page.tsx

import React from "react";
import Link from "next/link";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

// Use simple string-keyed maps so TS doesn't get fussy
const KIND_LABELS: Record<string, string> = {
    "public-app": "Public app",
    "internal-tool": "Internal tool",
    bot: "Automation / bot",
    infra: "Infra / shared",
};

const LIFECYCLE_LABELS: Record<string, string> = {
    live: "Live",
    beta: "Beta",
    alpha: "Alpha",
    building: "Building",
    design: "Design",
    idea: "Idea",
    paused: "Paused",
};

const LIFECYCLE_BADGE_STYLES: Record<string, string> = {
    live: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
    beta: "bg-sky-500/10 text-sky-300 border-sky-500/40",
    alpha: "bg-indigo-500/10 text-indigo-300 border-indigo-500/40",
    building: "bg-amber-500/10 text-amber-300 border-amber-500/40",
    design: "bg-pink-500/10 text-pink-300 border-pink-500/40",
    idea: "bg-slate-500/10 text-slate-300 border-slate-500/40",
    paused: "bg-zinc-700/40 text-zinc-300 border-zinc-600",
};

function splitApps(entries: AppRegistryEntry[]) {
    const publicApps: AppRegistryEntry[] = [];
    const internalApps: AppRegistryEntry[] = [];

    for (const app of entries) {
        if (app.internalOnly) internalApps.push(app);
        else publicApps.push(app);
    }

    return { publicApps, internalApps };
}

export default function CeoPerformancePage() {
    const total = APP_REGISTRY.length;
    const live = APP_REGISTRY.filter((a) => a.lifecycle === "live").length;
    const beta = APP_REGISTRY.filter((a) => a.lifecycle === "beta").length;
    const building = APP_REGISTRY.filter((a) => a.lifecycle === "building").length;

    const { publicApps, internalApps } = splitApps(APP_REGISTRY);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header / breadcrumbs */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <Link
                                href="/ceo"
                                className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 font-medium text-[0.7rem] text-slate-300 ring-1 ring-slate-700/80 hover:text-emerald-300 hover:ring-emerald-500/70"
                            >
                                <span className="mr-1 text-[0.7rem]">←</span>
                                CEO overview
                            </Link>
                            <span className="inline-flex items-center rounded-full bg-slate-900/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400 ring-1 ring-slate-800/80">
                                CEO · Performance
                            </span>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            App performance
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Portfolio-level view of lifecycle and future metrics for every app, bot, and internal
                            tool. Powered by the typed{" "}
                            <code className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">
                                APP_REGISTRY
                            </code>{" "}
                            config.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/ceo/apps"
                            className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-sm transition hover:border-emerald-500/60 hover:bg-slate-950"
                        >
                            <span className="mr-1.5 text-xs">📦</span>
                            Apps & bots portfolio
                        </Link>
                        <Link
                            href="/labs/app-registry"
                            className="inline-flex items-center rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1.5 text-[0.7rem] font-medium text-slate-300 transition hover:border-emerald-500/50 hover:text-emerald-200"
                        >
                            <span className="mr-1.5 text-xs">🧪</span>
                            Labs app registry
                        </Link>
                    </div>
                </div>

                {/* Top stats strip */}
                <section className="mb-8 grid gap-4 md:grid-cols-4">
                    <StatCard
                        label="Total entries"
                        value={total.toString()}
                        hint="Apps, bots, and tools"
                    />
                    <StatCard label="Live" value={live.toString()} hint="Production-facing" />
                    <StatCard label="Beta" value={beta.toString()} hint="Dogfooding & pilots" />
                    <StatCard label="Building" value={building.toString()} hint="Active build work" />
                </section>

                {/* Tables: public vs internal */}
                <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
                    {/* Public apps performance matrix */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <div className="mb-3 flex items-center justify-between gap-2">
                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                    Public apps & products
                                </h2>
                                <p className="mt-1 text-xs text-slate-400">
                                    Things users will touch directly. Metric keys here will later wire to Stripe,
                                    analytics, and uptime monitors.
                                </p>
                            </div>
                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-300 ring-1 ring-emerald-500/40">
                                {publicApps.length} item{publicApps.length === 1 ? "" : "s"}
                            </span>
                        </div>

                        <PerformanceTable apps={publicApps} />
                    </div>

                    {/* Internal tools performance matrix */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <div className="mb-3 flex items-center justify-between gap-2">
                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                    Internal dashboards & toys
                                </h2>
                                <p className="mt-1 text-xs text-slate-400">
                                    CEO tools, Labs HQ views, and ops automation. Good place to track uptime and error
                                    rates without exposing them publicly.
                                </p>
                            </div>
                            <span className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[0.7rem] font-medium text-slate-100 ring-1 ring-slate-600/80">
                                {internalApps.length} item{internalApps.length === 1 ? "" : "s"}
                            </span>
                        </div>

                        <PerformanceTable apps={internalApps} />
                    </div>
                </section>

                {/* Future wiring note */}
                <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-300 shadow-sm shadow-black/40">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                        Future wiring
                    </h2>
                    <p className="mt-2">
                        When you&apos;re ready, each{" "}
                        <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                            metricsKeys
                        </code>{" "}
                        entry (users, MRR, uptime, latency, errors/min) can hook into real data sources:
                        Stripe, analytics, uptime monitors, logging, and AI summaries. This page is already
                        structured to display those values per app without changing the layout.
                    </p>
                </section>
            </div>
        </main>
    );
}

function StatCard(props: { label: string; value: string; hint?: string }) {
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

function PerformanceTable({ apps }: { apps: AppRegistryEntry[] }) {
    if (apps.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/80 px-3 py-4 text-[0.75rem] text-slate-400">
                No entries in this group yet. Add apps to{" "}
                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                    APP_REGISTRY
                </code>{" "}
                and they&apos;ll show up here automatically.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
            <table className="min-w-full text-left text-[0.75rem] text-slate-200">
                <thead className="border-b border-slate-800 bg-slate-950/90 text-[0.7rem] text-slate-400">
                    <tr>
                        <th className="px-3 py-2 font-medium">App</th>
                        <th className="px-3 py-2 font-medium">Lifecycle</th>
                        <th className="px-3 py-2 font-medium">Kind</th>
                        <th className="px-3 py-2 font-medium">Users</th>
                        <th className="px-3 py-2 font-medium">MRR</th>
                        <th className="px-3 py-2 font-medium">Uptime</th>
                        <th className="px-3 py-2 font-medium">Errors/min</th>
                    </tr>
                </thead>
                <tbody>
                    {apps.map((app) => (
                        <tr
                            key={app.id}
                            className="border-t border-slate-800/80 transition hover:bg-slate-900/60"
                        >
                            <td className="px-3 py-2 align-top">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900/90 text-base">
                                        {app.icon.type === "emoji" ? app.icon.value : "⛓"}
                                    </div>
                                    <div>
                                        <div className="text-[0.8rem] font-semibold text-slate-50">
                                            {app.name}
                                        </div>
                                        <div className="text-[0.65rem] text-slate-400">
                                            {app.id}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className="px-3 py-2 align-top">
                                <span
                                    className={[
                                        "inline-flex items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em]",
                                        LIFECYCLE_BADGE_STYLES[app.lifecycle],
                                    ].join(" ")}
                                >
                                    {LIFECYCLE_LABELS[app.lifecycle]}
                                </span>
                            </td>

                            <td className="px-3 py-2 align-top">
                                <span className="text-[0.7rem] text-slate-300">
                                    {KIND_LABELS[app.kind]}
                                </span>
                                {app.internalOnly && (
                                    <span className="ml-1 rounded-full bg-slate-900/80 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
                                        Internal
                                    </span>
                                )}
                            </td>

                            {/* Metric columns – for now, show whether a key is defined, not actual values */}
                            <MetricCell hasKey={!!app.metricsKeys?.users} />
                            <MetricCell hasKey={!!app.metricsKeys?.mrr} />
                            <MetricCell hasKey={!!app.metricsKeys?.uptime} />
                            <MetricCell hasKey={!!app.metricsKeys?.errorsPerMin} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function MetricCell({ hasKey }: { hasKey: boolean }) {
    if (!hasKey) {
        return (
            <td className="px-3 py-2 align-top text-[0.7rem] text-slate-500">
                <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-500">
                    not wired
                </span>
            </td>
        );
    }

    return (
        <td className="px-3 py-2 align-top text-[0.7rem] text-slate-200">
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] text-emerald-300 ring-1 ring-emerald-500/40">
                key set
            </span>
        </td>
    );
}