"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("../components/sections/Hero"), {
  ssr: false, // make Hero client-side only
});

export default function HeroClient() {
  return <Hero />;
}
