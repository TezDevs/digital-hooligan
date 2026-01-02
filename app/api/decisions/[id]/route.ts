import { NextResponse } from "next/server";

type Decision = {
  id: string;
  title: string;
  state: "draft" | "review" | "approved" | "rejected";
  confidence: number;
  updatedAt: string;
};

const DECISIONS: Decision[] = [
  {
    id: "decision-local-001",
    title: "Vendor Selection",
    state: "draft",
    confidence: 0.42,
    updatedAt: "2025-01-01T12:00:00Z",
  },
  {
    id: "decision-local-002",
    title: "Infra Migration",
    state: "review",
    confidence: 0.68,
    updatedAt: "2025-01-02T09:30:00Z",
  },
];

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // ✅ REQUIRED

  const decision = DECISIONS.find((d) => d.id === id);

  if (!decision) {
    return NextResponse.json({ error: "Decision not found" }, { status: 404 });
  }

  return NextResponse.json(decision, { status: 200 });
}
