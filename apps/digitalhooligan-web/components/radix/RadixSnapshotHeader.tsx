// apps/digitalhooligan-web/components/radix/RadixSnapshotHeader.tsx
import type { OpsSnapshot, PulseMetricType } from "../../lib/radix/domain/radixTypes";
import { PulseMetricType as PulseMetricTypeEnum } from "../../lib/radix/domain/radixTypes";

function metricLabel(metric: PulseMetricType): string {
  switch (metric) {
    case PulseMetricTypeEnum.MonthlyRevenue:
      return "Monthly Revenue";
    case PulseMetricTypeEnum.ActiveClients:
      return "Active Clients";
    case PulseMetricTypeEnum.ExecutionLoad:
      return "Execution Load";
    case PulseMetricTypeEnum.HealthScore:
      return "Health Score";
    default:
      return String(metric);
  }
}

/**
 * v1: missingData is an explicit string list. For the header we render a friendly list
 * by mapping known metric types from latestPulse nulls rather than parsing strings.
 */
function missingMetricLabels(snapshot: OpsSnapshot): string[] {
  const labels: string[] = [];
  const latest = snapshot.latestPulse;

  const ordered: PulseMetricType[] = [
    PulseMetricTypeEnum.MonthlyRevenue,
    PulseMetricTypeEnum.ActiveClients,
    PulseMetricTypeEnum.ExecutionLoad,
    PulseMetricTypeEnum.HealthScore,
  ];

  for (const m of ordered) {
    if (!latest[m]) labels.push(metricLabel(m));
  }
  return labels;
}

export function RadixSnapshotHeader(props: { snapshot: OpsSnapshot }) {
  const { snapshot } = props;

  const currentMode = snapshot.currentWorkMode?.mode ?? null;
  const openCount = snapshot.openDecisions.length;
  const signalsCount = snapshot.recentSignals.length;
  const missing = missingMetricLabels(snapshot);

  return (
    <section className="rounded-2xl border p-4 space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="space-y-1">
          <div className="text-xs opacity-70">Ops Snapshot</div>
          <div className="text-lg font-semibold">State of Ops</div>
        </div>

        <div className="text-xs opacity-70">
          asOf: <span className="font-mono">{snapshot.asOf}</span>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-4">
        <div className="rounded-xl border p-3">
          <div className="text-xs opacity-70">Work Mode</div>
          <div className="text-sm font-semibold">{currentMode ? String(currentMode) : "None"}</div>
        </div>

        <div className="rounded-xl border p-3">
          <div className="text-xs opacity-70">Open Decisions</div>
          <div className="text-sm font-semibold">{openCount}</div>
        </div>

        <div className="rounded-xl border p-3">
          <div className="text-xs opacity-70">Signals Inbox</div>
          <div className="text-sm font-semibold">{signalsCount}</div>
        </div>

        <div className="rounded-xl border p-3">
          <div className="text-xs opacity-70">Missing Pulse</div>
          <div className="text-sm font-semibold">{missing.length}</div>
        </div>
      </div>

      {missing.length ? (
        <div className="rounded-xl border p-3">
          <div className="text-xs opacity-70">Missing metrics</div>
          <div className="mt-1 flex flex-wrap gap-2">
            {missing.map((m) => (
              <span key={m} className="rounded-full border px-2 py-1 text-xs opacity-80">
                {m}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
