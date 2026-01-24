import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hypervisor",
  description: "Portfolio-grade ops mission control demo (mock data, deterministic rules)."
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
