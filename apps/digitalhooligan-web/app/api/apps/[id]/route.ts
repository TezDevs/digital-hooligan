// apps/digitalhooligan-web/app/api/apps/[id]/route.ts

import { NextResponse } from "next/server";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";
import { getMockMetricValue } from "@/lib/mockMetrics";

type AppMetrics = {
    users: number | null;
    mrr: number | null;
    uptime: number | null;
    errorsPerMin: number | null;
};

type AppDetailsSuccess = {
    ok: true;
    app: AppRegistryEntry;
    metrics?: AppMetrics;
};

type AppDetailsError = {
    ok: false;
    error: "not_found" | "bad_request" | "internal_error";
    message: string;
};

/**
 * GET /api/apps/[id]
 *
 * Returns a single app entry from APP_REGISTRY, with optional resolved mock metrics.
 *
 * Query params:
 *   includeMetrics=true  -> attaches a "metrics" object with resolved values
 *
 * Example:
 *   /api/apps/pennywize?includeMetrics=true
 */
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);

        // Example: /api/apps/pennywize -> ["api", "apps", "pennywize"]
        const segments = url.pathname.split("/").filter(Boolean);
        const id = segments[2]; // 0 = "api", 1 = "apps", 2 = "<id>"

        if (!id) {
            const errorPayload: AppDetailsError = {
                ok: false,
                error: "bad_request",
                message: "Missing app id in route path.",
            };
            return NextResponse.json(errorPayload, { status: 400 });
        }

        const normalizedId = id.trim().toLowerCase();

        const app = APP_REGISTRY.find(
            (entry) => entry.id.toLowerCase() === normalizedId,
        );

        if (!app) {
            const errorPayload: AppDetailsError = {
                ok: false,
                error: "not_found",
                message: `No app found with id "${id}".`,
            };

            return NextResponse.json(errorPayload, { status: 404 });
        }

        const includeMetrics = url.searchParams.get("includeMetrics") === "true";

        const basePayload: AppDetailsSuccess = {
            ok: true,
            app,
        };

        if (includeMetrics) {
            const metricsKeys = app.metricsKeys ?? {};

            const metrics: AppMetrics = {
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

            basePayload.metrics = metrics;
        }

        return NextResponse.json(basePayload);
    } catch (err) {
        console.error("Error in GET /api/apps/[id]:", err);

        const errorPayload: AppDetailsError = {
            ok: false,
            error: "internal_error",
            message: "Unexpected server error while resolving app details.",
        };

        return NextResponse.json(errorPayload, { status: 500 });
    }
}