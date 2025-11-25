// apps/digitalhooligan-web/lib/motion.ts
import type { Variants } from "framer-motion";

/**
 * Generic fade-up container with staggered children.
 * Use on a parent <motion.div>.
 */
export const fadeUpContainer: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

/**
 * Single fade-up item inside a container.
 */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Grid container for cards (Products section).
 */
export const cardsContainer: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

/**
 * Individual card animation (float up).
 */
export const cardFloat: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

/**
 * Shared viewport config for whileInView animations.
 */
export const inViewOnce = {
  once: true,
  amount: 0.25,
};
