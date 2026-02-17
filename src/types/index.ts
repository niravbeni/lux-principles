export interface Principle {
  id: string;
  title: string;
  manifesto: string;
  description: string;
  icon: string;
  accentColor: string;
  accentColorLight: string;
}

export interface Guidance {
  principleId: string;
  title: string;
  recommendations: string[];
}

export interface AIResponse {
  activatedPrinciples: string[];
  summary: string;
  guidance: Guidance[];
}

export interface AppState {
  scenarioText: string;
  activatedPrincipleIds: string[];
  aiOutput: AIResponse | null;
  isLoading: boolean;
  errorState: string | null;
  expandedCardId: string | null;
  setScenarioText: (text: string) => void;
  setExpandedCardId: (id: string | null) => void;
  submitScenario: () => Promise<void>;
  resetScenario: () => void;
}
