import type { WikiArticle } from "../types";

export const optionPricingAndGreeksWiki: WikiArticle = {
  conceptId: "option-pricing-and-greeks",

  summary:
    "If the stock follows geometric Brownian motion, an option can be replicated by continuously adjusting a " +
    "position in the stock and a bond, and the Black–Scholes–Merton formula is the cost of that replication. " +
    "It needs five inputs, and only one of them — volatility — cannot be read off a screen. The **Greeks** " +
    "are the formula's partial derivatives with respect to each input: they say how the option's price " +
    "responds to the stock, to volatility, to time and to rates, and they are how option books are hedged.",

  sections: [
    {
      heading: "The Black–Scholes–Merton formula",
      blocks: [
        {
          kind: "formula",
          latex: "C = S_0\\,N(d_1) - Ke^{-rT}N(d_2) \\qquad\\qquad P = Ke^{-rT}N(-d_2) - S_0\\,N(-d_1)",
        },
        {
          kind: "formula",
          latex: "d_1 = \\frac{\\ln\\left(\\frac{S_0}{K}\\right) + \\left(r + \\frac{\\sigma^{2}}{2}\\right)T}{\\sigma\\sqrt{T}} \\qquad\\qquad d_2 = d_1 - \\sigma\\sqrt{T}",
          caption: "$N$ is the standard normal CDF; European options on a non-dividend stock",
        },
        {
          kind: "definitions",
          items: [
            { term: "Inputs", description: "Stock price $S_0$, strike $K$, time to expiry $T$, risk-free rate $r$, and volatility $\\sigma$ of the stock's log returns." },
            { term: "Assumptions", description: "$dS = \\mu S\\,dt + \\sigma S\\,dW$ with constant $\\sigma$ and $r$; no dividends, transaction costs or arbitrage; continuous trading; borrowing and short selling allowed." },
            { term: "$N(d_2)$", description: "The risk-neutral probability that the call finishes in the money, $\\mathbb{P}^{Q}(S_T > K)$." },
            { term: "$N(d_1)$", description: "The call's delta — the number of shares in the replicating portfolio." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The expected return $\\mu$ is missing",
          text:
            "Two traders who disagree completely about where the stock is heading still agree on the option " +
            "price, because the option can be hedged with the stock and the hedge removes all exposure to " +
            "$\\mu$. Under the risk-neutral measure every asset grows at $r$, and the formula is just " +
            "$e^{-rT}\\,\\mathbb{E}^{Q}\\left[\\max(S_T - K, 0)\\right]$ — see the Stochastic Calculus lessons on the " +
            "BSM equation and risk-neutral pricing.",
        },
        {
          kind: "example",
          title: "Pricing an at-the-money call",
          problem: "$S_0 = K = \\$100$, $T = 1$, $r = 5\\%$, $\\sigma = 20\\%$. Price the call and put.",
          steps: [
            "$d_1 = \\frac{0 + (0.05 + 0.02)}{0.2} = 0.35$, and $d_2 = 0.35 - 0.2 = 0.15$.",
            "$N(0.35) \\approx 0.6368$, $N(0.15) \\approx 0.5596$, and $Ke^{-rT} \\approx 95.12$.",
            "$C = 100 \\times 0.6368 - 95.12 \\times 0.5596 \\approx 63.68 - 53.23$.",
            "By put–call parity, $P = C - S_0 + Ke^{-rT} = 10.45 - 100 + 95.12$.",
          ],
          answer: "$C \\approx \\$10.45$ and $P \\approx \\$5.57$.",
        },
      ],
    },

    {
      heading: "The Greeks",
      blocks: [
        {
          kind: "table",
          headers: ["Greek", "Measures", "Call (BSM)", "Sign for a long option"],
          rows: [
            ["Delta $\\Delta = \\frac{\\partial V}{\\partial S}$", "Price change per $\\$1$ in the stock", "$N(d_1)$", "Call $0$ to $1$; put $-1$ to $0$"],
            ["Gamma $\\Gamma = \\frac{\\partial^{2} V}{\\partial S^{2}}$", "Change in delta per $\\$1$ in the stock", "$\\frac{\\varphi(d_1)}{S_0\\sigma\\sqrt{T}}$", "Positive, same for call and put"],
            ["Vega $\\frac{\\partial V}{\\partial \\sigma}$", "Price change per unit of volatility", "$S_0\\,\\varphi(d_1)\\sqrt{T}$", "Positive, same for call and put"],
            ["Theta $\\Theta = \\frac{\\partial V}{\\partial t}$", "Price change as time passes", "$-\\frac{S_0\\varphi(d_1)\\sigma}{2\\sqrt{T}} - rKe^{-rT}N(d_2)$", "Usually negative (time decay)"],
            ["Rho $\\rho = \\frac{\\partial V}{\\partial r}$", "Price change per unit of interest rate", "$KTe^{-rT}N(d_2)$", "Call positive, put negative"],
          ],
          caption: "$\\varphi$ is the standard normal density. A put's delta is $N(d_1) - 1$",
        },
        {
          kind: "example",
          title: "Greeks of the at-the-money call",
          problem: "For the call above ($d_1 = 0.35$, $\\varphi(0.35) \\approx 0.3752$), compute the Greeks and estimate the call's price if the stock rises to $\\$101$.",
          steps: [
            "$\\Delta = 0.637$ and $\\Gamma = \\frac{0.3752}{100 \\times 0.2} \\approx 0.0188$.",
            "Vega $= 100 \\times 0.3752 \\approx 37.5$, or about $\\$0.375$ per volatility point.",
            "$\\Theta \\approx -3.75 - 2.66 = -6.41$ per year, about $-\\$0.018$ per calendar day.",
            "$\\rho = 100 \\times 0.9512 \\times 0.5596 \\approx 53.2$, or about $\\$0.53$ per percentage point of rates.",
            "Second-order estimate: $\\Delta V \\approx 0.637 \\times 1 + \\frac{1}{2} \\times 0.0188 \\times 1^{2} \\approx 0.646$.",
          ],
          answer: "The call rises to about $\\$11.10$.",
        },
      ],
    },

    {
      heading: "How the Greeks behave",
      blocks: [
        {
          kind: "list",
          items: [
            "**Delta** moves toward $1$ for a deep in-the-money call and toward $0$ for a deep out-of-the-money one. Near expiry it snaps between them as the stock crosses $K$.",
            "**Gamma and vega** peak at the money. Gamma grows sharply near expiry; vega is largest for long-dated options.",
            "**Theta** is most negative for at-the-money options close to expiry — that is where time value disappears fastest.",
            "**Delta hedging**: a call writer holds $\\Delta$ shares per option, making the position insensitive to small moves. Gamma says how often the hedge must be rebalanced.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Gamma and theta are two sides of one trade",
          text:
            "For a delta-hedged position the BSM equation reduces to $\\Theta + \\frac{1}{2}\\sigma^{2}S^{2}\\Gamma = r(V - \\Delta S)$. " +
            "Ignoring the small interest term, a long-gamma position must pay theta every day: owning options " +
            "profits from large moves and bleeds when the stock sits still. Selling options is the reverse.",
        },
      ],
    },

    {
      heading: "Implied volatility",
      blocks: [
        {
          kind: "prose",
          text:
            "Since $C$ is increasing in $\\sigma$, a market price can be inverted to find the volatility that " +
            "reproduces it — the **implied volatility**. Traders quote options in implied volatility rather " +
            "than dollars, because it puts different strikes and expiries on a common scale.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The smile says the model is wrong",
          text:
            "If BSM were exactly right, every option on the same stock would have the same implied volatility. " +
            "In practice it varies with strike — a *smile* or, for equity indices, a downward *skew* where " +
            "low-strike puts are expensive. That reflects fat tails and crash risk that geometric Brownian " +
            "motion leaves out. The formula survives as a quoting convention, with volatility as the fudge factor.",
        },
      ],
    },
  ],

  references: [
    { source: "Hull, Options, Futures, and Other Derivatives", locator: "Ch. 15, The Black–Scholes–Merton Model; Ch. 19, The Greek Letters" },
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "Ch. 4, §4.5, Black–Scholes–Merton Equation" },
  ],
};
