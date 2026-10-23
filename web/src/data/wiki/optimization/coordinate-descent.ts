import type { WikiArticle } from "../types";

export const coordinateDescentWiki: WikiArticle = {
  conceptId: "coordinate-descent",

  summary:
    "Coordinate descent minimises a function of many variables by updating one coordinate (or block of coordinates) " +
    "at a time, holding the others fixed. Each update is a one-dimensional problem, often solvable in closed form. " +
    "For problems with cheap coordinate updates — least squares, the lasso, support vector machines — it is among " +
    "the fastest methods available, and it underlies software such as `glmnet` and `liblinear`.",

  sections: [
    {
      heading: "The method",
      blocks: [
        {
          kind: "formula",
          latex: "x_i^{(k+1)} = \\arg\\min_{t}\\; f\\big(x_1^{(k+1)}, \\ldots, x_{i-1}^{(k+1)},\\, t,\\, x_{i+1}^{(k)}, \\ldots, x_n^{(k)}\\big)",
          caption: "Cyclic (Gauss–Seidel) order: each update uses the newest values of the other coordinates",
        },
        {
          kind: "prose",
          text:
            "Variants choose the coordinate cyclically, uniformly at random, or greedily (the largest gradient " +
            "component, the Gauss–Southwell rule), and either minimise exactly or take a gradient step " +
            "$x_i \\leftarrow x_i - \\frac{1}{L_i}\\partial_i f$, where $L_i$ is the coordinate-wise Lipschitz constant. For a " +
            "positive definite quadratic, exact cyclic coordinate descent is the Gauss–Seidel iteration for $A\\mathbf{x} = \\mathbf{b}$.",
        },
        {
          kind: "example",
          title: "Two variables",
          problem: "Minimise $f(x, y) = x^{2} + xy + y^{2} - 3x$ by exact coordinate descent from $(0, 0)$.",
          steps: [
            "Setting $\\partial_x f = 2x + y - 3 = 0$ gives $x = \\frac{3 - y}{2}$; setting $\\partial_y f = x + 2y = 0$ gives $y = -\\frac{x}{2}$.",
            "Sweep 1: $x = 1.5$, then $y = -0.75$.",
            "Sweep 2: $x = 1.875$, then $y = -0.9375$. Sweep 3: $x = 1.96875$, $y = -0.984375$.",
          ],
          answer: "The iterates approach the minimiser $(2, -1)$, with the error shrinking by a factor of $4$ per sweep.",
        },
      ],
    },

    {
      heading: "Coordinate descent for the lasso",
      blocks: [
        {
          kind: "formula",
          latex: "\\beta_j \\leftarrow \\frac{S_{\\lambda}\\!\\left(\\mathbf{x}_j^{\\top}\\mathbf{r}^{(j)}\\right)}{\\|\\mathbf{x}_j\\|^{2}}, \\qquad S_{\\lambda}(z) = \\operatorname{sign}(z)\\max(|z| - \\lambda, 0)",
          caption: "For $\\min \\frac{1}{2}\\|\\mathbf{y} - X\\boldsymbol{\\beta}\\|^{2} + \\lambda\\|\\boldsymbol{\\beta}\\|_1$, with $\\mathbf{r}^{(j)}$ the residual excluding feature $j$",
        },
        {
          kind: "prose",
          text:
            "The nonsmooth $\\ell_1$ penalty is separable — a sum of functions of single coordinates — so each " +
            "one-dimensional problem is solved exactly by soft-thresholding. Updating the residual after each change " +
            "keeps every update cheap, and with warm starts along a decreasing sequence of $\\lambda$ values the whole " +
            "regularisation path costs little more than a single fit.",
        },
      ],
    },

    {
      heading: "When it works, and when it doesn't",
      blocks: [
        {
          kind: "list",
          items: [
            "For smooth convex $f$, randomised coordinate descent converges at a rate governed by the coordinate-wise constants $L_i$, which can be far smaller than the global $L$ — so it can beat full gradient descent.",
            "For $f(\\mathbf{x}) = g(\\mathbf{x}) + \\sum_i h_i(x_i)$ with $g$ smooth and each $h_i$ convex (separable nonsmooth part), it converges to a global minimiser.",
            "It is a poor choice when coordinates are strongly coupled (a highly correlated design), since each step can only move along an axis.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Nonsmooth, non-separable terms can trap it",
          text:
            "Take $f(x, y) = |x - y| - \\frac{1}{2}(x + y)$. At any point with $x = y$, moving one coordinate by $t$ " +
            "changes $f$ by $|t| - \\frac{t}{2} \\ge 0$, so no single-coordinate move helps — yet moving both together " +
            "along the diagonal lowers $f$ without limit. In general, if the nonsmooth part couples coordinates, coordinate " +
            "descent can stop at a non-stationary point. Separable nonsmooth terms, like the lasso penalty, are safe.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Blocks and alternating minimisation",
          text:
            "Updating whole blocks of variables at a time gives block coordinate descent, of which alternating least " +
            "squares (for matrix factorisation) and the EM algorithm are relatives. ADMM, at the end of this chapter, is " +
            "a block method applied to an augmented Lagrangian.",
        },
      ],
    },
  ],

  references: [
    { source: "Wright, Coordinate Descent Algorithms (Mathematical Programming, 2015)", locator: "§§2–4" },
    { source: "Hastie, Tibshirani & Wainwright, Statistical Learning with Sparsity", locator: "§5.4, Coordinate descent" },
    { source: "Beck, First-Order Methods in Optimization", locator: "Ch. 11, The Block Proximal Gradient Method; Ch. 14, Alternating Minimization" },
  ],
};
