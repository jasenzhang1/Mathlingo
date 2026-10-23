import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InterviewGate, InterviewUpgradeCard } from "../components/interview/InterviewGate";
import { SkillBar } from "../components/interview/SkillBar";
import { useAuth } from "../lib/auth/useAuth";
import { isFreeQuestion, liveQuestions, questionsInSection, sectionLabel, sections } from "../lib/interview/bank";
import { useInterviewAccess } from "../lib/interview/access";
import {
  DIFFICULTY_BANDS,
  difficultyBand,
  loadMyHistory,
  loadQuestionStats,
  localDayKey,
  solveRate,
  type AttemptHistory,
  type DifficultyBand,
  type QuestionStats,
} from "../lib/interview/problemStats";
import { skillBar } from "../lib/interview/scoring";
import { useInterviewSkills } from "../lib/interview/useInterviewSkills";

/**
 * Interview prep home: a dashboard sampling everything the tab offers — the
 * problem list, solved counts by difficulty, a practice-activity grid, the
 * skill bars, and one-click random practice.
 */
export function InterviewPage() {
  return (
    <InterviewGate>
      <Dashboard />
    </InterviewGate>
  );
}

const BAND_BAR: Record<DifficultyBand, string> = {
  easy: "var(--teal)",
  medium: "#d97706",
  hard: "#dc2626",
};

const pick = <T,>(xs: T[]): T | undefined => xs[Math.floor(Math.random() * xs.length)];

function Dashboard() {
  const { full } = useInterviewAccess();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { skills, saveError } = useInterviewSkills();
  const [stats, setStats] = useState<Map<string, QuestionStats> | null>(null);
  const [history, setHistory] = useState<AttemptHistory>({ statuses: new Map(), days: new Map() });

  useEffect(() => {
    let cancelled = false;
    void loadQuestionStats().then((m) => !cancelled && setStats(m));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    void loadMyHistory(user.id).then((h) => !cancelled && setHistory(h));
    return () => {
      cancelled = true;
    };
  }, [user]);

  const available = useMemo(() => (full ? liveQuestions : liveQuestions.filter(isFreeQuestion)), [full]);

  const bands = useMemo(() => {
    const out = new Map<DifficultyBand, { solved: number; total: number }>(
      DIFFICULTY_BANDS.map((b) => [b.id, { solved: 0, total: 0 }]),
    );
    for (const q of liveQuestions) {
      const entry = out.get(difficultyBand(q, solveRate(stats?.get(q.id))))!;
      entry.total++;
      if (history.statuses.get(q.id) === "solved") entry.solved++;
    }
    return out;
  }, [stats, history]);
  const solvedTotal = [...bands.values()].reduce((n, b) => n + b.solved, 0);

  const trainable = useMemo(() => sections.filter((s) => questionsInSection(s.id).length > 0), []);
  const attempted = [...skills].filter(([, a]) => a.observations > 0);
  const weakest = attempted
    .map(([id, a]) => ({ id, value: skillBar(a), n: a.observations }))
    .sort((a, b) => a.value - b.value)
    .slice(0, 5);

  function randomQuestion() {
    // Prefer questions never answered, then ones not yet solved, then anything.
    const fresh = available.filter((q) => !history.statuses.has(q.id));
    const unsolved = available.filter((q) => history.statuses.get(q.id) !== "solved");
    const q = pick(fresh) ?? pick(unsolved) ?? pick(available);
    if (q) navigate(`/interview/problems/${encodeURIComponent(q.id)}`);
  }

  function randomSkill() {
    const s = pick(trainable);
    if (s) navigate(`/interview/train/${encodeURIComponent(s.id)}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-[var(--ink)] md:text-4xl">Interview Prep</h1>
        <Link
          to="/interview/problems"
          className="font-display rounded-full bg-[var(--accent)] px-7 py-3 text-xl text-white shadow-sm transition-opacity hover:opacity-90"
        >
          View all questions →
        </Link>
      </div>

      {saveError && <p className="font-body rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{saveError}</p>}

      <div className="grid gap-5 md:grid-cols-3">
        <Card title="Solved" className="md:col-span-1">
          <p className="font-display text-4xl text-[var(--ink)]">
            {solvedTotal}
            <span className="font-body text-base text-[var(--ink-soft)]"> / {liveQuestions.length}</span>
          </p>
          <div className="mt-4 space-y-3">
            {DIFFICULTY_BANDS.map((b) => {
              const { solved, total } = bands.get(b.id)!;
              return (
                <div key={b.id} className="font-body">
                  <div className="mb-1 flex justify-between text-sm">
                    <span style={{ color: BAND_BAR[b.id] }} className="font-medium">
                      {b.label}
                    </span>
                    <span className="text-[var(--ink-soft)]">
                      <span className="font-semibold text-[var(--ink)]">{solved}</span> / {total}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--line)]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${total ? (solved / total) * 100 : 0}%`, background: BAND_BAR[b.id] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Activity" className="md:col-span-2">
          <ActivityGrid days={history.days} />
        </Card>

        <Card title="Random question">
          <button type="button" onClick={randomQuestion} className={PRIMARY}>
            Give me a question
          </button>
        </Card>

        <Card title="Random skill">
          {full ? (
            <button type="button" onClick={randomSkill} className={PRIMARY}>
              Train a random technique
            </button>
          ) : (
            <Locked />
          )}
        </Card>

        <Card title="Mock interview">
          {full ? (
            <button type="button" onClick={() => navigate("/interview/mock")} className={PRIMARY}>
              Start a mock interview
            </button>
          ) : (
            <Locked />
          )}
        </Card>

        <Card
          title="Needs the most help"
          className="md:col-span-3"
          action={
            <Link to="/interview/skills" className="font-body text-sm font-semibold text-[var(--accent)] hover:underline">
              View all skills →
            </Link>
          }
        >
          {weakest.length === 0 ? (
            <p className="font-body text-sm text-[var(--ink-soft)]">Answer a few questions and your weakest techniques show up here.</p>
          ) : (
            <div className="grid gap-x-10 gap-y-3 md:grid-cols-2">
              {weakest.map((w) => (
                <SkillBar
                  key={w.id}
                  label={sectionLabel(w.id)}
                  value={w.value}
                  attempts={w.n}
                  trainHref={full ? `/interview/train/${encodeURIComponent(w.id)}` : undefined}
                />
              ))}
            </div>
          )}
        </Card>
      </div>

      {!full && (
        <section className="max-w-xl pt-4">
          <h2 className="font-display text-2xl text-[var(--ink)]">Get the full bank</h2>
          <div className="mt-4">
            <InterviewUpgradeCard />
          </div>
        </section>
      )}
    </div>
  );
}

const PRIMARY =
  "font-body w-full rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90";

function Card({
  title,
  action,
  className = "",
  children,
}: {
  title: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`min-w-0 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-sm ${className}`}>
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-lg text-[var(--ink)]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Locked() {
  return <p className="font-body text-sm text-[var(--ink-soft)]">Included with the full subscription.</p>;
}

/** Weeks shown in the activity grid: one year, GitHub style. */
const WEEKS = 53;

function shade(count: number): string {
  if (count === 0) return "var(--line)";
  const opacity = count >= 10 ? 1 : count >= 5 ? 0.75 : count >= 2 ? 0.5 : 0.3;
  return `color-mix(in srgb, var(--teal) ${opacity * 100}%, transparent)`;
}

/** One square per day for the last year, columns are weeks (Sunday first), darker for more answers. */
function ActivityGrid({ days }: { days: Map<string, number> }) {
  const { weeks, total, activeDays, streak } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(start.getDate() - start.getDay() - (WEEKS - 1) * 7);

    const weeks: { key: string; count: number; future: boolean }[][] = [];
    let total = 0;
    let activeDays = 0;
    for (let w = 0; w < WEEKS; w++) {
      const col = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(start);
        date.setDate(start.getDate() + w * 7 + d);
        const key = localDayKey(date);
        const count = days.get(key) ?? 0;
        const future = date > today;
        if (!future) {
          total += count;
          if (count > 0) activeDays++;
        }
        col.push({ key, count, future });
      }
      weeks.push(col);
    }

    // Days in a row with practice, ending today (or yesterday, if today hasn't started yet).
    let streak = 0;
    const cursor = new Date(today);
    if (!days.get(localDayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    while (days.get(localDayKey(cursor))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return { weeks, total, activeDays, streak };
  }, [days]);

  return (
    <div>
      <div className="font-body mb-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--ink-soft)]">
        <span>
          <span className="font-semibold text-[var(--ink)]">{total}</span> answers in the past year
        </span>
        <span>
          <span className="font-semibold text-[var(--ink)]">{activeDays}</span> active days
        </span>
        <span>
          <span className="font-semibold text-[var(--ink)]">{streak}</span>-day streak
        </span>
      </div>
      <div className="overflow-x-auto pb-1">
        <div className="flex w-max gap-[3px]">
          {weeks.map((col, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {col.map((day) => (
                <div
                  key={day.key}
                  className="h-[11px] w-[11px] rounded-[2px]"
                  style={{ background: day.future ? "transparent" : shade(day.count) }}
                  title={day.future ? undefined : `${day.count} answer${day.count === 1 ? "" : "s"} on ${day.key}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="font-body mt-2 flex items-center justify-end gap-1 text-xs text-[var(--ink-soft)]">
        Less
        {[0, 1, 2, 5, 10].map((n) => (
          <span key={n} className="h-[11px] w-[11px] rounded-[2px]" style={{ background: shade(n) }} />
        ))}
        More
      </div>
    </div>
  );
}
