// apps/digitalhooligan-web/app/labs/app-registry/page.tsx

import Link from "next/link";
import { APP_REGISTRY, type AppRegistryEntry, type LifecycleStage } from "@/lib/appRegistry";

const LIFECYCLE_ORDER: LifecycleStage[] = [
    "live",
    "beta",
    "alpha",
    "building",
    "design",
    "idea",
    "paused",
];

const LIFECYCLE_LABELS: Record<LifecycleStage, string> = {
    live: "Live",
    beta: "Beta",
    alpha: "Alpha",
    building: "Building",
    design: "Design",
    idea: "Idea",
    paused: "Paused",
};

const LIFECYCLE_BADGE_STYLES: Record<LifecycleStage, string> = {
    live: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
    beta: "bg-sky-500/10 text-sky-300 border-sky-500/40",
    alpha: "bg-indigo-500/10 text-indigo-300 border-indigo-500/40",
    building: "bg-amber-500/10 text-amber-300 border-amber-500/40",
    design: "bg-pink-500/10 text-pink-300 border-pink-500/40",
    idea: "bg-slate-500/10 text-slate-300 border-slate-500/40",
    paused: "bg-zinc-700/40 text-zinc-300 border-zinc-600",
};

function groupByLifecycle(entries: AppRegistryEntry[]): Record<LifecycleStage, AppRegistryEntry[]> {
    const groups: Record<LifecycleStage, AppRegistryEntry[]> = {
        live: [],
        beta: [],
        alpha: [],
        building: [],
        design: [],
        idea: [],
        paused: [],
    };

    for (const app of entries) {
        groups[app.lifecycle].push(app);
    }

    return groups;
}

export default function LabsAppRegistryPage() {
    const groups = groupByLifecycle(APP_REGISTRY);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pt-14">
                {/* Header row */}
                <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
                            Hooligan Labs · Internal
                        </p>
                        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            App Registry
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-300/80 md:text-base">
                            Single source of truth for apps, bots, and internal tools across Digital Hooligan.
                            This view is powered directly by the typed <code className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">APP_REGISTRY</code>{" "}
                            config.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-start gap-3 md:justify-end">
                        <Link
                            href="/labs/hq"
                            className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-sm transition hover:border-emerald-500/60 hover:bg-slate-900"
                        >
                            <span className="mr-1.5 text-xs">←</span>
                            Back to Labs HQ
                        </Link>

                        <span className="inline-flex items-center rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1.5 text-[0.7rem] font-medium text-slate-300">
                            <span className="mr-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Registry snapshot
                        </span>
                    </div>
                </div>

                {/* Small stats row */}
                <div className="mb-8 grid gap-4 md:grid-cols-4">
                    <StatCard
                        label="Total entries"
                        value={APP_REGISTRY.length.toString()}
                        hint="Apps, bots, and tools"
                    />
                    <StatCard
                        label="Live / Beta"
                        value={(
                            APP_REGISTRY.filter((a) => a.lifecycle === "live" || a.lifecycle === "beta").length
                        ).toString()}
                        hint="Customer-facing or dogfooding"
                    />
                    <StatCard
                        label="Internal-only"
                        value={APP_REGISTRY.filter((a) => a.internalOnly).length.toString()}
                        hint="Dashboards + toys"
                    />
                    <StatCard
                        label="Public-ready"
                        value={APP_REGISTRY.filter((a) => !a.internalOnly).length.toString()}
                        hint="Visible to users"
                    />
                </div>

                {/* Grouped lists by lifecycle */}
                <div className="space-y-8">
                    {LIFECYCLE_ORDER.map((stage) => {
                        const items = groups[stage];
                        if (!items || items.length === 0) return null;

                        return (
                            <section key={stage}>
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={[
                                                "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em]",
                                                LIFECYCLE_BADGE_STYLES[stage],
                                            ].join(" ")}
                                        >
                                            {LIFECYCLE_LABELS[stage]}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {items.length} {items.length === 1 ? "entry" : "entries"}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                    {items.map((app) => (
                                        <AppCard key={app.id} app={app} />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

function StatCard(props: { label: string; value: string; hint?: string }) {
    return (
        <div className="rounded-2xl border border-slate-800/90 bg-slate-950/70 px-4 py-3 shadow-sm shadow-black/50">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                {props.label}
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-50">{props.value}</p>
            {props.hint && (
                <p className="mt-1 text-xs text-slate-400/90">
                    {props.hint}
                </p>
            )}
        </div>
    );
}

function AppCard({ app }: { app: AppRegistryEntry }) {
    const isInternal = !!app.internalOnly;

    return (
        <div className="group flex h-full flex-col rounded-2xl border border-slate-800/90 bg-slate-950/70 p-4 shadow-sm shadow-black/50 transition hover:border-emerald-500/50 hover:bg-slate-950">
            <div className="mb-2 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900/80 text-lg">
                        {app.icon.type === "emoji" ? app.icon.value : "⛓"}
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h2 className="text-sm font-semibold text-slate-50">
                                {app.name}
                            </h2>
                            {isInternal && (
                                <span className="rounded-full bg-slate-900/80 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-slate-400">
                                    Internal
                                </span>
                            )}
                        </div>
                        <p className="text-[0.7rem] text-slate-400">
                            {app.kind === "public-app" && "Public app"}
                            {app.kind === "internal-tool" && "Internal tool"}
                            {app.kind === "bot" && "Automation / bot"}
                            {app.kind === "infra" && "Infra / shared"}
                        </p>
                    </div>
                </div>
            </div>

            <p className="mb-3 line-clamp-3 text-xs text-slate-300/90">
                {app.description}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-2 text-[0.7rem]">
                {app.marketingPath && (
                    <PathPill label="Marketing" value={app.marketingPath} />
                )}
                {app.ceoPath && <PathPill label="CEO" value={app.ceoPath} />}
                {app.labsPath && <PathPill label="Labs" value={app.labsPath} />}
                {app.externalUrl && (
                    <span className="rounded-full border border-slate-700/70 bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-300">
                        External URL
                    </span>
                )}
            </div>

            {app.tags && app.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {app.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-400"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

function PathPill({ label, value }: { label: string; value: string }) {
    return (
        <span className="inline-flex items-center rounded-full border border-slate-700/70 bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-300">
            <span className="mr-1 text-[0.6rem] text-slate-500">{label}:</span>
            <span className="font-mono text-[0.65rem] text-slate-200">{value}</span>
        </span>
    );
}