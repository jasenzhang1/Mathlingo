import type { WikiArticle } from "../types";

export const pathSignaturesWiki: WikiArticle = {
  conceptId: "path-signatures",

  summary:
    "The signature of a path $\\mathbf{X} : [a, b] \\to \\mathbb{R}^{d}$ is the infinite sequence of its iterated integrals. Level one is the " +
    "total increment of each coordinate; level two contains the signed areas between pairs of coordinates; higher levels record ever finer " +
    "information about the order in which things happened. The signature comes from rough path theory (Chen, Lyons), where it describes how a " +
    "path drives a differential equation, and in data science it is a universal, model-free feature map for sequential data: up to a " +
    "harmless equivalence it determines the path, it ignores how fast the path was traversed, and linear functions of it can approximate any " +
    "continuous function of the path.",

  sections: [
    {
      heading: "Iterated integrals",
      blocks: [
        {
          kind: "formula",
          latex: "S(\\mathbf{X})^{i_1 \\cdots i_k}_{a,b} = \\int_{a < t_1 < \\cdots < t_k < b} dX^{i_1}_{t_1} \\cdots dX^{i_k}_{t_k}",
          caption: "The level-$k$ term for the word $(i_1, \\ldots, i_k)$, with each $i_j \\in \\lbrace 1, \\ldots, d \\rbrace$",
        },
        {
          kind: "formula",
          latex: "S(\\mathbf{X}) = \\left( 1,\\; S^{1}, \\ldots, S^{d},\\; S^{1,1}, S^{1,2}, \\ldots, S^{d,d},\\; S^{1,1,1}, \\ldots \\right)",
          caption: "Level $k$ has $d^{k}$ terms; truncating at level $M$ leaves $\\sum_{k=1}^{M} d^{k}$ features",
        },
        {
          kind: "list",
          items: [
            "Level 1: $S^{i} = X^{i}_b - X^{i}_a$, the increment.",
            "Diagonal level 2: $S^{i,i} = \\frac{1}{2}\\left( X^{i}_b - X^{i}_a \\right)^{2}$.",
            "Shuffle identity: $S^{i,j} + S^{j,i} = S^{i} S^{j}$, so the symmetric part of level 2 is already known from level 1.",
            "Lévy area: $A^{i,j} = \\frac{1}{2}\\left( S^{i,j} - S^{j,i} \\right)$, the signed area between the path and its chord — the genuinely new level-2 information.",
          ],
        },
      ],
    },

    {
      heading: "Computing signatures of piecewise linear paths",
      blocks: [
        {
          kind: "prose",
          text:
            "For one straight segment with increment $\\mathbf{v}$ every iterated integral is a simple product: $S^{i_1 \\cdots i_k} = \\frac{v_{i_1} \\cdots v_{i_k}}{k!}$ " +
            "(the tensor exponential of $\\mathbf{v}$). Longer paths are handled by Chen's identity: the signature of a concatenation is the tensor product of the signatures.",
        },
        {
          kind: "formula",
          latex: "S(\\mathbf{X} * \\mathbf{Y})^{i,j} = S(\\mathbf{X})^{i,j} + S(\\mathbf{Y})^{i,j} + S(\\mathbf{X})^{i}\\,S(\\mathbf{Y})^{j}",
          caption: "Chen's identity at level 2: the cross term is “first path's $i$-increment, then second path's $j$-increment”",
        },
        {
          kind: "example",
          title: "Right-then-up versus up-then-right",
          problem: "Compute the level-2 signature of $(0, 0) \\to (1, 0) \\to (1, 1)$ and compare with $(0, 0) \\to (0, 1) \\to (1, 1)$.",
          steps: [
            "Segments $\\mathbf{v} = [1, 0]$ then $\\mathbf{w} = [0, 1]$. Level 1: $S^{1} = S^{2} = 1$ for both paths.",
            "$S^{1,1} = \\frac{1}{2} + 0 = \\frac{1}{2}$ and $S^{2,2} = 0 + \\frac{1}{2} = \\frac{1}{2}$.",
            "$S^{1,2} = 0 + 0 + v_1 w_2 = 1$ and $S^{2,1} = 0 + 0 + v_2 w_1 = 0$, so the Lévy area is $\\frac{1}{2}$.",
            "For up-then-right the roles swap: $S^{1,2} = 0$, $S^{2,1} = 1$, Lévy area $-\\frac{1}{2}$.",
          ],
          answer: "Same endpoints and same level 1, but opposite Lévy areas: level 2 records which coordinate moved first.",
        },
      ],
    },

    {
      heading: "Why it is a good feature map",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Statement", "Practical meaning"],
          rows: [
            ["Reparametrisation invariance", "$S(\\mathbf{X} \\circ \\phi) = S(\\mathbf{X})$ for increasing $\\phi$", "Robust to irregular sampling and different speeds"],
            ["Uniqueness", "Determines the path up to tree-like excursions", "Adding time as a coordinate makes it fully unique"],
            ["Universality", "Linear functionals $\\langle \\boldsymbol{\\ell}, S(\\mathbf{X}) \\rangle$ are dense in continuous functions on compact sets of paths", "A linear model on signatures can learn any reasonable target"],
            ["Factorial decay", "$|S^{(k)}| \\le \\frac{\\|\\mathbf{X}\\|_{1\\text{-var}}^{k}}{k!}$", "Low truncation levels carry most of the information"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Stochastic calculus link",
          text:
            "For Brownian motion the signature uses Stratonovich integrals, so the chain rule holds and $S^{i,i} = \\frac{1}{2}(\\Delta B^{i})^{2}$. " +
            "With Itô integrals it would be $\\frac{1}{2}\\left((\\Delta B^{i})^{2} - (b - a)\\right)$ — the quadratic-variation correction.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Feature explosion",
          text:
            "With $d = 10$ channels and $M = 4$ there are $10 + 100 + 1{,}000 + 10{,}000 = 11{,}110$ features. Keep $d$ small, use the log-signature " +
            "(which removes redundant products), or rely on a sparse model to select.",
        },
      ],
    },
  ],

  references: [
    { source: "Chevyrev, Kormilitzin, A Primer on the Signature Method in Machine Learning (2016)", locator: "§1, iterated integrals, Chen's identity and the shuffle product" },
    { source: "Lyons, Caruana, Lévy, Differential Equations Driven by Rough Paths", locator: "Ch. 2, the signature of a path" },
    { source: "Lyons, McLeod, Signature Methods in Machine Learning (2022)", locator: "§2, properties of the signature" },
  ],
};
