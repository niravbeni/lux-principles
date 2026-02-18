export interface PrincipleGuardrail {
  title: string;
  detail: string;
}

export interface Principle {
  id: string;
  title: string;
  manifesto: string;
  description: string;
  icon: string;
  accentColor: string;
  accentColorLight: string;
  dos: PrincipleGuardrail[];
  donts: PrincipleGuardrail[];
}

export interface Guidance {
  principleId: string;
  title: string;
  insight: string;
}

export interface AIResponse {
  activatedPrinciples: string[];
  generalAdvice: string;
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
  dismissPanel: () => void;
}
