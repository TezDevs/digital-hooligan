"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";

export default function FooterGate() {
  const pathname = usePathname();
  const isCEO = pathname.startsWith("/ceo");

  if (isCEO) return null;

  return <Footer />;
}