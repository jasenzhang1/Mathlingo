import type { Bundle } from "./types";

/**
 * Unpublished bundle edits from `/dev/bundles`, kept in this browser.
 *
 * Unlike the learning-side item overrides, this stores the *whole* bundle list
 * rather than a patch: bundles are small, reordering is most of what gets
 * edited, and a full list is exactly what publishing writes back to
 * `web/src/data/interview/bundles.json`.
 */

const STORAGE_KEY = "mathlingo:dev:interview-bundles";

export function loadBundleDraft(): Bundle[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Bundle[]) : null;
  } catch {
    return null;
  }
}

export function saveBundleDraft(bundles: Bundle[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bundles));
  } catch {
    // Storage full or blocked: edits simply won't survive a reload.
  }
}

export function clearBundleDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clear.
  }
}
