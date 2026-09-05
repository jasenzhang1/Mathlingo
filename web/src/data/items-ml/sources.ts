import type { SourceRef } from "../../lib/assessment/types";

/**
 * Every machine-learning item is `generated` tier: authored from the concept and
 * its prerequisites, with no external problem used as a seed. The `locator`
 * points at the cluster file in `assessments/` where the item was designed and
 * where its rubric, misconception tag and difficulty seed were argued for — the
 * markdown is the design record, these objects are the servable form.
 *
 * Generated-tier carries the highest verification burden precisely because no
 * editor has ever checked it (see `sourcing.ts`). Clusters 1-9 were designed in
 * the markdown first and ported here; clusters 10-12 cover concepts added to the
 * graph later and were authored directly in this typed form, with the markdown
 * written as an index rather than as a full transcript — stated plainly there so
 * the direction of authorship is not misread. Cluster 13 was authored the same
 * way, and is numbered after 12 because that is when it was written; it is
 * taught before it.
 */
function bank(n: string, cluster: string, file: string): SourceRef {
  return {
    id: `mathlingo-ml-${n}`,
    tier: "generated",
    title: `Mathlingo ML assessment bank — cluster ${n} (${cluster})`,
    locator: `assessments/${file}`,
  };
}

export const ML_01 = bank("01", "foundations", "ml-01-foundations.md");
export const ML_02 = bank("02", "model evaluation and selection", "ml-02-model-evaluation-and-selection.md");
export const ML_03 = bank("03", "bias-variance and optimization", "ml-03-bias-variance-and-optimization.md");
export const ML_04 = bank("04", "generative, discriminative and classic classifiers", "ml-04-generative-discriminative-and-classic-classifiers.md");
export const ML_05 = bank("05", "kernels", "ml-05-kernels.md");
export const ML_06 = bank("06", "trees and ensembles", "ml-06-trees-and-ensembles.md");
export const ML_07 = bank("07", "clustering and dimensionality reduction", "ml-07-clustering-and-dimensionality-reduction.md");
export const ML_08 = bank("08", "neural networks", "ml-08-neural-networks.md");
export const ML_09 = bank("09", "Gaussian processes", "ml-09-gaussian-processes.md");
export const ML_10 = bank("10", "practical modelling and evaluation", "ml-10-practical-modelling.md");
export const ML_11 = bank("11", "deep learning", "ml-11-deep-learning.md");
export const ML_12 = bank("12", "further paradigms and methods", "ml-12-further-paradigms.md");
export const ML_13 = bank("13", "neural network architectures", "ml-13-neural-architectures.md");
