import type { WikiArticle } from "../types";

export const mEstimatorsRegressionWiki: WikiArticle = {
  conceptId: "m-estimators-regression",

  summary:
    "Least squares squares every residual, so one wild observation can dominate the fit. M-estimators " +
    "replace the square with a loss ρ that grows more slowly for large residuals — linearly for Huber's " +
    "loss and for least absolute deviations, not at all beyond a point for redescending losses like " +
    "Tukey's bisquare. The result is fitted by iteratively reweighted least squares, where each step " +
    "down-weights the observations the current fit finds most surprising.",

  sections: [
    {
      heading: "The estimating equations",
      blocks: [
        {
          kind: "formula",
          latex: "β̂ = \\arg\\min_β Σᵢ ρ\\left(\\frac{yᵢ − xᵢᵀβ}{s}\\right)  \\;⟹\\;  Σᵢ ψ\\left(\\frac{eᵢ}{s}\\right) xᵢ = 0,  ψ = ρ'",
          caption: "s is a robust scale estimate, e.g. MAD/0.6745, so that 'large' residual is judged in standardised units.",
        },
        {
          kind: "table",
          headers: ["Loss", "ρ(u)", "ψ(u)", "Weight w(u) = ψ(u)/u"],
          rows: [
            ["Least squares", "u²/2", "u", "1"],
            ["Least absolute deviations (L1)", "|u|", "sign(u)", "1/|u|"],
            ["Huber, tuning c", "u²/2 if |u| ≤ c; c|u| − c²/2 otherwise", "u clipped to [−c, c]", "min(1, c/|u|)"],
            ["Tukey bisquare, tuning c", "bounded", "u(1 − (u/c)²)² for |u| ≤ c, 0 beyond", "(1 − (u/c)²)² for |u| ≤ c, 0 beyond"],
          ],
        },
        {
          kind: "prose",
          text:
            "Huber with c = 1.345 is 95% as efficient as least squares when the errors really are normal, " +
            "while limiting the pull of any single large residual. The bisquare with c = 4.685 has the same " +
            "95% efficiency and gives zero weight to gross outliers — but its objective is not convex, so it " +
            "needs a good starting value.",
        },
      ],
    },

    {
      heading: "Iteratively reweighted least squares",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Start from an initial fit (least squares, or better, a high-breakdown fit) and robust scale s.",
            "Compute standardised residuals uᵢ = eᵢ/s and weights wᵢ = ψ(uᵢ)/uᵢ.",
            "Solve the weighted least-squares problem with weights wᵢ.",
            "Repeat until the coefficients stop changing.",
          ],
        },
        {
          kind: "example",
          title: "Huber weights",
          problem: "With c = 1.345, find the Huber weight for standardised residuals u = 0.8 and u = 4.",
          steps: [
            "|0.8| ≤ 1.345, so w = 1: treated exactly as in least squares.",
            "|4| > 1.345, so w = 1.345/4 ≈ 0.336: its influence is capped at what a residual of 1.345 would have.",
          ],
          answer: "Weights 1 and ≈ 0.336.",
        },
      ],
    },

    {
      heading: "What M-estimation does and does not fix",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Bounded in y, not in x",
          text:
            "The estimating equation multiplies ψ(eᵢ/s) by xᵢ. Bounding ψ limits outliers in the response, " +
            "but a point with an extreme xᵢ can still dominate — and it pulls the fit toward itself, so its " +
            "residual is small and ψ never gets a chance to down-weight it. Against bad leverage points, " +
            "ordinary M-estimators break down just like least squares. Generalised M-estimators add weights " +
            "on xᵢ; high-breakdown methods solve the problem properly.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "L1 regression is median regression",
          text:
            "Minimising Σ|eᵢ| fits the conditional median, the τ = 0.5 case of quantile regression. It is " +
            "computed by linear programming (Seber & Lee §11.12.1), and it shares the M-estimator weakness " +
            "to leverage points.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.13.1, M-Estimates" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§11.12, Robust Regression Calculations" },
  ],
};
