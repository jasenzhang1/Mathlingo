import { useState } from "react";
import { BootcampCallout } from "./components/BootcampCallout";
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
