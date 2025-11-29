import Hero from "../components/sections/Hero";
import AppsSection from "../components/sections/Apps";
import LabsSection from "../components/sections/Labs";
import AboutSection from "../components/sections/About";
import StreetCredSection from "../components/sections/StreetCred";
import CTASection from "../components/sections/CTA";
import ContactSection from "../components/sections/Contact";

export default function HomePage() {
  return (
    <main className="bg-dh-black text-dh-offwhite">
      <Hero />
      <AppsSection />
      <LabsSection />
      <AboutSection />
      <StreetCredSection />
      <CTASection />
      <ContactSection />
    </main>
  );
}
