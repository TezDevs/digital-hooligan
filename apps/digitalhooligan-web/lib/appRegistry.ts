// apps/digitalhooligan-web/lib/appRegistry.ts

export type AppId = string;

export type AppKind = "public-app" | "internal-app" | "bot" | "dev-tool";

export type AppLifecycleStage = "idea" | "design" | "build" | "live";

export type AppIcon =
    | { type: "emoji"; value: string }
    | { type: "text"; value: string };

export type AppMetricsKeys = {
    users?: string;
    mrr?: string;
    uptime?: string;
};

export type AppRegistryEntry = {
    id: AppId;
    name: string;
    shortName?: string;
    description?: string;
    tagline?: string;
    kind: AppKind;
    lifecycle: AppLifecycleStage;
    owner: string;

    /** Marketing / public-facing route on the main site */
    marketingPath?: string;

    /** CEO dashboard route for this app */
    ceoPath?: string;

    /** Labs HQ route for this app */
    labsPath?: string;

    /** True = hide from public lists unless explicitly requested */
    internalOnly?: boolean;

    /** Simple icon used across CEO / Labs / registry tables */
    icon?: AppIcon;

    /** Free-form tags for filtering */
    tags?: string[];

    /** Optional metric keys so /api/metrics can look things up later */
    metricsKeys?: AppMetricsKeys;
};

/**
 * Core registry for all apps / bots under Digital Hooligan.
 * This is the single source of truth that CEO, Labs, and API routes read from.
 */
export const APP_REGISTRY: AppRegistryEntry[] = [
    {
        id: "pennywize",
        name: "PennyWize",
        shortName: "PennyWize",
        description:
            "Penny-stock and micro-cap intel tool with alerts, feeds, and future social + research layers.",
        tagline: "Penny-stock intel with alerts + social layer.",
        kind: "public-app",
        lifecycle: "design",
        owner: "digital-hooligan",
        marketingPath: "/apps/pennywize",
        ceoPath: "/ceo/apps/pennywize",
        labsPath: "/labs/apps/pennywize",
        icon: { type: "emoji", value: "🪙" },
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
            "Sneaker / streetwear price-drop bot with assist-mode alerts and future auto-cart wiring.",
        tagline: "Sneaker/streetwear drop alerts.",
        kind: "public-app",
        lifecycle: "idea",
        owner: "digital-hooligan",
        marketingPath: "/apps/dropsignal",
        ceoPath: "/ceo/apps/dropsignal",
        labsPath: "/labs/apps/dropsignal",
        icon: { type: "emoji", value: "👟" },
        tags: ["sneakers", "streetwear", "alerts"],
    },
    {
        id: "hypewatch",
        name: "HypeWatch",
        shortName: "HypeWatch",
        description:
            "Collectibles price-watch bot for cards, toys, and other display pieces. Differentiated from DropSignal.",
        tagline: "Collectibles price-watch bot.",
        kind: "public-app",
        lifecycle: "idea",
        owner: "digital-hooligan",
        marketingPath: "/apps/hypewatch",
        ceoPath: "/ceo/apps/hypewatch",
        labsPath: "/labs/apps/hypewatch",
        icon: { type: "emoji", value: "🧸" },
        tags: ["collectibles", "cards", "alerts"],
    },
    {
        id: "ops-toys",
        name: "Ops Toys",
        shortName: "Ops Toys",
        description: "Internal drawer of ops automation toys and helpers.",
        tagline: "Internal ops automation toys.",
        kind: "dev-tool",
        lifecycle: "build",
        owner: "tez",
        marketingPath: "/apps/ops-toys",
        ceoPath: "/ceo/apps/ops-toys",
        labsPath: "/labs/apps/ops-toys",
        icon: { type: "emoji", value: "🧰" },
        tags: ["internal", "automation"],
        internalOnly: true,
    },
    {
        id: "digital-hooligan-site",
        name: "Digital Hooligan Site",
        shortName: "DH Site",
        description:
            "Public-facing Digital Hooligan site that houses services, apps, and company information.",
        tagline: "Main Digital Hooligan site.",
        kind: "public-app",
        lifecycle: "live",
        owner: "tez",
        marketingPath: "/",
        ceoPath: "/ceo/apps/digital-hooligan-site",
        labsPath: "/labs/apps/digital-hooligan-site",
        icon: { type: "emoji", value: "🎛️" },
        tags: ["marketing", "company"],
    },
    {
        id: "ceo-dashboard",
        name: "CEO Dashboard",
        shortName: "CEO",
        description:
            "Internal CEO dashboard for overview, tasks, finance, performance, AI Hub, and Dev Workbench.",
        tagline: "Internal CEO control panel.",
        kind: "internal-app",
        lifecycle: "build",
        owner: "tez",
        marketingPath: "/ceo",
        ceoPath: "/ceo",
        labsPath: "/labs/apps/ceo-dashboard",
        icon: { type: "emoji", value: "🧠" },
        tags: ["internal", "dashboard"],
        internalOnly: true,
    },
    {
        id: "labs-hq",
        name: "Hooligan Labs HQ",
        shortName: "Labs HQ",
        description:
            "Internal home for experiments, app roadmaps, and build pipeline for Digital Hooligan.",
        tagline: "Internal lab for experiments + roadmaps.",
        kind: "dev-tool",
        lifecycle: "build",
        owner: "tez",
        marketingPath: "/labs/hq",
        ceoPath: "/ceo/apps/labs-hq",
        labsPath: "/labs/hq",
        icon: { type: "emoji", value: "🧪" },
        tags: ["internal", "labs", "experiments"],
        internalOnly: true,
    },
];

/**
 * Convenience helper: map AppId -> registry entry.
 * Used by AI endpoints and any code that needs quick lookup.
 */
export function appRegistryMap(): Record<AppId, AppRegistryEntry> {
    return APP_REGISTRY.reduce(
        (acc, app) => {
            acc[app.id] = app;
            return acc;
        },
        {} as Record<AppId, AppRegistryEntry>
    );
}

/**
 * Short, human-readable description line for AI summaries and UI.
 */
export function formatAppSummaryLine(app: AppRegistryEntry): string {
    const parts: string[] = [];

    parts.push(app.name);

    if (app.lifecycle) {
        parts.push(`stage: ${app.lifecycle}`);
    }

    if (app.kind) {
        parts.push(`kind: ${app.kind}`);
    }

    if (app.tagline) {
        parts.push(`focus: ${app.tagline}`);
    }

    return parts.join(" · ");
}

/**
 * Backwards-compat alias for older imports that still expect `appRegistry`.
 * New code should prefer APP_REGISTRY and appRegistryMap().
 */
export const appRegistry = APP_REGISTRY;