// lib/ceoDashboardData.ts

export type TaskStatus = "INBOX" | "THIS_WEEK" | "IN_PROGRESS" | "BLOCKED" | "DONE";

export type TaskType = "PRODUCT" | "ADMIN" | "OPS" | "SALES" | "LEARNING";

export interface Task {
    id: string;
    title: string;
    type: TaskType;
    status: TaskStatus;
    dueDate?: string; // ISO date
    linkedProductId?: string;
    linkedDealId?: string;
    notes?: string;
}

export type DealType = "GOV" | "FREELANCE" | "PRODUCT" | "PARTNERSHIP";

export type DealStage = "LEAD" | "PROPOSAL" | "NEGOTIATION" | "WON" | "LOST";

export interface Deal {
    id: string;
    name: string;
    type: DealType;
    source: "UPWORK" | "GUN_IO" | "SAM_GOV" | "DIRECT" | "OTHER";
    stage: DealStage;
    expectedValue: number; // in USD for now
    expectedStartDate?: string; // ISO
    probability?: number; // 0–1
    notes?: string;
}

export type ProductStage = "IDEA" | "EXPERIMENT" | "BETA" | "LIVE" | "INTERNAL";

export type ProductHealth = "GREEN" | "YELLOW" | "RED";

export interface Product {
    id: string;
    name: string;
    code: string;
    category: "APP" | "BOT" | "INTERNAL_TOOL" | "SITE";
    stage: ProductStage;
    health: ProductHealth;
    description: string;
    currentFocus?: string;
    nextStep?: string;
}

export interface AdminStatus {
    llcActive: boolean;
    einActive: boolean;
    navyFedStatus: "PENDING" | "ACTIVE" | "NOT_STARTED";
    samStatus: "NOT_STARTED" | "IN_REVIEW" | "ACTIVE";
    vsobStatus: "NOT_STARTED" | "PLANNED" | "ACTIVE";
    upcomingDates: {
        label: string;
        date: string;
    }[];
    riskFlags: string[];
}

export interface DecisionLogEntry {
    id: string;
    date: string; // ISO
    title: string;
    details?: string;
}

// --- Mock data for Day 1 / local dev ---

export const mockProducts: Product[] = [
    {
        id: "prod-pw",
        name: "PennyWize",
        code: "PW",
        category: "APP",
        stage: "EXPERIMENT",
        health: "YELLOW",
        description: "Penny stock intel tool with alerting.",
        currentFocus: "Designing alert v0 and onboarding.",
        nextStep: "Ship first internal alert experiment."
    },
    {
        id: "prod-ds",
        name: "DropSignal",
        code: "DS",
        category: "BOT",
        stage: "IDEA",
        health: "YELLOW",
        description: "Sneaker & streetwear price-drop alerts.",
        currentFocus: "Locking in assist-mode flow.",
        nextStep: "Define MVP sources and alert triggers."
    },
    {
        id: "prod-hw",
        name: "HypeWatch",
        code: "HW",
        category: "BOT",
        stage: "IDEA",
        health: "GREEN",
        description: "Collectibles & hype asset price watcher.",
        currentFocus: "Clarify collectibles scope.",
        nextStep: "Draft initial product spec."
    },
    {
        id: "prod-ops",
        name: "Ops Toys",
        code: "OPS",
        category: "INTERNAL_TOOL",
        stage: "INTERNAL",
        health: "GREEN",
        description: "Infra, logging & workflow toys.",
        currentFocus: "Define first infra & logging helpers.",
        nextStep: "Wire basic logging view into Ops HQ."
    },
    {
        id: "prod-web",
        name: "Digital Hooligan Site",
        code: "WEB",
        category: "SITE",
        stage: "LIVE",
        health: "GREEN",
        description: "Public-facing site & brand hub.",
        currentFocus: "Polish gov & enterprise story.",
        nextStep: "Add dedicated gov services page."
    }
];

export const mockDeals: Deal[] = [
    {
        id: "deal-sam-bot-pilot",
        name: "SAM.gov bot pilot",
        type: "GOV",
        source: "SAM_GOV",
        stage: "PROPOSAL",
        expectedValue: 8000,
        expectedStartDate: "2026-02-10",
        probability: 0.4,
        notes: "Simple MVP focused on NAICS 541511 opportunities."
    },
    {
        id: "deal-upwork-retainer",
        name: "Upwork startup retainer",
        type: "FREELANCE",
        source: "UPWORK",
        stage: "NEGOTIATION",
        expectedValue: 5000,
        expectedStartDate: "2026-01-15",
        probability: 0.6,
        notes: "Dashboard + automation work."
    },
    {
        id: "deal-gunio-build",
        name: "Gun.io dashboard build",
        type: "FREELANCE",
        source: "GUN_IO",
        stage: "LEAD",
        expectedValue: 3000,
        probability: 0.3
    },
    {
        id: "deal-pw-mvp",
        name: "PennyWize paid MVP",
        type: "PRODUCT",
        source: "DIRECT",
        stage: "WON",
        expectedValue: 1200,
        expectedStartDate: "2025-12-15",
        probability: 1,
        notes: "First paid batch of early users."
    }
];

export const mockTasks: Task[] = [
    {
        id: "task-ship-pw-v0",
        title: "Ship PennyWize alert v0",
        type: "PRODUCT",
        status: "IN_PROGRESS",
        dueDate: "2025-12-10",
        linkedProductId: "prod-pw",
        notes: "Internal-only for now."
    },
    {
        id: "task-navyfed-docs",
        title: "Complete Navy Federal business docs",
        type: "ADMIN",
        status: "THIS_WEEK",
        dueDate: "2025-12-07"
    },
    {
        id: "task-sam-routine",
        title: "Define SAM.gov search & tagging routine",
        type: "SALES",
        status: "THIS_WEEK",
        dueDate: "2025-12-08"
    },
    {
        id: "task-hero-copy",
        title: "Refine hero + gov services messaging",
        type: "PRODUCT",
        status: "INBOX"
    },
    {
        id: "task-log-setup",
        title: "Decide initial logging target (Vercel / external)",
        type: "OPS",
        status: "INBOX"
    },
    {
        id: "task-llc-done",
        title: "LLC registered",
        type: "ADMIN",
        status: "DONE",
        dueDate: "2025-11-29"
    }
];

export const mockAdminStatus: AdminStatus = {
    llcActive: true,
    einActive: true,
    navyFedStatus: "PENDING",
    samStatus: "IN_REVIEW",
    vsobStatus: "PLANNED",
    upcomingDates: [
        {
            label: "SAM.gov recheck",
            date: "2025-12-20"
        },
        {
            label: "State annual report (est)",
            date: "2026-01-15"
        },
        {
            label: "Q1 estimated taxes (placeholder)",
            date: "2026-04-15"
        }
    ],
    riskFlags: [
        "SAM.gov still under review.",
        "Navy Federal business account pending.",
        "Runway assumptions not yet formalized."
    ]
};

export const mockDecisions: DecisionLogEntry[] = [
    {
        id: "dec-naics-541511",
        date: "2025-12-01",
        title: "Selected NAICS 541511 as primary code",
        details: "Focus on custom software / web app development with gov potential."
    },
    {
        id: "dec-gov-focus",
        date: "2025-12-02",
        title: "Commit to gov + product dual track",
        details: "Immediate gov pursuit plus apps/bots roadmap (PennyWize, DropSignal, HypeWatch)."
    },
    {
        id: "dec-ops-labs-split",
        date: "2025-12-03",
        title: "Split Ops HQ and Labs HQ",
        details: "Ops HQ for infra/logging; Labs HQ for experiments and app ideas."
    }
];

// --- Simple helpers for the dashboard ---

export function getRevenueLast30Days(): number {
    // Placeholder until real data; keeps UI wired.
    return 12300;
}

export function getActiveProjectsCount(products: Product[]): number {
    return products.filter((p) => p.stage === "EXPERIMENT" || p.stage === "BETA" || p.stage === "LIVE" || p.stage === "INTERNAL").length;
}

export function getOpenDealsCount(deals: Deal[]): number {
    return deals.filter((d) => d.stage !== "WON" && d.stage !== "LOST").length;
}

export function getTasksDueToday(tasks: Task[], todayIso: string): number {
    return tasks.filter((t) => t.dueDate === todayIso && t.status !== "DONE").length;
}

export function getTopFocusTasks(tasks: Task[], limit = 3): Task[] {
    const now = new Date();
    const scored = tasks
        .filter((t) => t.status !== "DONE")
        .map((t) => {
            const due = t.dueDate ? new Date(t.dueDate) : null;
            let score = 0;

            // Admin + Sales slightly higher by default
            if (t.type === "ADMIN" || t.type === "SALES") score += 2;

            // Sooner due date = higher score
            if (due) {
                const diffDays = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
                if (diffDays <= 0) score += 5; // overdue / today
                else if (diffDays <= 3) score += 3;
                else if (diffDays <= 7) score += 1;
            }

            // Status bump
            if (t.status === "IN_PROGRESS") score += 3;
            if (t.status === "THIS_WEEK") score += 1;

            return { task: t, score };
        })
        .sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map((s) => s.task);
}

export function groupDealsByStage(deals: Deal[]): Record<DealStage, Deal[]> {
    return deals.reduce(
        (acc, deal) => {
            acc[deal.stage].push(deal);
            return acc;
        },
        {
            LEAD: [] as Deal[],
            PROPOSAL: [] as Deal[],
            NEGOTIATION: [] as Deal[],
            WON: [] as Deal[],
            LOST: [] as Deal[]
        }
    );
}

export function calculatePipelineValue(deals: Deal[]): number {
    return deals
        .filter((d) => d.stage !== "WON" && d.stage !== "LOST")
        .reduce((sum, deal) => {
            const prob = deal.probability ?? 0.5;
            return sum + deal.expectedValue * prob;
        }, 0);
}