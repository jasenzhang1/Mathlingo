import type { WikiArticle } from "../types";

import { activeStatisticalInferenceWiki } from "./active-statistical-inference";
import { conformalPredictionWiki } from "./conformal-prediction";
import { doubleSamplingMnarWiki } from "./double-sampling-mnar";
import { doublyRobustEstimationWiki } from "./doubly-robust-estimation";
import { missingDataMechanismsWiki } from "./missing-data-mechanisms";
import { potentialOutcomesWiki } from "./potential-outcomes";
import { predictionPoweredInferenceWiki } from "./prediction-powered-inference";
import { selectionBiasWiki } from "./selection-bias";

/**
 * The two newest `statistics` chapters, in teaching order: inference with
 * machine-learning predictions, then missing data and causal effects.
 */
export const inferenceWikis: WikiArticle[] = [
  conformalPredictionWiki,
  selectionBiasWiki,
  predictionPoweredInferenceWiki,
  activeStatisticalInferenceWiki,
  missingDataMechanismsWiki,
  potentialOutcomesWiki,
  doublyRobustEstimationWiki,
  doubleSamplingMnarWiki,
];
