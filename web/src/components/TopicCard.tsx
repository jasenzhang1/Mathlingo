import { Link } from "react-router-dom";
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
    <div
      className={`font-body group relative flex h-full flex-col rounded-2xl border p-6 text-left transition-all ${
        selected
          ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-md"
          : "border-[var(--line)] bg-[var(--panel)] hover:-translate-y-0.5 hover:shadow-md"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(topic.id)}
        aria-pressed={selected}
        className="flex flex-1 flex-col text-left"
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

        <h3 className="font-display mt-4 text-xl text-[var(--ink)]">
          {topic.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-[var(--teal)]">
          {topic.tagline}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
          {topic.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-xs text-[var(--ink-soft)]">
          <span>~{topic.hours} hrs</span>
          <span aria-hidden="true">·</span>
          <span>{topic.tracks.map((t) => trackLabel[t]).join(" & ")}</span>
        </div>
      </button>

      {topic.lessons && topic.lessons.length > 0 && (
        <div className="mt-4 flex flex-col gap-1.5 border-t border-[var(--line)] pt-4">
          {topic.lessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/topics/${topic.id}/lessons/${lesson.id}`}
              className="text-sm font-medium text-[var(--accent)] hover:underline"
            >
              View lesson: {lesson.title} →
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
