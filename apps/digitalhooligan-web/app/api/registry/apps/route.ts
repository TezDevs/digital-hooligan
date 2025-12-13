import { NextResponse } from "next/server";

type AppPaths = {
    marketing?: string;
    ceo?: string;
    labs?: string;
};

type MetricsKeys = {
    users?: string;
    revenue?: string;
    mrr?: string;
    churn?: string;
    latency?: string;
    uptime?: string;
};

type AppRegistryEntry = {
    id: string;
    slug: string;
    name: string;
    tagline?: string;

    kind: string; // internal, external, bot, etc.
    lifecycle: string; // idea, prototype, beta, live…

    owner?: string;
    tags?: string[];
    description?: string;

    paths?: AppPaths;

    // Optional fields used around the codebase
    stage?: string;

    defaultHealthStatus?: "healthy" | "degraded" | "down" | "unknown" | string;
    defaultHealthNote?: string;

    metricsKeys?: MetricsKeys;

    // Allow future registry fields without TS choking
    [key: string]: unknown;
};

type RegistryResponse = {
    apps: AppRegistryEntry[];
};

// Simple in-memory registry for now.
// You can tweak these entries however you like later.
const APP_REGISTRY: AppRegistryEntry[] = [
    {
        id: "pennywize",
        slug: "pennywize",
        name: "PennyWize",
        tagline: "Penny-stock intel with a retro ticker.",
        kind: "internal",
        lifecycle: "idea",
        owner: "Digital Hooligan",
        tags: ["stocks", "intel", "retro"],
        stage: "idea",
        paths: {
            marketing: "/apps/pennywize",
            ceo: "/ceo/apps?appId=pennywize",
            labs: "/labs/app-registry",
        },
        defaultHealthStatus: "healthy",
        defaultHealthNote: "Early concept, wiring in telemetry later.",
    },
    {
        id: "dropsignal",
        slug: "dropsignal",
        name: "DropSignal",
        tagline: "Sneaker & streetwear price-drop radar.",
        kind: "internal",
        lifecycle: "idea",
        owner: "Digital Hooligan",
        tags: ["sneakers", "streetwear", "alerts"],
        stage: "idea",
        paths: {
            marketing: "/apps/dropsignal",
            ceo: "/ceo/apps?appId=dropsignal",
            labs: "/labs/app-registry",
        },
        defaultHealthStatus: "healthy",
        defaultHealthNote: "Lab concept, API design in progress.",
    },
    {
        id: "hypewatch",
        slug: "hypewatch",
        name: "HypeWatch",
        tagline: "Collectibles and trading-card market watcher.",
        kind: "internal",
        lifecycle: "idea",
        owner: "Digital Hooligan",
        tags: ["collectibles", "cards", "alerts"],
        stage: "idea",
        paths: {
            marketing: "/apps/hypewatch",
            ceo: "/ceo/apps?appId=hypewatch",
            labs: "/labs/app-registry",
        },
        defaultHealthStatus: "healthy",
        defaultHealthNote: "Lab concept, backlog shaping.",
    },
    {
        id: "ops-toys",
        slug: "ops-toys",
        name: "Ops Toys",
        tagline: "Internal drawer of dev-ops automation toys.",
        kind: "internal",
        lifecycle: "idea",
        owner: "Digital Hooligan",
        tags: ["internal", "devops", "automation"],
        stage: "idea",
        paths: {
            marketing: "/apps/ops-toys",
            ceo: "/ceo/apps?appId=ops-toys",
            labs: "/labs/app-registry",
        },
        defaultHealthStatus: "healthy",
        defaultHealthNote: "Infrastructure helper ideas.",
    },
];

export async function GET() {
    const payload: RegistryResponse = {
        apps: APP_REGISTRY,
    };

    return NextResponse.json(payload, { status: 200 });
}