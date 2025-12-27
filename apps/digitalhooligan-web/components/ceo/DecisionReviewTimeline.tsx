import { DecisionReviewActivityItem } from "@/lib/decisionReviewTimeline";

interface Props {
  items: DecisionReviewActivityItem[];
}

export function DecisionReviewTimeline({ items }: Props) {
  if (!items.length) {
    return (
      <div className="text-sm text-muted-foreground">
        No review activity recorded.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-3 border-l pl-3">
          <div className="text-xs text-muted-foreground w-32 shrink-0">
            {new Date(item.timestamp).toLocaleString()}
          </div>
          <div className="text-sm">{item.summary}</div>
        </div>
      ))}
    </div>
  );
}
