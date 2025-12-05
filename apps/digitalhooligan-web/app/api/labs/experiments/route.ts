// apps/digitalhooligan-web/app/api/labs/experiments/route.ts

import { NextResponse } from "next/server";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

export const dynamic = "force-dynamic";

type ExperimentStatus = "idea" | "in_progress" | "paused" | "shipped";
type ExperimentPriority = "low" | "medium" | "high";

export type LabsExperiment = {
    id: string;
    name: string;
    description: string;
    appId: string | null;
    appName: string | null;
    status: ExperimentStatus;
    priority: ExperimentPriority;
    owner: string | null;
    tags: string[];
    createdAt: string; // ISO datetime
    targetDate: string | null; // ISO date or null
};

type LabsExperimentsResponse = {
    ok: true;
    type: "labs_experiments";
    experiments: LabsExperiment[];
    timestamp: string;
};

function appNameForId(appId: string | null): string | null {
    if (!appId) return null;
    const app: AppRegistryEntry | undefined = APP_REGISTRY.find(
        (entry) => entry.id === appId,
    );
    return app?.name ?? null;
}

/**
 * Experiments log for Labs HQ.
 *
 * Right now this is a deterministic mock list wired to APP_REGISTRY
 * so you can see which experiments attach to PennyWize, DropSignal,
 * HypeWatch, Ops Toys, etc.
 *
 * Later you can:
 * - Move this into a real DB.
 * - Let AI assistants or Dev Workbench append new experiments here.
 */
export async function GET() {
    const now = new Date().toISOString();

    const experimentsDraft: LabsExperiment[] = [
        {
            id: "exp_pennywize_feed_v1",
            name: "PennyWize market feed v1",
            description:
                "First-pass market feed that pulls basic quotes + news to prove out the signal surface.",
            appId: "pennywize",
            appName: null,
            status: "in_progress",
            priority: "high",
            owner: "Tez",
            tags: ["pennywize", "feed", "market-data"],
            createdAt: "2025-12-05T14:00:00.000Z",
            targetDate: "2025-12-20",
        },
        {
            id: "exp_dropsignal_assist_mode",
            name: "DropSignal assist-mode alerts",
            description:
                "Assist-mode alerts for sneaker / streetwear drops using external sites and manual curation.",
            appId: "dropsignal",
            appName: null,
            status: "idea",
            priority: "medium",
            owner: "Tez",
            tags: ["dropsignal", "assist-mode", "alerts"],
            createdAt: "2025-12-05T15:30:00.000Z",
            targetDate: "2026-01-10",
        },
        {
            id: "exp_hypewatch_collector_beta",
            name: "HypeWatch collector beta",
            description:
                "Tiny closed beta for collectible tracking with 3–5 friendly collectors.",
            appId: "hypewatch",
            appName: null,
            status: "idea",
            priority: "medium",
            owner: "Tez",
            tags: ["hypewatch", "beta"],
            createdAt: "2025-12-04T18:45:00.000Z",
            targetDate: null,
        },
        {
            id: "exp_ops_toys_pipeline_v1",
            name: "Ops Toys pipeline v1",
            description:
                "First internal pipeline that runs small infra / logging automations on a schedule.",
            appId: "ops-toys",
            appName: null,
            status: "in_progress",
            priority: "high",
            owner: "Tez",
            tags: ["ops-toys", "automation", "infra"],
            createdAt: "2025-12-03T20:00:00.000Z",
            targetDate: null,
        },
        {
            id: "exp_ai_ceo_copilot",
            name: "AI-powered CEO Copilot outline",
            description:
                "Outline of how AI Hub + CEO endpoints will work together to propose daily and weekly plans.",
            appId: null,
            appName: null,
            status: "paused",
            priority: "low",
            owner: "Tez",
            tags: ["ai", "ceo", "planning"],
            createdAt: "2025-12-02T17:30:00.000Z",
            targetDate: null,
        },
    ];

    const experiments: LabsExperiment[] = experimentsDraft.map((exp) => ({
        ...exp,
        appName: appNameForId(exp.appId),
    }));

    const payload: LabsExperimentsResponse = {
        ok: true,
        type: "labs_experiments",
        experiments,
        timestamp: now,
    };

    return NextResponse.json(payload);
}