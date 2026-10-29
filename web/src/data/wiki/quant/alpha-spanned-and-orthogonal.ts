import type { WikiArticle } from "../types";

export const alphaSpannedAndOrthogonalWiki: WikiArticle = {
  conceptId: "alpha-spanned-and-orthogonal",

  summary:
    "Project the vector of expected excess returns onto the column space of the loadings: the part inside is **alpha " +
    "spanned** — indistinguishable from factor premia and carrying factor risk — and the part outside is **alpha " +
    "orthogonal**, which a diversified portfolio could harvest with almost no risk. A correct factor model forces " +
    "orthogonal alpha to be small, so real-world excess returns mostly come with factor risk. The same linear algebra " +
    "gives three ways to reshape a model without changing what matters: rotations, projections onto fewer factors, and " +
    "push-outs that add factors. Vector Projection and Partitioned Regression (Frisch–Waugh–Lovell) are the tools.",

  sections: [
    {
      heading: "Spanned and orthogonal",
      blocks: [
        {
          kind: "formula",
          latex: "\\boldsymbol{\\alpha} = \\mathbf{B}\\boldsymbol{\\lambda} + \\boldsymbol{\\alpha}_\\perp, \\quad \\mathbf{B}^{\\top}\\boldsymbol{\\alpha}_\\perp = \\mathbf{0} \\qquad\\Longrightarrow\\qquad \\mathbf{r}_t = \\boldsymbol{\\alpha}_\\perp + \\mathbf{B}\\left(\\boldsymbol{\\lambda} + \\mathbb{E}[\\mathbf{f}_t]\\right) + \\mathbf{B}\\left(\\mathbf{f}_t - \\mathbb{E}[\\mathbf{f}_t]\\right) + \\boldsymbol{\\epsilon}_t",
          caption: "$\\boldsymbol{\\lambda} = (\\mathbf{B}^{\\top}\\mathbf{B})^{-1}\\mathbf{B}^{\\top}\\boldsymbol{\\alpha}$ is the least-squares coefficient of alpha on the loadings",
        },
        {
          kind: "prose",
          text:
            "Only the sum $\\boldsymbol{\\lambda} + \\mathbb{E}[\\mathbf{f}]$ is identified: spanned alpha cannot be told " +
            "apart from the factors' expected returns. By convention set $\\boldsymbol{\\lambda} = \\mathbf{0}$ and write " +
            "$\\boldsymbol{\\mu}_f = \\mathbb{E}[\\mathbf{f}]$.",
        },
        {
          kind: "example",
          title: "Splitting three alphas",
          problem: "Loadings: a market column $[1, 1, 1]$ and a style column $[1, 0, -1]$ (orthogonal to each other). Alphas $[0.03, 0.01, 0.02]$.",
          steps: [
            "$\\lambda_1 = \\frac{0.03 + 0.01 + 0.02}{3} = 0.02$; $\\lambda_2 = \\frac{0.03 - 0.02}{2} = 0.005$.",
            "Spanned: $0.02[1, 1, 1] + 0.005[1, 0, -1] = [0.025, 0.02, 0.015]$.",
            "Orthogonal: $[0.005, -0.01, 0.005]$ — check: it sums to zero and is orthogonal to $[1, 0, -1]$.",
          ],
          answer: "$\\frac{\\|\\mathbf{B}\\boldsymbol{\\lambda}\\|^{2}}{\\|\\boldsymbol{\\alpha}\\|^{2}} \\approx 0.89$: most of this alpha is factor premium.",
        },
      ],
    },
    {
      heading: "Why orthogonal alpha must be small",
      blocks: [
        {
          kind: "prose",
          text:
            "Hold $\\mathbf{w} = \\frac{\\boldsymbol{\\alpha}_\\perp}{\\|\\boldsymbol{\\alpha}_\\perp\\|}$. It has no factor " +
            "exposure ($\\mathbf{B}^{\\top}\\mathbf{w} = \\mathbf{0}$), expected return $\\|\\boldsymbol{\\alpha}_\\perp\\|$, and " +
            "variance $\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}_\\epsilon\\mathbf{w} \\le \\sigma_{\\max}^{2}$, the largest " +
            "idiosyncratic variance. If the average $|\\alpha_{\\perp, i}|$ is at least $\\mu$, then " +
            "$\\|\\boldsymbol{\\alpha}_\\perp\\| \\ge \\mu\\sqrt{n}$, so",
        },
        {
          kind: "formula",
          latex: "\\text{Sharpe}(\\mathbf{w}) \\ge \\frac{\\mu\\sqrt{n}}{\\sigma_{\\max}}",
          caption: "With $\\mu = 1\\%$ and $\\sigma_{\\max} = 30\\%$: $0.67$ for $400$ stocks, $1.67$ for $2{,}500$ — and unbounded as $n$ grows",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The arbitrage-pricing conclusion",
          text:
            "Sharpe ratios don't explode in reality, and idiosyncratic variances are bounded, so if the factor model is " +
            "right, typical orthogonal alpha must vanish as the universe grows — the logic of the Arbitrage Pricing Theory. " +
            "Excess returns exist, but they are more likely spanned: they come with factor risk that doesn't diversify away.",
        },
      ],
    },
    {
      heading: "Transformations",
      blocks: [
        {
          kind: "table",
          headers: ["Transformation", "Operation", "What it's for"],
          rows: [
            ["Rotation", "$\\tilde{\\mathbf{B}} = \\mathbf{B}\\mathbf{C}^{-1}$, $\\tilde{\\mathbf{f}} = \\mathbf{C}\\mathbf{f}$, $\\tilde{\\boldsymbol{\\Omega}}_f = \\mathbf{C}\\boldsymbol{\\Omega}_f\\mathbf{C}^{\\top}$", "Different views of the same model; $\\boldsymbol{\\Omega}_r$ unchanged"],
            ["Projection", "Onto loadings $\\mathbf{A}$ with range inside that of $\\mathbf{B}$: $\\mathbf{g} = \\mathbf{H}\\mathbf{f}$, $\\mathbf{H} = (\\mathbf{A}^{\\top}\\mathbf{A})^{-1}\\mathbf{A}^{\\top}\\mathbf{B}$, $\\boldsymbol{\\Omega}_g = \\mathbf{H}\\boldsymbol{\\Omega}_f\\mathbf{H}^{\\top}$", "Fewer factors: unstable loadings, a simplified model for users, distrusted vendor factors"],
            ["Push-out", "$\\mathbf{r} = \\mathbf{B}\\mathbf{f} + \\mathbf{A}\\mathbf{g} + \\boldsymbol{\\eta}$ with $\\mathbf{A}^{\\top}\\mathbf{B} = \\mathbf{0}$", "More factors, when residuals show structure (e.g. a regime change)"],
          ],
        },
        {
          kind: "definitions",
          items: [
            { term: "Unit factor covariance", description: "With $\\boldsymbol{\\Omega}_f = \\mathbf{U}\\mathbf{S}\\mathbf{U}^{\\top}$, take $\\mathbf{C} = \\mathbf{S}^{-1/2}\\mathbf{U}^{\\top}$: exposures read as factor volatilities, and factor variance is the sum of squared exposures." },
            { term: "Orthonormal loadings", description: "With $\\mathbf{B} = \\mathbf{U}\\mathbf{S}\\mathbf{V}^{\\top}$, take $\\mathbf{C}^{-1} = \\mathbf{V}\\mathbf{S}^{-1}$ to get $\\tilde{\\mathbf{B}} = \\mathbf{U}$." },
            { term: "Z-scored loadings", description: "Rescaling a column is always a rotation. Centering is one only if $\\mathbf{e} = [1, \\dots, 1]$ lies in the span of $\\mathbf{B}$ — true with a market factor, or with industries that sum to one per stock. Otherwise z-scoring changes the model's forecasts." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Projections are idempotent",
          text:
            "Projecting a model with loadings $\\mathbf{A}$ onto $\\mathbf{A}$ gives $\\mathbf{H} = \\mathbf{I}$: once on the " +
            "plane, projecting again does nothing. A push-out must keep $\\mathbf{A}^{\\top}\\mathbf{B} = \\mathbf{0}$; " +
            "otherwise write $\\mathbf{A} = \\mathbf{B}\\mathbf{C} + \\mathbf{H}$ and the parallel part $\\mathbf{B}\\mathbf{C}\\mathbf{g}$ " +
            "is absorbed into the original factor returns, changing them.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 3, §3.3 Alpha Spanned and Alpha Orthogonal and §3.4 Transformations; FAQ 3.2" },
    { source: "Ross, “The Arbitrage Theory of Capital Asset Pricing”, Journal of Economic Theory (1976)", locator: "APT" },
  ],
};
