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
        case "ok":
            return "OK";
        case "slow":
            return "Slow";
        default:
            return status;
    }
}

function getStatusClasses(status: HealthStatus): string {
    switch (status) {
        case "healthy":
        case "ok":
            return "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/40";
        case "degraded":
        case "slow":
            return "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/40";
        case "down":
            return "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/40";
        case "maintenance":
            return "bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/40";
        default:
            return "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/40";
    }
}

function formatMs(value: number | null | undefined): string {
    if (value == null) return "—";
    return `${value} ms`;
}

function formatDate(value: string | null | undefined): string {
    if (!value) return "—";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString();
}

type SummaryMetrics = {
    total: number;
    healthy: number;
    degraded: number;
    down: number;
    maintenance: number;
};

function computeSummary(apps: AppHealthStatus[] = []): SummaryMetrics {
    return (apps ?? []).reduce<SummaryMetrics>(
        (acc, app) => {
            acc.total += 1;
            if (app.status === "healthy" || app.status === "ok") acc.healthy += 1;
            if (app.status === "degraded" || app.status === "slow") acc.degraded += 1;
            if (app.status === "down") acc.down += 1;
            if (app.status === "maintenance") acc.maintenance += 1;
            return acc;
        },
        { total: 0, healthy: 0, degraded: 0, down: 0, maintenance: 0 }
    );
}

export default async function PerformancePage() {
    // Later: swap this stub for a real API fetch.
    const { apps, meta } = getStubAppHealth();
    const summary = computeSummary(apps);

    return (
        <div className="min-h-screen bg-black text-slate-100">
            <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 lg:px-8">
                <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                            App Performance
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-400">
                            Health snapshot for the Digital Hooligan fleet. This view is fed
                            from a shared health layer so it can evolve into live monitoring later.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-1 text-xs text-slate-400 md:items-end">
                        <div>
                            Source:{" "}
                            <span className="font-mono uppercase text-slate-300">
                                {meta.source}
                            </span>
                        </div>
                        <div>
                            Generated:{" "}
                            <span className="font-mono text-slate-300">
                                {formatDate(meta.generatedAt)}
                            </span>
                        </div>
                    </div>
                </header>

                <section className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                        <div className="text-xs text-slate-400">Total</div>
                        <div className="mt-1 text-2xl font-semibold">{summary.total}</div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                        <div className="text-xs text-slate-400">Healthy</div>
                        <div className="mt-1 text-2xl font-semibold">{summary.healthy}</div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                        <div className="text-xs text-slate-400">Degraded</div>
                        <div className="mt-1 text-2xl font-semibold">{summary.degraded}</div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                        <div className="text-xs text-slate-400">Down</div>
                        <div className="mt-1 text-2xl font-semibold">{summary.down}</div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                        <div className="text-xs text-slate-400">Maintenance</div>
                        <div className="mt-1 text-2xl font-semibold">
                            {summary.maintenance}
                        </div>
                    </div>
                </section>

                <section className="mt-8 overflow-hidden rounded-xl ring-1 ring-white/10">
                    <div className="bg-white/5 px-4 py-3 text-sm font-semibold">
                        Apps
                    </div>

                    <div className="divide-y divide-white/10">
                        {(apps ?? []).map((app) => (
                            <div
                                key={app.appId}
                                className="flex flex-col gap-2 px-4 py-4 md:flex-row md:items-center md:justify-between"
                            >
                                <div className="min-w-0">
                                    <div className="flex items-center gap-3">
                                        <div className="truncate font-mono text-sm text-slate-200">
                                            {app.appId}
                                        </div>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getStatusClasses(
                                                app.status
                                            )}`}
                                        >
                                            {getStatusLabel(app.status)}
                                        </span>
                                    </div>
                                    {app.message ? (
                                        <div className="mt-1 text-xs text-slate-400">
                                            {app.message}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="flex flex-wrap gap-4 text-xs text-slate-400 md:justify-end">
                                    <div>
                                        Latency:{" "}
                                        <span className="font-mono text-slate-300">
                                            {formatMs(app.latencyMs)}
                                        </span>
                                    </div>
                                    <div>
                                        Checked:{" "}
                                        <span className="font-mono text-slate-300">
                                            {formatDate(app.checkedAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}