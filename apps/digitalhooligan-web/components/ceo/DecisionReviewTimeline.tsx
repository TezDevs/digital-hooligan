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
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 border-l pl-4 py-1">
          {/* Timestamp */}
          <div className="w-36 shrink-0 text-xs text-muted-foreground leading-tight">
            {new Date(item.timestamp).toLocaleString()}
          </div>

          {/* Summary */}
          <div className="text-sm leading-relaxed">{item.summary}</div>
        </div>
      ))}
    </div>
  );
}
