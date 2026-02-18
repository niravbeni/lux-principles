"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { principles } from "@/data/principles";

export default function GuidancePanel() {
  const { aiOutput, isLoading, errorState, dismissPanel } = useStore();

  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col bg-background/95 backdrop-blur-md rounded-2xl border border-border overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Close button — top right */}
      <button
        onClick={dismissPanel}
        className="absolute top-2.5 right-3 z-30 w-7 h-7 flex items-center justify-center rounded-full text-text-secondary hover:text-foreground hover:bg-border/40 transition-colors cursor-pointer"
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
      <div className="flex-1 min-h-0 overflow-y-auto px-3 md:px-5 pt-6 md:pt-10 pb-2 md:pb-3 pr-8 md:pr-10 hide-scrollbar">
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
              <div className="h-12 w-full bg-border/60 rounded-lg animate-pulse" />
              <div className="h-12 w-full bg-border/60 rounded-lg animate-pulse" />
            </div>
          )}

          {/* AI Output */}
          {aiOutput && !isLoading && (
            <motion.div
              className="flex flex-col gap-2.5 md:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              {/* General advice */}
              <p className="text-xs md:text-base text-foreground/80 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {aiOutput.generalAdvice}
              </p>

              {/* Principle insights */}
              <div className="flex flex-col gap-2.5 md:gap-4">
                {aiOutput.guidance.map((g, idx) => {
                  const principle = principles.find(
                    (p) => p.id === g.principleId
                  );
                  if (!principle) return null;

                  return (
                    <motion.div
                      key={g.principleId}
                      className="flex gap-2.5 items-start"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 + idx * 0.08,
                        ease: "easeOut" as const,
                      }}
                    >
                      {/* Accent bar */}
                      <div
                        className="w-1 rounded-full flex-shrink-0 self-stretch mt-0.5"
                        style={{ backgroundColor: principle.accentColor }}
                      />

                      <div className="flex-1 min-w-0">
                        {/* Principle header */}
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-xs md:text-base leading-none">
                            {principle.icon}
                          </span>
                          <h4 className="text-[11px] md:text-sm font-semibold text-foreground">
                            {g.title}
                          </h4>
                        </div>

                        {/* Insight paragraph — clamped to 2 lines on mobile */}
                        <p className="text-[11px] md:text-sm text-text-secondary leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {g.insight}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
