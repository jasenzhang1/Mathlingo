import type { WikiArticle } from "../types";

export const constrainedPortfolioOptimizationWiki: WikiArticle = {
  conceptId: "constrained-portfolio-optimization",

  summary:
    "Naive mean-variance optimization trusts its inputs completely, and they don't deserve it: small errors in Sharpe " +
    "ratios or correlations flip positions and waste $10$–$50\\%$ of the Sharpe ratio. Real portfolio construction adds " +
    "constraints and penalties — some demanded by investors, regulators or implementation, others as deliberate " +
    "defences against estimation error. This lesson catalogues the common constraints, flags the ones to avoid, and " +
    "shows how robust formulations all turn into penalties. KKT Conditions is the optimization prerequisite.",

  sections: [
    {
      heading: "What goes wrong with naive MVO",
      blocks: [
        {
          kind: "prose",
          text:
            "Two assets with Sharpe ratios $s_1 \\ge s_2 > 0$ and correlation $\\rho$: MVO shorts asset 2 whenever " +
            "$\\frac{s_2}{s_1} < \\rho$, using it as a hedge. The logic is sound with perfect inputs, but the decision hinges " +
            "on estimates. If true Sharpe ratios lie within distance $\\varepsilon$ of the forecasts, the worst-case relative " +
            "PnL loss for uncorrelated assets is $\\frac{\\varepsilon}{\\|\\mathbf{s}\\|}$ — $35\\%$ for forecasts $[1, 1]$ and " +
            "$\\varepsilon = 0.5$ — and higher correlation makes it worse. Correlation errors of $0.1$ (larger in a crisis) " +
            "cost more.",
        },
      ],
    },
    {
      heading: "A catalogue of constraints",
      blocks: [
        {
          kind: "table",
          headers: ["Type", "Examples", "Form"],
          rows: [
            ["Linear", "Long-only $\\mathbf{w} \\ge \\mathbf{0}$; position boxes (ownership, liquidation cost, idio concentration); factor exposures $\\mathbf{B}^{\\top}\\mathbf{w} = \\mathbf{b}_0$; market beta", "Convex"],
            ["Absolute values", "GMV $\\sum|w_i| \\le G$; long/short ratio ($130/30$); turnover", "Convex — split $w_i = w_i^{+} - w_i^{-}$"],
            ["Nonlinear", "Trading cost $\\sum_i c_i|w_i - w_i^{\\text{start}}|^{\\beta}$, $\\beta \\in [1, 2]$; style-factor risk $\\mathbf{b}_{\\text{style}}^{\\top}\\boldsymbol{\\Omega}_{\\text{style}}\\mathbf{b}_{\\text{style}} \\le \\sigma^{2}$; tracking error of $\\mathbf{w} - \\mathbf{w}_{\\text{bench}}$", "Convex"],
            ["Non-convex", "Maximum number of names; minimum % idio variance; minimum idio volatility; minimum total volatility; minimum GMV", "Avoid"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The excommunicable constraints",
          text:
            "Lower bounds on risk or size are non-convex and ill-conceived: if the optimal portfolio is small after alphas, " +
            "costs and risk limits, it should probably stay small. Bound factor risk from above instead, and instead of " +
            "cardinality limits, model trading costs and drop trades below a threshold.",
        },
      ],
    },
    {
      heading: "Constraints versus penalties",
      blocks: [
        {
          kind: "prose",
          text:
            "Every constraint with shadow price $\\mu^{*}$ can be replaced by a penalty with coefficient $\\mu^{*}$ and the " +
            "same solution; solvers return $\\mu^{*}$ for free, as a sensitivity. Constraints commensurable with PnL (trading " +
            "costs) belong in the objective with coefficient one; a volatility term can be linearized near a target as " +
            "$\\sigma \\approx \\frac{\\sigma_0}{2} + \\frac{\\sigma^{2}}{2\\sigma_0}$. The difference: a constraint's price is " +
            "unknown until solved and solutions can be very sensitive to its limit, whereas a penalty fixes a price with a " +
            "clear meaning and keeps the trade-off consistent across rebalances.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Constraints can help",
          text:
            "With perfect inputs, constraints only lower the optimum. With estimation error they act as regularization — " +
            "Jagannathan and Ma showed long-only constraints on a minimum-variance portfolio are equivalent to shrinking " +
            "the covariance.",
        },
      ],
    },
    {
      heading: "Robust formulations all become penalties",
      blocks: [
        {
          kind: "table",
          headers: ["Misspecification", "Assumption", "Resulting penalty"],
          rows: [
            ["Uncertain alpha", "$\\boldsymbol{\\alpha} \\sim \\mathcal{N}(\\hat{\\boldsymbol{\\alpha}}, \\tau^{2}\\mathbf{I})$", "Covariance $\\boldsymbol{\\Omega} + \\tau^{2}\\mathbf{I}$ (ridge)"],
            ["Robust alpha", "$\\|\\boldsymbol{\\alpha} - \\hat{\\boldsymbol{\\alpha}}\\| \\le d$, worst case", "$-d\\|\\mathbf{w}\\|$"],
            ["Robust factor", "A missing factor of volatility $\\nu$, orthogonal to $\\mathbf{B}$", "$\\nu^{2}\\|\\mathbf{w}_\\perp\\|^{2}$"],
            ["Robust correlations", "$|\\rho_{ij} - \\hat{\\rho}_{ij}| \\le d$", "$d^{2}\\left(\\sum_i|w_i|\\sigma_i\\right)^{2}$ (squared $L_1$)"],
            ["Robust covariance", "Frobenius error $\\le d$", "$d\\|\\mathbf{w}\\|^{2}$"],
          ],
        },
        {
          kind: "example",
          title: "What a ridge does to correlations",
          problem: "Two unit-variance assets with correlation $0.6$. Add $c\\mathbf{I}$ with $c = 0.5$.",
          steps: [
            "Variances become $1.5$; the covariance stays $0.6$.",
            "New correlation $\\frac{0.6}{1.5} = 0.4$.",
          ],
          answer: "Ridge penalties shrink correlations and equalize variances — so the optimizer stops making confident long/short hedges out of noisy correlation estimates.",
        },
        {
          kind: "prose",
          text:
            "The robust-alpha case uses a handy fact: $\\min\\{\\mathbf{a}^{\\top}\\mathbf{x} : \\|\\mathbf{x} - \\mathbf{x}_0\\| \\le d\\} " +
            "= \\mathbf{a}^{\\top}\\mathbf{x}_0 - d\\|\\mathbf{a}\\|$, attained at $\\mathbf{x}_0 - d\\frac{\\mathbf{a}}{\\|\\mathbf{a}\\|}$. Near " +
            "the optimum, $d\\|\\mathbf{w}\\|$ and a rescaled $\\|\\mathbf{w}\\|^{2}$ are interchangeable.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 9, §9.1–9.2 (Table 9.1, Insights 9.1–9.3)" },
    { source: "Jagannathan and Ma, “Risk Reduction in Large Portfolios: Why Imposing the Wrong Constraints Helps”, Journal of Finance (2003)", locator: "Constraints as shrinkage" },
    { source: "Ceria and Stubbs, “Incorporating estimation errors into portfolio selection”, Journal of Asset Management (2006)", locator: "Robust optimization" },
  ],
};
