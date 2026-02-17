"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Principle } from "@/types";
import { useStore } from "@/store/useStore";

interface PrincipleCardProps {
  principle: Principle;
}

export default function PrincipleCard({ principle }: PrincipleCardProps) {
  const { activatedPrincipleIds } = useStore();
  const isActivated = activatedPrincipleIds.includes(principle.id);
  const hasAnyActivated = activatedPrincipleIds.length > 0;
  const isGreyedOut = hasAnyActivated && !isActivated;

  return (
    <motion.div
      className="relative flex flex-col h-full rounded-2xl overflow-hidden select-none"
      style={{
        backgroundColor: isGreyedOut
          ? "#f0f0ee"
          : `${principle.accentColor}14`,
        border: isActivated
          ? `2px solid ${principle.accentColor}`
          : "2px solid transparent",
        boxShadow: isActivated
          ? `0 0 28px 4px ${principle.accentColor}50, 0 2px 8px rgba(0,0,0,0.06)`
          : "0 1px 3px rgba(0,0,0,0.03)",
      }}
      animate={{
        opacity: isGreyedOut ? 0.5 : 1,
        scale: isGreyedOut ? 0.97 : 1,
      }}
      whileHover={{
        y: -3,
        opacity: 1,
        boxShadow: isActivated
          ? `0 0 36px 6px ${principle.accentColor}60, 0 4px 16px rgba(0,0,0,0.08)`
          : `0 4px 20px ${principle.accentColor}25, 0 2px 8px rgba(0,0,0,0.04)`,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      role="article"
      aria-label={principle.title}
      tabIndex={0}
    >
      {/* Activated glow overlay */}
      <AnimatePresence>
        {isActivated && (
          <motion.div
            className="absolute inset-0 pointer-events-none glow-animation rounded-2xl"
            style={{
              background: `linear-gradient(160deg, ${principle.accentColor}18 0%, ${principle.accentColor}30 100%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Icon - bottom right corner, desktop only */}
      <span
        className="absolute bottom-3 right-3 text-3xl leading-none pointer-events-none z-10 transition-opacity duration-400 hidden md:block"
        style={{ opacity: isGreyedOut ? 0.3 : 1 }}
        role="img"
        aria-label={principle.id}
      >
        {principle.icon}
      </span>

      <div className="p-4 md:p-5 flex flex-col flex-1 min-h-0 relative z-10 transition-all duration-400">
        {/* Top: Active indicator */}
        <AnimatePresence>
          {isActivated && (
            <motion.div className="flex items-center mb-2 flex-shrink-0">
              <motion.span
                className="flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase rounded-full"
                style={{
                  backgroundColor: `${principle.accentColor}25`,
                  color: principle.accentColor,
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: principle.accentColor }}
                />
                Active
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title - two lines */}
        <h3 className="text-base md:text-lg font-bold text-foreground leading-snug mb-3 md:mb-4 flex-shrink-0 whitespace-pre-line">
          {principle.title}
        </h3>

        {/* Description - scrollable if needed */}
        <p className="text-[11px] md:text-xs text-text-secondary leading-relaxed flex-1 min-h-0 overflow-y-auto thin-scrollbar md:pr-8">
          {principle.description}
        </p>
      </div>
    </motion.div>
  );
}
