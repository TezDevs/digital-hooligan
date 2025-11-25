"use client";

import Container from "../layout/Container";
import { motion } from "framer-motion";
import AnimatedCard from "../animated/AnimatedCard";
import {
  cardsContainer,
  inViewOnce,
} from "../../lib/motion";

type Product = {
  name: string;
  tag: string;
  description: string;
  badgeClass: string;
};

const products: Product[] = [
  {
    name: "PennyWize",
    tag: "Finance • Micro-markets",
    description:
      "Real-time penny stock alerts, micro-market intelligence, and pattern detection.",
    badgeClass: "bg-dh-rebel-red/20 text-dh-rebel-red border-dh-rebel-red/40",
  },
  {
    name: "SneakerScout",
    tag: "Sneakers • Price Drops",
    description:
      "Smart sneaker price-drop radar and automated scraper that surfaces under-retail steals.",
    badgeClass:
      "bg-dh-electric-mint/20 text-dh-electric-mint border-dh-electric-mint/40",
  },
  {
    name: "Hooligan Labs",
    tag: "R&D • Prototyping",
    description:
      "A skunkworks for bots, dashboards, scrapers, and neon-fast experiments that may or may not behave.",
    badgeClass:
      "bg-dh-graffiti-yellow/20 text-dh-graffiti-yellow border-dh-graffiti-yellow/40",
  },
];

export default function Products() {
  return (
    <Container className="py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <h2 className="text-3xl font-bold text-white">The Hooligan Stack</h2>
        <p className="text-sm text-neutral-400">
          Apps · Dashboards · Scrapers · Experiments
        </p>
      </motion.div>

      {/* Product Cards */}
      <motion.div
        variants={cardsContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mt-8 grid gap-6 md:grid-cols-3"
      >
        {products.map((p) => (
          <AnimatedCard key={p.name}>
            <div
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${p.badgeClass}`}
            >
              {p.tag}
            </div>

            <h3 className="mt-4 text-xl font-semibold text-white">{p.name}</h3>

            <p className="mt-2 text-sm leading-relaxed text-neutral-300">
              {p.description}
            </p>

            <div className="mt-4 text-xs font-mono uppercase tracking-[0.18em] text-dh-electric-mint/80">
              View project →
            </div>

            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-dh-electric-mint/20 via-dh-spray-pink/15 to-transparent opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-100" />
          </AnimatedCard>
        ))}
      </motion.div>
    </Container>
  );
}
