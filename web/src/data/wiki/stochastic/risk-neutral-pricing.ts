import type { WikiArticle } from "../types";

export const riskNeutralPricingWiki: WikiArticle = {
  conceptId: "risk-neutral-pricing",
  summary:
    "Risk-neutral pricing chooses the specific $\\theta$ in Girsanov's theorem that makes the " +
    "discounted stock price a martingale under a new measure $Q$ — under which every asset's expected " +
    "return equals the riskless rate $r$, regardless of its true real-world drift $\\mu$. Every " +
    "derivative's price then follows from a single formula: discount the expected payoff, computed " +
    "under $Q$. This is the general mechanism behind the $\\mu$-cancellation already seen in the " +
    "Black-Scholes-Merton derivation.",

  sections: [
    {
      heading: "Choosing θ: the market price of risk",
      blocks: [
        {
          kind: "formula",
          latex: "\\theta = \\frac{\\mu - r}{\\sigma}",
          caption: "The market price of risk — excess return per unit of volatility",
        },
        {
          kind: "prose",
          text:
            "Start with $dS = \\mu S\\, dt + \\sigma S\\, dW$ under the real-world measure $P$. The " +
            "discounted price $e^{-rt} S_t$ has drift $(\\mu - r) e^{-rt} S_t$ — nonzero whenever $\\mu " +
            "\\ne r$, so it is not a $P$-martingale. Applying Girsanov's theorem with $\\theta = (\\mu-r)/" +
            "\\sigma$ and $\\tilde W_t = W_t + \\theta t$ rewrites the SDE entirely in terms of the new " +
            "Brownian motion:",
        },
        {
          kind: "formula",
          latex: "dS = \\mu S\\, dt + \\sigma S\\, dW = rS\\, dt + \\sigma S\\, d\\tilde W_t",
          caption: "Substituting dW = dW̃ − θ dt and simplifying: the μ − r drift is absorbed entirely into θ, leaving rate r",
        },
        {
          kind: "prose",
          text:
            "Under $Q$ (the measure making $\\tilde W$ a Brownian motion), $S_t$ follows exactly the same " +
            "form of SDE as before, but with $\\mu$ replaced by $r$. The discounted price " +
            "$e^{-rt}S_t$ is now driftless — an honest $Q$-martingale.",
        },
      ],
    },

    {
      heading: "Pricing under Q",
      blocks: [
        {
          kind: "formula",
          latex: "V_t = E^Q\\left[e^{-r(T-t)} \\cdot \\text{Payoff} \\;\\middle|\\; \\mathcal F_t\\right]",
          caption: "The no-arbitrage price is the discounted risk-neutral expectation of the payoff",
        },
        {
          kind: "prose",
          text:
            "This formula requires no assumption about $\\mu$ at all — the real-world drift dropped out " +
            "entirely in the derivation above, absorbed into the definition of $\\theta$ and $Q$. Two " +
            "investors with completely different beliefs about $\\mu$ still compute the same $V_t$, " +
            "because the pricing formula never references $\\mu$ once $Q$ is fixed.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is the general mechanism behind Black-Scholes' μ-cancellation",
          text:
            "The Black-Scholes-Merton derivation found that $\\mu$ cancels out of the option-pricing PDE " +
            "through a hedging argument, and flagged it as the single most surprising feature of that " +
            "derivation. Girsanov's theorem explains *why* it had to happen: the hedge-and-no-arbitrage " +
            "argument and the change-of-measure argument are two routes to the same destination. Choosing " +
            "$\\theta = (\\mu-r)/\\sigma$ is precisely what a perfect hedge implicitly does — it reweights " +
            "probabilities so that the drift an investor's beliefs assign to the stock becomes entirely " +
            "irrelevant to its price.",
        },
      ],
    },

    {
      heading: "The fundamental theorem of asset pricing",
      blocks: [
        {
          kind: "prose",
          text:
            "The existence of a measure $Q$, equivalent to $P$, under which discounted asset prices are " +
            "martingales, is equivalent (in a precise, provable sense this article only states) to the " +
            "market having no arbitrage opportunities.",
        },
        {
          kind: "formula",
          latex: "\\text{No arbitrage} \\iff \\text{an equivalent martingale measure } Q \\text{ exists}",
          caption: "The fundamental theorem of asset pricing (stated, not proved here)",
        },
        {
          kind: "prose",
          text:
            "A second half of the theorem (uniqueness of $Q$) corresponds to market completeness — every " +
            "payoff can be replicated by trading the underlying assets — and is exactly the content of " +
            "the martingale representation theorem covered next.",
        },
      ],
    },

    {
      heading: "Why this matters",
      blocks: [
        {
          kind: "list",
          items: [
            "The Black-Scholes formula itself can be derived as $E^Q[e^{-r(T-t)}\\max(S_T-K,0)]$ directly, without ever writing down the PDE — the PDE and the risk-neutral expectation are the two sides of Feynman-Kac's theorem.",
            "This is why implied volatility, not implied drift, is the quantity options markets quote and trade on: the price genuinely does not depend on μ.",
            "Any new derivative — as long as its payoff is a function of assets already priced under Q — is priced by the same one-line formula, which is the entire reason risk-neutral pricing became the industry-standard framework rather than a real-world-expectation approach.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§5.2, §5.4, Risk-Neutral Pricing" },
    { source: "Harrison & Pliska, Martingales and Stochastic Integrals in the Theory of Continuous Trading", locator: "Stochastic Processes and their Applications, 1981" },
  ],
};
