// apps/digitalhooligan-web/components/radix/rituals/RadixRitualsPanel.tsx
import type { OpsSnapshot } from "../../../lib/radix/domain/radixTypes";

export function RadixRitualsPanel(props: { snapshot: OpsSnapshot }) {
  return (
    <section className="rounded-2xl border p-4">
      <h2 className="text-lg font-semibold">RadixRituals</h2>
      <pre className="mt-3 overflow-auto text-xs opacity-80">
        {JSON.stringify({ recentRituals: props.snapshot.recentRituals }, null, 2)}
      </pre>
    </section>
  );
}
