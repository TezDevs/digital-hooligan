'use client';

import React from 'react';
import Link from 'next/link';
import {
    Briefcase,
    DollarSign,
    Handshake,
    MessageCircle,
    Rocket,
    ArrowUpRight,
    ClipboardList,
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
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
        >
            {label}
        </Link>
    );
}

type StatCardProps = {
    label: string;
    value: string;
    helper?: string;
    icon: React.ReactNode;
};

function StatCard({ label, value, helper, icon }: StatCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
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

type DealStage = 'lead' | 'conversation' | 'proposal' | 'active';

type Deal = {
    name: string;
    source: 'Gun.io' | 'Upwork' | 'SAM.gov' | 'Referral';
    estValue: string;
    stage: DealStage;
    nextStep: string;
};

const deals: Deal[] = [
    {
        name: 'Gun.io – booking / scheduling app build',
        source: 'Gun.io',
        estValue: '$20–30k',
        stage: 'conversation',
        nextStep: 'Review requirements + draft clarifying questions.',
    },
    {
        name: 'Upwork – MVP web dashboard for small biz',
        source: 'Upwork',
        estValue: '$5–10k',
        stage: 'lead',
        nextStep: 'Decide whether to bid or pass based on scope.',
    },
    {
        name: 'SAM.gov – small custom software opportunity',
        source: 'SAM.gov',
        estValue: '$10–15k',
        stage: 'proposal',
        nextStep: 'Outline approach + rough timeline + pricing.',
    },
    {
        name: 'Referral – analytics dashboard for friend’s brand',
        source: 'Referral',
        estValue: '$3–5k',
        stage: 'active',
        nextStep: 'Lock scope + sign lightweight statement of work.',
    },
];

function stageLabel(stage: DealStage) {
    switch (stage) {
        case 'lead':
            return 'Lead';
        case 'conversation':
            return 'Conversation';
        case 'proposal':
            return 'Proposal out';
        case 'active':
            return 'Active / in delivery';
        default:
            return stage;
    }
}

function stageTone(stage: DealStage) {
    switch (stage) {
        case 'lead':
            return 'bg-slate-500/10 text-slate-300';
        case 'conversation':
            return 'bg-sky-500/10 text-sky-400';
        case 'proposal':
            return 'bg-amber-500/10 text-amber-400';
        case 'active':
            return 'bg-emerald-500/10 text-emerald-400';
        default:
            return 'bg-slate-500/10 text-slate-300';
    }
}

export default function CeoDealsPage() {
    const totalDeals = deals.length;
    const activeCount = deals.filter((d) => d.stage === 'active').length;
    const proposalCount = deals.filter((d) => d.stage === 'proposal').length;

    return (
        <div className="space-y-6">
            {/* Header + nav */}
            <header className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Deals
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Keep a simple pipeline of leads, conversations, proposals, and
                            active work so revenue doesn&apos;t live only in your head.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Goal: 1–3 meaningful deal moves per week</span>
                    </div>
                </div>

                <nav className="flex flex-wrap gap-2">
                    <Tab href="/ceo" label="Overview" />
                    <Tab href="/ceo/tasks" label="Tasks" />
                    <Tab href="/ceo/deals" label="Deals" isActive />
                    <Tab href="/ceo/finance" label="Finance" />
                    <Tab href="/ceo/performance" label="Performance" />
                    <Tab href="/ceo/ai-hub" label="AI Hub" />
                    <Tab href="/ceo/settings" label="Settings" />
                    <Tab href="/ceo/logout" label="Logout" />
                </nav>
            </header>

            {/* Top stats */}
            <section className="grid gap-4 md:grid-cols-3">
                <StatCard
                    label="Total opportunities"
                    value={totalDeals.toString()}
                    helper="Across Gun.io, Upwork, SAM.gov, and referrals."
                    icon={<Briefcase className="h-4 w-4" />}
                />
                <StatCard
                    label="Proposals out"
                    value={proposalCount.toString()}
                    helper="Make sure each one has a clear follow-up date."
                    icon={<ClipboardList className="h-4 w-4" />}
                />
                <StatCard
                    label="Active work"
                    value={activeCount.toString()}
                    helper="Current delivery commitments."
                    icon={<Handshake className="h-4 w-4" />}
                />
            </section>

            {/* Pipeline + list */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
                {/* Deals table */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Pipeline
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                One row per opportunity with source, stage, and next step.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <DollarSign className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-left text-xs">
                            <thead className="border-b border-border text-[11px] uppercase text-muted-foreground">
                                <tr>
                                    <th className="py-2 pr-4">Opportunity</th>
                                    <th className="px-4 py-2">Source</th>
                                    <th className="px-4 py-2">Est. value</th>
                                    <th className="px-4 py-2">Stage</th>
                                    <th className="px-4 py-2">Next step</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/70">
                                {deals.map((deal) => (
                                    <tr key={deal.name}>
                                        <td className="py-2 pr-4 text-sm font-medium">
                                            {deal.name}
                                        </td>
                                        <td className="px-4 py-2">{deal.source}</td>
                                        <td className="px-4 py-2">{deal.estValue}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${stageTone(
                                                    deal.stage,
                                                )}`}
                                            >
                                                {stageLabel(deal.stage)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">{deal.nextStep}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right column: focus + sources */}
                <div className="space-y-4">
                    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    This week&apos;s moves
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Small, concrete actions that make revenue more likely.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Rocket className="h-4 w-4" />
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-xs">
                            <li className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                Pick one Gun.io or Upwork posting that fits your lane and save
                                it for a serious bid.
                            </li>
                            <li className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                Sketch a simple, reusable proposal template for Digital
                                Hooligan work.
                            </li>
                            <li className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                Identify one SAM.gov opportunity that is truly &quot;starter
                                friendly&quot; and list why.
                            </li>
                        </ul>
                    </section>

                    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Deal sources
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Where your pipeline currently lives and future spots to
                                    watch.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <MessageCircle className="h-4 w-4" />
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-xs">
                            <li className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2">
                                <span>Gun.io – vetted dev contracts in your lane</span>
                                <span className="inline-flex items-center text-[11px] font-medium text-primary">
                                    Open site
                                    <ArrowUpRight className="ml-1 h-3 w-3" />
                                </span>
                            </li>
                            <li className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2">
                                <span>Upwork – smaller project pipeline</span>
                                <span className="inline-flex items-center text-[11px] font-medium text-primary">
                                    Open site
                                    <ArrowUpRight className="ml-1 h-3 w-3" />
                                </span>
                            </li>
                            <li className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2">
                                <span>SAM.gov – gov contracts under NAICS 541511</span>
                                <span className="inline-flex items-center text-[11px] font-medium text-primary">
                                    Open site
                                    <ArrowUpRight className="ml-1 h-3 w-3" />
                                </span>
                            </li>
                            <li className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2">
                                <span>Referrals – friends, former coworkers, existing network</span>
                                <span className="inline-flex items-center text-[11px] font-medium text-muted-foreground">
                                    Future: track here
                                </span>
                            </li>
                        </ul>
                    </section>
                </div>
            </section>
        </div>
    );
}