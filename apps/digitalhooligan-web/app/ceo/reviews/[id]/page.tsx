import Link from "next/link";
import { getServerBaseUrl } from "@/lib/serverApi";

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

        <h1 className="text-2xl font-semibold">{entry.title}</h1>
        <p className="text-sm text-muted-foreground">{entry.summary}</p>

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
