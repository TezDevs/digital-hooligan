"use client";

import { DecisionAction } from "@/lib/decisionActions";

type DecisionActionsPanelProps = {
  actions: DecisionAction[];
};

export default function DecisionActionsPanel({
  actions,
}: DecisionActionsPanelProps) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <h2 className="mb-3 text-sm font-semibold tracking-wide text-neutral-200">
        Available Actions
      </h2>

      <ul className="space-y-2">
        {actions.map((action) => (
          <li
            key={action.id}
            className="flex items-center justify-between rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2"
          >
            <span className="text-xs text-neutral-200">{action.label}</span>

            {action.enabled ? (
              <span className="text-xs text-emerald-400">Enabled</span>
            ) : (
              <span className="text-xs text-red-400" title={action.reason}>
                Blocked
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
