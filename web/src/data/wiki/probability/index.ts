import type { WikiArticle } from "../types";

/**
 * Every probability article, in one chunk.
 *
 * Loaded on demand by ../index.ts when a learner opens a probability lesson, so
 * no other domain's articles are fetched. Add new articles here.
 */
import { bernoulliBinomialWiki } from "../bernoulli-binomial";
import { axiomsOfProbability } from "./axioms-of-probability";
import { bayesRule } from "./bayes-rule";
import { cdf } from "./cdf";
import { conditionalProbability } from "./conditional-probability";
import { countingMethods } from "./counting-methods";
import { covariance } from "./covariance";
import { expectation } from "./expectation";
import { exponentialDistribution } from "./exponential-distribution";
import { independenceSetTheory } from "./independence-set-theory";
import { lawOfLargeNumbers } from "./law-of-large-numbers";
import { mle } from "./mle";
import { normalDistribution } from "./normal-distribution";
import { pdf } from "./pdf";
import { pmf } from "./pmf";
import { poissonDistribution } from "./poisson-distribution";
import { randomVariables } from "./random-variables";
import { setTheory } from "./set-theory";
import { variance } from "./variance";
import { chebyshevInequality } from "./chebyshev-inequality";
import { correlation } from "./correlation";
import { geometricDistribution } from "./geometric-distribution";
import { jensenInequality } from "./jensen-inequality";
import { jointDistribution } from "./joint-distribution";
import { lawOfTotalExpectation } from "./law-of-total-expectation";
import { markovInequality } from "./markov-inequality";
import { mgf } from "./mgf";
import { uniformDistribution } from "./uniform-distribution";
import { chiSquareDistribution } from "./chi-square-distribution";
import { cramerRaoLowerBound } from "./cramer-rao-lower-bound";
import { fisherInformation } from "./fisher-information";
import { lawOfTotalVariance } from "./law-of-total-variance";
import { likelihoodVsProbability } from "./likelihood-vs-probability";
import { methodOfMoments } from "./method-of-moments";
import { sufficientStatistic } from "./sufficient-statistic";
import { tDistribution } from "./t-distribution";
import { unbiasedEstimator } from "./unbiased-estimator";
import { conditionalDistribution } from "./conditional-distribution";
import { gammaDistribution } from "./gamma-distribution";
import { hypergeometricDistribution } from "./hypergeometric-distribution";
import { marginalDistribution } from "./marginal-distribution";
import { modesOfConvergence } from "./modes-of-convergence";
import { mutualIndependence } from "./mutual-independence";
import { pieBoole } from "./pie-boole";
import { sigmaAlgebra } from "./sigma-algebra";
import { betaDistribution } from "./beta-distribution";
import { binomialTheorem } from "./binomial-theorem";
import { discreteVsContinuous } from "./discrete-vs-continuous-random-variables";
import { distributionTransformations } from "./distribution-transformations";
import { exponentialFamily } from "./exponential-family";
import { fDistribution } from "./f-distribution";
import { mgfProperties } from "./mgf-properties";
import { negativeBinomialDistribution } from "./negative-binomial-distribution";
import { orderStatistics } from "./order-statistics";
import { power } from "./power";
import { probabilityFunction } from "./probability-function";

const articles: WikiArticle[] = [
  bernoulliBinomialWiki,
  axiomsOfProbability,
  bayesRule,
  cdf,
  conditionalProbability,
  countingMethods,
  covariance,
  expectation,
  exponentialDistribution,
  independenceSetTheory,
  lawOfLargeNumbers,
  mle,
  normalDistribution,
  pdf,
  pmf,
  poissonDistribution,
  randomVariables,
  setTheory,
  variance,
  chebyshevInequality,
  correlation,
  geometricDistribution,
  jensenInequality,
  jointDistribution,
  lawOfTotalExpectation,
  markovInequality,
  mgf,
  uniformDistribution,
  chiSquareDistribution,
  cramerRaoLowerBound,
  fisherInformation,
  lawOfTotalVariance,
  likelihoodVsProbability,
  methodOfMoments,
  sufficientStatistic,
  tDistribution,
  unbiasedEstimator,
  conditionalDistribution,
  gammaDistribution,
  hypergeometricDistribution,
  marginalDistribution,
  modesOfConvergence,
  mutualIndependence,
  pieBoole,
  sigmaAlgebra,
  betaDistribution,
  binomialTheorem,
  discreteVsContinuous,
  distributionTransformations,
  exponentialFamily,
  fDistribution,
  mgfProperties,
  negativeBinomialDistribution,
  orderStatistics,
  power,
  probabilityFunction,
];

export default articles;
