import type { Topic } from "../data/topics";

interface TopicCardProps {
  topic: Topic;
  selected: boolean;
  onToggle: (id: string) => void;
}

const trackLabel: Record<string, string> = {
  refresh: "Refresher",
  bootcamp: "Bootcamp",
};

export function TopicCard({ topic, selected, onToggle }: TopicCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(topic.id)}
      aria-pressed={selected}
      className={`font-body group relative flex h-full flex-col rounded-2xl border p-6 text-left transition-all ${
        selected
          ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-md"
          : "border-[var(--line)] bg-[var(--panel)] hover:-translate-y-0.5 hover:shadow-md"
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition-colors ${
          selected
            ? "border-[var(--accent)] bg-[var(--accent)] text-white"
            : "border-[var(--line)] text-transparent"
        }`}
        aria-hidden="true"
      >
        ✓
      </span>

      <h3 className="font-display mt-4 flex-1 text-xl text-[var(--ink)]">
        {topic.name}
      </h3>

      <div className="mt-5 flex items-center gap-2 text-xs text-[var(--ink-soft)]">
        <span>~{topic.hours} hrs</span>
        <span aria-hidden="true">·</span>
        <span>{topic.tracks.map((t) => trackLabel[t]).join(" & ")}</span>
      </div>
    </button>
  );
}
