import { useCallback, useEffect, useState } from "react";
import type { Domain } from "../data/concepts";
import { useAuth } from "./auth/useAuth";
import { isCourse } from "./courses";
import { supabase } from "./supabase";

/**
 * Which courses a learner has enrolled in (supabase/migrations/0012).
 *
 * Signed-out visitors can pick courses too; their picks live in this browser
 * and move to their account the first time they sign in (if the account has
 * none yet), so choosing courses before signing up isn't wasted.
 */

const GUEST_KEY = "mathlingo:guest-courses";

function loadGuest(): Domain[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(GUEST_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter(isCourse) : [];
  } catch {
    return [];
  }
}

function saveGuest(courses: Domain[]) {
  try {
    if (courses.length) localStorage.setItem(GUEST_KEY, JSON.stringify(courses));
    else localStorage.removeItem(GUEST_KEY);
  } catch {
    // Storage blocked: the picks just won't survive a reload.
  }
}

async function loadEnrollments(userId: string): Promise<Domain[]> {
  const { data } = await supabase
    .from("course_enrollments")
    .select("course, enrolled_at")
    .eq("user_id", userId)
    .order("enrolled_at", { ascending: true });
  return ((data as { course: string }[] | null) ?? []).map((r) => r.course).filter(isCourse);
}

/** Replaces the user's enrolments with `courses`, writing only what changed. Order is kept by enrolment time. */
async function saveEnrollments(userId: string, courses: Domain[], previous: Domain[]): Promise<string | null> {
  const removed = previous.filter((c) => !courses.includes(c));
  const added = courses.filter((c) => !previous.includes(c));
  if (removed.length) {
    const { error } = await supabase.from("course_enrollments").delete().eq("user_id", userId).in("course", removed);
    if (error) return error.message;
  }
  if (added.length) {
    const now = Date.now();
    const { error } = await supabase
      .from("course_enrollments")
      .insert(added.map((course, i) => ({ user_id: userId, course, enrolled_at: new Date(now + i).toISOString() })));
    if (error) return /does not exist|schema cache/i.test(error.message) ? "Enrolment isn't set up on the database yet — run migration 0012_enrollments.sql." : error.message;
  }
  return null;
}

/** Enrolment counts per course, for everyone to see. Missing function reads as no counts. */
export async function loadEnrollmentCounts(): Promise<Record<string, number>> {
  const { data } = await supabase.rpc("course_enrollment_counts");
  const out: Record<string, number> = {};
  for (const row of (data as { course: string; enrolled: number }[] | null) ?? []) out[row.course] = Number(row.enrolled);
  return out;
}

export function useEnrollments() {
  const { user, loading: authLoading } = useAuth();
  const [courses, setCourses] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;
    void (async () => {
      if (!user) {
        if (!cancelled) {
          setCourses(loadGuest());
          setLoading(false);
        }
        return;
      }
      let mine = await loadEnrollments(user.id);
      const guest = loadGuest();
      if (mine.length === 0 && guest.length > 0 && !(await saveEnrollments(user.id, guest, []))) {
        mine = guest;
        saveGuest([]);
      }
      if (!cancelled) {
        setCourses(mine);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  /** Saves the selection (to the account, or this browser when signed out). */
  const save = useCallback(
    async (next: Domain[]): Promise<string | null> => {
      if (!user) {
        saveGuest(next);
        setCourses(next);
        return null;
      }
      const error = await saveEnrollments(user.id, next, courses);
      if (!error) setCourses(next);
      return error;
    },
    [user, courses],
  );

  return { courses, loading: loading || authLoading, save, signedIn: Boolean(user) };
}
