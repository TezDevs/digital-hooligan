import "./globals.css";
import type { Metadata } from "next";
import GlobalNav from "@/components/nav/GlobalNav";
import FooterGate from "@/components/layout/FooterGate";

export const metadata: Metadata = {
  title: "Digital Hooligan",
  description: "Apps, bots, dashboards & automation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dh-carbon text-dh-text antialiased">
        <GlobalNav />
        {children}
        <FooterGate />
      </body>
    </html>
  );
}
