import { headers } from "next/headers";
import Link from "next/link";
import { DecisionReviewSnapshot } from "@/lib/decisionReviewSnapshot";

async function getSnapshot(): Promise<DecisionReviewSnapshot | null> {
  const h = await headers();

  const protocol = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");

  if (!host) return null;

  const url = `${protocol}://${host}/api/decision-reviews/snapshot`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.DECISION_REVIEW_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  try {
    return (await res.json()) as DecisionReviewSnapshot;
  } catch {
    return null;
  }
}

export default async function DecisionReviewSnapshotPanel() {
  const snapshot = await getSnapshot();

  if (!snapshot) {
    return (
      <section className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
        <h2 className="text-sm font-semibold text-neutral-300">
          Decision Reviews
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          No review data available.
        </p>
      </section>
    );
  }

  const counts = snapshot.counts ?? { open: 0, review: 0, closed: 0 };
  const recent = Array.isArray(snapshot.recent) ? snapshot.recent : [];

  return (
    <section className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
      <h2 className="mb-2 text-sm font-semibold text-neutral-300">
        Decision Reviews
      </h2>

      <div className="mb-4 flex gap-4 text-sm">
        <div>Open: {counts.open}</div>
        <div>Review: {counts.review}</div>
        <div>Closed: {counts.closed}</div>
      </div>

      <div className="space-y-2">
        {recent.length === 0 && (
          <div className="text-xs text-neutral-500">No recent decisions.</div>
        )}

        {recent.map((item) => (
          <Link
            key={item.id}
            href={`/ceo/dossier/${item.id}`}
            className="block text-xs text-neutral-400 hover:underline"
          >
            <div className="flex justify-between">
              <span>{item.title ?? "Untitled"}</span>
              <span className="uppercase">{item.status ?? "—"}</span>
            </div>
          </Link>
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
