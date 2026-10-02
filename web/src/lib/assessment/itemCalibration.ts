import { supabase } from "../supabase";
import type { ItemBelief } from "./mastery";
import type { Ability, Item } from "./types";

/**
 * The shared, crowd-calibrated difficulty of every question (migration 0013).
 *
 * Authored difficulties ship in the source files; the live value is in
 * `item_calibration` and is moved by `calibrate_item` after each graded
 * answer. Everything here is best effort: if the table isn't there yet, or the
 * network drops, questions are served at their authored difficulty and the
 * answer simply doesn't vote.
 */

export type CalibrationBank = "lesson" | "interview";

interface CalibrationRow {
  item_id: string;
  difficulty: number;
  variance: number;
  exposures: number;
  authored_difficulty: number;
}

export interface Calibration extends ItemBelief {
  authoredDifficulty: number;
}

/** PostgREST puts ids in the URL, so look them up a few hundred at a time. */
const CHUNK = 200;

export async function loadCalibrations(
  bank: CalibrationBank,
  itemIds: string[],
): Promise<Map<string, Calibration>> {
  const out = new Map<string, Calibration>();
  const ids = [...new Set(itemIds)];
  for (let i = 0; i < ids.length; i += CHUNK) {
    const { data, error } = await supabase
      .from("item_calibration")
      .select("item_id, difficulty, variance, exposures, authored_difficulty")
      .eq("bank", bank)
      .in("item_id", ids.slice(i, i + CHUNK));
    if (error || !data) return out;
    for (const row of data as CalibrationRow[]) {
      out.set(row.item_id, {
        difficulty: row.difficulty,
        variance: row.variance,
        exposures: row.exposures,
        authoredDifficulty: row.authored_difficulty,
      });
    }
  }
  return out;
}

/** The item as it should be served: at its calibrated difficulty, if it has one. */
export function withCalibration(item: Item, calibration: Calibration | undefined): Item {
  if (!calibration) return item;
  return {
    ...item,
    difficulty: calibration.difficulty,
    calibration: {
      variance: calibration.variance,
      exposures: calibration.exposures,
      authoredDifficulty: calibration.authoredDifficulty,
    },
  };
}

/**
 * Casts one learner's answer as a vote on the question's difficulty and
 * returns the question's new belief, or null if it couldn't be recorded.
 * `learner` is their ability *before* this answer — the item is judged
 * against who they were when they saw it.
 */
export async function recordCalibration(input: {
  bank: CalibrationBank;
  itemId: string;
  authoredDifficulty: number;
  discrimination: number;
  score: number;
  learner: Ability;
}): Promise<Calibration | null> {
  const { data, error } = await supabase.rpc("calibrate_item", {
    p_bank: input.bank,
    p_item_id: input.itemId,
    p_authored_difficulty: input.authoredDifficulty,
    p_discrimination: input.discrimination,
    p_score: input.score,
    p_ability_mean: input.learner.mean,
    p_ability_variance: input.learner.variance,
  });
  const row = (data as { difficulty: number; variance: number; exposures: number }[] | null)?.[0];
  if (error || !row) return null;
  return { ...row, authoredDifficulty: input.authoredDifficulty };
}
