// apps/digitalhooligan-web/app/api/labs/experiments/route.ts

import { NextResponse } from "next/server";
import type { AppId } from "@/lib/appRegistry";

export const dynamic = "force-dynamic";

type ExperimentStatus = "idea" | "planned" | "running" | "completed" | "paused";

type Experiment = {
    id: string;
    appId: AppId | null;
    title: string;
    summary: string;
    status: ExperimentStatus;
    impact: "low" | "medium" | "high";
    createdAt: string; // ISO
    updatedAt: string; // ISO
    tags?: string[];
};

// Simple seed data – mirrors the Labs Experiments view.
const SEED_EXPERIMENTS: Experiment[] = [
    {
        id: "exp_pennywize_market_feed",
        appId: "pennywize",
        title: "PennyWize market feed",
        summary:
            "First-pass market feed that pulls basic quotes + news to prove out the app concept.",
        status: "running",
        impact: "high",
        createdAt: "2025-12-05T14:00:00.000Z",
        updatedAt: "2025-12-06T12:00:00.000Z",
        tags: ["pennywize", "feed", "market-data"],
    },
    {
        id: "exp_dropsignal_assist_mode",
        appId: "dropsignal",
        title: "DropSignal assist-mode alerts",
        summary:
            "Assist-mode alerts for sneaker / streetwear drops using external sites as sources.",
        status: "idea",
        impact: "medium",
        createdAt: "2025-12-05T15:30:00.000Z",
        updatedAt: "2025-12-06T10:00:00.000Z",
        tags: ["dropsignal", "assist-mode", "alerts"],
    },
    {
        id: "exp_hypewatch_collector_beta",
        appId: "hypewatch",
        title: "HypeWatch collector beta",
        summary:
            "Tiny closed beta for collectible tracking with a few friendly collectors.",
        status: "planned",
        impact: "medium",
        createdAt: "2025-12-06T10:00:00.000Z",
        updatedAt: "2025-12-06T10:00:00.000Z",
        tags: ["hypewatch", "collectibles", "beta"],
    },
];

export async function GET() {
    return NextResponse.json({
        ok: true,
        items: SEED_EXPERIMENTS,
    });
}