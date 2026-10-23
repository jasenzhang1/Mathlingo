import type { WikiArticle } from "../types";

export const proximalGradientMethodWiki: WikiArticle = {
  conceptId: "proximal-gradient-method",

  summary:
    "Many objectives split as $F(\\mathbf{x}) = f(\\mathbf{x}) + g(\\mathbf{x})$, with $f$ smooth and $g$ convex but " +
    "nonsmooth and simple — an $\\ell_1$ penalty, or a constraint written as an indicator function. The proximal " +
    "gradient method takes a gradient step on $f$ and then applies the proximal operator of $g$, which is often a " +
    "closed-form formula such as soft-thresholding or projection. It converges as fast as gradient descent on a " +
    "smooth problem, and its accelerated version, FISTA, as fast as Nesterov's method.",

  sections: [
    {
      heading: "The proximal operator",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{prox}_{tg}(\\mathbf{v}) = \\arg\\min_{\\mathbf{x}}\\left( g(\\mathbf{x}) + \\frac{1}{2t}\\|\\mathbf{x} - \\mathbf{v}\\|^{2} \\right)",
          caption: "Find a point that makes $g$ small without straying far from $\\mathbf{v}$",
        },
        {
          kind: "table",
          headers: ["$g$", "$\\operatorname{prox}_{tg}(\\mathbf{v})$"],
          rows: [
            ["$0$", "$\\mathbf{v}$ (no change)"],
            ["$\\lambda\\|\\mathbf{x}\\|_1$", "Soft-thresholding: $\\operatorname{sign}(v_i)\\max(|v_i| - t\\lambda, 0)$ componentwise"],
            ["Indicator of a convex set $C$ ($0$ on $C$, $+\\infty$ off it)", "Projection onto $C$, e.g. clipping to a box"],
            ["$\\frac{\\lambda}{2}\\|\\mathbf{x}\\|^{2}$", "$\\frac{\\mathbf{v}}{1 + t\\lambda}$ (shrinkage)"],
            ["$\\lambda\\|\\mathbf{x}\\|_2$", "Block soft-thresholding: $\\left(1 - \\frac{t\\lambda}{\\|\\mathbf{v}\\|}\\right)_{+}\\mathbf{v}$ (group lasso)"],
          ],
        },
        {
          kind: "prose",
          text:
            "The prox is always well defined for convex $g$ (the objective is strongly convex), and it generalises both " +
            "the gradient step and the projection. Its fixed points are exactly the minimisers of $g$.",
        },
      ],
    },

    {
      heading: "ISTA and FISTA",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{x}_{k+1} = \\operatorname{prox}_{tg}\\big(\\mathbf{x}_k - t\\nabla f(\\mathbf{x}_k)\\big)",
          caption: "Proximal gradient (ISTA when $g$ is an $\\ell_1$ penalty), with step $t \\le \\frac{1}{L}$",
        },
        {
          kind: "prose",
          text:
            "With $t = \\frac{1}{L}$ the method converges at rate $O\\!\\left(\\frac{1}{k}\\right)$ on $F$ — the smooth rate, despite " +
            "the nonsmooth $g$ — and linearly if $f$ is strongly convex. Special cases: $g = 0$ gives gradient descent; " +
            "$g$ an indicator gives **projected gradient descent**; $f = 0$ gives the proximal point method.",
        },
        {
          kind: "formula",
          latex: "\\mathbf{y}_k = \\mathbf{x}_k + \\frac{k - 1}{k + 2}(\\mathbf{x}_k - \\mathbf{x}_{k-1}), \\qquad \\mathbf{x}_{k+1} = \\operatorname{prox}_{tg}\\big(\\mathbf{y}_k - t\\nabla f(\\mathbf{y}_k)\\big)",
          caption: "FISTA: Nesterov extrapolation before the proximal gradient step, giving $O\\!\\left(\\frac{1}{k^{2}}\\right)$",
        },
        {
          kind: "example",
          title: "A one-dimensional lasso",
          problem: "Minimise $F(x) = \\frac{1}{2}(x - 3)^{2} + |x|$ by proximal gradient with $t = 0.5$ from $x_0 = 0$.",
          steps: [
            "Gradient step: $x - t(x - 3)$. Prox: soft-threshold by $t\\lambda = 0.5$.",
            "$k = 0$: $0 + 1.5 = 1.5 \\to S_{0.5}(1.5) = 1.0$.",
            "$k = 1$: $1 + 1 = 2 \\to 1.5$. $k = 2$: $1.5 + 0.75 = 2.25 \\to 1.75$.",
          ],
          answer: "The iterates $1, 1.5, 1.75, \\ldots$ approach $x^{*} = 2$ (the soft-threshold of $3$ by $1$), halving the error each step.",
        },
      ],
    },

    {
      heading: "Practical notes",
      blocks: [
        {
          kind: "list",
          items: [
            "When $L$ is unknown, backtrack: shrink $t$ until $f(\\mathbf{x}^{+}) \\le f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^{\\top}(\\mathbf{x}^{+} - \\mathbf{x}) + \\frac{1}{2t}\\|\\mathbf{x}^{+} - \\mathbf{x}\\|^{2}$.",
            "The gradient mapping $\\frac{1}{t}(\\mathbf{x} - \\mathbf{x}^{+})$ plays the role of the gradient in stopping tests.",
            "Each iteration costs one gradient of $f$ plus one prox — for the lasso, a matrix–vector product with $X$ and $X^{\\top}$ and a componentwise threshold.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Sparsity comes from the prox",
          text:
            "Subgradient methods on the lasso essentially never produce exact zeros; proximal methods do, because " +
            "soft-thresholding sets small components to exactly $0$. That is one reason proximal methods dominate for " +
            "sparse estimation.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The prox must be cheap",
          text:
            "Proximal gradient is only attractive when $\\operatorname{prox}_g$ is easy. For a penalty like $\\|D\\mathbf{x}\\|_1$ " +
            "(total variation), the prox is itself a hard problem; splitting methods such as ADMM introduce a new " +
            "variable $\\mathbf{z} = D\\mathbf{x}$ to restore a simple prox.",
        },
      ],
    },
  ],

  references: [
    { source: "Beck, First-Order Methods in Optimization", locator: "Ch. 6, The Proximal Operator; Ch. 10, The Proximal Gradient Method" },
    { source: "Parikh & Boyd, Proximal Algorithms (Foundations and Trends in Optimization, 2014)", locator: "Ch. 4, Proximal algorithms; Ch. 6, Evaluating proximal operators" },
  ],
};
