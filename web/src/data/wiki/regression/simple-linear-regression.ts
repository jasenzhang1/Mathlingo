import type { WikiArticle } from "../types";

export const simpleLinearRegressionWiki: WikiArticle = {
  conceptId: "simple-linear-regression",

  summary:
    "Simple linear regression fits a straight line to predict one response from one predictor. Its " +
    "whole content is two formulas — β̂₁ = Cov(X, Y)/Var(X) and β̂₀ = Ȳ − β̂₁X̄ — and the single " +
    "most useful thing to notice about them is that the slope is the correlation rescaled by the " +
    "two standard deviations. That identity explains why the slope changes when you switch from " +
    "inches to centimetres and the correlation does not, and it is the same algebra that governs " +
    "regression to the mean.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "Yᵢ = β₀ + β₁Xᵢ + εᵢ,   E[εᵢ] = 0,  Var(εᵢ) = σ²",
          caption: "One predictor, two coefficients, and an error term with constant variance.",
        },
        {
          kind: "prose",
          text:
            "Two parameters describe the line and a third, σ², describes how tightly the points " +
            "cluster around it. Fitting produces estimates of all three. Note what the model does " +
            "not claim: it says nothing about the distribution of X, and it does not require ε to " +
            "be normal — normality is needed only later, for exact confidence intervals and tests.",
        },
      ],
    },

    {
      heading: "The least-squares estimates",
      blocks: [
        {
          kind: "formula",
          latex: "β̂₁ = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)² = Cov(X, Y) / Var(X)",
          caption: "The slope: how X and Y co-move, divided by how much X moves.",
        },
        {
          kind: "formula",
          latex: "β̂₀ = ȳ − β̂₁x̄",
          caption: "The intercept, which forces the fitted line through the point of means (x̄, ȳ).",
        },
        {
          kind: "prose",
          text:
            "The sample-covariance and sample-variance versions differ from the raw sums by a " +
            "factor of 1/(n−1) in both numerator and denominator, which cancels — so the two ways " +
            "of writing β̂₁ are the same number. The intercept formula is not an independent result: " +
            "it is what forces the fitted line to pass through (x̄, ȳ), which every least-squares " +
            "line with an intercept does.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Only X's spread appears in the denominator",
          text:
            "Var(Y) is nowhere in β̂₁. Doubling every y value doubles the covariance and hence " +
            "doubles the slope; doubling every x value doubles the covariance but quadruples the " +
            "variance, so the slope halves. That asymmetry is the whole reason regressing Y on X " +
            "gives a different line from regressing X on Y — the two lines coincide only when the " +
            "fit is perfect.",
        },
        {
          kind: "example",
          title: "Computing a fit from summary statistics",
          problem: "Cov(X, Y) = 6, Var(X) = 3, x̄ = 10, ȳ = 50. Find β̂₁ and β̂₀.",
          steps: [
            "β̂₁ = Cov(X, Y)/Var(X) = 6/3.",
            "β̂₀ = ȳ − β̂₁x̄ = 50 − 2(10).",
          ],
          answer: "β̂₁ = 2, β̂₀ = 30, so Ŷ = 30 + 2X.",
        },
      ],
    },

    {
      heading: "Slope, correlation, and units",
      blocks: [
        {
          kind: "formula",
          latex: "β̂₁ = r · (s_Y / s_X)",
          caption: "The slope is the correlation, rescaled by the ratio of the two standard deviations.",
        },
        {
          kind: "prose",
          text:
            "This follows immediately from r = Cov(X,Y)/(s_X s_Y): substitute Cov(X,Y) = r·s_X·s_Y " +
            "into the slope formula and one factor of s_X cancels. It is worth committing to memory " +
            "because it separates two questions that beginners fuse together.",
        },
        {
          kind: "table",
          headers: ["", "Slope β̂₁", "Correlation r"],
          rows: [
            ["Question answered", "How much does Y change per unit of X?", "How tightly do the points hug a line?"],
            ["Units", "Units of Y per unit of X", "None — dimensionless"],
            ["Effect of rescaling X", "Divided by the scale factor", "Unchanged"],
            ["Effect of rescaling Y", "Multiplied by the scale factor", "Unchanged"],
            ["Range", "Any real number", "[−1, 1]"],
          ],
        },
        {
          kind: "example",
          title: "Inches to centimetres",
          problem:
            "A height–weight regression measured in inches gives β̂₁ = 5 lb per inch and r = 0.7. " +
            "The heights are re-expressed in centimetres. What are the new slope and correlation?",
          steps: [
            "One inch is 2.54 cm, so s_X is multiplied by 2.54 while s_Y is unchanged.",
            "β̂₁ = r·(s_Y/s_X), so the slope is divided by 2.54: 5/2.54.",
            "r is a ratio of a covariance to the product of both standard deviations, and the scale factor cancels top and bottom.",
          ],
          answer:
            "New slope ≈ 1.97 lb per cm; correlation is still 0.7. The relationship did not change — only the units it is reported in.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Standardise both variables and the slope becomes r",
          text:
            "If X and Y are converted to z-scores then s_X = s_Y = 1, so β̂₁ = r exactly. The " +
            "fitted line in standardised units is ẑ_Y = r·z_X — which is precisely the regression-" +
            "to-the-mean formula. A one-SD-above-average X predicts an r-SD-above-average Y, and " +
            "since |r| ≤ 1 the prediction is always closer to the mean than the input was.",
        },
      ],
    },

    {
      heading: "Deriving the slope by minimising squared error",
      blocks: [
        {
          kind: "prose",
          text:
            "The formulas are not conventions; they are the unique solution of a two-variable " +
            "minimisation. The objective is smooth and convex in (β₀, β₁), so setting both partial " +
            "derivatives to zero finds the global minimum.",
        },
        {
          kind: "formula",
          latex: "S(β₀, β₁) = Σ (yᵢ − β₀ − β₁xᵢ)²",
          caption: "The sum of squared residuals, viewed as a function of the two coefficients.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "∂S/∂β₀ = −2Σ(yᵢ − β₀ − β₁xᵢ) = 0, which says the residuals sum to zero and gives β₀ = ȳ − β₁x̄.",
            "∂S/∂β₁ = −2Σxᵢ(yᵢ − β₀ − β₁xᵢ) = 0, which says the residuals are uncorrelated with x.",
            "Substitute β₀ = ȳ − β₁x̄ into the second equation to eliminate the intercept.",
            "Collect terms: Σ(xᵢ − x̄)(yᵢ − ȳ) − β₁Σ(xᵢ − x̄)² = 0.",
            "Solve: β̂₁ = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)².",
          ],
        },
        {
          kind: "prose",
          text:
            "The two stationarity conditions are worth reading as statements rather than algebra: " +
            "the residuals have mean zero, and the residuals are orthogonal to the predictor. In " +
            "the multiple-regression case those same two conditions become the normal equations, " +
            "and their geometric content is that the residual vector is perpendicular to everything " +
            "the model could have fitted.",
        },
      ],
    },

    {
      heading: "What can go wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "A slope is not evidence of causation",
          text:
            "β̂₁ measures association in the observed data. Ice-cream sales predict drownings with " +
            "a positive, highly significant slope; the mechanism is summer. Nothing in the fitting " +
            "procedure can distinguish a causal relationship from a common cause.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The line is only claimed over the observed range of X",
          text:
            "Extrapolating beyond the data assumes linearity where none was tested. A dose–response " +
            "curve that is beautifully linear from 0 to 10 mg says nothing about 100 mg, and the " +
            "intercept is itself an extrapolation whenever x = 0 lies outside the observed range.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Fit a plot, not just a number",
          text:
            "Anscombe's quartet is four datasets with identical means, variances, correlation, and " +
            "fitted line — one linear, one curved, one with a single outlier dragging the line, one " +
            "where a single point at extreme x determines the slope entirely. The summary " +
            "statistics cannot tell them apart; a scatterplot separates them instantly.",
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§3.1, Simple Linear Regression" },
    { source: "Wasserman, All of Statistics", locator: "§13.1–13.2, Simple Linear Regression and Least Squares" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§11.3, Simple Linear Regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-01-foundations.md" },
  ],
};
