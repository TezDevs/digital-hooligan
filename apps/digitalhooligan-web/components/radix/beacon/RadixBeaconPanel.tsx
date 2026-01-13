// apps/digitalhooligan-web/components/radix/beacon/RadixBeaconPanel.tsx
import type { OpsSnapshot } from "../../../lib/radix/domain/radixTypes";

export function RadixBeaconPanel(props: { snapshot: OpsSnapshot }) {
  return (
    <section className="rounded-2xl border p-4">
      <h2 className="text-lg font-semibold">RadixBeacon</h2>
      <pre className="mt-3 overflow-auto text-xs opacity-80">
        {JSON.stringify({ recentSignals: props.snapshot.recentSignals }, null, 2)}
      </pre>
    </section>
  );
}
