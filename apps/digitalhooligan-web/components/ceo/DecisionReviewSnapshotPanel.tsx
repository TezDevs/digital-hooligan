import { headers } from "next/headers";
import { DecisionReviewSnapshot } from "@/lib/decisionReviewSnapshot";

async function getSnapshot(): Promise<DecisionReviewSnapshot> {
  const h = await headers();

  const protocol = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");

  if (!host) {
    throw new Error("Unable to determine request host");
  }

  const url = `${protocol}://${host}/api/decision-reviews/snapshot`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.DECISION_REVIEW_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load decision review snapshot");
  }

  return res.json();
}

export default async function DecisionReviewSnapshotPanel() {
  const snapshot = await getSnapshot();

  return (
    <section className="rounded-lg border border-neutral-800 p-4">
      <h2 className="mb-3 text-sm font-semibold text-neutral-300">
        Decision Reviews
      </h2>

      <div className="mb-4 flex gap-4 text-sm">
        <div>Open: {snapshot.counts.open}</div>
        <div>Review: {snapshot.counts.review}</div>
        <div>Closed: {snapshot.counts.closed}</div>
      </div>

      <div className="space-y-2">
        {snapshot.recent.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-xs text-neutral-400"
          >
            <span>{item.title}</span>
            <span className="uppercase">{item.status}</span>
          </div>
        ))}
      </div>

      {snapshot.lastActivityAt && (
        <div className="mt-3 text-xs text-neutral-500">
          Last activity: {new Date(snapshot.lastActivityAt).toLocaleString()}
        </div>
      )}
    </section>
  );
}
