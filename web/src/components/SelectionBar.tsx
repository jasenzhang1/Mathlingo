import { topics } from "../data/topics";

interface SelectionBarProps {
  selected: Set<string>;
  onClear: () => void;
}

export function SelectionBar({ selected, onClear }: SelectionBarProps) {
  if (selected.size === 0) return null;

  const totalHours = topics
    .filter((t) => selected.has(t.id))
    .reduce((sum, t) => sum + t.hours, 0);

  return (
    <div className="font-body pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div
        className="pointer-events-auto flex flex-wrap items-center gap-4 rounded-full border border-[var(--line)] bg-[var(--ink)] px-5 py-3 text-[var(--paper)] shadow-xl"
        role="status"
      >
        <span className="text-sm">
          <strong>{selected.size}</strong>{" "}
          {selected.size === 1 ? "topic" : "topics"} selected · ~{totalHours}{" "}
          hrs
        </span>
        <a
          href="#signup"
          className="rounded-full px-4 py-1.5 text-sm font-semibold text-[var(--accent-ink)]"
          style={{ background: "var(--accent)" }}
        >
          Build my track
        </a>
        <button
          type="button"
          onClick={onClear}
          className="text-sm text-[var(--paper)]/70 hover:text-[var(--paper)]"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
