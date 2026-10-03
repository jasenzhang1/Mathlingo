import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import type { Domain } from "../data/concepts";
import { useAuth } from "../lib/auth/useAuth";
import { COURSES, isCourse } from "../lib/courses";
import { useEnrollments } from "../lib/enrollment";
import { chapters } from "../lib/learningOrder";
import {
  BOARDS,
  PERIODS,
  loadLeaderboard,
  type BoardId,
  type LeaderboardRow,
  type Period,
} from "../lib/social/leaderboard";

const conceptIdsByCourse = new Map(chapters.map((c) => [c.domain, c.concepts.map((x) => x.id)]));

/**
 * `/leaderboard`: the top 20 on each board — a course ranking, activity over a
 * period, karma and contributions. Names link to profiles, where people can
 * be followed or sent a chat request. Board, period and course live in the
 * URL so a board is linkable.
 */
export function LeaderboardPage() {
  const { user } = useAuth();
  const { courses: enrolled } = useEnrollments();
  const [params, setParams] = useSearchParams();

  const board = (BOARDS.find((b) => b.id === params.get("board"))?.id ?? "mastery") as BoardId;
  const period = (PERIODS.find((p) => p.id === params.get("period"))?.id ?? "week") as Period;
  const courseParam = params.get("course");
  const course: Domain = isCourse(courseParam) ? courseParam : (enrolled[0] ?? COURSES[0]!.id);
  const def = BOARDS.find((b) => b.id === board)!;
  const courseLabel = COURSES.find((c) => c.id === course)?.label ?? course;

  const [rows, setRows] = useState<LeaderboardRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setRows(null);
    void loadLeaderboard({
      board,
      period: def.periodic ? period : "all",
      concepts: def.perCourse ? conceptIdsByCourse.get(course) : undefined,
      label: def.perCourse ? courseLabel : def.label,
    }).then((result) => {
      if (cancelled) return;
      setRows(result.rows);
      setError(result.error);
    });
    return () => {
      cancelled = true;
    };
  }, [board, period, course, def, courseLabel]);

  const set = (key: string, value: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(key, value);
        return next;
      },
      { replace: true },
    );

  const courseOptions = useMemo(
    () => [...COURSES].sort((a, b) => Number(enrolled.includes(b.id)) - Number(enrolled.includes(a.id))),
    [enrolled],
  );

  const chip = (active: boolean) =>
    `font-body rounded-full border px-3 py-1.5 text-sm transition-colors ${
      active
        ? "border-[var(--accent)] bg-[var(--accent)] text-white"
        : "border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
    }`;

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-3xl text-[var(--ink)] md:text-4xl">Leaderboard</h1>
        <p className="font-body mt-2 text-[var(--ink-soft)]">
          The top 20 on each board. Placing earns an achievement on your profile. You can hide yourself
          from leaderboards in your profile settings.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Board">
          {BOARDS.map((b) => (
            <button key={b.id} type="button" role="tab" aria-selected={b.id === board} onClick={() => set("board", b.id)} className={chip(b.id === board)}>
              {b.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {def.perCourse && (
            <select
              value={course}
              onChange={(e) => set("course", e.target.value)}
              aria-label="Course"
              className="font-body rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              {courseOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          )}
          {def.periodic &&
            PERIODS.map((p) => (
              <button key={p.id} type="button" onClick={() => set("period", p.id)} className={chip(p.id === period)}>
                {p.label}
              </button>
            ))}
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-sm">
          <h2 className="font-display text-lg text-[var(--ink)]">
            {def.perCourse ? `${courseLabel}` : def.label}
            {def.periodic && <span className="font-body ml-2 text-sm font-normal text-[var(--ink-soft)]">{PERIODS.find((p) => p.id === period)!.label.toLowerCase()}</span>}
          </h2>
          <p className="font-body mt-1 text-xs text-[var(--ink-soft)]">{def.blurb}</p>

          {error ? (
            <p className="font-body mt-5 text-sm text-red-700">{error}</p>
          ) : rows === null ? (
            <div className="mt-5 space-y-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="h-10 animate-pulse rounded-xl bg-[var(--paper)]" />
              ))}
            </div>
          ) : rows.length === 0 ? (
            <p className="font-body mt-5 text-sm text-[var(--ink-soft)]">Nobody on this board yet — be the first.</p>
          ) : (
            <ol className="mt-4 divide-y divide-[var(--line)]">
              {rows.map((row) => {
                const isYou = row.userId === user?.id;
                return (
                  <li key={row.userId} className={`flex items-center gap-3 px-2 py-2.5 ${isYou ? "rounded-xl bg-[var(--accent-soft)]" : ""}`}>
                    <span className={`font-display w-7 shrink-0 text-center text-sm ${row.rank <= 3 ? "text-[var(--accent)]" : "text-[var(--ink-soft)]"}`}>
                      {row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : row.rank === 3 ? "🥉" : row.rank}
                    </span>
                    <Link to={`/u/${row.username}`} className="flex min-w-0 flex-1 items-center gap-3 hover:underline">
                      <Avatar url={row.avatarUrl} name={row.displayName} size={32} />
                      <span className="min-w-0">
                        <span className="font-body block truncate text-sm text-[var(--ink)]">
                          {row.displayName}
                          {isYou && <span className="ml-2 text-xs text-[var(--accent)]">you</span>}
                        </span>
                        <span className="font-body block truncate text-xs text-[var(--ink-soft)]">@{row.username}</span>
                      </span>
                    </Link>
                    <span className="font-display shrink-0 text-right text-sm tabular-nums text-[var(--ink)]">
                      {row.value.toFixed(def.decimals)}
                      <span className="font-body ml-1 text-xs text-[var(--ink-soft)]">{def.unit}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
