import type { WikiArticle } from "../types";

export const blackScholesMertonEquationWiki: WikiArticle = {
  conceptId: "black-scholes-merton-equation",
  summary:
    "Black-Scholes-Merton turns option pricing into a PDE by a hedging argument: build a portfolio of " +
    "the stock and a bond that exactly replicates the option's payoff, moment to moment, with no risk " +
    "left over. Because a riskless portfolio must earn the riskless rate, the option's value has to " +
    "satisfy a specific backward parabolic PDE — and for a European call or put, that PDE has a " +
    "closed-form solution.",

  sections: [
    {
      heading: "Setup: a stock, a bond, and a claim to price",
      blocks: [
        {
          kind: "prose",
          text:
            "The stock follows geometric Brownian motion, dS = μS dt + σS dW, and a riskless bond " +
            "grows at a constant rate r: dB = rB dt. We want the fair price V(S, t) of a European " +
            "option — a contract paying some known function of S_T at a fixed future time T (a call " +
            "pays max(S_T − K, 0), say). The key move is to ask not 'what do we expect the payoff to be ' " +
            "worth' but 'what portfolio of stock and bond, held and rebalanced continuously, produces " +
            "exactly this payoff no matter what S does'.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Self-financing portfolio",
              description:
                "One with no cash added or withdrawn after t = 0 — every purchase of stock is funded by selling bond, and vice versa.",
            },
            {
              term: "Δ = ∂V/∂S",
              description:
                "The hedge ratio: how many shares of stock the replicating portfolio holds at each instant, chosen so the portfolio's random fluctuation matches the option's.",
            },
            {
              term: "r (riskless rate)",
              description: "The rate the bond earns — and, once the hedge removes all risk, the rate the whole replicating portfolio must earn too, by no-arbitrage.",
            },
          ],
        },
      ],
    },

    {
      heading: "The hedging argument",
      blocks: [
        {
          kind: "prose",
          text:
            "Apply Itô's lemma to V(S, t), treating S as the GBM above:",
        },
        {
          kind: "formula",
          latex:
            "dV = \\left(\\frac{\\partial V}{\\partial t} + \\mu S \\frac{\\partial V}{\\partial S} + \\tfrac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2}\\right) dt + \\sigma S \\frac{\\partial V}{\\partial S}\\, dW",
          caption: "Itô's lemma applied to V(S, t)",
        },
        {
          kind: "prose",
          text:
            "Now build a portfolio Π that is long one option and short Δ = ∂V/∂S shares of stock. Its " +
            "instantaneous change is dΠ = dV − Δ dS, and substituting both Itô expansions, the σS dW " +
            "term from dV cancels exactly against the σS dW term from Δ dS — the hedge ratio was chosen " +
            "precisely to make that cancellation happen. What survives is purely deterministic:",
        },
        {
          kind: "formula",
          latex:
            "d\\Pi = \\left(\\frac{\\partial V}{\\partial t} + \\tfrac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2}\\right) dt",
          caption: "No dW term left — the portfolio is instantaneously riskless",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Riskless means it must earn r, by no-arbitrage",
          text:
            "A portfolio with zero randomness that earned more than r would let anyone borrow at r and " +
            "pocket the difference risk-free — an arbitrage. One that earned less would be shorted " +
            "against the bond for the same free profit. So the only rate consistent with no-arbitrage " +
            "is dΠ = rΠ dt exactly, and this single substitution is what turns a hedging argument into " +
            "a PDE.",
        },
        {
          kind: "prose",
          text:
            "Setting the two expressions for dΠ equal — the Itô one and rΠ dt, with Π = V − ΔS = " +
            "V − S ∂V/∂S — and simplifying gives the Black-Scholes-Merton PDE:",
        },
        {
          kind: "formula",
          latex:
            "\\frac{\\partial V}{\\partial t} + rS\\frac{\\partial V}{\\partial S} + \\tfrac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} - rV = 0",
          caption: "Backward parabolic PDE — notice μ has disappeared entirely",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "μ cancelled out — the price does not depend on the stock's expected return",
          text:
            "This is the single most surprising feature of the derivation. Two investors who completely " +
            "disagree about μ — one bullish, one bearish — must still agree on the option's price, " +
            "because the hedge is constructed instant-by-instant from σ and Δ alone, never from a view " +
            "on drift. σ, by contrast, does not cancel and matters enormously: it is the only parameter " +
            "of the stock's real-world dynamics the option price actually depends on.",
        },
      ],
    },

    {
      heading: "Solving it: the Black-Scholes formula",
      blocks: [
        {
          kind: "prose",
          text:
            "Solved with the boundary condition V(S, T) = max(S − K, 0) (a European call), the PDE has " +
            "a closed-form solution:",
        },
        {
          kind: "formula",
          latex: "C(S, t) = S\\,\\Phi(d_1) - K e^{-r(T-t)}\\,\\Phi(d_2)",
          caption: "Φ is the standard normal CDF",
        },
        {
          kind: "formula",
          latex:
            "d_1 = \\frac{\\ln(S/K) + \\left(r + \\tfrac{1}{2}\\sigma^2\\right)(T-t)}{\\sigma\\sqrt{T-t}}, \\qquad d_2 = d_1 - \\sigma\\sqrt{T-t}",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "S Φ(d_1)",
              description:
                "The expected value of holding the stock, conditional on the option finishing in the money, discounted back into today's terms through the hedge — not simply E[S_T | S_T > K].",
            },
            {
              term: "K e^{-r(T-t)} Φ(d_2)",
              description:
                "The present value of paying the strike K, weighted by Φ(d_2) = the risk-neutral probability that the option is exercised.",
            },
            {
              term: "Put-call parity",
              description:
                "C − P = S − Ke^{-r(T-t)} follows from both satisfying the same linear PDE with payoffs that differ by exactly max(S−K,0) − max(K−S,0) = S − K, giving the put price for free.",
            },
          ],
        },
      ],
    },

    {
      heading: "Example",
      blocks: [
        {
          kind: "example",
          title: "Pricing a 1-year call",
          problem:
            "S = $100, K = $100, r = 5%, σ = 20%, T − t = 1 year. Find d_1, d_2, and the call price " +
            "(Φ(0.35) ≈ 0.6368, Φ(0.15) ≈ 0.5596).",
          steps: [
            "d_1 = [ln(100/100) + (0.05 + 0.02)(1)] / (0.20·1) = [0 + 0.07] / 0.20 = 0.35.",
            "d_2 = d_1 − σ√(T−t) = 0.35 − 0.20 = 0.15.",
            "C = S·Φ(d_1) − K e^{-r(T-t)}·Φ(d_2) = 100(0.6368) − 100 e^{-0.05}(0.5596).",
            "e^{-0.05} ≈ 0.9512, so C ≈ 63.68 − 100(0.9512)(0.5596) ≈ 63.68 − 53.23 ≈ $10.45.",
          ],
          answer: "C ≈ $10.45 — an at-the-money call, roughly 10.5% of the stock's current price.",
        },
      ],
    },

    {
      heading: "Why this matters, and where it breaks",
      blocks: [
        {
          kind: "list",
          items: [
            "The PDE derivation generalizes: any European-style payoff, and even path-dependent ones, can in principle be priced by solving the same PDE with a different boundary condition.",
            "Feynman-Kac shows the PDE solution equals a discounted risk-neutral expectation — the analytic route (solve the PDE) and the probabilistic route (simulate under the risk-neutral measure and discount) are two views of the same answer.",
            "The Greeks (Δ, Γ, Θ, Vega, Rho) are just the PDE's partial derivatives, and they are exactly what a trading desk uses to rebalance the hedge in practice, discretely rather than continuously.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Every input except σ is directly observable — and σ isn't even really constant",
          text:
            "S, K, r, and T are all given by the market or the contract. σ has to be estimated, and the " +
            "model assumes it is one fixed number for the whole life of the option. Solving the formula " +
            "backwards from an observed market price for the σ that reproduces it gives the 'implied " +
            "volatility' — and the fact that different strikes on the same stock imply different σ (the " +
            "volatility smile) is direct empirical evidence that the GBM assumption underneath this " +
            "entire derivation is only an approximation.",
        },
      ],
    },
  ],

  references: [
    { source: "Black & Scholes, The Pricing of Options and Corporate Liabilities", locator: "Journal of Political Economy, 1973" },
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§4.5, The Black-Scholes-Merton Equation" },
    { source: "Hull, Options, Futures, and Other Derivatives", locator: "Ch. 15-19, Black-Scholes-Merton and the Greeks" },
  ],
};
