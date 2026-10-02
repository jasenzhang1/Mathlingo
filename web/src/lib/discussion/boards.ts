import { conceptById, domainMeta, type Domain } from "../../data/concepts";
import interviewSectionsJson from "../../data/interview/sections.json";
import { getSchoolNameForDomain } from "../../data/eduDomains";
import { chapters } from "../learningOrder";

/**
 * Discussion boards. A post's board is its `concept_id` (see
 * supabase/migrations/0011_forums.sql):
 *
 *   <lesson-id>                    a lesson's thread
 *   chapter:<course>:<section-id>  a chapter-wide thread
 *   course:<course>                a course-wide thread
 *   interview / interview:<topic>  interview prep (Interview Prep members only)
 *   school:<email-domain>          a school forum
 *
 * The Forums tab shows these as tagged posts in one feed; a lesson post is
 * tagged with its course and chapter too, so filtering by a course finds it.
 */

export type Space = "learning" | "interview" | "school";

/** One step of a post's tag path, e.g. Probability › Random Variables › Bayes' Rule. */
export interface Tag {
  label: string;
  /** Forums search params that filter to this tag. */
  params: Record<string, string>;
}

export interface BoardInfo {
  space: Space;
  tags: Tag[];
  /** Where the post's own thread lives for its "back" link. */
  backHref: string;
  backLabel: string;
}

const sectionOf = new Map<string, { domain: Domain; sectionId: string; sectionLabel: string }>();
for (const ch of chapters) {
  for (const s of ch.sections) for (const c of s.concepts) sectionOf.set(c.id, { domain: ch.domain, sectionId: s.id, sectionLabel: s.label });
}

const courseLabel = (domain: string) => domainMeta[domain as Domain]?.label ?? domain;
const chapterLabel = (domain: string, sectionId: string) =>
  chapters.find((c) => c.domain === domain)?.sections.find((s) => s.id === sectionId)?.label ?? sectionId;

/** Interview topics (Probability, Combinatorics, …) — the interview half's tags. */
export const interviewTopics: { slug: string; label: string }[] = [
  ...new Set((interviewSectionsJson as { topic: string }[]).map((s) => s.topic)),
]
  .sort((a, b) => a.localeCompare(b))
  .map((label) => ({ slug: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), label }));

const topicLabel = (slug: string) => interviewTopics.find((t) => t.slug === slug)?.label ?? slug;

export function isInterviewBoard(boardId: string): boolean {
  return boardId === "interview" || boardId.startsWith("interview:");
}

export function boardInfo(boardId: string): BoardInfo {
  if (isInterviewBoard(boardId)) {
    const topic = boardId.slice("interview:".length);
    return {
      space: "interview",
      tags: [
        { label: "Interview Prep", params: { space: "interview" } },
        ...(topic ? [{ label: topicLabel(topic), params: { space: "interview", topic } }] : []),
      ],
      backHref: "/forums?space=interview",
      backLabel: "Back to Interview Prep forum",
    };
  }
  if (boardId.startsWith("school:")) {
    const domain = boardId.slice("school:".length);
    return {
      space: "school",
      tags: [{ label: getSchoolNameForDomain(domain), params: { space: "school" } }],
      backHref: "/forums?space=school",
      backLabel: "Back to your school forum",
    };
  }
  if (boardId.startsWith("course:")) {
    const course = boardId.slice("course:".length);
    return {
      space: "learning",
      tags: [{ label: courseLabel(course), params: { course } }],
      backHref: `/forums?course=${encodeURIComponent(course)}`,
      backLabel: `Back to ${courseLabel(course)}`,
    };
  }
  if (boardId.startsWith("chapter:")) {
    const [course, sectionId = ""] = boardId.slice("chapter:".length).split(":");
    return {
      space: "learning",
      tags: [
        { label: courseLabel(course), params: { course } },
        { label: chapterLabel(course, sectionId), params: { course, chapter: sectionId } },
      ],
      backHref: `/forums?course=${encodeURIComponent(course)}&chapter=${encodeURIComponent(sectionId)}`,
      backLabel: `Back to ${chapterLabel(course, sectionId)}`,
    };
  }
  // A lesson.
  const concept = conceptById.get(boardId);
  const where = sectionOf.get(boardId);
  return {
    space: "learning",
    tags: [
      ...(where
        ? [
            { label: courseLabel(where.domain), params: { course: where.domain } },
            { label: where.sectionLabel, params: { course: where.domain, chapter: where.sectionId } },
          ]
        : []),
      {
        label: concept?.title ?? boardId,
        params: where ? { course: where.domain, chapter: where.sectionId, lesson: boardId } : { lesson: boardId },
      },
    ],
    backHref: `/concepts/${boardId}?tab=discussion`,
    backLabel: concept ? `Back to ${concept.title}` : "Back to the discussion",
  };
}

/** What a forum feed is filtered to — read from, and written to, the URL. */
export interface ForumScope {
  space: Space;
  course?: string;
  chapter?: string;
  lesson?: string;
  topic?: string;
}

export function scopeFromParams(params: URLSearchParams): ForumScope {
  const space = params.get("space");
  if (space === "interview") return { space, topic: params.get("topic") ?? undefined };
  if (space === "school") return { space };
  return {
    space: "learning",
    course: params.get("course") ?? undefined,
    chapter: params.get("chapter") ?? undefined,
    lesson: params.get("lesson") ?? undefined,
  };
}

/** The board a new post in this scope goes to, by default. */
export function defaultBoard(scope: ForumScope, school: string | null): string | null {
  if (scope.space === "interview") return scope.topic ? `interview:${scope.topic}` : "interview";
  if (scope.space === "school") return school ? `school:${school}` : null;
  if (scope.lesson) return scope.lesson;
  if (scope.course && scope.chapter) return `chapter:${scope.course}:${scope.chapter}`;
  if (scope.course) return `course:${scope.course}`;
  return null;
}

/** Lesson ids under a course (optionally one chapter), for matching their threads in a feed. */
export function lessonIds(course: string, chapter?: string): string[] {
  const ch = chapters.find((c) => c.domain === course);
  if (!ch) return [];
  const sections = chapter ? ch.sections.filter((s) => s.id === chapter) : ch.sections;
  return sections.flatMap((s) => s.concepts.map((c) => c.id));
}

export { chapters as courses, courseLabel, chapterLabel, topicLabel };
