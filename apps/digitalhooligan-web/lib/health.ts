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