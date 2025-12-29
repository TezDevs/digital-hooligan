"use client";

import { useEffect, useState } from "react";

interface Props {
  status: string;
  createdAt: string;
  auditEventCount: number;
  exportCount: number;
  isStale: boolean;
}

export default function DecisionReviewKeySignalsPanel({
  status,
  createdAt,
  auditEventCount,
  exportCount,
  isStale,
}: Props) {
  const [ageHours, setAgeHours] = useState<number | null>(null);

  useEffect(() => {
    // Defer state update to avoid synchronous setState during effect
    const id = setTimeout(() => {
      const hours = Math.floor(
        (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60)
      );
      setAgeHours(hours);
    }, 0);

    return () => clearTimeout(id);
  }, [createdAt]);

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-4">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Key Signals
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Signal label="Status" value={status} />

        <Signal
          label="Review Age"
          value={ageHours === null ? "—" : `${ageHours}h`}
          highlight={ageHours !== null && ageHours > 24 ? "warning" : undefined}
        />

        <Signal label="Audit Events" value={auditEventCount.toString()} />

        <Signal label="Exports Sent" value={exportCount.toString()} />

        <Signal
          label="State"
          value={isStale ? "Stale" : "Active"}
          highlight={isStale ? "warning" : "ok"}
        />
      </div>
    </div>
  );
}

function Signal({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: "ok" | "warning";
}) {
  const color =
    highlight === "warning"
      ? "text-amber-400"
      : highlight === "ok"
      ? "text-emerald-400"
      : "text-slate-200";

  return (
    <div className="space-y-0.5">
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`text-sm font-medium ${color}`}>{value}</div>
    </div>
  );
}
