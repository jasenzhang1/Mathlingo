import type { WikiArticle } from "../types";

export const derivativesOverviewWiki: WikiArticle = {
  conceptId: "derivatives-overview",

  summary:
    "A derivative is a contract whose payoff is a function of the price of something else — the underlying. " +
    "The underlying can be a stock, a bond, an interest rate, a currency, a commodity, or even a credit " +
    "event. Derivatives move risk from those who want less of it to those willing to hold more, and they are " +
    "priced not by forecasting the underlying but by **no-arbitrage**: a contract that can be replicated " +
    "with traded assets must cost what the replication costs.",

  sections: [
    {
      heading: "The main families",
      blocks: [
        {
          kind: "table",
          headers: ["Contract", "What it does", "Payoff shape"],
          rows: [
            ["Forward / future", "Obligation to buy or sell at a fixed price on a future date", "Linear: $S_T - K$"],
            ["Option", "*Right* to buy (call) or sell (put) at a fixed price", "Kinked: $\\max(S_T - K, 0)$"],
            ["Swap", "Exchange of cash flow streams on a schedule", "A series of forwards"],
            ["Credit default swap", "Payment if a borrower defaults", "Jump on a credit event"],
          ],
        },
        {
          kind: "prose",
          text:
            "Forwards and swaps cost nothing to enter and commit both sides symmetrically. Options are " +
            "asymmetric — the buyer has a right, the seller an obligation — so the buyer pays a **premium** " +
            "upfront. This linear/nonlinear split organises the rest of the chapter.",
        },
      ],
    },

    {
      heading: "Why people use them",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Hedging", description: "Reducing an existing risk. A wheat farmer sells wheat futures to fix the price of a harvest; an importer buys currency forwards to fix the cost of next quarter's invoices." },
            { term: "Speculation", description: "Taking on risk to profit from a view, often with much less capital than buying the underlying." },
            { term: "Arbitrage", description: "Locking in a riskless profit when a derivative and its replicating portfolio are mispriced relative to each other. Arbitrageurs are what keep prices consistent." },
          ],
        },
        {
          kind: "example",
          title: "Leverage cuts both ways",
          problem:
            "A stock trades at $\\$100$. A one-year call with strike $\\$100$ costs $\\$5$. Compare buying the stock with buying the call if the stock ends at $\\$110$, and at $\\$95$.",
          steps: [
            "At $\\$110$: stock returns $10\\%$. The call pays $\\$10$ on a $\\$5$ cost, a $100\\%$ return.",
            "At $\\$95$: stock returns $-5\\%$. The call expires worthless, a $-100\\%$ return.",
          ],
          answer: "The same move in the underlying is magnified about ten-fold in the option — in both directions.",
        },
      ],
    },

    {
      heading: "Where they trade",
      blocks: [
        {
          kind: "table",
          headers: ["", "Exchange-traded", "Over-the-counter (OTC)"],
          rows: [
            ["Terms", "Standardised size, dates, strikes", "Customised to the two parties"],
            ["Counterparty", "A clearing house, which guarantees both sides", "The other party directly (or a central clearer, for many swaps since $2008$)"],
            ["Collateral", "Daily margin", "Negotiated, often via a credit support agreement"],
            ["Examples", "Futures, listed stock options", "Forwards, most swaps, exotic options"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Notional is not exposure",
          text:
            "Derivatives are often sized by **notional principal** — the amount on which payments are " +
            "computed. Notional outstanding runs to hundreds of trillions of dollars worldwide, but the " +
            "market value actually at stake is a small fraction of that. The reverse error also happens: a " +
            "small upfront cost can hide a very large potential loss, as for anyone who sells options.",
        },
      ],
    },

    {
      heading: "Pricing by no-arbitrage",
      blocks: [
        {
          kind: "prose",
          text:
            "Most derivative contracts are **zero-sum**: what the long side gains, the short side loses. That is " +
            "why a derivative's price cannot depend on anyone's forecast — the buyer and seller would never " +
            "agree. Instead, if a portfolio of the underlying and riskless borrowing produces the same payoff in " +
            "every state of the world, the derivative must cost the same as that portfolio. Otherwise one could " +
            "buy the cheap one, sell the expensive one, and pocket the difference with no risk.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The law of one price, in three lessons",
          text:
            "The forward price $S_0 e^{rT}$, put–call parity, and the Black–Scholes–Merton formula all come " +
            "from this single argument, applied with progressively more sophisticated replicating portfolios: " +
            "static for forwards, static for parity, and continuously rebalanced for options in general.",
        },
      ],
    },
  ],

  references: [
    { source: "Hull, Options, Futures, and Other Derivatives", locator: "Ch. 1, Introduction" },
    { source: "Bodie, Kane & Marcus, Investments", locator: "Ch. 20, Options Markets: Introduction; Ch. 22, Futures Markets" },
  ],
};
