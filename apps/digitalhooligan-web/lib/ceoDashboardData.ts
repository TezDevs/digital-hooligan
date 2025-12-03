// lib/ceoDashboardData.ts

// --- Types ---

export type TaskStatus =
    | "INBOX"
    | "THIS_WEEK"
    | "IN_PROGRESS"
    | "BLOCKED"
    | "DONE";

export type TaskType = "ADMIN" | "PRODUCT" | "SALES" | "OPS" | "FINANCE";

export interface Task {
    id: string;
    title: string;
    type: TaskType;
    status: TaskStatus;
    dueDate?: string; // YYYY-MM-DD
    notes?: string;
    priority?: "LOW" | "MEDIUM" | "HIGH";
}

export type DealStage = "LEAD" | "PROPOSAL" | "NEGOTIATION" | "WON";

export interface Deal {
    id: string;
    name: string;
    stage: DealStage;
    value: number;
    source: "GOV" | "FREELANCE" | "DIRECT";
    probability: number; // 0–1
}

export interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    stage: "IDEA" | "BUILDING" | "LAUNCHED" | "ON_HOLD";
    health: "GREEN" | "YELLOW" | "RED";
    currentFocus?: string;
    nextStep?: string;
}

export interface AdminStatus {
    llcActive: boolean;
    einActive: boolean;
    navyFedStatus: "ACTIVE" | "PENDING" | "NOT_STARTED";
    samStatus: "ACTIVE" | "IN_REVIEW" | "NOT_STARTED";
    vsobStatus: "ACTIVE" | "PLANNED" | "NOT_STARTED";
    upcomingDates: { label: string; date: string }[];
    riskFlags: string[];
}

export interface DecisionEntry {
    id: string;
    date: string;
    title: string;
    details?: string;
}

// --- Mock data ---

export const mockProducts: Product[] = [
    {
        id: "pennywize",
        code: "PW",
        name: "PennyWize",
        description: "Penny stock intel + alerts with future social layer around the data.",
        stage: "BUILDING",
        health: "GREEN",
        currentFocus: "Landing page + data model",
        nextStep: "Scraper prototype + alert pipeline"
    },
    {
        id: "dropsignal",
        code: "DS",
        name: "DropSignal",
        description:
            "Sneaker & streetwear price-drop bot (assist mode first, grown-up add-to-cart later).",
        stage: "BUILDING",
        health: "YELLOW",
        currentFocus: "Retailer integrations + roadmap copy",
        nextStep: "MVP alert rules for top retailers"
    },
    {
        id: "hypewatch",
        code: "HW",
        name: "HypeWatch",
        description:
            "Collectibles & display pieces price tracker (cards, figures, magazines, watches).",
        stage: "IDEA",
        health: "YELLOW",
        currentFocus: "Clarify niche vs DropSignal",
        nextStep: "Wireframe monitoring views"
    },
    {
        id: "ops-toys",
        code: "OT",
        name: "Ops Toys",
        description:
            "Internal drawer of infra, logging, and dev workflow automation tools for DH.",
        stage: "BUILDING",
        health: "GREEN",
        currentFocus: "Define automation inventory",
        nextStep: "Prioritize 1–2 toys for MVP"
    }
];

export const mockTasks: Task[] = [
    {
        id: "t-1",
        title: "Finish CEO dashboard shell + navigation",
        type: "PRODUCT",
        status: "IN_PROGRESS",
        dueDate: "2025-12-05",
        notes: "Main snapshot, tasks, pipeline, admin snapshot."
    },
    {
        id: "t-2",
        title: "Navy Federal business account follow-up",
        type: "ADMIN",
        status: "THIS_WEEK",
        dueDate: "2025-12-06",
        notes: "Check approval status and confirm limits.",
        priority: "HIGH"
    },
    {
        id: "t-3",
        title: "SAM.gov entity review + documentation",
        type: "ADMIN",
        status: "INBOX",
        notes: "Capture notes on NAICS, UEI and renewal schedule."
    },
    {
        id: "t-4",
        title: "Define PennyWize MVP feature list",
        type: "PRODUCT",
        status: "THIS_WEEK",
        dueDate: "2025-12-07",
        notes: "Focus on scraper + alerts; social later."
    },
    {
        id: "t-5",
        title: "Map revenue model across apps + freelance",
        type: "FINANCE",
        status: "IN_PROGRESS",
        notes: "Gov contracts, Gun.io, Upwork, direct clients."
    },
    {
        id: "t-6",
        title: "Ops Toys: shortlist internal automations",
        type: "OPS",
        status: "INBOX",
        notes: "Logging, deploy helpers, health checks."
    },
    {
        id: "t-7",
        title: "Write /privacy and /terms pass 1",
        type: "ADMIN",
        status: "BLOCKED",
        notes: "Waiting on final product wording and data flows.",
        priority: "MEDIUM"
    },
    {
        id: "t-8",
        title: "Outline AI assistant capabilities",
        type: "PRODUCT",
        status: "DONE",
        notes: "Strategy, ops, code refactor, gov bid support."
    }
];

export const mockDeals: Deal[] = [
    {
        id: "d-1",
        name: "Small SAM.gov web/app modernization",
        stage: "LEAD",
        value: 15000,
        source: "GOV",
        probability: 0.25
    },
    {
        id: "d-2",
        name: "Gun.io senior engineer slot",
        stage: "PROPOSAL",
        value: 28000,
        source: "FREELANCE",
        probability: 0.5
    },
    {
        id: "d-3",
        name: "Upwork booking-style app build",
        stage: "NEGOTIATION",
        value: 18000,
        source: "FREELANCE",
        probability: 0.6
    },
    {
        id: "d-4",
        name: "Direct client: internal dashboard",
        stage: "WON",
        value: 12000,
        source: "DIRECT",
        probability: 1
    }
];

export const mockAdminStatus: AdminStatus = {
    llcActive: true,
    einActive: true,
    navyFedStatus: "PENDING",
    samStatus: "IN_REVIEW",
    vsobStatus: "PLANNED",
    upcomingDates: [
        { label: "SAM.gov follow-up", date: "2025-12-10" },
        { label: "Navy Federal review", date: "2025-12-12" }
    ],
    riskFlags: ["SAM.gov still in review", "Navy Federal account pending approval"]
};

export const mockDecisions: DecisionEntry[] = [
    {
        id: "dec-1",
        date: "2025-11-30",
        title: "Registered Digital Hooligan LLC and committed to gov work track.",
        details:
            "Set NAICS focus around 541511 with flexibility to expand as brand grows."
    },
    {
        id: "dec-2",
        date: "2025-12-01",
        title: "Chose CEO dashboard as core internal product.",
        details:
            "Dashboard will be the control center for apps, revenue streams, and admin status."
    },
    {
        id: "dec-3",
        date: "2025-12-02",
        title: "Planned multi-stream revenue: apps, bots, freelance, and contracts.",
        details:
            "Short/medium-term focus on small contracts and freelance while apps ramp up."
    }
];

// --- Helpers used by CEO dashboard ---

export function getRevenueLast30Days(): number {
    // Placeholder: future version will pull from Stripe / accounting APIs
    return 4200;
}

export function getActiveProjectsCount(products: Product[]): number {
    return products.filter(
        (p) => p.stage === "BUILDING" || p.stage === "LAUNCHED"
    ).length;
}

export function getOpenDealsCount(deals: Deal[]): number {
    return deals.filter((d) => d.stage !== "WON").length;
}

export function getTasksDueToday(tasks: Task[], todayIso: string): number {
    return tasks.filter((t) => t.dueDate === todayIso).length;
}

export function getTopFocusTasks(tasks: Task[]): Task[] {
    // Simple heuristic: show a mix of in-progress and this-week items
    const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS");
    const thisWeek = tasks.filter((t) => t.status === "THIS_WEEK");
    const inbox = tasks.filter((t) => t.status === "INBOX");

    const combined = [...inProgress, ...thisWeek, ...inbox];
    const unique: Task[] = [];
    const seen = new Set<string>();

    for (const t of combined) {
        if (!seen.has(t.id)) {
            seen.add(t.id);
            unique.push(t);
        }
        if (unique.length >= 4) break;
    }

    return unique;
}

export function groupDealsByStage(
    deals: Deal[]
): Record<DealStage, Deal[]> {
    return {
        LEAD: deals.filter((d) => d.stage === "LEAD"),
        PROPOSAL: deals.filter((d) => d.stage === "PROPOSAL"),
        NEGOTIATION: deals.filter((d) => d.stage === "NEGOTIATION"),
        WON: deals.filter((d) => d.stage === "WON")
    };
}

export function calculatePipelineValue(deals: Deal[]): number {
    return deals.reduce(
        (sum, deal) => sum + deal.value * deal.probability,
        0
    );
}

// --- New helper for /ceo/tasks ---

export function groupTasksByStatus(
    tasks: Task[]
): Record<TaskStatus, Task[]> {
    return {
        INBOX: tasks.filter((t) => t.status === "INBOX"),
        THIS_WEEK: tasks.filter((t) => t.status === "THIS_WEEK"),
        IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
        BLOCKED: tasks.filter((t) => t.status === "BLOCKED"),
        DONE: tasks.filter((t) => t.status === "DONE")
    };
}