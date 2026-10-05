import type { WikiArticle } from "../types";

export const robustRegressionOverviewWiki: WikiArticle = {
  conceptId: "robust-regression-overview",

  summary:
    "Least squares squares every residual, so a handful of unusual observations can dominate the fit — and the worst offenders often hide, because they pull the line toward themselves. Robust regression replaces the question “which line makes the squared errors smallest?” with one a few bad points cannot hijack. This lesson sets out what can go wrong (outliers, leverage, influence), the two yardsticks of a fix (breakdown point and efficiency), and the map of methods the rest of the chapter develops.",

  sections: [
    {
      heading: "Why least squares is fragile",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\boldsymbol{\\beta}}_{\\text{LS}} = \\arg\\min_{\\boldsymbol{\\beta}} \\sum_{i=1}^{n} \\left( y_i - \\mathbf{x}_i^\\top \\boldsymbol{\\beta} \\right)^2",
          caption: "Each residual enters squared, so a residual $10$ times larger counts $100$ times as much.",
        },
        {
          kind: "prose",
          text: "The mean of $1, 2, 3, 4, 100$ is $22$ — a value nothing in the data resembles — while the median is $3$. Least squares is the regression version of the mean: one observation, moved far enough, can drag the estimate anywhere. Its *breakdown point* is $0$.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Vertical outlier", description: "A typical $\\mathbf{x}_i$ with a response far from the pattern. Its large squared residual pulls the fit." },
            { term: "Good leverage point", description: "An unusual $\\mathbf{x}_i$ that lies on the pattern. It sharpens the estimate rather than distorting it." },
            { term: "Bad leverage point", description: "An unusual $\\mathbf{x}_i$ off the pattern. It tilts the line toward itself — often leaving itself a *small* residual." },
            { term: "Influence", description: "How much the fit changes when the observation is removed. Leverage is the potential; influence is the realised effect." },
          ],
        },
        {
          kind: "example",
          title: "One leverage point overturns a perfect fit",
          problem: "Fit $y = \\beta x$ through the origin to $(1, 1)$, $(2, 2)$, $(3, 3)$, then add the point $(10, 0)$.",
          steps: [
            "Without it, $\\hat\\beta = \\dfrac{\\sum x_i y_i}{\\sum x_i^2} = \\dfrac{14}{14} = 1$, a perfect fit.",
            "With it, $\\sum x_i y_i = 14$ but $\\sum x_i^2 = 114$, so $\\hat\\beta = 14/114 \\approx 0.123$.",
          ],
          answer: "One point in four drags the slope from $1$ to about $0.12$, and its own residual, $0 - 10 \\times 0.123 \\approx -1.2$, does not look alarming.",
        },
      ],
    },

    {
      heading: "Why deleting large residuals is not enough",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The residuals come from the contaminated fit",
          text: "Checking residuals assumes the fit is trustworthy, which is the thing in doubt. A bad leverage point bends the fit toward itself and escapes with a small residual. Several outliers can **mask** each other, so one-at-a-time diagnostics flag none of them, and the distorted fit can **swamp** good points, flagging them instead.",
        },
        {
          kind: "prose",
          text: "The remedy is to judge points against a fit that a few bad ones *cannot* have distorted — which is what a robust estimator provides. Its residuals, paired with a robust measure of leverage, then classify each point as clean, a vertical outlier, or a good or bad leverage point.",
        },
      ],
    },

    {
      heading: "Two yardsticks: breakdown and efficiency",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Breakdown point", description: "The smallest fraction of the data that, replaced by arbitrary values, can make the estimate arbitrarily wrong. $0\\%$ for least squares and the mean; $50\\%$ — the ceiling for any equivariant estimator — for the median." },
            { term: "Efficiency", description: "How precise the estimator is when the data really are clean and normal, relative to least squares. The median keeps only $2/\\pi \\approx 63.7\\%$." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Gauss–Markov doesn't settle it",
          text: "Least squares is the best *linear* unbiased estimator. Robust estimators are nonlinear, so the theorem never compares against them — and under heavy-tailed errors, nonlinear estimators can be far more precise, not just safer.",
        },
      ],
    },

    {
      heading: "The map of methods",
      blocks: [
        {
          kind: "table",
          headers: ["Method", "Idea", "Robust to", "Lesson"],
          rows: [
            ["M-estimators (e.g. Huber)", "A loss that grows more slowly than $u^2$; fitted by reweighting", "Outliers in $y$, not bad leverage", "M-Estimators for Regression"],
            ["Least absolute deviations", "Minimise $\\sum_i |e_i|$: median regression", "Outliers in $y$, not bad leverage", "Quantile Regression"],
            ["LTS, LMS, S-estimators", "Fit the best-fitting half of the data", "Up to $50\\%$ contamination, including bad leverage", "High-Breakdown Regression"],
            ["MM-estimators", "High-breakdown start, efficient M-step finish", "Both: high breakdown and high efficiency", "High-Breakdown Regression"],
          ],
        },
        {
          kind: "example",
          title: "How an M-estimator down-weights a point",
          problem: "Huber weights are $w(u) = \\min\\left(1, \\dfrac{c}{|u|}\\right)$ with $c = 1.345$, where $u$ is a residual divided by a robust scale such as $\\text{MAD}/0.6745$. Find the weights for $u = 0.8$ and $u = 4$.",
          steps: [
            "$|0.8| \\le 1.345$, so $w = 1$: the point counts fully, exactly as in least squares.",
            "$|4| > 1.345$, so $w = 1.345/4 \\approx 0.336$: its pull is capped at what a residual of $1.345$ would exert.",
          ],
          answer: "Weights $1$ and $\\approx 0.336$. Iterating — weights from residuals, weighted least squares, new residuals — is iteratively reweighted least squares.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "“Robust standard errors” are something else",
          text: "Heteroskedasticity-robust (sandwich) standard errors change only the *uncertainty* reported for $\\hat{\\boldsymbol{\\beta}}$; the coefficients are still least squares. They protect inference against a misspecified error variance, not the estimate against outliers.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.13, Robust Regression" },
    { source: "Rousseeuw & Leroy, Robust Regression and Outlier Detection", locator: "Ch. 1–2" },
    { source: "Maronna, Martin & Yohai, Robust Statistics: Theory and Methods", locator: "Ch. 4–5" },
  ],
};
