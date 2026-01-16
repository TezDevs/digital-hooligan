"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Intentionally minimal: no secrets/PII logging.
    // If you later add telemetry, keep it redacted and internal.
    console.error("[radix-cockpit] global error", {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Something went wrong</h1>
      <p style={{ opacity: 0.8 }}>
        The cockpit hit an error rendering this page.
      </p>

      <div
        style={{
          border: "1px solid rgba(0,0,0,0.12)",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.7 }}>Error</div>
        <div
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 13,
          }}
        >
          {error.message}
        </div>
        {error.digest && (
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
            digest: {error.digest}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button onClick={() => reset()} style={{ padding: "8px 12px" }}>
          Try again
        </button>
        <Link href="/">Back to Dashboard</Link>
        <Link href="/ai">Back to Atlas</Link>
      </div>

      <p style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
        Note: cockpit security boundary is Cloudflare Access; no in-app auth is
        performed.
      </p>
    </div>
  );
}
