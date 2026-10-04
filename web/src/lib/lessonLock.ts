import { conceptById, type Concept } from "../data/concepts";
import { UNLOCK_THRESHOLD } from "./assessment/exp";

/**
 * A lesson opens only once every one of its direct prerequisites has reached
 * `UNLOCK_THRESHOLD` (65). Read against the un-decayed ceiling, as the unlock
 * gate always has been: a prerequisite that has merely faded since it was
 * proven doesn't relock what it opened. Direct prerequisites are enough — each
 * of them was itself gated on its own prerequisites.
 */
export interface UnmetPrerequisite {
  concept: Concept;
  ceiling: number;
}

export function unmetPrerequisites(
  conceptId: string,
  ceiling: Map<string, number>,
): UnmetPrerequisite[] {
  const concept = conceptById.get(conceptId);
  if (!concept) return [];
  return concept.prerequisites
    .map((id) => conceptById.get(id))
    .filter((c): c is Concept => c !== undefined)
    .map((c) => ({ concept: c, ceiling: ceiling.get(c.id) ?? 0 }))
    .filter((p) => p.ceiling < UNLOCK_THRESHOLD);
}
