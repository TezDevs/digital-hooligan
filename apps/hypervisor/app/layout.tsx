import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hypervisor",
  description: "Portfolio-grade ops mission control demo aligned to RadixOS objects. Read-only. Deterministic mock data."
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-neutral-950">{props.children}</body>
    </html>
  );
}
