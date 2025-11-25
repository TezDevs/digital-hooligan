"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cardFloat } from "../../lib/motion";

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * AnimatedCard
 *
 * Reusable motion card with DH styling.
 * - Uses shared `cardFloat` variant
 * - Safe for hydration because content is wrapped in a plain <div>
 * - `className` lets you add extra styles per use-case
 */
export default function AnimatedCard({ children, className }: AnimatedCardProps) {
  return (
    <motion.div
      variants={cardFloat}
      whileHover={{ y: -6, rotateX: 3 }}
      whileTap={{ scale: 0.98 }}
      className={
        "group relative overflow-hidden rounded-2xl border border-dh-street-gray/70 " +
        "bg-gradient-to-b from-[#111111] to-[#050507] p-5 " +
        "shadow-[0_0_18px_rgba(0,0,0,0.6)] transition-colors duration-200 " +
        "hover:border-dh-electric-mint/70 " +
        (className ?? "")
      }
    >
      {/* Inner wrapper keeps DOM stable for SSR/CSR hydration */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}
