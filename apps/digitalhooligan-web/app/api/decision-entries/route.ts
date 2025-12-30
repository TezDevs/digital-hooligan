import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Decision entry writes are disabled in read-only v1." },
    { status: 410 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Decision entry writes are disabled in read-only v1." },
    { status: 410 }
  );
}
