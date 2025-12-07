// apps/digitalhooligan-web/app/api/ai/app-summary/route.ts

import { NextResponse } from "next/server";
import {
    appRegistryMap,
    formatAppSummaryLine,
    type AppId,
    type AppRegistryEntry,
} from "@/lib/appRegistry";

export const dynamic = "force-dynamic";

type AiAppSummaryResponse = {
    ok: true;
    type: "ai_app_summary";
    appId: AppId;
    appName: string;
    headline: string;
    bullets: string[];
    suggestions: string[];
    timestamp: string;
};

type AiAppSummaryError = {
    ok: false;
    type: "ai_app_summary_error";
    appId?: string;
    message: string;
    timestamp: string;
};

const registry = appRegistryMap();

function buildSummaryBullets(app: AppRegistryEntry): string[] {
    const lifecycle = app.lifecycle ?? app.stage;

    const bullets: string[] = [];

    bullets.push(
        app.description ??
        "Shape a clear one-sentence description for what this app does.",
    );

    bullets.push(`Stage: ${lifecycle ?? "unknown"}.`);
    bullets.push(`Kind: ${app.kind}.`);

    bullets.push(
        app.internalOnly
            ? "Currently treated as an internal-only app under the Digital Hooligan umbrella."
            : "Intended to be public-facing under the Digital Hooligan umbrella.",
    );

    if (app.marketingPath) {
        bullets.push(`Marketing / site path: ${app.marketingPath}`);
    }
    if (app.ceoPath) {
        bullets.push(`CEO view path: ${app.ceoPath}`);
    }
    if (app.labsPath) {
        bullets.push(`Labs wiring: ${app.labsPath}`);
    }

    return bullets;
}

function buildSuggestions(app: AppRegistryEntry): string[] {
    return [
        "Identify the next 1–3 concrete UX or wiring improvements.",
        "Decide what metrics matter most for this app (usage, latency, alerts, etc.).",
        "Plan how this app should appear in the CEO dashboard and Labs views.",
    ];
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const appIdParam =
        url.searchParams.get("appid") ?? url.searchParams.get("appId");

    const appId = (appIdParam ?? "pennywize") as AppId;
    const app = registry[appId];

    const now = new Date().toISOString();

    if (!app) {
        const payload: AiAppSummaryError = {
            ok: false,
            type: "ai_app_summary_error",
            appId,
            message: `No app found in registry for id "${appId}".`,
            timestamp: now,
        };
        return NextResponse.json(payload, { status: 404 });
    }

    const headline = formatAppSummaryLine(app);
    const bullets = buildSummaryBullets(app);
    const suggestions = buildSuggestions(app);

    const payload: AiAppSummaryResponse = {
        ok: true,
        type: "ai_app_summary",
        appId,
        appName: app.name,
        headline,
        bullets,
        suggestions,
        timestamp: now,
    };

    return NextResponse.json(payload);
}