import type { WikiArticle } from "../types";

export const nonlinearLeastSquaresWiki: WikiArticle = {
  conceptId: "nonlinear-least-squares",

  summary:
    "Fitting a model that is nonlinear in its parameters — an exponential decay, a dose–response curve, a camera " +
    "pose — means minimising a sum of squared residuals $\\frac{1}{2}\\|\\mathbf{r}(\\boldsymbol{\\theta})\\|^{2}$. The " +
    "structure gives a cheap approximation to the Hessian, $J^{\\top}J$, built from first derivatives only. " +
    "Gauss–Newton uses it directly; Levenberg–Marquardt adds damping that interpolates between Gauss–Newton and " +
    "gradient descent, making it robust far from the solution.",

  sections: [
    {
      heading: "Gauss–Newton",
      blocks: [
        {
          kind: "formula",
          latex: "\\nabla f = J^{\\top}\\mathbf{r}, \\qquad \\nabla^{2} f = J^{\\top}J + \\sum_i r_i\\nabla^{2} r_i",
          caption: "For $f(\\boldsymbol{\\theta}) = \\frac{1}{2}\\sum_i r_i(\\boldsymbol{\\theta})^{2}$, with $J$ the Jacobian of $\\mathbf{r}$",
        },
        {
          kind: "formula",
          latex: "(J^{\\top}J)\\,\\mathbf{p} = -J^{\\top}\\mathbf{r}",
          caption: "The Gauss–Newton step: drop the second-order term, i.e. linearise the residuals and solve a linear least-squares problem",
        },
        {
          kind: "prose",
          text:
            "Equivalently, $\\mathbf{p}$ minimises $\\|\\mathbf{r} + J\\mathbf{p}\\|^{2}$, a linear least-squares problem best solved " +
            "by QR on $J$ rather than by forming $J^{\\top}J$. The dropped term is small when the residuals are small or " +
            "the model is nearly linear, so Gauss–Newton converges fast on well-fitting problems — quadratically for " +
            "zero-residual problems — and slowly, or not at all, on badly fitting ones.",
        },
        {
          kind: "example",
          title: "Fitting a growth rate",
          problem: "Fit $y = e^{\\theta t}$ to the single observation $(t, y) = (1, e)$ by Gauss–Newton from $\\theta_0 = 0$.",
          steps: [
            "Residual $r(\\theta) = e^{\\theta} - e$, Jacobian $J = e^{\\theta}$, so the step is $p = -\\frac{r}{J} = -1 + e^{1 - \\theta}$.",
            "$\\theta_1 = 0 - 1 + e = 1.7183$; $\\theta_2 = 1.7183 - 1 + e^{-0.7183} = 1.2059$.",
            "$\\theta_3 = 1.2059 - 1 + e^{-0.2059} = 1.0198$, then $\\theta_4 \\approx 1.0002$.",
          ],
          answer: "$\\theta \\to 1$, with the error roughly squaring once it is small — the zero-residual case, where Gauss–Newton behaves like Newton.",
        },
      ],
    },

    {
      heading: "Levenberg–Marquardt",
      blocks: [
        {
          kind: "formula",
          latex: "(J^{\\top}J + \\lambda D)\\,\\mathbf{p} = -J^{\\top}\\mathbf{r}",
          caption: "$D = I$ (Levenberg) or $D = \\operatorname{diag}(J^{\\top}J)$ (Marquardt's scale-invariant version)",
        },
        {
          kind: "list",
          items: [
            "Small $\\lambda$: the step approaches the Gauss–Newton step, fast near the solution.",
            "Large $\\lambda$: the step approaches $-\\frac{1}{\\lambda}J^{\\top}\\mathbf{r}$, a short gradient-descent step, safe far away.",
            "Adaptive rule: if a step reduces $\\|\\mathbf{r}\\|^{2}$, accept it and decrease $\\lambda$ (e.g. divide by $10$); otherwise reject it and increase $\\lambda$.",
            "Adding $\\lambda D \\succ 0$ also makes the system solvable when $J$ is rank-deficient.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A trust-region method in disguise",
          text:
            "The LM step is exactly the minimiser of the linearised model $\\|\\mathbf{r} + J\\mathbf{p}\\|^{2}$ subject to " +
            "$\\|\\mathbf{p}\\| \\le \\Delta$ for some radius $\\Delta$ depending on $\\lambda$. Raising $\\lambda$ is shrinking the trust region.",
        },
      ],
    },

    {
      heading: "In practice",
      blocks: [
        {
          kind: "list",
          items: [
            "Curve fitting (`scipy.optimize.curve_fit`, MATLAB `lsqnonlin`), bundle adjustment in computer vision, and GPS positioning all use LM or trust-region Gauss–Newton.",
            "In statistics, Gauss–Newton is the classical algorithm for nonlinear regression, and Fisher scoring for GLMs is a close relative (it replaces the Hessian with its expectation).",
            "Good starting values matter: nonlinear least squares can have several local minima.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Large residuals",
          text:
            "When the model fits badly, the neglected $\\sum_i r_i\\nabla^{2} r_i$ term is not small, and Gauss–Newton can " +
            "converge only linearly or even diverge. Hybrid methods that add a quasi-Newton estimate of that term help in " +
            "large-residual problems.",
        },
      ],
    },
  ],

  references: [
    { source: "Nocedal & Wright, Numerical Optimization", locator: "Ch. 10, Least-Squares Problems (§10.3, Gauss–Newton and Levenberg–Marquardt)" },
    { source: "Seber & Wild, Nonlinear Regression", locator: "Ch. 14, Computational Methods for Nonlinear Least Squares" },
  ],
};
