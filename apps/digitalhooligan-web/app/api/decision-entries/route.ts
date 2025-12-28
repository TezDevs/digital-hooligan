import { NextResponse } from "next/server";
import {
  loadDecisionEntries,
  saveDecisionEntries,
  persistDecisionEntry,
} from "@/lib/decisionEntryStore";
import { DecisionEntry } from "@/lib/decisionEntryTypes";

export async function GET() {
  const entries = loadDecisionEntries();
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const body = (await req.json()) as DecisionEntry;

  persistDecisionEntry({
    ...body,
    createdAt: body.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request) {
  const body = (await req.json()) as {
    id: string;
    status: "draft" | "final";
  };

  if (!body?.id || !body?.status) {
    return NextResponse.json(
      { error: "id and status are required" },
      { status: 400 }
    );
  }

  const entries = loadDecisionEntries();
  const index = entries.findIndex((e) => e.id === body.id);

  if (index === -1) {
    return NextResponse.json(
      { error: "DecisionEntry not found" },
      { status: 404 }
    );
  }

  const existing = entries[index];

  const updated: DecisionEntry = {
    ...existing,
    status: body.status,
    updatedAt: new Date().toISOString(),
  };

  entries[index] = updated;
  saveDecisionEntries(entries);

  return NextResponse.json({ ok: true, entry: updated });
}
