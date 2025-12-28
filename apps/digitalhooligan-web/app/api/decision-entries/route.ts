import { NextResponse } from "next/server";
import {
  loadDecisionEntries,
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
