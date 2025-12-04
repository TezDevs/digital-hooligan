// apps/digitalhooligan-web/app/ceo/apps/page.tsx

import Link from "next/link";
import { APP_REGISTRY, type AppRegistryEntry, type AppKind, type LifecycleStage } from "@/lib/appRegistry";

const KIND_LABELS: Record<AppKind, string> = {
    "public-app": "Public app",
    "internal-tool": "Internal tool",
    bot: "Automation / bot",
    infra: "Infra / shared",
};

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

function splitPublicInternal(entries: AppRegistryEntry[]) {
    const publicApps: AppRegistryEntry[] = [];
    const internalApps: AppRegistryEntry[] = [];

    for (const app of entries) {
        if (app.internalOnly) internalApps.push(app);
        else publicApps.push(app);
    }

    return { publicApps, internalApps };
}

export default function CeoAppsPortfolioPage() {
    const total = APP_REGISTRY.length;
    const liveOrBeta = APP_REGISTRY.filter(
        (a) => a.lifecycle === "live" || a.lifecycle === "beta",
    ).length;
    const internalOnly = APP_REGISTRY.filter((a) => a.internalOnly).length;
    const publicReady = APP_REGISTRY.filter((a) => !a.internalOnly).length;

    const { publicApps, internalApps } = splitPublicInternal(APP_REGISTRY);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pt-14">
                {/* Header / breadcrumbs */}
                <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <Link
                                href="/ceo"
                                className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 font-medium text-[0.7rem] text-slate-300 ring-1 ring-slate-700/80 hover:text-emerald-300 hover:ring-emerald-500/70"
                            >
                                <span className="mr-1 text-[0.7rem]">←</span>
                                CEO overview
                            </Link>
                            <span className="inline-flex items-center rounded-full bg-slate-900/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400 ring-1 ring-slate-800/80">
                                CEO · Portfolio
                            </span>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            Apps & Bots Portfolio
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-300/80 md:text-base">
                            Single view of everything Digital Hooligan is building, dogfooding, or running in
                            production. Powered by the typed{" "}
                            <code className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">
                                APP_REGISTRY
                            </code>{" "}
                            config.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/labs/app-registry"
                            className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-sm transition hover:border-emerald-500/60 hover:bg-slate-950"
                        >
                            <span className="mr-1.5 text-xs">🧪</span>
                            Open Labs App Registry
                        </Link>
                    </div>
                </div>

                {/* Stat strip */}
                <div className="mb-8 grid gap-4 md:grid-cols-4">
                    <StatCard
                        label="Total entries"
                        value={total.toString()}
                        hint="Apps, bots, and internal tools"
                    />
                    <StatCard
                        label="Live / Beta"
                        value={liveOrBeta.toString()}
                        hint="Customer-facing or dogfooding"
                    />
                    <StatCard
                        label="Internal-only"
                        value={internalOnly.toString()}
                        hint="Dashboards + ops toys"
                    />
                    <StatCard
                        label="Public-ready"
                        value={publicReady.toString()}
                        hint="Visible to users"
                    />
                </div>

                {/* Public vs internal columns */}
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
                    {/* Public apps */}
                    <section>
                        <div className="mb-3 flex items-center justify-between gap-2">
                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                    Public apps & products
                                </h2>
                                <p className="mt-1 text-xs text-slate-400">
                                    Things users will touch directly — sites, tools, bots, and future subscriptions.
                                </p>
                            </div>
                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-300 ring-1 ring-emerald-500/40">
                                {publicApps.length} item{publicApps.length === 1 ? "" : "s"}
                            </span>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            {publicApps.map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </section>

                    {/* Internal tools */}
                    <section>
                        <div className="mb-3 flex items-center justify-between gap-2">
                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                                    Internal dashboards & toys
                                </h2>
                                <p className="mt-1 text-xs text-slate-400">
                                    CEO tools, Labs HQ views, and ops automation that stay behind the curtain.
                                </p>
                            </div>
                            <span className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[0.7rem] font-medium text-slate-200 ring-1 ring-slate-600/80">
                                {internalApps.length} item{internalApps.length === 1 ? "" : "s"}
                            </span>
                        </div>

                        <div className="grid gap-3">
                            {internalApps.map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

function StatCard(props: { label: string; value: string; hint?: string }) {
    return (
        <div className="rounded-2xl border border-slate-800/90 bg-slate-950/70 px-4 py-3 shadow-sm shadow-black/40">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                {props.label}
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-50">{props.value}</p>
            {props.hint && (
                <p className="mt-1 text-xs text-slate-400/90">{props.hint}</p>
            )}
        </div>
    );
}

function AppCard({ app }: { app: AppRegistryEntry }) {
    const lifecycleLabel = LIFECYCLE_LABELS[app.lifecycle];
    const lifecycleStyle = LIFECYCLE_BADGE_STYLES[app.lifecycle];

    return (
        <div className="group flex h-full flex-col rounded-2xl border border-slate-800/90 bg-slate-950/70 p-4 shadow-sm shadow-black/40 transition hover:border-emerald-500/60 hover:bg-slate-950">
            <div className="mb-2 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/80 text-lg">
                        {app.icon.type === "emoji" ? app.icon.value : "⛓"}
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                            <h3 className="text-sm font-semibold text-slate-50">
                                {app.name}
                            </h3>
                            {app.shortName && app.shortName !== app.name && (
                                <span className="rounded-full bg-slate-900/80 px-1.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-slate-400">
                                    {app.shortName}
                                </span>
                            )}
                        </div>
                        <p className="text-[0.7rem] text-slate-400">
                            {KIND_LABELS[app.kind]}
                        </p>
                    </div>
                </div>

                <span
                    className={[
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em]",
                        lifecycleStyle,
                    ].join(" ")}
                >
                    {lifecycleLabel}
                </span>
            </div>

            <p className="mb-3 line-clamp-3 text-xs text-slate-300/90">
                {app.description}
            </p>

            {/* Paths row */}
            <div className="mt-auto flex flex-wrap items-center gap-1.5 text-[0.7rem]">
                {app.marketingPath && (
                    <PathPill label="Marketing" value={app.marketingPath} />
                )}
                {app.ceoPath && <PathPill label="CEO" value={app.ceoPath} />}
                {app.labsPath && <PathPill label="Labs" value={app.labsPath} />}
            </div>

            {/* Tags */}
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