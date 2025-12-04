'use client';

import React from 'react';
import Link from 'next/link';
import { Handshake, DollarSign, BarChart3 } from 'lucide-react';

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

type Deal = {
    id: number;
    name: string;
    stage: 'Lead' | 'Proposal' | 'Negotiation' | 'Won';
    value: string;
    type: 'Gov' | 'Freelance' | 'Product';
};

const deals: Deal[] = [
    {
        id: 1,
        name: 'Small SAM.gov prototype contract',
        stage: 'Proposal',
        value: '$18,000',
        type: 'Gov',
    },
    {
        id: 2,
        name: 'Gun.io / Upwork freelance engagement',
        stage: 'Negotiation',
        value: '$12,500',
        type: 'Freelance',
    },
    {
        id: 3,
        name: 'PennyWize early adopter',
        stage: 'Lead',
        value: '$1,200 ARR',
        type: 'Product',
    },
];

const stages: Deal['stage'][] = ['Lead', 'Proposal', 'Negotiation', 'Won'];

export default function CeoDealsPage() {
    return (
        <div className="space-y-6">
            {/* Header + nav */}
            <header className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Deals &amp; pipeline
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Lightweight pipeline so you know what&apos;s cooking for revenue.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>2 opportunities in motion</span>
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

            {/* Snapshot + board */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)]">
                {/* Snapshot */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Snapshot
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Quick read of where the money might come from.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <DollarSign className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2 text-xs">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Active deals
                                </p>
                                <p className="mt-1 text-lg font-semibold">
                                    {
                                        deals.filter((d) =>
                                            ['Lead', 'Proposal', 'Negotiation'].includes(d.stage),
                                        ).length
                                    }
                                </p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    1 lead, 1 proposal, 1 negotiation.
                                </p>
                            </div>
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2 text-xs">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Expected pipeline
                                </p>
                                <p className="mt-1 text-lg font-semibold">$40,550</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Weighted by stage probability across gov + freelance.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Readout
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Rough sense of whether you&apos;re hustling enough.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <BarChart3 className="h-4 w-4" />
                            </div>
                        </div>

                        <p className="mt-4 text-xs text-muted-foreground">
                            Right now you&apos;ve got a healthy mix of gov, freelance, and
                            product motion. If this card ever feels empty for a few weeks in a
                            row, that&apos;s your cue to spin up outreach, content, or
                            experiments.
                        </p>
                    </div>
                </div>

                {/* Simple kanban-ish board */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Board
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Keep a tiny kanban so nothing falls on the floor.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Handshake className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-4">
                        {stages.map((stage) => (
                            <div
                                key={stage}
                                className="rounded-xl border border-border bg-background/60 p-2"
                            >
                                <p className="text-[11px] font-semibold uppercase text-muted-foreground">
                                    {stage}
                                </p>
                                <div className="mt-2 space-y-2">
                                    {deals
                                        .filter((d) => d.stage === stage)
                                        .map((deal) => (
                                            <div
                                                key={deal.id}
                                                className="rounded-lg border border-border bg-card/80 px-2 py-1 text-[11px]"
                                            >
                                                <p className="font-medium">{deal.name}</p>
                                                <p className="mt-1 text-[10px] text-muted-foreground">
                                                    {deal.type} · {deal.value}
                                                </p>
                                            </div>
                                        ))}
                                    {deals.filter((d) => d.stage === stage).length === 0 && (
                                        <p className="pt-1 text-[10px] text-muted-foreground">
                                            — empty —
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}