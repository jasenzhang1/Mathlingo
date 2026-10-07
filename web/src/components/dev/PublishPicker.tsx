import { useEffect, useMemo, useRef, useState } from "react";
import { concepts, type Concept } from "../../data/concepts";
import { formatDifficultyLevel } from "../../lib/assessment/difficultyLevel";
import type { Item } from "../../lib/assessment/types";
import type { ItemOverrideStore } from "../../lib/dev/itemOverrides";
import { chapters as courses } from "../../lib/learningOrder";
import { CodeText } from "../assessment/CodeText";

const conceptById = new Map<string, Concept>(concepts.map((c) => [c.id, c]));

/** What the right-hand list is showing: everything, or one course, chapter or lesson. */
type Focus =
  | { kind: "all" }
  | { kind: "course"; domain: string }
  | { kind: "chapter"; key: string }
  | { kind: "lesson"; conceptId: string };

/**
 * Chooses which local edits go into a pull request. Laid out like the question
 * bank: changed lessons grouped by course and chapter on the left, each with a
 * checkbox that selects everything under it, and the questions in the focused
 * group on the right.
 */
export function PublishPicker({
  store,
  publishing,
  error,
  onPublish,
  onPreview,
  onClose,
}: {
  store: ItemOverrideStore;
  publishing: boolean;
  /** Why the last publish attempt failed, if it did. */
  error: string | null;
  onPublish: (ids: Set<string>) => void;
  onPreview: (item: Item) => void;
  onClose: () => void;
}) {
  const items = useMemo(
    () => [...Object.values(store.overrides), ...Object.values(store.newItems)],
    [store],
  );
  const byConcept = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const item of items) {
      const list = map.get(item.conceptId);
      if (list) list.push(item);
      else map.set(item.conceptId, [item]);
    }
    return map;
  }, [items]);

  // The curriculum tree, pruned to lessons with changes.
  const tree = useMemo(
    () =>
      courses
        .map((course) => ({
          ...course,
          sections: course.sections
            .map((section) => ({
              ...section,
              key: `${course.domain}/${section.id}`,
              concepts: section.concepts.filter((c) => byConcept.has(c.id)),
            }))
            .filter((section) => section.concepts.length > 0),
        }))
        .filter((course) => course.sections.length > 0),
    [byConcept],
  );

  // Items whose lesson isn't in the curriculum still need to be publishable.
  const orphans = useMemo(() => {
    const placed = new Set(tree.flatMap((c) => c.sections.flatMap((s) => s.concepts.map((x) => x.id))));
    return items.filter((i) => !placed.has(i.conceptId));
  }, [items, tree]);

  const [selected, setSelected] = useState<Set<string>>(() => new Set(items.map((i) => i.id)));
  const [focus, setFocus] = useState<Focus>({ kind: "all" });

  const idsIn = (conceptIds: string[]) => conceptIds.flatMap((id) => (byConcept.get(id) ?? []).map((i) => i.id));

  function setMany(ids: string[], on: boolean) {
    setSelected((cur) => {
      const next = new Set(cur);
      for (const id of ids) {
        if (on) next.add(id);
        else next.delete(id);
      }
      return next;
    });
  }

  const shown = useMemo(() => {
    const ordered = [
      ...tree.flatMap((c) => c.sections.flatMap((s) => s.concepts.flatMap((x) => byConcept.get(x.id) ?? []))),
      ...orphans,
    ];
    switch (focus.kind) {
      case "all":
        return ordered;
      case "course":
        return ordered.filter((i) => conceptById.get(i.conceptId)?.domain === focus.domain);
      case "chapter": {
        const section = tree.flatMap((c) => c.sections).find((s) => s.key === focus.key);
        const ids = new Set(section?.concepts.map((c) => c.id));
        return ordered.filter((i) => ids.has(i.conceptId));
      }
      case "lesson":
        return byConcept.get(focus.conceptId) ?? [];
    }
  }, [focus, tree, orphans, byConcept]);

  const focusTitle =
    focus.kind === "all"
      ? "All changes"
      : focus.kind === "course"
        ? (tree.find((c) => c.domain === focus.domain)?.label ?? focus.domain)
        : focus.kind === "chapter"
          ? (tree.flatMap((c) => c.sections).find((s) => s.key === focus.key)?.label ?? focus.key)
          : (conceptById.get(focus.conceptId)?.title ?? focus.conceptId);

  const isFocused = (f: Focus) => JSON.stringify(f) === JSON.stringify(focus);
  const rowClass = (f: Focus) =>
    `font-body min-w-0 flex-1 truncate rounded-lg px-2 py-1 text-left ${
      isFocused(f) ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "text-[var(--ink)] hover:bg-[var(--paper)]"
    }`;
  const shownIds = shown.map((i) => i.id);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-6">
      <div className="my-8 w-full max-w-6xl rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-[var(--ink)]">Choose changes to publish</h2>
            <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">
              {selected.size} of {items.length} local change{items.length === 1 ? "" : "s"} selected. Unselected
              changes stay saved in this browser.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setSelected(new Set(items.map((i) => i.id)))}
              className="font-body rounded-lg border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--ink)] hover:bg-[var(--panel)]"
            >
              Select all
            </button>
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="font-body rounded-lg border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--ink)] hover:bg-[var(--panel)]"
            >
              Select none
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="max-h-[65vh] overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3">
            <div className="mb-3 flex items-center gap-2 text-sm">
              <TriCheckbox ids={items.map((i) => i.id)} selected={selected} onChange={setMany} />
              <button type="button" onClick={() => setFocus({ kind: "all" })} className={`${rowClass({ kind: "all" })} font-medium`}>
                All changes <span className="opacity-60">({items.length})</span>
              </button>
            </div>

            {tree.map((course) => {
              const courseIds = idsIn(course.sections.flatMap((s) => s.concepts.map((c) => c.id)));
              const courseFocus: Focus = { kind: "course", domain: course.domain };
              return (
                <div key={course.domain} className="mb-3">
                  <div className="flex items-center gap-2">
                    <TriCheckbox ids={courseIds} selected={selected} onChange={setMany} />
                    <button
                      type="button"
                      onClick={() => setFocus(courseFocus)}
                      className={`${rowClass(courseFocus)} text-xs font-semibold uppercase tracking-wide`}
                      style={isFocused(courseFocus) ? undefined : { color: course.color }}
                    >
                      {course.label} <span className="opacity-60">({courseIds.length})</span>
                    </button>
                  </div>
                  {course.sections.map((section) => {
                    const sectionIds = idsIn(section.concepts.map((c) => c.id));
                    const sectionFocus: Focus = { kind: "chapter", key: section.key };
                    return (
                      <div key={section.key} className="mt-1 pl-4">
                        <div className="flex items-center gap-2">
                          <TriCheckbox ids={sectionIds} selected={selected} onChange={setMany} />
                          <button type="button" onClick={() => setFocus(sectionFocus)} className={`${rowClass(sectionFocus)} text-xs`}>
                            {section.label} <span className="opacity-60">({sectionIds.length})</span>
                          </button>
                        </div>
                        {section.concepts.map((c) => {
                          const lessonIds = idsIn([c.id]);
                          const lessonFocus: Focus = { kind: "lesson", conceptId: c.id };
                          return (
                            <div key={c.id} className="flex items-center gap-2 pl-4">
                              <TriCheckbox ids={lessonIds} selected={selected} onChange={setMany} />
                              <button type="button" onClick={() => setFocus(lessonFocus)} className={`${rowClass(lessonFocus)} text-sm`}>
                                {c.title} <span className="opacity-60">({lessonIds.length})</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {orphans.length > 0 && (
              <p className="font-body px-2 text-xs text-[var(--ink-soft)]">
                + {orphans.length} change{orphans.length === 1 ? "" : "s"} outside the curriculum (under All changes)
              </p>
            )}
          </aside>

          <section className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl text-[var(--ink)]">{focusTitle}</h3>
                <p className="font-body text-sm text-[var(--ink-soft)]">
                  {shownIds.filter((id) => selected.has(id)).length} of {shown.length} selected
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMany(shownIds, true)}
                  className="font-body rounded-lg border border-[var(--line)] px-3 py-1 text-xs text-[var(--ink)] hover:bg-[var(--panel)]"
                >
                  Select these
                </button>
                <button
                  type="button"
                  onClick={() => setMany(shownIds, false)}
                  className="font-body rounded-lg border border-[var(--line)] px-3 py-1 text-xs text-[var(--ink)] hover:bg-[var(--panel)]"
                >
                  Deselect these
                </button>
              </div>
            </div>

            <ul className="mt-4 max-h-[58vh] space-y-2 overflow-y-auto">
              {shown.map((item) => {
                const on = selected.has(item.id);
                const isNewItem = item.id in store.newItems;
                return (
                  <li
                    key={item.id}
                    className={`rounded-xl border bg-[var(--panel)] p-4 ${on ? "border-[var(--accent)]" : "border-[var(--line)]"}`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={(e) => setMany([item.id], e.target.checked)}
                        aria-label={`Publish ${item.id}`}
                        className="mt-1"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs text-[var(--ink-soft)]">{item.id}</span>
                          {focus.kind !== "lesson" && (
                            <span className="font-body rounded-full bg-[var(--paper)] px-2 py-0.5 text-xs text-[var(--ink)]">
                              {conceptById.get(item.conceptId)?.title ?? item.conceptId}
                            </span>
                          )}
                          <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-xs text-[var(--ink-soft)]">
                            difficulty {formatDifficultyLevel(item.difficulty)}
                          </span>
                          <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-[var(--accent-ink)]">
                            {isNewItem ? "new (local)" : "edited (local)"}
                          </span>
                        </div>
                        <p className="font-body mt-2 line-clamp-2 text-sm text-[var(--ink)]">
                          <CodeText text={item.stem} typeset />
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onPreview(item)}
                        className="font-body shrink-0 rounded-lg border border-[var(--line)] px-3 py-1 text-xs text-[var(--ink)] hover:bg-[var(--paper)]"
                      >
                        View
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        {error && (
          <div className="font-body mt-4 rounded-lg border border-red-600/30 bg-red-600/10 px-4 py-2 text-sm text-red-700">
            Publish failed: {error}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2 border-t border-[var(--line)] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="font-body rounded-lg border border-[var(--line)] px-4 py-2 text-sm text-[var(--ink)] hover:bg-[var(--panel)]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={publishing || selected.size === 0}
            onClick={() => onPublish(selected)}
            className="font-body rounded-lg px-4 py-2 text-sm font-medium text-[var(--accent-ink)] disabled:opacity-50"
            style={{ background: "var(--accent)" }}
          >
            {publishing ? "Opening PR…" : `Open PR with ${selected.size} change${selected.size === 1 ? "" : "s"}`}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Checked when every id is selected, indeterminate when only some are. */
function TriCheckbox({
  ids,
  selected,
  onChange,
}: {
  ids: string[];
  selected: Set<string>;
  onChange: (ids: string[], on: boolean) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const count = ids.filter((id) => selected.has(id)).length;
  const all = ids.length > 0 && count === ids.length;
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = count > 0 && !all;
  }, [count, all]);
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={all}
      onChange={() => onChange(ids, !all)}
      className="shrink-0"
    />
  );
}
