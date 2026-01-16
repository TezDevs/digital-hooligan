import type { ReactNode } from "react";
import "./globals.css";
import { AppShell } from "./_components/AppShell";

export const metadata = {
  title: "Radix Cockpit",
  description: "Internal CEO cockpit for Digital Hooligan",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
