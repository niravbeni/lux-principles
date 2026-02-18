"use client";

import { motion } from "framer-motion";
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
        className="flex-shrink-0 px-2 py-1.5 sm:px-4 sm:py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 relative"
        style={{ backgroundColor: isGreyedOut ? "#c0c0bc" : principle.accentColor }}
      >
        {/* Title - single line on mobile, 2 lines on sm+ */}
        <h3 className="text-[11px] sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight sm:leading-snug line-clamp-1 sm:line-clamp-2 sm:min-h-[2lh]">
          {principle.title}
        </h3>
      </div>

      {/* Bottom white area with description */}
      <div
        className="flex-1 min-h-0 flex flex-col p-2 sm:p-4 md:p-5 lg:p-6 relative"
        style={{ backgroundColor: isGreyedOut ? "#f0f0ee" : "#ffffff" }}
      >
        {/* Icon - bottom right corner, desktop only */}
        <span
          className="absolute bottom-3 right-3 lg:bottom-4 lg:right-4 text-2xl md:text-3xl lg:text-4xl leading-none pointer-events-none transition-opacity duration-400 hidden md:block"
          style={{ opacity: isGreyedOut ? 0.3 : 1 }}
          role="img"
          aria-label={principle.id}
        >
          {principle.icon}
        </span>

        {/* Description - scrollable if needed */}
        <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-text-secondary leading-relaxed flex-1 min-h-0 overflow-y-auto thin-scrollbar md:pr-8 lg:pr-12">
          {principle.description}
        </p>
      </div>
    </motion.div>
  );
}
