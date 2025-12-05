// apps/digitalhooligan-web/app/labs/hq/page.tsx

import Link from "next/link";
import { APP_REGISTRY } from "@/lib/appRegistry";

export default function LabsHqPage() {
    const totalApps = APP_REGISTRY.length;
    const internalOnly = APP_REGISTRY.filter((e) => e.internalOnly).length;
    const publicFacing = APP_REGISTRY.filter((e) => !e.internalOnly).length;

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-10">
                {/* Header / breadcrumb */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <Link
                                href="/ceo"
                                className="inline-flex items-center rounded-full bg-slate-900/70 px-2.5 py-1 font-medium text-[0.7rem] text-slate-300 ring-1 ring-slate-700/80 hover:text-emerald-300 hover:ring-emerald-500/70"
                            >
                                <span className="mr-1 text-[0.7rem]">←</span>
                                CEO dashboard
                            </Link>
                            <span className="inline-flex items-center rounded-full bg-slate-900/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400 ring-1 ring-slate-800/80">
                                Hooligan Labs · HQ
                            </span>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                            Hooligan Labs HQ
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-300/85 md:text-base">
                            Internal control room for experiments, bots, and “ops toys.” The
                            registry, experiment log, and AI surfaces all hang off this hub so
                            future assistants can see the full picture.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right text-[0.75rem] text-slate-400">
                        <p className="max-w-xs text-xs text-slate-400">
                            Future: Labs HQ becomes the home for build pipeline, experiment
                            outcomes, and internal-only dashboards.
                        </p>
                        <Link
                            href="/ceo/dev-workbench"
                            className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-[0.7rem] font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                        >
                            Open Dev Workbench →
                        </Link>
                    </div>
                </div>

                {/* Top row: registry + quick links */}
                <section className="mb-6 grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1.7fr)]">
                    {/* Registry snapshot */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    App registry snapshot
                                </p>
                                <p className="mt-1 text-sm text-slate-200">
                                    {totalApps} total entries · {internalOnly} internal-only ·{" "}
                                    {publicFacing} public-facing
                                </p>
                            </div>
                            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.7rem] text-slate-300 ring-1 ring-slate-700/70">
                                Source of truth:{" "}
                                <code className="ml-1 rounded bg-slate-950 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                    APP_REGISTRY
                                </code>
                            </span>
                        </div>

                        <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-3">
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Portfolio
                                </p>
                                <p className="mt-1 text-xl font-semibold text-slate-50">
                                    {totalApps}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    Mix of public apps (PennyWize, DropSignal, HypeWatch) and
                                    internal tools (Ops Toys, dashboards).
                                </p>
                            </div>
                            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-3">
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Internal stack
                                </p>
                                <p className="mt-1 text-xl font-semibold text-slate-50">
                                    {internalOnly}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    CEO views, Labs-only tools, and ops dashboards that never hit
                                    marketing pages.
                                </p>
                            </div>
                            <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/90 p-3">
                                <div>
                                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                                        Navigation
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Jump into registry details or the experiment log from here.
                                    </p>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2 text-[0.7rem]">
                                    <Link
                                        href="/labs/app-registry"
                                        className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                                    >
                                        App registry →
                                    </Link>
                                    <Link
                                        href="/labs/experiments"
                                        className="inline-flex items-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-200 hover:bg-emerald-500/20"
                                    >
                                        Experiment log →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI / experiments overview */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-300 shadow-sm shadow-black/40">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            AI & experiments
                        </p>
                        <p className="mt-2 text-sm text-slate-200">
                            Labs is where you try weird stuff: AI briefings, alert tuning,
                            Ops Toys workflows, and more.
                        </p>
                        <ul className="mt-3 space-y-1.5 list-disc pl-4">
                            <li>
                                <span className="font-medium">AI experiment log</span> at{" "}
                                <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                    /labs/experiments
                                </code>{" "}
                                tracks ideas like PennyWize summaries, DropSignal alert tuning,
                                Ops Toys automations, and global AI suggestion tweaks.
                            </li>
                            <li>
                                <span className="font-medium">AI Hub</span> at{" "}
                                <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[0.65rem] text-emerald-300">
                                    /ceo/ai-hub
                                </code>{" "}
                                controls app summaries and suggestion behavior.
                            </li>
                            <li>
                                Assistants and internal tools can read both the{" "}
                                <span className="font-medium">registry</span> and the{" "}
                                <span className="font-medium">experiment log</span> so they
                                don&apos;t suggest repeat failures.
                            </li>
                        </ul>
                        <div className="mt-3 flex flex-wrap gap-2 text-[0.7rem]">
                            <Link
                                href="/ceo/ai-hub"
                                className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 font-medium text-slate-200 hover:border-emerald-500/70 hover:text-emerald-200"
                            >
                                Open AI Hub →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Middle row: Pipelines & internal tools */}
                <section className="mb-6 grid gap-4 md:grid-cols-2">
                    {/* Build pipeline hint */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Build pipeline (future shell)
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                            Rough sketch of how ideas move through Labs:
                        </p>
                        <ol className="mt-2 space-y-1.5 list-decimal pl-4 text-[0.75rem] text-slate-300">
                            <li>Idea lands in the experiment log with basic tags.</li>
                            <li>
                                When you decide to build, you add/update an entry in{" "}
                                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.65rem] text-emerald-300">
                                    APP_REGISTRY
                                </code>
                                .
                            </li>
                            <li>
                                Dev Workbench and CEO views pick it up automatically via the
                                registry.
                            </li>
                            <li>
                                Later, performance metrics + AI behavior wire into the same
                                entries.
                            </li>
                        </ol>
                    </div>

                    {/* Internal tools / Ops Toys teaser */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Internal tools & Ops Toys
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                            Hooligan-only tools that keep infra and workflow less painful:
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[0.75rem] text-slate-300">
                            <li>
                                <span className="font-medium">Dev Workbench</span> – code,
                                routes, and API entrypoints for all apps.
                            </li>
                            <li>
                                <span className="font-medium">Ops Toys</span> – future drawer
                                of automation toys (CI notifications, log snapshots, etc.).
                            </li>
                            <li>
                                <span className="font-medium">Labs registry views</span> – app
                                registry inspector + experiment log are the first pieces.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Bottom row: Notes to future Tez */}
                <section className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-[0.75rem] text-slate-200 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Notes to future Tez
                        </h2>
                        <p className="mt-2 text-[0.75rem] text-slate-300">
                            Labs is where you can be reckless on paper and disciplined in
                            code. Capture experiments here first, then promote what works into
                            the CEO world.
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[0.75rem]">
                            <li>Don&apos;t overbuild experiments – keep them small.</li>
                            <li>One experiment per hypothesis; track the outcome later.</li>
                            <li>
                                If something hits, give it a real registry entry and let the
                                dashboards/assistants see it.
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-[0.75rem] text-slate-200 shadow-sm shadow-black/40">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                            Where assistants plug in
                        </h2>
                        <p className="mt-2 text-[0.75rem] text-slate-300">
                            Future AI assistants for Digital Hooligan will treat Labs HQ as
                            the playground and CEO as the polished readout.
                        </p>
                        <ul className="mt-2 space-y-1.5 list-disc pl-4 text-[0.75rem]">
                            <li>
                                Read <span className="font-medium">APP_REGISTRY</span> for
                                inventory.
                            </li>
                            <li>
                                Read <span className="font-medium">/labs/experiments</span>{" "}
                                (backed by a store later) for what&apos;s been tried.
                            </li>
                            <li>
                                Read <span className="font-medium">/ceo/ai-hub</span> + AI
                                endpoints for current behavior.
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    );
}