'use client';

type EvidenceItem = {
  id: string;
  source: string;
  signal: string;
  status: 'used' | 'missing' | 'stale';
  timestamp?: string;
};

type EvidenceTrailPanelProps = {
  items: EvidenceItem[];
};

export default function EvidenceTrailPanel({ items }: EvidenceTrailPanelProps) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <header className="mb-3">
        <h2 className="text-sm font-semibold tracking-wide text-neutral-200">
          Evidence Trail
        </h2>
        <p className="text-xs text-neutral-400">
          Data sources used to compute the current decision
        </p>
      </header>

      <div className="space-y-2">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-start justify-between rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2"
          >
            <div>
              <p className="text-xs font-medium text-neutral-200">
                {item.source}
              </p>
              <p className="text-xs text-neutral-400">
                {item.signal}
              </p>
              {item.timestamp && (
                <p className="text-xs font-mono text-neutral-500">
                  {item.timestamp}
                </p>
              )}
            </div>

            <span
              className={`ml-3 text-xs font-mono ${
                item.status === 'used'
                  ? 'text-emerald-400'
                  : item.status === 'stale'
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}
            >
              {item.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}