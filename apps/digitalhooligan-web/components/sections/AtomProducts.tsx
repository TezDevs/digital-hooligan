'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './atom-products.module.css';

type Product = {
  id: string;
  name: string;
  short: string;
  description: string;
  image: string;
  ring: 1 | 2 | 3;
  angle: number; // degrees around the circle
};

const PRODUCTS: Product[] = [
  {
    id: 'pennywize',
    name: 'PennyWize',
    short: 'Penny stock intel engine',
    description:
      'PennyWize watches micro-caps, news, and volume so you don’t have to. Built for fast scanning, alerting, and quick “is this worth my attention?” checks.',
    image: '/products/pennywize.png',
    ring: 1,
    angle: 90,
  },
  {
    id: 'sneakerscout',
    name: 'SneakerScout',
    short: 'Sneaker price-drop radar',
    description:
      'SneakerScout tracks drops across marketplaces, flags underpriced pairs, and helps you move fast on deals before they’re gone.',
    image: '/products/pennywize.png',
    ring: 1,
    angle: 210,
  },
  {
    id: 'labs',
    name: 'Hooligan Labs',
    short: 'R&D skunkworks',
    description:
      'Hooligan Labs is where weird prototypes live first: bots, scrapers, tactical dashboards, and experimental tools for operators.',
    image: '/products/pennywize.png',
    ring: 1,
    angle: 330,
  },
  {
    id: 'devhq',
    name: 'Dev HQ',
    short: 'Central ops console',
    description:
      'Dev HQ is your command center for Digital Hooligan projects, workflows, and automation. One place to launch, monitor, and improve your stack.',
    image: '/products/pennywize.png',
    ring: 2,
    angle: 30,
  },
  {
    id: 'brandkit',
    name: 'Brand Systems',
    short: 'Design + identity',
    description:
      'A unified cyberpunk-meets-operator design system: colors, typography, components, and motion that tie the Hooligan universe together.',
    image: '/products/pennywize.png',
    ring: 2,
    angle: 180,
  },
  {
    id: 'future',
    name: 'Future Apps',
    short: 'Upcoming drops',
    description:
      'Slots reserved for the next wave of Hooligan tools—small, sharp, and profitable utilities designed to punch above their weight.',
    image: '/products/pennywize.png',
    ring: 3,
    angle: 300,
  },
];

export default function AtomProducts() {
  // No card until a node is clicked
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* LEFT: atom diagram */}
        <motion.div
          className={styles.atomWrapper}
          animate={{ x: selected ? -20 : 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        >
          <div className={styles.atomGlow} />

          <div className={styles.atom}>
            {/* Nucleus */}
            <div className={styles.nucleus}>
              <div className={styles.nucleusContent}>
                <span className={styles.nucleusTag}>Digital</span>
                <span className={styles.nucleusTitle}>Hooligan</span>
                <span className={styles.nucleusSub}>Ops • Apps • Chaos</span>
              </div>
            </div>

            {/* Static orbits: nodes positioned around nucleus */}
            <div className={styles.orbits}>
              {PRODUCTS.map((product) => {
                const radius =
                  product.ring === 1 ? 110 : product.ring === 2 ? 170 : 220;
                const angleRad = (product.angle * Math.PI) / 180;
                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;

                const isSelected = selected?.id === product.id;

                return (
                  <motion.button
                    key={product.id}
                    type="button"
                    onClick={() => setSelected(product)}
                    className={`${styles.productNode} ${
                      isSelected ? styles.productNodeActive : ''
                    }`}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.productLabel}>{product.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: slide-in product detail panel */}
        <div className={styles.panelWrapper}>
          <AnimatePresence mode="wait">
            {selected && (
              <motion.aside
                key={selected.id}
                initial={{ x: 320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 320, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                className={styles.panel}
              >
                <div className={styles.panelHeader}>
                  <div>
                    <p className={styles.panelTag}>Product</p>
                    <h3 className={styles.panelTitle}>{selected.name}</h3>
                    <p className={styles.panelShort}>{selected.short}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className={styles.closeButton}
                  >
                    Close
                  </button>
                </div>

                <div className={styles.panelImageShell}>
                  <div className={styles.panelImage}>
                    <Image
                      src={selected.image}
                      alt={selected.name}
                      fill
                      className={styles.panelImageInner}
                    />
                  </div>
                </div>

                <p className={styles.panelBody}>{selected.description}</p>

                <p className={styles.panelHint}>
                  Tip: Click another node in the atom to switch focus. Each node
                  represents a core product or concept in the Digital Hooligan
                  universe.
                </p>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
