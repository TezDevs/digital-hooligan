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
    archived: "bg-slate-200 text-slate-800",
  };

  const className = styles[normalized] ?? "bg-slate-200 text-slate-800";

  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium ${className}`}
    >
      {state.toUpperCase()}
    </span>
  );
}

export default async function DecisionsPage() {
  const decisions = await loadDecisionEntrySummaries();

  return (
    <div className="p-6 space-y-5">
      <header>
        <h1 className="text-xl font-semibold">Decisions</h1>
        <p className="text-sm text-muted-foreground">
          Read-only decision index. Status reflects recorded state.
        </p>
      </header>

      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-3 py-2 text-left font-medium">ID</th>
              <th className="px-3 py-2 text-left font-medium">Status</th>
              <th className="px-3 py-2 text-left font-medium">Updated</th>
              <th className="px-3 py-2 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {decisions.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-10 text-center text-muted-foreground"
                >
                  <div className="space-y-2">
                    <div className="font-medium">No decisions recorded</div>
                    <div className="text-xs max-w-md mx-auto">
                      This surface lists formal decisions and their recorded
                      state. Entries appear once a decision has been logged.
                    </div>
                    <div className="text-xs">
                      This view is read-only and reflects persisted history.
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
                <td className="px-3 py-2 font-mono text-xs">
                  <Link
                    href={`/ceo/decisions/review/${decision.id}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {decision.id}
                  </Link>
                </td>

                <td className="px-3 py-2">
                  <StateBadge state={decision.state} />
                </td>

                <td className="px-3 py-2 text-xs text-muted-foreground">
                  <div className="leading-tight">
                    <div className="text-[11px] uppercase tracking-wide">
                      Updated
                    </div>
                    <div className="font-mono">
                      {new Date(decision.updatedAt).toLocaleString()}
                    </div>
                  </div>
                </td>

                <td className="px-3 py-2 text-right">
                  <Link
                    href={`/ceo/decisions/review/${decision.id}`}
                    className="inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium text-primary hover:bg-muted"
                  >
                    Open →
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
