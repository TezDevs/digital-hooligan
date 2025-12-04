'use client';

import React from 'react';
import Link from 'next/link';
import {
    Activity,
    Briefcase,
    DollarSign,
    LineChart,
    Target,
    ClipboardList,
    ShieldCheck,
    AlertTriangle,
    Bot,
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

type FocusTask = {
    title: string;
    tag: 'Product' | 'Finance' | 'Admin' | 'Gov';
    when: string;
};

const TODAY_FOCUS: FocusTask[] = [
    {
        title: 'Finish CEO dashboard shell + navigation',
        tag: 'Product',
        when: 'Today',
    },
    {
        title: 'Check SAM.gov + Navy Federal status',
        tag: 'Gov',
        when: 'This week',
    },
    {
        title: 'Outline PennyWize + DropSignal MVPs',
        tag: 'Product',
        when: 'This week',
    },
    {
        title: 'Capture Dev Workbench + AI Hub next steps',
        tag: 'Admin',
        when: 'This week',
    },
];

type DealStage = 'Lead' | 'Proposal' | 'Negotiation' | 'Won';

type DealSummary = {
    stage: DealStage;
    count: number;
};

const DEAL_SUMMARY: DealSummary[] = [
    { stage: 'Lead', count: 1 },
    { stage: 'Proposal', count: 1 },
    { stage: 'Negotiation', count: 1 },
    { stage: 'Won', count: 1 },
];

type AppHealth = {
    name: string;
    status: 'Green' | 'Yellow';
    note: string;
};

const APP_HEALTH: AppHealth[] = [
    {
        name: 'PennyWize',
        status: 'Green',
        note: 'MVP planning + future alerts.',
    },
    {
        name: 'DropSignal',
        status: 'Green',
        note: 'Assist-mode concept defined.',
    },
    {
        name: 'HypeWatch',
        status: 'Yellow',
        note: 'Concept ready, details later.',
    },
    {
        name: 'Ops Toys',
        status: 'Green',
        note: 'Icon, concept, and positioning.',
    },
];

type Decision = {
    date: string;
    text: string;
};

const DECISION_LOG: Decision[] = [
    {
        date: '2025-12-03',
        text: 'Lock in Digital Hooligan as a multi-app studio (PennyWize, DropSignal, HypeWatch) with shared internal dashboards.',
    },
    {
        date: '2025-12-02',
        text: 'Add dedicated app performance view and tie it into the CEO dashboard.',
    },
    {
        date: '2025-11-30',
        text: 'Decide to pursue both gov contracting and SaaS revenue streams.',
    },
];

function tagColor(tag: FocusTask['tag']) {
    switch (tag) {
        case 'Product':
            return 'bg-sky-500/10 text-sky-400';
        case 'Finance':
            return 'bg-emerald-500/10 text-emerald-400';
        case 'Admin':
            return 'bg-purple-500/10 text-purple-300';
        case 'Gov':
            return 'bg-amber-500/10 text-amber-300';
        default:
            return 'bg-slate-500/10 text-slate-300';
    }
}

function appStatusColor(status: AppHealth['status']) {
    switch (status) {
        case 'Green':
            return 'bg-emerald-500';
        case 'Yellow':
            return 'bg-amber-400';
        default:
            return 'bg-slate-500';
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

            {/* Quick snapshot row */}
            <section className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
                {/* Money */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Money
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">$4,250</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Est. MRR across all live products once initial apps ship.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <DollarSign className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mt-3 text-[11px] text-muted-foreground">
                        <p>Pipeline blend from gov + SaaS assumptions.</p>
                    </div>
                </div>

                {/* Products */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Products
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">3 live</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                PennyWize, DropSignal, HypeWatch (plus Ops Toys internally).
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <Briefcase className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mt-3 text-[11px] text-muted-foreground">
                        <p>Roadmaps live in CEO dashboard + Labs HQ.</p>
                    </div>
                </div>

                {/* Deals */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Deals
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">2 open</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Active opportunities + proposals across gov + freelance + apps.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <LineChart className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mt-3 text-[11px] text-muted-foreground">
                        <p>See full pipeline in the Deals tab.</p>
                    </div>
                </div>

                {/* App performance */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                App performance
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">
                                99.92%
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                All apps healthy + 0 open incidents (for now).
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <Activity className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="mt-3 text-[11px] text-muted-foreground">
                        <p>Dig deeper in App performance for latency + incidents.</p>
                    </div>
                </div>
            </section>

            {/* Row: Today’s focus + CEO Copilot */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.4fr)]">
                {/* Today’s focus */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Today&apos;s focus
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                High-impact moves for future Tez across product, gov, and admin.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Target className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        {TODAY_FOCUS.map((task) => (
                            <li
                                key={task.title}
                                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div>
                                    <p className="font-medium">{task.title}</p>
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {task.when}
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${tagColor(
                                        task.tag,
                                    )}`}
                                >
                                    {task.tag}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-3 text-[11px] text-muted-foreground">
                        Later, this list can sync directly with the Tasks view and AI Hub
                        assistants instead of being static.
                    </p>
                </div>

                {/* CEO Copilot panel */}
                <div className="rounded-2xl border border-primary/60 bg-card/80 p-4 shadow-sm ring-1 ring-primary/30 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-primary">
                                CEO Copilot (preview)
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Tiny readout that stitches Tasks, Deals, Performance, and Dev
                                Workbench into one suggestion.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/40 bg-primary/10">
                            <Bot className="h-4 w-4 text-primary" />
                        </div>
                    </div>

                    <div className="mt-4 space-y-3 text-xs">
                        <div className="rounded-xl border border-border bg-background/80 px-3 py-2">
                            <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                Today&apos;s headline
                            </p>
                            <p className="mt-1 font-semibold">
                                Finish the CEO shell, then make one concrete move on revenue.
                            </p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                                Close out the dashboard UI work, then push either a gov opp
                                (SAM.gov / Gun.io) or an app MVP milestone so momentum stays
                                real.
                            </p>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                            <div className="rounded-xl border border-border bg-background/70 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Deals snapshot
                                </p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    You have{' '}
                                    <span className="font-semibold">
                                        {DEAL_SUMMARY.reduce((acc, d) => acc + d.count, 0)} active
                                        deals
                                    </span>{' '}
                                    across gov, freelance, and product. Keep 1–3 truly alive; park
                                    the rest.
                                </p>
                            </div>
                            <div className="rounded-xl border border-border bg-background/70 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Dev / refactor nudge
                                </p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Pick one small refactor or UI polish task on the current
                                    feature branch, ship it, and let Dev Workbench + your AI pair
                                    programmer handle the details.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-dashed border-border bg-background/60 px-3 py-2">
                            <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                Future wiring
                            </p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                                This panel can later read live data from Tasks, Deals, App
                                performance, and GitHub (Dev Workbench) to generate a fresh
                                briefing every morning.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Row: Products & apps + Admin / GOV / risk */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.5fr)]">
                {/* Products & apps */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Products & apps
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                High-level readout of the main Digital Hooligan properties.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <ClipboardList className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
                        {APP_HEALTH.map((app) => (
                            <li
                                key={app.name}
                                className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div className="mt-1">
                                    <span
                                        className={`inline-flex h-2.5 w-2.5 rounded-full ${appStatusColor(
                                            app.status,
                                        )}`}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium">{app.name}</p>
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {app.note}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-3 text-[11px] text-muted-foreground">
                        Future: link directly into each app&apos;s internal dashboard or
                        performance view.
                    </p>
                </div>

                {/* Admin / GOV / risk */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Admin / GOV / risk
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Quick admin checklist for Digital Hooligan LLC.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <ShieldCheck className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        <li className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2">
                            <span>EIN + LLC paperwork</span>
                            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                                Done
                            </span>
                        </li>
                        <li className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2">
                            <span>SAM.gov entity registration</span>
                            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                                In review
                            </span>
                        </li>
                        <li className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2">
                            <span>Navy Federal business account</span>
                            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                                In progress
                            </span>
                        </li>
                        <li className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2">
                            <span>VSOB / SBA certifications</span>
                            <span className="rounded-full bg-slate-500/10 px-2 py-0.5 text-[10px] font-semibold text-slate-200">
                                Upcoming
                            </span>
                        </li>
                    </ul>

                    <p className="mt-3 text-[11px] text-muted-foreground">
                        This section can later sync with real due dates and reminders from
                        CEO Copilot.
                    </p>
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
                        <AlertTriangle className="h-4 w-4" />
                    </div>
                </div>

                <ul className="mt-4 space-y-2 text-xs">
                    {DECISION_LOG.map((entry) => (
                        <li
                            key={entry.date + entry.text}
                            className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                        >
                            <div className="mt-1 text-[11px] font-semibold text-muted-foreground">
                                {entry.date}
                            </div>
                            <p className="text-[11px] text-muted-foreground">{entry.text}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}