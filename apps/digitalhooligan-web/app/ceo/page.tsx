'use client';

import React from 'react';
import Link from 'next/link';
import {
    Activity,
    BarChart3,
    DollarSign,
    Package,
    Handshake,
    ListChecks,
    Settings,
    Sparkles,
} from 'lucide-react';

type SnapshotProps = {
    title: string;
    value: string;
    helper?: string;
    icon: React.ReactNode;
    href?: string;
};

function SnapshotCard({ title, value, helper, icon, href }: SnapshotProps) {
    const content = (
        <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:border-primary/60 hover:shadow-md sm:p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {title}
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
                <p className="mt-3 inline-flex items-center text-xs font-medium text-primary">
                    View details
                    <span className="ml-1">→</span>
                </p>
            )}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="h-full">
                {content}
            </Link>
        );
    }

    return content;
}

function Tab({
    href,
    label,
    isActive,
}: {
    href: string;
    label: string;
    isActive?: boolean;
}) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition ${isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
        >
            {label}
        </Link>
    );
}

export default function CeoOverviewPage() {
    // Placeholder values – you can later wire this to real data / metrics.
    const totalMoney = '$4,250';
    const numProducts = 3; // PennyWize, DropSignal, HypeWatch
    const openDeals = 2;
    const uptime = 99.92;
    const openIncidents = 0;

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

            {/* Snapshot grid */}
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <SnapshotCard
                    title="Money"
                    value={totalMoney}
                    helper="Est. MRR across all live products"
                    icon={<DollarSign className="h-4 w-4" />}
                    href="/ceo/finance"
                />
                <SnapshotCard
                    title="Products"
                    value={`${numProducts} live`}
                    helper="PennyWize, DropSignal, HypeWatch"
                    icon={<Package className="h-4 w-4" />}
                    href="/ceo/products"
                />
                <SnapshotCard
                    title="Deals"
                    value={`${openDeals} open`}
                    helper="Active opportunities + proposals"
                    icon={<Handshake className="h-4 w-4" />}
                    href="/ceo/deals"
                />
                <SnapshotCard
                    title="App performance"
                    value={`${uptime.toFixed(2)}%`}
                    helper={
                        openIncidents === 0
                            ? 'All apps healthy · 0 open incidents'
                            : `${openIncidents} open incidents · check details`
                    }
                    icon={<Activity className="h-4 w-4" />}
                    href="/ceo/performance"
                />
            </section>

            {/* Admin + Today row */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                {/* Admin panel */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
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
                                <ListChecks className="h-4 w-4" />
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-xs">
                            <li className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2">
                                <span>EIN + LLC paperwork</span>
                                <span className="text-[11px] font-medium text-emerald-500">
                                    Done
                                </span>
                            </li>
                            <li className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2">
                                <span>SAM.gov entity registration</span>
                                <span className="text-[11px] font-medium text-amber-500">
                                    In review
                                </span>
                            </li>
                            <li className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2">
                                <span>Navy Federal business account</span>
                                <span className="text-[11px] font-medium text-amber-500">
                                    In progress
                                </span>
                            </li>
                            <li className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2">
                                <span>VSOB / SBA certifications</span>
                                <span className="text-[11px] font-medium text-sky-500">
                                    Upcoming
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Today panel */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
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
                                <Sparkles className="h-4 w-4" />
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
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
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
                    </div>
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
                    <li className="rounded-xl border border-border bg-background/60 px-3 py-2">
                        <span className="font-medium">2025-12-03 ·</span>{' '}
                        Lock in Digital Hooligan as a multi-app studio (PennyWize, DropSignal,
                        HypeWatch) with shared internal dashboards.
                    </li>
                    <li className="rounded-xl border border-border bg-background/60 px-3 py-2">
                        <span className="font-medium">2025-12-02 ·</span>{' '}
                        Add dedicated app performance view and tie it into the CEO dashboard.
                    </li>
                    <li className="rounded-xl border border-border bg-background/60 px-3 py-2">
                        <span className="font-medium">2025-11-30 ·</span>{' '}
                        Decide to pursue both gov contracting and SaaS revenue streams.
                    </li>
                </ul>
            </section>
        </div>
    );
}