"use client";

type DecisionGuardrailPanelProps = {
  blocked: boolean;
  reasons: string[];
};

export default function DecisionGuardrailPanel({
  blocked,
  reasons,
}: DecisionGuardrailPanelProps) {
  if (!blocked) return null;

  return (
    <section className="rounded-xl border border-red-800 bg-red-950/40 p-4">
      <h2 className="mb-2 text-sm font-semibold text-red-300">
        Decision Guardrails Active
      </h2>

      <ul className="list-disc space-y-1 pl-4 text-xs text-red-200">
        {reasons.map((reason, idx) => (
          <li key={idx}>{reason}</li>
        ))}
      </ul>
    </section>
  );
}
