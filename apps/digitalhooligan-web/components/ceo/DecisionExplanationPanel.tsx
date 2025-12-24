'use client';

type DecisionRule = {
  id: string;
  label: string;
  description: string;
  status: 'passed' | 'failed' | 'unknown';
};

type DecisionExplanationPanelProps = {
  state: 'ACT' | 'MONITOR' | 'NOMINAL';
  rules: DecisionRule[];
  completeness: number; // 0–100
};

export default function DecisionExplanationPanel({
  state,
  rules,
  completeness,
}: DecisionExplanationPanelProps) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <header className="mb-3">
        <h2 className="text-sm font-semibold tracking-wide text-neutral-200">
          Decision Explanation
        </h2>
        <p className="text-xs text-neutral-400">
          Why the system is currently in <span className="font-mono">{state}</span>
        </p>
      </header>

      <div className="mb-4 space-y-2">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="flex items-start justify-between rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2"
          >
            <div>
              <p className="text-xs font-medium text-neutral-200">
                {rule.label}
              </p>
              <p className="text-xs text-neutral-400">
                {rule.description}
              </p>
            </div>

            <span
              className={`ml-3 text-xs font-mono ${
                rule.status === 'passed'
                  ? 'text-emerald-400'
                  : rule.status === 'failed'
                  ? 'text-red-400'
                  : 'text-yellow-400'
              }`}
            >
              {rule.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <footer className="text-xs text-neutral-400">
        Data completeness:{' '}
        <span className="font-mono text-neutral-200">
          {completeness}%
        </span>
      </footer>
    </section>
  );
}