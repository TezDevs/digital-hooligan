'use client';

import React from 'react';
import Link from 'next/link';
import {
    FlaskConical,
    Beaker,
    Rocket,
    Wrench,
    LineChart,
    ListChecks,
    Brain,
    ArrowRight,
} from 'lucide-react';

type ExperimentStatus = 'Exploring' | 'MVP' | 'Hardening';

type Experiment = {
    id: string;
    name: string;
    code: string;
    status: ExperimentStatus;
    focus: string;
    notes: string;
};

const EXPERIMENTS: Experiment[] = [
    {
        id: 'pw',
        name: 'PennyWize',
        code: 'PW',
        status: 'MVP',
        focus: 'Penny stock intel tool with alerts + social layer.',
        notes: 'Clarify MVP scope and backend data sources.',
    },
    {
        id: 'ds',
        name: 'DropSignal',
        code: 'DS',
        status: 'Exploring',
        focus: 'Sneaker/streetwear price-drop bot (assist mode first).',
        notes: 'Lock assist-mode alerts and retailer targets.',
    },
    {
        id: 'hw',
        name: 'HypeWatch',
        code: 'HW',
        status: 'Exploring',
        focus: 'Collectibles price-watch bot.',
        notes: 'Differentiate clearly from DropSignal (display pieces).',
    },
    {
        id: 'ot',
        name: 'Ops Toys',
        code: 'OT',
        status: 'Hardening',
        focus: 'Internal drawer of ops automation toys.',
        notes: 'Identify 1–2 concrete infra/logging helpers to ship early.',
    },
];

type PipelineStage = 'Idea' | 'Design' | 'Build' | 'Polish';

type PipelineItem = {
    label: string;
    app: string;
    stage: PipelineStage;
    note: string;
};

const PIPELINE: PipelineItem[] = [
    {
        label: 'PennyWize MVP feature list',
        app: 'PennyWize',
        stage: 'Design',
        note: 'Scraper inputs, alert rules, and simple UI.',
    },
    {
        label: 'DropSignal assist-mode spec',
        app: 'DropSignal',
        stage: 'Idea',
        note: 'User flows: add item → watch → alert → link out.',
    },
    {
        label: 'Labs → CEO metrics bridge',
        app: 'All apps',
        stage: 'Build',
        note: 'Agree on basic metrics shape for App performance.',
    },
    {
        label: 'Ops Toys first automation',
        app: 'Ops Toys',
        stage: 'Build',
        note: 'Pick one pain (logs, branches, or deployments) to smooth.',
    },
];

type BacklogItem = {
    area: 'Brand / UX' | 'Tech / infra' | 'AI / automation';
    label: string;
};

const BACKLOG: BacklogItem[] = [
    {
        area: 'Brand / UX',
        label: 'Shared icon language across apps (badges, pills, dots).',
    },
    {
        area: 'Tech / infra',
        label: 'Decide on DB + ORM for metrics and internal data.',
    },
    {
        area: 'AI / automation',
        label: 'Define first CEO Copilot data contract (inputs/outputs).',
    },
    {
        area: 'AI / automation',
        label: 'Draft Dev Workbench → GitHub integration plan.',
    },
];

function statusClasses(status: ExperimentStatus) {
    switch (status) {
        case 'Exploring':
            return 'bg-sky-500/10 text-sky-400';
        case 'MVP':
            return 'bg-emerald-500/10 text-emerald-400';
        case 'Hardening':
            return 'bg-amber-500/10 text-amber-300';
        default:
            return 'bg-slate-500/10 text-slate-200';
    }
}

function stageClasses(stage: PipelineStage) {
    switch (stage) {
        case 'Idea':
            return 'bg-slate-500/10 text-slate-200';
        case 'Design':
            return 'bg-sky-500/10 text-sky-400';
        case 'Build':
            return 'bg-emerald-500/10 text-emerald-400';
        case 'Polish':
            return 'bg-pink-500/10 text-pink-300';
        default:
            return 'bg-slate-500/10 text-slate-200';
    }
}

function backlogAreaClasses(area: BacklogItem['area']) {
    switch (area) {
        case 'Brand / UX':
            return 'bg-pink-500/10 text-pink-300';
        case 'Tech / infra':
            return 'bg-sky-500/10 text-sky-400';
        case 'AI / automation':
            return 'bg-amber-500/10 text-amber-300';
        default:
            return 'bg-slate-500/10 text-slate-200';
    }
}

export default function LabsHqPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Hooligan Labs HQ
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Internal home for experiments, app roadmaps, and build pipeline
                            across Digital Hooligan.
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-xs">
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span>Lab status: active experiments</span>
                        </div>
                        <div className="flex gap-2 text-[11px] text-muted-foreground">
                            <Link
                                href="/ceo"
                                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-1 hover:bg-muted"
                            >
                                <LineChart className="h-3 w-3" />
                                <span>Jump to CEO dashboard</span>
                            </Link>
                            <Link
                                href="/ceo/dev-workbench"
                                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-1 hover:bg-muted"
                            >
                                <Brain className="h-3 w-3" />
                                <span>Dev Workbench</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Snapshot row */}
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Experiments
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">
                                {EXPERIMENTS.length}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Core apps and internal toys under the Labs umbrella.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <FlaskConical className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Build pipeline
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">
                                {PIPELINE.filter((p) => p.stage === 'Build').length} in build
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Items currently in &quot;Build&quot; across apps and infra.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <Wrench className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Idea backlog
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">
                                {BACKLOG.length}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                High-level ideas waiting to be pulled into a real sprint.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <Beaker className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Ready for CEO
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">Next up</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Labs items that are close to being promoted into the CEO
                                dashboard and real products.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <Rocket className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Experiments grid */}
            <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Experiments by app
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Where each app or bot sits in the Labs lifecycle.
                        </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                        <FlaskConical className="h-4 w-4" />
                    </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4 text-xs">
                    {EXPERIMENTS.map((exp) => (
                        <div
                            key={exp.id}
                            className="flex flex-col gap-2 rounded-xl border border-border bg-background/60 px-3 py-3"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <div className="inline-flex items-center gap-2">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-[11px] font-semibold">
                                        {exp.code}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium">{exp.name}</p>
                                        <p className="text-[11px] text-muted-foreground">
                                            {exp.focus}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusClasses(
                                        exp.status,
                                    )}`}
                                >
                                    {exp.status}
                                </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">{exp.notes}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-3 text-[11px] text-muted-foreground">
                    Later, this grid can pull real status from a Labs DB and link directly
                    into app-specific dashboards and metrics.
                </p>
            </section>

            {/* Pipeline + backlog row */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
                {/* Pipeline */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Build pipeline
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                What&apos;s moving from idea → design → build → polish.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <ListChecks className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        {PIPELINE.map((item) => (
                            <li
                                key={item.label}
                                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div>
                                    <p className="font-medium">{item.label}</p>
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {item.app}
                                    </p>
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {item.note}
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${stageClasses(
                                        item.stage,
                                    )}`}
                                >
                                    {item.stage}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-3 text-[11px] text-muted-foreground">
                        Future: tie stages to real tickets/branches and surface anything
                        that&apos;s blocked directly in CEO Dev Workbench.
                    </p>
                </div>

                {/* Backlog */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Labs backlog
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Big ideas that should be tracked, not lost.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Brain className="h-4 w-4" />
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs">
                        {BACKLOG.map((item, idx) => (
                            <li
                                key={idx}
                                className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                            >
                                <div className="mt-1 flex h-2.5 w-2.5 items-center justify-center">
                                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary/80" />
                                </div>
                                <div>
                                    <p className="font-medium">{item.label}</p>
                                    <span
                                        className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${backlogAreaClasses(
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
                        Later, these entries can map to real tasks, AI ideas, and design
                        tickets so you always know what&apos;s in the hopper.
                    </p>
                </div>
            </section>

            {/* Footer note */}
            <section className="rounded-2xl border border-dashed border-border bg-card/70 p-4 text-xs text-muted-foreground shadow-sm sm:p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5" />
                        <div>
                            <p className="font-semibold">
                                Labs → CEO → Production flow (future wiring)
                            </p>
                            <p className="mt-1 text-[11px]">
                                Experiments live here first. Once the shape feels right, they
                                graduate into CEO views with real metrics, and eventually out to
                                public apps and bots under Digital Hooligan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}