import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl p-10 space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">About Hypervisor</h1>
      <p className="text-neutral-700">
        This is a read-only, portfolio-grade demo. Data is mocked but deterministic, designed to showcase RadixOS governance objects and explainability.
      </p>

      <ul className="list-disc pl-5 text-neutral-700 space-y-1">
        <li>No auth</li>
        <li>No external integrations</li>
        <li>No write actions</li>
      </ul>

      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-xl border px-4 py-2 hover:bg-neutral-50"
      >
        Back to Home
      </Link>
    </main>
  );
}
