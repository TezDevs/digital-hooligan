import { ActionAuditEntry } from "./actionAuditTypes";

const auditLog: ActionAuditEntry[] = [];

export function appendAuditEntry(entry: ActionAuditEntry) {
  auditLog.push(entry);
}

export function getAuditLog(): ActionAuditEntry[] {
  return [...auditLog];
}
