// apps/digitalhooligan-web/components/radix/beacon/RadixBeaconPanel.tsx
import type { OpsSnapshot, SignalEventStub } from "../../../lib/radix/domain/radixTypes";
import { SignalCategory } from "../../../lib/radix/domain/radixTypes";
import { addSignal } from "../../../app/ceo/radix/beaconActions";

function categoryLabel(c: SignalCategory): string {
  switch (c) {
    case SignalCategory.Market:
      return "Market";
    case SignalCategory.Client:
      return "Client";
    case SignalCategory.System:
      return "System";
    case SignalCategory.Other:
      return "Other";
    default:
      return String(c);
  }
}

function formatSignal(s: SignalEventStub) {
  return {
    id: s.id,
    category: s.category,
    title: s.title,
    occurredAt: s.occurredAt ?? null,
    capturedAt: s.capturedAt,
    relatedDecisionId: s.relatedDecisionId ?? null,
  };
}

export function RadixBeaconPanel(props: { snapshot: OpsSnapshot }) {
  const signals = props.snapshot.recentSignals;

  return (
    <section className="rounded-2xl border p-4 space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">RadixBeacon</h2>
        <div className="text-xs opacity-70">Inbox: {signals.length}</div>
      </div>

      <form action={addSignal} className="grid gap-2 rounded-xl border p-3">
        <div className="text-sm font-semibold">Capture signal (manual stub)</div>

        <select name="category" className="w-full rounded-xl border px-3 py-2 text-sm" defaultValue="">
          <option value="" disabled>
            Category…
          </option>
          <option value={SignalCategory.Market}>Market</option>
          <option value={SignalCategory.Client}>Client</option>
          <option value={SignalCategory.System}>System</option>
          <option value={SignalCategory.Other}>Other</option>
        </select>

        <input
          name="title"
          placeholder="Title (required)"
          className="w-full rounded-xl border px-3 py-2 text-sm"
        />

        <textarea
          name="detail"
          placeholder="Detail (optional)"
          className="w-full rounded-xl border px-3 py-2 text-sm min-h-[80px]"
        />

        <input
          name="occurredAt"
          placeholder="Occurred at (optional, ISO or parseable date)"
          className="w-full rounded-xl border px-3 py-2 text-sm"
        />

        <input
          name="relatedDecisionId"
          placeholder="Related Decision ID (optional)"
          className="w-full rounded-xl border px-3 py-2 text-sm"
        />

        <button type="submit" className="rounded-xl border px-3 py-2 text-sm font-medium hover:opacity-90">
          Add Signal
        </button>

        <p className="text-xs opacity-60">
          v1: no inference. occurredAt is optional and never auto-filled; capturedAt is always set on entry.
        </p>
      </form>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Recent Signals</h3>
        {signals.length === 0 ? (
          <div className="text-sm opacity-70">No signals captured yet.</div>
        ) : (
          <ul className="space-y-2">
            {signals.map((s) => (
              <li key={s.id} className="rounded-xl border p-3 space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="text-xs opacity-70">{categoryLabel(s.category)}</div>
                </div>
                <div className="text-xs opacity-70">capturedAt: {s.capturedAt}</div>
                {s.occurredAt ? <div className="text-xs opacity-70">occurredAt: {s.occurredAt}</div> : null}
                {s.relatedDecisionId ? (
                  <div className="text-xs opacity-70">relatedDecisionId: {s.relatedDecisionId}</div>
                ) : null}
                {s.detail ? <div className="text-xs opacity-70">{s.detail}</div> : null}

                <details className="mt-2">
                  <summary className="cursor-pointer text-xs opacity-70">raw</summary>
                  <pre className="mt-2 overflow-auto rounded-lg border p-2 text-xs opacity-80">
                    {JSON.stringify(formatSignal(s), null, 2)}
                  </pre>
                </details>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
