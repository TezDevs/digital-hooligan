import Link from "next/link";
import { loadDecisionEntries } from "@/lib/decisionEntryStore";

export const dynamic = "force-dynamic";

export default async function DecisionsPage() {
  const decisions = await loadDecisionEntries();

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Decisions</h1>
        <p className="text-sm text-muted-foreground">
          Read-only decision index. Click a decision to review details.
        </p>
      </header>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-2 text-left font-medium">ID</th>
              <th className="px-4 py-2 text-left font-medium">State</th>
              <th className="px-4 py-2 text-left font-medium">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {decisions.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No decisions found.
                </td>
              </tr>
            )}

            {decisions.map((decision) => (
              <tr
                key={decision.id}
                className="border-t hover:bg-muted/40 transition"
              >
                <td className="px-4 py-2 font-mono">
                  <Link
                    href={`/ceo/decisions/review/${decision.id}`}
                    className="underline underline-offset-2"
                  >
                    {decision.id}
                  </Link>
                </td>
                <td className="px-4 py-2 capitalize">{decision.state}</td>
                <td className="px-4 py-2">
                  {new Date(decision.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
