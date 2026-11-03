import { useEffect, useMemo, useState } from "react";
import { DAILY_GOAL, currentStreak, loadLessonActivity } from "../../lib/assessment/activity";
import { localDayKey } from "../../lib/interview/problemStats";

/**
 * Today's answers against a small daily goal, plus the current day streak.
 * `answeredHere` counts answers given in this panel since it loaded, so the
 * ring moves the moment an answer is graded without re-reading the log.
 */
export function DailyGoal({ userId, answeredHere }: { userId: string; answeredHere: number }) {
  const [days, setDays] = useState<Map<string, number> | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadLessonActivity(userId).then((d) => {
      if (!cancelled) setDays(d);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const { today, streak } = useMemo(() => {
    if (!days) return { today: 0, streak: 0 };
    const key = localDayKey(new Date());
    const withSession = new Map(days);
    withSession.set(key, (days.get(key) ?? 0) + answeredHere);
    return { today: withSession.get(key) ?? 0, streak: currentStreak(withSession) };
  }, [days, answeredHere]);

  if (!days) return null;

  const met = today >= DAILY_GOAL;
  const ratio = Math.min(1, today / DAILY_GOAL);
  const r = 9;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="font-body mt-4 flex items-center gap-3 border-t border-[var(--line)] pt-3 text-sm">
      <svg width="24" height="24" viewBox="-12 -12 24 24" aria-hidden="true">
        <circle r={r} fill="none" stroke="var(--line)" strokeWidth="3" />
        <circle
          r={r}
          fill="none"
          stroke={met ? "#d4a017" : "var(--teal)"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${ratio * circumference} ${circumference}`}
          transform="rotate(-90)"
          style={{ transition: "stroke-dasharray 0.5s ease-out" }}
        />
      </svg>
      <span key={met ? "met" : "open"} className={met ? "ml-pop text-[var(--ink)]" : "text-[var(--ink)]"}>
        {met ? (
          <>
            <span className="font-semibold">Daily goal met</span> · {today} answered today
          </>
        ) : (
          <>
            <span className="font-semibold">
              {today}/{DAILY_GOAL}
            </span>{" "}
            today
          </>
        )}
      </span>
      <span className="text-[var(--ink-soft)]">·</span>
      <span className="text-[var(--ink)]">
        <span className="font-semibold">{streak}</span>-day streak
      </span>
    </div>
  );
}
