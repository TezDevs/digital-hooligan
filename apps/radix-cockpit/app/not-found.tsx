import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Not found</h1>
      <p style={{ opacity: 0.8 }}>That route doesn’t exist in Radix Cockpit.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/">Go to Dashboard</Link>
        <Link href="/ai">Go to Atlas</Link>
      </div>
      <p style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
        If you got here from a saved link, it may be from an older cockpit
        version.
      </p>
    </div>
  );
}
