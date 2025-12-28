import { NextResponse } from "next/server";
import { loadDecisionEntries } from "@/lib/decisionEntryStore";

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

  const entries = loadDecisionEntries();

  if (format === "csv") {
    const csv = toCSV(entries as unknown as Record<string, unknown>[]);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="decision-entries.csv"',
      },
    });
  }

  return NextResponse.json(entries, {
    headers: {
      "Content-Disposition": 'attachment; filename="decision-entries.json"',
    },
  });
}
