import { supabase } from "../supabase";
import { blankState } from "./review";
import type { ConceptState, Grade, Item } from "./types";

/**
 * Maps between the engine's in-memory ConceptState and its database row.
 * The engine stays pure — nothing in web/src/lib/assessment/* except this file
 * knows Supabase exists — so the scheduler and IRT math remain unit-testable
 * and replayable offline.
 */

/**
 * Translates the one setup failure a user is actually likely to hit into
 * something actionable. PostgREST reports a missing table as "Could not find
 * the table 'public.x' in the schema cache", which reads like a caching bug and
 * sends people looking in the wrong place — the real cause is almost always that
 * the migration has not been run.
 */
function explainError(message: string | undefined): string | null {
  if (!message) return null;
  if (/schema cache|does not exist|relation .* does not exist/i.test(message)) {
    return "Your progress can't be saved yet — the database tables haven't been created. Run supabase/migrations/0002_proficiency.sql in the Supabase SQL Editor.";
  }
  return message;
}

interface ConceptStateRow {
  user_id: string;
  concept_id: string;
  ability_mean: number;
  ability_variance: number;
  observations: number;
  stability: number | null;
  difficulty: number | null;
  last_reviewed_at: string | null;
  reps: number;
  lapses: number;
}

function rowToState(row: ConceptStateRow): ConceptState {
  return {
    conceptId: row.concept_id,
    ability: {
      mean: row.ability_mean,
      variance: row.ability_variance,
      observations: row.observations,
    },
    memory:
      row.stability !== null && row.difficulty !== null && row.last_reviewed_at !== null
        ? {
            stability: row.stability,
            difficulty: row.difficulty,
            lastReviewedAt: new Date(row.last_reviewed_at).getTime(),
            reps: row.reps,
            lapses: row.lapses,
          }
        : undefined,
  };
}

export async function loadConceptState(
  userId: string,
  conceptId: string,
): Promise<ConceptState> {
  const { data } = await supabase
    .from("concept_states")
    .select("*")
    .eq("user_id", userId)
    .eq("concept_id", conceptId)
    .maybeSingle();

  return data ? rowToState(data as ConceptStateRow) : blankState(conceptId);
}

/** Upserts one or more concept states — the review may have touched prerequisites too. */
export async function saveConceptStates(
  userId: string,
  states: ConceptState[],
): Promise<{ error: string | null }> {
  if (states.length === 0) return { error: null };

  const rows = states.map((state) => ({
    user_id: userId,
    concept_id: state.conceptId,
    ability_mean: state.ability.mean,
    ability_variance: state.ability.variance,
    observations: state.ability.observations,
    stability: state.memory?.stability ?? null,
    difficulty: state.memory?.difficulty ?? null,
    last_reviewed_at: state.memory
      ? new Date(state.memory.lastReviewedAt).toISOString()
      : null,
    reps: state.memory?.reps ?? 0,
    lapses: state.memory?.lapses ?? 0,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("concept_states")
    .upsert(rows, { onConflict: "user_id,concept_id" });
  return { error: explainError(error?.message) };
}

/**
 * Appends to the review log. This table is what the framework's batch re-fit
 * and item calibration replay, so it records the item's parameters *at grading
 * time* rather than trusting today's values to still be current later.
 */
export async function logResponse(input: {
  userId: string;
  item: Item;
  answer: string;
  grade: Grade;
}): Promise<{ error: string | null }> {
  const { error } = await supabase.from("assessment_responses").insert({
    user_id: input.userId,
    concept_id: input.item.conceptId,
    item_id: input.item.id,
    answer: input.answer.slice(0, 10000),
    score: input.grade.score,
    latency_seconds: input.grade.latencySeconds,
    channel: input.grade.channel,
    adjudicator: input.grade.adjudicator,
    item_difficulty: input.item.difficulty,
    item_discrimination: input.item.discrimination,
    feedback: input.grade.feedback ?? null,
    // Per-element credit, so a later rubric change can be replayed over the log
    // rather than re-graded through the model.
    breakdown: input.grade.breakdown ?? null,
    transcript: input.grade.transcript ?? null,
    transcript_confidence: input.grade.transcriptConfidence ?? null,
    confidence: input.grade.confidence,
  });
  return { error: explainError(error?.message) };
}

/** Item ids this user has already seen, newest first — feeds the selector's recency penalty. */
export async function loadRecentItemIds(
  userId: string,
  conceptId: string,
  limit = 10,
): Promise<string[]> {
  const { data } = await supabase
    .from("assessment_responses")
    .select("item_id")
    .eq("user_id", userId)
    .eq("concept_id", conceptId)
    .order("created_at", { ascending: false })
    .limit(limit);

  return ((data as { item_id: string }[]) ?? []).map((r) => r.item_id);
}
