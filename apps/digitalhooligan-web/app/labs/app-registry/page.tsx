// apps/digitalhooligan-web/app/labs/app-registry/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

const KIND_LABEL: Record<AppRegistryEntry["kind"], string> = {
    "public-app": "Public app",
    "internal-tool": "Internal tool",
    bot: "Automation bot",
    infra: "Infra component",
};

const LIFECYCLE_ORDER: AppRegistryEntry["lifecycle"][] = [
    "live",
    "beta",
    "alpha",
    "building",
    "design",
    "idea",
    "paused",
];

export default function LabsAppRegistryPage() {
    const [filter, setFilter] = React.useState("");
    const [showInternalOnly, setShowInternalOnly] = React.useState(false);

    const entries = React.useMemo(() => {
        let list = [...APP_REGISTRY];

        // Simple text filter on name / id / tags
        if (filter.trim().length > 0) {
            const q = filter.trim().toLowerCase();
            list = list.filter((entry) => {
                const tags = entry.tags?.join(" ") ?? "";
                return (
                    entry.id.toLowerCase().includes(q) ||
                    entry.name.toLowerCase().includes(q) ||
                    tags.toLowerCase().includes(q)
                );
            });
        }

        // Internal-only toggle
        if (showInternalOnly) {
            list = list.filter((entry) => entry.internalOnly);
        }

        // Sort: lifecycle first (live → paused), then name
        list.sort((a, b) => {
            const aIndex = LIFECYCLE_ORDER.indexOf(a.lifecycle);
            const bIndex = LIFECYCLE_ORDER.indexOf(b.lifecycle);
            if (aIndex !== bIndex) return aIndex - bIndex;
            return a.name.localeCompare(b.name);
        });

        return list;
    }, [filter, showInternalOnly]);

    const total = APP_REGISTRY.length;
    const internalCount = APP_REGISTRY.filter((e) => e.internalOnly).length;

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header / breadcrumbs */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <Link
                                href="/labs/hq"
                                className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 font-medium text-[0.7rem] text-slate-300 ring-1 ring-slate-700/80 hover:text-emerald-300 hover:ring-emerald-500/70"
                            >
                                <span className="mr-1 text-[0.7rem]">←</span>
                                Labs HQ
                            </Link>
                            <span className="inline-flex items-center rounded-full bg-slate-900/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400 ring-1 ring-slate-800/80">
                                Labs · App Registry
                            </span>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            App Registry inspector
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Read-only view of{" "}
                            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">
                                APP_REGISTRY
                            </code>
                            . Use this to sanity-check ids, paths, lifecycle stage, and tags
                            before wiring UIs, AI, or metrics.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right text-[0.75rem] text-slate-400">
                        <p className="max-w-xs text-xs text-slate-400">
                            Future: inline editing + version history so you can evolve the
                            portfolio from Labs without touching code.
                        </p>
                        <Link
                            href="/ceo/dev-workbench"
                            className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-[0.7rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                        >
                            Open Dev Workbench →
                        </Link>
                    </div>
                </div>

                {/* Stats + controls */}
                <section className="mb-6 grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1.5fr)]">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Registry stats
                                </p>
                                <p className="mt-1 text-sm text-slate-200">
                                    {total} total entries · {internalCount} internal-only
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-300">
                                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 ring-1 ring-slate-700/70">
                                    <span className="mr-1.5 text-xs">📦</span>
                                    {entries.length} shown after filters
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 md:flex-row md:items-center">
                            <div className="flex-1">
                                <label className="mb-1 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Filter
                                </label>
                                <input
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    placeholder="Search by id, name, or tag…"
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500/70 focus:outline-none focus:ring-1 focus:ring-emerald-500/60"
                                />
                            </div>
                            <label className="flex items-center gap-2 text-xs text-slate-300">
                                <input
                                    type="checkbox"
                                    checked={showInternalOnly}
                                    onChange={(e) => setShowInternalOnly(e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                                />
                                Show internal-only apps first
                            </label>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-300 shadow-sm shadow-black/40">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            How this connects
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4">
                            <li>
                                CEO <span className="font-medium">Dev Workbench</span> reads
                                directly from this registry and surfaces API routes.
                            </li>
                            <li>
                                <span className="font-medium">AI Hub</span> uses these entries
                                to build summaries and suggestions.
                            </li>
                            <li>
                                <span className="font-medium">Health</span> and{" "}
                                <span className="font-medium">AI</span> endpoints use the
                                registry count for sanity checks.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Registry entries */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Registry entries
                        </h2>
                        <p className="text-xs text-slate-400">
                            Each card is one row in <code>APP_REGISTRY</code>. Keep ids and
                            paths stable so CEO + Labs + AI stay in sync.
                        </p>
                    </div>

                    {entries.length === 0 ? (
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-300">
                            No entries match the current filters. Clear the search box or
                            toggle off internal-only to see everything again.
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {entries.map((entry) => (
                                <RegistryCard key={entry.id} entry={entry} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

function RegistryCard({ entry }: { entry: AppRegistryEntry }) {
    const kindLabel = KIND_LABEL[entry.kind];
    const audienceLabel = entry.internalOnly ? "Internal-only" : "User-facing";

    const lifecycleLabel = entry.lifecycle;

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
            {/* Header row */}
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/90 text-xl">
                        {entry.icon?.type === "emoji" ? entry.icon.value : "⛓"}
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                            <h3 className="text-sm font-semibold text-slate-50">
                                {entry.name}
                            </h3>
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-slate-400">
                                {lifecycleLabel}
                            </span>
                        </div>
                        <p className="mt-1 text-[0.75rem] text-slate-400 line-clamp-2">
                            {entry.description}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[0.65rem] text-slate-400">
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5">
                                {kindLabel}
                            </span>
                            <span className="rounded-full bg-slate-900/80 px-2 py-0.5">
                                {audienceLabel}
                            </span>
                            <code className="rounded bg-slate-900 px-2 py-0.5 text-[0.65rem] text-slate-300">
                                id: {entry.id}
                            </code>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1 text-[0.65rem] text-slate-400">
                    {entry.ceoPath && (
                        <Link
                            href={entry.ceoPath}
                            className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-0.5 text-[0.65rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                        >
                            CEO →
                        </Link>
                    )}
                    {entry.labsPath && (
                        <Link
                            href={entry.labsPath}
                            className="rounded-full border border-slate-800 bg-slate-950/80 px-2 py-0.5 text-[0.65rem] text-slate-300 hover:border-emerald-500/60 hover:text-emerald-200"
                        >
                            Labs →
                        </Link>
                    )}
                    {entry.marketingPath && (
                        <Link
                            href={entry.marketingPath}
                            className="rounded-full border border-slate-800 bg-slate-950/80 px-2 py-0.5 text-[0.65rem] text-slate-300 hover:border-sky-500/60 hover:text-sky-200"
                        >
                            Marketing →
                        </Link>
                    )}
                </div>
            </div>

            {/* Paths + tags */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-3 text-[0.7rem] text-slate-300">
                <dl className="space-y-1.5">
                    <Row label="Marketing path" value={entry.marketingPath ?? "—"} />
                    <Row label="CEO path" value={entry.ceoPath ?? "—"} />
                    <Row label="Labs path" value={entry.labsPath ?? "—"} />
                    <Row label="Tags">
                        {entry.tags && entry.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                                {entry.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            "—"
                        )}
                    </Row>
                </dl>
            </div>
        </div>
    );
}

function Row({
    label,
    value,
    children,
}: {
    label: string;
    value?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="flex gap-2">
            <dt className="w-28 shrink-0 text-slate-500">{label}</dt>
            <dd className="flex-1 text-slate-200 break-words">
                {children ?? value ?? "—"}
            </dd>
        </div>
    );
}