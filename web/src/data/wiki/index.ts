import { bernoulliBinomialWiki } from "./bernoulli-binomial";
import { bivariateNormalWiki } from "./bivariate-normal";
import { bootstrappingWiki } from "./bootstrapping";
import { centralLimitTheoremWiki } from "./central-limit-theorem";
import { changeOfVariablesJacobianWiki } from "./change-of-variables-jacobian";
import { chiSquareGoodnessOfFitTestWiki } from "./chi-square-goodness-of-fit-test";
import { chiSquareTestOfIndependenceWiki } from "./chi-square-test-of-independence";
import { conditionalIndependenceDSeparationWiki } from "./conditional-independence-d-separation";
import { confidenceIntervalWiki } from "./confidence-interval";
import { covarianceMatrixWiki } from "./covariance-matrix";
import { dataTypesWiki } from "./data-types";
import { directedVsUndirectedGraphsWiki } from "./directed-vs-undirected-graphs";
import { emAlgorithmWiki } from "./em-algorithm";
import { fischersExactTestWiki } from "./fischers-exact-test";
import { gaussianMixtureModelsWiki } from "./gaussian-mixture-models";
import { gaussianProcessWiki } from "./gaussian-process";
import { graphsWiki } from "./graphs";
import { hmmWiki } from "./hmm";
import { hypothesisTestWiki } from "./hypothesis-test";
import { klDivergenceWiki } from "./kl-divergence";
import { laplaceApproximationWiki } from "./laplace-approximation";
import { markovChainsWiki } from "./markov-chains";
import { markovRandomFieldsWiki } from "./markov-random-fields";
import { mixtureModelsAndLatentVariablesWiki } from "./mixture-models-and-latent-variables";
import { multivariateNormalWiki } from "./multivariate-normal";
import { oneSampleProportionsZTestWiki } from "./one-sample-proportions-z-test";
import { oneSampleTTestWiki } from "./one-sample-t-test";
import { oneSampleZTestWiki } from "./one-sample-z-test";
import { pValueWiki } from "./p-value";
import { pairedTTestWiki } from "./paired-t-test";
import { parameterVsStatisticWiki } from "./parameter-vs-statistic";
import { pearsonCorrelationWiki } from "./pearson-correlation";
import { populationVsSampleWiki } from "./population-vs-sample";
import { rejectionRegionWiki } from "./rejection-region";
import { rkhsWiki } from "./rkhs";
import { sampleMeanWiki } from "./sample-mean";
import { sampleVarianceWiki } from "./sample-variance";
import { samplingDistributionWiki } from "./sampling-distribution";
import { samplingMethodsWiki } from "./sampling-methods";
import { standardErrorWiki } from "./standard-error";
import { testStatisticWiki } from "./test-statistic";
import { twoSampleTTestWiki } from "./two-sample-t-test";
import { twoSampleZTestWiki } from "./two-sample-z-test";
import { mlWikiArticles } from "./ml";
import { typeIIIErrorWiki } from "./type-i-ii-error";
import type { WikiArticle } from "./types";
import { variationalInferenceElboWiki } from "./variational-inference-elbo";
import { variationalInferenceVaesWiki } from "./variational-inference-vaes";
import { wassersteinDistanceWiki } from "./wasserstein-distance";
import { wilcoxonRankSumTestWiki } from "./wilcoxon-rank-sum-test";

/**
 * Every article in the wiki, in the order a learner would meet them: the
 * probability pilot, then statistical inference, then multivariate probability,
 * then the graphical-models domain in prerequisite order (graphs -> Markov
 * structure -> latent variables -> variational inference and kernels), matching
 * the cluster split in `assessments/statistics-foundations.md`,
 * `assessments/hypothesis-testing-machinery.md`,
 * `assessments/named-tests-and-resampling.md`, `assessments/mp-01.md` and
 * `assessments/gm-*.md`.
 *
 * Each domain was written as a whole rather than article by article, so they
 * cross-reference deliberately. The twenty-five `statistics` articles build one
 * argument: a statistic is random before you see data, so it has a sampling
 * distribution, whose spread is the standard error, which is the denominator of
 * every test statistic and the half-width of every interval — and the eleven
 * named tests are that one template with different assumptions about what is
 * known. The seven `multivariate-probability` articles: the Jacobian article's
 * affine case is what produces the MVN's |Σ|^(−1/2), the covariance-matrix
 * article's whitening is the MVN article's standardisation, and the bivariate
 * normal is written as the k = 2 case you can still draw. The fifteen
 * `graphical-models` articles pick up from there — the MVN is what a Gaussian
 * process generalises to infinitely many dimensions, and KL divergence is what
 * the ELBO's lower bound and the Wasserstein comparison both rest on.
 */
const articles: WikiArticle[] = [
  bernoulliBinomialWiki,

  // Statistical Inference — cluster 1: foundations
  populationVsSampleWiki,
  parameterVsStatisticWiki,
  dataTypesWiki,
  samplingMethodsWiki,
  sampleMeanWiki,
  sampleVarianceWiki,

  // Cluster 2: inference machinery
  samplingDistributionWiki,
  standardErrorWiki,
  testStatisticWiki,
  rejectionRegionWiki,
  hypothesisTestWiki,
  pValueWiki,
  typeIIIErrorWiki,
  confidenceIntervalWiki,

  // Cluster 3: named tests and resampling
  oneSampleZTestWiki,
  oneSampleTTestWiki,
  oneSampleProportionsZTestWiki,
  twoSampleZTestWiki,
  twoSampleTTestWiki,
  pairedTTestWiki,
  chiSquareTestOfIndependenceWiki,
  chiSquareGoodnessOfFitTestWiki,
  fischersExactTestWiki,
  wilcoxonRankSumTestWiki,
  bootstrappingWiki,

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
 * The `machine-learning` domain is kept in its own module (`./ml`) rather than
 * listed here: fifty articles grouped into the nine clusters of
 * `assessments/ml-01…ml-09.md`, deliberately cross-referential within a cluster
 * — `bagging` cites the ensemble variance formula from `ensemble-methods`,
 * `random-forests` cites `bagging`'s correlation floor, and
 * `splitting-criteria` closes the loop back to the Bernoulli variance in the
 * pilot article above.
 */

/**
 * Concept id -> wiki article. Lessons without an article yet fall through to a
 * "coming soon" state, the same way `embedUrl` does for slides.
 */
export const wikiByConcept = new Map<string, WikiArticle>(
  [...articles, ...mlWikiArticles].map((article) => [article.conceptId, article]),
);

export type { WikiArticle } from "./types";
