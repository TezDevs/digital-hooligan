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

function ensureAuditStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(AUDIT_FILE)) {
    fs.writeFileSync(AUDIT_FILE, JSON.stringify([]));
  }
}

export function appendDecisionEntryAudit(event: DecisionEntryAuditEvent) {
  ensureAuditStore();
  const raw = fs.readFileSync(AUDIT_FILE, "utf-8");
  const events = JSON.parse(raw) as DecisionEntryAuditEvent[];
  events.push(event);
  fs.writeFileSync(AUDIT_FILE, JSON.stringify(events, null, 2));
}
