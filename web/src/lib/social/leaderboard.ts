import { supabase } from "../supabase";

/**
 * Leaderboards (migration 0015). Every board is computed server-side by
 * `leaderboard()`, which sees other learners' progress but returns only public
 * profile fields and one number each, and records placements as achievements.
 */

export type BoardId = "mastery" | "answered" | "improvement" | "karma" | "posts" | "analogies";
export type Period = "day" | "week" | "month" | "year" | "all";

export interface BoardDef {
  id: BoardId;
  label: string;
  /** What the number means, shown under the board title. */
  blurb: string;
  /** Unit after the value. */
  unit: string;
  /** Whether the period selector applies. */
  periodic: boolean;
  /** Whether the board is per course. */
  perCourse: boolean;
  decimals: number;
}

export const BOARDS: BoardDef[] = [
  { id: "mastery", label: "Course ranking", blurb: "Average proficiency across every lesson in the course (unattempted lessons count as 0).", unit: "/100", periodic: false, perCourse: true, decimals: 2 },
  { id: "answered", label: "Questions answered", blurb: "Graded assessment answers.", unit: "answered", periodic: true, perCourse: false, decimals: 0 },
  { id: "improvement", label: "Knowledge gained", blurb: "Net rise in proficiency, summed over every lesson — wrong answers count against it.", unit: "pts", periodic: true, perCourse: false, decimals: 2 },
  { id: "karma", label: "Karma", blurb: "Net votes other people gave your forum posts and analogies.", unit: "karma", periodic: true, perCourse: false, decimals: 0 },
  { id: "posts", label: "Forum posts", blurb: "Questions and problems posted to the forums.", unit: "posts", periodic: true, perCourse: false, decimals: 0 },
  { id: "analogies", label: "Analogies", blurb: "Analogies submitted to lesson boards.", unit: "analogies", periodic: true, perCourse: false, decimals: 0 },
];

export const PERIODS: { id: Period; label: string }[] = [
  { id: "day", label: "Today" },
  { id: "week", label: "This week" },
  { id: "month", label: "This month" },
  { id: "year", label: "This year" },
  { id: "all", label: "All time" },
];

export interface LeaderboardRow {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  value: number;
}

interface Row {
  rank: number;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  value: number;
}

export async function loadLeaderboard(input: {
  board: BoardId;
  period: Period;
  /** For the course board: the course's concept ids, and its name for achievement labels. */
  concepts?: string[];
  label?: string;
}): Promise<{ rows: LeaderboardRow[]; error: string | null }> {
  const { data, error } = await supabase.rpc("leaderboard", {
    p_board: input.board,
    p_period: input.period,
    p_concepts: input.concepts ?? null,
    p_label: input.label ?? null,
  });
  if (error) {
    return {
      rows: [],
      error: /function|schema cache/i.test(error.message)
        ? "Leaderboards aren't set up yet — run supabase/migrations/0015_social_leaderboards.sql."
        : error.message,
    };
  }
  return {
    rows: ((data as Row[]) ?? []).map((r) => ({
      rank: r.rank,
      userId: r.user_id,
      username: r.username,
      displayName: r.display_name,
      avatarUrl: r.avatar_url,
      value: r.value,
    })),
    error: null,
  };
}

export interface StoredAchievement {
  id: string;
  label: string;
  detail: string | null;
  unlockedAt: string;
}

/** A user's stored (leaderboard) achievements, newest first. Visible per their profile opt-in. */
export async function loadStoredAchievements(userId: string): Promise<StoredAchievement[]> {
  const { data } = await supabase
    .from("user_achievements")
    .select("achievement_id, label, detail, unlocked_at")
    .eq("user_id", userId)
    .order("unlocked_at", { ascending: false });
  return ((data as { achievement_id: string; label: string; detail: string | null; unlocked_at: string }[]) ?? []).map(
    (a) => ({ id: a.achievement_id, label: a.label, detail: a.detail, unlockedAt: a.unlocked_at }),
  );
}
