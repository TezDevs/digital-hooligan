import { getDecisions } from "@/lib/decision/getDecisions";

export default function DecisionInputsInspector() {
  const decisions = getDecisions();
  return (
    <section className="rounded-xl border border-white/10 bg-black/40 p-4">
      <h2 className="mb-3 text-lg font-semibold">Decision Inputs Inspector</h2>

      {/* Decision State Context */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40">
          Decision State Context
        </h3>

        <ul className="mt-3 space-y-3 text-sm">
          {decisions.map((decision) => (
            <li
              key={decision.id}
              className="rounded-md border border-white/10 bg-black/30 p-3"
            >
              <div className="font-medium text-white">{decision.title}</div>

              <div className="mt-1 text-white/60">
                <span className="text-xs font-semibold uppercase tracking-wide">
                  {decision.status}
                </span>
                {" — "}
                {decision.rationale}
              </div>

              {decision.blockers && decision.blockers.length > 0 && (
                <ul className="mt-2 list-disc pl-4 text-xs text-white/50">
                  {decision.blockers.map((blocker) => (
                    <li key={blocker}>{blocker}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
