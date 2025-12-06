// apps/digitalhooligan-web/app/ceo/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { HealthStatusChip } from "@/components/ceo/HealthStatusChip";
/**
 * Local mirror of /api/apps/registry response shape.
 * We only care about a subset of fields on the client.
 */

type AppsRegistryEntry = {
    id: string;
    name: string;
    kind: string;
    lifecycle: string;
};

type AppsRegistrySummary = {
    total: number;
    byKind: Record<string, number>;
    byLifecycle: Record<string, number>;
};

type AppsRegistryResponse = {
    ok: true;
    type: "apps_registry";
    apps: AppsRegistryEntry[];
    summary: AppsRegistrySummary;
    timestamp: string;
};

type AppSnapshotState =
    | { status: "loading" }
    | {
        status: "ready";
        total: number;
        publicApps: number;
        internalTools: number;
        live: number;
        beta: number;
        build: number;
        idea: number;
    }
    | { status: "error"; message: string };

export default function CeoDashboardPage() {
    const [appSnapshot, setAppSnapshot] =
        React.useState<AppSnapshotState>({ status: "loading" });

    React.useEffect(() => {
        void loadAppSnapshot();
    }, []);

    async function loadAppSnapshot() {
        setAppSnapshot({ status: "loading" });

        try {
            const res = await fetch("/api/apps/registry");
            if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
            }

            const data = (await res.json()) as AppsRegistryResponse;

            const publicApps = data.summary.byKind["public-app"] ?? 0;
            const internalTools = data.summary.byKind["internal-tool"] ?? 0;

            const live = data.summary.byLifecycle["live"] ?? 0;
            const beta = data.summary.byLifecycle["beta"] ?? 0;
            const build = data.summary.byLifecycle["build"] ?? 0;
            const idea = data.summary.byLifecycle["idea"] ?? 0;

            setAppSnapshot({
                status: "ready",
                total: data.summary.total,
                publicApps,
                internalTools,
                live,
                beta,
                build,
                idea,
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error loading /api/apps/registry.";
            setAppSnapshot({ status: "error", message });
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header */}
                <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            CEO dashboard
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            One place to see money, products, deals, and app health across Digital Hooligan.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-300">
                        {/* New dynamic health chip */}
                        <HealthStatusChip />

                        {/* Keep any existing mode chip / buttons you already have here */}
                        {/* Example, if you have something like: */}
                        {/* <span className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-slate-200 ring-1 ring-slate-700/80">
      Mode: CEO / overview
    </span> */}
                    </div>
                </header>

                {/* Nav tabs */}
                <nav className="mb-6 overflow-x-auto">
                    <div className="flex gap-2 text-sm">
                        <CeoTab href="/ceo" label="Overview" active />
                        <CeoTab href="/ceo/tasks" label="Tasks" />
                        <CeoTab href="/ceo/deals" label="Deals" />
                        <CeoTab href="/ceo/finance" label="Finance" />
                        <CeoTab href="/ceo/performance" label="Performance" />
                        <CeoTab href="/ceo/ai-hub" label="AI Hub" />
                        <CeoTab href="/ceo/dev-workbench" label="Dev WB" />
                        <CeoTab href="/ceo/settings" label="Settings" />
                        <CeoTab href="/ceo/logout" label="Logout" />
                    </div>
                </nav>

                {/* Top snapshot grid */}
                <section className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <SnapshotCard
                        heading="Money"
                        value="$4,250"
                        description="Est. MRR across all live products once initial apps ship."
                        pill="Pipeline blend from gov + SaaS assumptions."
                        icon="💸"
                    />
                    <SnapshotCard
                        heading="Products"
                        value="3 live"
                        description="PennyWize, DropSignal, HypeWatch (plus Ops Toys internally)."
                        pill="Roadmaps live in CEO dashboard + Labs HQ."
                        icon="📦"
                    />
                    <SnapshotCard
                        heading="Deals"
                        value="2 open"
                        description="Active opportunities + proposals across gov + freelance + apps."
                        pill="See full pipeline in the Deals tab."
                        icon="📑"
                    />
                    <SnapshotCard
                        heading="App performance"
                        value="99.92%"
                        description="All apps healthy + 0 open incidents (for now)."
                        pill="Dig deeper in App performance for latency + incidents."
                        icon="📈"
                    />
                </section>

                {/* App portfolio snapshot */}
                <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                App portfolio snapshot
                            </p>
                            <p className="mt-1 text-sm text-slate-200">
                                Quick view of how many apps, bots, and internal tools exist in
                                the registry. This is backed by{" "}
                                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem] text-emerald-300">
                                    /api/apps/registry
                                </code>{" "}
                                so it stays in sync with Labs.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => void loadAppSnapshot()}
                            className="inline-flex items-center self-start rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[0.75rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                        >
                            Refresh
                        </button>
                    </div>

                    <AppPortfolioSnapshot state={appSnapshot} />
                </section>

                {/* Today’s focus + notes */}
                <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr),minmax(0,1.1fr)]">
                    <TodayFocusCard />
                    <CeoCopilotPreviewCard />
                </section>

                {/* Decision log placeholder */}
                <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Decision log (lightweight)
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                        Later this can be a structured log of CEO decisions (pricing
                        changes, product focus, hiring, etc.) with a tiny AI layer to
                        summarize what changed week to week.
                    </p>
                </section>
            </div>
        </main>
    );
}

/* ---------- Shared small components ---------- */

function CeoTab({
    href,
    label,
    active,
}: {
    href: string;
    label: string;
    active?: boolean;
}) {
    if (active) {
        return (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900">
                {label}
            </span>
        );
    }

    return (
        <Link
            href={href}
            className="inline-flex items-center rounded-full bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 ring-1 ring-slate-700/80 hover:bg-slate-800 hover:text-emerald-200 hover:ring-emerald-500/70"
        >
            {label}
        </Link>
    );
}

function SnapshotCard(props: {
    heading: string;
    value: string;
    description: string;
    pill: string;
    icon: string;
}) {
    const { heading, value, description, pill, icon } = props;

    return (
        <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {heading}
                </p>
                <span className="text-lg">{icon}</span>
            </div>
            <p className="text-2xl font-semibold tracking-tight text-slate-50">
                {value}
            </p>
            <p className="mt-1 text-[0.85rem] text-slate-300">{description}</p>
            <p className="mt-2 text-[0.75rem] text-slate-400">{pill}</p>
        </div>
    );
}

/* ---------- App portfolio snapshot ---------- */

function AppPortfolioSnapshot({ state }: { state: AppSnapshotState }) {
    if (state.status === "loading") {
        return (
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-[0.85rem] text-slate-300">
                Loading registry snapshot…
            </div>
        );
    }

    if (state.status === "error") {
        return (
            <div className="rounded-xl border border-rose-500/60 bg-rose-950/40 px-3 py-3 text-[0.85rem] text-rose-100">
                <p className="font-semibold">Couldn&apos;t load app registry.</p>
                <p className="mt-1 text-[0.8rem]">{state.message}</p>
                <p className="mt-2 text-[0.75rem] text-rose-100/90">
                    Hit{" "}
                    <code className="rounded bg-rose-900/50 px-1 py-0.5 text-[0.7rem]">
                        /api/apps/registry
                    </code>{" "}
                    directly in your browser or Insomnia/Kong to debug the payload.
                </p>
            </div>
        );
    }

    const { total, publicApps, internalTools, live, beta, build, idea } = state;

    return (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <PortfolioCard
                label="Live / beta"
                primary={`${live} live`}
                secondary={`${beta} in beta`}
                description="Anything currently live or being dogfooded."
            />
            <PortfolioCard
                label="Public-ready"
                primary={`${publicApps} public`}
                secondary={`${build} in build`}
                description="User-facing apps and products in the registry."
            />
            <PortfolioCard
                label="Internal-only"
                primary={`${internalTools} internal`}
                secondary={`${idea} in idea/design`}
                description="CEO, Labs HQ, and ops toys that stay behind the curtain."
            />
            <PortfolioCard
                label="Registry detail"
                primary={`${total} entries`}
                secondary="1 source of truth"
                description="For lifecycle breakdowns and per-app routes, use /ceo/apps or /labs/app-registry."
            />
        </div>
    );
}

function PortfolioCard(props: {
    label: string;
    primary: string;
    secondary: string;
    description: string;
}) {
    const { label, primary, secondary, description } = props;

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-3 text-[0.85rem] text-slate-200">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {label}
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-50">{primary}</p>
            <p className="text-[0.75rem] text-slate-300">{secondary}</p>
            <p className="mt-2 text-[0.8rem] text-slate-300">{description}</p>
        </div>
    );
}

/* ---------- Today’s focus + copilot preview (static for now) ---------- */

function TodayFocusCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Today&apos;s focus
            </p>
            <p className="mt-1 text-sm text-slate-200">
                High-impact moves for future Tez across product, gov, and admin.
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                <li>• Finish CEO dashboard shell + navigation.</li>
                <li>• Close out Labs HQ wiring with registry + health.</li>
                <li>• Outline PennyWize + DropSignal MVP assist flows.</li>
            </ul>
        </div>
    );
}

function CeoCopilotPreviewCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-sm shadow-black/40">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                CEO copilot (preview)
            </p>
            <p className="mt-1 text-sm text-slate-200">
                Tiny readout that will later stitch Tasks, Deals, Performance, and Dev
                Workbench into one suggestion.
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                <li>
                    • <span className="font-semibold">Today&apos;s headline:</span>{" "}
                    Finish this dashboard shell, then pick one concrete move on revenue.
                </li>
                <li>
                    • <span className="font-semibold">Deals snapshot:</span> Keep 1–3
                    deals truly active; park the rest.
                </li>
                <li>
                    • <span className="font-semibold">Dev / refactor nudge:</span> Wrap
                    one small refactor or UX polish task on the current feature branch,
                    ship it, and let Dev Workbench + your AI pair handle the details.
                </li>
            </ul>
            <p className="mt-3 text-[0.7rem] text-slate-400">
                Future wiring: this panel can read live data from Tasks, Deals, App
                performance, and GitHub to generate a fresh briefing every morning.
            </p>
        </div>
    );
}