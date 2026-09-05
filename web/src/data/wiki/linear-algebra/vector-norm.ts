import type { WikiArticle } from "../types";

export const vectorNorm: WikiArticle = {
  conceptId: "vector-norm",
  summary:
    "A norm assigns a length to a vector. The Euclidean norm is the familiar one, but it is not the only sensible choice — and which norm you pick changes what \"close\", \"small\", and \"best fit\" mean. The differences between $\\ell_1$, $\\ell_2$, and $\\ell_\\infty$ are the reason lasso produces sparse models and ridge does not.",
  sections: [
    {
      heading: "The Euclidean norm",
      blocks: [
        {
          kind: "formula",
          latex: "\\|\\mathbf{v}\\|_2 = \\sqrt{\\mathbf{v}\\cdot\\mathbf{v}} = \\sqrt{\\sum_{i=1}^{n} v_i^{2}}",
          caption: "The $\\ell_2$ norm — Pythagoras in $n$ dimensions",
        },
        {
          kind: "prose",
          text: "Distance between two vectors is the norm of their difference, $\\|\\mathbf{u} - \\mathbf{v}\\|$. A vector with $\\|\\mathbf{v}\\| = 1$ is a *unit vector*, and dividing any non-zero vector by its norm — normalising — keeps its direction while setting its length to one.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why squares, again",
          text: "The $\\ell_2$ norm is the one compatible with the dot product, so it is the only norm under which orthogonality, projection, and Pythagoras all work. That connection is why least squares uses it: minimising $\\|\\mathbf{y} - X\\boldsymbol{\\beta}\\|_2$ has a geometric meaning — orthogonal projection — that no other norm supplies, and hence a closed-form solution.",
        },
      ],
    },
    {
      heading: "The general definition",
      blocks: [
        {
          kind: "prose",
          text: "Any function $\\|\\cdot\\|$ is a norm if it satisfies three conditions. They are what make \"length\" behave the way the word implies:",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "**Positive definite.** $\\|\\mathbf{v}\\| \\ge 0$, with equality only for $\\mathbf{v} = \\mathbf{0}$.",
            "**Absolutely homogeneous.** $\\|c\\mathbf{v}\\| = |c|\\,\\|\\mathbf{v}\\|$ — doubling a vector doubles its length.",
            "**Triangle inequality.** $\\|\\mathbf{u} + \\mathbf{v}\\| \\le \\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$ — no detour is shorter than going direct.",
          ],
        },
        {
          kind: "table",
          headers: ["Norm", "Formula", "Unit ball", "Used for"],
          rows: [
            [
              "$\\ell_1$ (Manhattan)",
              "$\\sum_i |v_i|$",
              "diamond",
              "sparsity, lasso, robust loss",
            ],
            [
              "$\\ell_2$ (Euclidean)",
              "$\\sqrt{\\sum_i v_i^{2}}$",
              "circle",
              "least squares, ridge, geometry",
            ],
            [
              "$\\ell_\\infty$ (max)",
              "$\\max_i |v_i|$",
              "square",
              "worst-case error, uniform bounds",
            ],
            [
              "$\\ell_p$",
              "$\\left(\\sum_i |v_i|^{p}\\right)^{1/p}$",
              "interpolates",
              "the general family, $p \\ge 1$",
            ],
          ],
        },
      ],
    },
    {
      heading: "Why the choice matters",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Corners produce sparsity",
          text: "The $\\ell_1$ unit ball is a diamond with corners on the axes; the $\\ell_2$ ball is a smooth circle. When a regression's loss contours first touch the constraint region, a diamond is overwhelmingly likely to be touched *at a corner* — where some coordinates are exactly zero. A circle has no corners, so ridge shrinks coefficients toward zero without ever reaching it. The entire difference between lasso and ridge is the shape of the unit ball.",
        },
        {
          kind: "example",
          title: "The same vector, three lengths",
          problem: "For $\\mathbf{v} = (3, -4, 12)$, compute the three standard norms.",
          steps: [
            "$\\|\\mathbf{v}\\|_1 = 3 + 4 + 12 = 19$.",
            "$\\|\\mathbf{v}\\|_2 = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13$.",
            "$\\|\\mathbf{v}\\|_\\infty = \\max(3, 4, 12) = 12$.",
          ],
          answer:
            "$19$, $13$, $12$. Always $\\|\\mathbf{v}\\|_\\infty \\le \\|\\mathbf{v}\\|_2 \\le \\|\\mathbf{v}\\|_1$ — the ordering holds for every vector.",
        },
        {
          kind: "prose",
          text: "In finite dimensions all norms are *equivalent*: each is bounded by a constant multiple of any other, so convergence in one implies convergence in all. That is reassuring for theory and misleading for practice — the constants grow with dimension, and in high dimensions the difference between $\\ell_1$ and $\\ell_2$ is precisely what drives an algorithm's behaviour.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "$p < 1$ does not give a norm",
          text: "The so-called $\\ell_0$ \"norm\" — counting non-zero entries — violates homogeneity, and $\\ell_p$ for $0 < p < 1$ violates the triangle inequality. Both are genuinely useful sparsity measures, but neither is a norm, and optimising them is non-convex. The $\\ell_1$ norm is the tightest convex relaxation of $\\ell_0$, which is exactly why lasso is tractable while direct subset selection is not.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§1.2, §11.2" },
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§A.1.2" },
    { source: "Hastie, Tibshirani & Friedman, Elements of Statistical Learning", locator: "§3.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-01-vectors-and-operations.md" },
  ],
};
