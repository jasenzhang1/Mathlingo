import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { InterviewGate } from "../components/interview/InterviewGate";
import { DifficultyTag, LockIcon, StatusIcon } from "../components/interview/ProblemBits";
import { useAuth } from "../lib/auth/useAuth";
import { useInterviewAccess } from "../lib/interview/access";
import {
  difficultyOf,
  FREE_PROBLEMS,
  familyById,
  isFreeQuestion,
  liveQuestions,
  problemNumber,
  problemTitle,
  sectionById,
  sectionsByTopic,
  techniquesOf,
} from "../lib/interview/bank";
import {
  BAND_RANK,
  DIFFICULTY_BANDS,
  difficultyBand,
  loadMyStatuses,
  loadQuestionStats,
  MIN_STUDENTS,
  solveRate,
  type DifficultyBand,
  type ProblemStatus,
  type QuestionStats,
} from "../lib/interview/problemStats";
import type { InterviewQuestion } from "../lib/interview/types";

/**
 * Every interview question in one list, LeetCode style: filter by technique,
 * scenario, difficulty and status, sort by difficulty, open one to solve it.
 * Difficulty is the share of students who get the question right.
 *
 * Filters live in the query string, so the back button and shared links keep them.
 */
export function InterviewProblemsPage() {
  return (
    <InterviewGate>
      <ProblemList />
    </InterviewGate>
  );
}

type StatusFilter = ProblemStatus | "todo";
type Sort = "" | "easy" | "hard";

const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "solved", label: "Solved" },
  { id: "attempted", label: "Attempted" },
];

/** Problems per page. */
const PAGE = 25;
const SHOW_TAGS_KEY = "mathlingo:interview-problems:show-tags";

interface Row {
  q: InterviewQuestion;
  number: number;
  title: string;
  rate: number | null;
  band: DifficultyBand;
  status: ProblemStatus | undefined;
  locked: boolean;
  techniques: string[];
  /** Lower-cased text the search box matches. */
  haystack: string;
}

/** `104 · Bases`: the number tells apart subtopics that share a name. */
function sectionLabelShort(id: string): string {
  const s = sectionById.get(id);
  return s ? `${s.number} · ${s.subtopic}` : id;
}

const csv = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

function ProblemList() {
  const { full } = useInterviewAccess();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const [stats, setStats] = useState<Map<string, QuestionStats> | null>(null);
  const [statuses, setStatuses] = useState<Map<string, ProblemStatus>>(new Map());
  const [showTags, setShowTags] = useState(() => {
    try {
      return localStorage.getItem(SHOW_TAGS_KEY) === "1";
    } catch {
      return false;
    }
  });

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
    void loadMyStatuses(user.id).then((m) => !cancelled && setStatuses(m));
    return () => {
      cancelled = true;
    };
  }, [user]);

  const search = params.get("search") ?? "";
  const topicsParam = params.get("topics");
  const scenariosParam = params.get("scenarios");
  const topics = useMemo(() => csv(topicsParam), [topicsParam]);
  const scenarios = useMemo(() => csv(scenariosParam), [scenariosParam]);
  const difficulty = (params.get("difficulty") ?? "") as DifficultyBand | "";
  const status = (params.get("status") ?? "") as StatusFilter | "";
  const sort = (params.get("sort") ?? "") as Sort;

  function update(changes: Record<string, string | string[] | null>) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        // Any change of filters starts again from the first page.
        if (!("page" in changes)) next.delete("page");
        for (const [k, v] of Object.entries(changes)) {
          const value = Array.isArray(v) ? v.join(",") : v;
          if (value) next.set(k, value);
          else next.delete(k);
        }
        return next;
      },
      { replace: true },
    );
  }

  const rows = useMemo<Row[]>(() => {
    return liveQuestions.map((q) => {
      const rate = solveRate(stats?.get(q.id));
      const techniques = techniquesOf(q);
      return {
        q,
        number: problemNumber(q),
        title: problemTitle(q),
        rate,
        band: difficultyBand(q, rate),
        status: statuses.get(q.id),
        locked: !full && !isFreeQuestion(q),
        techniques,
        haystack: `${problemNumber(q)} ${q.question}`.toLowerCase(),
      };
    });
  }, [stats, statuses, full]);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    const topicSet = new Set(topics);
    const scenarioSet = new Set(scenarios);
    const out = rows.filter(
      (r) =>
        (!needle || r.haystack.includes(needle)) &&
        (topicSet.size === 0 || r.techniques.some((t) => topicSet.has(t))) &&
        (scenarioSet.size === 0 || (r.q.family !== null && scenarioSet.has(r.q.family))) &&
        (!difficulty || r.band === difficulty) &&
        (!status || (status === "todo" ? !r.status : r.status === status)),
    );
    if (sort) {
      // By band; within one, answered questions by solve rate, then the rest by rated difficulty.
      // The sort is stable, so ties keep list order.
      const dir = sort === "easy" ? 1 : -1;
      out.sort((a, b) => {
        if (a.band !== b.band) return dir * (BAND_RANK[a.band] - BAND_RANK[b.band]);
        if (a.rate !== null && b.rate !== null) return dir * (b.rate - a.rate);
        if (a.rate !== null || b.rate !== null) return a.rate === null ? 1 : -1;
        return dir * (difficultyOf(a.q) - difficultyOf(b.q));
      });
    }
    return out;
  }, [rows, search, topics, scenarios, difficulty, status, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE));
  const page = Math.min(pageCount, Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1));
  const pageRows = filtered.slice((page - 1) * PAGE, page * PAGE);
  const listTop = useRef<HTMLDivElement>(null);
  function goToPage(p: number) {
    update({ page: p > 1 ? String(p) : null });
    listTop.current?.scrollIntoView({ block: "start" });
  }

  const topicOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of rows) for (const t of r.techniques) counts.set(t, (counts.get(t) ?? 0) + 1);
    return sectionsByTopic().map(({ topic, sections }) => ({
      group: topic,
      options: sections.map((s) => ({ id: s.id, label: `${s.number} · ${s.subtopic}`, count: counts.get(s.id) ?? 0 })),
    }));
  }, [rows]);

  const scenarioOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of rows) if (r.q.family) counts.set(r.q.family, (counts.get(r.q.family) ?? 0) + 1);
    return [
      {
        group: "",
        options: [...counts]
          .map(([id, count]) => ({ id, label: familyById.get(id)?.name ?? id, count }))
          .sort((a, b) => a.label.localeCompare(b.label)),
      },
    ];
  }, [rows]);

  const solved = rows.filter((r) => r.status === "solved");
  const anyFilter = Boolean(search || topics.length || scenarios.length || difficulty || status || sort);
  const listIds = filtered.map((r) => r.q.id);

  function pickOne() {
    const pool = filtered.filter((r) => !r.locked && r.status !== "solved");
    const from = pool.length ? pool : filtered.filter((r) => !r.locked);
    if (from.length === 0) return;
    const r = from[Math.floor(Math.random() * from.length)];
    navigate(`/interview/problems/${encodeURIComponent(r.q.id)}`, { state: { ids: listIds, from: `?${params}` } });
  }

  return (
    <div className="font-body">
      <Link to="/interview" className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">
        ← Interview Prep
      </Link>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-[var(--ink)]">Problems</h1>
          <p className="mt-1 max-w-2xl text-sm text-[var(--ink-soft)]">
            The whole bank, classics first. Difficulty comes from the share of students who get a question right on
            their first try.
            {!full && ` The first ${FREE_PROBLEMS} are free.`}
          </p>
        </div>
        <ProgressSummary solved={solved} total={rows.length} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[12rem] flex-1">
          <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ink-soft)]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 4 4" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => update({ search: e.target.value || null })}
            placeholder="Search questions"
            className="w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] py-2 pl-9 pr-3 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>
        <MultiSelect label="Concepts" selected={topics} groups={topicOptions} onChange={(v) => update({ topics: v })} />
        <MultiSelect label="Scenario" selected={scenarios} groups={scenarioOptions} onChange={(v) => update({ scenarios: v })} />
        <SingleSelect
          label="Difficulty"
          value={difficulty}
          options={DIFFICULTY_BANDS.map((b) => ({ id: b.id, label: b.label, hint: b.hint }))}
          onChange={(v) => update({ difficulty: v || null })}
        />
        {user && (
          <SingleSelect label="Status" value={status} options={STATUS_FILTERS} onChange={(v) => update({ status: v || null })} />
        )}
        <SingleSelect
          label="Sort"
          value={sort}
          options={[
            { id: "easy", label: "Difficulty: easiest first" },
            { id: "hard", label: "Difficulty: hardest first" },
          ]}
          onChange={(v) => update({ sort: v || null })}
        />
        <button
          type="button"
          onClick={pickOne}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
          title="Open a random unsolved question from this list"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M3 6h3l8 8h3M3 14h3l2-2m4-4 2-2h3m-2-2 2 2-2 2m0 4 2 2-2 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Pick one
        </button>
      </div>

      <ActiveFilters
        chips={[
          ...topics.map((id) => ({ key: `t:${id}`, label: sectionLabelShort(id), remove: () => update({ topics: topics.filter((t) => t !== id) }) })),
          ...scenarios.map((id) => ({ key: `s:${id}`, label: familyById.get(id)?.name ?? id, remove: () => update({ scenarios: scenarios.filter((s) => s !== id) }) })),
          ...(difficulty ? [{ key: "d", label: DIFFICULTY_BANDS.find((b) => b.id === difficulty)?.label ?? difficulty, remove: () => update({ difficulty: null }) }] : []),
          ...(status ? [{ key: "st", label: STATUS_FILTERS.find((s) => s.id === status)?.label ?? status, remove: () => update({ status: null }) }] : []),
        ]}
        onReset={anyFilter ? () => setParams(new URLSearchParams(), { replace: true }) : undefined}
      />

      <div className="mt-3 flex items-center justify-between text-xs text-[var(--ink-soft)]">
        <span>
          {pageCount > 1 && `${((page - 1) * PAGE + 1).toLocaleString()}–${((page - 1) * PAGE + pageRows.length).toLocaleString()} of `}
          {filtered.length.toLocaleString()} question{filtered.length === 1 ? "" : "s"}
          {stats === null && " · loading difficulty…"}
        </span>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={showTags}
            onChange={(e) => {
              setShowTags(e.target.checked);
              try {
                localStorage.setItem(SHOW_TAGS_KEY, e.target.checked ? "1" : "0");
              } catch {
                // Blocked storage: the toggle just won't be remembered.
              }
            }}
          />
          Show concept tags
        </label>
      </div>

      <div ref={listTop} className="mt-2 scroll-mt-4 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel)]">
        <div role="row" className={`${ROW_GRID} border-b border-[var(--line)] text-xs font-semibold text-[var(--ink-soft)]`}>
          <span role="columnheader" aria-label="Number" />
          <span role="columnheader" aria-label="Status">
            <span className="hidden sm:inline">Status</span>
          </span>
          <span role="columnheader">Title</span>
          <span role="columnheader" className="hidden sm:block">
            Scenario
          </span>
          <span
            role="columnheader"
            className="text-right"
            title={`Share of students right on their first try. Shown once ${MIN_STUDENTS} students have answered.`}
          >
            <span className="sm:hidden">Acc.</span>
            <span className="hidden sm:inline">Acceptance</span>
          </span>
          <button
            type="button"
            role="columnheader"
            onClick={() => update({ sort: sort === "" ? "easy" : sort === "easy" ? "hard" : null })}
            className="flex items-center justify-end gap-1 text-right hover:text-[var(--ink)]"
            title="Sort by difficulty"
          >
            Difficulty
            <SortArrows sort={sort} />
          </button>
        </div>

        {filtered.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-[var(--ink-soft)]">No questions match these filters.</p>
        ) : (
          <ul>
            {pageRows.map((r, i) => (
              <li key={r.q.id}>
                <Link
                  to={`/interview/problems/${encodeURIComponent(r.q.id)}`}
                  state={{ ids: listIds, from: `?${params}` }}
                  className={`${ROW_GRID} text-sm hover:bg-[var(--accent-soft)] ${i % 2 === 1 ? "bg-[var(--paper)]" : ""}`}
                >
                  <span className="text-right tabular-nums text-[var(--ink-soft)]">{r.number}</span>
                  <span className="flex justify-center">
                    <StatusIcon status={r.status} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate text-[var(--ink)]">{r.title}</span>
                      {r.locked && <LockIcon />}
                    </span>
                    {showTags && r.techniques.length > 0 && (
                      <span className="mt-1 flex flex-wrap gap-1">
                        {r.techniques.map((t) => (
                          <span key={t} className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] text-[var(--accent)]">
                            {sectionLabelShort(t)}
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                  <span className="hidden truncate text-xs text-[var(--ink-soft)] sm:block">
                    {r.q.family ? (familyById.get(r.q.family)?.name ?? r.q.family) : "—"}
                  </span>
                  <AcceptanceCell rate={r.rate} stats={stats?.get(r.q.id)} />
                  <span className="text-right">
                    <DifficultyTag question={r.q} stats={stats?.get(r.q.id)} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {pageCount > 1 && <Pagination page={page} pageCount={pageCount} onPage={goToPage} />}
    </div>
  );
}

/** Row layout shared by the header and every row: number, status, title, scenario (sm+), acceptance, difficulty. */
const ROW_GRID =
  "grid grid-cols-[2rem_1.25rem_minmax(0,1fr)_3.25rem_3.75rem] items-center gap-2 px-3 py-2.5 sm:grid-cols-[2.5rem_2.5rem_minmax(0,1fr)_11rem_6rem_5rem] sm:gap-3 sm:px-4";

/** First-try success rate, or a dash until enough students have answered for it to mean anything. */
function AcceptanceCell({ rate, stats }: { rate: number | null; stats: QuestionStats | undefined }) {
  const students = stats?.students ?? 0;
  return (
    <span
      className="text-right text-sm tabular-nums text-[var(--ink-soft)]"
      title={
        rate === null
          ? `${students} of the ${MIN_STUDENTS} students needed have answered`
          : `${stats!.solved.toLocaleString()} of ${students.toLocaleString()} students right on their first try`
      }
    >
      {rate === null ? "—" : `${(rate * 100).toFixed(1)}%`}
    </span>
  );
}

/** Page numbers either side of the current one before the run is cut with "…". */
const PAGE_WINDOW = 2;

/** The page numbers to show: first, last, and a window around the current page, with gaps as null. */
function pageItems(page: number, pageCount: number): (number | null)[] {
  const shown = new Set([1, pageCount]);
  for (let p = page - PAGE_WINDOW; p <= page + PAGE_WINDOW; p++) if (p >= 1 && p <= pageCount) shown.add(p);
  const sorted = [...shown].sort((a, b) => a - b);
  const out: (number | null)[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push(p - sorted[i - 1] === 2 ? p - 1 : null);
    out.push(p);
  });
  return out;
}

/** Google-style pager: Previous, page numbers with gaps, Next, and a box to jump to any page once some are hidden. */
function Pagination({ page, pageCount, onPage }: { page: number; pageCount: number; onPage: (p: number) => void }) {
  const [jump, setJump] = useState("");
  const items = pageItems(page, pageCount);
  const hidden = items.length < pageCount;
  const step = "rounded-lg px-3 py-1.5 text-sm text-[var(--accent)] hover:bg-[var(--accent-soft)] disabled:pointer-events-none disabled:opacity-0";

  function submitJump() {
    const p = Number.parseInt(jump, 10);
    if (!Number.isFinite(p)) return;
    onPage(Math.min(pageCount, Math.max(1, p)));
    setJump("");
  }

  return (
    <nav aria-label="Pages" className="mt-6 flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-1">
        <button type="button" className={step} disabled={page === 1} onClick={() => onPage(page - 1)}>
          ‹ Previous
        </button>
        {items.map((p, i) =>
          p === null ? (
            <span key={`gap-${i}`} className="px-1 text-sm text-[var(--ink-soft)]" aria-hidden>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPage(p)}
              aria-current={p === page ? "page" : undefined}
              className={`min-w-[2.25rem] rounded-lg px-2 py-1.5 text-sm tabular-nums ${
                p === page ? "bg-[var(--accent)] font-semibold text-white" : "text-[var(--ink)] hover:bg-[var(--accent-soft)]"
              }`}
            >
              {p}
            </button>
          ),
        )}
        <button type="button" className={step} disabled={page === pageCount} onClick={() => onPage(page + 1)}>
          Next ›
        </button>
      </div>
      {hidden && (
        <form
          className="flex items-center gap-2 text-sm text-[var(--ink-soft)]"
          onSubmit={(e) => {
            e.preventDefault();
            submitJump();
          }}
        >
          <label htmlFor="jump-to-page">Go to page</label>
          <input
            id="jump-to-page"
            type="number"
            inputMode="numeric"
            min={1}
            max={pageCount}
            value={jump}
            onChange={(e) => setJump(e.target.value)}
            placeholder={String(page)}
            className="w-20 rounded-lg border border-[var(--line)] bg-[var(--panel)] px-2 py-1 text-center text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
          />
          <span>of {pageCount}</span>
          <button type="submit" className="rounded-lg border border-[var(--line)] px-3 py-1 text-[var(--ink)] hover:border-[var(--accent)]">
            Go
          </button>
        </form>
      )}
    </nav>
  );
}

function ProgressSummary({ solved, total }: { solved: Row[]; total: number }) {
  const by = (band: DifficultyBand) => solved.filter((r) => r.band === band).length;
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 text-sm">
      <span>
        <span className="font-semibold text-[var(--ink)]">{solved.length}</span>
        <span className="text-[var(--ink-soft)]"> / {total.toLocaleString()} solved</span>
      </span>
      <span className="flex gap-3 text-xs">
        <span className="text-[var(--teal)]">Easy {by("easy")}</span>
        <span className="text-amber-600">Med. {by("medium")}</span>
        <span className="text-red-600">Hard {by("hard")}</span>
      </span>
    </div>
  );
}

function SortArrows({ sort }: { sort: Sort }) {
  return (
    <svg viewBox="0 0 10 14" className="h-3 w-2.5" aria-hidden>
      <path d="M5 1 9 5H1z" fill="currentColor" opacity={sort === "easy" ? 1 : 0.3} />
      <path d="M5 13 1 9h8z" fill="currentColor" opacity={sort === "hard" ? 1 : 0.3} />
    </svg>
  );
}

function ActiveFilters({ chips, onReset }: { chips: { key: string; label: string; remove: () => void }[]; onReset?: () => void }) {
  if (chips.length === 0 && !onReset) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={c.remove}
          className="flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs text-[var(--accent)] hover:opacity-80"
        >
          {c.label}
          <span aria-label="Remove">×</span>
        </button>
      ))}
      {onReset && (
        <button type="button" onClick={onReset} className="text-xs text-[var(--ink-soft)] underline hover:text-[var(--ink)]">
          Reset
        </button>
      )}
    </div>
  );
}

/** A filter button that opens a panel; closes on outside click or Escape. */
function Dropdown({ label, active, children, wide = false }: { label: string; active: boolean; children: (close: () => void) => ReactNode; wide?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm ${
          active ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--line)] text-[var(--ink)]"
        } bg-[var(--panel)] hover:border-[var(--accent)]`}
      >
        {label}
        <svg viewBox="0 0 10 6" className="h-2 w-2.5" fill="currentColor" aria-hidden>
          <path d="M0 0h10L5 6z" />
        </svg>
      </button>
      {open && (
        <div
          className={`absolute left-0 z-30 mt-1 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-2 shadow-lg ${
            wide ? "w-[min(34rem,calc(100vw-2rem))]" : "w-60"
          }`}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

function SingleSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | "";
  options: { id: T; label: string; hint?: string }[];
  onChange: (v: T | "") => void;
}) {
  const current = options.find((o) => o.id === value);
  return (
    <Dropdown label={current ? current.label : label} active={Boolean(current)}>
      {(close) => (
        <ul>
          {options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.id === value ? "" : o.id);
                  close();
                }}
                className="flex w-full items-start justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-[var(--paper)]"
              >
                <span>
                  <span className={o.id === value ? "font-semibold text-[var(--accent)]" : "text-[var(--ink)]"}>{o.label}</span>
                  {o.hint && <span className="block text-xs text-[var(--ink-soft)]">{o.hint}</span>}
                </span>
                {o.id === value && <span className="text-[var(--accent)]">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Dropdown>
  );
}

interface OptionGroup {
  group: string;
  options: { id: string; label: string; count: number }[];
}

/** Tag-style multi-select with its own search box, like LeetCode's Topics filter. Matches any selected option. */
function MultiSelect({ label, selected, groups, onChange }: { label: string; selected: string[]; groups: OptionGroup[]; onChange: (v: string[]) => void }) {
  const [query, setQuery] = useState("");
  const chosen = new Set(selected);
  const needle = query.trim().toLowerCase();
  const visible = groups
    .map((g) => ({ ...g, options: g.options.filter((o) => !needle || o.label.toLowerCase().includes(needle) || g.group.toLowerCase().includes(needle)) }))
    .filter((g) => g.options.length > 0);
  const toggle = (id: string) => onChange(chosen.has(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  return (
    <Dropdown label={selected.length ? `${label} · ${selected.length}` : label} active={selected.length > 0} wide>
      {() => (
        <div>
          <div className="flex items-center gap-2 p-1">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Filter ${label.toLowerCase()}`}
              className="min-w-0 flex-1 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
            />
            {selected.length > 0 && (
              <button type="button" onClick={() => onChange([])} className="text-xs text-[var(--ink-soft)] underline hover:text-[var(--ink)]">
                Clear
              </button>
            )}
          </div>
          <div className="mt-1 max-h-80 overflow-y-auto p-1">
            {visible.length === 0 && <p className="px-2 py-4 text-center text-sm text-[var(--ink-soft)]">Nothing matches.</p>}
            {visible.map((g) => (
              <div key={g.group} className="mb-2">
                {g.group && <p className="mb-1 px-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--ink-soft)]">{g.group}</p>}
                <div className="flex flex-wrap gap-1.5">
                  {g.options.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => toggle(o.id)}
                      aria-pressed={chosen.has(o.id)}
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        chosen.has(o.id)
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--accent-soft)]"
                      }`}
                    >
                      {o.label}
                      <span className={`ml-1 ${chosen.has(o.id) ? "text-white/80" : "text-[var(--ink-soft)]"}`}>{o.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Dropdown>
  );
}
