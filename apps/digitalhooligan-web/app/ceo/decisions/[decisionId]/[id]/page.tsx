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
      <div className="mb-4">
        <Link
          href="/ceo/decisions"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to Decisions
        </Link>
      </div>
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-semibold">Decision Review</h1>
          <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
            Read-only snapshot
          </span>
        </div>

        {/* Copy Framing - Read-Only */}
        <p className="text-sm text-muted-foreground max-w-3xl">
          A decision review represents collected inputs and context for a single
          snapshot in time. Reviews capture information and reasoning, but do
          not imply approval, rejection, or final outcome.
        </p>

        {/* Snapshot Metadata - Read-Only */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <div className="text-muted-foreground">
            <span className="uppercase tracking-wide text-xs">Decision</span>
            <div className="font-medium text-foreground leading-tight">
              {decisionId}
            </div>
          </div>

          <div className="text-muted-foreground">
            <span className="uppercase tracking-wide text-xs">Snapshot</span>
            <div className="font-medium text-foreground leading-tight">
              {id}
            </div>
          </div>
        </div>

        {/* Export (UNCHANGED) */}
        <div className="text-sm text-muted-foreground">
          <a
            href={`/api/decisions/${id}/export/pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Export PDF
          </a>
        </div>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Review Activity (Snapshot)</h2>

        <div className="text-sm text-muted-foreground max-w-3xl">
          Timeline entries reflect recorded review inputs for this snapshot
          only. They are informational and do not represent a decision outcome.
        </div>

        {timeline.length === 0 ? (
          <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            No review activity recorded for this snapshot.
            <div className="mt-1 text-xs">
              This does not imply approval or rejection.
            </div>
          </div>
        ) : (
          <DecisionReviewTimeline items={timeline} />
        )}
      </section>

      <section className="text-sm text-muted-foreground">
        This page is read-only. Editing and exports are intentionally disabled.
      </section>
    </div>
  );
}
