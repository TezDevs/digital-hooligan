import { getAiHubView } from "../../lib/viewModels/aiHub.server";

export default async function AiHubPage() {
  const vm = await getAiHubView();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <header>
        <h1 style={{ margin: 0 }}>Atlas Control Center</h1>
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          Operators: {vm.operators.length} • Workflows: {vm.workflows.length}
        </div>
      </header>

      {vm.issues.length > 0 && (
        <section style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Registry Health
          </div>
          <ul>
            {vm.issues.map((i, idx) => (
              <li key={idx}>{i.message}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 style={{ marginBottom: 8 }}>Atlas Operators</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {vm.operators.map((op) => (
            <div
              key={op.id}
              style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <div style={{ fontWeight: 700 }}>{op.name}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{op.status}</div>
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
                {op.role}
              </div>
              <div style={{ marginBottom: 8 }}>{op.description}</div>

              <div style={{ fontSize: 12, opacity: 0.7 }}>Scope</div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 8,
                }}
              >
                {op.scopeTags.map((t) => (
                  <span
                    key={t}
                    style={{
                      border: "1px solid rgba(0,0,0,0.1)",
                      padding: "2px 6px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ fontSize: 12, opacity: 0.7 }}>Expected inputs</div>
              <ul>
                {op.expectedInputs.map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>

              <div style={{ fontSize: 12, opacity: 0.7 }}>Expected outputs</div>
              <ul>
                {op.expectedOutputs.map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>

              <div style={{ fontSize: 12, opacity: 0.7 }}>Master prompt</div>
              <div>
                <code>{op.masterPrompt.kind}:</code> {op.masterPrompt.ref}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: 8 }}>Workflows & Chains</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {vm.workflows.map((wf) => (
            <div
              key={wf.id}
              style={{ border: "1px solid rgba(0,0,0,0.1)", padding: 12 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <div style={{ fontWeight: 700 }}>{wf.name}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{wf.status}</div>
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
                Tags: {wf.tags.join(", ") || "—"}
              </div>
              <div style={{ marginBottom: 8 }}>{wf.description}</div>

              <div style={{ fontSize: 12, opacity: 0.7 }}>Outputs</div>
              <ul>
                {wf.outputs.map((o, idx) => (
                  <li key={idx}>{o}</li>
                ))}
              </ul>

              <details>
                <summary>Steps ({wf.steps.length})</summary>
                <ol>
                  {wf.steps
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((s) => (
                      <li key={s.id} style={{ marginBottom: 10 }}>
                        <div style={{ fontWeight: 600 }}>
                          Step {s.order}: {s.operatorId}
                        </div>
                        <div>{s.purpose}</div>
                        <div style={{ fontSize: 12, opacity: 0.7 }}>
                          Prompt template
                        </div>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                          {s.promptTemplate.body}
                        </pre>
                      </li>
                    ))}
                </ol>
              </details>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
