import "./globals.css";
import type { Metadata } from "next";
import GlobalNav from "@/components/nav/GlobalNav";
import Footer from "@/components/layout/Footer";


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
      <body className="bg-black text-white antialiased">
        <GlobalNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}