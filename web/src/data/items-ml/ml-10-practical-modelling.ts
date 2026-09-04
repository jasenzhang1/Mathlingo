import type { Item } from "../../lib/assessment/types";
import { ML_10 } from "./sources";

/**
 * Cluster 10 — practical modelling and evaluation. Eight items per concept at
 * two each of recall, apply, explain and transfer, matching the house pattern.
 *
 * These concepts were added to the graph after clusters 1-9 shipped, so the
 * items were authored directly here rather than ported from markdown; see
 * `assessments/ml-10-practical-modelling.md` for the design record.
 */
export const ml10Items: Item[] = [
  // --- Feature Scaling ------------------------------------------------------
  {
    id: "feature-scaling--recall-two-transforms",
    conceptId: "feature-scaling",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the two standard feature-scaling transforms and give the formula for each.",
    rubric: {
      elements: [
        { id: "standardise", description: "Standardisation: z = (x − μ)/σ, giving zero mean and unit variance.", weight: 3, required: true },
        { id: "minmax", description: "Min-max normalisation: (x − min)/(max − min), mapping to a fixed [0, 1] range.", weight: 3, required: true },
      ],
    },
    difficulty: -0.8,
    discrimination: 1.0,
    expectedSeconds: 50,
    prereqClosure: ["feature-scaling"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-scaling--recall-which-methods",
    conceptId: "feature-scaling",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which model is essentially unaffected by whether its features have been scaled?",
    choices: [
      { id: "a", text: "A decision tree", correct: true },
      {
        id: "b",
        text: "k-nearest-neighbours",
        correct: false,
        misconception: {
          id: "knn-thought-scale-free",
          description:
            "k-NN sums squared differences across all features, so the largest-magnitude feature effectively *is* the distance.",
          blameConceptId: "feature-scaling",
        },
      },
      {
        id: "c",
        text: "An SVM with an RBF kernel",
        correct: false,
        misconception: {
          id: "svm-thought-scale-free",
          description:
            "Both the margin and the kernel bandwidth are measured in the input metric, so unscaled features change the geometry the model reasons in.",
          blameConceptId: "feature-scaling",
        },
      },
      {
        id: "d",
        text: "Ridge regression",
        correct: false,
        misconception: {
          id: "ridge-thought-scale-free",
          description:
            "The penalty charges every coefficient equally, so a feature in small units acquires a large coefficient and is penalised more for no substantive reason.",
          blameConceptId: "feature-scaling",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["feature-scaling"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-scaling--apply-compute-z",
    conceptId: "feature-scaling",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A feature has training mean 50 and training standard deviation 8. What is the standardised value of an observation equal to 66?",
    answerKey: 2,
    tolerance: 0.005,
    difficulty: -0.15,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["feature-scaling"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-scaling--apply-distance-domination",
    conceptId: "feature-scaling",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Two records differ by 10 years of age and by £5,000 of income. Compute each feature's contribution to the squared Euclidean distance and say what that implies.",
    rubric: {
      elements: [
        { id: "contributions", description: "Age contributes 10² = 100; income contributes 5,000² = 25,000,000.", weight: 4, required: true },
        { id: "implication", description: "Income dominates by a factor of 250,000, so the distance is effectively income distance — the choice of units, not the modeller, decided the weighting.", weight: 4, required: true },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["feature-scaling"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-scaling--explain-the-rule",
    conceptId: "feature-scaling",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Give the single question that decides whether a method needs its features scaled, and use it to explain why trees are exempt.",
    rubric: {
      elements: [
        {
          id: "the-question",
          description:
            "Does the method combine features into a single number — a distance, a norm, a dot product, a shared step size? If so it needs scaling.",
          weight: 5,
          required: true,
        },
        {
          id: "why-trees-are-exempt",
          description:
            "A tree compares values within one feature at a time, so no shared quantity exists for units to distort, and any monotone rescaling leaves the ordering and therefore the splits unchanged.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["feature-scaling"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-scaling--explain-gradient-conditioning",
    conceptId: "feature-scaling",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Scaling is not required for a gradient-trained model to be *correct*, yet it is required in practice. Explain the difference.",
    rubric: {
      elements: [
        {
          id: "correctness-vs-conditioning",
          description:
            "The optimum is the same either way — scaling changes the parameterisation, not the model class — so correctness is not at stake.",
          weight: 3,
          required: true,
        },
        {
          id: "the-practical-obstacle",
          description:
            "Unequal scales make the loss surface a long narrow valley, so the usable step size is capped by the steepest direction while progress is needed along the shallowest, and convergence takes far more steps than the problem warrants.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["feature-scaling"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-scaling--transfer-fit-inside-the-split",
    conceptId: "feature-scaling",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A scaler is fitted on the whole dataset before splitting. The model never sees a test label. Explain precisely what has leaked and what the correct procedure is.",
    rubric: {
      elements: [
        {
          id: "what-leaked",
          description:
            "The mean and standard deviation were computed using test rows, so every training row was transformed using statistics that depend on the test set — the fitted transform carries test information.",
          weight: 4,
          required: true,
        },
        {
          id: "the-fix",
          description:
            "Fit on the training split alone and apply the same fitted transform to validation and test; put the chain in a pipeline so cross-validation refits it per fold.",
          weight: 4,
          required: true,
        },
        {
          id: "inference-note",
          description: "Bonus: at inference the stored training statistics are used, never statistics recomputed from the incoming batch.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["feature-scaling", "training-validation-test-set"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-scaling--transfer-choose-a-transform",
    conceptId: "feature-scaling",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A feature is heavily right-skewed with a few enormous values. Compare standardisation, min-max normalisation and a log transform for it.",
    rubric: {
      elements: [
        {
          id: "minmax-worst",
          description:
            "Min-max is worst: a single extreme value sets the range, compressing almost every other observation into a narrow band near zero.",
          weight: 3,
          required: true,
        },
        {
          id: "standardise-partial",
          description:
            "Standardisation is better — unbounded, so nothing is compressed — but the mean and standard deviation are themselves distorted by the tail, so the result stays skewed.",
          weight: 3,
          required: true,
        },
        {
          id: "log-addresses-shape",
          description:
            "A log or power transform changes the *shape* rather than the range, which is the actual problem; robust scaling on the median and IQR is the alternative when zeros or negatives rule out a log.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["feature-scaling"],
    source: ML_10,
    status: "live",
  },

  // --- Feature Selection ----------------------------------------------------
  {
    id: "feature-selection--recall-three-families",
    conceptId: "feature-selection",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the three families of feature selection method and say what distinguishes them.",
    rubric: {
      elements: [
        { id: "filter", description: "Filter: score each feature against the target independently of any model.", weight: 3, required: true },
        { id: "wrapper", description: "Wrapper: search subsets by actually fitting the model and scoring it.", weight: 3, required: true },
        { id: "embedded", description: "Embedded: selection falls out of fitting — a lasso penalty zeroing coefficients, a tree never splitting on a useless feature.", weight: 3, required: true },
      ],
    },
    difficulty: -0.2,
    discrimination: 1.1,
    expectedSeconds: 70,
    prereqClosure: ["feature-selection", "curse-of-dimensionality"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-selection--recall-where-it-belongs",
    conceptId: "feature-selection",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "When cross-validating a model that includes a feature-selection step, the selection must be performed:",
    choices: [
      { id: "a", text: "inside each fold, refitted k times using only that fold's training data", correct: true },
      {
        id: "b",
        text: "once on the full dataset, before cross-validation begins",
        correct: false,
        misconception: {
          id: "selection-outside-the-fold",
          description:
            "The selection then used every fold's held-out data, so nothing is held out. This produces high cross-validated scores on data with no signal at all.",
          blameConceptId: "feature-selection",
        },
      },
      {
        id: "c",
        text: "once on the test set, since that best reflects deployment",
        correct: false,
        misconception: {
          id: "selection-on-test",
          description:
            "Any set used to make a decision stops being an unbiased estimator — and this destroys the only honest number available.",
          blameConceptId: "data-leakage",
        },
      },
      {
        id: "d",
        text: "it does not matter, because selection uses no labels",
        correct: false,
        misconception: {
          id: "selection-thought-label-free",
          description:
            "Supervised selection scores features *against the target*, so it is exactly a label-using step.",
          blameConceptId: "feature-selection",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 40,
    prereqClosure: ["feature-selection", "k-fold-cross-validation"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-selection--apply-filter-on-xor",
    conceptId: "feature-selection",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A target is the XOR of two binary features, plus 98 irrelevant ones. What does a correlation filter keep, and why is that fatal here?",
    rubric: {
      elements: [
        {
          id: "filter-scores-zero",
          description:
            "Each of the two useful features has zero marginal association with the target — XOR is balanced with respect to each one alone — so the filter scores them no higher than the noise features.",
          weight: 4,
          required: true,
        },
        {
          id: "why-fatal",
          description:
            "It therefore discards precisely the two features that jointly determine the answer, and no downstream model can recover a signal that is no longer in the data.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.65,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["feature-selection"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-selection--apply-correlated-pair",
    conceptId: "feature-selection",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Two features are nearly identical and jointly the strongest predictor available. What happens if you drop each in turn and keep whichever drop hurts least?",
    rubric: {
      elements: [
        {
          id: "each-drop-looks-harmless",
          description:
            "Dropping either one barely hurts, because the other carries the same information — so both look dispensable when tested individually.",
          weight: 4,
          required: true,
        },
        {
          id: "the-trap",
          description:
            "Applied iteratively, that reasoning can remove both and lose the signal entirely; the group matters even though neither member does on its own.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["feature-selection"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-selection--explain-why-removing-helps",
    conceptId: "feature-selection",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Removing a feature that genuinely contains some information can improve accuracy. Explain how that is possible.",
    rubric: {
      elements: [
        {
          id: "noise-versus-signal-contribution",
          description:
            "A weakly informative feature adds noise to every distance and every coefficient estimate while contributing very little signal, so its net effect on the fit can be negative.",
          weight: 5,
          required: true,
        },
        {
          id: "the-tradeoff-framing",
          description:
            "Keeping it lowers systematic error slightly and raises sample-to-sample variability more; removing it trades a little of the first for more of the second — the same trade regularisation makes.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.45,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["feature-selection", "curse-of-dimensionality", "bias-variance-tradeoff"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-selection--explain-lasso-vs-filter",
    conceptId: "feature-selection",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why can an embedded method such as an L1 penalty succeed where a correlation filter fails, given both end up discarding features?",
    rubric: {
      elements: [
        {
          id: "filter-is-univariate",
          description:
            "A filter evaluates each feature in isolation, so it cannot see a feature that matters only in combination, and it cannot see redundancy between two it scores highly.",
          weight: 4,
          required: true,
        },
        {
          id: "embedded-is-joint",
          description:
            "An embedded method decides in the context of every other feature simultaneously, as part of fitting, so redundancy and interaction are both visible to it.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["feature-selection"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-selection--transfer-noise-only-experiment",
    conceptId: "feature-selection",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "5,000 pure-noise features, 50 rows, a random label. Select the 20 most correlated with the label, then cross-validate on those 20. Predict the result and explain it.",
    rubric: {
      elements: [
        {
          id: "predicts-inflated-score",
          description:
            "Cross-validated accuracy well above chance, on data containing no signal whatsoever.",
          weight: 4,
          required: true,
        },
        {
          id: "the-mechanism",
          description:
            "With 5,000 noise features and 50 rows, some correlate strongly with the label by chance; those are exactly the ones selected, and the selection used every row including the ones each fold later holds out.",
          weight: 5,
          required: true,
        },
        {
          id: "the-correct-version",
          description:
            "Redo the selection inside each fold and the score collapses to chance, which is the right answer.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["feature-selection", "k-fold-cross-validation", "data-leakage"],
    source: ML_10,
    status: "live",
  },
  {
    id: "feature-selection--transfer-prediction-vs-explanation",
    conceptId: "feature-selection",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A stakeholder reads a selected feature set as 'these are the drivers of the outcome'. Why is that a stronger claim than the procedure supports?",
    rubric: {
      elements: [
        {
          id: "selection-optimises-prediction",
          description:
            "The procedure optimised predictive performance, and a subset that predicts well is not the same as a subset that identifies causes.",
          weight: 4,
          required: true,
        },
        {
          id: "correlated-features-are-interchangeable",
          description:
            "Correlated features are interchangeable for prediction and not for explanation, so which member of a group was kept is close to arbitrary and carries no causal content.",
          weight: 4,
          required: true,
        },
        {
          id: "what-would-support-it",
          description:
            "Bonus: names what would — stability selection across resamples for a weaker claim, and an experiment or an explicit causal model for the strong one.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.5,
    expectedSeconds: 220,
    prereqClosure: ["feature-selection"],
    source: ML_10,
    status: "live",
  },

  // --- Class Imbalance ------------------------------------------------------
  {
    id: "class-imbalance--recall-definition",
    conceptId: "class-imbalance",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define class imbalance and name one thing it breaks.",
    rubric: {
      elements: [
        { id: "definition", description: "One class vastly outnumbers another in the training data.", weight: 3, required: true },
        { id: "consequence", description: "Names a consequence: accuracy becomes uninformative, or the fitted threshold is pulled toward the majority class.", weight: 3, required: true },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["class-imbalance", "confusion-matrices"],
    source: ML_10,
    status: "live",
  },
  {
    id: "class-imbalance--recall-first-move",
    conceptId: "class-imbalance",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Faced with a 1% positive rate, which should be attempted first?",
    choices: [
      { id: "a", text: "Change the metric and tune the decision threshold on held-out data", correct: true },
      {
        id: "b",
        text: "Oversample the minority class until the classes are balanced",
        correct: false,
        misconception: {
          id: "resampling-reached-for-first",
          description:
            "Duplicating rows adds no information, risks memorisation, and decalibrates the outputs. The metric and threshold cost nothing and often solve the whole problem.",
          blameConceptId: "class-imbalance",
        },
      },
      {
        id: "c",
        text: "Discard majority examples until the classes are balanced",
        correct: false,
        misconception: {
          id: "undersampling-reached-for-first",
          description:
            "Throwing away real data is a genuine cost, and it is being paid before the free remedies have been tried.",
          blameConceptId: "class-imbalance",
        },
      },
      {
        id: "d",
        text: "Collect more data of both classes in the same proportion",
        correct: false,
        misconception: {
          id: "proportional-collection",
          description:
            "More data at the same ratio helps the absolute-count problem but leaves the metric and threshold problems exactly as they were.",
          blameConceptId: "class-imbalance",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["class-imbalance"],
    source: ML_10,
    status: "live",
  },
  {
    id: "class-imbalance--apply-trivial-classifier",
    conceptId: "class-imbalance",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "In a population where 2% of cases are positive, a model predicts 'negative' for everything. What is its accuracy, as a percentage?",
    answerKey: 98,
    tolerance: 0.5,
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["class-imbalance", "confusion-matrices"],
    source: ML_10,
    status: "live",
  },
  {
    id: "class-imbalance--apply-three-problems",
    conceptId: "class-imbalance",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Dataset A has 1% positives out of 1,000 rows. Dataset B has 1% positives out of 10,000,000 rows. Same ratio — why is only one of them a hard problem?",
    rubric: {
      elements: [
        {
          id: "ratio-problems-are-shared",
          description:
            "Both share the ratio problems: accuracy is uninformative and the fitted threshold is pulled toward the majority. Both are fixed by the metric and the threshold, in either dataset.",
          weight: 4,
          required: true,
        },
        {
          id: "count-is-what-differs",
          description:
            "Only A has an absolute-count problem: ten positive examples cannot support learning what the class looks like, while B's hundred thousand can. Asking how many minority examples exist, not what the ratio is, is what separates them.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 0.55,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["class-imbalance"],
    source: ML_10,
    status: "live",
  },
  {
    id: "class-imbalance--explain-threshold-vs-resampling",
    conceptId: "class-imbalance",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Threshold-moving and resampling achieve a similar trade between the two error types. Why is threshold-moving usually preferable?",
    rubric: {
      elements: [
        {
          id: "same-trade",
          description:
            "Both shift the operating point toward catching more of the minority class at the cost of more false alarms.",
          weight: 3,
          required: true,
        },
        {
          id: "no-side-effects",
          description:
            "Threshold-moving keeps every row of real data, invents nothing, adds no leakage route, and leaves the probabilities calibrated to the real population — resampling gives up all four.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["class-imbalance", "confusion-matrices"],
    source: ML_10,
    status: "live",
  },
  {
    id: "class-imbalance--explain-resampling-leakage",
    conceptId: "class-imbalance",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A pipeline oversamples the minority class and then splits into train and test. What goes wrong, and what is the correct ordering?",
    rubric: {
      elements: [
        {
          id: "duplicates-straddle-the-split",
          description:
            "Copies of the same minority row land in both train and test, so the model is scored on rows it has memorised and the estimate is badly optimistic.",
          weight: 5,
          required: true,
        },
        {
          id: "correct-ordering",
          description:
            "Split first; resample only the training part, inside each cross-validation fold; leave the held-out part at the real class distribution so the estimate still describes deployment.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.25,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["class-imbalance", "confusion-matrices"],
    source: ML_10,
    status: "live",
  },
  {
    id: "class-imbalance--transfer-calibration-casualty",
    conceptId: "class-imbalance",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team oversamples to balance the classes, then feeds the model's probabilities into an expected-cost calculation. Why is the calculation now wrong?",
    rubric: {
      elements: [
        {
          id: "prior-was-changed",
          description:
            "Resampling changes the effective class prior the model is fitted under, so its outputs are calibrated to the resampled population rather than the real one — systematically inflated toward the minority class.",
          weight: 5,
          required: true,
        },
        {
          id: "consequence-for-the-calculation",
          description:
            "An expected-cost calculation consumes those probabilities as if they were real, so every decision it makes is biased toward acting on the minority class.",
          weight: 4,
          required: true,
        },
        {
          id: "remedies",
          description:
            "Bonus: correct the prior afterwards, or avoid the problem by training on the real distribution and moving the threshold instead.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["class-imbalance", "loss-functions"],
    source: ML_10,
    status: "live",
  },
  {
    id: "class-imbalance--transfer-smote-limits",
    conceptId: "class-imbalance",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "SMOTE creates new minority examples by interpolating between existing ones and their neighbours. Give the assumption this makes and a case where it fails.",
    rubric: {
      elements: [
        {
          id: "the-assumption",
          description:
            "It assumes the region between two minority points is itself minority territory — that the class occupies a convex, connected region locally.",
          weight: 4,
          required: true,
        },
        {
          id: "failure-case",
          description:
            "Gives a case where it fails: a minority class in two separated clusters, where interpolating across the gap manufactures points in majority territory; or high dimensions, where the interpolated point lies where no real data does.",
          weight: 4,
          required: true,
        },
        {
          id: "no-new-information",
          description:
            "Bonus: notes that no interpolation adds information — it redistributes what the existing points already say.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["class-imbalance"],
    source: ML_10,
    status: "live",
  },

  // --- Precision-Recall Curves ---------------------------------------------
  {
    id: "precision-recall-curves--recall-axes",
    conceptId: "precision-recall-curves",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What does a precision-recall curve plot, and what varies along it?",
    rubric: {
      elements: [
        { id: "axes", description: "Precision against recall.", weight: 3, required: true },
        { id: "what-varies", description: "The decision threshold, swept from strict to permissive — one point per threshold.", weight: 3, required: true },
      ],
    },
    difficulty: -0.6,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["precision-recall-curves", "roc-curves"],
    source: ML_10,
    status: "live",
  },
  {
    id: "precision-recall-curves--recall-baseline",
    conceptId: "precision-recall-curves",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "On a dataset with 3% positives, what precision does a random classifier achieve?",
    choices: [
      { id: "a", text: "0.03, at every recall", correct: true },
      {
        id: "b",
        text: "0.5, as for ROC",
        correct: false,
        misconception: {
          id: "pr-baseline-thought-half",
          description:
            "Imports ROC's fixed 0.5 baseline. A PR curve's chance level is the positive rate, which is why PR numbers are not comparable across datasets.",
          blameConceptId: "precision-recall-curves",
        },
      },
      {
        id: "c",
        text: "0, since a random classifier finds nothing",
        correct: false,
        misconception: {
          id: "pr-baseline-thought-zero",
          description:
            "A random classifier flags positives at the base rate, so a fixed fraction of its flags are correct — precision equals the prevalence, not zero.",
          blameConceptId: "precision-recall-curves",
        },
      },
      {
        id: "d",
        text: "It depends on the threshold",
        correct: false,
        misconception: {
          id: "random-precision-thought-threshold-dependent",
          description:
            "Under random scoring the flagged set is a random subset at any threshold, so its positive fraction is the prevalence regardless of where the threshold sits.",
          blameConceptId: "precision-recall-curves",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["precision-recall-curves", "class-imbalance"],
    source: ML_10,
    status: "live",
  },
  {
    id: "precision-recall-curves--apply-compute-both-views",
    conceptId: "precision-recall-curves",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "One million transactions, 1,000 fraudulent. A model catches 500 frauds and raises 5,000 false alarms. Compute its precision to three decimal places.",
    answerKey: 0.091,
    tolerance: 0.002,
    difficulty: 0.15,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["precision-recall-curves", "confusion-matrices"],
    source: ML_10,
    status: "live",
  },
  {
    id: "precision-recall-curves--apply-two-views-same-model",
    conceptId: "precision-recall-curves",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "For that same model — 500 of 1,000 frauds caught, 5,000 false alarms, 999,000 true negatives — compute recall and false positive rate, and say what each view concludes.",
    rubric: {
      elements: [
        { id: "recall", description: "Recall = 500/1,000 = 0.50.", weight: 2, required: true },
        { id: "fpr", description: "FPR = 5,000/999,000 ≈ 0.005 — half a percent.", weight: 3, required: true },
        {
          id: "the-two-conclusions",
          description:
            "The ROC view sees a point near the top-left and calls the model excellent; the precision-recall view sees precision of about 0.09 — ten wasted investigations per real fraud — and calls it unusable.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["precision-recall-curves", "roc-curves", "confusion-matrices"],
    source: ML_10,
    status: "live",
  },
  {
    id: "precision-recall-curves--explain-the-denominator",
    conceptId: "precision-recall-curves",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Name the single structural difference between the two curves that produces that disagreement.",
    rubric: {
      elements: [
        {
          id: "tn-in-the-denominator",
          description:
            "FPR divides false positives by the count of true negatives, which under heavy imbalance is enormous; precision divides them by the flags actually raised.",
          weight: 5,
          required: true,
        },
        {
          id: "consequence",
          description:
            "So a large absolute number of false alarms is a negligible rate on one axis and a collapse on the other. Choosing between the curves is choosing whether that vast TN count enters the score.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["precision-recall-curves", "roc-curves"],
    source: ML_10,
    status: "live",
  },
  {
    id: "precision-recall-curves--explain-not-portable",
    conceptId: "precision-recall-curves",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "An average precision of 0.4 is reported on two different datasets. Why can those numbers not be compared, and what is ROC's compensating advantage?",
    rubric: {
      elements: [
        {
          id: "baseline-moves",
          description:
            "The PR baseline is the positive rate, so 0.4 is excellent on a 1% problem and poor on a 40% one — the same number means different things.",
          weight: 4,
          required: true,
        },
        {
          id: "roc-baseline-fixed",
          description:
            "ROC's chance level is 0.5 regardless of prevalence, which makes AUC the more portable summary across datasets — the one respect in which it is the better choice.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["precision-recall-curves", "roc-curves", "class-imbalance"],
    source: ML_10,
    status: "live",
  },
  {
    id: "precision-recall-curves--transfer-choose-the-curve",
    conceptId: "precision-recall-curves",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Give one situation where ROC is the right curve to read and one where precision-recall is, and justify each from the metric's definition rather than from convention.",
    rubric: {
      elements: [
        {
          id: "roc-case",
          description:
            "ROC where classes are roughly balanced and ranking quality across the whole range matters — TN is not an overwhelming count, so FPR is informative.",
          weight: 4,
          required: true,
        },
        {
          id: "pr-case",
          description:
            "PR where positives are rare and false alarms are costly — its denominators involve the rare class directly, so the score tracks what an operator experiences.",
          weight: 4,
          required: true,
        },
        {
          id: "third-option",
          description:
            "Bonus: notes that if the deployed threshold is already fixed, neither curve is the right report — the confusion matrix at that threshold is.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["precision-recall-curves", "roc-curves"],
    source: ML_10,
    status: "live",
  },
  {
    id: "precision-recall-curves--transfer-fixed-review-budget",
    conceptId: "precision-recall-curves",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team can investigate 200 cases a day out of a million. Which single number should they optimise, and why is neither AUC nor average precision quite it?",
    rubric: {
      elements: [
        {
          id: "the-right-metric",
          description:
            "Precision within the top 200 ranked cases — equivalently precision at a fixed review budget, or recall at that budget.",
          weight: 4,
          required: true,
        },
        {
          id: "why-not-the-summaries",
          description:
            "AUC and average precision both integrate over the entire threshold range, most of which is operationally unreachable; two models with equal summaries can differ sharply in the only slice that will ever be used.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["precision-recall-curves", "roc-curves", "class-imbalance"],
    source: ML_10,
    status: "live",
  },

  // --- Probability Calibration ---------------------------------------------
  {
    id: "probability-calibration--recall-definition",
    conceptId: "probability-calibration",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What does it mean for a classifier to be calibrated?",
    rubric: {
      elements: [
        { id: "frequencies-match", description: "Its stated probabilities match observed frequencies: of the cases it calls 70% likely, about 70% actually occur.", weight: 4, required: true },
      ],
    },
    difficulty: -0.15,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["probability-calibration", "roc-curves"],
    source: ML_10,
    status: "live",
  },
  {
    id: "probability-calibration--recall-independent-of-auc",
    conceptId: "probability-calibration",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A model outputs 0.55 for every positive and 0.45 for every negative. What are its AUC and its calibration?",
    choices: [
      { id: "a", text: "AUC 1.0, and badly calibrated", correct: true },
      {
        id: "b",
        text: "AUC 1.0, and therefore well calibrated",
        correct: false,
        misconception: {
          id: "auc-thought-to-imply-calibration",
          description:
            "AUC depends only on the ordering of scores. This model ranks perfectly and its numbers mean nothing — the two properties are independent axes.",
          blameConceptId: "probability-calibration",
        },
      },
      {
        id: "c",
        text: "AUC 0.5, since the scores are so close together",
        correct: false,
        misconception: {
          id: "auc-thought-to-depend-on-spread",
          description:
            "AUC counts correctly ordered pairs, not the size of the gaps. Every positive outranks every negative here, so it is 1.0.",
          blameConceptId: "roc-curves",
        },
      },
      {
        id: "d",
        text: "Both are undefined without a threshold",
        correct: false,
        misconception: {
          id: "both-thought-threshold-dependent",
          description:
            "Both are threshold-free: AUC integrates over all thresholds, and calibration compares stated probabilities with observed frequencies.",
          blameConceptId: "probability-calibration",
        },
      },
    ],
    difficulty: 0.15,
    discrimination: 1.5,
    expectedSeconds: 50,
    prereqClosure: ["probability-calibration", "roc-curves"],
    source: ML_10,
    status: "live",
  },
  {
    id: "probability-calibration--apply-read-a-reliability-bin",
    conceptId: "probability-calibration",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "In the bin of predictions stated as 0.8–0.9, the observed event rate is 0.55. Is the model over- or under-confident here, and in which direction should the calibration map move these values?",
    rubric: {
      elements: [
        { id: "over-confident", description: "Over-confident: it claims more certainty than the outcomes support.", weight: 3, required: true },
        { id: "direction", description: "The calibration map should pull these stated probabilities downward, toward the observed 0.55.", weight: 3, required: true },
      ],
    },
    difficulty: 0.55,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["probability-calibration"],
    source: ML_10,
    status: "live",
  },
  {
    id: "probability-calibration--apply-brier",
    conceptId: "probability-calibration",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "The Brier score is the mean squared difference between the stated probability and the 0/1 outcome. Four predictions of 0.9, 0.8, 0.3, 0.2 had outcomes 1, 1, 0, 0. Compute the Brier score to four decimal places.",
    answerKey: 0.0450,
    tolerance: 0.001,
    difficulty: 0.9,
    discrimination: 1.3,
    expectedSeconds: 130,
    prereqClosure: ["probability-calibration"],
    source: ML_10,
    status: "live",
  },
  {
    id: "probability-calibration--explain-why-models-miscalibrate",
    conceptId: "probability-calibration",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Naive Bayes and a large neural network are both typically over-confident, for different reasons. Give each.",
    rubric: {
      elements: [
        {
          id: "naive-bayes-reason",
          description:
            "Naive Bayes treats correlated features as independent, so shared evidence is counted several times over and the posterior is driven toward 0 or 1.",
          weight: 4,
          required: true,
        },
        {
          id: "network-reason",
          description:
            "A large network is trained to near-zero loss on the training set, so it learns to be maximally confident on data it has effectively memorised, and that confidence does not transfer.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["probability-calibration", "cross-entropy-loss"],
    source: ML_10,
    status: "live",
  },
  {
    id: "probability-calibration--explain-monotone-so-ranking-survives",
    conceptId: "probability-calibration",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Calibration is often described as close to a free improvement. What property of the calibration map makes that true?",
    rubric: {
      elements: [
        {
          id: "monotone",
          description:
            "Platt scaling, isotonic regression and temperature scaling all apply a monotone map from score to probability.",
          weight: 4,
          required: true,
        },
        {
          id: "so-ranking-is-untouched",
          description:
            "A monotone map preserves every pairwise ordering, so AUC is unchanged and accuracy at the corresponding threshold is too — trustworthy numbers are gained without giving up discrimination.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["probability-calibration", "roc-curves"],
    source: ML_10,
    status: "live",
  },
  {
    id: "probability-calibration--transfer-choose-a-method",
    conceptId: "probability-calibration",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "You have 300 held-out examples to calibrate with. Compare Platt scaling and isotonic regression for that budget, and say what changes with 30,000.",
    rubric: {
      elements: [
        {
          id: "small-set-favours-platt",
          description:
            "At 300, Platt scaling wins: it fits very few parameters, so it cannot chase noise, at the cost of assuming a sigmoidal distortion.",
          weight: 4,
          required: true,
        },
        {
          id: "large-set-favours-isotonic",
          description:
            "At 30,000, isotonic regression becomes preferable: it can fit any non-decreasing map, and there is now enough data to estimate one without overfitting.",
          weight: 4,
          required: true,
        },
        {
          id: "temperature-for-networks",
          description:
            "Bonus: for a deep network, temperature scaling is the standard choice — one parameter, and it leaves the argmax and therefore the accuracy exactly unchanged.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["probability-calibration"],
    source: ML_10,
    status: "live",
  },
  {
    id: "probability-calibration--transfer-where-to-fit-it",
    conceptId: "probability-calibration",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why must the calibration map be fitted on data the model was not trained on, and what goes wrong if the training set is used?",
    rubric: {
      elements: [
        {
          id: "training-predictions-are-atypical",
          description:
            "The model's predictions on its own training data are unrepresentatively good, so the distortion visible there is not the distortion it exhibits on new data.",
          weight: 4,
          required: true,
        },
        {
          id: "what-the-map-learns",
          description:
            "The map therefore learns to correct a problem that does not occur in deployment, and can leave the model worse calibrated than before.",
          weight: 4,
          required: true,
        },
        {
          id: "the-procedure",
          description:
            "Use a dedicated calibration split or a cross-validated calibration procedure, and evaluate the result on data used for neither fitting nor calibrating.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["probability-calibration", "training-validation-test-set"],
    source: ML_10,
    status: "live",
  },

  // --- Nested Cross-Validation ---------------------------------------------
  {
    id: "nested-cross-validation--recall-what-each-loop-does",
    conceptId: "nested-cross-validation",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "In nested cross-validation, what is the inner loop for and what is the outer loop for?",
    rubric: {
      elements: [
        { id: "inner", description: "The inner loop selects hyperparameters.", weight: 3, required: true },
        { id: "outer", description: "The outer loop scores the whole selection procedure on data the inner loop never saw.", weight: 4, required: true },
      ],
    },
    difficulty: -0.1,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["nested-cross-validation", "hyperparameters"],
    source: ML_10,
    status: "live",
  },
  {
    id: "nested-cross-validation--recall-what-the-outer-loop-outputs",
    conceptId: "nested-cross-validation",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Different outer folds select different hyperparameter settings. What should be done about that?",
    choices: [
      { id: "a", text: "Nothing — the outer loop produces a performance estimate, not a chosen configuration", correct: true },
      {
        id: "b",
        text: "Take the configuration selected most often across the outer folds",
        correct: false,
        misconception: {
          id: "outer-loop-thought-to-select",
          description:
            "Treats the outer loop as a voting procedure. Its output is a number; the deployed configuration comes from one search on all the data.",
          blameConceptId: "nested-cross-validation",
        },
      },
      {
        id: "c",
        text: "Increase the number of outer folds until they agree",
        correct: false,
        misconception: {
          id: "disagreement-thought-to-be-noise-to-remove",
          description:
            "Disagreement is a finding — the choice is not well determined by this much data — not an artefact to be tuned away.",
          blameConceptId: "nested-cross-validation",
        },
      },
      {
        id: "d",
        text: "Report the best-performing outer fold's configuration and score",
        correct: false,
        misconception: {
          id: "reintroduces-the-winners-curse",
          description:
            "Reintroduces exactly the selection bias the procedure exists to remove, by picking a maximum over noisy estimates again.",
          blameConceptId: "nested-cross-validation",
        },
      },
    ],
    difficulty: 0.25,
    discrimination: 1.5,
    expectedSeconds: 50,
    prereqClosure: ["nested-cross-validation", "hyperparameters"],
    source: ML_10,
    status: "live",
  },
  {
    id: "nested-cross-validation--apply-count-fits",
    conceptId: "nested-cross-validation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Five outer folds, four inner folds, eight hyperparameter settings. Counting only the inner-loop fits, how many model fits does the procedure perform?",
    answerKey: 160,
    tolerance: 0.001,
    difficulty: 0.65,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["nested-cross-validation", "k-fold-cross-validation"],
    source: ML_10,
    status: "live",
  },
  {
    id: "nested-cross-validation--apply-deployment-model",
    conceptId: "nested-cross-validation",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "The nested procedure has finished and reported a score. What model do you actually deploy, and where did its hyperparameters come from?",
    rubric: {
      elements: [
        {
          id: "one-final-search",
          description:
            "Run the hyperparameter search once on all the data, and fit the winning configuration on all of it — that is the deployed model.",
          weight: 4,
          required: true,
        },
        {
          id: "the-score-describes-the-procedure",
          description:
            "The nested score is not that model's score; it estimates how well this *procedure* performs on fresh data, which is the honest thing to quote for it.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["nested-cross-validation", "hyperparameters"],
    source: ML_10,
    status: "live",
  },
  {
    id: "nested-cross-validation--explain-winners-curse",
    conceptId: "nested-cross-validation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why a flat cross-validated search's best score is biased upward even when every configuration is genuinely equal in quality.",
    rubric: {
      elements: [
        {
          id: "maximum-of-noisy-estimates",
          description:
            "Each score is the true quality plus noise, and the maximum of many such draws sits systematically above their common mean.",
          weight: 5,
          required: true,
        },
        {
          id: "grows-with-search-size",
          description:
            "The bias grows with the number of configurations tried and shrinks with sample size — so the harder you search, the more optimistic the reported number becomes.",
          weight: 4,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "blames-overfitting",
          description:
            "Attributes the bias to the models overfitting the training data, a different mechanism that would not arise if all configurations were equal in true quality.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.45,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["nested-cross-validation", "hyperparameters", "k-fold-cross-validation"],
    source: ML_10,
    status: "live",
  },
  {
    id: "nested-cross-validation--explain-same-principle",
    conceptId: "nested-cross-validation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Scalers, feature selection and hyperparameter search must all sit inside the resampling loop. State the single principle that covers all three.",
    rubric: {
      elements: [
        {
          id: "the-principle",
          description:
            "Anything fitted using the data — including the choice of which model to keep — is part of the model, and the evaluation must not have seen it.",
          weight: 5,
          required: true,
        },
        {
          id: "applied-to-the-search",
          description:
            "Nested cross-validation is that principle applied to the search itself, which is the step most often left outside because it does not look like fitting.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["nested-cross-validation", "data-leakage"],
    source: ML_10,
    status: "live",
  },
  {
    id: "nested-cross-validation--transfer-when-worth-it",
    conceptId: "nested-cross-validation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Give a setting where nested cross-validation is worth its cost and one where it is not, justifying each from what drives the bias it removes.",
    rubric: {
      elements: [
        {
          id: "worth-it",
          description:
            "Worth it on a small dataset with a large search, where selection bias is large relative to the effect being claimed and the estimate is itself the deliverable — a paper, a submission, a go/no-go decision.",
          weight: 4,
          required: true,
        },
        {
          id: "not-worth-it",
          description:
            "Not worth it when a genuinely untouched test set is available and large: that achieves the same honesty in one fit rather than K times as many.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["nested-cross-validation", "training-validation-test-set"],
    source: ML_10,
    status: "live",
  },
  {
    id: "nested-cross-validation--transfer-cheaper-alternative",
    conceptId: "nested-cross-validation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A single held-out test set is described as a cheaper approximation to nested cross-validation. What discipline does it require to actually deliver the same guarantee, and why is that hard?",
    rubric: {
      elements: [
        {
          id: "the-discipline",
          description:
            "Never returning to change anything after looking at it — one measurement, and the project ends or ships on that number.",
          weight: 4,
          required: true,
        },
        {
          id: "why-hard",
          description:
            "A disappointing score creates immediate pressure to try one more thing, and from that moment the test set is inside the selection loop; the contamination is gradual and invisible, with no diagnostic that detects it.",
          weight: 5,
          required: true,
        },
        {
          id: "institutional-answer",
          description:
            "Bonus: notes that competition private leaderboards enforce this structurally rather than relying on discipline, which is why they exist.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["nested-cross-validation", "training-validation-test-set", "data-leakage"],
    source: ML_10,
    status: "live",
  },

  // --- Learning Curves ------------------------------------------------------
  {
    id: "learning-curves--recall-axes",
    conceptId: "learning-curves",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What does a learning curve plot on each axis?",
    rubric: {
      elements: [
        { id: "x-axis", description: "Training-set size on the x-axis.", weight: 3, required: true },
        { id: "y-axis", description: "Error on the y-axis, with separate curves for training and validation.", weight: 3, required: true },
      ],
    },
    difficulty: -0.15,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["learning-curves", "overfitting-underfitting"],
    source: ML_10,
    status: "live",
  },
  {
    id: "learning-curves--recall-not-epochs",
    conceptId: "learning-curves",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A deep learning framework plots loss against epochs and labels it a learning curve. How does that differ from a learning curve in the sense used here?",
    choices: [
      { id: "a", text: "It has training progress on the x-axis, so it diagnoses convergence rather than data sufficiency", correct: true },
      {
        id: "b",
        text: "It does not differ — the two are the same plot",
        correct: false,
        misconception: {
          id: "epoch-curve-conflated",
          description:
            "They answer different questions. One says whether to keep training; the other says whether to collect more data. Confusing them leads to buying data when the fix was more epochs, or the reverse.",
          blameConceptId: "learning-curves",
        },
      },
      {
        id: "c",
        text: "It measures accuracy rather than loss",
        correct: false,
        misconception: {
          id: "difference-thought-to-be-the-metric",
          description:
            "Either plot can show either metric. The difference is what varies along the x-axis.",
          blameConceptId: "learning-curves",
        },
      },
      {
        id: "d",
        text: "It is only valid for neural networks",
        correct: false,
        misconception: {
          id: "difference-thought-to-be-model-class",
          description:
            "Any iteratively trained model has a training-progress curve, and any model at all has a sample-size learning curve.",
          blameConceptId: "learning-curves",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 50,
    prereqClosure: ["learning-curves"],
    source: ML_10,
    status: "live",
  },
  {
    id: "learning-curves--apply-diagnose-flat-and-high",
    conceptId: "learning-curves",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Training and validation error have converged to 28% and 30% respectively, and both have been flat for the last several sample sizes. Diagnose it and say what you would and would not spend money on.",
    rubric: {
      elements: [
        { id: "diagnosis", description: "High bias — the model class cannot represent the pattern; the small gap rules out a variance problem.", weight: 4, required: true },
        { id: "what-not-to-buy", description: "Not more data: the curve has flattened, so additional examples will converge to the same wrong answer.", weight: 3, required: true },
        { id: "what-to-try", description: "A richer model class, better features, or longer training if it has not converged.", weight: 3, required: true },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["learning-curves", "overfitting-underfitting", "bias-variance-tradeoff"],
    source: ML_10,
    status: "live",
  },
  {
    id: "learning-curves--apply-diagnose-falling-gap",
    conceptId: "learning-curves",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Training error is 3%, validation error is 19% and still falling steadily at the largest sample size plotted. What does this say about a proposed labelling contract?",
    rubric: {
      elements: [
        { id: "diagnosis", description: "High variance, and the curve has not finished — the large gap is closing as data is added.", weight: 4, required: true },
        { id: "the-recommendation", description: "More data is likely to help, so the labelling contract is a reasonable spend; the still-falling validation curve is the evidence for that rather than intuition.", weight: 4, required: true },
        { id: "meanwhile", description: "Bonus: regularise in the meantime, which buys some of the same benefit immediately and for free.", weight: 2 },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["learning-curves", "overfitting-underfitting"],
    source: ML_10,
    status: "live",
  },
  {
    id: "learning-curves--explain-why-training-error-rises",
    conceptId: "learning-curves",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "As the training set grows, training error rises and validation error falls. Explain both movements.",
    rubric: {
      elements: [
        {
          id: "training-rises",
          description:
            "A model fits ten points almost exactly and ten thousand only approximately — more constraints on the same capacity means a worse fit to each.",
          weight: 4,
          required: true,
        },
        {
          id: "validation-falls",
          description:
            "More data pins down the underlying pattern rather than the sample's noise, so the fit generalises better and its variability across samples shrinks.",
          weight: 4,
          required: true,
        },
        {
          id: "they-converge",
          description:
            "Bonus: notes they converge, and where they converge is what diagnoses bias while the gap diagnoses variance.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["learning-curves", "bias-variance-tradeoff"],
    source: ML_10,
    status: "live",
  },
  {
    id: "learning-curves--explain-construction-errors",
    conceptId: "learning-curves",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Name two mistakes in constructing a learning curve that make it unreadable, and say what each does to the plot.",
    rubric: {
      elements: [
        {
          id: "subsampling-validation",
          description:
            "Subsampling the validation set alongside the training set: the two curves are then measured on different amounts of data at every point, so their comparison means nothing.",
          weight: 4,
          required: true,
        },
        {
          id: "single-draw-per-size",
          description:
            "Using one random subsample per size: small sizes are extremely noisy, and that noise reads as curvature — people infer a plateau or an upturn that is not there.",
          weight: 4,
          required: true,
        },
        {
          id: "stratification",
          description:
            "Bonus: not stratifying the subsamples, so small sizes occasionally miss a rare class entirely.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.65,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["learning-curves", "k-fold-cross-validation"],
    source: ML_10,
    status: "live",
  },
  {
    id: "learning-curves--transfer-budget-decision",
    conceptId: "learning-curves",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team is deciding between a £200,000 labelling contract and two months of feature engineering. Explain how a learning curve built from data they already have informs that choice, and what it cannot settle.",
    rubric: {
      elements: [
        {
          id: "what-it-settles",
          description:
            "Whether more data would help at all: a validation curve still falling at the right-hand edge argues for the contract; one flat and well above target says the money will buy almost nothing.",
          weight: 5,
          required: true,
        },
        {
          id: "the-cost-of-the-diagnostic",
          description:
            "It costs only a few extra fits on subsets of existing data — trivial next to either option.",
          weight: 2,
          required: true,
        },
        {
          id: "what-it-cannot-settle",
          description:
            "It cannot say whether feature engineering will succeed: it diagnoses that bias is the binding constraint without predicting whether better features are findable.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["learning-curves", "bias-variance-tradeoff"],
    source: ML_10,
    status: "live",
  },
  {
    id: "learning-curves--transfer-extrapolation-risk",
    conceptId: "learning-curves",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A curve is still falling at 50,000 examples. Someone extrapolates it to predict the error at 5,000,000. What is unsafe about that, and what would make the extrapolation more defensible?",
    rubric: {
      elements: [
        {
          id: "two-orders-of-magnitude",
          description:
            "The extrapolation spans two orders of magnitude beyond the observed range, and learning curves typically flatten toward an asymptote set by the model class and the irreducible noise — so the observed slope is not sustained.",
          weight: 4,
          required: true,
        },
        {
          id: "what-would-help",
          description:
            "Plot on log-log axes, where many learning curves are closer to linear, and fit a curve with an explicit asymptote rather than a straight line — then quote the asymptote as a bound rather than the extrapolated point as a prediction.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["learning-curves", "bias-variance-tradeoff"],
    source: ML_10,
    status: "live",
  },

  // --- Distribution Shift ---------------------------------------------------
  {
    id: "distribution-shift--recall-three-kinds",
    conceptId: "distribution-shift",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the three kinds of distribution shift and say which quantity changes in each.",
    rubric: {
      elements: [
        { id: "covariate", description: "Covariate shift: P(x) changes, P(y | x) does not.", weight: 3, required: true },
        { id: "label", description: "Label or prior shift: P(y) changes, P(x | y) does not.", weight: 3, required: true },
        { id: "concept", description: "Concept drift: P(y | x) itself changes.", weight: 3, required: true },
      ],
    },
    difficulty: -0.65,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["distribution-shift", "training-validation-test-set"],
    source: ML_10,
    status: "live",
  },
  {
    id: "distribution-shift--recall-which-needs-labels",
    conceptId: "distribution-shift",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which kind of shift cannot be detected from unlabelled deployment data alone?",
    choices: [
      { id: "a", text: "Concept drift", correct: true },
      {
        id: "b",
        text: "Covariate shift",
        correct: false,
        misconception: {
          id: "covariate-thought-to-need-labels",
          description:
            "P(x) is exactly what unlabelled data shows, so covariate shift is the easiest of the three to detect without labels.",
          blameConceptId: "distribution-shift",
        },
      },
      {
        id: "c",
        text: "Label shift",
        correct: false,
        misconception: {
          id: "label-shift-thought-undetectable",
          description:
            "Label shift changes the marginal of x too, in a structured way, so it can be estimated from unlabelled data given the class-conditional densities.",
          blameConceptId: "distribution-shift",
        },
      },
      {
        id: "d",
        text: "All three require labels",
        correct: false,
        misconception: {
          id: "all-thought-to-need-labels",
          description:
            "This is the distinction that decides how a monitoring system is built — two of the three are visible in the inputs alone.",
          blameConceptId: "distribution-shift",
        },
      },
    ],
    difficulty: -0.35,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["distribution-shift"],
    source: ML_10,
    status: "live",
  },
  {
    id: "distribution-shift--apply-classify-scenarios",
    conceptId: "distribution-shift",
    format: "multi-select",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Select every scenario that is concept drift rather than covariate or label shift.",
    choices: [
      { id: "a", text: "Spammers change tactics, so the words that indicate spam are no longer the same words", correct: true },
      { id: "b", text: "A pricing model's relationship between features and fair price changes after a regulatory reform", correct: true },
      {
        id: "c",
        text: "The product launches in a new country, so customer demographics differ",
        correct: false,
        misconception: {
          id: "new-population-called-drift",
          description:
            "The inputs moved but the relationship between features and outcome is unchanged — that is covariate shift, and it is correctable with importance weighting.",
          blameConceptId: "distribution-shift",
        },
      },
      {
        id: "d",
        text: "Disease prevalence rises during an outbreak while symptoms stay the same",
        correct: false,
        misconception: {
          id: "prevalence-change-called-drift",
          description:
            "P(y) changed and P(x | y) did not — that is label shift, and it is fixed by adjusting the prior or the threshold.",
          blameConceptId: "distribution-shift",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["distribution-shift"],
    source: ML_10,
    status: "live",
  },
  {
    id: "distribution-shift--apply-design-a-monitor",
    conceptId: "distribution-shift",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Design a monitoring setup for a deployed model, and state which failure each component would catch.",
    rubric: {
      elements: [
        {
          id: "input-monitoring",
          description:
            "Per-feature distribution monitoring against a training reference — catches covariate shift.",
          weight: 3,
          required: true,
        },
        {
          id: "output-monitoring",
          description:
            "Monitoring the model's own output distribution — often the earliest visible signal, and catches label shift and gross input problems.",
          weight: 3,
          required: true,
        },
        {
          id: "delayed-labels",
          description:
            "Tracking performance on labels that arrive later — a loan defaulting, a diagnosis confirmed. The only component that detects concept drift.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["distribution-shift"],
    source: ML_10,
    status: "live",
  },
  {
    id: "distribution-shift--explain-why-guarantees-break",
    conceptId: "distribution-shift",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does a carefully constructed held-out estimate stop predicting deployed performance under shift, given that nothing about the estimate's construction was wrong?",
    rubric: {
      elements: [
        {
          id: "the-assumption",
          description:
            "Every guarantee in supervised learning assumes training and test data are draws from the same distribution; the held-out estimate is unbiased *for that distribution*.",
          weight: 5,
          required: true,
        },
        {
          id: "what-shift-does",
          description:
            "Under shift the deployment data is drawn from a different one, so the estimate remains a correct answer to a question nobody is now asking — the construction was fine and the premise moved.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["distribution-shift", "training-validation-test-set"],
    source: ML_10,
    status: "live",
  },
  {
    id: "distribution-shift--explain-generative-advantage",
    conceptId: "distribution-shift",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Under label shift alone, a generative classifier can be corrected with a one-line change while a discriminative one cannot. Explain why.",
    rubric: {
      elements: [
        {
          id: "prior-is-a-separate-term",
          description:
            "A generative model factors the posterior into P(x | y) and P(y), so the class prior is a named term that can be replaced with the deployment rate while the unchanged P(x | y) is reused.",
          weight: 4,
          required: true,
        },
        {
          id: "discriminative-has-it-baked-in",
          description:
            "A discriminative model estimates P(y | x) as one object with the training prior absorbed into it, so there is no term to swap — it must be refitted or its outputs post-hoc corrected.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["distribution-shift", "generative-vs-discriminative-models"],
    source: ML_10,
    status: "live",
  },
  {
    id: "distribution-shift--transfer-feedback-loop",
    conceptId: "distribution-shift",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A credit model declines a segment of applicants, and is retrained annually on outcomes observed since. Describe the failure this creates and why input monitoring will not catch it.",
    rubric: {
      elements: [
        {
          id: "the-loop",
          description:
            "Declined applicants generate no repayment outcome, so the training data contains only cases the previous model approved — the model shapes the data it is next fitted on.",
          weight: 5,
          required: true,
        },
        {
          id: "why-monitoring-misses-it",
          description:
            "The input distribution of *applicants* is unchanged, so per-feature monitors see nothing; what changed is which applicants have labels, which is invisible to them.",
          weight: 4,
          required: true,
        },
        {
          id: "it-compounds",
          description:
            "Bonus: notes that it compounds across retraining cycles, and that deliberately approving a small random fraction is the standard remedy — buying unbiased data with a known cost.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["distribution-shift", "data-leakage"],
    source: ML_10,
    status: "live",
  },
  {
    id: "distribution-shift--transfer-design-for-it",
    conceptId: "distribution-shift",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Name three decisions taken during model development — not after deployment — that reduce exposure to distribution shift, and justify each.",
    rubric: {
      elements: [
        {
          id: "temporal-split",
          description:
            "Split by time rather than at random, so the validation estimate already measures performance on data from after the training period.",
          weight: 3,
          required: true,
        },
        {
          id: "stable-features",
          description:
            "Prefer features that are stable over ones marginally more predictive but tied to a transient regime — the second kind degrades exactly when it is relied on.",
          weight: 3,
          required: true,
        },
        {
          id: "flat-optimum",
          description:
            "Prefer a setting on a flat region of the performance surface over a sharp peak, since a small shift moves the optimum and a fragile model falls off it.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["distribution-shift", "training-validation-test-set"],
    source: ML_10,
    status: "live",
  },

  // --- Model Interpretability ----------------------------------------------
  {
    id: "model-interpretability--recall-permutation-importance",
    conceptId: "model-interpretability",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe permutation importance, including the one detail that determines whether it is meaningful.",
    rubric: {
      elements: [
        { id: "the-method", description: "Shuffle one feature's values and measure how much model performance drops.", weight: 3, required: true },
        { id: "held-out", description: "It must be computed on held-out data; on training data it measures memorisation rather than predictive value.", weight: 4, required: true },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["model-interpretability", "random-forests"],
    source: ML_10,
    status: "live",
  },
  {
    id: "model-interpretability--recall-impurity-bias",
    conceptId: "model-interpretability",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A tree ensemble's built-in impurity importance is biased. Toward what?",
    choices: [
      { id: "a", text: "High-cardinality and continuous features, which offer more candidate split points", correct: true },
      {
        id: "b",
        text: "Binary features, which are simplest to split on",
        correct: false,
        misconception: {
          id: "impurity-bias-inverted",
          description:
            "Exactly reversed. A binary feature offers one split point; a continuous one offers hundreds, and therefore many more chances to reduce impurity by luck.",
          blameConceptId: "model-interpretability",
        },
      },
      {
        id: "c",
        text: "Features that appear early in the column order",
        correct: false,
        misconception: {
          id: "bias-thought-positional",
          description:
            "Column order affects only tie-breaking. The bias is about the number of candidate thresholds a feature provides.",
          blameConceptId: "model-interpretability",
        },
      },
      {
        id: "d",
        text: "It is unbiased, which is why it is the default",
        correct: false,
        misconception: {
          id: "default-thought-unbiased",
          description:
            "It is the default because it is free — computed during fitting — not because it is the most trustworthy measure available.",
          blameConceptId: "random-forests",
        },
      },
    ],
    difficulty: 0.35,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["model-interpretability", "random-forests", "splitting-criteria"],
    source: ML_10,
    status: "live",
  },
  {
    id: "model-interpretability--apply-pdp-vs-ice",
    conceptId: "model-interpretability",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A partial dependence plot for a feature is almost perfectly flat. Give a situation in which the feature nonetheless matters a great deal, and say which plot would reveal it.",
    rubric: {
      elements: [
        {
          id: "opposing-subgroups",
          description:
            "The feature increases the prediction for one subgroup and decreases it for another; averaging over the dataset cancels the two and produces a flat line.",
          weight: 4,
          required: true,
        },
        {
          id: "ice-reveals-it",
          description:
            "ICE plots — the same sweep drawn per individual row rather than averaged — show the opposing slopes directly.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["model-interpretability"],
    source: ML_10,
    status: "live",
  },
  {
    id: "model-interpretability--apply-correlated-attribution",
    conceptId: "model-interpretability",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Two strongly correlated features jointly drive the outcome. Describe what permutation importance reports for each, and the second problem permuting creates here.",
    rubric: {
      elements: [
        {
          id: "credit-is-split",
          description:
            "Each looks about half as important as the pair really is, because permuting one leaves the other carrying the same information — and both can look dispensable.",
          weight: 4,
          required: true,
        },
        {
          id: "off-manifold-evaluation",
          description:
            "Permuting one while holding the other fixed creates feature combinations that never occur in reality, so the model is evaluated on inputs off its training manifold and the resulting number describes an extrapolation nobody asked about.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["model-interpretability", "random-forests"],
    source: ML_10,
    status: "live",
  },
  {
    id: "model-interpretability--explain-model-not-world",
    conceptId: "model-interpretability",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Every method in this area answers a question about the model rather than about the world. Explain the difference and why it matters operationally.",
    rubric: {
      elements: [
        {
          id: "the-distinction",
          description:
            "They report how the fitted model uses a feature. A feature can be used because it causes the outcome, because it proxies something that does, or because of an artefact of how the data was collected — and the method cannot distinguish these.",
          weight: 5,
          required: true,
        },
        {
          id: "operational-consequence",
          description:
            "So reading 'change this feature and the outcome will change' out of an importance ranking is an intervention claim the evidence does not support, and acting on it is the standard way these tools cause harm.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["model-interpretability", "sensitivity-analysis"],
    source: ML_10,
    status: "live",
  },
  {
    id: "model-interpretability--explain-three-audiences",
    conceptId: "model-interpretability",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "'Interpretability' names at least three different goals with different standards of evidence. Name them and say how the adequate explanation differs.",
    rubric: {
      elements: [
        {
          id: "debugging",
          description:
            "Debugging: the developer needs to find where the model is wrong, and an approximate, even unfaithful, view can be enough to locate a bug.",
          weight: 3,
          required: true,
        },
        {
          id: "regulatory",
          description:
            "Regulatory or audit: needs a defensible account of the decision rule itself, which an approximation of a black box may not provide.",
          weight: 3,
          required: true,
        },
        {
          id: "affected-person",
          description:
            "Explaining a decision to the person it affects: needs to be truthful, actionable and comprehensible — a Shapley vector over 200 features is none of those.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["model-interpretability"],
    source: ML_10,
    status: "live",
  },
  {
    id: "model-interpretability--transfer-try-the-simple-model",
    conceptId: "model-interpretability",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Before committing to explaining a black box post-hoc, what should be tried first, and what makes it the better outcome when it works?",
    rubric: {
      elements: [
        {
          id: "fit-the-interpretable-model",
          description:
            "Fit an intrinsically interpretable model — a regularised linear model, a generalised additive model, a shallow tree — and measure the accuracy gap. On structured tabular data with good features it is frequently within a point or two.",
          weight: 4,
          required: true,
        },
        {
          id: "exact-beats-approximate",
          description:
            "When the gap is small, an exact explanation beats an approximate one: the explanation *is* the model, so it cannot be unfaithful to it, and it cannot be confidently wrong.",
          weight: 5,
          required: true,
        },
        {
          id: "cost-of-checking",
          description:
            "Bonus: notes the check costs an afternoon, which is small next to building an explanation pipeline around a model that did not need to be opaque.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["model-interpretability"],
    source: ML_10,
    status: "live",
  },
  {
    id: "model-interpretability--transfer-shap-limits",
    conceptId: "model-interpretability",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Shapley values are often described as the principled attribution method because they uniquely satisfy a set of fairness axioms. What does that guarantee, and what does it not?",
    rubric: {
      elements: [
        {
          id: "what-it-guarantees",
          description:
            "Uniqueness given the axioms: among attributions satisfying efficiency, symmetry, dummy and additivity, the Shapley value is the only one — so the *division* of credit is well founded.",
          weight: 4,
          required: true,
        },
        {
          id: "what-it-does-not",
          description:
            "It says nothing about causation, nothing about whether the model is right, and the axioms themselves are a choice — a different reasonable set gives different attributions. Correlated features and off-manifold evaluation remain problems.",
          weight: 5,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "treats-axioms-as-truth",
          description:
            "Presents axiomatic uniqueness as establishing that the attribution is correct about the world, rather than internally consistent given a chosen definition of fairness.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.6,
    expectedSeconds: 230,
    prereqClosure: ["model-interpretability", "sensitivity-analysis"],
    source: ML_10,
    status: "live",
  },

  // --- Anomaly Detection ----------------------------------------------------
  {
    id: "anomaly-detection--recall-why-not-classification",
    conceptId: "anomaly-detection",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Why is anomaly detection usually framed without labels rather than as a rare-class classification problem?",
    rubric: {
      elements: [
        {
          id: "anomalies-share-no-form",
          description:
            "Anomalies are defined by *not* resembling the normal data, so they have no common form for a classifier to learn.",
          weight: 4,
          required: true,
        },
        {
          id: "the-next-one-is-new",
          description:
            "The anomalies that matter have often not happened yet, so there are no examples of them to fit to.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["anomaly-detection", "clustering-methods"],
    source: ML_10,
    status: "live",
  },
  {
    id: "anomaly-detection--recall-the-standard-move",
    conceptId: "anomaly-detection",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the standard construction used by most anomaly detection methods?",
    choices: [
      { id: "a", text: "Describe the normal data well, then score each point by how poorly that description accounts for it", correct: true },
      {
        id: "b",
        text: "Learn what anomalies look like from labelled examples of them",
        correct: false,
        misconception: {
          id: "anomaly-thought-supervised",
          description:
            "This is the framing the field avoids: it needs anomaly examples, and it generalises only to anomaly types already seen.",
          blameConceptId: "anomaly-detection",
        },
      },
      {
        id: "c",
        text: "Cluster the data and label the largest cluster anomalous",
        correct: false,
        misconception: {
          id: "largest-cluster-inverted",
          description:
            "Backwards — the bulk of the data is the normal case by construction. Anomalies sit in sparse regions, not dense ones.",
          blameConceptId: "clustering-methods",
        },
      },
      {
        id: "d",
        text: "Remove outliers before modelling and ignore them",
        correct: false,
        misconception: {
          id: "detection-confused-with-cleaning",
          description:
            "Confuses data cleaning with the task. Here the unusual points are the output, not noise to discard.",
          blameConceptId: "anomaly-detection",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["anomaly-detection"],
    source: ML_10,
    status: "live",
  },
  {
    id: "anomaly-detection--apply-pick-a-method",
    conceptId: "anomaly-detection",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "You have two million rows and 400 features, no labels, and need a first pass. Which family would you reach for, and which would you rule out?",
    rubric: {
      elements: [
        {
          id: "isolation-forest-or-reconstruction",
          description:
            "An isolation-based method or a reconstruction-based one: neither needs a density estimate or a distance metric to survive 400 dimensions, and both scale to this many rows.",
          weight: 4,
          required: true,
        },
        {
          id: "rule-out-density-and-distance",
          description:
            "Rules out parametric density estimation and neighbour-based scoring: in 400 dimensions distances concentrate and densities are unestimable, and neighbour search over two million rows is expensive as well.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["anomaly-detection", "clustering-methods", "curse-of-dimensionality"],
    source: ML_10,
    status: "live",
  },
  {
    id: "anomaly-detection--apply-set-the-threshold",
    conceptId: "anomaly-detection",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A scoring model is built and an operations team can investigate 50 flags per day. How should the threshold be set, and what does that make the right reporting metric?",
    rubric: {
      elements: [
        {
          id: "threshold-from-capacity",
          description:
            "Set it so the expected number of flags per day is about 50 — the threshold is a capacity decision, not a statistical one.",
          weight: 4,
          required: true,
        },
        {
          id: "metric-follows",
          description:
            "The right metric is therefore precision within that top-50 budget: what fraction of the investigations were worth making.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["anomaly-detection"],
    source: ML_10,
    status: "live",
  },
  {
    id: "anomaly-detection--explain-isolation-forest",
    conceptId: "anomaly-detection",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Isolation Forest inverts the usual logic of the field. Explain what it does instead, and why that survives high dimensions.",
    rubric: {
      elements: [
        {
          id: "what-it-does",
          description:
            "Rather than modelling the normal data and measuring departure from it, it partitions the space with random splits and scores each point by how few splits are needed to isolate it.",
          weight: 4,
          required: true,
        },
        {
          id: "why-it-survives",
          description:
            "It needs neither a density estimate nor a distance metric — the two things that degrade as dimension grows — so the mechanism it depends on is unaffected.",
          weight: 5,
          required: true,
        },
        {
          id: "why-anomalies-isolate-fast",
          description:
            "Bonus: anomalies sit in sparse regions, so a random split is likely to separate them early, giving a short average path length.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["anomaly-detection", "curse-of-dimensionality"],
    source: ML_10,
    status: "live",
  },
  {
    id: "anomaly-detection--explain-evaluation-problem",
    conceptId: "anomaly-detection",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is evaluation the hardest part of anomaly detection, and what checks remain available when no labels exist at all?",
    rubric: {
      elements: [
        {
          id: "no-reference",
          description:
            "Without labels there is nothing to score against; with a handful of labelled anomalies any estimate has enormous variance, since one missed case moves recall by a large fraction.",
          weight: 4,
          required: true,
        },
        {
          id: "what-remains",
          description:
            "Stability of the flagged set across resamples, expert review of the top-ranked flags, and comparison against a null reference — none of which is a performance number, and all of which is better than none.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["anomaly-detection", "clustering-methods"],
    source: ML_10,
    status: "live",
  },
  {
    id: "anomaly-detection--transfer-autoencoder-detector",
    conceptId: "anomaly-detection",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A reconstruction-based detector is trained to rebuild its input and flags points it rebuilds badly. Why must it be trained on normal data only, and what happens if the training set is contaminated?",
    rubric: {
      elements: [
        {
          id: "why-normal-only",
          description:
            "The reconstruction error is only a meaningful anomaly score if the model learned to rebuild *normal* structure — its inability to rebuild something is the signal.",
          weight: 4,
          required: true,
        },
        {
          id: "contamination-effect",
          description:
            "If anomalies are present in training, the model learns to reconstruct them too, so they score low and become invisible — the detector is trained to miss exactly what it is for.",
          weight: 5,
          required: true,
        },
        {
          id: "mitigations",
          description:
            "Bonus: trimming the highest-error points and refitting, or using a robust estimator, limits the damage when a clean training set is unavailable.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.45,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["anomaly-detection", "generative-vs-discriminative-models"],
    source: ML_10,
    status: "live",
  },
  {
    id: "anomaly-detection--transfer-anomalous-vs-interesting",
    conceptId: "anomaly-detection",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A deployed detector's top flags turn out to be dominated by sensor glitches rather than the equipment failures it was built to catch. Diagnose the situation and say what would actually fix it.",
    rubric: {
      elements: [
        {
          id: "the-diagnosis",
          description:
            "The model is working: glitches genuinely are anomalous. 'Anomalous' and 'interesting' are different properties, and only domain knowledge separates them — the detector was never given the second.",
          weight: 5,
          required: true,
        },
        {
          id: "what-fixes-it",
          description:
            "Filter or model the known glitch signature so it becomes part of normal, or use the accumulating investigation outcomes as labels to move toward a supervised or semi-supervised ranking on top of the score.",
          weight: 4,
          required: true,
        },
        {
          id: "not-a-threshold-problem",
          description:
            "Bonus: notes that changing the threshold will not help — it reorders nothing.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["anomaly-detection", "clustering-methods"],
    source: ML_10,
    status: "live",
  },
];
