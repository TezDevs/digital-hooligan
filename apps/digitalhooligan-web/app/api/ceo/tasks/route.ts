// apps/digitalhooligan-web/app/api/ceo/tasks/route.ts

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type TaskArea = "product" | "gov" | "admin" | "infra";
type TaskWhen = "today" | "this_week" | "later";
type TaskStatus = "todo" | "in_progress" | "done";

export type CeoTask = {
    id: string;
    title: string;
    description: string;
    area: TaskArea;
    when: TaskWhen;
    status: TaskStatus;
    tags: string[];
};

type TasksResponse = {
    ok: true;
    type: "ceo_tasks";
    tasks: CeoTask[];
    timestamp: string;
};

/**
 * Lightweight mock tasks list for the CEO dashboard.
 *
 * Later this can point at a real DB or external system,
 * but for now it's a typed, deterministic JSON payload
 * that the /ceo/tasks page and CEO Copilot can lean on.
 */
export async function GET() {
    const now = new Date().toISOString();

    const tasks: CeoTask[] = [
        {
            id: "task_finish_ceo_shell",
            title: "Finish CEO dashboard shell + navigation",
            description:
                "Lock in the main /ceo tabs (Overview, Tasks, Deals, Finance, Performance, AI Hub, Dev Workbench, Settings).",
            area: "product",
            when: "today",
            status: "todo",
            tags: ["dashboard", "ui"],
        },
        {
            id: "task_sam_gov_status",
            title: "Check SAM.gov + Navy Federal status",
            description:
                "Confirm SAM.gov entity review + Navy Federal business account status and capture any follow-up actions.",
            area: "gov",
            when: "this_week",
            status: "todo",
            tags: ["gov", "banking"],
        },
        {
            id: "task_outline_mvps",
            title: "Outline PennyWize + DropSignal MVPs",
            description:
                "Write a one-page outline for each MVP: core features, data sources, and what 'shipped' means.",
            area: "product",
            when: "this_week",
            status: "todo",
            tags: ["apps", "roadmap"],
        },
        {
            id: "task_dev_workbench_next",
            title: "Capture Dev Workbench + AI Hub next steps",
            description:
                "List concrete next steps for Dev Workbench, Labs HQ, and AI Hub assistants in a single place.",
            area: "admin",
            when: "this_week",
            status: "todo",
            tags: ["planning", "ai"],
        },
        {
            id: "task_ops_storage",
            title: "Confirm storage + NVMe plan",
            description:
                "Lock in WD / external storage layout for dev assets, repos, and design files.",
            area: "infra",
            when: "later",
            status: "todo",
            tags: ["infra", "storage"],
        },
    ];

    const payload: TasksResponse = {
        ok: true,
        type: "ceo_tasks",
        tasks,
        timestamp: now,
    };

    return NextResponse.json(payload);
}