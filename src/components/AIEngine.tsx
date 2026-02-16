"use client";

import { motion } from "framer-motion";
import ScenarioInput from "./ScenarioInput";
import GuidanceOutput from "./GuidanceOutput";

export default function AIEngine() {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Section header */}
        <div className="mb-8">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-text-secondary mb-2">
            AI Engine
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Apply principles to your scenario
          </h2>
          <p className="mt-2 text-sm text-text-secondary max-w-xl">
            Describe a real experience design challenge. Our AI will analyze it
            against the five principles and generate tailored, actionable
            guidance.
          </p>
        </div>

        {/* Split layout: input left, output right on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Input */}
          <div className="lg:sticky lg:top-8">
            <ScenarioInput />
          </div>

          {/* Right: Output */}
          <div className="min-h-[200px]">
            <GuidanceOutput />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
