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
import { ml10PracticalModelling } from "./ml-10-practical-modelling";
import { ml11DeepLearning } from "./ml-11-deep-learning";
import { ml12FurtherParadigms } from "./ml-12-further-paradigms";
import { ml13NeuralArchitectures } from "./ml-13-neural-architectures";
import { ml14TrainingAtScale } from "./ml-14-training-at-scale";
import { ml15AdaptingAndServing } from "./ml-15-adapting-and-serving";

/**
 * All 100 `machine-learning` domain articles, grouped into the same fifteen
 * clusters the question bank uses (`assessments/ml-01…ml-15.md`).
 *
 * Grouped by cluster rather than one file per concept — the pilot's layout —
 * because these articles are deliberately cross-referential: `bagging` cites the
 * ensemble variance formula from `ensemble-methods`, `random-forests` cites
 * `bagging`'s correlation floor, and keeping a cluster in one file is what makes
 * those threads reviewable in a single read.
 *
 * Clusters 13-15 are spread out of numerical order below. They are numbered by
 * when they were authored and read in the order they are taught: 13 and 14
 * extend the deep-learning branch and come before the further-paradigms cluster
 * that draws on them, while 15 rests on transfer learning, self-supervision and
 * reinforcement learning and so comes after it. `sections.ts` places them the
 * same way.
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
  ...ml10PracticalModelling,
  ...ml11DeepLearning,
  ...ml13NeuralArchitectures,
  ...ml14TrainingAtScale,
  ...ml12FurtherParadigms,
  ...ml15AdaptingAndServing,
];
