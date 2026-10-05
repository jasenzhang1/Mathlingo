import { Link } from "react-router-dom";
import { domainMeta } from "../data/concepts";
import type { CourseAccess } from "../lib/lessonAccess";

/**
 * Key for the map and list: which lessons the learner can make progress on
 * (assessment open) and which are view-only (slides and wiki, assessment
 * locked until the prerequisites reach the unlock threshold) — plus, when it
 * applies, why only some courses are showing.
 */
export function ProgressLegend({ access }: { access: CourseAccess }) {
  return (
    <div className="font-body flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--ink-soft)]">
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
        Can make progress
      </span>
      <span className="flex items-center gap-1.5 opacity-70">
        <span aria-hidden="true">🔒</span>
        View only: slides and wiki, assessment locked until its prerequisites reach 65
      </span>
      {access.ready && !access.signedIn && (
        <span>
          Signed out: showing Linear Algebra only, and progress isn’t saved.{" "}
          <Link to="/signup" className="font-medium text-[var(--accent)] hover:underline">
            Sign up
          </Link>
        </span>
      )}
      {access.ready && access.signedIn && !access.allCourses && (
        <span>
          {access.freeCourse
            ? `Free plan: ${domainMeta[access.freeCourse].label} is your course.`
            : "Free plan: one course of your choice."}{" "}
          <Link to="/pricing" className="font-medium text-[var(--accent)] hover:underline">
            Graded unlocks every course
          </Link>
        </span>
      )}
    </div>
  );
}
