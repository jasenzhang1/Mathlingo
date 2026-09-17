import type { Item } from "../../lib/assessment/types";
import { AUTHORED, BISHOP_PRML, ESL, ISLR, NIST_HANDBOOK, OCW_18_06, OCW_18_650 } from "./sources";

/**
 * REG-4 — AIC/BIC, Forward/Backward/Stepwise Selection, Regularization, LASSO,
 * Ridge Regression, Elastic Net, LOESS Smoothing.
 *
 * Authored from `assessments/reg-04-model-selection-and-regularization.md`. Two
 * threads run through the cluster and several items ask the learner to hold
 * both: choosing a model is a bias-variance decision, and the *shape* of a
 * penalty (diamond versus circle) is what decides whether the solution is
 * sparse or merely small.
 */
export const regressionSelectionItems: Item[] = [
  // --- AIC, BIC -------------------------------------------------------------
  {
    id: "aic-bic--recall-formulas",
    conceptId: "aic-bic",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "AIC and BIC are defined as:",
    choices: [
      { id: "a", text: "AIC = 2k − 2ln L̂ and BIC = k·ln(n) − 2ln L̂, with lower values preferred", correct: true },
      {
        id: "b",
        text: "AIC = 2k + 2ln L̂ and BIC = k·ln(n) + 2ln L̂, with higher values preferred",
        correct: false,
        misconception: {
          id: "sign-on-likelihood-flipped",
          description:
            "Flips the sign on the fit term, so a better-fitting model would score worse. The likelihood must enter with the opposite sign to the penalty.",
          blameConceptId: "aic-bic",
        },
      },
      {
        id: "c",
        text: "AIC = k·ln(n) − 2ln L̂ and BIC = 2k − 2ln L̂",
        correct: false,
        misconception: {
          id: "aic-bic-penalties-swapped",
          description:
            "Swaps the two penalties. BIC is the one whose penalty grows with the sample size.",
          blameConceptId: "aic-bic",
        },
      },
      {
        id: "d",
        text: "Both equal −2ln L̂, differing only in how the likelihood is computed",
        correct: false,
        misconception: {
          id: "penalty-term-dropped",
          description:
            "Drops the complexity penalty entirely, which is the only thing that makes either criterion more than a raw likelihood comparison.",
          blameConceptId: "aic-bic",
        },
      },
    ],
    difficulty: 0.22,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["aic-bic", "mle", "linear-regression-probabilistic-version"],
    source: ESL,
    status: "live",
  },
  {
    id: "aic-bic--recall-penalty-comparison",
    conceptId: "aic-bic",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Compared with AIC, BIC's per-parameter penalty is:",
    choices: [
      {
        id: "a",
        text: "Larger for any realistic sample size, since ln(n) exceeds 2 once n is above about 7",
        correct: true,
      },
      {
        id: "b",
        text: "Identical — the two criteria differ only in notation",
        correct: false,
        misconception: {
          id: "criteria-treated-as-identical",
          description:
            "Misses the ln(n) versus fixed-2 distinction, which is the only difference between them and the source of all their differing behaviour.",
          blameConceptId: "aic-bic",
        },
      },
      {
        id: "c",
        text: "Smaller, so BIC prefers larger models",
        correct: false,
        misconception: {
          id: "bic-thought-more-permissive",
          description:
            "Reverses the comparison. The larger penalty makes BIC select smaller models, not larger ones.",
          blameConceptId: "aic-bic",
        },
      },
      {
        id: "d",
        text: "Larger only when the model has more than 10 parameters",
        correct: false,
        misconception: {
          id: "penalty-tied-to-k-not-n",
          description:
            "Ties the comparison to the parameter count. Both penalties are linear in k; what differs is the coefficient, which depends on n.",
          blameConceptId: "aic-bic",
        },
      },
    ],
    difficulty: 0.52,
    discrimination: 1.5,
    expectedSeconds: 50,
    prereqClosure: ["aic-bic", "mle"],
    source: ESL,
    status: "live",
  },
  {
    id: "aic-bic--apply-compare-two-models",
    conceptId: "aic-bic",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With n = 100, model A has k = 3 and −2ln L̂ = 250, while model B has k = 8 and −2ln L̂ = 238. What is " +
      "AIC for model B? Give a whole number.",
    answerKey: 254,
    tolerance: 0.01,
    difficulty: 1.02,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["aic-bic", "mle"],
    source: ESL,
    status: "live",
  },
  {
    id: "aic-bic--apply-bic-difference",
    conceptId: "aic-bic",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For the same two models — n = 100, model A with k = 3 and −2ln L̂ = 250, model B with k = 8 and " +
      "−2ln L̂ = 238 — compute BIC(B) − BIC(A). Give a decimal to one place. (ln 100 ≈ 4.6052.)",
    answerKey: 11.0,
    tolerance: 0.15,
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["aic-bic", "mle"],
    source: ESL,
    status: "live",
  },
  {
    id: "aic-bic--explain-consistency-vs-efficiency",
    conceptId: "aic-bic",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "BIC's penalty grows without bound as n increases while AIC's stays fixed at 2. Explain the asymptotic " +
      "consequence of that difference for each criterion.",
    rubric: {
      elements: [
        {
          id: "bic-consistent",
          description:
            "States that BIC's growing penalty eventually rules out any spurious extra parameter, so if the true model is among the candidates BIC selects it with probability approaching 1 — the consistency property.",
          weight: 3,
          required: true,
          misconception: {
            id: "penalty-difference-called-cosmetic",
            description:
              "Treats the differing penalties as a matter of taste, so no asymptotic consequence is identified.",
            blameConceptId: "aic-bic",
          },
        },
        {
          id: "aic-not-consistent",
          description:
            "States that AIC's fixed penalty leaves a non-vanishing chance of including useless parameters no matter how much data is available.",
          weight: 3,
          required: true,
        },
        {
          id: "aic-compensation",
          description:
            "Notes what AIC gets in exchange: asymptotically minimal prediction error among the candidates.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.72,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["aic-bic", "mle", "linear-regression-probabilistic-version"],
    source: ESL,
    status: "live",
  },
  {
    id: "aic-bic--explain-why-not-raw-likelihood",
    conceptId: "aic-bic",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Why can't models of different sizes simply be compared by their maximised likelihoods, or by R²? " +
      "Explain what AIC and BIC change about that comparison.",
    rubric: {
      elements: [
        {
          id: "monotone-fit",
          description:
            "Explains that adding parameters can only increase the maximised likelihood (and R²), so a raw fit comparison always selects the largest model regardless of whether it found signal.",
          weight: 3,
          required: true,
          misconception: {
            id: "likelihood-treated-as-comparable",
            description:
              "Assumes a higher likelihood means a better model, missing that the comparison is rigged toward complexity.",
            blameConceptId: "aic-bic",
          },
        },
        {
          id: "penalty-makes-it-a-trade",
          description:
            "States that subtracting an explicit complexity penalty forces a bigger model to fit meaningfully better, not merely better, to win.",
          weight: 3,
          required: true,
        },
        {
          id: "non-nested-advantage",
          description:
            "Notes a practical advantage over the partial F-test: AIC and BIC do not require the models to be nested.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["aic-bic", "mle", "linear-regression-probabilistic-version"],
    source: ISLR,
    status: "live",
  },
  {
    id: "aic-bic--transfer-which-criterion",
    conceptId: "aic-bic",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "One team wants the best forecasts; another wants to identify which variables genuinely matter. Both " +
      "have the same data and the same candidate models. Recommend a criterion to each and justify it from " +
      "what each criterion is derived to approximate.",
    rubric: {
      elements: [
        {
          id: "aic-for-prediction",
          description:
            "Recommends AIC for forecasting, justified by its derivation as an estimate of expected out-of-sample prediction error — approximately minimising the Kullback–Leibler divergence to the true data-generating process.",
          weight: 3,
          required: true,
          misconception: {
            id: "criteria-ranked-by-quality",
            description:
              "Argues one criterion is simply better than the other, rather than that they optimise different objectives.",
            blameConceptId: "aic-bic",
          },
        },
        {
          id: "bic-for-identification",
          description:
            "Recommends BIC for identifying the true model, justified by its derivation as an approximation to Bayesian model selection — favouring the model with the highest posterior probability.",
          weight: 3,
          required: true,
        },
        {
          id: "honest-caveat",
          description:
            "Notes that when no candidate is actually true, BIC's consistency guarantee is vacuous and AIC is the safer choice.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.22,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["aic-bic", "mle", "linear-regression-probabilistic-version"],
    source: ESL,
    status: "live",
  },
  {
    id: "aic-bic--transfer-comparison-pitfalls",
    conceptId: "aic-bic",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A colleague compares AIC across four models: two fitted to y, two fitted to log(y), and one of them " +
      "fitted on a subset of rows because a predictor had missing values. Identify what is wrong with the " +
      "comparison and what would fix it.",
    rubric: {
      elements: [
        {
          id: "different-rows",
          description:
            "Identifies that a model fitted on fewer rows has a likelihood over a different dataset, so its AIC is not comparable — the fix is to fit every candidate on the same complete rows.",
          weight: 3,
          required: true,
          misconception: {
            id: "aic-treated-as-absolute",
            description:
              "Treats the AIC value as an absolute score of a model, rather than as comparable only across models fitted to the same response on the same data.",
            blameConceptId: "aic-bic",
          },
        },
        {
          id: "transformed-response",
          description:
            "Identifies that the log-transformed models have likelihoods in different units, so comparing them requires a Jacobian correction rather than a direct AIC comparison.",
          weight: 3,
          required: true,
        },
        {
          id: "differences-only",
          description:
            "Notes that only differences in AIC are meaningful in any case, since packages include different additive constants.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.45,
    discrimination: 1.7,
    expectedSeconds: 270,
    prereqClosure: ["aic-bic", "mle", "likelihood-vs-probability"],
    source: AUTHORED,
    status: "live",
  },

  // --- Forward, Backward, Stepwise Selection --------------------------------
  {
    id: "forward-backward-stepwise-selection--recall-procedures",
    conceptId: "forward-backward-stepwise-selection",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which description of the three stepwise procedures is correct?",
    choices: [
      {
        id: "a",
        text: "Forward starts empty and adds; backward starts full and removes; stepwise allows both moves",
        correct: true,
      },
      {
        id: "b",
        text: "Forward and backward both start from the full model, differing only in stopping rule",
        correct: false,
        misconception: {
          id: "forward-starts-full",
          description:
            "Misstates forward selection's starting point. Starting empty is exactly what lets it run when p > n.",
          blameConceptId: "forward-backward-stepwise-selection",
        },
      },
      {
        id: "c",
        text: "All three evaluate every possible subset and pick the best",
        correct: false,
        misconception: {
          id: "stepwise-confused-with-best-subset",
          description:
            "Confuses greedy path search with exhaustive best-subset selection, which is a different and far more expensive method.",
          blameConceptId: "forward-backward-stepwise-selection",
        },
      },
      {
        id: "d",
        text: "Stepwise selection shrinks coefficients continuously toward zero",
        correct: false,
        misconception: {
          id: "stepwise-confused-with-shrinkage",
          description:
            "Describes a shrinkage method. Stepwise makes discrete include/exclude decisions and fits each model unpenalised.",
          blameConceptId: "forward-backward-stepwise-selection",
        },
      },
    ],
    difficulty: 0.23,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["forward-backward-stepwise-selection", "aic-bic", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--recall-limitations",
    conceptId: "forward-backward-stepwise-selection",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which are genuine limitations of stepwise selection? Select all that apply.",
    choices: [
      { id: "a", text: "Being greedy, it can miss the best subset entirely", correct: true },
      { id: "b", text: "The p-values of the final model are not valid as reported", correct: true },
      { id: "c", text: "The selected set can change substantially with a small perturbation of the data", correct: true },
      { id: "d", text: "The final model's R² is optimistically biased", correct: true },
      {
        id: "e",
        text: "It is guaranteed to find the globally optimal subset",
        correct: false,
        misconception: {
          id: "greedy-assumed-optimal",
          description:
            "States the opposite of the method's defining limitation: it searches a path of p subsets out of 2^p.",
          blameConceptId: "forward-backward-stepwise-selection",
        },
      },
      {
        id: "f",
        text: "It cannot be run when there are more than five predictors",
        correct: false,
        misconception: {
          id: "stepwise-thought-infeasible",
          description:
            "Confuses stepwise with best-subset selection. Cheapness is precisely what stepwise has going for it.",
          blameConceptId: "forward-backward-stepwise-selection",
        },
      },
    ],
    difficulty: 0.53,
    discrimination: 1.5,
    expectedSeconds: 80,
    prereqClosure: ["forward-backward-stepwise-selection", "aic-bic"],
    source: ESL,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--apply-model-count",
    conceptId: "forward-backward-stepwise-selection",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "With 30 candidate predictors, how many models would best-subset selection have to fit, counting the " +
      "intercept-only model? Give the answer as a whole number.",
    answerKey: 1073741824,
    tolerance: 0.0000001,
    difficulty: 1.03,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["forward-backward-stepwise-selection", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--apply-false-positives",
    conceptId: "forward-backward-stepwise-selection",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A stepwise search screens 50 predictors that are all pure noise, testing each at α = 0.05 " +
      "independently. How many spurious 'significant' predictors would you expect it to find on average? " +
      "Give a decimal to one place.",
    answerKey: 2.5,
    tolerance: 0.05,
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["forward-backward-stepwise-selection", "expectation"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--explain-greedy-failure",
    conceptId: "forward-backward-stepwise-selection",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Describe a concrete situation in which forward selection misses the best pair of predictors, and say " +
      "whether backward elimination would find it.",
    rubric: {
      elements: [
        {
          id: "concrete-pair",
          description:
            "Gives a specific scenario: two predictors that are nearly useless individually but strongly predictive together — for example when the response depends on their difference or their interaction.",
          weight: 3,
          required: true,
          misconception: {
            id: "greedy-failure-stated-abstractly",
            description:
              "Says greedy search 'can be suboptimal' without exhibiting a mechanism by which a good pair is never reached.",
            blameConceptId: "forward-backward-stepwise-selection",
          },
        },
        {
          id: "why-forward-fails",
          description:
            "Explains that forward selection evaluates one addition at a time, so neither variable improves the criterion enough alone and neither ever enters.",
          weight: 3,
          required: true,
        },
        {
          id: "backward-contrast",
          description:
            "Notes that backward elimination starts with both in the model and would see that removing either destroys the fit — so it finds what forward selection cannot.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.73,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["forward-backward-stepwise-selection", "multiple-linear-regression", "aic-bic"],
    source: ISLR,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--explain-invalid-inference",
    conceptId: "forward-backward-stepwise-selection",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A forward search over 50 pure-noise predictors, using AIC as the stopping criterion, still ends up " +
      "keeping two or three of them — each one lowering AIC slightly by chance. Explain why nothing went " +
      "wrong computationally, and why treating the retained coefficients' estimated sizes as trustworthy is a " +
      "mistake.",
    rubric: {
      elements: [
        {
          id: "search-used-the-data",
          description:
            "Explains that AIC was evaluated only for the handful of candidate variables the search happened to try adding, and a variable that lowered it did so partly by chance sampling variation, not necessarily by any real association.",
          weight: 4,
          required: true,
          misconception: {
            id: "post-selection-estimates-trusted",
            description:
              "Treats the final model's coefficient estimates as if the variables had been chosen before seeing the data, rather than because they looked useful in this sample.",
            blameConceptId: "forward-backward-stepwise-selection",
          },
        },
        {
          id: "selection-bias-in-estimates",
          description:
            "Notes that the retained coefficients are biased away from zero, since they entered precisely because their estimated effect was large enough to win the AIC comparison at that step.",
          weight: 3,
          required: true,
        },
        {
          id: "remedy",
          description:
            "Names a remedy — genuinely held-out validation, or post-selection inference methods that condition on the selection event.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["forward-backward-stepwise-selection", "aic-bic"],
    source: ESL,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--transfer-why-lasso-replaced-it",
    conceptId: "forward-backward-stepwise-selection",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Modern practice largely prefers penalised methods such as LASSO to stepwise selection. Explain the " +
      "structural reason, focusing on what a small perturbation of the data does to each method's output.",
    rubric: {
      elements: [
        {
          id: "discrete-vs-continuous",
          description:
            "Contrasts a sequence of discrete include/exclude decisions with a single convex optimisation in which coefficients shrink continuously toward zero.",
          weight: 4,
          required: true,
          misconception: {
            id: "lasso-preferred-for-accuracy-alone",
            description:
              "Argues only that LASSO predicts better, missing the stability argument that actually distinguishes them.",
            blameConceptId: "forward-backward-stepwise-selection",
          },
        },
        {
          id: "cascade-effect",
          description:
            "Explains that a flipped discrete decision cascades through every later step, whereas a small data change moves a continuous path only slightly.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.23,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["forward-backward-stepwise-selection", "multiple-linear-regression", "aic-bic"],
    source: ESL,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--transfer-p-greater-than-n",
    conceptId: "forward-backward-stepwise-selection",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "With 5,000 candidate predictors and 200 observations, backward elimination cannot be run at all while " +
      "forward selection can. Explain why, and say what that tells you about the regime.",
    rubric: {
      elements: [
        {
          id: "full-model-not-fittable",
          description:
            "Explains that backward elimination must fit the full model first, and with p ≫ n the design matrix cannot have full column rank, so XᵀX is singular and no unique fit exists.",
          weight: 4,
          required: true,
          misconception: {
            id: "failure-attributed-to-cost",
            description:
              "Attributes the problem to computational expense rather than to the full model being unidentifiable.",
            blameConceptId: "forward-backward-stepwise-selection",
          },
        },
        {
          id: "forward-never-needs-it",
          description:
            "Notes that forward selection only ever fits small models, so it never encounters the singularity.",
          weight: 2,
          required: true,
        },
        {
          id: "regime-implication",
          description:
            "Draws the wider conclusion: in the p ≫ n regime unpenalised least squares interpolates the data, so some form of regularisation or selection is not optional.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["forward-backward-stepwise-selection", "multiple-linear-regression", "normal-equations", "matrix-multiplication"],
    source: ESL,
    status: "live",
  },

  // --- Regularization -------------------------------------------------------
  {
    id: "regularization--recall-mechanism",
    conceptId: "regularization",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Regularization works by:",
    choices: [
      {
        id: "a",
        text: "Adding a penalty on coefficient size to the fitting objective, trading some bias for a reduction in variance",
        correct: true,
      },
      {
        id: "b",
        text: "Removing outlying observations before fitting",
        correct: false,
        misconception: {
          id: "regularization-as-data-cleaning",
          description:
            "Confuses a change to the objective function with a change to the data. Regularization touches no observations.",
          blameConceptId: "regularization",
        },
      },
      {
        id: "c",
        text: "Transforming the predictors so they become uncorrelated",
        correct: false,
        misconception: {
          id: "regularization-as-decorrelation",
          description:
            "Describes something closer to principal components. Regularization leaves the predictors alone and changes what the fit is optimising.",
          blameConceptId: "regularization",
        },
      },
      {
        id: "d",
        text: "Fitting the model on a random subsample to reduce overfitting",
        correct: false,
        misconception: {
          id: "regularization-as-resampling",
          description:
            "Describes a resampling scheme. Regularization is a deterministic change to the objective, applied to all the data.",
          blameConceptId: "regularization",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 40,
    prereqClosure: ["regularization", "bias-variance-tradeoff", "loss-functions"],
    source: ISLR,
    status: "live",
  },
  {
    id: "regularization--recall-when-useful",
    conceptId: "regularization",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In which situations is regularization most valuable? Select all that apply.",
    choices: [
      { id: "a", text: "There are more predictors than observations", correct: true },
      { id: "b", text: "The predictors are highly correlated with each other", correct: true },
      { id: "c", text: "There are many weak predictors and overfitting is a concern", correct: true },
      {
        id: "d",
        text: "There are very few predictors, all uncorrelated, with abundant data",
        correct: false,
        misconception: {
          id: "regularization-use-case-inverted",
          description:
            "Names precisely the situation where OLS is already stable, so cross-validation would select a penalty of essentially zero.",
          blameConceptId: "regularization",
        },
      },
      {
        id: "e",
        text: "The response has been measured with no error at all",
        correct: false,
        misconception: {
          id: "regularization-tied-to-measurement-error",
          description:
            "Ties the method to noise in the response. Regularization addresses estimator variance, which is driven by the design as much as by the noise.",
          blameConceptId: "regularization",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 70,
    prereqClosure: ["regularization", "bias-variance-tradeoff", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "regularization--apply-mse-comparison",
    conceptId: "regularization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "An unbiased estimator has standard deviation 15. A shrinkage estimator has bias −0.4 and standard " +
      "deviation 1.2. What is the shrinkage estimator's mean squared error? Give a decimal to two places.",
    answerKey: 1.6,
    tolerance: 0.01,
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["regularization", "bias-variance-tradeoff", "variance", "expectation"],
    source: ESL,
    status: "live",
  },
  {
    id: "regularization--apply-lambda-extremes",
    conceptId: "regularization",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "In the objective ‖y − Xβ‖² + λ·P(β), what happens at the two extremes of λ?",
    choices: [
      {
        id: "a",
        text: "λ = 0 recovers OLS exactly; as λ → ∞ every coefficient is driven toward zero and the model predicts the mean of y",
        correct: true,
      },
      {
        id: "b",
        text: "λ = 0 gives all-zero coefficients; as λ → ∞ the fit approaches OLS",
        correct: false,
        misconception: {
          id: "lambda-direction-reversed",
          description:
            "Reverses the roles. A zero penalty imposes no constraint at all, so the objective is the ordinary least-squares one.",
          blameConceptId: "regularization",
        },
      },
      {
        id: "c",
        text: "λ = 0 gives OLS; as λ → ∞ the coefficients grow without bound",
        correct: false,
        misconception: {
          id: "penalty-thought-to-grow-coefficients",
          description:
            "Gets the second extreme wrong: the penalty makes large coefficients expensive, so a large λ shrinks rather than inflates them.",
          blameConceptId: "regularization",
        },
      },
      {
        id: "d",
        text: "λ has no effect on the fitted coefficients, only on the standard errors",
        correct: false,
        misconception: {
          id: "penalty-thought-to-affect-only-inference",
          description:
            "The penalty changes the optimisation itself, so it changes the point estimates directly.",
          blameConceptId: "regularization",
        },
      },
    ],
    difficulty: 0.85,
    discrimination: 1.5,
    expectedSeconds: 60,
    prereqClosure: ["regularization", "loss-functions", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "regularization--explain-bias-variance-trade",
    conceptId: "regularization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain how regularization implements the bias-variance tradeoff explicitly, and say what the " +
      "cross-validated choice of λ is actually optimising.",
    rubric: {
      elements: [
        {
          id: "accepts-bias-for-variance",
          description:
            "States that any λ > 0 makes β̂ biased, and that the payoff is a reduction in variance.",
          weight: 3,
          required: true,
          misconception: {
            id: "regularization-described-as-free",
            description:
              "Presents the penalty as improving the fit at no cost, so no tradeoff is identified.",
            blameConceptId: "bias-variance-tradeoff",
          },
        },
        {
          id: "optimises-the-total",
          description:
            "States that cross-validation targets total expected error — bias squared plus variance — not either term alone, so the optimum is generally at neither extreme.",
          weight: 4,
          required: true,
        },
        {
          id: "gauss-markov-not-violated",
          description:
            "Notes that Gauss–Markov is not contradicted, because a biased estimator is outside the class it quantifies over.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["regularization", "bias-variance-tradeoff", "variance", "expectation"],
    source: ESL,
    status: "live",
  },
  {
    id: "regularization--explain-standardisation",
    conceptId: "regularization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Predictors must be standardised before a penalised fit, and the intercept is left unpenalised. Explain " +
      "why each of those is necessary.",
    rubric: {
      elements: [
        {
          id: "units-make-penalty-arbitrary",
          description:
            "Explains that the penalty sums coefficients across predictors, so a variable measured in metres and the same variable in millimetres would be penalised completely differently — the fit would depend on the arbitrary choice of units.",
          weight: 4,
          required: true,
          misconception: {
            id: "standardisation-treated-as-cosmetic",
            description:
              "Treats standardisation as a numerical convenience rather than as something the penalty's meaning depends on.",
            blameConceptId: "regularization",
          },
        },
        {
          id: "intercept-excluded",
          description:
            "Explains that penalising the intercept would make the fit depend on where the origin of the response happens to sit, which carries no information.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["regularization", "loss-functions", "sample-variance"],
    source: ESL,
    status: "live",
  },
  {
    id: "regularization--transfer-penalty-as-prior",
    conceptId: "regularization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A penalised fit can be described equivalently as maximum a posteriori estimation under a prior on the " +
      "coefficients. Explain the correspondence, and say what λ becomes in that language.",
    rubric: {
      elements: [
        {
          id: "log-posterior-decomposition",
          description:
            "Explains that the log posterior is the log likelihood plus the log prior, so a penalty added to the negative log likelihood is exactly a negative log prior.",
          weight: 3,
          required: true,
          misconception: {
            id: "correspondence-called-analogy",
            description:
              "Describes the two as similar in spirit rather than as the same optimisation written twice.",
            blameConceptId: "regularization",
          },
        },
        {
          id: "identifies-a-prior",
          description:
            "Identifies at least one concrete pairing — a normal prior on β giving the squared penalty, or a Laplace prior giving the absolute-value penalty.",
          weight: 3,
          required: true,
        },
        {
          id: "lambda-as-prior-strength",
          description:
            "States that λ becomes the prior's strength: a large λ is a confident prior belief that the coefficients are small.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["regularization", "bias-variance-tradeoff", "loss-functions"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "regularization--transfer-cv-leakage",
    conceptId: "regularization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An analyst standardises all the predictors on the full dataset, then runs 10-fold cross-validation to " +
      "choose λ, and reports the cross-validated error as an estimate of future performance. Identify the " +
      "flaw and state the general principle it violates.",
    rubric: {
      elements: [
        {
          id: "identifies-leakage",
          description:
            "Identifies that the standardisation used the held-out folds' data, so each fold's model saw information from the data it is being evaluated on.",
          weight: 3,
          required: true,
          misconception: {
            id: "preprocessing-treated-as-outside-the-model",
            description:
              "Treats standardisation as a neutral preparatory step rather than as part of the fitted procedure.",
            blameConceptId: "regularization",
          },
        },
        {
          id: "general-principle",
          description:
            "States the principle: every step that uses the data must sit inside the cross-validation loop, refitted per fold.",
          weight: 3,
          required: true,
        },
        {
          id: "severity",
          description:
            "Notes that the leak is small for standardisation but severe for steps like predictor screening or imputation, where it can make a useless model look excellent.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["regularization", "bias-variance-tradeoff", "ml-introduction"],
    source: ESL,
    status: "live",
  },

  // --- LASSO ----------------------------------------------------------------
  {
    id: "lasso--recall-penalty",
    conceptId: "lasso",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "LASSO's penalty term is:",
    choices: [
      { id: "a", text: "λ·Σⱼ|βⱼ| — the L1 norm of the coefficients", correct: true },
      {
        id: "b",
        text: "λ·Σⱼβⱼ² — the squared L2 norm",
        correct: false,
        misconception: {
          id: "lasso-ridge-penalties-swapped",
          description:
            "Gives ridge's penalty. The squared penalty is smooth and never produces exact zeros, which is precisely what distinguishes the two.",
          blameConceptId: "lasso",
        },
      },
      {
        id: "c",
        text: "λ·Σⱼβⱼ — the sum of the coefficients",
        correct: false,
        misconception: {
          id: "unsigned-penalty",
          description:
            "Omits the absolute value, so positive and negative coefficients would cancel and arbitrarily large ones could be free.",
          blameConceptId: "lasso",
        },
      },
      {
        id: "d",
        text: "λ times the number of nonzero coefficients",
        correct: false,
        misconception: {
          id: "l0-called-lasso",
          description:
            "Describes an L0 penalty — best-subset selection. It is not convex, which is exactly the problem LASSO's L1 relaxation solves.",
          blameConceptId: "lasso",
        },
      },
    ],
    difficulty: 0.22,
    discrimination: 1.4,
    expectedSeconds: 40,
    prereqClosure: ["lasso", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--recall-distinctive-property",
    conceptId: "lasso",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "LASSO's distinctive property, relative to ridge, is that it:",
    choices: [
      { id: "a", text: "Drives some coefficients to exactly zero, performing variable selection", correct: true },
      {
        id: "b",
        text: "Never shrinks any coefficient",
        correct: false,
        misconception: {
          id: "lasso-thought-not-to-shrink",
          description:
            "States the opposite of what a penalty does. LASSO shrinks every coefficient and takes some all the way to zero.",
          blameConceptId: "lasso",
        },
      },
      {
        id: "c",
        text: "Has a closed-form solution while ridge does not",
        correct: false,
        misconception: {
          id: "closed-forms-swapped",
          description:
            "Reverses the situation. Ridge has the closed form; LASSO's kinked penalty requires numerical optimisation.",
          blameConceptId: "lasso",
        },
      },
      {
        id: "d",
        text: "Keeps correlated predictors together with similar coefficients",
        correct: false,
        misconception: {
          id: "grouping-attributed-to-lasso",
          description:
            "Describes the grouping effect, which is ridge's behaviour and elastic net's design goal — LASSO does the opposite, picking one and zeroing the rest.",
          blameConceptId: "lasso",
        },
      },
    ],
    difficulty: 0.52,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["lasso", "regularization"],
    source: ISLR,
    status: "live",
  },
  {
    id: "lasso--apply-soft-threshold",
    conceptId: "lasso",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With orthonormal predictors, LASSO's solution is the soft-threshold " +
      "β̂ⱼ = sign(b)·max(0, |b| − λ/2), where b is the OLS coefficient. With b = 1.8 and λ = 1.0, what is " +
      "β̂ⱼ? Give a decimal to one place.",
    answerKey: 1.3,
    tolerance: 0.01,
    difficulty: 1.02,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["lasso", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--apply-soft-threshold-to-zero",
    conceptId: "lasso",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Using the same soft-threshold rule β̂ⱼ = sign(b)·max(0, |b| − λ/2), what is β̂ⱼ when the OLS " +
      "coefficient is b = −0.3 and λ = 1.0? Give a decimal to one place.",
    answerKey: 0,
    tolerance: 0.01,
    difficulty: 1.35,
    discrimination: 1.6,
    expectedSeconds: 90,
    prereqClosure: ["lasso", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--explain-diamond-geometry",
    conceptId: "lasso",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain geometrically why LASSO produces exact zeros while ridge does not, using the shape of each " +
      "method's constraint region.",
    rubric: {
      elements: [
        {
          id: "two-shapes",
          description:
            "Describes the L1 region as a diamond with corners on the coordinate axes and the L2 region as a smooth circle.",
          weight: 3,
          required: true,
          misconception: {
            id: "sparsity-asserted-without-geometry",
            description:
              "States that LASSO zeroes coefficients without any account of why the L1 shape produces that and the L2 shape does not.",
            blameConceptId: "lasso",
          },
        },
        {
          id: "contact-at-a-corner",
          description:
            "Explains that the solution is where an expanding elliptical loss contour first touches the region, and that a corner — where the boundary's normal direction changes discontinuously — is touched first for a whole range of contour orientations.",
          weight: 3,
          required: true,
        },
        {
          id: "corner-means-zero",
          description:
            "States that a corner lies on a coordinate axis, so contact there means one or more coefficients are exactly zero, while a smooth boundary makes such contact a coincidence.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.72,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["lasso", "regularization", "multiple-linear-regression"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--explain-sparse-high-dimensional",
    conceptId: "lasso",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why LASSO is particularly well suited to a problem with far more predictors than observations " +
      "where only a handful are genuinely relevant — and name the assumption that makes it so.",
    rubric: {
      elements: [
        {
          id: "names-sparsity-assumption",
          description:
            "Identifies the sparsity assumption: the true coefficient vector has few nonzero entries.",
          weight: 3,
          required: true,
          misconception: {
            id: "lasso-treated-as-universally-better",
            description:
              "Recommends LASSO without naming the assumption about the true signal that its advantage depends on.",
            blameConceptId: "lasso",
          },
        },
        {
          id: "discards-irrelevant-dimensions",
          description:
            "Explains that in high dimensions unpenalised least squares fits noise in the irrelevant coordinates, and LASSO's exact zeros discard them automatically rather than through a separate screening step.",
          weight: 3,
          required: true,
        },
        {
          id: "when-it-fails",
          description:
            "Notes the flip side: if the truth is dense — many small effects — the sparsity assumption is wrong and ridge is the better choice.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["lasso", "regularization", "bias-variance-tradeoff"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--transfer-correlated-group-instability",
    conceptId: "lasso",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A study reports that LASSO identified three specific genes out of 5,000 as predictive. It later emerges " +
      "that those three sit in a pathway of forty genes correlated at about 0.9. Explain what the result " +
      "probably means, and what it does not.",
    rubric: {
      elements: [
        {
          id: "arbitrary-selection",
          description:
            "Explains that among strongly correlated predictors LASSO retains roughly one and zeroes the rest, so which of the forty survives is close to arbitrary and can change with a different sample.",
          weight: 4,
          required: true,
          misconception: {
            id: "selected-set-read-as-the-truth",
            description:
              "Reads the selected variables as the uniquely predictive ones, rather than as representatives of a correlated group.",
            blameConceptId: "lasso",
          },
        },
        {
          id: "what-it-does-support",
          description:
            "States what the result does support: the pathway carries signal, and predictions from those three are probably as good as from any three of the forty.",
          weight: 3,
          required: true,
        },
        {
          id: "remedy",
          description:
            "Names elastic net, or a stability-selection procedure over resamples, as the way to get a defensible group-level answer.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.22,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["lasso", "regularization", "multiple-linear-regression"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--transfer-one-se-rule",
    conceptId: "lasso",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Cross-validation puts the minimum error at λ = 0.03 with 42 nonzero coefficients, while λ = 0.11 sits " +
      "one standard error higher with 9. Explain the reasoning behind choosing the larger λ, and say when you " +
      "would not.",
    rubric: {
      elements: [
        {
          id: "cv-curve-is-noisy",
          description:
            "Explains that the cross-validated error is itself estimated with uncertainty, so a difference within one standard error is not evidence of a genuine difference in accuracy.",
          weight: 3,
          required: true,
          misconception: {
            id: "cv-minimum-treated-as-exact",
            description:
              "Treats the minimum of the cross-validation curve as a precise optimum, so a simpler model within its noise band looks strictly worse.",
            blameConceptId: "lasso",
          },
        },
        {
          id: "simplicity-for-free",
          description:
            "States that the larger λ buys a much simpler, more stable model at no reliable cost in accuracy.",
          weight: 3,
          required: true,
        },
        {
          id: "when-not-to",
          description:
            "Identifies when to take the minimum instead: when raw predictive accuracy is the deliverable and interpretability is not.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["lasso", "regularization", "bias-variance-tradeoff"],
    source: ESL,
    status: "live",
  },

  // --- Ridge Regression -----------------------------------------------------
  {
    id: "ridge-regression--recall-penalty",
    conceptId: "ridge-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Ridge regression's estimator is:",
    choices: [
      { id: "a", text: "β̂ = (XᵀX + λI)⁻¹Xᵀy, minimising ‖y − Xβ‖² + λΣβⱼ²", correct: true },
      {
        id: "b",
        text: "β̂ = (XᵀX)⁻¹Xᵀy + λI",
        correct: false,
        misconception: {
          id: "lambda-added-after-solving",
          description:
            "Adds the penalty to the solution rather than to the matrix being inverted, which would not change the optimisation at all.",
          blameConceptId: "ridge-regression",
        },
      },
      {
        id: "c",
        text: "β̂ = (XᵀX − λI)⁻¹Xᵀy",
        correct: false,
        misconception: {
          id: "sign-on-ridge-term",
          description:
            "Subtracts λI, which shifts eigenvalues downward and can create rather than remove a singularity.",
          blameConceptId: "ridge-regression",
        },
      },
      {
        id: "d",
        text: "β̂ = (XᵀX + λI)⁻¹Xᵀy, minimising ‖y − Xβ‖² + λΣ|βⱼ|",
        correct: false,
        misconception: {
          id: "closed-form-paired-with-l1",
          description:
            "Pairs the closed form with the L1 penalty. The closed form exists precisely because the squared penalty is differentiable.",
          blameConceptId: "ridge-regression",
        },
      },
    ],
    difficulty: 0.22,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["ridge-regression", "regularization", "normal-equations"],
    source: ESL,
    status: "live",
  },
  {
    id: "ridge-regression--recall-vs-lasso",
    conceptId: "ridge-regression",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements distinguish ridge from LASSO? Select all that apply.",
    choices: [
      { id: "a", text: "Ridge shrinks all coefficients smoothly and generally sets none to exactly zero", correct: true },
      { id: "b", text: "Ridge has a closed-form solution", correct: true },
      { id: "c", text: "Ridge tends to shrink correlated predictors together rather than picking one", correct: true },
      {
        id: "d",
        text: "Ridge performs automatic variable selection",
        correct: false,
        misconception: {
          id: "selection-attributed-to-ridge",
          description:
            "Attributes LASSO's defining property to ridge. The smooth penalty approaches zero without arriving.",
          blameConceptId: "ridge-regression",
        },
      },
      {
        id: "e",
        text: "Ridge is unbiased while LASSO is biased",
        correct: false,
        misconception: {
          id: "ridge-thought-unbiased",
          description:
            "Both are biased for any positive penalty — that is what buys the variance reduction in each case.",
          blameConceptId: "ridge-regression",
        },
      },
    ],
    difficulty: 0.52,
    discrimination: 1.5,
    expectedSeconds: 70,
    prereqClosure: ["ridge-regression", "regularization"],
    source: ISLR,
    status: "live",
  },
  {
    id: "ridge-regression--apply-eigenvalue-shift",
    conceptId: "ridge-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A design matrix has XᵀX = [[5, 10], [10, 20]], which is singular. What is the determinant of " +
      "XᵀX + 0.1·I? Give a decimal to two places.",
    answerKey: 2.51,
    tolerance: 0.01,
    difficulty: 1.02,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["ridge-regression", "regularization", "matrix-multiplication", "normal-equations"],
    source: OCW_18_06,
    status: "live",
  },
  {
    id: "ridge-regression--apply-shrinkage-factor",
    conceptId: "ridge-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Ridge scales the j-th principal direction of the fit by dⱼ²/(dⱼ² + λ), where dⱼ is a singular value of " +
      "X. With dⱼ = 3 and λ = 9, what is the shrinkage factor? Give a decimal to two places.",
    answerKey: 0.5,
    tolerance: 0.005,
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 90,
    prereqClosure: ["ridge-regression", "regularization", "matrix-multiplication"],
    source: ESL,
    status: "live",
  },
  {
    id: "ridge-regression--explain-invertibility",
    conceptId: "ridge-regression",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Explain why XᵀX + λI is invertible for every λ > 0, even when XᵀX is singular. Argue from the " +
      "eigenvalues rather than by computing a determinant.",
    rubric: {
      elements: [
        {
          id: "psd-property",
          description:
            "States that XᵀX is symmetric positive semi-definite, so all its eigenvalues are real and non-negative, and it is singular exactly when one of them is zero.",
          weight: 3,
          required: true,
          misconception: {
            id: "invertibility-asserted",
            description:
              "Claims the shifted matrix is invertible without an argument about where its eigenvalues sit.",
            blameConceptId: "ridge-regression",
          },
        },
        {
          id: "shift-argument",
          description:
            "States that adding λI shifts every eigenvalue up by exactly λ while leaving the eigenvectors unchanged, so all eigenvalues become at least λ > 0.",
          weight: 3,
          required: true,
        },
        {
          id: "concludes-positive-definite",
          description:
            "Concludes the shifted matrix is strictly positive definite, hence invertible, regardless of the original rank of X.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.72,
    discrimination: 1.7,
    expectedSeconds: 270,
    prereqClosure: ["ridge-regression", "regularization", "matrix-multiplication", "normal-equations"],
    source: OCW_18_06,
    status: "live",
  },
  {
    id: "ridge-regression--explain-targeted-shrinkage",
    conceptId: "ridge-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Ridge does not shrink every direction of the fit equally. Explain which directions it shrinks hardest " +
      "and why that is the right behaviour.",
    rubric: {
      elements: [
        {
          id: "shrinkage-depends-on-singular-value",
          description:
            "States that the shrinkage factor dⱼ²/(dⱼ² + λ) is near 1 for large singular values and near 0 for small ones.",
          weight: 3,
          required: true,
          misconception: {
            id: "uniform-shrinkage-assumed",
            description:
              "Treats the penalty as shrinking all directions by a common factor, missing that it is targeted by how well each direction is determined.",
            blameConceptId: "ridge-regression",
          },
        },
        {
          id: "why-it-is-right",
          description:
            "Explains that small singular values correspond to directions in which the predictors barely vary — the collinear directions where OLS's variance explodes — so suppressing exactly those removes variance where the data is least informative.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["ridge-regression", "regularization", "variance", "matrix-multiplication"],
    source: ESL,
    status: "live",
  },
  {
    id: "ridge-regression--transfer-when-preferred",
    conceptId: "ridge-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Twenty questionnaire items all measure roughly the same construct and all plausibly matter. Argue for " +
      "ridge over LASSO here, and name the cost of the choice.",
    rubric: {
      elements: [
        {
          id: "grouping-argument",
          description:
            "Argues that ridge shrinks the correlated items together with similar coefficients, while LASSO would keep roughly one and zero the rest — an unstable and misleading answer when all of them matter.",
          weight: 4,
          required: true,
          misconception: {
            id: "sparsity-assumed-desirable",
            description:
              "Prefers LASSO for producing a shorter model, without checking whether the sparsity assumption fits the problem.",
            blameConceptId: "ridge-regression",
          },
        },
        {
          id: "names-the-cost",
          description:
            "Names the cost honestly: ridge returns all twenty coefficients, so it does not simplify the model or hand back a short list.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.22,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["ridge-regression", "regularization", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "ridge-regression--transfer-effective-df",
    conceptId: "ridge-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Ridge estimates all p coefficients, yet it is routinely described as using 'fewer effective parameters' " +
      "than OLS. Give that phrase a precise meaning, and say what it is used for.",
    rubric: {
      elements: [
        {
          id: "trace-of-smoother",
          description:
            "Defines the effective degrees of freedom as the trace of the ridge smoother, equal to Σⱼ dⱼ²/(dⱼ² + λ), which equals p at λ = 0 and falls continuously toward 0 as λ grows.",
          weight: 4,
          required: true,
          misconception: {
            id: "effective-df-treated-as-a-count",
            description:
              "Reads 'fewer parameters' as ridge dropping variables, when every coefficient remains nonzero and the count is a continuous quantity.",
            blameConceptId: "ridge-regression",
          },
        },
        {
          id: "why-it-matters",
          description:
            "Explains its use: it supplies the complexity term that AIC-style comparisons and degrees-of-freedom accounting need, so a penalised fit can be compared with an unpenalised one.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.45,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["ridge-regression", "regularization", "matrix-multiplication", "normal-equations"],
    source: ESL,
    status: "live",
  },

  // --- Elastic Net ----------------------------------------------------------
  {
    id: "elastic-net--recall-penalty",
    conceptId: "elastic-net",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Elastic net's penalty is:",
    choices: [
      {
        id: "a",
        text: "λ[α·Σ|βⱼ| + (1 − α)·Σβⱼ²], with α = 1 giving pure LASSO and α = 0 pure ridge",
        correct: true,
      },
      {
        id: "b",
        text: "λ·Σ|βⱼ|·Σβⱼ² — the product of the two penalties",
        correct: false,
        misconception: {
          id: "penalties-multiplied",
          description:
            "Multiplies the two penalties, which destroys convexity and has neither method as a special case.",
          blameConceptId: "elastic-net",
        },
      },
      {
        id: "c",
        text: "Whichever of the L1 or L2 penalty is smaller at the current β",
        correct: false,
        misconception: {
          id: "penalty-selected-not-blended",
          description:
            "Switches between penalties instead of blending them, producing a non-smooth objective with no grouping effect.",
          blameConceptId: "elastic-net",
        },
      },
      {
        id: "d",
        text: "λ·Σ|βⱼ|, with α controlling how many coefficients may be nonzero",
        correct: false,
        misconception: {
          id: "alpha-read-as-a-count",
          description:
            "Reads α as a cap on the number of selected variables. It is the weight on the L1 part of a blended penalty.",
          blameConceptId: "elastic-net",
        },
      },
    ],
    difficulty: 0.25,
    discrimination: 1.4,
    expectedSeconds: 50,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--recall-design-goal",
    conceptId: "elastic-net",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Elastic net is designed to combine:",
    choices: [
      {
        id: "a",
        text: "LASSO's ability to produce exact zeros with ridge's stability across correlated predictors",
        correct: true,
      },
      {
        id: "b",
        text: "Neither method's properties — it is a distinct approach unrelated to both",
        correct: false,
        misconception: {
          id: "hybrid-purpose-missed",
          description:
            "Misses the entire design goal. The method exists precisely to inherit one property from each parent.",
          blameConceptId: "elastic-net",
        },
      },
      {
        id: "c",
        text: "Ridge's closed-form solution with LASSO's speed",
        correct: false,
        misconception: {
          id: "closed-form-claimed",
          description:
            "Any positive L1 weight makes the objective non-differentiable at zero, so no closed form survives the blend.",
          blameConceptId: "elastic-net",
        },
      },
      {
        id: "d",
        text: "Two different loss functions on the residuals",
        correct: false,
        misconception: {
          id: "blend-applied-to-loss",
          description:
            "Blends the wrong component. The squared-error loss is unchanged; it is the penalty that is a mixture.",
          blameConceptId: "elastic-net",
        },
      },
    ],
    difficulty: 0.55,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--apply-penalty-value",
    conceptId: "elastic-net",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With λ = 2, α = 0.5 and coefficients β = (3, −4), evaluate the elastic-net penalty " +
      "λ[α·Σ|βⱼ| + (1 − α)·Σβⱼ²]. Give a whole number.",
    answerKey: 32,
    tolerance: 0.01,
    difficulty: 1.05,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--apply-splitting-is-cheaper",
    conceptId: "elastic-net",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Two identical predictors must together carry a total coefficient of 2. Under a pure ridge penalty Σβⱼ², " +
      "what is the penalty value for the concentrated split (2, 0) minus the penalty for the even split " +
      "(1, 1)? Give a whole number.",
    answerKey: 2,
    tolerance: 0.01,
    difficulty: 1.5,
    discrimination: 1.7,
    expectedSeconds: 150,
    prereqClosure: ["elastic-net", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--explain-grouping-effect",
    conceptId: "elastic-net",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain the mechanism behind elastic net's grouping effect — why adding a squared term to the penalty " +
      "stops the arbitrary choice among correlated predictors that pure LASSO makes.",
    rubric: {
      elements: [
        {
          id: "l1-is-flat-along-the-split",
          description:
            "Explains that with two identical predictors, any way of splitting a total coefficient carries the same L1 penalty, so the objective is flat along that direction and the solver's choice is arbitrary.",
          weight: 4,
          required: true,
          misconception: {
            id: "grouping-asserted-without-mechanism",
            description:
              "States that elastic net keeps correlated predictors together without identifying the flat direction that the squared term removes.",
            blameConceptId: "elastic-net",
          },
        },
        {
          id: "l2-breaks-the-tie",
          description:
            "Explains that a squared penalty is strictly convex and strictly prefers an even split — 1² + 1² is less than 2² + 0² — so splitting between correlated predictors becomes cheaper than concentrating.",
          weight: 3,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Notes the consequence: correlated predictors enter and leave the model as a block, and the selected set is stable across resamples.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--explain-tuning-cost",
    conceptId: "elastic-net",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Elastic net costs more to tune properly than either LASSO or ridge. Explain why, and describe how the " +
      "tuning is done in practice.",
    rubric: {
      elements: [
        {
          id: "two-hyperparameters",
          description:
            "Identifies that α must be tuned alongside λ, so cross-validation searches a two-dimensional grid rather than a one-dimensional path.",
          weight: 3,
          required: true,
          misconception: {
            id: "extra-flexibility-treated-as-free",
            description:
              "Presents the added flexibility as costless, missing the concrete tuning expense it introduces.",
            blameConceptId: "elastic-net",
          },
        },
        {
          id: "practical-procedure",
          description:
            "Describes the standard approach: fix a small set of α values, compute the full λ path for each with warm starts, and use identical folds across the whole grid so the comparison is not contaminated by fold variation.",
          weight: 3,
          required: true,
        },
        {
          id: "grid-contains-extremes",
          description:
            "Notes that including α = 0 and α = 1 in the grid means nothing is lost relative to ridge or LASSO alone.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--transfer-selection-ceiling",
    conceptId: "elastic-net",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A problem has 5,000 predictors, 100 observations, and roughly 300 genuinely relevant predictors. " +
      "Explain why LASSO cannot succeed here no matter how λ is tuned, and what elastic net changes.",
    rubric: {
      elements: [
        {
          id: "n-ceiling",
          description:
            "States that LASSO can select at most n nonzero coefficients — a structural limit of its solution path, not a tuning artefact — so at most 100 of the 300 relevant predictors can ever be retained.",
          weight: 4,
          required: true,
          misconception: {
            id: "ceiling-treated-as-tuning-issue",
            description:
              "Assumes a smaller λ would recover more variables, missing that the ceiling is imposed by the geometry rather than by the penalty's strength.",
            blameConceptId: "elastic-net",
          },
        },
        {
          id: "elastic-net-lifts-it",
          description:
            "Explains that the ridge component keeps the problem strictly convex, removing the ceiling so more than n predictors can be retained.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--transfer-penalty-shapes",
    conceptId: "elastic-net",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "State the general lesson elastic net teaches about penalty design, and give one example of another " +
      "penalty shape chosen to induce a particular kind of structure.",
    rubric: {
      elements: [
        {
          id: "shape-determines-structure",
          description:
            "States the principle: the geometry of the penalty determines what kind of solution you get — corners give sparsity, smooth boundaries give proportional shrinkage — and shapes can be combined deliberately.",
          weight: 4,
          required: true,
          misconception: {
            id: "lesson-limited-to-elastic-net",
            description:
              "Treats the blend as a one-off fix for LASSO's weakness rather than an instance of a general design principle.",
            blameConceptId: "elastic-net",
          },
        },
        {
          id: "another-example",
          description:
            "Gives a further example — group LASSO zeroing whole blocks, or a fused penalty on differences between adjacent coefficients to enforce smoothness along an ordering.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.45,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },

  // --- LOESS Smoothing ------------------------------------------------------
  {
    id: "loess-smoothing--recall-procedure",
    conceptId: "loess-smoothing",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "LOESS produces its fitted curve by:",
    choices: [
      {
        id: "a",
        text: "Running a separate distance-weighted regression at each target point, using only nearby data, and keeping one fitted value from each",
        correct: true,
      },
      {
        id: "b",
        text: "Fitting one high-degree polynomial to the whole dataset",
        correct: false,
        misconception: {
          id: "loess-as-global-polynomial",
          description:
            "Describes global polynomial regression. LOESS never commits to a single global form, which is what makes it nonparametric.",
          blameConceptId: "loess-smoothing",
        },
      },
      {
        id: "c",
        text: "Averaging the response within fixed, non-overlapping bins of the predictor",
        correct: false,
        misconception: {
          id: "loess-as-binning",
          description:
            "Describes a step-function smoother. LOESS uses overlapping distance-weighted neighbourhoods and fits a line in each, which is what keeps the curve smooth.",
          blameConceptId: "loess-smoothing",
        },
      },
      {
        id: "d",
        text: "Adding a penalty on the second derivative of the fitted function",
        correct: false,
        misconception: {
          id: "loess-confused-with-splines",
          description:
            "Describes a smoothing spline, which is a penalised global fit rather than a collection of local ones.",
          blameConceptId: "loess-smoothing",
        },
      },
    ],
    difficulty: 0.02,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "loess-smoothing--recall-nonparametric-meaning",
    conceptId: "loess-smoothing",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "LOESS is called nonparametric because:",
    choices: [
      {
        id: "a",
        text: "It assumes no single global functional form — the curve's shape adapts locally to the data",
        correct: true,
      },
      {
        id: "b",
        text: "It has no parameters of any kind",
        correct: false,
        misconception: {
          id: "nonparametric-read-as-parameterless",
          description:
            "Takes the term literally. Every local fit estimates an intercept and a slope, and the span is a tuning parameter.",
          blameConceptId: "loess-smoothing",
        },
      },
      {
        id: "c",
        text: "It makes no assumptions whatsoever about the data",
        correct: false,
        misconception: {
          id: "nonparametric-read-as-assumption-free",
          description:
            "Overstates it. LOESS still assumes the relationship is locally smooth, and that nearby points are informative about each other.",
          blameConceptId: "loess-smoothing",
        },
      },
      {
        id: "d",
        text: "It cannot be used for prediction",
        correct: false,
        misconception: {
          id: "nonparametric-read-as-descriptive-only",
          description:
            "LOESS predicts within the observed range perfectly well; what it lacks is interpretable coefficients and a basis for extrapolation.",
          blameConceptId: "loess-smoothing",
        },
      },
    ],
    difficulty: 0.32,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "loess-smoothing--apply-neighbourhood-size",
    conceptId: "loess-smoothing",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A LOESS fit on 240 observations uses a span of 0.35. How many observations enter each local " +
      "regression? Give a whole number.",
    answerKey: 84,
    tolerance: 0.5,
    difficulty: 0.82,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "loess-smoothing--apply-tricube-weight",
    conceptId: "loess-smoothing",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "The tricube weight is w(u) = (1 − |u|³)³ for |u| < 1, where u is the scaled distance to the target " +
      "point. What weight does a point at u = 0.5 receive? Give a decimal to four places.",
    answerKey: 0.6699,
    tolerance: 0.001,
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "loess-smoothing--explain-span-tradeoff",
    conceptId: "loess-smoothing",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain what the span controls in a LOESS fit and how changing it moves the fit along the bias-variance " +
      "spectrum. Give the appearance of the curve at each extreme.",
    rubric: {
      elements: [
        {
          id: "what-span-controls",
          description:
            "States that the span sets the fraction of the data entering each local regression, and hence how far 'nearby' extends.",
          weight: 2,
          required: true,
        },
        {
          id: "both-extremes",
          description:
            "Describes both ends: a small span gives a wiggly, low-bias/high-variance curve that chases individual points, while a large span gives a smooth, high-bias/low-variance curve that can flatten real features.",
          weight: 4,
          required: true,
          misconception: {
            id: "span-treated-as-cosmetic",
            description:
              "Describes the span as controlling how the curve looks without connecting it to a bias-variance trade.",
            blameConceptId: "loess-smoothing",
          },
        },
        {
          id: "chosen-how",
          description:
            "Notes it is chosen by cross-validation or by eye, and that no setting escapes the tradeoff.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.52,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["loess-smoothing", "simple-linear-regression", "variance"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "loess-smoothing--explain-captures-nonlinearity",
    conceptId: "loess-smoothing",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Yield rises with fertiliser up to a point and then falls from over-application. Explain what a single " +
      "global straight line reports about this relationship, and what LOESS reveals that it cannot.",
    rubric: {
      elements: [
        {
          id: "line-averages-the-segments",
          description:
            "Explains that the line averages the rising and falling portions into one modest slope, and that its residual plot would show a characteristic arch.",
          weight: 3,
          required: true,
          misconception: {
            id: "line-called-simply-wrong",
            description:
              "Says the line 'does not fit' without describing what it actually reports — a single averaged slope that can look weak or insignificant.",
            blameConceptId: "loess-smoothing",
          },
        },
        {
          id: "loess-traces-the-shape",
          description:
            "Explains that fitting different local slopes at different fertiliser levels lets the curve bend, so the hump and its optimum are readable directly without specifying the nonlinear form in advance.",
          weight: 3,
          required: true,
        },
        {
          id: "workflow",
          description:
            "Notes the usual workflow: use LOESS to discover the shape, then a parametric term such as a quadratic to quantify it.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "loess-smoothing--transfer-visualisation-not-inference",
    conceptId: "loess-smoothing",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "LOESS is used constantly for visualisation and rarely for reporting an effect. Explain the two " +
      "properties of the method that account for that split.",
    rubric: {
      elements: [
        {
          id: "no-coefficients",
          description:
            "States that there is no fixed set of coefficients to report or interpret — the output is a curve, so there is nothing analogous to 'the effect of X is β with this interval'.",
          weight: 3,
          required: true,
          misconception: {
            id: "loess-called-simply-worse",
            description:
              "Dismisses LOESS as less rigorous without identifying what specifically it fails to provide.",
            blameConceptId: "loess-smoothing",
          },
        },
        {
          id: "weaker-inference",
          description:
            "States that its confidence bands rest on approximations and its degrees of freedom are effective rather than exact, so the inferential guarantees are weaker than a parametric model's.",
          weight: 3,
          required: true,
        },
        {
          id: "what-it-is-good-at",
          description:
            "Notes the corresponding strength: revealing the shape of a relationship, including on residual plots where unmodelled curvature is exactly what you are hunting for.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.02,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: ESL,
    status: "live",
  },
  {
    id: "loess-smoothing--transfer-dimensionality-and-boundaries",
    conceptId: "loess-smoothing",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "LOESS works beautifully with one predictor and degrades badly with eight. Explain why, and name a " +
      "second situation where the fit is least reliable even in one dimension.",
    rubric: {
      elements: [
        {
          id: "curse-of-dimensionality",
          description:
            "Explains that in high dimensions any neighbourhood containing a reasonable fraction of the data spans nearly the whole predictor range, so 'local' stops meaning local and the method loses its advantage.",
          weight: 4,
          required: true,
          misconception: {
            id: "degradation-blamed-on-computation",
            description:
              "Attributes the failure to computational cost rather than to neighbourhoods becoming empty or unrepresentative.",
            blameConceptId: "loess-smoothing",
          },
        },
        {
          id: "boundary-effects",
          description:
            "Names the boundaries of the observed range, where neighbourhoods are one-sided and the local fit is extrapolating within its own window — which is why local linear fits are preferred to local constant ones.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: ESL,
    status: "live",
  },

  // =========================================================================
  // Second authoring pass — doubling the pool for every concept above,
  // widening the difficulty spread and adding genuine recall/explain/transfer
  // items where the original 8-item pools leaned toward apply.
  // =========================================================================

  // --- AIC, BIC (additional items) ------------------------------------------
  {
    id: "aic-bic--recall-bic-penalty-growth",
    conceptId: "aic-bic",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "As sample size n grows with model size k fixed, BIC's penalty k·ln(n):",
    choices: [
      { id: "a", text: "Grows without bound", correct: true },
      {
        id: "b",
        text: "Stays fixed at 2k",
        correct: false,
        misconception: {
          id: "bic-penalty-confused-with-aic",
          description: "Describes AIC's fixed penalty rather than BIC's growing one.",
          blameConceptId: "aic-bic",
        },
      },
      {
        id: "c",
        text: "Shrinks toward 0",
        correct: false,
        misconception: {
          id: "bic-penalty-shrinks",
          description: "Reverses the direction; ln(n) increases without bound as n grows.",
          blameConceptId: "aic-bic",
        },
      },
      {
        id: "d",
        text: "Equals AIC's penalty once n > 30",
        correct: false,
        misconception: {
          id: "penalties-converge-at-30",
          description: "Invents a crossover point; ln(n) keeps growing past 2 for every n beyond about 7, with no point where the two penalties become equal again.",
          blameConceptId: "aic-bic",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["aic-bic", "mle"],
    source: ESL,
    status: "live",
  },
  {
    id: "aic-bic--recall-formulas-written-out",
    conceptId: "aic-bic",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Write AIC and BIC in symbols, and state which one always penalises complexity at least as much " +
      "once n ≥ 8.",
    rubric: {
      elements: [
        {
          id: "formulas",
          description: "Gives AIC = 2k − 2ln L̂ and BIC = k·ln(n) − 2ln L̂.",
          weight: 3,
          required: true,
        },
        {
          id: "crossover",
          description: "Notes ln(n) ≥ 2 once n ≥ e² ≈ 7.4, so from n = 8 onward BIC's penalty coefficient is at least as large as AIC's fixed 2.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.3,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["aic-bic", "mle"],
    source: ESL,
    status: "live",
  },
  {
    id: "aic-bic--apply-compute-aic",
    conceptId: "aic-bic",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "With n = 50, k = 4, and −2ln L̂ = 180, compute AIC. Give a whole number.",
    answerKey: 188,
    tolerance: 0.01,
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["aic-bic", "mle"],
    source: ESL,
    status: "live",
  },
  {
    id: "aic-bic--apply-compute-bic",
    conceptId: "aic-bic",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With n = 50, k = 4, and −2ln L̂ = 180, compute BIC. Give a decimal to one place. (ln 50 ≈ 3.9120.)",
    answerKey: 195.6,
    tolerance: 0.2,
    difficulty: 1.7,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["aic-bic", "mle"],
    source: ESL,
    status: "live",
  },
  {
    id: "aic-bic--explain-equal-k-comparison",
    conceptId: "aic-bic",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Two models have the same k, fit by maximum likelihood on the same n, with model A's −2ln L̂ " +
      "smaller than model B's. Which has the smaller AIC and BIC, and why is the comparison unambiguous " +
      "here?",
    rubric: {
      elements: [
        {
          id: "identical-penalties",
          description: "Notes that since k and n are equal for both models, the penalty terms are identical between A and B on both criteria.",
          weight: 3,
          required: true,
        },
        {
          id: "deviance-decides",
          description: "Concludes the model with the smaller deviance (−2ln L̂), model A, wins on both AIC and BIC — the criteria only need to trade off fit against complexity when k differs.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["aic-bic", "mle"],
    source: ESL,
    status: "live",
  },
  {
    id: "aic-bic--explain-bic-breaks-down-when-k-grows-with-n",
    conceptId: "aic-bic",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why BIC's approximation to the Bayesian marginal likelihood becomes questionable when the " +
      "number of parameters k grows proportionally with n (e.g. k ≈ n/2), rather than staying fixed.",
    rubric: {
      elements: [
        {
          id: "laplace-approximation-assumption",
          description: "Explains that BIC's derivation relies on a Laplace approximation assuming the posterior concentrates sharply around the MLE as n → ∞ with k fixed.",
          weight: 3,
          required: true,
          misconception: {
            id: "bic-applied-uncritically-as-k-grows",
            description: "Applies BIC's k·ln(n) penalty without checking whether the asymptotic regime (n → ∞, k fixed) the derivation assumes actually holds.",
            blameConceptId: "aic-bic",
          },
        },
        {
          id: "regime-violated",
          description: "Concludes that when k grows with n this asymptotic argument no longer applies, so BIC's justification — and hence its penalty — is not guaranteed to rank models correctly in that regime.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["aic-bic", "mle"],
    source: ESL,
    status: "live",
  },
  {
    id: "aic-bic--transfer-different-software-constants",
    conceptId: "aic-bic",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A forecaster compares ARIMA models of different orders using AIC computed by two different " +
      "packages, which use differing additive constants in their log-likelihoods. Explain why the raw " +
      "AIC values are not comparable across packages, but a within-package comparison still is.",
    rubric: {
      elements: [
        {
          id: "constants-cancel-within-not-across",
          description: "Explains that additive constants not depending on k cancel in differences of AIC computed under one consistent likelihood convention, but do not cancel across packages using different conventions.",
          weight: 3,
          required: true,
          misconception: {
            id: "aic-treated-as-absolute",
            description: "Treats the AIC value as an absolute score of a model, rather than as comparable only across models fitted with the same likelihood convention.",
            blameConceptId: "aic-bic",
          },
        },
        {
          id: "fix",
          description: "States the fix: only compare models fitted with the same software/likelihood convention, or explicitly recompute the constant.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["aic-bic", "mle", "likelihood-vs-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "aic-bic--transfer-selection-uncertainty",
    conceptId: "aic-bic",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A grid search compares hundreds of candidate models by AIC and selects the single minimum. Explain " +
      "why 'AIC selected model X' is a weaker claim than it sounds, referencing the model-selection " +
      "uncertainty this ignores.",
    rubric: {
      elements: [
        {
          id: "aic-itself-an-estimate",
          description: "Explains that each AIC value is itself computed from one sample and carries sampling variability, so close competitors (e.g. ΔAIC < 2) are not decisively ranked.",
          weight: 3,
          required: true,
          misconception: {
            id: "argmin-treated-as-certain",
            description: "Treats the model with the minimum AIC as certainly the best, rather than as an estimate that could rank differently in a fresh sample.",
            blameConceptId: "aic-bic",
          },
        },
        {
          id: "remedy",
          description: "Recommends AIC weights, or bootstrapping the whole selection procedure, to quantify how stable the 'winner' actually is.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.7,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["aic-bic", "mle"],
    source: ESL,
    status: "live",
  },

  // --- Forward, Backward, Stepwise Selection (additional items) -------------
  {
    id: "forward-backward-stepwise-selection--recall-runs-when-p-greater-than-n",
    conceptId: "forward-backward-stepwise-selection",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which stepwise procedure can be run even when p > n?",
    choices: [
      { id: "a", text: "Forward selection", correct: true },
      {
        id: "b",
        text: "Backward elimination",
        correct: false,
        misconception: {
          id: "backward-runs-when-p-greater-n",
          description: "Backward elimination must fit the full model first, which is unidentifiable when p > n.",
          blameConceptId: "forward-backward-stepwise-selection",
        },
      },
      {
        id: "c",
        text: "Best subset selection",
        correct: false,
        misconception: {
          id: "best-subset-runs-when-p-greater-n",
          description: "Best subset selection also needs to fit models with more predictors than observations at some point in its search, and is separately infeasible on cost grounds.",
          blameConceptId: "forward-backward-stepwise-selection",
        },
      },
      {
        id: "d",
        text: "None of them",
        correct: false,
        misconception: {
          id: "forward-selection-overlooked",
          description: "Overlooks that forward selection never needs to fit a model with more predictors than observations.",
          blameConceptId: "forward-backward-stepwise-selection",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["forward-backward-stepwise-selection", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--recall-how-a-variable-is-chosen",
    conceptId: "forward-backward-stepwise-selection",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "At each step of forward selection, how is the next variable to add chosen?",
    rubric: {
      elements: [
        {
          id: "greedy-choice",
          description: "States that among the variables not yet in the model, the one whose addition most improves the fit criterion (largest drop in RSS, AIC, etc.) is added, one at a time.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.2,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["forward-backward-stepwise-selection", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--apply-path-length",
    conceptId: "forward-backward-stepwise-selection",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "With 10 candidate predictors, forward selection builds a path of models by adding one variable at " +
      "a time. How many models are on the resulting path, including the null model and the full model?",
    answerKey: 11,
    tolerance: 0.1,
    difficulty: -0.2,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["forward-backward-stepwise-selection", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--apply-total-model-fits",
    conceptId: "forward-backward-stepwise-selection",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With 10 candidate predictors, forward selection compares p candidates at step 1, p − 1 at step 2, " +
      "and so on. How many models does it fit in total across the whole search?",
    answerKey: 55,
    tolerance: 0.1,
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["forward-backward-stepwise-selection", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--explain-backward-needs-n-greater-than-p",
    conceptId: "forward-backward-stepwise-selection",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Backward elimination requires fitting the full model with all p predictors before removing any. " +
      "State the one structural requirement this places on the data, in terms of n and p.",
    rubric: {
      elements: [
        {
          id: "n-greater-than-p",
          description: "States that n must exceed p (at least n ≥ p + 1) so the full design matrix has full column rank and a unique least-squares fit exists.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["forward-backward-stepwise-selection", "multiple-linear-regression", "normal-equations"],
    source: ISLR,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--explain-aic-vs-bic-stopping",
    conceptId: "forward-backward-stepwise-selection",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "AIC-based and BIC-based stepwise selection can give different final models on the same data. " +
      "Explain the mechanism, referencing which criterion penalises more per added variable.",
    rubric: {
      elements: [
        {
          id: "bic-penalises-more",
          description: "Explains that BIC's larger, n-growing penalty makes the search stop earlier (favouring smaller models) than AIC's fixed penalty in the same greedy search.",
          weight: 3,
          required: true,
        },
        {
          id: "divergence-mechanism",
          description: "Notes the two criteria can diverge onto different paths exactly at the steps where a candidate variable's improvement falls between the two thresholds.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["forward-backward-stepwise-selection", "aic-bic"],
    source: ESL,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--transfer-split-half-instability",
    conceptId: "forward-backward-stepwise-selection",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A team runs stepwise selection separately on two random halves of the same dataset and gets " +
      "substantially different final variable sets. Explain what this does, and does not, tell you about " +
      "which set is 'correct.'",
    rubric: {
      elements: [
        {
          id: "instability-is-diagnostic-not-decisive",
          description: "Explains that instability across the two halves is itself diagnostic of a flat or noisy selection surface (many correlated or weak candidates), not evidence that either half's answer is wrong.",
          weight: 3,
          required: true,
          misconception: {
            id: "single-run-treated-as-ground-truth",
            description: "Treats the variable set from a single run as the definitively correct one, rather than as one draw from an unstable procedure.",
            blameConceptId: "forward-backward-stepwise-selection",
          },
        },
        {
          id: "remedy",
          description: "Recommends reporting the intersection, or a stability-selection frequency across many resamples, rather than trusting a single run.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["forward-backward-stepwise-selection", "multiple-linear-regression"],
    source: ESL,
    status: "live",
  },
  {
    id: "forward-backward-stepwise-selection--transfer-discrete-vs-continuous-path",
    conceptId: "forward-backward-stepwise-selection",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Contrast the guarantee LASSO's solution path offers (a continuous path in λ) with the guarantee " +
      "forward stepwise selection's path offers (a discrete sequence of models). What structural property " +
      "does one have that the other lacks?",
    rubric: {
      elements: [
        {
          id: "convexity-guarantee",
          description: "Explains that LASSO's path arises from a convex optimisation, so any point along it inherits guarantees of uniqueness/stability that a greedy discrete search does not.",
          weight: 3,
          required: true,
        },
        {
          id: "greedy-has-no-such-guarantee",
          description: "Explains that a variable added early in forward selection is a purely local, data-specific choice with no equivalent structural justification, since each step is a separate discrete decision.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.7,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["forward-backward-stepwise-selection", "multiple-linear-regression", "aic-bic"],
    source: ESL,
    status: "live",
  },

  // --- Regularization (additional items) ------------------------------------
  {
    id: "regularization--recall-changes-the-objective",
    conceptId: "regularization",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Regularization changes:",
    choices: [
      { id: "a", text: "The objective function being minimised, adding a term that penalises coefficient size", correct: true },
      {
        id: "b",
        text: "The data used to fit the model",
        correct: false,
        misconception: {
          id: "regularization-changes-data",
          description: "Confuses a change to the objective function with a change to the observations.",
          blameConceptId: "regularization",
        },
      },
      {
        id: "c",
        text: "The functional form of the model, e.g. linear to nonlinear",
        correct: false,
        misconception: {
          id: "regularization-changes-functional-form",
          description: "Confuses regularization with a change of model family; the functional form (e.g. linear) is unchanged.",
          blameConceptId: "regularization",
        },
      },
      {
        id: "d",
        text: "Only the reported standard errors, not the point estimates",
        correct: false,
        misconception: {
          id: "regularization-affects-inference-only",
          description: "Misses that regularization directly changes the fitted point estimates, not just the uncertainty attached to them.",
          blameConceptId: "regularization",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["regularization", "loss-functions"],
    source: ISLR,
    status: "live",
  },
  {
    id: "regularization--recall-lambda-extremes-in-words",
    conceptId: "regularization",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "In the ridge objective ‖y − Xβ‖² + λΣβⱼ², what does λ = 0 recover, and what happens as λ → ∞?",
    rubric: {
      elements: [
        {
          id: "lambda-zero",
          description: "States λ = 0 recovers ordinary least squares exactly.",
          weight: 3,
          required: true,
        },
        {
          id: "lambda-infinity",
          description: "States as λ → ∞ every coefficient is driven toward 0, so predictions approach ȳ.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.3,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["regularization", "loss-functions"],
    source: ISLR,
    status: "live",
  },
  {
    id: "regularization--apply-mse-second-example",
    conceptId: "regularization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A biased estimator has bias −1 and standard deviation 3. What is its mean squared error? Give a " +
      "whole number.",
    answerKey: 10,
    tolerance: 0.1,
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["regularization", "bias-variance-tradeoff", "variance"],
    source: ESL,
    status: "live",
  },
  {
    id: "regularization--apply-penalty-value",
    conceptId: "regularization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "In the objective with λ = 4 and P(β) = Σβⱼ², coefficients β = (2, −3). Evaluate the penalty term " +
      "λΣβⱼ². Give a whole number.",
    answerKey: 52,
    tolerance: 0.1,
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["regularization", "loss-functions"],
    source: ESL,
    status: "live",
  },
  {
    id: "regularization--explain-tradeoff-not-free",
    conceptId: "regularization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain, in one line, why regularization is described as trading bias for variance rather than " +
      "simply 'improving' the estimator unconditionally.",
    rubric: {
      elements: [
        {
          id: "bias-introduced",
          description: "States that any λ > 0 makes β̂ biased in exchange for a reduction in variance, so it is a trade rather than an unconditional gain.",
          weight: 3,
          required: true,
        },
        {
          id: "depends-on-data",
          description: "Notes whether the trade is a net improvement in MSE depends on the specific bias-variance tradeoff for the data at hand.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["regularization", "bias-variance-tradeoff", "variance"],
    source: ESL,
    status: "live",
  },
  {
    id: "regularization--explain-collinearity-amplifies-noise",
    conceptId: "regularization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why an unregularised model can have arbitrarily large variance when predictors are nearly " +
      "collinear, in terms of what (XᵀX)⁻¹ does to noise in y.",
    rubric: {
      elements: [
        {
          id: "near-singular-eigenvalues",
          description: "Explains that near-collinearity makes XᵀX nearly singular, with some eigenvalues close to zero.",
          weight: 3,
          required: true,
        },
        {
          id: "inversion-amplifies-noise",
          description: "States that inverting amplifies noise along those directions, since Var(β̂) scales with the reciprocal of the small eigenvalues — exactly the instability λI's addition controls.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["regularization", "bias-variance-tradeoff", "multiple-linear-regression"],
    source: ESL,
    status: "live",
  },
  {
    id: "regularization--transfer-fairness-non-monotone",
    conceptId: "regularization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A team regularises a loan-approval logistic regression and finds demographic approval-rate gaps " +
      "shrink as λ increases, up to a point, then widen again in the opposite direction at very large λ. " +
      "Give a plausible mechanism for each direction.",
    rubric: {
      elements: [
        {
          id: "moderate-lambda-removes-noise",
          description: "Explains that moderate regularization can reduce overfitting to spurious, group-correlated noise in a small or unbalanced training set that had inflated apparent group differences.",
          weight: 3,
          required: true,
          misconception: {
            id: "more-regularization-always-fairer",
            description: "Assumes stronger regularization always improves fairness, missing that very large λ can reintroduce disparity for a different reason.",
            blameConceptId: "regularization",
          },
        },
        {
          id: "large-lambda-underfits-a-real-feature",
          description: "Explains that at very large λ the model shrinks toward predicting the base rate, which can systematically underfit a genuinely predictive feature whose prevalence differs across groups.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.5,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["regularization", "bias-variance-tradeoff"],
    source: ISLR,
    status: "live",
  },
  {
    id: "regularization--transfer-kitchen-sink-strategy",
    conceptId: "regularization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A 'kitchen sink' regression includes every available predictor and relies entirely on ridge " +
      "regularization to control overfitting, with no variable screening. Argue for and against this " +
      "strategy relative to first doing feature selection.",
    rubric: {
      elements: [
        {
          id: "for",
          description: "Argues for: avoids the instability and selection bias discrete stepwise procedures introduce, and cross-validated λ adapts to how much signal is present.",
          weight: 3,
          required: true,
        },
        {
          id: "against",
          description: "Argues against: ridge never zeroes irrelevant coefficients, leaving an uninterpretable model with many nonzero weights, and truly irrelevant predictors still add some variance even after shrinkage.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["regularization", "bias-variance-tradeoff", "multiple-linear-regression"],
    source: ESL,
    status: "live",
  },

  // --- LASSO (additional items) ----------------------------------------------
  {
    id: "lasso--recall-nondifferentiable-at-zero",
    conceptId: "lasso",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The LASSO penalty λΣ|βⱼ| is:",
    choices: [
      { id: "a", text: "Convex, but not differentiable at βⱼ = 0", correct: true },
      {
        id: "b",
        text: "Differentiable everywhere",
        correct: false,
        misconception: {
          id: "lasso-penalty-smooth",
          description: "Misses the kink at zero that is precisely what gives LASSO its sparsity property.",
          blameConceptId: "lasso",
        },
      },
      {
        id: "c",
        text: "Non-convex",
        correct: false,
        misconception: {
          id: "lasso-penalty-nonconvex",
          description: "The L1 penalty is convex; non-convexity would be a property of an L0-style penalty instead.",
          blameConceptId: "lasso",
        },
      },
      {
        id: "d",
        text: "Concave",
        correct: false,
        misconception: {
          id: "lasso-penalty-concave",
          description: "The absolute value function is convex, not concave.",
          blameConceptId: "lasso",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["lasso", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--recall-alpha-in-elastic-net",
    conceptId: "lasso",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "What value of α in the elastic-net family λ[α·Σ|βⱼ| + (1 − α)·Σβⱼ²] recovers pure LASSO?",
    rubric: {
      elements: [
        {
          id: "alpha-one",
          description: "States α = 1, since (1 − α) = 0 removes the ridge term entirely, leaving only the L1 penalty.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.3,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["lasso", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--apply-soft-threshold-small",
    conceptId: "lasso",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Using the soft-threshold rule β̂ⱼ = sign(b)·max(0, |b| − λ/2), what is β̂ⱼ when b = 0.9 and λ = 1.0? " +
      "Give a decimal to one place.",
    answerKey: 0.4,
    tolerance: 0.01,
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["lasso", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--apply-soft-threshold-negative-large",
    conceptId: "lasso",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Using the same rule, what is β̂ⱼ when b = −2.2 and λ = 1.0? Give a decimal to one place.",
    answerKey: -1.7,
    tolerance: 0.01,
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 90,
    prereqClosure: ["lasso", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--explain-not-proportional-to-ols",
    conceptId: "lasso",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why LASSO's solution is not, in general, a scalar multiple of the OLS solution — i.e. why " +
      "'LASSO just shrinks OLS proportionally' is wrong even though ridge behaves that way in the " +
      "orthonormal case.",
    rubric: {
      elements: [
        {
          id: "ridge-is-multiplicative",
          description: "Notes that in the orthonormal case ridge shrinks every coefficient by the same multiplicative factor, so the whole vector is uniformly rescaled.",
          weight: 3,
          required: true,
        },
        {
          id: "lasso-is-additive",
          description: "Explains that LASSO's soft threshold subtracts a constant λ/2 from |b|, an additive shift, not a multiplicative rescaling — small coefficients are killed while large ones are pulled down by the same absolute amount, changing the ratios between them.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["lasso", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--explain-tightest-convex-relaxation",
    conceptId: "lasso",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The L1 penalty is sometimes justified as the 'tightest convex relaxation' of the L0 penalty (the " +
      "number of nonzero coefficients). Explain what convexity buys practically, given that L0 is far " +
      "more directly what sparsity means.",
    rubric: {
      elements: [
        {
          id: "l0-is-nphard",
          description: "Explains that directly minimising an L0 penalty is a combinatorial, NP-hard problem in general — no efficient algorithm is known to solve it exactly at scale.",
          weight: 3,
          required: true,
        },
        {
          id: "convexity-buys-tractability",
          description: "Explains that L1's convexity guarantees a unique global solution reachable by efficient algorithms, at the cost of being only a relaxation of what sparsity actually means.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["lasso", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--transfer-scale-dependence-without-standardising",
    conceptId: "lasso",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Two data scientists apply LASSO to the same problem, but one standardises predictors to unit " +
      "variance first and the other does not. Explain why skipping this step effectively changes which " +
      "variables the L1 penalty favours, independent of any actual predictive signal.",
    rubric: {
      elements: [
        {
          id: "penalty-ignores-scale",
          description: "Explains that the penalty sums |βⱼ| directly with no correction for each predictor's numeric scale.",
          weight: 3,
          required: true,
          misconception: {
            id: "lasso-assumed-scale-invariant",
            description: "Assumes LASSO's variable selection is invariant to the units each predictor happens to be measured in.",
            blameConceptId: "lasso",
          },
        },
        {
          id: "large-scale-predictors-favoured",
          description: "Explains that a predictor on a large numeric scale needs only a small coefficient for a given real-world effect, so it is barely penalised, while a small-scale predictor needing a large coefficient for the same real effect is penalised heavily — favouring large-scale predictors for reasons unrelated to predictive value.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["lasso", "regularization", "multiple-linear-regression"],
    source: ESL,
    status: "live",
  },
  {
    id: "lasso--transfer-stability-vs-accuracy",
    conceptId: "lasso",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A LASSO model refit each year on fresh data changes its set of nonzero coefficients noticeably year " +
      "to year, even though predictive accuracy stays roughly stable. Is this a sign the earlier model was " +
      "wrong? Explain.",
    rubric: {
      elements: [
        {
          id: "not-necessarily-wrong",
          description: "Explains that this is not necessarily a sign of error: selection can be unstable among correlated or weak predictors even while predictions stay accurate, since many different sparse subsets can achieve similar fit.",
          weight: 3,
          required: true,
        },
        {
          id: "judge-by-predictions-not-names",
          description: "Recommends judging the procedure by predictive performance and stability of predictions, not by whether the same named variables reappear, and possibly reporting a stability-selection frequency instead of a single sparse set.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.7,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["lasso", "regularization", "multiple-linear-regression"],
    source: ESL,
    status: "live",
  },

  // --- Ridge Regression (additional items) ----------------------------------
  {
    id: "ridge-regression--recall-exists-for-every-lambda",
    conceptId: "ridge-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Ridge regression's estimator β̂ = (XᵀX + λI)⁻¹Xᵀy exists:",
    choices: [
      { id: "a", text: "For every λ > 0, even if XᵀX is singular", correct: true },
      {
        id: "b",
        text: "Only if XᵀX is already invertible",
        correct: false,
        misconception: {
          id: "ridge-needs-invertible-xtx",
          description: "Misses the whole point of the λI addition, which is exactly to guarantee invertibility when XᵀX itself is singular.",
          blameConceptId: "ridge-regression",
        },
      },
      {
        id: "c",
        text: "Only for λ < 1",
        correct: false,
        misconception: {
          id: "ridge-restricted-to-lambda-under-one",
          description: "Invents a bound on λ; any λ > 0 shifts every eigenvalue up and guarantees invertibility.",
          blameConceptId: "ridge-regression",
        },
      },
      {
        id: "d",
        text: "Only in the orthonormal-predictor case",
        correct: false,
        misconception: {
          id: "ridge-restricted-to-orthonormal",
          description: "The closed form and its invertibility hold for any design matrix, not only orthonormal ones.",
          blameConceptId: "ridge-regression",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["ridge-regression", "regularization", "normal-equations"],
    source: ESL,
    status: "live",
  },
  {
    id: "ridge-regression--recall-what-lambda-i-is-added-to",
    conceptId: "ridge-regression",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Name the two places λ appears: what is the ridge penalty added to in the objective function, and " +
      "what is λI added to in the closed-form solution?",
    rubric: {
      elements: [
        {
          id: "objective",
          description: "States the penalty λΣβⱼ² is added to the residual sum of squares ‖y − Xβ‖² in the objective.",
          weight: 3,
          required: true,
        },
        {
          id: "closed-form",
          description: "States λI is added to XᵀX, the matrix being inverted in the closed-form solution.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.3,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["ridge-regression", "regularization", "normal-equations"],
    source: ESL,
    status: "live",
  },
  {
    id: "ridge-regression--apply-determinant-well-conditioned",
    conceptId: "ridge-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A design matrix has XᵀX = [[2, 0], [0, 2]]. With λ = 3, compute the determinant of XᵀX + λI. Give " +
      "a whole number.",
    answerKey: 25,
    tolerance: 0.01,
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["ridge-regression", "regularization", "matrix-multiplication"],
    source: OCW_18_06,
    status: "live",
  },
  {
    id: "ridge-regression--apply-shrinkage-factor-second",
    conceptId: "ridge-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Ridge scales the j-th principal direction of the fit by dⱼ²/(dⱼ² + λ). With dⱼ = 2 and λ = 12, " +
      "what is the shrinkage factor? Give a decimal to two places.",
    answerKey: 0.25,
    tolerance: 0.01,
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 90,
    prereqClosure: ["ridge-regression", "regularization", "matrix-multiplication"],
    source: ESL,
    status: "live",
  },
  {
    id: "ridge-regression--explain-as-a-prior",
    conceptId: "ridge-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Ridge regression is sometimes called 'Tikhonov regularisation.' Explain why adding λI can be " +
      "understood as adding a small amount of synthetic information — a weak prior belief that β = 0 — " +
      "rather than merely as a numerical trick to fix singularity.",
    rubric: {
      elements: [
        {
          id: "map-under-gaussian-prior",
          description: "Explains that ridge's objective is equivalent to MAP estimation under a Gaussian prior N(0, τ²I) on β, with λ = σ²/τ².",
          weight: 3,
          required: true,
        },
        {
          id: "prior-adds-information",
          description: "Explains that adding λI is the algebraic footprint of that prior's precision being added to the data's information (XᵀX), reframing the 'trick' as literally incorporating a modest, deliberate assumption about β.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["ridge-regression", "regularization", "normal-equations"],
    source: ESL,
    status: "live",
  },
  {
    id: "ridge-regression--explain-smooth-bias-path",
    conceptId: "ridge-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the bias introduced by ridge regression is a smooth, continuously increasing function " +
      "of λ, in contrast to the discontinuous jumps in bias along a stepwise-selection path as variables " +
      "are added or removed.",
    rubric: {
      elements: [
        {
          id: "ridge-continuous",
          description: "Explains that β̂(λ) = (XᵀX + λI)⁻¹Xᵀy is a continuous, differentiable function of λ, since matrix inversion and multiplication vary continuously with the entries, so bias changes smoothly with λ.",
          weight: 3,
          required: true,
        },
        {
          id: "stepwise-discontinuous",
          description: "Explains that a stepwise path's bias jumps discretely whenever a variable enters or leaves the model, since that changes which coefficients even exist in the fit.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.5,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["ridge-regression", "regularization", "matrix-multiplication", "normal-equations"],
    source: ESL,
    status: "live",
  },
  {
    id: "ridge-regression--transfer-genomic-blup",
    conceptId: "ridge-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "In genomic prediction, ridge regression is often preferred over LASSO even when the true effect is " +
      "believed to be sparse (few causal variants), because prediction accuracy is what's measured, not " +
      "variable identification. Explain the apparent paradox.",
    rubric: {
      elements: [
        {
          id: "correlated-markers-tag-same-signal",
          description: "Explains that when many correlated markers each tag the same causal signal, a dense ridge solution spreading a small weight across all of them can predict as well as or better than a sparse LASSO solution that arbitrarily picks one representative per correlated block.",
          weight: 3,
          required: true,
        },
        {
          id: "prediction-not-identification",
          description: "Concludes that prediction accuracy does not require correctly identifying the sparse truth, only capturing its predictive signal by any means.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["ridge-regression", "regularization", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "ridge-regression--transfer-stable-cv-curve",
    conceptId: "ridge-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain why cross-validated λ for ridge regression tends to be more stable across resamples of the " +
      "same dataset than cross-validated λ for LASSO, referencing the smoothness of each method's " +
      "coefficient path.",
    rubric: {
      elements: [
        {
          id: "ridge-smooth-curve",
          description: "Explains that ridge's smooth coefficient path tends to produce a smooth, roughly unimodal cross-validation error curve, so small perturbations from resampling move the argmin only slightly.",
          weight: 3,
          required: true,
        },
        {
          id: "lasso-kinked-curve",
          description: "Explains that LASSO's path has kinks where variables enter or exit, which can produce a rougher CV-error curve, making the selected λ (and the active set) more sensitive to exactly which folds were drawn.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.7,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["ridge-regression", "regularization", "matrix-multiplication"],
    source: ESL,
    status: "live",
  },

  // --- Elastic Net (additional items) ---------------------------------------
  {
    id: "elastic-net--recall-alpha-zero-is-ridge",
    conceptId: "elastic-net",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In elastic net's penalty λ[α·Σ|βⱼ| + (1 − α)·Σβⱼ²], what does α = 0 recover?",
    choices: [
      { id: "a", text: "Pure ridge regression", correct: true },
      {
        id: "b",
        text: "Pure LASSO",
        correct: false,
        misconception: {
          id: "alpha-zero-called-lasso",
          description: "Reverses the roles of the two extremes; α = 1 gives LASSO, and α = 0 gives ridge.",
          blameConceptId: "elastic-net",
        },
      },
      {
        id: "c",
        text: "Ordinary least squares with no penalty",
        correct: false,
        misconception: {
          id: "alpha-zero-called-ols",
          description: "Sets α = 0 but forgets λ still multiplies the remaining ridge term, so the penalty does not vanish.",
          blameConceptId: "elastic-net",
        },
      },
      {
        id: "d",
        text: "Best subset selection",
        correct: false,
        misconception: {
          id: "alpha-zero-called-best-subset",
          description: "Confuses a continuous L2 penalty with the discrete, combinatorial L0 method.",
          blameConceptId: "elastic-net",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--recall-inherited-properties",
    conceptId: "elastic-net",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Name the one property elastic net inherits from LASSO and the one it inherits from ridge, in one " +
      "phrase each.",
    rubric: {
      elements: [
        {
          id: "from-lasso",
          description: "States that it inherits the ability to produce exact zeros (sparsity) from LASSO.",
          weight: 3,
          required: true,
        },
        {
          id: "from-ridge",
          description: "States that it inherits stable, grouped shrinkage of correlated predictors from ridge.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.2,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--apply-penalty-value-second",
    conceptId: "elastic-net",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With λ = 1, α = 0.25, and coefficients β = (4, 0), evaluate λ[α·Σ|βⱼ| + (1 − α)·Σβⱼ²]. Give a " +
      "whole number.",
    answerKey: 13,
    tolerance: 0.01,
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--apply-splitting-is-cheaper-larger-total",
    conceptId: "elastic-net",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Two identical predictors must together carry a total coefficient of 6. Under a pure ridge penalty " +
      "Σβⱼ², what is the penalty value for the concentrated split (6, 0) minus the penalty for the even " +
      "split (3, 3)? Give a whole number.",
    answerKey: 18,
    tolerance: 0.1,
    difficulty: 1.8,
    discrimination: 1.7,
    expectedSeconds: 150,
    prereqClosure: ["elastic-net", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--explain-alpha-near-one-recommended",
    conceptId: "elastic-net",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why setting α close to, but not exactly, 1 is often recommended in practice over pure " +
      "LASSO (α = 1), even when sparsity is the primary goal.",
    rubric: {
      elements: [
        {
          id: "tiny-ridge-restores-convexity",
          description: "Explains that a small ridge component restores strict convexity, stabilising the optimisation and the selection among correlated predictors without materially sacrificing sparsity.",
          weight: 3,
          required: true,
        },
        {
          id: "avoids-fragility",
          description: "Notes this avoids LASSO's arbitrary pick among near-duplicate columns and numerical fragility in ill-conditioned designs.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--explain-rounded-corners-geometry",
    conceptId: "elastic-net",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain, in terms of the constraint region's geometry, why elastic net's penalty boundary has " +
      "'rounded corners' compared to LASSO's sharp diamond, and what that shape change does to how often " +
      "exact zeros occur relative to pure LASSO.",
    rubric: {
      elements: [
        {
          id: "corners-rounded-not-removed",
          description: "Explains that adding a quadratic term smooths the diamond's vertices into rounded corners while keeping the axis-aligned singularities that produce sparsity.",
          weight: 3,
          required: true,
        },
        {
          id: "less-aggressive-sparsity",
          description: "Concludes elastic net still zeroes some coefficients, but generally less aggressively among correlated groups than pure LASSO, trading a bit of sparsity for grouping stability.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--transfer-fixed-alpha-search-cost",
    conceptId: "elastic-net",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A team tunes elastic net by fixing α = 0.5 arbitrarily and cross-validating only λ, to save " +
      "compute. Explain what class of solutions this search can never reach, and when that omission would " +
      "actually cost predictive accuracy.",
    rubric: {
      elements: [
        {
          id: "cannot-reach-extremes",
          description: "Explains the search can never reach the pure-LASSO (α = 1) or pure-ridge (α = 0) endpoints, nor most other blends.",
          weight: 3,
          required: true,
        },
        {
          id: "cost-at-the-extremes",
          description: "Explains that if the true best solution sits much closer to sparse or much closer to dense than α = 0.5, the restricted search may settle for a materially worse solution than a full grid over (α, λ) would find.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },
  {
    id: "elastic-net--transfer-dominance-argument-flaw",
    conceptId: "elastic-net",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A colleague argues elastic net is strictly better than LASSO because LASSO is a special case " +
      "(α = 1), so tuning can never do worse. Identify the flaw in this argument, given how α and λ are " +
      "actually chosen in practice.",
    rubric: {
      elements: [
        {
          id: "true-only-for-exhaustive-search",
          description: "Explains the argument holds only for an idealised, exhaustive, noiseless search over the full (α, λ) grid including α = 1.",
          weight: 3,
          required: true,
        },
        {
          id: "cv-adds-its-own-noise",
          description: "Explains that in practice the extra dimension is tuned by cross-validation on finite data, which adds its own estimation noise, so the selected (α, λ)̂ can perform worse out-of-sample than a well-tuned pure LASSO, especially with a coarse grid.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.7,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["elastic-net", "lasso", "ridge-regression", "regularization"],
    source: ESL,
    status: "live",
  },

  // --- LOESS Smoothing (additional items) -----------------------------------
  {
    id: "loess-smoothing--recall-span-meaning",
    conceptId: "loess-smoothing",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In LOESS, the 'span' parameter controls:",
    choices: [
      { id: "a", text: "The fraction of the data included in each local neighbourhood", correct: true },
      {
        id: "b",
        text: "The degree of the local polynomial fit",
        correct: false,
        misconception: {
          id: "span-confused-with-degree",
          description: "Confuses the neighbourhood-size parameter with the (separate) choice of local linear versus local quadratic fitting.",
          blameConceptId: "loess-smoothing",
        },
      },
      {
        id: "c",
        text: "The number of robustness iterations of the algorithm",
        correct: false,
        misconception: {
          id: "span-confused-with-iterations",
          description: "Confuses the neighbourhood-size parameter with the separate robustness-iteration count some implementations use.",
          blameConceptId: "loess-smoothing",
        },
      },
      {
        id: "d",
        text: "The confidence level of the fitted band",
        correct: false,
        misconception: {
          id: "span-confused-with-confidence-level",
          description: "Confuses a smoothing parameter with an unrelated inferential quantity.",
          blameConceptId: "loess-smoothing",
        },
      },
    ],
    difficulty: -1.9,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "loess-smoothing--recall-default-local-degree",
    conceptId: "loess-smoothing",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "What degree polynomial is fit within each local neighbourhood in the most common (local-linear) " +
      "form of LOESS?",
    rubric: {
      elements: [
        {
          id: "degree-one",
          description: "States degree 1 — a local weighted linear regression — noting local-quadratic variants also exist but linear is the default/most common choice.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.4,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "loess-smoothing--apply-neighbourhood-size-second",
    conceptId: "loess-smoothing",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A LOESS fit on 150 observations uses a span of 0.2. How many observations enter each local " +
      "regression? Give a whole number.",
    answerKey: 30,
    tolerance: 0.5,
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 50,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "loess-smoothing--apply-tricube-weight-second",
    conceptId: "loess-smoothing",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "The tricube weight is w(u) = (1 − |u|³)³ for |u| < 1. What weight does a point at u = 0.8 receive? " +
      "Give a decimal to four places.",
    answerKey: 0.1162,
    tolerance: 0.001,
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "loess-smoothing--explain-smooth-weights-vs-hard-edge",
    conceptId: "loess-smoothing",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why LOESS uses a smoothly decaying weighting scheme (like the tricube function) within " +
      "each neighbourhood rather than simply giving every point in the neighbourhood equal weight.",
    rubric: {
      elements: [
        {
          id: "hard-edge-causes-jumps",
          description: "Explains that equal weighting within a hard-edged window would make the fitted curve jump discontinuously as points cross the window boundary while the target point moves.",
          weight: 3,
          required: true,
        },
        {
          id: "smooth-weights-give-smooth-curve",
          description: "Explains that smoothly decaying weights (near 1 close to the target, tapering to 0 at the boundary) make the resulting curve continuous as the window slides.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "loess-smoothing--explain-outlier-sensitivity",
    conceptId: "loess-smoothing",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "LOESS weights points by distance to the target but not by how influential a point already is " +
      "within that local window. Explain a scenario where this makes LOESS sensitive to a single outlier " +
      "despite the local weighting.",
    rubric: {
      elements: [
        {
          id: "distance-weight-ignores-y-value",
          description: "Explains that an outlier near the target point's window gets a high distance-based weight regardless of how extreme its y-value is, distorting the local fit near that region.",
          weight: 3,
          required: true,
        },
        {
          id: "robustness-iteration-fix",
          description: "Names the remedy: robust LOESS reweights points with large residuals after an initial fit, which plain distance-weighting alone does not do.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "loess-smoothing--transfer-fixed-span-at-scale",
    conceptId: "loess-smoothing",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A dashboard automatically overlays a LOESS trend line on every scatterplot using a fixed span of " +
      "0.75, regardless of sample size. Explain what goes wrong as the dataset grows from 50 to 50,000 " +
      "points, holding the span fixed.",
    rubric: {
      elements: [
        {
          id: "absolute-window-grows",
          description: "Explains that with a fixed fraction span, the absolute number of points entering each local fit grows proportionally with n (37.5 at n = 50 versus 37,500 at n = 50,000).",
          weight: 3,
          required: true,
          misconception: {
            id: "fixed-span-treated-as-scale-invariant",
            description: "Treats a fixed span fraction as scale-invariant good practice, missing that the effective window's absolute size grows with n.",
            blameConceptId: "loess-smoothing",
          },
        },
        {
          id: "over-smoothing-at-scale",
          description: "Concludes each 'local' window becomes a near-global neighbourhood at large n, over-smoothing the curve and potentially hiding genuine local structure the extra data could have revealed.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["loess-smoothing", "simple-linear-regression"],
    source: ESL,
    status: "live",
  },
  {
    id: "loess-smoothing--transfer-fixed-span-vs-fixed-bandwidth",
    conceptId: "loess-smoothing",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Contrast what happens to a LOESS fit's variance as n → ∞ at a fixed span (a fraction of the data) " +
      "versus at a fixed absolute bandwidth (a fixed range of x-units). Which choice, on its own, would " +
      "need to be adjusted with n for the fit to behave like a classical consistent nonparametric " +
      "estimator, and why?",
    rubric: {
      elements: [
        {
          id: "fixed-bandwidth-needs-shrinking",
          description: "Explains that a fixed absolute bandwidth left unchanged as n → ∞ has shrinking variance but fixed bias — for consistency in the classical sense the bandwidth itself must be shrunk toward zero as n grows.",
          weight: 3,
          required: true,
        },
        {
          id: "fixed-span-never-adapts-the-fraction",
          description: "Explains that a fixed span keeps the same fraction of data local as n grows, so while variance still shrinks, the fraction of the range treated as 'local' never adapts on its own — a different asymptotic behaviour than a bandwidth explicitly shrunk toward zero.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.5,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["loess-smoothing", "simple-linear-regression", "variance"],
    source: ESL,
    status: "live",
  },
];
