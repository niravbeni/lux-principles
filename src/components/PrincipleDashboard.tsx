"use client";

import { motion } from "framer-motion";
import { principles } from "@/data/principles";
import PrincipleCard from "./PrincipleCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function PrincipleDashboard() {
  return (
    <section className="px-6 pb-16 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <motion.div
        className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-5 lg:gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {principles.map((principle) => (
          <motion.div key={principle.id} variants={cardVariants}>
            <PrincipleCard principle={principle} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
