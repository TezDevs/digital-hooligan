// apps/digitalhooligan-web/app/api/ai/app-summary/route.ts

import { NextResponse } from "next/server";
import {
    appRegistryMap,
    formatAppSummaryLine,
    type AppId,
    type AppRegistryEntry,
} from "@/lib/appRegistry";

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

/**
 * AI-style summary endpoint for a given appId.
 *
 * For now, this is deterministic and registry-backed instead of calling
 * a real LLM. The goal is to stabilize the JSON contract and make it
 * easy to plug into Dev Workbench + CEO AI Hub.
 *
 * Example:
 *   GET /api/ai/app-summary?appId=pennywize
 */
export async function GET(
    request: Request
): Promise<NextResponse<AiAppSummaryResponse | AiAppSummaryError>> {
    const url = new URL(request.url);
    const appIdRaw = url.searchParams.get("appId") ?? "";
    const appId = appIdRaw.trim() as AppId | "";

    const timestamp = new Date().toISOString();

    if (!appId) {
        return NextResponse.json(
            {
                ok: false,
                type: "ai_app_summary_error",
                message: "Missing appId query parameter.",
                timestamp,
            },
            { status: 400 }
        );
    }

    const app: AppRegistryEntry | undefined = registry[appId as AppId];

    if (!app) {
        return NextResponse.json(
            {
                ok: false,
                type: "ai_app_summary_error",
                appId,
                message: `Unknown appId "${appId}". Make sure it exists in the app registry.`,
                timestamp,
            },
            { status: 404 }
        );
    }

    const { headline, bullets, suggestions } = buildSummaryFromRegistry(app);

    const body: AiAppSummaryResponse = {
        ok: true,
        type: "ai_app_summary",
        appId: app.id,
        appName: app.name,
        headline,
        bullets,
        suggestions,
        timestamp,
    };

    return NextResponse.json(body, { status: 200 });
}

/**
 * Simple deterministic "AI-style" summary that uses the registry as
 * its only source of truth.
 *
 * Later, this can call a real model and still keep the same shape.
 */
function buildSummaryFromRegistry(app: AppRegistryEntry): {
    headline: string;
    bullets: string[];
    suggestions: string[];
} {
    const headline = formatAppSummaryLine(app);

    const bullets: string[] = [];
    const suggestions: string[] = [];

    bullets.push(app.tagline);

    bullets.push(
        `Lifecycle stage: ${app.stage}. Owner: ${app.owner}. Kind: ${app.kind}.`
    );

    if (app.tags && app.tags.length > 0) {
        bullets.push(`Tags: ${app.tags.join(", ")}.`);
    }

    // Some light opinionated suggestions depending on stage/kind
    if (app.stage === "idea") {
        suggestions.push(
            "Clarify the first narrow use case and define a tiny v1 that you can ship quickly."
        );
        suggestions.push(
            "Draft a simple landing page or internal pitch doc describing who this app is for and what problem it solves."
        );
    } else if (app.stage === "alpha" || app.stage === "beta") {
        suggestions.push(
            "Add basic observability: uptime, latency, and clear health checks exposed to the CEO Performance view."
        );
        suggestions.push(
            "Document the core workflows and keep track of any rough edges in a small 'alpha feedback' list."
        );
    } else if (app.stage === "live") {
        suggestions.push(
            "Formalize SLAs for uptime and latency, and wire alerts into your incident process."
        );
        suggestions.push(
            "Look for feature flags and experiments you can run without destabilizing the core experience."
        );
    }

    if (app.kind === "internal-dashboard") {
        suggestions.push(
            "Make sure this dashboard stays fast and low-noise for the one person who uses it every day: CEO Tez."
        );
    } else if (app.kind === "bot") {
        suggestions.push(
            "Plan how this bot will be promoted from 'internal toy' into a reusable service for other tools."
        );
    } else if (app.kind === "external-app") {
        suggestions.push(
            "Think about what a simple pricing or subscription model could look like once the UX is stable."
        );
    }

    return { headline, bullets, suggestions };
}