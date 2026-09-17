import { useMemo } from "react";
import type { Domain } from "../data/concepts";
import { chapters, type Chapter } from "./learningOrder";
import { useProficiency } from "./useProficiency";

/** Mastery a learner needs in a topic before they can submit their own questions on it. */
export const EXPERT_THRESHOLD = 90;

export interface TopicExpertise {
  chapter: Chapter;
  value: number;
  isExpert: boolean;
}

/**
 * Average proficiency per chapter (the same "topic" the Topic Mastery grid
 * shows), reduced to which ones the signed-in user has actually mastered.
 * Signed-out visitors and learners still working toward mastery simply get
 * an empty `expert` list — asking their own questions stays locked until the
 * bar says they've earned it.
 */
export function useTopicExpertise(): {
  topics: TopicExpertise[];
  expert: TopicExpertise[];
  byDomain: Map<Domain, TopicExpertise>;
  loading: boolean;
} {
  const { proficiency, loading } = useProficiency();

  const topics = useMemo(
    () =>
      chapters.map((chapter) => {
        const value =
          chapter.concepts.length === 0
            ? 0
            : chapter.concepts.reduce(
                (sum, c) => sum + (proficiency.get(c.id) ?? 0),
                0,
              ) / chapter.concepts.length;
        return { chapter, value, isExpert: value >= EXPERT_THRESHOLD };
      }),
    [proficiency],
  );

  const expert = useMemo(() => topics.filter((t) => t.isExpert), [topics]);
  const byDomain = useMemo(
    () => new Map(topics.map((t) => [t.chapter.domain, t])),
    [topics],
  );

  return { topics, expert, byDomain, loading };
}
