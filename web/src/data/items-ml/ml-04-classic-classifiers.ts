import type { Item } from "../../lib/assessment/types";
import { ML_04 } from "./sources";

/**
 * Cluster 4 — generative/discriminative and the classic classifiers. Ported from
 * `assessments/ml-04-generative-discriminative-and-classic-classifiers.md`.
 *
 * Several markdown items cross-reference a concept that is not upstream of the
 * one being tested — `curse-of-dimensionality` from `naive-bayes`,
 * `bias-variance-tradeoff` from `lda`, `decision-tree` from `knn`,
 * `loss-functions` from `svms-for-regression`. Those cross-references are kept
 * in the prose, where they are the point of the item, but the stem now supplies
 * whatever the learner needs, so nothing outside the concept's own ancestry is
 * required to answer. `knn`'s callback to `curse-of-dimensionality` is a genuine
 * prerequisite edge and is declared as one.
 */
export const ml04Items: Item[] = [
  // --- Generative vs Discriminative Models ---------------------------------
  {
    id: "generative-vs-discriminative-models--recall-distinction",
    conceptId: "generative-vs-discriminative-models",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Distinguish generative from discriminative models by what each one estimates.",
    rubric: {
      elements: [
        {
          id: "generative",
          description:
            "Generative: models the joint P(X, Y), usually via P(X | Y) and P(Y).",
          weight: 3,
          required: true,
        },
        {
          id: "discriminative",
          description:
            "Discriminative: models P(Y | X) directly — the boundary and nothing else.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["generative-vs-discriminative-models", "classification-vs-regression"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "generative-vs-discriminative-models--recall-advantage",
    conceptId: "generative-vs-discriminative-models",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which is a genuine capability of generative models that discriminative models lack?",
    choices: [
      {
        id: "a",
        text: "They can sample new synthetic data, because they model the full joint distribution",
        correct: true,
      },
      {
        id: "b",
        text: "They are always more accurate at classification",
        correct: false,
        misconception: {
          id: "generative-assumed-more-accurate",
          description:
            "There is no such guarantee. A generative model with a wrong density assumption typically has *higher* asymptotic error; its advantage is at small sample sizes.",
          blameConceptId: "generative-vs-discriminative-models",
        },
      },
      {
        id: "c",
        text: "They need no training data",
        correct: false,
        misconception: {
          id: "generative-assumed-data-free",
          description:
            "Both families are fitted from data. Generative models actually ask more of it, since they estimate a distribution over the inputs too.",
          blameConceptId: "generative-vs-discriminative-models",
        },
      },
      {
        id: "d",
        text: "They cannot be used for classification at all",
        correct: false,
        misconception: {
          id: "generative-assumed-non-classifier",
          description:
            "Bayes' rule turns a joint model into a classifier. Naive Bayes and LDA are generative classifiers.",
          blameConceptId: "generative-vs-discriminative-models",
        },
      },
    ],
    difficulty: -0.45,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["generative-vs-discriminative-models"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "generative-vs-discriminative-models--apply-classify-two-methods",
    conceptId: "generative-vs-discriminative-models",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Is logistic regression generative or discriminative? What about naive Bayes? Justify each from what it estimates.",
    rubric: {
      elements: [
        {
          id: "logistic-discriminative",
          description: "Logistic regression: discriminative — it models P(Y | X) directly.",
          weight: 3,
          required: true,
        },
        {
          id: "nb-generative",
          description:
            "Naive Bayes: generative — it models P(X | Y) and P(Y) and combines them with Bayes' rule.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["generative-vs-discriminative-models"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "generative-vs-discriminative-models--explain-asymmetry",
    conceptId: "generative-vs-discriminative-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why can a generative model always derive P(Y | X), while a discriminative model generally cannot recover P(X) or generate new data?",
    rubric: {
      elements: [
        {
          id: "joint-gives-everything",
          description:
            "Having the joint P(X, Y), any conditional or marginal can be computed from it — including P(Y | X).",
          weight: 4,
          required: true,
        },
        {
          id: "no-representation-of-px",
          description:
            "States the asymmetry directly: a discriminative model has no representation of P(X) at all, so there is nothing to marginalise or sample from.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["generative-vs-discriminative-models"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "generative-vs-discriminative-models--transfer-image-generation",
    conceptId: "generative-vs-discriminative-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why does a model that produces new images need something like P(X), while an image classifier only ever needs P(Y | X)?",
    rubric: {
      elements: [
        {
          id: "generation-requires-sampling-px",
          description:
            "Producing a new, realistic image means sampling from a model of what images look like in general — that is P(X).",
          weight: 4,
          required: true,
        },
        {
          id: "classification-maps-given-input",
          description:
            "A classifier only maps a *given* image to a label and never has to represent the space of possible images.",
          weight: 3,
          required: true,
        },
        {
          id: "different-objective",
          description:
            "Bonus: concludes that the two need fundamentally different training objectives, not just different architectures.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.4,
    expectedSeconds: 200,
    prereqClosure: ["generative-vs-discriminative-models"],
    source: ML_04,
    status: "shadow",
  },

  // --- Naive Bayes ----------------------------------------------------------
  {
    id: "naive-bayes--recall-assumption",
    conceptId: "naive-bayes",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State naive Bayes' 'naive' assumption precisely.",
    rubric: {
      elements: [
        {
          id: "conditional-independence",
          description:
            "Features are conditionally independent of one another *given the class label*.",
          weight: 4,
          required: true,
        },
        {
          id: "given-the-class",
          description:
            "The 'given the class' qualifier is present — it is conditional, not marginal, independence.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.26,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["naive-bayes", "bayes-rule", "generative-vs-discriminative-models"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "naive-bayes--recall-why-naive",
    conceptId: "naive-bayes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Naive Bayes is called 'naive' because:",
    choices: [
      {
        id: "a",
        text: "it assumes features are conditionally independent given the class, which is usually unrealistic",
        correct: true,
      },
      {
        id: "b",
        text: "it is an unsophisticated algorithm that beginners use",
        correct: false,
        misconception: {
          id: "naive-read-as-unsophisticated",
          description:
            "Reads 'naive' as a comment on the method's standing rather than as the name of one specific, identifiable assumption.",
          blameConceptId: "naive-bayes",
        },
      },
      {
        id: "c",
        text: "it ignores the class prior",
        correct: false,
        misconception: {
          id: "prior-thought-dropped",
          description:
            "The prior P(y) is right there in the formula. What is simplified is the likelihood term.",
          blameConceptId: "bayes-rule",
        },
      },
      {
        id: "d",
        text: "it assumes every class is equally likely",
        correct: false,
        misconception: {
          id: "uniform-prior-assumed",
          description:
            "Class priors are estimated from the data. A uniform prior is a separate, optional choice.",
          blameConceptId: "naive-bayes",
        },
      },
    ],
    difficulty: 0.04,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["naive-bayes"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "naive-bayes--apply-free-and-money",
    conceptId: "naive-bayes",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A spam classifier assumes 'free' and 'money' are independent given that an email is spam. Why is that false, and why does the classifier often still work well?",
    rubric: {
      elements: [
        {
          id: "violation",
          description:
            "Names the violation: spam emails containing 'free' are also more likely to contain 'money', so the two remain correlated even within the spam class.",
          weight: 3,
          required: true,
        },
        {
          id: "argmax-survives",
          description:
            "Explains why it still works: classification needs only the correct argmax, and double-counting correlated evidence usually pushes the estimated posterior toward 0 or 1 without changing which class ranks first.",
          weight: 4,
          required: true,
        },
        {
          id: "calibration-cost",
          description:
            "Bonus: notes the cost is calibration — the probabilities themselves are unreliable even when the label is right.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.54,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["naive-bayes"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "naive-bayes--explain-parameter-count",
    conceptId: "naive-bayes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does conditional independence make naive Bayes dramatically cheaper to estimate? Compare the number of parameters needed with and without it, for d binary features.",
    rubric: {
      elements: [
        {
          id: "exponential-without",
          description:
            "Without the assumption, the full joint P(x₁ … x_d | y) needs on the order of 2^d parameters per class — exponential in the number of features.",
          weight: 4,
          required: true,
        },
        {
          id: "linear-with",
          description:
            "With it, only d separate P(xⱼ | y) terms are needed per class — linear in the number of features.",
          weight: 4,
          required: true,
        },
        {
          id: "why-it-matters",
          description:
            "Bonus: connects this to why the method works on vocabulary-sized feature spaces with modest training data.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "says-simpler-without-counts",
          description:
            "Says the assumption 'makes the maths simpler' without the exponential-versus-linear parameter comparison that is the actual content.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.24,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["naive-bayes"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "naive-bayes--transfer-bayes-rule-assembly",
    conceptId: "naive-bayes",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem: "Starting from Bayes' rule, show how naive Bayes combines the prior and the factored likelihood into the quantity it classifies on, and say why the denominator can be dropped.",
    rubric: {
      elements: [
        {
          id: "bayes-rule-form",
          description:
            "Writes P(y | x₁ … x_d) = P(y)·P(x₁ … x_d | y) / P(x₁ … x_d).",
          weight: 3,
          required: true,
        },
        {
          id: "factored-likelihood",
          description:
            "Replaces the likelihood with ∏ⱼ P(xⱼ | y), giving P(y | x) ∝ P(y)·∏ⱼ P(xⱼ | y).",
          weight: 4,
          required: true,
        },
        {
          id: "denominator-dropped",
          description:
            "Explains that P(x) is identical across classes, so it cannot change the argmax and is dropped.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.74,
    discrimination: 1.6,
    expectedSeconds: 280,
    prereqClosure: ["naive-bayes", "bayes-rule", "conditional-probability"],
    source: ML_04,
    status: "shadow",
  },

  // --- Linear Discriminant Analysis ----------------------------------------
  {
    id: "lda--recall-generative-assumption",
    conceptId: "lda",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State LDA's generative assumption, and identify what makes its decision boundary linear.",
    rubric: {
      elements: [
        {
          id: "gaussian-per-class",
          description: "Each class's features are multivariate normal.",
          weight: 3,
          required: true,
        },
        {
          id: "shared-covariance",
          description:
            "All classes share one covariance matrix and differ only in their means — and that shared covariance is what makes the boundary linear.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.36,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["lda", "multivariate-normal", "generative-vs-discriminative-models"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "lda--recall-dropping-shared-covariance",
    conceptId: "lda",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Giving each class its own covariance matrix instead of a shared one produces:",
    choices: [
      {
        id: "a",
        text: "quadratic discriminant analysis, whose decision boundary is curved",
        correct: true,
      },
      {
        id: "b",
        text: "still LDA, just with more parameters",
        correct: false,
        misconception: {
          id: "qda-called-lda",
          description:
            "Treats the shared covariance as an implementation detail. It is the assumption that produces linearity — drop it and the boundary shape changes.",
          blameConceptId: "lda",
        },
      },
      {
        id: "c",
        text: "a discriminative model, since the boundary is no longer linear",
        correct: false,
        misconception: {
          id: "boundary-shape-confused-with-family",
          description:
            "Confuses boundary shape with what the model estimates. QDA still models P(X | Y) per class, so it remains generative.",
          blameConceptId: "generative-vs-discriminative-models",
        },
      },
      {
        id: "d",
        text: "principal component analysis",
        correct: false,
        misconception: {
          id: "lda-confused-with-pca",
          description:
            "PCA is unsupervised and never uses class labels; both LDA and QDA are supervised classifiers.",
          blameConceptId: "lda",
        },
      },
    ],
    difficulty: 0.66,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["lda"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "lda--apply-cancellation-argument",
    conceptId: "lda",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Why does sharing one covariance matrix while allowing different means produce a *linear* boundary between two classes?",
    rubric: {
      elements: [
        {
          id: "boundary-is-where-densities-equal",
          description:
            "The boundary is the set where the two class-conditional densities (times their priors) are equal.",
          weight: 3,
          required: true,
        },
        {
          id: "quadratic-terms-cancel",
          description:
            "With a shared covariance, the quadratic term xᵀΣ⁻¹x is identical in both exponents and cancels, leaving an equation that is linear in x.",
          weight: 5,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-linear-by-definition",
          description:
            "Answers that LDA is linear 'because it is a linear method', which restates the name rather than giving the cancellation.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.16,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["lda", "multivariate-normal", "positive-definite-matrices"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "lda--explain-why-generative",
    conceptId: "lda",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "LDA ultimately outputs a decision boundary. Why is it nonetheless classified as a generative model?",
    rubric: {
      elements: [
        {
          id: "models-class-conditional-density",
          description:
            "It models the full class-conditional density P(X | Y) — a multivariate normal per class — rather than P(Y | X).",
          weight: 4,
          required: true,
        },
        {
          id: "bayes-rule-to-get-boundary",
          description:
            "It combines those with a class prior via Bayes' rule to obtain the posterior, and the boundary falls out of that — the same generative structure as naive Bayes.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.86,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["lda", "generative-vs-discriminative-models"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "lda--transfer-when-qda-wins",
    conceptId: "lda",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Give a situation where LDA's shared-covariance assumption fits badly, and explain the trade-off in preferring QDA despite its far larger parameter count.",
    rubric: {
      elements: [
        {
          id: "concrete-violation",
          description:
            "Gives a concrete violation — e.g. one class a tight cluster and another diffuse, so a single pooled covariance splits the difference and misplaces the boundary.",
          weight: 3,
          required: true,
        },
        {
          id: "error-trade-off",
          description:
            "States the trade-off: per-class covariances remove that systematic error, but estimating K covariance matrices from limited data per class makes the fit far more variable across samples.",
          weight: 4,
          required: true,
        },
        {
          id: "middle-ground",
          description:
            "Bonus: names regularised discriminant analysis, which shrinks each class covariance toward the pooled one and interpolates between the two.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.36,
    discrimination: 1.5,
    expectedSeconds: 230,
    prereqClosure: ["lda", "variance", "covariance-matrix"],
    source: ML_04,
    status: "shadow",
  },

  // --- K Nearest Neighbors --------------------------------------------------
  {
    id: "knn--recall-prediction-rule",
    conceptId: "knn",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the k-nearest-neighbours prediction rule.",
    rubric: {
      elements: [
        {
          id: "find-k-closest",
          description: "Find the k closest training points to the query point.",
          weight: 3,
          required: true,
        },
        {
          id: "vote-or-average",
          description:
            "Take a majority vote among their labels for classification, or their mean for regression.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.6,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["knn", "classification-vs-regression"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "knn--recall-lazy-learning",
    conceptId: "knn",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "k-NN is described as 'lazy learning' because:",
    choices: [
      {
        id: "a",
        text: "it does essentially no work at training time — it just stores the data — and does all its computation at prediction time",
        correct: true,
      },
      {
        id: "b",
        text: "it requires no computation at prediction time",
        correct: false,
        misconception: {
          id: "lazy-read-as-cheap-prediction",
          description:
            "Exactly reverses the cost profile. Prediction is where every distance must be computed, which is why k-NN can be expensive to deploy.",
          blameConceptId: "knn",
        },
      },
      {
        id: "c",
        text: "it converges slowly during training",
        correct: false,
        misconception: {
          id: "lazy-read-as-slow-convergence",
          description:
            "There is no iterative training to converge. 'Lazy' describes *when* the work happens, not how fast it is.",
          blameConceptId: "knn",
        },
      },
      {
        id: "d",
        text: "it uses only a small random subset of the data",
        correct: false,
        misconception: {
          id: "lazy-read-as-subsampling",
          description:
            "k-NN keeps the entire training set — that is precisely what makes it memory-hungry.",
          blameConceptId: "knn",
        },
      },
    ],
    difficulty: -0.35,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["knn"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "knn--apply-effect-of-k",
    conceptId: "knn",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "As k increases from 1 towards n, does the decision boundary get smoother or more jagged? Describe both extremes and what each implies about the fit's rigidity and its stability across resamples.",
    rubric: {
      elements: [
        {
          id: "smoother-with-k",
          description: "Smoother as k grows.",
          weight: 2,
          required: true,
        },
        {
          id: "k-equals-1",
          description:
            "k = 1: a jagged boundary that reproduces every training label, very unstable across resamples.",
          weight: 3,
          required: true,
        },
        {
          id: "k-equals-n",
          description:
            "k = n: the same majority-class prediction everywhere — maximally rigid, and completely stable.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["knn"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "knn--explain-curse-of-dimensionality",
    conceptId: "knn",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does k-NN suffer so badly from the curse of dimensionality?",
    rubric: {
      elements: [
        {
          id: "distances-concentrate",
          description:
            "Reuses the earlier result: in high dimensions all points become roughly equidistant, so distances stop discriminating.",
          weight: 4,
          required: true,
        },
        {
          id: "undermines-the-mechanism",
          description:
            "Connects it to k-NN's mechanism specifically: the method is nothing but a ranking by distance, so a degraded ranking is a degraded model.",
          weight: 4,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "restates-curse-generically",
          description:
            "Restates the curse of dimensionality without saying which part of k-NN it breaks.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["knn", "curse-of-dimensionality"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "knn--transfer-feature-scaling",
    conceptId: "knn",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "k-NN essentially requires feature scaling, while a decision tree — which splits on one feature at a time using only the ordering of its values — does not. Explain why, with a concrete example of two features on different scales.",
    rubric: {
      elements: [
        {
          id: "concrete-unit-mismatch",
          description:
            "Gives a concrete example: income in dollars (tens of thousands) against age in years (0–100), so squared differences in income dominate the distance entirely.",
          weight: 4,
          required: true,
        },
        {
          id: "distance-mixes-features",
          description:
            "Names the mechanism: k-NN's distance sums across all features at once, so the units decide the weighting rather than the model.",
          weight: 3,
          required: true,
        },
        {
          id: "tree-contrast",
          description:
            "Draws the contrast: a tree compares values within one feature at a time, so any monotone rescaling leaves the splits unchanged.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["knn"],
    source: ML_04,
    status: "shadow",
  },

  // --- Support Vector Machine ----------------------------------------------
  {
    id: "svm--recall-core-idea",
    conceptId: "svm",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the core idea of a support vector machine.",
    rubric: {
      elements: [
        {
          id: "maximum-margin",
          description:
            "Find the separating hyperplane that maximises the margin — the distance to the nearest points of either class.",
          weight: 4,
          required: true,
        },
        {
          id: "not-just-any-separator",
          description:
            "Notes that many hyperplanes separate the data; the SVM picks the one furthest from both classes.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.4,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["svm", "kernel", "classification-vs-regression"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "svm--recall-support-vectors",
    conceptId: "svm",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The support vectors of a fitted SVM are:",
    choices: [
      {
        id: "a",
        text: "only the training points on or inside the margin, which alone determine where the boundary sits",
        correct: true,
      },
      {
        id: "b",
        text: "all of the training points",
        correct: false,
        misconception: {
          id: "all-points-called-support-vectors",
          description:
            "Misses the sparsity that defines the method. Points comfortably outside the margin have coefficient zero and no influence on the boundary.",
          blameConceptId: "svm",
        },
      },
      {
        id: "c",
        text: "the points furthest from the boundary",
        correct: false,
        misconception: {
          id: "support-vectors-inverted",
          description:
            "Inverts the geometry. It is the *closest* points that constrain the margin; distant ones are unconstraining.",
          blameConceptId: "svm",
        },
      },
      {
        id: "d",
        text: "the class means",
        correct: false,
        misconception: {
          id: "support-vectors-confused-with-centroids",
          description:
            "Describes a centroid-based classifier. An SVM's boundary depends on the extreme points of each class, not their averages.",
          blameConceptId: "svm",
        },
      },
    ],
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["svm"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "svm--apply-remove-distant-point",
    conceptId: "svm",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A training point that lies far from the boundary — not a support vector — is deleted and the SVM refitted. Does the boundary move? Justify your answer.",
    rubric: {
      elements: [
        {
          id: "no-change",
          description: "No — the boundary is identical.",
          weight: 2,
          required: true,
        },
        {
          id: "reasoning",
          description:
            "Justifies it: that point's dual coefficient is zero, so it contributes nothing to the solution; only the support vectors constrain where the hyperplane can sit.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["svm"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "svm--explain-why-max-margin-generalises",
    conceptId: "svm",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does maximising the margin, rather than accepting any separating boundary, tend to generalise better to new data?",
    rubric: {
      elements: [
        {
          id: "buffer-tolerates-perturbation",
          description:
            "A wide buffer means a new point can sit some distance from where the training points did and still be classified correctly.",
          weight: 4,
          required: true,
        },
        {
          id: "contrast-with-tight-boundary",
          description:
            "Contrasts with a boundary squeezed against the data, which misclassifies at the slightest displacement.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["svm"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "svm--transfer-kernel-trick",
    conceptId: "svm",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why does the kernel trick let an SVM find a nonlinear boundary without ever computing the transformed feature vectors — which may be infinite-dimensional?",
    rubric: {
      elements: [
        {
          id: "only-inner-products-needed",
          description:
            "Names the structural fact: the SVM's dual objective and its predictions involve the data only through inner products between pairs of points.",
          weight: 5,
          required: true,
        },
        {
          id: "kernel-supplies-the-inner-product",
          description:
            "A kernel returns the inner product *as if* the points had been mapped into the higher-dimensional space, so the mapping itself is never materialised.",
          weight: 4,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "says-it-maps-to-higher-dimensions",
          description:
            "Says only that the kernel 'maps the data to a higher-dimensional space', which is the thing the trick specifically avoids doing.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["svm", "kernel", "dot-product"],
    source: ML_04,
    status: "shadow",
  },

  // --- SVMs for Regression --------------------------------------------------
  {
    id: "svms-for-regression--recall-core-idea",
    conceptId: "svms-for-regression",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the core idea of support vector regression.",
    rubric: {
      elements: [
        {
          id: "epsilon-tube",
          description:
            "Fit a function so that as many points as possible fall inside a tube of width ε around it, with errors smaller than ε costing nothing.",
          weight: 4,
          required: true,
        },
        {
          id: "only-outside-points-count",
          description:
            "Only points on or outside the tube are penalised, and those become the support vectors.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.35,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["svms-for-regression", "svm"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "svms-for-regression--recall-epsilon",
    conceptId: "svms-for-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In support vector regression, the parameter ε controls:",
    choices: [
      {
        id: "a",
        text: "the width of the no-penalty tube around the fitted function",
        correct: true,
      },
      {
        id: "b",
        text: "the optimiser's learning rate",
        correct: false,
        misconception: {
          id: "epsilon-confused-with-learning-rate",
          description:
            "Confuses a term in the loss with a setting of the solver. ε changes what counts as an error at all; a learning rate only changes how the optimiser moves.",
          blameConceptId: "svms-for-regression",
        },
      },
      {
        id: "c",
        text: "the penalty paid per unit of violation",
        correct: false,
        misconception: {
          id: "epsilon-confused-with-c",
          description:
            "That is C. ε sets where the penalty starts; C sets how steeply it is charged once it does.",
          blameConceptId: "svms-for-regression",
        },
      },
      {
        id: "d",
        text: "the number of support vectors, set directly",
        correct: false,
        misconception: {
          id: "epsilon-thought-to-set-count",
          description:
            "ε influences how many points end up as support vectors, but it does not set the count — that is an outcome of the fit, not an input.",
          blameConceptId: "svms-for-regression",
        },
      },
    ],
    difficulty: -0.05,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["svms-for-regression"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "svms-for-regression--apply-large-epsilon",
    conceptId: "svms-for-regression",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "With a very large ε, do more or fewer points become support vectors? What does that imply about the fitted function?",
    rubric: {
      elements: [
        {
          id: "fewer-support-vectors",
          description:
            "Fewer — a wide tube swallows more points, and points inside it carry zero coefficient.",
          weight: 3,
          required: true,
        },
        {
          id: "simpler-flatter-fit",
          description:
            "The fit becomes simpler and flatter: it stops tracking fine-grained variation, accepting systematic error in exchange for insensitivity to the sample.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.45,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["svms-for-regression", "svm"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "svms-for-regression--explain-tube-vs-margin",
    conceptId: "svms-for-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "What is the conceptual parallel between SVR's ε-tube and the ordinary SVM's margin — and where does the analogy invert?",
    rubric: {
      elements: [
        {
          id: "both-are-free-zones",
          description:
            "Both define a buffer zone that incurs no penalty, and in both cases only the points outside it determine the fitted function.",
          weight: 4,
          required: true,
        },
        {
          id: "inversion",
          description:
            "Names the inversion: the classification margin should be *empty* of points, while the regression tube should be as *full* as possible.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["svms-for-regression", "svm"],
    source: ML_04,
    status: "shadow",
  },
  {
    id: "svms-for-regression--transfer-robustness-to-outliers",
    conceptId: "svms-for-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Ordinary least squares charges the square of every residual. Why might SVR be preferred on data with occasional large outliers?",
    rubric: {
      elements: [
        {
          id: "quadratic-penalty-is-the-problem",
          description:
            "Squaring means one point at distance 10 costs as much as a hundred at distance 1, so a single extreme point can dominate the whole fit.",
          weight: 4,
          required: true,
        },
        {
          id: "svr-loss-is-milder",
          description:
            "SVR charges only the excess beyond ε and does so linearly, so an outlier pulls the fit far less.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.65,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["svms-for-regression", "svm"],
    source: ML_04,
    status: "shadow",
  },
];
