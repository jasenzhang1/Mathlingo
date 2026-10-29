import type { WikiArticle } from "../types";

import { cointegratedPortfoliosShortTermAlphaWiki } from "./cointegrated-portfolios-short-term-alpha";
import { controlOfCountingProcessesWiki } from "./control-of-counting-processes";
import { electronicMarketsAndParticipantsWiki } from "./electronic-markets-and-participants";
import { executionLitAndDarkPoolsWiki } from "./execution-lit-and-dark-pools";
import { executionPriceLimiterAndOrderFlowWiki } from "./execution-price-limiter-and-order-flow";
import { executionUtilityAndNonlinearImpactWiki } from "./execution-utility-and-nonlinear-impact";
import { executionWithLimitAndMarketOrdersWiki } from "./execution-with-limit-and-market-orders";
import { executionWithLimitOrdersWiki } from "./execution-with-limit-orders";
import { glostenMilgromModelWiki } from "./glosten-milgrom-model";
import { hftDataAndReturnsWiki } from "./hft-data-and-returns";
import { interarrivalLatencyAndFragmentationWiki } from "./interarrival-latency-and-fragmentation";
import { intradayActivityPatternsWiki } from "./intraday-activity-patterns";
import { kyleModelWiki } from "./kyle-model";
import { limitOrderBookWiki } from "./limit-order-book";
import { liquidationWithOrderImbalanceWiki } from "./liquidation-with-order-imbalance";
import { marketMakingAndLiquidityWiki } from "./market-making-and-liquidity";
import { marketMakingUtilityAndAdverseSelectionWiki } from "./market-making-utility-and-adverse-selection";
import { marketQualityAndPriceImpactWiki } from "./market-quality-and-price-impact";
import { optimalExecutionContinuousTradingWiki } from "./optimal-execution-continuous-trading";
import { optimalMarketMakingWiki } from "./optimal-market-making";
import { optimalStoppingVariationalInequalitiesWiki } from "./optimal-stopping-variational-inequalities";
import { orderImbalanceModelsWiki } from "./order-imbalance-models";
import { pairsTradingOptimalBandsWiki } from "./pairs-trading-optimal-bands";
import { stochasticCalculusWithJumpsWiki } from "./stochastic-calculus-with-jumps";
import { stochasticControlAndHjbWiki } from "./stochastic-control-and-hjb";
import { targetingVolumeWiki } from "./targeting-volume";

/** All 26 concepts of the `algorithmic-trading` domain, in teaching order. */
export const tradingWikis: WikiArticle[] = [
  electronicMarketsAndParticipantsWiki,
  limitOrderBookWiki,
  marketMakingAndLiquidityWiki,
  kyleModelWiki,
  glostenMilgromModelWiki,
  hftDataAndReturnsWiki,
  interarrivalLatencyAndFragmentationWiki,
  intradayActivityPatternsWiki,
  marketQualityAndPriceImpactWiki,
  stochasticCalculusWithJumpsWiki,
  stochasticControlAndHjbWiki,
  controlOfCountingProcessesWiki,
  optimalStoppingVariationalInequalitiesWiki,
  optimalExecutionContinuousTradingWiki,
  executionUtilityAndNonlinearImpactWiki,
  executionPriceLimiterAndOrderFlowWiki,
  executionLitAndDarkPoolsWiki,
  executionWithLimitOrdersWiki,
  executionWithLimitAndMarketOrdersWiki,
  targetingVolumeWiki,
  optimalMarketMakingWiki,
  marketMakingUtilityAndAdverseSelectionWiki,
  pairsTradingOptimalBandsWiki,
  cointegratedPortfoliosShortTermAlphaWiki,
  orderImbalanceModelsWiki,
  liquidationWithOrderImbalanceWiki,
];
