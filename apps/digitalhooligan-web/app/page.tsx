import HeroV2 from "@/components/sections/HeroV2";
import BrandStory from "@/components/sections/BrandStory";
import AppGrid from "@/components/sections/AppGrid";
import Products from "@/components/sections/Products";
import StreetCred from "@/components/sections/StreetCred";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <main className="bg-dh-black text-dh-soft-white">
      <HeroV2 />
      <BrandStory />
      <AppGrid />
      <Products />
      <StreetCred />
      <CTA />
    </main>
  );
}
