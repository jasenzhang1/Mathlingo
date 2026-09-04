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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "generative-vs-discriminative-models--apply-sort-methods",
    conceptId: "generative-vs-discriminative-models",
    format: "multi-select",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Select every method that models a distribution over the *inputs*, not only the label given the inputs.",
    choices: [
      { id: "a", text: "Naive Bayes", correct: true },
      { id: "b", text: "Linear discriminant analysis", correct: true },
      { id: "c", text: "A Gaussian mixture model", correct: true },
      {
        id: "d",
        text: "A support vector machine",
        correct: false,
        misconception: {
          id: "svm-called-generative",
          description:
            "An SVM models neither the inputs nor a probability — it produces a boundary and a signed distance, which is the most purely discriminative case there is.",
          blameConceptId: "generative-vs-discriminative-models",
        },
      },
      {
        id: "e",
        text: "Gradient-boosted decision trees",
        correct: false,
        misconception: {
          id: "trees-called-generative",
          description:
            "Trees partition the input space but never model its density — they cannot say how probable a given input is, let alone sample one.",
          blameConceptId: "generative-vs-discriminative-models",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.5,
    expectedSeconds: 100,
    prereqClosure: ["generative-vs-discriminative-models"],
    source: ML_04,
    status: "live",
  },
  {
    id: "generative-vs-discriminative-models--explain-sample-size-crossover",
    conceptId: "generative-vs-discriminative-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A generative classifier often beats its discriminative counterpart on small samples and loses on large ones. Explain both halves.",
    rubric: {
      elements: [
        {
          id: "assumptions-substitute-for-data",
          description:
            "The generative model's density assumptions supply structure the data would otherwise have to provide, so it reaches its best performance from very few examples.",
          weight: 4,
          required: true,
        },
        {
          id: "wrong-assumptions-set-a-floor",
          description:
            "Those same assumptions are usually somewhat wrong, and that error does not vanish with more data — so its asymptotic performance is capped while the discriminative model keeps improving past it.",
          weight: 4,
          required: true,
        },
        {
          id: "the-real-question",
          description:
            "Bonus: concludes that the useful question is not which family is better but where on the sample-size axis the problem sits.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["generative-vs-discriminative-models"],
    source: ML_04,
    status: "live",
  },
  {
    id: "generative-vs-discriminative-models--transfer-shifted-prior",
    conceptId: "generative-vs-discriminative-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A model was trained where 10% of cases were positive, and is deployed where the true rate is 30%, with everything else unchanged. Why is that a one-line adjustment for a generative classifier and a refit for a discriminative one?",
    rubric: {
      elements: [
        {
          id: "prior-is-explicit",
          description:
            "A generative model factors the posterior into P(x | y) and P(y), so the class prior is a separate, named quantity that can simply be replaced with the deployment rate.",
          weight: 4,
          required: true,
        },
        {
          id: "discriminative-baked-in",
          description:
            "A discriminative model estimates P(y | x) as one inseparable object with the training prior baked into it, so there is no term to swap — it must be refitted or post-hoc corrected.",
          weight: 4,
          required: true,
        },
        {
          id: "the-caveat",
          description:
            "Bonus: notes this holds because only the prior shifted; if P(x | y) also changed, neither adjustment is valid.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["generative-vs-discriminative-models"],
    source: ML_04,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "naive-bayes--apply-laplace-smoothing",
    conceptId: "naive-bayes",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A word appears 0 times in the 200 words of spam training text, over a vocabulary of 50 words. With add-one smoothing, P(word | spam) = (count + 1)/(total + V). Compute it to four decimal places.",
    answerKey: 0.004,
    tolerance: 0.0005,
    difficulty: 0.85,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["naive-bayes"],
    source: ML_04,
    status: "live",
  },
  {
    id: "naive-bayes--explain-log-space",
    conceptId: "naive-bayes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Every real naive Bayes implementation sums logarithms rather than multiplying probabilities. Why is that necessary rather than merely tidy, and why does it not change the answer?",
    rubric: {
      elements: [
        {
          id: "underflow",
          description:
            "Multiplying thousands of numbers well below 1 underflows to exactly 0 in floating point, at which point every class scores 0 and the comparison is meaningless.",
          weight: 4,
          required: true,
        },
        {
          id: "log-is-monotone",
          description:
            "The logarithm is strictly increasing, so it preserves the ordering and the argmax is unchanged — the products become sums that stay in representable range.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["naive-bayes"],
    source: ML_04,
    status: "live",
  },
  {
    id: "naive-bayes--transfer-good-classifier-bad-estimator",
    conceptId: "naive-bayes",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Naive Bayes is described as a poor probability estimator and a good classifier. Explain why those are not two separate observations but one.",
    rubric: {
      elements: [
        {
          id: "double-counting-correlated-evidence",
          description:
            "Correlated features are treated as independent, so their shared evidence is counted several times over, driving the estimated posterior toward 0 or 1.",
          weight: 4,
          required: true,
        },
        {
          id: "argmax-usually-survives",
          description:
            "That inflation is usually in the direction the evidence already pointed, so the ranking of classes is preserved even as the numbers become badly calibrated — one mechanism, two consequences.",
          weight: 5,
          required: true,
        },
        {
          id: "practical-implication",
          description:
            "Bonus: draws the implication — use it for the label, not for the probability, unless the output is calibrated afterwards.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["naive-bayes", "bayes-rule"],
    source: ML_04,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "lda--apply-parameter-counts",
    conceptId: "lda",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "With d = 4 features and K = 3 classes, a covariance matrix has d(d+1)/2 free entries. How many covariance parameters does QDA estimate in total, given one covariance matrix per class?",
    answerKey: 30,
    tolerance: 0.001,
    difficulty: 1.4,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["lda", "covariance-matrix", "symmetric-matrices"],
    source: ML_04,
    status: "live",
  },
  {
    id: "lda--explain-lda-vs-pca-directions",
    conceptId: "lda",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "LDA also serves as dimensionality reduction. Describe a dataset on which its top direction and a variance-maximising unsupervised direction would point almost perpendicular to each other, and say why.",
    rubric: {
      elements: [
        {
          id: "the-configuration",
          description:
            "Two elongated class clusters lying side by side: the greatest total variance runs *along* their shared long axis, while the classes are separated *across* it.",
          weight: 4,
          required: true,
        },
        {
          id: "why-they-differ",
          description:
            "The unsupervised direction maximises total spread and never consults labels, so it picks the long axis; LDA maximises between-class relative to within-class scatter and picks the separating direction.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Bonus: notes the consequence — projecting onto the top unsupervised component here would discard exactly the information a classifier needs.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["lda", "covariance-matrix"],
    source: ML_04,
    status: "live",
  },
  {
    id: "lda--transfer-regularised-middle-ground",
    conceptId: "lda",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Regularised discriminant analysis shrinks each class covariance toward the pooled one, with a parameter controlling how far. What does each end of that parameter recover, and why is the middle often best?",
    rubric: {
      elements: [
        {
          id: "the-two-ends",
          description:
            "Full shrinkage recovers LDA's single shared covariance; no shrinkage recovers QDA's per-class ones.",
          weight: 4,
          required: true,
        },
        {
          id: "why-the-middle",
          description:
            "The middle trades a little of QDA's flexibility for far more stable covariance estimates, which matters exactly when there are too few examples per class to estimate K full matrices reliably.",
          weight: 4,
          required: true,
        },
        {
          id: "chosen-on-held-out-data",
          description:
            "Bonus: notes the shrinkage parameter is chosen on held-out data, like any other complexity control.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.6,
    expectedSeconds: 230,
    prereqClosure: ["lda", "covariance-matrix", "variance"],
    source: ML_04,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "knn--apply-prediction-cost",
    conceptId: "knn",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A naive k-NN scan computes one distance per training point per query, each costing d operations. With n = 50,000 training points and d = 20 features, how many operations does a single prediction take?",
    answerKey: 1000000,
    tolerance: 1,
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["knn"],
    source: ML_04,
    status: "live",
  },
  {
    id: "knn--explain-cost-profile-is-reversed",
    conceptId: "knn",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Most models are expensive to train and cheap to serve. k-NN is the reverse. Explain why, and what that means for deploying it.",
    rubric: {
      elements: [
        {
          id: "no-training-all-prediction",
          description:
            "Fitting is just storing the data, while every prediction must compute distances to the whole training set — the work is deferred rather than avoided.",
          weight: 4,
          required: true,
        },
        {
          id: "deployment-consequences",
          description:
            "Deployment must carry the entire training set in memory and pay per query, so latency and cost grow with the dataset rather than staying fixed — the opposite of the usual operational profile.",
          weight: 4,
          required: true,
        },
        {
          id: "index-structures-and-their-limit",
          description:
            "Bonus: notes that KD-trees and ball trees help in low dimensions and degrade to the linear scan in high ones.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["knn"],
    source: ML_04,
    status: "live",
  },
  {
    id: "knn--transfer-k-equals-one-training-error",
    conceptId: "knn",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "1-NN achieves zero training error on any dataset, including one with randomly assigned labels. What does that demonstrate about training error in general, and what follows for choosing k?",
    rubric: {
      elements: [
        {
          id: "why-it-is-zero",
          description:
            "Every training point is its own nearest neighbour at distance 0, so it reproduces every training label exactly — including mislabelled ones.",
          weight: 3,
          required: true,
        },
        {
          id: "what-it-demonstrates",
          description:
            "It is the cleanest demonstration that zero training error carries no information about generalisation: a model can achieve it on pure noise without having learned anything.",
          weight: 4,
          required: true,
        },
        {
          id: "so-k-needs-held-out-data",
          description:
            "So k cannot be chosen by fit and must be chosen on held-out data — training error would select k = 1 every time.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["knn", "classification-vs-regression"],
    source: ML_04,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "svm--apply-margin-from-norm",
    conceptId: "svm",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For a hard-margin SVM the margin width is 2/‖w‖. If ‖w‖ = 0.5, what is the margin width?",
    answerKey: 4,
    tolerance: 0.001,
    difficulty: 0.35,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["svm", "vector-operations"],
    source: ML_04,
    status: "live",
  },
  {
    id: "svm--explain-C-direction",
    conceptId: "svm",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "In the soft-margin objective ½‖w‖² + C·Σξᵢ, does a large C mean more regularisation or less? Justify it from the formula, and say why the direction is so often reversed.",
    rubric: {
      elements: [
        {
          id: "large-c-is-less-regularisation",
          description:
            "Large C means *less* regularisation: it raises the price of every margin violation, so the fit tries hard to classify each training point and the margin narrows.",
          weight: 4,
          required: true,
        },
        {
          id: "reads-it-from-the-formula",
          description:
            "Justifies it from the objective — C multiplies the data-fit term rather than the complexity term, so it is the reciprocal of the λ that multiplies a penalty in ridge-style formulations.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence-of-getting-it-backwards",
          description:
            "Bonus: notes that reversing it turns a hyperparameter sweep into a search for the most overfit model on the grid.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["svm"],
    source: ML_04,
    status: "live",
  },
  {
    id: "svm--transfer-scaling-and-outliers",
    conceptId: "svm",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "An SVM is robust to distant outliers yet highly sensitive to unstandardised features. Explain why both are true, given that both concern the geometry of the data.",
    rubric: {
      elements: [
        {
          id: "outlier-robustness",
          description:
            "A point far from the boundary has coefficient zero and no influence on the solution at all, so a distant outlier is simply ignored — unlike a squared-error fit, which it would drag.",
          weight: 4,
          required: true,
        },
        {
          id: "scale-sensitivity",
          description:
            "The margin is a distance measured in the input metric, so a feature with a large numeric range dominates ‖w‖ and the margin geometry — the units decide which directions the boundary can afford to be far from.",
          weight: 4,
          required: true,
        },
        {
          id: "reconciles-them",
          description:
            "Bonus: reconciles the two — robustness is about which *points* matter, scale sensitivity about which *directions* do.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["svm", "vector-operations"],
    source: ML_04,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },

  {
    id: "svms-for-regression--apply-epsilon-insensitive-loss",
    conceptId: "svms-for-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "With ε = 0.5, the ε-insensitive loss is max(0, |y − f(x)| − ε). Residuals on four points are 0.2, 0.4, 1.5 and 2.0. What is the total loss?",
    answerKey: 2.5,
    tolerance: 0.005,
    difficulty: 0.75,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["svms-for-regression", "svm"],
    source: ML_04,
    status: "live",
  },
  {
    id: "svms-for-regression--explain-epsilon-has-units",
    conceptId: "svms-for-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is a library's default value of ε a value rather than a judgement about your data, and what should be done about that?",
    rubric: {
      elements: [
        {
          id: "epsilon-has-units",
          description:
            "ε is measured in the units of the target, so ε = 0.1 means something entirely different when y is a probability than when y is a house price in pounds.",
          weight: 4,
          required: true,
        },
        {
          id: "what-to-do",
          description:
            "Either standardise the target so the default is interpretable, or choose ε from the noise scale actually expected — the width of variation you are content to ignore.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["svms-for-regression", "svm"],
    source: ML_04,
    status: "live",
  },
  {
    id: "svms-for-regression--transfer-why-displaced-by-boosted-trees",
    conceptId: "svms-for-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Support vector regression was largely displaced by gradient-boosted trees for large tabular regression. Give the reason, and one setting where it is still the better choice.",
    rubric: {
      elements: [
        {
          id: "scaling-in-n",
          description:
            "Training scales roughly cubically in the number of samples and the kernel matrix is n × n, so it becomes infeasible at the sample sizes tabular problems now reach.",
          weight: 4,
          required: true,
        },
        {
          id: "where-it-still-wins",
          description:
            "Names a setting where it still wins: small n with smooth continuous structure, where a kernel expresses the expected smoothness directly and a tree's piecewise-constant fit would be a poor match — and no feature scaling burden is being avoided anyway.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.5,
    expectedSeconds: 220,
    prereqClosure: ["svms-for-regression", "svm", "kernel"],
    source: ML_04,
    status: "live",
  },

];
