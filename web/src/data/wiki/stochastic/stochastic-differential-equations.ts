import type { WikiArticle } from "../types";

export const stochasticDifferentialEquationsWiki: WikiArticle = {
  conceptId: "stochastic-differential-equations",
  summary:
    "A stochastic differential equation $dX_t = \\mu(X_t, t)\\, dt + \\sigma(X_t, t)\\, dW_t$ is shorthand " +
    "for an integral equation combining an ordinary time integral with an Itô integral. Most SDEs have " +
    "no closed-form solution — geometric Brownian motion and the Ornstein-Uhlenbeck process are the two " +
    "exceptions this domain covers in full — so numerical discretization is the default tool for " +
    "everything else.",

  sections: [
    {
      heading: "The general form",
      blocks: [
        {
          kind: "formula",
          latex: "dX_t = \\mu(X_t, t)\\, dt + \\sigma(X_t, t)\\, dW_t, \\qquad X_0 \\text{ given}",
          caption: "μ is the drift coefficient, σ the diffusion coefficient — both may depend on the current state and time",
        },
        {
          kind: "prose",
          text:
            "This differential notation is never literally differentiated — it is shorthand for the " +
            "integral equation obtained by integrating both sides from 0 to $t$:",
        },
        {
          kind: "formula",
          latex: "X_t = X_0 + \\int_0^t \\mu(X_s, s)\\, ds + \\int_0^t \\sigma(X_s, s)\\, dW_s",
          caption: "The first integral is an ordinary (Riemann) integral; the second is an Itô integral",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "$\\mu(X_t, t)$ — drift",
              description: "The deterministic trend the process follows at each instant, which may depend on the current level $X_t$ — as in Ornstein-Uhlenbeck, where drift pulls toward a mean.",
            },
            {
              term: "$\\sigma(X_t, t)$ — diffusion",
              description: "The size of the random fluctuation, which may also depend on the current level — as in GBM, where volatility scales with price.",
            },
            {
              term: "$X_0$",
              description: "The (typically deterministic) starting value.",
            },
          ],
        },
      ],
    },

    {
      heading: "Existence and uniqueness",
      blocks: [
        {
          kind: "prose",
          text:
            "Not every choice of $\\mu$ and $\\sigma$ produces a well-behaved solution — some can blow up " +
            "in finite time or fail to have a unique solution at all. The standard sufficient conditions " +
            "mirror the ones for ordinary differential equations, extended to the stochastic case.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Lipschitz condition",
              description: "$|\\mu(x,t) - \\mu(y,t)| + |\\sigma(x,t) - \\sigma(y,t)| \\le K|x-y|$ for a constant K — rules out coefficients that vary too wildly with X.",
            },
            {
              term: "Linear growth condition",
              description: "$|\\mu(x,t)| + |\\sigma(x,t)| \\le K(1+|x|)$ — rules out coefficients that grow too fast in X, which is what prevents finite-time blow-up.",
            },
          ],
        },
        {
          kind: "prose",
          text:
            "Together these guarantee a unique strong solution exists (a solution adapted to the given " +
            "Brownian filtration). Both GBM ($\\mu = \\mu X$, $\\sigma = \\sigma X$) and OU " +
            "($\\mu = \\theta(m - X)$, $\\sigma$ constant) satisfy both conditions, which is part of why " +
            "they are the two standard worked examples.",
        },
      ],
    },

    {
      heading: "When there's no closed form: Euler-Maruyama",
      blocks: [
        {
          kind: "prose",
          text:
            "Most SDEs one writes down — anything with a nonlinear or non-affine $\\mu$ or $\\sigma$ — " +
            "cannot be solved in closed form the way GBM and OU can, even when a unique solution is " +
            "guaranteed to exist. The practical response is to discretize: replace the continuous SDE with " +
            "a sequence of small, simulatable steps.",
        },
        {
          kind: "formula",
          latex:
            "X_{t + \\Delta t} \\approx X_t + \\mu(X_t, t)\\, \\Delta t + \\sigma(X_t, t)\\, \\Delta W",
          caption: "Euler-Maruyama scheme: ΔW ~ N(0, Δt), sampled independently at each step",
        },
        {
          kind: "prose",
          text:
            "This is exactly the discrete-time analogue of the SDE's own definition: replace the " +
            "infinitesimal $dt$ and $dW$ with a finite step $\\Delta t$ and a simulated Gaussian increment " +
            "$\\Delta W$, then chain the steps together. It is the SDE version of Euler's method for " +
            "ordinary differential equations, and it converges to the true solution as $\\Delta t \\to 0$ " +
            "under the same Lipschitz and linear-growth conditions.",
        },
      ],
    },

    {
      heading: "Why this matters",
      blocks: [
        {
          kind: "list",
          items: [
            "Every named process in this domain (GBM, OU) is a special case of this general form — learning the general shorthand once means every future SDE is read the same way, coefficient by coefficient.",
            "Girsanov's theorem operates directly on this general form: changing the drift μ by a Girsanov transformation while leaving σ untouched is the mechanism behind risk-neutral pricing.",
            "Feynman-Kac connects the general SDE's solution to a PDE — the Black-Scholes PDE is the special case where X follows GBM under the risk-neutral measure.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Closed-form solutions are the exception, not the rule",
          text:
            "It is tempting, having seen GBM and OU solved exactly, to expect every SDE to yield to some " +
            "clever substitution. In practice the overwhelming majority of SDEs used in applied modeling — " +
            "the CIR process, stochastic volatility models like Heston, anything with a nonlinear drift — " +
            "have no known closed form, and Euler-Maruyama (or a refinement of it, like Milstein's scheme) " +
            "is the actual tool used to simulate them.",
        },
      ],
    },
  ],

  references: [
    { source: "Øksendal, Stochastic Differential Equations", locator: "Ch. 5, Existence and Uniqueness of Solutions to SDEs" },
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§4.6-4.7, Stochastic Differential Equations" },
    { source: "Kloeden & Platen, Numerical Solution of Stochastic Differential Equations", locator: "Ch. 9, The Euler-Maruyama scheme" },
  ],
};
