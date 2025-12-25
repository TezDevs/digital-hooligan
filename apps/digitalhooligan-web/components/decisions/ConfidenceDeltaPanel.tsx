import { ConfidenceTimeline } from "@/lib/decision-confidence";

interface Props {
  timeline: ConfidenceTimeline;
}

export default function ConfidenceDeltaPanel({ timeline }: Props) {
  return (
    <div className="rounded-lg border border-neutral-800 p-4 space-y-3">
      <h3 className="text-sm font-semibold text-neutral-200">
        Confidence Over Time
      </h3>

      <div className="text-xs text-neutral-400">
        Baseline: {(timeline.baseline * 100).toFixed(0)}% → Current:{" "}
        {(timeline.current * 100).toFixed(0)}%
      </div>

      <ul className="space-y-2">
        {timeline.deltas.map((d, idx) => (
          <li
            key={idx}
            className="flex justify-between text-xs text-neutral-300"
          >
            <span>{new Date(d.at).toLocaleString()}</span>
            <span>
              {(d.from * 100).toFixed(0)}% → {(d.to * 100).toFixed(0)}%
            </span>
            <span className={d.delta >= 0 ? "text-green-400" : "text-red-400"}>
              {d.delta >= 0 ? "+" : ""}
              {(d.delta * 100).toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
