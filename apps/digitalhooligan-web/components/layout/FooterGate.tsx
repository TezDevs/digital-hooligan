"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";

const HIDE_FOOTER_PREFIXES = [
  "/ceo",
  "/labs/hq",
  "/labs/app-registry",
  "/labs/experiments",
];

export default function FooterGate() {
  const pathname = usePathname();

  const hideFooter = HIDE_FOOTER_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  if (hideFooter) return null;

  return <Footer />;
}
