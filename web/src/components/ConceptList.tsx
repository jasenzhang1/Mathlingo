import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Concept } from "../data/concepts";
import { useAuth } from "../lib/auth/useAuth";
import { chapters } from "../lib/learningOrder";
import { MAX_PROFICIENCY, proficiencyRatio } from "../lib/proficiencyFill";
import { useProficiency } from "../lib/useProficiency";

/**
 * The concept map's other reading: the same concepts as a table of contents,
 * in the order you'd work through them, with where you're up to on the right
 * of every line.
 *
 * The map answers "what does this depend on"; a list answers "what do I do
 * next", which is the question a graph of 280 nodes is bad at.
 */

/** Proficiency as a bar. Sized in the caller, because rows and chapter headers
 *  carry the same meter at different widths. */
function ProgressMeter({
  value,
  color,
  label,
  className = "w-16 sm:w-24",
}: {
  value: number;
  color: string;
  label: string;
  className?: string;
}) {
  const rounded = Math.round(value);

  return (
    <div className="flex shrink-0 items-center gap-2">
      <div
        role="progressbar"
        aria-valuenow={rounded}
        aria-valuemin={0}
        aria-valuemax={MAX_PROFICIENCY}
        aria-label={label}
        className={`h-1.5 overflow-hidden rounded-full bg-[var(--line)] ${className}`}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{
            width: `${proficiencyRatio(value) * 100}%`,
            background: color,
          }}
        />
      </div>
      <span className="font-body w-6 text-right text-xs tabular-nums text-[var(--ink-soft)]">
        {rounded}
      </span>
    </div>
  );
}

function LessonDot() {
  return (
    <span
      title="Lesson available"
      aria-label="Lesson available"
      role="img"
      className="inline-block h-2 w-2 shrink-0 rounded-full border-[1.5px] align-middle"
      style={{ borderColor: "var(--accent)" }}
    />
  );
}

function ConceptRow({
  concept,
  number,
  color,
  value,
}: {
  concept: Concept;
  number: string;
  color: string;
  value: number;
}) {
  return (
    <li>
      <Link
        to={`/concepts/${concept.id}`}
        className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-[var(--accent-soft)] sm:px-3"
      >
        <span className="font-body w-9 shrink-0 text-xs tabular-nums text-[var(--ink-soft)]">
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="font-body truncate text-sm font-medium text-[var(--ink)]">
              {concept.title}
            </span>
            {concept.embedUrl && <LessonDot />}
          </span>
          <span className="font-body hidden truncate text-xs text-[var(--ink-soft)] sm:block">
            {concept.blurb}
          </span>
        </span>
        <ProgressMeter
          value={value}
          color={color}
          label={`${concept.title} proficiency`}
        />
      </Link>
    </li>
  );
}

export function ConceptList() {
  const { user } = useAuth();
  const { proficiency } = useProficiency();
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      chapters
        .map((chapter, index) => ({
          ...chapter,
          number: index + 1,
          // Numbering stays absolute: filtering the list shouldn't renumber
          // 4.17 into 4.2 and make two searches disagree about what a concept
          // is called.
          rows: chapter.concepts
            .map((concept, i) => ({ concept, position: i + 1 }))
            .filter(
              ({ concept }) =>
                !trimmedQuery ||
                concept.title.toLowerCase().includes(trimmedQuery) ||
                concept.blurb.toLowerCase().includes(trimmedQuery),
            ),
        }))
        .filter((chapter) => chapter.rows.length > 0),
    [trimmedQuery],
  );

  const matchCount = visible.reduce((n, chapter) => n + chapter.rows.length, 0);

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search concepts…"
          className="font-body w-full min-w-0 max-w-xs rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <span className="font-body text-xs text-[var(--ink-soft)]">
          {trimmedQuery
            ? `${matchCount} matching ${matchCount === 1 ? "concept" : "concepts"}`
            : `${matchCount} concepts in ${chapters.length} chapters`}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-sm">
        {visible.length === 0 ? (
          <p className="font-body p-6 text-sm text-[var(--ink-soft)]">
            No concept matches “{query.trim()}”.
          </p>
        ) : (
          visible.map((chapter) => {
            const total = chapter.concepts.reduce(
              (sum, c) => sum + (proficiency.get(c.id) ?? 0),
              0,
            );

            return (
              <section key={chapter.domain}>
                <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 sm:px-4">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: chapter.color }}
                      aria-hidden="true"
                    />
                    <h2 className="font-display truncate text-sm text-[var(--ink)]">
                      <span className="text-[var(--ink-soft)]">
                        {chapter.number}.
                      </span>{" "}
                      {chapter.label}
                    </h2>
                    <span className="font-body hidden shrink-0 text-xs text-[var(--ink-soft)] sm:inline">
                      {chapter.concepts.length} concepts
                    </span>
                  </div>
                  <ProgressMeter
                    value={total / chapter.concepts.length}
                    color={chapter.color}
                    label={`${chapter.label} average proficiency`}
                  />
                </header>

                <ul className="p-1 sm:p-2">
                  {chapter.rows.map(({ concept, position }) => (
                    <ConceptRow
                      key={concept.id}
                      concept={concept}
                      number={`${chapter.number}.${position}`}
                      color={chapter.color}
                      value={proficiency.get(concept.id) ?? 0}
                    />
                  ))}
                </ul>
              </section>
            );
          })
        )}
      </div>

      <div className="font-body mt-3 flex shrink-0 flex-wrap gap-x-5 gap-y-1 pb-1 text-xs text-[var(--ink-soft)]">
        <span className="flex items-center gap-1.5">
          <LessonDot />
          Lesson available
        </span>
        <span>
          Ordered by what you need first, so a chapter reads top to bottom
        </span>
        {!user && <span>Sign in to see your own progress on each concept.</span>}
      </div>
    </div>
  );
}
