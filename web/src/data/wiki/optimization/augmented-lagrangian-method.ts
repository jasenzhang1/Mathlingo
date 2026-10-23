import type { WikiArticle } from "../types";

export const augmentedLagrangianMethodWiki: WikiArticle = {
  conceptId: "augmented-lagrangian-method",

  summary:
    "Penalty methods enforce a constraint $h(\\mathbf{x}) = 0$ by adding $\\frac{\\rho}{2}\\|h(\\mathbf{x})\\|^{2}$ to the " +
    "objective, but they hit the constraint only as $\\rho \\to \\infty$, where the problem becomes badly conditioned. " +
    "The augmented Lagrangian method (method of multipliers) adds a multiplier term as well and updates the " +
    "multiplier after each minimisation. With a finite, fixed $\\rho$ it converges to the exact constrained solution, " +
    "and it is the direct ancestor of ADMM.",

  sections: [
    {
      heading: "Quadratic penalties and their flaw",
      blocks: [
        {
          kind: "formula",
          latex: "Q(\\mathbf{x}; \\rho) = f(\\mathbf{x}) + \\frac{\\rho}{2}\\|h(\\mathbf{x})\\|^{2}",
          caption: "Minimise for an increasing sequence of $\\rho$",
        },
        {
          kind: "example",
          title: "The penalty only gets close",
          problem: "Minimise $x^{2}$ subject to $x = 1$ with the quadratic penalty.",
          steps: [
            "$Q = x^{2} + \\frac{\\rho}{2}(x - 1)^{2}$, so $2x + \\rho(x - 1) = 0$ and $x(\\rho) = \\frac{\\rho}{2 + \\rho}$.",
            "$\\rho = 2$: $x = 0.5$. $\\rho = 20$: $x = 0.909$. $\\rho = 200$: $x = 0.990$.",
          ],
          answer: "The constraint violation is $\\frac{2}{2 + \\rho}$, vanishing only as $\\rho \\to \\infty$.",
        },
        {
          kind: "prose",
          text:
            "As $\\rho$ grows, the Hessian of $Q$ gets eigenvalues of order $\\rho$ in directions normal to the constraint, " +
            "while other eigenvalues stay of order $1$: the condition number grows like $\\rho$, and inner solvers slow " +
            "down or lose accuracy. *Exact* penalties such as $\\rho\\|h(\\mathbf{x})\\|_1$ avoid this, at the price of nonsmoothness.",
        },
      ],
    },

    {
      heading: "The method of multipliers",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathcal{L}_{\\rho}(\\mathbf{x}, \\boldsymbol{\\lambda}) = f(\\mathbf{x}) + \\boldsymbol{\\lambda}^{\\top}h(\\mathbf{x}) + \\frac{\\rho}{2}\\|h(\\mathbf{x})\\|^{2}",
          caption: "The augmented Lagrangian: ordinary Lagrangian plus a quadratic penalty",
        },
        {
          kind: "formula",
          latex: "\\mathbf{x}_{k+1} = \\arg\\min_{\\mathbf{x}}\\mathcal{L}_{\\rho}(\\mathbf{x}, \\boldsymbol{\\lambda}_k), \\qquad \\boldsymbol{\\lambda}_{k+1} = \\boldsymbol{\\lambda}_k + \\rho\\, h(\\mathbf{x}_{k+1})",
          caption: "Minimise, then update the multiplier by $\\rho$ times the constraint violation",
        },
        {
          kind: "prose",
          text:
            "Why this update: stationarity of $\\mathcal{L}_{\\rho}$ in $\\mathbf{x}$ reads $\\nabla f + (\\boldsymbol{\\lambda}_k + \\rho h)^{\\top}\\nabla h = \\mathbf{0}$, " +
            "so $\\boldsymbol{\\lambda}_k + \\rho h(\\mathbf{x}_{k+1})$ is exactly the multiplier that makes $\\mathbf{x}_{k+1}$ satisfy the " +
            "Lagrange condition. Once $\\boldsymbol{\\lambda}_k$ equals the true $\\boldsymbol{\\lambda}^{*}$, the minimiser of " +
            "$\\mathcal{L}_{\\rho}$ is the constrained solution for *any* $\\rho$ above a threshold. The multiplier update is also " +
            "gradient ascent on the dual with step $\\rho$.",
        },
        {
          kind: "example",
          title: "Exact with a finite penalty",
          problem: "Apply the method of multipliers to $\\min x^{2}$ s.t. $x = 1$ with $\\rho = 2$ and $\\lambda_0 = 0$.",
          steps: [
            "Minimising $x^{2} + \\lambda(x - 1) + (x - 1)^{2}$: $x = \\frac{2 - \\lambda}{4}$.",
            "$\\lambda_0 = 0$: $x_1 = 0.5$, then $\\lambda_1 = 0 + 2(0.5 - 1) = -1$.",
            "$x_2 = 0.75$, $\\lambda_2 = -1.5$; $x_3 = 0.875$, $\\lambda_3 = -1.75$; …",
          ],
          answer: "$x_k \\to 1$ and $\\lambda_k \\to -2$ (the true multiplier), with the error halving every iteration — at the fixed, modest $\\rho = 2$.",
        },
      ],
    },

    {
      heading: "In practice",
      blocks: [
        {
          kind: "list",
          items: [
            "Inequalities are handled by adding slack variables or with a modified update $\\mu_i \\leftarrow \\max(0, \\mu_i + \\rho g_i(\\mathbf{x}))$.",
            "$\\rho$ is usually increased only if the constraint violation isn't shrinking fast enough.",
            "The inner minimisations need only be approximate, tightening as the outer iterations proceed.",
            "Solvers such as LANCELOT and the ALM components of modern NLP codes use this framework.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "From here to ADMM",
          text:
            "Compared with plain dual ascent, the augmented term makes the $\\mathbf{x}$-subproblem strongly convex and the " +
            "method robust — but it also couples variables that dual decomposition kept separate, since $\\|h(\\mathbf{x})\\|^{2}$ " +
            "mixes them. ADMM restores parallelism by minimising over one block at a time instead of jointly.",
        },
      ],
    },
  ],

  references: [
    { source: "Nocedal & Wright, Numerical Optimization", locator: "Ch. 17, Penalty and Augmented Lagrangian Methods" },
    { source: "Boyd et al., Distributed Optimization and Statistical Learning via ADMM", locator: "§2.3, Augmented Lagrangians and the method of multipliers" },
    { source: "Bertsekas, Constrained Optimization and Lagrange Multiplier Methods", locator: "Ch. 2, The Method of Multipliers for Equality Constrained Problems" },
  ],
};
