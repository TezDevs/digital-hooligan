import { buildDecisionReviewSnapshot } from "@/lib/decisionReviewSnapshot";
import { buildDecisionReviewTimeline } from "@/lib/decisionReviewTimeline";
import { DecisionReviewTimeline } from "@/components/ceo/DecisionReviewTimeline";

interface Props {
  params: { id: string };
}

export default async function DecisionDetailPage({ params }: Props) {
  const snapshot = await buildDecisionReviewSnapshot(params.id);
  const timeline = buildDecisionReviewTimeline(snapshot);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-xl font-semibold">Decision Detail</h1>
        <div className="text-sm text-muted-foreground">
          Decision ID: {params.id}
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
