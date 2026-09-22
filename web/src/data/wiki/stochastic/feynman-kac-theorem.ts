import type { WikiArticle } from "../types";

export const feynmanKacTheoremWiki: WikiArticle = {
  conceptId: "feynman-kac-theorem",
  summary:
    "Feynman-Kac says a conditional expectation of a diffusion's future payoff solves a specific " +
    "parabolic PDE, and conversely that PDE's solution recovers the expectation. It is the general " +
    "bridge between stochastic processes and PDEs — probability and analysis computing the same number " +
    "two different ways — and the Black-Scholes-Merton equation is exactly the special case where the " +
    "diffusion is geometric Brownian motion under the risk-neutral measure.",

  sections: [
    {
      heading: "The theorem",
      blocks: [
        {
          kind: "prose",
          text:
            "Let $X_t$ solve the SDE $dX_t = \\mu(X_t, t)\\, dt + \\sigma(X_t, t)\\, dW_t$, and define",
        },
        {
          kind: "formula",
          latex:
            "u(x, t) = E\\left[\\, e^{-\\int_t^T r(X_s, s)\\, ds}\\, g(X_T) \\;\\middle|\\; X_t = x \\,\\right]",
          caption: "u is a discounted, conditional expectation of a terminal payoff g",
        },
        {
          kind: "prose",
          text:
            "Then $u(x,t)$ solves the backward parabolic PDE",
        },
        {
          kind: "formula",
          latex:
            "\\frac{\\partial u}{\\partial t} + \\mu(x,t)\\frac{\\partial u}{\\partial x} + \\tfrac{1}{2}\\sigma(x,t)^2\\frac{\\partial^2 u}{\\partial x^2} - r(x,t)\\, u = 0, \\qquad u(x, T) = g(x)",
          caption: "The Feynman-Kac PDE — a terminal condition, not an initial one",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two routes to the same number",
          text:
            "This is a genuine equivalence, not merely an analogy: solve the PDE analytically or " +
            "numerically (finite differences, a series solution) and you get $u$; or simulate many " +
            "paths of $X$ forward from $(x,t)$, average $e^{-\\int r\\,ds} g(X_T)$ over the simulations, " +
            "and you get the same $u$, up to simulation error. Monte Carlo pricing and PDE pricing are " +
            "not two different models — they are two algorithms computing one theorem's output.",
        },
      ],
    },

    {
      heading: "Sketch: why the PDE falls out",
      blocks: [
        {
          kind: "prose",
          text:
            "The intuition runs through the same tools as everywhere else in this chapter. Define " +
            "$Y_t = e^{-\\int_0^t r\\, ds}\\, u(X_t, t)$ — the discounted value of the conditional " +
            "expectation, evaluated along the path. By construction $Y_t$ is a martingale: its value at " +
            "time $t$ is, by the tower property of conditional expectation, the same as its expected " +
            "value at time $T$ discounted back, for any $t$. Applying Itô's lemma to $Y_t$ and setting " +
            "the $dt$ (drift) coefficient to zero — the defining property of a martingale, that it has " +
            "no drift — produces exactly the PDE above. This is the identical logic used to derive the " +
            "Black-Scholes PDE from a hedging argument, run in reverse: there, no-drift-in-the-riskless-" +
            "portfolio was imposed by a hedge; here, no-drift-in-$Y_t$ is a direct consequence of the " +
            "tower property of conditional expectation, with no hedging argument required at all.",
        },
      ],
    },

    {
      heading: "Black-Scholes-Merton as the special case",
      blocks: [
        {
          kind: "table",
          headers: ["Feynman-Kac ingredient", "Black-Scholes-Merton specialization"],
          rows: [
            ["X_t", "Stock price S_t, under the risk-neutral measure Q (drift = r, not μ)"],
            ["μ(x,t)", "rS — the risk-neutral drift Girsanov's theorem supplies"],
            ["σ(x,t)", "σS — the usual GBM volatility term"],
            ["r(x,t)", "The constant riskless rate r"],
            ["g(x)", "The option's payoff, e.g. max(x − K, 0) for a call"],
            ["u(x,t)", "The option price V(S,t)"],
          ],
        },
        {
          kind: "prose",
          text:
            "Substituting this table into the general PDE reproduces the Black-Scholes-Merton equation " +
            "exactly: $V_t + rS V_S + \\tfrac12 \\sigma^2 S^2 V_{SS} - rV = 0$. The hedging derivation " +
            "in that article and this theorem are two independent proofs of the identical equation — " +
            "one by no-arbitrage and a replicating portfolio, the other by the martingale property of a " +
            "discounted conditional expectation. That they agree is not a coincidence; risk-neutral " +
            "pricing was defined precisely so the discounted price is a $Q$-martingale, which is exactly " +
            "the hypothesis this theorem needs.",
        },
      ],
    },

    {
      heading: "Why this matters",
      blocks: [
        {
          kind: "list",
          items: [
            "It is the theorem that justifies Monte Carlo pricing: simulating paths and averaging discounted payoffs is not a heuristic approximation to 'the real answer' from a PDE — both are exact routes to the same u, useful in different regimes (Monte Carlo scales better in many dimensions; PDEs scale better in one or two).",
            "It generalizes past option pricing to any problem of the form 'expected discounted future value of a diffusion' — bond pricing, insurance reserving, and physical diffusion problems (the theorem predates finance, going back to Kac's 1949 work connecting Brownian motion to the heat equation) all take this shape.",
            "It closes the loop this whole chapter has been building toward: simple-random-walk gave the discrete process, Brownian motion its continuous limit, Itô's lemma the calculus to differentiate through it, Girsanov the change of measure to remove drift, and Feynman-Kac the final identity connecting the resulting expectation back to the PDE that started this thread with Black-Scholes-Merton.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The discounting rate inside the expectation must match the PDE's r",
          text:
            "A common error is discounting at one rate while solving the PDE with a different one — the " +
            "theorem only holds when $r(X_s,s)$ inside the expectation is the exact same function that " +
            "appears as the $-ru$ term in the PDE. In the constant-rate Black-Scholes case this is easy " +
            "to overlook because both are just 'r', but in stochastic-rate models the two must be kept " +
            "manifestly identical or the equivalence breaks.",
        },
      ],
    },
  ],

  references: [
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§6.3, The Feynman-Kac Theorem" },
    { source: "Kac, On Distributions of Certain Wiener Functionals", locator: "Transactions of the AMS, 1949" },
    { source: "Øksendal, Stochastic Differential Equations", locator: "Ch. 8, The Feynman-Kac Formula" },
  ],
};
