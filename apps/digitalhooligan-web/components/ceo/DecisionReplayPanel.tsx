import { DecisionDiff } from "@/lib/decisionDiff";

type Props = {
  diff: DecisionDiff;
};

export default function DecisionReplayPanel({ diff }: Props) {
  return (
    <section className="rounded-lg border border-neutral-800 p-4">
      <h3 className="text-sm font-semibold mb-2">
        Decision Replay (Current Rules)
      </h3>

      {diff.stateChanged ? (
        <p className="text-sm text-yellow-400">
          State changed: {diff.fromState} → {diff.toState}
        </p>
      ) : (
        <p className="text-sm text-green-400">
          Decision state unchanged ({diff.fromState})
        </p>
      )}

      <p className="text-xs mt-2 text-neutral-400">
        Confidence delta: {diff.confidenceDelta > 0 ? "+" : ""}
        {diff.confidenceDelta}
      </p>

      {diff.actionsChanged.length > 0 && (
        <ul className="mt-3 text-xs">
          {diff.actionsChanged.map((a) => (
            <li key={a.actionId}>
              Action {a.actionId}: {a.fromEnabled ? "enabled" : "disabled"} →{" "}
              {a.toEnabled ? "enabled" : "disabled"}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
