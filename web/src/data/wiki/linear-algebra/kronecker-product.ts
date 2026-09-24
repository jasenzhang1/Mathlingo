import type { WikiArticle } from "../types";

export const kroneckerProduct: WikiArticle = {
  conceptId: "kronecker-product",
  summary:
    "The Kronecker product $A\\otimes B$ builds one big matrix out of two smaller ones by replacing every entry of $A$ with that entry times an entire copy of $B$. It looks like a bookkeeping trick, but it is the standard way to encode a *separable* structure — one factor governing one \"axis\" of a problem and the other factor governing another — and it turns matrix equations into ordinary linear systems via vectorization.",
  sections: [
    {
      heading: "The definition, as a block matrix",
      blocks: [
        {
          kind: "formula",
          latex:
            "A \\otimes B = \\begin{bmatrix} a_{11}B & a_{12}B & \\cdots & a_{1n}B \\\\ a_{21}B & a_{22}B & \\cdots & a_{2n}B \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1}B & a_{m2}B & \\cdots & a_{mn}B \\end{bmatrix}",
          caption: "Every entry $a_{ij}$ of $A$ is replaced by the block $a_{ij}B$",
        },
        {
          kind: "prose",
          text: "For $A$ of size $m\\times n$ and $B$ of size $p\\times q$, the result $A\\otimes B$ has size $(mp)\\times(nq)$: there are $mn$ blocks arranged in an $m\\times n$ grid, and each block is itself $p\\times q$. The size formula is not a separate rule to memorize — it falls straight out of block-counting.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A special case you already know",
          text: "When $A$ is $m\\times 1$ and $B$ is $1\\times n$, $A\\otimes B$ is exactly the ordinary outer product $A B^{\\top}$-style construction: a column times a row. The Kronecker product generalizes the outer product from vectors to matrices.",
        },
      ],
    },
    {
      heading: "The mixed-product property",
      blocks: [
        {
          kind: "formula",
          latex: "(A\\otimes B)(C\\otimes D) = (AC)\\otimes(BD)",
          caption: "Valid whenever the ordinary products $AC$ and $BD$ are defined",
        },
        {
          kind: "prose",
          text: "This single identity is why the Kronecker product is useful rather than just decorative. Because each block of $A\\otimes B$ is $a_{ij}B$, multiplying two Kronecker-structured matrices lets the $A$-part and $B$-part combine completely independently — the $A$'s multiply together, the $B$'s multiply together, and the results Kronecker back together. Everything else about the Kronecker product follows from this one fact.",
        },
        {
          kind: "table",
          headers: ["Identity", "Derived from"],
          rows: [
            ["$(A\\otimes B)^{\\top} = A^{\\top}\\otimes B^{\\top}$", "block transpose"],
            [
              "$(A\\otimes B)^{-1} = A^{-1}\\otimes B^{-1}$ (both invertible)",
              "mixed-product: $(A\\otimes B)(A^{-1}\\otimes B^{-1}) = I\\otimes I = I$",
            ],
            ["$\\operatorname{tr}(A\\otimes B) = \\operatorname{tr}(A)\\operatorname{tr}(B)$", "diagonal blocks are $a_{ii}B$"],
            [
              "$\\det(A\\otimes B) = \\det(A)^p \\det(B)^n$ for $A$ $n\\times n$, $B$ $p\\times p$",
              "eigenvalues of $A\\otimes B$ are all products $\\lambda_i(A)\\mu_j(B)$",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Not commutative",
          text: "$A\\otimes B \\ne B\\otimes A$ in general, even when both sides have the same overall shape. They are related by a fixed permutation of rows and columns (the \"commutation matrix\"), but they are not equal as matrices — the same non-commutativity that shows up in ordinary matrix multiplication shows up here too.",
        },
      ],
    },
    {
      heading: "Vectorization: turning a matrix equation into a linear system",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{vec}(AXB) = (B^{\\top}\\otimes A)\\,\\operatorname{vec}(X)",
          caption: "$\\operatorname{vec}(\\cdot)$ stacks a matrix's columns into one long vector",
        },
        {
          kind: "prose",
          text: "The equation $AXB = C$ is not of the form \"matrix times unknown vector,\" so none of the standard tools for solving $A\\mathbf{x}=\\mathbf{b}$ apply directly — the unknown $X$ is sandwiched between two matrices. Vectorizing both sides turns it into $(B^{\\top}\\otimes A)\\operatorname{vec}(X) = \\operatorname{vec}(C)$, an entirely ordinary linear system in the flattened unknown $\\operatorname{vec}(X)$, solvable by any method that works for $A\\mathbf{x}=\\mathbf{b}$.",
        },
        {
          kind: "example",
          title: "Vectorizing a 2×2 equation",
          problem:
            "$A = \\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}$, $X=\\begin{bmatrix}1&0\\\\2&1\\end{bmatrix}$, $B=\\begin{bmatrix}1&1\\\\0&2\\end{bmatrix}$. Verify $\\operatorname{vec}(AXB) = (B^{\\top}\\otimes A)\\operatorname{vec}(X)$.",
          steps: [
            "$AX = \\begin{bmatrix}5&2\\\\2&1\\end{bmatrix}$, so $AXB = \\begin{bmatrix}5&9\\\\2&4\\end{bmatrix}$.",
            "Column-stacking, $\\operatorname{vec}(AXB) = (5,2,9,4)$.",
            "$B^{\\top}\\otimes A$ is a $4\\times4$ matrix built by replacing each entry of $B^{\\top}$ with that entry times $A$.",
            "Computing $(B^{\\top}\\otimes A)\\operatorname{vec}(X)$ with $\\operatorname{vec}(X)=(1,2,0,1)$ gives $(5,2,9,4)$ — matches.",
          ],
          answer: "Both sides equal $(5,2,9,4)$, confirming the identity on a concrete case.",
        },
      ],
    },
    {
      heading: "Where separable structure shows up",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Multivariate / multi-output regression.** A coefficient matrix modeled as $B_1\\otimes B_2$ needs only as many parameters as $B_1$ and $B_2$ combined, instead of their full product — at the cost of assuming feature effects and output effects factor independently.",
            "**Kronecker-structured covariance.** Multilevel and spatio-temporal models often assume the joint covariance across two indices (e.g. subject and timepoint) is $\\Sigma_{\\text{subject}}\\otimes\\Sigma_{\\text{time}}$. Because $(A\\otimes B)^{-1}=A^{-1}\\otimes B^{-1}$, inverting this huge covariance reduces to inverting each small factor separately.",
            "**Deep learning layers.** Kronecker-factored weight matrices $W = W_1\\otimes W_2$ store far fewer parameters than a dense matrix of the same size, and the vectorization identity gives a way to apply $W$ to an input without ever forming the full $(mp)\\times(nq)$ matrix.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Separability is the recurring idea",
          text: "Every use of the Kronecker product trades a fully general (and much larger) object for the product of two smaller, structured ones. That trade is only valid when the underlying problem really does factor along two independent axes — the parameter and computational savings are the reward for that assumption holding.",
        },
      ],
    },
  ],
  references: [
    { source: "Horn & Johnson, Topics in Matrix Analysis", locator: "Ch. 4" },
    { source: "Petersen & Pedersen, The Matrix Cookbook", locator: "§10" },
    { source: "Van Loan, \"The ubiquitous Kronecker product\"", locator: "J. Comput. Appl. Math., 2000" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-02-matrices-and-structure.md" },
  ],
};
