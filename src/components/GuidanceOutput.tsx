"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { principles } from "@/data/principles";

export default function GuidanceOutput() {
  const { aiOutput, isLoading, errorState } = useStore();

  return (
    <div
      className="flex flex-col gap-3 h-full"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Error state */}
      <AnimatePresence>
        {errorState && (
          <motion.div
            className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            role="alert"
          >
            {errorState}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading skeleton */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-4 w-40 bg-border rounded-lg animate-pulse" />
            <div className="h-3.5 w-full bg-border rounded-lg animate-pulse" />
            <div className="h-3.5 w-3/4 bg-border rounded-lg animate-pulse" />
            <div className="mt-1 h-24 w-full bg-border rounded-xl animate-pulse" />
            <div className="h-24 w-full bg-border rounded-xl animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Output */}
      <AnimatePresence>
        {aiOutput && !isLoading && (
          <motion.div
            className="flex flex-col gap-3.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {/* Activated principle chips */}
            <div className="flex flex-wrap gap-1.5">
              {aiOutput.activatedPrinciples.map((id) => {
                const principle = principles.find((p) => p.id === id);
                if (!principle) return null;
                return (
                  <motion.span
                    key={id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full"
                    style={{
                      backgroundColor: principle.accentColorLight,
                      color: principle.accentColor,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: principle.accentColor }}
                    />
                    {principle.id}
                  </motion.span>
                );
              })}
            </div>

            {/* Summary */}
            <motion.div
              className="p-3.5 rounded-xl bg-card-surface border border-border"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
            >
              <p className="text-xs font-semibold text-foreground mb-1 uppercase tracking-wider">
                Summary
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {aiOutput.summary}
              </p>
            </motion.div>

            {/* Guidance per principle */}
            {aiOutput.guidance.map((g, idx) => {
              const principle = principles.find((p) => p.id === g.principleId);
              if (!principle) return null;

              return (
                <motion.div
                  key={g.principleId}
                  className="p-4 rounded-xl bg-card-surface border border-border overflow-hidden"
                  style={{
                    borderLeftWidth: 3,
                    borderLeftColor: principle.accentColor,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.18 + idx * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase"
                      style={{ color: principle.accentColor }}
                    >
                      {principle.id}
                    </span>
                    <h4 className="text-sm font-semibold text-foreground">
                      {g.title}
                    </h4>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {g.recommendations.map((rec, recIdx) => (
                      <motion.li
                        key={recIdx}
                        className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: 0.25 + idx * 0.08 + recIdx * 0.04,
                        }}
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: principle.accentColor }}
                        />
                        {rec}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!aiOutput && !isLoading && !errorState && (
        <div className="flex flex-col items-center justify-center flex-1 text-center py-8">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-border mb-3"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <p className="text-sm text-text-secondary max-w-[200px] leading-snug">
            Describe a scenario to see AI-driven principle guidance here.
          </p>
        </div>
      )}
    </div>
  );
}
