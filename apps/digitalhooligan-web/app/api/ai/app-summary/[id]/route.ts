// apps/digitalhooligan-web/app/api/ai/app-summary/[id]/route.ts

import { NextResponse } from "next/server";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";
import { getMockMetricValue } from "@/lib/mockMetrics";

type AppSummaryMetrics = {
    users: number | null;
    mrr: number | null;
    uptime: number | null;
    errorsPerMin: number | null;
};

type AppSummarySuccess = {
    ok: true;
    appId: string;
    summary: string;
    app: {
        id: string;
        name: string;
        shortName?: string;
        description: string;
        kind: AppRegistryEntry["kind"];
        lifecycle: AppRegistryEntry["lifecycle"];
        internalOnly?: boolean;
        marketingPath?: string | null;
        ceoPath?: string | null;
        labsPath?: string | null;
        tags?: string[];
    };
    metrics: AppSummaryMetrics;
};

type AppSummaryError = {
    ok: false;
    error: "not_found" | "bad_request" | "internal_error";
    message: string;
};

/**
 * GET /api/ai/app-summary/[id]
 *
 * AI-friendly endpoint that summarizes a single app using APP_REGISTRY + mock metrics.
 *
 * Example:
 *   /api/ai/app-summary/pennywize
 */
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);

        // Example: /api/ai/app-summary/pennywize
        // segments: ["api", "ai", "app-summary", "pennywize"]
        const segments = url.pathname.split("/").filter(Boolean);
        const id = segments[3]; // 0=api,1=ai,2=app-summary,3=<id>

        if (!id) {
            const errorPayload: AppSummaryError = {
                ok: false,
                error: "bad_request",
                message: "Missing app id in route path.",
            };
            return NextResponse.json(errorPayload, { status: 400 });
        }

        const normalizedId = id.trim().toLowerCase();

        const entry = APP_REGISTRY.find(
            (app) => app.id.toLowerCase() === normalizedId,
        );

        if (!entry) {
            const errorPayload: AppSummaryError = {
                ok: false,
                error: "not_found",
                message: `No app found with id "${id}".`,
            };
            return NextResponse.json(errorPayload, { status: 404 });
        }

        // Resolve metrics using the same keys used on /ceo/performance
        const metricsKeys = entry.metricsKeys ?? {};
        const metrics: AppSummaryMetrics = {
            users:
                metricsKeys.users != null
                    ? getMockMetricValue(metricsKeys.users)
                    : null,
            mrr:
                metricsKeys.mrr != null
                    ? getMockMetricValue(metricsKeys.mrr)
                    : null,
            uptime:
                metricsKeys.uptime != null
                    ? getMockMetricValue(metricsKeys.uptime)
                    : null,
            errorsPerMin:
                metricsKeys.errorsPerMin != null
                    ? getMockMetricValue(metricsKeys.errorsPerMin)
                    : null,
        };

        // Build a compact, AI-readable summary sentence
        const lifecycle = entry.lifecycle;
        const lifecycleLabel =
            lifecycle === "live"
                ? "live"
                : lifecycle === "beta"
                    ? "in beta"
                    : lifecycle === "alpha"
                        ? "in alpha"
                        : lifecycle === "building"
                            ? "in active build"
                            : lifecycle === "design"
                                ? "in design"
                                : lifecycle === "idea"
                                    ? "at the idea stage"
                                    : lifecycle === "paused"
                                        ? "paused"
                                        : lifecycle;

        const kindLabel =
            entry.kind === "public-app"
                ? "public app"
                : entry.kind === "internal-tool"
                    ? "internal tool"
                    : entry.kind === "bot"
                        ? "automation bot"
                        : "infra component";

        const audience = entry.internalOnly ? "internal use only" : "user-facing";

        const summaryParts: string[] = [];

        summaryParts.push(
            `${entry.name} is a ${audience} ${kindLabel} that is currently ${lifecycleLabel}.`,
        );
        summaryParts.push(entry.description);

        const metricsBlurbs: string[] = [];

        if (metrics.users != null) {
            metricsBlurbs.push(`${Math.round(metrics.users)} mock users`);
        }
        if (metrics.mrr != null) {
            metricsBlurbs.push(`$${metrics.mrr.toFixed(0)}/mo mock MRR`);
        }
        if (metrics.uptime != null) {
            metricsBlurbs.push(`${metrics.uptime.toFixed(1)}% mock uptime`);
        }
        if (metrics.errorsPerMin != null) {
            metricsBlurbs.push(
                `${metrics.errorsPerMin.toFixed(2)} mock errors per minute`,
            );
        }

        if (metricsBlurbs.length > 0) {
            summaryParts.push(
                `Current mock metrics: ${metricsBlurbs.join(
                    ", ",
                )}. These are placeholders for future real data.`,
            );
        }

        const summary = summaryParts.join(" ");

        const payload: AppSummarySuccess = {
            ok: true,
            appId: entry.id,
            summary,
            app: {
                id: entry.id,
                name: entry.name,
                shortName: entry.shortName,
                description: entry.description,
                kind: entry.kind,
                lifecycle: entry.lifecycle,
                internalOnly: entry.internalOnly,
                marketingPath: entry.marketingPath,
                ceoPath: entry.ceoPath,
                labsPath: entry.labsPath,
                tags: entry.tags,
            },
            metrics,
        };

        return NextResponse.json(payload);
    } catch (err) {
        console.error("Error in GET /api/ai/app-summary/[id]:", err);

        const errorPayload: AppSummaryError = {
            ok: false,
            error: "internal_error",
            message: "Unexpected server error while building app summary.",
        };

        return NextResponse.json(errorPayload, { status: 500 });
    }
}