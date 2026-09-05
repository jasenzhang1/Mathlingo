import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Concept } from "../data/concepts";
import { DAY_MS } from "../lib/assessment/numeric";
import { useAuth } from "../lib/auth/useAuth";
import { chapters } from "../lib/learningOrder";
import { MAX_PROFICIENCY, proficiencyRatio } from "../lib/proficiencyFill";
import { useProficiency } from "../lib/useProficiency";
import { ReviewSession } from "./assessment/ReviewSession";

/**
 * The concept map's other reading: the same concepts as a table of contents,
 * in the order you'd work through them, with where you're up to on the right
 * of every line.
 *
 * The map answers "what does this depend on"; a list answers "what do I do
 * next", which is the question a graph of 280 nodes is bad at.
 *
 * It reads as folders, two deep: a chapter is a subject, a folder inside it is
 * roughly a textbook chapter (Random Variables, The Four Fundamental
 * Subspaces), and opening one shows its concepts. 278 lines of flat list is a
 * scroll; 7 folders you open the one you want is a contents page. Chapters open
 * by default and sections closed, so the first thing on screen is every subject
 * and what it covers.
 *
 * Each subject is its own card, laid out in CSS columns rather than a grid —
 * a restaurant menu, not a spreadsheet: cards fill the left column top to
 * bottom before spilling into the right one, and a card never splits across
 * the break. One column under the width a two-up menu would feel cramped.
 */

const STORAGE_KEY = "mathlingo:concept-list-open";

const domainKey = (domain: string) => `d:${domain}`;
const sectionKey = (domain: string, sectionId: string) =>
  `s:${domain}/${sectionId}`;

/** Chapters open, sections closed — the contents-page reading. */
const defaultOpen = () => new Set(chapters.map((c) => domainKey(c.domain)));

function loadOpen(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultOpen();
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return defaultOpen();
    return new Set(parsed.filter((k): k is string => typeof k === "string"));
  } catch {
    // Private mode, blocked storage, corrupted value — the list still works.
    return defaultOpen();
  }
}

/** Proficiency as a bar. Sized in the caller, because rows, section headers and
 *  chapter headers carry the same meter at different widths. */
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

/**
 * Days until the soonest-expiring reviewed topic in a subject starts sliding
 * down its forgetting curve — a nudge to brush up before it does, surfaced per
 * subject rather than per concept so it reads at a glance from the panel
 * header instead of requiring a hunt through every row's bar.
 */
function ExpiryNotice({ dueAt }: { dueAt: number | null }) {
  if (dueAt === null) return null;

  const days = Math.ceil((dueAt - Date.now()) / DAY_MS);

  if (days <= 0) {
    return (
      <span className="font-body font-medium text-[var(--accent)]">
        A topic is due for review now
      </span>
    );
  }

  return (
    <span className="font-body text-[var(--ink-soft)]">
      Soonest topic starts fading in {days} {days === 1 ? "day" : "days"}
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`h-3 w-3 shrink-0 text-[var(--ink-soft)] transition-transform duration-150 ${
        open ? "rotate-90" : ""
      }`}
      aria-hidden="true"
    >
      <path
        d="M4 2 L8.5 6 L4 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A folder in the chapter's colour: shut when the node is collapsed, tipped
 *  open when it isn't, which is the one glance that says "there is more here". */
function Folder({ open, color }: { open: boolean; color: string }) {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
      {open ? (
        <>
          <path
            d="M1.5 12.5V4a1 1 0 0 1 1-1h3.2l1.3 1.5h5.5a1 1 0 0 1 1 1v1.5"
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path
            d="M1.5 12.5 3.7 6.8h11.3l-2.2 5.7Z"
            fill={color}
            fillOpacity="0.18"
            stroke={color}
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <path
          d="M1.5 12.5V4a1 1 0 0 1 1-1h3.2l1.3 1.5h5.5a1 1 0 0 1 1 1v7Z"
          fill={color}
          fillOpacity="0.18"
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

/** Left and right open and close the folder, the way they do in a file tree. */
function folderKeys(open: boolean, setOpen: (next: boolean) => void) {
  return (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" && !open) {
      event.preventDefault();
      setOpen(true);
    } else if (event.key === "ArrowLeft" && open) {
      event.preventDefault();
      setOpen(false);
    }
  };
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
        <span className="font-body w-8 shrink-0 text-xs tabular-nums text-[var(--ink-soft)] sm:w-12">
          {number}
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5">
          <span className="font-body truncate text-sm font-medium text-[var(--ink)]">
            {concept.title}
          </span>
          {concept.embedUrl && <LessonDot />}
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

interface SubjectSession {
  subjectLabel: string;
  color: string;
  conceptIds: string[];
  startMode: "review" | "drill";
}

export function ConceptList() {
  const { user } = useAuth();
  const { proficiency, dueAt, bleeding, refresh } = useProficiency();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Set<string>>(loadOpen);
  const [session, setSession] = useState<SubjectSession | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...open]));
    } catch {
      // Not being able to remember which folders were open is not worth failing
      // the render over.
    }
  }, [open]);

  const trimmedQuery = query.trim().toLowerCase();
  // A search that only matched inside closed folders would look like no
  // matches, so while one is running every folder holding a match is open.
  const searching = trimmedQuery.length > 0;

  const visible = useMemo(
    () =>
      chapters
        .map((chapter, index) => ({
          ...chapter,
          number: index + 1,
          // Numbering stays absolute: filtering the list shouldn't renumber
          // 4.2.17 into 4.2.2 and make two searches disagree about what a
          // concept is called.
          sectionRows: chapter.sections
            .map((section, sectionIndex) => ({
              ...section,
              number: sectionIndex + 1,
              rows: section.concepts
                .map((concept, i) => ({ concept, position: i + 1 }))
                .filter(
                  ({ concept }) =>
                    !trimmedQuery ||
                    concept.title.toLowerCase().includes(trimmedQuery) ||
                    concept.blurb.toLowerCase().includes(trimmedQuery),
                ),
            }))
            .filter((section) => section.rows.length > 0),
        }))
        .filter((chapter) => chapter.sectionRows.length > 0),
    [trimmedQuery],
  );

  const matchCount = visible.reduce(
    (n, chapter) =>
      n +
      chapter.sectionRows.reduce((m, section) => m + section.rows.length, 0),
    0,
  );
  const sectionCount = chapters.reduce((n, c) => n + c.sections.length, 0);

  const allKeys = useMemo(
    () =>
      chapters.flatMap((chapter) => [
        domainKey(chapter.domain),
        ...chapter.sections.map((s) => sectionKey(chapter.domain, s.id)),
      ]),
    [],
  );

  const isOpen = (key: string) => searching || open.has(key);
  const anyOpen = open.size > 0;

  function setNode(key: string, next: boolean) {
    setOpen((prev) => {
      const updated = new Set(prev);
      if (next) {
        updated.add(key);
      } else {
        updated.delete(key);
      }
      return updated;
    });
  }

  const toggleNode = (key: string) => setNode(key, !open.has(key));

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="mb-3 flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search concepts…"
          className="font-body w-full min-w-0 rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] sm:max-w-xs"
        />
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setOpen(anyOpen ? new Set() : new Set(allKeys))}
            disabled={searching}
            className="font-body shrink-0 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] disabled:opacity-40"
          >
            {anyOpen ? "Collapse all" : "Expand all"}
          </button>
          <span className="font-body text-right text-xs text-[var(--ink-soft)]">
            {searching
              ? `${matchCount} matching ${matchCount === 1 ? "concept" : "concepts"}`
              : `${matchCount} concepts · ${sectionCount} sections · ${chapters.length} chapters`}
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {visible.length === 0 ? (
          <p className="font-body rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 text-sm text-[var(--ink-soft)] shadow-sm">
            No concept matches “{query.trim()}”.
          </p>
        ) : (
          <div className="columns-1 gap-4 lg:columns-2">
            {visible.map((chapter) => {
              const key = domainKey(chapter.domain);
              const chapterOpen = isOpen(key);
              const total = chapter.concepts.reduce(
                (sum, c) => sum + (proficiency.get(c.id) ?? 0),
                0,
              );
              const chapterDueAt = chapter.concepts.reduce<number | null>(
                (soonest, c) => {
                  const d = dueAt.get(c.id);
                  if (d === undefined) return soonest;
                  return soonest === null ? d : Math.min(soonest, d);
                },
                null,
              );
              const bleedingIds = chapter.concepts
                .filter((c) => bleeding.has(c.id))
                .map((c) => c.id);

              return (
                <section
                  key={chapter.domain}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-sm"
                >
                  <header className="border-b border-[var(--line)] px-3 py-2.5 sm:px-4">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => toggleNode(key)}
                        onKeyDown={folderKeys(chapterOpen, (next) =>
                          setNode(key, next),
                        )}
                        aria-expanded={chapterOpen}
                        aria-controls={`chapter-${chapter.domain}`}
                        className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                      >
                        <Chevron open={chapterOpen} />
                        <Folder open={chapterOpen} color={chapter.color} />
                        <h2 className="font-display truncate text-sm text-[var(--ink)]">
                          <span className="text-[var(--ink-soft)]">
                            {chapter.number}.
                          </span>{" "}
                          {chapter.label}
                        </h2>
                        <span className="font-body hidden shrink-0 text-xs text-[var(--ink-soft)] sm:inline">
                          {chapter.sections.length} sections ·{" "}
                          {chapter.concepts.length} concepts
                        </span>
                      </button>
                      <ProgressMeter
                        value={total / chapter.concepts.length}
                        color={chapter.color}
                        label={`${chapter.label} average proficiency`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSession({
                            subjectLabel: chapter.label,
                            color: chapter.color,
                            conceptIds:
                              bleedingIds.length > 0
                                ? bleedingIds
                                : chapter.concepts.map((c) => c.id),
                            startMode:
                              bleedingIds.length > 0 ? "review" : "drill",
                          })
                        }
                        className="font-body shrink-0 rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                      >
                        {bleedingIds.length > 0 ? "Review" : "Drill"}
                      </button>
                    </div>
                    {chapterDueAt !== null && (
                      <p className="font-body mt-1.5 pl-[26px] text-xs">
                        <ExpiryNotice dueAt={chapterDueAt} />
                      </p>
                    )}
                  </header>

                  {chapterOpen && (
                    <div
                      id={`chapter-${chapter.domain}`}
                      className="p-1 sm:p-2"
                    >
                      {chapter.sectionRows.map((section) => {
                        const sKey = sectionKey(chapter.domain, section.id);
                        const sectionOpen = isOpen(sKey);
                        const sectionTotal = section.concepts.reduce(
                          (sum, c) => sum + (proficiency.get(c.id) ?? 0),
                          0,
                        );

                        return (
                          <div key={section.id}>
                            <div className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-[var(--paper)] sm:px-3">
                              <button
                                type="button"
                                onClick={() => toggleNode(sKey)}
                                onKeyDown={folderKeys(sectionOpen, (next) =>
                                  setNode(sKey, next),
                                )}
                                aria-expanded={sectionOpen}
                                aria-controls={`section-${chapter.domain}-${section.id}`}
                                className="flex min-w-0 flex-1 items-center gap-2 pl-3 text-left"
                              >
                                <Chevron open={sectionOpen} />
                                <Folder
                                  open={sectionOpen}
                                  color={chapter.color}
                                />
                                <span className="font-body truncate text-sm font-medium text-[var(--ink)]">
                                  <span className="tabular-nums text-[var(--ink-soft)]">
                                    {chapter.number}.{section.number}
                                  </span>{" "}
                                  {section.label}
                                </span>
                                <span className="font-body shrink-0 text-xs tabular-nums text-[var(--ink-soft)]">
                                  {searching
                                    ? `${section.rows.length}/${section.concepts.length}`
                                    : section.concepts.length}
                                </span>
                              </button>
                              <ProgressMeter
                                value={sectionTotal / section.concepts.length}
                                color={chapter.color}
                                label={`${section.label} average proficiency`}
                                className="w-10 sm:w-16"
                              />
                            </div>

                            {sectionOpen && (
                              <ul
                                id={`section-${chapter.domain}-${section.id}`}
                                className="ml-[26px] border-l border-[var(--line)] pl-1"
                              >
                                {section.rows.map(({ concept, position }) => (
                                  <ConceptRow
                                    key={concept.id}
                                    concept={concept}
                                    number={`${chapter.number}.${section.number}.${position}`}
                                    color={chapter.color}
                                    value={proficiency.get(concept.id) ?? 0}
                                  />
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>

      <div className="font-body mt-3 flex shrink-0 flex-wrap gap-x-5 gap-y-1 pb-1 text-xs text-[var(--ink-soft)]">
        <span className="flex items-center gap-1.5">
          <LessonDot />
          Lesson available
        </span>
        <span>
          Sections follow the chapters of the books each subject is taught from
        </span>
        {!user && (
          <span>Sign in to see your own progress on each concept.</span>
        )}
      </div>

      {session && (
        <ReviewSession
          subjectLabel={session.subjectLabel}
          color={session.color}
          conceptIds={session.conceptIds}
          startMode={session.startMode}
          onExit={() => {
            setSession(null);
            refresh();
          }}
        />
      )}
    </div>
  );
}
