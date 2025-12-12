// lib/incidents.ts

export type IncidentSeverity = "critical" | "high" | "medium" | "low";

export type IncidentStatus =
    | "open"
    | "investigating"
    | "mitigated"
    | "resolved"
    | "closed";

export interface Incident {
    id: string;
    appId: string;
    appName: string;
    title: string;
    description: string;
    severity: IncidentSeverity;
    status: IncidentStatus;
    startedAt: string; // ISO date string
    updatedAt: string; // ISO date string
    detectedBy: "monitoring" | "user-report" | "internal";
    impactSummary: string;
    customerImpact: "none" | "minor" | "moderate" | "major";
    links?: {
        type: "runbook" | "postmortem" | "ticket";
        label: string;
        url: string;
    }[];
}

export interface IncidentsSummary {
    total: number;
    open: number;
    investigating: number;
    mitigated: number;
    resolved: number;
    closed: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
}

export interface IncidentsApiResponse {
    incidents: Incident[];
    summary: IncidentsSummary;
    meta: {
        source: "stub" | "live";
        generatedAt: string;
    };
}

/**
 * Stubbed incidents across the Digital Hooligan fleet.
 */
export function getStubIncidents(): Incident[] {
    const now = new Date();
    const hoursAgo = (h: number) =>
        new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();

    return [
        {
            id: "INC-PENNY-001",
            appId: "pennywize",
            appName: "PennyWize",
            title: "Realtime quote feed delay",
            description:
                "Realtime quote ingestion lagged behind upstream provider by ~2–3 minutes.",
            severity: "high",
            status: "resolved",
            startedAt: hoursAgo(12),
            updatedAt: hoursAgo(3),
            detectedBy: "monitoring",
            impactSummary:
                "Some users saw stale prices in the dashboard during active trading hours.",
            customerImpact: "moderate",
            links: [
                {
                    type: "runbook",
                    label: "Feed ingestion runbook",
                    url: "#",
                },
                {
                    type: "postmortem",
                    label: "Postmortem draft",
                    url: "#",
                },
            ],
        },
        {
            id: "INC-DROP-001",
            appId: "dropsignal",
            appName: "DropSignal",
            title: "Webhook delivery failures to partner API",
            description:
                "Outbound webhooks to a sneaker marketplace started failing with 5xx responses.",
            severity: "critical",
            status: "investigating",
            startedAt: hoursAgo(1.5),
            updatedAt: hoursAgo(0.25),
            detectedBy: "monitoring",
            impactSummary:
                "Price-drop alerts to a subset of users are delayed or not delivered.",
            customerImpact: "major",
            links: [
                {
                    type: "ticket",
                    label: "Vendor support ticket",
                    url: "#",
                },
            ],
        },
        {
            id: "INC-HYPE-001",
            appId: "hypewatch",
            appName: "HypeWatch",
            title: "Scheduled maintenance window",
            description:
                "Planned schema migration and index tuning on the primary database.",
            severity: "medium",
            status: "mitigated",
            startedAt: hoursAgo(6),
            updatedAt: hoursAgo(4),
            detectedBy: "internal",
            impactSummary:
                "Read-only mode for part of the maintenance window; new watchlists temporarily disabled.",
            customerImpact: "minor",
            links: [
                {
                    type: "runbook",
                    label: "Maintenance checklist",
                    url: "#",
                },
            ],
        },
        {
            id: "INC-OPS-001",
            appId: "ops-toys",
            appName: "Ops Toys",
            title: "Slow job execution in sandbox environment",
            description:
                "Sandbox jobs for internal automation tools running 3–4x slower than baseline.",
            severity: "low",
            status: "open",
            startedAt: hoursAgo(24),
            updatedAt: hoursAgo(2),
            detectedBy: "user-report",
            impactSummary:
                "Only affects internal experimental jobs, no production customers impacted.",
            customerImpact: "none",
            links: [
                {
                    type: "ticket",
                    label: "Internal issue tracker",
                    url: "#",
                },
            ],
        },
    ];
}

/**
 * Aggregate status + severity counts for a given list of incidents.
 */
export function computeIncidentsSummary(
    incidents: Incident[]
): IncidentsSummary {
    return incidents.reduce<IncidentsSummary>(
        (acc, incident) => {
            acc.total += 1;

            // Status counts
            if (incident.status === "open") acc.open += 1;
            if (incident.status === "investigating") acc.investigating += 1;
            if (incident.status === "mitigated") acc.mitigated += 1;
            if (incident.status === "resolved") acc.resolved += 1;
            if (incident.status === "closed") acc.closed += 1;

            // Severity counts
            if (incident.severity === "critical") acc.critical += 1;
            if (incident.severity === "high") acc.high += 1;
            if (incident.severity === "medium") acc.medium += 1;
            if (incident.severity === "low") acc.low += 1;

            return acc;
        },
        {
            total: 0,
            open: 0,
            investigating: 0,
            mitigated: 0,
            resolved: 0,
            closed: 0,
            critical: 0,
            high: 0,
            medium: 0,
            low: 0,
        }
    );
}

/**
 * Convenience helper for the /api/incidents endpoint.
 */
export function getStubIncidentsApiResponse(): IncidentsApiResponse {
    const incidents = getStubIncidents();
    const summary = computeIncidentsSummary(incidents);
    const generatedAt = new Date().toISOString();

    return {
        incidents,
        summary,
        meta: {
            source: "stub",
            generatedAt,
        },
    };
}