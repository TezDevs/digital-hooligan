import { NextResponse } from "next/server";
import { DECISIONS } from "@/lib/decisions";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // ✅ REQUIRED in Next 15
  const { id } = await params;

  const decision = DECISIONS.find((d) => d.id === id);

  if (!decision) {
    return NextResponse.json({ error: "Decision not found" }, { status: 404 });
  }

  return NextResponse.json(decision, { status: 200 });
}
