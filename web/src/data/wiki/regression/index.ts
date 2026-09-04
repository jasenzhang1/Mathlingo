import type { WikiArticle } from "../types";

import { aicBicWiki } from "./aic-bic";
import { anovaWiki } from "./anova";
import { coxProportionalHazardsModelWiki } from "./cox-proportional-hazards-model";
import { effectOfAddingAnotherVariableWiki } from "./effect-of-adding-another-variable";
import { elasticNetWiki } from "./elastic-net";
import { forwardBackwardStepwiseSelectionWiki } from "./forward-backward-stepwise-selection";
import { geometricInterpretationOfOlsWiki } from "./geometric-interpretation-of-ols";
import { glmWiki } from "./glm";
import { homoskedasticityWiki } from "./homoskedasticity";
import { lassoWiki } from "./lasso";
import { linearRegressionProbabilisticVersionWiki } from "./linear-regression-probabilistic-version";
import { linearRegressionTerminologyWiki } from "./linear-regression-terminology";
import { loessSmoothingWiki } from "./loess-smoothing";
import { logisticRegressionWiki } from "./logistic-regression";
import { mixedEffectModelsWiki } from "./mixed-effect-models";
import { multipleLinearRegressionWiki } from "./multiple-linear-regression";
import { normalEquationsWiki } from "./normal-equations";
import { olsAssumptionsWiki } from "./ols-assumptions";
import { olsPropertiesWiki } from "./ols-properties";
import { ordinaryLeastSquaresWiki } from "./ordinary-least-squares";
import { probitRegressionWiki } from "./probit-regression";
import { rSquaredWiki } from "./r-squared";
import { regressToTheMeanWiki } from "./regress-to-the-mean";
import { regressionWiki } from "./regression";
import { ridgeRegressionWiki } from "./ridge-regression";
import { simpleLinearRegressionWiki } from "./simple-linear-regression";
import { ssrSseSstWiki } from "./ssr-sse-sst";
import { regularizationWiki } from "./regularization";
import { vifWiki } from "./vif";

/**
 * All 29 concepts of the `regression` domain, in curriculum order rather than
 * alphabetical: the order a learner meets them walking down the prerequisite
 * graph, matching the five clusters of `assessments/reg-01`…`reg-05`.
 */
export const regressionWikis: WikiArticle[] = [
  // reg-01 — foundations
  regressionWiki,
  regressToTheMeanWiki,
  linearRegressionTerminologyWiki,
  simpleLinearRegressionWiki,
  ordinaryLeastSquaresWiki,
  normalEquationsWiki,

  // reg-02 — OLS geometry and multiple regression
  geometricInterpretationOfOlsWiki,
  multipleLinearRegressionWiki,
  linearRegressionProbabilisticVersionWiki,
  olsAssumptionsWiki,
  homoskedasticityWiki,

  // reg-03 — model fit and diagnostics
  olsPropertiesWiki,
  ssrSseSstWiki,
  rSquaredWiki,
  anovaWiki,
  effectOfAddingAnotherVariableWiki,
  vifWiki,

  // reg-04 — model selection and regularization
  aicBicWiki,
  forwardBackwardStepwiseSelectionWiki,
  regularizationWiki,
  lassoWiki,
  ridgeRegressionWiki,
  elasticNetWiki,
  loessSmoothingWiki,

  // reg-05 — generalized and special regression
  mixedEffectModelsWiki,
  logisticRegressionWiki,
  probitRegressionWiki,
  glmWiki,
  coxProportionalHazardsModelWiki,
];
