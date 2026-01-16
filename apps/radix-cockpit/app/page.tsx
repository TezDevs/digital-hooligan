import type { Mode } from "radix-core";
import { getCeoDashboardView } from "../lib/viewModels/ceoDashboard.server";

function parseMode(value: string | undefined): Mode {
  if (value === "Founder" || value === "Owner" || value === "Operator")
    return value;
  return "Operator";
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = searchParams ? await searchParams : undefined;

  const rawMode = typeof sp?.mode === "string" ? sp.mode : undefined;
  const mode = parseMode(rawMode);

  const vm = await getCeoDashboardView(mode);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>CEO Dashboard</h1>
          <div style={{ fontSize: 12, opacity: 0.7 }}>As of {vm.asOf}</div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12, opacity: 0.7 }}>Mode</span>
          <a href="/?mode=Founder">Founder</a>
          <a href="/?mode=Owner">Owner</a>
          <a href="/?mode=Operator">Operator</a>
        </div>
      </header>

      {(vm.missingData.length > 0 || vm.staleData.length > 0) && (
        <section style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Data Hygiene</div>

          {vm.missingData.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Missing</div>
              <ul>
                {vm.missingData.map((m) => (
                  <li key={m.key}>{m.message}</li>
                ))}
              </ul>
            </div>
          )}

          {vm.staleData.length > 0 && (
            <div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Stale</div>
              <ul>
                {vm.staleData.map((s) => (
                  <li key={s.key}>
                    {s.key} (last: {s.lastUpdatedAt})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section>
        <h2 style={{ marginBottom: 8 }}>KPI Strip</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {vm.metrics.map((m) => (
            <div
              key={m.id}
              style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}
            >
              <div style={{ fontSize: 12, opacity: 0.7 }}>{m.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>
                {String(m.value)} {m.unit ?? ""}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {m.source} • {m.lastUpdatedAt}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}
      >
        <div style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}>
          <h3 style={{ marginTop: 0 }}>Decisions & Alerts</h3>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
            Open decisions: {vm.openDecisions.length}
          </div>
          <ul>
            {vm.openDecisions.map((d) => (
              <li key={d.id}>
                <strong>{d.title}</strong> ({d.impact})
              </li>
            ))}
          </ul>

          {vm.alerts.length > 0 && (
            <>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
                Alerts
              </div>
              <ul>
                {vm.alerts.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}>
          <h3 style={{ marginTop: 0 }}>This Week’s Focus</h3>
          <div style={{ fontSize: 12, opacity: 0.7 }}>NOW (Top 3)</div>
          <ol>
            {vm.priorityStack.nowTop3.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ol>

          <details>
            <summary>NEXT</summary>
            <ul>
              {vm.priorityStack.next.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </details>

          <details>
            <summary>LATER</summary>
            <ul>
              {vm.priorityStack.later.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </details>
        </div>

        <div style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}>
          <h3 style={{ marginTop: 0 }}>System Health & Modules</h3>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
            Health score: <strong>{vm.health.compositeScore}</strong> •{" "}
            {vm.health.lastUpdatedAt}
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            {vm.modules.map((mod) => (
              <div
                key={mod.id}
                style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 8 }}
              >
                <div style={{ fontWeight: 600 }}>{mod.label}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{mod.status}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}>
        <h3 style={{ marginTop: 0 }}>Timeline</h3>
        <ul>
          {vm.timeline.slice(0, 10).map((e) => (
            <li key={e.id}>
              <strong>{e.title}</strong> — {e.occurredAt} ({e.type})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
