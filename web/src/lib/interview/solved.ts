import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { supabase } from "../supabase";

/**
 * Which questions the signed-in candidate has solved: answered fully correct
 * (correctness 1) at least once, in a mock interview or in training.
 *
 * Read from `interview_attempts` and mirrored to localStorage, so a question
 * answered while the insert failed still shows as solved in this browser.
 */

const localKey = (userId: string) => `mathlingo:interview-solved:${userId}`;

function readLocal(userId: string): Set<string> {
  try {
    const parsed = JSON.parse(localStorage.getItem(localKey(userId)) ?? "[]");
    return new Set(Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}

function writeLocal(userId: string, solved: Set<string>) {
  try {
    localStorage.setItem(localKey(userId), JSON.stringify([...solved]));
  } catch {
    // Blocked storage: the attempts table is still authoritative.
  }
}

/** Called when an answer is recorded as fully correct. */
export function markSolved(userId: string, questionId: string) {
  const solved = readLocal(userId);
  if (solved.has(questionId)) return;
  solved.add(questionId);
  writeLocal(userId, solved);
}

export function useSolvedQuestions(): Set<string> {
  const { user, loading: authLoading } = useAuth();
  const [solved, setSolved] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setSolved(new Set());
      return;
    }
    let cancelled = false;
    setSolved(readLocal(user.id));
    void (async () => {
      const { data, error } = await supabase
        .from("interview_attempts")
        .select("question_id")
        .eq("user_id", user.id)
        .gte("correctness", 1);
      if (cancelled || error || !data) return;
      const merged = readLocal(user.id);
      for (const row of data as { question_id: string }[]) merged.add(row.question_id);
      writeLocal(user.id, merged);
      setSolved(merged);
    })();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return solved;
}
