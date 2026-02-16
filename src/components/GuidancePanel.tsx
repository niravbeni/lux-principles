"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { principles } from "@/data/principles";

export default function GuidancePanel() {
  const { aiOutput, isLoading, errorState, resetScenario } = useStore();

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 z-20 flex flex-col"
      style={{ maxHeight: "65%" }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 300 }}
    >
      {/* Backdrop gradient */}
      <div className="h-8 bg-gradient-to-t from-background/95 to-transparent flex-shrink-0" />

      {/* Panel body */}
      <div className="bg-background/95 backdrop-blur-md border-t border-border flex-1 min-h-0 flex flex-col">
        {/* Drag handle + close */}
        <div className="flex items-center justify-between px-4 md:px-6 py-2.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 rounded-full bg-border" />
            <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              Guidance
            </span>
          </div>
          <button
            onClick={resetScenario}
            className="text-xs text-text-secondary hover:text-foreground transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-card-surface"
            aria-label="Close guidance panel"
          >
            Dismiss
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 pb-4 hide-scrollbar">
          <div className="max-w-[1400px] mx-auto">
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
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="h-3 w-32 bg-border rounded animate-pulse" />
                  <div className="h-3 w-24 bg-border rounded animate-pulse" />
                </div>
                <div className="h-20 w-full bg-border/60 rounded-lg animate-pulse" />
                <div className="flex gap-3">
                  <div className="h-20 flex-1 bg-border/60 rounded-lg animate-pulse" />
                  <div className="h-20 flex-1 bg-border/60 rounded-lg animate-pulse" />
                </div>
              </div>
            )}

            {/* AI Output - single flat list */}
            {aiOutput && !isLoading && (
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                {/* Summary */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {aiOutput.summary}
                </p>

                {/* Guidance as a single list */}
                <div className="flex flex-col gap-3">
                  {aiOutput.guidance.map((g, idx) => {
                    const principle = principles.find(
                      (p) => p.id === g.principleId
                    );
                    if (!principle) return null;

                    return (
                      <motion.div
                        key={g.principleId}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.08 + idx * 0.05,
                          ease: "easeOut",
                        }}
                      >
                        {/* Principle header */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
                            style={{
                              color: principle.accentColor,
                              backgroundColor: `${principle.accentColor}18`,
                            }}
                          >
                            {principle.id}
                          </span>
                          <h4 className="text-sm font-semibold text-foreground">
                            {g.title}
                          </h4>
                        </div>

                        {/* Recommendations */}
                        <ul className="flex flex-col gap-1 pl-1">
                          {g.recommendations.map((rec, recIdx) => (
                            <li
                              key={recIdx}
                              className="flex items-start gap-2 text-[13px] text-text-secondary leading-relaxed"
                            >
                              <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{
                                  backgroundColor: principle.accentColor,
                                }}
                              />
                              {rec}
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
        </div>
      </div>
    </motion.div>
  );
}
