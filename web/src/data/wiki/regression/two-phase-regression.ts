import type { WikiArticle } from "../types";

export const twoPhaseRegressionWiki: WikiArticle = {
  conceptId: "two-phase-regression",

  summary:
    "Some relationships change slope at a threshold: growth that stops at maturity, a dose with no effect " +
    "below a level, a policy that took effect in a given year. Two-phase regression fits two lines joined " +
    "at a change point. If the change point is known the model is an ordinary linear regression with one " +
    "extra 'hinge' column; if it is unknown, it must be searched for, and the usual F-test for 'is there " +
    "a change at all?' is no longer valid.",

  sections: [
    {
      heading: "Known change point",
      blocks: [
        {
          kind: "formula",
          latex: "y = β₀ + β₁x + β₂(x − c)_+ + ε,   (x − c)_+ = \\max(0, x − c)",
          caption: "Slope β₁ below c, slope β₁ + β₂ above it, and the two pieces meet at x = c.",
        },
        {
          kind: "prose",
          text:
            "With c fixed, (x − c)₊ is just another column of X, so everything — least squares, t-tests, " +
            "F-tests, intervals — is standard. The test of β₂ = 0 asks whether the slope changes at c. " +
            "Adding an indicator column I(x > c) as well allows a jump at c, turning the continuous 'broken " +
            "stick' into two unconnected lines.",
        },
      ],
    },

    {
      heading: "Unknown change point",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "For each candidate c on a grid (typically between the data points), fit the linear model above and record RSS(c).",
            "Take ĉ = argmin RSS(c) — the maximum-likelihood estimate under normal errors (the profile likelihood is a function of RSS(c)).",
            "Refit at ĉ to report the slopes.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Searching for c breaks the standard F-test",
          text:
            "Under 'no change' (β₂ = 0), the parameter c is not identified — every c gives the same model. " +
            "Choosing the c that makes the change look biggest and then running an ordinary F-test is a " +
            "hidden multiple comparison, and the reported p-value is too small. Valid tests use the " +
            "distribution of the maximum of the F statistic over c (sup-F), obtained by approximation or " +
            "simulation.",
        },
        {
          kind: "prose",
          text:
            "RSS(c) is continuous but not differentiable at the data points, so ĉ is found by search rather " +
            "than by gradient methods; confidence intervals for c are usually obtained by inverting a " +
            "likelihood-ratio statistic over the grid.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Reading a hinge model",
          problem:
            "A fitted model is ŷ = 1 + 0.5x + 1.5(x − 4)₊. What are the slopes on each side of x = 4, and " +
            "what is the fitted value at x = 6?",
          steps: [
            "Below 4: slope 0.5.",
            "Above 4: slope 0.5 + 1.5 = 2.0.",
            "At x = 6: 1 + 0.5·6 + 1.5·(6 − 4) = 1 + 3 + 3 = 7.",
          ],
          answer: "Slopes 0.5 then 2.0; ŷ(6) = 7.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "One knot of a linear spline",
          text:
            "The hinge column (x − c)₊ is the degree-1 truncated power basis function. A two-phase model is a " +
            "linear spline with one knot; adding more hinges gives the regression splines of Chapter 7.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§6.5, Two-Phase Linear Regression" },
  ],
};
