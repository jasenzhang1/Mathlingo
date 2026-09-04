import type { WikiArticle } from "../types";

export const trace: WikiArticle = {
  conceptId: "trace",
  summary:
    "The trace is the sum of the diagonal entries. It looks like an arbitrary quantity and is not: it equals the sum of the eigenvalues, it is invariant under change of basis, and its cyclic property makes it the standard tool for simplifying expressions in matrix calculus and statistics.",
  sections: [
    {
      heading: "Definition and the two key properties",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{tr}(A) = \\sum_{i=1}^{n} a_{ii} = \\sum_{i=1}^{n} \\lambda_i",
          caption: "Diagonal sum — and eigenvalue sum, counting multiplicity",
        },
        {
          kind: "formula",
          latex: "\\operatorname{tr}(ABC) = \\operatorname{tr}(BCA) = \\operatorname{tr}(CAB)",
          caption: "Cyclic invariance — rotate the product, do not reorder it arbitrarily",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Cyclic, not commutative",
          text: "$\\operatorname{tr}(ABC) = \\operatorname{tr}(BCA)$ holds; $\\operatorname{tr}(ABC) = \\operatorname{tr}(ACB)$ generally does not. The permutation must be a rotation of the sequence. Getting this wrong is the most common error in matrix-calculus derivations, and it produces plausible-looking results that are simply false.",
        },
        {
          kind: "prose",
          text: "The eigenvalue identity follows from the characteristic polynomial: the coefficient of $\\lambda^{n-1}$ is $-\\operatorname{tr}(A)$, and it is also $-\\sum\\lambda_i$. Together with $\\det A = \\prod\\lambda_i$, this gives two free checks on any computed eigendecomposition.",
        },
      ],
    },
    {
      heading: "Basis independence",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{tr}(P^{-1}AP) = \\operatorname{tr}(APP^{-1}) = \\operatorname{tr}(A)",
          caption: "A one-line consequence of cyclicity",
        },
        {
          kind: "prose",
          text: "So the trace is a property of the underlying linear transformation, not of the matrix representing it. Change coordinates however you like and the trace is unchanged — which is why it, like the determinant and the eigenvalues, is a genuine invariant rather than an artefact of the chosen basis.",
        },
        {
          kind: "table",
          headers: ["Property", "Statement"],
          rows: [
            ["Linear", "$\\operatorname{tr}(A+B) = \\operatorname{tr}A + \\operatorname{tr}B$, $\\operatorname{tr}(cA) = c\\operatorname{tr}A$"],
            ["Transpose", "$\\operatorname{tr}(A^{\\top}) = \\operatorname{tr}(A)$"],
            ["Frobenius norm", "$\\|A\\|_F^{2} = \\operatorname{tr}(A^{\\top}A) = \\sum_i \\sigma_i^{2}$"],
            ["Projection", "$\\operatorname{tr}(P) = \\operatorname{rank}(P)$ for an orthogonal projection"],
            ["Not multiplicative", "$\\operatorname{tr}(AB) \\ne \\operatorname{tr}(A)\\operatorname{tr}(B)$ in general"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Trace of a projection counts dimensions",
          text: "An orthogonal projection has eigenvalues 1 (on the subspace) and 0 (on its complement), so the trace counts the 1s — giving the dimension of the subspace projected onto. In regression this makes $\\operatorname{tr}(H)$ the number of parameters, which is where the *effective degrees of freedom* of a smoother comes from: for ridge regression $\\operatorname{tr}(H)$ is not an integer, and that non-integer value is the honest parameter count.",
        },
      ],
    },
    {
      heading: "Where it earns its place",
      blocks: [
        {
          kind: "example",
          title: "A statistics identity",
          problem:
            "Show that $\\mathbb{E}[\\mathbf{x}^{\\top}A\\mathbf{x}] = \\operatorname{tr}(A\\Sigma) + \\boldsymbol{\\mu}^{\\top}A\\boldsymbol{\\mu}$ for $\\mathbf{x}$ with mean $\\boldsymbol{\\mu}$ and covariance $\\Sigma$.",
          steps: [
            "$\\mathbf{x}^{\\top}A\\mathbf{x}$ is a scalar, so it equals its own trace.",
            "By cyclicity, $\\operatorname{tr}(\\mathbf{x}^{\\top}A\\mathbf{x}) = \\operatorname{tr}(A\\mathbf{x}\\mathbf{x}^{\\top})$.",
            "Trace and expectation are both linear, so they commute: $\\mathbb{E}[\\operatorname{tr}(A\\mathbf{x}\\mathbf{x}^{\\top})] = \\operatorname{tr}(A\\,\\mathbb{E}[\\mathbf{x}\\mathbf{x}^{\\top}])$.",
            "$\\mathbb{E}[\\mathbf{x}\\mathbf{x}^{\\top}] = \\Sigma + \\boldsymbol{\\mu}\\boldsymbol{\\mu}^{\\top}$.",
            "Expanding gives $\\operatorname{tr}(A\\Sigma) + \\operatorname{tr}(A\\boldsymbol{\\mu}\\boldsymbol{\\mu}^{\\top})$, and the second term is the scalar $\\boldsymbol{\\mu}^{\\top}A\\boldsymbol{\\mu}$.",
          ],
          answer:
            "The identity, in five lines. The trick — turn a scalar into a trace, then rotate — is the standard move for these derivations.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Matrix calculus.** $\\dfrac{\\partial}{\\partial A}\\operatorname{tr}(AB) = B^{\\top}$ and $\\dfrac{\\partial}{\\partial A}\\operatorname{tr}(A^{\\top}A) = 2A$ — trace form is how matrix derivatives are usually stated.",
            "**Frobenius inner product.** $\\langle A,B\\rangle = \\operatorname{tr}(A^{\\top}B)$ makes matrices an inner product space, which is what gives them a geometry at all.",
            "**Nuclear norm.** $\\sum_i\\sigma_i$ is the convex relaxation of rank, and low-rank matrix recovery minimises it — the matrix analogue of lasso.",
            "**Hutchinson's estimator.** $\\operatorname{tr}(A) \\approx \\frac{1}{m}\\sum_j \\mathbf{z}_j^{\\top}A\\mathbf{z}_j$ for random $\\pm1$ vectors, estimating a trace using only matrix–vector products — essential when $A$ is too large to form.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§6.1" },
    { source: "Petersen & Pedersen, The Matrix Cookbook", locator: "§1.1, §2.5" },
    { source: "Horn & Johnson, Matrix Analysis", locator: "§1.2" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-02-matrices-and-structure.md" },
  ],
};
