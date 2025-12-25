import { decisionInputs } from "@/lib/decisionInputs";
import { InputStatus } from "@/lib/decision";

function statusClass(status: InputStatus) {
  switch (status) {
    case "fresh":
      return "text-green-400";
    case "degraded":
      return "text-yellow-400";
    case "missing":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

export default function DecisionInputsInspector() {
  return (
    <section className="rounded-xl border border-white/10 bg-black/40 p-4">
      <h2 className="mb-3 text-lg font-semibold">Decision Inputs Inspector</h2>

      <div className="space-y-3">
        {decisionInputs.map((input) => (
          <div
            key={input.id}
            className="flex items-center justify-between rounded-lg bg-white/5 p-3"
          >
            <div className="space-y-1">
              <div className="font-medium">{input.name}</div>
              <div className="text-xs text-white/60">
                Source: {input.source}
              </div>
              <div className="text-xs text-white/40">
                Used by: {input.usedBy.join(", ")}
              </div>
            </div>

            <div className="text-right">
              <div
                className={`text-sm font-semibold ${statusClass(input.status)}`}
              >
                {input.status.toUpperCase()}
              </div>
              <div className="text-xs text-white/60">
                Confidence: {input.confidence}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
