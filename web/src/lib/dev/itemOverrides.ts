import type { Item } from "../assessment/types";

/**
 * Local persistence for the developer question editor (`/dev/questions`).
 *
 * Items ship as typed literals in `src/data/items*.ts`, so there is no
 * database row a UI edit could write to. Edits and new questions are kept
 * here instead, layered on top of the static item bank at read time. A
 * developer who wants a change to stick permanently still hand-ports it into
 * the source files — the "Export overrides" button in the dev view produces
 * the JSON to work from.
 */

const STORAGE_KEY = "mathlingo:dev:item-overrides";

export interface ItemOverrideStore {
  /** itemId -> full replacement item (never a partial patch, to avoid stale-field bugs). */
  overrides: Record<string, Item>;
  /** Brand new items authored in the dev view, keyed by id. */
  newItems: Record<string, Item>;
}

function emptyStore(): ItemOverrideStore {
  return { overrides: {}, newItems: {} };
}

export function loadStore(): ItemOverrideStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw);
    return {
      overrides: parsed.overrides ?? {},
      newItems: parsed.newItems ?? {},
    };
  } catch {
    return emptyStore();
  }
}

function saveStore(store: ItemOverrideStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

/** Records an edit to an existing base item. */
export function saveOverride(item: Item): ItemOverrideStore {
  const store = loadStore();
  store.overrides[item.id] = item;
  saveStore(store);
  return store;
}

/** Discards a recorded edit, reverting that item back to its source-file version. */
export function clearOverride(id: string): ItemOverrideStore {
  const store = loadStore();
  delete store.overrides[id];
  saveStore(store);
  return store;
}

export function saveNewItem(item: Item): ItemOverrideStore {
  const store = loadStore();
  store.newItems[item.id] = item;
  saveStore(store);
  return store;
}

export function deleteNewItem(id: string): ItemOverrideStore {
  const store = loadStore();
  delete store.newItems[id];
  saveStore(store);
  return store;
}

/** Merges the local store on top of the base item bank for display. */
export function applyOverrides(baseItems: Item[], store: ItemOverrideStore): Item[] {
  const merged = baseItems.map((item) => store.overrides[item.id] ?? item);
  return [...merged, ...Object.values(store.newItems)];
}

/** JSON with object keys sorted, so two items compare equal regardless of key order. */
function canonical(value: unknown): string {
  return JSON.stringify(value, (_key, v) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, (v as Record<string, unknown>)[k]]))
      : v,
  );
}

/**
 * Drops local edits that have been merged: an override or new item whose
 * content is identical to the version in a published overrides file (the
 * bundled `devOverrides.json`, or the one on main). An item edited again after
 * publishing differs from the published copy and so is kept.
 */
export function pruneMerged(
  published: ItemOverrideStore[],
): { store: ItemOverrideStore; removed: number } {
  const store = loadStore();
  let removed = 0;
  const isPublished = (item: Item) => {
    const mine = canonical(item);
    return published.some((file) => {
      const theirs = file.overrides[item.id] ?? file.newItems[item.id];
      return theirs !== undefined && canonical(theirs) === mine;
    });
  };
  for (const map of [store.overrides, store.newItems]) {
    for (const [id, item] of Object.entries(map)) {
      if (isPublished(item)) {
        delete map[id];
        removed++;
      }
    }
  }
  if (removed > 0) saveStore(store);
  return { store, removed };
}

/** The subset of the store holding only the given item ids. */
export function pickFromStore(store: ItemOverrideStore, ids: Set<string>): ItemOverrideStore {
  const pick = (map: Record<string, Item>) => Object.fromEntries(Object.entries(map).filter(([id]) => ids.has(id)));
  return { overrides: pick(store.overrides), newItems: pick(store.newItems) };
}

export function hasLocalEdit(store: ItemOverrideStore, id: string): boolean {
  return id in store.overrides || id in store.newItems;
}
