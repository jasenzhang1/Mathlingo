import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { InterviewGate, InterviewUpgradeCard } from "../components/interview/InterviewGate";
import { DifficultyTag, LockIcon, StatusIcon } from "../components/interview/ProblemBits";
import { QuestionCard, type QuestionResult } from "../components/interview/QuestionCard";
import { useInterviewAccess } from "../lib/interview/access";
import { familyById, isFreeQuestion, isLive, liveQuestions, problemNumber, problemTitle, questionById } from "../lib/interview/bank";
import { loadQuestionStats, noteResult, type QuestionStats } from "../lib/interview/problemStats";
import { useInterviewSkills } from "../lib/interview/useInterviewSkills";

/**
 * One question opened from the problem list. Answered like any other: timed,
 * technique hidden until the answer is in, and it moves that technique's bar.
 */
export function InterviewProblemPage() {
  const { id = "" } = useParams();
  return (
    <InterviewGate>
      {/* Keyed so moving to the next problem starts fresh. */}
      <Problem key={id} />
    </InterviewGate>
  );
}

/** What the list hands over, so Back and Next follow the student's filtered list. */
interface ListState {
  ids?: string[];
  from?: string;
}

function Problem() {
  const { id = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { full } = useInterviewAccess();
  const { record, saveError } = useInterviewSkills();
  const [stats, setStats] = useState<QuestionStats | undefined>();
  const [result, setResult] = useState<QuestionResult | null>(null);

  const state = (location.state ?? {}) as ListState;
  const listHref = `/interview/problems${state.from ?? ""}`;
  const q = questionById.get(id);

  useEffect(() => {
    let cancelled = false;
    void loadQuestionStats().then((m) => !cancelled && setStats(m.get(id)));
    return () => {
      cancelled = true;
    };
  }, [id]);

  const back = (
    <Link to={listHref} className="font-body text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">
      ← Problems
    </Link>
  );

  if (!q || !isLive(q)) {
    return (
      <div className="mx-auto max-w-3xl">
        {back}
        <p className="font-body mt-4 text-[var(--ink-soft)]">That question doesn't exist.</p>
      </div>
    );
  }

  // Next in the list the student came from, else the next by number.
  const order = state.ids ?? liveQuestions.map((x) => x.id);
  const nextId = order[order.indexOf(q.id) + 1];
  const goNext = () => navigate(`/interview/problems/${encodeURIComponent(nextId)}`, { state });
  const family = q.family ? familyById.get(q.family) : undefined;
  const locked = !full && !isFreeQuestion(q);
  const title = problemTitle(q);

  return (
    <div className="mx-auto max-w-3xl">
      {back}
      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h1 className="font-display min-w-0 text-2xl text-[var(--ink)]">
          {problemNumber(q)}. {title.length > 80 ? `${title.slice(0, 80).trimEnd()}…` : title}
        </h1>
      </div>
      <p className="font-body mt-1 flex flex-wrap items-center gap-3 text-sm text-[var(--ink-soft)]">
        <DifficultyTag stats={stats} />
        {stats && stats.students > 0 && (
          <span>
            {stats.solved.toLocaleString()} / {stats.students.toLocaleString()} students got it right
          </span>
        )}
        {family && <span className="rounded-full bg-[var(--panel)] px-2 py-0.5 text-xs">{family.name}</span>}
        {locked && <LockIcon />}
      </p>

      <div className="mt-6">
        {locked ? (
          <div className="max-w-xl">
            <p className="font-body mb-4 text-[var(--ink-soft)]">This question comes with Interview Prep.</p>
            <InterviewUpgradeCard />
          </div>
        ) : (
          <>
            {saveError && <p className="font-body mb-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{saveError}</p>}
            {result === null ? (
              <QuestionCard
                key={q.id}
                question={q}
                onResult={(r) => {
                  record({ question: q, correctness: r.correctness, seconds: r.seconds, mode: "problems" });
                  noteResult(q.id, r.correctness);
                  setResult(r);
                }}
              />
            ) : (
              <div className="font-body rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
                <p className="flex items-center gap-2 text-[var(--ink)]">
                  <StatusIcon status={result.correctness >= 1 ? "solved" : "attempted"} />
                  {result.correctness >= 1 ? "Solved." : result.correctness > 0 ? "Partly right." : "Not this time."}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {nextId && (
                    <button
                      type="button"
                      autoFocus
                      onClick={goNext}
                      className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
                    >
                      Next problem →
                    </button>
                  )}
                  <Link
                    to={listHref}
                    className="rounded-full border border-[var(--line)] px-5 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]"
                  >
                    Back to the list
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
