'use client';

import React from 'react';
import Link from 'next/link';
import {
    Activity,
    Briefcase,
    Gauge,
    Target,
    LineChart,
    Building2,
    ShieldCheck,
    Rocket,
    LayoutDashboard,
    Cpu,
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

const TODAY_TASKS = [
    {
        label: 'Finish CEO dashboard shell + navigation',
        tag: 'Product',
        due: 'Due 2025-12-05',
    },
    {
        label: 'Map revenue model across apps + freelance',
        tag: 'Finance',
        due: 'Draft 2025-12-09',
    },
    {
        label: 'Navy Federal business account follow-up',
        tag: 'Admin',
        due: 'Due 2025-12-06',
    },
    {
        label: 'Define PennyWize MVP feature list',
        tag: 'Product',
        due: 'Due 2025-12-07',
    },
];

const DEAL_STAGES = [
    { stage: 'Lead', count: 1 },
    { stage: 'Proposal', count: 1 },
    { stage: 'Negotiation', count: 1 },
    { stage: 'Won', count: 1 },
];

const PRODUCTS = [
    {
        code: 'PW',
        name: 'PennyWize',
        status: 'Building',
        color: 'bg-emerald-500',
        note: 'Penny stock intel + alerts with future social layer.',
    },
    {
        code: 'DS',
        name: 'DropSignal',
        status: 'Design',
        color: 'bg-sky-500',
        note: 'Sneaker & streetwear price-drop bot (assist mode first).',
    },
    {
        code: 'HW',
        name: 'HypeWatch',
        status: 'Idea',
        color: 'bg-amber-500',
        note: 'Collectibles display piece tracker + price alerts.',
    },
    {
        code: 'OT',
        name: 'Ops Toys',
        status: 'Greenroom',
        color: 'bg-purple-500',
        note: 'Internal drawer of infra / logging / workflow tools.',
    },
];

const INTERNAL_DASHBOARDS = [
    {
        name: 'App performance',
        href: '/ceo/performance',
        description:
            'Latency, uptime, incidents, and simple readouts for PennyWize, DropSignal, and HypeWatch.',
        tag: 'Health',
    },
    {
        name: 'Labs HQ',
        href: '/labs/hq',
        description:
            'Internal dashboard for experiments, pipelines, toys, and future bots.',
        tag: 'Labs',
    },
    {
        name: 'AI Hub',
        href: '/ceo/ai-hub',
        description:
            'Blueprints for AI assistants to help with scheduling, contracts, and app ops.',
        tag: 'AI',
    },
];

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
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Revenue (solo)
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">$4,200</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Rough blended number across freelance + early app ideas.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <Gauge className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Active projects
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">3</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                CEO dashboard, apps &amp; labs, gov foundations.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <Activity className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Open deals
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">3</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Mix of gov, freelance, and product plays.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <Briefcase className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Admin alerts
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">2</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                SAM.gov + Navy Federal follow-ups.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <ShieldCheck className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Middle row: Today's focus + deals */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.3fr)]">
                {/* Today’s focus */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Today&apos;s focus
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                What future Tez will be glad you shipped.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Target className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        {TODAY_TASKS.map((task) => (
                            <li
                                key={task.label}
                                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div>
                                    <p className="font-medium">{task.label}</p>
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {task.tag} · {task.due}
                                    </p>
                                </div>
                                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                                    Next up
                                </span>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-3 text-[11px] text-muted-foreground">
                        Status lanes: Inbox, This week, In progress, Blocked, Done. Later,
                        this can sync with a real task system or your own db.
                    </p>
                </div>

                {/* Deals & pipeline */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Deals &amp; pipeline
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Lightweight pipeline view that mixes gov + freelance + product
                                bets.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <LineChart className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                        <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                            <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                Active deals
                            </p>
                            <p className="mt-1 text-lg font-semibold">3</p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                                1 lead, 1 proposal, 1 negotiation.
                            </p>
                        </div>
                        <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                            <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                Expected pipeline
                            </p>
                            <p className="mt-1 text-lg font-semibold">$40,550</p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                                Weighted by stage across gov + freelance.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                        {DEAL_STAGES.map((stage) => (
                            <span
                                key={stage.stage}
                                className="inline-flex items-center gap-1 rounded-full border border-border bg-background/60 px-2 py-0.5"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span className="font-medium">{stage.stage}</span>
                                <span className="text-muted-foreground">{stage.count}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom row: Products/apps + Admin/Gov/Risk + Internal dashboards */}
            <section className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1.4fr)]">
                {/* Products & apps */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Products &amp; apps
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Where each idea currently lives in the pipeline.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Rocket className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        {PRODUCTS.map((p) => (
                            <li
                                key={p.code}
                                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-lg bg-card">
                                        <span
                                            className={`inline-flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-semibold text-card ${p.color}`}
                                        >
                                            {p.code}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">{p.name}</p>
                                        <p className="mt-1 text-[11px] text-muted-foreground">
                                            {p.note}
                                        </p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                                    {p.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right column: Admin/Gov + Internal dashboards */}
                <div className="space-y-4">
                    {/* Admin / Gov / Risk */}
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Admin / Gov / Risk
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Keeping the boring-but-important foundations visible.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Building2 className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    LLC
                                </p>
                                <p className="mt-1 font-semibold">Active</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Digital Hooligan LLC registered.
                                </p>
                            </div>
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    SAM.gov
                                </p>
                                <p className="mt-1 font-semibold">In review</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Entity under review · check status this sprint.
                                </p>
                            </div>
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    EIN / IRS
                                </p>
                                <p className="mt-1 font-semibold">Active</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    EIN secured; VSOB/SDVOSB on the roadmap.
                                </p>
                            </div>
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Navy Federal
                                </p>
                                <p className="mt-1 font-semibold">Pending</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Business account application status to confirm.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Internal dashboards */}
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Internal dashboards
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Quick jump into the views that keep the studio running.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <LayoutDashboard className="h-4 w-4" />
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-xs">
                            {INTERNAL_DASHBOARDS.map((dash) => (
                                <li key={dash.href}>
                                    <Link
                                        href={dash.href}
                                        className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2 hover:bg-muted/70"
                                    >
                                        <div>
                                            <p className="font-medium">{dash.name}</p>
                                            <p className="mt-1 text-[11px] text-muted-foreground">
                                                {dash.description}
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                                            <Cpu className="h-3 w-3" />
                                            {dash.tag}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <p className="mt-3 text-[11px] text-muted-foreground">
                            Later, this card can show status chips (green / yellow / red) for
                            each internal dashboard based on uptime or recent incidents.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}