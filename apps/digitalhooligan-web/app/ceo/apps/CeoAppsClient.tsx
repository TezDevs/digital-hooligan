"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type AppStage = "idea" | "building" | "testing" | "live";

type CeoApp = {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    stage: AppStage;
    owner: string;
    scope: "lab" | "internal" | "client-facing";
    notes: string;
};

const CEO_APPS: CeoApp[] = [
    {
        id: "pennywize",
        slug: "pennywize",
        name: "PennyWize",
        tagline: "Penny-stock intel bot for chaotic markets.",
        stage: "building",
        owner: "Digital Hooligan Labs",
        scope: "lab",
        notes:
            "Signal engine + retro ticker experiments mostly in Pi + backend space. Web UX still early.",
    },
    {
        id: "dropsignal",
        slug: "dropsignal",
        name: "DropSignal",
        tagline: "Sneaker + streetwear price-drop radar.",
        stage: "idea",
        owner: "Digital Hooligan Labs",
        scope: "lab",
        notes:
            "Assist-mode alerts first (no carts). Later: add-to-cart with retailer integrations.",
    },
    {
        id: "hypewatch",
        slug: "hypewatch",
        name: "HypeWatch",
        tagline: "Collectibles + hype assets watch bot.",
        stage: "idea",
        owner: "Digital Hooligan Labs",
        scope: "lab",
        notes:
            "Leans into cards + collectibles. Shares engine ideas with DropSignal but different markets.",
    },
    {
        id: "ops-toys",
        slug: "ops-toys",
        name: "Ops Toys",
        tagline: "Drawer of DevOps and infra automation toys.",
        stage: "testing",
        owner: "Internal / Dev",
        scope: "internal",
        notes:
            "Internal tools for deployments, APIs, and observability. Decide what portions become client-facing.",
    },
];

function getStageBadge(stage: AppStage) {
    const base =
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border";

    switch (stage) {
        case "idea":
            return (
                <span
                    className={`${base} border-neutral-700 bg-neutral-900 text-neutral-300`}
                >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-neutral-500" />
                    Idea
                </span>
            );
        case "building":
            return (
                <span
                    className={`${base} border-emerald-500/50 bg-emerald-500/10 text-emerald-200`}
                >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Building
                </span>
            );
        case "testing":
            return (
                <span
                    className={`${base} border-amber-500/50 bg-amber-500/10 text-amber-200`}
                >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Testing
                </span>
            );
        case "live":
            return (
                <span
                    className={`${base} border-sky-500/50 bg-sky-500/10 text-sky-200`}
                >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    Live
                </span>
            );
    }
}

function getScopeChip(scope: CeoApp["scope"]) {
    const base =
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border";

    if (scope === "lab") {
        return (
            <span
                className={`${base} border-emerald-500/40 bg-emerald-500/5 text-emerald-200`}
            >
                Lab
            </span>
        );
    }

    if (scope === "internal") {
        return (
            <span
                className={`${base} border-sky-500/40 bg-sky-500/5 text-sky-200`}
            >
                Internal
            </span>
        );
    }

    return (
        <span
            className={`${base} border-amber-500/40 bg-amber-500/5 text-amber-200`}
        >
            Client-facing
        </span>
    );
}

export function CeoAppsClient() {
    const searchParams = useSearchParams();
    const appId = searchParams.get("appId");
    const normalized = appId?.toLowerCase() ?? null;

    const selectedApp: CeoApp =
        CEO_APPS.find(
            (app) =>
                normalized &&
                (app.id.toLowerCase() === normalized ||
                    app.slug.toLowerCase() === normalized)
        ) ?? CEO_APPS[0];

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
                        App Registry
                    </span>
                </div>

                {/* Header */}
                <header className="flex flex-col gap-3 border-b border-neutral-800 pb-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold md:text-3xl">CEO Apps</h1>
                        <p className="mt-1 text-sm text-neutral-400">
                            Internal registry of Digital Hooligan apps and bots. This is the
                            source of truth for what exists, what’s live, and what’s still a
                            lab toy.
                        </p>
                    </div>
                    <div className="flex flex-col items-start gap-1 text-xs md:items-end">
                        <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                            {CEO_APPS.length} apps in registry
                        </span>
                        <span className="text-xs text-neutral-500">
                            Future: feed this from a JSON/DB instead of hardcoded constants.
                        </span>
                    </div>
                </header>

                {/* Layout: left list, right detail */}
                <main className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1.6fr)]">
                    {/* Left: table-ish list */}
                    <section className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-medium text-neutral-100">
                                App registry
                            </h2>
                            <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                                Click row to focus
                            </span>
                        </div>

                        <div className="mt-1 flex flex-col divide-y divide-neutral-800/80">
                            {CEO_APPS.map((app) => {
                                const active = app.id === selectedApp.id;
                                return (
                                    <Link
                                        key={app.id}
                                        href={`/ceo/apps?appId=${app.id}`}
                                        className={`flex items-center justify-between gap-3 px-2 py-2 text-sm transition ${active
                                                ? "bg-emerald-500/10 text-emerald-100"
                                                : "hover:bg-neutral-900"
                                            }`}
                                    >
                                        <div className="flex flex-col">
                                            <span
                                                className={`font-medium ${active ? "text-emerald-100" : "text-neutral-100"
                                                    }`}
                                            >
                                                {app.name}
                                            </span>
                                            <span className="text-xs text-neutral-500">
                                                {app.tagline}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            {getStageBadge(app.stage)}
                                            <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                                                {app.owner}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    {/* Right: detail + quick actions */}
                    <section className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
                        <header className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-semibold text-neutral-50">
                                    {selectedApp.name}
                                </h2>
                                <p className="mt-1 text-sm text-neutral-400">
                                    {selectedApp.tagline}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-1 text-xs text-neutral-400">
                                {getStageBadge(selectedApp.stage)}
                                {getScopeChip(selectedApp.scope)}
                            </div>
                        </header>

                        <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                Notes
                            </h3>
                            <p className="mt-2 text-sm text-neutral-200">
                                {selectedApp.notes}
                            </p>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <Link
                                href={`/labs/hq?appId=${selectedApp.id}`}
                                className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-950/70 px-3 py-2 text-sm transition hover:border-emerald-500/60 hover:bg-neutral-900"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-medium text-neutral-100 group-hover:text-emerald-300">
                                        View in Labs HQ
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
                                href={`/ceo/dev-workbench?appId=${selectedApp.id}`}
                                className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-950/70 px-3 py-2 text-sm transition hover:border-emerald-500/60 hover:bg-neutral-900"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-medium text-neutral-100 group-hover:text-emerald-300">
                                        Open Dev Workbench
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500 group-hover:text-emerald-300">
                                        /ceo/dev-workbench
                                    </span>
                                </div>
                                <p className="mt-0.5 text-xs text-neutral-500">
                                    See environment, code, and workload snapshot.
                                </p>
                            </Link>

                            <Link
                                href={`/ceo/performance?appId=${selectedApp.id}`}
                                className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-950/70 px-3 py-2 text-sm transition hover:border-emerald-500/60 hover:bg-neutral-900"
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
                                    Check metrics and health before you ship changes.
                                </p>
                            </Link>
                        </div>

                        <p className="mt-1 text-[11px] text-neutral-500">
                            Tip: You can deep-link here from anywhere with{" "}
                            <code className="rounded bg-neutral-900 px-1 py-0.5">
                                /ceo/apps?appId={selectedApp.id}
                            </code>
                            .
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
}