import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { InterviewGate, InterviewUpgradeCard } from "../components/interview/InterviewGate";
import { QuestionCard } from "../components/interview/QuestionCard";
import { SkillBar } from "../components/interview/SkillBar";
import { useInterviewAccess } from "../lib/interview/access";
import { questionsInSection, sectionById } from "../lib/interview/bank";
import type { InterviewQuestion } from "../lib/interview/types";
import { pickTrainingQuestion, skillBar } from "../lib/interview/scoring";
import { useInterviewSkills } from "../lib/interview/useInterviewSkills";

/**
 * Drill one technique: questions from a single section, each pitched just above
 * the candidate's current level, for as long as they want to keep going.
 */
export function InterviewTrainPage() {
  return (
    <InterviewGate>
      <Train />
    </InterviewGate>
  );
}

/** Training comes with the subscription; the free tier gets the upgrade card. */
function Train() {
  const { full } = useInterviewAccess();
  const { sectionId = "" } = useParams();
  return full ? <TrainSection pool={questionsInSection(sectionId)} /> : <TrainLocked />;
}

/** Training, for someone without the subscription. */
function TrainLocked() {
  const { sectionId = "" } = useParams();
  const section = sectionById.get(sectionId);
  return (
    <div className="mx-auto max-w-xl">
      <Link to="/interview" className="font-body text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">
        ← Interview Prep
      </Link>
      <h1 className="font-display mt-1 text-2xl text-[var(--ink)]">
        Train{section ? `: ${section.subtopic}` : ""}
      </h1>
      <p className="font-body mt-2 text-[var(--ink-soft)]">
        Technique training drills one method at a time, with questions pitched just above your current level. It comes
        with Interview Prep.
      </p>
      <div className="mt-6">
        <InterviewUpgradeCard />
      </div>
    </div>
  );
}

function TrainSection({ pool }: { pool: InterviewQuestion[] }) {
  const { sectionId = "" } = useParams();
  const section = sectionById.get(sectionId);
  const { skills, record, saveError } = useInterviewSkills();
  const [seen, setSeen] = useState<Set<string>>(new Set());
  // Captured at the first answer: the bars load asynchronously, so the value at mount may not be real yet.
  const [sessionStart, setSessionStart] = useState<number | null>(null);
  const [answered, setAnswered] = useState(0);
  const [right, setRight] = useState(0);
  const [current, setCurrent] = useState(() => pickTrainingQuestion(pool, skills.get(sectionId), new Set()));

  if (!section || pool.length === 0 || !current) {
    return (
      <p className="font-body text-[var(--ink-soft)]">
        No questions for that technique yet.{" "}
        <Link to="/interview" className="text-[var(--accent)] hover:underline">
          Back to Interview Prep
        </Link>
      </p>
    );
  }

  const ability = skills.get(sectionId);

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/interview" className="font-body text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">
        ← Interview Prep
      </Link>
      <h1 className="font-display mt-1 text-2xl text-[var(--ink)]">
        Train: {section.subtopic}
      </h1>
      <p className="font-body text-sm text-[var(--ink-soft)]">
        {section.number} · {section.topic} · {pool.length} question{pool.length === 1 ? "" : "s"}
      </p>

      <div className="my-6 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5">
        <SkillBar
          label={answered ? `This session: ${right} / ${answered}` : "Skill"}
          value={skillBar(ability)}
          before={sessionStart ?? undefined}
          attempts={ability?.observations ?? 0}
        />
      </div>

      {saveError && <p className="font-body mb-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{saveError}</p>}
      {seen.size >= pool.length && (
        <p className="font-body mb-4 rounded-xl bg-[var(--accent-soft)] px-4 py-2 text-sm text-[var(--accent)]">
          You've seen every question in this technique. From here on they repeat.
        </p>
      )}

      <QuestionCard
        key={`${current.id}-${answered}`}
        question={current}
        showLabels
        onResult={(r) => {
          const { before, after } = record({ question: current, correctness: r.correctness, seconds: r.seconds, mode: "train", section: sectionId });
          // A first-ever answer has no real "before" to compare against.
          if (sessionStart === null && before?.observations) setSessionStart(skillBar(before));
          const nextSeen = new Set(seen).add(current.id);
          setSeen(nextSeen);
          setAnswered((n) => n + 1);
          if (r.correctness === 1) setRight((n) => n + 1);
          setCurrent(pickTrainingQuestion(pool, after, nextSeen));
        }}
      />
    </div>
  );
}
