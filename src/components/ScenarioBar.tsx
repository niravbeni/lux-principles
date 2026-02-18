"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";

export default function ScenarioBar() {
  const {
    scenarioText,
    setScenarioText,
    submitScenario,
    resetScenario,
    isLoading,
    aiOutput,
  } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitScenario();
  };

  const charCount = scenarioText.length;
  const isOverLimit = charCount > 2000;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full w-full max-w-[1400px] mx-auto bg-card-surface rounded-2xl px-4 py-3 md:px-5 md:py-4 shadow-sm"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 -1px 2px rgba(0,0,0,0.02)" }}
    >
      {/* Textarea - fills available space */}
      <div className="relative flex-1 min-h-0 mb-2.5">
        <textarea
          id="scenario-input"
          value={scenarioText}
          onChange={(e) => setScenarioText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (scenarioText.trim() && !isOverLimit && !isLoading) {
                submitScenario();
              }
            }
          }}
          placeholder="Describe a scenario to apply the principles... e.g. A new customer is anxious about starting their treatment plan and unsure if the product is right for them."
          className="w-full h-full p-3 text-sm leading-relaxed text-foreground bg-background/60 border border-border/50 rounded-xl resize-none placeholder:text-text-secondary/35 focus:outline-none focus:ring-2 focus:ring-accent-p3/30 focus:border-accent-p3/30 transition-all"
          disabled={isLoading}
          aria-label="Scenario input"
        />
      </div>

      {/* Bottom toolbar: char count + buttons */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <p className="text-[11px] text-text-secondary/50 flex-1">
          Press Enter to submit &middot; Shift+Enter for new line
          {charCount > 0 && (
            <span
              className={`ml-2 tabular-nums ${
                isOverLimit ? "text-red-500 font-medium" : ""
              }`}
            >
              {charCount}/2000
            </span>
          )}
        </p>

        {/* Reset button */}
        {aiOutput && (
          <motion.button
            type="button"
            onClick={resetScenario}
            className="flex-shrink-0 px-3.5 py-1.5 text-sm font-medium text-text-secondary hover:text-foreground rounded-lg hover:bg-background/80 transition-colors cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.97 }}
          >
            Reset
          </motion.button>
        )}

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={isLoading || !scenarioText.trim() || isOverLimit}
          className="flex-shrink-0 px-5 py-1.5 text-sm font-semibold text-white bg-foreground rounded-lg hover:bg-foreground/90 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 transition-colors"
          style={{ cursor: isLoading || !scenarioText.trim() || isOverLimit ? "not-allowed" : "pointer" }}
          whileTap={{ scale: 0.97 }}
        >
          {isLoading ? (
            <span className="flex items-center gap-1.5">
              <span className="flex gap-0.5">
                <span className="loading-dot w-1 h-1 rounded-full bg-white" />
                <span className="loading-dot w-1 h-1 rounded-full bg-white" />
                <span className="loading-dot w-1 h-1 rounded-full bg-white" />
              </span>
              Analyzing
            </span>
          ) : (
            "Apply Principles"
          )}
        </motion.button>
      </div>
    </form>
  );
}
