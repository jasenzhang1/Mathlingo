/**
 * The question a learner has been shown but not yet answered, per learner and
 * lesson, so leaving (a refresh, another tab, coming back tomorrow) returns
 * them to the same question instead of a fresh draw they could reroll for.
 *
 * Only the item id and the seed its values were drawn with are stored. On
 * return the item is re-instantiated from today's pool with the same seed:
 * a templated question comes back with the same numbers, and any edit or
 * recalibration since is picked up rather than a stale copy being replayed.
 *
 * Kept in localStorage, so it holds per browser. Cleared once the question is
 * scored.
 */

export interface PendingItem {
  itemId: string;
  seed: number;
}

function key(userId: string | null, conceptId: string): string {
  return `mathlingo.pendingItem.${userId ?? "anon"}.${conceptId}`;
}

export function loadPendingItem(userId: string | null, conceptId: string): PendingItem | null {
  try {
    const raw = localStorage.getItem(key(userId, conceptId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PendingItem>;
    return typeof parsed.itemId === "string" && typeof parsed.seed === "number"
      ? { itemId: parsed.itemId, seed: parsed.seed }
      : null;
  } catch {
    return null;
  }
}

export function savePendingItem(userId: string | null, conceptId: string, pending: PendingItem): void {
  try {
    localStorage.setItem(key(userId, conceptId), JSON.stringify(pending));
  } catch {
    // Storage blocked: the question just won't survive a reload.
  }
}

export function clearPendingItem(userId: string | null, conceptId: string): void {
  try {
    localStorage.removeItem(key(userId, conceptId));
  } catch {
    // Nothing to clear.
  }
}

export function newSeed(): number {
  return Math.floor(Math.random() * 2 ** 32);
}

/** mulberry32: a tiny deterministic generator, so a seed redraws the same values. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
