import type { WikiArticle } from "../types";

export const optionPayoffAndPutCallParityWiki: WikiArticle = {
  conceptId: "option-payoff-and-put-call-parity",

  summary:
    "At expiry a call pays $\\max(S_T - K, 0)$ and a put pays $\\max(K - S_T, 0)$ — straight lines with a " +
    "single kink at the strike. Because payoffs add, combining calls, puts, stock and bonds builds almost " +
    "any shape of bet. One combination is special: a call plus a bond pays exactly what a put plus the stock " +
    "pays, in every outcome. That forces an exact identity between their prices, **put–call parity**, which " +
    "holds regardless of any model of how the stock moves.",

  sections: [
    {
      heading: "Payoff diagrams",
      blocks: [
        {
          kind: "table",
          headers: ["Position", "Payoff at $T$", "Shape"],
          rows: [
            ["Long call", "$\\max(S_T - K, 0)$", "Flat at $0$, then slope $+1$ above $K$"],
            ["Long put", "$\\max(K - S_T, 0)$", "Slope $-1$ below $K$, then flat at $0$"],
            ["Short call", "$-\\max(S_T - K, 0)$", "Flat at $0$, then slope $-1$ above $K$"],
            ["Short put", "$-\\max(K - S_T, 0)$", "Slope $+1$ below $K$, then flat at $0$"],
            ["Long stock", "$S_T$", "Slope $+1$ everywhere"],
            ["Zero-coupon bond paying $K$", "$K$", "Flat at $K$"],
          ],
        },
        {
          kind: "prose",
          text:
            "Payoff diagrams plot value at expiry against $S_T$ and ignore what was paid. Profit diagrams " +
            "shift the payoff line down by the net premium. Since every payoff is piecewise linear, a combined " +
            "position's diagram is found by adding slopes on each interval between strikes.",
        },
      ],
    },

    {
      heading: "Common strategies",
      blocks: [
        {
          kind: "table",
          headers: ["Strategy", "Construction", "Bet"],
          rows: [
            ["Covered call", "Long stock $+$ short call", "Flat to mildly up; gives up upside for premium income"],
            ["Protective put", "Long stock $+$ long put", "Insurance: losses floored at $K$"],
            ["Bull call spread", "Long call at $K_1$ $+$ short call at $K_2 > K_1$", "Moderate rise, cheaper than a call alone"],
            ["Straddle", "Long call $+$ long put, same $K$", "A big move in either direction"],
            ["Strangle", "Long put at $K_1$ $+$ long call at $K_2 > K_1$", "A very big move; cheaper than a straddle"],
            ["Butterfly", "Long $K_1$, short two $K_2$, long $K_3$ calls", "Price stays near $K_2$"],
          ],
        },
        {
          kind: "example",
          title: "A straddle",
          problem: "Buy a call and a put, both $K = \\$100$, for $\\$6$ and $\\$5$. Where does the position profit at expiry?",
          steps: [
            "Total premium: $\\$11$.",
            "Payoff is $|S_T - 100|$, so profit is $|S_T - 100| - 11$.",
          ],
          answer: "Profitable if $S_T < \\$89$ or $S_T > \\$111$. The worst case is a loss of $\\$11$ at exactly $S_T = \\$100$ — a pure bet on volatility.",
        },
      ],
    },

    {
      heading: "Put–call parity",
      blocks: [
        {
          kind: "formula",
          latex: "C - P = S_0 - Ke^{-rT}",
          caption: "European options with the same strike $K$ and expiry $T$, on a non-dividend stock. With discrete compounding, $Ke^{-rT}$ becomes $\\frac{K}{(1 + r)^{T}}$",
        },
        {
          kind: "prose",
          text:
            "Compare two portfolios. **A**: one call plus a zero-coupon bond paying $K$ at $T$. **B**: one put " +
            "plus one share. At expiry, if $S_T > K$, A is worth $(S_T - K) + K = S_T$ and B is worth $0 + S_T = S_T$. " +
            "If $S_T \\le K$, A is worth $0 + K = K$ and B is worth $(K - S_T) + S_T = K$. Both always pay " +
            "$\\max(S_T, K)$, so they must cost the same today: $C + Ke^{-rT} = P + S_0$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Model-free",
          text:
            "Nothing about volatility, drift or the distribution of $S_T$ was used — only that the two " +
            "portfolios have identical payoffs. Parity therefore holds whatever pricing model is right, and " +
            "it says a call and a put at the same strike must share the same implied volatility.",
        },
        {
          kind: "prose",
          text:
            "Rearranging gives **synthetic** positions: a long stock equals long call, short put, plus a bond " +
            "($S_0 = C - P + Ke^{-rT}$); a put equals a call, short stock, and a bond. With known dividends of " +
            "present value $D$, replace $S_0$ by $S_0 - D$. For American options parity becomes a pair of " +
            "inequalities, because of the early-exercise right.",
        },
      ],
    },

    {
      heading: "Using parity",
      blocks: [
        {
          kind: "example",
          title: "Pricing a put from a call",
          problem: "$S_0 = \\$100$, $K = \\$100$, $T = 1$ year, $r = 5\\%$ continuously compounded, and the call costs $\\$10.45$. What must the put cost?",
          steps: [
            "$Ke^{-rT} = 100\\,e^{-0.05} \\approx 95.12$.",
            "$P = C - S_0 + Ke^{-rT} = 10.45 - 100 + 95.12$.",
          ],
          answer: "$P \\approx \\$5.57$.",
        },
        {
          kind: "example",
          title: "Exploiting a violation",
          problem: "Same setup, but the put is quoted at $\\$6.50$. Construct an arbitrage.",
          steps: [
            "The put is $\\$0.93$ too expensive, so sell it and buy the synthetic put.",
            "Sell the put ($+6.50$), buy the call ($-10.45$), short the stock ($+100$), lend $Ke^{-rT}$ ($-95.12$).",
            "Net today: $+\\$0.93$.",
            "At $T$ the synthetic put exactly offsets the put sold, whatever $S_T$ is.",
          ],
          answer: "A riskless $\\$0.93$ today with no net obligation at expiry.",
        },
      ],
    },
  ],

  references: [
    { source: "Hull, Options, Futures, and Other Derivatives", locator: "Ch. 11, Properties of Stock Options; Ch. 12, Trading Strategies Involving Options" },
    { source: "Bodie, Kane & Marcus, Investments", locator: "Ch. 20, Options Markets: Introduction" },
  ],
};
