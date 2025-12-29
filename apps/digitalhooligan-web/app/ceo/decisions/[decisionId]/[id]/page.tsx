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

  console.log("Decision params:", { decisionId, id });

  const snapshot = await buildDecisionReviewSnapshot(id);
  const timeline = buildDecisionReviewTimeline(snapshot);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-xl font-semibold">Decision Detail</h1>

        <div className="text-sm text-muted-foreground">
          Decision ID: {id}
          <a
            href={`/api/decisions/${id}/export/pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 text-sm font-medium text-blue-600 hover:underline"
          >
            Export PDF
          </a>
        </div>
      </header>

      <section>
        <h2 className="text-lg font-medium mb-2">Review Activity</h2>
        <DecisionReviewTimeline items={timeline} />
      </section>

      <section className="text-sm text-muted-foreground">
        This page is read-only. Editing and exports are intentionally disabled.
      </section>
    </div>
  );
}
