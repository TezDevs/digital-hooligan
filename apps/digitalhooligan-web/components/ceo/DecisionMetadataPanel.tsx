'use client';

import { DecisionConfidence } from '@/lib/decisionTypes';

type DecisionMetadataPanelProps = {
  snapshotId: string;
  evaluatedAt: string;
  confidence: DecisionConfidence;
};

export default function DecisionMetadataPanel({
  snapshotId,
  evaluatedAt,
  confidence,
}: DecisionMetadataPanelProps) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-neutral-400">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
        <span>
          Snapshot ID:{' '}
          <span className="font-mono text-neutral-200">{snapshotId}</span>
        </span>

        <span>
          Evaluated at:{' '}
          <span className="font-mono text-neutral-200">
            {new Date(evaluatedAt).toLocaleString()}
          </span>
        </span>

        <span>
          Confidence:{' '}
          <span
            className={`font-mono ${
              confidence.label === 'HIGH'
                ? 'text-emerald-400'
                : confidence.label === 'MEDIUM'
                ? 'text-yellow-400'
                : 'text-red-400'
            }`}
          >
            {confidence.label} ({confidence.score}%)
          </span>
        </span>
      </div>
    </section>
  );
}