'use client';

import React from 'react';
import Link from 'next/link';
import {
    Bot,
    Sparkles,
    Brain,
    ListChecks,
    Link2,
    GaugeCircle,
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

type Helper = {
    name: string;
    status: 'Idea' | 'Planned' | 'Future';
    focus: string;
    notes: string;
};

const helpers: Helper[] = [
    {
        name: 'CEO Copilot',
        status: 'Planned',
        focus: 'Scheduling + priority planning',
        notes:
            'Helps stack-rank tasks, contracts, and app work across your week inside the CEO dashboard.',
    },
    {
        name: 'Contract Scout',
        status: 'Idea',
        focus: 'Gov + freelance sourcing',
        notes:
            'Scans SAM.gov, Gun.io, Upwork, etc., and surfaces work that fits Digital Hooligan.',
    },
    {
        name: 'Ops Monitor',
        status: 'Future',
        focus: 'Infra + app performance',
        notes:
            'Watches logs, uptime, and incidents across PennyWize, DropSignal, and HypeWatch.',
    },
];

type Idea = {
    title: string;
    category: 'Automation' | 'Insights' | 'Assist';
    detail: string;
};

const ideas: Idea[] = [
    {
        title: 'Daily CEO briefing',
        category: 'Insights',
        detail:
            'Morning summary with money, app health, open deals, and top 3 tasks pulled into one view.',
    },
    {
        title: 'Smart time-blocking',
        category: 'Automation',
        detail:
            'Takes your task list + contract timelines and proposes a realistic weekly calendar.',
    },
    {
        title: 'Bid helper',
        category: 'Assist',
        detail:
            'Drafts proposal outlines and checklists for small SAM.gov / freelance work in your lane.',
    },
];

export default function CeoAiHubPage() {
    return (
        <div className="space-y-6">
            {/* Header + nav */}
            <header className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            AI Hub
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Parking lot for the AI assistants that will eventually run half of
                            Digital Hooligan with you.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Mode: experiment then automate</span>
                    </div>
                </div>

                <nav className="flex flex-wrap gap-2">
                    <Tab href="/ceo" label="Overview" />
                    <Tab href="/ceo/tasks" label="Tasks" />
                    <Tab href="/ceo/deals" label="Deals" />
                    <Tab href="/ceo/finance" label="Finance" />
                    <Tab href="/ceo/performance" label="Performance" />
                    <Tab href="/ceo/ai-hub" label="AI Hub" isActive />
                    <Tab href="/ceo/settings" label="Settings" />
                    <Tab href="/ceo/logout" label="Logout" />
                </nav>
            </header>

            {/* Current helpers + pipeline */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]">
                {/* Current / planned helpers */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Assistants
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                The AI helpers you&apos;d actually use week-to-week.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Bot className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        {helpers.map((helper) => (
                            <li
                                key={helper.name}
                                className="rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-medium">{helper.name}</p>
                                        <p className="mt-1 text-[11px] text-muted-foreground">
                                            {helper.focus}
                                        </p>
                                    </div>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${helper.status === 'Planned'
                                            ? 'bg-emerald-500/10 text-emerald-400'
                                            : helper.status === 'Idea'
                                                ? 'bg-sky-500/10 text-sky-400'
                                                : 'bg-slate-500/10 text-slate-300'
                                            }`}
                                    >
                                        {helper.status}
                                    </span>
                                </div>
                                <p className="mt-2 text-[11px] text-muted-foreground">
                                    {helper.notes}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* How it plugs into your stack */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Where they live
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Keep assistants close to the work instead of hidden in a
                                    separate tool.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <GaugeCircle className="h-4 w-4" />
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>
                                    CEO Copilot shows up in the CEO dashboard (Tasks, Deals,
                                    Finance) to suggest priorities and time-blocks.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>
                                    Contract Scout pipes interesting leads into the Deals board
                                    with rough value, effort, and fit tags.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>
                                    Ops Monitor links to app performance so alerts and incidents
                                    live next to your metrics.
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Future wiring
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Later: hook these into Stripe, calendars, and external APIs.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Link2 className="h-4 w-4" />
                            </div>
                        </div>

                        <p className="mt-4 text-xs text-muted-foreground">
                            For now, this page is a design blueprint. When you&apos;re ready,
                            each helper gets a tiny settings card, a config drawer, and
                            background jobs wired into your infra.
                        </p>
                    </div>
                </div>
            </section>

            {/* Idea backlog */}
            <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Idea backlog
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            A small backlog so you don&apos;t lose good AI ideas in random
                            notes apps.
                        </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                        <Sparkles className="h-4 w-4" />
                    </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                    {ideas.map((idea) => (
                        <div
                            key={idea.title}
                            className="flex flex-col rounded-xl border border-border bg-background/60 p-3 text-xs"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <p className="font-medium">{idea.title}</p>
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${idea.category === 'Automation'
                                        ? 'bg-amber-500/10 text-amber-400'
                                        : idea.category === 'Insights'
                                            ? 'bg-sky-500/10 text-sky-400'
                                            : 'bg-emerald-500/10 text-emerald-400'
                                        }`}
                                >
                                    {idea.category}
                                </span>
                            </div>
                            <p className="mt-2 text-[11px] text-muted-foreground">
                                {idea.detail}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                    <div className="inline-flex items-center gap-2">
                        <Brain className="h-3.5 w-3.5" />
                        <span>
                            Rule of thumb: ship one tiny AI helper here before you try to
                            build a massive &quot;platform.&quot;
                        </span>
                    </div>
                    <div className="hidden items-center gap-2 sm:inline-flex">
                        <ListChecks className="h-3.5 w-3.5" />
                        <span>Pick one idea, wire it into a real workflow, then iterate.</span>
                    </div>
                </div>
            </section>
        </div>
    );
}