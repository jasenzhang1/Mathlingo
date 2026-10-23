import type { WikiArticle } from "../types";

export const admmWiki: WikiArticle = {
  conceptId: "admm",

  summary:
    "The alternating direction method of multipliers (ADMM) solves problems of the form $\\min f(\\mathbf{x}) + g(\\mathbf{z})$ " +
    "subject to a linear coupling constraint. It forms the augmented Lagrangian, but instead of minimising over " +
    "$\\mathbf{x}$ and $\\mathbf{z}$ jointly, it minimises over each in turn and then updates the multiplier. Each " +
    "subproblem involves only $f$ or only $g$, so it is often a closed-form or proximal step. ADMM is the workhorse for " +
    "large structured convex problems: the lasso and its relatives, consensus and distributed fitting, and many " +
    "imaging and signal-processing tasks.",

  sections: [
    {
      heading: "The problem and the iteration",
      blocks: [
        {
          kind: "formula",
          latex: "\\min_{\\mathbf{x}, \\mathbf{z}}\\; f(\\mathbf{x}) + g(\\mathbf{z}) \\quad \\text{s.t.} \\quad A\\mathbf{x} + B\\mathbf{z} = \\mathbf{c}",
        },
        {
          kind: "formula",
          latex:
            "\\begin{aligned} \\mathbf{x}_{k+1} &= \\arg\\min_{\\mathbf{x}}\\; f(\\mathbf{x}) + \\tfrac{\\rho}{2}\\|A\\mathbf{x} + B\\mathbf{z}_k - \\mathbf{c} + \\mathbf{u}_k\\|^{2} \\\\ \\mathbf{z}_{k+1} &= \\arg\\min_{\\mathbf{z}}\\; g(\\mathbf{z}) + \\tfrac{\\rho}{2}\\|A\\mathbf{x}_{k+1} + B\\mathbf{z} - \\mathbf{c} + \\mathbf{u}_k\\|^{2} \\\\ \\mathbf{u}_{k+1} &= \\mathbf{u}_k + A\\mathbf{x}_{k+1} + B\\mathbf{z}_{k+1} - \\mathbf{c} \\end{aligned}",
          caption: "Scaled form, with $\\mathbf{u} = \\frac{\\boldsymbol{\\lambda}}{\\rho}$ the scaled dual variable",
        },
        {
          kind: "prose",
          text:
            "Compared with the method of multipliers, the only change is one Gauss–Seidel pass — $\\mathbf{x}$ then $\\mathbf{z}$ — " +
            "instead of a joint minimisation. That single change decouples $f$ and $g$. The $\\mathbf{u}$-update accumulates " +
            "the running sum of constraint violations, like the integral term of a controller.",
        },
      ],
    },

    {
      heading: "A worked example: soft-thresholding by ADMM",
      blocks: [
        {
          kind: "example",
          title: "Splitting a one-dimensional lasso",
          problem: "Solve $\\min \\frac{1}{2}(x - 3)^{2} + |z|$ subject to $x - z = 0$ with ADMM, $\\rho = 1$, starting from $z_0 = u_0 = 0$.",
          steps: [
            "$x$-update: minimise $\\frac{1}{2}(x - 3)^{2} + \\frac{1}{2}(x - z_k + u_k)^{2}$, giving $x = \\frac{3 + z_k - u_k}{2}$.",
            "$z$-update: $z = S_{1}(x_{k+1} + u_k)$, soft-thresholding by $\\frac{1}{\\rho} = 1$. Then $u_{k+1} = u_k + x_{k+1} - z_{k+1}$.",
            "$k = 0$: $x = 1.5$, $z = S_1(1.5) = 0.5$, $u = 1$.",
            "$k = 1$: $x = 1.25$, $z = S_1(2.25) = 1.25$, $u = 1$. $k = 2$: $x = 1.625$, $z = 1.625$. $k = 3$: $x = z = 1.8125$.",
          ],
          answer: "The iterates approach $x = z = 2$ (the soft-threshold of $3$ by $1$) and $u \\to 1$, halving the error each step.",
        },
        {
          kind: "prose",
          text:
            "For the full lasso $\\min\\frac{1}{2}\\|X\\boldsymbol{\\beta} - \\mathbf{y}\\|^{2} + \\lambda\\|\\mathbf{z}\\|_1$ s.t. $\\boldsymbol{\\beta} = \\mathbf{z}$, " +
            "the $\\boldsymbol{\\beta}$-update is a ridge-regression solve with $(X^{\\top}X + \\rho I)$ — factor it once and reuse it every " +
            "iteration — and the $\\mathbf{z}$-update is elementwise soft-thresholding.",
        },
      ],
    },

    {
      heading: "Patterns: consensus and sharing",
      blocks: [
        {
          kind: "formula",
          latex: "\\min \\sum_{i=1}^{N} f_i(\\mathbf{x}_i) \\quad \\text{s.t.} \\quad \\mathbf{x}_i = \\mathbf{z}, \\; i = 1, \\ldots, N",
          caption: "Global consensus: $N$ workers, each with its own data and loss, must agree on one parameter vector",
        },
        {
          kind: "prose",
          text:
            "ADMM's $\\mathbf{x}$-update splits into $N$ independent local problems, run in parallel on separate machines; " +
            "the $\\mathbf{z}$-update averages them; each worker then updates its own dual variable. Only the local " +
            "solutions and the average are communicated, never the raw data — the template for distributed model fitting.",
        },
      ],
    },

    {
      heading: "Convergence and practice",
      blocks: [
        {
          kind: "list",
          items: [
            "For closed convex $f$ and $g$ and a problem with a saddle point of the Lagrangian, ADMM converges for **any** $\\rho > 0$: residuals go to zero, the objective to $p^{*}$, and the dual variable to a dual optimum.",
            "Convergence is typically fast to modest accuracy and then slow — $O(\\frac{1}{k})$ in general — which suits statistics and machine learning, where moderate accuracy suffices.",
            "Stop when the **primal residual** $\\mathbf{r}_k = A\\mathbf{x}_k + B\\mathbf{z}_k - \\mathbf{c}$ and **dual residual** $\\mathbf{s}_k = \\rho A^{\\top}B(\\mathbf{z}_k - \\mathbf{z}_{k-1})$ are both small.",
            "Tune $\\rho$ by **residual balancing**: increase it when $\\|\\mathbf{r}\\| \\gg \\|\\mathbf{s}\\|$, decrease it when $\\|\\mathbf{s}\\| \\gg \\|\\mathbf{r}\\|$ (rescaling $\\mathbf{u}$ accordingly).",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Not for non-convex problems — at least not with guarantees",
          text:
            "ADMM is widely used as a heuristic on non-convex problems (sparse coding, matrix completion with rank " +
            "constraints), where it often works well, but convergence is no longer guaranteed and results can depend on " +
            "$\\rho$ and the starting point. With more than two blocks, even convex problems can diverge unless the method is modified.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where it sits in the family tree",
          text:
            "Dual ascent gives decomposition but needs strong assumptions; the method of multipliers is robust but couples " +
            "the variables; ADMM gets both. It is also Douglas–Rachford splitting applied to the dual, and it reduces to " +
            "proximal-type updates whenever $A$ and $B$ are identities — tying together this chapter's two spines.",
        },
      ],
    },
  ],

  references: [
    { source: "Boyd, Parikh, Chu, Peleato & Eckstein, Distributed Optimization and Statistical Learning via the Alternating Direction Method of Multipliers", locator: "Ch. 3, ADMM; Ch. 6, Constrained convex and ℓ1-norm problems (lasso); Ch. 7, Consensus and sharing" },
    { source: "Beck, First-Order Methods in Optimization", locator: "Ch. 15, ADMM" },
  ],
};
