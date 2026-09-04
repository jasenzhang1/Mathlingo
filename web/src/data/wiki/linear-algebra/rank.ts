import type { WikiArticle } from "../types";

export const rank: WikiArticle = {
  conceptId: "rank",
  summary:
    "The rank of a matrix is the number of independent directions it genuinely has — the dimension of its column space. It is simultaneously the row rank, which is a non-obvious theorem, and it is the single number governing solvability, invertibility, and how much a matrix can be compressed.",
  sections: [
    {
      heading: "Definitions that coincide",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{rank}(A) = \\dim C(A) = \\dim C(A^{\\top}) = \\#\\text{pivots}",
          caption: "Column rank, row rank, and pivot count are all the same number",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Row rank = column rank is genuinely surprising",
          text: "The column space lives in $\\mathbb{R}^{m}$ and the row space in $\\mathbb{R}^{n}$. They contain different vectors and sit in different ambient spaces, yet always have the same dimension. A short proof: writing $A = CR$ with $C$ holding a basis for the column space, the rows of $A$ are combinations of the rows of $R$ — so row rank $\\le$ column rank. Applying the same to $A^{\\top}$ gives the reverse inequality.",
        },
        {
          kind: "prose",
          text: "For an $m\\times n$ matrix, $\\operatorname{rank}(A) \\le \\min(m,n)$. A matrix attaining that bound has *full rank*; anything less is rank-deficient, meaning some directions are redundant.",
        },
      ],
    },
    {
      heading: "What rank determines",
      blocks: [
        {
          kind: "table",
          headers: ["Condition", "Consequence for $A\\mathbf{x}=\\mathbf{b}$"],
          rows: [
            [
              "full column rank ($r = n$)",
              "$N(A)=\\{\\mathbf{0}\\}$ — at most one solution",
            ],
            [
              "full row rank ($r = m$)",
              "$C(A)=\\mathbb{R}^{m}$ — at least one solution, for every $\\mathbf{b}$",
            ],
            [
              "both, so $A$ is square and $r=n=m$",
              "invertible: exactly one solution always",
            ],
            [
              "$r < n$",
              "infinitely many solutions when any exists",
            ],
            [
              "$r < m$",
              "some $\\mathbf{b}$ have no solution — least squares territory",
            ],
          ],
        },
        {
          kind: "formula",
          latex: "\\operatorname{rank}(A) + \\dim N(A) = n",
          caption: "Rank–nullity: every input dimension either survives or is destroyed",
        },
      ],
    },
    {
      heading: "Rank as compressibility",
      blocks: [
        {
          kind: "formula",
          latex: "A = \\sum_{k=1}^{r} \\sigma_k \\mathbf{u}_k\\mathbf{v}_k^{\\top}",
          caption: "A rank-$r$ matrix is a sum of exactly $r$ rank-one pieces",
        },
        {
          kind: "prose",
          text: "Storing a rank-$r$ $m\\times n$ matrix needs $r(m+n)$ numbers rather than $mn$. For a $1000\\times1000$ matrix of rank 10 that is 20,000 numbers instead of a million — a fiftyfold saving, exactly. This is the basis of low-rank approximation: truncating the SVD after $k$ terms gives the best possible rank-$k$ approximation in both the Frobenius and spectral norms, which is the Eckart–Young theorem.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Numerical rank is a threshold, not a count",
          text: "In floating point, singular values that should be zero come out around $10^{-16}$, so counting non-zero ones gives full rank for every matrix. The practical definition is the number of singular values above a tolerance — and matrices with a gradual decay have no clean answer. This is why \"the rank\" of a real data matrix is a modelling choice, and why scree plots and explained-variance thresholds exist in PCA.",
        },
        {
          kind: "example",
          title: "Reading rank off structure",
          problem:
            "What is the rank of $A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 1 & 1 & 1\\end{bmatrix}$?",
          steps: [
            "Row 2 is $2\\times$ row 1, so it contributes nothing.",
            "Rows 1 and 3 are not multiples of one another, so both count.",
            "Rank is 2 — the third row is where the second independent direction comes from.",
            "By rank–nullity, $\\dim N(A) = 3 - 2 = 1$, so the matrix is singular and $\\det A = 0$.",
          ],
          answer: "$\\operatorname{rank}(A) = 2$.",
        },
      ],
    },
    {
      heading: "Useful inequalities",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "$\\operatorname{rank}(AB) \\le \\min\\{\\operatorname{rank}(A),\\ \\operatorname{rank}(B)\\}$ — multiplying can never create new independent directions.",
            "$\\operatorname{rank}(A+B) \\le \\operatorname{rank}(A) + \\operatorname{rank}(B)$.",
            "$\\operatorname{rank}(A^{\\top}A) = \\operatorname{rank}(A)$ — which is why the normal equations are solvable exactly when the columns are independent.",
            "A rank-one matrix is precisely an outer product $\\mathbf{u}\\mathbf{v}^{\\top}$.",
          ],
        },
        {
          kind: "prose",
          text: "The first inequality explains the bottleneck in a low-rank layer: a neural network layer factored as $W = UV$ with a narrow middle dimension can have rank no larger than that dimension, whatever the surrounding sizes. That is the design principle behind LoRA and other low-rank adaptation methods.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§3.3, §7.1" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lecture 4–5" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-05-rank-and-orthogonalization.md" },
  ],
};
