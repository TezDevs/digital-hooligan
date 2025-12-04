'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, ListChecks } from 'lucide-react';

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
                    ? 'bg-primary/90 text-primary-foreground ring-2 ring-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
        >
            <span>{label}</span>
            {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
            )}
        </Link>
    );
}

type Task = {
    id: number;
    label: string;
    type: 'Product' | 'Finance' | 'Admin';
    due?: string;
    status: 'Today' | 'Upcoming' | 'Backlog';
};

const tasks: Task[] = [
    {
        id: 1,
        label: 'Finish CEO dashboard shell + navigation',
        type: 'Product',
        due: '2025-12-05',
        status: 'Today',
    },
    {
        id: 2,
        label: 'Map revenue model across apps + freelance',
        type: 'Finance',
        due: '2025-12-09',
        status: 'Today',
    },
    {
        id: 3,
        label: 'Navy Federal business account follow-up',
        type: 'Admin',
        due: '2025-12-06',
        status: 'Upcoming',
    },
    {
        id: 4,
        label: 'Define PennyWize MVP feature list',
        type: 'Product',
        due: '2025-12-07',
        status: 'Upcoming',
    },
];

export default function CeoTasksPage() {
    const todayTasks = tasks.filter((t) => t.status === 'Today');
    const upcomingTasks = tasks.filter((t) => t.status === 'Upcoming');

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
                            Keep the most important moves for Digital Hooligan front and
                            center.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Today: focused but manageable</span>
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

            {/* Today vs upcoming */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Today&apos;s focus
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                The 2–4 moves that really matter before you log off.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <ListChecks className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        {todayTasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div>
                                    <p className="font-medium">{task.label}</p>
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {task.type.toUpperCase()}
                                        {task.due ? ` · Due ${task.due}` : null}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground hover:bg-muted"
                                >
                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                    Done
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Upcoming
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Short runway of what&apos;s next so nothing sneaks up on you.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Clock className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        {upcomingTasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div>
                                    <p className="font-medium">{task.label}</p>
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {task.type.toUpperCase()}
                                        {task.due ? ` · Due ${task.due}` : null}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}