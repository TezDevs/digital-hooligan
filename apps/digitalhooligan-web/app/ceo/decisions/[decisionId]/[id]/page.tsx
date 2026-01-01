import Link from "next/link";
import { buildDecisionReviewSnapshot } from "@/lib/decisionReviewSnapshot";
import { buildDecisionReviewTimeline } from "@/lib/decisionReviewTimeline";
import { DecisionReviewTimeline } from "@/components/ceo/DecisionReviewTimeline";

interface Props {
  params: Promise<{
    decisionId: string;
    id: string;
  }>;
}

export default async function DecisionDetailPage({ params }: Props) {
  const { decisionId, id } = await params;

  const snapshot = await buildDecisionReviewSnapshot(id);
  const timeline = buildDecisionReviewTimeline(snapshot);

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <div className="mb-2">
        <Link
          href="/ceo/decisions"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to Decisions
        </Link>
      </div>

      {/* Snapshot Header */}
      <header className="space-y-4 pb-4 border-b">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Decision Review</h1>
          <p className="text-sm text-muted-foreground">
            Read-only snapshot of a single decision at a point in time.
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-[8rem_1fr] gap-y-3 text-sm">
          <div className="uppercase tracking-wide text-xs text-muted-foreground">
            Decision
          </div>
          <div className="font-mono text-foreground">{decisionId}</div>

          <div className="uppercase tracking-wide text-xs text-muted-foreground">
            Snapshot
          </div>
          <div className="font-mono text-foreground">{id}</div>
        </div>

        {/* Export */}
        <div className="text-sm pt-1">
          <a
            href={`/api/decisions/${id}/export/pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            Export PDF
          </a>
        </div>
      </header>

      {/* Review Activity */}
      <section className="space-y-2">
        <h2 className="text-lg font-medium">Review Activity (Snapshot)</h2>
        <p className="text-sm text-muted-foreground max-w-3xl">
          Timeline entries reflect recorded review inputs for this snapshot
          only. They are informational and do not represent a decision outcome.
        </p>

        {timeline.length === 0 ? (
          <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            <div className="font-medium">
              No review activity recorded for this snapshot.
            </div>
            <div className="mt-1">
              This does not imply approval or rejection.
            </div>
          </div>
        ) : (
          <DecisionReviewTimeline items={timeline} />
        )}
      </section>

      {/* Footer Boundary */}
      <footer className="pt-6 border-t text-xs text-muted-foreground">
        This page presents a historical record of a decision snapshot. Content
        is intentionally non-interactive.
      </footer>
    </div>
  );
}
