import { UNLOCK_THRESHOLD, expFor } from "./assessment/exp";
import type { ConceptState } from "./assessment/types";
import { chapters } from "./learningOrder";

/**
 * Achievements shown on a profile — all derived from the same proficiency
 * data the concept map already computes, rather than a separate tracked
 * event log. That keeps them honest (they can't drift from what the bars
 * show) at the cost of being purely retrospective: nothing here can name a
 * streak or a date, only "how much is currently cleared".
 */
export interface Achievement {
  id: string;
  label: string;
  description: string;
}

const UNLOCK_MILESTONES = [1, 10, 25, 50, 100, 200];

export function computeAchievements(
  states: ConceptState[],
  now: number,
): Achievement[] {
  // Ceiling, not the decayed value — an achievement for having mastered
  // something shouldn't flicker off because it hasn't been reviewed lately.
  const ceilingById = new Map(
    states.map((s) => [s.conceptId, expFor(s, now).ceiling]),
  );
  const unlockedCount = [...ceilingById.values()].filter(
    (c) => c >= UNLOCK_THRESHOLD,
  ).length;

  const achievements: Achievement[] = [];

  for (const milestone of UNLOCK_MILESTONES) {
    if (unlockedCount < milestone) break;
    achievements.push({
      id: `unlocked-${milestone}`,
      label:
        milestone === 1 ? "First unlock" : `${milestone} concepts unlocked`,
      description:
        milestone === 1
          ? "Cleared your first concept past 65 proficiency."
          : `Cleared ${milestone} concepts past 65 proficiency.`,
    });
  }

  for (const chapter of chapters) {
    if (chapter.concepts.length === 0) continue;
    const allCleared = chapter.concepts.every(
      (c) => (ceilingById.get(c.id) ?? 0) >= UNLOCK_THRESHOLD,
    );
    if (allCleared) {
      achievements.push({
        id: `subject-${chapter.domain}`,
        label: `${chapter.label} mastered`,
        description: `Cleared every concept in ${chapter.label}.`,
      });
    }
  }

  return achievements;
}
