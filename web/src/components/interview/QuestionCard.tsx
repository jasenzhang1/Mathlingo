import { useEffect, useState } from "react";
import { familyById, sectionLabel } from "../../lib/interview/bank";
import { autoGrade, expectedSeconds, type AutoGrade } from "../../lib/interview/scoring";
import type { InterviewQuestion } from "../../lib/interview/types";

export interface QuestionResult {
  /** 1 correct, 0.5 partly, 0 missed or skipped. */
  correctness: number;
  seconds: number;
}

function formatClock(seconds: number): string {
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * One question, interview-style: the clock starts when it appears, the
 * candidate answers or passes, then the key and worked solution are shown.
 *
 * A question whose key is a single number is graded automatically. Anything
 * else — multi-part answers, proofs, "Alice" — is self-graded against the
 * revealed key: an honest candidate grades themselves better than a string
 * match on free text would.
 *
 * `onResult` fires once, when the candidate moves on; the parent keys this
 * component on the question id so every question starts fresh.
 */
export function QuestionCard({
  question: q,
  stepLabel,
  onResult,
  showLabels = false,
}: {
  question: InterviewQuestion;
  stepLabel?: string;
  onResult: (result: QuestionResult) => void;
  /** Show section and family up front. Off in mock interviews — recognising the technique is part of the test. */
  showLabels?: boolean;
}) {
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(startedAt);
  const [input, setInput] = useState("");
  const [grade, setGrade] = useState<AutoGrade | null>(null);
  const [skipped, setSkipped] = useState(false);
  const [stoppedAt, setStoppedAt] = useState<number | null>(null);

  useEffect(() => {
    if (stoppedAt !== null) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [stoppedAt]);

  const elapsed = ((stoppedAt ?? now) - startedAt) / 1000;
  const overTime = elapsed > expectedSeconds(q);
  const revealed = stoppedAt !== null;

  function submit() {
    const g = autoGrade(q, input);
    if (g.kind === "unparsed") {
      setGrade(g);
      return;
    }
    setGrade(g);
    setStoppedAt(Date.now());
  }

  function pass() {
    setSkipped(true);
    setStoppedAt(Date.now());
  }

  // Only read once the clock has stopped, so `stoppedAt` is set.
  const seconds = elapsed;
  const finish = (correctness: number) => onResult({ correctness, seconds });
  const family = q.family ? familyById.get(q.family) : undefined;

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
      <div className="font-body mb-4 flex items-center justify-between gap-3 text-xs text-[var(--ink-soft)]">
        <span className="flex flex-wrap items-center gap-2">
          {stepLabel && <span className="font-semibold uppercase tracking-wide">{stepLabel}</span>}
          {showLabels && <span>{sectionLabel(q.section)}</span>}
          {showLabels && family && <span className="rounded-full bg-[var(--paper)] px-2 py-0.5">{family.name}</span>}
        </span>
        <span className={`font-mono text-sm ${overTime && !revealed ? "text-red-600" : ""}`} title={`Target: ${formatClock(expectedSeconds(q))}`}>
          {formatClock(elapsed)}
        </span>
      </div>

      <p className="font-body whitespace-pre-wrap text-[var(--ink)]">{q.question}</p>

      {!revealed && (
        <form
          className="mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label className="font-body mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
            Your answer
          </label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (grade?.kind === "unparsed") setGrade(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={q.numericAnswer === undefined ? 3 : 1}
            autoFocus
            placeholder={q.numericAnswer === undefined ? "Work it out, then check against the answer" : "e.g. 252, 1/14, C(10,5), 7.1%"}
            className="font-body w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
          />
          {grade?.kind === "unparsed" && (
            <p className="font-body mt-1.5 text-sm text-red-600">
              That doesn't read as a number. Try a form like 3/4, 0.75, 75% or C(10,5).
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              className="font-body rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              {q.numericAnswer === undefined ? "Check answer" : "Submit"}
            </button>
            <button
              type="button"
              onClick={pass}
              className="font-body rounded-full border border-[var(--line)] px-5 py-2 text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]"
            >
              I don't know
            </button>
          </div>
        </form>
      )}

      {revealed && (
        <div className="mt-5 space-y-4">
          {grade?.kind === "correct" && (
            <p className="font-body rounded-xl bg-[var(--teal)]/10 px-4 py-2 text-sm font-semibold text-[var(--teal)]">
              Correct, in {formatClock(seconds)}.
            </p>
          )}
          {grade?.kind === "incorrect" && (
            <p className="font-body rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
              Not quite: you had {Number(grade.parsed.toPrecision(6))}.
            </p>
          )}

          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">Answer</p>
            <p className="font-body mt-1 whitespace-pre-wrap text-[var(--ink)]">{q.answer}</p>
          </div>
          {q.notes && (
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">Solution</p>
              <p className="font-body mt-1 whitespace-pre-wrap text-sm text-[var(--ink)]">{q.notes}</p>
            </div>
          )}
          <p className="font-body text-xs text-[var(--ink-soft)]">
            {sectionLabel(q.section)}
            {family && ` · ${family.name}`}
          </p>

          {grade?.kind === "correct" || grade?.kind === "incorrect" || skipped ? (
            <button
              type="button"
              autoFocus
              onClick={() => finish(grade?.kind === "correct" ? 1 : 0)}
              className="font-body rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Next
            </button>
          ) : (
            <div>
              <p className="font-body mb-2 text-sm text-[var(--ink)]">How did you do?</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => finish(1)} className="font-body rounded-full bg-[var(--teal)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                  Got it
                </button>
                <button type="button" onClick={() => finish(0.5)} className="font-body rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]">
                  Partly
                </button>
                <button type="button" onClick={() => finish(0)} className="font-body rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-red-400">
                  Missed it
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
