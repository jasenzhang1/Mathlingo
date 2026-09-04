import { bernoulliBinomialWiki } from "./bernoulli-binomial";
import { conditionalIndependenceDSeparationWiki } from "./conditional-independence-d-separation";
import { directedVsUndirectedGraphsWiki } from "./directed-vs-undirected-graphs";
import { emAlgorithmWiki } from "./em-algorithm";
import { gaussianMixtureModelsWiki } from "./gaussian-mixture-models";
import { gaussianProcessWiki } from "./gaussian-process";
import { graphsWiki } from "./graphs";
import { hmmWiki } from "./hmm";
import { laplaceApproximationWiki } from "./laplace-approximation";
import { markovChainsWiki } from "./markov-chains";
import { markovRandomFieldsWiki } from "./markov-random-fields";
import { mixtureModelsAndLatentVariablesWiki } from "./mixture-models-and-latent-variables";
import { rkhsWiki } from "./rkhs";
import type { WikiArticle } from "./types";
import { variationalInferenceElboWiki } from "./variational-inference-elbo";
import { variationalInferenceVaesWiki } from "./variational-inference-vaes";
import { wassersteinDistanceWiki } from "./wasserstein-distance";

/**
 * Every article in the wiki, in the order a learner would meet them: the
 * probability pilot first, then the graphical-models domain in prerequisite
 * order (graphs -> Markov structure -> latent variables -> variational
 * inference and kernels), matching the cluster split in `assessments/gm-*.md`.
 */
const articles: WikiArticle[] = [
  bernoulliBinomialWiki,

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
