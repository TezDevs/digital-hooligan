import type { Metadata } from "next";
import { Suspense } from "react";
import { LabsHqClient } from "./LabsHqClient";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function LabsHqPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 px-4 py-8 text-neutral-400">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm">Loading Labs HQ…</p>
          </div>
        </div>
      }
    >
      <LabsHqClient />
    </Suspense>
  );
}
