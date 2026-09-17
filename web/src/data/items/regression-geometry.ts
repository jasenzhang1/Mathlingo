import type { Item } from "../../lib/assessment/types";
import { AUTHORED, BISHOP_PRML, CASELLA_BERGER_REG, ESL, ISLR, NIST_HANDBOOK, OCW_18_06, OCW_18_650 } from "./sources";

/**
 * REG-2 — Geometric Interpretation of OLS, Multiple Linear Regression, Linear
 * Regression (Probabilistic Version), OLS Assumptions, Homoskedasticity.
 *
 * Authored from `assessments/reg-02-ols-geometry-and-multiple-regression.md`.
 * The through-line of the cluster is that three different framings of the same
 * fit — projection, partial effect, and maximum likelihood — each make a
 * different question easy, so several items ask the learner to move between
 * them rather than to work inside one.
 */
export const regressionGeometryItems: Item[] = [
  // --- Geometric Interpretation of OLS --------------------------------------
  {
    id: "geometric-interpretation-of-ols--recall-projection",
    conceptId: "geometric-interpretation-of-ols",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Geometrically, the OLS fitted vector ŷ is:",
    choices: [
      { id: "a", text: "The orthogonal projection of y onto the column space of X", correct: true },
      {
        id: "b",
        text: "The projection of X onto the space spanned by y",
        correct: false,
        misconception: {
          id: "projection-direction-reversed",
          description:
            "Reverses the roles. It is the response that is projected onto what the predictors can reach, not the other way round.",
          blameConceptId: "vector-projection",
        },
      },
      {
        id: "c",
        text: "The point of the column space nearest the origin",
        correct: false,
        misconception: {
          id: "nearest-to-origin",
          description:
            "Minimises the wrong distance. Least squares minimises the distance to y, not to the origin.",
          blameConceptId: "geometric-interpretation-of-ols",
        },
      },
      {
        id: "d",
        text: "A vector in the orthogonal complement of the column space",
        correct: false,
        misconception: {
          id: "fitted-and-residual-swapped",
          description:
            "Describes the residual vector. The fitted vector lies inside the column space; the residual lies in its complement.",
          blameConceptId: "geometric-interpretation-of-ols",
        },
      },
    ],
    difficulty: 0.26,
    discrimination: 1.4,
    expectedSeconds: 40,
    prereqClosure: ["geometric-interpretation-of-ols", "column-space", "vector-projection"],
    source: OCW_18_06,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--recall-hat-matrix",
    conceptId: "geometric-interpretation-of-ols",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which properties does the hat matrix H = X(XᵀX)⁻¹Xᵀ have? Select all that apply.",
    choices: [
      { id: "a", text: "It is symmetric", correct: true },
      { id: "b", text: "It is idempotent: H² = H", correct: true },
      { id: "c", text: "Its eigenvalues are all 0 or 1", correct: true },
      { id: "d", text: "It depends only on X, not on y", correct: true },
      {
        id: "e",
        text: "It is invertible",
        correct: false,
        misconception: {
          id: "projection-assumed-invertible",
          description:
            "A projection onto a proper subspace destroys the perpendicular component, so it cannot be inverted — it has eigenvalue 0.",
          blameConceptId: "geometric-interpretation-of-ols",
        },
      },
      {
        id: "f",
        text: "It is an arbitrary computational convenience with no geometric meaning",
        correct: false,
        misconception: {
          id: "hat-matrix-as-mere-notation",
          description:
            "Misses that H is precisely the orthogonal projection operator onto C(X), which is what all its other properties follow from.",
          blameConceptId: "geometric-interpretation-of-ols",
        },
      },
    ],
    difficulty: 0.56,
    discrimination: 1.5,
    expectedSeconds: 70,
    prereqClosure: ["geometric-interpretation-of-ols", "column-space", "matrix-multiplication"],
    source: ESL,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--apply-trace-h",
    conceptId: "geometric-interpretation-of-ols",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A regression uses an intercept and 6 predictors on 40 observations, with X of full column rank. " +
      "What is trace(H) for the hat matrix of this fit? Give a whole number.",
    answerKey: 7,
    tolerance: 0.001,
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["geometric-interpretation-of-ols", "column-space", "matrix-multiplication"],
    source: ESL,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--apply-residual-variance-from-leverage",
    conceptId: "geometric-interpretation-of-ols",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "In a fit with σ² = 16, observation 12 has leverage h₁₂,₁₂ = 0.25. Using Var(eᵢ) = σ²(1 − hᵢᵢ), what is " +
      "the variance of that observation's residual? Give a whole number.",
    answerKey: 12,
    tolerance: 0.01,
    difficulty: 1.15,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["geometric-interpretation-of-ols", "variance", "matrix-multiplication"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--explain-idempotence",
    conceptId: "geometric-interpretation-of-ols",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Verify algebraically that H = X(XᵀX)⁻¹Xᵀ satisfies H² = H, then say why the result is obvious " +
      "geometrically without any algebra at all.",
    rubric: {
      elements: [
        {
          id: "algebraic-cancellation",
          description:
            "Writes out H² and identifies the middle (XᵀX)⁻¹(XᵀX) collapsing to the identity, leaving H.",
          weight: 3,
          required: true,
          misconception: {
            id: "asserts-idempotence",
            description: "States H² = H without showing the cancellation that produces it.",
            blameConceptId: "matrix-multiplication",
          },
        },
        {
          id: "geometric-reason",
          description:
            "Explains that Hy already lies in C(X), and projecting a point already in the subspace leaves it unchanged.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.06,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: ["geometric-interpretation-of-ols", "matrix-multiplication", "column-space"],
    source: OCW_18_06,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--explain-degrees-of-freedom-as-dimension",
    conceptId: "geometric-interpretation-of-ols",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the residual degrees of freedom is n − p − 1, using the geometry of the fit rather than a " +
      "counting rule.",
    rubric: {
      elements: [
        {
          id: "splits-the-space",
          description:
            "Describes ℝⁿ splitting into C(X), of dimension p + 1, and its orthogonal complement, of dimension n − p − 1.",
          weight: 3,
          required: true,
          misconception: {
            id: "df-as-bookkeeping",
            description:
              "Explains n − p − 1 as 'subtract one per parameter' with no account of what is being subtracted from what.",
            blameConceptId: "geometric-interpretation-of-ols",
          },
        },
        {
          id: "residual-confined",
          description:
            "States that the residual vector is confined to the complement, so it has that many free coordinates rather than n.",
          weight: 3,
          required: true,
        },
        {
          id: "connects-to-sigma-hat",
          description:
            "Connects this to σ̂² = SSE/(n − p − 1) being the unbiased variance estimate.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["geometric-interpretation-of-ols", "column-space", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--transfer-trace-eigenvalue-argument",
    conceptId: "geometric-interpretation-of-ols",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Show that trace(H) equals the number of fitted coefficients, using only the fact that H² = H — and say " +
      "what practical quantity that gives you for a method with no coefficients to count.",
    rubric: {
      elements: [
        {
          id: "eigenvalue-restriction",
          description:
            "Argues from Hv = λv and H² = H that λ² = λ, forcing every eigenvalue to be 0 or 1.",
          weight: 3,
          required: true,
          misconception: {
            id: "trace-computed-not-argued",
            description:
              "Reaches trace(H) = p + 1 by direct computation on an example rather than by the eigenvalue argument, so nothing generalises.",
            blameConceptId: "geometric-interpretation-of-ols",
          },
        },
        {
          id: "trace-counts-ones",
          description:
            "States that the trace is the sum of the eigenvalues, hence a count of the 1s, which is the dimension of C(X).",
          weight: 3,
          required: true,
        },
        {
          id: "effective-df",
          description:
            "Notes that for smoothers with no obvious parameter count — LOESS, ridge, splines — the trace of the equivalent smoother matrix is taken as the definition of effective degrees of freedom.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.26,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["geometric-interpretation-of-ols", "matrix-multiplication", "column-space"],
    source: ESL,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--transfer-leverage-hides-misfit",
    conceptId: "geometric-interpretation-of-ols",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An analyst scans the raw residuals for the largest values to find problem observations, and reports " +
      "that the fit looks clean. Explain, using Var(eᵢ) = σ²(1 − hᵢᵢ), why this procedure systematically " +
      "misses the observations that matter most, and what it should look at instead.",
    rubric: {
      elements: [
        {
          id: "high-leverage-small-residual",
          description:
            "Explains that as hᵢᵢ approaches 1 the residual's variance shrinks toward zero, because the fit is dragged toward that point — so the most influential observations tend to show small raw residuals.",
          weight: 4,
          required: true,
          misconception: {
            id: "raw-residuals-treated-as-comparable",
            description:
              "Assumes residuals are exchangeable across observations, when their variances differ by leverage.",
            blameConceptId: "geometric-interpretation-of-ols",
          },
        },
        {
          id: "standardise-instead",
          description:
            "Says to use standardised or studentised residuals, which divide by √(1 − hᵢᵢ), and to look at leverage and influence measures directly.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["geometric-interpretation-of-ols", "variance", "matrix-multiplication"],
    source: NIST_HANDBOOK,
    status: "live",
  },

  // --- Multiple Linear Regression -------------------------------------------
  {
    id: "multiple-linear-regression--recall-partial-effect",
    conceptId: "multiple-linear-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In a multiple regression, the coefficient βⱼ is interpreted as:",
    choices: [
      {
        id: "a",
        text: "The average change in Y per unit of Xⱼ among units matching on every other predictor in the model",
        correct: true,
      },
      {
        id: "b",
        text: "The same quantity a simple regression of Y on Xⱼ alone would estimate",
        correct: false,
        misconception: {
          id: "partial-equals-marginal",
          description:
            "Assumes the partial and marginal effects agree. They coincide only when Xⱼ is uncorrelated with every other predictor.",
          blameConceptId: "multiple-linear-regression",
        },
      },
      {
        id: "c",
        text: "The correlation between Xⱼ and Y",
        correct: false,
        misconception: {
          id: "coefficient-as-correlation",
          description:
            "Confuses a slope, which carries units, with a scale-free measure of association.",
          blameConceptId: "covariance",
        },
      },
      {
        id: "d",
        text: "The share of the variance in Y that Xⱼ explains",
        correct: false,
        misconception: {
          id: "coefficient-as-variance-share",
          description:
            "Confuses a rate of change with a proportion of variation explained, which is a different quantity entirely.",
          blameConceptId: "multiple-linear-regression",
        },
      },
    ],
    difficulty: 0.43,
    discrimination: 1.4,
    expectedSeconds: 40,
    prereqClosure: ["multiple-linear-regression", "ordinary-least-squares"],
    source: ISLR,
    status: "live",
  },
  {
    id: "multiple-linear-regression--recall-what-changes",
    conceptId: "multiple-linear-regression",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "Moving from simple to multiple linear regression, which of the following stay exactly the same? " +
      "Select all that apply.",
    choices: [
      { id: "a", text: "The normal equations XᵀXβ̂ = Xᵀy", correct: true },
      { id: "b", text: "The least-squares objective, ‖y − Xβ‖²", correct: true },
      { id: "c", text: "The geometric picture: project y onto the column space of X", correct: true },
      {
        id: "d",
        text: "The interpretation of each slope coefficient",
        correct: false,
        misconception: {
          id: "interpretation-assumed-unchanged",
          description:
            "Misses the one thing that genuinely changes: a coefficient becomes a partial effect, conditional on the other predictors.",
          blameConceptId: "multiple-linear-regression",
        },
      },
      {
        id: "e",
        text: "The residual degrees of freedom",
        correct: false,
        misconception: {
          id: "df-assumed-unchanged",
          description:
            "Each added predictor costs a degree of freedom, so n − p − 1 falls as the model grows.",
          blameConceptId: "multiple-linear-regression",
        },
      },
    ],
    difficulty: 0.7,
    discrimination: 1.5,
    expectedSeconds: 70,
    prereqClosure: ["multiple-linear-regression", "normal-equations", "ordinary-least-squares"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multiple-linear-regression--apply-interaction-marginal-effect",
    conceptId: "multiple-linear-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A fitted model is Ŷ = 5 + 2·X₁ + 3·X₂ + 4·(X₁·X₂). What is the effect on Ŷ of a one-unit increase in " +
      "X₁ when X₂ = 3? Give a whole number.",
    answerKey: 14,
    tolerance: 0.01,
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["multiple-linear-regression", "ordinary-least-squares"],
    source: ISLR,
    status: "live",
  },
  {
    id: "multiple-linear-regression--apply-dummy-columns",
    conceptId: "multiple-linear-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A model has 3 continuous predictors plus one categorical predictor with 5 levels, coded with a baseline " +
      "and an intercept in the model. How many columns does the design matrix X have in total, counting the " +
      "intercept column? Give a whole number.",
    answerKey: 8,
    tolerance: 0.001,
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["multiple-linear-regression", "matrix-multiplication", "normal-equations"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "multiple-linear-regression--explain-credit-reshuffling",
    conceptId: "multiple-linear-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Adding a correlated predictor to a model changes the coefficients of the predictors that were already " +
      "there. Explain the mechanism — why it does not merely add a new number and leave the others alone.",
    rubric: {
      elements: [
        {
          id: "shared-variation",
          description:
            "Explains that correlated predictors overlap in the variation they explain, so adding one changes how the shared variation is attributed among them.",
          weight: 3,
          required: true,
          misconception: {
            id: "coefficients-assumed-independent",
            description:
              "Treats each coefficient as measuring its own predictor in isolation, so adding a variable could not affect the others.",
            blameConceptId: "multiple-linear-regression",
          },
        },
        {
          id: "conditional-question-changed",
          description:
            "States that the question each coefficient answers has changed — from 'holding these fixed' to 'holding these and the new one fixed'.",
          weight: 3,
          required: true,
        },
        {
          id: "orthogonal-exception",
          description:
            "Notes that a predictor orthogonal to all the others leaves their coefficients untouched, which is the exception that proves the mechanism.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.63,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["multiple-linear-regression", "covariance", "ordinary-least-squares"],
    source: ESL,
    status: "live",
  },
  {
    id: "multiple-linear-regression--explain-interaction-main-effect",
    conceptId: "multiple-linear-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A model contains X₁, X₂ and their interaction X₁·X₂. A colleague reads the coefficient on X₁ as 'the " +
      "effect of X₁'. Explain what is wrong with that reading and what would make the coefficient " +
      "interpretable.",
    rubric: {
      elements: [
        {
          id: "effect-depends-on-x2",
          description:
            "States that with an interaction the effect of X₁ is β₁ + β₃X₂, so β₁ alone is the effect only at X₂ = 0.",
          weight: 3,
          required: true,
          misconception: {
            id: "main-effect-read-unconditionally",
            description:
              "Reads a coefficient in an interaction model as an unconditional effect, ignoring that the model makes it conditional by construction.",
            blameConceptId: "multiple-linear-regression",
          },
        },
        {
          id: "zero-may-be-meaningless",
          description:
            "Notes that X₂ = 0 may lie outside the observed data entirely, in which case β₁ describes a case that never occurs.",
          weight: 2,
          required: true,
        },
        {
          id: "centring-fix",
          description:
            "Recommends centring X₂ at its mean, which makes β₁ the effect of X₁ at the average value of X₂ — and incidentally reduces the collinearity between the interaction term and its components.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["multiple-linear-regression", "ordinary-least-squares"],
    source: ISLR,
    status: "live",
  },
  {
    id: "multiple-linear-regression--transfer-sign-flip",
    conceptId: "multiple-linear-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Regressing ice-cream sales on the number of lifeguards on duty gives a strong positive coefficient. " +
      "Adding daily temperature to the model drives that coefficient to roughly zero. Explain what happened, " +
      "and say which of the two coefficients — if either — could support a causal reading.",
    rubric: {
      elements: [
        {
          id: "identifies-confounder",
          description:
            "Identifies temperature as a common cause of both staffing and sales, so the simple-regression coefficient absorbed its effect.",
          weight: 3,
          required: true,
          misconception: {
            id: "sign-change-called-an-error",
            description:
              "Treats the change as evidence one of the models is broken, rather than as the two coefficients answering different questions.",
            blameConceptId: "multiple-linear-regression",
          },
        },
        {
          id: "residual-variation",
          description:
            "Explains that with temperature in the model, only the variation in staffing orthogonal to temperature is used — extra guards on days no hotter than average — and that variation carries little signal.",
          weight: 3,
          required: true,
        },
        {
          id: "causal-caveat",
          description:
            "States that only the second is a candidate for a causal reading, and only if temperature was the sole confounder — which the data cannot confirm.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.13,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["multiple-linear-regression", "covariance", "ordinary-least-squares"],
    source: ISLR,
    status: "live",
  },
  {
    id: "multiple-linear-regression--transfer-frisch-waugh",
    conceptId: "multiple-linear-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "β̂ⱼ from a multiple regression can be recovered by a three-step procedure that never fits the full " +
      "model: regress Xⱼ on the other predictors and keep the residuals, regress y on those same other " +
      "predictors and keep its residuals, then regress the second residuals on the first. Explain what this " +
      "procedure reveals about what 'controlling for the other variables' means.",
    rubric: {
      elements: [
        {
          id: "only-orthogonal-variation-used",
          description:
            "States that only the part of Xⱼ that the other predictors cannot explain is used, so βⱼ is estimated from that residual variation alone.",
          weight: 4,
          required: true,
          misconception: {
            id: "controlling-as-vague-adjustment",
            description:
              "Describes controlling as a general adjustment without identifying which variation in Xⱼ actually contributes to the estimate.",
            blameConceptId: "multiple-linear-regression",
          },
        },
        {
          id: "explains-collinearity-cost",
          description:
            "Draws the consequence: if the other predictors explain nearly all of Xⱼ, almost no variation is left, which is exactly why collinearity inflates the coefficient's standard error.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["multiple-linear-regression", "covariance", "ordinary-least-squares", "normal-equations"],
    source: ESL,
    status: "live",
  },

  // --- Linear Regression, Probabilistic Version -----------------------------
  {
    id: "linear-regression-probabilistic-version--recall-model",
    conceptId: "linear-regression-probabilistic-version",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The probabilistic form of the linear regression model states that:",
    choices: [
      { id: "a", text: "Y | X ~ Normal(Xβ, σ²), independently across observations", correct: true },
      {
        id: "b",
        text: "X ~ Normal(0, σ²), so the predictors must be normally distributed",
        correct: false,
        misconception: {
          id: "normality-assigned-to-predictors",
          description:
            "Places the normality assumption on the predictors. The model conditions on X and says nothing about its distribution.",
          blameConceptId: "normal-distribution",
        },
      },
      {
        id: "c",
        text: "The marginal distribution of Y is normal",
        correct: false,
        misconception: {
          id: "marginal-instead-of-conditional",
          description:
            "Asserts normality of Y unconditionally. Y is a mixture across values of X and can be strongly skewed while the conditional distribution is normal.",
          blameConceptId: "normal-distribution",
        },
      },
      {
        id: "d",
        text: "β ~ Normal(0, τ²), a distribution over the coefficients",
        correct: false,
        misconception: {
          id: "prior-mistaken-for-likelihood",
          description:
            "Describes a Bayesian prior on the coefficients, not the likelihood the classical model specifies.",
          blameConceptId: "linear-regression-probabilistic-version",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["linear-regression-probabilistic-version", "normal-distribution", "mle"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--recall-what-normality-buys",
    conceptId: "linear-regression-probabilistic-version",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "Which of these require the normal-error assumption, as opposed to holding without it? " +
      "Select all that apply.",
    choices: [
      { id: "a", text: "β̂_OLS being exactly the maximum likelihood estimator", correct: true },
      { id: "b", text: "Exact t-tests for individual coefficients in small samples", correct: true },
      { id: "c", text: "Prediction intervals for a single new observation", correct: true },
      {
        id: "d",
        text: "β̂ being unbiased",
        correct: false,
        misconception: {
          id: "unbiasedness-credited-to-normality",
          description:
            "Attributes unbiasedness to normality. It follows from E[ε | X] = 0 alone.",
          blameConceptId: "linear-regression-probabilistic-version",
        },
      },
      {
        id: "e",
        text: "The formula Var(β̂) = σ²(XᵀX)⁻¹",
        correct: false,
        misconception: {
          id: "variance-formula-credited-to-normality",
          description:
            "Attributes the variance formula to normality. It needs homoskedastic, uncorrelated errors — not a distributional shape.",
          blameConceptId: "linear-regression-probabilistic-version",
        },
      },
    ],
    difficulty: 0.75,
    discrimination: 1.6,
    expectedSeconds: 80,
    prereqClosure: ["linear-regression-probabilistic-version", "normal-distribution", "mle", "variance"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--apply-sigma-hat",
    conceptId: "linear-regression-probabilistic-version",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A regression with an intercept and 3 predictors is fitted on 24 observations, giving SSE = 84. What is " +
      "the unbiased estimate σ̂² of the error variance? Give a decimal to one place.",
    answerKey: 4.2,
    tolerance: 0.01,
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["linear-regression-probabilistic-version", "variance", "multiple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--apply-mle-vs-unbiased",
    conceptId: "linear-regression-probabilistic-version",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "For the same fit — an intercept and 3 predictors on 24 observations with SSE = 84 — what value does " +
      "maximum likelihood give for σ², which divides by n rather than by the residual degrees of freedom? " +
      "Give a decimal to two places.",
    answerKey: 3.5,
    tolerance: 0.01,
    difficulty: 1.35,
    discrimination: 1.6,
    expectedSeconds: 100,
    prereqClosure: ["linear-regression-probabilistic-version", "mle", "variance"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--explain-ols-is-mle",
    conceptId: "linear-regression-probabilistic-version",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Show that under normal errors, maximising the likelihood over β is exactly minimising the sum of " +
      "squared residuals. Write down the log-likelihood and identify the term that does the work.",
    rubric: {
      elements: [
        {
          id: "writes-log-likelihood",
          description:
            "Writes ℓ(β, σ²) = −(n/2)ln(2πσ²) − (1/(2σ²))Σ(yᵢ − xᵢᵀβ)².",
          weight: 3,
          required: true,
          misconception: {
            id: "asserts-equivalence",
            description:
              "Claims OLS and MLE coincide without exhibiting the term that makes them coincide.",
            blameConceptId: "mle",
          },
        },
        {
          id: "isolates-beta-term",
          description:
            "Observes that the only β-dependent term is −(1/(2σ²))Σ(yᵢ − xᵢᵀβ)², with a negative coefficient.",
          weight: 3,
          required: true,
        },
        {
          id: "concludes",
          description:
            "Concludes that maximising over β means minimising Σ(yᵢ − xᵢᵀβ)², so β̂_MLE = β̂_OLS exactly rather than approximately.",
          weight: 2,
          required: true,
        },
        {
          id: "sigma-caveat",
          description:
            "Bonus: notes the same maximisation over σ² gives SSE/n, which is biased — so the two estimators agree on β but not on σ².",
          weight: 1,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.7,
    expectedSeconds: 300,
    prereqClosure: ["linear-regression-probabilistic-version", "mle", "normal-distribution", "likelihood-vs-probability"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--explain-beta-hat-normal",
    conceptId: "linear-regression-probabilistic-version",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why β̂ ~ Normal(β, σ²(XᵀX)⁻¹) follows almost immediately once the errors are assumed normal, " +
      "and what practical machinery that single fact unlocks.",
    rubric: {
      elements: [
        {
          id: "linear-function-of-y",
          description:
            "Identifies β̂ = (XᵀX)⁻¹Xᵀy as a fixed linear map applied to y, and invokes the closure of the normal family under linear transformations.",
          weight: 3,
          required: true,
          misconception: {
            id: "normality-of-beta-hat-assumed",
            description:
              "Asserts β̂ is normal because the errors are, without naming the closure property that licenses the step.",
            blameConceptId: "normal-distribution",
          },
        },
        {
          id: "mean-and-variance",
          description:
            "Computes the mean as β and the covariance as σ²(XᵀX)⁻¹ from that linear form.",
          weight: 2,
          required: true,
        },
        {
          id: "what-it-unlocks",
          description:
            "Names the payoff: standard errors, t-tests and confidence intervals for coefficients, none of which the purely geometric view supplies.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["linear-regression-probabilistic-version", "normal-distribution", "variance", "expectation"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--transfer-generalises-to-logistic",
    conceptId: "linear-regression-probabilistic-version",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The geometric view of OLS — project y onto the column space of X — has no useful extension to a binary " +
      "outcome, while the likelihood view extends immediately. Explain why, and describe what changes and what " +
      "stays the same when the outcome becomes binary.",
    rubric: {
      elements: [
        {
          id: "geometry-does-not-extend",
          description:
            "Explains that projecting a vector of zeros and ones onto a subspace has no useful meaning, and that squared error is not the natural fit criterion for a binary outcome.",
          weight: 3,
          required: true,
        },
        {
          id: "swap-the-distribution",
          description:
            "States that the likelihood framing keeps the linear predictor and swaps the assumed distribution of Y from normal to Bernoulli, with a link function connecting the two.",
          weight: 4,
          required: true,
          misconception: {
            id: "logistic-treated-as-unrelated",
            description:
              "Treats logistic regression as a separate method rather than the same template with one component changed.",
            blameConceptId: "linear-regression-probabilistic-version",
          },
        },
        {
          id: "loss-is-a-likelihood",
          description:
            "Bonus: notes that the negative log-likelihood of a normal is squared error and of a Bernoulli is cross-entropy — the same identity in both cases.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["linear-regression-probabilistic-version", "mle", "normal-distribution", "likelihood-vs-probability"],
    source: BISHOP_PRML,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--transfer-ci-vs-prediction-interval",
    conceptId: "linear-regression-probabilistic-version",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "With n = 50,000 observations and visibly skewed residuals, a colleague argues that the central limit " +
      "theorem makes the non-normality irrelevant. Say where they are right and where they are wrong.",
    rubric: {
      elements: [
        {
          id: "ci-is-fine",
          description:
            "Agrees that confidence intervals and tests for coefficients are robust, because β̂ is essentially a weighted sum of the observations and the CLT applies.",
          weight: 3,
          required: true,
        },
        {
          id: "prediction-interval-is-not",
          description:
            "Identifies the exception: a prediction interval for a single future observation depends on the error distribution directly, so its coverage does not improve with sample size.",
          weight: 4,
          required: true,
          misconception: {
            id: "clt-applied-to-single-observations",
            description:
              "Extends the CLT's protection to intervals about individual outcomes, where no averaging takes place.",
            blameConceptId: "linear-regression-probabilistic-version",
          },
        },
        {
          id: "remedy",
          description:
            "Suggests a remedy for the prediction problem — transforming the response, quantile regression, or a bootstrap interval.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.45,
    discrimination: 1.8,
    expectedSeconds: 270,
    prereqClosure: ["linear-regression-probabilistic-version", "normal-distribution", "variance"],
    source: AUTHORED,
    status: "live",
  },

  // --- OLS Assumptions ------------------------------------------------------
  {
    id: "ols-assumptions--recall-list",
    conceptId: "ols-assumptions",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of these are standard assumptions of the linear regression model? Select all that apply.",
    choices: [
      { id: "a", text: "E[Y | X] is linear in the coefficients", correct: true },
      { id: "b", text: "The errors have mean zero given the predictors", correct: true },
      { id: "c", text: "The errors have constant variance", correct: true },
      { id: "d", text: "The errors are uncorrelated across observations", correct: true },
      { id: "e", text: "No predictor is an exact linear combination of the others", correct: true },
      {
        id: "f",
        text: "The predictors are normally distributed",
        correct: false,
        misconception: {
          id: "normality-assigned-to-x",
          description:
            "Places a distributional assumption on X. The model conditions on the predictors and assumes nothing about their distribution.",
          blameConceptId: "ols-assumptions",
        },
      },
      {
        id: "g",
        text: "The response is normally distributed marginally",
        correct: false,
        misconception: {
          id: "marginal-normality-of-y",
          description:
            "Assumes normality of Y unconditionally. It is the errors — equivalently Y given X — that the normality assumption concerns.",
          blameConceptId: "ols-assumptions",
        },
      },
    ],
    difficulty: 0.15,
    discrimination: 1.4,
    expectedSeconds: 80,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "ols-assumptions--recall-normality-role",
    conceptId: "ols-assumptions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "If the errors are not normally distributed but every other assumption holds, what breaks?",
    choices: [
      {
        id: "a",
        text: "Exact small-sample t- and F-tests, though the central limit theorem usually rescues them for large n",
        correct: true,
      },
      {
        id: "b",
        text: "The coefficient estimates become biased",
        correct: false,
        misconception: {
          id: "normality-violation-biases-coefficients",
          description:
            "Attributes bias to non-normality. Unbiasedness follows from E[ε | X] = 0 and is untouched by the error distribution's shape.",
          blameConceptId: "ols-assumptions",
        },
      },
      {
        id: "c",
        text: "The normal equations no longer have a solution",
        correct: false,
        misconception: {
          id: "normality-required-for-fitting",
          description:
            "Confuses the fitting procedure, which is pure linear algebra, with the distributional assumptions used for inference.",
          blameConceptId: "ols-assumptions",
        },
      },
      {
        id: "d",
        text: "Nothing at all — normality is never used anywhere",
        correct: false,
        misconception: {
          id: "normality-dismissed-entirely",
          description:
            "Overcorrects. Normality is genuinely needed for exact finite-sample inference and for prediction intervals.",
          blameConceptId: "ols-assumptions",
        },
      },
    ],
    difficulty: 0.45,
    discrimination: 1.5,
    expectedSeconds: 50,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "ols-assumptions--apply-omitted-variable-bias-sign",
    conceptId: "ols-assumptions",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "Wages are regressed on years of education, omitting innate ability. Ability raises wages and is " +
      "positively correlated with education. In which direction is the education coefficient biased?",
    choices: [
      { id: "a", text: "Upward — it overstates the return to education", correct: true },
      {
        id: "b",
        text: "Downward — the omitted variable absorbs part of the effect",
        correct: false,
        misconception: {
          id: "ovb-sign-reversed",
          description:
            "Gets the direction backwards. The bias has the sign of (effect of the omitted variable) × (its correlation with the included one), which is positive here.",
          blameConceptId: "ols-assumptions",
        },
      },
      {
        id: "c",
        text: "It is unbiased, since ability is not in the model",
        correct: false,
        misconception: {
          id: "omission-assumed-harmless",
          description:
            "Assumes leaving a variable out is neutral. Omitting it puts it into the error term, which then correlates with education and breaks exogeneity.",
          blameConceptId: "ols-assumptions",
        },
      },
      {
        id: "d",
        text: "The direction cannot be determined without the data",
        correct: false,
        misconception: {
          id: "ovb-direction-thought-unknowable",
          description:
            "Misses that the sign of the bias follows from subject-matter reasoning about two signs, with no data needed.",
          blameConceptId: "ols-assumptions",
        },
      },
    ],
    difficulty: 0.95,
    discrimination: 1.6,
    expectedSeconds: 100,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression", "covariance"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "ols-assumptions--apply-unbiasedness-vs-efficiency",
    conceptId: "ols-assumptions",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "Is homoskedasticity required for the OLS coefficient estimates to be unbiased? Answer, and say what " +
      "homoskedasticity is actually needed for.",
    rubric: {
      elements: [
        {
          id: "answers-no",
          description:
            "Says no: unbiasedness follows from E[ε | X] = 0 alone, which heteroskedasticity does not disturb.",
          weight: 3,
          required: true,
          misconception: {
            id: "heteroskedasticity-biases-coefficients",
            description:
              "Believes non-constant variance biases the estimates, conflating a variance problem with a bias problem.",
            blameConceptId: "ols-assumptions",
          },
        },
        {
          id: "what-it-is-needed-for",
          description:
            "States what it is needed for: the minimum-variance (BLUE) property, and the correctness of the usual standard-error formula.",
          weight: 3,
          required: true,
        },
        {
          id: "practical-consequence",
          description:
            "Notes the practical consequence — the estimates are usable but the reported uncertainty is wrong, usually too small.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["ols-assumptions", "variance", "multiple-linear-regression"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "ols-assumptions--explain-residual-plots",
    conceptId: "ols-assumptions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Residual plots, not formal tests, are the standard tool for checking regression assumptions. Give two " +
      "specific patterns a residual-versus-fitted plot can reveal and what each indicates, and explain why " +
      "plots are usually preferred to a significance test.",
    rubric: {
      elements: [
        {
          id: "two-patterns",
          description:
            "Names at least two concrete patterns with their meanings — e.g. curvature indicating unmodelled nonlinearity, a funnel indicating heteroskedasticity, runs of same-signed residuals indicating serial correlation.",
          weight: 3,
          required: true,
          misconception: {
            id: "plots-described-vaguely",
            description:
              "Says residual plots reveal 'problems' without naming a pattern or what it means, so no diagnostic is actually described.",
            blameConceptId: "ols-assumptions",
          },
        },
        {
          id: "sample-size-problem",
          description:
            "Explains that formal tests reject trivial deviations at large n and miss serious ones at small n, while a plot shows the size and shape of the violation.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.65,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "ols-assumptions--explain-endogeneity-not-fixed-by-n",
    conceptId: "ols-assumptions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A team has a million observations and a confounder they cannot measure. Explain why the extra data does " +
      "not help, and contrast this with a violation that a large sample genuinely does repair.",
    rubric: {
      elements: [
        {
          id: "bias-not-variance",
          description:
            "Explains that an unmeasured confounder breaks E[ε | X] = 0, producing bias — convergence to the wrong number rather than noise around the right one.",
          weight: 3,
          required: true,
          misconception: {
            id: "more-data-fixes-everything",
            description:
              "Treats sample size as a general remedy, missing that it shrinks variance and does nothing to bias.",
            blameConceptId: "ols-assumptions",
          },
        },
        {
          id: "precisely-wrong",
          description:
            "Draws the sharp consequence: a huge sample yields a narrow confidence interval that confidently excludes the truth.",
          weight: 3,
          required: true,
        },
        {
          id: "contrast",
          description:
            "Contrasts with non-normal errors, where the central limit theorem does make large samples a genuine repair.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression", "expectation"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "ols-assumptions--transfer-rank-the-violations",
    conceptId: "ols-assumptions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Rank a violated linearity assumption against a violated homoskedasticity assumption in seriousness, and " +
      "justify the ranking by what each does to the fitted model.",
    rubric: {
      elements: [
        {
          id: "linearity-worse",
          description: "Ranks the linearity violation as more serious.",
          weight: 2,
          required: true,
        },
        {
          id: "misspecification-argument",
          description:
            "Argues that a wrong functional form biases the estimates and the predictions systematically, and that the bias does not shrink with sample size — with infinite data you converge to the best-fitting wrong model.",
          weight: 3,
          required: true,
          misconception: {
            id: "all-violations-treated-alike",
            description:
              "Treats every assumption violation as equally damaging, so no triage of diagnostic effort is possible.",
            blameConceptId: "ols-assumptions",
          },
        },
        {
          id: "fixable-inference",
          description:
            "Contrasts with heteroskedasticity, which leaves the estimates unbiased and is repaired by a different standard-error formula.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression", "variance"],
    source: ESL,
    status: "live",
  },
  {
    id: "ols-assumptions--transfer-diagnose-from-description",
    conceptId: "ols-assumptions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A model of daily sales on advertising spend is fitted to two years of consecutive days. The " +
      "residual-versus-time plot shows long runs of positive residuals followed by long runs of negative ones. " +
      "Name the assumption in question, say what it does to the reported results, and give a remedy.",
    rubric: {
      elements: [
        {
          id: "identifies-autocorrelation",
          description:
            "Identifies serial correlation of the errors — the uncorrelated-errors assumption — as the violation the runs indicate.",
          weight: 3,
          required: true,
          misconception: {
            id: "runs-read-as-nonlinearity",
            description:
              "Reads runs against time as evidence of a nonlinear relationship with the predictor, missing that the ordering variable here is time.",
            blameConceptId: "ols-assumptions",
          },
        },
        {
          id: "consequence",
          description:
            "States that the coefficients remain unbiased but standard errors are typically far too small, so significance is overstated.",
          weight: 3,
          required: true,
        },
        {
          id: "remedy",
          description:
            "Gives a concrete remedy — Newey–West standard errors, a lagged response, or an explicit time-series model.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression", "variance"],
    source: NIST_HANDBOOK,
    status: "live",
  },

  // --- Homoskedasticity -----------------------------------------------------
  {
    id: "homoskedasticity--recall-definition",
    conceptId: "homoskedasticity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Homoskedasticity is the assumption that:",
    choices: [
      { id: "a", text: "Var(ε | X) is the same at every value of the predictors", correct: true },
      {
        id: "b",
        text: "The errors all have the same mean",
        correct: false,
        misconception: {
          id: "constant-mean-not-variance",
          description:
            "States the mean-zero condition instead. Homoskedasticity concerns the second moment, not the first.",
          blameConceptId: "homoskedasticity",
        },
      },
      {
        id: "c",
        text: "The predictors all have the same variance",
        correct: false,
        misconception: {
          id: "variance-attributed-to-predictors",
          description:
            "Applies the condition to X rather than to the errors. Nothing is assumed about the spread of the predictors.",
          blameConceptId: "homoskedasticity",
        },
      },
      {
        id: "d",
        text: "The response has the same variance as the errors",
        correct: false,
        misconception: {
          id: "confuses-response-and-error-variance",
          description:
            "Conflates Var(Y) with Var(ε | X). The response's marginal variance also contains the variation the model explains.",
          blameConceptId: "homoskedasticity",
        },
      },
    ],
    difficulty: 0.17,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["homoskedasticity", "variance", "ols-assumptions"],
    source: ISLR,
    status: "live",
  },
  {
    id: "homoskedasticity--recall-examples",
    conceptId: "homoskedasticity",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In which settings would you expect heteroskedasticity? Select all that apply.",
    choices: [
      { id: "a", text: "Household spending regressed on household income", correct: true },
      { id: "b", text: "Firm profit regressed on firm size", correct: true },
      { id: "c", text: "A group average regressed on a predictor, where group sizes differ widely", correct: true },
      {
        id: "d",
        text: "Any regression, since heteroskedasticity is unavoidable in principle",
        correct: false,
        misconception: {
          id: "heteroskedasticity-assumed-universal",
          description:
            "Overgeneralises. Many well-designed experiments with a controlled measurement process are genuinely homoskedastic.",
          blameConceptId: "homoskedasticity",
        },
      },
      {
        id: "e",
        text: "None of these — heteroskedasticity is rare in real data",
        correct: false,
        misconception: {
          id: "heteroskedasticity-assumed-rare",
          description:
            "Treats it as an exotic edge case. For most economic, biological and count-valued outcomes it is the default.",
          blameConceptId: "homoskedasticity",
        },
      },
    ],
    difficulty: 0.47,
    discrimination: 1.4,
    expectedSeconds: 65,
    prereqClosure: ["homoskedasticity", "variance", "ols-assumptions"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "homoskedasticity--apply-read-funnel",
    conceptId: "homoskedasticity",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A residual-versus-fitted plot shows residuals within ±2 near fitted values of 10 and within ±30 near " +
      "fitted values of 500, with no systematic curvature. What does this indicate?",
    choices: [
      {
        id: "a",
        text: "Heteroskedasticity: the coefficients are still unbiased, but the standard errors should not be trusted",
        correct: true,
      },
      {
        id: "b",
        text: "A nonlinear relationship that the model has failed to capture",
        correct: false,
        misconception: {
          id: "spread-read-as-curvature",
          description:
            "Reads changing spread as changing location. Curvature is a pattern in the residuals' mean; a funnel is a pattern in their variance.",
          blameConceptId: "homoskedasticity",
        },
      },
      {
        id: "c",
        text: "The coefficient estimates are biased and must be refitted",
        correct: false,
        misconception: {
          id: "funnel-implies-bias",
          description:
            "Concludes bias from non-constant variance. Unbiasedness depends on the conditional mean of the errors, not their spread.",
          blameConceptId: "homoskedasticity",
        },
      },
      {
        id: "d",
        text: "Nothing — residual spread naturally grows with the fitted value in every regression",
        correct: false,
        misconception: {
          id: "funnel-dismissed-as-normal",
          description:
            "Normalises the pattern. Under homoskedasticity the band is flat, so a funnel is exactly the diagnostic signal.",
          blameConceptId: "homoskedasticity",
        },
      },
    ],
    difficulty: 0.97,
    discrimination: 1.5,
    expectedSeconds: 80,
    prereqClosure: ["homoskedasticity", "variance", "ols-assumptions"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "homoskedasticity--apply-group-mean-variance",
    conceptId: "homoskedasticity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Group averages are used as the response, and an individual observation has variance σ² = 400. Group A " +
      "has 4 members and group B has 100. By what factor is the variance of group A's average larger than " +
      "group B's? Give a whole number.",
    answerKey: 25,
    tolerance: 0.01,
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["homoskedasticity", "variance", "sample-mean"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "homoskedasticity--explain-why-se-formula-fails",
    conceptId: "homoskedasticity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Heteroskedasticity does not bias the coefficients, yet it makes the usual standard errors wrong. " +
      "Explain the mechanism, and say which direction the error usually runs.",
    rubric: {
      elements: [
        {
          id: "formula-assumed-constant-variance",
          description:
            "Explains that Var(β̂) = σ²(XᵀX)⁻¹ is derived assuming Var(ε) = σ²I; with a non-constant variance the correct expression is the sandwich form and the familiar one no longer applies.",
          weight: 4,
          required: true,
          misconception: {
            id: "se-error-attributed-to-estimation-noise",
            description:
              "Attributes the problem to imprecise estimation of σ² rather than to the formula itself being derived under an assumption that fails.",
            blameConceptId: "homoskedasticity",
          },
        },
        {
          id: "direction",
          description:
            "States that in the common case the naive formula understates the variance, giving intervals that are too narrow and t-statistics that are too large.",
          weight: 3,
          required: true,
        },
        {
          id: "not-fixed-by-n",
          description:
            "Notes that more data does not repair this — the naive formula converges to the wrong number.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.67,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["homoskedasticity", "variance", "ols-assumptions", "multiple-linear-regression"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "homoskedasticity--explain-log-transform",
    conceptId: "homoskedasticity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Modelling log(Y) instead of Y often removes a funnel-shaped residual pattern. Explain why, and name a " +
      "cost of doing it.",
    rubric: {
      elements: [
        {
          id: "proportional-spread",
          description:
            "Explains that when the spread is roughly proportional to the level, taking logs converts multiplicative variation into additive variation, stabilising the variance.",
          weight: 3,
          required: true,
          misconception: {
            id: "log-as-generic-fix",
            description:
              "Recommends logs as a general-purpose remedy without identifying the proportional mean–variance relationship that makes them work.",
            blameConceptId: "homoskedasticity",
          },
        },
        {
          id: "names-a-cost",
          description:
            "Names a genuine cost — the coefficients now describe approximate percentage effects rather than level changes, the model fails if any Y is zero or negative, and predictions back-transform to a median rather than a mean.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["homoskedasticity", "variance", "ols-assumptions"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "homoskedasticity--transfer-robust-standard-errors",
    conceptId: "homoskedasticity",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Many practitioners report robust standard errors by default, without first testing for " +
      "heteroskedasticity. Explain what robust standard errors do, and make the case for that default — " +
      "including where it is weakest.",
    rubric: {
      elements: [
        {
          id: "unknown-form",
          description:
            "States that robust (White-type) standard errors estimate the correct variance without needing to know how the variance changes with X.",
          weight: 3,
          required: true,
          misconception: {
            id: "robust-se-requires-modelling-variance",
            description:
              "Believes the form of the heteroskedasticity must be specified, which is what weighted least squares requires and robust standard errors avoid.",
            blameConceptId: "homoskedasticity",
          },
        },
        {
          id: "cheap-insurance",
          description:
            "Argues that they cost only slightly wider intervals when homoskedasticity does hold, so the expected cost of using them is small relative to the cost of being wrong.",
          weight: 3,
          required: true,
        },
        {
          id: "small-sample-caveat",
          description:
            "Identifies the weak point: in small samples they can be anti-conservative, which is why HC3 and similar corrections exist.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.17,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["homoskedasticity", "variance", "ols-assumptions"],
    source: ESL,
    status: "live",
  },
  {
    id: "homoskedasticity--transfer-choose-a-remedy",
    conceptId: "homoskedasticity",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A response is a count of events per store per week, and its residual spread clearly grows with the " +
      "fitted value. Compare using robust standard errors against changing to a model whose variance grows " +
      "with the mean by construction, and say which you would choose.",
    rubric: {
      elements: [
        {
          id: "robust-treats-symptom",
          description:
            "Notes that robust standard errors fix the inference while leaving the model's own claim about the variance wrong.",
          weight: 3,
          required: true,
        },
        {
          id: "model-matches-structure",
          description:
            "Notes that a count model builds the mean–variance relationship in, so the heteroskedasticity is part of the model rather than a violation of it — and it also respects the non-negative, integer nature of the response.",
          weight: 3,
          required: true,
          misconception: {
            id: "remedy-chosen-without-response-type",
            description:
              "Chooses a remedy purely from the residual plot, without noticing that the response is a count and a distribution exists for exactly that case.",
            blameConceptId: "homoskedasticity",
          },
        },
        {
          id: "makes-a-choice",
          description:
            "Commits to a recommendation with a reason, rather than listing options.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.7,
    expectedSeconds: 270,
    prereqClosure: ["homoskedasticity", "variance", "ols-assumptions", "multiple-linear-regression"],
    source: AUTHORED,
    status: "live",
  },

  // --- Additional items (doubling pass) -------------------------------------

  // --- Geometric Interpretation of OLS (cont.) ------------------------------
  {
    id: "geometric-interpretation-of-ols--recall-column-space-def",
    conceptId: "geometric-interpretation-of-ols",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The column space of X, written C(X), is:",
    choices: [
      { id: "a", text: "The set of all vectors of the form Xb for some coefficient vector b", correct: true },
      {
        id: "b",
        text: "The set of rows of X",
        correct: false,
        misconception: {
          id: "column-space-confused-with-rows",
          description: "Confuses columns with rows. The column space is spanned by X's columns, not its rows.",
          blameConceptId: "column-space",
        },
      },
      {
        id: "c",
        text: "The set of vectors orthogonal to every column of X",
        correct: false,
        misconception: {
          id: "column-space-confused-with-orthogonal-complement",
          description: "Describes the orthogonal complement of C(X), a different subspace entirely — the one the residual lives in.",
          blameConceptId: "column-space",
        },
      },
      {
        id: "d",
        text: "The set of eigenvectors of X",
        correct: false,
        misconception: {
          id: "column-space-confused-with-eigenvectors",
          description: "X need not even be square, so it has no eigenvectors in general. The column space is a span, not a spectral notion.",
          blameConceptId: "column-space",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["geometric-interpretation-of-ols", "column-space"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--recall-residual-orthogonality",
    conceptId: "geometric-interpretation-of-ols",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State, without derivation, the geometric relationship between the residual vector e and the column space of X.",
    rubric: {
      elements: [
        {
          id: "orthogonal",
          description: "e is orthogonal to every vector in C(X) — equivalently, e is orthogonal to ŷ and to every column of X.",
          weight: 4,
          required: true,
          misconception: {
            id: "residual-thought-parallel",
            description: "Believes the residual lies inside C(X) alongside the fit, rather than in its orthogonal complement.",
            blameConceptId: "geometric-interpretation-of-ols",
          },
        },
      ],
    },
    difficulty: -1.6,
    discrimination: 1.0,
    expectedSeconds: 35,
    prereqClosure: ["geometric-interpretation-of-ols", "column-space", "vector-projection"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--apply-trace-h-small-model",
    conceptId: "geometric-interpretation-of-ols",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A simple regression uses an intercept and 1 predictor, fit on 10 observations, with X of full column rank. " +
      "What is trace(H) for this fit? Give a whole number.",
    answerKey: 2,
    tolerance: 0.001,
    difficulty: 0.45,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["geometric-interpretation-of-ols", "column-space", "matrix-multiplication"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--apply-two-step-residual-variance",
    conceptId: "geometric-interpretation-of-ols",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A regression with an intercept and 5 predictors is fit on 50 observations, giving SSE = 176. Using " +
      "σ̂² = SSE/(n − p − 1), then Var(eᵢ) = σ̂²(1 − hᵢᵢ) for an observation with leverage hᵢᵢ = 0.9, compute " +
      "Var(eᵢ). Give a decimal to two places.",
    answerKey: 0.4,
    tolerance: 0.01,
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 130,
    prereqClosure: ["geometric-interpretation-of-ols", "variance", "matrix-multiplication"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--explain-normal-equations-orthogonality",
    conceptId: "geometric-interpretation-of-ols",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Starting from the normal equations XᵀXβ̂ = Xᵀy, show algebraically that Xᵀe = 0, where e = y − Xβ̂, and " +
      "state in words what this identity means geometrically.",
    rubric: {
      elements: [
        {
          id: "algebra",
          description: "Rewrites Xᵀe = Xᵀ(y − Xβ̂) = Xᵀy − XᵀXβ̂, then substitutes the normal equations to get Xᵀy − Xᵀy = 0.",
          weight: 4,
          required: true,
          misconception: {
            id: "asserts-orthogonality-without-algebra",
            description: "States Xᵀe = 0 without deriving it from the normal equations.",
            blameConceptId: "matrix-multiplication",
          },
        },
        {
          id: "geometric-meaning",
          description: "States that this says e is orthogonal to every column of X, i.e. to C(X) as a whole.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["geometric-interpretation-of-ols", "matrix-multiplication", "column-space"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--explain-pythagorean-decomposition",
    conceptId: "geometric-interpretation-of-ols",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "y decomposes as ŷ + e, with ŷ ∈ C(X) and e orthogonal to C(X). Explain why this licenses ‖y‖² = ‖ŷ‖² + ‖e‖², " +
      "and name the regression-output identity that this is.",
    rubric: {
      elements: [
        {
          id: "pythagoras-from-orthogonality",
          description: "Explains that for orthogonal vectors a and b, ‖a + b‖² = ‖a‖² + ‖b‖² because the cross term 2aᵀb vanishes, and applies this to ŷ and e.",
          weight: 4,
          required: true,
          misconception: {
            id: "sum-of-squares-asserted",
            description: "States the sum-of-squares identity without connecting it to the orthogonality of ŷ and e.",
            blameConceptId: "geometric-interpretation-of-ols",
          },
        },
        {
          id: "names-anova-identity",
          description: "Identifies this as the ANOVA decomposition SST = SSR + SSE (with y centred appropriately for the total sum of squares).",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["geometric-interpretation-of-ols", "column-space", "vector-projection"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--transfer-collinearity-breaks-picture",
    conceptId: "geometric-interpretation-of-ols",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain what happens to the geometric picture of OLS when two columns of X are exactly collinear, and why " +
      "(XᵀX)⁻¹ failing to exist is not a numerical inconvenience but a statement about the geometry itself.",
    rubric: {
      elements: [
        {
          id: "projection-still-exists",
          description: "Notes that C(X) still has a well-defined orthogonal projection onto it — ŷ is still uniquely determined.",
          weight: 3,
          required: true,
        },
        {
          id: "coefficients-not-unique",
          description: "Explains that infinitely many coefficient vectors b map to the same point in C(X), so β̂ is not identified even though ŷ is — the projection is unique but its coordinates in a redundant basis are not.",
          weight: 4,
          required: true,
          misconception: {
            id: "singularity-treated-as-numerical-glitch",
            description: "Treats non-invertibility as a computational rounding issue rather than as the correct statement that the coefficients are not identifiable.",
            blameConceptId: "geometric-interpretation-of-ols",
          },
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["geometric-interpretation-of-ols", "column-space", "matrix-multiplication"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "geometric-interpretation-of-ols--transfer-ridge-not-a-projection",
    conceptId: "geometric-interpretation-of-ols",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Ridge regression's fitted values are ŷ_ridge = X(XᵀX + λI)⁻¹Xᵀy for λ > 0, applying a different matrix in " +
      "place of H. Explain why this matrix is no longer an orthogonal projection, and what that costs and buys.",
    rubric: {
      elements: [
        {
          id: "not-idempotent",
          description: "Shows or states that the ridge operator is not idempotent and its eigenvalues lie strictly inside [0, 1) rather than being exactly 0 or 1, so it is a shrinkage operator, not a projection.",
          weight: 4,
          required: true,
          misconception: {
            id: "ridge-hat-matrix-assumed-a-projection",
            description: "Treats the ridge smoother matrix as if it still had the hat matrix's projection properties (idempotence, eigenvalues in {0,1}).",
            blameConceptId: "geometric-interpretation-of-ols",
          },
        },
        {
          id: "cost-and-benefit",
          description: "States the cost — ŷ_ridge no longer lies exactly in C(X) as the closest point to y, so it is biased — and the benefit — every fitted value is shrunk toward zero, which trades bias for reduced variance.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.65,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["geometric-interpretation-of-ols", "matrix-multiplication", "column-space"],
    source: AUTHORED,
    status: "live",
  },

  // --- Multiple Linear Regression (cont.) -----------------------------------
  {
    id: "multiple-linear-regression--recall-normal-equations-form",
    conceptId: "multiple-linear-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The normal equations that determine β̂ in multiple linear regression are:",
    choices: [
      { id: "a", text: "XᵀXβ̂ = Xᵀy", correct: true },
      {
        id: "b",
        text: "Xβ̂ = y",
        correct: false,
        misconception: {
          id: "normal-equations-omit-transpose",
          description: "Drops the XᵀX / Xᵀy structure entirely. Xβ = y generally has no exact solution when n > p + 1, which is exactly why the normal equations are needed.",
          blameConceptId: "normal-equations",
        },
      },
      {
        id: "c",
        text: "β̂ = Xy",
        correct: false,
        misconception: {
          id: "normal-equations-dimension-mismatch",
          description: "The dimensions cannot even conform in general — β̂ has one entry per column of X, not per row.",
          blameConceptId: "normal-equations",
        },
      },
      {
        id: "d",
        text: "XᵀXβ̂ = y",
        correct: false,
        misconception: {
          id: "normal-equations-missing-xty",
          description: "Drops the Xᵀ on the right-hand side, so the dimensions no longer match unless X is square.",
          blameConceptId: "normal-equations",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.0,
    expectedSeconds: 35,
    prereqClosure: ["multiple-linear-regression", "normal-equations", "ordinary-least-squares"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multiple-linear-regression--recall-residual-df-formula",
    conceptId: "multiple-linear-regression",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the formula for the residual degrees of freedom of a multiple regression with p predictors and an intercept, fit on n observations.",
    rubric: {
      elements: [
        { id: "formula", description: "n − p − 1.", weight: 4, required: true },
      ],
    },
    difficulty: -1.3,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["multiple-linear-regression", "ordinary-least-squares"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multiple-linear-regression--apply-effect-without-interaction",
    conceptId: "multiple-linear-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "A fitted model is Ŷ = 10 + 2·X₁ − 3·X₂. What is the effect on Ŷ of a one-unit increase in X₁, holding X₂ fixed? Give a whole number.",
    answerKey: 2,
    tolerance: 0.001,
    difficulty: -0.2,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["multiple-linear-regression", "ordinary-least-squares"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multiple-linear-regression--apply-interaction-with-negative-sign",
    conceptId: "multiple-linear-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A fitted model is Ŷ = 4 + 1.2·X₁ + 0.8·X₂ − 0.5·(X₁·X₂). What is ∂Ŷ/∂X₁ evaluated at X₂ = 6? Give a decimal to one place.",
    answerKey: -1.8,
    tolerance: 0.01,
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 140,
    prereqClosure: ["multiple-linear-regression", "ordinary-least-squares"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multiple-linear-regression--explain-r-squared-never-decreases",
    conceptId: "multiple-linear-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why R² cannot decrease when a predictor is added to a model — even a predictor with no real relationship to Y — and why adjusted R² can.",
    rubric: {
      elements: [
        {
          id: "r-squared-weakly-increases",
          description: "Explains that OLS minimises SSE, and adding a column can only enlarge the space searched over (setting the new coefficient to zero recovers the old fit exactly), so the minimised SSE cannot rise and R² cannot fall.",
          weight: 4,
          required: true,
          misconception: {
            id: "r-squared-thought-to-penalise-noise",
            description: "Believes R² automatically detects and penalises a useless added predictor, which it structurally cannot do.",
            blameConceptId: "multiple-linear-regression",
          },
        },
        {
          id: "adjusted-r-squared-penalises",
          description: "Explains that adjusted R² divides by residual degrees of freedom, which falls with every added predictor, so a predictor that does not reduce SSE proportionally more than it costs a degree of freedom lowers it.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["multiple-linear-regression", "ordinary-least-squares"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multiple-linear-regression--explain-perfect-collinearity-undefined",
    conceptId: "multiple-linear-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why adding a predictor that is an exact linear combination of existing predictors makes β̂ undefined, rather than merely making the estimates large or unstable.",
    rubric: {
      elements: [
        {
          id: "not-a-degree-question",
          description: "Distinguishes this sharply from near-collinearity: an exact linear dependence means XᵀX is singular, so the normal equations have infinitely many solutions rather than one large one.",
          weight: 4,
          required: true,
          misconception: {
            id: "exact-collinearity-treated-as-extreme-near-collinearity",
            description: "Treats perfect collinearity as merely a severe case of the instability near-collinearity causes, missing that it is a qualitatively different, non-identified situation.",
            blameConceptId: "multiple-linear-regression",
          },
        },
        {
          id: "fit-still-unique",
          description: "Notes that despite this, the fitted values ŷ remain unique — only the decomposition of credit among the collinear predictors is unidentified.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["multiple-linear-regression", "normal-equations", "ordinary-least-squares"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multiple-linear-regression--transfer-standardised-coefficients",
    conceptId: "multiple-linear-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Standardising every predictor and the response to zero mean and unit variance before fitting lets you compare coefficients across predictors measured in different units. Explain what the resulting 'beta coefficients' mean, " +
      "and what assumption that comparison silently relies on.",
    rubric: {
      elements: [
        {
          id: "beta-meaning",
          description: "States that each standardised coefficient is the effect, in standard deviations of Y, of a one-standard-deviation change in that predictor, holding the others fixed — a partial effect in comparable units.",
          weight: 4,
          required: true,
        },
        {
          id: "silent-assumption",
          description:
            "Names the assumption: that a one-SD change is a comparably meaningful or achievable move for every predictor. A one-SD move in a nearly-constant predictor may be tiny in practice while a one-SD move in a highly variable one is large, so 'bigger standardised coefficient' does not automatically mean 'more important lever'.",
          weight: 4,
          required: true,
          misconception: {
            id: "standardised-coefficients-read-as-importance",
            description: "Reads the largest standardised coefficient as automatically identifying the most important or most actionable predictor, ignoring that the comparison is relative to each predictor's own variability, not to any real-world unit of control.",
            blameConceptId: "multiple-linear-regression",
          },
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["multiple-linear-regression", "covariance", "ordinary-least-squares"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multiple-linear-regression--transfer-saturated-model",
    conceptId: "multiple-linear-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A model has p = n − 1 predictors plus an intercept, so it is fit on exactly as many parameters as observations. " +
      "Explain, geometrically, why R² = 1 always in this case, and why this makes in-sample fit statistics worthless here.",
    rubric: {
      elements: [
        {
          id: "geometric-reason",
          description: "Explains that C(X) is then all of ℝⁿ (dimension n), so the projection of y onto it is y itself — the residual vector is forced to be zero regardless of any real relationship.",
          weight: 4,
          required: true,
          misconception: {
            id: "perfect-fit-mistaken-for-strong-relationship",
            description: "Reads R² = 1 here as evidence the predictors explain Y well, rather than as a mechanical consequence of running out of residual degrees of freedom.",
            blameConceptId: "multiple-linear-regression",
          },
        },
        {
          id: "consequence",
          description: "Concludes that no in-sample statistic can distinguish a genuine fit from this degenerate one, so only performance on held-out data (or cross-validation) is informative once p approaches n.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.8,
    discrimination: 1.8,
    expectedSeconds: 220,
    prereqClosure: ["multiple-linear-regression", "column-space", "ordinary-least-squares"],
    source: AUTHORED,
    status: "live",
  },

  // --- Linear Regression, Probabilistic Version (cont.) ---------------------
  {
    id: "linear-regression-probabilistic-version--recall-sigma-squared-meaning",
    conceptId: "linear-regression-probabilistic-version",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In Y | X ~ Normal(Xβ, σ²), what does σ² represent?",
    choices: [
      { id: "a", text: "The constant variance of the error term, the same for every observation", correct: true },
      {
        id: "b",
        text: "The variance of the response Y marginally, before conditioning on X",
        correct: false,
        misconception: {
          id: "sigma-squared-confused-with-marginal-variance",
          description: "Confuses the conditional error variance with Var(Y), which also includes the variation Xβ explains and is generally larger.",
          blameConceptId: "linear-regression-probabilistic-version",
        },
      },
      {
        id: "c",
        text: "The variance of the predictors X",
        correct: false,
        misconception: {
          id: "sigma-squared-attributed-to-x",
          description: "The model conditions on X and says nothing about its distribution or variance.",
          blameConceptId: "linear-regression-probabilistic-version",
        },
      },
      {
        id: "d",
        text: "The sampling variance of β̂",
        correct: false,
        misconception: {
          id: "sigma-squared-confused-with-beta-hat-variance",
          description: "Var(β̂) = σ²(XᵀX)⁻¹ is built from σ², but σ² itself is the error variance, not the coefficient's sampling variance.",
          blameConceptId: "linear-regression-probabilistic-version",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["linear-regression-probabilistic-version", "normal-distribution"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--recall-mle-in-words",
    conceptId: "linear-regression-probabilistic-version",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "In one sentence, state what quantity maximum likelihood estimation chooses β to maximise.",
    rubric: {
      elements: [
        { id: "definition", description: "The likelihood (or log-likelihood) of the observed data as a function of β — the probability density of the data actually seen, evaluated at candidate parameter values.", weight: 4, required: true },
      ],
    },
    difficulty: -1.2,
    discrimination: 1.0,
    expectedSeconds: 35,
    prereqClosure: ["linear-regression-probabilistic-version", "mle"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--apply-easy-sigma-hat",
    conceptId: "linear-regression-probabilistic-version",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "A regression with an intercept and 2 predictors is fitted on 20 observations, giving SSE = 51. What is the unbiased estimate σ̂² of the error variance? Give a whole number.",
    answerKey: 3,
    tolerance: 0.01,
    difficulty: 0.2,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["linear-regression-probabilistic-version", "variance", "multiple-linear-regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--apply-from-mle-back-to-unbiased",
    conceptId: "linear-regression-probabilistic-version",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A regression with an intercept and 4 predictors is fitted on 15 observations. The maximum-likelihood estimate " +
      "of σ² (which divides by n) is 2.4. What is the unbiased estimate σ̂² (which divides by the residual degrees " +
      "of freedom)? Give a decimal to one place.",
    answerKey: 3.6,
    tolerance: 0.02,
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["linear-regression-probabilistic-version", "mle", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--explain-gauss-markov-vs-normal",
    conceptId: "linear-regression-probabilistic-version",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "The Gauss–Markov theorem shows OLS is BLUE without assuming normal errors. Explain what the normality assumption adds on top of that, and what it does not add.",
    rubric: {
      elements: [
        {
          id: "what-normality-adds",
          description: "Explains that normality upgrades 'best among linear unbiased estimators' to 'best among all unbiased estimators' (via the Cramér–Rao bound being attained), and licenses exact finite-sample inference.",
          weight: 4,
          required: true,
        },
        {
          id: "what-it-does-not-add",
          description: "Notes that normality does not change the point estimate β̂ itself, and does not improve unbiasedness or efficiency within the linear class beyond what Gauss–Markov already guarantees.",
          weight: 3,
          required: true,
          misconception: {
            id: "normality-thought-to-improve-blue-estimator",
            description: "Believes normal errors make β̂ 'more BLUE' or change its value, rather than only strengthening the optimality and inference claims that can be made about the same estimator.",
            blameConceptId: "linear-regression-probabilistic-version",
          },
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["linear-regression-probabilistic-version", "normal-distribution", "mle", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--explain-exact-vs-asymptotic-normality",
    conceptId: "linear-regression-probabilistic-version",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "β̂'s sampling distribution is exactly Normal(β, σ²(XᵀX)⁻¹) in this model, for any sample size. Explain why " +
      "this is stronger than the usual guarantee for a maximum-likelihood estimator, which is normal only " +
      "asymptotically.",
    rubric: {
      elements: [
        {
          id: "linear-functional-form",
          description: "Identifies that β̂ = (XᵀX)⁻¹Xᵀy is an exact linear function of y, and under the model's assumption that y is exactly normal, a linear transformation of a normal vector is exactly normal at any n — no limit is invoked.",
          weight: 5,
          required: true,
          misconception: {
            id: "exact-normality-attributed-to-clt",
            description: "Attributes β̂'s normality to the central limit theorem, which only delivers an approximation that improves with n — missing that here the result is exact because of the model's own distributional assumption plus linearity.",
            blameConceptId: "normal-distribution",
          },
        },
        {
          id: "general-mle-is-asymptotic",
          description: "Contrasts this with a general MLE, whose asymptotic normality is a large-sample approximation with no exact finite-sample counterpart in general.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["linear-regression-probabilistic-version", "mle", "normal-distribution"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--transfer-likelihood-ratio-test",
    conceptId: "linear-regression-probabilistic-version",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain how the probabilistic view licenses a formal test comparing two nested models (e.g. dropping several " +
      "predictors at once), and why the purely geometric projection view offers no such test on its own.",
    rubric: {
      elements: [
        {
          id: "likelihood-gives-a-test-statistic",
          description: "Explains that with a likelihood in hand, twice the difference in maximised log-likelihoods between the nested models has a known (chi-squared, or F in the normal-error case) reference distribution, which is what turns a comparison of fits into a hypothesis test with a p-value.",
          weight: 4,
          required: true,
        },
        {
          id: "geometry-has-no-distribution",
          description: "Notes that the geometric view supplies SSE for each model — a number describing how far y sits from each subspace — but says nothing on its own about how much SSE should be expected to shrink by chance alone; that requires a probabilistic model to attach a sampling distribution to the shrinkage.",
          weight: 4,
          required: true,
          misconception: {
            id: "smaller-sse-treated-as-automatically-significant",
            description: "Treats any reduction in SSE from adding predictors as evidence they matter, without a reference distribution to say how large a reduction would occur by chance.",
            blameConceptId: "linear-regression-probabilistic-version",
          },
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["linear-regression-probabilistic-version", "mle", "likelihood-vs-probability"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "linear-regression-probabilistic-version--transfer-mle-equals-ols-scope",
    conceptId: "linear-regression-probabilistic-version",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A colleague argues that because β̂_OLS = β̂_MLE under normal errors, any general property of maximum " +
      "likelihood estimators — consistency, asymptotic efficiency — automatically transfers to the OLS estimator " +
      "even when the errors are not normal. Assess this claim.",
    rubric: {
      elements: [
        {
          id: "ols-consistency-does-not-need-mle",
          description: "Notes that OLS's consistency and unbiasedness hold under much weaker conditions (E[ε | X] = 0) and do not rely on the normal-errors likelihood being correct — so that part of the claim is fine, but for reasons that have nothing to do with MLE theory.",
          weight: 4,
          required: true,
        },
        {
          id: "efficiency-claim-fails",
          description: "Explains that once the errors are not normal, maximising the normal likelihood is a misspecified (quasi-)likelihood, and the strong optimality results for MLEs assume the likelihood is correctly specified — so 'asymptotically efficient' does not carry over automatically; OLS is efficient among linear estimators (Gauss–Markov) but not necessarily among all estimators.",
          weight: 5,
          required: true,
          misconception: {
            id: "mle-optimality-assumed-transferable-under-misspecification",
            description: "Assumes that because an estimator happens to coincide with an MLE under one distributional assumption, all of that MLE's asymptotic optimality properties survive when that assumption is dropped.",
            blameConceptId: "mle",
          },
        },
      ],
    },
    difficulty: 2.9,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["linear-regression-probabilistic-version", "mle", "normal-distribution", "likelihood-vs-probability"],
    source: AUTHORED,
    status: "live",
  },

  // --- OLS Assumptions (cont.) -----------------------------------------------
  {
    id: "ols-assumptions--recall-exogeneity-name",
    conceptId: "ols-assumptions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The assumption E[ε | X] = 0 is usually referred to as:",
    choices: [
      { id: "a", text: "Exogeneity", correct: true },
      {
        id: "b",
        text: "Homoskedasticity",
        correct: false,
        misconception: {
          id: "exogeneity-confused-with-homoskedasticity",
          description: "Homoskedasticity concerns the variance of the errors, Var(ε | X); E[ε | X] = 0 concerns their mean.",
          blameConceptId: "ols-assumptions",
        },
      },
      {
        id: "c",
        text: "Linearity",
        correct: false,
        misconception: {
          id: "exogeneity-confused-with-linearity",
          description: "Linearity concerns the functional form E[Y | X] = Xβ; exogeneity is a separate assumption about the error term given that form.",
          blameConceptId: "ols-assumptions",
        },
      },
      {
        id: "d",
        text: "Normality",
        correct: false,
        misconception: {
          id: "exogeneity-confused-with-normality",
          description: "Normality concerns the shape of the error distribution; exogeneity concerns its conditional mean, which is a much weaker and more load-bearing condition.",
          blameConceptId: "ols-assumptions",
        },
      },
    ],
    difficulty: -2.1,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ols-assumptions--recall-unbiasedness-assumption",
    conceptId: "ols-assumptions",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the single assumption that alone guarantees OLS coefficient estimates are unbiased, and state it.",
    rubric: {
      elements: [
        { id: "names-it", description: "Exogeneity: E[ε | X] = 0, that the errors have conditional mean zero given the predictors.", weight: 4, required: true },
      ],
    },
    difficulty: -1.5,
    discrimination: 1.0,
    expectedSeconds: 35,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ols-assumptions--apply-measurement-error-attenuation",
    conceptId: "ols-assumptions",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A predictor is measured with classical random error (the recorded value is the true value plus independent " +
      "noise). Which assumption breaks, and what happens to the coefficient?",
    choices: [
      {
        id: "a",
        text: "Exogeneity breaks, and the coefficient is biased toward zero (attenuated)",
        correct: true,
      },
      {
        id: "b",
        text: "Homoskedasticity breaks, but the coefficient stays unbiased",
        correct: false,
        misconception: {
          id: "measurement-error-misfiled-as-heteroskedasticity",
          description: "Measurement error in a predictor correlates the recorded X with the error term, which is an exogeneity failure, not a variance-of-errors issue.",
          blameConceptId: "ols-assumptions",
        },
      },
      {
        id: "c",
        text: "No assumption breaks, since the noise is independent of the true value",
        correct: false,
        misconception: {
          id: "measurement-error-assumed-harmless",
          description: "Independence of the noise from the true value does not stop the noise from correlating the recorded (mismeasured) predictor with the composite error term — that correlation is exactly what breaks exogeneity.",
          blameConceptId: "ols-assumptions",
        },
      },
      {
        id: "d",
        text: "Exogeneity breaks, and the coefficient is biased away from zero (exaggerated)",
        correct: false,
        misconception: {
          id: "attenuation-direction-reversed",
          description: "Classical measurement error in a predictor biases its coefficient toward zero, not away from it — the noise dilutes the apparent relationship rather than inflating it.",
          blameConceptId: "ols-assumptions",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression", "covariance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ols-assumptions--apply-simultaneity-sign-undetermined",
    conceptId: "ols-assumptions",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "Advertising spend and sales are jointly determined: bigger budgets tend to follow stronger recent sales, and " +
      "advertising also boosts sales. Explain why the OLS coefficient on advertising is biased, and why — unlike " +
      "the omitted-ability wage example — the sign of the bias cannot be pinned down by reasoning alone.",
    rubric: {
      elements: [
        {
          id: "why-biased",
          description: "Explains that reverse causation puts sales into the determination of advertising, which correlates advertising with the error term and breaks exogeneity — the same structural problem as an omitted confounder, arrived at differently.",
          weight: 4,
          required: true,
          misconception: {
            id: "simultaneity-not-recognised-as-exogeneity-failure",
            description: "Treats simultaneity as a separate, unrelated issue from omitted-variable bias, rather than recognising both as breaking the same E[ε | X] = 0 condition.",
            blameConceptId: "ols-assumptions",
          },
        },
        {
          id: "why-sign-unclear",
          description: "Explains that two feedback effects run in opposite conceptual directions here (advertising raising sales; sales raising future advertising through a budgeting rule), and without knowing their relative strengths and the exact timing structure, the net sign of the correlation between advertising and the error cannot be signed from subject-matter reasoning the way a single omitted confounder's effect can be.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression", "covariance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ols-assumptions--explain-exact-vs-near-collinearity",
    conceptId: "ols-assumptions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why 'no exact linear dependence among predictors' is a strict requirement for the normal equations to have a unique solution, while near-collinearity is a matter of degree rather than a modelling error.",
    rubric: {
      elements: [
        {
          id: "exact-case-is-binary",
          description: "States that exact collinearity makes XᵀX exactly singular, so the normal equations have either no unique solution or infinitely many — a discrete failure of identification, not a matter of degree.",
          weight: 4,
          required: true,
        },
        {
          id: "near-case-is-continuous",
          description: "Explains that near-collinearity leaves XᵀX invertible but ill-conditioned, so β̂ remains uniquely defined and unbiased but its variance grows continuously as the predictors approach exact dependence — a precision problem, not an identification failure.",
          weight: 4,
          required: true,
          misconception: {
            id: "near-collinearity-treated-as-assumption-violation",
            description: "Treats near-collinearity as if it violated the no-perfect-collinearity assumption itself, rather than as a separate, continuous precision problem that exists even when the assumption technically holds.",
            blameConceptId: "ols-assumptions",
          },
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ols-assumptions--explain-normality-priority-by-sample-size",
    conceptId: "ols-assumptions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why checking residual normality is usually a low priority with a large sample, but remains essential for a small-sample prediction interval.",
    rubric: {
      elements: [
        {
          id: "large-sample-case",
          description: "Explains that coefficient tests and confidence intervals rely on β̂'s sampling distribution, which the central limit theorem makes approximately normal for large n regardless of the error shape — so departures from normality wash out.",
          weight: 4,
          required: true,
        },
        {
          id: "small-sample-prediction-case",
          description: "Explains that a prediction interval for one new observation depends directly on the shape of a single error draw, not on an average of many — no averaging protects it, so the error distribution's actual shape (not just its variance) matters at any sample size.",
          weight: 4,
          required: true,
          misconception: {
            id: "clt-applied-to-single-future-observation",
            description: "Assumes the central limit theorem's protection extends to a prediction interval for an individual future observation, where no averaging over observations takes place.",
            blameConceptId: "ols-assumptions",
          },
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ols-assumptions--transfer-population-level-endogeneity",
    conceptId: "ols-assumptions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A researcher fits the model on the entire population rather than a sample, and finds a nonzero correlation " +
      "between X and ε. Explain why this cannot be attributed to sampling variability, and what it says about the " +
      "model rather than about statistical inference.",
    rubric: {
      elements: [
        {
          id: "not-sampling-noise",
          description: "Explains that with no sampling involved, any correlation observed is a fact about the population's joint distribution, not an estimation artefact that would vanish with more data.",
          weight: 4,
          required: true,
          misconception: {
            id: "population-level-correlation-blamed-on-sampling",
            description: "Attributes a nonzero X–ε correlation at the population level to sampling noise, when there is no sample to have noise in — the correlation is a structural feature of how the model relates to the true data-generating process.",
            blameConceptId: "ols-assumptions",
          },
        },
        {
          id: "what-it-says",
          description: "Concludes that the linear model itself is misspecified for this population — some relevant variable or nonlinearity is missing from Xβ — rather than that inference on a correctly specified model happened to go wrong.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ols-assumptions--transfer-robust-se-does-not-fix-endogeneity",
    conceptId: "ols-assumptions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A model has both heteroskedastic errors and an omitted confounder. Explain why switching to robust standard " +
      "errors does nothing about the more serious problem, and why practitioners sometimes wrongly believe it does.",
    rubric: {
      elements: [
        {
          id: "robust-se-only-fixes-variance",
          description: "Explains that robust standard errors correct the formula used to quantify uncertainty around β̂; they do not touch β̂ itself, so they cannot repair a coefficient that is biased because E[ε | X] ≠ 0.",
          weight: 4,
          required: true,
        },
        {
          id: "why-the-confusion-arises",
          description: "Explains the likely source of the confusion: both heteroskedasticity and endogeneity produce 'untrustworthy' regression output, and 'robust' sounds like a general-purpose safeguard, which invites treating it as a fix for any problem with the fit rather than specifically for the standard-error formula.",
          weight: 4,
          required: true,
          misconception: {
            id: "robust-se-treated-as-general-purpose-fix",
            description: "Believes reporting robust standard errors addresses bias in the coefficient estimates, when robust standard errors only correct the variance formula around an estimate that heteroskedasticity leaves unbiased — they say nothing about a separately biased coefficient.",
            blameConceptId: "homoskedasticity",
          },
        },
      ],
    },
    difficulty: 2.9,
    discrimination: 1.8,
    expectedSeconds: 230,
    prereqClosure: ["ols-assumptions", "multiple-linear-regression", "variance"],
    source: AUTHORED,
    status: "live",
  },

  // --- Homoskedasticity (cont.) -----------------------------------------------
  {
    id: "homoskedasticity--recall-conditional-on-x",
    conceptId: "homoskedasticity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Homoskedasticity concerns the variance of:",
    choices: [
      { id: "a", text: "The errors, conditional on X", correct: true },
      {
        id: "b",
        text: "The response Y, marginally",
        correct: false,
        misconception: {
          id: "homoskedasticity-attributed-to-marginal-y",
          description: "Conflates Var(Y) with Var(ε | X). Y's marginal variance also contains the variation the model explains, and is not what homoskedasticity constrains.",
          blameConceptId: "homoskedasticity",
        },
      },
      {
        id: "c",
        text: "The fitted values ŷ",
        correct: false,
        misconception: {
          id: "homoskedasticity-attributed-to-fitted-values",
          description: "The fitted values are deterministic functions of X in a given sample; homoskedasticity is a statement about the random error term's spread.",
          blameConceptId: "homoskedasticity",
        },
      },
      {
        id: "d",
        text: "The coefficient estimates β̂",
        correct: false,
        misconception: {
          id: "homoskedasticity-attributed-to-coefficients",
          description: "Confuses the assumption about the errors with a statement about the sampling variance of β̂, which follows from it but is not what the assumption itself asserts.",
          blameConceptId: "homoskedasticity",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["homoskedasticity", "variance", "ols-assumptions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "homoskedasticity--recall-symbolic-statement",
    conceptId: "homoskedasticity",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Write the homoskedasticity condition in symbols.",
    rubric: {
      elements: [
        { id: "symbols", description: "Var(εᵢ | X) = σ² for every observation i — a single constant, not depending on i or on X.", weight: 4, required: true },
      ],
    },
    difficulty: -1.4,
    discrimination: 1.0,
    expectedSeconds: 35,
    prereqClosure: ["homoskedasticity", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "homoskedasticity--apply-variance-ratio",
    conceptId: "homoskedasticity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Individual observations have variance σ² = 100. Group A averages 4 of them and Group B averages 25. What is " +
      "the ratio of Group A's average's variance to Group B's? Give a decimal to two places.",
    answerKey: 6.25,
    tolerance: 0.02,
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["homoskedasticity", "variance", "sample-mean"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "homoskedasticity--apply-time-varying-violation",
    conceptId: "homoskedasticity",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A residual-versus-fitted plot shows constant spread across all fitted values, but a residual-versus-time plot " +
      "of the same residuals shows the spread growing steadily over calendar time. What does this indicate?",
    choices: [
      {
        id: "a",
        text: "Heteroskedasticity with respect to time, even though the fitted-value plot alone looked homoskedastic",
        correct: true,
      },
      {
        id: "b",
        text: "The model is homoskedastic, since the fitted-value plot is the only one that matters",
        correct: false,
        misconception: {
          id: "only-fitted-value-plot-checked",
          description: "Homoskedasticity is a claim about variance conditional on every relevant variable, not only the fitted value — a variable driving the variance can be invisible in one plot and obvious in another.",
          blameConceptId: "homoskedasticity",
        },
      },
      {
        id: "c",
        text: "This must be a coding error, since the two plots use the same residuals and should always agree",
        correct: false,
        misconception: {
          id: "plots-assumed-to-always-agree",
          description: "Two residual plots against different x-axes can show genuinely different patterns; each reveals whatever structure exists along that particular axis.",
          blameConceptId: "homoskedasticity",
        },
      },
      {
        id: "d",
        text: "It indicates a linearity violation, not a variance violation",
        correct: false,
        misconception: {
          id: "spread-pattern-read-as-linearity-issue",
          description: "A growing spread is a variance (second-moment) pattern; a linearity violation would show up as a trend in the residuals' mean, not their spread.",
          blameConceptId: "homoskedasticity",
        },
      },
    ],
    difficulty: 1.55,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["homoskedasticity", "variance", "ols-assumptions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "homoskedasticity--explain-conditional-not-marginal",
    conceptId: "homoskedasticity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why homoskedasticity is defined as a condition on Var(ε | X), conditional on the predictors, rather than as a statement about the errors' marginal (unconditional) variance.",
    rubric: {
      elements: [
        {
          id: "marginal-variance-is-a-single-number",
          description: "Notes that the marginal variance of ε is a single fixed number regardless of any relationship to X, so stating a condition on it would say nothing about whether the spread differs across values of X — the thing that actually matters for inference.",
          weight: 4,
          required: true,
        },
        {
          id: "conditional-is-the-load-bearing-quantity",
          description: "Explains that what the standard-error formula and BLUE property need is that the spread does not systematically vary with the predictors, which is exactly a statement about the conditional variance.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["homoskedasticity", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "homoskedasticity--explain-weighted-least-squares-mechanism",
    conceptId: "homoskedasticity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "In one sentence, identify what the weights in weighted least squares do that restores efficiency under known heteroskedasticity.",
    rubric: {
      elements: [
        {
          id: "the-mechanism",
          description: "The weights are chosen inversely proportional to each observation's error variance, so noisier observations are down-weighted and more precise ones up-weighted, converting the problem back into one with homoskedastic (unit-variance) errors.",
          weight: 5,
          required: true,
          misconception: {
            id: "wls-weights-thought-arbitrary",
            description: "Treats the weights as a generic tuning knob rather than as specifically the inverse of each observation's variance, which is what makes the transformed problem homoskedastic.",
            blameConceptId: "homoskedasticity",
          },
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["homoskedasticity", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "homoskedasticity--transfer-wls-restores-homoskedasticity",
    conceptId: "homoskedasticity",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A model has heteroskedastic errors with Var(εᵢ | Xᵢ) = σ²Xᵢ² exactly (Xᵢ > 0). Show why dividing every term of " +
      "the regression equation by Xᵢ (a weighted least squares fit with weight 1/Xᵢ) produces a transformed equation " +
      "with homoskedastic errors.",
    rubric: {
      elements: [
        {
          id: "transform-the-equation",
          description: "Divides both sides of Yᵢ = β₀ + β₁Xᵢ + εᵢ by Xᵢ to get Yᵢ/Xᵢ = β₀(1/Xᵢ) + β₁ + εᵢ/Xᵢ, so the new error term is εᵢ/Xᵢ.",
          weight: 4,
          required: true,
        },
        {
          id: "verify-constant-variance",
          description: "Computes Var(εᵢ/Xᵢ | X) = Var(εᵢ | X)/Xᵢ² = σ²Xᵢ²/Xᵢ² = σ², a constant not depending on i, confirming the transformed errors are homoskedastic.",
          weight: 5,
          required: true,
          misconception: {
            id: "transform-asserted-without-verifying-variance",
            description: "Performs the algebraic division but never checks that the resulting error term's variance is actually constant, which is the entire point of the transformation.",
            blameConceptId: "homoskedasticity",
          },
        },
      ],
    },
    difficulty: 2.65,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["homoskedasticity", "variance", "ols-assumptions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "homoskedasticity--transfer-random-x-asymptotics",
    conceptId: "homoskedasticity",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Robust standard errors are usually justified using asymptotics where X is treated as random and drawn " +
      "jointly with Y, even in studies where X is nominally fixed by the experimental design. Explain why this " +
      "framing is used regardless.",
    rubric: {
      elements: [
        {
          id: "heteroskedasticity-needs-a-model-free-target",
          description: "Explains that under fixed-X asymptotics with unknown heteroskedasticity of unspecified form, there is no single well-defined limiting variance to estimate without further structure; treating (X, Y) as jointly random observations from a population gives a sandwich-type asymptotic variance that is well-defined without specifying the heteroskedasticity's functional form.",
          weight: 4,
          required: true,
        },
        {
          id: "practical-equivalence",
          description: "Notes that in practice this framing is a technical device to justify the same estimator that would be used regardless of whether X was actually fixed by design — the formula does not change, only the story used to derive its large-sample properties.",
          weight: 4,
          required: true,
          misconception: {
            id: "random-x-framing-mistaken-for-a-different-estimator",
            description: "Believes random-X asymptotics implies a genuinely different standard-error formula is being used than in the fixed-X case, rather than the same robust formula being justified by a different, more convenient asymptotic argument.",
            blameConceptId: "homoskedasticity",
          },
        },
      ],
    },
    difficulty: 2.9,
    discrimination: 1.7,
    expectedSeconds: 230,
    prereqClosure: ["homoskedasticity", "variance", "ols-assumptions"],
    source: AUTHORED,
    status: "live",
  },
];
