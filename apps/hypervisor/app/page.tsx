import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl p-10 space-y-6">
      <h1 className="text-3xl font-semibold">Hypervisor</h1>
      <p className="text-neutral-700">
        Portfolio-grade ops mission control demo aligned to RadixOS objects. Read-only. Deterministic mock data.
      </p>
      <Link className="inline-flex rounded-xl border px-4 py-2 hover:bg-neutral-50" href="/today">
        Enter Mission Control
      </Link>
    </main>
  );
}
