import type { Item } from "../../lib/assessment/types";
import { AUTHORED, CASELLA_BERGER_REG, ESL, ISLR, NIST_HANDBOOK, OCW_18_650 } from "./sources";

/**
 * REG-3 — OLS Properties, SSR/SSE/SST, R², ANOVA, Effect of Adding Another
 * Variable, Variance Inflation Factor.
 *
 * Authored from `assessments/reg-03-model-fit-and-diagnostics.md`. The cluster's
 * spine is one identity — SST = SSR + SSE — read four ways: as a proportion
 * (R²), as a ratio of mean squares (the F-test), as a monotone trap (adding a
 * variable), and as a variance that collinearity inflates (VIF).
 */
export const regressionDiagnosticsItems: Item[] = [
  // --- OLS Properties -------------------------------------------------------
  {
    id: "ols-properties--recall-properties",
    conceptId: "ols-properties",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "Under the standard assumptions, which properties does the OLS estimator β̂ have? Select all that apply.",
    choices: [
      { id: "a", text: "It is unbiased: E[β̂ | X] = β", correct: true },
      { id: "b", text: "Its covariance matrix is σ²(XᵀX)⁻¹", correct: true },
      { id: "c", text: "It is normally distributed when the errors are normal", correct: true },
      { id: "d", text: "It has the smallest variance among linear unbiased estimators", correct: true },
      {
        id: "e",
        text: "Its variance depends only on the sample size",
        correct: false,
        misconception: {
          id: "variance-depends-only-on-n",
          description:
            "Ignores both σ² and the structure of the design matrix. How spread out and how collinear the predictors are matters as much as n.",
          blameConceptId: "ols-properties",
        },
      },
      {
        id: "f",
        text: "It has the smallest mean squared error among all estimators",
        correct: false,
        misconception: {
          id: "blue-extended-to-all-estimators",
          description:
            "Drops the 'linear unbiased' restriction. Biased estimators such as ridge can achieve lower total error.",
          blameConceptId: "ols-properties",
        },
      },
    ],
    difficulty: 0.23,
    discrimination: 1.4,
    expectedSeconds: 80,
    prereqClosure: ["ols-properties", "ols-assumptions", "variance", "expectation"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "ols-properties--recall-variance-drivers",
    conceptId: "ols-properties",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Var(β̂) = σ²(XᵀX)⁻¹ depends on:",
    choices: [
      {
        id: "a",
        text: "The error variance σ² and the structure of the design matrix — how spread out and how collinear the predictors are",
        correct: true,
      },
      {
        id: "b",
        text: "The sample size alone",
        correct: false,
        misconception: {
          id: "variance-reduced-to-n",
          description:
            "Reduces the formula to n. Sample size enters only through XᵀX, alongside the predictors' spread and correlations.",
          blameConceptId: "ols-properties",
        },
      },
      {
        id: "c",
        text: "The values of the response y",
        correct: false,
        misconception: {
          id: "variance-thought-to-depend-on-y",
          description:
            "The formula contains no y at all. Given X, the sampling variance is fixed before any response is observed — which is what makes experimental design possible.",
          blameConceptId: "ols-properties",
        },
      },
      {
        id: "d",
        text: "The size of the true coefficients β",
        correct: false,
        misconception: {
          id: "variance-thought-to-scale-with-beta",
          description:
            "The variance is free of β. A large coefficient is not estimated less precisely than a small one.",
          blameConceptId: "ols-properties",
        },
      },
    ],
    difficulty: 0.53,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["ols-properties", "variance", "ols-assumptions"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "ols-properties--apply-variance-from-spread",
    conceptId: "ols-properties",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "In a simple linear regression, Var(β̂₁) = σ²/Σ(xᵢ − x̄)². With σ² = 18 and Σ(xᵢ − x̄)² = 72, what is " +
      "Var(β̂₁)? Give a decimal to two places.",
    answerKey: 0.25,
    tolerance: 0.005,
    difficulty: 1.03,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["ols-properties", "variance", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "ols-properties--apply-design-improvement",
    conceptId: "ols-properties",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "An experiment is redesigned so the predictor's spread Σ(xᵢ − x̄)² is tripled, with the same sample size " +
      "and the same error variance. By what factor does the standard error of the slope shrink? Give a decimal " +
      "to three places.",
    answerKey: 1.732,
    tolerance: 0.01,
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["ols-properties", "variance", "simple-linear-regression"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "ols-properties--explain-unbiasedness-derivation",
    conceptId: "ols-properties",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Show that E[β̂ | X] = β, and state precisely which assumption the argument uses — and which ones it " +
      "does not.",
    rubric: {
      elements: [
        {
          id: "substitutes-model",
          description:
            "Substitutes y = Xβ + ε into β̂ = (XᵀX)⁻¹Xᵀy to get β̂ = β + (XᵀX)⁻¹Xᵀε.",
          weight: 3,
          required: true,
          misconception: {
            id: "asserts-unbiasedness",
            description: "States the result without exhibiting the estimator as truth-plus-noise.",
            blameConceptId: "ols-properties",
          },
        },
        {
          id: "takes-expectation",
          description:
            "Takes expectations conditional on X and uses E[ε | X] = 0 to kill the second term.",
          weight: 3,
          required: true,
        },
        {
          id: "names-what-is-not-used",
          description:
            "States that neither normality nor homoskedasticity nor independence of the errors was needed — only exogeneity.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.73,
    discrimination: 1.7,
    expectedSeconds: 270,
    prereqClosure: ["ols-properties", "expectation", "ols-assumptions", "normal-equations"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "ols-properties--explain-spread-design",
    conceptId: "ols-properties",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Two experiments have the same sample size and the same measurement noise. One tests doses of 4 and " +
      "6 mg, the other doses of 1 and 9 mg. Explain which estimates the slope more precisely and why, and name " +
      "a real cost of the more precise design.",
    rubric: {
      elements: [
        {
          id: "identifies-wider-spread",
          description:
            "Picks the 1-and-9 design, because Σ(xᵢ − x̄)² sits in the denominator of Var(β̂₁) and is much larger there.",
          weight: 3,
          required: true,
          misconception: {
            id: "precision-attributed-only-to-n",
            description:
              "Judges precision by sample size alone, missing that the predictor's spread is an equally direct lever.",
            blameConceptId: "ols-properties",
          },
        },
        {
          id: "quantifies",
          description:
            "Notes the ratio explicitly — the spreads are 4 and 16 times the squared half-range respectively, so the variance falls by a factor of 16 and the standard error by 4.",
          weight: 2,
        },
        {
          id: "names-the-cost",
          description:
            "Identifies the trade-off: observing only the extremes makes the linearity assumption much harder to check, since nothing in the middle can reveal curvature.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["ols-properties", "variance", "simple-linear-regression", "ols-assumptions"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "ols-properties--transfer-clt-route-to-normality",
    conceptId: "ols-properties",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Regression t-tests are used constantly on data whose errors are visibly not normal. Explain why they " +
      "are usually still valid, and describe a situation where the justification fails even with a large " +
      "sample.",
    rubric: {
      elements: [
        {
          id: "clt-argument",
          description:
            "Identifies β̂ as a weighted sum of the observations, so the central limit theorem gives approximate normality regardless of the shape of the individual errors.",
          weight: 3,
          required: true,
          misconception: {
            id: "normality-of-errors-required",
            description:
              "Believes exactly normal errors are necessary, missing the asymptotic route that makes regression inference usable in practice.",
            blameConceptId: "ols-properties",
          },
        },
        {
          id: "failure-case",
          description:
            "Names a case where it fails — a single observation with leverage near 1 dominating the weighted sum, or errors with infinite variance — so no averaging effect kicks in.",
          weight: 3,
          required: true,
        },
        {
          id: "prediction-intervals",
          description:
            "Bonus: notes that prediction intervals for a single new observation are not rescued by the CLT at all.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.23,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["ols-properties", "central-limit-theorem", "normal-distribution", "variance"],
    source: ESL,
    status: "live",
  },
  {
    id: "ols-properties--transfer-consistency-vs-unbiasedness",
    conceptId: "ols-properties",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "OLS is both unbiased and consistent, and these are different guarantees. Distinguish them, and describe " +
      "a data-collection pattern under which OLS stays unbiased but stops being consistent.",
    rubric: {
      elements: [
        {
          id: "distinguishes",
          description:
            "Defines unbiasedness as correct on average at any fixed n, and consistency as convergence to the truth as n grows — neither implying the other.",
          weight: 3,
          required: true,
          misconception: {
            id: "properties-conflated",
            description:
              "Treats the two as the same guarantee, so no situation could separate them.",
            blameConceptId: "ols-properties",
          },
        },
        {
          id: "failure-pattern",
          description:
            "Describes new observations piling up at the same predictor value, so Σ(xᵢ − x̄)² stops growing and Var(β̂₁) does not shrink toward zero.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["ols-properties", "variance", "expectation", "simple-linear-regression"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },

  // --- SSR, SSE, SST --------------------------------------------------------
  {
    id: "ssr-sse-sst--recall-definitions",
    conceptId: "ssr-sse-sst",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which set of definitions is correct?",
    choices: [
      {
        id: "a",
        text: "SST = Σ(yᵢ − ȳ)², SSR = Σ(ŷᵢ − ȳ)², SSE = Σ(yᵢ − ŷᵢ)², and SST = SSR + SSE",
        correct: true,
      },
      {
        id: "b",
        text: "SST = Σ(yᵢ − ŷᵢ)², SSE = Σ(yᵢ − ȳ)², and SSR is their difference",
        correct: false,
        misconception: {
          id: "sst-sse-swapped",
          description:
            "Swaps total and error. The total sum of squares is measured around the mean, which is the baseline any model must beat.",
          blameConceptId: "ssr-sse-sst",
        },
      },
      {
        id: "c",
        text: "SSR = Σ(yᵢ − ŷᵢ)², the sum of squared residuals",
        correct: false,
        misconception: {
          id: "ssr-read-as-residual-sum",
          description:
            "Uses the competing convention in which SSR means 'sum of squared residuals'. Under the definitions here SSR is the explained sum, so the abbreviation must always be checked against its definition.",
          blameConceptId: "ssr-sse-sst",
        },
      },
      {
        id: "d",
        text: "SST = SSR × SSE",
        correct: false,
        misconception: {
          id: "decomposition-multiplicative",
          description:
            "Makes the decomposition multiplicative. The pieces add, because they are squared lengths of two perpendicular vectors.",
          blameConceptId: "ssr-sse-sst",
        },
      },
    ],
    difficulty: 0.02,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["ssr-sse-sst", "simple-linear-regression", "sample-mean"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "ssr-sse-sst--recall-exactness",
    conceptId: "ssr-sse-sst",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The identity SST = SSR + SSE holds:",
    choices: [
      {
        id: "a",
        text: "Exactly, for any OLS fit that includes an intercept, as a consequence of the normal equations",
        correct: true,
      },
      {
        id: "b",
        text: "Only approximately, and only for large samples",
        correct: false,
        misconception: {
          id: "identity-treated-as-asymptotic",
          description:
            "Treats an exact algebraic identity as an asymptotic approximation. It follows from a right angle, which is not an approximation.",
          blameConceptId: "ssr-sse-sst",
        },
      },
      {
        id: "c",
        text: "Only when the errors are normally distributed",
        correct: false,
        misconception: {
          id: "identity-credited-to-normality",
          description:
            "Attributes the identity to a distributional assumption. It is pure linear algebra and holds whatever the errors look like.",
          blameConceptId: "ssr-sse-sst",
        },
      },
      {
        id: "d",
        text: "For any fitting method that minimises some loss",
        correct: false,
        misconception: {
          id: "identity-assumed-universal",
          description:
            "Overgeneralises. The cross term vanishes because of least-squares orthogonality; a different loss gives no such guarantee.",
          blameConceptId: "ssr-sse-sst",
        },
      },
    ],
    difficulty: 0.32,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["ssr-sse-sst", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "ssr-sse-sst--apply-find-ssr",
    conceptId: "ssr-sse-sst",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "A regression reports SST = 100 and SSE = 30. What is SSR? Give a whole number.",
    answerKey: 70,
    tolerance: 0.01,
    difficulty: 0.82,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["ssr-sse-sst", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "ssr-sse-sst--apply-mse-from-table",
    conceptId: "ssr-sse-sst",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A regression on 30 observations with 4 predictors and an intercept has SST = 500 and SSR = 350. What is " +
      "the mean squared error, SSE/(n − p − 1)? Give a whole number.",
    answerKey: 6,
    tolerance: 0.01,
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["ssr-sse-sst", "simple-linear-regression", "variance"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "ssr-sse-sst--explain-prove-identity",
    conceptId: "ssr-sse-sst",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Prove SST = SSR + SSE. Make explicit which term has to vanish and exactly what makes it vanish.",
    rubric: {
      elements: [
        {
          id: "adds-and-subtracts",
          description:
            "Writes yᵢ − ȳ = (yᵢ − ŷᵢ) + (ŷᵢ − ȳ), squares and sums to get SSE + 2·(cross term) + SSR.",
          weight: 3,
          required: true,
          misconception: {
            id: "identity-quoted",
            description: "States the identity without expanding the square, so no cross term ever appears.",
            blameConceptId: "ssr-sse-sst",
          },
        },
        {
          id: "cross-term-vanishes",
          description:
            "Expands the cross term into Σeᵢŷᵢ − ȳΣeᵢ and shows both pieces are zero.",
          weight: 3,
          required: true,
        },
        {
          id: "justifies-orthogonality",
          description:
            "Justifies those zeros from the normal equations: the residuals sum to zero (the intercept row) and are orthogonal to every predictor column, hence to ŷ.",
          weight: 3,
          required: true,
        },
        {
          id: "pythagoras",
          description:
            "Bonus: identifies the result as the Pythagorean theorem applied to two perpendicular vectors in ℝⁿ.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.52,
    discrimination: 1.7,
    expectedSeconds: 300,
    prereqClosure: ["ssr-sse-sst", "simple-linear-regression", "sample-mean"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "ssr-sse-sst--explain-no-intercept",
    conceptId: "ssr-sse-sst",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A colleague fits a regression through the origin and reports a negative R² computed as 1 − SSE/SST. " +
      "Explain how that is possible.",
    rubric: {
      elements: [
        {
          id: "no-intercept-row",
          description:
            "Explains that without an intercept there is no all-ones column, so the normal equations do not force Σeᵢ = 0 and the cross term need not vanish.",
          weight: 4,
          required: true,
          misconception: {
            id: "negative-r-squared-called-impossible",
            description:
              "Assumes R² is always in [0, 1], missing that the guarantee rests on the intercept being in the model.",
            blameConceptId: "ssr-sse-sst",
          },
        },
        {
          id: "sse-can-exceed-sst",
          description:
            "States the consequence: SSR + SSE can exceed SST, so SSE can exceed SST and 1 − SSE/SST goes negative — the model does worse than predicting ȳ.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["ssr-sse-sst", "simple-linear-regression", "sample-mean"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ssr-sse-sst--transfer-law-of-total-variance",
    conceptId: "ssr-sse-sst",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Var(Y) = Var(E[Y | X]) + E[Var(Y | X)] splits a variance into an explained and an unexplained part, and " +
      "so does SST = SSR + SSE. Describe the structural parallel, and say what makes each decomposition work.",
    rubric: {
      elements: [
        {
          id: "maps-the-terms",
          description:
            "Maps SSR to the variance of the conditional mean and SSE to the expected conditional variance, both scaled by the sample size.",
          weight: 3,
          required: true,
        },
        {
          id: "different-mechanisms",
          description:
            "Names the two mechanisms: the sample identity comes from orthogonality in ℝⁿ, the population identity from iterated expectation.",
          weight: 3,
          required: true,
          misconception: {
            id: "treated-as-the-same-theorem",
            description:
              "Says the two are the same result, missing that one is an algebraic fact about a fitted sample and the other a probabilistic identity about a distribution.",
            blameConceptId: "ssr-sse-sst",
          },
        },
        {
          id: "r-squared-analogue",
          description:
            "Bonus: identifies R² as the sample analogue of the fraction of variance the conditional mean accounts for.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.02,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["ssr-sse-sst", "variance", "expectation", "joint-distribution"],
    source: ESL,
    status: "live",
  },
  {
    id: "ssr-sse-sst--transfer-sst-invariance",
    conceptId: "ssr-sse-sst",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Two analysts fit completely different models to the same response — different predictors, different " +
      "transformations of them, different numbers of terms. Which of SST, SSR and SSE are directly comparable " +
      "between the two fits, and why does that matter?",
    rubric: {
      elements: [
        {
          id: "sst-is-shared",
          description:
            "States that SST depends only on y, so it is identical for both fits, while SSR and SSE depend on the model and differ.",
          weight: 3,
          required: true,
          misconception: {
            id: "sst-thought-model-dependent",
            description:
              "Believes the total sum of squares changes with the model, which would make R² incomparable across models on the same response.",
            blameConceptId: "ssr-sse-sst",
          },
        },
        {
          id: "why-it-matters",
          description:
            "Explains that a fixed denominator is what makes R² a meaningful common yardstick — and notes it stops being one if the response itself is transformed, since that changes SST.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["ssr-sse-sst", "simple-linear-regression", "sample-mean"],
    source: AUTHORED,
    status: "live",
  },

  // --- R² -------------------------------------------------------------------
  {
    id: "r-squared--recall-definition",
    conceptId: "r-squared",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "R² is defined as:",
    choices: [
      { id: "a", text: "SSR/SST, equivalently 1 − SSE/SST", correct: true },
      {
        id: "b",
        text: "SSE/SST",
        correct: false,
        misconception: {
          id: "r-squared-inverted",
          description:
            "Reports the unexplained fraction. R² is the explained share, so this is its complement.",
          blameConceptId: "r-squared",
        },
      },
      {
        id: "c",
        text: "The fitted slope β̂₁",
        correct: false,
        misconception: {
          id: "r-squared-as-slope",
          description:
            "Confuses a rate of change, which carries units, with a unitless proportion of variance explained.",
          blameConceptId: "r-squared",
        },
      },
      {
        id: "d",
        text: "SSR/SSE",
        correct: false,
        misconception: {
          id: "r-squared-as-f-ratio",
          description:
            "Gives a ratio of explained to unexplained, which is unbounded above — related to the F statistic, but not a proportion.",
          blameConceptId: "r-squared",
        },
      },
    ],
    difficulty: 0.05,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["r-squared", "ssr-sse-sst"],
    source: ISLR,
    status: "live",
  },
  {
    id: "r-squared--recall-what-it-does-not-say",
    conceptId: "r-squared",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of these does R² NOT tell you? Select all that apply.",
    choices: [
      { id: "a", text: "Whether the linear functional form is correct", correct: true },
      { id: "b", text: "How the model will perform on new data", correct: true },
      { id: "c", text: "Whether the coefficients are unbiased", correct: true },
      { id: "d", text: "Whether the relationship is causal", correct: true },
      {
        id: "e",
        text: "What share of the response's variation the model accounts for in this sample",
        correct: false,
        misconception: {
          id: "r-squared-dismissed-entirely",
          description:
            "Overcorrects into thinking R² measures nothing. It does exactly one thing well — the in-sample explained share — and the errors come from asking it for more.",
          blameConceptId: "r-squared",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["r-squared", "ssr-sse-sst"],
    source: ISLR,
    status: "live",
  },
  {
    id: "r-squared--apply-from-correlation",
    conceptId: "r-squared",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "In a simple linear regression the sample correlation between predictor and response is 0.8. What is R²? " +
      "Give a decimal to two places.",
    answerKey: 0.64,
    tolerance: 0.005,
    difficulty: 0.85,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["r-squared", "ssr-sse-sst", "covariance"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "r-squared--apply-adjusted",
    conceptId: "r-squared",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A model on 100 observations with 3 predictors and an intercept has SST = 1000 and SSE = 400. What is " +
      "the adjusted R², 1 − [SSE/(n − p − 1)] / [SST/(n − 1)]? Give a decimal to four places.",
    answerKey: 0.5875,
    tolerance: 0.001,
    difficulty: 1.35,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["r-squared", "ssr-sse-sst"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "r-squared--explain-monotone-increase",
    conceptId: "r-squared",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Adding a column of random numbers, unrelated to the response, still raises R². Explain why, and say " +
      "what this implies about using R² to compare models with different numbers of predictors.",
    rubric: {
      elements: [
        {
          id: "enlarged-candidate-set",
          description:
            "Explains that the extra column enlarges the set of achievable fits, and the previous fit is still available with a zero coefficient, so SSE cannot increase and R² cannot fall.",
          weight: 3,
          required: true,
          misconception: {
            id: "increase-attributed-to-signal",
            description:
              "Assumes a rise in R² means the new predictor found something, when the rise is guaranteed by the geometry regardless.",
            blameConceptId: "r-squared",
          },
        },
        {
          id: "extreme-case",
          description:
            "Notes the extreme: with as many parameters as observations, R² reaches exactly 1 while the model knows nothing.",
          weight: 2,
        },
        {
          id: "implication",
          description:
            "Concludes that raw R² cannot compare models of different sizes, which is what motivates adjusted R², AIC, BIC and cross-validation.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["r-squared", "ssr-sse-sst", "simple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "r-squared--explain-no-universal-threshold",
    conceptId: "r-squared",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A reviewer rejects a paper because its R² is 0.06. Argue whether that is a sound basis for rejection, " +
      "using examples from at least two fields.",
    rubric: {
      elements: [
        {
          id: "field-dependence",
          description:
            "Argues that the acceptable range depends entirely on the domain — a few per cent is a strong result in cross-sectional social science, while physics or engineering routinely expects far more.",
          weight: 3,
          required: true,
          misconception: {
            id: "universal-threshold-assumed",
            description:
              "Applies a fixed cutoff, as though 'good' R² were a property of the number rather than of the subject matter.",
            blameConceptId: "r-squared",
          },
        },
        {
          id: "high-can-be-bad",
          description:
            "Notes the reverse failure: an unexpectedly high R² can signal leakage of the outcome into a predictor, so a high value is not automatically reassuring either.",
          weight: 3,
          required: true,
        },
        {
          id: "better-question",
          description:
            "Suggests what should be asked instead — whether the effect is estimated precisely enough to answer the question, and whether the model is correctly specified.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["r-squared", "ssr-sse-sst"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "r-squared--transfer-training-vs-test",
    conceptId: "r-squared",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A model reports R² = 0.94 on the data it was fitted to, and 1 − SSE/SST = −0.15 on held-out data. " +
      "Explain how both numbers can be right, and what the pair tells you.",
    rubric: {
      elements: [
        {
          id: "training-r2-is-guaranteed-to-rise",
          description:
            "Explains that in-sample R² measures how well the fit tracked the data it was optimised on, and rises with model flexibility whether or not signal was found.",
          weight: 3,
          required: true,
          misconception: {
            id: "negative-out-of-sample-called-impossible",
            description:
              "Believes the quantity must lie in [0, 1] out of sample too, missing that the guarantee comes from the fit being optimised on that same data.",
            blameConceptId: "r-squared",
          },
        },
        {
          id: "negative-meaning",
          description:
            "States what a negative out-of-sample value means: the model predicts new observations worse than simply using the training mean.",
          weight: 3,
          required: true,
        },
        {
          id: "diagnosis",
          description:
            "Diagnoses severe overfitting, and notes the gap between the two numbers is itself the read-out.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["r-squared", "ssr-sse-sst"],
    source: ESL,
    status: "live",
  },
  {
    id: "r-squared--transfer-sign-loss",
    conceptId: "r-squared",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Two simple regressions both report R² = 0.49. In one, higher values of the predictor go with higher " +
      "responses; in the other, with lower. Explain what R² can and cannot tell you here, and what you would " +
      "report instead.",
    rubric: {
      elements: [
        {
          id: "squaring-destroys-sign",
          description:
            "States that squaring discards the direction, so R² = 0.49 is consistent with a correlation of +0.7 and of −0.7 alike.",
          weight: 3,
          required: true,
          misconception: {
            id: "r-squared-read-as-directional",
            description:
              "Treats R² as carrying information about the direction of the relationship, which it cannot by construction.",
            blameConceptId: "r-squared",
          },
        },
        {
          id: "what-to-report",
          description:
            "Recommends reporting the coefficient with its sign and standard error, which carries both direction and magnitude in the units of the problem.",
          weight: 3,
          required: true,
        },
        {
          id: "multiple-caveat",
          description:
            "Bonus: notes that with several predictors R² is the squared correlation between y and ŷ, so it has no per-predictor sign to recover at all.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["r-squared", "ssr-sse-sst", "covariance"],
    source: AUTHORED,
    status: "live",
  },

  // --- ANOVA ----------------------------------------------------------------
  {
    id: "anova--recall-hypotheses",
    conceptId: "anova",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The overall ANOVA F-test in a regression tests:",
    choices: [
      {
        id: "a",
        text: "H₀: every slope coefficient is zero, against the alternative that at least one is not",
        correct: true,
      },
      {
        id: "b",
        text: "H₀: every slope coefficient is nonzero",
        correct: false,
        misconception: {
          id: "null-and-alternative-swapped",
          description:
            "Puts the interesting claim in the null. The null is the 'no effect' statement, which is what the reference distribution is derived under.",
          blameConceptId: "hypothesis-test",
        },
      },
      {
        id: "c",
        text: "H₀: the error variance is zero",
        correct: false,
        misconception: {
          id: "tests-variance-not-coefficients",
          description:
            "Tests the wrong parameter. The F-test compares two variance estimates in order to say something about the coefficients.",
          blameConceptId: "anova",
        },
      },
      {
        id: "d",
        text: "H₀: a specific single coefficient is zero",
        correct: false,
        misconception: {
          id: "f-test-confused-with-t-test",
          description:
            "Describes the individual coefficient t-test. The overall F-test asks one joint question about the whole predictor set.",
          blameConceptId: "anova",
        },
      },
    ],
    difficulty: 0.38,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["anova", "hypothesis-test", "ssr-sse-sst"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "anova--recall-mean-squares",
    conceptId: "anova",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about the ANOVA F-statistic are true? Select all that apply.",
    choices: [
      { id: "a", text: "Both numerator and denominator are mean squares — sums of squares divided by their degrees of freedom", correct: true },
      { id: "b", text: "MSE estimates σ² whether or not the null is true", correct: true },
      { id: "c", text: "Under the null, F should be near 1", correct: true },
      { id: "d", text: "Only large values of F count as evidence against the null", correct: true },
      {
        id: "e",
        text: "The numerator and denominator are unrelated quantities that happen to be divided",
        correct: false,
        misconception: {
          id: "ratio-treated-as-arbitrary",
          description:
            "Misses that both estimate the same σ² under the null, which is exactly why their ratio has a known distribution.",
          blameConceptId: "anova",
        },
      },
      {
        id: "f",
        text: "A very small F is strong evidence that the predictors matter",
        correct: false,
        misconception: {
          id: "small-f-read-as-evidence",
          description:
            "Treats the test as two-sided. A small F means the fitted values vary less than noise alone would produce, which is not evidence for any effect.",
          blameConceptId: "anova",
        },
      },
    ],
    difficulty: 0.68,
    discrimination: 1.5,
    expectedSeconds: 80,
    prereqClosure: ["anova", "ssr-sse-sst", "variance", "hypothesis-test"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "anova--apply-compute-f",
    conceptId: "anova",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A regression on 60 observations with 4 predictors has SST = 500 and SSE = 200. Compute the overall " +
      "F-statistic. Give a decimal to one place.",
    answerKey: 20.6,
    tolerance: 0.15,
    difficulty: 1.18,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["anova", "ssr-sse-sst", "hypothesis-test"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "anova--apply-f-from-t",
    conceptId: "anova",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A partial F-test compares a model against the same model with one extra predictor. That predictor's " +
      "individual t-statistic is 3.5. What is the partial F-statistic? Give a decimal to two places.",
    answerKey: 12.25,
    tolerance: 0.01,
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["anova", "test-statistic", "hypothesis-test", "ssr-sse-sst"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "anova--explain-why-f-near-one",
    conceptId: "anova",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why F should be close to 1 when the null hypothesis is true, and why a large F is evidence " +
      "against it. Be specific about what each mean square is estimating.",
    rubric: {
      elements: [
        {
          id: "both-estimate-sigma-squared",
          description:
            "States that under the null both MSR and MSE estimate the same error variance σ², so their ratio hovers near 1.",
          weight: 4,
          required: true,
          misconception: {
            id: "f-near-one-asserted",
            description:
              "Asserts F ≈ 1 under the null without saying what the two mean squares are each estimating.",
            blameConceptId: "anova",
          },
        },
        {
          id: "alternative-inflates-numerator",
          description:
            "Explains that under the alternative the fitted values track real structure, so MSR estimates something larger than σ² while MSE still estimates σ² — inflating the ratio.",
          weight: 3,
          required: true,
        },
        {
          id: "one-sided",
          description:
            "Notes this is why the test uses only the upper tail.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["anova", "variance", "ssr-sse-sst", "hypothesis-test"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "anova--explain-chi-square-construction",
    conceptId: "anova",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the F distribution — rather than some other distribution — is the correct reference for the " +
      "ANOVA statistic, tracing it back to how the F distribution is defined.",
    rubric: {
      elements: [
        {
          id: "two-chi-squares",
          description:
            "States that under normality and the null, SSR/σ² and SSE/σ² each follow chi-square distributions with p and n − p − 1 degrees of freedom.",
          weight: 3,
          required: true,
          misconception: {
            id: "f-reference-taken-on-faith",
            description:
              "Accepts the F distribution as a convention rather than deriving it from the ratio-of-chi-squares construction.",
            blameConceptId: "f-distribution",
          },
        },
        {
          id: "independence",
          description:
            "Explains that the two are independent because they are squared lengths of projections onto orthogonal subspaces — the same orthogonality that gives SST = SSR + SSE.",
          weight: 3,
          required: true,
        },
        {
          id: "definition-matched",
          description:
            "Concludes that a ratio of independent chi-squares each divided by its degrees of freedom is exactly the definition of an F random variable, and that σ² cancels so the statistic is computable.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.88,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["anova", "f-distribution", "chi-square-distribution", "ssr-sse-sst", "normal-distribution"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "anova--transfer-multiple-comparisons",
    conceptId: "anova",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Why run the overall F-test before looking at individual coefficient t-tests, rather than just examining " +
      "the p predictor p-values directly? Quantify the problem for p = 10 predictors at α = 0.05.",
    rubric: {
      elements: [
        {
          id: "error-rate-inflation",
          description:
            "Explains that each t-test carries its own 5% false-positive rate, so the chance of at least one spurious 'significant' predictor across ten independent tests is 1 − 0.95¹⁰ ≈ 40%.",
          weight: 4,
          required: true,
          misconception: {
            id: "per-test-rate-taken-as-overall",
            description:
              "Treats the nominal 5% as the error rate for the whole set of tests rather than for each one separately.",
            blameConceptId: "hypothesis-test",
          },
        },
        {
          id: "f-asks-one-question",
          description:
            "States that the F-test asks a single joint question about the whole predictor set, so its error rate is the nominal one.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.38,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["anova", "hypothesis-test", "test-statistic"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "anova--transfer-partial-f-generalises",
    conceptId: "anova",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The partial F-test compares a reduced model against a full one that contains it. Show that the overall " +
      "F-test and the individual coefficient t-test are both special cases of it, and state the condition that " +
      "makes the comparison valid at all.",
    rubric: {
      elements: [
        {
          id: "overall-f-case",
          description:
            "Identifies that taking the reduced model to be intercept-only recovers the overall F-test.",
          weight: 3,
          required: true,
        },
        {
          id: "t-test-case",
          description:
            "Identifies that dropping exactly one predictor gives a statistic equal to the square of that coefficient's t-statistic.",
          weight: 3,
          required: true,
          misconception: {
            id: "tests-treated-as-separate",
            description:
              "Treats the overall F, the partial F and the t-test as three unrelated procedures rather than one formula and its endpoints.",
            blameConceptId: "anova",
          },
        },
        {
          id: "nesting-condition",
          description:
            "States the validity condition: the models must be nested and fitted to the same rows, so a non-nested comparison needs AIC, BIC or cross-validation instead.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.5,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["anova", "hypothesis-test", "ssr-sse-sst", "test-statistic"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },

  // --- Effect of Adding Another Variable ------------------------------------
  {
    id: "effect-of-adding-another-variable--recall-consequences",
    conceptId: "effect-of-adding-another-variable",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "When a predictor is added to a regression, which of these are guaranteed? Select all that apply.",
    choices: [
      { id: "a", text: "SSE does not increase", correct: true },
      { id: "b", text: "R² does not decrease", correct: true },
      { id: "c", text: "The residual degrees of freedom falls by one", correct: true },
      {
        id: "d",
        text: "Adjusted R² does not decrease",
        correct: false,
        misconception: {
          id: "adjusted-r2-assumed-monotone",
          description:
            "Extends R²'s guarantee to the adjusted version. The whole point of the adjustment is that it can fall when the gain does not cover the lost degree of freedom.",
          blameConceptId: "effect-of-adding-another-variable",
        },
      },
      {
        id: "e",
        text: "The other coefficients keep their values",
        correct: false,
        misconception: {
          id: "coefficients-assumed-stable",
          description:
            "Assumes stability. Coefficients change whenever the new predictor is correlated with the existing ones.",
          blameConceptId: "effect-of-adding-another-variable",
        },
      },
      {
        id: "f",
        text: "Predictions on new data improve",
        correct: false,
        misconception: {
          id: "in-sample-gain-read-as-generalisation",
          description:
            "Extends an in-sample guarantee to held-out data, where added flexibility routinely makes predictions worse.",
          blameConceptId: "effect-of-adding-another-variable",
        },
      },
    ],
    difficulty: 0.18,
    discrimination: 1.5,
    expectedSeconds: 80,
    prereqClosure: ["effect-of-adding-another-variable", "r-squared", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "effect-of-adding-another-variable--recall-adjusted-r2",
    conceptId: "effect-of-adding-another-variable",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Adjusted R² differs from ordinary R² in that it:",
    choices: [
      {
        id: "a",
        text: "Penalises the number of predictors, so it can decrease when a weak predictor is added",
        correct: true,
      },
      {
        id: "b",
        text: "Is always larger than ordinary R²",
        correct: false,
        misconception: {
          id: "adjusted-assumed-larger",
          description:
            "Reverses the relationship. The penalty makes adjusted R² less than or equal to R², and it can even go negative.",
          blameConceptId: "effect-of-adding-another-variable",
        },
      },
      {
        id: "c",
        text: "Measures performance on held-out data rather than training data",
        correct: false,
        misconception: {
          id: "adjusted-confused-with-cv",
          description:
            "Confuses a degrees-of-freedom correction with actual out-of-sample validation. Adjusted R² never sees new data.",
          blameConceptId: "effect-of-adding-another-variable",
        },
      },
      {
        id: "d",
        text: "Corrects the coefficients for collinearity",
        correct: false,
        misconception: {
          id: "adjusted-thought-to-change-fit",
          description:
            "The adjustment is a rescaling of a summary statistic; it does not touch the coefficients or the fit at all.",
          blameConceptId: "effect-of-adding-another-variable",
        },
      },
    ],
    difficulty: 0.48,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["effect-of-adding-another-variable", "r-squared"],
    source: ISLR,
    status: "live",
  },
  {
    id: "effect-of-adding-another-variable--apply-adjusted-r2-falls",
    conceptId: "effect-of-adding-another-variable",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With n = 100 and SST = 1000, a 3-predictor model has SSE = 400 and a 4-predictor model has SSE = 397. " +
      "What is the adjusted R² of the 4-predictor model? Give a decimal to four places.",
    answerKey: 0.5863,
    tolerance: 0.001,
    difficulty: 1.35,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["effect-of-adding-another-variable", "r-squared", "ssr-sse-sst"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "effect-of-adding-another-variable--apply-partial-f",
    conceptId: "effect-of-adding-another-variable",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A reduced model with 2 predictors has SSE = 500; adding 3 more predictors takes SSE to 410, on n = 105 " +
      "observations. Compute the partial F-statistic for the three added predictors. Give a decimal to two " +
      "places.",
    answerKey: 7.24,
    tolerance: 0.05,
    difficulty: 1.7,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["effect-of-adding-another-variable", "ssr-sse-sst", "multiple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "effect-of-adding-another-variable--explain-penalty-mechanism",
    conceptId: "effect-of-adding-another-variable",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "R² can only rise when a predictor is added, yet adjusted R² can fall. Explain the mechanism that " +
      "produces the difference.",
    rubric: {
      elements: [
        {
          id: "two-competing-changes",
          description:
            "Explains that the adjustment divides SSE by n − p − 1, so adding a predictor shrinks both the numerator and its denominator, and the ratio falls only if the fit gain is large enough.",
          weight: 4,
          required: true,
          misconception: {
            id: "penalty-treated-as-arbitrary",
            description:
              "Describes the adjustment as an arbitrary penalty rather than as a degrees-of-freedom correction with a specific competing effect.",
            blameConceptId: "effect-of-adding-another-variable",
          },
        },
        {
          id: "resolves-r2-problem",
          description:
            "Connects this back to R²'s inability to compare models of different sizes, which the adjustment is designed to repair.",
          weight: 3,
          required: true,
        },
        {
          id: "weak-penalty-caveat",
          description:
            "Bonus: notes the penalty is weak — roughly 'keep anything with |t| > 1' — so adjusted R² is a fix for R², not a strong selection criterion.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.68,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["effect-of-adding-another-variable", "r-squared", "ssr-sse-sst"],
    source: ISLR,
    status: "live",
  },
  {
    id: "effect-of-adding-another-variable--explain-mediator-collider",
    conceptId: "effect-of-adding-another-variable",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "'Controlling for more variables' is often treated as more careful analysis. Give two distinct ways that " +
      "adding a control variable can make a coefficient a worse estimate of the effect of interest, and say " +
      "why no fit statistic warns you.",
    rubric: {
      elements: [
        {
          id: "mediator",
          description:
            "Describes conditioning on a variable that lies on the causal path from the predictor to the response, which removes exactly the effect being estimated.",
          weight: 3,
          required: true,
        },
        {
          id: "collider-or-second-mechanism",
          description:
            "Gives a second distinct mechanism — conditioning on a common effect of the predictor and the response, which induces an association that was not there.",
          weight: 3,
          required: true,
          misconception: {
            id: "more-controls-always-safer",
            description:
              "Treats adding controls as monotonically improving, so no mechanism for harm is identified.",
            blameConceptId: "effect-of-adding-another-variable",
          },
        },
        {
          id: "invisible-to-diagnostics",
          description:
            "Explains that both cases can improve fit and leave the residual diagnostics clean, because the problem is in the causal structure rather than in the data.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.7,
    expectedSeconds: 270,
    prereqClosure: ["effect-of-adding-another-variable", "multiple-linear-regression", "covariance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "effect-of-adding-another-variable--transfer-collinearity-signature",
    conceptId: "effect-of-adding-another-variable",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A model has a highly significant overall F-test and R² = 0.78, yet not one of its six coefficients is " +
      "individually significant. Explain how both can be true and what you suspect.",
    rubric: {
      elements: [
        {
          id: "different-questions",
          description:
            "Explains that the F-test asks whether the predictors collectively explain variation, while each t-test asks whether one predictor explains variation the others do not.",
          weight: 3,
          required: true,
          misconception: {
            id: "pattern-called-contradiction",
            description:
              "Reads the pattern as a computational error or a contradiction rather than as an informative signature.",
            blameConceptId: "effect-of-adding-another-variable",
          },
        },
        {
          id: "diagnosis",
          description:
            "Diagnoses multicollinearity: correlated predictors leave almost no unique variation, so individual standard errors inflate while the joint signal stays strong.",
          weight: 3,
          required: true,
        },
        {
          id: "next-step",
          description:
            "Names a next step — compute VIFs, or move to a regularised fit.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.18,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["effect-of-adding-another-variable", "multiple-linear-regression", "r-squared"],
    source: ISLR,
    status: "live",
  },
  {
    id: "effect-of-adding-another-variable--transfer-prediction-vs-explanation",
    conceptId: "effect-of-adding-another-variable",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A predictor is strongly correlated with several variables already in the model and improves held-out " +
      "prediction slightly. Argue whether to include it, separately for a forecasting model and for a model " +
      "whose purpose is to estimate one specific coefficient.",
    rubric: {
      elements: [
        {
          id: "forecasting-case",
          description:
            "For forecasting, includes it: correlated predictors are harmless when only the fitted values matter, and held-out error is the right criterion.",
          weight: 3,
          required: true,
        },
        {
          id: "explanation-case",
          description:
            "For estimating one coefficient, is far more cautious: the collinearity inflates that coefficient's standard error, and whether the variable belongs depends on the causal structure rather than on fit.",
          weight: 3,
          required: true,
          misconception: {
            id: "one-criterion-for-both-goals",
            description:
              "Applies a single inclusion rule to both purposes, missing that the criteria genuinely differ.",
            blameConceptId: "effect-of-adding-another-variable",
          },
        },
        {
          id: "states-the-decision-rule",
          description:
            "Articulates the general rule: prediction is judged by held-out error, explanation by whether the variable is a confounder, a mediator or a collider.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.7,
    expectedSeconds: 270,
    prereqClosure: ["effect-of-adding-another-variable", "multiple-linear-regression", "r-squared"],
    source: ESL,
    status: "live",
  },

  // --- Variance Inflation Factor --------------------------------------------
  {
    id: "vif--recall-definition",
    conceptId: "vif",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The variance inflation factor for predictor Xⱼ is:",
    choices: [
      {
        id: "a",
        text: "1/(1 − R²ⱼ), where R²ⱼ comes from regressing Xⱼ on all the other predictors",
        correct: true,
      },
      {
        id: "b",
        text: "1/(1 − R²), using the R² of the main regression of y on all predictors",
        correct: false,
        misconception: {
          id: "uses-main-r-squared",
          description:
            "Uses the model's own R². VIF comes from an auxiliary regression among the predictors, in which the response plays no part at all.",
          blameConceptId: "vif",
        },
      },
      {
        id: "c",
        text: "The correlation between Xⱼ and the response",
        correct: false,
        misconception: {
          id: "vif-as-predictor-response-association",
          description:
            "Measures association with y. VIF measures redundancy among the predictors, which is a different thing.",
          blameConceptId: "vif",
        },
      },
      {
        id: "d",
        text: "The ratio of Var(Xⱼ) to Var(y)",
        correct: false,
        misconception: {
          id: "vif-as-variance-ratio",
          description:
            "Compares raw variances, which says nothing about how much of Xⱼ the other predictors can already explain.",
          blameConceptId: "vif",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["vif", "r-squared", "multiple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "vif--recall-minimum-value",
    conceptId: "vif",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A VIF of exactly 1 means:",
    choices: [
      {
        id: "a",
        text: "The predictor is uncorrelated with the others, so its coefficient variance is not inflated at all",
        correct: true,
      },
      {
        id: "b",
        text: "The predictor is perfectly correlated with the others",
        correct: false,
        misconception: {
          id: "vif-scale-inverted",
          description:
            "Reads the scale backwards. Perfect correlation gives R²ⱼ = 1 and drives the VIF to infinity, not to its minimum.",
          blameConceptId: "vif",
        },
      },
      {
        id: "c",
        text: "The predictor has no relationship with the response",
        correct: false,
        misconception: {
          id: "vif-read-as-usefulness",
          description:
            "Reads VIF as a measure of a predictor's usefulness. It says nothing about the response.",
          blameConceptId: "vif",
        },
      },
      {
        id: "d",
        text: "The coefficient estimate is exactly zero",
        correct: false,
        misconception: {
          id: "vif-confused-with-coefficient",
          description:
            "Confuses a variance multiplier with the coefficient's value; the two are unrelated.",
          blameConceptId: "vif",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["vif", "r-squared"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "vif--apply-compute",
    conceptId: "vif",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Regressing X₃ on the other predictors gives R²₃ = 0.75. What is VIF₃? Give a whole number.",
    answerKey: 4,
    tolerance: 0.01,
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 60,
    prereqClosure: ["vif", "r-squared"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "vif--apply-se-multiplier",
    conceptId: "vif",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A predictor has VIF = 9. By what factor is its coefficient's standard error larger than it would be if " +
      "the predictor were uncorrelated with the others? Give a whole number.",
    answerKey: 3,
    tolerance: 0.01,
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 90,
    prereqClosure: ["vif", "r-squared", "variance"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "vif--explain-why-inflation",
    conceptId: "vif",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why VIF is called a variance *inflation* factor — what exactly is being inflated, relative to " +
      "what baseline?",
    rubric: {
      elements: [
        {
          id: "multiplicative-factor",
          description:
            "States that Var(β̂ⱼ) equals the variance the predictor would have on its own, times VIFⱼ — so VIF is literally the multiplier, not a proxy for one.",
          weight: 4,
          required: true,
          misconception: {
            id: "vif-as-vague-index",
            description:
              "Describes VIF as an index of collinearity without identifying the exact quantity it multiplies.",
            blameConceptId: "vif",
          },
        },
        {
          id: "names-the-baseline",
          description:
            "Identifies the baseline: the variance β̂ⱼ would have if Xⱼ were orthogonal to every other predictor.",
          weight: 3,
          required: true,
        },
        {
          id: "square-root-for-se",
          description:
            "Notes that standard errors are inflated by √VIF, which is what makes the conventional thresholds of 5 and 10 interpretable.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["vif", "variance", "r-squared", "multiple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "vif--explain-structural-collinearity",
    conceptId: "vif",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A model includes x and x², and both report VIFs above 20. Explain why this is usually not a data " +
      "problem, and give the standard fix.",
    rubric: {
      elements: [
        {
          id: "structural-not-empirical",
          description:
            "Explains that over a range of positive x values, x and x² are strongly correlated by construction — the collinearity is an artefact of the parameterisation rather than a feature of the data.",
          weight: 3,
          required: true,
          misconception: {
            id: "structural-collinearity-treated-as-data-problem",
            description:
              "Treats the high VIF as evidence of redundant measurement and proposes dropping a term, which changes the model's shape.",
            blameConceptId: "vif",
          },
        },
        {
          id: "centring-fix",
          description:
            "Gives the fix: centre x at its mean before squaring, which removes most of the correlation while leaving the fitted values and predictions unchanged.",
          weight: 3,
          required: true,
        },
        {
          id: "same-for-interactions",
          description:
            "Notes the identical situation and fix for interaction terms.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["vif", "multiple-linear-regression", "r-squared"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "vif--transfer-when-to-ignore",
    conceptId: "vif",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A forecasting model has several predictors with VIFs above 15 and performs excellently on held-out " +
      "data. A colleague insists the collinear predictors must be removed. Take a position and defend it.",
    rubric: {
      elements: [
        {
          id: "collinearity-harms-interpretation-not-prediction",
          description:
            "Argues that collinearity inflates the variance of individual coefficients but does not bias the model or damage predictions within the observed range of the predictors.",
          weight: 4,
          required: true,
          misconception: {
            id: "vif-threshold-applied-mechanically",
            description:
              "Applies the rule of thumb as a rule, without asking whether individual coefficients are what the model is for.",
            blameConceptId: "vif",
          },
        },
        {
          id: "cost-of-removal",
          description:
            "Notes that dropping a predictor that belongs in the model causes omitted variable bias in the rest — trading a variance problem for a bias problem.",
          weight: 3,
          required: true,
        },
        {
          id: "caveat",
          description:
            "Adds the honest caveat: predictions can still degrade if future data falls outside the correlation structure the model was fitted on.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["vif", "multiple-linear-regression", "variance"],
    source: ESL,
    status: "live",
  },
  {
    id: "vif--transfer-vif-vs-correlation-matrix",
    conceptId: "vif",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An analyst inspects the pairwise correlation matrix, finds no pair above 0.6, and concludes there is no " +
      "collinearity problem. Explain what this check can miss, and what VIF adds.",
    rubric: {
      elements: [
        {
          id: "pairwise-blindness",
          description:
            "Explains that a variable can be an exact or near-exact linear combination of several others while correlating only moderately with each one individually.",
          weight: 4,
          required: true,
          misconception: {
            id: "pairwise-correlation-treated-as-sufficient",
            description:
              "Assumes collinearity is a pairwise phenomenon, so a clean correlation matrix rules it out.",
            blameConceptId: "vif",
          },
        },
        {
          id: "vif-is-multivariate",
          description:
            "States that VIF regresses each predictor on all the others at once, so it detects exactly the multi-variable dependence the pairwise view cannot.",
          weight: 3,
          required: true,
        },
        {
          id: "concrete-example",
          description:
            "Gives a concrete case, such as a total that is the sum of several component variables all included in the model.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["vif", "r-squared", "multiple-linear-regression", "covariance"],
    source: NIST_HANDBOOK,
    status: "live",
  },
];
