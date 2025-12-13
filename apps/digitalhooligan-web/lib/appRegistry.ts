// apps/digitalhooligan-web/lib/appRegistry.ts

// Core types for the registry
export type AppId =
    | "digital-hooligan-site"
    | "pennywize"
    | "dropsignal"
    | "hypewatch"
    | "ops-toys"
    | "ceo-dashboard"
    | "labs-hq";

export type AppKind = "public-app" | "internal-app" | "bot" | "dev-tool";

export type AppLifecycleStage = "idea" | "design" | "build" | "live";

export type AppRegistryEntry = {
    id: AppId;
    name: string;
    shortName?: string;
    description?: string;

    kind: AppKind;
    lifecycle: AppLifecycleStage;
    owner: string;

    // Flags / routing helpers
    internalOnly?: boolean;
    marketingPath?: string;
    ceoPath?: string;
    labsPath?: string;

    // Misc tags / labels
    tags?: string[];
};

// ---------------------------------------------------------------------------
// Registry data
// ---------------------------------------------------------------------------

export const APP_REGISTRY: AppRegistryEntry[] = [
    {
        id: "digital-hooligan-site",
        name: "Digital Hooligan Site",
        shortName: "DH site",
        description: "Top-level marketing + CEO entry point.",
        kind: "public-app",
        lifecycle: "live",
        owner: "digital-hooligan",
        marketingPath: "/",
        ceoPath: "/ceo",
        labsPath: "/labs/hq",
        tags: ["site", "marketing"],
    },
    {
        id: "pennywize",
        name: "PennyWize",
        shortName: "PennyWize",
        description: "Penny-stock intel tool with alerts + social layer.",
        kind: "public-app",
        lifecycle: "design",
        owner: "digital-hooligan",
        marketingPath: "/apps/pennywize",
        ceoPath: "/ceo/apps/pennywize",
        labsPath: "/labs/apps/pennywize",
        tags: ["finance", "alerts", "research"],
    },
    {
        id: "dropsignal",
        name: "DropSignal",
        shortName: "DropSignal",
        description: "Sneaker/streetwear price-drop bot (assist mode first).",
        kind: "bot",
        lifecycle: "idea",
        owner: "digital-hooligan",
        marketingPath: "/apps/dropsignal",
        ceoPath: "/ceo/apps/dropsignal",
        labsPath: "/labs/apps/dropsignal",
        tags: ["sneakers", "alerts"],
    },
    {
        id: "hypewatch",
        name: "HypeWatch",
        shortName: "HypeWatch",
        description: "Collectibles / display-piece watch bot.",
        kind: "bot",
        lifecycle: "idea",
        owner: "digital-hooligan",
        marketingPath: "/apps/hypewatch",
        ceoPath: "/ceo/apps/hypewatch",
        labsPath: "/labs/apps/hypewatch",
        tags: ["collectibles", "alerts"],
    },
    {
        id: "ops-toys",
        name: "Ops Toys",
        shortName: "Ops Toys",
        description: "Internal drawer of ops automation toys.",
        kind: "dev-tool",
        lifecycle: "build",
        owner: "digital-hooligan",
        internalOnly: true,
        ceoPath: "/ceo/dev-workbench",
        labsPath: "/labs/hq",
        tags: ["internal", "automation"],
    },
    {
        id: "ceo-dashboard",
        name: "CEO Dashboard",
        shortName: "CEO",
        description: "Internal CEO command center.",
        kind: "internal-app",
        lifecycle: "build",
        owner: "tez",
        internalOnly: true,
        ceoPath: "/ceo",
        labsPath: "/labs/hq",
        tags: ["internal"],
    },
    {
        id: "labs-hq",
        name: "Hooligan Labs HQ",
        shortName: "Labs HQ",
        description: "Internal home for experiments + app roadmaps.",
        kind: "internal-app",
        lifecycle: "build",
        owner: "tez",
        internalOnly: true,
        ceoPath: "/labs/hq",
        labsPath: "/labs/hq",
        tags: ["internal", "labs"],
    },
];

// Legacy name used in a few places
export const appRegistry = APP_REGISTRY;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function appRegistryMap(): Record<AppId, AppRegistryEntry> {
    return APP_REGISTRY.reduce<Record<AppId, AppRegistryEntry>>((acc, app) => {
        acc[app.id] = app;
        return acc;
    }, {} as Record<AppId, AppRegistryEntry>);
}

export function getAppById(id: AppId): AppRegistryEntry | undefined {
    return APP_REGISTRY.find((entry) => entry.id === id);
}