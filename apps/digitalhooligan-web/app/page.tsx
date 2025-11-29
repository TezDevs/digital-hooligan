import Hero from "@/components/sections/Hero";
import Apps from "@/components/sections/Apps";
import Labs from "@/components/sections/Labs";
import About from "@/components/sections/About";
import StreetCred from "@/components/sections/StreetCred";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Apps />
      <Labs />
      <About />
      <StreetCred />
      <CTA />
      <Contact />
    </>
  );
}
