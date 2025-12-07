

import Link from "next/link";
import {
    APP_REGISTRY,
    type AppRegistryEntry,
    type AppKind,
    type AppLifecycleStage,
} from "@/lib/appRegistry";

const KIND_LABELS: Partial<Record<AppKind, string>> = {
    "public-app": "Public app",
    "internal-app": "Internal app",
    bot: "Bot",
    "dev-tool": "Dev tool",
};

const LIFECYCLE_LABELS: Partial<Record<AppLifecycleStage, string>> = {
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

function sortEntries(entries: AppRegistryEntry[]): AppRegistryEntry[] {
    return [...entries].sort((a, b) => a.name.localeCompare(b.name));
}

export default function CeoAppsPage() {
    const entries = sortEntries(APP_REGISTRY);

    return (
        <main className="min-h-screen bg-slate-950 px-4 pb-16 pt-10 text-slate-50">
            <div className="mx-auto max-w-5xl">
                <header className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-500">
                            CEO / Apps registry
                        </p>
                        <h1 className="text-2xl font-semibold text-slate-50">
                            Apps & bots under Digital Hooligan
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-400">
                            Quick overview of every app in the stack. Later this can drive AI
                            assistants, health checks, and roadmap views.
                        </p>
                    </div>

                    <Link
                        href="/ceo"
                        className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-slate-500 hover:text-slate-50"
                    >
                        ← Back to CEO overview
                    </Link>
                </header>

                <section className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg shadow-black/40">
                    <table className="min-w-full text-left text-xs text-slate-200">
                        <thead className="border-b border-slate-800 bg-slate-900/80 text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
                            <tr>
                                <th className="px-4 py-3">App</th>
                                <th className="px-4 py-3">Kind</th>
                                <th className="px-4 py-3">Lifecycle</th>
                                <th className="px-4 py-3">Owner</th>
                                <th className="px-4 py-3">Paths</th>
                                <th className="px-4 py-3">Internal</th>
                                <th className="px-4 py-3">Tags</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {entries.map((entry) => (
                                <tr key={entry.id} className="align-top">
                                    {/* App name + description */}
                                    <td className="px-4 py-3 text-[0.8rem]">
                                        <div className="font-medium text-slate-50">
                                            {entry.name}
                                        </div>
                                        <div className="mt-1 text-[0.7rem] text-slate-400">
                                            {entry.description ?? "—"}
                                        </div>
                                        <div className="mt-1 text-[0.65rem] text-slate-500">
                                            ID: <code>{entry.id}</code>
                                        </div>
                                    </td>

                                    {/* Kind */}
                                    <td className="px-4 py-3 text-[0.75rem] text-slate-300">
                                        {kindLabel(entry.kind)}
                                    </td>

                                    {/* Lifecycle */}
                                    <td className="px-4 py-3 text-[0.75rem] text-slate-300">
                                        {lifecycleLabel(entry.lifecycle)}
                                    </td>

                                    {/* Owner */}
                                    <td className="px-4 py-3 text-[0.75rem] text-slate-300">
                                        {entry.owner}
                                    </td>

                                    {/* Paths */}
                                    <td className="px-4 py-3 text-[0.7rem] text-slate-300">
                                        <div className="flex flex-col gap-1">
                                            {entry.marketingPath && (
                                                <div>
                                                    <span className="font-semibold text-slate-400">
                                                        Marketing:{" "}
                                                    </span>
                                                    <code className="text-[0.65rem] text-slate-200">
                                                        {entry.marketingPath}
                                                    </code>
                                                </div>
                                            )}
                                            {entry.ceoPath && (
                                                <div>
                                                    <span className="font-semibold text-slate-400">
                                                        CEO:{" "}
                                                    </span>
                                                    <code className="text-[0.65rem] text-slate-200">
                                                        {entry.ceoPath}
                                                    </code>
                                                </div>
                                            )}
                                            {entry.labsPath && (
                                                <div>
                                                    <span className="font-semibold text-slate-400">
                                                        Labs:{" "}
                                                    </span>
                                                    <code className="text-[0.65rem] text-slate-200">
                                                        {entry.labsPath}
                                                    </code>
                                                </div>
                                            )}
                                            {!entry.marketingPath && !entry.ceoPath && !entry.labsPath && (
                                                <span className="text-slate-500">—</span>
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
                </section>
            </div>
        </main>
    );
}