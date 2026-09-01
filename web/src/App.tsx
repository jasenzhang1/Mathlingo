import { useState } from "react";
import { BootcampCallout } from "./components/BootcampCallout";
import { ConceptMap } from "./components/ConceptMap";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { SelectionBar } from "./components/SelectionBar";
import { Signup } from "./components/Signup";
import { TopicGrid } from "./components/TopicGrid";
import type { Track } from "./data/topics";

function App() {
  const [filter, setFilter] = useState<Track | "all">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggleTopic(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function pickPath(path: Track) {
    setFilter(path);
    document
      .getElementById("topics")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main>
        <Hero onPickPath={pickPath} />
        <section id="map" className="border-b border-[var(--line)]">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="text-center">
              <h2 className="font-display text-3xl text-[var(--ink)] md:text-4xl">
                Explore the concept map
              </h2>
              <p className="font-body mx-auto mt-3 max-w-xl text-[var(--ink-soft)]">
                Every concept we teach, connected by what you need to know
                first. Drag to pan, use the buttons to zoom, and click a node
                to jump into its lesson.
              </p>
            </div>
            <div className="mt-8">
              <ConceptMap />
            </div>
          </div>
        </section>
        <TopicGrid
          filter={filter}
          onFilterChange={setFilter}
          selected={selected}
          onToggle={toggleTopic}
        />
        <Features />
        <BootcampCallout />
        <Signup />
      </main>
      <Footer />
      <SelectionBar selected={selected} onClear={() => setSelected(new Set())} />
    </div>
  );
}

export default App;
