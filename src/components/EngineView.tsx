"use client";

import { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { principles } from "@/data/principles";
import PrincipleCard from "./PrincipleCard";
import ScenarioBar from "./ScenarioBar";
import GuidancePanel from "./GuidancePanel";
import { useStore } from "@/store/useStore";

function getDiagonalDelay(index: number, cols: number) {
  const row = Math.floor(index / cols);
  const col = index % cols;
  return (row + col) * 0.1;
}

export default function EngineView() {
  const { aiOutput, isLoading } = useStore();
  const showPanel = aiOutput || isLoading;
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.2 });

  return (
    <div className="relative flex flex-col h-full bg-background overflow-hidden">
      {/* Cards - 2x3 grid on desktop, horizontal scroll on mobile */}
      <div className="flex-[3] min-h-0 p-3 md:p-4 lg:p-5 pb-2" ref={gridRef}>
        {/* Mobile: horizontal scroll */}
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar h-full md:hidden">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.id}
              className="min-w-[200px] flex-shrink-0 h-full"
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 20, scale: 0.92 }
              }
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <PrincipleCard principle={principle} />
            </motion.div>
          ))}
        </div>

        {/* Desktop: 2 rows x 3 columns grid */}
        <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-3 lg:gap-4 h-full max-w-[1400px] mx-auto">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.id}
              className="h-full"
              initial={{ opacity: 0, y: 30, scale: 0.88 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 30, scale: 0.88 }
              }
              transition={{
                duration: 0.55,
                delay: getDiagonalDelay(i, 3) + 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <PrincipleCard principle={principle} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom scenario input area */}
      <motion.div
        className="flex-[2] min-h-[140px] flex flex-col p-3 md:p-4 lg:p-5 pt-2"
        initial={{ opacity: 0, y: 15 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 15 }
        }
        transition={{
          duration: 0.5,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <ScenarioBar />
      </motion.div>

      {/* Guidance panel - slides up when AI output is available */}
      <AnimatePresence>
        {showPanel && <GuidancePanel />}
      </AnimatePresence>
    </div>
  );
}
