// apps/digitalhooligan-web/components/radix/switchboard/RadixSwitchboardPanel.tsx
import type { OpsSnapshot } from "../../../lib/radix/domain/radixTypes";
import { WorkModeType } from "../../../lib/radix/domain/radixTypes";
import { setWorkMode } from "../../../app/ceo/radix/workModeActions";

function modeLabel(mode: WorkModeType): string {
  switch (mode) {
    case WorkModeType.Founder:
      return "Founder";
    case WorkModeType.Owner:
      return "Owner";
    case WorkModeType.Operator:
      return "Operator";
    default:
      return String(mode);
  }
}

export function RadixSwitchboardPanel(props: { snapshot: OpsSnapshot }) {
  const current = props.snapshot.currentWorkMode;

  const modes: WorkModeType[] = [WorkModeType.Founder, WorkModeType.Owner, WorkModeType.Operator];

  return (
    <section className="rounded-2xl border p-4 space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">RadixSwitchboard</h2>
        <div className="text-xs opacity-70">
          Current: {current ? modeLabel(current.mode) : "None"}
        </div>
      </div>

      {current ? (
        <div className="rounded-xl border p-3 space-y-1">
          <div className="text-sm font-medium">{modeLabel(current.mode)}</div>
          <div className="text-xs opacity-70">effectiveFrom: {current.effectiveFrom}</div>
          {current.note ? <div className="text-xs opacity-70">note: {current.note}</div> : null}
        </div>
      ) : (
        <div className="text-sm opacity-70">No current work mode interval found.</div>
      )}

      <form action={setWorkMode} className="grid gap-2 rounded-xl border p-3">
        <div className="text-sm font-semibold">Switch mode</div>

        <select name="mode" className="w-full rounded-xl border px-3 py-2 text-sm" defaultValue="">
          <option value="" disabled>
            Select mode…
          </option>
          {modes.map((m) => (
            <option key={m} value={m}>
              {modeLabel(m)}
            </option>
          ))}
        </select>

        <input
          name="note"
          placeholder="Why this switch? (optional)"
          className="w-full rounded-xl border px-3 py-2 text-sm"
        />

        <button type="submit" className="rounded-xl border px-3 py-2 text-sm font-medium hover:opacity-90">
          Set Current Mode
        </button>

        <p className="text-xs opacity-60">
          v1 invariant: at most one current mode (effectiveTo = null). Switching closes the previous interval at the new effectiveFrom.
        </p>
      </form>
    </section>
  );
}
