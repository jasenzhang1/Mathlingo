import type { WikiArticle } from "../types";

export const forwardsAndFuturesWiki: WikiArticle = {
  conceptId: "forwards-and-futures",

  summary:
    "A forward contract fixes today the price $K$ at which an asset will be bought and sold on a future date " +
    "$T$. The long side profits $S_T - K$ if the asset ends up worth more; the short side gains exactly what " +
    "the long loses. A futures contract is the same economic bet made standardised, exchange-traded and " +
    "settled daily. The fair forward price follows from a single no-arbitrage argument: buying the asset now " +
    "and holding it must cost the same as agreeing to buy it later.",

  sections: [
    {
      heading: "Payoffs",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{long: } S_T - K \\qquad\\qquad \\text{short: } K - S_T",
          caption: "Linear in the final price, and the two sides sum to zero",
        },
        {
          kind: "prose",
          text:
            "Entering a forward costs nothing, because $K$ is chosen to make the contract worth zero at the " +
            "start. Its value then drifts as $S_t$ moves. Unlike an option, there is no right to walk away: a " +
            "long position can lose as much as $K$ if the asset becomes worthless.",
        },
      ],
    },

    {
      heading: "The no-arbitrage forward price",
      blocks: [
        {
          kind: "formula",
          latex: "F_0 = S_0\\, e^{rT}",
          caption: "For an asset with no income or storage cost, under continuous compounding (discretely, $F_0 = S_0(1 + r)^{T}$)",
        },
        {
          kind: "prose",
          text:
            "Two ways to own the asset at $T$: buy it today for $S_0$, financed by borrowing, owing $S_0 e^{rT}$ " +
            "at $T$; or agree to buy it at $T$ for $F_0$. Both end with the asset and a fixed payment due at $T$, " +
            "so the payments must match. Notice that the expected future spot price never appears — the forward " +
            "price is a financing calculation, not a forecast.",
        },
        {
          kind: "table",
          headers: ["Underlying", "Forward price", "Why"],
          rows: [
            ["No income", "$S_0 e^{rT}$", "Pure cost of financing"],
            ["Known cash income, PV $I$", "$(S_0 - I)\\,e^{rT}$", "Holder of the asset receives the income; forward holder does not"],
            ["Continuous yield $q$ (index, currency)", "$S_0 e^{(r - q)T}$", "For a currency, $q$ is the foreign interest rate"],
            ["Commodity with storage cost $u$", "$S_0 e^{(r + u)T}$", "Holding the physical asset costs money (upper bound if there is a convenience yield)"],
          ],
        },
        {
          kind: "example",
          title: "Cash-and-carry arbitrage",
          problem:
            "A non-dividend stock trades at $\\$100$ and $r = 5\\%$ continuously compounded. A one-year forward is quoted at $\\$107$. Is there an arbitrage?",
          steps: [
            "Fair price: $F_0 = 100\\,e^{0.05} \\approx \\$105.13$. The quote is too high.",
            "Today: borrow $\\$100$, buy the stock, and short the forward at $\\$107$. Net cost $0$.",
            "At $T$: deliver the stock for $\\$107$ and repay the loan, $\\$105.13$.",
          ],
          answer: "A riskless profit of about $\\$1.87$ per share. If the quote were too low, reverse every step (*reverse cash-and-carry*: short the stock, lend the proceeds, go long the forward).",
        },
        {
          kind: "prose",
          text:
            "Later in the contract's life, a forward struck at $K$ is worth $f_t = (F_t - K)\\,e^{-r(T - t)}$ to the " +
            "long side, where $F_t$ is today's forward price for the same date: the difference in delivery " +
            "prices, discounted back from $T$.",
        },
      ],
    },

    {
      heading: "Futures: standardised and marked to market",
      blocks: [
        {
          kind: "table",
          headers: ["", "Forward", "Futures"],
          rows: [
            ["Where", "OTC, private", "Exchange"],
            ["Terms", "Customised", "Standard size, dates, grades"],
            ["Counterparty risk", "Bilateral", "Clearing house stands between both sides"],
            ["Settlement", "Once, at maturity", "Daily gains and losses through margin accounts"],
            ["Usual ending", "Delivery or cash settlement", "Closed out before delivery"],
          ],
        },
        {
          kind: "prose",
          text:
            "Each trader posts an **initial margin**. Every day the contract is *marked to market*: the day's " +
            "price change is credited to one side's account and debited from the other's. If an account falls " +
            "below the **maintenance margin**, the trader gets a margin call and must top it back up to the " +
            "initial level. Losses are therefore settled as they happen, so no one can build up a large unpaid debt.",
        },
        {
          kind: "example",
          title: "A margin call",
          problem:
            "Go long one futures contract on $100$ units at $\\$80$. Initial margin is $\\$1{,}000$ and maintenance margin is $\\$750$. The price falls to $\\$77$. What happens?",
          steps: [
            "Loss: $(77 - 80) \\times 100 = -\\$300$, leaving $\\$700$ in the account.",
            "$\\$700 < \\$750$, triggering a margin call.",
          ],
          answer: "Deposit $\\$300$ to restore the account to $\\$1{,}000$, or the position is closed.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Basis converges to zero",
          text:
            "The basis, spot price minus futures price, must shrink to zero at delivery — otherwise one could " +
            "buy the cheaper of the two and deliver into the dearer at expiry. A hedger who closes out before " +
            "delivery is left with *basis risk*: the uncertainty about where the basis will be on that day. " +
            "A futures price above spot is called **contango**; below spot, **backwardation**.",
        },
      ],
    },
  ],

  references: [
    { source: "Hull, Options, Futures, and Other Derivatives", locator: "Ch. 2, Futures Markets and Central Counterparties; Ch. 5, Determination of Forward and Futures Prices" },
    { source: "Bodie, Kane & Marcus, Investments", locator: "Ch. 22, Futures Markets; Ch. 23, Futures, Swaps, and Risk Management" },
  ],
};
