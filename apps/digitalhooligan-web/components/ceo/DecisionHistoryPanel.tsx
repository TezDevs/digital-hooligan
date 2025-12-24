'use client';

type DecisionEvent = {
  id: string;
  state: 'ACT' | 'MONITOR' | 'NOMINAL';
  summary: string;
  evaluatedAt: string;
};

type DecisionHistoryPanelProps = {
  events: DecisionEvent[];
};

export default function DecisionHistoryPanel({ events }: DecisionHistoryPanelProps) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <header className="mb-3">
        <h2 className="text-sm font-semibold tracking-wide text-neutral-200">
          Decision History
        </h2>
        <p className="text-xs text-neutral-400">
          Recent decision state transitions
        </p>
      </header>

      <ol className="space-y-3">
        {events.map(event => (
          <li
            key={event.id}
            className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-200">
                {event.state}
              </span>
              <span className="text-xs text-neutral-500">
                {new Date(event.evaluatedAt).toLocaleString()}
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-400">
              {event.summary}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}