import type { WikiArticle } from "../types";

export const loessSmoothingWiki: WikiArticle = {
  conceptId: "loess-smoothing",

  summary:
    "LOESS fits a curve by running a separate weighted regression at every point of interest, using " +
    "only nearby data and weighting it by distance. There is no global equation and no set of " +
    "coefficients to report — the fitted curve is the trace of thousands of tiny local fits. That " +
    "makes it excellent for seeing the shape of a relationship you have no parametric form for, " +
    "and poor for the things a parametric model is good at: extrapolation, compact reporting, and " +
    "clean inference.",

  sections: [
    {
      heading: "The algorithm",
      blocks: [
        {
          kind: "prose",
          text:
            "To evaluate the fitted curve at a target x₀, LOESS does the following. Repeating this " +
            "over a fine grid of x₀ values traces the whole curve.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Find the fraction q of the data closest to x₀ — q is the span, typically between 0.2 and 0.75.",
            "Weight each of those neighbours by distance, using the tricube weight w(u) = (1 − |u|³)³ for |u| < 1, where u is the distance scaled by that of the farthest included neighbour.",
            "Fit a weighted least-squares line (degree 1) or parabola (degree 2) to those weighted points.",
            "Evaluate that local fit at x₀ and keep only that single value.",
            "Discard the local fit entirely and move to the next x₀.",
          ],
        },
        {
          kind: "formula",
          latex: "ŷ(x₀) = argmin_{a,b} Σᵢ wᵢ(x₀)·(yᵢ − a − b(xᵢ − x₀))²   evaluated at x₀",
          caption: "A weighted least-squares problem, solved afresh at every target point.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The tricube weight is chosen for its shape at both ends",
          text:
            "It is exactly 1 at zero distance and decays smoothly to exactly 0 at the boundary of " +
            "the neighbourhood, with a zero derivative there. That second property is what stops " +
            "the fitted curve from jumping as a point enters or leaves the neighbourhood — a " +
            "uniform weight would produce visible kinks as the window slides.",
        },
      ],
    },

    {
      heading: "The span is the bias–variance dial",
      blocks: [
        {
          kind: "table",
          headers: ["Span q", "Neighbourhood", "Bias", "Variance", "Appearance"],
          rows: [
            ["0.1", "Very local", "Low", "High", "Wiggly; chases individual points"],
            ["0.3", "Moderate", "Moderate", "Moderate", "Usually about right"],
            ["0.75", "Broad", "Higher", "Low", "Smooth; may flatten real features"],
            ["1.0 with degree 1", "All the data", "Highest", "Lowest", "Essentially a global straight line"],
          ],
        },
        {
          kind: "prose",
          text:
            "The span plays exactly the role that K plays in K-nearest-neighbours and that the " +
            "bandwidth σ plays in an RBF kernel: it sets how far 'nearby' extends. Small values " +
            "trust local data and inherit its noise; large values borrow strength from further away " +
            "and smooth real structure away with the noise. There is no setting that avoids the " +
            "trade — only a setting that balances it for the data at hand, chosen by " +
            "cross-validation or, more often in practice, by eye.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It has effective degrees of freedom even without parameters",
          text:
            "LOESS is a linear smoother: the fitted values are Ly for a smoother matrix L that " +
            "depends only on the x values and the span. Its trace plays exactly the role trace(H) = " +
            "p + 1 plays for OLS, giving a continuous 'effective number of parameters' — around 2 " +
            "for a very large span, and rising steeply as the span shrinks. This is what makes AIC " +
            "and cross-validation comparisons possible for a method with no coefficients to count.",
        },
      ],
    },

    {
      heading: "What 'nonparametric' means here",
      blocks: [
        {
          kind: "prose",
          text:
            "It does not mean 'no parameters'. Every local fit estimates an intercept and a slope, " +
            "and the span is a tuning parameter. What is absent is a single global functional form " +
            "fixed in advance: LOESS never commits to the relationship being a line, a parabola, or " +
            "an exponential, and the shape it produces is whatever the data supports locally.",
        },
        {
          kind: "table",
          headers: ["", "Parametric (OLS)", "Nonparametric (LOESS)"],
          rows: [
            ["Form specified in advance", "Yes, globally", "No"],
            ["Number of parameters", "Fixed at p + 1", "Grows with the data"],
            ["Output", "A coefficient vector", "A curve, and nothing else"],
            ["Extrapolation", "Possible, if unwise", "Not meaningfully possible"],
            ["Efficiency when the form is right", "High", "Lower"],
            ["Robustness when the form is wrong", "Poor — systematically biased", "Good"],
          ],
        },
        {
          kind: "example",
          title: "What LOESS sees that a line cannot",
          problem:
            "Yield rises with fertiliser up to a point and then declines from over-application. A " +
            "straight line is fitted, and separately a LOESS curve. What does each show?",
          steps: [
            "The linear fit averages the rising and falling segments into one slope, which comes out modest and possibly insignificant.",
            "Its residual-versus-fitted plot shows a clear arch — the diagnostic signature of unmodelled curvature.",
            "LOESS fits rising slopes in the low-dose neighbourhoods and falling slopes in the high-dose ones, tracing the hump directly.",
            "The optimum is readable straight off the LOESS curve; the linear model has no way to represent one.",
          ],
          answer:
            "The line reports a weak overall association and hides the structure; LOESS shows the shape. Having seen it, a quadratic term is the natural parametric next step — which is the usual workflow: LOESS to discover the shape, a parametric model to quantify it.",
        },
      ],
    },

    {
      heading: "Strengths, limits, and where it is used",
      blocks: [
        {
          kind: "list",
          items: [
            "Best use: overlaying a smoother on a scatterplot to see the shape, and on a residual plot to detect unmodelled curvature — the default in most plotting libraries for exactly this reason.",
            "Robustness: iterative reweighting (the 'lowess' variant) downweights points with large residuals over a few passes, making the curve resistant to outliers.",
            "Cost: fitting a separate regression per evaluation point is expensive for large n, though approximations that fit at a subset of points and interpolate between them are standard.",
            "Dimensionality: it degrades badly beyond two or three predictors, because 'nearby' becomes empty in high dimensions — the curse of dimensionality in its plainest form.",
            "Boundaries: neighbourhoods at the edges of the data are one-sided and the fit is noticeably less reliable there. Local linear fits handle this better than local constant ones, which is why degree 1 is the default.",
            "No extrapolation: outside the observed range of x there are no neighbours, so there is nothing to fit.",
            "Inference: confidence bands exist but rest on approximations, and there is no coefficient to test. If the question is 'is this effect significant', LOESS is the wrong tool.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A LOESS curve is easy to over-read",
          text:
            "With a small span, every local bump in the data becomes a feature of the curve, and the " +
            "eye is very willing to interpret it. Before believing a wiggle, check whether it " +
            "survives a larger span, whether it is supported by more than a handful of points, and " +
            "whether it appears in a resampled version of the data. Most do not.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§6.1, Kernel Smoothers and Local Regression" },
    { source: "NIST/SEMATECH e-Handbook of Statistical Methods", locator: "§4.1.4.4, LOESS (Locally Weighted Regression)" },
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§7.6, Local Regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-04-model-selection-and-regularization.md" },
  ],
};
