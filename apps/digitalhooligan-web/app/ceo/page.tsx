import DecisionInputsInspector from "@/components/ceo/DecisionInputsInspector";
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
  try {
    const res = await fetch(`${getServerBaseUrl()}/api/decision-entries`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data as DecisionEntry[];
  } catch {
    return [];
  }
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
          <div className="mt-4 text-sm text-muted-foreground">
            No persisted decision entries found.
          </div>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {decisionEntries.map((entry) => (
              <li key={entry.id}>
                <Link
                  href={`/ceo/dossier/${entry.id}`}
                  className="block rounded-lg border border-neutral-800 p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-neutral-200">
                      {entry.title || "Untitled Decision"}
                    </div>
                    <span className="text-xs uppercase text-muted-foreground">
                      {(entry.status || "UNKNOWN").toUpperCase()}
                    </span>
                  </div>

                  <div className="mt-1 text-xs text-muted-foreground">
                    Decision ID: {entry.id}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Snapshot Panel (intentionally disabled for now) */}
      {/* <DecisionReviewSnapshotPanel /> */}
    </main>
  );
}
