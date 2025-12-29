import Link from "next/link";
import { getServerBaseUrl } from "@/lib/serverApi";
import DecisionReviewSummaryHeader from "@/components/decision-review/DecisionReviewSummaryHeader";

function StateBadge({ state }: { state: string }) {
  const normalized = state.toLowerCase();

  const styles: Record<string, string> = {
    draft: "bg-gray-200 text-gray-800",
    review: "bg-amber-200 text-amber-900",
    approved: "bg-green-200 text-green-900",
    rejected: "bg-red-200 text-red-900",
    final: "bg-green-200 text-green-900",
  };

  const className = styles[normalized] ?? "bg-slate-200 text-slate-900";

  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {state.toUpperCase()}
    </span>
  );
}
type DecisionEntry = {
  id: string;
  title: string;
  summary: string;
  status: "draft" | "final";
  createdAt: string;
};

type AuditEvent = {
  id: string;
  action: string;
  timestamp: string;
  meta?: Record<string, unknown>;
};

async function fetchDecisionEntries(): Promise<DecisionEntry[]> {
  const res = await fetch(`${getServerBaseUrl()}/api/decision-entries`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

async function fetchAuditEvents(id: string): Promise<AuditEvent[]> {
  const res = await fetch(
    `${getServerBaseUrl()}/api/decision-entries/${id}/audit`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function DecisionReviewDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const entries = await fetchDecisionEntries();
  const entry = entries.find((e) => e.id === params.id);

  if (!entry) {
    return (
      <main className="p-6 space-y-4">
        <p className="text-sm text-muted-foreground">Decision not found.</p>
        <Link
          href="/ceo/reviews"
          className="text-sm underline text-muted-foreground"
        >
          ← Back to Review Queue
        </Link>
      </main>
    );
  }

  const auditEvents = await fetchAuditEvents(entry.id);

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-1">
        <Link
          href="/ceo/reviews"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to Review Queue
        </Link>

        <div className="space-y-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{entry.title}</h1>
              <StateBadge state={entry.status} />
            </div>

            <p className="text-xs text-muted-foreground">
              Created {new Date(entry.createdAt).toLocaleString()}
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            Created {new Date(entry.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="text-xs text-muted-foreground">
          Status: {entry.status.toUpperCase()} · Created{" "}
          {new Date(entry.createdAt).toLocaleString()}
        </div>
      </header>

      {/* Audit Timeline */}
      <section className="rounded-lg border border-neutral-800 p-4">
        <h2 className="text-sm font-semibold text-neutral-300 mb-2">
          Audit Timeline
        </h2>
        <DecisionReviewSummaryHeader
          reviewId={entry.id}
          status={entry.status}
          confidence={entry.status === "final" ? 100 : 50}
          lastUpdatedAt={entry.createdAt}
          isStale={false}
        />
        {auditEvents.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No audit events recorded.
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {auditEvents.map((event) => (
              <li
                key={event.id}
                className="rounded-lg border border-neutral-800 p-3"
              >
                <div className="font-medium">
                  {event.action === "created" ? "Created" : "Status Updated"}
                </div>

                <div className="text-xs text-muted-foreground">
                  {new Date(event.timestamp).toLocaleString()}
                </div>

                {event.meta && (
                  <pre className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap">
                    {JSON.stringify(event.meta, null, 2)}
                  </pre>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Navigation */}
      <section>
        <Link
          href={`/ceo/dossier/${entry.id}`}
          className="text-sm underline text-muted-foreground"
        >
          Open Full Dossier →
        </Link>
      </section>
    </main>
  );
}
