// apps/digitalhooligan-web/app/api/health/apps/route.ts

import { NextResponse } from "next/server";

export type AppHealthStatus = "ok" | "degraded" | "down";

export type AppHealthEntry = {
    id: string;
    name: string;
    status: AppHealthStatus;
    note: string;
};

export type AppsHealthResponse = {
    ok: true;
    type: "apps_health";
    entries: AppHealthEntry[];
    timestamp: string;
};

// Tiny mock data set for now. Later this can be driven by real checks.
const MOCK_APPS_HEALTH: AppHealthEntry[] = [
    {
        id: "pennywize",
        name: "PennyWize",
        status: "ok",
        note: "App registry + AI summary reachable.",
    },
    {
        id: "dropsignal",
        name: "DropSignal",
        status: "degraded",
        note: "Feed wiring planned, UI in design.",
    },
    {
        id: "hypewatch",
        name: "HypeWatch",
        status: "degraded",
        note: "Concept + Labs wiring only for now.",
    },
    {
        id: "ops-toys",
        name: "Ops Toys",
        status: "ok",
        note: "Internal-only tooling, ready for first scripts.",
    },
    {
        id: "ceo",
        name: "CEO dashboard",
        status: "ok",
        note: "Core views live with registry + AI wiring.",
    },
    {
        id: "labs-hq",
        name: "Hooligan Labs HQ",
        status: "ok",
        note: "Experiments + registry panels wired.",
    },
];

export async function GET() {
    const payload: AppsHealthResponse = {
        ok: true,
        type: "apps_health",
        entries: MOCK_APPS_HEALTH,
        timestamp: new Date().toISOString(),
    };

    return NextResponse.json(payload, { status: 200 });
}