import type { WikiArticle } from "../types";

export const kroneckerProduct: WikiArticle = {
  conceptId: "kronecker-product",
  summary:
    "The Kronecker product $\\mathbf{A}\\otimes \\mathbf{B}$ builds one big matrix out of two smaller ones by replacing every entry of $\\mathbf{A}$ with that entry times an entire copy of $\\mathbf{B}$. It looks like a bookkeeping trick, but it is the standard way to encode a *separable* structure — one factor governing one “axis” of a problem and the other factor governing another — and it turns matrix equations into ordinary linear systems via vectorization.",
  sections: [
    {
      heading: "The definition, as a block matrix",
      blocks: [
        {
          kind: "formula",
          latex:
            "A \\otimes B = \\begin{bmatrix} a_{11}B & a_{12}B & \\cdots & a_{1n}B \\\\ a_{21}B & a_{22}B & \\cdots & a_{2n}B \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1}B & a_{m2}B & \\cdots & a_{mn}B \\end{bmatrix}",
          caption: "Every entry $a_{ij}$ of $\\mathbf{A}$ is replaced by the block $a_{ij}\\mathbf{B}$",
        },
        {
          kind: "prose",
          text: "For $\\mathbf{A}$ of size $m\\times n$ and $\\mathbf{B}$ of size $p\\times q$, the result $\\mathbf{A}\\otimes \\mathbf{B}$ has size $(mp)\\times(nq)$: there are $mn$ blocks arranged in an $m\\times n$ grid, and each block is itself $p\\times q$. The size formula is not a separate rule to memorize — it falls straight out of block-counting.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A special case you already know",
          text: "When $\\mathbf{A}$ is $m\\times 1$ and $\\mathbf{B}$ is $1\\times n$, $\\mathbf{A}\\otimes \\mathbf{B}$ is exactly the ordinary outer product $\\mathbf{A} \\mathbf{B}^{\\top}$-style construction: a column times a row. The Kronecker product generalizes the outer product from vectors to matrices.",
        },
      ],
    },
    {
      heading: "The mixed-product property",
      blocks: [
        {
          kind: "formula",
          latex: "(\\mathbf{A}\\otimes \\mathbf{B})(\\mathbf{C}\\otimes \\mathbf{D}) = (\\mathbf{A}\\mathbf{C})\\otimes(\\mathbf{B}\\mathbf{D})",
          caption: "Valid whenever the ordinary products $\\mathbf{A}\\mathbf{C}$ and $\\mathbf{B}\\mathbf{D}$ are defined",
        },
        {
          kind: "prose",
          text: "This single identity is why the Kronecker product is useful rather than just decorative. Because each block of $\\mathbf{A}\\otimes \\mathbf{B}$ is $a_{ij}\\mathbf{B}$, multiplying two Kronecker-structured matrices lets the $\\mathbf{A}$-part and $\\mathbf{B}$-part combine completely independently — the $\\mathbf{A}$'s multiply together, the $\\mathbf{B}$'s multiply together, and the results Kronecker back together. Everything else about the Kronecker product follows from this one fact.",
        },
        {
          kind: "table",
          headers: ["Identity", "Derived from"],
          rows: [
            ["$(\\mathbf{A}\\otimes \\mathbf{B})^{\\top} = \\mathbf{A}^{\\top}\\otimes \\mathbf{B}^{\\top}$", "block transpose"],
            [
              "$(\\mathbf{A}\\otimes \\mathbf{B})^{-1} = \\mathbf{A}^{-1}\\otimes \\mathbf{B}^{-1}$ (both invertible)",
              "mixed-product: $(\\mathbf{A}\\otimes \\mathbf{B})(\\mathbf{A}^{-1}\\otimes \\mathbf{B}^{-1}) = I\\otimes I = I$",
            ],
            ["$\\operatorname{tr}(\\mathbf{A}\\otimes \\mathbf{B}) = \\operatorname{tr}(\\mathbf{A})\\operatorname{tr}(\\mathbf{B})$", "diagonal blocks are $a_{ii}\\mathbf{B}$"],
            [
              "$\\det(\\mathbf{A}\\otimes \\mathbf{B}) = \\det(\\mathbf{A})^p \\det(\\mathbf{B})^n$ for $\\mathbf{A}$ $n\\times n$, $\\mathbf{B}$ $p\\times p$",
              "eigenvalues of $\\mathbf{A}\\otimes \\mathbf{B}$ are all products $\\lambda_i(\\mathbf{A})\\mu_j(\\mathbf{B})$",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Not commutative",
          text: "$\\mathbf{A}\\otimes \\mathbf{B} \\ne \\mathbf{B}\\otimes \\mathbf{A}$ in general, even when both sides have the same overall shape. They are related by a fixed permutation of rows and columns (the “commutation matrix”), but they are not equal as matrices — the same non-commutativity that shows up in ordinary matrix multiplication shows up here too.",
        },
      ],
    },
    {
      heading: "Vectorization: turning a matrix equation into a linear system",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{vec}(\\mathbf{A}\\mathbf{X}\\mathbf{B}) = (\\mathbf{B}^{\\top}\\otimes \\mathbf{A})\\,\\operatorname{vec}(\\mathbf{X})",
          caption: "$\\operatorname{vec}(\\cdot)$ stacks a matrix's columns into one long vector",
        },
        {
          kind: "prose",
          text: "The equation $\\mathbf{A}\\mathbf{X}\\mathbf{B} = \\mathbf{C}$ is not of the form “matrix times unknown vector,” so none of the standard tools for solving $\\mathbf{A}\\mathbf{x}=\\mathbf{b}$ apply directly — the unknown $\\mathbf{X}$ is sandwiched between two matrices. Vectorizing both sides turns it into $(\\mathbf{B}^{\\top}\\otimes \\mathbf{A})\\operatorname{vec}(\\mathbf{X}) = \\operatorname{vec}(\\mathbf{C})$, an entirely ordinary linear system in the flattened unknown $\\operatorname{vec}(\\mathbf{X})$, solvable by any method that works for $\\mathbf{A}\\mathbf{x}=\\mathbf{b}$.",
        },
        {
          kind: "example",
          title: "Vectorizing a $2 \\times 2$ equation",
          problem:
            "$\\mathbf{A} = \\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}$, $\\mathbf{X}=\\begin{bmatrix}1&0\\\\2&1\\end{bmatrix}$, $\\mathbf{B}=\\begin{bmatrix}1&1\\\\0&2\\end{bmatrix}$. Verify $\\operatorname{vec}(\\mathbf{A}\\mathbf{X}\\mathbf{B}) = (\\mathbf{B}^{\\top}\\otimes \\mathbf{A})\\operatorname{vec}(\\mathbf{X})$.",
          steps: [
            "$\\mathbf{A}\\mathbf{X} = \\begin{bmatrix}5&2\\\\2&1\\end{bmatrix}$, so $\\mathbf{A}\\mathbf{X}\\mathbf{B} = \\begin{bmatrix}5&9\\\\2&4\\end{bmatrix}$.",
            "Column-stacking, $\\operatorname{vec}(\\mathbf{A}\\mathbf{X}\\mathbf{B}) = [5, 2, 9, 4]$.",
            "$\\mathbf{B}^{\\top}\\otimes \\mathbf{A}$ is a $4\\times4$ matrix built by replacing each entry of $\\mathbf{B}^{\\top}$ with that entry times $\\mathbf{A}$.",
            "Computing $(\\mathbf{B}^{\\top}\\otimes \\mathbf{A})\\operatorname{vec}(\\mathbf{X})$ with $\\operatorname{vec}(\\mathbf{X})=[1, 2, 0, 1]$ gives $[5, 2, 9, 4]$ — matches.",
          ],
          answer: "Both sides equal $[5, 2, 9, 4]$, confirming the identity on a concrete case.",
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
            "**Multivariate / multi-output regression.** A coefficient matrix modeled as $\\mathbf{B}_1\\otimes \\mathbf{B}_2$ needs only as many parameters as $\\mathbf{B}_1$ and $\\mathbf{B}_2$ combined, instead of their full product — at the cost of assuming feature effects and output effects factor independently.",
            "**Kronecker-structured covariance.** Multilevel and spatio-temporal models often assume the joint covariance across two indices (e.g. subject and timepoint) is $\\boldsymbol{\\Sigma}_{\\text{subject}}\\otimes\\boldsymbol{\\Sigma}_{\\text{time}}$. Because $(\\mathbf{A}\\otimes \\mathbf{B})^{-1}=\\mathbf{A}^{-1}\\otimes \\mathbf{B}^{-1}$, inverting this huge covariance reduces to inverting each small factor separately.",
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
    { source: "Van Loan, “The ubiquitous Kronecker product”", locator: "J. Comput. Appl. Math., 2000" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-02-matrices-and-structure.md" },
  ],
};
