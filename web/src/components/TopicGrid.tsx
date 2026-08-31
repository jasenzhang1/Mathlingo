import { useMemo } from "react";
import { topics, type Track } from "../data/topics";
import { TopicCard } from "./TopicCard";

interface TopicGridProps {
  filter: Track | "all";
  onFilterChange: (filter: Track | "all") => void;
  selected: Set<string>;
  onToggle: (id: string) => void;
}

const filters: { id: Track | "all"; label: string }[] = [
  { id: "all", label: "All topics" },
  { id: "refresh", label: "Refresher" },
  { id: "bootcamp", label: "Bootcamp" },
];

export function TopicGrid({
  filter,
  onFilterChange,
  selected,
  onToggle,
}: TopicGridProps) {
  const visible = useMemo(
    () =>
      filter === "all"
        ? topics
        : topics.filter((topic) => topic.tracks.includes(filter)),
    [filter],
  );

  return (
    <section id="topics" className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl text-[var(--ink)] md:text-4xl">
            Pick what you want to drill
          </h2>
          <p className="font-body mx-auto mt-3 max-w-xl text-[var(--ink-soft)]">
            Select a few topics to build your first track. You can always add
            more later — Mathlingo adapts as you go.
          </p>
        </div>

        <div className="font-body mt-8 flex justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onFilterChange(f.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f.id
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "border border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              selected={selected.has(topic.id)}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
