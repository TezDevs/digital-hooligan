import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const AUDIT_FILE = path.join(DATA_DIR, "decision-entry-audit.json");

function loadAuditEvents() {
  if (!fs.existsSync(AUDIT_FILE)) {
    return [];
  }

  const raw = fs.readFileSync(AUDIT_FILE, "utf-8");
  return JSON.parse(raw) as {
    id: string;
    action: string;
    timestamp: string;
    meta?: Record<string, unknown>;
  }[];
}

function toCSV(rows: Record<string, unknown>[]) {
  if (rows.length === 0) return "";

  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const value = row[h];
          if (value === null || value === undefined) return "";
          const str = String(value).replace(/"/g, '""');
          return `"${str}"`;
        })
        .join(",")
    ),
  ];

  return lines.join("\n");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";
  const decisionId = searchParams.get("decisionId");

  let events = loadAuditEvents();

  if (decisionId) {
    events = events.filter((e) => e.id === decisionId);
  }

  if (format === "csv") {
    const csv = toCSV(events as unknown as Record<string, unknown>[]);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="decision-entry-audit.csv"',
      },
    });
  }

  return NextResponse.json(events, {
    headers: {
      "Content-Disposition": 'attachment; filename="decision-entry-audit.json"',
    },
  });
}
