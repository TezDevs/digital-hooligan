// apps/digitalhooligan-web/app/api/ceo/finance/route.ts

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RevenueStream = "gov" | "freelance" | "product";

type FinanceStream = {
    stream: RevenueStream;
    label: string;
    mrrUsd: number;
    notes: string;
};

type FinanceResponse = {
    ok: true;
    type: "ceo_finance_summary";
    mrrEstimateUsd: number;
    arrEstimateUsd: number;
    cashOnHandUsd: number | null;
    runwayMonthsEstimate: number | null;
    streams: FinanceStream[];
    timestamp: string;
};

/**
 * Lightweight finance snapshot for the CEO dashboard.
 *
 * Numbers here are intentional rough guesses that can
 * later be wired to real Stripe / bank / accounting data.
 */
export async function GET() {
    const now = new Date().toISOString();

    // Match the Money card on /ceo: $4,250 est. MRR
    const mrrEstimateUsd = 4250;

    const streams: FinanceStream[] = [
        {
            stream: "gov",
            label: "Gov / contracts",
            mrrUsd: 2000,
            notes: "Assumes 1–2 small remote contracts under NAICS 541511.",
        },
        {
            stream: "freelance",
            label: "Freelance platforms",
            mrrUsd: 1250,
            notes: "Toptal / Gun.io / Upwork style engagements in your lane.",
        },
        {
            stream: "product",
            label: "Products & apps",
            mrrUsd: 1000,
            notes:
                "Early subscriptions and licenses for PennyWize, DropSignal, and future tools.",
        },
    ];

    const arrEstimateUsd = mrrEstimateUsd * 12;

    // For now, keep these null to signal “not wired yet”
    const cashOnHandUsd: number | null = null;
    const runwayMonthsEstimate: number | null = null;

    const payload: FinanceResponse = {
        ok: true,
        type: "ceo_finance_summary",
        mrrEstimateUsd,
        arrEstimateUsd,
        cashOnHandUsd,
        runwayMonthsEstimate,
        streams,
        timestamp: now,
    };

    return NextResponse.json(payload);
}