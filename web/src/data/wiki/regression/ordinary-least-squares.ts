import type { WikiArticle } from "../types";

export const ordinaryLeastSquaresWiki: WikiArticle = {
  conceptId: "ordinary-least-squares",

  summary:
    "Ordinary least squares is the rule that picks the coefficients minimising the sum of squared " +
    "residuals. Two questions are worth separating: why squared error rather than some other " +
    "penalty (differentiability, a closed form, and an exact correspondence with normal-error " +
    "maximum likelihood), and what the choice actually buys you (the Gauss–Markov theorem, which " +
    "says OLS has the smallest variance among linear unbiased estimators). The qualifier 'among " +
    "unbiased' in that theorem is the loophole every regularisation method in this domain walks " +
    "through.",

  sections: [
    {
      heading: "The objective",
      blocks: [
        {
          kind: "formula",
          latex: "β̂ = argmin_β Σᵢ (yᵢ − ŷᵢ)² = argmin_β ‖y − Xβ‖²",
          caption: "OLS: minimise the squared Euclidean length of the residual vector.",
        },
        {
          kind: "prose",
          text:
            "Residuals are measured vertically, in the units of Y, and squared before summing. " +
            "Squaring does two things at once: it makes positive and negative deviations both " +
            "costly (so they cannot cancel), and it makes large deviations disproportionately " +
            "costly. The second is a real modelling commitment, not a technicality — it is why a " +
            "single outlier can move an OLS fit a long way.",
        },
      ],
    },

    {
      heading: "Why squared error and not absolute error",
      blocks: [
        {
          kind: "table",
          headers: ["", "Squared error (OLS)", "Absolute error (LAD / quantile regression)"],
          rows: [
            ["Objective", "Σ(yᵢ − ŷᵢ)²", "Σ|yᵢ − ŷᵢ|"],
            ["Smoothness", "Differentiable everywhere", "Kinked at zero"],
            ["Solution", "Closed form: (XᵀX)⁻¹Xᵀy", "No closed form; solved by linear programming"],
            ["Estimates", "The conditional mean", "The conditional median"],
            ["Outliers", "Highly sensitive", "Robust"],
            ["Likelihood match", "Normal errors", "Laplace errors"],
          ],
        },
        {
          kind: "prose",
          text:
            "The decisive practical difference is differentiability. |u| has no derivative at u = 0, " +
            "so the 'set the gradient to zero and solve' technique that produces OLS's clean formula " +
            "simply does not apply; least absolute deviations has to be solved numerically. " +
            "Historically that mattered enormously — Gauss and Legendre had no computers — and it " +
            "still matters for the analytical results that follow from having a formula rather than " +
            "an algorithm.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Squared error is not 'more accurate'",
          text:
            "It is a different target. Minimising squared error estimates the conditional mean; " +
            "minimising absolute error estimates the conditional median. On skewed data those are " +
            "genuinely different quantities, and which one you want is a question about the problem, " +
            "not about statistics. 'OLS is more accurate' is not the reason for its dominance; " +
            "tractability plus the Gauss–Markov guarantee is.",
        },
      ],
    },

    {
      heading: "The Gauss–Markov theorem",
      blocks: [
        {
          kind: "prose",
          text:
            "Under five conditions, OLS is BLUE: the Best Linear Unbiased Estimator. Each word in " +
            "that acronym is load-bearing.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Linearity — the true model is Y = Xβ + ε.",
            "No perfect collinearity — X has full column rank, so XᵀX is invertible.",
            "Exogeneity — E[ε | X] = 0, the errors have mean zero given the predictors.",
            "Homoskedasticity — Var(εᵢ | X) = σ² for every i.",
            "No autocorrelation — Cov(εᵢ, εⱼ | X) = 0 for i ≠ j.",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Best",
              description: "Smallest variance — but only within the class named by the next two words.",
            },
            {
              term: "Linear",
              description:
                "Estimators of the form Ay for a fixed matrix A. Nonlinear estimators are not in the competition.",
            },
            {
              term: "Unbiased",
              description:
                "E[β̂] = β. Biased estimators are not in the competition either — and this is the important exclusion.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Normality is not required",
          text:
            "The five Gauss–Markov conditions say nothing about the shape of the error " +
            "distribution. Normality is needed for exact t- and F-tests in finite samples and for " +
            "the maximum-likelihood interpretation — not for OLS to be unbiased, consistent, or " +
            "minimum-variance among linear unbiased estimators. Conflating the two sets of " +
            "assumptions is one of the most common errors in applied regression.",
        },
      ],
    },

    {
      heading: "The loophole: 'best among unbiased' is not 'best'",
      blocks: [
        {
          kind: "prose",
          text:
            "Prediction error decomposes into bias² + variance + irreducible noise. Gauss–Markov " +
            "fixes bias at zero and then minimises variance. But nothing says the minimum of " +
            "bias² + variance occurs at zero bias — and when the predictors are nearly collinear, " +
            "OLS's variance is enormous, so it usually does not.",
        },
        {
          kind: "formula",
          latex: "E[(β̂ − β)²] = Bias(β̂)² + Var(β̂)",
          caption:
            "Mean squared error. OLS zeroes the first term; ridge accepts a little of it to shrink the second a lot.",
        },
        {
          kind: "example",
          title: "When the unbiased estimator is the wrong choice",
          problem:
            "Two predictors have correlation 0.999. OLS returns coefficients of +180 and −176 with " +
            "standard errors near 60. Ridge with a small λ returns +2.1 and +1.8 with standard errors " +
            "near 0.4. Which is 'better'?",
          steps: [
            "OLS is unbiased: run the study many times and the coefficients average to the truth.",
            "But any single run is wildly off, because collinearity has inflated Var(β̂).",
            "Ridge is biased — it shrinks toward zero — but its total error is far smaller.",
            "Gauss–Markov is not violated: ridge is simply not in the class of estimators the theorem quantifies over.",
          ],
          answer:
            "Ridge, for prediction and usually for interpretation too. Being best in a restricted class is not the same as being best.",
        },
      ],
    },

    {
      heading: "Properties of the OLS fit",
      blocks: [
        {
          kind: "list",
          items: [
            "The residuals sum to zero whenever an intercept is included: Σeᵢ = 0.",
            "The residuals are orthogonal to every predictor: Σeᵢx_{ij} = 0 for each j.",
            "Consequently the residuals are orthogonal to the fitted values: Σeᵢŷᵢ = 0.",
            "The fitted line passes through the point of means (x̄, ȳ).",
            "The mean of the fitted values equals the mean of the observed responses.",
            "SST = SSR + SSE exactly, as a direct algebraic consequence of that orthogonality.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "These properties are guaranteed, so they diagnose nothing",
          text:
            "Residuals summing to zero is a fact about the arithmetic, not evidence that the model " +
            "fits. Every OLS fit has it, including a straight line fitted to a perfect parabola. " +
            "Diagnostics have to look at the pattern of residuals — against fitted values, against " +
            "each predictor, against time — not at the quantities the fit forces to be zero.",
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§3.1.1–3.2.2, Estimating the Coefficients" },
    { source: "Strang, Linear Algebra and Its Applications", locator: "Ch. 4, Orthogonality and Least Squares" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§11.3, Least Squares and the Gauss–Markov Theorem" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-01-foundations.md" },
  ],
};
