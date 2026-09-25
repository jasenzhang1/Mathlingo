import type { WikiArticle } from "../types";

export const leastSquaresViaSvdWiki: WikiArticle = {
  conceptId: "least-squares-via-svd",

  summary:
    "The singular value decomposition X = UDVᵀ is the most expensive way to compute a regression and the " +
    "most informative. It diagonalises the problem completely: in the rotated coordinates each coefficient " +
    "is a separate division by a singular value. That makes rank deficiency and near-collinearity visible " +
    "as small singular values, and gives the minimum-norm solution — the one the Moore–Penrose inverse " +
    "defines — when X is not of full rank.",

  sections: [
    {
      heading: "Least squares in singular coordinates",
      blocks: [
        {
          kind: "formula",
          latex: "X = UDVᵀ,  D = \\mathrm{diag}(d₁ ≥ ⋯ ≥ d_p ≥ 0)  ⟹  β̂ = VD^{-1}Uᵀy = Σ_{k} \\frac{uₖᵀy}{dₖ} vₖ",
        },
        {
          kind: "prose",
          text:
            "Each term divides the component of y along uₖ by dₖ. A small singular value amplifies noise in " +
            "that direction — the same 1/λ variance terms seen in collinearity diagnostics, since the " +
            "eigenvalues of XᵀX are dₖ². The singular values also give the condition number directly: κ(X) = d₁/d_p.",
        },
      ],
    },

    {
      heading: "The rank-deficient case",
      blocks: [
        {
          kind: "formula",
          latex: "β̂⁺ = X⁺y = Σ_{k : dₖ > 0} \\frac{uₖᵀy}{dₖ} vₖ",
          caption: "Drop the zero singular values: the minimum-norm least-squares solution.",
        },
        {
          kind: "prose",
          text:
            "When rank(X) = r < p, the terms with dₖ = 0 are simply omitted. The result is the least-squares " +
            "solution of smallest Euclidean norm — orthogonal to the null space of X, so it has no component " +
            "in directions the data cannot identify.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Numerical rank needs a tolerance",
          text:
            "In floating point, singular values are almost never exactly zero. Treating dₖ as zero when " +
            "dₖ < τ·d₁, for a tolerance τ reflecting machine precision and data accuracy, decides the " +
            "numerical rank. The choice matters: a threshold too small keeps directions dominated by rounding " +
            "noise, one too large throws away real information. Seber & Lee §11.9 discusses the same decision " +
            "for pivoted QR.",
        },
      ],
    },

    {
      heading: "Example and cost",
      blocks: [
        {
          kind: "example",
          title: "Coefficients in singular coordinates",
          problem: "A regression has singular values 10 and 0.1, with u₁ᵀy = 20 and u₂ᵀy = 0.3. Find the coefficients along v₁ and v₂.",
          steps: [
            "Along v₁: 20/10 = 2.",
            "Along v₂: 0.3/0.1 = 3 — a small projection magnified 10-fold by the small singular value.",
          ],
          answer: "2 and 3; noise of ±0.1 in u₂ᵀy would move the second by ±1.",
        },
        {
          kind: "table",
          headers: ["Method", "Relative cost (n ≫ p)", "Strength"],
          rows: [
            ["Normal equations (Cholesky)", "1", "Fastest"],
            ["Householder QR", "≈ 2", "Stable; the usual default"],
            ["SVD", "≈ 2–4 or more", "Reveals rank and conditioning; minimum-norm solutions"],
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§11.4, Singular Value Decomposition" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§11.9, Rank-Deficient Case" },
  ],
};
