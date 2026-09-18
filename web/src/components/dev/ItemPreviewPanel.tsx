import { useState } from "react";
import { CodeText } from "../assessment/CodeText";
import { AnswerInput } from "../assessment/AnswerInput";
import { ProficiencyBar } from "../assessment/ProficiencyBar";
import { RubricBreakdown } from "../assessment/RubricBreakdown";
import { expFor } from "../../lib/assessment/exp";
import { gradeSubmission } from "../../lib/assessment/grading";
import type { RawSubmission } from "../../lib/assessment/normalize";
import { routeGrader } from "../../lib/assessment/router";
import { applyReview, blankState, type ReviewOutcome } from "../../lib/assessment/review";
import { canInstantiate, instantiate } from "../../lib/assessment/templating";
import type { ConceptState, Grade, Item } from "../../lib/assessment/types";

/**
 * Answers a single item exactly as a learner would — same `AnswerInput`, same
 * `gradeSubmission` pipeline (including the real model-judge Edge Function for
 * rubric-graded formats), same `applyReview` ability update — but against a
 * throwaway `ConceptState` that starts fresh and is never persisted. Lets a
 * developer feel whether a difficulty/rubric edit actually lands the way they
 * intend before publishing it, without touching any real learner's data.
 */

type Phase =
  | { kind: "answering"; item: Item }
  | { kind: "grading"; item: Item }
  | { kind: "graded"; item: Item; grade: Grade; outcome: ReviewOutcome }
  | { kind: "ungradeable"; item: Item; message: string }
  | { kind: "broken"; message: string };

function freshInstance(template: Item): Phase {
  if (!canInstantiate(template)) {
    if (template.params && template.params.length > 0) {
      return { kind: "broken", message: `This template has no registered solver, so it can't be instantiated.` };
    }
    return { kind: "answering", item: template };
  }
  try {
    return { kind: "answering", item: instantiate(template) };
  } catch (err) {
    return {
      kind: "broken",
      message: err instanceof Error ? err.message : "Could not draw an instance of this template.",
    };
  }
}

export function ItemPreviewPanel({ item, onClose }: { item: Item; onClose: () => void }) {
  const [simState, setSimState] = useState<ConceptState>(() => blankState(item.conceptId));
  const [phase, setPhase] = useState<Phase>(() => freshInstance(item));
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [spokenText, setSpokenText] = useState("");
  const [shownAt, setShownAt] = useState(() => Date.now());

  const [now] = useState(() => Date.now());
  const exp = expFor(simState, now);

  function resetAnswer() {
    setText("");
    setSelected([]);
    setImage(null);
    setSpokenText("");
    setShownAt(Date.now());
    setPhase(freshInstance(item));
  }

  function resetSimulatedProficiency() {
    setSimState(blankState(item.conceptId));
    resetAnswer();
  }

  async function submit() {
    if (phase.kind !== "answering") return;
    const current = phase.item;
    const latency = (Date.now() - shownAt) / 1000;

    const raw: RawSubmission = {
      text,
      selectedChoiceIds: selected,
      image: image ?? undefined,
      spokenText: spokenText || undefined,
    };

    if (routeGrader(current) === "llm" || image) {
      setPhase({ kind: "grading", item: current });
    }

    const result = await gradeSubmission({ item: current, raw, latencySeconds: latency });

    if (!result.ok) {
      if (result.reason === "empty") {
        setPhase({ kind: "answering", item: current });
        return;
      }
      setPhase({
        kind: "ungradeable",
        item: current,
        message:
          result.reason === "unavailable"
            ? result.message
            : `This couldn't be graded: ${result.message}`,
      });
      return;
    }

    const grade = result.grade;
    const outcome = applyReview(new Map([[item.conceptId, simState]]), current, grade, Date.now());
    setSimState(outcome.states.get(item.conceptId) ?? simState);
    setPhase({ kind: "graded", item: current, grade, outcome });
  }

  return (
    <div className="my-8 w-full max-w-3xl rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-[var(--ink)]">Preview: {item.id}</h3>
          <p className="font-body text-xs text-[var(--ink-soft)]">
            Simulated only — nothing here is saved to any account.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-[var(--ink-soft)] hover:text-[var(--ink)]"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4">
        <ProficiencyBar exp={exp} />
      </div>

      {phase.kind === "broken" ? (
        <p className="font-body mt-4 rounded-xl border border-dashed border-[var(--line)] p-4 text-sm text-[var(--ink)]">
          {phase.message}
        </p>
      ) : (
        <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5">
          <p className="font-body whitespace-pre-wrap text-[var(--ink)]">
            <CodeText text={phase.item.stem} />
          </p>

          <div className="mt-5">
            <AnswerInput
              item={phase.item}
              text={text}
              onTextChange={setText}
              selected={selected}
              onSelectedChange={setSelected}
              onImageChange={setImage}
              onSpokenTextChange={setSpokenText}
              disabled={phase.kind !== "answering"}
              onSubmit={() => void submit()}
            />
          </div>

          {phase.kind === "answering" && (
            <button
              type="button"
              onClick={() => void submit()}
              className="font-body mt-4 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Submit answer
            </button>
          )}

          {phase.kind === "grading" && (
            <p className="font-body mt-4 text-sm text-[var(--ink-soft)]">Grading…</p>
          )}

          {phase.kind === "ungradeable" && (
            <div className="mt-4 rounded-xl border border-dashed border-[var(--line)] bg-[var(--paper)] p-4">
              <p className="font-body text-sm text-[var(--ink)]">{phase.message}</p>
              <button
                type="button"
                onClick={resetAnswer}
                className="font-body mt-4 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]"
              >
                Try again
              </button>
            </div>
          )}

          {phase.kind === "graded" && (
            <PreviewFeedback
              grade={phase.grade}
              outcome={phase.outcome}
              item={phase.item}
              onNext={resetAnswer}
            />
          )}
        </div>
      )}

      <button
        type="button"
        onClick={resetSimulatedProficiency}
        className="font-body mt-4 text-xs text-[var(--ink-soft)] underline hover:text-[var(--ink)]"
      >
        Reset simulated proficiency to zero
      </button>
    </div>
  );
}

function scoreBand(score: number): string {
  if (score >= 0.95) return "Complete";
  if (score >= 0.8) return "Strong";
  if (score >= 0.6) return "Solid";
  if (score >= 0.4) return "Partial";
  if (score > 0) return "Thin";
  return "Not yet";
}

function PreviewFeedback({
  grade,
  outcome,
  item,
  onNext,
}: {
  grade: Grade;
  outcome: ReviewOutcome;
  item: Item;
  onNext: () => void;
}) {
  const delta = outcome.expAfter.value - outcome.expBefore.value;

  return (
    <div className="mt-5 border-t border-[var(--line)] pt-4">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`font-body rounded-full px-3 py-1 text-sm font-semibold ${
            outcome.passed ? "bg-[var(--teal)]/15 text-[var(--teal)]" : "bg-red-50 text-red-700"
          }`}
        >
          {scoreBand(grade.score)} · {Math.round(grade.score * 100)}
          <span className="font-normal opacity-70">/100</span>
        </span>
        {item.status === "live" && (
          <span className="font-body text-sm text-[var(--ink-soft)]">
            {delta >= 0 ? "+" : ""}
            {delta.toFixed(1)} simulated proficiency
          </span>
        )}
        {item.status !== "live" && (
          <span className="font-body text-sm text-[var(--ink-soft)]">
            Status is "{item.status}" — a real learner's proficiency would not move on this item either.
          </span>
        )}
      </div>

      {grade.feedback && (
        <p className="font-body mt-3 text-sm text-[var(--ink)]">
          <CodeText text={grade.feedback} />
        </p>
      )}

      {grade.breakdown && grade.breakdown.length > 0 && <RubricBreakdown breakdown={grade.breakdown} />}

      <button
        type="button"
        onClick={onNext}
        className="font-body mt-4 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Answer again
      </button>
    </div>
  );
}
