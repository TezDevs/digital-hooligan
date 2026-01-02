import { notFound } from "next/navigation";
import { headers } from "next/headers";

type Decision = {
  id: string;
  title: string;
  state: string;
  confidence: number;
  updatedAt: string;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DecisionPage({ params }: PageProps) {
  // ✅ REQUIRED in Next 16
  const { id } = await params;

  // ✅ headers() is ALSO async
  const h = await headers();
  const host = h.get("host");

  if (!host) {
    throw new Error("Missing host header");
  }

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/decisions/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to load decision");
  }

  const decision: Decision = await res.json();

  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">{decision.title}</h1>
        <p className="text-sm text-muted-foreground">
          Decision ID: {decision.id}
        </p>
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date(decision.updatedAt).toLocaleString()}
        </p>
      </header>

      <section className="rounded-lg border p-4">
        <h2 className="font-medium">State</h2>
        <p className="text-sm">{decision.state}</p>
      </section>

      <section className="rounded-lg border p-4">
        <h2 className="font-medium">Confidence</h2>
        <p className="text-sm">{decision.confidence}</p>
      </section>
    </div>
  );
}
