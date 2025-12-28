import DecisionInputsInspector from "@/components/ceo/DecisionInputsInspector";
import DecisionReviewSnapshotPanel from "@/components/ceo/DecisionReviewSnapshotPanel";
import { getDecisions } from "@/lib/decision/getDecisions";
import { loadDecisionEntries } from "@/lib/decisionEntryStore";
import Link from "next/link";

export default function CEOPage() {
  const decisions = getDecisions();
  const decisionEntries = loadDecisionEntries();

  return (
    <main className="space-y-6 p-6">
      <DecisionInputsInspector />

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

        <ul className="mt-2 space-y-2 text-sm">
          {decisions.map((d) => (
            <Link
              key={d.id}
              href={`/ceo/decisions/${d.id}`}
              className="block rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium">{d.title}</div>

                  {"status" in d && d.status && (
                    <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium bg-neutral-500/10 text-neutral-400 border-neutral-500/20">
                      {String(d.status).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  Decision ID: {d.id}
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-neutral-800 p-4">
        <h2 className="text-sm font-semibold text-neutral-300">
          Decision Entries (Persisted)
        </h2>

        {decisionEntries.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            No persisted decision entries found.
          </p>
        ) : (
          <ul className="mt-2 space-y-2 text-sm">
            {decisionEntries.map((entry) => (
              <li
                key={entry.id}
                className="rounded-md border border-neutral-800 p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{entry.title}</div>

                  <span className="text-xs text-muted-foreground">
                    {entry.status.toUpperCase()}
                  </span>
                </div>

                <div className="mt-1 text-sm text-muted-foreground">
                  {entry.summary}
                </div>

                <div className="mt-1 text-xs text-muted-foreground">
                  Created: {new Date(entry.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <DecisionReviewSnapshotPanel />
    </main>
  );
}
