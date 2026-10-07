import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { InterviewGate, InterviewUpgradeCard } from "../components/interview/InterviewGate";
import { QuestionCard } from "../components/interview/QuestionCard";
import { useInterviewAccess } from "../lib/interview/access";
import { difficultyBand, isFreeQuestion, isLive, problemNumber, questionById, questionTitle } from "../lib/interview/bank";
import { useInterviewSkills } from "../lib/interview/useInterviewSkills";

/** One problem from the problem list, answered on its own. Credits the question's main technique, as training does. */
export function InterviewProblemPage() {
  return (
    <InterviewGate>
      <Problem />
    </InterviewGate>
  );
}

function Problem() {
  const { id = "" } = useParams();
  const { full } = useInterviewAccess();
  const { record, saveError } = useInterviewSkills();
  const [round, setRound] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const q = questionById.get(id);

  const back = (
    <Link to="/interview" className="font-body text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">
      ← Problems
    </Link>
  );

  if (!q || !isLive(q)) {
    return (
      <div className="mx-auto max-w-3xl">
        {back}
        <p className="font-body mt-4 text-[var(--ink-soft)]">No such problem.</p>
      </div>
    );
  }

  const n = problemNumber(q);
  const header = (
    <>
      {back}
      <h1 className="font-display mt-1 text-2xl text-[var(--ink)]">
        {n !== null && `${n}. `}
        {questionTitle(q)}
      </h1>
      <p className="font-body text-sm text-[var(--ink-soft)]">{difficultyBand(q)}</p>
    </>
  );

  if (!full && !isFreeQuestion(q)) {
    return (
      <div className="mx-auto max-w-xl">
        {header}
        <div className="mt-6">
          <InterviewUpgradeCard />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {header}
      {saveError && <p className="font-body mt-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{saveError}</p>}
      <div className="mt-6">
        {result === null ? (
          <QuestionCard
            key={round}
            question={q}
            showLabels
            onResult={(r) => {
              record({ question: q, correctness: r.correctness, seconds: r.seconds, mode: "train" });
              setResult(r.correctness);
            }}
          />
        ) : (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
            <p className="font-body text-[var(--ink)]">
              {result === 1 ? "Solved." : result > 0 ? "Partly there." : "Not this time."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/interview"
                className="font-body rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Back to problems
              </Link>
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setRound((r) => r + 1);
                }}
                className="font-body rounded-full border border-[var(--line)] px-5 py-2 text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]"
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
