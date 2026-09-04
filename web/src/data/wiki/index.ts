import { bernoulliBinomialWiki } from "./bernoulli-binomial";
import { confidenceIntervalWiki } from "./confidence-interval";
import { dataTypesWiki } from "./data-types";
import { hypothesisTestWiki } from "./hypothesis-test";
import { pValueWiki } from "./p-value";
import { parameterVsStatisticWiki } from "./parameter-vs-statistic";
import { populationVsSampleWiki } from "./population-vs-sample";
import { rejectionRegionWiki } from "./rejection-region";
import { sampleMeanWiki } from "./sample-mean";
import { sampleVarianceWiki } from "./sample-variance";
import { samplingDistributionWiki } from "./sampling-distribution";
import { samplingMethodsWiki } from "./sampling-methods";
import { standardErrorWiki } from "./standard-error";
import { testStatisticWiki } from "./test-statistic";
import { typeIIIErrorWiki } from "./type-i-ii-error";
import type { WikiArticle } from "./types";

/**
 * Concept id -> wiki article. Lessons without an article yet fall through to a
 * "coming soon" state, the same way `embedUrl` does for slides.
 */
const articles: WikiArticle[] = [
  bernoulliBinomialWiki,

  // --- statistics: foundations ---------------------------------------------
  populationVsSampleWiki,
  parameterVsStatisticWiki,
  dataTypesWiki,
  samplingMethodsWiki,
  sampleMeanWiki,
  sampleVarianceWiki,

  // --- statistics: inference machinery --------------------------------------
  samplingDistributionWiki,
  standardErrorWiki,
  testStatisticWiki,
  rejectionRegionWiki,
  hypothesisTestWiki,
  pValueWiki,
  typeIIIErrorWiki,
  confidenceIntervalWiki,
];

export const wikiByConcept = new Map<string, WikiArticle>(
  articles.map((article) => [article.conceptId, article]),
);

export type { WikiArticle } from "./types";
