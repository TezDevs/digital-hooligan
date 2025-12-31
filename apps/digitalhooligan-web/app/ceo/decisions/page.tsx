import Link from "next/link";
import { loadDecisionEntrySummaries } from "@/lib/decisionEntryStore";

export const dynamic = "force-dynamic";

type DecisionState = string;

function StateBadge({ state }: { state: DecisionState }) {
  const normalized = state.toLowerCase();

  const styles: Record<string, string> = {
    draft: "bg-gray-200 text-gray-800",
    review: "bg-amber-200 text-amber-900",
    approved: "bg-green-200 text-green-900",
    rejected: "bg-red-200 text-red-900",
  };

  const className = styles[normalized] ?? "bg-slate-200 text-slate-900";

  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {state.toUpperCase()}
    </span>
  );
}

export default async function DecisionsPage() {
  const decisions = await loadDecisionEntrySummaries();

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-xl font-semibold">Decisions</h1>
        <p className="text-sm text-muted-foreground">
          Read-only decision index. Status badges reflect current state.
        </p>
      </header>

      {/* ✅ Bucket 1 helper copy (explanatory only) */}
      <div className="text-xs text-muted-foreground max-w-3xl">
        <strong>Status definitions:</strong> Draft (created, not yet
        snapshotted), Recorded (stored without snapshots), Snapshotted (one or
        more snapshots exist), Locked (latest snapshot locked), Archived
        (decision archived).
      </div>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-2 text-left font-medium">ID</th>

              {/* ✅ Header helper line added safely */}
              <th className="px-4 py-2 text-left font-medium">
                <div className="flex flex-col">
                  <span>Status</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    Draft · Recorded · Snapshotted · Locked · Archived
                  </span>
                </div>
              </th>

              <th className="px-4 py-2 text-left font-medium">Last Updated</th>
              <th className="px-4 py-2 text-left font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {decisions.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  <div className="space-y-2">
                    <div className="font-medium text-foreground">
                      No decisions recorded
                    </div>
                    <div className="text-xs">
                      This table lists tracked decisions and their current
                      review state. Entries appear once a decision has been
                      logged.
                    </div>
                    <div className="text-xs">
                      This surface is read-only and reflects recorded state
                      only.
                    </div>
                  </div>
                </td>
              </tr>
            )}

            {decisions.map((decision) => (
              <tr
                key={decision.id}
                className="border-t last:border-b hover:bg-muted/30"
              >
                {/* ID */}
                <td className="px-4 py-2 font-mono text-sm">
                  <Link
                    href={`/ceo/decisions/review/${decision.id}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {decision.id}
                  </Link>
                </td>

                {/* Status (existing behavior preserved) */}
                <td className="px-4 py-2">
                  <StateBadge state={decision.state} />
                </td>

                {/* Last Updated */}
                <td className="px-4 py-2 text-muted-foreground">
                  {new Date(decision.updatedAt).toLocaleString()}
                </td>

                {/* Explicit Action */}
                <td className="px-4 py-2 text-right">
                  <Link
                    href={`/ceo/decisions/review/${decision.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Open review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
