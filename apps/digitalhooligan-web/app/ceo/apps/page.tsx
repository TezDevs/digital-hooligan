// apps/digitalhooligan-web/app/ceo/apps/page.tsx
"use client";

import Link from "next/link";
import {
    APP_REGISTRY,
    type AppRegistryEntry,
    type AppKind,
    type AppLifecycleStage,
} from "@/lib/appRegistry";

const KIND_LABELS: Record<AppKind, string> = {
    "public-app": "Public app",
    "internal-app": "Internal app",
    bot: "Bot",
    "dev-tool": "Dev tool",
};

const LIFECYCLE_LABELS: Record<AppLifecycleStage, string> = {
    idea: "Idea",
    design: "Design",
    build: "Build",
    live: "Live",
};

function kindLabel(kind: AppKind) {
    return KIND_LABELS[kind] ?? kind;
}

function lifecycleLabel(stage: AppLifecycleStage) {
    return LIFECYCLE_LABELS[stage] ?? stage;
}

function visibleApps(entries: AppRegistryEntry[]): AppRegistryEntry[] {
    // CEO view: show everything except things explicitly internalOnly
    return entries.filter((entry) => !entry.internalOnly);
}

export default function CeoAppsPage() {
    const entries = visibleApps(APP_REGISTRY);

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pt-12">
                {/* Header */}
                <header className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-[0.75rem] font-medium uppercase tracking-[0.22em] text-slate-400">
                            CEO / Apps
                        </p>
                        <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
                            App registry snapshot
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            High-level view of apps, bots, and internal tools under Digital
                            Hooligan.
                        </p>
                    </div>

                    <Link
                        href="/ceo"
                        className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-slate-500 hover:bg-slate-900"
                    >
                        ← Back to CEO overview
                    </Link>
                </header>

                {/* Table */}
                <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 shadow-lg shadow-slate-950/60">
                    <div className="border-b border-slate-800 px-4 py-3">
                        <h2 className="text-sm font-semibold text-slate-100">
                            Apps & bots
                        </h2>
                        <p className="mt-0.5 text-[0.8rem] text-slate-400">
                            Names, lifecycle, owners, and key paths for each entry in the
                            registry.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border-t border-slate-800 text-left text-[0.8rem] text-slate-200">
                            <thead className="bg-slate-950/80">
                                <tr className="border-b border-slate-800 text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
                                    <th className="px-4 py-2">App</th>
                                    <th className="px-4 py-2">Kind</th>
                                    <th className="px-4 py-2">Lifecycle</th>
                                    <th className="px-4 py-2">Owner</th>
                                    <th className="px-4 py-2">Paths</th>
                                    <th className="px-4 py-2">Tags</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-900">
                                {entries.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-slate-900/40">
                                        {/* App */}
                                        <td className="px-4 py-3 align-top">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-2">
                                                    {entry.icon?.type === "emoji" && (
                                                        <span className="text-base leading-none">
                                                            {entry.icon.value}
                                                        </span>
                                                    )}
                                                    <span className="text-sm font-medium text-slate-50">
                                                        {entry.name}
                                                    </span>
                                                </div>
                                                <p className="text-[0.75rem] text-slate-400">
                                                    {entry.description ?? "No description yet."}
                                                </p>
                                                <p className="text-[0.7rem] text-emerald-300/90">
                                                    {entry.tagline}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Kind */}
                                        <td className="px-4 py-3 align-top">
                                            <span className="rounded-full bg-slate-900/80 px-2 py-1 text-[0.7rem] text-slate-200 ring-1 ring-slate-700/60">
                                                {kindLabel(entry.kind)}
                                            </span>
                                        </td>

                                        {/* Lifecycle */}
                                        <td className="px-4 py-3 align-top">
                                            <span className="rounded-full bg-slate-900/80 px-2 py-1 text-[0.7rem] text-slate-200 ring-1 ring-slate-700/60">
                                                {lifecycleLabel(entry.lifecycle)}
                                            </span>
                                        </td>

                                        {/* Owner */}
                                        <td className="px-4 py-3 align-top text-[0.8rem] text-slate-300">
                                            {entry.owner}
                                        </td>

                                        {/* Paths */}
                                        <td className="px-4 py-3 align-top text-[0.75rem] text-slate-300">
                                            <div className="flex flex-col gap-1">
                                                {entry.marketingPath && (
                                                    <div>
                                                        <span className="mr-1 text-slate-400">Marketing:</span>
                                                        <code className="text-[0.7rem] text-slate-200">
                                                            {entry.marketingPath}
                                                        </code>
                                                    </div>
                                                )}
                                                {entry.ceoPath && (
                                                    <div>
                                                        <span className="mr-1 text-slate-400">CEO:</span>
                                                        <code className="text-[0.7rem] text-slate-200">
                                                            {entry.ceoPath}
                                                        </code>
                                                    </div>
                                                )}
                                                {entry.labsPath && (
                                                    <div>
                                                        <span className="mr-1 text-slate-400">Labs:</span>
                                                        <code className="text-[0.7rem] text-slate-200">
                                                            {entry.labsPath}
                                                        </code>
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        {/* Tags */}
                                        <td className="px-4 py-3 align-top text-[0.75rem] text-slate-300">
                                            {entry.tags?.length ? (
                                                <span>{entry.tags.join(", ")}</span>
                                            ) : (
                                                <span className="text-slate-500">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <p className="mt-4 text-[0.7rem] text-slate-500">
                    This view is backed by <code>APP_REGISTRY</code> in{" "}
                    <code>lib/appRegistry.ts</code>. Any new apps, bots, or tools should
                    be added there first.
                </p>
            </div>
        </main>
    );
}