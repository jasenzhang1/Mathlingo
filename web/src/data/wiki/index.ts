import { bernoulliBinomialWiki } from "./bernoulli-binomial";
import { bivariateNormalWiki } from "./bivariate-normal";
import { centralLimitTheoremWiki } from "./central-limit-theorem";
import { changeOfVariablesJacobianWiki } from "./change-of-variables-jacobian";
import { conditionalIndependenceDSeparationWiki } from "./conditional-independence-d-separation";
import { covarianceMatrixWiki } from "./covariance-matrix";
import { directedVsUndirectedGraphsWiki } from "./directed-vs-undirected-graphs";
import { emAlgorithmWiki } from "./em-algorithm";
import { gaussianMixtureModelsWiki } from "./gaussian-mixture-models";
import { gaussianProcessWiki } from "./gaussian-process";
import { graphsWiki } from "./graphs";
import { hmmWiki } from "./hmm";
import { klDivergenceWiki } from "./kl-divergence";
import { laplaceApproximationWiki } from "./laplace-approximation";
import { markovChainsWiki } from "./markov-chains";
import { markovRandomFieldsWiki } from "./markov-random-fields";
import { mixtureModelsAndLatentVariablesWiki } from "./mixture-models-and-latent-variables";
import { multivariateNormalWiki } from "./multivariate-normal";
import { pearsonCorrelationWiki } from "./pearson-correlation";
import { rkhsWiki } from "./rkhs";
import type { WikiArticle } from "./types";
import { variationalInferenceElboWiki } from "./variational-inference-elbo";
import { variationalInferenceVaesWiki } from "./variational-inference-vaes";
import { wassersteinDistanceWiki } from "./wasserstein-distance";

/**
 * Every article in the wiki, in the order a learner would meet them: the
 * probability pilot, then multivariate probability, then the graphical-models
 * domain in prerequisite order (graphs -> Markov structure -> latent variables
 * -> variational inference and kernels), matching the cluster split in
 * `assessments/mp-01.md` and `assessments/gm-*.md`.
 *
 * Both domains were written as a whole rather than article by article, so they
 * cross-reference deliberately. The seven `multivariate-probability` articles:
 * the Jacobian article's affine case is what produces the MVN's |Σ|^(−1/2), the
 * covariance-matrix article's whitening is the MVN article's standardisation,
 * and the bivariate normal is written as the k = 2 case you can still draw. The
 * fifteen `graphical-models` articles pick up from there — the MVN is what a
 * Gaussian process generalises to infinitely many dimensions, and KL divergence
 * is what the ELBO's lower bound and the Wasserstein comparison both rest on.
 */
const articles: WikiArticle[] = [
  bernoulliBinomialWiki,

  // Multivariate Probability & Asymptotics
  centralLimitTheoremWiki,
  changeOfVariablesJacobianWiki,
  covarianceMatrixWiki,
  bivariateNormalWiki,
  multivariateNormalWiki,
  pearsonCorrelationWiki,
  klDivergenceWiki,

  // Graphical Models & Bayesian ML — cluster 1: graphs and Markov structure
  graphsWiki,
  directedVsUndirectedGraphsWiki,
  conditionalIndependenceDSeparationWiki,
  markovRandomFieldsWiki,
  markovChainsWiki,
  hmmWiki,

  // Cluster 2: latent variables and EM
  mixtureModelsAndLatentVariablesWiki,
  emAlgorithmWiki,
  gaussianMixtureModelsWiki,
  laplaceApproximationWiki,

  // Cluster 3: variational inference and kernels
  variationalInferenceElboWiki,
  variationalInferenceVaesWiki,
  gaussianProcessWiki,
  rkhsWiki,
  wassersteinDistanceWiki,
];

/**
 * Concept id -> wiki article. Lessons without an article yet fall through to a
 * "coming soon" state, the same way `embedUrl` does for slides.
 */
export const wikiByConcept = new Map<string, WikiArticle>(
  articles.map((article) => [article.conceptId, article]),
);

export type { WikiArticle } from "./types";
