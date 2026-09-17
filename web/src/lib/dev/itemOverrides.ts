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

export function hasLocalEdit(store: ItemOverrideStore, id: string): boolean {
  return id in store.overrides || id in store.newItems;
}
