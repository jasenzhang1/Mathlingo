import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { conceptById } from "../../data/concepts";
import { loadItemBank } from "../../data/items";
import { expFor, type ExpSnapshot } from "../../lib/assessment/exp";
import { gradeSubmission } from "../../lib/assessment/grading";
import type { RawSubmission } from "../../lib/assessment/normalize";
import { routeGrader } from "../../lib/assessment/router";
import {
  loadConceptState,
  loadRecentItemIds,
  logResponse,
  saveConceptStates,
} from "../../lib/assessment/persistence";
import {
  applyReview,
  blankState,
  selectNextItem,
  type ReviewOutcome,
  type SessionContext,
} from "../../lib/assessment/review";
import { canInstantiate, instantiate } from "../../lib/assessment/templating";
import type { ConceptState, Grade, Item, ItemFormat } from "../../lib/assessment/types";
import { useAuth } from "../../lib/auth/useAuth";
import { useSubscription } from "../../lib/billing/useSubscription";
import { UpgradePrompt } from "../billing/UpgradePrompt";
import { AnswerInput } from "./AnswerInput";
import { ProficiencyBar } from "./ProficiencyBar";
import { RubricBreakdown } from "./RubricBreakdown";

type Phase =
  | { kind: "loading" }
  | { kind: "idle" }
  | { kind: "answering"; item: Item }
  | { kind: "grading"; item: Item }
  | { kind: "graded"; item: Item; grade: Grade; outcome: ReviewOutcome }
  | { kind: "ungradeable"; item: Item; message: string }
  | { kind: "empty" };

export function AssessmentPanel({
  conceptId,
  conceptTitle,
  onStateChange,
}: {
  conceptId: string;
  conceptTitle: string;
  /** Fired whenever this concept's persisted state changes — on initial load
   *  and after every grade — so a caller running several concepts in sequence
   *  (a review/drill session) can track live proficiency without polling. */
  onStateChange?: (state: ConceptState) => void;
}) {
  const { user } = useAuth();
  const { can, loading: subLoading } = useSubscription();
  const canGrade = can("ai-grading");
  const [state, setState] = useState<ConceptState>(() => blankState(conceptId));
  const [phase, setPhase] = useState<Phase>({ kind: "loading" });
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  /** Data URL from the drawing canvas / photo upload, when answering by hand. */
  const [image, setImage] = useState<string | null>(null);
  /** Browser speech-recognition output, when answering aloud. */
  const [spokenText, setSpokenText] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);

  /** Levels covered this session, so one sitting can't be all arithmetic. */
  const coveredLevels = useRef<Set<string>>(new Set());
  /**
   * `code` items served this session, and the format of the last one served —
   * together these drive the code-item quota in `selectNextItem`, so a
   * programming concept actually asks the learner to write code rather than
   * only to recognise it. Refs rather than state: they are read when picking
   * the next item, and nothing renders from them.
   */
  const codeServed = useRef(0);
  const lastFormat = useRef<ItemFormat | undefined>(undefined);
  /** When the current item was shown — latency is part of the FSRS grade. */
  const shownAt = useRef<number>(0);
  /**
   * The whole sitting counts as one FSRS review, so we keep the memory state as
   * it was before the first answer and re-derive from it each time.
   */
  const session = useRef<SessionContext>({ anchor: undefined, grades: [] });

  /**
   * Templates whose solver is missing, and plain items that still contain
   * placeholders, are dropped here rather than at selection time — an item that
   * cannot be rendered should never be a candidate in the first place.
   */
  // The bank is a separate chunk (see loadItemBank); until it arrives the pool
  // is empty, which the loading phase below already covers.
  const [bank, setBank] = useState<Map<string, Item[]> | null>(null);
  useEffect(() => {
    let cancelled = false;
    void loadItemBank().then((loaded) => {
      if (!cancelled) setBank(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const pool = useMemo(() => {
    const all = bank?.get(conceptId) ?? [];
    const servable = all.filter(canInstantiate);
    if (servable.length < all.length) {
      const broken = all.filter((i) => !canInstantiate(i)).map((i) => i.id);
      console.error(`Unservable items in ${conceptId}: ${broken.join(", ")}`);
    }
    /**
     * Without AI grading, open-response items are withheld rather than served
     * and refused. Serving a question we cannot mark would waste the learner's
     * effort and, worse, break the session's grade — the FSRS session grade is
     * computed from the items actually answered, so an ungradeable one in the
     * middle of a sitting distorts the schedule.
     */
    return canGrade
      ? servable
      : servable.filter((i) => routeGrader(i) !== "llm");
  }, [bank, conceptId, canGrade]);

  /** How many open-response items the current tier is not seeing. */
  const withheldCount = useMemo(() => {
    if (canGrade) return 0;
    return (bank?.get(conceptId) ?? []).filter(
      (i) => canInstantiate(i) && routeGrader(i) === "llm",
    ).length;
  }, [bank, conceptId, canGrade]);

  // Load persisted proficiency. Signed-out learners get a working session with
  // in-memory state; nothing is written until they have an account to write to.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Wait for the tier before choosing a pool, or the session would start on
      // the free subset and then be rebuilt underneath the learner.
      if (subLoading || !bank) return;

      if (pool.length === 0) {
        if (!cancelled) setPhase({ kind: "empty" });
        return;
      }
      if (!user) {
        if (!cancelled) {
          setState(blankState(conceptId));
          setPhase({ kind: "idle" });
        }
        return;
      }
      const [loaded, recent] = await Promise.all([
        loadConceptState(user.id, conceptId),
        loadRecentItemIds(user.id, conceptId),
      ]);
      if (cancelled) return;
      setState(loaded);
      setRecentIds(recent);
      session.current = { anchor: loaded.memory, grades: [] };
      setPhase({ kind: "idle" });
    }

    coveredLevels.current = new Set();
    codeServed.current = 0;
    lastFormat.current = undefined;
    session.current = { anchor: undefined, grades: [] };
    void load();
    return () => {
      cancelled = true;
    };
  }, [user, conceptId, pool.length, subLoading, bank]);

  // The bar decays continuously, so it needs a clock rather than a render-time
  // Date.now() — otherwise the displayed proficiency and the "due for review"
  // flag are both frozen at whenever the component last happened to re-render.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const exp: ExpSnapshot = useMemo(() => expFor(state, now), [state, now]);

  useEffect(() => {
    onStateChange?.(state);
    // onStateChange is expected to be stable per conceptId (a useCallback in
    // the caller); state is the only thing that should retrigger this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const nextItem = useCallback(
    (currentState: ConceptState, recent: string[]) => {
      const template = selectNextItem(pool, currentState, {
        recentItemIds: recent,
        coveredLevels: coveredLevels.current,
        codeServed: codeServed.current,
        lastFormat: lastFormat.current,
      });
      if (!template) {
        setPhase({ kind: "empty" });
        return;
      }

      // Draw concrete values and compute this instance's answer key. The
      // learner never sees a template; `recentItemIds` still tracks the
      // template id, so the same template is not drawn again immediately.
      let item: Item;
      try {
        item = instantiate(template);
      } catch (error) {
        console.error(error);
        setPhase({ kind: "empty" });
        return;
      }

      setText(item.starterCode ?? "");
      setSelected([]);
      setImage(null);
      setSpokenText("");
      setSaveError(null);
      shownAt.current = Date.now();
      setPhase({ kind: "answering", item });
    },
    [pool],
  );

  async function submit() {
    if (phase.kind !== "answering") return;
    const item = phase.item;
    const latency = (Date.now() - shownAt.current) / 1000;

    const raw: RawSubmission = {
      text,
      selectedChoiceIds: selected,
      image: image ?? undefined,
      spokenText: spokenText || undefined,
    };

    // Anything needing a round trip (OCR, the judge) shows a grading state.
    if (routeGrader(item) === "llm" || image) {
      setPhase({ kind: "grading", item });
    }

    const result = await gradeSubmission({
      item,
      raw,
      latencySeconds: latency,
    });

    if (!result.ok) {
      if (result.reason === "empty") {
        // Nothing was submitted — stay on the question rather than burning it.
        setPhase({ kind: "answering", item });
        return;
      }
      setPhase({
        kind: "ungradeable",
        item,
        message:
          result.reason === "unavailable"
            ? result.message
            : `This couldn't be graded: ${result.message}`,
      });
      return;
    }

    const grade = result.grade;

    const outcome = applyReview(
      new Map([[conceptId, state]]),
      item,
      grade,
      Date.now(),
      session.current,
    );
    const target = outcome.states.get(conceptId) ?? state;

    // Only live items move the bar, so only their grades belong in the session.
    if (item.status === "live") {
      session.current.grades.push(outcome.reviewGrade);
    }
    coveredLevels.current.add(item.cognitive);
    if (item.format === "code") codeServed.current += 1;
    lastFormat.current = item.format;
    setState(target);
    setRecentIds((prev) => [item.id, ...prev].slice(0, 10));
    setPhase({ kind: "graded", item, grade, outcome });

    if (user) {
      const [saved, logged] = await Promise.all([
        saveConceptStates(user.id, [...outcome.states.values()]),
        // The transcript is what was actually graded for image/audio answers,
        // so that — not the raw input — is what the review log must preserve.
        logResponse({
          userId: user.id,
          item,
          answer: grade.transcript ?? text ?? selected.join(","),
          grade,
        }),
      ]);
      const error = saved.error ?? logged.error;
      if (error) setSaveError(error);
    }
  }

  if (phase.kind === "loading") {
    return (
      <PanelShell>
        <Skeleton />
      </PanelShell>
    );
  }

  if (phase.kind === "empty") {
    // If the only items for this concept are open-response ones, the tier is
    // the reason the pool is empty — say that rather than "nothing here yet".
    if (!canGrade && withheldCount > 0) {
      return (
        <UpgradePrompt entitlement="ai-grading" signedIn={Boolean(user)} />
      );
    }
    return (
      <PanelShell>
        <p className="font-body text-[var(--ink-soft)]">
          No assessment items are live for {conceptTitle} yet.
        </p>
      </PanelShell>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-sm">
        <ProficiencyBar exp={exp} />
        {!user && (
          <p className="font-body mt-3 rounded-lg bg-[var(--paper)] px-3 py-2 text-xs text-[var(--ink-soft)]">
            You're not signed in, so this session won't be saved.{" "}
            <Link
              to="/login"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              Log in
            </Link>{" "}
            to keep your proficiency and get review reminders.
          </p>
        )}
        {saveError && (
          <p className="font-body mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
            Couldn't save your progress: {saveError}
          </p>
        )}
      </div>

      {phase.kind === "idle" && (
        <PanelShell>
          <h3 className="font-display text-lg text-[var(--ink)]">
            {state.ability.observations === 0
              ? "Ready when you are"
              : exp.due
                ? "Time for a refresh"
                : "Keep going"}
          </h3>
          <p className="font-body mt-2 text-sm text-[var(--ink-soft)]">
            {state.ability.observations === 0
              ? `You'll get questions on ${conceptTitle} that adapt to how you answer — definitions first, then computation, then why the method works.`
              : `You've answered ${state.ability.observations} question${state.ability.observations === 1 ? "" : "s"} on this concept. Questions are drawn fresh each time, so you re-derive the method rather than recall an answer.`}
          </p>
          <button
            type="button"
            onClick={() => nextItem(state, recentIds)}
            className="font-body mt-5 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {state.ability.observations === 0
              ? "Start assessment"
              : "Next question"}
          </button>

          {/* Say plainly what is being held back, rather than quietly serving a
              thinner assessment and letting it look like the whole thing. */}
          {!canGrade && withheldCount > 0 && (
            <p className="font-body mt-4 border-t border-[var(--line)] pt-4 text-xs text-[var(--ink-soft)]">
              {withheldCount} question{withheldCount === 1 ? "" : "s"} on this
              concept ask you to explain your reasoning, and need AI grading.{" "}
              <Link
                to="/pricing"
                className="font-medium text-[var(--accent)] hover:underline"
              >
                See plans
              </Link>
            </p>
          )}
        </PanelShell>
      )}

      {(phase.kind === "answering" ||
        phase.kind === "grading" ||
        phase.kind === "graded" ||
        phase.kind === "ungradeable") && (
        <PanelShell>
          <ItemHeader item={phase.item} />

          <p className="font-body mt-3 whitespace-pre-wrap text-[var(--ink)]">
            {phase.item.stem}
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

            {/* Live transcript of dictated speech, before submitting. */}
            {spokenText && phase.kind === "answering" && (
              <p className="font-body mt-3 rounded-xl bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)]">
                {spokenText}
              </p>
            )}
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
            <p className="font-body mt-4 text-sm text-[var(--ink-soft)]">
              Grading…
            </p>
          )}

          {phase.kind === "ungradeable" && (
            <div className="mt-4 rounded-xl border border-dashed border-[var(--line)] bg-[var(--paper)] p-4">
              <p className="font-body text-sm text-[var(--ink)]">
                {phase.message}
              </p>
              <p className="font-body mt-2 text-xs text-[var(--ink-soft)]">
                Nothing was recorded — a guessed score would corrupt your
                proficiency estimate. Check your answer against the rubric
                below.
              </p>
              {phase.item.rubric && <RubricList item={phase.item} />}
              <button
                type="button"
                onClick={() => nextItem(state, recentIds)}
                className="font-body mt-4 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]"
              >
                Skip to next question
              </button>
            </div>
          )}

          {phase.kind === "graded" && (
            <Feedback
              grade={phase.grade}
              outcome={phase.outcome}
              item={phase.item}
              onNext={() => nextItem(state, recentIds)}
            />
          )}
        </PanelShell>
      )}
    </div>
  );
}

function ItemHeader({ item }: { item: Item }) {
  const levelLabel: Record<string, string> = {
    recall: "Recall",
    apply: "Apply",
    explain: "Explain",
    transfer: "Transfer",
  };
  return (
    <div className="font-body flex flex-wrap items-center gap-2 text-xs">
      <span className="rounded-full border border-[var(--line)] px-2.5 py-0.5 font-medium text-[var(--ink-soft)]">
        {levelLabel[item.cognitive] ?? item.cognitive}
      </span>
      <span className="text-[var(--ink-soft)]">
        ~{Math.round(item.expectedSeconds / 15) * 15 || 15}s
      </span>
      {item.status === "shadow" && (
        <span className="rounded-full bg-[var(--paper)] px-2.5 py-0.5 text-[var(--ink-soft)]">
          Calibration — won't affect your score
        </span>
      )}
    </div>
  );
}

function RubricList({ item }: { item: Item }) {
  return (
    <ul className="font-body mt-3 space-y-1.5 text-sm text-[var(--ink-soft)]">
      {(item.rubric?.elements ?? []).map((element) => (
        <li key={element.id} className="flex gap-2">
          <span aria-hidden="true">·</span>
          <span>
            {element.description}
            {element.required && (
              <span className="ml-1 text-xs font-medium text-[var(--ink-soft)]">
                (required)
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Names the band rather than pass/fail. A written answer at 0.55 and one at 0.95
 * both "pass", and telling the learner only that wastes the grader's resolution.
 */
function scoreBand(score: number): string {
  if (score >= 0.95) return "Complete";
  if (score >= 0.8) return "Strong";
  if (score >= 0.6) return "Solid";
  if (score >= 0.4) return "Partial";
  if (score > 0) return "Thin";
  return "Not yet";
}

function Feedback({
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
  const debits = outcome.propagation.filter((p) => p.direction === "debit");

  return (
    <div className="mt-5 border-t border-[var(--line)] pt-4">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`font-body rounded-full px-3 py-1 text-sm font-semibold ${
            outcome.passed
              ? "bg-[var(--teal)]/15 text-[var(--teal)]"
              : "bg-red-50 text-red-700"
          }`}
        >
          {scoreBand(grade.score)} · {Math.round(grade.score * 100)}
          <span className="font-normal opacity-70">/100</span>
        </span>
        {item.status === "live" && (
          <span className="font-body text-sm text-[var(--ink-soft)]">
            {delta >= 0 ? "+" : ""}
            {delta.toFixed(1)} proficiency
          </span>
        )}
      </div>

      {grade.feedback && (
        <p className="font-body mt-3 text-sm text-[var(--ink)]">
          {grade.feedback}
        </p>
      )}

      {/* For handwritten and spoken answers, what we read is what was graded —
          so it has to be visible, or a misread subscript makes the mark
          inexplicable. */}
      {grade.transcript && (
        <div className="mt-3 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
            {grade.channel === "spoken" ? "What we heard" : "What we read"}
            {grade.transcriptConfidence !== undefined &&
              grade.transcriptConfidence < 0.6 &&
              " · low confidence"}
          </p>
          <p className="font-body mt-1.5 whitespace-pre-wrap text-sm text-[var(--ink)]">
            {grade.transcript}
          </p>
          {grade.transcriptConfidence !== undefined &&
            grade.transcriptConfidence < 0.6 && (
              <p className="font-body mt-2 text-xs text-[var(--ink-soft)]">
                If that isn't what you meant, this reading was the problem
                rather than your reasoning — it counted for less because of
                that.
              </p>
            )}
        </div>
      )}

      {grade.breakdown && grade.breakdown.length > 0 && (
        <RubricBreakdown breakdown={grade.breakdown} />
      )}

      {grade.adjudicator === "model-judge" && grade.confidence < 0.6 && (
        <p className="font-body mt-3 rounded-xl bg-[var(--paper)] px-3 py-2 text-xs text-[var(--ink-soft)]">
          The grader wasn't confident about this one — possibly because your
          approach differs from the one the rubric anticipated. It's been
          flagged for review, and it counts for less toward your proficiency.
        </p>
      )}

      {debits.length > 0 && (
        <div className="mt-3 rounded-xl bg-[var(--paper)] p-3">
          <p className="font-body text-xs text-[var(--ink-soft)]">
            This also suggests a gap further back. Worth revisiting:{" "}
            {debits.map((p, i) => (
              <span key={p.conceptId}>
                {i > 0 && ", "}
                <Link
                  to={`/concepts/${p.conceptId}`}
                  className="font-medium text-[var(--accent)] hover:underline"
                >
                  {conceptById.get(p.conceptId)?.title ?? p.conceptId}
                </Link>
              </span>
            ))}
            .
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={onNext}
        className="font-body mt-4 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Next question
      </button>
    </div>
  );
}

function PanelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
      {children}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3">
      <div className="h-3 w-1/3 rounded bg-[var(--line)]" />
      <div className="h-3 w-2/3 rounded bg-[var(--line)]" />
    </div>
  );
}
