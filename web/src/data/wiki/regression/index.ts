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
import { outliersLeverageInfluenceWiki } from "./outliers-leverage-influence";
import { poissonRegressionWiki } from "./poisson-regression";
import { polynomialRegressionWiki } from "./polynomial-regression";
import { probitRegressionWiki } from "./probit-regression";
import { quantileRegressionWiki } from "./quantile-regression";
import { rSquaredWiki } from "./r-squared";
import { regressToTheMeanWiki } from "./regress-to-the-mean";
import { regressionWiki } from "./regression";
import { regularizationWiki } from "./regularization";
import { ridgeRegressionWiki } from "./ridge-regression";
import { simpleLinearRegressionWiki } from "./simple-linear-regression";
import { ssrSseSstWiki } from "./ssr-sse-sst";
import { vifWiki } from "./vif";
import { weightedLeastSquaresWiki } from "./weighted-least-squares";

/**
 * All 34 concepts of the `regression` domain, in curriculum order rather than
 * alphabetical: the order a learner meets them walking down the prerequisite
 * graph, matching the five clusters of `assessments/reg-01`…`reg-05` — with
 * five additions folded into their natural cluster:
 *
 *   - `weighted-least-squares` after `homoskedasticity` (its direct remedy)
 *   - `outliers-leverage-influence` after `vif` (the diagnostics cluster)
 *   - `polynomial-regression` and `quantile-regression` before `loess-smoothing`
 *     (alternatives to plain OLS that still fit inside reg-04's arc)
 *   - `poisson-regression` after `glm` (a named worked example of the
 *     framework, the same way `cox-proportional-hazards-model` is)
 *
 * Each was a genuine gap rather than a nice-to-have: `weighted-least-squares`
 * and `poisson-regression` were both already named by other concepts'
 * blurbs (`homoskedasticity`'s remedies, `glm`'s own "unifies linear,
 * logistic, and Poisson regression") without ever being defined; `leverage`
 * was already computed in `geometric-interpretation-of-ols` but had no
 * concept of its own to attach Cook's distance to; `polynomial-regression`
 * was the explicit forward-reference in `loess-smoothing`'s "usual workflow"
 * paragraph; `quantile-regression` was the generalisation `ordinary-least-
 * squares`'s own wiki gestures at when it contrasts squared and absolute
 * loss.
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
  weightedLeastSquaresWiki,

  // reg-03 — model fit and diagnostics
  olsPropertiesWiki,
  ssrSseSstWiki,
  rSquaredWiki,
  anovaWiki,
  effectOfAddingAnotherVariableWiki,
  vifWiki,
  outliersLeverageInfluenceWiki,

  // reg-04 — model selection and regularization
  aicBicWiki,
  forwardBackwardStepwiseSelectionWiki,
  regularizationWiki,
  lassoWiki,
  ridgeRegressionWiki,
  elasticNetWiki,
  polynomialRegressionWiki,
  quantileRegressionWiki,
  loessSmoothingWiki,

  // reg-05 — generalized and special regression
  mixedEffectModelsWiki,
  logisticRegressionWiki,
  probitRegressionWiki,
  glmWiki,
  poissonRegressionWiki,
  coxProportionalHazardsModelWiki,
];
