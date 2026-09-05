import type { Lesson } from "../types";
import { pythonUnits } from "./units";
import { unit1Lessons } from "./unit1-variables-types";
import { unit2Lessons } from "./unit2-operators";
import { unit3Lessons } from "./unit3-lists";
import { unit4Lessons } from "./unit4-collections";

export { pythonUnits };

export const pythonLessons: Lesson[] = [
  ...unit1Lessons,
  ...unit2Lessons,
  ...unit3Lessons,
  ...unit4Lessons,
];

export function lessonsForUnit(unitId: string): Lesson[] {
  return pythonLessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}
