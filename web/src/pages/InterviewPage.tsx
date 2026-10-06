import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InterviewGate, InterviewUpgradeCard } from "../components/interview/InterviewGate";
import { SkillBar } from "../components/interview/SkillBar";
import {
  activeBundles,
  bundleQuestions,
  familyById,
  freeBundleQuestionIds,
  isFreeQuestion,
  liveQuestions,
  sectionById,
  sectionLabel,
  sectionsByTopic,
  techniquesOf,
} from "../lib/interview/bank";
import { isFreeBundle, useInterviewAccess } from "../lib/interview/access";
import { skillBar } from "../lib/interview/scoring";
import { useInterviewSkills } from "../lib/interview/useInterviewSkills";

/** Interview prep home: start a mock interview, see skill bars, pick something to drill. */
export function InterviewPage() {
  return (
    <InterviewGate>
      <InterviewHome />
    </InterviewGate>
  );
}

function InterviewHome() {
  const { full } = useInterviewAccess();
  return full ? <FullHome /> : <FreeHome />;
}

/** The free tier: the free mock-interview decks, and what subscribing adds. */
function FreeHome() {
  const navigate = useNavigate();
  const decks = useMemo(() => activeBundles().filter((b) => isFreeBundle(b) && bundleQuestions(b).length > 0), []);
  /** Techniques with at least one free question, and how many. */
  const practice = useMemo(() => {
    const viaBundle = freeBundleQuestionIds();
    const counts = new Map<string, number>();
    for (const q of liveQuestions) {
      if (!isFreeQuestion(q, viaBundle)) continue;
      for (const t of techniquesOf(q)) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return [...counts]
      .filter(([id]) => sectionById.has(id))
      .sort((a, b) => sectionById.get(a[0])!.number - sectionById.get(b[0])!.number);
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl text-[var(--ink)] md:text-4xl">Interview Prep</h1>
        <p className="font-body mt-2 max-w-2xl text-[var(--ink-soft)]">
          Try a mock interview: one scenario, follow-ups that get harder, every answer timed. These decks and
          questions are free; the full bank of {liveQuestions.length.toLocaleString()} questions comes with Interview
          Prep.
        </p>
      </div>

      <ProblemListLink />

      <section>
        <h2 className="font-display text-2xl text-[var(--ink)]">Free decks</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {decks.map((b) => (
            <div key={b.id} className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
              <h3 className="font-display text-lg text-[var(--ink)]">{b.title}</h3>
              <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">
                {bundleQuestions(b).length} questions{b.family ? ` · ${familyById.get(b.family)?.name ?? b.family}` : ""}
              </p>
              <button
                type="button"
                onClick={() => navigate(`/interview/mock?bundle=${encodeURIComponent(b.id)}`)}
                className="font-body mt-5 w-full rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Start mock interview
              </button>
            </div>
          ))}
        </div>
      </section>

      {practice.length > 0 && (
        <section>
          <h2 className="font-display text-2xl text-[var(--ink)]">Free practice</h2>
          <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">Drill a technique with its free questions.</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {practice.map(([id, n]) => (
              <li key={id}>
                <Link
                  to={`/interview/train/${encodeURIComponent(id)}`}
                  className="font-body flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 text-sm text-[var(--ink)] hover:border-[var(--accent)]"
                >
                  <span className="min-w-0 truncate">{sectionLabel(id)}</span>
                  <span className="shrink-0 text-xs text-[var(--ink-soft)]">
                    {n} free
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="max-w-xl">
        <h2 className="font-display text-2xl text-[var(--ink)]">Get the full bank</h2>
        <div className="mt-4">
          <InterviewUpgradeCard />
        </div>
      </section>
    </div>
  );
}

function FullHome() {
  const navigate = useNavigate();
  const { skills, saveError } = useInterviewSkills();
  const [family, setFamily] = useState("");
  const [showAll, setShowAll] = useState(false);

  const bundles = useMemo(() => activeBundles().filter((b) => bundleQuestions(b).length > 0), []);
  const familyOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const b of bundles) if (b.family) counts.set(b.family, (counts.get(b.family) ?? 0) + 1);
    return [...counts]
      .map(([id, n]) => ({ id, name: familyById.get(id)?.name ?? id, n }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [bundles]);

  const groups = useMemo(() => sectionsByTopic(), []);
  const attempted = [...skills].filter(([, a]) => a.observations > 0);
  const weakest = attempted
    .map(([id, a]) => ({ id, value: skillBar(a), n: a.observations }))
    .sort((a, b) => a.value - b.value)
    .slice(0, 4);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl text-[var(--ink)] md:text-4xl">Interview Prep</h1>
        <p className="font-body mt-2 max-w-2xl text-[var(--ink-soft)]">
          {liveQuestions.length.toLocaleString()} quant interview questions. A mock interview asks one scenario at a
          time, getting harder as it goes, and times every answer, because in the room speed counts too.
        </p>
      </div>

      <ProblemListLink />

      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
          <h2 className="font-display text-xl text-[var(--ink)]">Mock interview</h2>
          <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">
            One scenario, several follow-ups. Technique labels stay hidden until you answer.
          </p>
          <button
            type="button"
            onClick={() => navigate("/interview/mock")}
            className="font-body mt-5 w-full rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Start a random interview
          </button>
          <div className="mt-4 flex gap-2">
            <select
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              className="font-body min-w-0 flex-1 rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)]"
            >
              <option value="">Or choose a scenario…</option>
              {familyOptions.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={!family}
              onClick={() => navigate(`/interview/mock?family=${encodeURIComponent(family)}`)}
              className="font-body rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] disabled:opacity-40"
            >
              Go
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
          <h2 className="font-display text-xl text-[var(--ink)]">Train a technique</h2>
          {weakest.length === 0 ? (
            <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">
              Do a mock interview first. Your weakest techniques will show up here, ready to drill. Or pick any
              technique from the list below.
            </p>
          ) : (
            <>
              <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">Your weakest techniques so far:</p>
              <div className="mt-4 space-y-3">
                {weakest.map((w) => {
                  return (
                    <SkillBar
                      key={w.id}
                      label={sectionLabel(w.id)}
                      value={w.value}
                      attempts={w.n}
                      trainHref={`/interview/train/${encodeURIComponent(w.id)}`}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl text-[var(--ink)]">Skills</h2>
          <label className="font-body flex items-center gap-2 text-sm text-[var(--ink-soft)]">
            <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />
            Show techniques I haven't tried
          </label>
        </div>
        <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">
          Separate from your lesson proficiency. Interview practice only moves these bars.
        </p>
        {saveError && <p className="font-body mt-3 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{saveError}</p>}

        <div className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {groups.map(({ topic, sections }) => {
            const shown = sections.filter((s) => showAll || (skills.get(s.id)?.observations ?? 0) > 0);
            if (shown.length === 0) return null;
            return (
              <div key={topic}>
                <h3 className="font-body mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">{topic}</h3>
                <div className="space-y-3">
                  {shown.map((s) => {
                    const a = skills.get(s.id);
                    return (
                      <SkillBar
                        key={s.id}
                        label={`${s.number} · ${s.subtopic}`}
                        value={skillBar(a)}
                        attempts={a?.observations ?? 0}
                        trainHref={`/interview/train/${encodeURIComponent(s.id)}`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {!showAll && attempted.length === 0 && (
          <p className="font-body mt-4 text-sm text-[var(--ink-soft)]">
            Nothing yet. <Link to="/interview/mock" className="text-[var(--accent)] hover:underline">Start an interview</Link>{" "}
            or tick the box above to browse every technique.
          </p>
        )}
      </section>
    </div>
  );
}

/** The way into the full problem list, on both tiers (locked questions show a lock there). */
function ProblemListLink() {
  return (
    <Link
      to="/interview/problems"
      className="font-body flex items-center justify-between gap-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-6 py-4 shadow-sm hover:border-[var(--accent)]"
    >
      <span>
        <span className="font-display block text-lg text-[var(--ink)]">Problem list</span>
        <span className="block text-sm text-[var(--ink-soft)]">
          Browse every question. Filter by concept, scenario, and difficulty (the share of students who get it right).
        </span>
      </span>
      <span className="shrink-0 text-sm font-semibold text-[var(--accent)]">Browse →</span>
    </Link>
  );
}
