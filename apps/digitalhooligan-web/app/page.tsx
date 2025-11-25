import HeroClient from "./HeroClient";
import AtomProducts from "../components/sections/AtomProducts";

export default function Home() {
  return (
    <main className="min-h-screen bg-dh-black text-white">
      <HeroClient />
      <AtomProducts />
    </main>
  );
}
