import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { conceptById } from "../../data/concepts";
import { useIsDeveloper } from "../../lib/dev/devAuth";
import { difficultyOf, familyById, sectionLabel } from "../../lib/interview/bank";
import { ANSWER_DECIMALS, autoGrade, expectedSeconds, type AutoGrade } from "../../lib/interview/scoring";
import { variablesOf } from "../../lib/interview/evaluate";
import type { InterviewQuestion } from "../../lib/interview/types";
import { CodeText } from "../assessment/CodeText";
import { DevQuestionTools } from "./DevQuestionTools";

export interface QuestionResult {
  /** 1 correct, 0.5 partly, 0 missed or skipped. */
  correctness: number;
  seconds: number;
}

type Tab = "problem" | "hints" | "solution" | "notes";

function formatClock(seconds: number): string {
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** The candidate's own notes on a question, kept in this browser. */
const notesKey = (id: string) => `mathlingo:interview-notes:${id}`;
function loadNotes(id: string): string {
  try {
    return localStorage.getItem(notesKey(id)) ?? "";
  } catch {
    return "";
  }
}
function saveNotes(id: string, text: string) {
  try {
    if (text.trim()) localStorage.setItem(notesKey(id), text);
    else localStorage.removeItem(notesKey(id));
  } catch {
    // Storage full or blocked: notes are a convenience, not progress.
  }
}

/**
 * One question, interview-style, laid out like quantprof.org: tabs for the
 * Problem, Hints, Solution and the candidate's own Notes. The clock starts
 * when it appears; the candidate answers or passes, then the key and worked
 * solution open.
 *
 * Hints open one at a time, in order, so the candidate chooses how much help
 * to take. Opening the Solution before answering ends the attempt, as a pass.
 *
 * A question whose key is one number or one formula is graded automatically.
 * Anything else — multi-part answers, proofs, "Alice" — is self-graded against
 * the revealed key: an honest candidate grades themselves better than a string
 * match on free text would.
 *
 * `onResult` fires once, when the candidate moves on; the parent keys this
 * component on the question id so every question starts fresh.
 */
export function QuestionCard({
  question,
  stepLabel,
  title,
  meta,
  onResult,
  showLabels = false,
}: {
  question: InterviewQuestion;
  stepLabel?: string;
  /** Heading inside the card. Omitted in mock interviews, where `stepLabel` stands in. */
  title?: string;
  /** Extra line under the title (solve stats, scenario). */
  meta?: ReactNode;
  onResult: (result: QuestionResult) => void;
  /** Show section and family up front. Off in mock interviews — recognising the technique is part of the test. */
  showLabels?: boolean;
}) {
  const isDeveloper = useIsDeveloper();
  // A developer's in-place edit, shown straight away (see DevQuestionTools).
  const [edited, setEdited] = useState<InterviewQuestion | null>(null);
  const q = edited ?? question;
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(startedAt);
  const [input, setInput] = useState("");
  const [grade, setGrade] = useState<AutoGrade | null>(null);
  const [skipped, setSkipped] = useState(false);
  const [stoppedAt, setStoppedAt] = useState<number | null>(null);
  const [tab, setTab] = useState<Tab>("problem");
  /** Hints revealed so far; hint `i` can be opened once hints `0…i-1` have been. */
  const [hintsShown, setHintsShown] = useState(0);
  const [openHints, setOpenHints] = useState<Set<number>>(() => new Set());
  const [notes, setNotes] = useState(() => loadNotes(question.id));

  useEffect(() => {
    if (stoppedAt !== null) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [stoppedAt]);

  const elapsed = ((stoppedAt ?? now) - startedAt) / 1000;
  const overTime = elapsed > expectedSeconds(q);
  const revealed = stoppedAt !== null;
  const autoGraded = q.numericAnswer !== undefined || q.expressionAnswer !== undefined;
  const variableList = (q.expressionAnswer ? (variablesOf(q.expressionAnswer) ?? []) : []).join(", ");
  const hints = q.hints ?? [];
  const decimals = q.numericPrecision ?? ANSWER_DECIMALS;

  function submit() {
    const g = autoGrade(q, input);
    // Unreadable or rounded too early: say so and keep the clock running.
    if (g.kind === "unparsed" || g.kind === "imprecise") {
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

  function toggleHint(i: number) {
    if (i > hintsShown) return;
    if (i === hintsShown) setHintsShown(i + 1);
    setOpenHints((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  // Only read once the clock has stopped, so `stoppedAt` is set.
  const seconds = elapsed;
  const finish = (correctness: number) => onResult({ correctness, seconds });
  const family = q.family ? familyById.get(q.family) : undefined;
  const lessons = (q.lessons ?? []).flatMap((id) => conceptById.get(id) ?? []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "problem", label: "Problem" },
    { id: "hints", label: hints.length ? `Hints (${hintsShown}/${hints.length})` : "Hints" },
    { id: "solution", label: "Solution" },
    { id: "notes", label: "Notes" },
  ];

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
      {/* Tab strip, with level and clock on the right. */}
      <div className="font-body flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" className="flex rounded-xl bg-[var(--paper)] p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === t.id ? "bg-[var(--panel)] text-[var(--ink)] shadow-sm" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full border border-red-300 bg-red-50 px-2.5 py-0.5 font-semibold text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            Lvl {difficultyOf(q)}/10
          </span>
          <span
            className={`font-mono text-sm ${overTime && !revealed ? "text-red-600" : "text-[var(--ink-soft)]"}`}
            title={`Target: ${formatClock(expectedSeconds(q))}`}
          >
            {formatClock(elapsed)}
          </span>
        </div>
      </div>

      <div className="mt-5">
        {stepLabel && (
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">{stepLabel}</p>
        )}
        {title && <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">{title}</h2>}
        {(meta || showLabels) && (
          <p className="font-body mt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--ink-soft)]">
            {showLabels && <span>{sectionLabel(q.section)}</span>}
            {showLabels && family && <span className="rounded-full bg-[var(--paper)] px-2 py-0.5">{family.name}</span>}
            {meta}
          </p>
        )}
      </div>

      {isDeveloper && (
        <div className="mt-4">
          <DevQuestionTools question={q} onChange={setEdited} />
        </div>
      )}

      {/* --- Problem ------------------------------------------------------ */}
      {tab === "problem" && (
        <div className="mt-4">
          <p className="font-body whitespace-pre-wrap text-[var(--ink)]">
            <CodeText text={q.question} />
          </p>

          {!revealed && (
            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <p className="font-body mb-3 text-sm text-[var(--ink)]">
                {q.expressionAnswer !== undefined
                  ? `Enter your answer as a formula in ${variableList}.`
                  : q.numericAnswer !== undefined
                    ? `Enter your answer exactly, or rounded to ${decimals} decimal places.`
                    : "Work it out, then check against the answer."}
              </p>
              <div className={autoGraded ? "flex gap-3" : ""}>
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (grade?.kind === "unparsed" || grade?.kind === "imprecise") setGrade(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  rows={autoGraded ? 1 : 3}
                  autoFocus
                  placeholder={
                    q.expressionAnswer !== undefined
                      ? "e.g. (n+1)/n, n(n-1)/2, [(n+1)/n]^(n-1)"
                      : autoGraded
                        ? "Place answer here"
                        : "Your working (optional)"
                  }
                  className="font-body min-w-0 flex-1 resize-none rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
                  style={autoGraded ? undefined : { width: "100%" }}
                />
                {autoGraded && (
                  <button
                    type="submit"
                    className="font-body shrink-0 rounded-xl bg-[var(--accent)] px-6 text-sm font-semibold text-white hover:opacity-90"
                  >
                    Submit
                  </button>
                )}
              </div>
              {grade?.kind === "unparsed" && (
                <p className="font-body mt-2 text-sm text-red-600">
                  {grade.expression
                    ? `That doesn't read as a formula in ${variableList}. Try a form like (n+1)/n, n(n-1)/2 or C(n,2).`
                    : "That doesn't read as a number. Try a form like 3/4, 0.75, 75% or C(10,5)."}
                </p>
              )}
              {grade?.kind === "imprecise" && (
                <p className="font-body mt-2 text-sm text-[var(--ink)]">
                  On the right track. Give {grade.decimals} decimal places, or an exact form like a fraction.
                </p>
              )}
              <div className="mt-3 flex gap-2">
                {!autoGraded && (
                  <button
                    type="submit"
                    className="font-body rounded-xl bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
                  >
                    Check answer
                  </button>
                )}
                <button
                  type="button"
                  onClick={pass}
                  className="font-body rounded-xl border border-[var(--line)] px-5 py-2 text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]"
                >
                  I don't know
                </button>
                {hints.length > hintsShown && (
                  <button
                    type="button"
                    onClick={() => setTab("hints")}
                    className="font-body rounded-xl px-3 py-2 text-sm font-medium text-[var(--accent)] hover:underline"
                  >
                    Need a hint?
                  </button>
                )}
              </div>
            </form>
          )}

          {revealed && (
            <div className="mt-6 space-y-4">
              {grade?.kind === "correct" && (
                <p className="font-body rounded-xl bg-[var(--teal)]/10 px-4 py-2 text-sm font-semibold text-[var(--teal)]">
                  Correct, in {formatClock(seconds)}.
                </p>
              )}
              {grade?.kind === "incorrect" && (
                <p className="font-body rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                  {grade.parsed === undefined
                    ? "Not quite: that formula doesn't match the answer."
                    : `Not quite: you had ${Number(grade.parsed.toPrecision(8))}.`}
                </p>
              )}
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">Answer</p>
                <p className="font-body mt-1 whitespace-pre-wrap text-[var(--ink)]">
                  <CodeText text={q.answer} />
                </p>
              </div>
              {q.notes && (
                <button
                  type="button"
                  onClick={() => setTab("solution")}
                  className="font-body text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  See the full solution →
                </button>
              )}
              <ResultActions grade={grade} skipped={skipped} finish={finish} />
            </div>
          )}
        </div>
      )}

      {/* --- Hints -------------------------------------------------------- */}
      {tab === "hints" && (
        <div className="mt-4 space-y-3">
          {hints.length === 0 ? (
            <p className="font-body text-sm text-[var(--ink-soft)]">No hints for this question yet.</p>
          ) : (
            hints.map((hint, i) => {
              const available = i <= hintsShown;
              const open = openHints.has(i);
              return (
                <div
                  key={i}
                  className={`rounded-xl border border-[var(--line)] ${available ? "bg-[var(--paper)]" : "bg-[var(--paper)]/50"}`}
                >
                  <button
                    type="button"
                    disabled={!available}
                    onClick={() => toggleHint(i)}
                    aria-expanded={open}
                    className="font-body flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[var(--ink)] disabled:cursor-not-allowed disabled:text-[var(--ink-soft)]"
                  >
                    <span>
                      Hint {i + 1}
                      {!available && <span className="ml-2 font-normal">— open hint {i} first</span>}
                    </span>
                    <Chevron open={open} />
                  </button>
                  {open && (
                    <p className="font-body whitespace-pre-wrap border-t border-[var(--line)] px-4 py-3 text-sm text-[var(--ink)]">
                      <CodeText text={hint} />
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* --- Solution ----------------------------------------------------- */}
      {tab === "solution" && (
        <div className="mt-4">
          {!revealed ? (
            <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4">
              <p className="font-body text-sm text-[var(--ink)]">
                Opening the solution ends this attempt and counts it as a pass.
                {hints.length > hintsShown && " The hints might be enough."}
              </p>
              <button
                type="button"
                onClick={pass}
                className="font-body mt-3 rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-red-400"
              >
                Show the solution
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">Answer</p>
                <p className="font-body mt-1 whitespace-pre-wrap text-[var(--ink)]">
                  <CodeText text={q.answer} />
                </p>
              </div>
              {q.notes && (
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">Solution</p>
                  <p className="font-body mt-1 whitespace-pre-wrap text-sm text-[var(--ink)]">
                    <CodeText text={q.notes} />
                  </p>
                </div>
              )}
              <p className="font-body text-xs text-[var(--ink-soft)]">
                {q.otherSections?.length ? "Main technique: " : ""}
                {sectionLabel(q.section)}
                {family && ` · ${family.name}`}
                {q.otherSections?.length ? (
                  <>
                    <br />
                    Also solvable by: {q.otherSections.map(sectionLabel).join("; ")}
                  </>
                ) : null}
              </p>
              {lessons.length > 0 && (
                <div className="font-body flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold uppercase tracking-wide text-[var(--ink-soft)]">Study</span>
                  {lessons.map((c) => (
                    <Link
                      key={c.id}
                      to={`/concepts/${c.id}`}
                      target="_blank"
                      rel="noopener"
                      className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-2.5 py-0.5 text-[var(--accent)] hover:border-[var(--accent)]"
                    >
                      {c.title}
                    </Link>
                  ))}
                </div>
              )}
              <ResultActions grade={grade} skipped={skipped} finish={finish} />
            </div>
          )}
        </div>
      )}

      {/* --- Notes -------------------------------------------------------- */}
      {tab === "notes" && (
        <div className="mt-4">
          <textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              saveNotes(q.id, e.target.value);
            }}
            rows={8}
            placeholder="Your notes on this problem. Saved in this browser."
            className="font-body w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Next (auto-graded or passed) or the self-grade buttons. */
function ResultActions({
  grade,
  skipped,
  finish,
}: {
  grade: AutoGrade | null;
  skipped: boolean;
  finish: (correctness: number) => void;
}) {
  if (grade?.kind === "correct" || grade?.kind === "incorrect" || skipped) {
    return (
      <button
        type="button"
        onClick={() => finish(grade?.kind === "correct" ? 1 : 0)}
        className="font-body rounded-xl bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
      >
        Next
      </button>
    );
  }
  return (
    <div>
      <p className="font-body mb-2 text-sm text-[var(--ink)]">How did you do?</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => finish(1)} className="font-body rounded-xl bg-[var(--teal)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          Got it
        </button>
        <button type="button" onClick={() => finish(0.5)} className="font-body rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]">
          Partly
        </button>
        <button type="button" onClick={() => finish(0)} className="font-body rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-red-400">
          Missed it
        </button>
      </div>
    </div>
  );
}
