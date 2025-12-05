// apps/digitalhooligan-web/app/api/ceo/notes/route.ts

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type NoteArea = "product" | "gov" | "admin" | "infra";
type NoteKind = "decision" | "note";

export type CeoNote = {
    id: string;
    kind: NoteKind;
    title: string;
    body: string;
    area: NoteArea;
    createdAt: string; // ISO datetime
    tags: string[];
};

type NotesResponse = {
    ok: true;
    type: "ceo_notes";
    notes: CeoNote[];
    timestamp: string;
};

/**
 * Lightweight notes / decisions log for the CEO dashboard.
 *
 * Right now this is a deterministic mock list. Later you can:
 * - Wire it to a real DB or Notion doc.
 * - Let AI assistants append decisions here.
 */
export async function GET() {
    const now = new Date().toISOString();

    const notes: CeoNote[] = [
        {
            id: "note_ceo_shell",
            kind: "decision",
            title: "Lock in CEO dashboard shell + API-first approach",
            body:
                "Decided that all CEO views (Overview, Tasks, Deals, Finance, Performance, AI Hub, Dev Workbench) should be backed by typed /api/ceo/* endpoints instead of hard-coded UI.",
            area: "product",
            createdAt: "2025-12-05T15:00:00.000Z",
            tags: ["dashboard", "api-first"],
        },
        {
            id: "note_registry_health",
            kind: "decision",
            title: "Use APP_REGISTRY + /api/health/apps as the portfolio source of truth",
            body:
                "Chose to keep all apps/bots in a single typed APP_REGISTRY, with /api/health/apps feeding CEO, Labs, Dev Workbench, and future AI assistants.",
            area: "infra",
            createdAt: "2025-12-05T16:00:00.000Z",
            tags: ["registry", "wiring"],
        },
        {
            id: "note_hardware_stack",
            kind: "note",
            title: "Confirmed Minisforum AI X1 Pro as future lab machine",
            body:
                "Captured the decision to bring in a Minisforum AI X1 Pro as a low-power lab / experiment box to run agents, bots, and metrics adapters.",
            area: "infra",
            createdAt: "2025-12-04T20:30:00.000Z",
            tags: ["hardware", "labs"],
        },
        {
            id: "note_gov_focus",
            kind: "note",
            title: "Stay pointed at NAICS 541511-friendly gov work",
            body:
                "Reaffirmed that Digital Hooligan will target remote-friendly, startup-sized software contracts under NAICS 541511 while apps ramp up.",
            area: "gov",
            createdAt: "2025-12-03T18:15:00.000Z",
            tags: ["gov", "strategy"],
        },
    ];

    const payload: NotesResponse = {
        ok: true,
        type: "ceo_notes",
        notes,
        timestamp: now,
    };

    return NextResponse.json(payload);
}