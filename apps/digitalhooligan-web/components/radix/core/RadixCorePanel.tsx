// apps/digitalhooligan-web/components/radix/core/RadixCorePanel.tsx
import type { OpsSnapshot } from "../../../lib/radix/domain/radixTypes";
import { addDecision } from "../../../app/ceo/radix/actions";

export function RadixCorePanel(props: { snapshot: OpsSnapshot }) {
  const open = props.snapshot.openDecisions;

  return (
    <section className="rounded-2xl border p-4 space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">RadixCore</h2>
        <div className="text-xs opacity-70">Open decisions: {open.length}</div>
      </div>

      <form action={addDecision} className="grid gap-2">
        <input
          name="title"
          placeholder="Decision title (required)"
          className="w-full rounded-xl border px-3 py-2 text-sm"
        />
        <textarea
          name="summary"
          placeholder="Summary (optional)"
          className="w-full rounded-xl border px-3 py-2 text-sm min-h-[80px]"
        />
        <select name="category" className="w-full rounded-xl border px-3 py-2 text-sm">
          <option value="">Category (optional)</option>
          <option value="strategy">Strategy</option>
          <option value="client">Client</option>
          <option value="system">System</option>
          <option value="finance">Finance</option>
          <option value="other">Other</option>
        </select>

        <button
          type="submit"
          className="rounded-xl border px-3 py-2 text-sm font-medium hover:opacity-90"
        >
          Add Decision
        </button>

        <p className="text-xs opacity-60">
          v1: append-only. Status is derived from timestamps (Proposed/Active/Closed).
        </p>
      </form>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Open Decisions</h3>
        {open.length === 0 ? (
          <div className="text-sm opacity-70">No open decisions.</div>
        ) : (
          <ul className="space-y-2">
            {open.map((d) => (
              <li key={d.id} className="rounded-xl border p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium text-sm">{d.title}</div>
                  <div className="text-xs opacity-70">{d.status ?? "derived"}</div>
                </div>
                {d.summary ? <div className="mt-1 text-xs opacity-70">{d.summary}</div> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
