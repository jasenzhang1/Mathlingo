import type { WikiArticle } from "../types";

export const linearFactorModelsWiki: WikiArticle = {
  conceptId: "linear-factor-models",

  summary:
    "Stock returns move together, but not arbitrarily: a handful of common drivers — the market, industries, styles such " +
    "as value or momentum — explain most of the co-movement, and what is left over is specific to each stock. A linear " +
    "factor model writes this down as $\\mathbf{r} = \\boldsymbol{\\alpha} + \\mathbf{B}\\mathbf{f} + \\boldsymbol{\\epsilon}$. " +
    "The payoff is a covariance matrix with far fewer parameters than the raw one, that is always invertible, and that " +
    "speaks the language of exposures. It is the backbone of risk management, portfolio construction and attribution in " +
    "the rest of the course. It rests on the Covariance Matrix and Multiple Linear Regression lessons.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{r}_t = \\boldsymbol{\\alpha} + \\mathbf{B}\\mathbf{f}_t + \\boldsymbol{\\epsilon}_t \\qquad\\Longrightarrow\\qquad \\boldsymbol{\\Omega}_r = \\mathbf{B}\\boldsymbol{\\Omega}_f\\mathbf{B}^{\\top} + \\boldsymbol{\\Omega}_\\epsilon",
          caption: "$n$ excess returns driven by $m \\ll n$ factor returns plus idiosyncratic noise",
        },
        {
          kind: "definitions",
          items: [
            { term: "$\\mathbf{B}$ ($n \\times m$)", description: "Loadings (exposures, betas): how strongly each stock responds to each factor. Typically style columns (an all-ones “country” intercept plus standardized characteristics) and industry or country dummies equal to $1$ for members." },
            { term: "$\\mathbf{f}_t$ ($m$)", description: "Factor returns, with covariance $\\boldsymbol{\\Omega}_f$." },
            { term: "$\\boldsymbol{\\epsilon}_t$ ($n$)", description: "Idiosyncratic (specific) returns: mean zero, independent of the factors, with diagonal covariance $\\boldsymbol{\\Omega}_\\epsilon$ (a **strict** model) or sparse (an **approximate** one)." },
            { term: "$\\mathbf{B}\\mathbf{f}_t$", description: "The systematic component of returns." },
          ],
        },
        {
          kind: "prose",
          text:
            "The covariance follows from independence and the rule $\\text{Cov}(\\mathbf{B}\\mathbf{f}) = " +
            "\\mathbf{B}\\boldsymbol{\\Omega}_f\\mathbf{B}^{\\top}$. A regional model may have $10{,}000$ assets and up to " +
            "$100$ factors.",
        },
        {
          kind: "example",
          title: "One factor, two stocks",
          problem: "Factor variance $0.04$. Stock 1: $\\beta = 1.2$, idiosyncratic variance $0.09$. Stock 2: $\\beta = 0.8$, idiosyncratic variance $0.09$. Find each volatility and their correlation.",
          steps: [
            "$\\sigma_1^{2} = 1.44 \\times 0.04 + 0.09 = 0.1476$, so $\\sigma_1 \\approx 0.384$.",
            "$\\sigma_2^{2} = 0.64 \\times 0.04 + 0.09 = 0.1156$, so $\\sigma_2 = 0.34$.",
            "$\\text{Cov} = 1.2 \\times 0.8 \\times 0.04 = 0.0384$; correlation $= \\frac{0.0384}{0.384 \\times 0.34} \\approx 0.294$.",
          ],
          answer: "All co-movement runs through the factor; the factor explains $39\\%$ of stock 1's variance.",
        },
      ],
    },
    {
      heading: "Three ways to read it",
      blocks: [
        {
          kind: "list",
          items: [
            "**A graphical model**: a few factor nodes feed many asset nodes through the loadings; given the factors, assets are independent. A sparse $\\mathbf{B}$ is a sparse graph.",
            "**A superposition**: $\\mathbb{E}[\\mathbf{r} \\mid \\mathbf{f}] = \\sum_j [\\mathbf{B}]_{\\cdot, j} f_j$ — the factor part of each day's cross-section is a weighted sum of $m$ loading vectors, so it lives in an $m$-dimensional subspace of $\\mathbb{R}^{n}$.",
            "**A scalar product**: for one stock, $\\mathbb{E}[r_i - \\alpha_i \\mid \\mathbf{f}] = \\langle [\\mathbf{B}]_{i, \\cdot}, \\mathbf{f}\\rangle$; for a portfolio $\\mathbf{w}$ it is $\\mathbf{b}^{\\top}\\mathbf{f}$ with exposures $\\mathbf{b} = \\mathbf{B}^{\\top}\\mathbf{w}$ — the starting point of attribution.",
          ],
        },
      ],
    },
    {
      heading: "Why not just use the sample covariance?",
      blocks: [
        {
          kind: "prose",
          text:
            "The sample covariance $\\hat{\\boldsymbol{\\Omega}}_r = T^{-1}\\mathbf{R}\\mathbf{R}^{\\top}$ is the Gaussian MLE " +
            "and consistent, but with $T < n$ it has rank at most $T$. Every portfolio in its null space looks riskless, " +
            "and mean-variance optimization $\\mathbf{w} \\propto \\hat{\\boldsymbol{\\Omega}}_r^{-1}\\boldsymbol{\\alpha}$ " +
            "is undefined — or, near the null space, enormous.",
        },
        {
          kind: "table",
          headers: ["", "Unrestricted covariance", "Strict factor model"],
          rows: [
            ["Parameters ($n = 1{,}000$, $m = 10$)", "$\\frac{n(n + 1)}{2} = 500{,}500$", "$nm + \\frac{m(m + 1)}{2} + n = 11{,}055$"],
            ["Invertible with $T < n$?", "No", "Yes — $\\boldsymbol{\\Omega}_\\epsilon$ is diagonal and positive"],
            ["Cost of inverting", "$O(n^{3})$", "$O(nm^{2})$ via the Woodbury identity"],
            ["Interpretable?", "No", "Exposures, factor and idiosyncratic risk"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "When the residuals aren't independent",
          text:
            "The diagonal $\\boldsymbol{\\Omega}_\\epsilon$ is what makes idiosyncratic risk diversify like $\\frac{1}{n}$. " +
            "If a factor is missing — say, regional banks — their residuals are correlated, and a long-short book of banks " +
            "looks far safer than it is. Push-outs and off-diagonal residual clustering (later lessons) address this.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Not unique",
          text:
            "Any invertible $\\mathbf{C}$ gives an equivalent model $\\tilde{\\mathbf{B}} = \\mathbf{B}\\mathbf{C}^{-1}$, " +
            "$\\tilde{\\mathbf{f}} = \\mathbf{C}\\mathbf{f}$ with the same covariance. Only the factor subspace is pinned " +
            "down — the subject of the next lesson.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 3, §3.1–3.2 Factor Models and their interpretations; FAQ 3.1 and 3.4" },
    { source: "Connor, Goldberg and Korajczyk, Portfolio Risk Analysis", locator: "Ch. 1–2, factor models of asset returns" },
    { source: "Johnson and Wichern, Applied Multivariate Statistical Analysis", locator: "Ch. 9, Factor Analysis" },
  ],
};
