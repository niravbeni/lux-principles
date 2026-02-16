# ⚖️ Experience Principles Engine

A responsive web application that serves as a living operating system for the Experience Team. It presents six foundational principles in a 2x3 grid and includes an AI assistant (GPT-4o-mini) that analyzes real-world scenarios and generates structured, actionable guidance mapped to relevant principles.

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

- **Six Principle Cards** — Interactive 2x3 grid with unique accent colors per principle
- **AI Scenario Engine** — Enter or dictate a scenario; GPT-4o-mini maps it to relevant principles with actionable recommendations
- **Voice Input** — Browser-native speech recognition (Web Speech API) for hands-free input
- **Activated Card States** — Activated principles highlight with a full border and glow; non-activated cards grey out
- **Slide-up Guidance Panel** — AI output appears as a slide-up panel with a flat, scrollable list of recommendations per principle
- **Scroll-snap Layout** — Hero section snaps to a full-viewport engine view on scroll
- **Diagonal Cascade Animation** — Cards animate in from top-left to bottom-right using Framer Motion when the section comes into view
- **Fully Responsive** — 2x3 grid on desktop, horizontal scroll on mobile

## The Six Principles

| ID | Principle | Color |
|----|-----------|-------|
| P1 | Lead with Accessible Expertise | Pink |
| P2 | See the Person, Serve the Vision | Warm Gold |
| P3 | Fold Care into Every Interaction | Teal |
| P4 | Celebrate Momentum to Fuel Confidence | Blue |
| P5 | Invite Trust, Never Assume It | Lavender |
| P6 | Pair Intelligence with Reassurance | Sage Green |

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + TypeScript
- **TailwindCSS 4**
- **Framer Motion** (animations + useInView)
- **Zustand** (state management)
- **OpenAI API** (GPT-4o-mini)
- **Web Speech API** (voice input)

## Deployment

Deploy to Vercel:

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Set `OPENAI_API_KEY` in **Settings > Environment Variables**
3. Deploy — Vercel auto-detects Next.js, no config needed

## Project Structure

```
src/
  app/
    layout.tsx            — Root layout, Inter font, metadata, favicon
    page.tsx              — Scroll-snap hero + engine sections
    globals.css           — Tailwind theme, scroll-snap, custom animations
    api/analyze/route.ts  — AI endpoint (GPT-4o-mini, rate-limited)
  components/
    Hero.tsx              — Title, subtitle, scroll indicator
    EngineView.tsx        — 2x3 card grid + scenario bar + guidance panel
    PrincipleCard.tsx     — Interactive card with activated/greyed states
    ScenarioBar.tsx       — Textarea input with voice + submit
    VoiceInput.tsx        — Speech recognition button
    GuidancePanel.tsx     — Slide-up AI output panel
  data/principles.ts      — The six principles
  store/useStore.ts       — Global state (Zustand)
  types/index.ts          — TypeScript interfaces
```
