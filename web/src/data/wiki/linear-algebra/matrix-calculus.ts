import type { WikiArticle } from "../types";

export const matrixCalculus: WikiArticle = {
  conceptId: "matrix-calculus",
  summary:
    "Matrix calculus is ordinary calculus with the bookkeeping arranged into vectors and matrices. The formulas look intimidating and almost all reduce to two: the gradient of a linear form is its coefficient vector, and the gradient of a quadratic form is $2A\\mathbf{x}$ for symmetric $A$. Backpropagation and least squares both fall out of these.",
  sections: [
    {
      heading: "Layout conventions",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Half the confusion is notation, not mathematics",
          text: "Two conventions coexist. In *denominator layout*, $\\partial f/\\partial\\mathbf{x}$ for scalar $f$ is a column vector matching $\\mathbf{x}$; in *numerator layout* it is a row. They differ by a transpose everywhere, so formulas copied between sources may not compose. This article uses denominator layout — gradients have the same shape as the variable — which is the convention in optimisation and deep learning, because it lets you write $\\mathbf{x} \\leftarrow \\mathbf{x} - \\eta\\nabla f$ without reshaping.",
        },
        {
          kind: "prose",
          text: "A useful discipline: check shapes at every step. If $f$ is scalar and $\\mathbf{x} \\in \\mathbb{R}^{n}$, then $\\nabla_{\\mathbf{x}} f \\in \\mathbb{R}^{n}$. If the shapes do not match, the formula is wrong regardless of how plausible it looks.",
        },
      ],
    },
    {
      heading: "The identities that matter",
      blocks: [
        {
          kind: "table",
          headers: ["Function", "Gradient", "Note"],
          rows: [
            ["$\\mathbf{a}^{\\top}\\mathbf{x}$", "$\\mathbf{a}$", "the linear case"],
            ["$\\mathbf{x}^{\\top}A\\mathbf{x}$", "$(A + A^{\\top})\\mathbf{x}$", "$= 2A\\mathbf{x}$ when $A$ is symmetric"],
            ["$\\|\\mathbf{x}\\|^{2}$", "$2\\mathbf{x}$", "the case $A = I$"],
            ["$\\|A\\mathbf{x}-\\mathbf{b}\\|^{2}$", "$2A^{\\top}(A\\mathbf{x}-\\mathbf{b})$", "least squares"],
            ["$\\operatorname{tr}(AB)$ w.r.t. $A$", "$B^{\\top}$", "trace form"],
            ["$\\log\\det A$ w.r.t. $A$", "$A^{-\\top}$", "appears in Gaussian likelihoods"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Everything is the chain rule with shapes tracked",
          text: "There is no new calculus here. $\\nabla\\|A\\mathbf{x}-\\mathbf{b}\\|^{2}$ is the outer derivative $2(\\cdot)$ times the inner derivative $A$, transposed to keep the shape right — hence $2A^{\\top}(A\\mathbf{x}-\\mathbf{b})$. The transposes are shape bookkeeping, not extra mathematics, and writing out one scalar component confirms any formula you doubt.",
        },
      ],
    },
    {
      heading: "Deriving least squares",
      blocks: [
        {
          kind: "example",
          title: "The normal equations, by differentiation",
          problem: "Minimise $L(\\boldsymbol{\\beta}) = \\|\\mathbf{y} - X\\boldsymbol{\\beta}\\|^{2}$.",
          steps: [
            "Expand: $L = \\mathbf{y}^{\\top}\\mathbf{y} - 2\\boldsymbol{\\beta}^{\\top}X^{\\top}\\mathbf{y} + \\boldsymbol{\\beta}^{\\top}X^{\\top}X\\boldsymbol{\\beta}$.",
            "First term is constant. Second is linear, gradient $-2X^{\\top}\\mathbf{y}$.",
            "Third is quadratic with symmetric $X^{\\top}X$, gradient $2X^{\\top}X\\boldsymbol{\\beta}$.",
            "Set to zero: $2X^{\\top}X\\boldsymbol{\\beta} - 2X^{\\top}\\mathbf{y} = \\mathbf{0}$.",
            "The Hessian is $2X^{\\top}X$, positive semidefinite — so this is a minimum, and a strict one when the columns are independent.",
          ],
          answer:
            "$X^{\\top}X\\boldsymbol{\\beta} = X^{\\top}\\mathbf{y}$ — the same normal equations that the projection argument produces geometrically.",
        },
      ],
    },
    {
      heading: "Jacobians and backpropagation",
      blocks: [
        {
          kind: "formula",
          latex: "J_{ij} = \\frac{\\partial f_i}{\\partial x_j}, \\qquad \\nabla_{\\mathbf{x}}(g \\circ f) = J_f^{\\top}\\,\\nabla_{\\mathbf{f}}\\,g",
          caption: "The vector chain rule — Jacobians compose, transposed for gradients",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why backpropagation goes backwards",
          text: "A network is a composition, so the chain rule multiplies a chain of Jacobians. Associativity lets that product be evaluated in either order — but the loss is a *scalar*, so starting from the output means every intermediate is a vector, whereas starting from the input means materialising full Jacobian matrices. Reverse mode costs one forward and one backward pass; forward mode costs one pass *per parameter*. With millions of parameters the direction of evaluation is the entire difference between feasible and impossible.",
        },
        {
          kind: "prose",
          text: "The Hessian $\\nabla^{2}f$ is the Jacobian of the gradient, and is symmetric whenever the second partials are continuous. Its eigenvalues classify critical points, its condition number governs how slowly gradient descent converges, and its size — $n\\times n$ for $n$ parameters — is why second-order methods are rarely used directly on large models.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "$\\nabla(\\mathbf{x}^{\\top}A\\mathbf{x}) = 2A\\mathbf{x}$ only when $A$ is symmetric",
          text: "In general it is $(A + A^{\\top})\\mathbf{x}$. The symmetric case covers most applications — covariance matrices, Gram matrices, Hessians — so the shortcut is usually valid, and quietly wrong when it is not. Since $\\mathbf{x}^{\\top}A\\mathbf{x} = \\mathbf{x}^{\\top}\\tfrac{1}{2}(A+A^{\\top})\\mathbf{x}$ anyway, symmetrising first makes the shortcut always correct.",
        },
      ],
    },
  ],
  references: [
    { source: "Petersen & Pedersen, The Matrix Cookbook", locator: "§2" },
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§A.4" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "§6.5" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-02-matrices-and-structure.md" },
  ],
};
