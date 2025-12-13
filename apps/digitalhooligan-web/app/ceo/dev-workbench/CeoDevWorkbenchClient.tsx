"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type AppStage = "idea" | "building" | "testing" | "live";

type WorkbenchApp = {
    id: string;
    slug: string;
    name: string;
    codeName: string;
    stage: AppStage;
    repo?: string;
    apiBase?: string;
    env: "lab" | "internal" | "client-facing";
    lastDeploy: string;
    openIssues: number;
    todoCount: number;
};

const WORKBENCH_APPS: WorkbenchApp[] = [
    {
        id: "pennywize",
        slug: "pennywize",
        name: "PennyWize",
        codeName: "pwz-core",
        stage: "building",
        repo: "github.com/tezdevs/digital-hooligan (pennywize package)",
        apiBase: "https://api.digitalhooligan.io/pennywize",
        env: "lab",
        lastDeploy: "not yet (design + architecture)",
        openIssues: 4,
        todoCount: 8,
    },
    {
        id: "dropsignal",
        slug: "dropsignal",
        name: "DropSignal",
        codeName: "ds-sneaker-watch",
        stage: "idea",
        repo: "github.com/tezdevs/digital-hooligan (dropsignal experiments)",
        apiBase: "https://api.digitalhooligan.io/dropsignal",
        env: "lab",
        lastDeploy: "N/A (idea shaping)",
        openIssues: 2,
        todoCount: 6,
    },
    {
        id: "hypewatch",
        slug: "hypewatch",
        name: "HypeWatch",
        codeName: "hw-collectibles",
        stage: "idea",
        repo: "github.com/tezdevs/digital-hooligan (hypewatch experiments)",
        apiBase: "https://api.digitalhooligan.io/hypewatch",
        env: "lab",
        lastDeploy: "N/A (idea shaping)",
        openIssues: 1,
        todoCount: 4,
    },
    {
        id: "ops-toys",
        slug: "ops-toys",
        name: "Ops Toys",
        codeName: "ops-toys-stack",
        stage: "testing",
        repo: "github.com/tezdevs/digital-hooligan (ops-toys)",
        apiBase: "https://api.digitalhooligan.io/ops-toys",
        env: "internal",
        lastDeploy: "recent local-only changes",
        openIssues: 5,
        todoCount: 10,
    },
];

function getEnvBadge(env: WorkbenchApp["env"]) {
    const base =
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border";

    if (env === "lab") {
        return (
            <span
                className={`${base} border-emerald-500/40 bg-emerald-500/10 text-emerald-200`}
            >
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Lab env
            </span>
        );
    }

    if (env === "internal") {
        return (
            <span
                className={`${base} border-sky-500/40 bg-sky-500/10 text-sky-200`}
            >
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                Internal tools
            </span>
        );
    }

    return (
        <span
            className={`${base} border-amber-500/40 bg-amber-500/10 text-amber-200`}
        >
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
            Client-facing
        </span>
    );
}

export function CeoDevWorkbenchClient() {
    const searchParams = useSearchParams();
    const appId = searchParams.get("appId");
    const normalized = appId?.toLowerCase() ?? null;

    const selectedApp: WorkbenchApp =
        WORKBENCH_APPS.find(
            (app) =>
                normalized &&
                (app.id.toLowerCase() === normalized ||
                    app.slug.toLowerCase() === normalized)
        ) ?? WORKBENCH_APPS[0];

    const basePath = "/ceo/dev-workbench";

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-50">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-6 lg:px-8">
                {/* Back to CEO */}
                <div className="mb-1 flex items-center justify-between">
                    <Link
                        href="/ceo"
                        className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-emerald-300"
                    >
                        <span className="text-base leading-none">←</span>
                        <span>Back to CEO dashboard</span>
                    </Link>
                    <span className="rounded-full border border-neutral-800 bg-neutral-900/60 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                        Dev Workbench
                    </span>
                </div>

                {/* Header */}
                <header className="flex flex-col gap-3 border-b border-neutral-800 pb-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold md:text-3xl">
                            Dev Workbench
                        </h1>
                        <p className="mt-1 text-sm text-neutral-400">
                            Internal control panel for code, environments, and experiments.
                            Use this view to decide{" "}
                            <span className="text-neutral-200">
                                what to build, ship, or debug next.
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-col items-start gap-2 text-xs md:items-end">
                        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/70 px-3 py-1 font-medium text-neutral-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Focus app: {selectedApp.name}
                        </div>
                        <p className="text-neutral-500">
                            This view was{" "}
                            {appId
                                ? "pre-filtered via ?appId from Performance or Labs."
                                : "opened directly from the CEO dashboard."}
                        </p>
                    </div>
                </header>

                {/* App context pills */}
                <section className="flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                        App context
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {WORKBENCH_APPS.map((app) => {
                            const active = app.id === selectedApp.id;
                            return (
                                <Link
                                    key={app.id}
                                    href={`${basePath}?appId=${app.id}`}
                                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${active
                                            ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                                            : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-600"
                                        }`}
                                >
                                    {app.name}
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Main layout */}
                <main className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr),minmax(0,1.3fr)]">
                    {/* Left: environment + code info */}
                    <section className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
                        <header className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h2 className="text-sm font-medium text-neutral-100">
                                    Environment & code
                                </h2>
                                <p className="mt-1 text-xs text-neutral-500">
                                    High-level view of where this app lives and how it’s wired.
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-1 text-xs text-neutral-400">
                                {getEnvBadge(selectedApp.env)}
                                <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                                    Code name: {selectedApp.codeName}
                                </span>
                            </div>
                        </header>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
                                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                    Repo / package
                                </h3>
                                <p className="mt-2 text-sm text-neutral-200">
                                    {selectedApp.repo ?? "TBD – experiments not yet in repo."}
                                </p>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Later we can wire real links to GitHub here.
                                </p>
                            </div>

                            <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
                                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                    API base (planned)
                                </h3>
                                <p className="mt-2 text-sm text-neutral-200">
                                    {selectedApp.apiBase ?? "TBD – not yet defined."}
                                </p>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Good placeholder so future you knows where this should live.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
                                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                    Last deploy / status
                                </h3>
                                <p className="mt-2 text-sm text-neutral-200">
                                    {selectedApp.lastDeploy}
                                </p>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Later: read this from your CI/CD or Vercel API.
                                </p>
                            </div>

                            <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
                                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                    Workload snapshot
                                </h3>
                                <p className="mt-2 text-sm text-neutral-200">
                                    {selectedApp.openIssues} open issues ·{" "}
                                    {selectedApp.todoCount} TODOs
                                </p>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Future: auto-sync from GitHub or an internal task system.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Right: dev quick actions */}
                    <section className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
                        <header className="flex items-center justify-between gap-2">
                            <h2 className="text-sm font-medium text-neutral-100">
                                Dev quick actions
                            </h2>
                            <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                                Scoped to: {selectedApp.name}
                            </span>
                        </header>

                        <div className="flex flex-col gap-2 text-sm">
                            <Link
                                href={`/labs/hq?appId=${selectedApp.id}`}
                                className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-950/70 px-3 py-2 transition hover:border-emerald-500/60 hover:bg-neutral-900"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-medium text-neutral-100 group-hover:text-emerald-300">
                                        Jump to Labs HQ
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500 group-hover:text-emerald-300">
                                        /labs/hq
                                    </span>
                                </div>
                                <p className="mt-0.5 text-xs text-neutral-500">
                                    See experiments and roadmap for this app.
                                </p>
                            </Link>

                            <Link
                                href={`/ceo/performance?appId=${selectedApp.id}`}
                                className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-950/70 px-3 py-2 transition hover:border-emerald-500/60 hover:bg-neutral-900"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-medium text-neutral-100 group-hover:text-emerald-300">
                                        View performance
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500 group-hover:text-emerald-300">
                                        /ceo/performance
                                    </span>
                                </div>
                                <p className="mt-0.5 text-xs text-neutral-500">
                                    Check uptime, latency, and usage before making changes.
                                </p>
                            </Link>

                            <div className="flex flex-col gap-1 rounded-xl border border-neutral-800 bg-neutral-950/70 px-3 py-2 text-xs text-neutral-400">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                    Next iteration (placeholder)
                                </span>
                                <p>
                                    Later, this panel can show CI logs, error traces, and health
                                    checks for{" "}
                                    <span className="text-neutral-100">{selectedApp.name}</span>.
                                </p>
                                <p className="mt-0.5">
                                    For now, treat this as your mental hub to decide what you code
                                    next.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}