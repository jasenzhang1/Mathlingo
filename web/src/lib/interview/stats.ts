import { useEffect, useState } from "react";
import { supabase } from "../supabase";

/** Every candidate's answers to one question, totalled. */
export interface QuestionStats {
  attempts: number;
  /** Answers graded fully correct. */
  solved: number;
}

let loading: Promise<Map<string, QuestionStats>> | null = null;

/** Loaded once per page load, from `interview_question_stats()` (migration 0017). Empty if that isn't there yet. */
function loadStats(): Promise<Map<string, QuestionStats>> {
  loading ??= (async () => {
    const out = new Map<string, QuestionStats>();
    const { data, error } = await supabase.rpc("interview_question_stats");
    if (error || !data) {
      // Retry on the next mount: the session may not have been ready yet.
      loading = null;
      return out;
    }
    for (const row of data as { question_id: string; attempts: number; solved: number }[]) {
      out.set(row.question_id, { attempts: Number(row.attempts), solved: Number(row.solved) });
    }
    return out;
  })();
  return loading;
}

/** Acceptance rates for the problem list: share of all answers to a question that were correct. */
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
