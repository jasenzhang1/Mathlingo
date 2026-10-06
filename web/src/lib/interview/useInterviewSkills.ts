import { useCallback, useEffect, useRef, useState } from "react";
import { loadCalibrations, recordCalibration } from "../assessment/itemCalibration";
import { PRIOR_ABILITY } from "../assessment/mastery";
import type { Ability } from "../assessment/types";
import { useAuth } from "../auth/useAuth";
import { supabase } from "../supabase";
import { questions } from "./bank";
import {
  authoredDifficultyLogit,
  DISCRIMINATION,
  effectiveScore,
  interviewCalibrations,
  updateSkill,
} from "./scoring";
import type { InterviewQuestion } from "./types";

/**
 * The candidate's interview skill bars, one per section.
 *
 * Stored in `interview_skills` (migration 0008), mirrored to localStorage so
 * the bars render instantly and survive the table not existing yet. Nothing
 * here touches `concept_states`: interview practice and lesson proficiency are
 * deliberately independent.
 */

interface SkillRow {
  section_id: string;
  ability_mean: number;
  ability_variance: number;
  observations: number;
}

export type AttemptMode = "mock" | "train" | "problems";

export interface Attempt {
  question: InterviewQuestion;
  /** 1 correct, 0.5 partly, 0 missed or gave up. */
  correctness: number;
  seconds: number;
  mode: AttemptMode;
  /**
   * The technique being practised, whose bar moves. Defaults to the question's
   * main technique; training passes the one being drilled, which may be one of
   * the question's `otherSections`.
   */
  section?: string;
}

const localKey = (userId: string) => `mathlingo:interview-skills:${userId}`;

function readLocal(userId: string): Map<string, Ability> {
  try {
    const raw = localStorage.getItem(localKey(userId));
    return new Map(raw ? (Object.entries(JSON.parse(raw)) as [string, Ability][]) : []);
  } catch {
    return new Map();
  }
}

function writeLocal(userId: string, skills: Map<string, Ability>) {
  try {
    localStorage.setItem(localKey(userId), JSON.stringify(Object.fromEntries(skills)));
  } catch {
    // Blocked storage: the database copy is still authoritative.
  }
}

/** Loaded once per page load; every question's live difficulty. */
let calibrationsLoading: Promise<void> | null = null;
function ensureCalibrations(): Promise<void> {
  calibrationsLoading ??= loadCalibrations(
    "interview",
    questions.map((q) => q.id),
  ).then((map) => {
    for (const [id, c] of map) interviewCalibrations.set(id, c);
  });
  return calibrationsLoading;
}

export function useInterviewSkills() {
  const { user, loading: authLoading } = useAuth();
  const [skills, setSkills] = useState<Map<string, Ability>>(new Map());
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);
  // `record` is called from event handlers; read the latest map, not the render's.
  const current = useRef(skills);
  useEffect(() => {
    current.current = skills;
  }, [skills]);

  useEffect(() => {
    void ensureCalibrations();
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setSkills(new Map());
      setLoading(false);
      return;
    }
    let cancelled = false;
    setSkills(readLocal(user.id));
    void (async () => {
      const { data, error } = await supabase
        .from("interview_skills")
        .select("section_id, ability_mean, ability_variance, observations")
        .eq("user_id", user.id);
      if (cancelled) return;
      if (!error && data) {
        const merged = readLocal(user.id);
        for (const row of data as SkillRow[]) {
          const local = merged.get(row.section_id);
          // Whichever copy has seen more answers wins — a save that failed
          // earlier leaves the local copy ahead, and it should not be lost.
          if (!local || row.observations >= local.observations) {
            merged.set(row.section_id, {
              mean: row.ability_mean,
              variance: row.ability_variance,
              observations: row.observations,
            });
          }
        }
        setSkills(merged);
        writeLocal(user.id, merged);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  /** Scores one answer, moves its section's bar, and returns the bar before and after. */
  const record = useCallback(
    (attempt: Attempt): { before?: Ability; after?: Ability; score: number } => {
      const { question: q, correctness, seconds, mode } = attempt;
      const score = effectiveScore(q, correctness, seconds);
      const sectionId = attempt.section ?? q.section;
      if (!user || !sectionId) return { score };

      const before = current.current.get(sectionId);
      const after = updateSkill(before, q, score);
      const next = new Map(current.current);
      next.set(sectionId, after);
      current.current = next;
      setSkills(next);
      writeLocal(user.id, next);

      void (async () => {
        const { error } = await supabase.from("interview_skills").upsert(
          {
            user_id: user.id,
            section_id: sectionId,
            ability_mean: after.mean,
            ability_variance: after.variance,
            observations: after.observations,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,section_id" },
        );
        setSaveError(
          !error
            ? null
            : /schema cache|does not exist/i.test(error.message)
              ? "Interview progress is only saved in this browser until supabase/migrations/0008_interview.sql is run."
              : /fetch|network/i.test(error.message)
                ? "Couldn't reach the server, so this answer is only saved in this browser for now."
                : error.message,
        );
        // Push back on the question: this answer is one vote on how hard it
        // really is, weighted by the candidate's skill and how sure we are of
        // it. Judged against who they were before answering.
        const calibrated = await recordCalibration({
          bank: "interview",
          itemId: q.id,
          authoredDifficulty: authoredDifficultyLogit(q),
          discrimination: DISCRIMINATION,
          score,
          learner: before ?? PRIOR_ABILITY,
        });
        if (calibrated) interviewCalibrations.set(q.id, calibrated);
        // The raw log, for re-fitting question difficulty in batch. Best effort.
        await supabase.from("interview_attempts").insert({
          user_id: user.id,
          question_id: q.id,
          section_id: sectionId,
          correctness,
          seconds: Math.round(seconds),
          score,
          mode,
        });
      })();

      return { before, after, score };
    },
    [user],
  );

  return { skills, loading: loading || authLoading, record, saveError };
}
