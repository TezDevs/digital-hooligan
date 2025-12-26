import DecisionInputsInspector from "@/components/ceo/DecisionInputsInspector";
import DecisionReviewSnapshotPanel from "@/components/ceo/DecisionReviewSnapshotPanel";
import { getDecisions } from "@/lib/decision/getDecisions";

export default function CEOPage() {
  const decisions = getDecisions();

  return (
    <main className="space-y-6 p-6">
      <DecisionInputsInspector />

      {/* Existing Decision States Section */}
      <section className="rounded-lg border border-neutral-800 p-4">
        <h2 className="text-sm font-semibold text-neutral-300">
          Decision States
        </h2>

        <ul className="mt-2 space-y-2 text-sm">
          {decisions.map((d) => (
            <li key={d.id}>
              <span className="font-medium">{d.title}</span>
              <span className="ml-2 text-neutral-400">{d.status}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* New Snapshot Panel */}
      <DecisionReviewSnapshotPanel />
    </main>
  );
}
