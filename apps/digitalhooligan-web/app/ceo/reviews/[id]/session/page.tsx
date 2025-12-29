import Link from "next/link";
import DecisionReviewSummaryHeader from "@/components/decision-review/DecisionReviewSummaryHeader";
import DecisionReviewKeySignalsPanel from "@/components/decision-review/DecisionReviewKeySignalsPanel";
import DecisionReviewAuditTimeline from "@/components/decision-review/DecisionReviewAuditTimeline";
import { getServerBaseUrl } from "@/lib/serverApi";
import { DecisionReviewAuditEvent } from "@/lib/decisionReviewAuditLog";
import DecisionReviewNotes from "@/components/decision-review/DecisionReviewNotes";

type DecisionEntry = {
  id: string;
  title: string;
  status: "draft" | "final";
  createdAt: string;
};

async function fetchDecisionEntries(): Promise<DecisionEntry[]> {
  const res = await fetch(`${getServerBaseUrl()}/api/decision-entries`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

async function fetchAuditEvents(
  id: string
): Promise<DecisionReviewAuditEvent[]> {
  const res = await fetch(
    `${getServerBaseUrl()}/api/decision-entries/${id}/audit`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function DecisionReviewSessionPage({
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
          href="/ceo/reviews"
          className="text-sm underline text-muted-foreground"
        >
          ← Back to Review Queue
        </Link>
      </main>
    );
  }

  const auditEvents = await fetchAuditEvents(entry.id);
  const notes: [] = [];
  return (
    <main className="p-6 space-y-6">
      {/* Session Guard */}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-slate-400">
          Review Session · Read-Only
        </span>
        <Link
          href={`/ceo/reviews/${entry.id}`}
          className="text-xs underline text-slate-400 hover:text-slate-200"
        >
          Exit Session
        </Link>
      </div>

      {/* Sticky Context */}
      <div className="sticky top-0 z-10 bg-slate-950 pt-4 space-y-4">
        <DecisionReviewSummaryHeader
          reviewId={entry.id}
          status={entry.status}
          confidence={entry.status === "final" ? 100 : 50}
          lastUpdatedAt={entry.createdAt}
          isStale={false}
        />

        <DecisionReviewKeySignalsPanel
          status={entry.status}
          createdAt={entry.createdAt}
          auditEventCount={auditEvents.length}
          exportCount={0}
          isStale={false}
        />
      </div>

      {/* Primary Review Flow */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-300">Audit Timeline</h2>

        <DecisionReviewAuditTimeline events={auditEvents} />
      </section>
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-300">Review Notes</h2>

        <DecisionReviewNotes notes={notes} />
      </section>
    </main>
  );
}
