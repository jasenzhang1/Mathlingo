import { useSyncExternalStore } from "react";
import type { Tier } from "../billing/tiers";

/**
 * "Student view" for developers: see the site with a student's permissions.
 *
 * While it's on, `useIsDeveloper` reports false — dev buttons disappear, lesson
 * locks apply, dev pages refuse entry — and the plan can be overridden so a
 * developer can check what a free, Graded or Tutored student (with or without
 * Interview Prep) actually sees. It only changes what the client *shows*: the
 * server still enforces the developer's real plan, as it always should.
 *
 * Kept in localStorage so it survives reloads, with a tiny subscriber list so
 * every component re-renders the moment it's toggled.
 */

export interface StudentView {
  on: boolean;
  /** "actual" keeps the developer's real plan. */
  plan: "actual" | Tier;
  /** "actual" keeps the developer's real Interview Prep access. */
  interview: "actual" | "on" | "off";
}

const KEY = "mathlingo.studentView";
const OFF: StudentView = { on: false, plan: "actual", interview: "actual" };

function read(): StudentView {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...OFF, ...(JSON.parse(raw) as Partial<StudentView>) } : OFF;
  } catch {
    return OFF;
  }
}

let current: StudentView = read();
const listeners = new Set<() => void>();

export function setStudentView(next: Partial<StudentView>): void {
  current = { ...current, ...next };
  try {
    localStorage.setItem(KEY, JSON.stringify(current));
  } catch {
    // Storage blocked: the setting lasts for this page load only.
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useStudentView(): StudentView {
  return useSyncExternalStore(subscribe, () => current, () => OFF);
}
