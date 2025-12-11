// lib/health.ts

export type HealthStatus = "healthy" | "degraded" | "down" | "maintenance";

export type AppEnvironment = "prod" | "staging" | "dev";

export interface AppHealthStatus {
    id: string;
    name: string;
    slug: string;
    status: HealthStatus;
    env: AppEnvironment;
    regions: string[];
    uptime7d: number; // 0–100 (%)
    uptime30d: number; // 0–100 (%)
    latencyP50Ms: number | null;
    latencyP95Ms: number | null;
    incidentsOpen: number;
    lastIncidentAt: string | null; // ISO string
    lastDeploymentAt: string | null; // ISO string
    lastCheckedAt: string; // ISO string
}

export interface HealthApiResponse {
    apps: AppHealthStatus[];
    meta: {
        source: "stub" | "live";
        generatedAt: string;
    };
}

// 🔧 For now this is hard-coded. Later, this can be fed from a DB, queue, or
// external monitoring provider.
export function getStubAppHealth(): HealthApiResponse {
    const now = new Date().toISOString();

    const apps: AppHealthStatus[] = [
        {
            id: "pennywize",
            name: "PennyWize",
            slug: "pennywize",
            status: "healthy",
            env: "prod",
            regions: ["us-east-1"],
            uptime7d: 99.95,
            uptime30d: 99.9,
            latencyP50Ms: 120,
            latencyP95Ms: 280,
            incidentsOpen: 0,
            lastIncidentAt: null,
            lastDeploymentAt: now,
            lastCheckedAt: now,
        },
        {
            id: "dropsignal",
            name: "DropSignal",
            slug: "dropsignal",
            status: "degraded",
            env: "staging",
            regions: ["us-east-1", "eu-west-1"],
            uptime7d: 97.8,
            uptime30d: 98.3,
            latencyP50Ms: 210,
            latencyP95Ms: 480,
            incidentsOpen: 1,
            lastIncidentAt: now,
            lastDeploymentAt: now,
            lastCheckedAt: now,
        },
        {
            id: "hypewatch",
            name: "HypeWatch",
            slug: "hypewatch",
            status: "maintenance",
            env: "dev",
            regions: ["us-east-1"],
            uptime7d: 100,
            uptime30d: 100,
            latencyP50Ms: null,
            latencyP95Ms: null,
            incidentsOpen: 0,
            lastIncidentAt: null,
            lastDeploymentAt: null,
            lastCheckedAt: now,
        },
        {
            id: "ops-toys",
            name: "Ops Toys",
            slug: "ops-toys",
            status: "healthy",
            env: "dev",
            regions: ["us-east-1"],
            uptime7d: 99.0,
            uptime30d: 98.7,
            latencyP50Ms: 95,
            latencyP95Ms: 190,
            incidentsOpen: 0,
            lastIncidentAt: null,
            lastDeploymentAt: now,
            lastCheckedAt: now,
        },
    ];

    return {
        apps,
        meta: {
            source: "stub",
            generatedAt: now,
        },
    };
}