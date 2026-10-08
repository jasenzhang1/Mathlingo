import { difficultyBand, solveRate, type DifficultyBand, type ProblemStatus, type QuestionStats } from "../../lib/interview/problemStats";
import type { InterviewQuestion } from "../../lib/interview/types";

/** Shared by the problem list and the problem page. */

const BAND_COLOR: Record<DifficultyBand, string> = {
  easy: "text-[var(--teal)]",
  medium: "text-amber-600",
  hard: "text-red-600",
};

const BAND_LABEL: Record<DifficultyBand, string> = { easy: "Easy", medium: "Medium", hard: "Hard" };

/** Easy, Medium or Hard: from the share of students who got it right, or its rated difficulty until enough have answered. */
export function DifficultyTag({
  question,
  stats,
  className = "",
}: {
  question: InterviewQuestion;
  stats: QuestionStats | undefined;
  className?: string;
}) {
  const rate = solveRate(stats);
  const band = difficultyBand(question, rate);
  return (
    <span
      className={`text-sm font-medium ${BAND_COLOR[band]} ${className}`}
      title={
        rate === null || !stats
          ? "Rated difficulty — too few students have answered this yet"
          : `${(rate * 100).toFixed(1)}% · ${stats.solved.toLocaleString()} of ${stats.students.toLocaleString()} student${stats.students === 1 ? "" : "s"} got it right`
      }
    >
      {BAND_LABEL[band]}
    </span>
  );
}

export function StatusIcon({ status }: { status: ProblemStatus | undefined }) {
  if (status === "solved") {
    return (
      <svg viewBox="0 0 20 20" className="h-4 w-4 text-[var(--teal)]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-label="Solved">
        <path d="m4 10.5 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "attempted") {
    return (
      <svg viewBox="0 0 20 20" className="h-4 w-4 text-amber-600" fill="none" stroke="currentColor" strokeWidth="1.8" aria-label="Attempted">
        <circle cx="10" cy="10" r="6.5" />
        <path d="M10 3.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return null;
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0 text-amber-600" fill="currentColor" aria-label="Interview Prep only">
      <path d="M6 8V6a4 4 0 1 1 8 0v2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm2 0h4V6a2 2 0 1 0-4 0z" />
    </svg>
  );
}
