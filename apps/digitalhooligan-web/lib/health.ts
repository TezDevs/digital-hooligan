export type HealthStatus =
    | "healthy"
    | "degraded"
    | "down"
    | "maintenance"
    // legacy synonyms (safe to keep)
    | "ok"
    | "slow";

export type AppHealthStatus = {
    appId: string;
    status: HealthStatus;
    latencyMs: number;
    checkedAt: string;
    message?: string;
};

export type AppHealthMeta = {
    source: "stub" | "live";
    generatedAt: string;
};

export type StubAppHealthSnapshot = {
    apps: AppHealthStatus[];
    meta: AppHealthMeta;
};

export function getStubAppHealth(): StubAppHealthSnapshot {
    const now = new Date().toISOString();

    return {
        apps: [
            { appId: "pennywize", status: "healthy", latencyMs: 120, checkedAt: now },
            { appId: "dropsignal", status: "degraded", latencyMs: 420, checkedAt: now },
            {
                appId: "hypewatch",
                status: "maintenance",
                latencyMs: 0,
                checkedAt: now,
                message: "Planned maintenance window",
            },
            { appId: "ceo-dashboard", status: "healthy", latencyMs: 90, checkedAt: now },
        ],
        meta: { source: "stub", generatedAt: now },
    };
}

// If any routes use a simple health payload, keep this here too.
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