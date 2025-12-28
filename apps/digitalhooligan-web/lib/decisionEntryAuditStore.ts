import fs from "fs";
import path from "path";

export type DecisionEntryAuditEvent = {
  id: string;
  action: "created" | "status_updated";
  timestamp: string;
  meta?: Record<string, unknown>;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const AUDIT_FILE = path.join(DATA_DIR, "decision-entry-audit.json");

export function loadDecisionEntryAuditEvents(
  decisionEntryId: string
): DecisionEntryAuditEvent[] {
  if (!fs.existsSync(AUDIT_FILE)) {
    return [];
  }

  const raw = fs.readFileSync(AUDIT_FILE, "utf-8");
  const events = JSON.parse(raw) as DecisionEntryAuditEvent[];

  return events.filter((e) => e.id === decisionEntryId);
}
