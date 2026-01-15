// apps/digitalhooligan-web/lib/appRegistry.ts

// Core types for the registry
export type AppId =
    | "digital-hooligan-site"
    | "pennywize"
    | "dropsignal"
    | "hypewatch"
    | "ops-toys"
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
    labsPath?: string;

    // Misc tags / labels
    tags?: string[];
};

// ---------------------------------------------------------------------------
// Registry data
// ---------------------------------------------------------------------------

export const APP_REGISTRY: AppRegistryEntry[] = [
    {
        id: "labs-hq",
        name: "Hooligan Labs HQ",
        shortName: "Labs HQ",
        description: "Internal home for experiments + app roadmaps.",
        kind: "internal-app",
        lifecycle: "build",
        owner: "tez",
        internalOnly: true,
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