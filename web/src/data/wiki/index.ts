import { bernoulliBinomialWiki } from "./bernoulli-binomial";
import { dataTypesWiki } from "./data-types";
import { parameterVsStatisticWiki } from "./parameter-vs-statistic";
import { populationVsSampleWiki } from "./population-vs-sample";
import { sampleMeanWiki } from "./sample-mean";
import { sampleVarianceWiki } from "./sample-variance";
import { samplingMethodsWiki } from "./sampling-methods";
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
];

export const wikiByConcept = new Map<string, WikiArticle>(
  articles.map((article) => [article.conceptId, article]),
);

export type { WikiArticle } from "./types";
