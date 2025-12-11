// app/ceo/performance/page.tsx
import { AppHealthStatus, HealthStatus, getStubAppHealth } from "@/lib/health";

export const dynamic = "force-dynamic";

function getStatusLabel(status: HealthStatus): string {
    switch (status) {
        case "healthy":
            return "Healthy";
        case "degraded":
            return "Degraded";
        case "down":
            return "Down";
        case "maintenance":
            return "Maintenance";
        default:
            return status;
    }
}

function getStatusClasses(status: HealthStatus): string {
    switch (status) {
        case "healthy":
            return "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/40";
        case "degraded":
            return "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/40";
        case "down":
            return "bg-red-500/10 text-red-400 ring-1 ring-red-500/40";
        case "maintenance":
            return "bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/40";
        default:
            return "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/40";
    }
}

function formatPercent(value: number | null | undefined): string {
    if (value == null) return "—";
    return `${value.toFixed(2)}%`;
}

function formatMs(value: number | null | undefined): string {
    if (value == null) return "—";
    return `${value} ms`;
}

function formatDate(value: string | null): string {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleString();
}

type SummaryMetrics = {
    total: number;
    healthy: number;
    degraded: number;
    down: number;
    maintenance: number;
};

function computeSummary(apps: AppHealthStatus[]): SummaryMetrics {
    return apps.reduce<SummaryMetrics>(
        (acc, app) => {
            acc.total += 1;
            if (app.status === "healthy") acc.healthy += 1;
            if (app.status === "degraded") acc.degraded += 1;
            if (app.status === "down") acc.down += 1;
            if (app.status === "maintenance") acc.maintenance += 1;
            return acc;
        },
        { total: 0, healthy: 0, degraded: 0, down: 0, maintenance: 0 }
    );
}

export default async function PerformancePage() {
    // In the future this could be swapped to an API fetch that hits a real
    // backend or monitoring provider. For now we use the shared health stub.
    const { apps, meta } = getStubAppHealth();
    const summary = computeSummary(apps);

    return (
        <div className="min-h-screen bg-black text-slate-100">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:px-6 lg:px-8">
                {/* Header */}
                <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                            App Performance
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-400">
                            Health snapshot for the Digital Hooligan fleet — PennyWize,
                            DropSignal, HypeWatch, Ops Toys and more. This view is fed from a
                            shared health layer so it can evolve into live monitoring later.
                        </p>
                    </div>
                    <div className="flex flex-col items-start gap-1 text-xs text-slate-500 md:items-end">
                        <span>
                            Source:{" "}
                            <span className="font-mono uppercase text-slate-300">
                                {meta.source}
                            </span>
                        </span>
                        <span>Generated: {formatDate(meta.generatedAt)}</span>
                    </div>
                </header>

                {/* Summary cards */}
                <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            Total apps
                        </p>
                        <p className="mt-2 text-2xl font-semibold">{summary.total}</p>
                        <p className="mt-1 text-xs text-slate-500">
                            All tracked environments
                        </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-900/60 bg-emerald-950/40 p-4">
                        <p className="text-xs uppercase tracking-wide text-emerald-400">
                            Healthy
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-emerald-300">
                            {summary.healthy}
                        </p>
                        <p className="mt-1 text-xs text-emerald-200/80">
                            Running within normal thresholds
                        </p>
                    </div>

                    <div className="rounded-2xl border border-amber-900/60 bg-amber-950/40 p-4">
                        <p className="text-xs uppercase tracking-wide text-amber-400">
                            Degraded
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-amber-200">
                            {summary.degraded}
                        </p>
                        <p className="mt-1 text-xs text-amber-200/80">
                            Elevated latency / minor incidents
                        </p>
                    </div>

                    <div className="rounded-2xl border border-red-900/60 bg-red-950/40 p-4">
                        <p className="text-xs uppercase tracking-wide text-red-400">
                            Down / Maintenance
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-red-200">
                            {summary.down + summary.maintenance}
                        </p>
                        <p className="mt-1 text-xs text-red-200/80">
                            Includes intentional maintenance windows
                        </p>
                    </div>
                </section>

                {/* Table */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
                            Fleet detail
                        </h2>
                        <p className="text-xs text-slate-500">
                            One row per app / environment. Scroll horizontally on smaller
                            screens.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
                        <table className="min-w-full border-collapse text-left text-xs md:text-sm">
                            <thead className="border-b border-slate-800 bg-slate-950/80">
                                <tr className="text-slate-400">
                                    <th className="px-4 py-3 font-medium">App</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Env</th>
                                    <th className="px-4 py-3 font-medium">Regions</th>
                                    <th className="px-4 py-3 font-medium">Uptime 7d</th>
                                    <th className="px-4 py-3 font-medium">Uptime 30d</th>
                                    <th className="px-4 py-3 font-medium">P50 latency</th>
                                    <th className="px-4 py-3 font-medium">P95 latency</th>
                                    <th className="px-4 py-3 font-medium">Open incidents</th>
                                    <th className="px-4 py-3 font-medium">Last incident</th>
                                    <th className="px-4 py-3 font-medium">Last deploy</th>
                                    <th className="px-4 py-3 font-medium">Last check</th>
                                </tr>
                            </thead>
                            <tbody>
                                {apps.map((app) => (
                                    <tr
                                        key={`${app.id}-${app.env}`}
                                        className="border-t border-slate-900/60 hover:bg-slate-900/40"
                                    >
                                        <td className="px-4 py-3 align-top">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-slate-100">
                                                    {app.name}
                                                </span>
                                                <span className="text-[11px] font-mono text-slate-500">
                                                    {app.slug} · {app.id}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${getStatusClasses(
                                                    app.status
                                                )}`}
                                            >
                                                {getStatusLabel(app.status)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="inline-flex rounded-full border border-slate-700 px-2 py-0.5 text-[11px] uppercase tracking-wide text-slate-300">
                                                {app.env}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="text-xs text-slate-200">
                                                {app.regions.join(", ")}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="font-mono text-xs text-slate-100">
                                                {formatPercent(app.uptime7d)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="font-mono text-xs text-slate-100">
                                                {formatPercent(app.uptime30d)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="font-mono text-xs text-slate-100">
                                                {formatMs(app.latencyP50Ms)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="font-mono text-xs text-slate-100">
                                                {formatMs(app.latencyP95Ms)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="font-mono text-xs text-slate-100">
                                                {app.incidentsOpen}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="text-xs text-slate-200">
                                                {formatDate(app.lastIncidentAt)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="text-xs text-slate-200">
                                                {formatDate(app.lastDeploymentAt)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="text-xs text-slate-200">
                                                {formatDate(app.lastCheckedAt)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}