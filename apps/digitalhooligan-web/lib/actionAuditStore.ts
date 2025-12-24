import fs from "fs";
import path from "path";
import { ActionAuditEntry } from "./actionAuditTypes";

const DATA_DIR = path.join(process.cwd(), "data");
const AUDIT_FILE = path.join(DATA_DIR, "action-audit-log.json");

let auditLog: ActionAuditEntry[] = [];

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Load existing log at startup
function loadAuditLog() {
  try {
    if (fs.existsSync(AUDIT_FILE)) {
      const raw = fs.readFileSync(AUDIT_FILE, "utf-8");
      auditLog = JSON.parse(raw);
    }
  } catch {
    auditLog = [];
  }
}

// Persist log to disk
function persistAuditLog() {
  ensureDataDir();
  fs.writeFileSync(AUDIT_FILE, JSON.stringify(auditLog, null, 2), "utf-8");
}

// Initialize on first import
loadAuditLog();

export function appendAuditEntry(entry: ActionAuditEntry) {
  auditLog.push(entry);
  persistAuditLog();
}

export function getAuditLog(): ActionAuditEntry[] {
  return [...auditLog];
}
