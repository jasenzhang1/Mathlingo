import { useCallback, useState } from "react";
import { conceptById } from "../../data/concepts";
import { UNLOCK_THRESHOLD, expFor } from "../../lib/assessment/exp";
import type { ConceptState } from "../../lib/assessment/types";
import { AssessmentPanel } from "./AssessmentPanel";

/** Fisher–Yates — the queue order shouldn't just be source order every time. */
function shuffled<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface ReviewSessionProps {
  subjectLabel: string;
  color: string;
  /** Concepts to work through, in source order — shuffled once on open. */
  conceptIds: string[];
  /** "review" gates on every concept clearing 65 and ends in the finished
   *  screen; "drill" is open-ended practice with no completion screen. */
  startMode: "review" | "drill";
  onExit: () => void;
}

/**
 * A full-screen session over several concepts in one subject, built on top of
 * the same `AssessmentPanel` a single concept's assessment tab uses — each
 * concept in the queue gets its own panel instance (remounted via `key`), so
 * the FSRS/IRT machinery underneath doesn't need to know a queue exists.
 *
 * "Review" is for concepts already bleeding past their grace period: the
 * queue is exactly those, shuffled, and clearing every one back above the
 * unlock threshold ends the session at the finished screen. "Drill" is the
 * same mechanism with no finish line — open practice over a subject that has
 * nothing currently expired.
 */
export function ReviewSession({
  subjectLabel,
  color,
  conceptIds,
  startMode,
  onExit,
}: ReviewSessionProps) {
  const [mode, setMode] = useState<"review" | "drill">(startMode);
  const [queue] = useState(() => shuffled(conceptIds));
  const [index, setIndex] = useState(0);
  const [cleared, setCleared] = useState<Set<string>>(new Set());
  const [showComplete, setShowComplete] = useState(false);

  const currentId = queue[index];
  const currentTitle = conceptById.get(currentId)?.title ?? currentId;

  const handleStateChange = useCallback(
    (conceptId: string, state: ConceptState) => {
      if (mode !== "review") return;
      const isCleared = expFor(state, Date.now()).value >= UNLOCK_THRESHOLD;

      setCleared((prev) => {
        const already = prev.has(conceptId);
        if (isCleared === already) return prev;

        const next = new Set(prev);
        if (isCleared) next.add(conceptId);
        else next.delete(conceptId);

        if (isCleared && next.size >= queue.length) {
          setShowComplete(true);
        } else if (isCleared) {
          // Move on to the next concept still bleeding, so clearing one is
          // the thing that advances the session rather than a manual click.
          setIndex((prevIndex) => {
            for (let step = 1; step <= queue.length; step++) {
              const candidate = queue[(prevIndex + step) % queue.length]!;
              if (!next.has(candidate))
                return (prevIndex + step) % queue.length;
            }
            return prevIndex;
          });
        }
        return next;
      });
    },
    [mode, queue],
  );

  function goTo(delta: number) {
    setIndex((prev) => (prev + delta + queue.length) % queue.length);
  }

  function continueDrilling() {
    setMode("drill");
    setShowComplete(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--paper)]">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: color }}
            aria-hidden="true"
          />
          <h1 className="font-display truncate text-base text-[var(--ink)] sm:text-lg">
            {subjectLabel}
          </h1>
          <span
            className={`font-body shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
              mode === "review"
                ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                : "bg-[var(--panel)] text-[var(--ink-soft)]"
            }`}
          >
            {mode === "review" ? "Review" : "Drilling"}
          </span>
        </div>
        <button
          type="button"
          onClick={onExit}
          aria-label="Exit session"
          className="font-body shrink-0 rounded-full border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]"
        >
          Exit
        </button>
      </header>

      {showComplete ? (
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="max-w-sm text-center">
            <h2 className="font-display text-2xl text-[var(--ink)]">
              All caught up
            </h2>
            <p className="font-body mt-2 text-sm text-[var(--ink-soft)]">
              Every concept in {subjectLabel} you were reviewing is back above{" "}
              {UNLOCK_THRESHOLD}. You can stop here, or keep going as open
              practice.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={onExit}
                className="font-body rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]"
              >
                Exit
              </button>
              <button
                type="button"
                onClick={continueDrilling}
                className="font-body rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Keep drilling
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-y-auto px-4 py-5 sm:px-6">
          <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goTo(-1)}
              disabled={queue.length < 2}
              className="font-body rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] disabled:opacity-40"
            >
              ‹ Previous
            </button>
            <span className="font-body text-xs text-[var(--ink-soft)]">
              Concept {index + 1} of {queue.length}
              {mode === "review" && ` · ${cleared.size} cleared`}
            </span>
            <button
              type="button"
              onClick={() => goTo(1)}
              disabled={queue.length < 2}
              className="font-body rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] disabled:opacity-40"
            >
              Next ›
            </button>
          </div>

          <AssessmentPanel
            key={currentId}
            conceptId={currentId}
            conceptTitle={currentTitle}
            onStateChange={(state) => handleStateChange(currentId, state)}
          />
        </div>
      )}
    </div>
  );
}
