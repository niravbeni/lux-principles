import { create } from "zustand";
import { AIResponse, AppState } from "@/types";

export const useStore = create<AppState>((set, get) => ({
  scenarioText: "",
  activatedPrincipleIds: [],
  aiOutput: null,
  isLoading: false,
  errorState: null,
  expandedCardId: null,

  setScenarioText: (text: string) => set({ scenarioText: text }),

  setExpandedCardId: (id: string | null) =>
    set((state) => ({
      expandedCardId: state.expandedCardId === id ? null : id,
    })),

  submitScenario: async () => {
    const { scenarioText } = get();
    if (!scenarioText.trim()) return;

    set({
      isLoading: true,
      errorState: null,
      activatedPrincipleIds: [],
      aiOutput: null,
    });

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: scenarioText.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Request failed with status ${response.status}`
        );
      }

      const data: AIResponse = await response.json();

      set({
        aiOutput: data,
        activatedPrincipleIds: data.activatedPrinciples,
        isLoading: false,
      });
    } catch (error) {
      set({
        errorState:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        isLoading: false,
      });
    }
  },

  resetScenario: () =>
    set({
      scenarioText: "",
      activatedPrincipleIds: [],
      aiOutput: null,
      isLoading: false,
      errorState: null,
      expandedCardId: null,
    }),
}));
