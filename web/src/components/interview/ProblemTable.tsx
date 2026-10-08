import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DIFFICULTY_BANDS,
  difficultyBand,
  difficultyOf,
  familyById,
  liveQuestions,
  PROBLEM_TOPICS,
  problemNumber,
  problemTopic,
  questionTitle,
  techniquesOf,
  sectionLabel,
  type DifficultyBand,
  type ProblemTopic,
} from "../../lib/interview/bank";
import { MIN_STUDENTS } from "../../lib/interview/problemStats";
import { useSolvedQuestions } from "../../lib/interview/solved";
import { useQuestionStats, type QuestionStats } from "../../lib/interview/stats";
import type { InterviewQuestion } from "../../lib/interview/types";

/** Pill colours per topic, readable in light and dark. */
const TOPIC_STYLE: Record<ProblemTopic, string> = {
  Brainteasers: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  Probability: "bg-purple-500/15 text-purple-700 dark:text-purple-300",
  Combinatorics: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  "Number Theory": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  Algebra: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  "Game Theory": "bg-amber-500/15 text-amber-700 dark:text-amber-300",
};

const BAND_STYLE: Record<DifficultyBand, string> = {
  Easy: "text-[var(--teal)]",
  Medium: "text-amber-600 dark:text-amber-400",
  Hard: "text-red-600 dark:text-red-400",
};

type StatusFilter = "all" | "solved" | "unsolved";
type SortKey = "number" | "title" | "difficulty" | "acceptance";
const PAGE = 50;

/** Share of students right on their first answer, or null until `MIN_STUDENTS` have answered. */
function acceptance(s: QuestionStats | undefined): number | null {
  return s && s.attempts >= MIN_STUDENTS ? s.solved / s.attempts : null;
}

function matches(q: InterviewQuestion, text: string): boolean {
  const t = text.trim().toLowerCase();
  if (!t) return true;
  const family = q.family ? (familyById.get(q.family)?.name ?? "") : "";
  const hay = [q.id, String(problemNumber(q) ?? ""), questionTitle(q), family, problemTopic(q), ...techniquesOf(q).map(sectionLabel)]
    .join(" ")
    .toLowerCase();
  return t.split(/\s+/).every((w) => hay.includes(w));
}

const select =
  "font-body w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none";
const filterLabel = "font-body mb-1.5 block text-xs font-semibold text-[var(--ink-soft)]";

/** The whole bank as a LeetCode-style list: status, number, title, topic, scenario, difficulty, acceptance. */
export function ProblemTable() {
  const navigate = useNavigate();
  const solved = useSolvedQuestions();
  const stats = useQuestionStats();
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState<ProblemTopic | "">("");
  const [band, setBand] = useState<DifficultyBand | "">("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({ key: "number", desc: false });
  const [page, setPage] = useState(0);

  const rows = useMemo(() => {
    const filtered = liveQuestions.filter((q) => {
      if (topic && problemTopic(q) !== topic) return false;
      if (band && difficultyBand(q) !== band) return false;
      if (status === "solved" && !solved.has(q.id)) return false;
      if (status === "unsolved" && solved.has(q.id)) return false;
      return matches(q, search);
    });
    const value = (q: InterviewQuestion): number | string => {
      switch (sort.key) {
        case "title":
          return questionTitle(q).toLowerCase();
        case "difficulty":
          return difficultyOf(q);
        case "acceptance":
          // Untried questions sort last either way.
          return acceptance(stats.get(q.id)) ?? (sort.desc ? -1 : 2);
        default:
          return problemNumber(q) ?? Infinity;
      }
    };
    return filtered.sort((a, b) => {
      const va = value(a);
      const vb = value(b);
      const c = typeof va === "string" ? va.localeCompare(vb as string) : va - (vb as number);
      return sort.desc ? -c : c;
    });
  }, [search, topic, band, status, sort, solved, stats]);

  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const current = Math.min(page, pages - 1);
  const shown = rows.slice(current * PAGE, (current + 1) * PAGE);
  const solvedCount = liveQuestions.filter((q) => solved.has(q.id)).length;

  /** Every filter change goes back to the first page. */
  function filter<T>(set: (v: T) => void) {
    return (v: T) => {
      set(v);
      setPage(0);
    };
  }

  function sortHeader(k: SortKey, children: string, className = "") {
    const active = sort.key === k;
    return (
      <th key={k} className={`px-3 py-3 font-semibold ${className}`}>
        <button
          type="button"
          onClick={() => setSort(active ? { key: k, desc: !sort.desc } : { key: k, desc: false })}
          className={`inline-flex items-center gap-1 uppercase tracking-wide hover:text-[var(--ink)] ${active ? "text-[var(--ink)]" : ""}`}
        >
          {children}
          <span aria-hidden className="text-[10px]">
            {active ? (sort.desc ? "▼" : "▲") : ""}
          </span>
        </button>
      </th>
    );
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label>
          <span className={filterLabel}>Search</span>
          <input
            value={search}
            onChange={(e) => filter(setSearch)(e.target.value)}
            placeholder="Title, scenario, technique or #"
            className={select}
          />
        </label>
        <label>
          <span className={filterLabel}>Topic</span>
          <select value={topic} onChange={(e) => filter(setTopic)(e.target.value as ProblemTopic | "")} className={select}>
            <option value="">All</option>
            {PROBLEM_TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={filterLabel}>Difficulty</span>
          <select value={band} onChange={(e) => filter(setBand)(e.target.value as DifficultyBand | "")} className={select}>
            <option value="">All</option>
            {DIFFICULTY_BANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={filterLabel}>Status</span>
          <select value={status} onChange={(e) => filter(setStatus)(e.target.value as StatusFilter)} className={select}>
            <option value="all">All</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>
        </label>
      </div>

      <p className="font-body mt-4 text-sm text-[var(--ink-soft)]">
        <span className="font-semibold text-[var(--ink)]">{solvedCount}</span>/{liveQuestions.length.toLocaleString()} solved
        {rows.length !== liveQuestions.length && ` · ${rows.length.toLocaleString()} match`}
      </p>

      <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
        <table className="font-body w-full text-sm">
          <thead className="border-b border-[var(--line)] text-left text-xs text-[var(--ink-soft)]">
            <tr>
              <th className="w-14 px-3 py-3 text-center font-semibold uppercase tracking-wide">Status</th>
              {sortHeader("number", "#", "w-14")}
              {sortHeader("title", "Title")}
              <th className="hidden px-3 py-3 font-semibold uppercase tracking-wide md:table-cell">Topic</th>
              <th className="hidden px-3 py-3 font-semibold uppercase tracking-wide lg:table-cell">Scenario</th>
              {sortHeader("difficulty", "Difficulty")}
              {sortHeader("acceptance", "Acceptance", "hidden sm:table-cell")}
            </tr>
          </thead>
          <tbody>
            {shown.map((q, i) => {
              const t = problemTopic(q);
              const b = difficultyBand(q);
              const rate = acceptance(stats.get(q.id));
              const family = q.family ? familyById.get(q.family)?.name : undefined;
              const isSolved = solved.has(q.id);
              return (
                <tr
                  key={q.id}
                  onClick={() => navigate(`/interview/problem/${encodeURIComponent(q.id)}`)}
                  className={`cursor-pointer border-b border-[var(--line)] last:border-0 hover:bg-[var(--accent-soft)] ${i % 2 ? "bg-[var(--paper)]/60" : ""}`}
                >
                  <td className="px-3 py-3 text-center">
                    {isSolved && (
                      <span className="text-[var(--teal)]" role="img" aria-label="Solved" title="Solved">
                        ✓
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 tabular-nums text-[var(--ink-soft)]">{problemNumber(q) ?? q.id}</td>
                  <td className="px-3 py-3 font-medium text-[var(--ink)]">
                    <Link
                      to={`/interview/problem/${encodeURIComponent(q.id)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-[var(--accent)]"
                    >
                      {questionTitle(q)}
                    </Link>
                  </td>
                  <td className="hidden px-3 py-3 md:table-cell">
                    <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${TOPIC_STYLE[t]}`}>{t}</span>
                  </td>
                  <td className="hidden px-3 py-3 text-[var(--ink-soft)] lg:table-cell">{family ?? "—"}</td>
                  <td className={`px-3 py-3 font-medium ${BAND_STYLE[b]}`}>{b === "Medium" ? "Med." : b}</td>
                  <td className="hidden px-3 py-3 tabular-nums text-[var(--ink-soft)] sm:table-cell">
                    {rate === null ? "—" : `${(rate * 100).toFixed(1)}%`}
                  </td>
                </tr>
              );
            })}
            {shown.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-[var(--ink-soft)]">
                  No problems match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="font-body mt-4 flex items-center justify-center gap-3 text-sm text-[var(--ink-soft)]">
          <button
            type="button"
            disabled={current === 0}
            onClick={() => setPage(current - 1)}
            className="rounded-full border border-[var(--line)] px-3 py-1 hover:text-[var(--ink)] disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="tabular-nums">
            Page {current + 1} of {pages}
          </span>
          <button
            type="button"
            disabled={current >= pages - 1}
            onClick={() => setPage(current + 1)}
            className="rounded-full border border-[var(--line)] px-3 py-1 hover:text-[var(--ink)] disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
