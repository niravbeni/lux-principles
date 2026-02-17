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
        border: isActivated
          ? `2px solid ${principle.accentColor}`
          : "2px solid transparent",
        boxShadow: isActivated
          ? `0 0 28px 4px ${principle.accentColor}60, 0 2px 8px rgba(0,0,0,0.1)`
          : "0 1px 4px rgba(0,0,0,0.06)",
      }}
      animate={{
        opacity: isGreyedOut ? 0.5 : 1,
        scale: isGreyedOut ? 0.97 : 1,
      }}
      whileHover={{
        y: -3,
        opacity: 1,
        boxShadow: isActivated
          ? `0 0 36px 6px ${principle.accentColor}70, 0 4px 16px rgba(0,0,0,0.12)`
          : `0 4px 20px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)`,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      role="article"
      aria-label={principle.title}
      tabIndex={0}
    >
      {/* Top colored bar with title */}
      <div
        className="flex-shrink-0 px-4 py-3 md:px-5 md:py-4 relative"
        style={{ backgroundColor: isGreyedOut ? "#c0c0bc" : principle.accentColor }}
      >
        {/* Active indicator */}
        <AnimatePresence>
          {isActivated && (
            <motion.span
              className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase rounded-full bg-white/25 text-white"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Active
            </motion.span>
          )}
        </AnimatePresence>

        {/* Title - clamped to exactly 2 lines for consistency */}
        <h3 className="text-[13px] sm:text-base md:text-lg font-bold text-white leading-snug pr-12 line-clamp-2 h-[2lh]">
          {principle.title}
        </h3>
      </div>

      {/* Bottom white area with description */}
      <div
        className="flex-1 min-h-0 flex flex-col p-4 md:p-5 relative"
        style={{ backgroundColor: isGreyedOut ? "#f0f0ee" : "#ffffff" }}
      >
        {/* Icon - bottom right corner, desktop only */}
        <span
          className="absolute bottom-3 right-3 text-2xl md:text-3xl leading-none pointer-events-none transition-opacity duration-400 hidden md:block"
          style={{ opacity: isGreyedOut ? 0.3 : 1 }}
          role="img"
          aria-label={principle.id}
        >
          {principle.icon}
        </span>

        {/* Description - scrollable if needed */}
        <p className="text-[11px] md:text-xs text-text-secondary leading-relaxed flex-1 min-h-0 overflow-y-auto thin-scrollbar md:pr-8">
          {principle.description}
        </p>
      </div>
    </motion.div>
  );
}
