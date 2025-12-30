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
      <header className="space-y-2">
        <h1 className="text-xl font-semibold">Decision Detail</h1>

        {/* Snapshot Metadata — Read-Only */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span>
            <span className="font-medium text-foreground">Decision:</span>{" "}
            {decisionId}
          </span>
          <span>
            <span className="font-medium text-foreground">Snapshot:</span> {id}
          </span>
          <span className="rounded-full border px-2 py-0.5 text-xs">
            Read-Only
          </span>
        </div>

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

      <section>
        <h2 className="text-lg font-medium mb-2">Review Activity</h2>

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
