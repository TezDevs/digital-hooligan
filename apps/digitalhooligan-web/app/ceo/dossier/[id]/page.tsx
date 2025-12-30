import Link from "next/link";
import { getServerBaseUrl } from "@/lib/serverApi";
import DecisionReviewSnapshotPanel from "@/components/ceo/DecisionReviewSnapshotPanel";

type DecisionEntry = {
  id: string;
  title: string;
  summary: string;
  status: "draft" | "final";
  createdAt: string;
  updatedAt?: string;
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

export default async function DecisionDossierPage({
  params,
}: {
  params: { id: string };
}) {
  const entries = await fetchDecisionEntries();
  const entry = entries.find((e) => e.id === params.id);

  if (!entry) {
    return (
      <main className="p-6">
        <p className="text-sm text-muted-foreground">Decision not found.</p>
        <Link
          href="/ceo"
          className="mt-2 inline-block text-sm underline text-muted-foreground"
        >
          ← Back to CEO Dashboard
        </Link>
      </main>
    );
  }

  const auditEvents = await fetchAuditEvents(entry.id);

  return (
    <main className="space-y-8 p-6">
      {/* Navigation */}
      <Link
        href="/ceo"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Back to CEO Dashboard
      </Link>

      {/* Header */}
      <header>
        <h1 className="text-xl font-semibold text-neutral-100">
          {entry.title}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">{entry.summary}</p>

        <div className="mt-2 text-xs text-muted-foreground">
          Status: <span className="uppercase">{entry.status}</span> · Created{" "}
          {new Date(entry.createdAt).toLocaleString()}
        </div>
      </header>

      {/* Review Snapshot */}
      <section className="rounded-lg border border-neutral-800 p-4">
        <h2 className="mb-2 text-sm font-semibold text-neutral-300">
          Review Status Overview
        </h2>
        <DecisionReviewSnapshotPanel />
      </section>

      {/* Audit Timeline */}
      <section className="rounded-lg border border-neutral-800 p-4">
        <h2 className="mb-2 text-sm font-semibold text-neutral-300">
          Decision Activity Timeline
        </h2>

        {auditEvents.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recorded activity for this decision yet.
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {auditEvents.map((event) => (
              <li
                key={event.id}
                className="rounded border border-neutral-800 p-3"
              >
                <div className="font-medium">
                  {event.action === "created"
                    ? "Decision Created"
                    : "Decision Updated"}
                </div>

                <div className="text-xs text-muted-foreground">
                  {new Date(event.timestamp).toLocaleString()}
                </div>

                {event.meta && (
                  <pre className="mt-2 whitespace-pre-wrap text-xs text-muted-foreground">
                    {JSON.stringify(event.meta, null, 2)}
                  </pre>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Review Navigation */}
      <section>
        <Link
          href={`/ceo/reviews/${entry.id}`}
          className="text-sm underline text-muted-foreground"
        >
          View Review & Audit →
        </Link>
      </section>
    </main>
  );
}
