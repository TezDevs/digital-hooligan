'use client';

import React from 'react';
import Link from 'next/link';
import {
    Bot,
    Brain,
    CalendarClock,
    Activity,
    Settings2,
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

type AssistantStatus = 'Idea' | 'Planned' | 'MVP' | 'Later';

type Assistant = {
    name: string;
    code: string;
    status: AssistantStatus;
    focus: string;
    note: string;
};

const ASSISTANTS: Assistant[] = [
    {
        name: 'CEO Copilot',
        code: 'CC',
        status: 'Planned',
        focus: 'Daily briefings + “what should I do next?” across all dashboards.',
        note: 'Pulls from Tasks, Deals, Finance, Performance, and Admin sprints.',
    },
    {
        name: 'Contract Scout',
        code: 'CS',
        status: 'Idea',
        focus: 'Scan SAM.gov, Gun.io, Upwork for work that fits Digital Hooligan.',
        note: 'Flags good fits and drafts quick go / no-go summaries.',
    },
    {
        name: 'Ops Monitor',
        code: 'OM',
        status: 'Idea',
        focus: 'Watch app metrics (uptime, errors, incidents) and raise alerts.',
        note: 'Ties into App performance view once the data layer is ready.',
    },
    {
        name: 'Dev Workbench',
        code: 'DW',
        status: 'Idea',
        focus:
            'Help manage repos, branches, pull requests, and give coding/refactor suggestions across Digital Hooligan.',
        note: 'Surfaces branch status, lint/build results, and suggests refactors or next coding tasks side-by-side with your AI pair programmer.',
    },
    {
        name: 'Research Scout',
        code: 'RS',
        status: 'Later',
        focus: 'Help with markets, competitors, and feature research.',
        note: 'Turns vague questions into structured notes and next steps.',
    },
];

type TimelineItem = {
    date: string;
    label: string;
    detail: string;
};

const TIMELINE: TimelineItem[] = [
    {
        date: '2025-12-02',
        label: 'Decide to make AI Hub a first-class view',
        detail:
            'Central place to plan assistants before wiring them into tasks, deals, and performance.',
    },
    {
        date: '2025-12-03',
        label: 'Define CEO Copilot, Contract Scout, Ops Monitor',
        detail:
            'Anchored each assistant to real work: scheduling, gov contracts, and app health.',
    },
    {
        date: '2025-12-03',
        label: 'Add Dev Workbench for code & dev workflows',
        detail:
            'Plan an assistant focused on branches, PRs, tests, refactors, and build status for the monorepo.',
    },
    {
        date: 'Future',
        label: 'Hook assistants into real data sources',
        detail:
            'Stripe, SAM.gov exports, app metrics, GitHub, and your own task/deal tables.',
    },
];

type ChecklistItem = {
    label: string;
    group: 'Foundations' | 'Data' | 'Execution';
    done?: boolean;
};

const CHECKLIST: ChecklistItem[] = [
    {
        label: 'Have a dedicated AI Hub view inside the CEO dashboard',
        group: 'Foundations',
        done: true,
    },
    {
        label:
            'Decide which assistants matter first (Copilot, Scout, Monitor, Dev Workbench)',
        group: 'Foundations',
        done: true,
    },
    {
        label: 'Rough schema for tasks, deals, app metrics, and code activity',
        group: 'Data',
        done: false,
    },
    {
        label:
            'Decide where to store “ground truth” (DB, Airtable, Notion, etc.)',
        group: 'Data',
        done: false,
    },
    {
        label:
            'Plan GitHub integration for Dev Workbench (branches, PRs, checks, refactor suggestions)',
        group: 'Data',
        done: false,
    },
    {
        label: 'Ship a tiny CEO Copilot MVP (text-only, no magic)',
        group: 'Execution',
        done: false,
    },
    {
        label: 'Add one realistic automation per assistant',
        group: 'Execution',
        done: false,
    },
];

function statusClasses(status: AssistantStatus) {
    switch (status) {
        case 'Idea':
            return 'bg-slate-500/10 text-slate-200';
        case 'Planned':
            return 'bg-sky-500/10 text-sky-400';
        case 'MVP':
            return 'bg-emerald-500/10 text-emerald-400';
        case 'Later':
            return 'bg-amber-500/10 text-amber-300';
        default:
            return 'bg-slate-500/10 text-slate-300';
    }
}

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
                            Home base for the assistants that will help you run Digital
                            Hooligan: planning, contracts, app health, and development.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Rule: ship tiny assistants, not vague “AI everywhere.”</span>
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

            {/* Top row: Assistants overview + Strategy snapshot */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
                {/* Assistants grid */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Assistants
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                A small crew of focused bots instead of one vague “AI feature.”
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Bot className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        {ASSISTANTS.map((asst) => (
                            <li
                                key={asst.code}
                                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-lg bg-card">
                                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-primary/90 text-[10px] font-semibold text-card">
                                            {asst.code}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">{asst.name}</p>
                                        <p className="mt-1 text-[11px] text-muted-foreground">
                                            {asst.focus}
                                        </p>
                                        <p className="mt-1 text-[11px] text-muted-foreground">
                                            {asst.note}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusClasses(
                                        asst.status,
                                    )}`}
                                >
                                    {asst.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Strategy snapshot */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Strategy snapshot
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Where AI fits for Digital Hooligan right now.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Brain className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 text-xs">
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Primary job
                                </p>
                                <p className="mt-1 font-semibold">
                                    Keep you focused on the highest-leverage work.
                                </p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Not “AI for the sake of AI,” but a co-pilot for deals, apps,
                                    admin, and dev work.
                                </p>
                            </div>
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Near-term target
                                </p>
                                <p className="mt-1 font-semibold">
                                    Ship a tiny CEO Copilot MVP first.
                                </p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    One panel that summarizes Tasks, Deals, and App performance
                                    for “today” and “this week.”
                                </p>
                            </div>
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Longer-term plays
                                </p>
                                <p className="mt-1 font-semibold">
                                    Bring in Dev Workbench and Ops Monitor.
                                </p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Tie GitHub branches/PRs, refactor suggestions, and app health
                                    into one view so you always know what to ship or fix next.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom row: Timeline + Checklist */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)]">
                {/* Timeline */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                AI roadmap timeline
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Lightweight record so you remember how the AI story unfolded.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <CalendarClock className="h-4 w-4" />
                        </div>
                    </div>

                    <ol className="mt-4 space-y-3 text-xs">
                        {TIMELINE.map((item) => (
                            <li
                                key={item.date + item.label}
                                className="flex gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card">
                                    <Activity className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                        {item.date}
                                    </p>
                                    <p className="mt-0.5 font-semibold">{item.label}</p>
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {item.detail}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Checklist */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Implementation checklist
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Simple list to keep the AI work grounded in real steps.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Settings2 className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-4 space-y-2 text-xs">
                        {CHECKLIST.map((item) => (
                            <div
                                key={item.label}
                                className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-card">
                                    {item.done ? (
                                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                    ) : (
                                        <span className="h-2.5 w-2.5 rounded-full border border-dashed border-muted-foreground/60" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                        {item.group}
                                    </p>
                                    <p className="mt-0.5">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-3 text-[11px] text-muted-foreground">
                        Later, this card can sync with real tasks, show progress bars, and
                        push suggestions into the Tasks view for you to accept or ignore.
                    </p>
                </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-4 text-xs text-muted-foreground shadow-sm sm:p-5">
                <p>
                    When you&apos;re ready, the next step is to give CEO Copilot a tiny
                    panel on the Overview page that summarizes today&apos;s priority work
                    based on these assistants, including Dev Workbench signals from your
                    repos.
                </p>
            </section>
        </div>
    );
}