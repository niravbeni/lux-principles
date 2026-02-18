"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { principles } from "@/data/principles";

export default function GuidancePanel() {
  const { aiOutput, isLoading, errorState, dismissPanel } = useStore();

  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col bg-white rounded-2xl border border-border overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Close button — top right */}
      <button
        onClick={dismissPanel}
        className="absolute top-3 right-3 z-30 w-7 h-7 flex items-center justify-center rounded-full text-text-secondary hover:text-foreground hover:bg-border/40 transition-colors cursor-pointer"
        aria-label="Close guidance panel"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M2 2l10 10M12 2L2 12" />
        </svg>
      </button>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-5 lg:p-6 pr-10 hide-scrollbar">
        {/* Error state */}
        {errorState && (
          <motion.div
            className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="alert"
          >
            {errorState}
          </motion.div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="sm:w-1/4 flex flex-col gap-2">
              <div className="h-4 w-24 bg-border rounded animate-pulse" />
              <div className="h-3 w-full bg-border/60 rounded animate-pulse" />
              <div className="h-3 w-3/4 bg-border/60 rounded animate-pulse" />
            </div>
            <div className="flex-1 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3 w-32 bg-border rounded animate-pulse" />
                <div className="h-3 w-full bg-border/60 rounded animate-pulse" />
                <div className="h-3 w-full bg-border/60 rounded animate-pulse" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3 w-32 bg-border rounded animate-pulse" />
                <div className="h-3 w-full bg-border/60 rounded animate-pulse" />
                <div className="h-3 w-full bg-border/60 rounded animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* AI Output — 3-column layout matching Figma */}
        {aiOutput && !isLoading && (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            {/* Left column: Guidance heading + general advice */}
            <motion.div
              className="sm:w-1/4 flex-shrink-0"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
            >
              <h3 className="text-sm md:text-base lg:text-lg font-medium text-foreground mb-2">
                Guidance
              </h3>
              <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-text-secondary font-light leading-relaxed">
                {aiOutput.generalAdvice}
              </p>
            </motion.div>

            {/* Right columns: Activated principles side by side */}
            <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
              {aiOutput.guidance.map((g, idx) => {
                const principle = principles.find(
                  (p) => p.id === g.principleId
                );
                if (!principle) return null;

                return (
                  <motion.div
                    key={g.principleId}
                    className="flex-1 min-w-0"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.08 + idx * 0.06,
                      ease: "easeOut" as const,
                    }}
                  >
                    {/* Principle title */}
                    <h4 className="text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-foreground mb-2">
                      {g.title}
                    </h4>

                    {/* Bullet recommendations */}
                    <ul className="flex flex-col gap-1.5 md:gap-2">
                      {g.recommendations.map((rec, recIdx) => (
                        <li
                          key={recIdx}
                          className="flex items-start gap-2 text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-text-secondary font-light leading-relaxed"
                        >
                          <span
                            className="mt-[5px] md:mt-[6px] w-1 h-1 md:w-1.5 md:h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: principle.accentColor }}
                          />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
