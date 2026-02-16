# Experience Principles Engine

A responsive web application that serves as a living operating system for the Experience Team. It presents five foundational principles and includes an AI assistant (GPT-4o-mini) that analyzes scenarios and generates structured, actionable guidance mapped to relevant principles.

## Getting Started

### Prerequisites

- Node.js 18+
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Setup

1. Install dependencies:

```bash
npm install
```

2. Add your OpenAI API key to `.env.local`:

```
OPENAI_API_KEY=sk-your-key-here
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Principle Dashboard** — Five interactive cards with hover, expand, and AI-activated states
- **AI Scenario Engine** — Enter or dictate a scenario; GPT-4o-mini maps it to relevant principles with actionable recommendations
- **Voice Input** — Browser-native speech recognition (Web Speech API) for hands-free input
- **Animated Highlighting** — Activated principles glow subtly when the AI determines they apply
- **Fully Responsive** — Works across desktop, tablet, and mobile (iOS & Android)

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + TypeScript
- **TailwindCSS 4**
- **Framer Motion** (animations)
- **Zustand** (state management)
- **OpenAI API** (GPT-4o-mini)
- **Web Speech API** (voice input)

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Set `OPENAI_API_KEY` in your Vercel project's environment variables.

## Project Structure

```
src/
  app/
    layout.tsx          — Root layout, Inter font, metadata
    page.tsx            — Main page composing all sections
    globals.css         — Tailwind theme + custom animations
    api/analyze/route.ts — AI endpoint (GPT-4o-mini)
  components/
    Hero.tsx            — Title and introduction
    PrincipleDashboard.tsx — Card grid/scroll layout
    PrincipleCard.tsx   — Interactive principle card
    AIEngine.tsx        — AI section container
    ScenarioInput.tsx   — Text input + voice + submit
    VoiceInput.tsx      — Speech recognition button
    GuidanceOutput.tsx  — Rendered AI guidance
    Footer.tsx          — Page footer
  data/principles.ts    — The five principles
  store/useStore.ts     — Global state
  types/index.ts        — TypeScript types
```
