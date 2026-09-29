import type { WikiArticle } from "./types";

export const graphicalLassoWiki: WikiArticle = {
  conceptId: "graphical-lasso",
  summary:
    "The graphical lasso estimates a sparse precision matrix by maximising the Gaussian log-likelihood with an " +
    "$\\ell_1$ penalty on the entries of $\\Theta$. Because $\\Theta_{ij} = 0$ means $X_i \\perp X_j$ given everything " +
    "else, every zero the penalty produces is a missing edge — so one convex optimisation returns both a " +
    "well-conditioned estimate of $\\Theta$ and the conditional-independence graph, and it works even when there " +
    "are more variables than observations.",
  sections: [
    {
      heading: "The objective",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\Theta} = \\arg\\max_{\\Theta \\succ 0}\\; \\log\\det\\Theta - \\operatorname{tr}(S\\Theta) - \\lambda \\sum_{i \\ne j} |\\Theta_{ij}|",
          caption: "Gaussian log-likelihood (up to constants and a factor of $n/2$) minus an $\\ell_1$ penalty",
        },
        {
          kind: "list",
          items: [
            "$\\log\\det\\Theta - \\operatorname{tr}(S\\Theta)$ is the profile log-likelihood of a centred Gaussian sample with sample covariance $S$. Without the penalty it is maximised at $\\Theta = S^{-1}$.",
            "The penalty is the lasso's: an $\\ell_1$ norm has corners at zero, so for large enough $\\lambda$ many $\\hat{\\Theta}_{ij}$ are exactly $0$, not merely small.",
            "The problem is convex — $\\log\\det$ is concave on positive-definite matrices, the trace is linear, the penalty is convex — so there is one global optimum and no bad local ones.",
            "The diagonal is usually left unpenalised: shrinking $\\Theta_{ii}$ would bias the conditional variances without adding any sparsity to the graph.",
          ],
        },
      ],
    },
    {
      heading: "Why it works when $p > n$",
      blocks: [
        {
          kind: "prose",
          text: "With more variables than observations, $S$ has rank at most $n - 1 < p$ and cannot be inverted, so the unpenalised maximum likelihood estimate does not exist — the likelihood increases without bound. Any $\\lambda > 0$ restores a unique, positive-definite maximiser. The penalty is doing the job a prior does: it encodes the belief that most pairs of variables are not directly connected.",
        },
      ],
    },
    {
      heading: "Choosing $\\lambda$",
      blocks: [
        {
          kind: "table",
          headers: ["$\\lambda$", "Graph", "Risk"],
          rows: [
            ["$\\to 0$", "dense — every edge present", "noise read as structure; unstable when $p$ is near $n$"],
            ["moderate", "sparse", "the useful regime"],
            ["large", "empty — only the diagonal survives", "real edges shrunk away"],
          ],
          caption: "Beyond a threshold ($\\lambda \\ge \\max_{i \\ne j} |S_{ij}|$) the estimate is diagonal and the graph is empty",
        },
        {
          kind: "prose",
          text: "In practice $\\lambda$ is chosen by cross-validated likelihood (good for estimating $\\Theta$ but tends to pick too many edges), by an information criterion such as extended BIC (better for recovering the graph), or by stability selection — refit on many subsamples and keep only edges that appear in most of them.",
        },
      ],
    },
    {
      heading: "How it is solved",
      blocks: [
        {
          kind: "prose",
          text: "Friedman, Hastie and Tibshirani's algorithm cycles through the columns of $W = \\hat{\\Sigma}$. Holding the other columns fixed, the update for one column is exactly a lasso regression of that variable on the rest, solved by coordinate descent. The graphical lasso is therefore neighbourhood selection made joint and consistent: the $p$ lasso problems share one matrix, so the answer is symmetric and positive definite.",
        },
        {
          kind: "code",
          source:
            "import numpy as np\nfrom sklearn.covariance import GraphicalLassoCV\n\nmodel = GraphicalLassoCV().fit(X)   # X: n x p, columns standardised\nTheta = model.precision_\nedges = (abs(Theta) > 1e-8) & ~np.eye(X.shape[1], dtype=bool)",
          caption: "Standardise first: with an unscaled $S$, one $\\lambda$ penalises variables on different scales unequally",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "When is the graph empty?",
          problem:
            "Three standardised variables have sample correlations $S_{12} = 0.6$, $S_{13} = 0.1$, $S_{23} = 0.35$. For which $\\lambda$ does the graphical lasso return no edges, and which edge is the last to disappear as $\\lambda$ grows?",
          steps: [
            "The estimate is diagonal exactly when $\\lambda \\ge \\max_{i \\ne j}|S_{ij}|$.",
            "The largest off-diagonal is $|S_{12}| = 0.6$.",
          ],
          answer: "The graph is empty for $\\lambda \\ge 0.6$; the edge $1 - 2$ is the last to go.",
        },
      ],
    },
    {
      heading: "Caveats",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Sparse estimate, biased entries",
          text: "Like any lasso, the penalty shrinks the surviving non-zero entries toward zero, so the estimated partial correlations are biased downward. A common fix is to use the graphical lasso only to choose the graph and then refit $\\Theta$ by unpenalised maximum likelihood restricted to that edge set. And every guarantee rests on Gaussianity — heavy tails or non-linear dependence call for rank-based (nonparanormal) variants.",
        },
      ],
    },
  ],
  references: [
    { source: "Friedman, Hastie & Tibshirani, Sparse inverse covariance estimation with the graphical lasso (Biostatistics, 2008)", locator: "§2–3" },
    { source: "Hastie, Tibshirani & Wainwright, Statistical Learning with Sparsity", locator: "§9.3" },
    { source: "Yuan & Lin, Model selection and estimation in the Gaussian graphical model (Biometrika, 2007)", locator: "§2" },
  ],
};
