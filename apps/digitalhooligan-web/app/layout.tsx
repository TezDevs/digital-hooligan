import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Digital Hooligan — Apps for People Who Break the Rules, Not the Uptime",
  description:
    "Digital Hooligan is a one-person studio led by Courtez “Tez” Cannady, shipping sharp, reliable tools for payments, ops, and niche communities.",
  metadataBase: new URL("https://digitalhooligan.io"),
  openGraph: {
    title: "Digital Hooligan — Dangerous Little Tools. Serious Fundamentals.",
    description:
      "Apps and experiments built by Courtez “Tez” Cannady: PennyWize, Hooligan Labs, and more. Built with defense-grade discipline for real-world use.",
    url: "https://digitalhooligan.io",
    siteName: "Digital Hooligan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Hooligan — Dangerous Little Tools. Serious Fundamentals.",
    description:
      "A small studio shipping opinionated apps for people who care about speed, reliability, and vibe.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-dh-black text-white">
      <body className="min-h-screen bg-dh-black text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
