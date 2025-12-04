'use client';

import React from 'react';
import Link from 'next/link';
import {
    Briefcase,
    LineChart,
    Clock,
    FileText,
    ArrowRightCircle,
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

type StageKey = 'lead' | 'discovery' | 'proposal' | 'negotiation' | 'won';

type Deal = {
    name: string;
    stage: StageKey;
    value: string;
    type: 'Gov / contracts' | 'Freelance' | 'Product';
    note?: string;
    idHint?: string; // e.g. SAM.gov notice, Upwork/Gun.io posting, etc.
};

const DEALS: Deal[] = [
    {
        name: 'Small gov web app + dashboard',
        stage: 'discovery',
        value: '$18,000',
        type: 'Gov / contracts',
        note: 'Fit: NAICS 541511, early-stage agency work.',
        idHint: 'SAM.gov saved opp',
    },
    {
        name: 'Gun.io dev engagement in your lane',
        stage: 'lead',
        value: '$6,000–$12,000',
        type: 'Freelance',
        note: 'Use as bridge income while building apps.',
        idHint: 'Gun.io profile + matches',
    },
    {
        name: 'PennyWize early adopter build',
        stage: 'proposal',
        value: '$7,500',
        type: 'Product',
        note: 'Custom “phase 1” build for a power user / small fund.',
    },
    {
        name: 'DropSignal assist-mode pilot',
        stage: 'negotiation',
        value: '$9,050',
        type: 'Product',
        note: 'Alerts + dashboards for a sneaker shop or reseller group.',
    },
];

const STAGE_LABELS: Record<StageKey, string> = {
    lead: 'Lead',
    discovery: 'Discovery',
    proposal: 'Proposal',
    negotiation: 'Negotiation',
    won: 'Won',
};

const STAGE_ORDER: StageKey[] = [
    'lead',
    'discovery',
    'proposal',
    'negotiation',
    'won',
];

function stageBadgeClasses(stage: StageKey) {
    switch (stage) {
        case 'lead':
            return 'bg-slate-500/10 text-slate-200';
        case 'discovery':
            return 'bg-sky-500/10 text-sky-400';
        case 'proposal':
            return 'bg-purple-500/10 text-purple-300';
        case 'negotiation':
            return 'bg-amber-500/10 text-amber-300';
        case 'won':
            return 'bg-emerald-500/10 text-emerald-400';
        default:
            return 'bg-slate-500/10 text-slate-300';
    }
}

function typeChipClasses(type: Deal['type']) {
    switch (type) {
        case 'Gov / contracts':
            return 'bg-amber-500/10 text-amber-300';
        case 'Freelance':
            return 'bg-sky-500/10 text-sky-400';
        case 'Product':
            return 'bg-emerald-500/10 text-emerald-400';
        default:
            return 'bg-slate-500/10 text-slate-300';
    }
}

export default function CeoDealsPage() {
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
                            Lightweight pipeline that mixes gov contracts, freelance, and
                            product plays into a single board.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Goal: 1–3 high-quality deals at a time</span>
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

            {/* Snapshot row */}
            <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Active deals
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">
                                {DEALS.length}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Mix of gov, freelance, and product work.
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
                                Weighted pipeline (eyeball)
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">
                                $40,550
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Rough blend of the deals above based on stage.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <LineChart className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Time horizon
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">
                                Next 60–90 days
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Enough to keep runway comfortable while apps come online.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <Clock className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Board */}
            <section className="grid gap-4 lg:grid-cols-5">
                {STAGE_ORDER.map((stageKey) => {
                    const label = STAGE_LABELS[stageKey];
                    const stageDeals = DEALS.filter((d) => d.stage === stageKey);

                    return (
                        <div
                            key={stageKey}
                            className="flex flex-col rounded-2xl border border-border bg-card p-3 shadow-sm sm:p-4"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs font-semibold">{label}</p>
                                    <p className="text-[11px] text-muted-foreground">
                                        {stageDeals.length} deal
                                        {stageDeals.length === 1 ? '' : 's'}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 space-y-2 text-xs">
                                {stageDeals.length === 0 ? (
                                    <p className="rounded-xl border border-dashed border-border bg-background/40 px-3 py-2 text-[11px] text-muted-foreground">
                                        Nothing in this column yet. Future Tez can drag cards here
                                        when you wire up interactivity.
                                    </p>
                                ) : (
                                    stageDeals.map((deal) => (
                                        <div
                                            key={deal.name}
                                            className="rounded-xl border border-border bg-background/60 px-3 py-2"
                                        >
                                            <p className="font-medium">{deal.name}</p>
                                            {deal.note && (
                                                <p className="mt-1 text-[11px] text-muted-foreground">
                                                    {deal.note}
                                                </p>
                                            )}

                                            <div className="mt-2 flex items-center justify-between gap-2">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${stageBadgeClasses(
                                                        deal.stage,
                                                    )}`}
                                                >
                                                    {STAGE_LABELS[deal.stage]}
                                                </span>
                                                <span className="text-[11px] font-semibold">
                                                    {deal.value}
                                                </span>
                                            </div>

                                            <div className="mt-2 flex items-center justify-between gap-2">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeChipClasses(
                                                        deal.type,
                                                    )}`}
                                                >
                                                    {deal.type}
                                                </span>
                                                {deal.idHint && (
                                                    <span className="text-[11px] text-muted-foreground">
                                                        {deal.idHint}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Notes */}
            <section className="rounded-2xl border border-border bg-card p-4 text-xs text-muted-foreground shadow-sm sm:p-5">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-muted">
                        <FileText className="h-3.5 w-3.5" />
                    </div>
                    <div className="space-y-1">
                        <p>
                            Later, this board can plug into a real CRM or your own deals
                            table (Postgres, Airtable, whatever you prefer), plus basic
                            automation from the AI Hub.
                        </p>
                        <p>
                            For now, it&apos;s just a clear place for you to see the mix of
                            gov, freelance, and product opportunities competing for your
                            energy.
                        </p>
                    </div>
                </div>

                <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-dashed border-border bg-background/40 px-3 py-1.5 text-[11px]">
                    <ArrowRightCircle className="h-3.5 w-3.5" />
                    <span>
                        Future Tez: add filters (gov / freelance / product) and expected
                        close dates so you can forecast runway.
                    </span>
                </div>
            </section>
        </div>
    );
}