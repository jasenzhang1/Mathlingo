import type { WikiArticle } from "../types";

export const optionsCallsAndPutsWiki: WikiArticle = {
  conceptId: "options-calls-and-puts",

  summary:
    "An option gives its holder a right without an obligation. A **call** is the right to buy the underlying " +
    "at a fixed strike price $K$; a **put** is the right to sell at $K$. The holder exercises only when it " +
    "pays to, so the worst outcome is losing the premium paid upfront. The writer, who receives that " +
    "premium, has the matching obligation. That asymmetry — limited downside for the buyer, paid for in " +
    "advance — is what separates options from forwards.",

  sections: [
    {
      heading: "Contract terms",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Strike $K$", description: "The price at which the underlying can be bought (call) or sold (put)." },
            { term: "Expiration $T$", description: "The last date the right can be used." },
            { term: "Premium", description: "The option's price, paid by the buyer to the writer when the contract is opened." },
            { term: "European / American", description: "A European option can be exercised only at $T$; an American option at any time up to $T$. The names have nothing to do with geography." },
            { term: "Contract size", description: "A US listed equity option covers $100$ shares; prices are quoted per share." },
          ],
        },
      ],
    },

    {
      heading: "Four basic positions",
      blocks: [
        {
          kind: "table",
          headers: ["Position", "View", "Maximum gain", "Maximum loss"],
          rows: [
            ["Long call", "Price will rise", "Unlimited", "Premium"],
            ["Short call", "Price won't rise much", "Premium", "Unlimited"],
            ["Long put", "Price will fall", "$K -$ premium", "Premium"],
            ["Short put", "Price won't fall much", "Premium", "$K -$ premium"],
          ],
        },
        {
          kind: "prose",
          text:
            "**Payoff** is what the option is worth at expiry; **profit** subtracts the premium. A long call " +
            "breaks even at $K + \\text{premium}$, a long put at $K - \\text{premium}$. Writers accept large " +
            "potential losses because, most of the time, options expire worthless and they keep the premium — " +
            "they are effectively selling insurance.",
        },
        {
          kind: "example",
          title: "Payoff and profit",
          problem:
            "A call with $K = \\$50$ costs $\\$3$; a put with $K = \\$50$ costs $\\$2$. At expiry the stock is at $\\$58$ in one scenario and $\\$44$ in another. Find each option's profit to its buyer.",
          steps: [
            "At $\\$58$: call pays $58 - 50 = \\$8$, profit $\\$5$. Put expires worthless, profit $-\\$2$.",
            "At $\\$44$: call expires worthless, profit $-\\$3$. Put pays $50 - 44 = \\$6$, profit $\\$4$.",
          ],
          answer: "Breakevens are $\\$53$ for the call and $\\$48$ for the put.",
        },
      ],
    },

    {
      heading: "Moneyness, intrinsic value and time value",
      blocks: [
        {
          kind: "table",
          headers: ["", "Call", "Put"],
          rows: [
            ["In the money", "$S > K$", "$S < K$"],
            ["At the money", "$S = K$", "$S = K$"],
            ["Out of the money", "$S < K$", "$S > K$"],
          ],
        },
        {
          kind: "formula",
          latex: "\\text{option price} = \\underbrace{\\max(S - K, 0)}_{\\text{intrinsic value (call)}} + \\text{time value}",
        },
        {
          kind: "prose",
          text:
            "Intrinsic value is what exercising right now would be worth. Time value is the extra the market " +
            "pays for the chance that things improve before expiry. It is largest for at-the-money options " +
            "with a long time left and in a volatile stock, and it decays to zero at expiry. A call at $\\$7$ " +
            "with $K = \\$50$ on a $\\$55$ stock has $\\$5$ of intrinsic value and $\\$2$ of time value.",
        },
      ],
    },

    {
      heading: "No-arbitrage bounds",
      blocks: [
        {
          kind: "table",
          headers: ["Option", "Lower bound", "Upper bound"],
          rows: [
            ["European call (no dividends)", "$\\max\\left(S_0 - Ke^{-rT}, 0\\right)$", "$S_0$"],
            ["European put (no dividends)", "$\\max\\left(Ke^{-rT} - S_0, 0\\right)$", "$Ke^{-rT}$"],
          ],
        },
        {
          kind: "prose",
          text:
            "A call can never be worth more than the stock it lets you buy, and a put never more than the " +
            "present value of the strike it lets you collect. The call's lower bound exceeds its intrinsic value " +
            "$S_0 - K$ whenever $r > 0$, because paying $K$ later is cheaper than paying it now.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Never exercise an American call early on a non-dividend stock",
          text:
            "Exercising gets you $S - K$. Selling the call gets you at least $S - Ke^{-r(T - t)}$, which is " +
            "more. Exercising early also throws away the time value and pays the strike sooner than necessary. " +
            "So an American call on a non-dividend stock is worth exactly the same as the European one. The " +
            "argument fails for puts — a deep in-the-money American put can be worth exercising early to collect " +
            "$K$ and earn interest on it.",
        },
      ],
    },
  ],

  references: [
    { source: "Hull, Options, Futures, and Other Derivatives", locator: "Ch. 10, Mechanics of Options Markets; Ch. 11, Properties of Stock Options" },
    { source: "Bodie, Kane & Marcus, Investments", locator: "Ch. 20, Options Markets: Introduction" },
  ],
};
