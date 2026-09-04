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

/**
 * The servable form of the machine-learning question bank: five items per
 * concept — recall, recall, apply, explain, transfer — across all 50 concepts in
 * the `machine-learning` domain, ported from `assessments/ml-01…ml-09.md`.
 *
 * Every item ships at `shadow`, not `live`. That is what the status means: the
 * items are authored and structurally verified, but their IRT difficulty and
 * discrimination are *seeds* from the concept's depth in the graph, not
 * estimates from exposure data. Shadow items are served and graded, and the
 * learner is told they do not move their score, which is exactly the regime the
 * ingest pipeline puts newly accepted items into (`retrieval.ts`) and the regime
 * `calibration.ts` promotes out of once the numbers justify it.
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
];
