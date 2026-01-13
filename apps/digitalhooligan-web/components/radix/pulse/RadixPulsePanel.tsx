// apps/digitalhooligan-web/components/radix/pulse/RadixPulsePanel.tsx
import type { OpsSnapshot, PulseMetricType } from "../../../lib/radix/domain/radixTypes";
import { addPulseMetric } from "../../../app/ceo/radix/pulseActions";

function label(metric: PulseMetricType): string {
  switch (metric) {
    case "monthlyRevenue":
      return "Monthly Revenue (USD)";
    case "activeClients":
      return "Active Clients";
    case "executionLoad":
      return "Execution Load (# active tasks)";
    case "healthScore":
      return "Health Score (1–10)";
    default:
      return metric;
  }
}

export function RadixPulsePanel(props: { snapshot: OpsSnapshot }) {
  const latest = props.snapshot.latestPulse;
  const missing = props.snapshot.missingData;

  const metrics: PulseMetricType[] = [
    "monthlyRevenue",
    "activeClients",
    "executionLoad",
    "healthScore",
  ];

  return (
    <section className="rounded-2xl border p-4 space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">RadixPulse</h2>
        <div className="text-xs opacity-70">
          Missing: {missing.length}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {metrics.map((m) => {
          const entry = latest[m];
          return (
            <div key={m} className="rounded-xl border p-3 space-y-1">
              <div className="text-sm font-medium">{label(m)}</div>
              {entry ? (
                <>
                  <div className="text-2xl font-semibold">{entry.value}</div>
                  <div className="text-xs opacity-70">as of {entry.capturedAt}</div>
                </>
              ) : (
                <div className="text-sm opacity-70">No capture yet</div>
              )}
            </div>
          );
        })}
      </div>

      <form action={addPulseMetric} className="grid gap-2 rounded-xl border p-3">
        <div className="text-sm font-semibold">Capture metric</div>

        <select name="metricType" className="w-full rounded-xl border px-3 py-2 text-sm" defaultValue="">
          <option value="" disabled>
            Select metric…
          </option>
          <option value="monthlyRevenue">Monthly Revenue</option>
          <option value="activeClients">Active Clients</option>
          <option value="executionLoad">Execution Load</option>
          <option value="healthScore">Health Score (1–10)</option>
        </select>

        <input
          name="value"
          inputMode="decimal"
          placeholder="Value (number)"
          className="w-full rounded-xl border px-3 py-2 text-sm"
        />

        <button type="submit" className="rounded-xl border px-3 py-2 text-sm font-medium hover:opacity-90">
          Add Pulse Entry
        </button>

        <p className="text-xs opacity-60">
          v1: append-only captures. Latest-per-type is derived by capturedAt. Missing metrics stay explicit.
        </p>
      </form>
    </section>
  );
}
