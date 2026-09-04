import type { WikiArticle } from "../types";

export const rayleighQuotient: WikiArticle = {
  conceptId: "rayleigh-quotient",
  summary:
    "The Rayleigh quotient turns eigenvalues into an optimisation problem: maximising $\\mathbf{x}^{\\top}A\\mathbf{x}/\\mathbf{x}^{\\top}\\mathbf{x}$ finds the largest eigenvalue, and the maximiser is its eigenvector. This is why PCA can be *defined* as variance maximisation and still produce eigenvectors.",
  sections: [
    {
      heading: "Definition and bounds",
      blocks: [
        {
          kind: "formula",
          latex: "R(\\mathbf{x}) = \\frac{\\mathbf{x}^{\\top}A\\mathbf{x}}{\\mathbf{x}^{\\top}\\mathbf{x}}, \\qquad \\lambda_{\\min} \\le R(\\mathbf{x}) \\le \\lambda_{\\max}",
          caption: "For symmetric $A$ and $\\mathbf{x} \\ne \\mathbf{0}$",
        },
        {
          kind: "prose",
          text: "The proof is the spectral theorem. Expand $\\mathbf{x} = \\sum_i c_i\\mathbf{q}_i$ in the orthonormal eigenbasis; then $R(\\mathbf{x}) = \\sum_i \\lambda_i c_i^{2} / \\sum_i c_i^{2}$ — a weighted average of the eigenvalues, with weights $c_i^{2}$ summing to one after normalisation. A weighted average lies between the extremes, and equals an extreme exactly when all the weight sits there.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Variational characterisation",
          text: "$\\lambda_{\\max} = \\max_{\\mathbf{x}\\ne\\mathbf{0}} R(\\mathbf{x})$, attained at the corresponding eigenvector. Eigenvalues are therefore not just roots of a polynomial — they are solutions to an optimisation problem. That reframing is what connects them to statistics and machine learning, where the natural question is almost always \"which direction maximises something?\" rather than \"which scalars satisfy $\\det(A-\\lambda I)=0$?\"",
        },
      ],
    },
    {
      heading: "PCA falls out of it",
      blocks: [
        {
          kind: "example",
          title: "The first principal component",
          problem:
            "Find the unit direction $\\mathbf{w}$ maximising the variance of the projected data $\\mathbf{w}^{\\top}\\mathbf{x}$.",
          steps: [
            "$\\operatorname{Var}(\\mathbf{w}^{\\top}\\mathbf{x}) = \\mathbf{w}^{\\top}\\Sigma\\mathbf{w}$ for the covariance $\\Sigma$.",
            "With $\\|\\mathbf{w}\\| = 1$ this is exactly $R(\\mathbf{w})$.",
            "The maximum of the Rayleigh quotient is $\\lambda_{\\max}(\\Sigma)$.",
            "Attained at the corresponding eigenvector.",
          ],
          answer:
            "The first principal component is the top eigenvector of $\\Sigma$, and the variance it explains is the top eigenvalue. PCA was posed as variance maximisation and answered with an eigenvector — the Rayleigh quotient is why those are the same question.",
        },
        {
          kind: "formula",
          latex: "\\lambda_k = \\max\\left\\{ R(\\mathbf{x}) : \\mathbf{x} \\perp \\mathbf{q}_1,\\ldots,\\mathbf{q}_{k-1} \\right\\}",
          caption: "Later components: maximise again, restricted to directions orthogonal to the earlier ones",
        },
        {
          kind: "prose",
          text: "This deflation is why principal components come out orthogonal and ordered by variance — both are consequences of the constrained maximisation, not conventions imposed afterwards. The Courant–Fischer min–max theorem generalises it, characterising every eigenvalue by an optimisation over subspaces.",
        },
      ],
    },
    {
      heading: "Numerical use",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "It is a remarkably accurate eigenvalue estimate",
          text: "If $\\mathbf{x}$ approximates an eigenvector with error $\\varepsilon$, then $R(\\mathbf{x})$ approximates the eigenvalue with error $O(\\varepsilon^{2})$ — quadratically better than the vector estimate. This follows from the quotient being stationary at eigenvectors, so first-order error terms vanish. Rayleigh quotient iteration exploits it to converge cubically, which is exceptionally fast.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Power iteration.** Repeatedly applying $A$ and normalising converges to the dominant eigenvector; the Rayleigh quotient of each iterate gives a sharp running estimate of $\\lambda_{\\max}$.",
            "**Spectral clustering.** Minimising the graph cut is a Rayleigh quotient over the Laplacian; the relaxation from binary to real vectors is what turns an NP-hard problem into an eigenvector computation.",
            "**Generalised eigenproblems.** $R(\\mathbf{x}) = \\mathbf{x}^{\\top}A\\mathbf{x}/\\mathbf{x}^{\\top}B\\mathbf{x}$ solves $A\\mathbf{x} = \\lambda B\\mathbf{x}$ — the form behind linear discriminant analysis, maximising between-class over within-class scatter.",
            "**Bounds without computation.** Evaluating $R$ at any convenient vector gives an immediate lower bound on $\\lambda_{\\max}$; a standard basis vector gives $a_{ii}$, so $\\lambda_{\\max} \\ge \\max_i a_{ii}$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Symmetry is required",
          text: "For non-symmetric matrices the eigenvalues may be complex and the quotient no longer bounds them — the weighted-average argument depends on a real orthonormal eigenbasis, which only the spectral theorem supplies. For general matrices the analogous object is the field of values, which behaves quite differently.",
        },
      ],
    },
  ],
  references: [
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lectures 27, 31" },
    { source: "Horn & Johnson, Matrix Analysis", locator: "§4.2 (Courant–Fischer)" },
    { source: "Strang, Introduction to Linear Algebra", locator: "§6.5" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-08-svd-and-applications.md" },
  ],
};
