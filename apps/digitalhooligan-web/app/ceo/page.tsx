'use client';

import React from 'react';
import Link from 'next/link';
import {
    Activity,
    BarChart3,
    DollarSign,
    ShoppingBag,
    Handshake,
    GaugeCircle,
    Settings,
} from 'lucide-react';

type TabProps = {
    href: string;
    label: string;
    isActive?: boolean;
};

function Tab({ href, label, isActive }: TabProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition ${isActive
                    ? 'bg-white text-slate-900 ring-2 ring-primary shadow-sm'
                    : 'border border-border bg-card text-muted-foreground hover:bg-muted'
                }`}
        >
            <span className="flex items-center gap-1.5">
                <span>{label}</span>
                {isActive && (
                    <span className="h-2 w-2 rounded-full bg-primary ring-2 ring-primary/40" />
                )}
            </span>
        </Link>
    );
}

type SnapshotCardProps = {
    label: string;
    value: string;
    helper?: string;
    href?: string;
    icon: React.ReactNode;
};

function SnapshotCard({ label, value, helper, href, icon }: SnapshotCardProps) {
    const content = (
        <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-4 text-left shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
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
            {href && (
                <span className="mt-3 inline-flex items-center text-xs font-medium text-primary">
                    View details
                    <span className="ml-1 text-[11px]">↗</span>
                </span>
            )}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block h-full">
                {content}
            </Link>
        );
    }

    return content;
}

type AdminTask = {
    label: string;
    status: 'Done' | 'In review' | 'In progress' | 'Upcoming';
};

const adminTasks: AdminTask[] = [
    { label: 'EIN + LLC paperwork', status: 'Done' },
    { label: 'SAM.gov entity registration', status: 'In review' },
    { label: 'Navy Federal business account', status: 'In progress' },
    { label: 'VSOB / SBA certifications', status: 'Upcoming' },
];

function adminStatusTone(status: AdminTask['status']) {
    switch (status) {
        case 'Done':
            return 'bg-emerald-500/10 text-emerald-400';
        case 'In review':
            return 'bg-sky-500/10 text-sky-400';
        case 'In progress':
            return 'bg-amber-500/10 text-amber-400';
        case 'Upcoming':
        default:
            return 'bg-slate-500/10 text-slate-300';
    }
}

export default function CeoOverviewPage() {
    return (
        <div className="space-y-6">
            {/* Header + nav */}
            <header className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            CEO dashboard
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            One place to see money, products, deals, and app health across
                            Digital Hooligan.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Today: systems nominal</span>
                    </div>
                </div>

                <nav className="flex flex-wrap gap-2">
                    <Tab href="/ceo" label="Overview" isActive />
                    <Tab href="/ceo/tasks" label="Tasks" />
                    <Tab href="/ceo/deals" label="Deals" />
                    <Tab href="/ceo/finance" label="Finance" />
                    <Tab href="/ceo/performance" label="Performance" />
                    <Tab href="/ceo/ai-hub" label="AI Hub" />
                    <Tab href="/ceo/settings" label="Settings" />
                    <Tab href="/ceo/logout" label="Logout" />
                </nav>
            </header>

            {/* Snapshot row */}
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <SnapshotCard
                    label="Money"
                    value="$4,250"
                    helper="Est. MRR across all live products."
                    icon={<DollarSign className="h-4 w-4" />}
                    href="/ceo/finance"
                />
                <SnapshotCard
                    label="Products"
                    value="3 live"
                    helper="PennyWize, DropSignal, HypeWatch."
                    icon={<ShoppingBag className="h-4 w-4" />}
                    href="/labs/hq"
                />
                <SnapshotCard
                    label="Deals"
                    value="2 open"
                    helper="Active opportunities + proposals."
                    icon={<Handshake className="h-4 w-4" />}
                    href="/ceo/deals"
                />
                <SnapshotCard
                    label="App performance"
                    value="99.92%"
                    helper="All apps healthy · 0 open incidents."
                    icon={<Activity className="h-4 w-4" />}
                    href="/ceo/performance"
                />
            </section>

            {/* Admin + Today */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
                {/* Admin checklist */}
                <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Admin
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Quick admin checklist for Digital Hooligan LLC.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Settings className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        {adminTasks.map((task) => (
                            <li
                                key={task.label}
                                className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <span>{task.label}</span>
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${adminStatusTone(
                                        task.status,
                                    )}`}
                                >
                                    {task.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Today + settings quick link */}
                <div className="space-y-4">
                    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Today
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    High-impact moves for future Tez.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <GaugeCircle className="h-4 w-4" />
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-xs">
                            <li className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                Review new opportunities on Gun.io / Upwork.
                            </li>
                            <li className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                Polish Digital Hooligan marketing site copy.
                            </li>
                            <li className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                Sketch next milestones for PennyWize and DropSignal.
                            </li>
                        </ul>
                    </section>

                    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Settings quick link
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Jump straight into CEO dashboard settings.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Settings className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="mt-3">
                            <Link
                                href="/ceo/settings"
                                className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                            >
                                Open settings →
                            </Link>
                        </div>
                    </section>
                </div>
            </section>

            {/* Decision log */}
            <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Decision log
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Lightweight history of key calls so future you remembers why.
                        </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                        <BarChart3 className="h-4 w-4" />
                    </div>
                </div>

                <ul className="mt-4 space-y-2 text-xs">
                    <li className="flex items-start justify-between rounded-xl border border-border bg-background/60 px-3 py-2">
                        <span className="font-mono text-[11px] text-muted-foreground">
                            2025-12-03
                        </span>
                        <span className="ml-3 flex-1">
                            Lock in Digital Hooligan as a multi-app studio (PennyWize,
                            DropSignal, HypeWatch) with shared internal dashboards.
                        </span>
                    </li>
                    <li className="flex items-start justify-between rounded-xl border border-border bg-background/60 px-3 py-2">
                        <span className="font-mono text-[11px] text-muted-foreground">
                            2025-12-02
                        </span>
                        <span className="ml-3 flex-1">
                            Add dedicated app performance view and tie it into the CEO
                            dashboard.
                        </span>
                    </li>
                    <li className="flex items-start justify-between rounded-xl border border-border bg-background/60 px-3 py-2">
                        <span className="font-mono text-[11px] text-muted-foreground">
                            2025-11-30
                        </span>
                        <span className="ml-3 flex-1">
                            Decide to pursue both gov contracting and SaaS revenue streams.
                        </span>
                    </li>
                </ul>
            </section>
        </div>
    );
}