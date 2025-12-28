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

export default async function DecisionReviewQueuePage() {
  const entries = await fetchDecisionEntries();

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
          No decision entries found.
        </p>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-lg border border-neutral-800 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{entry.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {entry.summary}
                  </div>
                </div>

                <span className="text-xs text-muted-foreground">
                  {entry.status.toUpperCase()}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Created: {new Date(entry.createdAt).toLocaleString()}
                </span>

                <Link
                  href={`/ceo/reviews/${entry.id}`}
                  className="underline hover:text-foreground"
                >
                  Open Review →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
