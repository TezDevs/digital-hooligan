"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type AppStatus = "healthy" | "attention" | "down";

type AppPerformance = {
    id: string;
    slug: string;
    name: string;
    status: AppStatus;
    uptime: string;
    latencyMs: number;
    activeUsers: number;
    mrr: string;
    errorRate: string;
    lastIncident?: string;
    owner: string;
};

const APP_PERFORMANCE: AppPerformance[] = [
    {
        id: "pennywize",
        slug: "pennywize",
        name: "PennyWize",
        status: "healthy",
        uptime: "99.97%",
        latencyMs: 120,
        activeUsers: 134,
        mrr: "$1.2k",
        errorRate: "0.3%",
        lastIncident: "3 days ago",
        owner: "Digital Hooligan Labs",
    },
    {
        id: "dropsignal",
        slug: "dropsignal",
        name: "DropSignal",
        status: "attention",
        uptime: "99.3%",
        latencyMs: 210,
        activeUsers: 87,
        mrr: "$640",
        errorRate: "1.8%",
        lastIncident: "18 hours ago",
        owner: "Digital Hooligan Labs",
    },
    {
        id: "hypewatch",
        slug: "hypewatch",
        name: "HypeWatch",
        status: "healthy",
        uptime: "99.9%",
        latencyMs: 95,
        activeUsers: 52,
        mrr: "$280",
        errorRate: "0.1%",
        lastIncident: "7 days ago",
        owner: "Digital Hooligan Labs",
    },
    {
        id: "ops-toys",
        slug: "ops-toys",
        name: "Ops Toys",
        status: "attention",
        uptime: "98.7%",
        latencyMs: 180,
        activeUsers: 23,
        mrr: "$0 (internal)",
        errorRate: "2.4%",
        lastIncident: "12 hours ago",
        owner: "Internal / Dev",
    },
];

function getStatusBadge(status: AppStatus) {
    const base =
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border";

    if (status === "healthy") {
        return (
            <span className={`${base} border-emerald-500/40 text-emerald-400`}>
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Healthy
            </span>
        );
    }

    if (status === "attention") {
        return (
            <span className={`${base} border-amber-500/40 text-amber-300`}>
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-300" />
                Needs attention
            </span>
        );
    }

    return (
        <span className={`${base} border-rose-500/40 text-rose-300`}>
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-rose-400" />
            Down
        </span>
    );
}

export default function PerformancePage() {
    const searchParams = useSearchParams();
    const appIdParam = searchParams.get("appId") ?? undefined;

    // Try to match either by id or slug (so ?appId=pennywize or ?appId=PennyWize is forgiving)
    const selectedApp =
        appIdParam &&
        APP_PERFORMANCE.find(
            (app) =>
                app.id.toLowerCase() === appIdParam.toLowerCase() ||
                app.slug.toLowerCase() === appIdParam.toLowerCase()
        );

    const visibleApps = selectedApp ? [selectedApp] : APP_PERFORMANCE;
    const basePath = "/ceo/performance";

    const contextLabel = selectedApp
        ? `${selectedApp.name} only`
        : "All apps (portfolio view)";

    const contextSubtitle = selectedApp
        ? `You are viewing metrics and quick actions specifically for ${selectedApp.name}.`
        : "You are viewing rolled-up performance across all Digital Hooligan apps.";

    const quickActions = selectedApp
        ? [
            {
                label: `Open ${selectedApp.name} in Labs`,
                href: `/labs/hq?appId=${selectedApp.id}`,
                description: "Jump straight into experiments and build pipeline.",
            },
            {
                label: `View ${selectedApp.name} incidents`,
                href: `/ceo/incidents?appId=${selectedApp.id}`,
                description: "Review recent incidents, errors, and mitigations.",
            },
            {
                label: `Tune ${selectedApp.name} performance`,
                href: `/ceo/dev-workbench?appId=${selectedApp.id}`,
                description:
                    "Go to Dev Workbench with this app pre-selected for tuning.",
            },
        ]
        : [
            {
                label: "Open Labs HQ",
                href: "/labs/hq",
                description: "Portfolio-level view of experiments and builds.",
            },
            {
                label: "Incidents across all apps",
                href: "/ceo/incidents",
                description: "See where things are breaking across the portfolio.",
            },
            {
                label: "Dev Workbench (all apps)",
                href: "/ceo/dev-workbench",
                description: "Jump into dev tooling and logs for any app.",
            },
        ];

    const totalActiveUsers = visibleApps.reduce(
        (sum, app) => sum + app.activeUsers,
        0
    );

    const avgUptime =
        visibleApps.length === 0
            ? 0
            : Math.round(
                visibleApps.reduce((sum, app) => {
                    const numeric = parseFloat(app.uptime.replace("%", ""));
                    return sum + numeric;
                }, 0) / visibleApps.length
            );

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-6 lg:px-8">
                {/* Back to CEO dashboard */}
                <div className="mb-1">
                    <Link
                        href="/ceo"
                        className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-emerald-300"
                    >
                        <span className="text-base leading-none">←</span>
                        <span>Back to CEO dashboard</span>
                    </Link>
                </div>

                {/* Header */}
                <header className="flex flex-col gap-4 border-b border-neutral-800 pb-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
                            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                                CEO
                            </span>
                            Performance
                        </div>
                        <h1 className="mt-2 text-2xl font-semibold text-neutral-50 md:text-3xl">
                            App performance & reliability
                        </h1>
                        <p className="mt-1 text-sm text-neutral-400">{contextSubtitle}</p>
                    </div>

                    {/* Context summary */}
                    <div className="flex flex-col items-start gap-2 text-sm md:items-end">
                        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/70 px-3 py-1 text-xs font-medium text-neutral-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Context: {contextLabel}
                        </div>
                        <p className="text-xs text-neutral-500">
                            Use the app picker below to switch context.
                        </p>
                    </div>
                </header>

                {/* App context picker */}
                <section className="flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                        App context
                    </span>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={basePath}
                            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${!selectedApp
                                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                                    : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-600"
                                }`}
                        >
                            All apps
                        </Link>
                        {APP_PERFORMANCE.map((app) => {
                            const active =
                                selectedApp &&
                                (selectedApp.id === app.id || selectedApp.slug === app.slug);

                            return (
                                <Link
                                    key={app.id}
                                    href={`${basePath}?appId=${app.id}`}
                                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${active
                                            ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                                            : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-600"
                                        }`}
                                >
                                    {app.name}
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Main grid */}
                <main className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
                    {/* Left: metrics and tables */}
                    <div className="flex flex-col gap-6">
                        {/* Snapshot cards */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
                                <div className="flex items-center justify-between gap-2">
                                    <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                                        Active users
                                    </h2>
                                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                                        Live
                                    </span>
                                </div>
                                <p className="mt-3 text-2xl font-semibold text-neutral-50">
                                    {totalActiveUsers.toLocaleString()}
                                </p>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Across {visibleApps.length}{" "}
                                    {visibleApps.length === 1 ? "app" : "apps"} in this view.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
                                <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                                    Portfolio health
                                </h2>
                                <div className="mt-3 flex items-baseline gap-2">
                                    <p className="text-2xl font-semibold text-neutral-50">
                                        {avgUptime}%
                                    </p>
                                    <span className="text-xs text-neutral-500">
                                        avg. 30-day uptime
                                    </span>
                                </div>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Goal: keep above 99.5% for client-facing apps.
                                </p>
                            </div>
                        </div>

                        {/* App performance table */}
                        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
                            <div className="flex items-center justify-between gap-2">
                                <h2 className="text-sm font-medium text-neutral-100">
                                    App-level performance
                                </h2>
                                <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                                    Filtered by: {contextLabel}
                                </span>
                            </div>

                            <div className="mt-4 overflow-x-auto">
                                <table className="min-w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-neutral-800 text-xs uppercase tracking-[0.12em] text-neutral-500">
                                            <th className="py-2 pr-4">App</th>
                                            <th className="py-2 pr-4">Status</th>
                                            <th className="py-2 pr-4">Uptime</th>
                                            <th className="py-2 pr-4">Latency</th>
                                            <th className="py-2 pr-4">Active users</th>
                                            <th className="py-2 pr-4">MRR</th>
                                            <th className="py-2 pr-4">Errors</th>
                                            <th className="py-2 pr-4">Owner</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleApps.map((app) => (
                                            <tr
                                                key={app.id}
                                                className="border-b border-neutral-900/80 last:border-b-0"
                                            >
                                                <td className="py-3 pr-4 align-middle">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-neutral-100">
                                                            {app.name}
                                                        </span>
                                                        {app.lastIncident && (
                                                            <span className="text-xs text-neutral-500">
                                                                Last incident: {app.lastIncident}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 pr-4 align-middle">
                                                    {getStatusBadge(app.status)}
                                                </td>
                                                <td className="py-3 pr-4 align-middle text-sm text-neutral-200">
                                                    {app.uptime}
                                                </td>
                                                <td className="py-3 pr-4 align-middle text-sm text-neutral-200">
                                                    {app.latencyMs} ms
                                                </td>
                                                <td className="py-3 pr-4 align-middle text-sm text-neutral-200">
                                                    {app.activeUsers.toLocaleString()}
                                                </td>
                                                <td className="py-3 pr-4 align-middle text-sm text-neutral-200">
                                                    {app.mrr}
                                                </td>
                                                <td className="py-3 pr-4 align-middle text-sm text-neutral-200">
                                                    {app.errorRate}
                                                </td>
                                                <td className="py-3 pr-4 align-middle text-xs text-neutral-500">
                                                    {app.owner}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* Right: contextual quick actions */}
                    <aside className="flex flex-col gap-4">
                        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4">
                            <h2 className="text-sm font-medium text-neutral-100">
                                Quick actions
                            </h2>
                            <p className="mt-1 text-xs text-neutral-500">
                                These are automatically{" "}
                                <span className="font-medium text-emerald-300">
                                    scoped to{" "}
                                    {selectedApp ? selectedApp.name : "your current app filter"}
                                </span>
                                . Changing the app context above will update them.
                            </p>

                            <div className="mt-4 flex flex-col gap-2">
                                {quickActions.map((action) => (
                                    <Link
                                        key={action.href}
                                        href={action.href}
                                        className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-2 text-sm transition hover:border-emerald-500/60 hover:bg-neutral-900"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-medium text-neutral-100 group-hover:text-emerald-300">
                                                {action.label}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500 group-hover:text-emerald-300">
                                                Go →
                                            </span>
                                        </div>
                                        <p className="mt-0.5 text-xs text-neutral-500">
                                            {action.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4 text-xs text-neutral-400">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                How to use this view
                            </h3>
                            <ul className="mt-2 space-y-1.5">
                                <li>
                                    1. Pick an app context at the top (or stay on{" "}
                                    <span className="text-neutral-200">All apps</span>).
                                </li>
                                <li>
                                    2. Scan the table for uptime, latency, and error hotspots.
                                </li>
                                <li>
                                    3. Use Quick Actions to jump into Labs, incidents, or dev
                                    workbench with the app pre-selected.
                                </li>
                            </ul>
                        </section>
                    </aside>
                </main>
            </div>
        </div>
    );
}