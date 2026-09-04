import type { Item } from "../../lib/assessment/types";
import { AUTHORED, BISHOP_PRML, ISLR, SINGER_WILLETT, VERBEKE_MOLENBERGHS } from "./sources";

/**
 * REG-5 — Mixed Effect Models, Logistic Regression, Probit Regression,
 * Generalized Linear Model, Cox Proportional Hazards Model.
 *
 * Authored from `assessments/reg-05-generalized-and-special-regression.md`, the
 * final cluster of the regression domain. Every concept here is a deliberate
 * relaxation of one piece of the base model — independence (mixed effects),
 * the identity link (logistic/probit/GLM), or the parametric response
 * distribution (Cox) — so several items ask what specifically was relaxed and
 * what stayed fixed.
 */
export const regressionGeneralizedItems: Item[] = [
  // --- Mixed Effect Models ---------------------------------------------------
  {
    id: "mixed-effect-models--recall-fixed-vs-random",
    conceptId: "mixed-effect-models",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In a mixed-effects model, the distinction between fixed and random effects is:",
    choices: [
      {
        id: "a",
        text: "Fixed effects are shared population-level coefficients; random effects let each group deviate, drawn from a distribution",
        correct: true,
      },
      {
        id: "b",
        text: "Fixed effects are estimated with error; random effects are known exactly",
        correct: false,
        misconception: {
          id: "fixed-effects-called-exact",
          description:
            "Both fixed and random effects are estimated from data with uncertainty. The distinction is about the population structure assumed, not about precision.",
          blameConceptId: "mixed-effect-models",
        },
      },
      {
        id: "c",
        text: "Fixed effects vary by group; random effects are the same for everyone",
        correct: false,
        misconception: {
          id: "fixed-random-roles-swapped",
          description:
            "Swaps the two roles. It is the random effects that vary by group; the fixed effects are shared.",
          blameConceptId: "mixed-effect-models",
        },
      },
      {
        id: "d",
        text: "Fixed effects come from a randomised experiment; random effects come from observational data",
        correct: false,
        misconception: {
          id: "terminology-tied-to-study-design",
          description:
            "Ties the terms to how the data were collected. The distinction is about whether an effect is a single shared coefficient or one drawn per group.",
          blameConceptId: "mixed-effect-models",
        },
      },
    ],
    difficulty: -0.17,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["mixed-effect-models", "multiple-linear-regression"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--recall-when-appropriate",
    conceptId: "mixed-effect-models",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Mixed-effects models are especially appropriate when: select all that apply.",
    choices: [
      { id: "a", text: "Observations are repeated measurements on the same subject", correct: true },
      { id: "b", text: "Students are nested within schools, and school matters", correct: true },
      { id: "c", text: "The data was collected by cluster sampling", correct: true },
      {
        id: "d",
        text: "Every observation is from a different, unrelated unit with no grouping",
        correct: false,
        misconception: {
          id: "mixed-models-for-fully-independent-data",
          description:
            "Names the situation where ordinary regression already applies and a random effect has nothing to estimate.",
          blameConceptId: "mixed-effect-models",
        },
      },
      {
        id: "e",
        text: "The response is guaranteed to be normally distributed within every group",
        correct: false,
        misconception: {
          id: "condition-invented",
          description:
            "Invents a requirement. What licenses a mixed model is the grouped correlation structure, not a distributional guarantee within groups.",
          blameConceptId: "mixed-effect-models",
        },
      },
    ],
    difficulty: 0.13,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["mixed-effect-models", "sampling-methods", "multiple-linear-regression"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--apply-effective-n",
    conceptId: "mixed-effect-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A dataset has 500 observations: 50 patients with 10 readings each, and the intraclass correlation is " +
      "0.6. Using n_eff ≈ n / (1 + (m − 1)·ICC), what is the effective sample size? Give a whole number.",
    answerKey: 78,
    tolerance: 1,
    difficulty: 0.63,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["mixed-effect-models", "sample-mean", "sample-variance"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--apply-icc",
    conceptId: "mixed-effect-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A random-intercept model estimates between-patient variance τ² = 12 and within-patient (residual) " +
      "variance σ² = 8. What is the intraclass correlation, τ²/(τ² + σ²)? Give a decimal to two places.",
    answerKey: 0.6,
    tolerance: 0.01,
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 100,
    prereqClosure: ["mixed-effect-models", "sample-variance"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--explain-understated-se",
    conceptId: "mixed-effect-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why treating ten repeated measurements from the same patient as ten independent observations " +
      "understates the true uncertainty, echoing the same issue a paired t-test is designed to fix.",
    rubric: {
      elements: [
        {
          id: "shared-baseline-correlates",
          description:
            "Explains that a patient's own baseline health affects all their readings similarly, so the ten measurements are correlated and carry less genuinely new information than ten readings from ten different patients.",
          weight: 3,
          required: true,
          misconception: {
            id: "repeated-measures-treated-as-independent",
            description:
              "Treats within-subject measurements as carrying as much independent information as between-subject ones.",
            blameConceptId: "mixed-effect-models",
          },
        },
        {
          id: "consequence-on-se",
          description:
            "States the consequence: the effective sample size is smaller than the row count, so ordinary standard errors are understated and significance is overstated.",
          weight: 3,
          required: true,
        },
        {
          id: "paired-t-test-parallel",
          description:
            "Draws the parallel to the paired t-test's independence-violation point — the same phenomenon at its simplest, with two measurements per subject.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.33,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["mixed-effect-models", "sample-variance", "sample-mean"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "mixed-effect-models--explain-partial-pooling",
    conceptId: "mixed-effect-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Contrast three ways of handling grouped data — pooling all groups together, fitting each group " +
      "completely separately, and a random-intercept model — and explain what the third one is doing between " +
      "the other two.",
    rubric: {
      elements: [
        {
          id: "two-extremes-named",
          description:
            "Names the two extremes and their failure modes: complete pooling ignores real group differences, and no pooling is noisy for small groups and cannot generalise to a new group.",
          weight: 3,
          required: true,
        },
        {
          id: "partial-pooling-mechanism",
          description:
            "Explains that the random-intercept model shrinks each group's estimate toward the overall mean, by an amount depending on how much data the group has and how large the between-group variance is.",
          weight: 4,
          required: true,
          misconception: {
            id: "random-effects-treated-as-separate-fits",
            description:
              "Describes a random-intercept model as fitting each group independently, missing the shrinkage that borrows strength across groups.",
            blameConceptId: "mixed-effect-models",
          },
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["mixed-effect-models", "sample-mean"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--transfer-cluster-sampling-link",
    conceptId: "mixed-effect-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain how cluster sampling — surveying whole households or schools together rather than sampling " +
      "individuals independently — naturally produces data suited to a mixed-effects analysis.",
    rubric: {
      elements: [
        {
          id: "shared-correlation-structure",
          description:
            "Identifies that cluster-sampled data has within-cluster correlation for exactly the reason it is a cluster: households or schools sampled together share unmeasured local factors.",
          weight: 4,
          required: true,
          misconception: {
            id: "sampling-design-treated-as-unrelated-to-modelling",
            description:
              "Treats how the data was collected as separate from how it should be modelled, missing that cluster sampling and mixed-effects modelling are addressing the same underlying reality.",
            blameConceptId: "mixed-effect-models",
          },
        },
        {
          id: "same-structure-both-places",
          description:
            "States that this is the identical structure mixed models are designed to handle — not merely an analogy but the same phenomenon appearing at data collection and at analysis.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.83,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["mixed-effect-models", "sampling-methods"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--transfer-random-slope",
    conceptId: "mixed-effect-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A random-intercept model assumes every school has the same effect of a tutoring programme, differing " +
      "only in baseline test scores. A colleague suspects the programme actually helps some schools much more " +
      "than others. Describe the model change this calls for, and how you would check whether it is needed.",
    rubric: {
      elements: [
        {
          id: "random-slope",
          description:
            "Proposes adding a random slope on the tutoring effect, so each school gets its own deviation in the programme's effect as well as its own baseline.",
          weight: 3,
          required: true,
          misconception: {
            id: "intercept-only-treated-as-sufficient",
            description:
              "Treats a random intercept as capturing any kind of between-group heterogeneity, missing that it only allows differing baselines, not differing effects.",
            blameConceptId: "mixed-effect-models",
          },
        },
        {
          id: "how-to-check",
          description:
            "Suggests comparing the random-slope model against the random-intercept-only model with a likelihood-ratio test or by inspecting whether the estimated slope variance is meaningfully nonzero.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["mixed-effect-models", "multiple-linear-regression"],
    source: SINGER_WILLETT,
    status: "live",
  },

  // --- Logistic Regression ---------------------------------------------------
  {
    id: "logistic-regression--recall-model",
    conceptId: "logistic-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The logistic regression model states:",
    choices: [
      { id: "a", text: "P(Y = 1 | X) = 1/(1 + e^(−Xβ)), the sigmoid of the linear predictor", correct: true },
      {
        id: "b",
        text: "P(Y = 1 | X) = Xβ directly",
        correct: false,
        misconception: {
          id: "linear-probability-model-called-logistic",
          description:
            "Describes the linear probability model, whose unbounded output can fall below 0 or above 1 — exactly what the sigmoid link is designed to prevent.",
          blameConceptId: "logistic-regression",
        },
      },
      {
        id: "c",
        text: "Y = Xβ + ε, with ε having a logistic distribution",
        correct: false,
        misconception: {
          id: "additive-error-model-for-binary-y",
          description:
            "Writes an additive-noise model for a binary outcome, which does not make sense — Y takes only two values, so it cannot equal a continuous quantity plus noise.",
          blameConceptId: "logistic-regression",
        },
      },
      {
        id: "d",
        text: "P(Y = 1 | X) = e^(Xβ), with no bound",
        correct: false,
        misconception: {
          id: "exponential-without-normalisation",
          description:
            "Uses a raw exponential with no normalisation, which is unbounded above and cannot be a probability.",
          blameConceptId: "logistic-regression",
        },
      },
    ],
    difficulty: 0.26,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["logistic-regression", "bernoulli-binomial", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "logistic-regression--recall-fitting-method",
    conceptId: "logistic-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Logistic regression coefficients are estimated by:",
    choices: [
      {
        id: "a",
        text: "Maximum likelihood, since the Bernoulli likelihood has no OLS-style closed-form minimiser",
        correct: true,
      },
      {
        id: "b",
        text: "Ordinary least squares, exactly as in linear regression",
        correct: false,
        misconception: {
          id: "ols-applied-to-logistic",
          description:
            "Applies the linear-regression fitting rule to a model whose likelihood is not Gaussian, so least squares is not the right objective.",
          blameConceptId: "logistic-regression",
        },
      },
      {
        id: "c",
        text: "Matching the sample proportion of Y = 1 directly to each coefficient",
        correct: false,
        misconception: {
          id: "coefficients-set-to-proportions",
          description:
            "Confuses estimating a single probability with estimating how several predictors jointly shift the log-odds.",
          blameConceptId: "logistic-regression",
        },
      },
      {
        id: "d",
        text: "Minimising the sum of squared residuals between Y and the fitted probability",
        correct: false,
        misconception: {
          id: "squared-error-on-probabilities",
          description:
            "Reuses the OLS objective on the fitted probability, which is not what maximum likelihood under a Bernoulli response reduces to.",
          blameConceptId: "logistic-regression",
        },
      },
    ],
    difficulty: 0.56,
    discrimination: 1.5,
    expectedSeconds: 50,
    prereqClosure: ["logistic-regression", "mle", "bernoulli-binomial"],
    source: ISLR,
    status: "live",
  },
  {
    id: "logistic-regression--apply-sigmoid",
    conceptId: "logistic-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For an observation with Xβ = 2, what is the predicted P(Y = 1 | X)? Give a decimal to four places.",
    answerKey: 0.8808,
    tolerance: 0.001,
    difficulty: 1.06,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["logistic-regression", "bernoulli-binomial"],
    source: ISLR,
    status: "live",
  },
  {
    id: "logistic-regression--apply-odds-ratio",
    conceptId: "logistic-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A logistic regression coefficient on age is 0.03 per year. What is the odds ratio for ten additional " +
      "years of age, e^(0.03 × 10)? Give a decimal to two places.",
    answerKey: 1.35,
    tolerance: 0.01,
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 100,
    prereqClosure: ["logistic-regression", "bernoulli-binomial", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "logistic-regression--explain-natural-parameter",
    conceptId: "logistic-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Logistic regression is often introduced by simply asserting that it models the log-odds. Explain why " +
      "the log-odds specifically — rather than some other transformation — is the natural quantity to model " +
      "linearly.",
    rubric: {
      elements: [
        {
          id: "logit-is-natural-parameter",
          description:
            "States that the logit η(θ) = ln(θ/(1 − θ)) is the natural parameter of the Bernoulli distribution written in exponential-family form.",
          weight: 4,
          required: true,
          misconception: {
            id: "logit-choice-called-arbitrary",
            description:
              "Presents the logit as one convenient transformation among many rather than as the distribution's own natural parameter.",
            blameConceptId: "logistic-regression",
          },
        },
        {
          id: "linear-in-natural-parameter",
          description:
            "Explains that logistic regression models exactly this natural parameter as linear in X, so a one-unit change in Xⱼ adds βⱼ to it — a coefficient interpretation that falls directly out of the exponential-family structure rather than being a fresh convention.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.76,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["logistic-regression", "bernoulli-binomial", "mle"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "logistic-regression--explain-perfect-separation",
    conceptId: "logistic-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A logistic fit reports enormous coefficients, enormous standard errors, and a convergence warning. " +
      "Diagnose what happened and why the likelihood behaves this way.",
    rubric: {
      elements: [
        {
          id: "diagnoses-separation",
          description:
            "Diagnoses perfect (or near-perfect) separation: some linear combination of the predictors separates the two classes exactly.",
          weight: 3,
          required: true,
          misconception: {
            id: "large-coefficients-blamed-on-bug",
            description:
              "Attributes the symptom to a software error rather than to a genuine feature of the data and the likelihood.",
            blameConceptId: "logistic-regression",
          },
        },
        {
          id: "likelihood-unbounded",
          description:
            "Explains that pushing the coefficients toward infinity along the separating direction keeps increasing the likelihood without bound, so no finite maximiser exists.",
          weight: 3,
          required: true,
        },
        {
          id: "remedy",
          description:
            "Names a remedy — a penalised (ridge-type) fit, or Firth's bias-reduced logistic regression.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["logistic-regression", "mle", "bernoulli-binomial"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "logistic-regression--transfer-unbounded-linear-predictor",
    conceptId: "logistic-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain why ordinary linear regression is a poor choice for modelling P(Y = 1 | X) directly, and how " +
      "the sigmoid link solves that specific problem without changing the linear predictor itself.",
    rubric: {
      elements: [
        {
          id: "unbounded-output",
          description:
            "Explains that a linear function's output is unbounded, so for extreme predictor values it predicts probabilities below 0 or above 1 — nonsensical, not merely inaccurate.",
          weight: 4,
          required: true,
          misconception: {
            id: "linear-probability-model-defended-as-approximation",
            description:
              "Treats the linear model as a minor approximation issue rather than as producing values outside the valid range for a probability.",
            blameConceptId: "logistic-regression",
          },
        },
        {
          id: "link-preserves-linear-predictor",
          description:
            "States that the sigmoid squashes xᵀβ into (0, 1) while xᵀβ itself is left completely unconstrained, so the same linear machinery is reused — only the connection to the mean has changed.",
          weight: 3,
          required: true,
        },
        {
          id: "cross-entropy-parallel",
          description:
            "Notes this is the same problem a link function solves generally, echoing the role a proper loss function plays for the same reason in the ML sweep.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.26,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["logistic-regression", "bernoulli-binomial", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "logistic-regression--transfer-odds-ratio-not-risk-ratio",
    conceptId: "logistic-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A news article reports 'the drug triples the odds of recovery' based on a logistic regression odds " +
      "ratio of 3, and a reader restates this as 'patients are three times more likely to recover'. Say " +
      "whether that restatement is accurate, and under what condition it would be closer to correct.",
    rubric: {
      elements: [
        {
          id: "distinguishes-odds-from-risk",
          description:
            "Explains that an odds ratio of 3 is not generally the same as a threefold increase in probability (risk ratio), and shows or states that the two coincide only when the baseline probability is small.",
          weight: 4,
          required: true,
          misconception: {
            id: "odds-ratio-equated-with-risk-ratio",
            description:
              "Treats 'three times the odds' and 'three times as likely' as interchangeable, which is the standard misreading of an odds ratio.",
            blameConceptId: "logistic-regression",
          },
        },
        {
          id: "rare-outcome-condition",
          description:
            "States the condition under which the restatement becomes approximately accurate: the outcome is rare, so odds and probability nearly coincide.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["logistic-regression", "bernoulli-binomial"],
    source: AUTHORED,
    status: "live",
  },

  // --- Probit Regression ------------------------------------------------------
  {
    id: "probit-regression--recall-link",
    conceptId: "probit-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Probit regression's link function is:",
    choices: [
      { id: "a", text: "Φ(Xβ), the standard normal CDF applied to the linear predictor", correct: true },
      {
        id: "b",
        text: "1/(1 + e^(−Xβ)), the logistic sigmoid",
        correct: false,
        misconception: {
          id: "sigmoid-called-probit-link",
          description:
            "Describes logistic regression's link. Probit replaces it with the normal CDF, which is what makes the two models close but not identical.",
          blameConceptId: "probit-regression",
        },
      },
      {
        id: "c",
        text: "The identity link, μ = Xβ",
        correct: false,
        misconception: {
          id: "probit-confused-with-linear-model",
          description:
            "Describes the identity link used in ordinary linear regression, which is unbounded and unsuitable for a probability.",
          blameConceptId: "probit-regression",
        },
      },
      {
        id: "d",
        text: "φ(Xβ), the standard normal density applied to the linear predictor",
        correct: false,
        misconception: {
          id: "density-used-instead-of-cdf",
          description:
            "Uses the normal density rather than its CDF. A density is not bounded in [0, 1] and is not monotone, so it cannot serve as a probability link.",
          blameConceptId: "probit-regression",
        },
      },
    ],
    difficulty: 0.29,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["probit-regression", "normal-distribution", "logistic-regression"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--recall-comparison-to-logit",
    conceptId: "probit-regression",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements comparing logistic and probit regression are correct? Select all that apply.",
    choices: [
      { id: "a", text: "The two typically give very similar predicted probabilities on most datasets", correct: true },
      { id: "b", text: "Probit coefficients lack a simple odds-ratio interpretation", correct: true },
      { id: "c", text: "The logistic distribution has heavier tails than the standard normal", correct: true },
      {
        id: "d",
        text: "The two models always give identical predictions",
        correct: false,
        misconception: {
          id: "logit-probit-called-identical",
          description:
            "Overstates the similarity. The two curves have different tail behaviour and can diverge for extreme predictor values.",
          blameConceptId: "probit-regression",
        },
      },
      {
        id: "e",
        text: "Probit is always the statistically superior choice",
        correct: false,
        misconception: {
          id: "one-model-declared-superior",
          description:
            "Treats the choice as a matter of statistical quality rather than of convention, interpretability, and whether a latent-normal story fits the application.",
          blameConceptId: "probit-regression",
        },
      },
    ],
    difficulty: 0.59,
    discrimination: 1.5,
    expectedSeconds: 70,
    prereqClosure: ["probit-regression", "normal-distribution", "logistic-regression"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--apply-latent-threshold",
    conceptId: "probit-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Under the latent-variable derivation Y* = Xβ + ε with ε ~ Normal(0, 1) and Y = 1 when Y* > 0, an " +
      "observation has Xβ = 1.5. What is P(Y = 1 | X)? Give a decimal to four places. (Φ(1.5) ≈ 0.9332.)",
    answerKey: 0.9332,
    tolerance: 0.002,
    difficulty: 1.09,
    discrimination: 1.5,
    expectedSeconds: 100,
    prereqClosure: ["probit-regression", "normal-distribution"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--apply-coefficient-rescaling",
    conceptId: "probit-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A logistic coefficient of 1.0 corresponds to roughly a probit coefficient of 1.0/1.81 (the standard " +
      "deviation of the logistic distribution). Give the approximate probit-scale value, to two decimal places.",
    answerKey: 0.55,
    tolerance: 0.02,
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["probit-regression", "normal-distribution", "logistic-regression"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--explain-latent-variable-derivation",
    conceptId: "probit-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Derive the probit model from a latent continuous variable crossing a threshold, and explain why this " +
      "derivation gives probit an interpretation that logistic regression's link does not straightforwardly " +
      "share.",
    rubric: {
      elements: [
        {
          id: "threshold-crossing-setup",
          description:
            "States the setup: Y* = xᵀβ + ε with ε ~ Normal(0, 1), and Y = 1 exactly when Y* exceeds a threshold (taken as 0).",
          weight: 3,
          required: true,
          misconception: {
            id: "probit-asserted-not-derived",
            description:
              "States the probit formula without deriving it from the threshold-crossing story.",
            blameConceptId: "probit-regression",
          },
        },
        {
          id: "derives-probability",
          description:
            "Shows P(Y = 1 | x) = P(ε > −xᵀβ) = P(ε < xᵀβ) = Φ(xᵀβ), using the symmetry of the standard normal.",
          weight: 3,
          required: true,
        },
        {
          id: "interpretive-payoff",
          description:
            "Explains the interpretive payoff: fields with a genuine underlying continuous quantity — economic utility, biological tolerance — get a natural reading from this derivation that a purely empirical link choice would not supply.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.79,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["probit-regression", "normal-distribution"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--explain-variance-normalisation",
    conceptId: "probit-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "In the latent-variable derivation, why must Var(ε) be fixed at exactly 1, and what does this explain " +
      "about the relationship between logistic and probit coefficients on the same data?",
    rubric: {
      elements: [
        {
          id: "scale-unidentifiable",
          description:
            "Explains that only the sign of Y* is observed, so scaling both β and ε by the same constant leaves every observable probability unchanged — the scale of the latent variable is unidentifiable and must be fixed by convention.",
          weight: 4,
          required: true,
          misconception: {
            id: "variance-fixed-arbitrarily",
            description:
              "Treats Var(ε) = 1 as an arbitrary convenience rather than as a necessary normalisation to make the model identifiable at all.",
            blameConceptId: "probit-regression",
          },
        },
        {
          id: "explains-coefficient-ratio",
          description:
            "Connects this to the standard logistic distribution's larger variance (π²/3 ≈ 3.29), explaining why logistic coefficients on the same data run roughly 1.6–1.8 times larger than probit ones, with nothing substantive behind the difference.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["probit-regression", "normal-distribution", "logistic-regression"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--transfer-when-similarity-breaks",
    conceptId: "probit-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Logistic and probit regression usually give nearly identical fitted probabilities. Explain where in the " +
      "predictor space the two models are most likely to disagree, and why.",
    rubric: {
      elements: [
        {
          id: "tail-behaviour",
          description:
            "Identifies the extreme tails — predicted probabilities near 0 or 1 — as where the models diverge most, because the logistic distribution has heavier tails than the standard normal.",
          weight: 4,
          required: true,
          misconception: {
            id: "models-treated-as-identical-everywhere",
            description:
              "Claims the two models are interchangeable everywhere, missing that their agreement is a central-region phenomenon.",
            blameConceptId: "probit-regression",
          },
        },
        {
          id: "practical-consequence",
          description:
            "Notes the practical consequence: predictions for extreme cases, or extrapolation beyond the observed predictor range, are exactly where the model choice starts to matter.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.29,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["probit-regression", "normal-distribution", "logistic-regression"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--transfer-default-choice",
    conceptId: "probit-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Given that the two models make nearly identical predictions in practice, argue for logistic regression " +
      "as the default choice, and describe a specific situation where you would choose probit instead.",
    rubric: {
      elements: [
        {
          id: "logit-default-justification",
          description:
            "Argues for logistic as the default on the strength of its concrete, communicable odds-ratio interpretation, given that predictions are usually nearly the same either way.",
          weight: 3,
          required: true,
          misconception: {
            id: "choice-treated-as-arbitrary",
            description:
              "Treats the choice as a coin flip with no basis, rather than weighing interpretability against a substantive derivation.",
            blameConceptId: "probit-regression",
          },
        },
        {
          id: "probit-exception",
          description:
            "Gives a concrete case for probit — a discrete-choice or item-response setting where a latent normal variable is part of the theory, or where matching an existing literature's convention matters.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.29,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["probit-regression", "logistic-regression", "normal-distribution"],
    source: BISHOP_PRML,
    status: "live",
  },

  // --- Generalized Linear Model (GLM) -----------------------------------------
  {
    id: "glm--recall-three-parts",
    conceptId: "glm",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The three components of the GLM framework are:",
    choices: [
      {
        id: "a",
        text: "A response distribution from the exponential family, a linear predictor, and a link function connecting them",
        correct: true,
      },
      {
        id: "b",
        text: "A loss function, a regulariser, and an optimiser",
        correct: false,
        misconception: {
          id: "glm-parts-confused-with-ml-training-parts",
          description:
            "Names the ingredients of a generic training pipeline rather than the specific statistical structure a GLM specifies.",
          blameConceptId: "glm",
        },
      },
      {
        id: "c",
        text: "A training set, a validation set, and a test set",
        correct: false,
        misconception: {
          id: "glm-parts-confused-with-data-splits",
          description:
            "Names data partitions, which have nothing to do with what defines the model itself.",
          blameConceptId: "glm",
        },
      },
      {
        id: "d",
        text: "A prior, a likelihood, and a posterior",
        correct: false,
        misconception: {
          id: "glm-parts-confused-with-bayesian-vocabulary",
          description:
            "Reaches for Bayesian vocabulary. The classical GLM framework is defined without reference to a prior at all.",
          blameConceptId: "glm",
        },
      },
    ],
    difficulty: 0.31,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["glm", "logistic-regression", "exponential-family"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--recall-match-response-to-method",
    conceptId: "glm",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which response distribution / link pairs correctly describe a named GLM? Select all that apply.",
    choices: [
      { id: "a", text: "Normal with an identity link gives ordinary linear regression", correct: true },
      { id: "b", text: "Bernoulli with a logit link gives logistic regression", correct: true },
      { id: "c", text: "Poisson with a log link gives Poisson regression for counts", correct: true },
      {
        id: "d",
        text: "Every GLM uses the identity link, differing only in the response distribution",
        correct: false,
        misconception: {
          id: "link-assumed-always-identity",
          description:
            "Misses that the link is chosen to respect the mean's valid range, which is why Bernoulli and Poisson responses need a different link from Normal.",
          blameConceptId: "glm",
        },
      },
      {
        id: "e",
        text: "Linear, logistic and Poisson regression are actually the same model under different names",
        correct: false,
        misconception: {
          id: "shared-framework-collapsed-into-one-model",
          description:
            "Confuses sharing a fitting framework with being the same model. The response distributions and predictions genuinely differ.",
          blameConceptId: "glm",
        },
      },
    ],
    difficulty: 0.61,
    discrimination: 1.5,
    expectedSeconds: 70,
    prereqClosure: ["glm", "logistic-regression", "exponential-family"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--apply-poisson-effect",
    conceptId: "glm",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A Poisson regression with a log link has a coefficient of 0.25 on an indicator for a promotion. By what " +
      "multiplicative factor does the promotion change the expected count, e^0.25? Give a decimal to three " +
      "places.",
    answerKey: 1.284,
    tolerance: 0.005,
    difficulty: 1.11,
    discrimination: 1.5,
    expectedSeconds: 100,
    prereqClosure: ["glm", "exponential-family"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--apply-identify-link",
    conceptId: "glm",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A model of hospital length of stay (a positive, right-skewed count-like outcome) is fitted as a GLM " +
      "with a gamma response and reports coefficients that, when exponentiated, give multiplicative effects on " +
      "the mean. Which link was almost certainly used?",
    choices: [
      { id: "a", text: "The log link", correct: true },
      {
        id: "b",
        text: "The identity link",
        correct: false,
        misconception: {
          id: "identity-link-misread-from-exponentiated-coefficients",
          description:
            "An identity link would make the coefficients additive on the mean directly, not multiplicative after exponentiating.",
          blameConceptId: "glm",
        },
      },
      {
        id: "c",
        text: "The logit link",
        correct: false,
        misconception: {
          id: "logit-link-applied-to-unbounded-positive-response",
          description:
            "The logit link is for a response in (0, 1); a length-of-stay outcome has no upper bound of 1 to respect.",
          blameConceptId: "glm",
        },
      },
      {
        id: "d",
        text: "There is not enough information to tell",
        correct: false,
        misconception: {
          id: "multiplicative-signature-not-recognised",
          description:
            "Misses that exponentiated coefficients giving multiplicative effects on the mean is exactly the signature of a log link.",
          blameConceptId: "glm",
        },
      },
    ],
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["glm", "exponential-family"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--explain-exponential-family-essential",
    conceptId: "glm",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Why is restricting the GLM framework to exponential-family response distributions essential to what " +
      "makes it useful, rather than an incidental restriction?",
    rubric: {
      elements: [
        {
          id: "natural-parameter-recalled",
          description:
            "Recalls that the exponential family's natural parameter η(θ) is what the canonical link connects the linear predictor to.",
          weight: 3,
          required: true,
          misconception: {
            id: "restriction-called-arbitrary",
            description:
              "Treats the exponential-family requirement as a historical convention rather than as what makes a single fitting algorithm possible.",
            blameConceptId: "exponential-family",
          },
        },
        {
          id: "one-algorithm-payoff",
          description:
            "Explains that this structure is exactly what lets one generic fitting algorithm — iteratively reweighted least squares — work for any member of the family, without distribution-specific code.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.81,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["glm", "exponential-family", "logistic-regression"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--explain-overdispersion",
    conceptId: "glm",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A Poisson regression's residual deviance is much larger than its residual degrees of freedom. Diagnose " +
      "the problem and describe two remedies.",
    rubric: {
      elements: [
        {
          id: "diagnoses-overdispersion",
          description:
            "Diagnoses overdispersion: the Poisson distribution forces Var(Y) = μ, and real count data is usually more variable than that.",
          weight: 3,
          required: true,
          misconception: {
            id: "large-deviance-ratio-ignored",
            description:
              "Reports the mismatch without identifying what it means — that the assumed mean-variance relationship has failed.",
            blameConceptId: "glm",
          },
        },
        {
          id: "consequence",
          description:
            "States the consequence: standard errors are too small and coefficients look spuriously significant.",
          weight: 2,
          required: true,
        },
        {
          id: "two-remedies",
          description:
            "Names two remedies — quasi-Poisson (inflating the standard errors by an estimated dispersion) and negative binomial (an explicit extra dispersion parameter) — or a zero-inflated model if the excess is concentrated at zero.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: ["glm", "exponential-family"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--transfer-swap-the-distribution",
    conceptId: "glm",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A team has a working linear regression pipeline and now needs to model a strictly positive, right-" +
      "skewed cost outcome instead. Using the GLM framework, describe what changes and what stays the same, " +
      "and say why this is a small change rather than starting over.",
    rubric: {
      elements: [
        {
          id: "identifies-what-changes",
          description:
            "Identifies the two things that change: the response distribution (to gamma, say) and the link (to log, respecting the positive range).",
          weight: 3,
          required: true,
        },
        {
          id: "identifies-what-stays",
          description:
            "Identifies what stays the same: the linear predictor xᵀβ, the overall fitting algorithm, and the general shape of diagnostics (deviance, AIC).",
          weight: 3,
          required: true,
          misconception: {
            id: "new-response-treated-as-new-model-class",
            description:
              "Treats a different response type as requiring an entirely new modelling approach, missing that the GLM framework already generalises to it.",
            blameConceptId: "glm",
          },
        },
        {
          id: "small-change-argument",
          description:
            "Argues this is a small, structured change rather than starting over, because the framework was built precisely to make swapping the response a routine operation.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.31,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["glm", "exponential-family", "logistic-regression"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--transfer-sharing-structure-not-identity",
    conceptId: "glm",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A student says 'linear, logistic and Poisson regression are all really the same model since they share " +
      "the GLM structure.' Evaluate this claim precisely.",
    rubric: {
      elements: [
        {
          id: "structure-shared-not-model",
          description:
            "Distinguishes sharing a three-part structure (response family, linear predictor, link) from being the same model — the response distributions and hence the predictions and likelihoods genuinely differ.",
          weight: 4,
          required: true,
          misconception: {
            id: "shared-framework-collapsed-into-sameness",
            description:
              "Accepts the claim that a common framework makes the models identical, which the framework does nothing to establish.",
            blameConceptId: "glm",
          },
        },
        {
          id: "concrete-difference",
          description:
            "Gives a concrete way they differ — logistic regression cannot predict a value outside [0, 1], Poisson regression cannot predict a negative count, and swapping one model's fitted response for another's would be nonsensical.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.31,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["glm", "exponential-family", "logistic-regression"],
    source: BISHOP_PRML,
    status: "live",
  },

  // --- Cox Proportional Hazards Model -----------------------------------------
  {
    id: "cox-proportional-hazards-model--recall-hazard-function",
    conceptId: "cox-proportional-hazards-model",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The Cox model's hazard function is:",
    choices: [
      { id: "a", text: "h(t | x) = h₀(t)·exp(xᵀβ) — a baseline hazard times a covariate-dependent factor", correct: true },
      {
        id: "b",
        text: "h(t | x) = h₀(t) + xᵀβ, additive in the covariates",
        correct: false,
        misconception: {
          id: "cox-model-made-additive",
          description:
            "Uses an additive form. The Cox model is multiplicative on the hazard scale, which is what makes hazard ratios time-invariant.",
          blameConceptId: "cox-proportional-hazards-model",
        },
      },
      {
        id: "c",
        text: "h(t | x) = exp(xᵀβ), with no dependence on t at all",
        correct: false,
        misconception: {
          id: "baseline-hazard-dropped",
          description:
            "Drops the baseline hazard entirely, which is what carries all the time-dependence the model allows to be completely unspecified.",
          blameConceptId: "cox-proportional-hazards-model",
        },
      },
      {
        id: "d",
        text: "h(t | x) = h₀(t)ˣᵝ, an exponent rather than a multiplicative factor",
        correct: false,
        misconception: {
          id: "covariate-effect-placed-as-exponent",
          description:
            "Places xᵀβ as an exponent on the baseline hazard rather than as the exponent of e in a multiplicative factor.",
          blameConceptId: "cox-proportional-hazards-model",
        },
      },
    ],
    difficulty: 0.32,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["cox-proportional-hazards-model", "glm"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--recall-proportional-hazards-meaning",
    conceptId: "cox-proportional-hazards-model",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The 'proportional hazards' assumption means:",
    choices: [
      {
        id: "a",
        text: "The hazard ratio between two individuals with different covariates stays constant over time",
        correct: true,
      },
      {
        id: "b",
        text: "The hazard itself is constant over time for every individual",
        correct: false,
        misconception: {
          id: "proportionality-confused-with-constant-hazard",
          description:
            "Describes a constant baseline hazard specifically — the exponential survival model — not the proportionality assumption that names the Cox model.",
          blameConceptId: "cox-proportional-hazards-model",
        },
      },
      {
        id: "c",
        text: "Every covariate has the same effect on the hazard",
        correct: false,
        misconception: {
          id: "proportionality-confused-with-equal-effects",
          description:
            "Describes coefficients being equal to each other, which has nothing to do with the model's structural assumption about time.",
          blameConceptId: "cox-proportional-hazards-model",
        },
      },
      {
        id: "d",
        text: "Survival probabilities are the same for every individual",
        correct: false,
        misconception: {
          id: "proportionality-confused-with-equal-survival",
          description:
            "Describes identical outcomes for everyone, which contradicts the entire purpose of including covariates.",
          blameConceptId: "cox-proportional-hazards-model",
        },
      },
    ],
    difficulty: 0.62,
    discrimination: 1.5,
    expectedSeconds: 50,
    prereqClosure: ["cox-proportional-hazards-model", "glm"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--apply-hazard-ratio",
    conceptId: "cox-proportional-hazards-model",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A Cox model reports a coefficient of 0.4 on a treatment indicator. What is the hazard ratio, e^0.4? " +
      "Give a decimal to three places.",
    answerKey: 1.492,
    tolerance: 0.005,
    difficulty: 1.12,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["cox-proportional-hazards-model", "glm"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--apply-risk-set-size",
    conceptId: "cox-proportional-hazards-model",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A trial follows 80 patients. By the time of the 15th event, 6 patients have already had the event and " +
      "9 have been censored before that time. How many patients are in the risk set for the 15th event, " +
      "including the one who fails? Give a whole number.",
    answerKey: 65,
    tolerance: 0.001,
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["cox-proportional-hazards-model"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--explain-partial-likelihood",
    conceptId: "cox-proportional-hazards-model",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Explain how the partial likelihood eliminates the unknown baseline hazard h₀(t), and why this is what " +
      "makes the model semi-parametric.",
    rubric: {
      elements: [
        {
          id: "conditional-probability-setup",
          description:
            "States that at each observed event time, the partial likelihood asks: given that someone in the current risk set failed right now, what is the probability it was this particular subject?",
          weight: 3,
          required: true,
          misconception: {
            id: "partial-likelihood-asserted",
            description:
              "States the partial likelihood formula without explaining what conditional question it is answering.",
            blameConceptId: "cox-proportional-hazards-model",
          },
        },
        {
          id: "h0-cancels",
          description:
            "Shows that h₀(t) appears identically in every subject's hazard at that instant, so it appears in both the numerator and every term of the denominator and cancels exactly.",
          weight: 3,
          required: true,
        },
        {
          id: "semi-parametric-conclusion",
          description:
            "Concludes that because h₀(t) never needs to be specified or estimated to fit β, the model is parametric in the covariate effects and nonparametric in time — semi-parametric.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.82,
    discrimination: 1.7,
    expectedSeconds: 270,
    prereqClosure: ["cox-proportional-hazards-model", "glm"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--explain-censoring-handled-natively",
    conceptId: "cox-proportional-hazards-model",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain how the Cox model's likelihood uses information from a censored subject, and why this differs " +
      "from how ordinary regression would treat the same case.",
    rubric: {
      elements: [
        {
          id: "censored-subject-in-risk-set",
          description:
            "Explains that a subject censored at time t remains in the risk set for every event before t, so their continued survival up to that point genuinely informs which other subjects could have failed instead.",
          weight: 4,
          required: true,
          misconception: {
            id: "censored-subjects-treated-as-discarded",
            description:
              "Assumes censored subjects contribute nothing, missing that they enter the risk-set denominators up until they drop out.",
            blameConceptId: "cox-proportional-hazards-model",
          },
        },
        {
          id: "contrast-with-ordinary-regression",
          description:
            "Contrasts this with ordinary regression, which has no natural way to represent 'known to exceed t but otherwise unknown' and would either discard the case or mistreat the censoring time as the true event time.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.82,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["cox-proportional-hazards-model"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--transfer-fading-treatment-effect",
    conceptId: "cox-proportional-hazards-model",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A drug halves the hazard in the first year of a trial and has essentially no effect afterward. A single " +
      "Cox model fitted to the whole follow-up period reports a hazard ratio of about 0.7. Explain why that " +
      "single number is misleading here, and how you would detect and address the problem.",
    rubric: {
      elements: [
        {
          id: "violates-proportionality",
          description:
            "Explains that the true hazard ratio is not constant over time — around 0.5 early and around 1.0 later — so the proportional-hazards assumption is violated and a single β estimates a weighted average that describes neither period well.",
          weight: 4,
          required: true,
          misconception: {
            id: "single-hazard-ratio-treated-as-adequate",
            description:
              "Reports the single fitted hazard ratio as a full description of the treatment effect, without checking whether it is stable over time.",
            blameConceptId: "cox-proportional-hazards-model",
          },
        },
        {
          id: "detection",
          description:
            "Names a detection method — Schoenfeld residuals plotted against time, which would show a trend rather than a flat scatter.",
          weight: 2,
          required: true,
        },
        {
          id: "remedy",
          description:
            "Names a remedy — a time-varying coefficient, or splitting follow-up into intervals and fitting the effect separately in each.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.32,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["cox-proportional-hazards-model", "glm"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--transfer-glm-structure-retained",
    conceptId: "cox-proportional-hazards-model",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The Cox model is described as semi-parametric, relaxing one of the assumptions the GLM framework " +
      "otherwise requires. Explain what is relaxed and what structural piece of the GLM framework is retained.",
    rubric: {
      elements: [
        {
          id: "relaxed-piece",
          description:
            "Identifies that the fully-parametric response distribution assumption GLMs require is relaxed — h₀(t) is left completely unspecified.",
          weight: 3,
          required: true,
        },
        {
          id: "retained-piece",
          description:
            "Identifies that the linear predictor xᵀβ and a log-link-style multiplicative structure — exp(xᵀβ) scaling the baseline — are both retained, preserving the 'linear predictor through a link' pattern.",
          weight: 4,
          required: true,
          misconception: {
            id: "semi-parametric-treated-as-unrelated-to-glm",
            description:
              "Treats the Cox model as disconnected from the GLM framework rather than as one specific, principled relaxation of it.",
            blameConceptId: "cox-proportional-hazards-model",
          },
        },
      ],
    },
    difficulty: 2.32,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["cox-proportional-hazards-model", "glm"],
    source: SINGER_WILLETT,
    status: "live",
  },
];
