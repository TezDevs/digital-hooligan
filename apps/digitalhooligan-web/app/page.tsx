import Hero from "../components/sections/Hero";
import AppsSection from "../components/sections/Apps";
import LabsSection from "../components/sections/Labs";
import AboutSection from "../components/sections/About";
import StreetCredSection from "../components/sections/StreetCred";
import CTASection from "../components/sections/CTA";
import ContactSection from "../components/sections/Contact";
import ServicesSection from "../components/sections/Services";


export default function HomePage() {
  return (
    <main className="...">
      <Hero />
      <AppsSection />
      <LabsSection />
      <AboutSection />

      <ServicesSection />

      <StreetCredSection />
      <CTASection />
      <ContactSection />
    </main>
  );
}

