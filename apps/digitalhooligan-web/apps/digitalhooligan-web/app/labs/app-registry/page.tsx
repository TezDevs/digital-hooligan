"use client";

import React from "react";
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

export default function LabsAppRegistryPage() {
    const entries: AppRegistryEntry[] = APP_REGISTRY;

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
            <div className="mx-auto max-w-6xl space-y-8">
                {/* Header */}
                <header className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Labs · App Registry
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Same registry the CEO dashboard uses, but from the Labs
                            perspective. Later this can pull from a DB and feed metrics +
                            experiments.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href="/ceo/apps"
                            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-slate-500 hover:text-slate-100"
                        >
                            ← CEO Apps
                        </Link>
                        <Link
                            href="/labs/hq"
                            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-slate-500 hover:text-slate-100"
                        >
                            Labs HQ →
                        </Link>
                    </div>
                </header>

                {/* Registry table */}
                <section className="rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
                    <div className="border-b border-slate-800 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            App registry snapshot
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                            Quick readout of all apps, with paths mapped so we can wire
                            experiments, health checks, and AI helpers later.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-800 text-xs">
                            <thead className="bg-slate-900/80">
                                <tr className="text-left text-[0.7rem] uppercase tracking-[0.16em] text-slate-400">
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Kind</th>
                                    <th className="px-4 py-2">Lifecycle</th>
                                    <th className="px-4 py-2">Owner</th>
                                    <th className="px-4 py-2">Paths</th>
                                    <th className="px-4 py-2">Internal?</th>
                                    <th className="px-4 py-2">Tags</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {entries.map((entry) => (
                                    <tr key={entry.id} className="align-top">
                                        {/* ID */}
                                        <td className="px-4 py-3 text-[0.7rem] font-mono text-slate-400">
                                            {entry.id}
                                        </td>

                                        {/* Name / description */}
                                        <td className="px-4 py-3 text-xs">
                                            <div className="font-medium text-slate-100">
                                                {entry.name}
                                            </div>
                                            {entry.description && (
                                                <div className="mt-0.5 text-[0.7rem] text-slate-400">
                                                    {entry.description}
                                                </div>
                                            )}
                                        </td>

                                        {/* Kind */}
                                        <td className="px-4 py-3 text-[0.7rem] text-slate-300">
                                            {KIND_LABELS[entry.kind] ?? entry.kind}
                                        </td>

                                        {/* Lifecycle */}
                                        <td className="px-4 py-3 text-[0.7rem] text-slate-300">
                                            {LIFECYCLE_LABELS[entry.lifecycle] ?? entry.lifecycle}
                                        </td>

                                        {/* Owner */}
                                        <td className="px-4 py-3 text-[0.7rem] text-slate-300">
                                            {entry.owner}
                                        </td>

                                        {/* Paths */}
                                        <td className="px-4 py-3 text-[0.7rem] text-slate-300">
                                            <div className="flex flex-col gap-1">
                                                {entry.marketingPath && (
                                                    <div>
                                                        <span className="font-semibold text-slate-400">
                                                            Marketing:
                                                        </span>{" "}
                                                        <code className="text-[0.7rem] text-slate-200">
                                                            {entry.marketingPath}
                                                        </code>
                                                    </div>
                                                )}
                                                {entry.ceoPath && (
                                                    <div>
                                                        <span className="font-semibold text-slate-400">
                                                            CEO:
                                                        </span>{" "}
                                                        <code className="text-[0.7rem] text-slate-200">
                                                            {entry.ceoPath}
                                                        </code>
                                                    </div>
                                                )}
                                                {entry.labsPath && (
                                                    <div>
                                                        <span className="font-semibold text-slate-400">
                                                            Labs:
                                                        </span>{" "}
                                                        <code className="text-[0.7rem] text-slate-200">
                                                            {entry.labsPath}
                                                        </code>
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        {/* Internal flag */}
                                        <td className="px-4 py-3 text-[0.7rem] text-slate-300">
                                            {entry.internalOnly ? "Yes" : "No"}
                                        </td>

                                        {/* Tags */}
                                        <td className="px-4 py-3 text-[0.7rem] text-slate-300">
                                            {entry.tags?.length ? entry.tags.join(", ") : "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}