"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type LabStage = "idea" | "building" | "testing" | "live";

type LabsApp = {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    stage: LabStage;
    focus: string;
    owner: string;
    notes: string;
    nextSteps: string[];
    riskLevel: "low" | "medium" | "high";
};

const LABS_APPS: LabsApp[] = [
    {
        id: "pennywize",
        slug: "pennywize",
        name: "PennyWize",
        tagline: "Penny-stock intel bot for chaotic markets.",
        stage: "building",
        focus: "Realtime stock signals, feeds, and watchlists.",
        owner: "Digital Hooligan Labs",
        notes:
            "Core signal engine + retro ticker experiments live mostly in Pi + backend space. Web app UX still evolving.",
        nextSteps: [
            "Finalize MVP feed architecture (APIs + queues).",
            "Prototype retro ticker UI for Pi + web embeds.",
            "Wire health & usage metrics into CEO Performance.",
        ],
        riskLevel: "medium",
    },
    {
        id: "dropsignal",
        slug: "dropsignal",
        name: "DropSignal",
        tagline: "Sneaker + streetwear price-drop radar.",
        stage: "idea",
        focus: "Scraping, feeds, and price-drop alerts for hype items.",
        owner: "Digital Hooligan Labs",
        notes:
            "Still validating exact feature set and which marketplaces to target first. Assist-mode alerts first; add-to-cart later.",
        nextSteps: [
            "Lock in top 3–5 marketplaces to support.",
            "Design assist-mode alert flows (no carts yet).",
            "Outline path to 'grown-up mode' retailer integrations.",
        ],
        riskLevel: "medium",
    },
    {
        id: "hypewatch",
        slug: "hypewatch",
        name: "HypeWatch",
        tagline: "Collectibles + hype assets watch bot.",
        stage: "idea",
        focus: "Cards, collectibles, and other hype-side assets.",
        owner: "Digital Hooligan Labs",
        notes:
            "Shares DNA with DropSignal but focused more on long-tail collectibles and OTC markets.",
        nextSteps: [
            "Decide first vertical: cards vs figures vs mixed.",
            "Sketch shared engine vs separate engine from DropSignal.",
            "Map alerts into CEO Performance and Labs HQ.",
        ],
        riskLevel: "low",
    },
    {
        id: "ops-toys",
        slug: "ops-toys",
        name: "Ops Toys",
        tagline: "Drawer of DevOps and infra automation toys.",
        stage: "testing",
        focus: "Internal tooling for APIs, deployments, and observability.",
        owner: "Internal / Dev",
        notes:
            "Intended as the internal playground: CLI tools, small bots, and infra automation experiments.",
        nextSteps: [
            "List the first 3 internal tools to productize.",
            "Integrate with CEO dashboard for deployment health.",
            "Decide what, if anything, becomes client-facing.",
        ],
        riskLevel: "high",
    },
];

function getStageBadge(stage: LabStage) {
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

function getRiskBadge(level: LabsApp["riskLevel"]) {
    const base =
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border";

    if (level === "low") {
        return (
            <span
                className={`${base} border-emerald-500/50 bg-emerald-500/5 text-emerald-300`}
            >
                Risk: Low
            </span>
        );
    }

    if (level === "medium") {
        return (
            <span
                className={`${base} border-amber-500/50 bg-amber-500/5 text-amber-200`}
            >
                Risk: Medium
            </span>
        );
    }

    return (
        <span
            className={`${base} border-rose-500/50 bg-rose-500/5 text-rose-300`}
        >
            Risk: High
        </span>
    );
}

export function LabsHqClient() {
    const searchParams = useSearchParams();
    const appId = searchParams.get("appId");
    const normalizedAppId = appId?.toLowerCase() ?? null;

    const selectedApp: LabsApp =
        LABS_APPS.find(
            (app) =>
                normalizedAppId &&
                (app.id.toLowerCase() === normalizedAppId ||
                    app.slug.toLowerCase() === normalizedAppId)
        ) ?? LABS_APPS[0];

    const basePath = "/labs/hq";

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
                        Labs HQ
                    </span>
                </div>

                {/* Header */}
                <header className="flex flex-col gap-3 border-b border-neutral-800 pb-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold md:text-3xl">
                            Hooligan Labs HQ
                        </h1>
                        <p className="mt-1 text-sm text-neutral-400">
                            Internal playground for PennyWize, DropSignal, HypeWatch, and Ops
                            Toys. This is where ideas graduate from{" "}
                            <span className="text-neutral-200">
                                sketch → prototype → live.
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
                                ? "pre-filtered via ?appId from CEO Performance."
                                : "opened directly from Labs or the site."}
                        </p>
                    </div>
                </header>

                {/* Main layout */}
                <main className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr),minmax(0,1.7fr)]">
                    {/* Left: app list */}
                    <section className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
                        <div className="flex items-center justify-between gap-2">
                            <h2 className="text-sm font-medium text-neutral-100">
                                Lab apps
                            </h2>
                            <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                                {LABS_APPS.length} in pipeline
                            </span>
                        </div>

                        <div className="mt-1 flex flex-col gap-2">
                            {LABS_APPS.map((app) => {
                                const active = app.id === selectedApp.id;

                                return (
                                    <Link
                                        key={app.id}
                                        href={`${basePath}?appId=${app.id}`}
                                        className={`group flex flex-col rounded-xl border px-3 py-2 text-sm transition ${active
                                                ? "border-emerald-500/70 bg-emerald-500/10"
                                                : "border-neutral-800 bg-neutral-950/60 hover:border-neutral-600 hover:bg-neutral-900"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex flex-col">
                                                <span
                                                    className={`font-medium ${active
                                                            ? "text-emerald-200"
                                                            : "text-neutral-100 group-hover:text-neutral-50"
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
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    {/* Right: detail pane for selected app */}
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
                            <div className="flex flex-col items-end gap-1">
                                {getStageBadge(selectedApp.stage)}
                                {getRiskBadge(selectedApp.riskLevel)}
                            </div>
                        </header>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
                                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                    Focus
                                </h3>
                                <p className="mt-2 text-sm text-neutral-200">
                                    {selectedApp.focus}
                                </p>
                            </div>

                            <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
                                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                    Owner
                                </h3>
                                <p className="mt-2 text-sm text-neutral-200">
                                    {selectedApp.owner}
                                </p>
                                <p className="mt-1 text-xs text-neutral-500">
                                    Owner is accountable for scope, tradeoffs, and when it
                                    graduates to production.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                Notes from the lab
                            </h3>
                            <p className="mt-2 text-sm text-neutral-200">
                                {selectedApp.notes}
                            </p>
                        </div>

                        <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-3">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                Next steps
                            </h3>
                            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-neutral-200">
                                {selectedApp.nextSteps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-neutral-500">
                            <span>
                                Tip: You can deep-link here from CEO or Dev Workbench with{" "}
                                <code className="rounded bg-neutral-900 px-1 py-0.5">
                                    ?appId={selectedApp.id}
                                </code>
                                .
                            </span>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}