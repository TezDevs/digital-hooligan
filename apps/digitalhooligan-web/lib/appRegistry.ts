// apps/digitalhooligan-web/lib/appRegistry.ts

// High-level category of the thing
export type AppKind =
    | "public-app"     // customer-facing app or site
    | "internal-tool"  // only you / internal dashboards
    | "bot"            // automations, scrapers, alerting agents
    | "infra";         // infra components / shared services

// Where it is in its lifecycle
export type LifecycleStage =
    | "idea"
    | "design"
    | "building"
    | "alpha"
    | "beta"
    | "live"
    | "paused";

export interface AppRegistryEntry {
    /** Stable internal ID (used by CEO dashboard, Labs HQ, AI assistants) */
    id: string;

    /** Human-readable name */
    name: string;

    /** Short label for chips, tags, etc. */
    shortName?: string;

    /** What it is in 1–2 sentences */
    description: string;

    /** High-level category */
    kind: AppKind;

    /** Lifecycle stage */
    lifecycle: LifecycleStage;

    /** Rough owner / area, for later filtering */
    owner: "tez" | "digital-hooligan" | "labs";

    /** True if this is NOT meant for public users */
    internalOnly?: boolean;

    /** Route on the main marketing site, if any (e.g. "/apps/pennywize") */
    marketingPath?: string;

    /** Route inside the CEO dashboard (e.g. "/ceo/apps/pennywize") */
    ceoPath?: string;

    /** Route inside Labs HQ (e.g. "/labs/apps/pennywize") */
    labsPath?: string;

    /** External URL (if it lives outside this Next.js app) */
    externalUrl?: string;

    /** Simple icon token for now (can later map to real icons) */
    icon: {
        type: "emoji" | "icon";
        value: string; // e.g. "🪙" or "pennywize-icon"
    };

    /** Tags for search / filters (AI assistants will love this) */
    tags?: string[];

    /** Future metrics keys (so dashboards know what to pull) */
    metricsKeys?: {
        users?: string;
        mrr?: string;
        uptime?: string;
        latencyMs?: string;
        errorsPerMin?: string;
    };
}

/**
 * Single source of truth for all apps, bots, and internal tools.
 *
 * - CEO dashboard will read from this to render cards and metrics.
 * - Labs HQ will use this to show experiment status and pipelines.
 * - AI assistants can query this to know "what apps exist" and where they live.
 */
export const APP_REGISTRY: AppRegistryEntry[] = [
    {
        id: "digital-hooligan-site",
        name: "Digital Hooligan Site",
        shortName: "Site",
        description:
            "Main Digital Hooligan marketing site and entry point for clients, partners, and future products.",
        kind: "public-app",
        lifecycle: "live",
        owner: "digital-hooligan",
        marketingPath: "/",
        ceoPath: "/ceo",
        labsPath: "/labs/hq",
        icon: {
            type: "emoji",
            value: "🧨",
        },
        tags: ["marketing", "brand", "hub"],
        metricsKeys: {
            users: "site_unique_visitors",
            uptime: "site_uptime",
        },
    },
    {
        id: "ceo-dashboard",
        name: "CEO Dashboard",
        shortName: "CEO",
        description:
            "Internal command center for money, apps, deals, and operations across Digital Hooligan.",
        kind: "internal-tool",
        lifecycle: "building",
        owner: "tez",
        ceoPath: "/ceo",
        labsPath: "/labs/hq",
        internalOnly: true,
        icon: {
            type: "emoji",
            value: "📊",
        },
        tags: ["internal", "ops", "metrics"],
        metricsKeys: {
            users: "ceo_active_sessions",
        },
    },
    {
        id: "labs-hq",
        name: "Hooligan Labs HQ",
        shortName: "Labs HQ",
        description:
            "Internal lab for experiments, prototypes, and R&D across PennyWize, DropSignal, HypeWatch, and Ops Toys.",
        kind: "internal-tool",
        lifecycle: "building",
        owner: "labs",
        marketingPath: undefined,
        ceoPath: "/ceo/labs",
        labsPath: "/labs/hq",
        internalOnly: true,
        icon: {
            type: "emoji",
            value: "🧪",
        },
        tags: ["experiments", "r&d", "internal"],
        metricsKeys: {
            users: "labs_hq_active_sessions",
        },
    },
    {
        id: "dev-workbench",
        name: "Dev Workbench",
        shortName: "Workbench",
        description:
            "Developer-focused view inside the CEO area for managing repos, branches, and engineering work-in-progress.",
        kind: "internal-tool",
        lifecycle: "building",
        owner: "tez",
        ceoPath: "/ceo/dev-workbench",
        labsPath: "/labs/hq",
        internalOnly: true,
        icon: {
            type: "emoji",
            value: "🛠️",
        },
        tags: ["dev", "internal", "workflow"],
        metricsKeys: {
            users: "dev_workbench_users",
        },
    },
    {
        id: "pennywize",
        name: "PennyWize",
        shortName: "PennyWize",
        description:
            "Penny-stock and micro-cap intel tool with alerts, feeds, and future social + research layers.",
        kind: "public-app",
        lifecycle: "design",
        owner: "digital-hooligan",
        marketingPath: "/apps/pennywize",
        ceoPath: "/ceo/apps/pennywize",
        labsPath: "/labs/apps/pennywize",
        icon: {
            type: "emoji",
            value: "🪙",
        },
        tags: ["finance", "alerts", "research"],
        metricsKeys: {
            users: "pennywize_users",
            mrr: "pennywize_mrr",
            uptime: "pennywize_uptime",
        },
    },
    {
        id: "dropsignal",
        name: "DropSignal",
        shortName: "DropSignal",
        description:
            "Sneaker and streetwear price-drop bot with assist-mode alerts and future add-to-cart flows.",
        kind: "public-app",
        lifecycle: "idea",
        owner: "digital-hooligan",
        marketingPath: "/apps/dropsignal",
        ceoPath: "/ceo/apps/dropsignal",
        labsPath: "/labs/apps/dropsignal",
        icon: {
            type: "emoji",
            value: "👟",
        },
        tags: ["sneakers", "alerts", "ecommerce"],
        metricsKeys: {
            users: "dropsignal_users",
            uptime: "dropsignal_uptime",
        },
    },
    {
        id: "hypewatch",
        name: "HypeWatch",
        shortName: "HypeWatch",
        description:
            "Collectibles and hype-items price watch bot for figures, cards, and limited drops.",
        kind: "public-app",
        lifecycle: "idea",
        owner: "digital-hooligan",
        marketingPath: "/apps/hypewatch",
        ceoPath: "/ceo/apps/hypewatch",
        labsPath: "/labs/apps/hypewatch",
        icon: {
            type: "emoji",
            value: "🐻",
        },
        tags: ["collectibles", "alerts", "market-data"],
        metricsKeys: {
            users: "hypewatch_users",
            uptime: "hypewatch_uptime",
        },
    },
    {
        id: "ops-toys",
        name: "Ops Toys",
        shortName: "Ops Toys",
        description:
            "Drawer of ops automation “toys”: logging helpers, infra scripts, and workflow tools for smoother operations.",
        kind: "internal-tool",
        lifecycle: "idea",
        owner: "tez",
        marketingPath: undefined,
        ceoPath: "/ceo/tools/ops-toys",
        labsPath: "/labs/apps/ops-toys",
        internalOnly: true,
        icon: {
            type: "emoji",
            value: "🧰",
        },
        tags: ["ops", "infra", "automation"],
        metricsKeys: {
            users: "ops_toys_usage",
            errorsPerMin: "ops_toys_errors_per_min",
        },
    },
];

/**
 * Convenience helpers for future use (CEO dashboard, Labs HQ, AI assistants)
 */

export function getAppById(id: string): AppRegistryEntry | undefined {
    return APP_REGISTRY.find((app) => app.id === id);
}

export function getAppsByKind(kind: AppKind): AppRegistryEntry[] {
    return APP_REGISTRY.filter((app) => app.kind === kind);
}

export function getPublicApps(): AppRegistryEntry[] {
    return APP_REGISTRY.filter((app) => !app.internalOnly);
}

export function getInternalApps(): AppRegistryEntry[] {
    return APP_REGISTRY.filter((app) => app.internalOnly);
}