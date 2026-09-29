import type { WikiArticle } from "./types";

export const gaussianGraphicalModelsWiki: WikiArticle = {
  conceptId: "gaussian-graphical-models",
  summary:
    "A Gaussian graphical model is a Markov random field for a multivariate normal vector. Its graph has one node " +
    "per variable and an edge between $i$ and $j$ exactly when $\\Theta_{ij} \\ne 0$ — so every missing edge is a " +
    "conditional independence, and learning the graph is the same problem as finding which entries of the " +
    "precision matrix are zero.",
  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "X \\sim \\mathcal{N}(\\mu, \\Theta^{-1}), \\qquad E = \\{(i, j) : i \\ne j,\\ \\Theta_{ij} \\ne 0\\}",
          caption: "The edge set is the sparsity pattern of the precision matrix",
        },
        {
          kind: "prose",
          text: "Because the Gaussian density is $\\exp$ of a quadratic, it factorises into pairwise potentials $\\exp(-\\Theta_{ij} x_i x_j)$ over edges and unary potentials over nodes. This is a Markov random field whose cliques never need to be bigger than pairs, and the Hammersley–Clifford theorem guarantees the pairwise, local and global Markov properties all hold with respect to $G$.",
        },
      ],
    },
    {
      heading: "Reading independence off the graph",
      blocks: [
        {
          kind: "list",
          items: [
            "Pairwise Markov property: no edge between $i$ and $j$ $\\iff$ $X_i \\perp X_j \\mid X_{-\\{i,j\\}}$ — this is $\\Theta_{ij} = 0$ restated.",
            "Local Markov property: $X_i$ is independent of everything else given its neighbours $X_{N(i)}$. The regression of $X_i$ on all other variables has non-zero coefficients only on the neighbours.",
            "Global Markov property: if a set $S$ separates $A$ from $B$ in the graph (every path from $A$ to $B$ passes through $S$), then $X_A \\perp X_B \\mid X_S$.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Absent edge ≠ uncorrelated",
          text: "A GGM says nothing directly about marginal correlation. Two variables joined only through a path of other variables are typically correlated — the path carries the dependence — even though no edge joins them.",
        },
      ],
    },
    {
      heading: "Learning the graph",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Invert and threshold", description: "Estimate $\\hat{\\Theta} = S^{-1}$ and drop small entries. Workable only when $n \\gg p$; the threshold is arbitrary and $S^{-1}$ does not exist when $p > n$." },
            { term: "Neighbourhood selection", description: "Meinshausen–Bühlmann: lasso-regress each $X_i$ on all the others and draw an edge wherever a coefficient is non-zero. Fast and consistent, but the $p$ separate regressions can disagree about an edge ($i$ picks $j$ but $j$ doesn't pick $i$) and it does not return a valid $\\hat{\\Theta}$." },
            { term: "Graphical lasso", description: "Maximise the Gaussian likelihood of $\\Theta$ with an $\\ell_1$ penalty on its entries. One joint, symmetric, positive-definite estimate whose zeros are the graph — the next lesson." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Separation in a four-node graph",
          problem:
            "A GGM on $X_1, \\ldots, X_4$ has edges $1-2$, $2-3$, $3-4$ and $2-4$. Which entries of $\\Theta$ must be zero, and is $X_1 \\perp X_4 \\mid X_2$?",
          steps: [
            "The missing pairs are $(1,3)$ and $(1,4)$, so $\\Theta_{13} = \\Theta_{14} = 0$.",
            "Every path from $1$ to $4$ ($1-2-4$ and $1-2-3-4$) passes through node $2$, so $\\{2\\}$ separates $1$ from $4$.",
          ],
          answer: "$\\Theta_{13} = \\Theta_{14} = 0$, and yes — by the global Markov property $X_1 \\perp X_4 \\mid X_2$, even though that conditioning set leaves $X_3$ out.",
        },
      ],
    },
    {
      heading: "Where they are used",
      blocks: [
        {
          kind: "prose",
          text: "Gene co-expression networks (which genes regulate each other directly, rather than merely co-varying), functional brain connectivity from fMRI, and portfolio construction — where the precision matrix of asset returns appears directly in the minimum-variance weights $w \\propto \\Theta\\mathbf{1}$ and a sparse $\\Theta$ is both more stable and more interpretable than a noisy inverse of the sample covariance.",
        },
      ],
    },
  ],
  references: [
    { source: "Lauritzen, Graphical Models", locator: "Ch. 5" },
    { source: "Meinshausen & Bühlmann, High-dimensional graphs and variable selection with the lasso (Annals of Statistics, 2006)", locator: "§2" },
    { source: "Hastie, Tibshirani & Wainwright, Statistical Learning with Sparsity", locator: "§9.1" },
  ],
};
