import type { WikiArticle } from "../types";

export const geometricBrownianMotionWiki: WikiArticle = {
  conceptId: "geometric-brownian-motion",
  summary:
    "Geometric Brownian motion is the SDE dS = μS dt + σS dW: an asset whose *percentage* drift and " +
    "*percentage* volatility are constant, rather than its absolute level. Applying Itô's lemma to " +
    "log S turns that multiplicative equation into an additive one for log S, which is why S itself " +
    "ends up lognormal — always positive, and with a closed-form distribution at every future time.",

  sections: [
    {
      heading: "Why not just dS = μ dt + σ dW?",
      blocks: [
        {
          kind: "prose",
          text:
            "Plain Brownian motion with drift is the wrong model for a stock price for a structural " +
            "reason, not a cosmetic one: it can go negative, and a $10 move means the same thing to a " +
            "$20 stock as to a $2,000 one. Real prices move in proportion to their level — a stock " +
            "rarely moves $10 in a day regardless of whether it trades at $20 or $2,000, but it " +
            "routinely moves 1%. GBM builds that scaling in directly by making both the drift and the " +
            "noise proportional to the current price.",
        },
        {
          kind: "formula",
          latex: "dS_t = \\mu S_t \\, dt + \\sigma S_t \\, dW_t",
          caption: "μ is the drift rate, σ the volatility — both in percentage-of-price terms",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "μ",
              description:
                "The expected instantaneous percentage return. If S = $100 and μ = 0.08, the expected drift over dt is $8 · dt, not a fixed dollar amount.",
            },
            {
              term: "σ",
              description:
                "The instantaneous percentage volatility — how large the random wiggle is, again scaled to the current price rather than fixed in dollars.",
            },
            {
              term: "S_t > 0 for all t",
              description:
                "Because the noise term σS dW shrinks to 0 as S shrinks to 0, the process can approach 0 but the multiplicative structure never lets a finite move push it through zero.",
            },
          ],
        },
      ],
    },

    {
      heading: "Solving it: Itô's lemma on log S",
      blocks: [
        {
          kind: "prose",
          text:
            "dS = μS dt + σS dW is not solvable by ordinary integration — S appears on both sides, " +
            "inside the very noise term that is driving it. The standard move is to apply Itô's lemma " +
            "to f(S) = log S, because the coefficients of dS conveniently cancel the S in log's " +
            "derivative and leave an equation with *constant* coefficients.",
        },
        {
          kind: "formula",
          latex:
            "d(\\log S_t) = \\left(\\frac{1}{S_t}\\right) dS_t - \\frac{1}{2}\\left(\\frac{1}{S_t^2}\\right)(dS_t)^2 = \\left(\\mu - \\tfrac{1}{2}\\sigma^2\\right) dt + \\sigma \\, dW_t",
          caption: "Itô's lemma: f = log S, f′ = 1/S, f″ = −1/S², and (dS)² = σ²S² dt",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The −½σ² is the whole point of using Itô's lemma here",
          text:
            "An ordinary chain rule would predict d(log S) = (1/S) dS = μ dt + σ dW, with no −½σ² term. " +
            "That term is exactly the Itô correction — the second-derivative piece that survives " +
            "because (dW)² accumulates like dt rather than vanishing. Drop it and you'd conclude the " +
            "expected log-return equals the expected arithmetic return, which is false: variance drags " +
            "the *median* path below the *mean* path, and this term is the correction that says so.",
        },
        {
          kind: "prose",
          text:
            "log S now follows plain Brownian motion with drift (μ − ½σ²) and volatility σ, which " +
            "integrates directly from 0 to t:",
        },
        {
          kind: "formula",
          latex: "\\log S_t - \\log S_0 = \\left(\\mu - \\tfrac{1}{2}\\sigma^2\\right)t + \\sigma W_t",
        },
        {
          kind: "formula",
          latex: "S_t = S_0 \\exp\\!\\left[\\left(\\mu - \\tfrac{1}{2}\\sigma^2\\right)t + \\sigma W_t\\right]",
          caption: "The closed-form solution — an exponential of a Brownian motion with drift",
        },
      ],
    },

    {
      heading: "S_t is lognormal",
      blocks: [
        {
          kind: "prose",
          text:
            "W_t ~ N(0, t), so the exponent (μ − ½σ²)t + σW_t is normally distributed with mean " +
            "(μ − ½σ²)t and variance σ²t. S_t is the exponential of a normal random variable — by " +
            "definition, lognormal.",
        },
        {
          kind: "formula",
          latex: "\\log S_t \\sim N\\!\\left(\\log S_0 + \\left(\\mu - \\tfrac{1}{2}\\sigma^2\\right)t,\\ \\sigma^2 t\\right)",
        },
        {
          kind: "table",
          headers: ["Quantity", "Value", "Note"],
          rows: [
            ["E[S_t]", "S_0 e^{μt}", "Grows at the arithmetic rate μ, not (μ − ½σ²)"],
            ["Median(S_t)", "S_0 e^{(μ − ½σ²)t}", "Below the mean whenever σ > 0 — a lognormal is right-skewed"],
            ["Var(S_t)", "S_0² e^{2μt}(e^{σ²t} − 1)", "Grows faster than linearly in t"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The mean and the typical outcome are not the same number",
          text:
            "E[S_t] = S_0 e^{μt} looks like it ignores volatility entirely, and in one sense it does — " +
            "but that's because a few enormous up-moves in the right tail pull the average up even as " +
            "most individual paths end below it. The median path, e^{(μ − ½σ²)t}, is what a 'typical' " +
            "trajectory looks like; the gap between the two is called volatility drag, and it is the " +
            "same −½σ² term from the Itô correction, now visible in the distribution rather than the SDE.",
        },
      ],
    },

    {
      heading: "Example",
      blocks: [
        {
          kind: "example",
          title: "Where does a stock end up after a year?",
          problem:
            "S_0 = $100, μ = 0.10, σ = 0.30, t = 1. Find E[S_1] and the median of S_1.",
          steps: [
            "E[S_1] = S_0 e^{μt} = 100 · e^{0.10} ≈ 100 · 1.1052 ≈ $110.52.",
            "Median(S_1) = S_0 e^{(μ − ½σ²)t} = 100 · e^{0.10 − 0.045} = 100 · e^{0.055} ≈ $105.65.",
            "The gap ($110.52 vs $105.65) is volatility drag: ½σ² = ½(0.09) = 0.045 of drift, eaten " +
              "by the variance.",
          ],
          answer:
            "E[S_1] ≈ $110.52, median(S_1) ≈ $105.65 — more than half of all simulated paths finish " +
            "below the 'expected' price.",
        },
      ],
    },

    {
      heading: "Why this matters",
      blocks: [
        {
          kind: "list",
          items: [
            "GBM is the default continuous-time model for a stock price precisely because it guarantees positivity and matches the empirical fact that returns, not price levels, are roughly stationary.",
            "It is the process assumed under the real-world measure in the Black-Scholes-Merton derivation, and (with drift replaced by the risk-free rate) under the risk-neutral measure used to price options.",
            "Log-returns log(S_t/S_0) are exactly normal under GBM — the assumption that justifies treating daily log-returns as i.i.d. Gaussian in a first pass at any pricing or risk model.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Constant σ is the model's weakest assumption",
          text:
            "Real volatility clusters and spikes — it is not constant, which is exactly what the " +
            "implied-volatility 'smile' in options markets reveals: if GBM with constant σ were exactly " +
            "right, every option on the same underlying would imply the same σ, and they don't. GBM is " +
            "the starting point (and the one used to derive Black-Scholes) precisely because it is " +
            "tractable, not because it is empirically exact.",
        },
      ],
    },
  ],

  references: [
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§3.2, Geometric Brownian Motion" },
    { source: "Øksendal, Stochastic Differential Equations", locator: "Ch. 5, Example on GBM" },
    { source: "Hull, Options, Futures, and Other Derivatives", locator: "Ch. 15, The Wiener Process and Itô's Lemma" },
  ],
};
