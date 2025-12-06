import { NextResponse } from "next/server";

type AppHealthStatus = "ok" | "degraded" | "down";

type StackAppHealth = {
    id: string;
    name: string;
    status: AppHealthStatus;
    note: string;
};

type StackHealthResponse = {
    ok: boolean;
    timestamp: string;
    apps: StackAppHealth[];
};

/**
 * Aggregated stack health endpoint.
 *
 * This is intentionally mocked for now so you have a stable JSON shape
 * to hit from the browser or Insomnia/Kong. Later we can wire this to
 * real checks (uptime, latency, incidents, etc.).
 */
export async function GET() {
    const timestamp = new Date().toISOString();

    // For now, everything is mocked "green" except one example.
    const apps: StackAppHealth[] = [
        {
            id: "pennywize",
            name: "PennyWize",
            status: "ok",
            note: "Mocked: app registry + AI summary reachable.",
        },
        {
            id: "dropsignal",
            name: "DropSignal",
            status: "ok",
            note: "Mocked: feed wiring planned, UI in design.",
        },
        {
            id: "hypewatch",
            name: "HypeWatch",
            status: "degraded",
            note: "Mocked: concept stage only, Labs wiring not complete.",
        },
        {
            id: "ops-toys",
            name: "Ops Toys",
            status: "ok",
            note: "Mocked: internal-only tools ready for first scripts.",
        },
        {
            id: "ceo-dashboard",
            name: "CEO dashboard",
            status: "ok",
            note: "Mocked: views live with registry + health wiring.",
        },
        {
            id: "labs-hq",
            name: "Hooligan Labs HQ",
            status: "ok",
            note: "Mocked: experiments + registry panels wired.",
        },
    ];

    const ok = apps.every((a) => a.status === "ok");

    const body: StackHealthResponse = {
        ok,
        timestamp,
        apps,
    };

    return NextResponse.json(body, {
        status: 200,
    });
}