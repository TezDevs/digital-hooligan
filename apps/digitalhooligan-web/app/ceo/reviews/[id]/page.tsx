import { loadDecisionEntries } from "@/lib/decisionEntryStore";
import { loadDecisionEntryAuditEvents } from "@/lib/decisionEntryAuditStore";
import Link from "next/link";

export default function DecisionReviewAuditPage({
  params,
}: {
  params: { id: string };
}) {
  const entries = loadDecisionEntries();
  const entry = entries.find((e) => e.id === params.id);

  if (!entry) {
    return (
      <main className="p-6">
        <p className="text-sm text-muted-foreground">
          Decision entry not found.
        </p>
        <Link href="/ceo/reviews" className="text-sm underline">
          Back to Review Queue
        </Link>
      </main>
    );
  }

  const auditEvents = loadDecisionEntryAuditEvents(entry.id);

  return (
    <main className="p-6 space-y-6">
      <header>
        <Link
          href="/ceo/reviews"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to Review Queue
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">{entry.title}</h1>
        <p className="text-sm text-muted-foreground">{entry.summary}</p>
      </header>

      <section className="rounded-lg border border-neutral-800 p-4">
        <h2 className="text-sm font-semibold text-neutral-300">
          Audit Timeline
        </h2>

        {auditEvents.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            No audit events recorded.
          </p>
        ) : (
          <ul className="mt-2 space-y-2 text-sm">
            {auditEvents.map((event, idx) => (
              <li
                key={idx}
                className="rounded-md border border-neutral-800 p-3"
              >
                <div className="font-medium">
                  {event.action === "created" ? "Created" : "Status Updated"}
                </div>

                <div className="text-xs text-muted-foreground">
                  {new Date(event.timestamp).toLocaleString()}
                </div>

                {event.meta && (
                  <pre className="mt-1 text-xs text-muted-foreground">
                    {JSON.stringify(event.meta, null, 2)}
                  </pre>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
