import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { InterviewGate } from "../components/interview/InterviewGate";
import { SkillBar } from "../components/interview/SkillBar";
import { sectionsByTopic } from "../lib/interview/bank";
import { useInterviewAccess } from "../lib/interview/access";
import { skillBar } from "../lib/interview/scoring";
import { useInterviewSkills } from "../lib/interview/useInterviewSkills";

/** Every interview skill bar, grouped by topic. */
export function InterviewSkillsPage() {
  return (
    <InterviewGate>
      <Skills />
    </InterviewGate>
  );
}

function Skills() {
  const { full } = useInterviewAccess();
  const { skills, saveError } = useInterviewSkills();
  const [showAll, setShowAll] = useState(false);
  const groups = useMemo(() => sectionsByTopic(), []);
  const attempted = [...skills].filter(([, a]) => a.observations > 0);

  return (
    <div className="space-y-6">
      <Link to="/interview" className="font-body text-sm text-[var(--accent)] hover:underline">
        ← Interview Prep
      </Link>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-3xl text-[var(--ink)] md:text-4xl">Skills</h1>
        <label className="font-body flex items-center gap-2 text-sm text-[var(--ink-soft)]">
          <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />
          Show techniques I haven't tried
        </label>
      </div>
      {saveError && <p className="font-body rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{saveError}</p>}

      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
        {groups.map(({ topic, sections }) => {
          const shown = sections.filter((s) => showAll || (skills.get(s.id)?.observations ?? 0) > 0);
          if (shown.length === 0) return null;
          return (
            <div key={topic}>
              <h2 className="font-body mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">{topic}</h2>
              <div className="space-y-3">
                {shown.map((s) => {
                  const a = skills.get(s.id);
                  return (
                    <SkillBar
                      key={s.id}
                      label={`${s.number} · ${s.subtopic}`}
                      value={skillBar(a)}
                      attempts={a?.observations ?? 0}
                      trainHref={full ? `/interview/train/${encodeURIComponent(s.id)}` : undefined}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {!showAll && attempted.length === 0 && (
        <p className="font-body text-sm text-[var(--ink-soft)]">
          Nothing yet. Answer a question, or tick the box above to browse every technique.
        </p>
      )}
    </div>
  );
}
