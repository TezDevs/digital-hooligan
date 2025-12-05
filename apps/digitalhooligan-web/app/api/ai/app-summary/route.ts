// apps/digitalhooligan-web/app/api/ai/app-summary/route.ts

import { NextResponse } from "next/server";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

export const dynamic = "force-dynamic";

type AppHealthStatus = "good" | "needs_wiring" | "idea_only";

type AppHealth = {
    status: AppHealthStatus;
    missing: string[];
};

type AiAppSummaryResponse = {
    ok: true;
    type: "ai_app_summary";
    appId: string;
    appName: string;
    headline: string;
    bullets: string[];
    wiringNotes: string[];
    suggestions: string[];
    health: AppHealth;
    timestamp: string;
};

type ErrorResponse = {
    ok: false;
    error: string;
    message: string;
};

/**
 * Derive a tiny health snapshot for a single app.
 * Mirrors the logic in /api/health/apps so everything stays consistent.
 */
function evaluateAppHealthForEntry(app: AppRegistryEntry): AppHealth {
    const missing: string[] = [];

    if (!app.marketingPath && app.kind === "public-app") {
        missing.push("marketingPath");
    }

    if (!app.ceoPath) {
        missing.push("ceoPath");
    }

    if (!app.labsPath) {
        missing.push("labsPath");
    }

    const hasMetrics = Boolean(app.metricsKeys);
    if (!hasMetrics) {
        missing.push("metricsKeys");
    }

    let status: AppHealthStatus = "good";

    if (app.lifecycle === "idea" || app.lifecycle === "design") {
        status = "idea_only";
    } else if (missing.length > 0) {
        status = "needs_wiring";
    }

    return { status, missing };
}

function buildHeadline(app: AppRegistryEntry, health: AppHealth): string {
    const wiringPhrase =
        health.status === "good"
            ? "wiring looks solid for a first wave of users."
            : health.status === "needs_wiring"
                ? "core idea is clear but some wiring is still missing."
                : "lives mostly in the idea / design stack for now.";

    switch (app.id) {
        case "pennywize":
            return `PennyWize is a penny-stock and micro-cap intel tool aiming for a tight MVP with alerts, research, and a future social layer — ${wiringPhrase}`;
        case "dropsignal":
            return `DropSignal is your sneaker / streetwear price-drop bot, starting with assist-mode alerts plus links out to real retailers — ${wiringPhrase}`;
        case "hypewatch":
            return `HypeWatch tracks collectible prices and display pieces for collectors, starting with a tiny beta and clean display cards — ${wiringPhrase}`;
        case "ops-toys":
            return `Ops Toys is the internal drawer of dev / infra automation toys that keep your stack smooth behind the scenes — ${wiringPhrase}`;
        default:
            return `${app.name} is in “${app.lifecycle}” stage and ${wiringPhrase}`;
    }
}

function buildBullets(app: AppRegistryEntry): string[] {
    switch (app.id) {
        case "pennywize":
            return [
                "Focused on penny-stock and micro-cap tickers rather than the whole market.",
                "Design leans toward clear intel surfaces (alerts, watchlists, quick research).",
                "Future: social / feed layer so users can share tickers, charts, and screenshots.",
            ];
        case "dropsignal":
            return [
                "Watches sneaker and streetwear products across a small curated set of sources.",
                "First wave is assist-mode: alerts + deep links out to trusted retailers.",
                "Future: richer rules, historical charts, and maybe simple social sharing.",
            ];
        case "hypewatch":
            return [
                "Aims at collectibles (toys, figures, cards, etc.) with a simple tracking UI.",
                "Differentiates from DropSignal by focusing on display pieces and long-term holds.",
                "Future: small collector groups, show-and-tell boards, and trade signals.",
            ];
        case "ops-toys":
            return [
                "Internal-only collection of small automation helpers for infra and dev workflow.",
                "Targets log cleanup, quick checks, and other high-leverage boring work.",
                "Future: tie into Dev Workbench and CI so toys can be triggered automatically.",
            ];
        default:
            return [
                `${app.name} sits under the Digital Hooligan umbrella as a ${app.kind === "public-app" ? "public-facing app." : "Labs / internal tool."
                }`,
                `Lifecycle is currently “${app.lifecycle}”.`,
                "Shape the story, then wire just enough for a small demo before you overbuild.",
            ];
    }
}

function buildWiringNotes(app: AppRegistryEntry, health: AppHealth): string[] {
    const notes: string[] = [];

    if (app.marketingPath) {
        notes.push(`Marketing page wired at ${app.marketingPath}.`);
    } else if (app.kind === "public-app") {
        notes.push("No marketingPath yet — public-facing route still TODO.");
    }

    if (app.ceoPath) {
        notes.push(`CEO dashboard view wired at ${app.ceoPath}.`);
    } else {
        notes.push("No dedicated CEO dashboard view yet.");
    }

    if (app.labsPath) {
        notes.push(`Labs HQ entry wired at ${app.labsPath}.`);
    } else {
        notes.push("No dedicated Labs HQ view yet — lives in the generic experiments log.");
    }

    if (app.metricsKeys) {
        notes.push("Metrics keys are defined, ready for real data or mock metrics.");
    } else {
        notes.push("No metricsKeys yet — app won’t show up cleanly in performance dashboards.");
    }

    if (health.missing.length === 0) {
        notes.push("From a wiring standpoint this app is in the “good enough” bucket.");
    } else {
        notes.push(
            `Missing wiring: ${health.missing
                .map((key) => `"${key}"`)
                .join(", ")}. Focus here before adding new surfaces.`,
        );
    }

    return notes;
}

function buildSuggestions(app: AppRegistryEntry, health: AppHealth): string[] {
    const suggestions: string[] = [];

    if (health.status === "idea_only") {
        suggestions.push("Write a one-page MVP spec that names inputs, outputs, and success criteria.");
        suggestions.push("Sketch 2–3 screens or flows instead of trying to design the whole thing.");
    } else if (health.status === "needs_wiring") {
        suggestions.push(
            "Pick one missing wiring item (marketingPath, ceoPath, labsPath, or metrics) and close it this week.",
        );
        suggestions.push(
            "Ship a tiny demo path end-to-end instead of spreading effort across multiple surfaces.",
        );
    } else {
        suggestions.push("Start getting 1–3 real users or friendly testers hitting the app.");
        suggestions.push(
            "Use the CEO dashboard and Labs metrics to decide what to improve next instead of guessing.",
        );
    }

    if (!app.metricsKeys) {
        suggestions.push(
            "Define at least 1–2 metrics keys (users, MRR, uptime) so performance views and alerts have something to latch onto.",
        );
    }

    return suggestions;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const appIdFromQuery = searchParams.get("appId");

    const appId = appIdFromQuery && appIdFromQuery.trim().length > 0
        ? appIdFromQuery.trim()
        : "pennywize";

    const entry = APP_REGISTRY.find((app) => app.id === appId);

    if (!entry) {
        const payload: ErrorResponse = {
            ok: false,
            error: "not_found",
            message: `No app found for id "${appId}".`,
        };
        return NextResponse.json(payload, { status: 404 });
    }

    const health = evaluateAppHealthForEntry(entry);
    const headline = buildHeadline(entry, health);
    const bullets = buildBullets(entry);
    const wiringNotes = buildWiringNotes(entry, health);
    const suggestions = buildSuggestions(entry, health);

    const response: AiAppSummaryResponse = {
        ok: true,
        type: "ai_app_summary",
        appId: entry.id,
        appName: entry.name,
        headline,
        bullets,
        wiringNotes,
        suggestions,
        health,
        timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
}