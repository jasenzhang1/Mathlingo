import type { WikiArticle } from "../types";

export const estimationErrorInMvoWiki: WikiArticle = {
  conceptId: "estimation-error-in-mvo",

  summary:
    "An optimizer fed estimates $\\hat{\\boldsymbol{\\alpha}}$ and $\\hat{\\boldsymbol{\\Omega}}$ builds " +
    "$\\hat{\\boldsymbol{\\Omega}}^{-1}\\hat{\\boldsymbol{\\alpha}}$, whose realized Sharpe ratio depends on the true " +
    "$\\boldsymbol{\\alpha}$ and $\\boldsymbol{\\Omega}$. The ratio of realized to best-possible Sharpe — the Sharpe ratio " +
    "efficiency — turns out to be a cosine between two vectors in whitened space. That geometry explains which errors " +
    "matter (uneven ones), which don't (uniform scaling), and how much alpha accuracy you need. It also frames the " +
    "trade-off between Sharpe and capacity.",

  sections: [
    {
      heading: "Sharpe ratio efficiency is a cosine",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{SRE} = \\frac{\\text{SR}(\\hat{\\boldsymbol{\\alpha}}, \\hat{\\boldsymbol{\\Omega}})}{\\text{SR}(\\boldsymbol{\\alpha}, \\boldsymbol{\\Omega})} = \\frac{\\mathbf{a}^{\\top}\\mathbf{b}}{\\|\\mathbf{a}\\|\\|\\mathbf{b}\\|}, \\qquad \\mathbf{a} = \\boldsymbol{\\Omega}^{-1/2}\\boldsymbol{\\alpha}, \\ \\mathbf{b} = \\boldsymbol{\\Omega}^{1/2}\\hat{\\boldsymbol{\\Omega}}^{-1}\\hat{\\boldsymbol{\\alpha}}",
          caption: "By Cauchy–Schwarz, $\\text{SRE} \\le 1$, with equality only when the two whitened vectors are collinear",
        },
        {
          kind: "example",
          title: "Errors in alpha and in risk",
          problem: "True $\\boldsymbol{\\Omega} = \\mathbf{I}$ and $\\boldsymbol{\\alpha} = [1, 1]$, so the best Sharpe is $\\sqrt{2}$. Compare (a) $\\hat{\\boldsymbol{\\alpha}} = [1, 0]$ with the right covariance, (b) the right alphas with $\\hat{\\boldsymbol{\\Omega}} = \\text{diag}(1, 4)$.",
          steps: [
            "(a) $\\mathbf{w} \\propto [1, 0]$: SRE $= \\cos 45^{\\circ} \\approx 0.71$.",
            "(b) $\\mathbf{w} \\propto [1, 0.25]$: realized Sharpe $\\frac{1.25}{\\sqrt{1.0625}} \\approx 1.21$, SRE $\\approx 0.86$.",
          ],
          answer: "Both cost real Sharpe. And errors can cancel: with true alphas $[2, 1]$, the wrong $\\hat{\\boldsymbol{\\alpha}} = [1, 1]$ and wrong $\\text{diag}(1, 2)$ give $\\mathbf{w} \\propto [1, 0.5]$, exactly optimal.",
        },
      ],
    },
    {
      heading: "Alpha error",
      blocks: [
        {
          kind: "prose",
          text:
            "With the covariance known, the SRE is the cosine between the true and forecast whitened alphas. If the forecast " +
            "lies within a ball of radius $\\varepsilon\\|\\mathbf{a}\\|$ around the truth, the worst angle is at a tangent, " +
            "where $\\sin\\theta = \\varepsilon$, so",
        },
        {
          kind: "formula",
          latex: "\\text{SRE} \\ge \\sqrt{1 - \\varepsilon^{2}}",
          caption: "$\\varepsilon = 0.5$ guarantees $0.87$; guaranteeing $0.95$ requires $\\varepsilon \\le 0.31$",
        },
        {
          kind: "prose",
          text:
            "Scaling all alphas by a constant costs nothing; only their direction matters. Classic studies (Chopra and " +
            "Ziemba) found alpha errors far more damaging than covariance errors.",
        },
      ],
    },
    {
      heading: "Risk error",
      blocks: [
        {
          kind: "prose",
          text:
            "Write $\\mathbf{H} = \\boldsymbol{\\Omega}^{1/2}\\hat{\\boldsymbol{\\Omega}}^{-1}\\boldsymbol{\\Omega}^{1/2}$. If " +
            "$\\hat{\\boldsymbol{\\Omega}} = c\\boldsymbol{\\Omega}$, then $\\mathbf{H} \\propto \\mathbf{I}$ and nothing is lost " +
            "except the volatility forecast. Paleologo calls the general bound “weak”: even a badly wrong covariance loses " +
            "nothing if the whitened alpha happens to be an eigenvector of $\\mathbf{H}$, and the SRE can even be negative. " +
            "When the estimate shares the true eigenvectors, with true-to-estimated eigenvalue ratios $\\kappa_i$:",
        },
        {
          kind: "formula",
          latex: "\\text{SRE} \\ge \\frac{2\\sqrt{\\kappa_{\\min}\\kappa_{\\max}}}{\\kappa_{\\min} + \\kappa_{\\max}}",
          caption: "A Kantorovich-type bound: losses come from uneven misestimation across eigen-directions",
        },
        {
          kind: "example",
          title: "One volatility underestimated by half",
          problem: "Every eigen-volatility is right except one, underestimated by $50\\%$ (variance ratio $\\kappa = 4$).",
          steps: [
            "$\\kappa_{\\min} = 1$, $\\kappa_{\\max} = 4$: bound $\\frac{2 \\times 2}{5} = 0.8$.",
          ],
          answer: "Up to $20\\%$ of the Sharpe ratio, from one misestimated direction — the optimizer piles into it because it looks cheap. This is why the smallest eigenvalues and weak factors deserve care (Eigenvalue Shrinkage, Evaluating Risk Models).",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "In practice",
          text:
            "Paleologo's rule of thumb: naive MVO loses $10$–$50\\%$ of its Sharpe to forecast errors. Diagnose which input is " +
            "to blame with alpha calibration (IC, predictive regressions) and risk tests (QLIKE, Mahalanobis, minimum " +
            "variance), and defend with shrunk inputs and the penalties of the previous lesson.",
        },
      ],
    },
    {
      heading: "Trading Sharpe for capacity",
      blocks: [
        {
          kind: "prose",
          text:
            "Let $V(r)$ be the smallest volatility achievable under the constraints with return on GMV at least $r$. $V$ is " +
            "increasing and convex, so the Sharpe ratio $\\frac{r}{V(r)}$ is non-increasing: higher return per dollar of GMV, " +
            "or more absolute PnL, costs risk-adjusted performance. The MVO portfolio may have the best Sharpe but a low " +
            "return on GMV; a constrained version can earn more at a lower Sharpe. Which point to choose is a business " +
            "decision.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 9, §9.3–9.5 (Theorems 9.1–9.4, Insight 9.2)" },
    { source: "Chopra and Ziemba, “The Effect of Errors in Means, Variances, and Covariances on Optimal Portfolio Choice”, Journal of Portfolio Management (1993)", locator: "Relative importance of input errors" },
    { source: "Michaud, “The Markowitz Optimization Enigma: Is ‘Optimized’ Optimal?”, Financial Analysts Journal (1989)", locator: "Error maximization" },
  ],
};
