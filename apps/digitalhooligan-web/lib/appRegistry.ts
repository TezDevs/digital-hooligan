// apps/digitalhooligan-web/lib/appRegistry.ts

export type AppId = string;

export type AppKind = "public-app" | "internal-app" | "bot" | "dev-tool";

export type AppLifecycleStage = "idea" | "design" | "build" | "live";

export type AppRegistryEntry = {
    id: AppId;
    name: string;

    /** Short sentence used in AI summaries + CEO copy. */
    tagline?: string;

    /** Longer, human description when you need it. */
    description?: string;

    /** High-level stage label for the registry views. */
    stage: AppLifecycleStage;

    /** Duplicate / alternative lifecycle field used in a few places. */
    lifecycle?: AppLifecycleStage;

    kind: AppKind;
    owner: string;

    /** Internal-only flag for apps that shouldn’t show up by default. */
    internalOnly?: boolean;

    /** Optional deep links used by CEO + Labs views. */
    marketingPath?: string;
    ceoPath?: string;
    labsPath?: string;

    /** Free-form tags for filtering. */
    tags?: string[];
};

// ---------------------------------------------------------------------------
// Core registry data
// (You can tweak copy here later – types just need the shape.)
// ---------------------------------------------------------------------------

export const APP_REGISTRY: AppRegistryEntry[] = [
    {
        id: "digital-hooligan-site",
        name: "Digital Hooligan Site",
        stage: "live",
        lifecycle: "live",
        kind: "public-app",
        owner: "Tez",
        tagline: "Main marketing + company snapshot site.",
        description:
            "Public-facing Digital Hooligan site for services, company snapshot, and contact.",
        marketingPath: "/",
        ceoPath: "/ceo/apps",
        labsPath: "/labs/app-registry",
        tags: ["site", "marketing", "company"],
    },
    {
        id: "ceo-dashboard",
        name: "CEO dashboard",
        stage: "build",
        lifecycle: "build",
        kind: "internal-app",
        owner: "Tez",
        tagline: "Internal command center for Digital Hooligan.",
        description:
            "Internal-only dashboard for overview, money, apps, deals, performance, AI Hub, and Dev Workbench.",
        ceoPath: "/ceo",
        labsPath: "/labs/app-registry",
        internalOnly: true,
        tags: ["internal", "dashboard"],
    },
    {
        id: "labs-hq",
        name: "Hooligan Labs HQ",
        stage: "design",
        lifecycle: "design",
        kind: "internal-app",
        owner: "Tez",
        tagline: "Home for experiments, app roadmaps, and build pipeline.",
        description:
            "Internal Labs HQ view for experiments, app lifecycles, and build pipeline across Digital Hooligan.",
        ceoPath: "/ceo/labs",
        labsPath: "/labs/hq",
        internalOnly: true,
        tags: ["labs", "experiments"],
    },
    {
        id: "pennywize",
        name: "PennyWize",
        stage: "build",
        lifecycle: "build",
        kind: "public-app",
        owner: "Tez",
        tagline: "Penny stock intel tool with alerts + social layer.",
        description:
            "Penny stock intel tool with alerts, watchlists, and a future social feed for traders.",
        marketingPath: "/apps/pennywize",
        ceoPath: "/ceo/apps?p=pennywize",
        labsPath: "/labs/experiments",
        tags: ["stocks", "alerts", "feed"],
    },
    {
        id: "dropsignal",
        name: "DropSignal",
        stage: "design",
        lifecycle: "design",
        kind: "public-app",
        owner: "Tez",
        tagline: "Sneaker / streetwear price-drop watcher (assist-mode first).",
        description:
            "Sneaker and streetwear price-drop bot starting in assist-mode, later wired into carts and feeds.",
        marketingPath: "/apps/dropsignal",
        labsPath: "/labs/experiments",
        tags: ["sneakers", "streetwear", "alerts"],
    },
    {
        id: "hypewatch",
        name: "HypeWatch",
        stage: "idea",
        lifecycle: "idea",
        kind: "public-app",
        owner: "Tez",
        tagline: "Collectibles price-tracking bot.",
        description:
            "Collectibles and trading-card price-tracking bot, differentiated from DropSignal by display pieces.",
        marketingPath: "/apps/hypewatch",
        labsPath: "/labs/experiments",
        tags: ["collectibles", "cards"],
    },
    {
        id: "ops-toys",
        name: "Ops Toys",
        stage: "build",
        lifecycle: "build",
        kind: "dev-tool",
        owner: "Tez",
        tagline: "Internal drawer of ops automation toys.",
        description:
            "Internal toolbox of automation helpers for ops, CI, and housekeeping tasks.",
        ceoPath: "/ceo/dev-workbench",
        labsPath: "/labs/experiments",
        internalOnly: true,
        tags: ["internal", "automation"],
    },
];

// Helpful alias for places that imported `appRegistry` instead of `APP_REGISTRY`.
export const appRegistry = APP_REGISTRY;

// ---------------------------------------------------------------------------
// Helpers used by API routes and AI wiring
// ---------------------------------------------------------------------------

export function appRegistryMap(): Record<AppId, AppRegistryEntry> {
    return APP_REGISTRY.reduce((acc, app) => {
        acc[app.id] = app;
        return acc;
    }, {} as Record<AppId, AppRegistryEntry>);
}

/**
 * Utility used by AI endpoints to build a short, human-readable descriptor
 * for an app. This is deliberately simple and deterministic.
 */
export function formatAppSummaryLine(app: AppRegistryEntry): string {
    const parts: string[] = [];

    parts.push(app.name);

    const stage = app.lifecycle ?? app.stage;
    if (stage) {
        parts.push(`stage: ${stage}`);
    }

    if (app.kind) {
        parts.push(`kind: ${app.kind}`);
    }

    if (app.tagline) {
        parts.push(app.tagline);
    }

    return parts.join(" · ");
}