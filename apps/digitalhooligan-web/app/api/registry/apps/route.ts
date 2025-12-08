import { NextRequest } from "next/server";

type AppPaths = {
    marketing?: string;
    ceo?: string;
    labs?: string;
};

type AppRegistryItem = {
    id: string;
    slug?: string;
    name: string;
    codeName?: string;
    kind: string;
    lifecycle: string;
    owner?: string;
    tags?: string[];
    description?: string;
    paths?: AppPaths;
};

// Temporary in-memory registry.
// You can tune names/paths later – this is just to get CEO views stable.
const registry: AppRegistryItem[] = [
    {
        id: "pennywize",
        slug: "pennywize",
        name: "PennyWize",
        codeName: "PWZ-01",
        kind: "external",
        lifecycle: "idea",
        owner: "Courtez",
        tags: ["stocks", "intel", "screener"],
        description:
            "Penny stock intel bot: scanners, alerts, and future social feed for high-risk traders.",
        paths: {
            marketing: "/apps/pennywize",
            ceo: "/ceo/apps/pennywize",
            labs: "/labs/apps/pennywize",
        },
    },
    {
        id: "dropsignal",
        slug: "dropsignal",
        name: "DropSignal",
        codeName: "DS-01",
        kind: "bot",
        lifecycle: "prototype",
        owner: "Courtez",
        tags: ["sneakers", "streetwear", "alerts"],
        description:
            "Drop monitoring + price-drop alerts for sneakers and streetwear, evolving from bot to full app.",
        paths: {
            marketing: "/apps/dropsignal",
            ceo: "/ceo/apps/dropsignal",
            labs: "/labs/apps/dropsignal",
        },
    },
    {
        id: "hypewatch",
        slug: "hypewatch",
        name: "HypeWatch",
        codeName: "HW-01",
        kind: "bot",
        lifecycle: "idea",
        owner: "Courtez",
        tags: ["collectibles", "cards", "toys"],
        description:
            "Collectibles and trading-card price tracking bot with teddy-bear/Hype ecosystem branding.",
        paths: {
            marketing: "/apps/hypewatch",
            ceo: "/ceo/apps/hypewatch",
            labs: "/labs/apps/hypewatch",
        },
    },
    {
        id: "ops-toys",
        slug: "ops-toys",
        name: "Ops Toys",
        codeName: "OPS-TOYS",
        kind: "internal",
        lifecycle: "idea",
        owner: "Courtez",
        tags: ["internal", "automation", "devops"],
        description:
            "Internal drawer of ops automation toys: scripts, bots, and workflows for Digital Hooligan.",
        paths: {
            marketing: "/apps/ops-toys",
            ceo: "/ceo/apps/ops-toys",
            labs: "/labs/apps/ops-toys",
        },
    },
];

export async function GET(_req: NextRequest) {
    return Response.json({ apps: registry });
}