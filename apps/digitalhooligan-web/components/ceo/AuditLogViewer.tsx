"use client";

import { ActionAuditEntry } from "@/lib/actionAuditTypes";

type AuditLogViewerProps = {
  entries: ActionAuditEntry[];
};

export default function AuditLogViewer({ entries }: AuditLogViewerProps) {
  if (entries.length === 0) {
    return (
      <section className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-xs text-neutral-400">
        No audit entries recorded yet.
      </section>
    );
  }

  const grouped = entries.reduce<Record<string, ActionAuditEntry[]>>(
    (acc, entry) => {
      acc[entry.snapshotId] ||= [];
      acc[entry.snapshotId].push(entry);
      return acc;
    },
    {}
  );

  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <h2 className="mb-3 text-sm font-semibold tracking-wide text-neutral-200">
        Action Audit Log
      </h2>

      <div className="space-y-4">
        {Object.entries(grouped).map(([snapshotId, snapshotEntries]) => (
          <div
            key={snapshotId}
            className="rounded-md border border-neutral-800 bg-neutral-900 p-3"
          >
            <p className="mb-2 text-xs font-mono text-neutral-300">
              Snapshot: {snapshotId}
            </p>

            <ul className="space-y-2">
              {snapshotEntries.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-start justify-between rounded border border-neutral-800 bg-neutral-950 px-3 py-2"
                >
                  <div>
                    <p className="text-xs text-neutral-200">
                      {entry.actionLabel}
                    </p>
                    {!entry.enabled && entry.reason && (
                      <p className="text-xs text-red-300">{entry.reason}</p>
                    )}
                    <p className="text-xs text-neutral-500">
                      Confidence: {entry.confidence.label} (
                      {entry.confidence.score}%)
                    </p>
                  </div>

                  <span
                    className={`text-xs font-mono ${
                      entry.enabled ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {entry.enabled ? "ENABLED" : "BLOCKED"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
