"use client";

import React from "react";
import Link from "next/link";
import { appRegistry, type AppRegistryEntry } from "@/lib/appRegistry";

// 👇 make sure your type looks like this
type LabsRegistryEntry = AppRegistryEntry & {
    description?: string;
    internalOnly?: boolean;
    marketingPath?: string;
    ceoPath?: string;
    labsPath?: string;
    tags?: string[];
};
// Keep labels simple so we don't fight the exact union type
const KIND_LABEL: Record<string, string> = {
    "public-app": "Public app",
    "internal-app": "Internal app",
    bot: "Bot",
    "dev-tool": "Dev tool",
};

const STAGE_LABEL: Record<string, string> = {
    idea: "Idea",
    design: "Design",
    build: "Build",
    live: "Live",
};

export default function LabsAppRegistryPage() {
    const entries = appRegistry as LabsRegistryEntry[];

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header / breadcrumbs */}
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="mb-1 text-[0.75rem] uppercase tracking-[0.18em] text-slate-500">
                            Labs &gt; App registry
                        </p>
                        <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
                            App registry snapshot
                        </h1>
                        <p className="mt-1 max-w-xl text-sm text-slate-400">
                            Single source of truth for apps, bots, and internal tools under the
                            Digital Hooligan umbrella. This powers CEO views, Labs, and Dev
                            Workbench wiring.
                        </p>
                    </div>

                    <Link
                        href="/labs/hq"
                        className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900"
                    >
                        ← Back to Labs HQ
                    </Link>
                </div>

                {/* Registry table */}
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
                    <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
                        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
                            Apps &amp; tools ({entries.length})
                        </span>
                        <span className="text-[0.7rem] text-slate-500">
                            This is backed by{" "}
                            <code className="text-xs text-emerald-300">
                                lib/appRegistry.ts
                            </code>
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="border-b border-slate-800 bg-slate-950/80 text-[0.75rem] uppercase tracking-[0.16em] text-slate-500">
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Kind</th>
                                    <th className="px-4 py-2">Stage</th>
                                    <th className="px-4 py-2">Owner</th>
                                    <th className="px-4 py-2">Internal?</th>
                                    <th className="px-4 py-2">Tags</th>
                                    <th className="px-4 py-2">Paths</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/80">
                                {entries.map((entry) => (
                                    <tr key={entry.id} className="align-top">
                                        <td className="px-4 py-2 text-[0.8rem] font-mono text-slate-300">
                                            {entry.id}
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="text-sm font-medium text-slate-50">
                                                {entry.name}
                                            </div>
                                            {entry.description && (
                                                <div className="mt-0.5 text-xs text-slate-400">
                                                    {entry.description}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 text-xs text-slate-300">
                                            {KIND_LABEL[entry.kind as string] ?? entry.kind}
                                        </td>
                                        <td className="px-4 py-2 text-xs text-slate-300">
                                            {entry.stage
                                                ? STAGE_LABEL[entry.stage as string] ?? entry.stage
                                                : "—"}
                                        </td>
                                        <td className="px-4 py-2 text-xs text-slate-300">
                                            {entry.owner ?? "—"}
                                        </td>
                                        <td className="px-4 py-2 text-xs text-slate-300">
                                            {entry.internalOnly ? "Yes" : "No"}
                                        </td>
                                        <td className="px-4 py-2 text-xs text-slate-300">
                                            {entry.tags && entry.tags.length > 0
                                                ? entry.tags.join(", ")
                                                : "—"}
                                        </td>
                                        <td className="px-4 py-2 text-xs text-slate-300">
                                            <div className="flex flex-col gap-0.5">
                                                {entry.marketingPath && (
                                                    <span>
                                                        <span className="text-slate-500">Marketing: </span>
                                                        <code className="text-[0.7rem] text-slate-200">
                                                            {entry.marketingPath}
                                                        </code>
                                                    </span>
                                                )}
                                                {entry.ceoPath && (
                                                    <span>
                                                        <span className="text-slate-500">CEO: </span>
                                                        <code className="text-[0.7rem] text-slate-200">
                                                            {entry.ceoPath}
                                                        </code>
                                                    </span>
                                                )}
                                                {entry.labsPath && (
                                                    <span>
                                                        <span className="text-slate-500">Labs: </span>
                                                        <code className="text-[0.7rem] text-slate-200">
                                                            {entry.labsPath}
                                                        </code>
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-slate-800 px-4 py-2 text-[0.7rem] text-slate-500">
                        Later this view can be driven from a DB instead of static data, and
                        feed health, AI Hub, and Dev Workbench.
                    </div>
                </div>
            </div>
        </main>
    );
}