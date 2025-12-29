import { DecisionReviewAuditEvent } from "@/lib/decisionReviewAuditLog";

interface Props {
  events: DecisionReviewAuditEvent[];
}

export default function DecisionReviewAuditTimeline({ events }: Props) {
  if (!events || events.length === 0) {
    return (
      <div className="text-sm text-slate-400">
        No audit activity recorded for this review.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event, idx) => (
        <div
          key={idx}
          className="relative flex gap-4 rounded-lg border border-slate-800 bg-slate-950 px-4 py-3"
        >
          {/* Timeline spine */}
          <div className="flex flex-col items-center">
            <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
            {idx < events.length - 1 && (
              <div className="mt-1 w-px flex-1 bg-slate-800" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-100">
                Audit entry recorded
              </span>
              <span className="text-xs text-slate-400">
                {new Date(event.timestamp).toLocaleString()}
              </span>
            </div>

            <div className="text-sm text-slate-300">
              This action was logged as part of the decision review audit trail.
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
