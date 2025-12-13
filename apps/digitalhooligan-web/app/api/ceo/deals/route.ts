// apps/digitalhooligan-web/app/api/ceo/deals/route.ts

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type DealKind = "gov" | "freelance" | "product";
type DealStage = "idea" | "prospect" | "proposal" | "negotiation" | "won" | "parked";

export type CeoDeal = {
    id: string;
    title: string;
    description: string;
    kind: DealKind;
    stage: DealStage;
    estValueUsd: number | null; // null when it’s too fuzzy
    targetDate: string | null; // ISO date string or null
    tags: string[];
};

type DealsResponse = {
    ok: true;
    type: "ceo_deals";
    deals: CeoDeal[];
    timestamp: string;
};

/**
 * Mock deals pipeline for the CEO dashboard.
 *
 * Later this can be driven by a real CRM or database.
 * For now it’s a typed JSON payload that /ceo/deals,
 * CEO Copilot, and AI Hub can all consume.
 */
export async function GET() {
    const now = new Date().toISOString();

    const deals: CeoDeal[] = [
        {
            id: "deal_gov_small_contracts",
            title: "Small NAICS 541511 startup-friendly contracts",
            description:
                "Scan SAM.gov for 1–2 small software dev contracts that fit Digital Hooligan’s size and skills.",
            kind: "gov",
            stage: "prospect",
            estValueUsd: null,
            targetDate: null,
            tags: ["sam.gov", "research"],
        },
        {
            id: "deal_gov_profile_ready",
            title: "Gov + enterprise services profile",
            description:
                "Finish the gov/enterprise services page + capabilities deck so you can respond quickly to RFQs.",
            kind: "gov",
            stage: "proposal",
            estValueUsd: 10000,
            targetDate: null,
            tags: ["branding", "capabilities"],
        },
        {
            id: "deal_freelance_platform",
            title: "Freelance platform entry (Toptal / Gun.io / Upwork)",
            description:
                "Finalize one primary platform profile to start bringing in remote dev / PM work that fits your lane.",
            kind: "freelance",
            stage: "prospect",
            estValueUsd: 25000,
            targetDate: null,
            tags: ["freelance", "pipeline"],
        },
        {
            id: "deal_product_pennywize_mvp",
            title: "PennyWize MVP subscriptions",
            description:
                "Launch a small private beta for PennyWize and validate a starter subscription tier.",
            kind: "product",
            stage: "idea",
            estValueUsd: 5000,
            targetDate: null,
            tags: ["product", "beta"],
        },
        {
            id: "deal_product_dropsignal_assist",
            title: "DropSignal assist-mode launch",
            description:
                "Ship assist-mode alerts for DropSignal and line up 3–5 early users from sneaker / streetwear circles.",
            kind: "product",
            stage: "idea",
            estValueUsd: 3000,
            targetDate: null,
            tags: ["product", "assist-mode"],
        },
    ];

    const payload: DealsResponse = {
        ok: true,
        type: "ceo_deals",
        deals,
        timestamp: now,
    };

    return NextResponse.json(payload);
}