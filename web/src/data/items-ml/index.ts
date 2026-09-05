import type { Item } from "../../lib/assessment/types";
import { ml01Items } from "./ml-01-foundations";
import { ml02Items } from "./ml-02-model-evaluation";
import { ml03Items } from "./ml-03-bias-variance-and-optimization";
import { ml04Items } from "./ml-04-classic-classifiers";
import { ml05Items } from "./ml-05-kernels";
import { ml06Items } from "./ml-06-trees-and-ensembles";
import { ml07Items } from "./ml-07-clustering-and-dimensionality-reduction";
import { ml08Items } from "./ml-08-neural-networks";
import { ml09Items } from "./ml-09-gaussian-processes";
import { ml10Items } from "./ml-10-practical-modelling";
import { ml11Items } from "./ml-11-deep-learning";
import { ml12Items } from "./ml-12-further-paradigms";

/**
 * The servable form of the machine-learning question bank: eight items per
 * concept across all 78 concepts in the `machine-learning` domain — 624 in
 * total — at two each of recall, apply, explain and transfer.
 *
 * Items 1-5 per concept are the port of `assessments/ml-01…ml-09.md`, which
 * authored five. Items 6-8 were written to bring every pool to the
 * `MIN_LIVE_ITEMS = 8` bar `calibration.ts` sets and to match the 2/2/2/2 level
 * mix and format spread the other domains' banks use, so the adaptive selector
 * has something to choose between at each level rather than one item per rung.
 *
 * All ship `live`, as the statistics, multivariate-probability and
 * graphical-models banks do. They are authored, rubric-complete and clear
 * `verifyItem` with no blockers or warnings; their IRT parameters are seeds from
 * concept depth rather than exposure estimates, which is true of every authored
 * item here and is what `calibration.ts` re-estimates from live responses.
 */
export const mlItems: Item[] = [
  ...ml01Items,
  ...ml02Items,
  ...ml03Items,
  ...ml04Items,
  ...ml05Items,
  ...ml06Items,
  ...ml07Items,
  ...ml08Items,
  ...ml09Items,
  ...ml10Items,
  ...ml11Items,
  ...ml12Items,
];
