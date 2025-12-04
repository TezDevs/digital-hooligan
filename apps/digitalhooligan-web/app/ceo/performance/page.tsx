'use client';

import React from 'react';
import Link from 'next/link';
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
type AppKey = 'all' | 'pennywize' | 'dropsignal' | 'hypewatch';

type TabProps = {
    href: string;
    label: string;
    isActive?: boolean;
};

function Tab({ href, label, isActive }: TabProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${isActive
                    ? 'bg-white text-slate-900 ring-2 ring-primary shadow-sm'
                    : 'border border-border bg-card text-muted-foreground hover:bg-muted'
                }`}
        >
            <span>{label}</span>
            {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            )}
        </Link>
    );
}

type MetricCardProps = {
    label: string;
    value: string;
    helper?: string;
    icon: React.ReactNode;
    tone?: 'good' | 'warning' | 'bad';
};

function metricTone(tone: MetricCardProps['tone']) {
    switch (tone) {
        case 'good':
            return 'border-emerald-500/40 bg-emerald-500/5';
        case 'warning':
            return 'border-amber-500/40 bg-amber-500/5';
        case 'bad':
            return 'border-rose-500/40 bg-rose-500/5';
        default:
            return 'border-border bg-card';
    }
}

function MetricCard({ label, value, helper, icon, tone }: MetricCardProps) {
    return (
        <div
            className={`rounded-2xl border p-4 shadow-sm sm:p-5 ${metricTone(
                tone,
            )}`}
        >
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
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
        </div>
    );
}

type AppMetrics = {
    name: string;
    latency: string;
    uptime: string;
    errorRate: string;
    incidentsOpen: number;
    incidentsPast30d: number;
    usersActive: string;
    notes: string;
};

const METRICS_BY_APP: Record<AppKey, AppMetrics> = {
    all: {
        name: 'All apps',
        latency: '180 ms',
        uptime: '99.92%',
        errorRate: '0.4%',
        incidentsOpen: 0,
        incidentsPast30d: 1,
        usersActive: '120',
        notes: 'All systems nominal. One minor blip in the last 30 days.',
    },
    pennywize: {
        name: 'PennyWize',
        latency: '150 ms',
        uptime: '99.95%',
        errorRate: '0.3%',
        incidentsOpen: 0,
        incidentsPast30d: 0,
        usersActive: '65',
        notes: 'Scraper + alerts behaving. Keep an eye on upstream APIs.',
    },
    dropsignal: {
        name: 'DropSignal',
        latency: '210 ms',
        uptime: '99.88%',
        errorRate: '0.6%',
        incidentsOpen: 0,
        incidentsPast30d: 1,
        usersActive: '35',
        notes: 'Occasional retailer slowdowns. Nothing on your side for now.',
    },
    hypewatch: {
        name: 'HypeWatch',
        latency: '190 ms',
        uptime: '99.90%',
        errorRate: '0.5%',
        incidentsOpen: 0,
        incidentsPast30d: 0,
        usersActive: '20',
        notes: 'Early days but stable. Room to push features without fear.',
    },
};

export default function PerformancePage() {
    const [selectedApp, setSelectedApp] = React.useState<AppKey>('all');
    const [timeRange, setTimeRange] = React.useState<TimeRange>('7d');

    const metrics = METRICS_BY_APP[selectedApp];

    return (
        <div className="space-y-6">
            {/* Header + nav */}
            <header className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            App performance
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Simple health dashboard for PennyWize, DropSignal, and HypeWatch.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Today: all apps healthy</span>
                    </div>
                </div>

                <nav className="flex flex-wrap gap-2">
                    <Tab href="/ceo" label="Overview" />
                    <Tab href="/ceo/tasks" label="Tasks" />
                    <Tab href="/ceo/deals" label="Deals" />
                    <Tab href="/ceo/finance" label="Finance" />
                    <Tab href="/ceo/performance" label="Performance" isActive />
                    <Tab href="/ceo/ai-hub" label="AI Hub" />
                    <Tab href="/ceo/settings" label="Settings" />
                    <Tab href="/ceo/logout" label="Logout" />
                </nav>
            </header>

            {/* Filters + back link */}
            <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        App
                    </span>
                    {(
                        [
                            ['all', 'All apps'],
                            ['pennywize', 'PennyWize'],
                            ['dropsignal', 'DropSignal'],
                            ['hypewatch', 'HypeWatch'],
                        ] as [AppKey, string][]
                    ).map(([key, label]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setSelectedApp(key)}
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition ${selectedApp === key
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'border border-border bg-card text-muted-foreground hover:bg-muted'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Range
                    </span>
                    {(['7d', '30d', '90d'] as TimeRange[]).map((range) => (
                        <button
                            key={range}
                            type="button"
                            onClick={() => setTimeRange(range)}
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition ${timeRange === range
                                ? 'bg-secondary text-secondary-foreground'
                                : 'border border-border bg-card text-muted-foreground hover:bg-muted'
                                }`}
                        >
                            {range === '7d'
                                ? 'Last 7 days'
                                : range === '30d'
                                    ? 'Last 30 days'
                                    : 'Last 90 days'}
                        </button>
                    ))}

                    <Link
                        href="/ceo"
                        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted"
                    >
                        ← Back to overview
                    </Link>
                </div>
            </section>

            {/* Metrics grid */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
                {/* Left: key metrics */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Core metrics
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {metrics.name} ·{' '}
                                    {timeRange === '7d'
                                        ? 'Last 7 days'
                                        : timeRange === '30d'
                                            ? 'Last 30 days'
                                            : 'Last 90 days'}
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Activity className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <MetricCard
                                label="Latency (p95)"
                                value={metrics.latency}
                                helper="Lower is better. Keep under ~250 ms."
                                icon={<Clock className="h-4 w-4" />}
                                tone="good"
                            />
                            <MetricCard
                                label="Uptime"
                                value={metrics.uptime}
                                helper="Rolling uptime across the selected window."
                                icon={<Server className="h-4 w-4" />}
                                tone="good"
                            />
                            <MetricCard
                                label="Error rate"
                                value={metrics.errorRate}
                                helper="Non-2xx responses (approx)."
                                icon={<AlertTriangle className="h-4 w-4" />}
                                tone={metrics.errorRate > '1%' ? 'warning' : 'good'}
                            />
                            <MetricCard
                                label="Active users"
                                value={metrics.usersActive}
                                helper="Rough count of people touching the app."
                                icon={<Users className="h-4 w-4" />}
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Incidents
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Lightweight view of current + recent issues.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Zap className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <MetricCard
                                label="Open incidents"
                                value={String(metrics.incidentsOpen)}
                                helper="Anything you still need to fix."
                                icon={<AlertTriangle className="h-4 w-4" />}
                                tone={metrics.incidentsOpen > 0 ? 'bad' : 'good'}
                            />
                            <MetricCard
                                label="Incidents (30d)"
                                value={String(metrics.incidentsPast30d)}
                                helper="Helps you see if things are getting noisy."
                                icon={<BarChart3 className="h-4 w-4" />}
                                tone={metrics.incidentsPast30d > 2 ? 'warning' : 'good'}
                            />
                        </div>
                    </div>
                </div>

                {/* Right: notes / narrative */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Readout for future Tez
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Small narrative so you don&apos;t have to decipher charts at
                                11pm.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Activity className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-4 space-y-3 text-xs text-muted-foreground">
                        <p>{metrics.notes}</p>
                        <p>
                            If this card ever feels scary, that&apos;s your cue to pause new
                            features and run a quick hardening sprint: logs, alerts,
                            dashboards, and a little bit of refactoring.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}