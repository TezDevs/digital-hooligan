import { getDecisions } from "@/lib/decision/getDecisions";
import { getDecisionInputs } from "@/lib/decision/getDecisionInputs";

function inputStatusClass(status: "fresh" | "degraded" | "missing") {
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
  const decisions = getDecisions();

  return (
    <section className="rounded-xl border border-white/10 bg-black/40 p-4">
      <h2 className="mb-3 text-lg font-semibold">Decision Inputs Inspector</h2>

      <ul className="space-y-4">
        {decisions.map((decision) => (
          <li
            key={decision.id}
            className="rounded-md border border-white/10 bg-black/30 p-3"
          >
            <div className="font-medium text-white">{decision.title}</div>

            <div className="text-white/60">
              {decision.status} — {decision.rationale}
            </div>

            <div className="mt-1 text-xs text-white/50">
              Confidence:{" "}
              {decision.confidence === null
                ? "Insufficient data"
                : `${decision.confidence}%`}
            </div>

            <ul className="mt-3 space-y-2 text-xs">
              {getDecisionInputs(decision.id).map((input) => (
                <li
                  key={input.id}
                  className="flex justify-between rounded border border-white/10 px-2 py-1"
                >
                  <div>
                    <div className="text-white">{input.name}</div>
                    <div className="text-white/50">Source: {input.source}</div>
                    {input.sourceReliability !== undefined && (
                      <div className="text-white/40">
                        Reliability: {Math.round(input.sourceReliability * 100)}
                        %
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-semibold ${inputStatusClass(
                        input.status
                      )}`}
                    >
                      {input.status.toUpperCase()}
                    </div>
                    <div className="text-white/50">{input.confidence}%</div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
