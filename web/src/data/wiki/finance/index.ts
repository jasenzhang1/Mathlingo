import type { WikiArticle } from "../types";

import { bondDurationAndConvexityWiki } from "./bond-duration-and-convexity";
import { bondsAndFixedIncomeWiki } from "./bonds-and-fixed-income";
import { creditDefaultSwapsWiki } from "./credit-default-swaps";
import { derivativesOverviewWiki } from "./derivatives-overview";
import { equitiesAndStockMarketsWiki } from "./equities-and-stock-markets";
import { etfsAndIndexFundsWiki } from "./etfs-and-index-funds";
import { forwardsAndFuturesWiki } from "./forwards-and-futures";
import { interestRateAndCurrencySwapsWiki } from "./interest-rate-and-currency-swaps";
import { mutualFundsAndNavWiki } from "./mutual-funds-and-nav";
import { optionPayoffAndPutCallParityWiki } from "./option-payoff-and-put-call-parity";
import { optionPricingAndGreeksWiki } from "./option-pricing-and-greeks";
import { optionsCallsAndPutsWiki } from "./options-calls-and-puts";
import { timeValueOfMoneyWiki } from "./time-value-of-money";
import { yieldCurveAndTermStructureWiki } from "./yield-curve-and-term-structure";
import { yieldToMaturityWiki } from "./yield-to-maturity";

/** All 15 concepts of the `financial-instruments` domain, in teaching order. */
export const financeWikis: WikiArticle[] = [
  timeValueOfMoneyWiki,
  bondsAndFixedIncomeWiki,
  yieldToMaturityWiki,
  yieldCurveAndTermStructureWiki,
  bondDurationAndConvexityWiki,
  equitiesAndStockMarketsWiki,
  etfsAndIndexFundsWiki,
  mutualFundsAndNavWiki,
  derivativesOverviewWiki,
  forwardsAndFuturesWiki,
  optionsCallsAndPutsWiki,
  optionPayoffAndPutCallParityWiki,
  optionPricingAndGreeksWiki,
  interestRateAndCurrencySwapsWiki,
  creditDefaultSwapsWiki,
];
