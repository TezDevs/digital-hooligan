interface Props {
  reviewId: string;
  status: string;
  confidence: number;
  lastUpdatedAt: string;
  isStale: boolean;
}

export default function DecisionReviewSummaryHeader({
  reviewId,
  status,
  confidence,
  lastUpdatedAt,
  isStale,
}: Props) {
  return (
    <div className="mb-6 rounded-lg border border-slate-800 bg-slate-950 px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-slate-400">
            Decision Review
          </div>
          <div className="text-lg font-semibold text-slate-100">{reviewId}</div>
        </div>

        <div className="flex flex-wrap gap-6">
          <SummaryItem label="Status" value={status} />
          <SummaryItem label="Confidence" value={`${confidence}%`} />
          <SummaryItem
            label="Last Activity"
            value={new Date(lastUpdatedAt).toLocaleString()}
          />
          <SummaryItem
            label="State"
            value={isStale ? "Stale" : "Active"}
            highlight={isStale ? "warning" : "ok"}
          />
        </div>
      </div>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: "ok" | "warning";
}) {
  const color =
    highlight === "warning"
      ? "text-amber-400"
      : highlight === "ok"
      ? "text-emerald-400"
      : "text-slate-200";

  return (
    <div className="space-y-0.5">
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`text-sm font-medium ${color}`}>{value}</div>
    </div>
  );
}
