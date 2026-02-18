"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HERO_IMAGES = [
  "/images/p1.png",
  "/images/p2.png",
  "/images/p3.png",
  "/images/p4.png",
  "/images/p5.png",
  "/images/p6.png",
];

export default function Hero() {
  const [imageIndex, setImageIndex] = useState(0);
  const wasInView = useRef(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sectionRef = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (!node) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const wasVisible = wasInView.current;
        const isVisible = ratio > 0.05;
        if (!isVisible && wasVisible) {
          setImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }
        wasInView.current = isVisible;
      },
      { threshold: [0, 0.05, 0.1, 0.5] }
    );
    observerRef.current.observe(node);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden">
      {/* Background image — cycles P1-P6, swaps while off-screen */}
      <div className="absolute top-[25%] bottom-0 right-0 w-[80%] md:w-[65%] lg:w-[55%] pointer-events-none select-none opacity-50 sm:opacity-65 lg:opacity-100"
      >
        <Image
          key={imageIndex}
          src={HERO_IMAGES[imageIndex]}
          alt=""
          fill
          className="object-contain object-right-bottom"
          priority
          unoptimized
          sizes="100vw"
        />
      </div>

      {/* Content wrapper */}
      <div className="relative flex flex-col items-start justify-center min-h-[100dvh] px-6 md:px-12 lg:px-16">

      {/* Top header */}
      <motion.p
        className="absolute top-6 left-6 md:top-8 md:left-12 lg:left-16 text-xs font-semibold tracking-[0.15em] uppercase text-foreground/70 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Store of the Future
      </motion.p>

      <motion.div
        className="relative z-10 mb-[12vh]"
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
        <p className="mt-5 text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
          Six foundational commitments guiding our team — from first encounter
          to lasting relationship. Use the AI engine below to apply them to
          real-world scenarios.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary z-10"
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
      </div>
    </section>
  );
}
