import StreetCred from "@/components/sections/StreetCred";
import AppsSection from "@/components/sections/AppsSection";
import About from "@/components/sections/About";
import Labs from "@/components/sections/Labs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";





export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-dh-black text-neutral-50">
        <StreetCred />
        <AppsSection />
        <About />
        <Labs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}



