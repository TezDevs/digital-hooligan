// apps/digitalhooligan-web/app/api/ai/weekly-plan/route.ts

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type WeeklyPlanSection = {
    id: string;
    title: string;
    summary: string;
    items: string[];
    area: "product" | "gov" | "admin" | "infra" | "labs";
};

export type WeeklyPlanResponse = {
    ok: true;
    type: "ai_weekly_plan";
    headline: string;
    timeframeLabel: string;
    sections: WeeklyPlanSection[];
    suggestedFocus: string[];
    timestamp: string;
};

/**
 * AI Hub "weekly plan" assistant.
 *
 * For now this is a deterministic snapshot that pretends an assistant
 * has looked at tasks, deals, finance, notes, and lab experiments.
 *
 * Later we can:
 * - Pull in data from /api/ceo/tasks, /api/ceo/deals, /api/ceo/finance,
 *   /api/ceo/notes, /api/labs/experiments, etc.
 * - Call a real LLM and return its structured plan.
 */
export async function GET() {
    const now = new Date().toISOString();

    const sections: WeeklyPlanSection[] = [
        {
            id: "product_pennywize_dropsignal",
            title: "Products: PennyWize + DropSignal",
            summary:
                "Get one of the core apps to a simple but coherent MVP so you can show real demos and tighten the story.",
            items: [
                "Lock a tiny MVP scope for PennyWize (inputs, alerts, 1–2 outputs).",
                "Write down 3 concrete DropSignal assist-mode scenarios you want to support first.",
                "Sketch how user feeds / social later plug into those flows instead of building them now.",
            ],
            area: "product",
        },
        {
            id: "gov_pipeline",
            title: "Gov pipeline: keep the small, remote-friendly deals warm",
            summary:
                "You don’t need a huge contract yet, but you do want a trickle of gov-friendly work to validate NAICS 541511 and build past performance.",
            items: [
                "Review SAM.gov saved searches and star 3 opportunities that match your stack + remote constraints.",
                "Draft a lightweight response template you can reuse (problem, approach, tech stack, timeline).",
                "Confirm Navy Federal + EIN paperwork status so you're contract-ready on paper.",
            ],
            area: "gov",
        },
        {
            id: "admin_dashboard",
            title: "Admin: tighten CEO dashboard + metrics wiring",
            summary:
                "Your internal dashboards are almost a superpower. A bit more wiring can make them your default command center.",
            items: [
                "Click through each CEO tab (Overview, Finance, Performance, AI Hub) and note any missing data or dead ends.",
                "List 3 metrics you actually care about week-to-week (MRR, runway, active experiments, etc.).",
                "Capture 2–3 key decisions in the Notes & decisions card so future you remembers why you chose this path.",
            ],
            area: "admin",
        },
        {
            id: "labs_experiments",
            title: "Labs: move one experiment from 'idea' to 'in progress'",
            summary:
                "Labs HQ is now a real board. Use it to move at least one experiment forward instead of letting everything stay in 'idea' mode.",
            items: [
                "Pick one Labs experiment (e.g., PennyWize market feed v1) and mark it as the primary build thread.",
                "Define what 'done' means for that experiment in one short paragraph.",
                "Create a tiny checklist for that experiment and pin it where you’ll see it during build sessions.",
            ],
            area: "labs",
        },
        {
            id: "infra_routine",
            title: "Infra: protect your focus with simple routines",
            summary:
                "You now have multiple machines, repos, and dashboards. A light routine will keep them from becoming chaos.",
            items: [
                "Set a recurring 15–20 minute weekly 'infra sweep' to check logs, backups, and basic health.",
                "Document the Day 1 dev environment steps in a short README so future hardware is plug-and-play.",
                "Decide which machine is 'HQ' vs. 'travel dev' and write that down in your notes.",
            ],
            area: "infra",
        },
    ];

    const suggestedFocus: string[] = [
        "Ship one tiny PennyWize or DropSignal MVP slice this week.",
        "Choose exactly one Labs experiment as the current build thread.",
        "Keep 1–2 small gov / freelance opportunities warm without overcommitting.",
    ];

    const response: WeeklyPlanResponse = {
        ok: true,
        type: "ai_weekly_plan",
        headline: "A calm, focused week across product, gov, and labs.",
        timeframeLabel: "This week",
        sections,
        suggestedFocus,
        timestamp: now,
    };

    return NextResponse.json(response);
}