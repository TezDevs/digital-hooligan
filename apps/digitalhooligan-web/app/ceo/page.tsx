import DecisionInputsInspector from "@/components/ceo/DecisionInputsInspector";
import DecisionReviewSnapshotPanel from "@/components/ceo/DecisionReviewSnapshotPanel";
import Link from "next/link";
import { getServerBaseUrl } from "@/lib/serverApi";

type DecisionEntry = {
  id: string;
  title: string;
  summary: string;
  status: "draft" | "final";
  createdAt: string;
};

async function fetchDecisionEntries(): Promise<DecisionEntry[]> {
  const res = await fetch(`${getServerBaseUrl()}/api/decision-entries`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function CEOPage() {
  const decisionEntries = await fetchDecisionEntries();

  return (
    <main className="space-y-6 p-6">
      <DecisionInputsInspector />

      {/* Decision States */}
      <section className="rounded-lg border border-neutral-800 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-300">
            Decision States
          </h2>

          <Link
            href="/ceo/reviews"
            className="text-xs text-muted-foreground hover:underline"
          >
            View Review Queue →
          </Link>
        </div>

        {decisionEntries.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            No persisted decision entries found.
          </p>
        ) : (
          <ul className="mt-2 space-y-2 text-sm">
            {decisionEntries.map((entry) => (
              <li key={entry.id}>
                <Link
                  href={`/ceo/dossier/${entry.id}`}
                  className="block rounded-lg border border-neutral-800 p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{entry.title}</div>
                    <span className="text-xs text-muted-foreground">
                      {entry.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Decision ID: {entry.id}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Snapshot Panel */}
      <DecisionReviewSnapshotPanel />
    </main>
  );
}
