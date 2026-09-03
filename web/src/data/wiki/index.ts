import { bernoulliBinomialWiki } from "./bernoulli-binomial";
import { bivariateNormalWiki } from "./bivariate-normal";
import { centralLimitTheoremWiki } from "./central-limit-theorem";
import { changeOfVariablesJacobianWiki } from "./change-of-variables-jacobian";
import { covarianceMatrixWiki } from "./covariance-matrix";
import { klDivergenceWiki } from "./kl-divergence";
import { multivariateNormalWiki } from "./multivariate-normal";
import { pearsonCorrelationWiki } from "./pearson-correlation";
import type { WikiArticle } from "./types";

/**
 * Concept id -> wiki article. Lessons without an article yet fall through to a
 * "coming soon" state, the same way `embedUrl` does for slides.
 *
 * The seven `multivariate-probability` articles were written as a domain at
 * once, so they cross-reference each other deliberately: the Jacobian article's
 * affine case is what produces the MVN's |Σ|^(−1/2), the covariance-matrix
 * article's whitening is the MVN article's standardisation, and the bivariate
 * normal is written as the k = 2 case you can still draw.
 */
const articles: WikiArticle[] = [
  bernoulliBinomialWiki,
  centralLimitTheoremWiki,
  changeOfVariablesJacobianWiki,
  covarianceMatrixWiki,
  bivariateNormalWiki,
  multivariateNormalWiki,
  pearsonCorrelationWiki,
  klDivergenceWiki,
];

export const wikiByConcept = new Map<string, WikiArticle>(
  articles.map((article) => [article.conceptId, article]),
);

export type { WikiArticle } from "./types";
