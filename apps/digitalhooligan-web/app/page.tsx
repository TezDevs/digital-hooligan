import Hero from "../components/sections/Hero";
import Apps from "../components/sections/Apps";
import HooliganLabs from "../components/sections/HooliganLabs";
import StreetCred from "../components/sections/StreetCred";
import CTA from "../components/sections/CTA";
import Contact from "../components/sections/Contact";

export default function HomePage() {
  return (
    <main className="bg-dh-black">
      <Hero />
      <Apps />
      <HooliganLabs />
      <StreetCred />
      <CTA />
      <Contact />
    </main>
  );
}
