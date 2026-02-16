import Hero from "@/components/Hero";
import EngineView from "@/components/EngineView";

export default function Home() {
  return (
    <main>
      {/* Section 1: Hero - full viewport, scrolls away */}
      <section className="snap-start h-[100dvh]">
        <Hero />
      </section>

      {/* Section 2: Engine - snaps to fill entire viewport */}
      <section className="snap-start h-[100dvh] flex flex-col bg-background">
        <EngineView />
      </section>
    </main>
  );
}
