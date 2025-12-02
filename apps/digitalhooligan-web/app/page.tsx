import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Apps from "@/components/sections/Apps";
import Labs from "@/components/sections/Labs";
import About from "@/components/sections/About";
import StreetCred from "@/components/sections/StreetCred";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Digital Hooligan – Apps, Bots & Automation Toys",
  description:
    "Digital Hooligan LLC builds tool-first apps, bots, and internal dashboards for sneakerheads, collectors, traders, and operators, with a clear path to gov & enterprise work.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
      <Hero />
      <Apps />
      <Labs />
      <About />
      <StreetCred />
      <CTA />
      <Contact />
    </main>
  );
}