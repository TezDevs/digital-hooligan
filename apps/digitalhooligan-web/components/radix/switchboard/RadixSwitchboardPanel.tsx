// apps/digitalhooligan-web/components/radix/switchboard/RadixSwitchboardPanel.tsx
import type { OpsSnapshot } from "../../../lib/radix/domain/radixTypes";

export function RadixSwitchboardPanel(props: { snapshot: OpsSnapshot }) {
  return (
    <section className="rounded-2xl border p-4">
      <h2 className="text-lg font-semibold">RadixSwitchboard</h2>
      <pre className="mt-3 overflow-auto text-xs opacity-80">
        {JSON.stringify({ currentWorkMode: props.snapshot.currentWorkMode }, null, 2)}
      </pre>
    </section>
  );
}
