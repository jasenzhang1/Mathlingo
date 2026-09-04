import type { WikiArticle } from "../types";
import { ml01Foundations } from "./ml-01-foundations";
import { ml02ModelEvaluation } from "./ml-02-model-evaluation";
import { ml03BiasVarianceAndOptimization } from "./ml-03-bias-variance-and-optimization";
import { ml04ClassicClassifiers } from "./ml-04-classic-classifiers";
import { ml05Kernels } from "./ml-05-kernels";
import { ml06TreesAndEnsembles } from "./ml-06-trees-and-ensembles";
import { ml07ClusteringAndDimensionalityReduction } from "./ml-07-clustering-and-dimensionality-reduction";
import { ml08NeuralNetworks } from "./ml-08-neural-networks";
import { ml09GaussianProcesses } from "./ml-09-gaussian-processes";

/**
 * All 50 `machine-learning` domain articles, grouped into the same nine clusters
 * the question bank uses (`assessments/ml-01…ml-09.md`).
 *
 * Grouped by cluster rather than one file per concept — the pilot's layout —
 * because these articles are deliberately cross-referential: `bagging` cites the
 * ensemble variance formula from `ensemble-methods`, `random-forests` cites
 * `bagging`'s correlation floor, and keeping a cluster in one file is what makes
 * those threads reviewable in a single read.
 */
export const mlWikiArticles: WikiArticle[] = [
  ...ml01Foundations,
  ...ml02ModelEvaluation,
  ...ml03BiasVarianceAndOptimization,
  ...ml04ClassicClassifiers,
  ...ml05Kernels,
  ...ml06TreesAndEnsembles,
  ...ml07ClusteringAndDimensionalityReduction,
  ...ml08NeuralNetworks,
  ...ml09GaussianProcesses,
];
