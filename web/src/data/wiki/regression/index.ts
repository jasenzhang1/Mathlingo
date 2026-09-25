import type { WikiArticle } from "../types";

import { aicBicWiki } from "./aic-bic";
import { anovaWiki } from "./anova";
import { coxProportionalHazardsModelWiki } from "./cox-proportional-hazards-model";
import { effectOfAddingAnotherVariableWiki } from "./effect-of-adding-another-variable";
import { elasticNetWiki } from "./elastic-net";
import { forwardBackwardStepwiseSelectionWiki } from "./forward-backward-stepwise-selection";
import { geometricInterpretationOfOlsWiki } from "./geometric-interpretation-of-ols";
import { glmWiki } from "./glm";
import { hatMatrixWiki } from "./hat-matrix";
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
import { sandwichEstimatorWiki } from "./sandwich-estimator";
import { generalizedEstimatingEquationsWiki } from "./generalized-estimating-equations";
import { simpleLinearRegressionWiki } from "./simple-linear-regression";
import { ssrSseSstWiki } from "./ssr-sse-sst";
import { vifWiki } from "./vif";
import { weightedLeastSquaresWiki } from "./weighted-least-squares";

// Seber & Lee expansion
import { partitionedRegressionWiki } from "./partitioned-regression";
import { restrictedLeastSquaresWiki } from "./restricted-least-squares";
import { lessThanFullRankModelsWiki } from "./less-than-full-rank-models";
import { estimableFunctionsWiki } from "./estimable-functions";
import { generalizedLeastSquaresWiki } from "./generalized-least-squares";
import { centeringAndScalingWiki } from "./centering-and-scaling";
import { bayesianLinearRegressionWiki } from "./bayesian-linear-regression";
import { generalLinearHypothesisWiki } from "./general-linear-hypothesis";
import { noncentralChiSquareAndFWiki } from "./noncentral-chi-square-and-f";
import { lackOfFitTestWiki } from "./lack-of-fit-test";
import { simultaneousConfidenceIntervalsWiki } from "./simultaneous-confidence-intervals";
import { confidenceRegionsForBetaWiki } from "./confidence-regions-for-beta";
import { confidenceBandsRegressionSurfaceWiki } from "./confidence-bands-regression-surface";
import { inversePredictionCalibrationWiki } from "./inverse-prediction-calibration";
import { regressionThroughTheOriginWiki } from "./regression-through-the-origin";
import { dummyVariablesComparingLinesWiki } from "./dummy-variables-comparing-lines";
import { twoPhaseRegressionWiki } from "./two-phase-regression";
import { orthogonalPolynomialsWiki } from "./orthogonal-polynomials";
import { regressionSplinesWiki } from "./regression-splines";
import { smoothingSplinesWiki } from "./smoothing-splines";
import { responseSurfaceMethodologyWiki } from "./response-surface-methodology";
import { oneWayAnovaModelWiki } from "./one-way-anova-model";
import { multipleComparisonsTukeyWiki } from "./multiple-comparisons-tukey";
import { twoWayAnovaBalancedWiki } from "./two-way-anova-balanced";
import { twoWayAnovaUnbalancedWiki } from "./two-way-anova-unbalanced";
import { tukeyNonadditivityTestWiki } from "./tukey-nonadditivity-test";
import { higherWayAnovaWiki } from "./higher-way-anova";
import { randomizedBlockDesignsWiki } from "./randomized-block-designs";
import { analysisOfCovarianceWiki } from "./analysis-of-covariance";
import { misspecificationBiasWiki } from "./misspecification-bias";
import { robustnessOfFTestWiki } from "./robustness-of-f-test";
import { errorsInVariablesWiki } from "./errors-in-variables";
import { collinearityEigenanalysisWiki } from "./collinearity-eigenanalysis";
import { studentizedResidualsWiki } from "./studentized-residuals";
import { partialResidualPlotsWiki } from "./partial-residual-plots";
import { heteroskedasticityTestsWiki } from "./heteroskedasticity-tests";
import { durbinWatsonTestWiki } from "./durbin-watson-test";
import { normalProbabilityPlotsWiki } from "./normal-probability-plots";
import { boxCoxTransformationWiki } from "./box-cox-transformation";
import { caseDeletionDiagnosticsWiki } from "./case-deletion-diagnostics";
import { principalComponentsRegressionWiki } from "./principal-components-regression";
import { mEstimatorsRegressionWiki } from "./m-estimators-regression";
import { breakdownPointAndInfluenceFunctionWiki } from "./breakdown-point-and-influence-function";
import { highBreakdownRegressionWiki } from "./high-breakdown-regression";
import { leastSquaresViaCholeskyWiki } from "./least-squares-via-cholesky";
import { leastSquaresViaQrWiki } from "./least-squares-via-qr";
import { leastSquaresViaSvdWiki } from "./least-squares-via-svd";
import { updatingAndSweepOperatorWiki } from "./updating-and-sweep-operator";
import { numericalAccuracyLeastSquaresWiki } from "./numerical-accuracy-least-squares";
import { subsetSelectionCriteriaWiki } from "./subset-selection-criteria";
import { allSubsetsRegressionWiki } from "./all-subsets-regression";
import { steinShrinkageWiki } from "./stein-shrinkage";
import { bayesianModelAveragingWiki } from "./bayesian-model-averaging";
import { postSelectionInferenceWiki } from "./post-selection-inference";

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
  hatMatrixWiki,
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
  sandwichEstimatorWiki,

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
  generalizedEstimatingEquationsWiki,

  // Seber & Lee Ch. 3 — estimation beyond the full-rank, spherical-error case
  partitionedRegressionWiki,
  restrictedLeastSquaresWiki,
  lessThanFullRankModelsWiki,
  estimableFunctionsWiki,
  generalizedLeastSquaresWiki,
  centeringAndScalingWiki,
  bayesianLinearRegressionWiki,

  // Seber & Lee Ch. 4–5 — hypothesis testing and simultaneous inference
  generalLinearHypothesisWiki,
  noncentralChiSquareAndFWiki,
  lackOfFitTestWiki,
  simultaneousConfidenceIntervalsWiki,
  confidenceRegionsForBetaWiki,
  confidenceBandsRegressionSurfaceWiki,

  // Seber & Lee Ch. 6–7 — straight lines, polynomials and splines
  inversePredictionCalibrationWiki,
  regressionThroughTheOriginWiki,
  dummyVariablesComparingLinesWiki,
  twoPhaseRegressionWiki,
  orthogonalPolynomialsWiki,
  regressionSplinesWiki,
  smoothingSplinesWiki,
  responseSurfaceMethodologyWiki,

  // Seber & Lee Ch. 8 — analysis of variance
  oneWayAnovaModelWiki,
  multipleComparisonsTukeyWiki,
  twoWayAnovaBalancedWiki,
  twoWayAnovaUnbalancedWiki,
  tukeyNonadditivityTestWiki,
  higherWayAnovaWiki,
  randomizedBlockDesignsWiki,
  analysisOfCovarianceWiki,

  // Seber & Lee Ch. 9–10 — departures from assumptions, diagnosis and remedies
  misspecificationBiasWiki,
  robustnessOfFTestWiki,
  errorsInVariablesWiki,
  collinearityEigenanalysisWiki,
  studentizedResidualsWiki,
  partialResidualPlotsWiki,
  heteroskedasticityTestsWiki,
  durbinWatsonTestWiki,
  normalProbabilityPlotsWiki,
  boxCoxTransformationWiki,
  caseDeletionDiagnosticsWiki,
  principalComponentsRegressionWiki,

  // Seber & Lee §3.13 and Ch. 11 — robust regression and computing the fit
  mEstimatorsRegressionWiki,
  breakdownPointAndInfluenceFunctionWiki,
  highBreakdownRegressionWiki,
  leastSquaresViaCholeskyWiki,
  leastSquaresViaQrWiki,
  leastSquaresViaSvdWiki,
  updatingAndSweepOperatorWiki,
  numericalAccuracyLeastSquaresWiki,

  // Seber & Lee Ch. 12 — prediction and model selection
  subsetSelectionCriteriaWiki,
  allSubsetsRegressionWiki,
  steinShrinkageWiki,
  bayesianModelAveragingWiki,
  postSelectionInferenceWiki,
];
