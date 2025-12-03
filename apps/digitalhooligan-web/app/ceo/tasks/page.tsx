'use client';

import React from 'react';
import Link from 'next/link';
import {
    CheckSquare,
    ListChecks,
    Rocket,
    Settings,
    CalendarClock,
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

type TaskItem = {
    label: string;
    tag?: string;
    tagTone?: 'success' | 'warn' | 'info';
};

type TaskSectionProps = {
    title: string;
    description?: string;
    icon: React.ReactNode;
    tasks: TaskItem[];
};

function tagToneClasses(tone: TaskItem['tagTone']) {
    if (tone === 'success') {
        return 'bg-emerald-500/10 text-emerald-500';
    }
    if (tone === 'warn') {
        return 'bg-amber-500/10 text-amber-500';
    }
    return 'bg-sky-500/10 text-sky-500';
}

function TaskSection({ title, description, icon, tasks }: TaskSectionProps) {
    return (
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {title}
                    </p>
                    {description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                    {icon}
                </div>
            </div>

            <ul className="mt-4 space-y-2 text-xs">
                {tasks.map((task) => (
                    <li
                        key={task.label}
                        className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2"
                    >
                        <span>{task.label}</span>
                        {task.tag && (
                            <span
                                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${tagToneClasses(
                                    task.tagTone ?? 'info',
                                )}`}
                            >
                                {task.tag}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function CeoTasksPage() {
    // Placeholder stats – later this can be wired up to real task data.
    const openTasks = 9;
    const dueToday = 3;
    const thisWeek = 6;

    const todayTasks: TaskItem[] = [
        {
            label: 'Push latest CEO dashboard changes and verify Vercel preview.',
            tag: 'CEO',
            tagTone: 'info',
        },
        {
            label: 'Review 1–2 dev opportunities on Gun.io or Upwork.',
            tag: 'Biz dev',
            tagTone: 'info',
        },
        {
            label: 'Capture any new product ideas into Hooligan Labs backlog.',
            tag: 'Labs',
            tagTone: 'success',
        },
    ];

    const weekTasks: TaskItem[] = [
        {
            label: 'Finalize Navy Federal business account setup.',
            tag: 'Admin',
            tagTone: 'warn',
        },
        {
            label: 'Track SAM.gov entity status + gather VSOB / SBA docs.',
            tag: 'Gov',
            tagTone: 'warn',
        },
        {
            label: 'Outline PennyWize MVP feature list and simple roadmap.',
            tag: 'PennyWize',
            tagTone: 'info',
        },
        {
            label: 'Define DropSignal assist-mode alerts and target sites.',
            tag: 'DropSignal',
            tagTone: 'info',
        },
        {
            label: 'Draft simple pitch blurb for Digital Hooligan services page.',
            tag: 'Marketing',
            tagTone: 'success',
        },
        {
            label: 'List 3 “starter” gov contracts that fit Digital Hooligan.',
            tag: 'Gov',
            tagTone: 'success',
        },
    ];

    const backlogTasks: TaskItem[] = [
        {
            label: 'Design Labs HQ internal dashboard layout.',
            tag: 'Labs',
            tagTone: 'info',
        },
        {
            label: 'Plan AI assistant responsibilities inside CEO dashboard.',
            tag: 'AI',
            tagTone: 'info',
        },
        {
            label: 'Define v1 logging/metrics stack for PennyWize + DropSignal.',
            tag: 'Ops',
            tagTone: 'info',
        },
    ];

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
                            Keep admin, product, and ops work visible so CEO brain isn&apos;t
                            doing it all from memory.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Today: pick 1–3 high-impact moves</span>
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

            {/* Quick stats */}
            <section className="grid gap-4 md:grid-cols-3">
                <StatCard
                    label="Open tasks"
                    value={openTasks.toString()}
                    helper="Rough count across admin, biz dev, and product."
                    icon={<ClipboardList className="h-4 w-4" />}
                />
                <StatCard
                    label="Due today"
                    value={dueToday.toString()}
                    helper="If everything feels important, start here."
                    icon={<CheckSquare className="h-4 w-4" />}
                />
                <StatCard
                    label="This week"
                    value={thisWeek.toString()}
                    helper="Good candidates for focus blocks."
                    icon={<CalendarClock className="h-4 w-4" />}
                />
            </section>

            {/* Task sections */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
                <div className="space-y-4">
                    <TaskSection
                        title="Today"
                        description="Pick 1–3 tasks and protect time for them. Everything else is a bonus."
                        icon={<CheckSquare className="h-4 w-4" />}
                        tasks={todayTasks}
                    />

                    <TaskSection
                        title="This week"
                        description="Work that moves the needle for admin, gov, and your apps."
                        icon={<ListChecks className="h-4 w-4" />}
                        tasks={weekTasks}
                    />
                </div>

                <div className="space-y-4">
                    <TaskSection
                        title="Backlog / someday"
                        description="Parking lot so your brain doesn&apos;t have to hold everything."
                        icon={<Rocket className="h-4 w-4" />}
                        tasks={backlogTasks}
                    />

                    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Settings & automations
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Future home for AI scheduling assistance and task rules.
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
                    </section>
                </div>
            </section>
        </div>
    );
}