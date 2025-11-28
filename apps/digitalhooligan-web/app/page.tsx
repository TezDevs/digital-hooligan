import Hero from "@/components/sections/Hero";
import AppsShowcase from "@/components/sections/AppsShowcase";
import HooliganLabs from "@/components/sections/HooliganLabs";
import StreetCred from "@/components/sections/StreetCred";
import BrandStory from "@/components/sections/BrandStory";  // 👈 add this
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";


export default function HomePage() {
  return (
    <main id="top" className="bg-dh-black text-white">
      <Hero />
      <AppsShowcase />
      <HooliganLabs />
      <StreetCred />
      <BrandStory />   {/* 👈 Why DH section now renders here */}
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
