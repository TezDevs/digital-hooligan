// apps/digitalhooligan-web/app/api/ai/suggestions/route.ts

import { NextResponse } from "next/server";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";
import { getMockMetricValue } from "@/lib/mockMetrics";

type SuggestionPriority = "high" | "medium" | "low";
type SuggestionCategory =
    | "go-to-market"
    | "product-shaping"
    | "stability"
    | "internal-tools"
    | "experiments"
    | "discovery";

type Suggestion = {
    id: string;
    appId: string | null; // null for global suggestions
    title: string;
    description: string;
    priority: SuggestionPriority;
    category: SuggestionCategory;
};

type SuggestionsResponse = {
    ok: true;
    generatedAt: string;
    totalSuggestions: number;
    suggestions: Suggestion[];
};

function buildSuggestionsForApp(app: AppRegistryEntry): Suggestion[] {
    const metricsKeys = app.metricsKeys ?? {};
    const users =
        metricsKeys.users != null
            ? getMockMetricValue(metricsKeys.users)
            : null;
    const mrr =
        metricsKeys.mrr != null ? getMockMetricValue(metricsKeys.mrr) : null;
    const uptime =
        metricsKeys.uptime != null
            ? getMockMetricValue(metricsKeys.uptime)
            : null;

    const suggestions: Suggestion[] = [];
    const baseId = app.id;

    // Lifecycle-based suggestions
    if (app.lifecycle === "idea" || app.lifecycle === "design") {
        suggestions.push({
            id: `${baseId}-shape-first-slice`,
            appId: app.id,
            title: "Shape a single, sharp first value slice",
            description:
                "Clarify the one thing this app should do incredibly well for v0. Focus on a single narrow persona and use case, then define the smallest flow that proves it.",
            priority: "high",
            category: "product-shaping",
        });
    }

    if (app.lifecycle === "building") {
        suggestions.push({
            id: `${baseId}-lock-scope`,
            appId: app.id,
            title: "Lock scope for v0 and create a short build list",
            description:
                "Write down the v0 feature checklist for this app and explicitly mark anything nice-to-have as v1+. This keeps the build tight and shippable.",
            priority: "high",
            category: "product-shaping",
        });
    }

    if (app.lifecycle === "beta" && !app.internalOnly) {
        suggestions.push({
            id: `${baseId}-beta-feedback-loop`,
            appId: app.id,
            title: "Set up a tight beta feedback loop",
            description:
                "Define 5–10 ideal beta users and a simple weekly check-in ritual. Capture what they actually do, what confuses them, and what they’d pay for.",
            priority: "high",
            category: "go-to-market",
        });
    }

    if (app.lifecycle === "live" && !app.internalOnly) {
        suggestions.push({
            id: `${baseId}-go-to-market`,
            appId: app.id,
            title: "Define a simple go-to-market experiment",
            description:
                "Pick one acquisition channel (e.g. 1 landing page + 1 social post type) and run a small experiment to see if you can get even a handful of real users in.",
            priority: "high",
            category: "go-to-market",
        });
    }

    // Metrics-based suggestions
    if (users === 0 && app.lifecycle === "live" && !app.internalOnly) {
        suggestions.push({
            id: `${baseId}-zero-users`,
            appId: app.id,
            title: "Treat this live app as a quiet beta",
            description:
                "There are no users yet. Assume this is a quiet beta and focus on talking to 3–5 potential users to validate the value prop before pushing harder on traffic.",
            priority: "high",
            category: "discovery",
        });
    }

    if (mrr === 0 && users !== null && users > 0 && !app.internalOnly) {
        suggestions.push({
            id: `${baseId}-pricing-experiment`,
            appId: app.id,
            title: "Run a small pricing experiment",
            description:
                "You have mock users but no revenue. Draft a simple pricing page and test a low-friction offer with the existing user base before optimizing the product further.",
            priority: "medium",
            category: "go-to-market",
        });
    }

    if (uptime !== null && uptime < 99 && !app.internalOnly) {
        suggestions.push({
            id: `${baseId}-stability`,
            appId: app.id,
            title: "Stability pass for uptime-sensitive paths",
            description:
                "Mock uptime suggests you may want to do a small stability pass: identify the top 1–2 user flows and ensure they are well-tested and monitored.",
            priority: "medium",
            category: "stability",
        });
    }

    // Internal-only tools
    if (app.internalOnly) {
        suggestions.push({
            id: `${baseId}-internal-automation`,
            appId: app.id,
            title: "Define the internal workflow this tool should save",
            description:
                "Write down the manual steps this internal tool replaces. Quantify roughly how many minutes per week it should save once it’s in regular use.",
            priority: "medium",
            category: "internal-tools",
        });
    }

    return suggestions;
}

function buildGlobalSuggestions(): Suggestion[] {
    return [
        {
            id: "global-healthcheck",
            appId: null,
            title: "Wire /api/health into a simple uptime monitor",
            description:
                "Use the /api/health endpoint as a basic heartbeat check in an uptime monitor or internal bot. It confirms the app registry loads and the web app is responding.",
            priority: "medium",
            category: "stability",
        },
        {
            id: "global-ai-assistant",
            appId: null,
            title: "Configure your first AI assistant against the registry",
            description:
                "Use the prompt helper from /ceo/ai-hub and wire your assistant into /api/ai/app-summary/[id] plus /api/apps/[id]?includeMetrics=true so it can talk about your apps with context.",
            priority: "high",
            category: "experiments",
        },
    ];
}

/**
 * GET /api/ai/suggestions
 *
 * Returns a small list of next-step suggestions based on APP_REGISTRY + mock metrics.
 * Designed for internal AI assistants, CEO tools, or future dashboards.
 */
export async function GET() {
    const now = new Date();

    const perApp: Suggestion[] = APP_REGISTRY.flatMap((entry) =>
        buildSuggestionsForApp(entry),
    );
    const global = buildGlobalSuggestions();

    const allSuggestions = [...global, ...perApp];

    const response: SuggestionsResponse = {
        ok: true,
        generatedAt: now.toISOString(),
        totalSuggestions: allSuggestions.length,
        suggestions: allSuggestions,
    };

    return NextResponse.json(response);
}