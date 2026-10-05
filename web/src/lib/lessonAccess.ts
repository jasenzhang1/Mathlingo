import { conceptById, type Domain } from "../data/concepts";
import { useAuth } from "./auth/useAuth";
import { useSubscription } from "./billing/useSubscription";
import { useIsDeveloper } from "./dev/devAuth";
import { useEnrollments } from "./enrollment";
import { unmetPrerequisites, type UnmetPrerequisite } from "./lessonLock";
import { useProficiency } from "./useProficiency";

/**
 * Who may do what with a lesson. One place, so the lesson page, the map, the
 * list, search and the course picker can't drift apart.
 *
 * Which courses are visible:
 * - Signed out: only PUBLIC_COURSES.
 * - Free plan: the one course they chose (their first enrolment). Until they
 *   choose, the public course(s). The rest need the Graded plan or higher.
 * - Graded and above, and developers: every course.
 *
 * Within a visible course, reading is open — any lesson's slides, wiki and the
 * rest — while making progress is gated: a lesson's assessment opens once every
 * direct prerequisite reaches the unlock threshold (see lessonLock). Signed-out
 * visitors live under the same rule with nothing saved, so for them only
 * lessons without prerequisites can be assessed.
 *
 * Developers bypass all of it; "Student view" turns them back into students,
 * on whichever plan it previews.
 *
 * All of this is client-side: lesson content ships in the bundle, so these are
 * product rules, not a security boundary.
 */
export const PUBLIC_COURSES: readonly Domain[] = ["linear-algebra"];

export interface CourseAccess {
  /** False until sign-in, plan and enrolments have all loaded. */
  ready: boolean;
  signedIn: boolean;
  /** Graded plan or above (or a developer): every course is open. */
  allCourses: boolean;
  /** A free account's one course, once chosen. */
  freeCourse: Domain | undefined;
  canViewCourse: (domain: Domain) => boolean;
}

export function useCourseAccess(): CourseAccess {
  const { user, loading: authLoading } = useAuth();
  const isDeveloper = useIsDeveloper();
  const { subscription, loading: subLoading } = useSubscription();
  const { courses: enrolled, loading: enrollLoading } = useEnrollments();

  const signedIn = !!user;
  const allCourses = isDeveloper || (signedIn && subscription.tier !== "free");
  const freeCourse = signedIn && !allCourses ? enrolled[0] : undefined;

  return {
    ready: !authLoading && !subLoading && !enrollLoading,
    signedIn,
    allCourses,
    freeCourse,
    canViewCourse: (domain) =>
      allCourses || (freeCourse ? domain === freeCourse : PUBLIC_COURSES.includes(domain)),
  };
}

export interface LessonAccess {
  /** False until access and proficiency have loaded; `canAssess` is not final before then. */
  ready: boolean;
  courses: CourseAccess;
  /** Whether the lesson page can be opened (its course is visible). */
  canView: (conceptId: string) => boolean;
  /** Whether the lesson's assessment is open — i.e. progress can be made. */
  canAssess: (conceptId: string) => boolean;
  /** Prerequisites still below the threshold; empty when the assessment is open. */
  unmet: (conceptId: string) => UnmetPrerequisite[];
}

/**
 * The rules over data the caller already has — for components that load
 * proficiency themselves (the map, the list), so it isn't fetched twice.
 */
export function buildLessonAccess({
  courses,
  isDeveloper,
  ceiling,
  proficiencyReady,
}: {
  courses: CourseAccess;
  isDeveloper: boolean;
  ceiling: Map<string, number>;
  proficiencyReady: boolean;
}): LessonAccess {
  const unmet = (conceptId: string) => (isDeveloper ? [] : unmetPrerequisites(conceptId, ceiling));

  return {
    ready: courses.ready && proficiencyReady,
    courses,
    canView: (conceptId) => {
      const concept = conceptById.get(conceptId);
      return !!concept && courses.canViewCourse(concept.domain);
    },
    canAssess: (conceptId) => unmet(conceptId).length === 0,
    unmet,
  };
}

export function useLessonAccess(): LessonAccess {
  const courses = useCourseAccess();
  const isDeveloper = useIsDeveloper();
  const { ceiling, loading } = useProficiency();
  return buildLessonAccess({ courses, isDeveloper, ceiling, proficiencyReady: !loading });
}
