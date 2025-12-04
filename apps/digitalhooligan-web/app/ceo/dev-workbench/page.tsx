'use client';

import React from 'react';
import Link from 'next/link';
import {
    GitBranch,
    GitPullRequest,
    CheckCircle2,
    Wrench,
    ListChecks,
    Code2,
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

type BranchStatus = 'Active' | 'Ready for PR' | 'Merged';

type Branch = {
    name: string;
    status: BranchStatus;
    scope: string;
    base: string;
    note: string;
};

const BRANCHES: Branch[] = [
    {
        name: 'feature/ceo-overview-copilot',
        status: 'Merged',
        scope: 'CEO dashboard',
        base: 'main',
        note: 'Adds CEO Copilot preview panel on /ceo.',
    },
    {
        name: 'feature/ceo-ai-hub-dev-workbench',
        status: 'Ready for PR',
        scope: 'AI Hub',
        base: 'main',
        note: 'Defines Dev Workbench assistant and roadmap.',
    },
    {
        name: 'feature/ceo-dev-workbench',
        status: 'Active',
        scope: 'Dev Workbench view',
        base: 'main',
        note: 'This feature: surface branches, PRs, and refactor nudge.',
    },
];

type CheckStatus = 'Pass' | 'Warn' | 'Fail';

type Check = {
    name: string;
    status: CheckStatus;
    note: string;
};

const CHECKS: Check[] = [
    {
        name: 'TypeScript & lint',
        status: 'Pass',
        note: 'No blocking TS errors in the CEO views.',
    },
    {
        name: 'Vercel builds',
        status: 'Pass',
        note: 'Latest main deployed cleanly.',
    },
    {
        name: 'Refactor backlog',
        status: 'Warn',
        note: 'CEO nav duplication could be consolidated later.',
    },
];

type WorkItem = {
    label: string;
    area: 'UI polish' | 'Refactor' | 'DX / tooling';
};

const WORK_QUEUE: WorkItem[] = [
    {
        label: 'Extract shared CEO Tab component to a single place.',
        area: 'Refactor',
    },
    {
        label: 'Add simple types/shared config for apps & metrics.',
        area: 'DX / tooling',
    },
    {
        label: 'Tighten spacing + consistency across all CEO cards.',
        area: 'UI polish',
    },
];

function statusBadgeClasses(status: BranchStatus) {
    switch (status) {
        case 'Active':
            return 'bg-sky-500/10 text-sky-400';
        case 'Ready for PR':
            return 'bg-emerald-500/10 text-emerald-400';
        case 'Merged':
            return 'bg-purple-500/10 text-purple-300';
        default:
            return 'bg-slate-500/10 text-slate-200';
    }
}

function checkStatusClasses(status: CheckStatus) {
    switch (status) {
        case 'Pass':
            return 'bg-emerald-500/10 text-emerald-400';
        case 'Warn':
            return 'bg-amber-500/10 text-amber-300';
        case 'Fail':
            return 'bg-rose-500/10 text-rose-300';
        default:
            return 'bg-slate-500/10 text-slate-200';
    }
}

function workAreaClasses(area: WorkItem['area']) {
    switch (area) {
        case 'UI polish':
            return 'bg-pink-500/10 text-pink-300';
        case 'Refactor':
            return 'bg-sky-500/10 text-sky-400';
        case 'DX / tooling':
            return 'bg-amber-500/10 text-amber-300';
        default:
            return 'bg-slate-500/10 text-slate-200';
    }
}

export default function CeoDevWorkbenchPage() {
    return (
        <div className="space-y-6">
            {/* Header + nav */}
            <header className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Dev Workbench
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            A simple place to see branches, PR status, checks, and a small
                            refactor queue for Digital Hooligan.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Goal: never wonder “what branch am I on?” again</span>
                    </div>
                </div>

                <nav className="flex flex-wrap gap-2">
                    <Tab href="/ceo" label="Overview" />
                    <Tab href="/ceo/tasks" label="Tasks" />
                    <Tab href="/ceo/deals" label="Deals" />
                    <Tab href="/ceo/finance" label="Finance" />
                    <Tab href="/ceo/performance" label="Performance" />
                    <Tab href="/ceo/ai-hub" label="AI Hub" />
                    <Tab href="/ceo/dev-workbench" label="Dev WB" isActive />
                    <Tab href="/ceo/settings" label="Settings" />
                    <Tab href="/ceo/logout" label="Logout" />
                </nav>
            </header>

            {/* Top row: Branches + Checks */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
                {/* Branches */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Active branches
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                High-level view of the work you&apos;ve got in flight.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <GitBranch className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        {BRANCHES.map((branch) => (
                            <li
                                key={branch.name}
                                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div>
                                    <p className="font-mono text-[11px]">{branch.name}</p>
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {branch.scope} · base:{' '}
                                        <span className="font-mono">{branch.base}</span>
                                    </p>
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {branch.note}
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusBadgeClasses(
                                        branch.status,
                                    )}`}
                                >
                                    {branch.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Checks summary */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Checks & CI mood
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    TypeScript, builds, and structural refactors at a glance.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <CheckCircle2 className="h-4 w-4" />
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-xs">
                            {CHECKS.map((check) => (
                                <li
                                    key={check.name}
                                    className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                                >
                                    <div>
                                        <p className="font-medium">{check.name}</p>
                                        <p className="mt-1 text-[11px] text-muted-foreground">
                                            {check.note}
                                        </p>
                                    </div>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${checkStatusClasses(
                                            check.status,
                                        )}`}
                                    >
                                        {check.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-4 text-xs text-muted-foreground shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-muted">
                                <GitPullRequest className="h-3.5 w-3.5" />
                            </div>
                            <div>
                                <p className="font-semibold">
                                    How this pairs with your AI dev flow
                                </p>
                                <p className="mt-1 text-[11px]">
                                    Use this board to pick a branch, then let your AI pair
                                    programmer help write/refactor code. Dev Workbench keeps track
                                    of the &quot;meta&quot;: branches, checks, and what&apos;s
                                    next.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom row: Work queue + Workflow checklist */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.4fr)]">
                {/* Work queue */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Refactor & polish queue
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Tiny bites of dev work you can ship between bigger tasks.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Wrench className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        {WORK_QUEUE.map((item) => (
                            <li
                                key={item.label}
                                className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div className="mt-1 flex h-2.5 w-2.5 items-center justify-center">
                                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary/80" />
                                </div>
                                <div>
                                    <p className="font-medium">{item.label}</p>
                                    <span
                                        className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${workAreaClasses(
                                            item.area,
                                        )}`}
                                    >
                                        {item.area}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-3 text-[11px] text-muted-foreground">
                        Later, this can sync with a real task list and show which refactors
                        are attached to which branches and PRs.
                    </p>
                </div>

                {/* Workflow checklist */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Workflow & guardrails
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <ListChecks className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        <li className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2">
                            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-card">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </div>
                            <div>
                                <p className="font-medium">One feature per branch</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Keep branches small and named after the feature (like you&apos;ve
                                    been doing) so CEO and Dev views stay readable.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2">
                            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-card">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </div>
                            <div>
                                <p className="font-medium">Green checks before PR</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    TS + lint should be clean locally before you push. Later,
                                    Dev Workbench can read CI status from GitHub directly.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2">
                            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-card">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </div>
                            <div>
                                <p className="font-medium">Refactor with a buddy</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Use your AI pair programmer for code + refactor details; Dev
                                    Workbench keeps the bigger picture and suggests where to focus
                                    next.
                                </p>
                            </div>
                        </li>
                    </ul>

                    <div className="mt-3 flex items-start gap-3 rounded-xl border border-dashed border-border bg-background/60 px-3 py-2 text-[11px] text-muted-foreground">
                        <Code2 className="mt-0.5 h-3.5 w-3.5" />
                        <p>
                            Future: This card can pull real branch/PR/CI stats from GitHub and
                            show which repos are clean vs. need attention across the whole
                            Digital Hooligan monorepo.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}