import Container from "@/components/layout/Container";
import Hero from "@/components/sections/Hero";
import AppsShowcase from "@/components/sections/AppsShowcase";
import StreetCred from "@/components/sections/StreetCred";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dh-black text-white flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <Container className="py-16">
          <Hero />
        </Container>

        {/* Apps / Icons */}
        <section id="apps" className="border-t border-dh-street-gray/40">
          <Container className="py-16">
            <AppsShowcase />
          </Container>
        </section>

        {/* StreetCred */}
        <section id="streetcred" className="border-t border-dh-street-gray/40">
          <Container className="py-16">
            <StreetCred />
          </Container>
        </section>

        {/* CTA */}
        <section id="cta" className="border-t border-dh-street-gray/40">
          <Container className="py-16">
            <CTA />
          </Container>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-dh-street-gray/40">
          <Container className="py-16">
            <Contact />
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
