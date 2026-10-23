import type { WikiArticle } from "../types";

export const momentumAndAccelerationWiki: WikiArticle = {
  conceptId: "momentum-and-acceleration",

  summary:
    "Momentum methods add a fraction of the previous step to each gradient step, so progress builds up along " +
    "consistent directions and oscillations across a valley cancel. Polyak's heavy-ball method does this for " +
    "quadratics; Nesterov's accelerated gradient method does it with a look-ahead gradient and provably achieves the " +
    "optimal rates for first-order methods: $O\\!\\left(\\frac{1}{k^{2}}\\right)$ for smooth convex functions, and a " +
    "dependence on $\\sqrt{\\kappa}$ rather than $\\kappa$ for strongly convex ones.",

  sections: [
    {
      heading: "Heavy-ball momentum",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{x}_{k+1} = \\mathbf{x}_k - \\alpha\\nabla f(\\mathbf{x}_k) + \\beta(\\mathbf{x}_k - \\mathbf{x}_{k-1})",
          caption: "Polyak's heavy ball: a gradient step plus a momentum term with $0 \\le \\beta < 1$",
        },
        {
          kind: "prose",
          text:
            "Think of a ball rolling on the surface of $f$ with friction: velocity accumulates along the valley floor, " +
            "while the back-and-forth component across the valley largely cancels. For a strongly convex quadratic, the " +
            "tuned parameters $\\alpha = \\frac{4}{(\\sqrt{L} + \\sqrt{\\mu})^{2}}$ and $\\beta = \\left(\\frac{\\sqrt{\\kappa} - 1}{\\sqrt{\\kappa} + 1}\\right)^{2}$ " +
            "give convergence factor $\\frac{\\sqrt{\\kappa} - 1}{\\sqrt{\\kappa} + 1}$ per step. On general convex functions, though, " +
            "heavy ball can fail to converge.",
        },
      ],
    },

    {
      heading: "Nesterov's accelerated gradient",
      blocks: [
        {
          kind: "formula",
          latex:
            "\\mathbf{y}_k = \\mathbf{x}_k + \\frac{k - 1}{k + 2}(\\mathbf{x}_k - \\mathbf{x}_{k-1}), \\qquad \\mathbf{x}_{k+1} = \\mathbf{y}_k - \\frac{1}{L}\\nabla f(\\mathbf{y}_k)",
          caption: "Extrapolate first, then take the gradient step at the extrapolated point",
        },
        {
          kind: "prose",
          text:
            "The difference from heavy ball is where the gradient is evaluated: at the look-ahead point $\\mathbf{y}_k$ " +
            "rather than at $\\mathbf{x}_k$. This lets the method correct its momentum before overshooting, and gives " +
            "guarantees for all smooth convex functions:",
        },
        {
          kind: "table",
          headers: ["Setting", "Gradient descent", "Nesterov"],
          rows: [
            ["$L$-smooth convex", "$f(\\mathbf{x}_k) - f^{*} = O\\!\\left(\\frac{L\\|\\mathbf{x}_0 - \\mathbf{x}^{*}\\|^{2}}{k}\\right)$", "$O\\!\\left(\\frac{L\\|\\mathbf{x}_0 - \\mathbf{x}^{*}\\|^{2}}{k^{2}}\\right)$"],
            ["$\\mu$-strongly convex", "factor $1 - \\frac{1}{\\kappa}$ per step", "factor $1 - \\frac{1}{\\sqrt{\\kappa}}$ per step (momentum $\\frac{\\sqrt{\\kappa} - 1}{\\sqrt{\\kappa} + 1}$)"],
            ["Iterations to accuracy $\\varepsilon$ (strongly convex)", "$O\\!\\left(\\kappa\\ln\\frac{1}{\\varepsilon}\\right)$", "$O\\!\\left(\\sqrt{\\kappa}\\ln\\frac{1}{\\varepsilon}\\right)$"],
          ],
        },
        {
          kind: "example",
          title: "What $\\sqrt{\\kappa}$ buys",
          problem: "A strongly convex problem has $\\kappa = 10{,}000$. Compare the iteration counts of gradient descent and accelerated gradient for a fixed accuracy.",
          steps: [
            "Gradient descent needs on the order of $\\kappa = 10{,}000$ iterations per factor-of-$e$ reduction.",
            "Nesterov needs on the order of $\\sqrt{\\kappa} = 100$.",
          ],
          answer: "About $100\\times$ fewer iterations, at the same cost per iteration (one gradient each).",
        },
      ],
    },

    {
      heading: "Practical behaviour",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Acceleration is not monotone",
          text:
            "Unlike gradient descent with a good step, accelerated methods can make $f$ go up temporarily — the momentum " +
            "carries iterates past the minimiser, producing ripples. **Adaptive restart** (reset the momentum to zero " +
            "whenever $f$ increases, or when the step and gradient point the same way) removes the ripples and often " +
            "recovers the fast linear rate without knowing $\\mu$.",
        },
        {
          kind: "prose",
          text:
            "Acceleration is fragile to noise: with stochastic gradients the errors accumulate in the momentum, so the " +
            "$\\frac{1}{k^{2}}$ rate doesn't carry over directly. Deep-learning \"momentum\" (SGD with $\\beta = 0.9$) is " +
            "heavy-ball-style momentum used mainly to smooth noisy gradients and speed up travel along shallow directions.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A recurring building block",
          text:
            "Nesterov's extrapolation reappears throughout this chapter: FISTA is accelerated proximal gradient, and " +
            "accelerated variants exist for coordinate descent and for ADMM.",
        },
      ],
    },
  ],

  references: [
    { source: "Nesterov, Lectures on Convex Optimization", locator: "§2.2, Optimal methods" },
    { source: "Beck, First-Order Methods in Optimization", locator: "Ch. 10, The Proximal Gradient Method (§10.7, FISTA)" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "§8.3.2, Momentum; §8.3.3, Nesterov momentum" },
  ],
};
