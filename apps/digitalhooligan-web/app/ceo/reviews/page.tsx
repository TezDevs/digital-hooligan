import { loadDecisionEntries } from "@/lib/decisionEntryStore";
import Link from "next/link";

export default function DecisionReviewQueuePage() {
  const entries = loadDecisionEntries();

  return (
    <main className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Decision Review Queue</h1>
        <Link
          href="/ceo"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to CEO Dashboard
        </Link>
      </header>

      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No decision entries available for review.
        </p>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-lg border border-neutral-800 p-4"
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

              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Created: {new Date(entry.createdAt).toLocaleString()}
                </span>

                <Link
                  href={`/ceo/dossier/${entry.id}`}
                  className="hover:underline"
                >
                  Open Dossier →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
