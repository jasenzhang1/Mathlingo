import { useEffect, useMemo, useState } from "react";
import { CodeText } from "../components/assessment/CodeText";
import { ItemEditorForm } from "../components/dev/ItemEditorForm";
import { ItemPreviewPanel } from "../components/dev/ItemPreviewPanel";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { domainMeta, concepts, type Concept } from "../data/concepts";
import { loadItemBank } from "../data/items";
import type { Item } from "../lib/assessment/types";
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

const conceptById = new Map<string, Concept>(concepts.map((c) => [c.id, c]));

function itemMatchesSearch(item: Item, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return item.id.toLowerCase().includes(q) || item.stem.toLowerCase().includes(q);
}

/** Content-review workbench: browse every assessment item by topic, edit it, or author a new one. */
export function DevQuestionsPage() {
  const { user, loading: authLoading } = useAuth();
  const isDeveloper = useIsDeveloper();

  const [bank, setBank] = useState<Map<string, Item[]> | null>(null);
  const [store, setStore] = useState<ItemOverrideStore>(() => loadStore());
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
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

  const conceptsByDomain = useMemo(() => {
    const map = new Map<string, Concept[]>();
    for (const c of concepts) {
      const bucket = map.get(c.domain);
      if (bucket) bucket.push(c);
      else map.set(c.domain, [c]);
    }
    return map;
  }, []);

  const allIds = useMemo(() => {
    const ids = new Set<string>();
    if (itemsByConcept) for (const list of itemsByConcept.values()) for (const i of list) ids.add(i.id);
    return ids;
  }, [itemsByConcept]);

  const selectedItems = useMemo(() => {
    if (!selectedConceptId || !itemsByConcept) return [];
    const list = itemsByConcept.get(selectedConceptId) ?? [];
    return list.filter((i) => itemMatchesSearch(i, search));
  }, [selectedConceptId, itemsByConcept, search]);

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

        {!bank ? (
          <div className="mt-8 h-64 animate-pulse rounded-2xl border border-[var(--line)] bg-[var(--panel)]" />
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="max-h-[70vh] overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3">
              {[...conceptsByDomain.entries()].map(([domain, list]) => (
                <div key={domain} className="mb-3">
                  <p
                    className="font-body px-2 text-xs font-semibold uppercase tracking-wide"
                    style={{ color: domainMeta[domain as keyof typeof domainMeta]?.color }}
                  >
                    {domainMeta[domain as keyof typeof domainMeta]?.label ?? domain}
                  </p>
                  {list.map((c) => {
                    const count = itemsByConcept?.get(c.id)?.length ?? 0;
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
              ))}
            </aside>

            <section>
              {!selectedConceptId ? (
                <div className="rounded-2xl border border-dashed border-[var(--line)] p-10 text-center">
                  <p className="font-body text-[var(--ink-soft)]">
                    Pick a topic on the left to see its questions.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="font-display text-xl text-[var(--ink)]">
                        {conceptById.get(selectedConceptId)?.title ?? selectedConceptId}
                      </h2>
                      <p className="font-body text-sm text-[var(--ink-soft)]">
                        {selectedItems.length} question{selectedItems.length === 1 ? "" : "s"}
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
                    {selectedItems.map((item) => {
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
                                <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-xs text-[var(--ink-soft)]">
                                  {item.format}
                                </span>
                                <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-xs text-[var(--ink-soft)]">
                                  {item.cognitive}
                                </span>
                                <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-xs text-[var(--ink-soft)]">
                                  difficulty {item.difficulty}
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
                                <CodeText text={item.stem} />
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
