import type { WikiArticle } from "../types";

export const subgradientMethodWiki: WikiArticle = {
  conceptId: "subgradient-method",

  summary:
    "Many useful convex functions have kinks: $|x|$, the hinge loss, $\\|\\mathbf{x}\\|_1$, a maximum of affine " +
    "functions. At a kink there is no gradient, but there are subgradients — slopes of supporting lines that stay " +
    "below the function. The subgradient method replaces the gradient with any subgradient. It is simple and works " +
    "on any convex function, but it isn't a descent method and converges slowly, at rate $O\\!\\left(\\frac{1}{\\sqrt{k}}\\right)$.",

  sections: [
    {
      heading: "Subgradients and the subdifferential",
      blocks: [
        {
          kind: "formula",
          latex: "f(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\mathbf{g}^{\\top}(\\mathbf{y} - \\mathbf{x}) \\quad \\text{for all } \\mathbf{y}",
          caption: "$\\mathbf{g}$ is a subgradient of convex $f$ at $\\mathbf{x}$; the set of all of them is the subdifferential $\\partial f(\\mathbf{x})$",
        },
        {
          kind: "table",
          headers: ["Function", "Subdifferential"],
          rows: [
            ["Differentiable convex $f$", "$\\{\\nabla f(\\mathbf{x})\\}$"],
            ["$|x|$", "$\\{-1\\}$ for $x < 0$, $[-1, 1]$ at $x = 0$, $\\{1\\}$ for $x > 0$"],
            ["$\\max(f_1, f_2)$", "Convex hull of $\\partial f_i(\\mathbf{x})$ over the $f_i$ active (attaining the max) at $\\mathbf{x}$"],
            ["$\\|\\mathbf{x}\\|_1$", "Vectors $\\mathbf{g}$ with $g_i = \\operatorname{sign}(x_i)$ where $x_i \\ne 0$ and $g_i \\in [-1, 1]$ where $x_i = 0$"],
            ["Hinge $\\max(0, 1 - t)$", "$\\{-1\\}$ for $t < 1$, $[-1, 0]$ at $t = 1$, $\\{0\\}$ for $t > 1$"],
          ],
        },
        {
          kind: "formula",
          latex: "\\mathbf{x}^{*} \\text{ minimises } f \\iff \\mathbf{0} \\in \\partial f(\\mathbf{x}^{*})",
          caption: "The optimality condition for convex functions, kinks included",
        },
        {
          kind: "example",
          title: "Minimising a kinked function",
          problem: "Find the minimiser of $f(x) = |x| + \\frac{1}{2}(x - a)^{2}$ for $a = 0.5$ and for $a = 2$.",
          steps: [
            "$\\partial f(x) = \\partial|x| + (x - a)$.",
            "For $a = 0.5$: at $x = 0$, $\\partial f(0) = [-1, 1] - 0.5 = [-1.5, 0.5]$, which contains $0$. So $x^{*} = 0$.",
            "For $a = 2$: for $x > 0$, $f'(x) = 1 + x - 2 = 0$ gives $x = 1$.",
          ],
          answer: "$x^{*} = 0$ when $|a| \\le 1$ and $x^{*} = a - \\operatorname{sign}(a)$ otherwise: soft-thresholding, the heart of the lasso.",
        },
      ],
    },

    {
      heading: "The subgradient method",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{x}_{k+1} = \\mathbf{x}_k - \\alpha_k\\mathbf{g}_k, \\quad \\mathbf{g}_k \\in \\partial f(\\mathbf{x}_k); \\qquad f_{\\text{best}}^{(k)} - f^{*} \\le \\frac{R^{2} + G^{2}\\sum_{i \\le k}\\alpha_i^{2}}{2\\sum_{i \\le k}\\alpha_i}",
          caption: "With $\\|\\mathbf{x}_0 - \\mathbf{x}^{*}\\| \\le R$ and $\\|\\mathbf{g}\\| \\le G$",
        },
        {
          kind: "prose",
          text:
            "A negative subgradient need not be a descent direction, so $f(\\mathbf{x}_k)$ can go up; the method keeps " +
            "track of the best value found. The bound shows how to choose steps: diminishing steps with " +
            "$\\sum\\alpha_k = \\infty$ and $\\sum\\alpha_k^{2} < \\infty$ (e.g. $\\alpha_k = \\frac{1}{k}$) guarantee convergence, " +
            "and the best fixed-horizon choice $\\alpha = \\frac{R}{G\\sqrt{k}}$ gives error $\\frac{RG}{\\sqrt{k}}$. Reaching accuracy " +
            "$\\varepsilon$ thus takes $O\\!\\left(\\frac{1}{\\varepsilon^{2}}\\right)$ iterations — $100\\times$ more work for each extra digit.",
        },
        {
          kind: "example",
          title: "Why steps must shrink",
          problem: "Run the subgradient method on $f(x) = |x|$ from $x_0 = 1.2$ with constant step $\\alpha = 1$.",
          steps: [
            "$g_0 = 1$, so $x_1 = 0.2$; $g_1 = 1$, so $x_2 = -0.8$.",
            "$g_2 = -1$, so $x_3 = 0.2$; then $x_4 = -0.8$, and so on forever.",
          ],
          answer: "The iterates oscillate between $0.2$ and $-0.8$ and never reach $0$: with a constant step, the method only gets within about $\\frac{\\alpha G}{2}$ of optimal.",
        },
      ],
    },

    {
      heading: "Where it fits",
      blocks: [
        {
          kind: "list",
          items: [
            "**Polyak's step** $\\alpha_k = \\frac{f(\\mathbf{x}_k) - f^{*}}{\\|\\mathbf{g}_k\\|^{2}}$ is optimal when $f^{*}$ is known.",
            "**Projected subgradient** handles a convex constraint set by projecting after each step.",
            "Subgradient steps on Lagrangian duals underlie dual decomposition, where only subgradients of the dual function are available.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Exploit structure when you can",
          text:
            "The $O\\!\\left(\\frac{1}{\\sqrt{k}}\\right)$ rate is the best possible for general nonsmooth convex functions using " +
            "only subgradients. But most practical nonsmooth objectives are *smooth plus simple* (a loss plus an $\\ell_1$ " +
            "penalty), and proximal gradient methods exploit that structure to recover the $O\\!\\left(\\frac{1}{k}\\right)$ or " +
            "$O\\!\\left(\\frac{1}{k^{2}}\\right)$ rates of smooth optimisation.",
        },
      ],
    },
  ],

  references: [
    { source: "Beck, First-Order Methods in Optimization", locator: "Ch. 3, Subgradients; Ch. 8, Primal and Dual Projected Subgradient Methods" },
    { source: "Boyd, Xiao & Mutapcic, Subgradient Methods (Stanford EE364b notes)", locator: "§§2–3, Basic subgradient method and convergence" },
  ],
};
