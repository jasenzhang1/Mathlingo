import { useEffect, useState } from "react";
import { supabase } from "../supabase";

/** One question's answers, one vote per student (their first answer), totalled. */
export interface QuestionStats {
  /** Students who have answered it. */
  attempts: number;
  /** Of those, how many were fully right on their first answer. */
  solved: number;
}

let loading: Promise<Map<string, QuestionStats>> | null = null;

/** Loaded once per page load, from `interview_question_stats()` (migration 0019). Empty if that isn't there yet. */
function loadStats(): Promise<Map<string, QuestionStats>> {
  loading ??= (async () => {
    const out = new Map<string, QuestionStats>();
    const { data, error } = await supabase.rpc("interview_question_stats");
    if (error || !data) {
      // Retry on the next mount: the session may not have been ready yet.
      loading = null;
      return out;
    }
    for (const row of data as { question_id: string; students: number; solved: number }[]) {
      out.set(row.question_id, { attempts: Number(row.students), solved: Number(row.solved) });
    }
    return out;
  })();
  return loading;
}

/** Acceptance rates for the problem list: share of students right on their first answer. */
export function useQuestionStats(): Map<string, QuestionStats> {
  const [stats, setStats] = useState<Map<string, QuestionStats>>(new Map());
  useEffect(() => {
    let cancelled = false;
    void loadStats().then((s) => {
      if (!cancelled) setStats(s);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return stats;
}
