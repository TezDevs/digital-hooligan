import { buildOpsSnapshot } from "../../../lib/radix/assembly/buildOpsSnapshot";

export default async function RadixOSPage() {
  const snapshot = buildOpsSnapshot();

  return (
    <main className="p-6 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">RadixOS v1</h1>
        <p className="text-sm opacity-80">
          Deterministic ops snapshot (derived). Append-only logs. Memory adapter (non-durable).
        </p>
        <p className="text-xs opacity-70">asOf: {snapshot.asOf}</p>
      </header>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Core — Decisions</h2>
        <p className="text-sm opacity-80">Open decisions: {snapshot.openDecisions.length}</p>
        <ul className="list-disc pl-6 space-y-1">
          {snapshot.openDecisions.map((d) => (
            <li key={d.id}>
              <span className="font-medium">{d.title}</span>{" "}
              <span className="text-xs opacity-70">({d.status})</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Pulse — Latest Metrics</h2>
        <ul className="list-disc pl-6 space-y-1">
          {Object.entries(snapshot.latestPulse).map(([k, v]) => (
            <li key={k}>
              <span className="font-medium">{k}:</span>{" "}
              {v ? (
                <span>
                  {v.value} <span className="text-xs opacity-70">(@ {v.capturedAt})</span>
                </span>
              ) : (
                <span className="text-sm opacity-70">missing</span>
              )}
            </li>
          ))}
        </ul>
        {snapshot.missingData.length > 0 && (
          <p className="text-sm opacity-70">Missing: {snapshot.missingData.join(", ")}</p>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Switchboard — Work Mode</h2>
        <p className="text-sm opacity-80">
          Current:{" "}
          {snapshot.currentWorkMode ? (
            <span className="font-medium">{snapshot.currentWorkMode.mode}</span>
          ) : (
            <span className="opacity-70">none</span>
          )}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Rituals — Recent</h2>
        <p className="text-sm opacity-80">Recent rituals: {snapshot.recentRituals.length}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Beacon — Signals (stub)</h2>
        <p className="text-sm opacity-80">Recent signals: {snapshot.recentSignals.length}</p>
      </section>

      <footer className="text-xs opacity-70">
        Note: v1 uses memory store (not durable). Upgrade path is DB-backed repositories.
      </footer>
    </main>
  );
}
