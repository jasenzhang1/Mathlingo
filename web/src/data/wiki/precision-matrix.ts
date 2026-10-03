import type { WikiArticle } from "./types";

export const precisionMatrixWiki: WikiArticle = {
  conceptId: "precision-matrix",
  summary:
    "The precision matrix is the inverse covariance, $\\Theta = \\Sigma^{-1}$. Where $\\Sigma$ describes how pairs of " +
    "variables move together marginally, $\\Theta$ describes how they are related once every other variable is " +
    "held fixed. For a multivariate normal vector the payoff is exact: $X_i$ and $X_j$ are conditionally " +
    "independent given all the other variables if and only if $\\Theta_{ij} = 0$.",
  sections: [
    {
      heading: "Definition and where it appears",
      blocks: [
        {
          kind: "formula",
          latex: "\\Theta = \\Sigma^{-1}, \\qquad f(x) \\propto \\exp\\!\\left(-\\tfrac{1}{2}(x-\\mu)^\\top \\Theta\\, (x-\\mu)\\right)",
          caption: "The Gaussian density is written in terms of the precision, not the covariance",
        },
        {
          kind: "prose",
          text: "$\\Theta$ exists whenever $\\Sigma$ is positive definite, and is then itself symmetric positive definite. Expanding the quadratic form shows why its entries matter: the exponent contains the cross term $-\\Theta_{ij}(x_i-\\mu_i)(x_j-\\mu_j)$ for every pair, and that term is the only place $x_i$ and $x_j$ meet.",
        },
      ],
    },
    {
      heading: "Zeros mean conditional independence",
      blocks: [
        {
          kind: "formula",
          latex: "X \\sim \\mathcal{N}(\\mu, \\Sigma): \\qquad X_i \\perp X_j \\mid X_{-\\{i,j\\}} \\iff \\Theta_{ij} = 0",
          caption: "$X_{-\\{i,j\\}}$ means every variable except $X_i$ and $X_j$",
        },
        {
          kind: "prose",
          text: "Why: fix every other coordinate. The joint density of $(x_i, x_j)$ is then proportional to the exponential of a quadratic in $x_i$ and $x_j$, and it factors into a function of $x_i$ times a function of $x_j$ exactly when there is no $x_i x_j$ term — that is, when $\\Theta_{ij} = 0$. Factorisation of the conditional density is conditional independence.",
        },
        {
          kind: "table",
          headers: ["Zero entry", "Means (for a Gaussian)", "Graph it describes"],
          rows: [
            ["$\\Sigma_{ij} = 0$", "$X_i \\perp X_j$ marginally", "covariance graph"],
            ["$\\Theta_{ij} = 0$", "$X_i \\perp X_j \\mid$ everything else", "conditional independence graph (a Gaussian graphical model)"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Sparse precision, dense covariance",
          text: "The two kinds of zero are unrelated. A chain $X_1 - X_2 - X_3$ has $\\Theta_{13} = 0$ but $\\Sigma_{13} \\ne 0$: $X_1$ and $X_3$ are correlated because both are tied to $X_2$, and become independent once $X_2$ is known. Reading a covariance matrix for structure finds correlation, not direct dependence.",
        },
      ],
    },
    {
      heading: "What the entries mean",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Diagonal $\\Theta_{ii}$", description: "The reciprocal of the conditional variance: $\\operatorname{Var}(X_i \\mid X_{-i}) = 1/\\Theta_{ii}$. A large $\\Theta_{ii}$ means the other variables pin $X_i$ down tightly." },
            { term: "Regression coefficients", description: "$\\mathbb{E}[X_i \\mid X_{-i}] = \\mu_i - \\sum_{j \\ne i} \\frac{\\Theta_{ij}}{\\Theta_{ii}}(X_j - \\mu_j)$, so regressing $X_i$ on all the others gives coefficients $\\beta_{ij} = -\\Theta_{ij}/\\Theta_{ii}$ — zero exactly when $\\Theta_{ij}$ is." },
            { term: "Partial correlation", description: "$\\rho_{ij \\cdot \\text{rest}} = -\\Theta_{ij}/\\sqrt{\\Theta_{ii}\\Theta_{jj}}$, the correlation between $X_i$ and $X_j$ after both are adjusted for all other variables. Note the minus sign." },
          ],
        },
        {
          kind: "prose",
          text: "All three follow from the conditional-normal formulas, since conditioning on $X_{-i}$ leaves a variance equal to the Schur complement $\\Sigma_{ii} - \\Sigma_{i,-i}\\Sigma_{-i,-i}^{-1}\\Sigma_{-i,i}$, which block inversion shows is $1/\\Theta_{ii}$.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A three-variable chain",
          problem:
            "$X \\sim \\mathcal{N}(0, \\Sigma)$ with $\\Theta = \\begin{bmatrix} 2 & -1 & 0 \\\\ -1 & 2 & -1 \\\\ 0 & -1 & 2 \\end{bmatrix}$. Which pairs are conditionally independent given the rest, what is $\\rho_{12 \\cdot 3}$, and are $X_1$ and $X_3$ marginally independent?",
          steps: [
            "Only $\\Theta_{13} = 0$, so $X_1 \\perp X_3 \\mid X_2$; the graph is the chain $1 - 2 - 3$.",
            "$\\rho_{12 \\cdot 3} = -\\Theta_{12}/\\sqrt{\\Theta_{11}\\Theta_{22}} = 1/\\sqrt{4} = 1/2$.",
            "Inverting, $\\det\\Theta = 4$ and $\\Sigma = \\tfrac{1}{4}\\begin{bmatrix} 3 & 2 & 1 \\\\ 2 & 4 & 2 \\\\ 1 & 2 & 3 \\end{bmatrix}$, so $\\Sigma_{13} = 1/4 \\ne 0$.",
          ],
          answer: "$X_1 \\perp X_3 \\mid X_2$ with $\\rho_{12 \\cdot 3} = 1/2$, yet $X_1$ and $X_3$ are marginally correlated ($\\Sigma_{13} = 1/4$).",
        },
      ],
    },
    {
      heading: "Beyond the Gaussian, and estimating it",
      blocks: [
        {
          kind: "list",
          items: [
            "For any distribution with finite second moments, $\\Theta_{ij} = 0$ still means zero partial correlation — no linear association after adjustment. It implies conditional independence only for the Gaussian (and a few special families); non-linear dependence can hide behind a zero.",
            "The natural estimate $\\hat{\\Theta} = S^{-1}$ inverts the sample covariance. When $p$ approaches $n$ it is wildly unstable, and when $p > n$, $S$ is singular and has no inverse at all. Estimating a sparse $\\Theta$ directly — the graphical lasso — is the fix.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Lauritzen, Graphical Models", locator: "Ch. 5, Gaussian graphical models" },
    { source: "Hastie, Tibshirani & Wainwright, Statistical Learning with Sparsity", locator: "§9.1–9.2" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§3.2, the multivariate Gaussian" },
  ],
};
