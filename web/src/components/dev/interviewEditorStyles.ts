import { families, sections } from "../../lib/interview/bank";

/** Class names and option lists shared by the interview editors (`/dev/bundles` and the in-interview dialog). */

export const btn = "font-body rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] hover:border-[var(--accent)] disabled:opacity-40";
export const field = "font-body mt-1 block w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-sm font-normal normal-case tracking-normal text-[var(--ink)]";
export const fieldLabel = "font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]";
export const freeBadge = "rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--accent)]";
export const lockedBadge = "rounded-full bg-[var(--paper)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--ink-soft)]";

export const sortedSections = [...sections].sort((a, b) => a.number - b.number || a.subtopic.localeCompare(b.subtopic));
export const sortedFamilies = [...families].sort((a, b) => a.name.localeCompare(b.name));
