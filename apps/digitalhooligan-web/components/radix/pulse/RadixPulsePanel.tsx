// apps/digitalhooligan-web/components/radix/pulse/RadixPulsePanel.tsx
import type { OpsSnapshot } from "../../../lib/radix/domain/radixTypes";
import { PulseMetricType } from "../../../lib/radix/domain/radixTypes";
import { addPulseMetric } from "../../../app/ceo/radix/pulseActions";

function label(metric: PulseMetricType): string {
  switch (metric) {
    case PulseMetricType.MonthlyRevenue:
      return "Monthly Revenue (USD)";
    case PulseMetricType.ActiveClients:
      return "Active Clients";
    case PulseMetricType.ExecutionLoad:
      return "Execution Load (# active tasks)";
    case PulseMetricType.HealthScore:
      return "Health Score (1–10)";
    default:
      return String(metric);
  }
}

export function RadixPulsePanel(props: { snapshot: OpsSnapshot }) {
  const latest = props.snapshot.latestPulse;
  const missing = props.snapshot.missingData;

  const metrics: PulseMetricType[] = [
    PulseMetricType.MonthlyRevenue,
    PulseMetricType.ActiveClients,
    PulseMetricType.ExecutionLoad,
    PulseMetricType.HealthScore,
  ];

  return (
    <section className="rounded-2xl border p-4 space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">RadixPulse</h2>
        <div className="text-xs opacity-70">Missing: {missing.length}</div>
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
                  <div className="text-xs opacity-70">
                    as of {entry.capturedAt}
                  </div>
                </>
              ) : (
                <div className="text-sm opacity-70">No capture yet</div>
              )}
            </div>
          );
        })}
      </div>

      <form
        action={addPulseMetric}
        className="grid gap-2 rounded-xl border p-3"
      >
        <div className="text-sm font-semibold">Capture metric</div>

        <select
          name="metricType"
          className="w-full rounded-xl border px-3 py-2 text-sm"
          defaultValue=""
        >
          <option value="" disabled>
            Select metric…
          </option>
          <option value={PulseMetricType.MonthlyRevenue}>
            Monthly Revenue
          </option>
          <option value={PulseMetricType.ActiveClients}>Active Clients</option>
          <option value={PulseMetricType.ExecutionLoad}>Execution Load</option>
          <option value={PulseMetricType.HealthScore}>
            Health Score (1–10)
          </option>
        </select>

        <input
          name="value"
          inputMode="decimal"
          placeholder="Value (number)"
          className="w-full rounded-xl border px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="rounded-xl border px-3 py-2 text-sm font-medium hover:opacity-90"
        >
          Add Pulse Entry
        </button>

        <p className="text-xs opacity-60">
          v1: append-only captures. Latest-per-type is derived by capturedAt.
          Missing metrics stay explicit.
        </p>
      </form>
    </section>
  );
}
