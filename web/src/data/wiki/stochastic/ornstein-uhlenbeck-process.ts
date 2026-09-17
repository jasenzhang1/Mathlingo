import type { WikiArticle } from "../types";

export const ornsteinUhlenbeckProcessWiki: WikiArticle = {
  conceptId: "ornstein-uhlenbeck-process",
  summary:
    "The Ornstein-Uhlenbeck (OU) process is the SDE dX = θ(μ − X) dt + σ dW: a pull back toward a " +
    "long-run mean μ, at a rate θ, plus constant Gaussian noise. Where geometric Brownian motion grows " +
    "without bound and never comes back, OU is built to *not* wander off — the standard model for " +
    "anything that oscillates around a resting level, from interest rates to a physical particle in " +
    "a fluid.",

  sections: [
    {
      heading: "Mean reversion, in one term",
      blocks: [
        {
          kind: "formula",
          latex: "dX_t = \\theta(\\mu - X_t)\\, dt + \\sigma \\, dW_t",
          caption: "θ > 0 is the speed of reversion, μ the long-run mean, σ the noise size",
        },
        {
          kind: "prose",
          text:
            "The whole model is in the drift term θ(μ − X). When X is above μ, the drift is negative — " +
            "the process is pulled down. When X is below μ, the drift is positive — pulled up. The " +
            "further X strays from μ, the stronger the pull back, exactly like a spring. Turn θ up and " +
            "the process snaps back quickly; turn it down toward 0 and OU degenerates into plain " +
            "Brownian motion with no restoring force at all.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "θ (speed of reversion)",
              description:
                "Larger θ means a faster pull back to μ. 1/θ has units of time and is the process's characteristic relaxation timescale.",
            },
            {
              term: "μ (long-run mean)",
              description: "The level the process reverts to. Unlike GBM, this is a fixed, finite target, not something that grows over time.",
            },
            {
              term: "σ (volatility)",
              description:
                "Constant — unlike GBM, the noise here does not scale with X, so X itself (not log X) is the natural coordinate.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "OU vs. GBM: additive noise vs. multiplicative noise",
          text:
            "The two processes are near-opposites among the SDEs this chapter covers. GBM's noise term " +
            "σS dW scales with the level, which is why it needs log to solve and ends up lognormal and " +
            "always positive. OU's noise term σ dW is a plain constant, which is why it needs an " +
            "integrating factor instead of a logarithm to solve, ends up exactly Gaussian, and — because " +
            "a Gaussian has support on all of ℝ — can go negative.",
        },
      ],
    },

    {
      heading: "Solving it: an integrating factor",
      blocks: [
        {
          kind: "prose",
          text:
            "Multiplying by the deterministic factor e^{θt} makes the drift term disappear via the " +
            "product rule for Itô processes — the same trick used to solve a linear first-order ODE, " +
            "carried over to the stochastic setting.",
        },
        {
          kind: "formula",
          latex: "d\\big(e^{\\theta t} X_t\\big) = \\theta e^{\\theta t} X_t\\, dt + e^{\\theta t}\\, dX_t = \\theta \\mu\\, e^{\\theta t}\\, dt + \\sigma e^{\\theta t}\\, dW_t",
          caption: "Apply Itô's product rule to e^{θt}X_t, then substitute dX_t",
        },
        {
          kind: "prose",
          text: "Both sides now integrate directly from 0 to t, no further Itô correction needed:",
        },
        {
          kind: "formula",
          latex:
            "e^{\\theta t}X_t - X_0 = \\mu\\big(e^{\\theta t} - 1\\big) + \\sigma \\int_0^t e^{\\theta s}\\, dW_s",
        },
        {
          kind: "formula",
          latex:
            "X_t = X_0 e^{-\\theta t} + \\mu\\big(1 - e^{-\\theta t}\\big) + \\sigma e^{-\\theta t}\\int_0^t e^{\\theta s}\\, dW_s",
          caption: "The closed-form solution — a decaying memory of X_0, a rising pull toward μ, and an Itô-integral noise term",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Read the solution as a weighted average",
          text:
            "The first two (deterministic) terms already tell the whole mean-reversion story: X_0 " +
            "e^{−θt} + μ(1 − e^{−θt}) is a weighted average of the starting point and the long-run mean, " +
            "with the weight on X_0 decaying to 0 and the weight on μ rising to 1 as t grows. The noise " +
            "term is an Itô integral of a deterministic integrand, which makes it Gaussian — no Itô's " +
            "lemma required to see that, since a stochastic integral of a non-random function of a " +
            "Brownian motion is automatically normal.",
        },
      ],
    },

    {
      heading: "X_t is Gaussian, with a stationary distribution",
      blocks: [
        {
          kind: "formula",
          latex:
            "X_t \\mid X_0 \\sim N\\!\\left(X_0 e^{-\\theta t} + \\mu(1 - e^{-\\theta t}),\\ \\ \\frac{\\sigma^2}{2\\theta}\\big(1 - e^{-2\\theta t}\\big)\\right)",
        },
        {
          kind: "prose",
          text:
            "Both the mean and the variance have finite limits as t → ∞ — the mean converges to μ and " +
            "the variance converges to σ²/2θ, neither exploding the way GBM's variance does. That means " +
            "OU has a genuine equilibrium: a distribution the process converges to regardless of where " +
            "it started, and stays at.",
        },
        {
          kind: "formula",
          latex: "X_\\infty \\sim N\\!\\left(\\mu,\\ \\frac{\\sigma^2}{2\\theta}\\right)",
          caption: "The stationary distribution — larger θ (faster reversion) means a tighter spread around μ",
        },
        {
          kind: "table",
          headers: ["Feature", "OU process", "Geometric Brownian motion"],
          rows: [
            ["Long-run behaviour", "Converges to a fixed distribution N(μ, σ²/2θ)", "Grows or decays exponentially, variance → ∞"],
            ["Sign", "Can go negative", "Always positive"],
            ["Noise scale", "Constant (σ)", "Proportional to level (σX)"],
            ["Solved by", "Integrating factor e^{θt}", "Itô's lemma on log X"],
          ],
        },
      ],
    },

    {
      heading: "Example",
      blocks: [
        {
          kind: "example",
          title: "Short-rate reversion",
          problem:
            "An interest-rate model has θ = 0.5/yr, μ = 3%, σ = 1%/√yr, and today's rate is X_0 = 5%. " +
            "Find the expected rate and its standard deviation in 2 years.",
          steps: [
            "E[X_2] = X_0 e^{-θt} + μ(1 − e^{-θt}) = 0.05·e^{-1} + 0.03·(1 − e^{-1}).",
            "e^{-1} ≈ 0.3679, so E[X_2] ≈ 0.05(0.3679) + 0.03(0.6321) ≈ 0.0184 + 0.0190 = 0.0374, i.e. 3.74%.",
            "Var(X_2) = (σ²/2θ)(1 − e^{-2θt}) = (0.0001/1)(1 − e^{-2}) ≈ 0.0001 · 0.8647 ≈ 0.0000865.",
            "SD(X_2) = √0.0000865 ≈ 0.0093, i.e. about 0.93%.",
          ],
          answer:
            "The rate is expected to have relaxed most of the way from 5% down toward the 3% mean, " +
            "landing around 3.74% ± 0.93%, and would converge fully to N(3%, 1%) as t grows further.",
        },
      ],
    },

    {
      heading: "Why this matters",
      blocks: [
        {
          kind: "list",
          items: [
            "The Vasicek model prices bonds by assuming the short-term interest rate follows exactly this SDE — the closed-form Gaussian distribution above is what makes Vasicek bond prices solvable in closed form too.",
            "In physics this is the original context: the velocity of a particle under friction and random molecular collisions (Uhlenbeck & Ornstein, 1930) — friction is the θ(μ − X) pull, collisions are the σ dW noise.",
            "Any quantity you expect to fluctuate around a stable target — a spread, a volatility level, a temperature — is a candidate for OU, precisely because GBM-style unbounded growth would be the wrong shape for it.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Negative rates were once considered a modelling flaw",
          text:
            "Because X_t is exactly Gaussian, P(X_t < 0) is always strictly positive, however small. For " +
            "decades this was treated as a defect of using OU/Vasicek for interest rates, since rates " +
            "were assumed to be non-negative — the Cox-Ingersoll-Ross model was built specifically to fix " +
            "it by making volatility scale with √X. Negative-rate periods in practice have made this a " +
            "live debate rather than a purely academic one.",
        },
      ],
    },
  ],

  references: [
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§4.4.4, Vasicek and CIR interest rate models" },
    { source: "Uhlenbeck & Ornstein, On the Theory of the Brownian Motion", locator: "Physical Review, 1930" },
    { source: "Øksendal, Stochastic Differential Equations", locator: "Ch. 5, Linear SDEs and the OU process" },
  ],
};
