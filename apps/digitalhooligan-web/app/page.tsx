import Hero from "../components/sections/Hero";
import { AppGrid } from "../components/sections/AppGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050509] text-white">
      <Hero />
      <AppGrid />
    </main>
  );
}
