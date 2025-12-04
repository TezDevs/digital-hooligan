'use client';

import React from 'react';
import Link from 'next/link';
import { ClipboardList, Target, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

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

type TaskLaneKey = 'inbox' | 'thisWeek' | 'inProgress' | 'blocked' | 'done';

type Task = {
    title: string;
    lane: TaskLaneKey;
    tag: 'Product' | 'Finance' | 'Admin' | 'Gov' | 'Ops';
    note?: string;
    when?: string;
};

const TASKS: Task[] = [
    {
        title: 'Finish CEO dashboard shell + navigation',
        lane: 'inProgress',
        tag: 'Product',
        note: 'Overview, tabs, and performance view wired in.',
        when: 'This sprint',
    },
    {
        title: 'Polish Digital Hooligan marketing site copy',
        lane: 'thisWeek',
        tag: 'Product',
        note: 'Make it sound like a real studio, not just a NAICS code.',
    },
    {
        title: 'Navy Federal business account follow-up',
        lane: 'thisWeek',
        tag: 'Admin',
        note: 'Confirm status + upload any missing docs.',
    },
    {
        title: 'SAM.gov entity review check-in',
        lane: 'thisWeek',
        tag: 'Gov',
        note: 'See if the review has moved and capture next steps.',
    },
    {
        title: 'Define PennyWize MVP feature list',
        lane: 'inbox',
        tag: 'Product',
        note: 'Scraper, alerts, simple social layer later.',
    },
    {
        title: 'Outline DropSignal assist mode launch',
        lane: 'inbox',
        tag: 'Product',
        note: 'Price-drop alerts + links before bots.',
    },
    {
        title: 'Capture AI assistant ideas in AI Hub',
        lane: 'inProgress',
        tag: 'Ops',
        note: 'CEO Copilot, Contract Scout, Ops Monitor.',
    },
    {
        title: 'Lock in Digital Hooligan admin sprint checklist',
        lane: 'done',
        tag: 'Admin',
        note: 'LLC, EIN, SAM.gov submission tracked.',
    },
];

const LANE_LABELS: Record<TaskLaneKey, string> = {
    inbox: 'Inbox',
    thisWeek: 'This week',
    inProgress: 'In progress',
    blocked: 'Blocked',
    done: 'Done',
};

function laneIcon(lane: TaskLaneKey) {
    switch (lane) {
        case 'inbox':
            return <ClipboardList className="h-3.5 w-3.5" />;
        case 'thisWeek':
            return <Clock className="h-3.5 w-3.5" />;
        case 'inProgress':
            return <Target className="h-3.5 w-3.5" />;
        case 'blocked':
            return <AlertTriangle className="h-3.5 w-3.5" />;
        case 'done':
            return <CheckCircle2 className="h-3.5 w-3.5" />;
        default:
            return null;
    }
}

function tagColor(tag: Task['tag']) {
    switch (tag) {
        case 'Product':
            return 'bg-sky-500/10 text-sky-400';
        case 'Finance':
            return 'bg-emerald-500/10 text-emerald-400';
        case 'Admin':
            return 'bg-purple-500/10 text-purple-300';
        case 'Gov':
            return 'bg-amber-500/10 text-amber-400';
        case 'Ops':
            return 'bg-pink-500/10 text-pink-400';
        default:
            return 'bg-slate-500/10 text-slate-300';
    }
}

export default function CeoTasksPage() {
    return (
        <div className="space-y-6">
            {/* Header + nav */}
            <header className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Tasks
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Simple personal kanban for the CEO dashboard so you never lose the
                            plot across apps, admin, and gov work.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Rule: keep this list honest, not perfect</span>
                    </div>
                </div>

                <nav className="flex flex-wrap gap-2">
                    <Tab href="/ceo" label="Overview" />
                    <Tab href="/ceo/tasks" label="Tasks" isActive />
                    <Tab href="/ceo/deals" label="Deals" />
                    <Tab href="/ceo/finance" label="Finance" />
                    <Tab href="/ceo/performance" label="Performance" />
                    <Tab href="/ceo/ai-hub" label="AI Hub" />
                    <Tab href="/ceo/settings" label="Settings" />
                    <Tab href="/ceo/logout" label="Logout" />
                </nav>
            </header>

            {/* Today focus summary */}
            <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Today&apos;s focus snapshot
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Quick readout pulled from your lanes. Later this can be automated
                            from due dates and effort scores.
                        </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                        <Target className="h-4 w-4" />
                    </div>
                </div>

                <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3">
                    <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                        <p className="text-[11px] font-medium uppercase text-muted-foreground">
                            Deep work
                        </p>
                        <p className="mt-1 font-semibold">
                            CEO dashboard &amp; internal views
                        </p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                            Finish core tabs and basic navigation for /ceo and labs.
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                        <p className="text-[11px] font-medium uppercase text-muted-foreground">
                            Admin
                        </p>
                        <p className="mt-1 font-semibold">Navy Fed + SAM.gov follow-up</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                            Have a clear answer on status by end of week.
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                        <p className="text-[11px] font-medium uppercase text-muted-foreground">
                            Product
                        </p>
                        <p className="mt-1 font-semibold">PennyWize + DropSignal MVPs</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                            Rough feature lists for assist-mode versions of each app.
                        </p>
                    </div>
                </div>
            </section>

            {/* Lanes */}
            <section className="grid gap-4 lg:grid-cols-5">
                {(Object.keys(LANE_LABELS) as TaskLaneKey[]).map((laneKey) => {
                    const laneTasks = TASKS.filter((t) => t.lane === laneKey);
                    const label = LANE_LABELS[laneKey];

                    return (
                        <div
                            key={laneKey}
                            className="flex flex-col rounded-2xl border border-border bg-card p-3 shadow-sm sm:p-4"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <div className="inline-flex items-center gap-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-border bg-muted">
                                        {laneIcon(laneKey)}
                                    </span>
                                    <div>
                                        <p className="text-xs font-semibold">{label}</p>
                                        <p className="text-[11px] text-muted-foreground">
                                            {laneTasks.length} task
                                            {laneTasks.length === 1 ? '' : 's'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 space-y-2 text-xs">
                                {laneTasks.length === 0 ? (
                                    <p className="rounded-xl border border-dashed border-border bg-background/40 px-3 py-2 text-[11px] text-muted-foreground">
                                        Nothing here yet. Future Tez can drag tasks into this lane
                                        when you build the interactive version.
                                    </p>
                                ) : (
                                    laneTasks.map((task) => (
                                        <div
                                            key={task.title}
                                            className="rounded-xl border border-border bg-background/60 px-3 py-2"
                                        >
                                            <p className="font-medium">{task.title}</p>
                                            {task.note && (
                                                <p className="mt-1 text-[11px] text-muted-foreground">
                                                    {task.note}
                                                </p>
                                            )}
                                            <div className="mt-2 flex items-center justify-between gap-2">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${tagColor(
                                                        task.tag,
                                                    )}`}
                                                >
                                                    {task.tag}
                                                </span>
                                                {task.when && (
                                                    <span className="text-[11px] text-muted-foreground">
                                                        {task.when}
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

            <section className="rounded-2xl border border-border bg-card p-4 text-xs text-muted-foreground shadow-sm sm:p-5">
                <p>
                    Later, this screen can wire into a real database, drag-and-drop
                    columns, and AI suggestions from the AI Hub. For now, it&apos;s a
                    simple place to keep the most important work visible in one grid.
                </p>
            </section>
        </div>
    );
}