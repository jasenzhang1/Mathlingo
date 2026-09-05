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
];
