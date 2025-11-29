import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalhooligan.io"),
  title: "Digital Hooligan — Apps for People Who Break the Rules, Not the Uptime",
  description:
    "Digital Hooligan is a one-person studio led by Courtez “Tez” Cannady, shipping sharp, reliable tools for payments, ops, and niche communities.",

  openGraph: {
    title: "Digital Hooligan — Dangerous Little Tools. Serious Fundamentals.",
    description:
      "Apps and experiments built by Courtez “Tez” Cannady: PennyWize, DropSignal, Ops Toys, and more.",
    url: "https://digitalhooligan.io",
    siteName: "Digital Hooligan",
    type: "website",
    images: "/og-image.png",
  },

  twitter: {
    card: "summary_large_image",
    title: "Digital Hooligan — Dangerous Little Tools. Serious Fundamentals.",
    description:
      "A small studio shipping opinionated apps for people who care about speed, reliability, and vibe.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      "/favicon.ico",
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
  themeColor: "#050505",
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
