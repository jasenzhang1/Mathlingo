import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { InterviewGate, InterviewUpgradeCard } from "../components/interview/InterviewGate";
import { QuestionCard, type QuestionResult } from "../components/interview/QuestionCard";
import { SkillBar } from "../components/interview/SkillBar";
import { activeBundles, bundleQuestions, familyById, questionTitle, sectionById, sectionLabel } from "../lib/interview/bank";
import { useInterviewAccess } from "../lib/interview/access";
import { skillBar } from "../lib/interview/scoring";
import type { Bundle, InterviewQuestion } from "../lib/interview/types";
import { useInterviewSkills } from "../lib/interview/useInterviewSkills";

const RECENT_KEY = "mathlingo:interview:recent-bundles";

function readRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function rememberBundle(id: string) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify([id, ...readRecent().filter((x) => x !== id)].slice(0, 20)));
  } catch {
    // Not remembering is fine; it only affects variety.
  }
}

/**
 * Picks the interview. Hand-curated chains are three times as likely as the
 * auto-generated ones, and the last few bundles done are skipped while there
 * is anything else left to choose from.
 */
function chooseBundle(bundleId: string | null, familyId: string | null): Bundle | undefined {
  const all = activeBundles().filter((b) => bundleQuestions(b).length > 0);
  if (bundleId) return all.find((b) => b.id === bundleId);
  const inFamily = familyId ? all.filter((b) => b.family === familyId) : all;
  const pool = inFamily.length ? inFamily : all;
  const recent = new Set(readRecent().slice(0, familyId ? 2 : 10));
  const fresh = pool.filter((b) => !recent.has(b.id));
  const candidates = fresh.length ? fresh : pool;
  const weights = candidates.map((b) => (b.curated ? 3 : 1));
  let r = Math.random() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i];
    if (r <= 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}

interface StepOutcome extends QuestionResult {
  question: InterviewQuestion;
  score: number;
  /** undefined when the section had never been attempted — there is no "before" bar to compare with. */
  before?: number;
  after: number;
}

export function InterviewMockPage() {
  return (
    <InterviewGate>
      <MockInterview />
    </InterviewGate>
  );
}

/** Mock interviews come with the subscription; the free tier gets the upgrade card. */
function MockInterview() {
  const { full } = useInterviewAccess();
  return full ? <MockInterviews /> : <MockLocked />;
}

function MockLocked() {
  return (
    <div className="mx-auto max-w-xl">
      <Link to="/interview" className="font-body text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">
        ← Interview Prep
      </Link>
      <h1 className="font-display mt-1 text-2xl text-[var(--ink)]">Mock interviews</h1>
      <p className="font-body mt-2 text-[var(--ink-soft)]">
        A mock interview is one scenario with follow-ups that get harder, every answer timed. It comes with Interview
        Prep.
      </p>
      <div className="mt-6">
        <InterviewUpgradeCard />
      </div>
    </div>
  );
}

function MockInterviews() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Bumped to start a fresh interview without a page reload.
  const [run, setRun] = useState(0);
  const again = (familyId?: string) => {
    setSearchParams(familyId ? { family: familyId } : {});
    setRun((r) => r + 1);
  };
  return (
    <MockRun
      key={run}
      bundleId={run === 0 ? searchParams.get("bundle") : null}
      familyId={searchParams.get("family")}
      onAgain={again}
    />
  );
}

function MockRun({
  bundleId,
  familyId,
  onAgain,
}: {
  bundleId: string | null;
  familyId: string | null;
  onAgain: (familyId?: string) => void;
}) {
  const { record, saveError } = useInterviewSkills();
  // Chosen once per run.
  const [bundle] = useState(() => chooseBundle(bundleId, familyId));
  const steps = useMemo(() => (bundle ? bundleQuestions(bundle) : []), [bundle]);
  const [outcomes, setOutcomes] = useState<StepOutcome[]>([]);

  if (!bundle || steps.length === 0) {
    return (
      <p className="font-body text-[var(--ink-soft)]">
        No interview matches that. <Link to="/interview" className="text-[var(--accent)] hover:underline">Back to Interview Prep</Link>
      </p>
    );
  }

  const family = bundle.family ? familyById.get(bundle.family) : undefined;
  const index = outcomes.length;
  const done = index >= steps.length;

  function handleResult(q: InterviewQuestion, result: QuestionResult) {
    const { before, after, score } = record({ question: q, correctness: result.correctness, seconds: result.seconds, mode: "mock" });
    const next = [
      ...outcomes,
      { ...result, question: q, score, before: before?.observations ? skillBar(before) : undefined, after: skillBar(after) },
    ];
    setOutcomes(next);
    if (next.length === steps.length) rememberBundle(bundle!.id);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <div>
          <Link to="/interview" className="font-body text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">
            ← Interview Prep
          </Link>
          <h1 className="font-display mt-1 text-2xl text-[var(--ink)]">
            {done ? bundle.title : `Mock interview${family ? ` · ${family.name}` : ""}`}
          </h1>
        </div>
        <span className="font-body text-sm text-[var(--ink-soft)]">
          {Math.min(index + 1, steps.length)} / {steps.length}
        </span>
      </div>

      {/* Progress dots: green right, amber partial, red missed. */}
      <div className="mb-6 flex gap-1.5">
        {steps.map((q, i) => {
          const o = outcomes[i];
          const color = !o ? (i === index ? "var(--accent)" : "var(--line)") : o.correctness === 1 ? "var(--teal)" : o.correctness > 0 ? "#d97706" : "#dc2626";
          return <div key={q.id} className="h-1.5 flex-1 rounded-full" style={{ background: color }} />;
        })}
      </div>

      {saveError && <p className="font-body mb-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{saveError}</p>}

      {!done ? (
        <QuestionCard
          key={steps[index].id}
          question={steps[index]}
          stepLabel={`Question ${index + 1}`}
          onResult={(r) => handleResult(steps[index], r)}
        />
      ) : (
        <Summary outcomes={outcomes} onAgain={onAgain} familyId={bundle.family} />
      )}
    </div>
  );
}

function Summary({
  outcomes,
  onAgain,
  familyId,
}: {
  outcomes: StepOutcome[];
  onAgain: (familyId?: string) => void;
  familyId: string | null;
}) {
  const right = outcomes.filter((o) => o.correctness === 1).length;
  const totalSeconds = outcomes.reduce((a, o) => a + o.seconds, 0);

  // Net movement per section across the interview: first "before", last "after".
  const bySection = new Map<string, { before?: number; after: number; missed: boolean }>();
  for (const o of outcomes) {
    if (!o.question.section) continue;
    const prev = bySection.get(o.question.section);
    bySection.set(o.question.section, {
      before: prev ? prev.before : o.before,
      after: o.after,
      missed: (prev?.missed ?? false) || o.correctness < 1,
    });
  }
  const missed = [...bySection].filter(([, v]) => v.missed);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
        <p className="font-display text-3xl text-[var(--ink)]">
          {right} / {outcomes.length} <span className="font-body text-base text-[var(--ink-soft)]">correct</span>
        </p>
        <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">
          {Math.floor(totalSeconds / 60)} min {Math.round(totalSeconds % 60)} s in total
        </p>

        <ol className="font-body mt-5 space-y-2 text-sm">
          {outcomes.map((o, i) => (
            <li key={o.question.id} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                style={{ background: o.correctness === 1 ? "var(--teal)" : o.correctness > 0 ? "#d97706" : "#dc2626" }}
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[var(--ink)]">{questionTitle(o.question)}</span>
                <span className="text-xs text-[var(--ink-soft)]">
                  {sectionLabel(o.question.section)} · {Math.round(o.seconds)} s
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
        <h2 className="font-display text-xl text-[var(--ink)]">Skill changes</h2>
        <div className="mt-4 space-y-3">
          {[...bySection].map(([id, v]) => (
            <SkillBar
              key={id}
              label={`${sectionLabel(id)}${v.before === undefined ? " (new)" : ""}`}
              value={v.after}
              before={v.before}
              trainHref={v.missed ? `/interview/train/${encodeURIComponent(id)}` : undefined}
            />
          ))}
        </div>
        {missed.length > 0 && (
          <p className="font-body mt-4 text-sm text-[var(--ink-soft)]">
            Tripped up on {missed.map(([id]) => sectionById.get(id)?.subtopic ?? id).join(", ")}? Use Train to drill it.
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => onAgain()} className="font-body rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
          Another interview
        </button>
        {familyId && (
          <button
            type="button"
            onClick={() => onAgain(familyId)}
            className="font-body rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]"
          >
            Same scenario, different chain
          </button>
        )}
        <Link to="/interview" className="font-body rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]">
          Done
        </Link>
      </div>
    </div>
  );
}
