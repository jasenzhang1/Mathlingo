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

  // ===========================================================================
  // Doubling pass — additional items per concept
  // ===========================================================================

  // --- Mixed Effect Models -----------------------------------------------------
  {
    id: "mixed-effect-models--recall-random-intercept-meaning",
    conceptId: "mixed-effect-models",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The random intercept in a random-intercept model represents:",
    choices: [
      { id: "a", text: "each group's deviation from the overall (fixed-effect) intercept, drawn from a shared distribution", correct: true },
      {
        id: "b",
        text: "a separate fixed coefficient estimated independently per group, with no shared distribution linking them",
        correct: false,
        misconception: {
          id: "random-intercept-confused-with-per-group-fixed-effect",
          description:
            "That describes a fixed effect per group (like a dummy variable per group), which shares no distribution across groups — the defining feature of a random intercept.",
          blameConceptId: "mixed-effect-models",
        },
      },
      {
        id: "c",
        text: "the residual (within-group) variance",
        correct: false,
        misconception: {
          id: "random-intercept-confused-with-residual-variance",
          description: "The random intercept captures between-group differences in baseline level; residual variance is a separate, within-group quantity.",
          blameConceptId: "mixed-effect-models",
        },
      },
      {
        id: "d",
        text: "the correlation between two random effects",
        correct: false,
        misconception: {
          id: "random-intercept-confused-with-correlation",
          description: "A correlation between random effects is a separate parameter that only arises once a model has more than one random effect.",
          blameConceptId: "mixed-effect-models",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["mixed-effect-models"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--recall-intercept-vs-slope",
    conceptId: "mixed-effect-models",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Distinguish a 'random intercept' from a 'random slope' in one sentence each.",
    rubric: {
      elements: [
        {
          id: "definitions",
          description: "A random intercept lets each group have its own baseline level; a random slope lets each group have its own effect (strength of relationship) for a given predictor.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -1.2,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["mixed-effect-models"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--apply-icc-alternate-values",
    conceptId: "mixed-effect-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A random-intercept model estimates between-group variance τ² = 4 and within-group variance σ² = 16. What is the intraclass correlation, τ²/(τ² + σ²)? Give a decimal to two places.",
    answerKey: 0.2,
    tolerance: 0.01,
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["mixed-effect-models", "sample-variance"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--apply-effective-n-alternate",
    conceptId: "mixed-effect-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A dataset has 300 observations: 30 groups with 10 observations each, and the intraclass correlation is " +
      "0.3. Using n_eff ≈ n / (1 + (m − 1)·ICC), what is the effective sample size? Give a whole number.",
    answerKey: 81,
    tolerance: 1,
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["mixed-effect-models", "sample-mean", "sample-variance"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--explain-reml-vs-ml",
    conceptId: "mixed-effect-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why maximum likelihood estimates of the variance components in a mixed model are biased downward " +
      "in small samples, and what remedy is standard.",
    rubric: {
      elements: [
        {
          id: "ml-bias-cause",
          description:
            "ML estimates of variance components do not account for the loss of degrees of freedom from estimating the fixed effects first, so they are biased downward, especially with few groups.",
          weight: 4,
          required: true,
        },
        {
          id: "reml-remedy",
          description:
            "Standard remedy: restricted maximum likelihood (REML), which corrects for this by estimating the variance components after accounting for the fixed effects.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["mixed-effect-models"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--explain-boundary-variance-estimate",
    conceptId: "mixed-effect-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A random-intercept model with very few groups (say, 4) is fit, and the estimated between-group variance " +
      "τ² is reported as exactly 0. Explain why this outcome is common with few groups, and why it does not " +
      "necessarily mean there is truly no group effect.",
    rubric: {
      elements: [
        {
          id: "boundary-estimation-artifact",
          description:
            "With only a handful of groups there is very little information to estimate a between-group variance precisely, and the estimator is bounded at zero, so a small true τ² is frequently estimated as exactly the boundary value 0 rather than a small positive number.",
          weight: 4,
          required: true,
        },
        {
          id: "not-evidence-of-no-effect",
          description:
            "This is a small-sample estimation artifact, not evidence the groups truly do not differ — a likelihood-ratio test against a model without the random effect, or a Bayesian approach with a weakly informative prior, handles the boundary problem more honestly.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["mixed-effect-models"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--transfer-crossed-effects",
    conceptId: "mixed-effect-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A crossed random-effects design has both 'student' and 'teacher' as separate grouping factors that are " +
      "not nested (many students see many teachers, and vice versa). Explain how this differs structurally from " +
      "the nested student-within-school design, and why a single random intercept per school would misrepresent " +
      "this structure.",
    rubric: {
      elements: [
        {
          id: "crossed-vs-nested",
          description:
            "In crossed effects, membership in one factor does not determine membership in the other (a student can have any teacher), unlike nesting where every student belongs to exactly one school — so the model needs two separate random intercepts (one for student, one for teacher), not one nested hierarchy.",
          weight: 5,
          required: true,
        },
        {
          id: "single-intercept-misrepresents",
          description:
            "Forcing a single nested random intercept would either ignore one factor's variation entirely or falsely assume every student saw only one teacher, misattributing variance to the wrong source.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["mixed-effect-models"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },
  {
    id: "mixed-effect-models--transfer-mixed-model-does-not-fix-cv-leakage",
    conceptId: "mixed-effect-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A colleague argues: 'since a mixed model already accounts for group correlation, I no longer need to " +
      "worry about which observations came from the same subject when reporting my final results.' Evaluate " +
      "this claim, distinguishing what the model itself handles from what still needs care when reporting or " +
      "validating results.",
    rubric: {
      elements: [
        {
          id: "model-handles-inference-not-validation",
          description:
            "The mixed model's variance components correctly account for within-group correlation in the fitted parameter estimates and their standard errors, but this does not automatically fix downstream steps like cross-validation: a naive random split can still put observations from the same subject into both train and test, leaking information.",
          weight: 5,
          required: true,
        },
        {
          id: "group-aware-splitting-still-needed",
          description: "Group structure must still be respected explicitly when splitting data for validation (e.g. group k-fold), even though the model's own inference already accounts for it.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["mixed-effect-models"],
    source: VERBEKE_MOLENBERGHS,
    status: "live",
  },

  // --- Logistic Regression -----------------------------------------------------
  {
    id: "logistic-regression--recall-linear-decision-boundary",
    conceptId: "logistic-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The decision boundary implied by logistic regression (classify as 1 if P(Y=1|X) > 0.5) is:",
    choices: [
      { id: "a", text: "linear in X, since P > 0.5 corresponds exactly to Xβ > 0", correct: true },
      {
        id: "b",
        text: "always curved, because the sigmoid function itself is nonlinear",
        correct: false,
        misconception: {
          id: "boundary-thought-curved-because-sigmoid-nonlinear",
          description: "The sigmoid is nonlinear, but the set of points where it crosses 0.5 is exactly Xβ = 0, which is linear.",
          blameConceptId: "logistic-regression",
        },
      },
      {
        id: "c",
        text: "undefined, since logistic regression produces probabilities, not an explicit decision rule",
        correct: false,
        misconception: {
          id: "boundary-thought-undefined",
          description: "A threshold on the predicted probability induces a perfectly well-defined decision boundary, exactly like any other classifier.",
          blameConceptId: "logistic-regression",
        },
      },
      {
        id: "d",
        text: "quadratic in X",
        correct: false,
        misconception: {
          id: "boundary-thought-quadratic",
          description: "Nothing in the plain logistic model introduces a quadratic term; the boundary is linear unless quadratic terms are explicitly added as predictors.",
          blameConceptId: "logistic-regression",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["logistic-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "logistic-regression--recall-deviance",
    conceptId: "logistic-regression",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What role does the deviance play in evaluating a fitted logistic regression model, and how does it relate to the log-likelihood?",
    rubric: {
      elements: [
        {
          id: "deviance-definition",
          description: "Deviance is −2 times the log-likelihood (relative to a saturated model), summarising lack of fit; smaller deviance means a better-fitting model.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -1.1,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["logistic-regression", "mle"],
    source: ISLR,
    status: "live",
  },
  {
    id: "logistic-regression--apply-sigmoid-negative",
    conceptId: "logistic-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For an observation with Xβ = −1, what is the predicted P(Y = 1 | X)? Give a decimal to four places.",
    answerKey: 0.2689,
    tolerance: 0.001,
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["logistic-regression", "bernoulli-binomial"],
    source: ISLR,
    status: "live",
  },
  {
    id: "logistic-regression--apply-odds-ratio-single-coefficient",
    conceptId: "logistic-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A logistic regression coefficient on a binary treatment indicator is 0.7. What is the odds ratio for treated vs untreated, e^0.7? Give a decimal to two places.",
    answerKey: 2.01,
    tolerance: 0.01,
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["logistic-regression", "bernoulli-binomial"],
    source: ISLR,
    status: "live",
  },
  {
    id: "logistic-regression--explain-constant-logit-slope-varying-probability-slope",
    conceptId: "logistic-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why a logistic regression coefficient's sign tells you the direction of the effect on the " +
      "log-odds, but not, by itself, how large the effect on the predicted probability is at a particular point.",
    rubric: {
      elements: [
        {
          id: "constant-effect-on-logit",
          description: "The coefficient is the constant slope on the log-odds (logit) scale, so its sign correctly gives the direction of the effect on probability everywhere.",
          weight: 3,
          required: true,
        },
        {
          id: "varying-effect-on-probability",
          description:
            "The derivative of the sigmoid varies with the current probability — largest near p = 0.5 and near zero at the extremes — so the same one-unit change in X moves the probability by very different amounts depending on where the baseline probability sits, even though the log-odds always moves by exactly β.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["logistic-regression", "bernoulli-binomial"],
    source: ISLR,
    status: "live",
  },
  {
    id: "logistic-regression--explain-accuracy-vs-pseudo-r2",
    conceptId: "logistic-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A logistic regression model achieves 95% training accuracy but a McFadden's pseudo-R² of only 0.15. " +
      "Explain why accuracy and pseudo-R² can disagree this much, and which one is more informative here.",
    rubric: {
      elements: [
        {
          id: "accuracy-inflated-by-imbalance",
          description:
            "Accuracy can be high on an imbalanced dataset simply by predicting the majority class most of the time, regardless of how well the model actually explains the log-odds beyond a naive baseline.",
          weight: 4,
          required: true,
        },
        {
          id: "pseudo-r2-more-informative",
          description:
            "Pseudo-R² compares the fitted model's likelihood to a null (intercept-only) model, so a low value indicates the predictors add little explanatory power over guessing the base rate — on imbalanced data this is usually the more informative of the two.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["logistic-regression", "mle"],
    source: ISLR,
    status: "live",
  },
  {
    id: "logistic-regression--transfer-multicollinearity-vs-separation",
    conceptId: "logistic-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A hospital fits a logistic regression to predict readmission risk and finds a predictor with an " +
      "enormous coefficient and enormous standard error, similar to a perfect-separation symptom, but a data " +
      "check confirms no perfect separation exists. Give an alternative diagnosis and the check that would " +
      "distinguish it from separation.",
    rubric: {
      elements: [
        {
          id: "multicollinearity-diagnosis",
          description:
            "Alternative diagnosis: severe multicollinearity between that predictor and another already in the model, which inflates the variance of both coefficients' estimates without any single predictor perfectly separating the classes.",
          weight: 4,
          required: true,
        },
        {
          id: "vif-check",
          description:
            "Check: examine the variance inflation factor (or pairwise/partial correlations) among predictors, which would be large under multicollinearity but is a different diagnostic from checking for a perfectly separating linear combination directly.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["logistic-regression", "mle", "bernoulli-binomial"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "logistic-regression--transfer-interaction-needed-for-nonadditivity",
    conceptId: "logistic-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Logistic regression's log-odds are additive in the predictors by construction. Explain what this means " +
      "for how two predictors' effects combine, and describe what has to be added to the model if the two " +
      "predictors' effects are not actually additive on the log-odds scale (e.g. a drug's effect differs by sex).",
    rubric: {
      elements: [
        {
          id: "additivity-meaning",
          description:
            "Additivity means each predictor's estimated effect on the log-odds is assumed constant regardless of the level of the other predictors — the model has no way to represent one predictor changing the size of another's effect unless told to.",
          weight: 4,
          required: true,
        },
        {
          id: "interaction-term-needed",
          description:
            "If the true effects are not additive, an interaction term (the product of the two predictors) must be added explicitly; without it, the model reports an averaged effect that describes neither subgroup well.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["logistic-regression", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },

  // --- Probit Regression -----------------------------------------------------------
  {
    id: "probit-regression--recall-inverse-link-equals-linear-predictor",
    conceptId: "probit-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In probit regression, Φ⁻¹(P(Y = 1 | X)) equals:",
    choices: [
      { id: "a", text: "Xβ — the linear predictor directly, via the inverse of the normal CDF link", correct: true },
      {
        id: "b",
        text: "the log-odds, ln(P/(1 − P))",
        correct: false,
        misconception: {
          id: "inverse-link-confused-with-logit",
          description: "The log-odds is the logit link's inverse relationship, used by logistic regression — probit's link is the normal CDF, not the logit.",
          blameConceptId: "probit-regression",
        },
      },
      {
        id: "c",
        text: "P(Y = 1 | X) itself",
        correct: false,
        misconception: {
          id: "inverse-link-confused-with-probability",
          description: "Φ⁻¹ transforms the probability onto the linear-predictor scale; it is not the probability itself.",
          blameConceptId: "probit-regression",
        },
      },
      {
        id: "d",
        text: "the variance of the latent error term",
        correct: false,
        misconception: {
          id: "inverse-link-confused-with-latent-variance",
          description: "The latent error's variance is fixed at 1 by convention and is not what the inverse link computes.",
          blameConceptId: "probit-regression",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["probit-regression", "normal-distribution"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--recall-phi-vs-lowercase-phi",
    conceptId: "probit-regression",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State what Φ and φ each denote in the probit model, and which one is the actual link function.",
    rubric: {
      elements: [
        { id: "definitions", description: "Φ is the standard normal CDF; φ is the standard normal density (PDF).", weight: 3, required: true },
        { id: "which-is-link", description: "Φ, the CDF, is the link function; φ, the density, is not used as the link.", weight: 3, required: true },
      ],
    },
    difficulty: -1.1,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["probit-regression", "normal-distribution"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--apply-latent-threshold-positive",
    conceptId: "probit-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Under the latent-variable derivation, an observation has Xβ = 0.5. What is P(Y = 1 | X)? Give a decimal " +
      "to four places. (Φ(0.5) ≈ 0.6915.)",
    answerKey: 0.6915,
    tolerance: 0.002,
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["probit-regression", "normal-distribution"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--apply-latent-threshold-negative",
    conceptId: "probit-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Under the same setup, what is P(Y = 1 | X) at Xβ = −1.0? Give a decimal to four places. (Φ(−1.0) ≈ 0.1587.)",
    answerKey: 0.1587,
    tolerance: 0.002,
    difficulty: 0.85,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["probit-regression", "normal-distribution"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--explain-no-odds-ratio",
    conceptId: "probit-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why probit regression coefficients cannot be reported as odds ratios the way logistic regression coefficients can.",
    rubric: {
      elements: [
        {
          id: "odds-ratio-specific-to-logit",
          description:
            "An odds ratio is specific to the logit link, since exponentiating a logistic coefficient directly converts additivity on the log-odds into a multiplicative effect on the odds; the normal-CDF form has no equivalent closed-form transformation of its coefficients.",
          weight: 4,
          required: true,
        },
        {
          id: "marginal-effects-instead",
          description:
            "Probit coefficients are instead usually interpreted via marginal effects — the change in probability at a specific point, computed as φ(Xβ)·β — which depends on where Xβ is, unlike a single constant odds ratio.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["probit-regression", "normal-distribution"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--explain-marginal-effect-depends-on-point",
    conceptId: "probit-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The marginal effect of a predictor in probit regression is φ(Xβ)·β, which changes depending on the " +
      "value of Xβ. Explain why this makes 'the effect of X' an ambiguous phrase in a probit model unless a " +
      "reference point is specified.",
    rubric: {
      elements: [
        {
          id: "phi-peaks-at-zero",
          description:
            "Because φ(Xβ) is largest when Xβ ≈ 0 (probability near 0.5) and shrinks toward the extremes, the same coefficient β produces very different marginal effects on probability depending on whether the evaluation point is near the middle of the distribution or in a tail.",
          weight: 4,
          required: true,
        },
        {
          id: "needs-a-reference-point",
          description:
            "A single number 'the effect of X' is only meaningful once a specific evaluation point (e.g. the sample mean, or a particular subject's covariates) is fixed — unlike an odds ratio, which is the same everywhere on the log-odds scale.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["probit-regression", "normal-distribution"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--transfer-theoretical-vs-curve-fit-justification",
    conceptId: "probit-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A biostatistician chooses probit over logistic regression specifically because their outcome comes from " +
      "thresholding an assumed normally-distributed liability (e.g. disease-risk liability in genetics). Explain " +
      "how this justification differs from an argument based purely on curve fit, and what would undermine it.",
    rubric: {
      elements: [
        {
          id: "theoretical-not-empirical",
          description:
            "The justification is theoretical — a substantive claim about the data-generating process (an underlying continuous liability that is normally distributed and crosses a threshold) — not merely empirical curve-fitting drawing its warrant from which link happens to minimise a loss.",
          weight: 4,
          required: true,
        },
        {
          id: "undermined-by-nonnormal-liability",
          description:
            "It would be undermined by evidence the true liability is not well-approximated by a normal distribution (e.g. it is heavy-tailed or skewed), in which case the probit's theoretical justification would not hold even if its numerical fit still looked reasonable.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["probit-regression", "normal-distribution"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "probit-regression--transfer-rescaling-shortcut-limits",
    conceptId: "probit-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A researcher fits a logistic regression and reports the coefficients rescaled by 1/1.6 as if they were " +
      "probit coefficients, skipping a probit fit entirely. Evaluate whether this shortcut is reliable, and " +
      "state the condition under which it is roughly valid.",
    rubric: {
      elements: [
        {
          id: "approximation-not-identity",
          description:
            "The 1.6-ish rescaling factor is only an approximation that holds when the two curves are close, which is true away from the extreme tails; it is not an exact algebraic identity between the two models' coefficients, so it can mislead when predictions concentrate near 0 or 1 where the two link functions diverge most.",
          weight: 4,
          required: true,
        },
        {
          id: "condition-for-validity",
          description:
            "The shortcut is roughly valid only for datasets where predicted probabilities stay well within the middle of the (0,1) range, and should not substitute for an actual probit fit whenever probabilities near the extremes matter.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["probit-regression", "logistic-regression", "normal-distribution"],
    source: BISHOP_PRML,
    status: "live",
  },

  // --- Generalized Linear Model (GLM) -------------------------------------------------
  {
    id: "glm--recall-canonical-link-definition",
    conceptId: "glm",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The 'canonical link' for a GLM's response distribution is defined as:",
    choices: [
      { id: "a", text: "the link function equal to the distribution's own natural parameter as a function of the mean", correct: true },
      {
        id: "b",
        text: "whichever link function makes the fitting algorithm converge fastest",
        correct: false,
        misconception: {
          id: "canonical-link-confused-with-convergence-speed",
          description: "Canonical status is a property of the exponential-family form, not a claim about which link fits fastest in practice.",
          blameConceptId: "glm",
        },
      },
      {
        id: "c",
        text: "the identity link, applied to every GLM",
        correct: false,
        misconception: {
          id: "canonical-link-assumed-always-identity",
          description: "The canonical link differs by distribution — logit for Bernoulli, log for Poisson, identity only for Normal.",
          blameConceptId: "glm",
        },
      },
      {
        id: "d",
        text: "a link chosen purely by convention, with no relation to the distribution",
        correct: false,
        misconception: {
          id: "canonical-link-thought-arbitrary",
          description: "The canonical link is derived directly from the exponential-family form of the response distribution, not chosen arbitrarily.",
          blameConceptId: "exponential-family",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["glm", "exponential-family"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--recall-binomial-response-and-link",
    conceptId: "glm",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "For a binomial (count-of-successes-out-of-trials) response, name the response distribution used in the corresponding GLM and its canonical link.",
    rubric: {
      elements: [
        { id: "answer", description: "Binomial response distribution, with the logit link as its canonical link.", weight: 4, required: true },
      ],
    },
    difficulty: -1.2,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["glm", "logistic-regression"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--apply-poisson-negative-coefficient",
    conceptId: "glm",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A Poisson regression with a log link has a coefficient of −0.5 on a safety-intervention indicator. By what multiplicative factor does the intervention change the expected count, e^−0.5? Give a decimal to three places.",
    answerKey: 0.607,
    tolerance: 0.005,
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["glm", "exponential-family"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--apply-logit-coefficient-interpretation",
    conceptId: "glm",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A GLM for a proportion between 0 and 1 (not a count) uses a binomial response and a logit link. The fitted coefficient on a predictor is 0.4. What is the correct interpretation?",
    choices: [
      { id: "a", text: "A one-unit increase in the predictor multiplies the odds of the outcome by e^0.4 ≈ 1.49", correct: true },
      {
        id: "b",
        text: "It multiplies the proportion itself by e^0.4",
        correct: false,
        misconception: {
          id: "logit-coefficient-applied-to-proportion-scale",
          description: "Exponentiating a logit coefficient gives a multiplicative effect on the odds, not on the proportion (probability) directly.",
          blameConceptId: "glm",
        },
      },
      {
        id: "c",
        text: "It adds 0.4 to the proportion directly",
        correct: false,
        misconception: {
          id: "logit-coefficient-treated-as-identity-link",
          description: "An additive effect on the response scale is what the identity link would give; the logit link's coefficient is additive on the log-odds, not the proportion.",
          blameConceptId: "glm",
        },
      },
      {
        id: "d",
        text: "It has no closed-form interpretation, unlike the Poisson (log-link) case",
        correct: false,
        misconception: {
          id: "logit-coefficient-thought-uninterpretable",
          description: "The logit link always has the odds-ratio interpretation via exponentiation, just as reliably as the log link's multiplicative interpretation.",
          blameConceptId: "glm",
        },
      },
    ],
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 100,
    prereqClosure: ["glm", "logistic-regression", "exponential-family"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--explain-canonical-pairing-benefit",
    conceptId: "glm",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain what it means for a GLM's response distribution and link to be 'canonically paired', and what " +
      "practical property this pairing buys during fitting (iteratively reweighted least squares).",
    rubric: {
      elements: [
        {
          id: "pairing-defined",
          description: "A canonical pairing uses the link equal to the distribution's natural parameter, so the linear predictor directly equals the natural parameter of the exponential-family form.",
          weight: 3,
          required: true,
        },
        {
          id: "practical-benefit",
          description:
            "Practically, this simplifies the score equations and expected-information (Fisher scoring) computations used by IRLS, since several terms that would otherwise need to be tracked separately coincide — non-canonical links still work but require carrying the extra link derivative explicitly.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["glm", "exponential-family"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--explain-variance-function-baked-in",
    conceptId: "glm",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A Poisson GLM assumes Var(Y) = μ exactly. Explain, using the concept of a GLM's variance function, how " +
      "this assumption is baked into the model's estimating equations even before any data is seen.",
    rubric: {
      elements: [
        {
          id: "variance-function-per-distribution",
          description:
            "Each exponential-family response has its own variance function V(μ) relating the mean to the variance (V(μ) = μ for Poisson, μ(1−μ) for Bernoulli, a constant for Normal), and the GLM's weighted fitting step weights each observation by the inverse of this variance function — the mean-variance relationship is a modelling choice baked into how much each point is trusted, not something checked afterward.",
          weight: 5,
          required: true,
        },
        {
          id: "overdispersion-link",
          description: "Bonus: notes this is exactly why overdispersion (real variance exceeding μ) breaks the standard-error calculation without necessarily biasing the coefficient point estimates much.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["glm", "exponential-family"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--transfer-offset-vs-covariate",
    conceptId: "glm",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A GLM predicting monthly claims count uses an offset term (a fixed coefficient of 1 on log(exposure " +
      "months)) rather than treating exposure as an ordinary predictor. Explain what an offset accomplishes " +
      "here, and why it differs from just including log(exposure) as a regular covariate with its own estimated " +
      "coefficient.",
    rubric: {
      elements: [
        {
          id: "offset-forces-proportionality",
          description:
            "An offset forces the model to assume the response scales exactly proportionally with exposure (rate × exposure), the standard assumption for count data collected over varying observation periods — it turns the model into one for the underlying rate, with exposure entering only to convert that rate back into an expected count.",
          weight: 5,
          required: true,
        },
        {
          id: "estimated-coefficient-relaxes-assumption",
          description:
            "Estimating log(exposure)'s coefficient freely instead would let the data override that proportionality assumption, appropriate only if there is reason to think the count-exposure relationship is not exactly linear — otherwise the offset is the more principled, parameter-free choice.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["glm", "exponential-family"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "glm--transfer-zero-mass-breaks-gamma",
    conceptId: "glm",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A GLM is fit with a log link on a response that can equal exactly zero for many observations (e.g. " +
      "insurance claims, many of which are $0). Explain the specific problem this creates for the standard " +
      "gamma-with-log-link GLM, and name a model designed for this situation.",
    rubric: {
      elements: [
        {
          id: "gamma-support-excludes-zero",
          description:
            "The gamma distribution's support is strictly positive, so it cannot assign any probability mass to an outcome of exactly zero — a response with a genuine spike at zero is structurally incompatible with a plain gamma GLM, not merely poorly fit by it.",
          weight: 4,
          required: true,
        },
        {
          id: "fix-named",
          description:
            "Names a fix designed for this: a tweedie GLM (allowing a point mass at zero alongside a continuous positive part), or a two-part hurdle/zero-inflated model that separately models whether the outcome is zero and, if not, its positive magnitude.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.31,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["glm", "exponential-family"],
    source: BISHOP_PRML,
    status: "live",
  },

  // --- Cox Proportional Hazards Model -------------------------------------------------
  {
    id: "cox-proportional-hazards-model--recall-censoring-definition",
    conceptId: "cox-proportional-hazards-model",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In the Cox model, 'censoring' refers to:",
    choices: [
      { id: "a", text: "a subject's true event time being known only to exceed some observed time, e.g. because the study ended before they had the event", correct: true },
      {
        id: "b",
        text: "a subject being removed from the dataset entirely and excluded from the analysis",
        correct: false,
        misconception: {
          id: "censoring-confused-with-exclusion",
          description: "Censored subjects stay in the analysis and contribute information (they remain in risk sets) — they are not dropped.",
          blameConceptId: "cox-proportional-hazards-model",
        },
      },
      {
        id: "c",
        text: "a subject who had the event at the very start of the study",
        correct: false,
        misconception: {
          id: "censoring-confused-with-early-event",
          description: "An early event is a fully observed event time, the opposite of censoring, which means the event time is not fully observed.",
          blameConceptId: "cox-proportional-hazards-model",
        },
      },
      {
        id: "d",
        text: "an error in the recorded event time that must be corrected before analysis",
        correct: false,
        misconception: {
          id: "censoring-confused-with-data-error",
          description: "Censoring is an expected, modelled feature of survival data, not a data-entry error to be fixed.",
          blameConceptId: "cox-proportional-hazards-model",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["cox-proportional-hazards-model"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--recall-baseline-hazard-role",
    conceptId: "cox-proportional-hazards-model",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What does the baseline hazard h₀(t) represent in the Cox model, and why does the model never need to estimate its functional form to fit β?",
    rubric: {
      elements: [
        { id: "baseline-hazard-definition", description: "h₀(t) is the hazard for a hypothetical subject with all covariates equal to zero, as a function of time.", weight: 3, required: true },
        {
          id: "cancels-in-partial-likelihood",
          description: "β is fit via the partial likelihood, in which h₀(t) cancels out of every risk-set comparison, so its shape never needs to be specified or estimated for β to be found.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.1,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["cox-proportional-hazards-model"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--apply-hazard-ratio-negative-coefficient",
    conceptId: "cox-proportional-hazards-model",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A Cox model reports a coefficient of −0.5 on a treatment indicator. What is the hazard ratio, e^−0.5? Give a decimal to three places.",
    answerKey: 0.607,
    tolerance: 0.005,
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["cox-proportional-hazards-model"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--apply-risk-set-size-alternate",
    conceptId: "cox-proportional-hazards-model",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A trial follows 100 patients. By the time of the 20th event, 12 patients have already had the event and " +
      "8 have been censored before that time. How many patients are in the risk set for the 20th event, " +
      "including the one who fails? Give a whole number.",
    answerKey: 80,
    tolerance: 0.001,
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 110,
    prereqClosure: ["cox-proportional-hazards-model"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--explain-ratio-independent-of-baseline-shape",
    conceptId: "cox-proportional-hazards-model",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the Cox model's coefficients can be interpreted the same way (as log hazard ratios) " +
      "regardless of what the true, unspecified shape of h₀(t) turns out to be.",
    rubric: {
      elements: [
        {
          id: "multiplicative-and-shape-independent",
          description:
            "The covariate effect enters multiplicatively as exp(xᵀβ), which scales the hazard by the same factor at every time t regardless of what h₀(t) happens to be — so the ratio of hazards between two covariate profiles is exp(xᵀβ) at every t, and does not depend on h₀(t)'s shape at all.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["cox-proportional-hazards-model"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--explain-no-median-survival-alone",
    conceptId: "cox-proportional-hazards-model",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the Cox model cannot, on its own, provide a predicted median survival time for a new " +
      "subject with specific covariates, even though it readily provides a hazard ratio.",
    rubric: {
      elements: [
        {
          id: "hazard-ratio-is-only-relative",
          description:
            "A hazard ratio only describes the multiplicative relationship between two subjects' hazards; getting from a hazard to a survival time additionally requires knowing the baseline hazard's actual shape (or the cumulative baseline hazard), which the partial-likelihood fit of β deliberately never estimates.",
          weight: 4,
          required: true,
        },
        {
          id: "breslow-estimator-needed",
          description: "A separate, additional estimate of the baseline cumulative hazard (e.g. the Breslow estimator) is needed on top of the fitted β to produce absolute survival predictions.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 230,
    prereqClosure: ["cox-proportional-hazards-model"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--transfer-timing-vs-cure-effect",
    conceptId: "cox-proportional-hazards-model",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A Cox model is fit to compare two treatments, and the resulting hazard ratio is reported as the headline " +
      "result. A referee objects that this hides whether the treatment effect is about delaying the event or " +
      "about preventing it in a fraction of patients who would otherwise never have it. Explain the distinction " +
      "the referee is pointing to, and why the Cox model's structure cannot tell the two apart.",
    rubric: {
      elements: [
        {
          id: "distinction-named",
          description:
            "The referee is distinguishing an accelerating/decelerating effect on timing for everyone who would eventually have the event, versus a 'cure' effect where a genuine subgroup never experiences the event at all (a mixture-cure scenario) — both can produce a similar-looking constant hazard ratio over the observed follow-up.",
          weight: 5,
          required: true,
        },
        {
          id: "cox-cannot-distinguish",
          description:
            "The plain Cox model assumes proportional hazards over the whole population and has no built-in mechanism to represent a subgroup that is simply never at risk, so it cannot distinguish these two very different clinical stories from the hazard ratio alone — a cure-rate or mixture model is needed to separate them.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.8,
    expectedSeconds: 250,
    prereqClosure: ["cox-proportional-hazards-model"],
    source: SINGER_WILLETT,
    status: "live",
  },
  {
    id: "cox-proportional-hazards-model--transfer-semi-vs-fully-parametric",
    conceptId: "cox-proportional-hazards-model",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Compare the Cox model's semi-parametric structure to a fully parametric survival model (e.g. assuming " +
      "an exponential or Weibull baseline hazard). What is gained by leaving h₀(t) unspecified, and what is " +
      "given up?",
    rubric: {
      elements: [
        {
          id: "gained-robustness",
          description: "Gained: robustness — the estimated β does not depend on correctly guessing the shape of the baseline hazard, which is hard to know a priori and easy to get wrong.",
          weight: 4,
          required: true,
        },
        {
          id: "given-up-absolute-predictions-and-efficiency",
          description:
            "Given up: the model alone cannot produce absolute survival probabilities or extrapolate hazard behaviour beyond the observed follow-up period without an additional baseline-hazard estimate, whereas a correctly-specified fully parametric model can do both directly and often more efficiently (smaller standard errors) if its parametric assumption happens to be right.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.32,
    discrimination: 1.7,
    expectedSeconds: 250,
    prereqClosure: ["cox-proportional-hazards-model", "glm"],
    source: SINGER_WILLETT,
    status: "live",
  },
];
