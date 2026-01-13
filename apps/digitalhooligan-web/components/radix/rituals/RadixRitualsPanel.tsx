// apps/digitalhooligan-web/components/radix/rituals/RadixRitualsPanel.tsx
import type { OpsSnapshot, RitualEntry } from "../../../lib/radix/domain/radixTypes";
import { RitualType } from "../../../lib/radix/domain/radixTypes";
import { completeRitual } from "../../../app/ceo/radix/ritualActions";

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

function ritualLabel(e: RitualEntry): string {
  return e.ritualType === RitualType.Daily ? "Daily Reset" : "Weekly Review";
}

export function RadixRitualsPanel(props: { snapshot: OpsSnapshot }) {
  const rituals = props.snapshot.recentRituals;

  return (
    <section className="rounded-2xl border p-4 space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">RadixRituals</h2>
        <div className="text-xs opacity-70">Recent: {rituals.length}</div>
      </div>

      <form action={completeRitual} className="grid gap-3 rounded-xl border p-3">
        <div className="text-sm font-semibold">Complete a ritual</div>

        <div className="grid gap-2 sm:grid-cols-2">
          <select name="ritualType" className="w-full rounded-xl border px-3 py-2 text-sm" defaultValue="daily">
            <option value="daily">Daily Reset</option>
            <option value="weekly">Weekly Review</option>
          </select>

          <input
            type="date"
            name="forDate"
            defaultValue={todayISODate()}
            className="w-full rounded-xl border px-3 py-2 text-sm"
          />
        </div>

        {/* Daily fields */}
        <div className="grid gap-2">
          <input
            name="daily_focus"
            placeholder="Daily focus (optional)"
            className="w-full rounded-xl border px-3 py-2 text-sm"
          />
          <input
            name="daily_risk"
            placeholder="Primary risk (optional)"
            className="w-full rounded-xl border px-3 py-2 text-sm"
          />
          <input
            name="daily_win"
            placeholder="Win condition (optional)"
            className="w-full rounded-xl border px-3 py-2 text-sm"
          />
        </div>

        {/* Weekly fields */}
        <div className="grid gap-2">
          <textarea
            name="weekly_wins"
            placeholder="Weekly wins (optional)"
            className="w-full rounded-xl border px-3 py-2 text-sm min-h-[70px]"
          />
          <textarea
            name="weekly_lessons"
            placeholder="Weekly lessons (optional)"
            className="w-full rounded-xl border px-3 py-2 text-sm min-h-[70px]"
          />
          <textarea
            name="weekly_next"
            placeholder="Next week focus (optional)"
            className="w-full rounded-xl border px-3 py-2 text-sm min-h-[70px]"
          />
        </div>

        <input
          name="referencedDecisionIds"
          placeholder="Referenced Decision IDs (optional, CSV)"
          className="w-full rounded-xl border px-3 py-2 text-sm"
        />

        <textarea
          name="note"
          placeholder="Note (optional)"
          className="w-full rounded-xl border px-3 py-2 text-sm min-h-[70px]"
        />

        <button type="submit" className="rounded-xl border px-3 py-2 text-sm font-medium hover:opacity-90">
          Mark Complete
        </button>

        <p className="text-xs opacity-60">
          v1: append-only ritual completions. Templates live in UI; domain stores templateKey + minimal responses.
        </p>
      </form>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Recent Rituals</h3>
        {rituals.length === 0 ? (
          <div className="text-sm opacity-70">No rituals recorded yet.</div>
        ) : (
          <ul className="space-y-2">
            {rituals.map((r) => (
              <li key={r.id} className="rounded-xl border p-3 space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium">{ritualLabel(r)}</div>
                  <div className="text-xs opacity-70">{r.forDate}</div>
                </div>
                <div className="text-xs opacity-70">completedAt: {r.completedAt}</div>
                {r.note ? <div className="text-xs opacity-70">note: {r.note}</div> : null}
                {r.responses ? (
                  <pre className="mt-2 overflow-auto rounded-lg border p-2 text-xs opacity-80">
                    {JSON.stringify(r.responses, null, 2)}
                  </pre>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
