'use client';

type DecisionMetadataPanelProps = {
  snapshotId: string;
  evaluatedAt: string;
};

export default function DecisionMetadataPanel({
  snapshotId,
  evaluatedAt,
}: DecisionMetadataPanelProps) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-neutral-400">
      <div className="flex flex-wrap gap-x-6 gap-y-1">
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
      </div>
    </section>
  );
}