# Machine Learning Cluster 10 — Practical Modelling & Evaluation

Feature Scaling, Feature Selection, Class Imbalance, Precision-Recall Curves, Probability
Calibration, Nested Cross-Validation, Learning Curves, Distribution Shift, Model Interpretability,
Anomaly Detection (10 concepts, 80 items).

**Authorship note — this cluster inverts the usual direction.** Clusters 1–9 were designed here in
markdown and then ported into typed `Item` entries. These ten concepts did not exist in
`concepts.ts` when those clusters were written; they were added to the graph afterwards, and their
items were authored directly in
[`web/src/data/items-ml/ml-10-practical-modelling.ts`](../web/src/data/items-ml/ml-10-practical-modelling.ts).
This file is therefore an index and a design record rather than a transcript — restating 80 items as
table rows would duplicate the source of truth without adding anything a reader could check.

## Why these ten

Every concept here was already being *referred to* by the fifty articles and 400 items of clusters
1–9, without existing as a node anyone could study:

| Concept | Was cited by |
|---|---|
| `feature-scaling` | `knn`, `svm`, `rbf`, `gradient-descent`, `pca` — five separate articles telling learners to scale, with nothing to link to |
| `feature-selection` | `curse-of-dimensionality`, `random-forests` |
| `class-imbalance` | `confusion-matrices`, `roc-curves`, `multiclass-classification` |
| `precision-recall-curves` | `roc-curves`, whose own imbalance warning names it as the alternative |
| `probability-calibration` | `roc-curves`, `naive-bayes`, `cross-entropy-loss`, `gp-classification` |
| `nested-cross-validation` | `hyperparameters`, `k-fold-cross-validation` |
| `learning-curves` | the natural companion to the bias-variance diagnosis, absent entirely |
| `distribution-shift` | `sensitivity-analysis`, `generative-vs-discriminative-models` |
| `model-interpretability` | `random-forests`, on permutation importance and SHAP |
| `anomaly-detection` | `types-of-machine-learning`, `generative-vs-discriminative-models` |

## Graph edges added

New concepts point only at existing ones, so no existing concept's ancestor set — and therefore no
existing item's seeded difficulty — changed. Four edges were added during authoring because the
verifier caught items that genuinely needed them, and each is a real dependency rather than a
cross-reference:

| Edge | Why it is genuine |
|---|---|
| `feature-selection` → `data-leakage` | Selecting outside the resampling fold is the defining mistake, and cannot be explained to someone who has not met leakage |
| `probability-calibration` → `training-validation-test-set` | The calibration map must itself be fitted on held-out data |
| `distribution-shift` → `data-leakage` | A deployed model shapes the data it is next retrained on — a leakage-shaped failure |
| `anomaly-detection` → `curse-of-dimensionality` | Distance and density both degrade in high dimensions, which is why isolation- and reconstruction-based scores exist |

## Standing graph question

`feature-scaling` arguably belongs *upstream* of `knn`, `svm` and `rbf` rather than beside them — a
learner meeting k-NN is told to scale before the concept exists. That rewiring would change those
concepts' ancestor counts and therefore the seeded difficulty of items already shipped, so it is
left as a decision rather than made silently, alongside the three flagged in the README.

**Coverage: 10 / 10 concepts, 8 live items each, all clearing `verifyItem` with no blockers or
warnings.**
