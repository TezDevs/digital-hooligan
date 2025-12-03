'use client';

import React from 'react';
import {
    Activity,
    AlertTriangle,
    BarChart3,
    Clock,
    Server,
    Users,
    Zap,
} from 'lucide-react';

type TimeRange = '7d' | '30d' | '90d';

type AppKey = 'all' | 'pennywize' | 'dropsignal' | 'hypewatch' | 'marketing';

const APPS: { key: AppKey; label: string }[] = [
    { key: 'all', label: 'All apps' },
    { key: 'pennywize', label: 'PennyWize' },
    { key: 'dropsignal', label: 'DropSignal' },
    { key: 'hypewatch', label: 'HypeWatch' },
    { key: 'marketing', label: 'Marketing site' },
];

const TIME_RANGES: { key: TimeRange; label: string }[] = [
    { key: '7d', label: 'Last 7 days' },
    { key: '30d', label: 'Last 30 days' },
    { key: '90d', label: 'Last 90 days' },
];

// Placeholder data – you can wire this up to real metrics later
const METRICS_BY_APP: Record<
    AppKey,
    {
        activeUsers: number;
        subs: number;
        uptime: number;
        incidents: number;
        latencyMs: number;
        errorRate: number;
    }
> = {
    all: {
        activeUsers: 1280,
        subs: 96,
        uptime: 99.92,
        incidents: 2,
        latencyMs: 180,
        errorRate: 0.23,
    },
    pennywize: {
        activeUsers: 420,
        subs: 22,
        uptime: 99.99,
        incidents: 0,
        latencyMs: 140,
        errorRate: 0.11,
    },
    dropsignal: {
        activeUsers: 560,
        subs: 48,
        uptime: 99.85,
        incidents: 1,
        latencyMs: 190,
        errorRate: 0.35,
    },
    hypewatch: {
        activeUsers: 220,
        subs: 18,
        uptime: 99.7,
        incidents: 1,
        latencyMs: 210,
        errorRate: 0.41,
    },
    marketing: {
        activeUsers: 80,
        subs: 8,
        uptime: 100,
        incidents: 0,
        latencyMs: 95,
        errorRate: 0.03,
    },
};

function MetricCard(props: {
    label: string;
    value: string;
    helper?: string;
    icon: React.ReactNode;
    trend?: 'up' | 'down' | 'flat';
}) {
    const { label, value, helper, icon, trend } = props;

    const trendLabel =
        trend === 'up'
            ? 'vs. prev period'
            : trend === 'down'
                ? 'vs. prev period'
                : trend === 'flat'
                    ? 'steady'
                    : undefined;

    const trendColor =
        trend === 'up'
            ? 'text-emerald-500'
            : trend === 'down'
                ? 'text-red-500'
                : 'text-muted-foreground';

    return (
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground tracking-wide">
                        {label}
                    </p>
                    <p className="mt-1 text-xl font-semibold leading-tight sm:text-2xl">
                        {value}
                    </p>
                    {helper && (
                        <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
                    )}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                    {icon}
                </div>
            </div>
            {trend && (
                <p className={`mt-3 text-xs font-medium ${trendColor}`}>
                    {trend === 'up' && '▲ Improving'}{' '}
                    {trend === 'down' && '▼ Degraded'}
                    {trend === 'flat' && '▬ Stable'} {trendLabel && `· ${trendLabel}`}
                </p>
            )}
        </div>
    );
}

export default function PerformancePage() {
    const [selectedApp, setSelectedApp] = React.useState<AppKey>('all');
    const [timeRange, setTimeRange] = React.useState<TimeRange>('7d');

    const metrics = METRICS_BY_APP[selectedApp];

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        App performance
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        High-level health across PennyWize, DropSignal, HypeWatch, and the
                        marketing site.
                    </p>
                </div>
            </header>

            {/* Filters */}
            <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                    {APPS.map((app) => (
                        <button
                            key={app.key}
                            type="button"
                            onClick={() => setSelectedApp(app.key)}
                            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${selectedApp === app.key
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border bg-background text-muted-foreground hover:bg-muted'
                                }`}
                        >
                            {app.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Time range
                    </span>
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                        className="h-8 rounded-full border border-border bg-background px-3 text-xs text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    >
                        {TIME_RANGES.map((range) => (
                            <option key={range.key} value={range.key}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            {/* KPI cards */}
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                    label="Active users"
                    value={metrics.activeUsers.toLocaleString()}
                    helper={
                        selectedApp === 'all'
                            ? 'Unique users across all apps'
                            : `Users active in ${APPS.find((a) => a.key === selectedApp)?.label}`
                    }
                    icon={<Users className="h-4 w-4" />}
                    trend="up"
                />
                <MetricCard
                    label="Subscriptions"
                    value={metrics.subs.toLocaleString()}
                    helper="Current paid + trial accounts"
                    icon={<BarChart3 className="h-4 w-4" />}
                    trend="up"
                />
                <MetricCard
                    label="30-day uptime"
                    value={`${metrics.uptime.toFixed(2)}%`}
                    helper="Target: ≥ 99.9%"
                    icon={<Server className="h-4 w-4" />}
                    trend={metrics.uptime >= 99.9 ? 'up' : 'down'}
                />
                <MetricCard
                    label="Incidents"
                    value={metrics.incidents.toString()}
                    helper="Opened in the selected window"
                    icon={<AlertTriangle className="h-4 w-4" />}
                    trend={metrics.incidents === 0 ? 'up' : 'down'}
                />
            </section>

            {/* Charts + incident panel (placeholder UI) */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)]">
                {/* Placeholder trend block */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Traffic & latency
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Synthetic chart placeholder – hook this up to real metrics
                                later.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Activity className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-4 h-40 rounded-xl border border-dashed border-border bg-muted/40" />

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-border bg-background/60 p-3 text-xs">
                            <p className="text-muted-foreground">P95 latency</p>
                            <p className="mt-1 text-base font-semibold">
                                {metrics.latencyMs} ms
                            </p>
                        </div>
                        <div className="rounded-xl border border-border bg-background/60 p-3 text-xs">
                            <p className="text-muted-foreground">Error rate</p>
                            <p className="mt-1 text-base font-semibold">
                                {metrics.errorRate.toFixed(2)}%
                            </p>
                        </div>
                        <div className="rounded-xl border border-border bg-background/60 p-3 text-xs">
                            <p className="text-muted-foreground">Uptime SLO</p>
                            <p className="mt-1 text-base font-semibold">
                                {metrics.uptime.toFixed(2)}%
                            </p>
                        </div>
                    </div>
                </div>

                {/* Incidents + status */}
                <div className="flex flex-col gap-4">
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Incident status
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Quick snapshot of open issues impacting users.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <AlertTriangle className="h-4 w-4" />
                            </div>
                        </div>

                        <ul className="mt-4 space-y-3 text-xs">
                            <li className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 p-3">
                                <div>
                                    <p className="font-medium">
                                        No major incidents in the last {timeRange}.
                                    </p>
                                    <p className="mt-1 text-muted-foreground">
                                        Wire this panel up to your incident tracker (PagerDuty,
                                        Opsgenie, GitHub issues, etc.).
                                    </p>
                                </div>
                                <span className="mt-1 inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                                    Healthy
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Status by app
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Lightweight “is it up?” snapshot across the stack.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Zap className="h-4 w-4" />
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-xs">
                            {APPS.filter((a) => a.key !== 'all').map((app) => (
                                <li
                                    key={app.key}
                                    className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2"
                                >
                                    <span>{app.label}</span>
                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-500">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Up
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* App-level table */}
            <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            App summary
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            One row per app with core health signals. Ideal for quick
                            stand-ups.
                        </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                        <Clock className="h-4 w-4" />
                    </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full text-left text-xs">
                        <thead className="border-b border-border text-[11px] uppercase text-muted-foreground">
                            <tr>
                                <th className="py-2 pr-4">App</th>
                                <th className="px-4 py-2">Active users</th>
                                <th className="px-4 py-2">Subscriptions</th>
                                <th className="px-4 py-2">Uptime (30d)</th>
                                <th className="px-4 py-2">P95 latency</th>
                                <th className="px-4 py-2">Incidents</th>
                                <th className="px-4 py-2">Error rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/70">
                            {APPS.filter((a) => a.key !== 'all').map((app) => {
                                const data = METRICS_BY_APP[app.key];
                                return (
                                    <tr key={app.key}>
                                        <td className="py-2 pr-4 text-sm font-medium">
                                            {app.label}
                                        </td>
                                        <td className="px-4 py-2">
                                            {data.activeUsers.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2">
                                            {data.subs.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2">
                                            {data.uptime.toFixed(2)}%
                                        </td>
                                        <td className="px-4 py-2">
                                            {data.latencyMs} ms
                                        </td>
                                        <td className="px-4 py-2">{data.incidents}</td>
                                        <td className="px-4 py-2">
                                            {data.errorRate.toFixed(2)}%
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}