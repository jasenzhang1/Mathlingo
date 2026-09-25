import type { WikiArticle } from "../types";

export const regressionSplinesWiki: WikiArticle = {
  conceptId: "regression-splines",

  summary:
    "A single polynomial has to bend everywhere to fit anywhere: raising the degree to capture one local " +
    "feature makes the curve wiggle elsewhere. A spline instead joins low-degree polynomial pieces at knots, " +
    "with the pieces forced to agree in value and in their first d − 1 derivatives at each join. With the " +
    "knots fixed, a spline is a linear model in a handful of basis columns, fitted by ordinary least " +
    "squares — flexibility without leaving the linear-model toolkit.",

  sections: [
    {
      heading: "Why one polynomial is not enough",
      blocks: [
        {
          kind: "prose",
          text:
            "Seber & Lee §7.2.1 describes the typical failure: a response that is flat for a while and then " +
            "rises. A quadratic or cubic fitted to the whole range undershoots in one region and overshoots in " +
            "another, and higher degrees oscillate near the ends. The problem is that a polynomial's " +
            "coefficients are global — each one affects the curve at every x.",
        },
      ],
    },

    {
      heading: "The truncated power basis",
      blocks: [
        {
          kind: "formula",
          latex: "f(x) = Σ_{j=0}^{d} βⱼ x^j + Σ_{k=1}^{K} γₖ (x − κₖ)_+^d",
          caption: "A degree-d spline with knots κ₁ < ⋯ < κ_K: one extra column per knot.",
        },
        {
          kind: "prose",
          text:
            "Each (x − κₖ)₊^d is zero to the left of its knot and a degree-d polynomial to the right, with its " +
            "first d − 1 derivatives zero at the knot — so adding it changes only the d-th derivative there. " +
            "The total number of parameters is d + 1 + K; a cubic spline with K knots has K + 4.",
        },
        {
          kind: "table",
          headers: ["Spline", "Continuity at knots", "Parameters (K knots)"],
          rows: [
            ["Piecewise linear (d = 1)", "Value only", "K + 2"],
            ["Quadratic (d = 2)", "Value and slope", "K + 3"],
            ["Cubic (d = 3)", "Value, slope, and curvature", "K + 4"],
            ["Natural cubic", "Cubic, and linear beyond the boundary knots", "K"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why cubic",
          text:
            "Cubic splines are the lowest degree whose joins are invisible to the eye: with continuous second " +
            "derivatives, the curvature does not jump. The natural cubic spline adds four constraints at the " +
            "ends, taming the wild boundary behaviour polynomials are known for.",
        },
      ],
    },

    {
      heading: "B-splines and choosing knots",
      blocks: [
        {
          kind: "prose",
          text:
            "The truncated power basis spans the right space but is numerically poor — its columns are highly " +
            "correlated for the same reason 1, x, x², … are. The B-spline basis spans the same space with " +
            "functions that are each non-zero over only d + 1 adjacent intervals, giving a banded, well-" +
            "conditioned XᵀX. Fitted values are identical; only the numerics improve.",
        },
        {
          kind: "list",
          items: [
            "Knots are commonly placed at quantiles of x, so each piece sees a similar amount of data.",
            "The number of knots is a model-selection problem: choose by cross-validation or an information criterion.",
            "Because the model is linear given the knots, F-tests of 'is the extra flexibility needed?' are standard nested-model tests.",
          ],
        },
        {
          kind: "example",
          title: "Counting parameters",
          problem: "A cubic regression spline with 5 interior knots is fitted to n = 60 points. How many residual degrees of freedom remain?",
          steps: ["Parameters: d + 1 + K = 3 + 1 + 5 = 9.", "Residual df: 60 − 9 = 51."],
          answer: "51.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§7.2.1, Unsatisfactory Fit" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§7.2.2, Spline Functions" },
  ],
};
