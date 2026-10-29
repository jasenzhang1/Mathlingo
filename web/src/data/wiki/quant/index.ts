import type { WikiArticle } from "../types";

import { alphaSpannedAndOrthogonalWiki } from "./alpha-spanned-and-orthogonal";
import { assetReturnsWiki } from "./asset-returns";
import { backtestingProtocolWiki } from "./backtesting-protocol";
import { constrainedPortfolioOptimizationWiki } from "./constrained-portfolio-optimization";
import { crossSectionalFactorRegressionWiki } from "./cross-sectional-factor-regression";
import { eigenvalueShrinkageWiki } from "./eigenvalue-shrinkage";
import { estimationErrorInMvoWiki } from "./estimation-error-in-mvo";
import { evaluatingRiskModelsWiki } from "./evaluating-risk-models";
import { ewmaVolatilityWiki } from "./ewma-volatility";
import { factorCovarianceEstimationWiki } from "./factor-covariance-estimation";
import { factorHedgingWiki } from "./factor-hedging";
import { factorMimickingPortfoliosWiki } from "./factor-mimicking-portfolios";
import { factorRiskDecompositionWiki } from "./factor-risk-decomposition";
import { fractionalKellyAndDrawdownsWiki } from "./fractional-kelly-and-drawdowns";
import { fundamentalLawWiki } from "./fundamental-law-of-active-management";
import { idiosyncraticRiskEstimationWiki } from "./idiosyncratic-risk-estimation";
import { kellyCriterionWiki } from "./kelly-criterion";
import { linearFactorModelsWiki } from "./linear-factor-models";
import { marketImpactWiki } from "./market-impact";
import { marketsAndParticipantsWiki } from "./markets-and-participants";
import { meanVarianceOptimizationWiki } from "./mean-variance-optimization";
import { multiperiodPortfolioOptimizationWiki } from "./multiperiod-portfolio-optimization";
import { pcaModelsInPracticeWiki } from "./pca-models-in-practice";
import { performanceAttributionWiki } from "./performance-attribution";
import { performanceMetricsWiki } from "./performance-metrics";
import { rademacherAntiSerumWiki } from "./rademacher-anti-serum";
import { selectionVsSizingAttributionWiki } from "./selection-vs-sizing-attribution";
import { sourcesOfExcessReturnsWiki } from "./sources-of-excess-returns";
import { statisticalFactorModelsWiki } from "./statistical-factor-models";
import { styleFactorsWiki } from "./style-factors";
import { stylizedFactsOfReturnsWiki } from "./stylized-facts-of-returns";
import { volatilityForecastingWiki } from "./volatility-forecasting";

/** The `quantitative-investing` domain, in teaching order. */
export const quantWikis: WikiArticle[] = [
  marketsAndParticipantsWiki,
  sourcesOfExcessReturnsWiki,
  assetReturnsWiki,
  stylizedFactsOfReturnsWiki,
  volatilityForecastingWiki,
  ewmaVolatilityWiki,
  linearFactorModelsWiki,
  alphaSpannedAndOrthogonalWiki,
  factorRiskDecompositionWiki,
  backtestingProtocolWiki,
  rademacherAntiSerumWiki,
  evaluatingRiskModelsWiki,
  crossSectionalFactorRegressionWiki,
  factorCovarianceEstimationWiki,
  idiosyncraticRiskEstimationWiki,
  styleFactorsWiki,
  statisticalFactorModelsWiki,
  eigenvalueShrinkageWiki,
  pcaModelsInPracticeWiki,
  meanVarianceOptimizationWiki,
  fundamentalLawWiki,
  performanceMetricsWiki,
  constrainedPortfolioOptimizationWiki,
  estimationErrorInMvoWiki,
  marketImpactWiki,
  multiperiodPortfolioOptimizationWiki,
  factorHedgingWiki,
  factorMimickingPortfoliosWiki,
  kellyCriterionWiki,
  fractionalKellyAndDrawdownsWiki,
  performanceAttributionWiki,
  selectionVsSizingAttributionWiki,
];
