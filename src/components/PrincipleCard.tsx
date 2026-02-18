"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Principle } from "@/types";
import { useStore } from "@/store/useStore";

const PRINCIPLE_IMAGES: Record<string, string> = {
  P1: "/images/p1.png",
  P2: "/images/p2.png",
  P3: "/images/p3.png",
  P4: "/images/p4.png",
  P5: "/images/p5.png",
  P6: "/images/p6.png",
};

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
      className="relative flex flex-row h-full overflow-hidden select-none"
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
      {/* Left: Image area */}
      <div className="relative w-[35%] sm:w-[38%] flex-shrink-0 overflow-hidden">
        <Image
          src={PRINCIPLE_IMAGES[principle.id]}
          alt={principle.title}
          fill
          className="object-cover sm:object-contain object-center"
          sizes="(max-width: 640px) 35vw, 20vw"
          unoptimized
        />
        {isGreyedOut && (
          <div className="absolute inset-0 bg-white/50" />
        )}
      </div>

      {/* Center: Colored accent bar */}
      <div
        className="w-3 sm:w-4 md:w-5 lg:w-6 flex-shrink-0 self-stretch"
        style={{ backgroundColor: isGreyedOut ? "#c0c0bc" : principle.accentColor }}
      />

      {/* Right: Text content — tinted background */}
      <div
        className="flex-1 min-w-0 flex flex-col p-2 sm:p-3 md:p-4 lg:p-5"
        style={{ backgroundColor: isGreyedOut ? "#f0f0ee" : principle.accentColorLight }}
      >
        {/* Title */}
        <h3 className="text-[10px] sm:text-sm md:text-base lg:text-lg font-bold text-foreground leading-tight mb-1 sm:mb-2 line-clamp-2">
          {principle.title}
        </h3>

        {/* Description */}
        <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-text-secondary font-light leading-relaxed flex-1 min-h-0 overflow-y-auto thin-scrollbar">
          {principle.description}
        </p>
      </div>
    </motion.div>
  );
}
