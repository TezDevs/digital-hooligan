// apps/digitalhooligan-web/lib/appRegistry.ts

export type AppId =
    | "pennywize"
    | "dropsignal"
    | "hypewatch"
    | "ops-toys"
    | "ceo-dashboard"
    | "labs-hq";

export type AppKind =
    | "external-app"
    | "internal-dashboard"
    | "bot"
    | "experimental";

export type AppLifecycleStage =
    | "idea"
    | "prototype"
    | "alpha"
    | "beta"
    | "live";

export type AppOwner = "tez" | "digital-hooligan";

export type AppRegistryEntry = {
    id: AppId;
    name: string;
    shortName?: string;
    kind: AppKind;
    owner: AppOwner;
    stage: AppLifecycleStage;
    /**
     * One-liner describing what this thing is for.
     * Used later in AI Hub, Labs HQ, docs, etc.
     */
    tagline: string;
    /**
     * Optional default health note + status so basic health endpoints
     * can be mocked from the registry alone.
     */
    defaultHealthStatus?: "ok" | "degraded" | "down";
    defaultHealthNote?: string;
    tags?: string[];
};

export const appRegistry: AppRegistryEntry[] = [
    {
        id: "pennywize",
        name: "PennyWize",
        shortName: "PennyWize",
        kind: "external-app",
        owner: "tez",
        stage: "alpha",
        tagline: "Penny stock intel and signals for retail traders.",
        defaultHealthStatus: "ok",
        defaultHealthNote: "Mocked: registry + AI summary reachable.",
        tags: ["stocks", "intel", "feed-future"],
    },
    {
        id: "dropsignal",
        name: "DropSignal",
        shortName: "DropSignal",
        kind: "external-app",
        owner: "tez",
        stage: "idea",
        tagline: "Sneaker and streetwear drop + price-drop alerts.",
        defaultHealthStatus: "ok",
        defaultHealthNote: "Mocked: feed + alert wiring planned, UI in design.",
        tags: ["sneakers", "streetwear", "alerts"],
    },
    {
        id: "hypewatch",
        name: "HypeWatch",
        shortName: "HypeWatch",
        kind: "external-app",
        owner: "tez",
        stage: "idea",
        tagline: "Collectibles, cards, and hype assets price tracking.",
        defaultHealthStatus: "degraded",
        defaultHealthNote: "Mocked: concept stage only, Labs wiring not complete.",
        tags: ["collectibles", "cards", "watchlist"],
    },
    {
        id: "ops-toys",
        name: "Ops Toys",
        shortName: "Ops Toys",
        kind: "bot",
        owner: "digital-hooligan",
        stage: "prototype",
        tagline: "Internal automations and tiny ops tools for the studio.",
        defaultHealthStatus: "ok",
        defaultHealthNote: "Mocked: ready for first scripts and jobs.",
        tags: ["internal", "automation", "ops"],
    },
    {
        id: "ceo-dashboard",
        name: "CEO dashboard",
        shortName: "CEO",
        kind: "internal-dashboard",
        owner: "digital-hooligan",
        stage: "alpha",
        tagline: "Top-level control panel for Digital Hooligan.",
        defaultHealthStatus: "ok",
        defaultHealthNote: "Mocked: views live with health + registry wiring.",
        tags: ["internal", "dashboard", "ceo"],
    },
    {
        id: "labs-hq",
        name: "Hooligan Labs HQ",
        shortName: "Labs HQ",
        kind: "internal-dashboard",
        owner: "digital-hooligan",
        stage: "alpha",
        tagline: "Experiments backlog, prototypes, and bot playground.",
        defaultHealthStatus: "ok",
        defaultHealthNote: "Mocked: experiments + registry panels wired.",
        tags: ["internal", "labs", "experiments"],
    },
];

export function getAppById(id: AppId): AppRegistryEntry | undefined {
    return appRegistry.find((app) => app.id === id);
}

/**
 * Returns a map of appId -> registry entry.
 * Useful for quick lookups in API routes.
 */
export function appRegistryMap(): Record<AppId, AppRegistryEntry> {
    const map = {} as Record<AppId, AppRegistryEntry>;
    for (const app of appRegistry) {
        map[app.id] = app;
    }
    return map;
}

/**
 * Utility used by AI endpoints to build a short,
 * human-readable descriptor for an app.
 */
export function formatAppSummaryLine(app: AppRegistryEntry): string {
    const parts: string[] = [];

    parts.push(app.name);

    if (app.stage) {
        parts.push(`stage: ${app.stage}`);
    }

    if (app.kind) {
        parts.push(`kind: ${app.kind}`);
    }

    if (app.tagline) {
        parts.push(`focus: ${app.tagline}`);
    }

    return parts.join(" • ");
}