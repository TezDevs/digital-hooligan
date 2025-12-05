// apps/digitalhooligan-web/app/ceo/dev-workbench/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

const LIFECYCLE_ORDER: AppRegistryEntry["lifecycle"][] = [
    "live",
    "beta",
    "alpha",
    "building",
    "design",
    "idea",
    "paused",
];

export default function DevWorkbenchPage() {
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

    const total = apps.length;
    const internalOnly = apps.filter((a) => a.internalOnly).length;
    const publicFacing = total - internalOnly;

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            Dev Workbench
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Internal map of routes and wiring across Digital Hooligan. Use
                            this as your cheat sheet for app paths, JSON endpoints, and AI
                            summaries when working in code or{" "}
                            <span className="font-medium">Insomnia / Kong</span>.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-300">
                        <Link
                            href="/labs/hq"
                            className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-slate-200 ring-1 ring-slate-700/80 hover:text-emerald-200 hover:ring-emerald-500/70"
                        >
                            <span className="mr-1 text-xs">🧪</span>
                            Jump to Labs HQ
                        </Link>
                        <Link
                            href="/ceo"
                            className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-slate-200 ring-1 ring-slate-700/80 hover:text-emerald-200 hover:ring-emerald-500/70"
                        >
                            <span className="mr-1 text-xs">←</span>
                            Back to CEO overview
                        </Link>
                    </div>
                </div>

                {/* CEO tab row (Dev WB active) */}
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

                {/* Top row: registry + platform endpoints */}
                <section className="mb-6 grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1.6fr)]">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Registry-backed workbench
                                </p>
                                <p className="mt-1 text-sm text-slate-200">
                                    {total} apps + bots in{" "}
                                    <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">
                                        APP_REGISTRY
                                    </code>{" "}
                                    · {publicFacing} public-facing · {internalOnly} internal-only.
                                </p>
                            </div>
                            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.7rem] text-slate-300 ring-1 ring-slate-700/70">
                                One source of truth for routes
                            </span>
                        </div>

                        <p className="text-xs text-slate-300">
                            Every environment – CEO views, Labs, API callers, and future AI
                            assistants – should treat the registry as the canonical map of
                            apps and their paths.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-300 shadow-sm shadow-black/40">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Core platform endpoints
                        </p>

                        <div className="mt-2 space-y-1.5">
                            <EndpointRow method="GET" path="/api/health" note="Quick health ping used by Labs HQ." />
                            <EndpointRow method="GET" path="/api/apps" note="Returns all registry entries as JSON." />
                            <EndpointRow
                                method="GET"
                                path="/api/apps/{id}"
                                note="Single app detail; metrics via adapter."
                            />
                            <EndpointRow
                                method="GET"
                                path="/api/ai/app-summary/{id}"
                                note="AI summary used by CEO AI Hub + Labs mini assistant."
                            />
                        </div>

                        <p className="mt-3 text-[0.7rem] text-slate-400">
                            In Insomnia / Kong, your local base URL is usually{" "}
                            <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.65rem]">
                                http://localhost:3000
                            </code>
                            . Combine that with these paths when testing.
                        </p>
                    </div>
                </section>

                {/* Main grid: per-app routes + Insomnia cheatsheet */}
                <section className="grid gap-4 md:grid-cols-[minmax(0,2.2fr),minmax(0,1.4fr)]">
                    {/* Per-app route matrix */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <div className="mb-3 flex items-center justify-between gap-2">
                            <div>
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Per-app route matrix
                                </p>
                                <p className="mt-1 text-sm text-slate-200">
                                    Marketing, CEO, Labs, JSON, and AI endpoints for each app/bot.
                                    Use this as the central “where does this live?” map.
                                </p>
                            </div>
                            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.7rem] text-slate-300 ring-1 ring-slate-700/70">
                                {total} entries
                            </span>
                        </div>

                        <div className="space-y-3">
                            {apps.map((app) => (
                                <AppRouteCard key={app.id} app={app} />
                            ))}
                        </div>
                    </div>

                    {/* Insomnia / Kong cheatsheet */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-300 shadow-sm shadow-black/40">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Insomnia / Kong cheatsheet
                        </p>

                        <div className="mt-2 space-y-3">
                            <div>
                                <p className="mb-1 text-[0.7rem] font-medium text-slate-300">
                                    1. Base setup
                                </p>
                                <p className="text-[0.7rem] text-slate-400">
                                    In Insomnia, create a new request collection named{" "}
                                    <span className="font-semibold">Digital Hooligan</span> with
                                    environment:
                                </p>
                                <pre className="mt-1 rounded-lg bg-slate-950 px-3 py-2 text-[0.7rem] text-slate-200">
                                    {`{
  "baseUrl": "http://localhost:3000"
}`}
                                </pre>
                            </div>

                            <div>
                                <p className="mb-1 text-[0.7rem] font-medium text-slate-300">
                                    2. Example request: app JSON
                                </p>
                                <code className="block rounded-lg bg-slate-950 px-3 py-2 text-[0.7rem] text-slate-100">
                                    {"GET {{ baseUrl }}/api/apps/pennywize"}
                                </code>
                                <p className="mt-1 text-[0.7rem] text-slate-400">
                                    Swap <code>pennywize</code> for any app id from the matrix.
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-[0.7rem] font-medium text-slate-300">
                                    3. Example request: AI summary
                                </p>
                                <code className="block rounded-lg bg-slate-950 px-3 py-2 text-[0.7rem] text-slate-100">
                                    {"GET {{ baseUrl }}/api/ai/app-summary/pennywize"}
                                </code>
                                <p className="mt-1 text-[0.7rem] text-slate-400">
                                    This is the same endpoint the CEO AI Hub and Labs mini
                                    assistant call.
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-[0.7rem] font-medium text-slate-300">
                                    4. Future wiring
                                </p>
                                <ul className="space-y-1.5 list-disc pl-4 text-[0.7rem]">
                                    <li>
                                        Add auth headers once CEO/Labs routes require real login.
                                    </li>
                                    <li>
                                        Map production environment so <code>baseUrl</code> can swap
                                        between local, preview, and prod.
                                    </li>
                                    <li>
                                        Mirror the health checks from Labs HQ as saved requests.
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

function EndpointRow({
    method,
    path,
    note,
}: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    path: string;
    note?: string;
}) {
    const methodColor =
        method === "GET"
            ? "text-emerald-300"
            : method === "POST"
                ? "text-sky-300"
                : "text-amber-300";

    return (
        <div className="flex flex-col gap-0.5 rounded-lg border border-slate-800 bg-slate-950/90 px-2.5 py-2">
            <div className="flex items-center gap-2 text-[0.75rem]">
                <span className={`font-semibold ${methodColor}`}>{method}</span>
                <code className="rounded bg-slate-950 px-2 py-0.5 text-[0.7rem] text-slate-100">
                    {path}
                </code>
            </div>
            {note && (
                <p className="text-[0.7rem] text-slate-400">
                    {note}
                </p>
            )}
        </div>
    );
}

function AppRouteCard({ app }: { app: AppRegistryEntry }) {
    const apiDetailUrl = `/api/apps/${app.id}`;
    const aiSummaryUrl = `/api/ai/app-summary/${app.id}`;

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-3 text-xs text-slate-300">
            <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900/90 text-lg">
                        {app.icon?.type === "emoji" ? app.icon.value : "⛓"}
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-sm font-semibold text-slate-50">
                                {app.name}
                            </span>
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.16em] text-slate-400">
                                {app.lifecycle}
                            </span>
                            {app.internalOnly && (
                                <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-400">
                                    Internal-only
                                </span>
                            )}
                        </div>
                        <p className="mt-1 max-w-md text-[0.7rem] text-slate-400 line-clamp-2">
                            {app.description}
                        </p>
                    </div>
                </div>
                <code className="rounded-full bg-slate-900 px-2.5 py-1 text-[0.65rem] text-slate-300">
                    id: {app.id}
                </code>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
                <div className="space-y-1">
                    <RouteRow label="Marketing" href={app.marketingPath} />
                    <RouteRow label="CEO" href={app.ceoPath} />
                    <RouteRow label="Labs" href={app.labsPath} />
                </div>
                <div className="space-y-1">
                    <RouteRow label="App JSON" href={apiDetailUrl} codeOnly />
                    <RouteRow label="AI summary" href={aiSummaryUrl} codeOnly />
                </div>
            </div>
        </div>
    );
}

function RouteRow({
    label,
    href,
    codeOnly,
}: {
    label: string;
    href?: string | null;
    codeOnly?: boolean;
}) {
    if (!href) {
        return (
            <div className="flex items-center justify-between gap-2 text-[0.7rem] text-slate-500">
                <span>{label}</span>
                <span className="rounded-full bg-slate-900/60 px-2 py-0.5 text-[0.65rem]">
                    — not wired yet
                </span>
            </div>
        );
    }

    if (codeOnly) {
        return (
            <div className="flex flex-col gap-0.5 text-[0.7rem]">
                <span className="text-slate-400">{label}</span>
                <code className="rounded bg-slate-950 px-2 py-0.5 text-[0.7rem] text-slate-100">
                    {href}
                </code>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between gap-2 text-[0.7rem]">
            <span className="text-slate-400">{label}</span>
            <Link
                href={href}
                className="truncate rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.7rem] text-emerald-200 ring-1 ring-slate-700/80 hover:ring-emerald-500/70"
            >
                {href}
            </Link>
        </div>
    );
}