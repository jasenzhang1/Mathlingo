import type { Item } from "../../lib/assessment/types";
import { ML_02 } from "./sources";

/**
 * Cluster 2 — model evaluation and selection. Ported from
 * `assessments/ml-02-model-evaluation-and-selection.md`.
 *
 * Two items were re-phrased on the way across, because the markdown versions
 * leaned on concepts that are not upstream of the concept being tested and
 * would have failed `checkPrereqClosure`:
 *   - `confusion-matrices` R2 cited `type-i-ii-error` by name. The stem now
 *     defines both error types, so it tests the mapping rather than recall of
 *     statistics vocabulary the learner may not have reached.
 *   - `k-fold-cross-validation` E1 cited `sample-mean`. It now makes the same
 *     variance-reduction argument through `variance`, which *is* an ancestor.
 */
export const ml02Items: Item[] = [
  // --- Multiclass Classification -------------------------------------------
  {
    id: "multiclass-classification--recall-definition",
    conceptId: "multiclass-classification",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define multiclass classification.",
    rubric: {
      elements: [
        {
          id: "more-than-two-classes",
          description:
            "Predicting one label out of more than two mutually exclusive categories, as opposed to binary classification.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["multiclass-classification", "classification-vs-regression"],
    source: ML_02,
    status: "live",
  },
  {
    id: "multiclass-classification--recall-one-vs-rest",
    conceptId: "multiclass-classification",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The one-vs-rest (OvR) strategy works by:",
    choices: [
      {
        id: "a",
        text: "training a separate binary classifier per class — that class against everything else — then taking the most confident one",
        correct: true,
      },
      {
        id: "b",
        text: "training one combined classifier that handles all classes natively",
        correct: false,
        misconception: {
          id: "ovr-confused-with-native",
          description:
            "Describes a natively multiclass method (softmax, a decision tree). OvR is a wrapper precisely because the base learner is binary-only.",
          blameConceptId: "multiclass-classification",
        },
      },
      {
        id: "c",
        text: "training one classifier for every pair of classes",
        correct: false,
        misconception: {
          id: "ovr-confused-with-ovo",
          description:
            "That is one-vs-one, which trains K(K−1)/2 classifiers rather than K.",
          blameConceptId: "multiclass-classification",
        },
      },
      {
        id: "d",
        text: "clustering the classes first and then classifying within each cluster",
        correct: false,
        misconception: {
          id: "ovr-confused-with-hierarchical",
          description:
            "Describes a hierarchical scheme. OvR involves no unsupervised step and no class grouping.",
          blameConceptId: "multiclass-classification",
        },
      },
    ],
    difficulty: -0.45,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["multiclass-classification"],
    source: ML_02,
    status: "live",
  },
  {
    id: "multiclass-classification--apply-ovr-count",
    conceptId: "multiclass-classification",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Using one-vs-rest for a 5-class digit classification problem, how many binary classifiers are trained?",
    answerKey: 5,
    tolerance: 0.001,
    difficulty: 0.1,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["multiclass-classification"],
    source: ML_02,
    status: "live",
  },
  {
    id: "multiclass-classification--explain-ovr-vs-ovo",
    conceptId: "multiclass-classification",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Distinguish one-vs-rest from one-vs-one for K classes, including how many classifiers each trains and what the trade-off is.",
    rubric: {
      elements: [
        {
          id: "ovr-count",
          description: "OvR trains K classifiers, each pitting one class against all the rest.",
          weight: 3,
          required: true,
        },
        {
          id: "ovo-count",
          description: "OvO trains K(K−1)/2 classifiers, one per pair of classes.",
          weight: 3,
          required: true,
        },
        {
          id: "trade-off",
          description:
            "States the trade-off: OvO has more classifiers but each sub-problem is smaller and better balanced, while OvR's sub-problems are all imbalanced.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["multiclass-classification"],
    source: ML_02,
    status: "live",
  },
  {
    id: "multiclass-classification--transfer-softmax-at-scale",
    conceptId: "multiclass-classification",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why is a native softmax output generally preferred over OvR or OvO wrappers when there are very many classes — say 1,000-class image classification?",
    rubric: {
      elements: [
        {
          id: "softmax-is-one-model",
          description:
            "Softmax produces one probability distribution over all classes from a single model.",
          weight: 3,
          required: true,
        },
        {
          id: "scaling-comparison",
          description:
            "Makes the scaling comparison explicit: OvR would need 1,000 classifiers and OvO about half a million, which is prohibitive.",
          weight: 4,
          required: true,
        },
        {
          id: "comparable-scores",
          description:
            "Bonus: notes that separately trained OvR scores are not directly comparable, while a softmax's are normalised together.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.4,
    expectedSeconds: 190,
    prereqClosure: ["multiclass-classification"],
    source: ML_02,
    status: "live",
  },


  {
    id: "multiclass-classification--apply-ovo-count",
    conceptId: "multiclass-classification",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Using one-vs-one for a 10-class problem, how many binary classifiers are trained?",
    answerKey: 45,
    tolerance: 0.001,
    difficulty: 0.4,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["multiclass-classification"],
    source: ML_02,
    status: "live",
  },
  {
    id: "multiclass-classification--explain-softmax-normalisation",
    conceptId: "multiclass-classification",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Softmax divides each exponentiated score by the sum over all classes. What does that normalisation enforce, and why is it wrong for a task where an article can be about both sport and politics?",
    rubric: {
      elements: [
        {
          id: "enforces-mutual-exclusivity",
          description:
            "The normalisation forces the outputs to sum to 1, so raising one class's probability necessarily lowers the others — it encodes that exactly one label is correct.",
          weight: 4,
          required: true,
        },
        {
          id: "wrong-for-multi-label",
          description:
            "When several labels can be simultaneously true that coupling is false, and the right construction is K independent sigmoids whose outputs need not sum to anything.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["multiclass-classification"],
    source: ML_02,
    status: "live",
  },
  {
    id: "multiclass-classification--transfer-averaging-choice",
    conceptId: "multiclass-classification",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A 20-class model is reported at 96% by one metric and 41% by another, on the same predictions. Explain how both can be right, and what the gap tells you about the model.",
    rubric: {
      elements: [
        {
          id: "micro-vs-macro",
          description:
            "Pooling all predictions before computing the metric lets the large classes dominate; averaging the metric per class first gives every class equal weight regardless of size.",
          weight: 4,
          required: true,
        },
        {
          id: "what-the-gap-means",
          description:
            "A large gap means the model performs well on the common classes and badly on the rare ones — it is telling you exactly where the failure is concentrated.",
          weight: 4,
          required: true,
        },
        {
          id: "the-values-statement",
          description:
            "Bonus: notes that choosing which to report is a statement about whether the typical example or the typical class matters.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["multiclass-classification"],
    source: ML_02,
    status: "live",
  },

  // --- Confusion Matrices ---------------------------------------------------
  {
    id: "confusion-matrices--recall-four-cells",
    conceptId: "confusion-matrices",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the four cells of a binary confusion matrix.",
    rubric: {
      elements: [
        {
          id: "all-four",
          description: "True positive, false positive, true negative, false negative.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -0.7,
    discrimination: 0.9,
    expectedSeconds: 35,
    prereqClosure: ["confusion-matrices", "classification-vs-regression"],
    source: ML_02,
    status: "live",
  },
  {
    id: "confusion-matrices--recall-error-type-mapping",
    conceptId: "confusion-matrices",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In hypothesis testing, a Type I error is a false alarm — rejecting a null hypothesis that was true — and a Type II error is a miss. Which confusion-matrix cells do these correspond to?",
    choices: [
      {
        id: "a",
        text: "Type I is a false positive; Type II is a false negative",
        correct: true,
      },
      {
        id: "b",
        text: "Type I is a false negative; Type II is a false positive",
        correct: false,
        misconception: {
          id: "error-types-swapped",
          description:
            "Inverts the mapping. A false alarm is raising the positive flag when it should not be raised — a false positive.",
          blameConceptId: "confusion-matrices",
        },
      },
      {
        id: "c",
        text: "Type I is a true positive; Type II is a true negative",
        correct: false,
        misconception: {
          id: "error-types-mapped-to-correct-cells",
          description:
            "Maps error types onto the correct-prediction cells. Both Type I and Type II name mistakes, so both must land off the diagonal.",
          blameConceptId: "confusion-matrices",
        },
      },
      {
        id: "d",
        text: "Neither corresponds — precision and recall are unrelated vocabulary",
        correct: false,
        misconception: {
          id: "treats-as-fresh-vocabulary",
          description:
            "Treats classification metrics as a separate world from hypothesis testing. The two vocabularies name the same two mistakes, which is worth carrying across rather than re-learning.",
          blameConceptId: "confusion-matrices",
        },
      },
    ],
    difficulty: -0.45,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["confusion-matrices"],
    source: ML_02,
    status: "live",
  },
  {
    id: "confusion-matrices--apply-compute-three-metrics",
    conceptId: "confusion-matrices",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A classifier scores TP = 80, FP = 20, TN = 850, FN = 50. Compute accuracy, precision, and recall, showing each fraction.",
    rubric: {
      elements: [
        {
          id: "accuracy",
          description: "Accuracy = (80 + 850)/1000 = 0.93.",
          weight: 2,
          required: true,
        },
        {
          id: "precision",
          description: "Precision = 80/(80 + 20) = 0.80.",
          weight: 2,
          required: true,
        },
        {
          id: "recall",
          description: "Recall = 80/(80 + 50) = 80/130 ≈ 0.615.",
          weight: 2,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "swaps-precision-and-recall",
          description:
            "Puts FN in precision's denominator or FP in recall's — the single most common slip, and it reverses which error the metric is sensitive to.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["confusion-matrices"],
    source: ML_02,
    status: "live",
  },
  {
    id: "confusion-matrices--explain-accuracy-under-imbalance",
    conceptId: "confusion-matrices",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Fraud occurs in 1% of transactions. Explain how a classifier can reach 99% accuracy and still be useless, using the metrics to show it.",
    rubric: {
      elements: [
        {
          id: "trivial-classifier",
          description:
            "Constructs the trivial classifier: predict 'not fraud' for everything.",
          weight: 3,
          required: true,
        },
        {
          id: "accuracy-and-recall",
          description:
            "Computes both — accuracy 99%, recall 0, with precision undefined since no positive was ever predicted.",
          weight: 4,
          required: true,
        },
        {
          id: "conclusion-about-accuracy",
          description:
            "Concludes that accuracy alone cannot distinguish a useful model from one that never fires on the class of interest.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["confusion-matrices"],
    source: ML_02,
    status: "live",
  },
  {
    id: "confusion-matrices--transfer-which-error-costs-more",
    conceptId: "confusion-matrices",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Which metric is hurt by false positives and which by false negatives? Use that to explain why a spam filter and a cancer screening test prioritise them differently.",
    rubric: {
      elements: [
        {
          id: "both-directions",
          description:
            "Precision = TP/(TP+FP) is hurt by false positives; recall = TP/(TP+FN) is hurt by false negatives.",
          weight: 4,
          required: true,
        },
        {
          id: "application-pair",
          description:
            "Applies it concretely: a spam filter favours precision because burying a real email is costly; a cancer screen favours recall because a missed case is far worse than a follow-up test.",
          weight: 4,
          required: true,
        },
        {
          id: "threshold-is-the-lever",
          description:
            "Bonus: notes the decision threshold is what moves along this trade-off, so both are properties of the model *and* its operating point.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["confusion-matrices"],
    source: ML_02,
    status: "live",
  },


  {
    id: "confusion-matrices--apply-f1-from-counts",
    conceptId: "confusion-matrices",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A classifier has precision 0.8 and recall 0.5. Compute its F1 score, the harmonic mean 2·P·R/(P + R), to three decimal places.",
    answerKey: 0.615,
    tolerance: 0.005,
    difficulty: 0.4,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["confusion-matrices"],
    source: ML_02,
    status: "live",
  },
  {
    id: "confusion-matrices--explain-f1-ignores-tn",
    conceptId: "confusion-matrices",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "F1 is built from precision and recall, and neither of those mentions true negatives. What does that mean F1 cannot see, and when does it matter?",
    rubric: {
      elements: [
        {
          id: "three-of-four-cells",
          description:
            "F1 uses only TP, FP and FN — three of the four cells — so correctly rejected negatives contribute nothing to the score.",
          weight: 4,
          required: true,
        },
        {
          id: "when-it-matters",
          description:
            "It matters when correctly leaving negatives alone is itself valuable — a screening tool whose value is partly in not alarming healthy people — where a metric involving specificity is the honest one.",
          weight: 4,
          required: true,
        },
        {
          id: "equal-weighting-assumption",
          description:
            "Bonus: notes that the harmonic mean also assumes precision and recall matter equally, which Fβ exists to relax.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["confusion-matrices"],
    source: ML_02,
    status: "live",
  },
  {
    id: "confusion-matrices--transfer-offdiagonal-diagnosis",
    conceptId: "confusion-matrices",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "For a 10-class digit classifier, why is the full 10 × 10 confusion matrix worth reading rather than just the per-class F1 scores?",
    rubric: {
      elements: [
        {
          id: "off-diagonals-carry-the-diagnosis",
          description:
            "The off-diagonal entries say *which* class each error went to: a model confusing 4s with 9s has a different problem from one confusing 4s with 7s, and per-class scores collapse both into one number.",
          weight: 5,
          required: true,
        },
        {
          id: "actionability",
          description:
            "That distinction is what suggests the fix — more training data for a specific pair, a feature that separates them, or a merged label if the classes are genuinely not distinguishable.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["confusion-matrices"],
    source: ML_02,
    status: "live",
  },

  // --- ROC Curves -----------------------------------------------------------
  {
    id: "roc-curves--recall-definition",
    conceptId: "roc-curves",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define an ROC curve.",
    rubric: {
      elements: [
        {
          id: "tpr-vs-fpr",
          description: "True positive rate plotted against false positive rate.",
          weight: 3,
          required: true,
        },
        {
          id: "across-thresholds",
          description: "One point per decision threshold, swept across all thresholds.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.6,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["roc-curves", "confusion-matrices"],
    source: ML_02,
    status: "live",
  },
  {
    id: "roc-curves--recall-random-auc",
    conceptId: "roc-curves",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the AUC of a classifier that ranks examples at random?",
    choices: [
      { id: "a", text: "0.5", correct: true },
      {
        id: "b",
        text: "0.0",
        correct: false,
        misconception: {
          id: "useless-confused-with-always-wrong",
          description:
            "Confuses 'uninformative' with 'always wrong'. AUC 0 means the ranking is perfectly inverted, which is a fully informative classifier with its sign flipped.",
          blameConceptId: "roc-curves",
        },
      },
      {
        id: "c",
        text: "1.0",
        correct: false,
        misconception: {
          id: "auc-scale-inverted",
          description:
            "Reads the scale backwards. AUC 1 is perfect separation, not chance.",
          blameConceptId: "roc-curves",
        },
      },
      {
        id: "d",
        text: "It depends on the class balance",
        correct: false,
        misconception: {
          id: "random-auc-thought-balance-dependent",
          description:
            "AUC is the probability a random positive outranks a random negative; under random ranking that is 0.5 whatever the class proportions. Class balance affects how *informative* AUC is, not its chance value.",
          blameConceptId: "roc-curves",
        },
      },
    ],
    difficulty: -0.35,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["roc-curves"],
    source: ML_02,
    status: "live",
  },
  {
    id: "roc-curves--apply-interpret-auc",
    conceptId: "roc-curves",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A classifier has AUC = 0.95. Is that good or bad, and against what baseline do you judge it?",
    rubric: {
      elements: [
        {
          id: "very-good",
          description: "Very good — strong discrimination across thresholds.",
          weight: 2,
          required: true,
        },
        {
          id: "baseline-is-0.5",
          description: "Judged against the 0.5 random-ranking baseline, not against 0.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["roc-curves"],
    source: ML_02,
    status: "live",
  },
  {
    id: "roc-curves--explain-why-all-thresholds",
    conceptId: "roc-curves",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is it useful to evaluate a classifier across all thresholds rather than at one fixed cutoff?",
    rubric: {
      elements: [
        {
          id: "different-apps-want-different-cutoffs",
          description:
            "Different applications operate at different thresholds depending on which error costs more.",
          weight: 3,
          required: true,
        },
        {
          id: "summarises-ranking-quality",
          description:
            "AUC summarises how well the model *ranks* examples, independent of which threshold is eventually chosen, rather than committing to an arbitrary default like 0.5.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["roc-curves"],
    source: ML_02,
    status: "live",
  },
  {
    id: "roc-curves--transfer-imbalance-denominator",
    conceptId: "roc-curves",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "On a dataset that is 99% negative, ROC/AUC can look reassuring while the model is unusable. What is the mechanism, and which curve would show the problem?",
    rubric: {
      elements: [
        {
          id: "fpr-denominator-is-huge",
          description:
            "Names the mechanism: FPR's denominator is the count of actual negatives, which is enormous, so even a large absolute number of false positives is a tiny rate.",
          weight: 5,
          required: true,
        },
        {
          id: "precision-recall-curve",
          description:
            "Identifies the precision–recall curve as the alternative, because its denominators involve the rare positive class directly.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-without-mechanism",
          description:
            "Says only that 'ROC can be misleading on imbalanced data' without naming the denominator that causes it.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["roc-curves", "confusion-matrices"],
    source: ML_02,
    status: "live",
  },


  {
    id: "roc-curves--apply-count-ordered-pairs",
    conceptId: "roc-curves",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A model scores 3 positives above all 4 negatives except for one negative that outranks one positive. Of the 12 positive–negative pairs, how many are correctly ordered? (AUC is that count divided by 12.)",
    answerKey: 11,
    tolerance: 0.001,
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["roc-curves"],
    source: ML_02,
    status: "live",
  },
  {
    id: "roc-curves--explain-auc-probabilistic-reading",
    conceptId: "roc-curves",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "AUC equals the probability that a randomly chosen positive scores higher than a randomly chosen negative. Use that reading to explain why AUC is threshold-free and why it says nothing about calibration.",
    rubric: {
      elements: [
        {
          id: "threshold-free",
          description:
            "The statement involves only the *ordering* of scores, so no threshold appears in it — AUC is a property of the ranking alone.",
          weight: 4,
          required: true,
        },
        {
          id: "silent-on-calibration",
          description:
            "Any monotone rescaling of the scores leaves every pairwise comparison unchanged, so AUC is identical for a confidently correct model and a barely-committed one with the same ordering.",
          weight: 4,
          required: true,
        },
        {
          id: "what-checks-calibration",
          description:
            "Bonus: names what would check it — a reliability diagram, or a proper scoring rule like the Brier score or log loss.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["roc-curves"],
    source: ML_02,
    status: "live",
  },
  {
    id: "roc-curves--transfer-partial-auc",
    conceptId: "roc-curves",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A fraud team can investigate at most 0.5% of transactions, so any operating point above that false-positive rate is unreachable. Why is a single AUC figure a poor summary here, and what would be better?",
    rubric: {
      elements: [
        {
          id: "auc-averages-over-unreachable-points",
          description:
            "AUC integrates over the entire false-positive range, so most of what it summarises is operating points the team can never adopt — two models with equal AUC can differ sharply in the sliver that matters.",
          weight: 5,
          required: true,
        },
        {
          id: "better-alternatives",
          description:
            "Names a better summary: partial AUC restricted to the reachable FPR region, precision at a fixed review budget, or the confusion matrix at the actual threshold.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.65,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["roc-curves", "confusion-matrices"],
    source: ML_02,
    status: "live",
  },

  // --- K-Fold Cross-Validation ---------------------------------------------
  {
    id: "k-fold-cross-validation--recall-procedure",
    conceptId: "k-fold-cross-validation",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe k-fold cross-validation.",
    rubric: {
      elements: [
        {
          id: "split-into-k",
          description: "Split the data into k roughly equal folds.",
          weight: 2,
          required: true,
        },
        {
          id: "rotate-heldout-fold",
          description:
            "Train on k−1 folds and validate on the held-out one, rotating which fold is held out.",
          weight: 3,
          required: true,
        },
        {
          id: "average-the-scores",
          description: "Average the k validation scores.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.03,
    discrimination: 1.1,
    expectedSeconds: 70,
    prereqClosure: ["k-fold-cross-validation", "training-validation-test-set"],
    source: ML_02,
    status: "live",
  },
  {
    id: "k-fold-cross-validation--recall-advantage",
    conceptId: "k-fold-cross-validation",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The main advantage of k-fold cross-validation over a single train/validation split is:",
    choices: [
      {
        id: "a",
        text: "every observation is validated on exactly once, so the estimate depends far less on one lucky or unlucky split",
        correct: true,
      },
      {
        id: "b",
        text: "it eliminates the need for a held-out test set entirely",
        correct: false,
        misconception: {
          id: "cv-replaces-test-set",
          description:
            "Cross-validation estimates error during model selection; a test set gives an unbiased final number after selection. They answer different questions, and selecting on CV scores makes those scores optimistic too.",
          blameConceptId: "k-fold-cross-validation",
        },
      },
      {
        id: "c",
        text: "it trains a better final model than a single split does",
        correct: false,
        misconception: {
          id: "cv-thought-to-improve-the-model",
          description:
            "Cross-validation is an estimation procedure, not a fitting procedure. The k models it builds are discarded; the deliverable is refitted on all the data.",
          blameConceptId: "k-fold-cross-validation",
        },
      },
      {
        id: "d",
        text: "it removes the need to choose hyperparameters",
        correct: false,
        misconception: {
          id: "cv-thought-to-remove-tuning",
          description:
            "Cross-validation is the machinery *used* to choose hyperparameters, not a substitute for choosing them.",
          blameConceptId: "hyperparameters",
        },
      },
    ],
    difficulty: 0.27,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["k-fold-cross-validation"],
    source: ML_02,
    status: "live",
  },
  {
    id: "k-fold-cross-validation--apply-fold-sizes",
    conceptId: "k-fold-cross-validation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Running 5-fold cross-validation on 1,000 examples, how many examples are used for training in each round?",
    answerKey: 800,
    tolerance: 0.001,
    difficulty: 0.77,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["k-fold-cross-validation"],
    source: ML_02,
    status: "live",
  },
  {
    id: "k-fold-cross-validation--explain-averaging-reduces-variance",
    conceptId: "k-fold-cross-validation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does averaging k fold scores give a more reliable error estimate than a single split's score?",
    rubric: {
      elements: [
        {
          id: "each-score-is-noisy",
          description:
            "Each fold's score is a noisy estimate of the same underlying quantity.",
          weight: 3,
          required: true,
        },
        {
          id: "averaging-reduces-variance",
          description:
            "Averaging several such estimates reduces the variance of the result — the same variance-of-an-average argument met earlier, not merely 'more data is better'.",
          weight: 4,
          required: true,
        },
        {
          id: "folds-are-not-independent",
          description:
            "Bonus: notes the folds share training data, so they are positively correlated and the reduction is less than the independent-case 1/k.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "answers-more-data",
          description:
            "Answers only that cross-validation 'uses more of the data', which does not explain why the *estimate* is more stable.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.47,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["k-fold-cross-validation", "variance", "expectation"],
    source: ML_02,
    status: "live",
  },
  {
    id: "k-fold-cross-validation--transfer-cost-tradeoff",
    conceptId: "k-fold-cross-validation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why is k-fold cross-validation more expensive than a single split, and when is that cost worth paying — and when is it not?",
    rubric: {
      elements: [
        {
          id: "k-training-runs",
          description: "It needs k full training runs instead of one.",
          weight: 3,
          required: true,
        },
        {
          id: "worth-it-when",
          description:
            "Worth it on smaller datasets and cheaper models, where a single split's estimate is noisy and the compute is affordable.",
          weight: 3,
          required: true,
        },
        {
          id: "not-worth-it-when",
          description:
            "Not worth it for very large datasets — where a single split is already a low-variance estimate — or for models too expensive to train k times.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.97,
    discrimination: 1.4,
    expectedSeconds: 200,
    prereqClosure: ["k-fold-cross-validation"],
    source: ML_02,
    status: "live",
  },


  {
    id: "k-fold-cross-validation--apply-count-the-fits",
    conceptId: "k-fold-cross-validation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Nested cross-validation uses an outer 5-fold loop, and inside each outer fold an inner 4-fold loop evaluates 6 hyperparameter settings. Counting only the inner-loop fits, how many model fits does the whole procedure perform?",
    answerKey: 120,
    tolerance: 0.001,
    difficulty: 1.3,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["k-fold-cross-validation"],
    source: ML_02,
    status: "live",
  },
  {
    id: "k-fold-cross-validation--explain-loocv-tradeoff",
    conceptId: "k-fold-cross-validation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Leave-one-out cross-validation trains on n − 1 points every time, so its estimate is nearly unbiased. Why is it nonetheless usually not the best choice?",
    rubric: {
      elements: [
        {
          id: "highly-correlated-estimates",
          description:
            "The n training sets are nearly identical, so the n error estimates are strongly positively correlated — and averaging correlated quantities reduces variance far less than averaging independent ones.",
          weight: 5,
          required: true,
        },
        {
          id: "and-the-cost",
          description:
            "It also costs n model fits rather than 5 or 10, so it pays the most and gets a low-bias but high-variance estimate in return.",
          weight: 3,
          required: true,
        },
        {
          id: "the-exception",
          description:
            "Bonus: notes the exception — for least-squares linear models it has a closed form via leverage values, costing one fit rather than n.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["k-fold-cross-validation"],
    source: ML_02,
    status: "live",
  },
  {
    id: "k-fold-cross-validation--transfer-forward-chaining",
    conceptId: "k-fold-cross-validation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Describe how cross-validation must be restructured for a time series, and what a standard random-fold version would actually be measuring.",
    rubric: {
      elements: [
        {
          id: "forward-chaining",
          description:
            "Use forward chaining: train on a prefix of the series and validate on the block immediately after it, rolling the boundary forward — folds are ordered, never shuffled.",
          weight: 4,
          required: true,
        },
        {
          id: "what-random-folds-measure",
          description:
            "Random folds train on data from after the validation period, so the score measures interpolation between known points rather than forecasting — a quantity that is optimistic and unavailable in deployment.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["k-fold-cross-validation", "training-validation-test-set"],
    source: ML_02,
    status: "live",
  },

  // --- Hyperparameters ------------------------------------------------------
  {
    id: "hyperparameters--recall-definition",
    conceptId: "hyperparameters",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define a hyperparameter and give an example.",
    rubric: {
      elements: [
        {
          id: "set-before-training",
          description:
            "A setting fixed before training that controls the learning process or the model's complexity, rather than being produced by the fitting procedure.",
          weight: 4,
          required: true,
        },
        {
          id: "example",
          description:
            "Gives a real example — learning rate, number of trees, k in k-NN, ridge penalty λ.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["hyperparameters", "k-fold-cross-validation"],
    source: ML_02,
    status: "live",
  },
  {
    id: "hyperparameters--recall-where-tuned",
    conceptId: "hyperparameters",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Hyperparameters are typically tuned using:",
    choices: [
      {
        id: "a",
        text: "held-out validation data, usually via cross-validation",
        correct: true,
      },
      {
        id: "b",
        text: "the training loss, exactly the way model parameters are learned",
        correct: false,
        misconception: {
          id: "tuned-on-training-loss",
          description:
            "Training loss is monotone in flexibility, so optimising a complexity hyperparameter against it always selects the most overfit setting available.",
          blameConceptId: "hyperparameters",
        },
      },
      {
        id: "c",
        text: "the test set, since that is the most realistic estimate",
        correct: false,
        misconception: {
          id: "tuned-on-test",
          description:
            "Any set used for selection stops being an unbiased estimator. Tuning on the test set destroys the only honest number you had.",
          blameConceptId: "training-validation-test-set",
        },
      },
      {
        id: "d",
        text: "published defaults, which are optimal for any dataset",
        correct: false,
        misconception: {
          id: "defaults-assumed-optimal",
          description:
            "Defaults are reasonable starting points chosen without knowledge of your data, not optima.",
          blameConceptId: "hyperparameters",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["hyperparameters"],
    source: ML_02,
    status: "live",
  },
  {
    id: "hyperparameters--apply-classify-two",
    conceptId: "hyperparameters",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Is the learning rate a parameter or a hyperparameter? What about the learned weight vector? Justify each.",
    rubric: {
      elements: [
        {
          id: "learning-rate",
          description: "Learning rate: hyperparameter — set before training begins.",
          weight: 3,
          required: true,
        },
        {
          id: "weights",
          description:
            "Weight vector: parameter — produced by the fitting procedure from the data.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["hyperparameters"],
    source: ML_02,
    status: "live",
  },
  {
    id: "hyperparameters--explain-why-not-gradient-descent",
    conceptId: "hyperparameters",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why can't a complexity hyperparameter simply be optimised by gradient descent on the training loss, the way parameters are?",
    rubric: {
      elements: [
        {
          id: "training-loss-always-prefers-complexity",
          description:
            "Names the mechanism: training loss decreases monotonically with flexibility, so it will always pick maximum complexity — λ = 0, unlimited depth, k = 1.",
          weight: 5,
          required: true,
        },
        {
          id: "needs-separate-signal",
          description:
            "Concludes that a separate held-out signal is required because training loss is a biased guide for these choices specifically.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["hyperparameters", "overfitting-underfitting"],
    source: ML_02,
    status: "live",
  },
  {
    id: "hyperparameters--transfer-grid-search-blowup",
    conceptId: "hyperparameters",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why does grid search become infeasible as the number of hyperparameters grows, and what is typically used instead?",
    rubric: {
      elements: [
        {
          id: "exponential-blowup",
          description:
            "Names the exponential blow-up: v values across h hyperparameters is v^h combinations, so adding one hyperparameter multiplies the cost.",
          weight: 4,
          required: true,
        },
        {
          id: "alternatives",
          description:
            "Names random search or Bayesian optimisation as the practical alternatives, which do not require covering a lattice.",
          weight: 3,
          required: true,
        },
        {
          id: "why-random-wins",
          description:
            "Bonus: explains why random search beats grid at equal budget — it tries many distinct values of the hyperparameter that actually matters, rather than a handful.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["hyperparameters"],
    source: ML_02,
    status: "live",
  },


  {
    id: "hyperparameters--apply-grid-size",
    conceptId: "hyperparameters",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A grid search tries 4 values each of 5 hyperparameters, and scores every combination with 5-fold cross-validation. How many model fits does it perform?",
    answerKey: 5120,
    tolerance: 0.001,
    difficulty: 1.3,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["hyperparameters", "k-fold-cross-validation"],
    source: ML_02,
    status: "live",
  },
  {
    id: "hyperparameters--explain-log-scale-search",
    conceptId: "hyperparameters",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Learning rates, regularisation strengths and kernel bandwidths are conventionally searched on a log scale rather than a linear one. Why?",
    rubric: {
      elements: [
        {
          id: "variation-is-multiplicative",
          description:
            "What matters about these parameters is their order of magnitude — the difference between 0.001 and 0.01 is as consequential as between 0.1 and 1, while 0.501 and 0.502 are indistinguishable.",
          weight: 4,
          required: true,
        },
        {
          id: "linear-grid-wastes-budget",
          description:
            "A linear grid spends almost all its points in one order of magnitude and never visits the others, so most of the search budget buys no information.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["hyperparameters"],
    source: ML_02,
    status: "live",
  },
  {
    id: "hyperparameters--transfer-why-random-beats-grid",
    conceptId: "hyperparameters",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "At an equal budget of 27 fits over 3 hyperparameters, random search usually beats a 3 × 3 × 3 grid. Give the geometric reason, and the assumption about the problem that makes it hold.",
    rubric: {
      elements: [
        {
          id: "distinct-values-per-parameter",
          description:
            "The grid tries only 3 distinct values of each hyperparameter across all 27 fits; 27 random draws try up to 27 distinct values of each.",
          weight: 4,
          required: true,
        },
        {
          id: "the-assumption",
          description:
            "It holds because effective dimension is usually low — one or two hyperparameters dominate and the rest barely matter — so the random design explores the important one nine times as finely.",
          weight: 5,
          required: true,
        },
        {
          id: "when-it-fails",
          description:
            "Bonus: notes it would not hold if every hyperparameter mattered equally and interacted strongly.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.6,
    expectedSeconds: 230,
    prereqClosure: ["hyperparameters"],
    source: ML_02,
    status: "live",
  },

  // --- Sensitivity Analysis -------------------------------------------------
  {
    id: "sensitivity-analysis--recall-definition",
    conceptId: "sensitivity-analysis",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define sensitivity analysis in a modelling context.",
    rubric: {
      elements: [
        {
          id: "systematic-variation",
          description:
            "Systematically varying inputs, assumptions or hyperparameters and observing how much the output or performance changes.",
          weight: 4,
          required: true,
        },
        {
          id: "purpose",
          description:
            "States the purpose: assessing robustness and identifying which factors actually matter.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 0.02,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["sensitivity-analysis", "hyperparameters"],
    source: ML_02,
    status: "live",
  },
  {
    id: "sensitivity-analysis--recall-unstable-model",
    conceptId: "sensitivity-analysis",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A model whose predictions change wildly under tiny hyperparameter changes is best described as:",
    choices: [
      {
        id: "a",
        text: "sensitive, or unstable, with respect to that hyperparameter",
        correct: true,
      },
      {
        id: "b",
        text: "well regularised",
        correct: false,
        misconception: {
          id: "instability-called-regularised",
          description:
            "Exactly reverses the meaning. Regularisation is what makes a fit stable under small changes.",
          blameConceptId: "sensitivity-analysis",
        },
      },
      {
        id: "c",
        text: "well tuned, since it responds to its settings",
        correct: false,
        misconception: {
          id: "responsiveness-mistaken-for-tuning",
          description:
            "Confuses responsiveness with quality. A sharp peak means the good score depends on a value that was itself estimated from finite data.",
          blameConceptId: "sensitivity-analysis",
        },
      },
      {
        id: "d",
        text: "underfitting",
        correct: false,
        misconception: {
          id: "instability-called-underfitting",
          description:
            "Underfitting is a bias problem visible as high error everywhere; this is a stability problem visible across settings.",
          blameConceptId: "overfitting-underfitting",
        },
      },
    ],
    difficulty: 0.32,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["sensitivity-analysis"],
    source: ML_02,
    status: "live",
  },
  {
    id: "sensitivity-analysis--apply-learning-rate-cliff",
    conceptId: "sensitivity-analysis",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Accuracy is 85% at learning rate 0.01, 84% at 0.011, and 40% at 0.015. What does this suggest, and what practical caution follows?",
    rubric: {
      elements: [
        {
          id: "instability-region",
          description:
            "Identifies an unstable region beginning somewhere past 0.011 — plausibly the onset of divergence.",
          weight: 3,
          required: true,
        },
        {
          id: "caution-about-proximity",
          description:
            "Draws the caution: do not settle on a value close to that boundary even if it tests well now, since a different seed or slightly different data could push performance over the cliff.",
          weight: 4,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "stops-at-it-is-sensitive",
          description:
            "Notes only that the model is sensitive here, without the operational conclusion about how far from the boundary to sit.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.82,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["sensitivity-analysis", "hyperparameters"],
    source: ML_02,
    status: "live",
  },
  {
    id: "sensitivity-analysis--explain-vs-tuning",
    conceptId: "sensitivity-analysis",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "How does sensitivity analysis differ conceptually from ordinary hyperparameter tuning?",
    rubric: {
      elements: [
        {
          id: "tuning-asks-which-is-best",
          description: "Tuning searches for the single setting with the best validation score.",
          weight: 3,
          required: true,
        },
        {
          id: "sensitivity-asks-how-much-it-moves",
          description:
            "Sensitivity analysis asks how much performance changes *near* a chosen setting — information about robustness rather than about which value wins.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.52,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["sensitivity-analysis", "hyperparameters"],
    source: ML_02,
    status: "live",
  },
  {
    id: "sensitivity-analysis--transfer-safety-critical",
    conceptId: "sensitivity-analysis",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A safety-critical system has found the hyperparameters with the best validation score. Why should it still run a sensitivity analysis before deploying?",
    rubric: {
      elements: [
        {
          id: "edge-of-instability-risk",
          description:
            "A setting perched near an unstable region can behave unpredictably once live data drifts even slightly from the validation distribution.",
          weight: 4,
          required: true,
        },
        {
          id: "score-says-nothing-about-the-cliff",
          description:
            "States the key point: the best validation score alone carries no information about how close to a cliff that setting sits.",
          weight: 4,
          required: true,
        },
        {
          id: "prefers-robust-over-peak",
          description:
            "Bonus: concludes that a marginally lower but flat optimum is usually the better deployment choice.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.02,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["sensitivity-analysis", "hyperparameters"],
    source: ML_02,
    status: "live",
  },

  {
    id: "sensitivity-analysis--apply-choose-between-two-models",
    conceptId: "sensitivity-analysis",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Model A scores 0.87 at its best penalty value and drops to 0.61 if that value moves by a factor of two. Model B scores 0.85 across three orders of magnitude. Which would you deploy, and why is the 0.02 gap not decisive?",
    rubric: {
      elements: [
        {
          id: "chooses-b",
          description: "Chooses B for a production deployment.",
          weight: 2,
          required: true,
        },
        {
          id: "peak-was-selected-on-noise",
          description:
            "A's peak was located using finite validation data, so the true optimum is probably not exactly where A found it — the 0.02 advantage is within the noise of the selection procedure.",
          weight: 4,
          required: true,
        },
        {
          id: "drift-moves-the-optimum",
          description:
            "Under distribution drift the optimal setting moves, and A falls off its peak while B does not — the fragility is not within the noise.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["sensitivity-analysis", "hyperparameters"],
    source: ML_02,
    status: "live",
  },
  {
    id: "sensitivity-analysis--explain-one-at-a-time-blind-spot",
    conceptId: "sensitivity-analysis",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Varying each hyperparameter alone while holding the others at their tuned values is the most common sensitivity check. What can it miss entirely?",
    rubric: {
      elements: [
        {
          id: "explores-only-a-cross",
          description:
            "It explores a cross through the space — one line per parameter through the chosen point — and nothing off those lines.",
          weight: 4,
          required: true,
        },
        {
          id: "interactions-invisible",
          description:
            "So interacting parameters, such as learning rate and batch size, can make the surface look flat along every axis while a cliff sits a short diagonal step away.",
          weight: 4,
          required: true,
        },
        {
          id: "the-fix",
          description:
            "Bonus: names global methods — random sweeps over the joint space, or variance-based sensitivity indices — as what actually covers it.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["sensitivity-analysis", "hyperparameters"],
    source: ML_02,
    status: "live",
  },
  {
    id: "sensitivity-analysis--transfer-data-sensitivity",
    conceptId: "sensitivity-analysis",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Sensitivity analysis can vary the data as well as the settings. Describe how you would check whether a conclusion rests on a handful of observations, and what you would conclude either way.",
    rubric: {
      elements: [
        {
          id: "method",
          description:
            "Refit on bootstrap resamples, or with the most influential points removed, and observe how much the conclusion moves.",
          weight: 4,
          required: true,
        },
        {
          id: "what-instability-means",
          description:
            "Large swings mean the finding is carried by a few rows, so it should be reported with that caveat, or the rows themselves audited — a result that depends on five observations is a claim about those observations.",
          weight: 4,
          required: true,
        },
        {
          id: "stability-is-a-finding",
          description:
            "Bonus: notes that stability is itself a positive result worth reporting rather than a null outcome.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.5,
    expectedSeconds: 220,
    prereqClosure: ["sensitivity-analysis"],
    source: ML_02,
    status: "live",
  },

];
