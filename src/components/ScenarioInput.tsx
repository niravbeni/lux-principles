"use client";

import { useStore } from "@/store/useStore";
import VoiceInput from "./VoiceInput";
import { motion } from "framer-motion";
import { useCallback } from "react";

export default function ScenarioInput() {
  const {
    scenarioText,
    setScenarioText,
    submitScenario,
    resetScenario,
    isLoading,
    aiOutput,
  } = useStore();

  const handleVoiceTranscript = useCallback(
    (text: string) => {
      setScenarioText(text);
    },
    [setScenarioText]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitScenario();
  };

  const charCount = scenarioText.length;
  const isOverLimit = charCount > 2000;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 h-full rounded-xl bg-card-surface border border-border p-4">
      <div className="flex items-center justify-between">
        <label
          htmlFor="scenario-input"
          className="text-xs font-semibold text-foreground uppercase tracking-wider"
        >
          Your Scenario
        </label>
        <span
          className={`text-[10px] tabular-nums ${
            isOverLimit ? "text-red-500 font-medium" : "text-text-secondary"
          }`}
        >
          {charCount}/2000
        </span>
      </div>

      <div className="relative flex-1 min-h-0">
        <textarea
          id="scenario-input"
          value={scenarioText}
          onChange={(e) => setScenarioText(e.target.value)}
          placeholder="e.g. A new customer is anxious about starting their treatment plan and unsure if the product is right for them..."
          className="w-full h-full min-h-[80px] p-3 pr-12 text-sm leading-relaxed text-foreground bg-background border border-border rounded-lg resize-none placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-p3/40 focus:border-accent-p3/40 transition-all"
          disabled={isLoading}
          aria-describedby="scenario-help"
        />
        <div className="absolute top-2.5 right-2.5">
          <VoiceInput
            onTranscript={handleVoiceTranscript}
            disabled={isLoading}
          />
        </div>
      </div>

      <p id="scenario-help" className="text-[10px] text-text-secondary leading-snug">
        Describe a real scenario. The AI maps it to the relevant principles
        and generates tailored guidance.
      </p>

      <div className="flex gap-2">
        <motion.button
          type="submit"
          disabled={isLoading || !scenarioText.trim() || isOverLimit}
          className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-foreground rounded-lg hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 transition-colors cursor-pointer"
          whileTap={{ scale: 0.97 }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="flex gap-1">
                <span className="loading-dot w-1.5 h-1.5 rounded-full bg-white" />
                <span className="loading-dot w-1.5 h-1.5 rounded-full bg-white" />
                <span className="loading-dot w-1.5 h-1.5 rounded-full bg-white" />
              </span>
              Analyzing
            </span>
          ) : (
            "Apply Principles"
          )}
        </motion.button>

        {aiOutput && (
          <motion.button
            type="button"
            onClick={resetScenario}
            className="px-3 py-2 text-sm font-medium text-text-secondary bg-background border border-border rounded-lg hover:text-foreground hover:border-foreground/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 transition-colors cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.97 }}
          >
            Reset
          </motion.button>
        )}
      </div>
    </form>
  );
}
