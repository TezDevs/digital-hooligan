// apps/digitalhooligan-web/components/radix/pulse/RadixPulsePanel.tsx
import type { OpsSnapshot } from "../../../lib/radix/domain/radixTypes";

export function RadixPulsePanel(props: { snapshot: OpsSnapshot }) {
  return (
    <section className="rounded-2xl border p-4">
      <h2 className="text-lg font-semibold">RadixPulse</h2>
      <pre className="mt-3 overflow-auto text-xs opacity-80">
        {JSON.stringify({ latestPulse: props.snapshot.latestPulse, missingData: props.snapshot.missingData }, null, 2)}
      </pre>
    </section>
  );
}
