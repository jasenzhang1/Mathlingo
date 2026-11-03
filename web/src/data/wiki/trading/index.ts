import type { WikiArticle } from "../types";

import { electronicMarketsAndParticipantsWiki } from "./electronic-markets-and-participants";
import { limitOrderBookWiki } from "./limit-order-book";
import { marketMakingAndLiquidityWiki } from "./market-making-and-liquidity";
import { kyleModelWiki } from "./kyle-model";
import { glostenMilgromModelWiki } from "./glosten-milgrom-model";
import { hftDataAndReturnsWiki } from "./hft-data-and-returns";
import { interarrivalLatencyAndFragmentationWiki } from "./interarrival-latency-and-fragmentation";
import { intradayActivityPatternsWiki } from "./intraday-activity-patterns";
import { marketQualityAndPriceImpactWiki } from "./market-quality-and-price-impact";
import { stochasticCalculusWithJumpsWiki } from "./stochastic-calculus-with-jumps";
import { stochasticControlAndHjbWiki } from "./stochastic-control-and-hjb";
import { controlOfCountingProcessesWiki } from "./control-of-counting-processes";
import { optimalStoppingVariationalInequalitiesWiki } from "./optimal-stopping-variational-inequalities";
import { optimalExecutionContinuousTradingWiki } from "./optimal-execution-continuous-trading";
import { executionUtilityAndNonlinearImpactWiki } from "./execution-utility-and-nonlinear-impact";
import { executionPriceLimiterAndOrderFlowWiki } from "./execution-price-limiter-and-order-flow";
import { executionLitAndDarkPoolsWiki } from "./execution-lit-and-dark-pools";
import { executionWithLimitOrdersWiki } from "./execution-with-limit-orders";
import { executionWithLimitAndMarketOrdersWiki } from "./execution-with-limit-and-market-orders";
import { targetingVolumeWiki } from "./targeting-volume";
import { optimalMarketMakingWiki } from "./optimal-market-making";
import { marketMakingUtilityAndAdverseSelectionWiki } from "./market-making-utility-and-adverse-selection";
import { pairsTradingOptimalBandsWiki } from "./pairs-trading-optimal-bands";
import { cointegratedPortfoliosShortTermAlphaWiki } from "./cointegrated-portfolios-short-term-alpha";
import { orderImbalanceModelsWiki } from "./order-imbalance-models";
import { liquidationWithOrderImbalanceWiki } from "./liquidation-with-order-imbalance";

/** The `algorithmic-trading` domain, in teaching order. */
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
