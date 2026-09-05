import type { Item } from "../../lib/assessment/types";
import { AUTHORED, ESL, ISLR, NIST_HANDBOOK, OCW_18_650 } from "./sources";

/**
 * REG-EXT — five concepts added to the regression domain after the initial
 * 29-concept sweep, each a genuine gap surfaced while writing that sweep's
 * own wiki content rather than an arbitrary addition:
 *
 *   - `weighted-least-squares`      — homoskedasticity's own wiki names this
 *     as the direct remedy for known heteroskedasticity, but nothing defined it.
 *   - `outliers-leverage-influence` — leverage (the hat matrix's diagonal) is
 *     already derived in geometric-interpretation-of-ols, but had no concept
 *     of its own to attach Cook's distance and the outlier/influence
 *     distinction to.
 *   - `polynomial-regression`       — loess-smoothing's own wiki ends on "the
 *     usual workflow: use LOESS to discover the shape, then a parametric term
 *     such as a quadratic to quantify it" — a forward reference to a concept
 *     that did not exist.
 *   - `quantile-regression`         — ordinary-least-squares's own wiki
 *     contrasts squared error (the mean) against absolute error (the median)
 *     and gestures at "quantile regression" as the general form; it was
 *     never given its own treatment.
 *   - `poisson-regression`          — glm's own blurb says it "unifies
 *     linear, logistic, and Poisson regression," naming a method that had no
 *     concept page, the same gap `gradient-descent` left around `matrix-
 *     calculus` in the earlier ML sweep.
 *
 * 8 items per concept (2 per cognitive level), matching the bar the rest of
 * the regression domain was authored to. Every numeric answerKey was
 * recomputed independently before being written here.
 */
export const regressionExtensionsItems: Item[] = [
  // --- Weighted Least Squares -------------------------------------------------
  {
    id: "weighted-least-squares--recall-objective",
    conceptId: "weighted-least-squares",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Weighted least squares minimises:",
    choices: [
      {
        id: "a",
        text: "Σᵢ wᵢ(yᵢ − xᵢᵀβ)², with wᵢ = 1/σᵢ² for the known error variance of observation i",
        correct: true,
      },
      {
        id: "b",
        text: "Σᵢ (yᵢ − xᵢᵀβ)² / wᵢ, with wᵢ chosen to make every term equal",
        correct: false,
        misconception: {
          id: "weight-placement-inverted",
          description:
            "Places the weight in the denominator rather than as a multiplier, and misstates the goal — WLS does not aim to equalise every term, it aims to weight by precision.",
          blameConceptId: "weighted-least-squares",
        },
      },
      {
        id: "c",
        text: "Σᵢ (yᵢ − wᵢxᵢᵀβ)², weighting the predictors rather than the squared residual",
        correct: false,
        misconception: {
          id: "weight-applied-to-predictors",
          description:
            "Applies the weight inside the fitted value rather than to the loss term, which would change what the model computes rather than how much each observation counts.",
          blameConceptId: "weighted-least-squares",
        },
      },
      {
        id: "d",
        text: "Σᵢ wᵢ|yᵢ − xᵢᵀβ|, a weighted absolute-error objective",
        correct: false,
        misconception: {
          id: "wls-confused-with-weighted-lad",
          description:
            "Swaps in absolute error. WLS keeps the squared-error objective of OLS; only the weighting is new.",
          blameConceptId: "weighted-least-squares",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["weighted-least-squares", "homoskedasticity", "ordinary-least-squares"],
    source: ESL,
    status: "live",
  },
  {
    id: "weighted-least-squares--recall-when-it-applies",
    conceptId: "weighted-least-squares",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about weighted least squares are correct? Select all that apply.",
    choices: [
      { id: "a", text: "Setting every weight to 1 recovers ordinary least squares exactly", correct: true },
      { id: "b", text: "It requires the error variance to be known, at least up to a constant of proportionality", correct: true },
      { id: "c", text: "The correct weight for observation i is the reciprocal of its own error variance", correct: true },
      {
        id: "d",
        text: "It is only usable when the errors are also normally distributed",
        correct: false,
        misconception: {
          id: "wls-tied-to-normality",
          description:
            "Adds a normality requirement that is not part of the method. WLS is a variance-weighting scheme, independent of the shape of the error distribution.",
          blameConceptId: "weighted-least-squares",
        },
      },
      {
        id: "e",
        text: "It should be used whenever the sample size is small, regardless of the variance structure",
        correct: false,
        misconception: {
          id: "wls-motivation-confused-with-sample-size",
          description:
            "Ties the method to sample size rather than to heteroskedasticity, which is the actual condition that makes it useful.",
          blameConceptId: "weighted-least-squares",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["weighted-least-squares", "homoskedasticity"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "weighted-least-squares--apply-group-average-weight",
    conceptId: "weighted-least-squares",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Five factory-level averages are regressed on a predictor. The factories' sample sizes are 20, 20, " +
      "20, 80, and 80. Using wᵢ ∝ nᵢ, what is the ratio of the weight given to an 80-unit factory to the " +
      "weight given to a 20-unit factory? Give a whole number.",
    answerKey: 4,
    tolerance: 0.01,
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["weighted-least-squares", "sample-variance", "sample-mean"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "weighted-least-squares--apply-se-ratio",
    conceptId: "weighted-least-squares",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Two observations have error standard deviations of 2 and 6. Using wᵢ = 1/σᵢ², what is the ratio of " +
      "the weight given to the first observation to the weight given to the second? Give a whole number.",
    answerKey: 9,
    tolerance: 0.01,
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["weighted-least-squares", "variance"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "weighted-least-squares--explain-aitken-generalisation",
    conceptId: "weighted-least-squares",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain how weighted least squares relates to the Gauss–Markov theorem — is it an exception to " +
      "'OLS is BLUE', or something else?",
    rubric: {
      elements: [
        {
          id: "aitken-generalisation",
          description:
            "Explains that the Aitken theorem generalises Gauss–Markov to a known, possibly non-scalar error covariance, and that WLS is exactly its solution when that covariance is diagonal.",
          weight: 4,
          required: true,
          misconception: {
            id: "wls-treated-as-contradicting-gauss-markov",
            description:
              "Treats WLS beating OLS's variance as a contradiction of Gauss–Markov, missing that WLS is BLUE under a different, more general covariance assumption — OLS's Gauss–Markov result is the Σ = σ²I special case of the same theorem.",
            blameConceptId: "weighted-least-squares",
          },
        },
        {
          id: "ols-as-special-case",
          description:
            "States that OLS is recovered exactly when every weight equals 1, i.e. when the covariance actually is σ²I.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["weighted-least-squares", "homoskedasticity", "ordinary-least-squares", "variance"],
    source: ESL,
    status: "live",
  },
  {
    id: "weighted-least-squares--explain-precise-witnesses",
    conceptId: "weighted-least-squares",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain in plain terms why weighting by 1/σᵢ² is the right thing to do, without reference to the " +
      "Aitken theorem's proof.",
    rubric: {
      elements: [
        {
          id: "noisy-vs-precise-witnesses",
          description:
            "Explains that an observation with large error variance is a noisy, less trustworthy witness to the true relationship, while one with small variance is more trustworthy — and the fit should listen to the trustworthy ones more.",
          weight: 3,
          required: true,
          misconception: {
            id: "weighting-treated-as-arbitrary",
            description:
              "Describes the weighting as a technical trick with no account of why 1/σᵢ² specifically is the right amount of trust to place in each observation.",
            blameConceptId: "weighted-least-squares",
          },
        },
        {
          id: "consequence-for-ols",
          description:
            "Contrasts this with OLS, which listens to every observation equally regardless of how much noise it carries.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["weighted-least-squares", "variance"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "weighted-least-squares--transfer-feasible-wls-risk",
    conceptId: "weighted-least-squares",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A small sample's error variance is estimated from the data itself and then used to build WLS " +
      "weights. Explain why this — feasible WLS — is not covered by the same guarantee as WLS with truly " +
      "known weights, and when it can go wrong.",
    rubric: {
      elements: [
        {
          id: "weights-become-random",
          description:
            "Explains that estimated weights are themselves random quantities depending on the sample, so the Aitken theorem's guarantee — which assumes the weights are fixed and known — no longer strictly applies.",
          weight: 4,
          required: true,
          misconception: {
            id: "feasible-wls-treated-as-equivalent",
            description:
              "Treats feasible WLS as carrying the exact same optimality guarantee as WLS with known weights, missing that plugging in an estimate changes the problem.",
            blameConceptId: "weighted-least-squares",
          },
        },
        {
          id: "small-sample-risk",
          description:
            "States that in small samples a poorly estimated variance function can make feasible WLS perform worse than plain OLS, since the weights themselves can be systematically wrong.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["weighted-least-squares", "variance", "ordinary-least-squares"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "weighted-least-squares--transfer-vs-robust-se",
    conceptId: "weighted-least-squares",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Robust standard errors and weighted least squares both respond to heteroskedasticity, but they do " +
      "genuinely different things. Contrast them, and say which is the safer default when the exact " +
      "variance structure is unknown.",
    rubric: {
      elements: [
        {
          id: "robust-se-leaves-beta-unchanged",
          description:
            "Explains that robust standard errors keep β̂_OLS unchanged and only repair the uncertainty attached to it, while WLS changes the point estimate itself.",
          weight: 3,
          required: true,
          misconception: {
            id: "wls-and-robust-se-conflated",
            description:
              "Treats the two as interchangeable fixes for the same problem, missing that one changes the estimator and the other does not.",
            blameConceptId: "weighted-least-squares",
          },
        },
        {
          id: "wls-needs-correct-weights",
          description:
            "Explains that WLS is more efficient when the weights are right but can do genuine harm when they are wrong, while robust standard errors are valid under heteroskedasticity of any unknown shape.",
          weight: 3,
          required: true,
        },
        {
          id: "safer-default",
          description:
            "Concludes that robust standard errors are the safer default absent a confidently known variance structure, and that WLS is worth the extra commitment only when the weights are genuinely known or well estimated.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["weighted-least-squares", "homoskedasticity", "variance"],
    source: ESL,
    status: "live",
  },

  // --- Outliers, Leverage, and Influence --------------------------------------
  {
    id: "outliers-leverage-influence--recall-three-terms",
    conceptId: "outliers-leverage-influence",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which pairing correctly matches each term to what it measures?",
    choices: [
      {
        id: "a",
        text: "Outlier = a surprising response; leverage = an unusual predictor value; influence = how much removing the point would change the fit",
        correct: true,
      },
      {
        id: "b",
        text: "Outlier = an unusual predictor value; leverage = a surprising response; influence = the point's residual alone",
        correct: false,
        misconception: {
          id: "outlier-leverage-swapped",
          description:
            "Swaps the two definitions. An outlier is about the response; leverage is about the predictor values.",
          blameConceptId: "outliers-leverage-influence",
        },
      },
      {
        id: "c",
        text: "All three are the same thing described three ways",
        correct: false,
        misconception: {
          id: "three-terms-collapsed",
          description:
            "Collapses three genuinely distinct diagnostics into one, missing that a point can have any one of them without the other two.",
          blameConceptId: "outliers-leverage-influence",
        },
      },
      {
        id: "d",
        text: "Influence is computed only from a point's predictor values, ignoring its response",
        correct: false,
        misconception: {
          id: "influence-defined-without-response",
          description:
            "Describes leverage rather than influence. Influence requires the response too — it is what leverage and a poor fit produce together.",
          blameConceptId: "outliers-leverage-influence",
        },
      },
    ],
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["outliers-leverage-influence", "geometric-interpretation-of-ols"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "outliers-leverage-influence--recall-leverage-properties",
    conceptId: "outliers-leverage-influence",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about leverage hᵢᵢ are correct? Select all that apply.",
    choices: [
      { id: "a", text: "It can be computed before any response values are observed", correct: true },
      { id: "b", text: "0 ≤ hᵢᵢ ≤ 1 for every observation", correct: true },
      { id: "c", text: "Σᵢ hᵢᵢ equals the number of fitted coefficients", correct: true },
      {
        id: "d",
        text: "A point with high leverage always has a large residual",
        correct: false,
        misconception: {
          id: "high-leverage-implies-large-residual",
          description:
            "States the opposite of the usual pattern: Var(eᵢ) = σ²(1 − hᵢᵢ) shrinks toward zero as leverage approaches 1, so high-leverage points often have small residuals precisely because the fit is dragged toward them.",
          blameConceptId: "outliers-leverage-influence",
        },
      },
      {
        id: "e",
        text: "Leverage depends on the response values, not just the predictors",
        correct: false,
        misconception: {
          id: "leverage-said-to-depend-on-y",
          description:
            "hᵢᵢ = [X(XᵀX)⁻¹Xᵀ]ᵢᵢ involves only X — the response never enters the formula at all.",
          blameConceptId: "outliers-leverage-influence",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 80,
    prereqClosure: ["outliers-leverage-influence", "geometric-interpretation-of-ols"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "outliers-leverage-influence--apply-average-leverage",
    conceptId: "outliers-leverage-influence",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A regression has an intercept, 5 predictors, and 60 observations. What is the average leverage " +
      "across all observations? Give a decimal to three places.",
    answerKey: 0.1,
    tolerance: 0.001,
    difficulty: 0.7,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["outliers-leverage-influence", "geometric-interpretation-of-ols"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "outliers-leverage-influence--apply-cooks-distance",
    conceptId: "outliers-leverage-influence",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A model has p + 1 = 3 coefficients and σ̂² = 4. An observation has residual eᵢ = 4 and leverage " +
      "hᵢᵢ = 0.5. Using Dᵢ = [eᵢ²/((p+1)σ̂²)]·[hᵢᵢ/(1 − hᵢᵢ)²], compute Cook's distance for this point. " +
      "Give a decimal to two places.",
    answerKey: 2.67,
    tolerance: 0.02,
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["outliers-leverage-influence", "geometric-interpretation-of-ols", "variance"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "outliers-leverage-influence--explain-why-high-leverage-hides-in-residuals",
    conceptId: "outliers-leverage-influence",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why scanning a residual plot for large values can miss the single most consequential " +
      "observation in a dataset, and what to look at instead.",
    rubric: {
      elements: [
        {
          id: "variance-shrinks-with-leverage",
          description:
            "Explains that Var(eᵢ) = σ²(1 − hᵢᵢ) shrinks toward zero as leverage grows, because the fitted line is pulled toward a high-leverage point rather than resisting it — so that exact point tends to show one of the smallest residuals.",
          weight: 4,
          required: true,
          misconception: {
            id: "residual-size-treated-as-leverage-independent",
            description:
              "Treats residual size as unrelated to leverage, missing the mechanism by which high leverage systematically produces small residuals.",
            blameConceptId: "outliers-leverage-influence",
          },
        },
        {
          id: "look-at-standardised-or-cooks",
          description:
            "Recommends standardised or studentised residuals, or Cook's distance directly, rather than raw residuals alone.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["outliers-leverage-influence", "geometric-interpretation-of-ols", "variance"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "outliers-leverage-influence--explain-cooks-distance-as-counterfactual",
    conceptId: "outliers-leverage-influence",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Cook's distance is a specific algebraic formula combining a standardised residual and a leverage " +
      "term. Explain what question it is actually answering, in terms of refitting the model.",
    rubric: {
      elements: [
        {
          id: "counterfactual-refit",
          description:
            "States that Dᵢ is proportional to the squared distance between the fitted values from the full data and the fitted values from a model refitted with observation i deleted — it measures how much the whole fit would move if that point were dropped.",
          weight: 4,
          required: true,
          misconception: {
            id: "cooks-distance-treated-as-arbitrary-formula",
            description:
              "Recites the formula without connecting it to the counterfactual question it was derived to answer.",
            blameConceptId: "outliers-leverage-influence",
          },
        },
        {
          id: "avoids-refitting-n-times",
          description:
            "Notes that the formula gets this answer without literally having to refit n separate models, one per deleted observation.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["outliers-leverage-influence", "geometric-interpretation-of-ols"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "outliers-leverage-influence--transfer-classify-four-points",
    conceptId: "outliers-leverage-influence",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Four points in a simple regression: (a) x near x̄, y close to the fitted line; (b) x far from x̄, y " +
      "close to the fitted line; (c) x near x̄, y far from the fitted line; (d) x far from x̄, y far from " +
      "the fitted line. Classify each by leverage, residual size, and influence, and identify which one " +
      "most needs investigation.",
    rubric: {
      elements: [
        {
          id: "classifies-all-four",
          description:
            "Correctly classifies each: (a) low leverage, small residual, unremarkable; (b) high leverage, small residual, low influence; (c) low leverage, large residual, moderate influence at most since low leverage limits how much it can move the fit; (d) high leverage, large residual, high influence.",
          weight: 4,
          required: true,
          misconception: {
            id: "residual-size-alone-used-to-rank",
            description:
              "Ranks the four points by residual size alone, missing that (b)'s high leverage with a small residual is low-influence while (d)'s combination of both is what actually matters.",
            blameConceptId: "outliers-leverage-influence",
          },
        },
        {
          id: "identifies-d",
          description:
            "Identifies (d) as the one most needing investigation, because it is the only point where both ingredients of Cook's distance are large simultaneously.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["outliers-leverage-influence", "geometric-interpretation-of-ols", "variance"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "outliers-leverage-influence--transfer-deletion-not-automatic",
    conceptId: "outliers-leverage-influence",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A dataset has three points flagged with high Cook's distance. An analyst deletes all three and " +
      "reports that the resulting model is much more stable. Evaluate this practice.",
    rubric: {
      elements: [
        {
          id: "influence-not-automatically-error",
          description:
            "Explains that an influential point is not automatically wrong — it can be the single most informative observation, sometimes the one that pins down a slope at all — so influence alone is not grounds for deletion.",
          weight: 4,
          required: true,
          misconception: {
            id: "high-influence-treated-as-sufficient-for-deletion",
            description:
              "Treats a high Cook's distance by itself as sufficient justification for removing a point, without first checking whether the observation is actually erroneous.",
            blameConceptId: "outliers-leverage-influence",
          },
        },
        {
          id: "sequential-deletion-danger",
          description:
            "Notes the specific danger here: deleting several influential points in sequence can produce a fit that looks artificially stable simply because it has been shorn of everything that disagreed with it.",
          weight: 3,
          required: true,
        },
        {
          id: "correct-procedure",
          description:
            "Recommends verifying each point first (data error vs. genuine extreme case), and reporting the fit both with and without flagged points rather than silently choosing one.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["outliers-leverage-influence", "geometric-interpretation-of-ols"],
    source: AUTHORED,
    status: "live",
  },

  // --- Polynomial Regression ---------------------------------------------------
  {
    id: "polynomial-regression--recall-still-linear",
    conceptId: "polynomial-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Y = β₀ + β₁X + β₂X² + ε is fitted by ordinary least squares because:",
    choices: [
      {
        id: "a",
        text: "It is linear in the coefficients β, even though the fitted curve is not a straight line in X",
        correct: true,
      },
      {
        id: "b",
        text: "X² is approximately linear over a small enough range",
        correct: false,
        misconception: {
          id: "linearity-attributed-to-small-range",
          description:
            "Attributes fittability to a local approximation rather than to the actual defining property: linearity in the coefficients, which holds everywhere, not just locally.",
          blameConceptId: "polynomial-regression",
        },
      },
      {
        id: "c",
        text: "It isn't — polynomial regression requires an iterative nonlinear solver",
        correct: false,
        misconception: {
          id: "polynomial-regression-thought-nonlinear-in-params",
          description:
            "Believes the model requires nonlinear optimisation. It is solved by the exact same closed-form normal equations as any other linear regression.",
          blameConceptId: "polynomial-regression",
        },
      },
      {
        id: "d",
        text: "The X² term is dropped before fitting and added back afterward",
        correct: false,
        misconception: {
          id: "polynomial-term-treated-as-post-hoc",
          description:
            "Describes a procedure that isn't what happens. X² is just another column of the design matrix, present throughout the fit.",
          blameConceptId: "polynomial-regression",
        },
      },
    ],
    difficulty: -0.15,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["polynomial-regression", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "polynomial-regression--recall-degree-selection",
    conceptId: "polynomial-regression",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about choosing the degree of a polynomial fit are correct? Select all that apply.",
    choices: [
      { id: "a", text: "SSE cannot increase as the degree rises, for the same reason it cannot in any nested linear model", correct: true },
      { id: "b", text: "R² alone cannot select the degree, for the same reason it cannot select which predictors to keep", correct: true },
      { id: "c", text: "A very high degree can produce large oscillations near the edges of the data even as it fits the interior almost exactly", correct: true },
      {
        id: "d",
        text: "Higher degree always generalises better to new data",
        correct: false,
        misconception: {
          id: "higher-degree-assumed-better",
          description:
            "Confuses guaranteed in-sample improvement with out-of-sample performance, which typically worsens well before the training SSE stops falling.",
          blameConceptId: "polynomial-regression",
        },
      },
      {
        id: "e",
        text: "The degree should always be set equal to the number of predictors",
        correct: false,
        misconception: {
          id: "degree-tied-to-predictor-count",
          description:
            "Invents a rule with no basis; degree is a modelling choice made by AIC, BIC, or cross-validation, unrelated to how many other predictors exist.",
          blameConceptId: "polynomial-regression",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["polynomial-regression", "multiple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "polynomial-regression--apply-vertex",
    conceptId: "polynomial-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A fitted model is Ŷ = 10 + 4X − 0.5X². At what value of X does the fitted curve reach its maximum? " +
      "Give a whole number.",
    answerKey: 4,
    tolerance: 0.01,
    difficulty: 0.7,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["polynomial-regression", "multiple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "polynomial-regression--apply-fitted-value-at-vertex",
    conceptId: "polynomial-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For the same model, Ŷ = 10 + 4X − 0.5X², what is the fitted value at that maximum? Give a whole number.",
    answerKey: 18,
    tolerance: 0.01,
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["polynomial-regression", "multiple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "polynomial-regression--explain-collinearity-by-construction",
    conceptId: "polynomial-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A model with X and X² reports very high VIFs for both. Explain why this happens even with perfectly " +
      "clean data, and give the standard fix.",
    rubric: {
      elements: [
        {
          id: "structural-correlation",
          description:
            "Explains that over a positive range of X, large X values mechanically produce large X² values, so the two columns move together and are strongly correlated by construction, not because of any flaw in the data.",
          weight: 4,
          required: true,
          misconception: {
            id: "high-vif-treated-as-data-defect",
            description:
              "Treats the inflated VIF as evidence of a data problem rather than an artefact of the parameterisation.",
            blameConceptId: "polynomial-regression",
          },
        },
        {
          id: "centring-fix",
          description:
            "Gives the standard fix: centre X at its mean before forming the powers, which removes most of the artificial correlation while leaving fitted values and predictions unchanged.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["polynomial-regression", "multiple-linear-regression", "vif"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "polynomial-regression--explain-runge-phenomenon",
    conceptId: "polynomial-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why increasing a polynomial's degree can eventually make the fit worse, not just more " +
      "flexible, particularly near the edges of the data.",
    rubric: {
      elements: [
        {
          id: "edge-oscillation",
          description:
            "Describes Runge's phenomenon: at high degree, forcing the curve through the interior points nearly exactly can require large oscillations near the boundary of the data, even as interior fit keeps improving.",
          weight: 4,
          required: true,
          misconception: {
            id: "higher-degree-treated-as-strictly-more-flexible-and-safe",
            description:
              "Treats added flexibility as an unmixed benefit, missing that a single global high-degree polynomial can actively degrade near the edges rather than merely overfit uniformly.",
            blameConceptId: "polynomial-regression",
          },
        },
        {
          id: "motivates-alternatives",
          description:
            "Connects this to why methods that fit many low-degree local pieces — LOESS, splines — are generally preferred once real flexibility is needed, rather than pushing a single polynomial's degree ever higher.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["polynomial-regression", "multiple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "polynomial-regression--transfer-extrapolation-danger",
    conceptId: "polynomial-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A cubic polynomial model fits training data beautifully across its observed range. It is then used " +
      "to predict a case just slightly outside that range, and the prediction is wildly implausible. " +
      "Explain why polynomial models are especially prone to this compared with a straight-line fit.",
    rubric: {
      elements: [
        {
          id: "derivative-keeps-changing",
          description:
            "Explains that a straight line extrapolates at a constant rate, while a polynomial's slope keeps changing, so high-order terms that were harmless within the data can dominate and send predictions to extremes just past the observed range.",
          weight: 4,
          required: true,
          misconception: {
            id: "extrapolation-risk-treated-as-uniform-across-models",
            description:
              "Treats extrapolation as equally risky for any regression model, missing what specifically makes a polynomial's extrapolation behaviour worse than a line's.",
            blameConceptId: "polynomial-regression",
          },
        },
        {
          id: "practical-implication",
          description:
            "Draws the practical conclusion: polynomial regression is best used to characterise the interior shape of a relationship, with a mechanistic or theory-grounded model preferred for anything beyond the observed range.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["polynomial-regression", "multiple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "polynomial-regression--transfer-discover-then-quantify",
    conceptId: "polynomial-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Describe the usual workflow that connects LOESS and polynomial regression: why fit both, and in " +
      "what order?",
    rubric: {
      elements: [
        {
          id: "loess-discovers-shape",
          description:
            "Explains that LOESS is used first to reveal the shape of a relationship without committing to any particular functional form.",
          weight: 3,
          required: true,
        },
        {
          id: "polynomial-quantifies",
          description:
            "Explains that once the shape is known — for instance, a single interior bend — a low-degree polynomial term is added to give that shape an interpretable coefficient and a testable, quantified form.",
          weight: 3,
          required: true,
          misconception: {
            id: "order-reversed-or-methods-treated-as-competing",
            description:
              "Treats LOESS and polynomial regression as competing choices rather than as sequential steps — discover the shape nonparametrically, then quantify it parametrically.",
            blameConceptId: "polynomial-regression",
          },
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["polynomial-regression", "multiple-linear-regression"],
    source: AUTHORED,
    status: "live",
  },

  // --- Quantile Regression ------------------------------------------------------
  {
    id: "quantile-regression--recall-pinball-loss",
    conceptId: "quantile-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The pinball (check) loss ρ_τ(u) used in quantile regression:",
    choices: [
      {
        id: "a",
        text: "Charges a positive residual at rate τ and a negative residual at rate (1 − τ), so it is asymmetric except at τ = 0.5",
        correct: true,
      },
      {
        id: "b",
        text: "Is exactly the same as squared error, rescaled by τ",
        correct: false,
        misconception: {
          id: "pinball-loss-confused-with-rescaled-squared-error",
          description:
            "Describes a rescaled squared-error loss. The pinball loss is piecewise linear, not quadratic, which is what gives it its robustness and its quantile-targeting property.",
          blameConceptId: "quantile-regression",
        },
      },
      {
        id: "c",
        text: "Charges over- and under-predictions at the same rate for every τ",
        correct: false,
        misconception: {
          id: "pinball-loss-treated-as-symmetric",
          description:
            "Describes a symmetric loss, which would target only the median regardless of τ. Asymmetry is exactly what lets τ select a different quantile.",
          blameConceptId: "quantile-regression",
        },
      },
      {
        id: "d",
        text: "Is only defined for τ = 0.5",
        correct: false,
        misconception: {
          id: "pinball-loss-restricted-to-median",
          description:
            "Restricts the loss to a single special case. ρ_τ is defined for any τ in (0, 1), and τ = 0.5 is simply the symmetric case.",
          blameConceptId: "quantile-regression",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["quantile-regression", "ordinary-least-squares"],
    source: ESL,
    status: "live",
  },
  {
    id: "quantile-regression--recall-what-each-tau-targets",
    conceptId: "quantile-regression",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements correctly describe what quantile regression targets? Select all that apply.",
    choices: [
      { id: "a", text: "At τ = 0.5, the minimiser is the conditional median", correct: true },
      { id: "b", text: "At τ = 0.1, the minimiser targets the conditional 10th percentile", correct: true },
      { id: "c", text: "Different τ values can be fitted to trace how the whole conditional distribution, not just its centre, shifts with X", correct: true },
      {
        id: "d",
        text: "Every choice of τ targets the conditional mean, just with a different weighting",
        correct: false,
        misconception: {
          id: "quantile-regression-thought-to-target-mean",
          description:
            "Misses the entire point of the method: quantile regression targets quantiles, which are generally different from the mean OLS targets, especially for skewed conditional distributions.",
          blameConceptId: "quantile-regression",
        },
      },
      {
        id: "e",
        text: "Fitted quantile curves for different τ are guaranteed never to cross",
        correct: false,
        misconception: {
          id: "non-crossing-assumed-automatic",
          description:
            "Assumes a property that does not hold for the basic method. Because each τ is a separate optimisation, nothing prevents crossing unless a constrained version of the estimator is used.",
          blameConceptId: "quantile-regression",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.5,
    expectedSeconds: 80,
    prereqClosure: ["quantile-regression", "ordinary-least-squares"],
    source: ESL,
    status: "live",
  },
  {
    id: "quantile-regression--apply-classify-loss",
    conceptId: "quantile-regression",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A modeller wants a fitted value such that only 10% of observed responses are expected to fall " +
      "below it. Which τ should they use, and roughly how should over- versus under-prediction be " +
      "penalised?",
    choices: [
      {
        id: "a",
        text: "τ = 0.1, penalising under-prediction (a residual below the fit) far more heavily than over-prediction",
        correct: true,
      },
      {
        id: "b",
        text: "τ = 0.9, penalising under-prediction far more heavily than over-prediction",
        correct: false,
        misconception: {
          id: "tau-value-inverted",
          description:
            "Picks the complementary quantile. τ = 0.1 is what targets the 10th percentile; τ = 0.9 targets the 90th.",
          blameConceptId: "quantile-regression",
        },
      },
      {
        id: "c",
        text: "τ = 0.5, since any quantile problem reduces to the median",
        correct: false,
        misconception: {
          id: "all-quantile-problems-reduced-to-median",
          description:
            "Ignores the stated target quantile entirely and defaults to the median, which the pinball loss only targets when τ = 0.5.",
          blameConceptId: "quantile-regression",
        },
      },
      {
        id: "d",
        text: "τ = 0.1, penalising over-prediction far more heavily than under-prediction",
        correct: false,
        misconception: {
          id: "penalty-direction-reversed-for-tau",
          description:
            "Gets the direction of the asymmetry backwards for this τ: ρ_τ charges under-prediction at rate τ and over-prediction at rate 1 − τ, so a small τ charges under-prediction lightly, not heavily.",
          blameConceptId: "quantile-regression",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 100,
    prereqClosure: ["quantile-regression", "ordinary-least-squares"],
    source: ESL,
    status: "live",
  },
  {
    id: "quantile-regression--apply-pinball-value",
    conceptId: "quantile-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Using ρ_τ(u) = u(τ − 𝟙[u < 0]) with τ = 0.3, what is the pinball loss for a residual of u = −5 " +
      "(an over-prediction)? Give a decimal to one place.",
    answerKey: 3.5,
    tolerance: 0.05,
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["quantile-regression", "ordinary-least-squares"],
    source: ESL,
    status: "live",
  },
  {
    id: "quantile-regression--explain-quantile-minimises-pinball",
    conceptId: "quantile-regression",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Show that for an unconditional random variable Y, the constant c minimising E[ρ_τ(Y − c)] is the " +
      "τ-th quantile of Y.",
    rubric: {
      elements: [
        {
          id: "writes-expectation",
          description:
            "Writes E[ρ_τ(Y − c)] as a sum of two pieces split by whether Y is above or below c, using the definition of ρ_τ.",
          weight: 3,
          required: true,
          misconception: {
            id: "quantile-optimality-asserted",
            description:
              "States that the minimiser is the τ-th quantile without carrying out the differentiation that shows it.",
            blameConceptId: "quantile-regression",
          },
        },
        {
          id: "differentiates",
          description:
            "Differentiates the expectation with respect to c (via Leibniz's rule or a direct argument) and sets the result to zero.",
          weight: 3,
          required: true,
        },
        {
          id: "recovers-quantile-definition",
          description:
            "Shows the stationarity condition reduces to τ = P(Y ≤ c), which is exactly the definition of c as the τ-th quantile of Y.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.7,
    expectedSeconds: 270,
    prereqClosure: ["quantile-regression", "ordinary-least-squares", "expectation"],
    source: ESL,
    status: "live",
  },
  {
    id: "quantile-regression--explain-loss-choice-determines-target",
    conceptId: "quantile-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain how squared-error loss, absolute-error loss, and the general pinball loss are related, and " +
      "what each one's minimiser estimates.",
    rubric: {
      elements: [
        {
          id: "squared-targets-mean",
          description:
            "States that squared-error loss is minimised by the conditional mean.",
          weight: 2,
          required: true,
        },
        {
          id: "absolute-is-tau-half",
          description:
            "States that absolute-error loss is exactly the τ = 0.5 pinball loss (up to a constant factor), and its minimiser is the conditional median.",
          weight: 3,
          required: true,
          misconception: {
            id: "loss-functions-treated-as-unrelated",
            description:
              "Treats squared error, absolute error, and the pinball loss as three unrelated objectives rather than as one family where the choice of loss determines which functional of the distribution is being estimated.",
            blameConceptId: "quantile-regression",
          },
        },
        {
          id: "pinball-generalises",
          description:
            "States that the general pinball loss at any τ generalises this pattern, targeting the τ-th conditional quantile.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["quantile-regression", "ordinary-least-squares"],
    source: ESL,
    status: "live",
  },
  {
    id: "quantile-regression--transfer-hidden-heterogeneity",
    conceptId: "quantile-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An OLS wage regression finds a coefficient of $2,000 per year of education. Separate quantile fits " +
      "at τ = 0.1 and τ = 0.9 give $800 and $3,600 respectively. Explain what this pattern reveals that the " +
      "OLS coefficient alone cannot show.",
    rubric: {
      elements: [
        {
          id: "single-number-hides-spread",
          description:
            "Explains that the OLS coefficient is a single average effect and cannot by itself distinguish a uniform shift in wages from a widening of the wage distribution.",
          weight: 3,
          required: true,
          misconception: {
            id: "mean-effect-assumed-uniform-across-distribution",
            description:
              "Assumes the OLS coefficient describes the effect equally everywhere in the conditional distribution, missing that quantile regression is needed precisely to check that assumption.",
            blameConceptId: "quantile-regression",
          },
        },
        {
          id: "correct-reading-of-the-pattern",
          description:
            "Reads the actual pattern correctly: education is associated with a much larger increase in wages near the top of the conditional distribution than near the bottom, meaning the spread of wages widens with education rather than shifting uniformly.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["quantile-regression", "ordinary-least-squares"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "quantile-regression--transfer-robust-in-y-not-x",
    conceptId: "quantile-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Quantile regression is often described as robust to outliers. Explain precisely which kind of " +
      "outlier it is robust to, and which kind it is not.",
    rubric: {
      elements: [
        {
          id: "robust-to-y-outliers",
          description:
            "Explains that because the pinball loss grows only linearly rather than quadratically in the residual, a single extreme response value has bounded influence on the fitted coefficients — robustness to outliers in Y.",
          weight: 4,
          required: true,
          misconception: {
            id: "robustness-claimed-unconditionally",
            description:
              "Claims quantile regression is robust to outliers without qualification, missing that the robustness is specifically about the response and not about the predictors.",
            blameConceptId: "quantile-regression",
          },
        },
        {
          id: "not-robust-to-x-leverage",
          description:
            "States that a point with an extreme predictor value still carries high leverage and can still pull the fit substantially — the check loss protects against a surprising y, not against an unusual x.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["quantile-regression", "ordinary-least-squares"],
    source: ESL,
    status: "live",
  },

  // --- Poisson Regression ---------------------------------------------------
  {
    id: "poisson-regression--recall-model",
    conceptId: "poisson-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Poisson regression models a count outcome as:",
    choices: [
      {
        id: "a",
        text: "Y | X ~ Poisson(μ) with ln(μ) = xᵀβ — a log link on the mean",
        correct: true,
      },
      {
        id: "b",
        text: "Y | X ~ Poisson(μ) with μ = xᵀβ directly, no link at all",
        correct: false,
        misconception: {
          id: "poisson-regression-given-identity-link",
          description:
            "Uses the identity link, which can predict a negative mean for a count that must be non-negative. The log link exists precisely to rule this out.",
          blameConceptId: "poisson-regression",
        },
      },
      {
        id: "c",
        text: "Y | X ~ Normal(μ, μ), with μ = exp(xᵀβ)",
        correct: false,
        misconception: {
          id: "poisson-response-swapped-for-normal",
          description:
            "Swaps the response family for a normal distribution with matching mean and variance. That still is not a Poisson distribution and misses its discreteness and its specific shape at low counts.",
          blameConceptId: "poisson-regression",
        },
      },
      {
        id: "d",
        text: "ln(Y) = xᵀβ + ε, an ordinary linear model fitted to the logged counts",
        correct: false,
        misconception: {
          id: "poisson-regression-confused-with-log-transformed-ols",
          description:
            "Describes a different, older workaround — regressing log(y) by OLS — which breaks down whenever any count is zero and does not model the actual Poisson variance structure.",
          blameConceptId: "poisson-regression",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["poisson-regression", "glm", "poisson-distribution"],
    source: ISLR,
    status: "live",
  },
  {
    id: "poisson-regression--recall-variance-function",
    conceptId: "poisson-regression",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about the Poisson regression model are correct? Select all that apply.",
    choices: [
      { id: "a", text: "The model forces Var(Y | X) = E[Y | X] = μ", correct: true },
      { id: "b", text: "The log link guarantees every predicted mean is positive", correct: true },
      { id: "c", text: "It is fitted by the same iteratively reweighted least squares routine used for logistic regression, with different weights", correct: true },
      {
        id: "d",
        text: "The model allows the variance to be estimated completely independently of the mean",
        correct: false,
        misconception: {
          id: "poisson-variance-thought-independent-of-mean",
          description:
            "Misses the Poisson distribution's defining commitment: variance is tied to the mean by the distribution itself, not fitted as a separate free parameter the way σ² is in ordinary linear regression.",
          blameConceptId: "poisson-regression",
        },
      },
      {
        id: "e",
        text: "Predicted counts can come out negative for extreme predictor values",
        correct: false,
        misconception: {
          id: "poisson-regression-thought-to-allow-negative-predictions",
          description:
            "The log link's whole purpose is to rule this out: exp(xᵀβ) is positive for every real xᵀβ, so a valid Poisson mean is guaranteed regardless of how extreme the predictors are.",
          blameConceptId: "poisson-regression",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 80,
    prereqClosure: ["poisson-regression", "glm", "poisson-distribution"],
    source: ISLR,
    status: "live",
  },
  {
    id: "poisson-regression--apply-multiplicative-effect",
    conceptId: "poisson-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A Poisson regression coefficient on a promotion indicator is 0.25. By what factor does the expected " +
      "count change when the promotion is on, e^0.25? Give a decimal to three places.",
    answerKey: 1.284,
    tolerance: 0.005,
    difficulty: 0.7,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["poisson-regression", "glm"],
    source: ISLR,
    status: "live",
  },
  {
    id: "poisson-regression--apply-offset",
    conceptId: "poisson-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A Poisson regression with an offset for exposure time gives xᵀβ = 1.5 for a unit observed for " +
      "t = 4 time units. Using ln(μ) = ln(t) + xᵀβ, what is the predicted expected count μ? Give a decimal " +
      "to one place. (e^1.5 ≈ 4.4817.)",
    answerKey: 17.9,
    tolerance: 0.1,
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["poisson-regression", "glm"],
    source: ISLR,
    status: "live",
  },
  {
    id: "poisson-regression--explain-offset-is-not-a-covariate",
    conceptId: "poisson-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "An offset for exposure time is not simply another predictor with an estimated coefficient — its " +
      "coefficient is fixed at exactly 1. Explain what modelling claim that fixed coefficient represents, " +
      "and why letting the data estimate it instead would be a different model.",
    rubric: {
      elements: [
        {
          id: "fixed-coefficient-meaning",
          description:
            "Explains that fixing the coefficient on ln(exposure) at 1 asserts that doubling the exposure should exactly double the expected count, all else equal — a substantive modelling assumption, not a default.",
          weight: 4,
          required: true,
          misconception: {
            id: "offset-treated-as-ordinary-covariate",
            description:
              "Treats the offset as just another predictor whose coefficient happens to be estimated near 1, missing that the coefficient is fixed by construction rather than fitted.",
            blameConceptId: "poisson-regression",
          },
        },
        {
          id: "estimating-it-would-differ",
          description:
            "States that estimating the exposure coefficient from the data, rather than fixing it, would be answering a different question — allowing the data to say whether the relationship between exposure and count is even proportional at all.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["poisson-regression", "glm"],
    source: ISLR,
    status: "live",
  },
  {
    id: "poisson-regression--explain-overdispersion-diagnosis",
    conceptId: "poisson-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A Poisson regression's residual deviance is 340 on 110 residual degrees of freedom. Diagnose the " +
      "problem this suggests and explain the mechanism, drawing the same distinction homoskedasticity's " +
      "own wiki makes between bias and variance.",
    rubric: {
      elements: [
        {
          id: "diagnoses-overdispersion",
          description:
            "Diagnoses overdispersion: the ratio 340/110 ≈ 3.1 is well above the 1 expected under a correctly specified Poisson model, indicating the true variance exceeds what Var(Y) = μ predicts.",
          weight: 3,
          required: true,
          misconception: {
            id: "deviance-ratio-not-connected-to-diagnosis",
            description:
              "Reports the deviance ratio without identifying what a value well above 1 actually means about the fitted model's variance assumption.",
            blameConceptId: "poisson-regression",
          },
        },
        {
          id: "bias-variance-distinction",
          description:
            "States that the coefficient estimates β̂ remain consistent under overdispersion — the mean structure is unaffected — but the standard errors computed under the Poisson model's built-in Var = μ assumption are too small, so confidence intervals are too narrow and results look spuriously significant.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["poisson-regression", "glm", "variance"],
    source: ISLR,
    status: "live",
  },
  {
    id: "poisson-regression--transfer-quasi-vs-negative-binomial",
    conceptId: "poisson-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Compare quasi-Poisson and negative binomial regression as remedies for overdispersion, and say when " +
      "you would reach for each.",
    rubric: {
      elements: [
        {
          id: "quasi-poisson-mechanism",
          description:
            "Explains that quasi-Poisson keeps μ as the mean but allows Var(Y) = φμ for an estimated dispersion φ, inflating every standard error by √φ without changing β̂ or requiring a fully specified alternative distribution.",
          weight: 3,
          required: true,
        },
        {
          id: "negative-binomial-mechanism",
          description:
            "Explains that negative binomial regression is a genuinely different response distribution with Var(Y) = μ + αμ², an explicit extra parameter capturing the excess variance rather than a post-hoc correction to the standard errors alone.",
          weight: 3,
          required: true,
          misconception: {
            id: "two-remedies-treated-as-interchangeable",
            description:
              "Treats the two remedies as doing the same thing, missing that quasi-Poisson only corrects inference while negative binomial changes the model itself and can therefore also change the likelihood-based comparisons (AIC, deviance tests) built on it.",
            blameConceptId: "poisson-regression",
          },
        },
        {
          id: "when-to-use-each",
          description:
            "Gives a reasonable basis for choosing between them — quasi-Poisson when only valid standard errors are needed and a full alternative likelihood is not required, negative binomial when a properly specified model and likelihood-based comparisons across models are wanted.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["poisson-regression", "glm", "variance"],
    source: ISLR,
    status: "live",
  },
  {
    id: "poisson-regression--transfer-glms-own-example",
    conceptId: "poisson-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain how Poisson regression illustrates the general GLM framework's payoff — what specifically " +
      "had to change from logistic regression, and what specifically stayed the same.",
    rubric: {
      elements: [
        {
          id: "what-changed",
          description:
            "Identifies the two things that changed: the response distribution (Bernoulli to Poisson) and the link (logit to log), each chosen to respect the valid range of that response's mean.",
          weight: 3,
          required: true,
        },
        {
          id: "what-stayed-the-same",
          description:
            "Identifies what stayed the same: the linear predictor xᵀβ, and the overall iteratively reweighted least squares fitting algorithm, which only needed its weight function and link swapped.",
          weight: 3,
          required: true,
          misconception: {
            id: "poisson-regression-treated-as-a-separate-technique",
            description:
              "Treats Poisson regression as a distinct technique bolted on next to logistic regression, rather than as the same GLM framework's own worked example for count data.",
            blameConceptId: "poisson-regression",
          },
        },
        {
          id: "connects-to-glm-blurb",
          description:
            "Notes that this is exactly the unification the GLM framework was built to provide — one structure, several instances, of which linear, logistic, and Poisson regression are the three canonical examples.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["poisson-regression", "glm"],
    source: ISLR,
    status: "live",
  },
];
