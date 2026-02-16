"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-start justify-center min-h-[100dvh] px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-text-secondary mb-4">
          Experience Principles
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-tight tracking-tight text-foreground max-w-3xl">
          The principles that shape every experience we create.
        </h1>
        <p className="mt-5 text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
          Six foundational commitments guiding our team — from first encounter
          to lasting relationship. Use the AI engine below to apply them to
          real-world scenarios.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-[11px] font-medium tracking-wider uppercase">
          Scroll to begin
        </span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
