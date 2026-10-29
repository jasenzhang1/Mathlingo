import type { Item } from "../../../lib/assessment/types";
import { dingCountsItems } from "./ding-counts";
import { dingFittingRegularizationItems } from "./ding-fitting-regularization";
import { dingGlmBeyondItems } from "./ding-glm-beyond";
import { dingInteractionsItems } from "./ding-interactions";
import { dingMultinomialItems } from "./ding-multinomial";
import { dingOlsInferenceItems } from "./ding-ols-inference";
import { dingSurvivalItems } from "./ding-survival";

/** Every item drawn from Ding, *Linear Model and Extensions*, in chapter order. */
export const dingItems: Item[] = [
  ...dingOlsInferenceItems,
  ...dingFittingRegularizationItems,
  ...dingInteractionsItems,
  ...dingGlmBeyondItems,
  ...dingMultinomialItems,
  ...dingCountsItems,
  ...dingSurvivalItems,
];
