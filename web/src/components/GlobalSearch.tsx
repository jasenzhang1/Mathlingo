import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { concepts, domainMeta } from "../data/concepts";
import { chapters } from "../lib/learningOrder";
import { searchProfiles } from "../lib/profiles";

type ResultKind = "subject" | "subtopic" | "lesson" | "user";

interface SearchResult {
  kind: ResultKind;
  key: string;
  title: string;
  subtitle?: string;
  href: string;
}

const KIND_LABEL: Record<ResultKind, string> = {
  subject: "Subject",
  subtopic: "Subtopic",
  lesson: "Lesson",
  user: "User",
};

/**
 * Subjects, subtopics, and lessons are static data (`learningOrder.ts` /
 * `data/concepts.ts`), so this runs synchronously on every keystroke rather
 * than needing a debounce — only the user search below hits the network.
 * Each category is capped so one broad match (e.g. "probability") doesn't
 * crowd out the others.
 */
function curriculumResults(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];
  let subjectCount = 0;
  let subtopicCount = 0;
  let lessonCount = 0;

  for (const chapter of chapters) {
    if (subjectCount < 3 && chapter.label.toLowerCase().includes(q)) {
      subjectCount++;
      results.push({
        kind: "subject",
        key: `subject-${chapter.domain}`,
        title: chapter.label,
        subtitle: `${chapter.concepts.length} concepts`,
        href: `/map?view=list#chapter-panel-${chapter.domain}`,
      });
    }
    for (const section of chapter.sections) {
      if (subtopicCount >= 3) break;
      if (section.label.toLowerCase().includes(q)) {
        subtopicCount++;
        results.push({
          kind: "subtopic",
          key: `subtopic-${chapter.domain}-${section.id}`,
          title: section.label,
          subtitle: chapter.label,
          href: `/map?view=list#chapter-panel-${chapter.domain}`,
        });
      }
    }
  }

  for (const concept of concepts) {
    if (lessonCount >= 5) break;
    if (
      concept.title.toLowerCase().includes(q) ||
      concept.blurb.toLowerCase().includes(q)
    ) {
      lessonCount++;
      results.push({
        kind: "lesson",
        key: `lesson-${concept.id}`,
        title: concept.title,
        subtitle: domainMeta[concept.domain].label,
        href: `/concepts/${concept.id}`,
      });
    }
  }

  return results;
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden="true"
    >
      <circle cx={8.5} cy={8.5} r={5.5} />
      <path d="M16.5 16.5 13 13" strokeLinecap="round" />
    </svg>
  );
}

/**
 * One search bar over four different sources: the static curriculum data
 * (instant) and Supabase profiles (debounced network call). Results are
 * merged into a single keyboard-navigable dropdown grouped visually by the
 * "kind" badge on the right of each row rather than separate sections, since
 * any one query rarely matches more than a couple of categories at once.
 */
export function GlobalSearch({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [userResults, setUserResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const curriculum = useMemo(() => curriculumResults(query), [query]);
  const results = useMemo(
    () => [...curriculum, ...userResults],
    [curriculum, userResults],
  );

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setUserResults([]);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(() => {
      void searchProfiles(trimmed).then((found) => {
        if (cancelled) return;
        setUserResults(
          found.map((p) => ({
            kind: "user" as const,
            key: `user-${p.username}`,
            title: p.displayName,
            subtitle: `@${p.username}`,
            href: `/u/${p.username}`,
          })),
        );
      });
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => setActiveIndex(-1), [query]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function select(result: SearchResult) {
    setOpen(false);
    setQuery("");
    navigate(result.href);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown" && results.length > 0) {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      return;
    }
    if (e.key === "ArrowUp" && results.length > 0) {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter" && activeIndex >= 0) {
      const result = results[activeIndex];
      if (result) {
        e.preventDefault();
        select(result);
      }
    }
  }

  const showDropdown = open && query.trim().length > 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <span
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]"
          aria-hidden="true"
        >
          <SearchIcon />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search subjects, lessons, people…"
          aria-label="Search Mathlingo"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="global-search-results"
          className="font-body w-full min-w-0 rounded-full border border-[var(--line)] bg-[var(--panel)] py-2 pl-9 pr-4 text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      </div>

      {showDropdown && (
        <div
          id="global-search-results"
          role="listbox"
          className="font-body absolute left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-1.5 shadow-lg"
        >
          {results.length === 0 ? (
            <p className="px-3 py-3 text-sm text-[var(--ink-soft)]">
              No matches for “{query.trim()}”.
            </p>
          ) : (
            results.map((r, i) => (
              <button
                key={r.key}
                type="button"
                role="option"
                aria-selected={i === activeIndex}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => select(r)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  i === activeIndex
                    ? "bg-[var(--accent-soft)]"
                    : "hover:bg-[var(--paper)]"
                }`}
              >
                <span className="min-w-0 flex-1 truncate text-[var(--ink)]">
                  {r.title}
                </span>
                <span className="shrink-0 text-xs text-[var(--ink-soft)]">
                  {KIND_LABEL[r.kind]}
                  {r.subtitle ? ` · ${r.subtitle}` : ""}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
