"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function AiError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[radix-cockpit] /ai error", {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Atlas failed to load</h2>
      <p style={{ opacity: 0.8 }}>Try again, or return to the dashboard.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => reset()} style={{ padding: "8px 12px" }}>
          Retry
        </button>
        <Link href="/">Dashboard</Link>
      </div>
      {error.digest && (
        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
          digest: {error.digest}
        </div>
      )}
    </div>
  );
}
