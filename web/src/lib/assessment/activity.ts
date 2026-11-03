import { supabase } from "../supabase";
import { localDayKey } from "../interview/problemStats";

/**
 * Lesson answers per local day, for the daily goal and streak. Read-only: it
 * counts rows of the answer log and never writes, so it cannot touch saved
 * progress. See gamification.md for why a goal and a streak.
 */

/** Answers a day that count as meeting the daily goal. */
export const DAILY_GOAL = 10;

/** How far back to count; long enough for any realistic current streak to show. */
const LOOKBACK_DAYS = 120;
const PAGE = 1000;

export async function loadLessonActivity(userId: string): Promise<Map<string, number>> {
  const since = new Date();
  since.setDate(since.getDate() - LOOKBACK_DAYS);
  const days = new Map<string, number>();
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("assessment_responses")
      .select("created_at")
      .eq("user_id", userId)
      .gte("created_at", since.toISOString())
      .order("created_at")
      .range(from, from + PAGE - 1);
    if (error || !data) break;
    for (const row of data as { created_at: string }[]) {
      const day = localDayKey(new Date(row.created_at));
      days.set(day, (days.get(day) ?? 0) + 1);
    }
    if (data.length < PAGE) break;
  }
  return days;
}

/**
 * Consecutive days with at least one answer, ending today — or yesterday, when
 * nothing has been answered yet today (the streak is still alive until midnight).
 */
export function currentStreak(days: Map<string, number>, today = new Date()): number {
  const cursor = new Date(today);
  if (!days.get(localDayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.get(localDayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
