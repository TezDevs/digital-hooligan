import type { ReactNode } from "react";
import Link from "next/link";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        minHeight: "100vh",
      }}
    >
      <aside style={{ borderRight: "1px solid rgba(0,0,0,0.1)", padding: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Radix Cockpit</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link href="/">Home</Link>
          <Link href="/ai">Atlas</Link>
        </nav>

        <div style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
          <div>env: {process.env.NEXT_PUBLIC_ENVIRONMENT ?? "dev"}</div>
        </div>
      </aside>

      <main style={{ padding: 16 }}>{children}</main>
    </div>
  );
}
