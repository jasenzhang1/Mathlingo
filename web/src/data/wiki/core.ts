import { bernoulliBinomialWiki } from "./bernoulli-binomial";
import { bivariateNormalWiki } from "./bivariate-normal";
import { bootstrappingWiki } from "./bootstrapping";
import { centralLimitTheoremWiki } from "./central-limit-theorem";
import { cochransTheoremWiki } from "./cochrans-theorem";
import { changeOfVariablesJacobianWiki } from "./change-of-variables-jacobian";
import { chiSquareGoodnessOfFitTestWiki } from "./chi-square-goodness-of-fit-test";
import { chiSquareTestOfIndependenceWiki } from "./chi-square-test-of-independence";
import { conditionalIndependenceDSeparationWiki } from "./conditional-independence-d-separation";
import { confidenceIntervalWiki } from "./confidence-interval";
import { covarianceMatrixWiki } from "./covariance-matrix";
import { dataTypesWiki } from "./data-types";
import { directedVsUndirectedGraphsWiki } from "./directed-vs-undirected-graphs";
import { distributionOfBetaHatWiki } from "./distribution-of-beta-hat";
import { effectSizeWiki } from "./effect-size";
import { emAlgorithmWiki } from "./em-algorithm";
import { equivalenceTestingWiki } from "./equivalence-testing";
import { fischersExactTestWiki } from "./fischers-exact-test";
import { gaussianMixtureModelsWiki } from "./gaussian-mixture-models";
import { gaussianProcessWiki } from "./gaussian-process";
import { graphsWiki } from "./graphs";
import { hmmWiki } from "./hmm";
import { hypothesisTestWiki } from "./hypothesis-test";
import { klDivergenceWiki } from "./kl-divergence";
import { kolmogorovSmirnovTestWiki } from "./kolmogorov-smirnov-test";
import { kruskalWallisTestWiki } from "./kruskal-wallis-test";
import { laplaceApproximationWiki } from "./laplace-approximation";
import { markovChainsWiki } from "./markov-chains";
import { markovRandomFieldsWiki } from "./markov-random-fields";
import { mcnemarTestWiki } from "./mcnemar-test";
import { mixtureModelsAndLatentVariablesWiki } from "./mixture-models-and-latent-variables";
import { multipleTestingWiki } from "./multiple-testing";
import { multivariateMgfWiki } from "./multivariate-mgf";
import { multivariateNormalWiki } from "./multivariate-normal";
import { oneSampleProportionsZTestWiki } from "./one-sample-proportions-z-test";
import { oneSampleTTestWiki } from "./one-sample-t-test";
import { oneSampleZTestWiki } from "./one-sample-z-test";
import { pValueWiki } from "./p-value";
import { pairedTTestWiki } from "./paired-t-test";
import { parameterVsStatisticWiki } from "./parameter-vs-statistic";
import { pearsonCorrelationWiki } from "./pearson-correlation";
import { permutationTestWiki } from "./permutation-test";
import { populationVsSampleWiki } from "./population-vs-sample";
import { quadraticFormsRandomVectorsWiki } from "./quadratic-forms-random-vectors";
import { predictionIntervalWiki } from "./prediction-interval";
import { rejectionRegionWiki } from "./rejection-region";
import { rkhsWiki } from "./rkhs";
import { sampleMeanWiki } from "./sample-mean";
import { sampleVarianceWiki } from "./sample-variance";
import { samplingDistributionWiki } from "./sampling-distribution";
import { samplingMethodsWiki } from "./sampling-methods";
import { sequentialTestingWiki } from "./sequential-testing";
import { standardErrorWiki } from "./standard-error";
import { testStatisticWiki } from "./test-statistic";
import { twoSampleProportionsZTestWiki } from "./two-sample-proportions-z-test";
import { twoSampleTTestWiki } from "./two-sample-t-test";
import { twoSampleZTestWiki } from "./two-sample-z-test";
import { typeIIIErrorWiki } from "./type-i-ii-error";
import { wilcoxonSignedRankTestWiki } from "./wilcoxon-signed-rank-test";
import type { WikiArticle } from "./types";
import { variationalInferenceElboWiki } from "./variational-inference-elbo";
import { variationalInferenceVaesWiki } from "./variational-inference-vaes";
import { wassersteinDistanceWiki } from "./wasserstein-distance";
import { wilcoxonRankSumTestWiki } from "./wilcoxon-rank-sum-test";

/**
 * The hand-written core of the wiki — the `statistics`, `multivariate-probability`
 * and `graphical-models` domains, plus the Bernoulli/Binomial pilot. The other
 * domains have their own modules (`./regression`, `./ml`, `./python`); `./index`
 * loads whichever one a concept belongs to.
 *
 * In the order a learner would meet them: the probability pilot, then
 * statistical inference, then multivariate probability,
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
 * known. The eleven `multivariate-probability` articles: the Jacobian article's
 * affine case is what produces the MVN's |Σ|^(−1/2), the covariance-matrix
 * article's whitening is the MVN article's standardisation, and the bivariate
 * normal is written as the k = 2 case you can still draw. The four added on top
 * of those seven run the domain's second argument to its end: the multivariate
 * MGF turns the MVN's closure properties into one substitution, quadratic forms
 * are what every sum of squares in statistics actually is, Cochran's theorem
 * says when their pieces are independent, and the distribution of beta-hat
 * spends all three at once — every standard error and t-statistic a regression
 * prints. The fifteen
 * `graphical-models` articles pick up from there — the MVN is what a Gaussian
 * process generalises to infinitely many dimensions, and KL divergence is what
 * the ELBO's lower bound and the Wasserstein comparison both rest on.
 */
export const coreWikiArticles: WikiArticle[] = [
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

  // Cluster 4: beyond a single comparison
  twoSampleProportionsZTestWiki,
  effectSizeWiki,
  multipleTestingWiki,
  equivalenceTestingWiki,
  sequentialTestingWiki,
  predictionIntervalWiki,

  // Cluster 5: distribution-free methods
  permutationTestWiki,
  wilcoxonSignedRankTestWiki,
  kruskalWallisTestWiki,
  mcnemarTestWiki,
  kolmogorovSmirnovTestWiki,

  // Multivariate Probability & Asymptotics
  centralLimitTheoremWiki,
  changeOfVariablesJacobianWiki,
  covarianceMatrixWiki,
  bivariateNormalWiki,
  multivariateNormalWiki,
  multivariateMgfWiki,
  pearsonCorrelationWiki,
  klDivergenceWiki,

  // ... and its quadratic-form half, which ends in the regression payoff:
  // XᵀAX, the rank condition that makes its pieces independent chi-squares,
  // and the distribution of beta-hat those two facts produce.
  quadraticFormsRandomVectorsWiki,
  cochransTheoremWiki,
  distributionOfBetaHatWiki,

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
