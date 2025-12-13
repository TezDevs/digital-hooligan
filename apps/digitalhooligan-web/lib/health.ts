// lib/health.ts
// Shared health helpers used by multiple pages/routes.

export type HealthStatus = "ok" | "slow" | "down";

export type AppHealthStatus = {
    appId: string;
    status: HealthStatus;
    latencyMs: number;
    checkedAt: string;
    message?: string;
};

/**
 * Legacy stub used by existing routes/pages (ex: /api/health/apps, /ceo/performance).
 * Keep this export stable to avoid build breaks.
 */
export function getStubAppHealth(): AppHealthStatus[] {
    const now = new Date().toISOString();

    return [
        { appId: "pennywize", status: "ok", latencyMs: 120, checkedAt: now },
        { appId: "dropsignal", status: "slow", latencyMs: 420, checkedAt: now },
        { appId: "hypewatch", status: "ok", latencyMs: 180, checkedAt: now },
        { appId: "ceo-dashboard", status: "ok", latencyMs: 90, checkedAt: now },
    ];
}

/**
 * New payload for simple uptime/health endpoints (/api/health, /api/ceo/health).
 */
export type HealthPayload = {
    ok: boolean;
    service: string;
    env: string;
    timestamp: string;
    uptimeSec: number;
    version: string | null;
};

export function buildHealthPayload(): HealthPayload {
    const env = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown";
    const version = process.env.VERCEL_GIT_COMMIT_SHA
        ? process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7)
        : null;

    return {
        ok: true,
        service: "digitalhooligan-web",
        env,
        timestamp: new Date().toISOString(),
        uptimeSec: Math.round(process.uptime()),
        version,
    };
}