import { notFound } from "next/navigation";
import { Decision } from "@/lib/decisionTypes";
import { headers } from "next/headers";

interface PageProps {
  params: Promise<{
    decisionId: string;
  }>;
}

async function getDecision(decisionId: string): Promise<Decision | null> {
  const headersList = await headers();

  const host = headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "http";

  if (!host) return null;

  const url = `${proto}://${host}/api/decisions/review/${decisionId}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return null;
  return res.json();
}

export default async function DecisionReviewDetailPage({ params }: PageProps) {
  const { decisionId } = await params;
  const decision = await getDecision(decisionId);

  if (!decision) {
    notFound();
  }

  return (
    <div className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">{decision.title}</h1>
        <p className="text-sm text-muted-foreground">ID: {decision.id}</p>
        <p className="text-sm text-muted-foreground">
          Created: {new Date(decision.createdAt).toLocaleString()}
        </p>
      </header>
      <a
        href={`/api/decisions/review/${decision.id}/export`}
        className="text-sm text-primary hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Export JSON
      </a>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <h2 className="font-medium mb-2">Current State</h2>
          <dl className="space-y-1 text-sm">
            <div>
              <dt className="text-muted-foreground">State</dt>
              <dd>{decision.state}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Confidence</dt>
              <dd>
                {decision.confidence.label} ({decision.confidence.score})
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="font-medium mb-2">Confidence Baseline</h2>
          <p className="text-sm">
            {decision.confidenceBaseline ?? "Not recorded"}
          </p>
        </div>
      </section>

      <section className="rounded-lg border p-4 space-y-3">
        <h2 className="font-medium">Evidence</h2>

        {decision.evidence.length === 0 && (
          <p className="text-sm text-muted-foreground">No evidence recorded.</p>
        )}

        {decision.evidence.map((item) => (
          <div key={item.id} className="rounded border p-3 text-sm space-y-1">
            <div className="font-medium">{item.signal}</div>
            <div className="text-muted-foreground">Source: {item.source}</div>
            <div className="text-xs text-muted-foreground">
              Status: {item.status} ·{" "}
              {new Date(item.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </section>

      {decision.confidenceSnapshots && (
        <section className="rounded-lg border p-4 space-y-2">
          <h2 className="font-medium">Confidence History</h2>
          {decision.confidenceSnapshots.map((snap) => (
            <div key={snap.id} className="text-sm text-muted-foreground">
              {snap.inputId}: {snap.value} @{" "}
              {new Date(snap.observedAt).toLocaleString()}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
