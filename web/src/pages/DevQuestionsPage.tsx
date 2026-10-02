import { useEffect, useMemo, useState } from "react";
import { CodeText } from "../components/assessment/CodeText";
import { FeedbackInbox } from "../components/dev/FeedbackInbox";
import { ItemEditorForm } from "../components/dev/ItemEditorForm";
import { ItemPreviewPanel } from "../components/dev/ItemPreviewPanel";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { concepts, type Concept, type Domain } from "../data/concepts";
import { loadItemBank } from "../data/items";
import type { CognitiveLevel, Item, ItemFormat } from "../lib/assessment/types";
import {
  difficultyToLevel,
  formatDifficultyLevel,
  MAX_DIFFICULTY_LEVEL,
  MIN_DIFFICULTY_LEVEL,
} from "../lib/assessment/difficultyLevel";
import { useAuth } from "../lib/auth/useAuth";
import { useIsDeveloper } from "../lib/dev/devAuth";
import {
  applyOverrides,
  clearOverride,
  deleteNewItem,
  hasLocalEdit,
  loadStore,
  saveNewItem,
  saveOverride,
  type ItemOverrideStore,
} from "../lib/dev/itemOverrides";
import { publishOverrides } from "../lib/dev/publishOverrides";
import { chapters as courses } from "../lib/learningOrder";

const conceptById = new Map<string, Concept>(concepts.map((c) => [c.id, c]));

/**
 * The filter panel speaks the content team's vocabulary: a *course* is a
 * domain ("Probability") and a *chapter* is one of its sections from
 * `data/sections.ts` ("Random Variables") — what `learningOrder.ts` calls a
 * chapter and a section respectively. Section ids like "further-topics" repeat
 * across domains, so chapters are keyed as `domain/sectionId`.
 */
const chapterKeyOf = new Map<string, string>();
for (const course of courses) {
  for (const section of course.sections) {
    for (const c of section.concepts) chapterKeyOf.set(c.id, `${course.domain}/${section.id}`);
  }
}

const FORMAT_LABELS: Record<ItemFormat, string> = {
  numeric: "Numeric",
  symbolic: "Symbolic",
  mcq: "Multiple choice",
  "multi-select": "Multi-select",
  "short-answer": "Short answer",
  derivation: "Derivation",
  interview: "Interview",
  code: "Code",
};

const COGNITIVE_LABELS: Record<CognitiveLevel, string> = {
  recall: "Recall",
  apply: "Apply",
  explain: "Explain",
  transfer: "Transfer",
};

interface Filters {
  course: Domain | "";
  chapter: string;
  minLevel: number;
  maxLevel: number;
  formats: ItemFormat[];
  cognitive: CognitiveLevel[];
}

const NO_FILTERS: Filters = {
  course: "",
  chapter: "",
  minLevel: MIN_DIFFICULTY_LEVEL,
  maxLevel: MAX_DIFFICULTY_LEVEL,
  formats: [],
  cognitive: [],
};

/** Course and chapter narrow which topics are listed; the rest narrow the questions within them. */
function conceptInScope(conceptId: string, filters: Filters): boolean {
  if (filters.chapter) return chapterKeyOf.get(conceptId) === filters.chapter;
  if (filters.course) return conceptById.get(conceptId)?.domain === filters.course;
  return true;
}

function itemMatchesFilters(item: Item, filters: Filters, query: string): boolean {
  if (!conceptInScope(item.conceptId, filters)) return false;
  const level = difficultyToLevel(item.difficulty);
  if (level < filters.minLevel || level > filters.maxLevel) return false;
  if (filters.formats.length > 0 && !filters.formats.includes(item.format)) return false;
  if (filters.cognitive.length > 0 && !filters.cognitive.includes(item.cognitive)) return false;
  if (!query) return true;
  const q = query.toLowerCase();
  return item.id.toLowerCase().includes(q) || item.stem.toLowerCase().includes(q);
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

/** Cross-topic results render every row's KaTeX at once; past this the page drags. */
const MAX_CROSS_TOPIC_RESULTS = 200;

/** Content-review workbench: browse every assessment item by topic, edit it, or author a new one. */
export function DevQuestionsPage() {
  const { user, loading: authLoading } = useAuth();
  const isDeveloper = useIsDeveloper();

  const [bank, setBank] = useState<Map<string, Item[]> | null>(null);
  const [store, setStore] = useState<ItemOverrideStore>(() => loadStore());
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  // undefined = editor closed, null = creating a new item, Item = editing that item.
  const [editing, setEditing] = useState<Item | null | undefined>(undefined);
  const [previewing, setPreviewing] = useState<Item | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<
    { ok: true; prUrl: string } | { ok: false; message: string } | null
  >(null);

  useEffect(() => {
    if (!isDeveloper) return;
    loadItemBank().then(setBank);
  }, [isDeveloper]);

  const itemsByConcept = useMemo(() => {
    if (!bank) return null;
    const flat = [...bank.values()].flat();
    const merged = applyOverrides(flat, store);
    const grouped = new Map<string, Item[]>();
    for (const item of merged) {
      const bucket = grouped.get(item.conceptId);
      if (bucket) bucket.push(item);
      else grouped.set(item.conceptId, [item]);
    }
    return grouped;
  }, [bank, store]);

  const allIds = useMemo(() => {
    const ids = new Set<string>();
    if (itemsByConcept) for (const list of itemsByConcept.values()) for (const i of list) ids.add(i.id);
    return ids;
  }, [itemsByConcept]);

  const matchesByConcept = useMemo(() => {
    const map = new Map<string, Item[]>();
    if (!itemsByConcept) return map;
    for (const [conceptId, list] of itemsByConcept) {
      const matching = list.filter((i) => itemMatchesFilters(i, filters, search));
      if (matching.length > 0) map.set(conceptId, matching);
    }
    return map;
  }, [itemsByConcept, filters, search]);

  const filtersActive =
    filters.course !== "" ||
    filters.chapter !== "" ||
    filters.minLevel !== MIN_DIFFICULTY_LEVEL ||
    filters.maxLevel !== MAX_DIFFICULTY_LEVEL ||
    filters.formats.length > 0 ||
    filters.cognitive.length > 0;
  const searching = filtersActive || search.trim() !== "";

  // With a topic picked, show its matches; without one, an active filter or
  // search shows every match across the whole bank, in curriculum order.
  const selectedItems = useMemo(() => {
    if (selectedConceptId) return matchesByConcept.get(selectedConceptId) ?? [];
    if (!searching) return [];
    return courses.flatMap((course) => course.concepts.flatMap((c) => matchesByConcept.get(c.id) ?? []));
  }, [selectedConceptId, matchesByConcept, searching]);

  const visibleCourses = useMemo(
    () =>
      courses
        .filter((course) => !filters.course || course.domain === filters.course)
        .map((course) => ({
          ...course,
          sections: course.sections.filter(
            (section) => !filters.chapter || `${course.domain}/${section.id}` === filters.chapter,
          ),
        }))
        .filter((course) => course.sections.length > 0),
    [filters.course, filters.chapter],
  );

  const chapterOptions = filters.course
    ? (courses.find((c) => c.domain === filters.course)?.sections ?? []).map((section) => ({
        key: `${filters.course}/${section.id}`,
        label: section.label,
      }))
    : [];

  function updateFilters(next: Filters) {
    setFilters(next);
    if (selectedConceptId && !conceptInScope(selectedConceptId, next)) setSelectedConceptId(null);
  }

  function refresh(next: ItemOverrideStore) {
    setStore(next);
  }

  function handleSave(item: Item) {
    const isBrandNew = editing === null;
    const next = isBrandNew ? saveNewItem(item) : saveOverride(item);
    refresh(next);
    setEditing(undefined);
    setSelectedConceptId(item.conceptId);
  }

  function handleRevert(item: Item) {
    if (!confirm(`Discard local edits to "${item.id}" and revert to the source-file version?`)) return;
    refresh(clearOverride(item.id));
  }

  function handleDeleteNew(item: Item) {
    if (!confirm(`Delete the locally-authored question "${item.id}"?`)) return;
    refresh(deleteNewItem(item.id));
  }

  async function handlePublish() {
    const pendingCount = Object.keys(store.overrides).length + Object.keys(store.newItems).length;
    if (pendingCount === 0) return;
    if (
      !confirm(
        `Open a pull request with ${pendingCount} edited/new question(s)? A maintainer will still need to review and merge it.`,
      )
    ) {
      return;
    }
    setPublishing(true);
    setPublishResult(null);
    const result = await publishOverrides(store);
    setPublishing(false);
    setPublishResult(result.ok ? { ok: true, prUrl: result.prUrl } : { ok: false, message: result.message });
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mathlingo-item-overrides.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[var(--paper)]">
        <Nav />
        <main className="mx-auto max-w-6xl px-6 py-16">
          <div className="h-40 animate-pulse rounded-2xl border border-[var(--line)] bg-[var(--panel)]" />
        </main>
      </div>
    );
  }

  if (!user || !isDeveloper) {
    return (
      <div className="min-h-screen bg-[var(--paper)]">
        <Nav />
        <main className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h1 className="font-display text-2xl text-[var(--ink)]">Not available</h1>
          <p className="font-body mt-2 text-[var(--ink-soft)]">
            This page is restricted to the Mathlingo content team.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-[var(--ink)]">Question bank</h1>
            <p className="font-body mt-1 text-[var(--ink-soft)]">
              Browse assessment items by topic, edit difficulty and wording, or author new
              questions. Edits are saved locally in this browser (
              {Object.keys(store.overrides).length} edited, {Object.keys(store.newItems).length}{" "}
              new) — publish them to open a GitHub pull request, or export the raw JSON.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="font-body rounded-lg border border-[var(--line)] px-4 py-2 text-sm text-[var(--ink)] hover:bg-[var(--panel)]"
            >
              Export overrides
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={
                publishing || Object.keys(store.overrides).length + Object.keys(store.newItems).length === 0
              }
              className="font-body rounded-lg px-4 py-2 text-sm font-medium text-[var(--accent-ink)] disabled:opacity-50"
              style={{ background: "var(--accent)" }}
            >
              {publishing ? "Opening PR…" : "Publish to GitHub"}
            </button>
          </div>
        </div>

        {publishResult && (
          <div
            className={`font-body mt-3 rounded-lg border px-4 py-2 text-sm ${
              publishResult.ok
                ? "border-green-600/30 bg-green-600/10 text-green-800"
                : "border-red-600/30 bg-red-600/10 text-red-700"
            }`}
          >
            {publishResult.ok ? (
              <>
                Pull request opened:{" "}
                <a href={publishResult.prUrl} target="_blank" rel="noreferrer" className="underline">
                  {publishResult.prUrl}
                </a>
              </>
            ) : (
              `Publish failed: ${publishResult.message}`
            )}
          </div>
        )}

        <FeedbackInbox
          findItem={(id) => {
            if (itemsByConcept) for (const list of itemsByConcept.values()) {
              const found = list.find((i) => i.id === id);
              if (found) return found;
            }
            return undefined;
          }}
          onEdit={(item) => setEditing(item)}
        />

        {!bank ? (
          <div className="mt-8 h-64 animate-pulse rounded-2xl border border-[var(--line)] bg-[var(--panel)]" />
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="max-h-[80vh] overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3">
              <div className="mb-4 space-y-3 border-b border-[var(--line)] px-2 pb-4">
                <div className="flex items-center justify-between">
                  <p className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
                    Filters
                  </p>
                  {filtersActive && (
                    <button
                      type="button"
                      onClick={() => updateFilters(NO_FILTERS)}
                      className="font-body text-xs text-[var(--ink-soft)] underline hover:text-[var(--ink)]"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <label className="block">
                  <span className="font-body text-xs text-[var(--ink-soft)]">Course</span>
                  <select
                    value={filters.course}
                    onChange={(e) =>
                      updateFilters({ ...filters, course: e.target.value as Domain | "", chapter: "" })
                    }
                    className="font-body mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2 py-1.5 text-sm text-[var(--ink)]"
                  >
                    <option value="">All courses</option>
                    {courses.map((course) => (
                      <option key={course.domain} value={course.domain}>
                        {course.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="font-body text-xs text-[var(--ink-soft)]">Chapter</span>
                  <select
                    value={filters.chapter}
                    disabled={!filters.course}
                    onChange={(e) => updateFilters({ ...filters, chapter: e.target.value })}
                    className="font-body mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2 py-1.5 text-sm text-[var(--ink)] disabled:opacity-50"
                  >
                    <option value="">{filters.course ? "All chapters" : "Pick a course first"}</option>
                    {chapterOptions.map((chapter) => (
                      <option key={chapter.key} value={chapter.key}>
                        {chapter.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <span className="font-body text-xs text-[var(--ink-soft)]">
                    Difficulty {filters.minLevel.toFixed(1)} – {filters.maxLevel.toFixed(1)}
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="number"
                      min={MIN_DIFFICULTY_LEVEL}
                      max={MAX_DIFFICULTY_LEVEL}
                      step={0.5}
                      value={filters.minLevel}
                      aria-label="Minimum difficulty"
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (Number.isFinite(v)) updateFilters({ ...filters, minLevel: v });
                      }}
                      className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2 py-1 text-sm text-[var(--ink)]"
                    />
                    <span className="text-[var(--ink-soft)]">to</span>
                    <input
                      type="number"
                      min={MIN_DIFFICULTY_LEVEL}
                      max={MAX_DIFFICULTY_LEVEL}
                      step={0.5}
                      value={filters.maxLevel}
                      aria-label="Maximum difficulty"
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (Number.isFinite(v)) updateFilters({ ...filters, maxLevel: v });
                      }}
                      className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2 py-1 text-sm text-[var(--ink)]"
                    />
                  </div>
                </div>

                <FilterChips
                  label="Format"
                  options={FORMAT_LABELS}
                  selected={filters.formats}
                  onToggle={(f) => updateFilters({ ...filters, formats: toggle(filters.formats, f) })}
                />

                <FilterChips
                  label="Type"
                  options={COGNITIVE_LABELS}
                  selected={filters.cognitive}
                  onToggle={(c) => updateFilters({ ...filters, cognitive: toggle(filters.cognitive, c) })}
                />
              </div>

              {searching && (
                <button
                  type="button"
                  onClick={() => setSelectedConceptId(null)}
                  className={`font-body mb-3 block w-full rounded-lg px-2 py-1.5 text-left text-sm font-medium ${
                    selectedConceptId === null
                      ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                      : "text-[var(--ink)] hover:bg-[var(--paper)]"
                  }`}
                >
                  All matching questions{" "}
                  <span className="opacity-60">
                    ({[...matchesByConcept.values()].reduce((n, list) => n + list.length, 0)})
                  </span>
                </button>
              )}

              {visibleCourses.map((course) => (
                <div key={course.domain} className="mb-3">
                  <p
                    className="font-body px-2 text-xs font-semibold uppercase tracking-wide"
                    style={{ color: course.color }}
                  >
                    {course.label}
                  </p>
                  {course.sections.map((section) => {
                    // Hide topics a filter has emptied, but keep the selected one so it can't vanish mid-edit.
                    const shown = section.concepts.filter(
                      (c) => !searching || matchesByConcept.has(c.id) || c.id === selectedConceptId,
                    );
                    if (shown.length === 0) return null;
                    return (
                      <div key={section.id} className="mt-1">
                        <p className="font-body px-2 pt-1 text-[11px] text-[var(--ink-soft)]">{section.label}</p>
                        {shown.map((c) => {
                          const count = searching
                            ? (matchesByConcept.get(c.id)?.length ?? 0)
                            : (itemsByConcept?.get(c.id)?.length ?? 0);
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => setSelectedConceptId(c.id)}
                              className={`font-body block w-full truncate rounded-lg px-2 py-1.5 text-left text-sm ${
                                selectedConceptId === c.id
                                  ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                                  : "text-[var(--ink)] hover:bg-[var(--paper)]"
                              }`}
                            >
                              {c.title} <span className="opacity-60">({count})</span>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </aside>

            <section className="min-w-0">
              {!selectedConceptId && !searching ? (
                <div className="rounded-2xl border border-dashed border-[var(--line)] p-10 text-center">
                  <p className="font-body text-[var(--ink-soft)]">
                    Pick a topic on the left, or set a filter to search the whole bank.
                  </p>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search id or wording…"
                    className="mt-4 w-full max-w-sm rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm text-[var(--ink)]"
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="font-display text-xl text-[var(--ink)]">
                        {selectedConceptId
                          ? (conceptById.get(selectedConceptId)?.title ?? selectedConceptId)
                          : "All matching questions"}
                      </h2>
                      <p className="font-body text-sm text-[var(--ink-soft)]">
                        {selectedItems.length} question{selectedItems.length === 1 ? "" : "s"}
                        {filtersActive && " matching filters"}
                        {!selectedConceptId && selectedItems.length > MAX_CROSS_TOPIC_RESULTS &&
                          ` — showing the first ${MAX_CROSS_TOPIC_RESULTS}; narrow the filters to see the rest`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search id or wording…"
                        className="rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm text-[var(--ink)]"
                      />
                      <button
                        type="button"
                        onClick={() => setEditing(null)}
                        className="font-body shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--accent-ink)]"
                        style={{ background: "var(--accent)" }}
                      >
                        + Add question
                      </button>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {(selectedConceptId ? selectedItems : selectedItems.slice(0, MAX_CROSS_TOPIC_RESULTS)).map((item) => {
                      const edited = hasLocalEdit(store, item.id);
                      const isNewItem = item.id in store.newItems;
                      return (
                        <li
                          key={item.id}
                          className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs text-[var(--ink-soft)]">
                                  {item.id}
                                </span>
                                {!selectedConceptId && (
                                  <button
                                    type="button"
                                    onClick={() => setSelectedConceptId(item.conceptId)}
                                    className="font-body rounded-full bg-[var(--paper)] px-2 py-0.5 text-xs text-[var(--ink)] hover:underline"
                                  >
                                    {conceptById.get(item.conceptId)?.title ?? item.conceptId}
                                  </button>
                                )}
                                <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-xs text-[var(--ink-soft)]">
                                  {FORMAT_LABELS[item.format] ?? item.format}
                                </span>
                                <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-xs text-[var(--ink-soft)]">
                                  {COGNITIVE_LABELS[item.cognitive] ?? item.cognitive}
                                </span>
                                <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-xs text-[var(--ink-soft)]">
                                  difficulty {formatDifficultyLevel(item.difficulty)}
                                </span>
                                <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-xs text-[var(--ink-soft)]">
                                  {item.status}
                                </span>
                                {edited && (
                                  <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-[var(--accent-ink)]">
                                    {isNewItem ? "new (local)" : "edited (local)"}
                                  </span>
                                )}
                              </div>
                              <p className="font-body mt-2 line-clamp-2 text-sm text-[var(--ink)]">
                                <CodeText text={item.stem} typeset />
                              </p>
                            </div>
                            <div className="flex shrink-0 flex-col gap-1">
                              <button
                                type="button"
                                onClick={() => setPreviewing(item)}
                                className="font-body rounded-lg border border-[var(--line)] px-3 py-1 text-xs text-[var(--ink)] hover:bg-[var(--paper)]"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditing(item)}
                                className="font-body rounded-lg border border-[var(--line)] px-3 py-1 text-xs text-[var(--ink)] hover:bg-[var(--paper)]"
                              >
                                Edit
                              </button>
                              {isNewItem ? (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteNew(item)}
                                  className="font-body rounded-lg border border-[var(--line)] px-3 py-1 text-xs text-red-600 hover:bg-[var(--paper)]"
                                >
                                  Delete
                                </button>
                              ) : (
                                edited && (
                                  <button
                                    type="button"
                                    onClick={() => handleRevert(item)}
                                    className="font-body rounded-lg border border-[var(--line)] px-3 py-1 text-xs text-[var(--ink)] hover:bg-[var(--paper)]"
                                  >
                                    Revert
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </section>
          </div>
        )}
      </main>
      <Footer />

      {editing !== undefined && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-6">
          <div className="my-8 w-full max-w-3xl rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg text-[var(--ink)]">
                {editing === null ? "Add question" : `Edit ${editing.id}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditing(undefined)}
                className="text-[var(--ink-soft)] hover:text-[var(--ink)]"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <ItemEditorForm
              item={editing}
              concepts={concepts}
              defaultConceptId={selectedConceptId ?? undefined}
              existingIds={allIds}
              onSave={handleSave}
              onCancel={() => setEditing(undefined)}
            />
          </div>
        </div>
      )}

      {previewing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-6">
          <ItemPreviewPanel item={previewing} onClose={() => setPreviewing(null)} />
        </div>
      )}
    </div>
  );
}

function FilterChips<T extends string>({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: Record<T, string>;
  selected: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <div>
      <span className="font-body text-xs text-[var(--ink-soft)]">{label}</span>
      <div className="mt-1 flex flex-wrap gap-1">
        {(Object.keys(options) as T[]).map((value) => {
          const on = selected.includes(value);
          return (
            <button
              key={value}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(value)}
              className={`font-body rounded-full border px-2 py-0.5 text-xs ${
                on
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                  : "border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper)]"
              }`}
            >
              {options[value]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
