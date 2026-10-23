import type { WikiArticle } from "../types";

export const interestRateAndCurrencySwapsWiki: WikiArticle = {
  conceptId: "interest-rate-and-currency-swaps",

  summary:
    "A swap is an agreement to exchange two streams of cash flows on a schedule. In a plain vanilla interest " +
    "rate swap one side pays a fixed rate and the other a floating rate, both on the same notional principal, " +
    "which itself never changes hands. A currency swap exchanges interest in one currency for interest in " +
    "another, and usually does exchange the principals, at the start and at the end. Both are valued the same " +
    "way: as a long position in one bond and a short position in another.",

  sections: [
    {
      heading: "The plain vanilla interest rate swap",
      blocks: [
        {
          kind: "prose",
          text:
            "The **fixed payer** pays a fixed swap rate $K$ on notional $N$ each period and receives a floating " +
            "rate — today usually SOFR (formerly LIBOR) — set at the start of each period. Payments on the same " +
            "date are netted, so only the difference moves. The notional is only a basis for computing interest; " +
            "since both sides would owe the same principal, exchanging it would be pointless.",
        },
        {
          kind: "formula",
          latex: "\\text{net to fixed payer} = N \\cdot \\tau \\cdot (L - K)",
          caption: "$L$ is the floating rate for the period and $\\tau$ the period length in years",
        },
        {
          kind: "example",
          title: "One settlement",
          problem:
            "A swap on $\\$10$ million notional has the fixed rate at $4\\%$, with annual payments. This year's floating rate was set at $4.6\\%$. Who pays whom?",
          steps: [
            "Fixed leg: $0.04 \\times 10{,}000{,}000 = \\$400{,}000$.",
            "Floating leg: $0.046 \\times 10{,}000{,}000 = \\$460{,}000$.",
          ],
          answer: "The floating payer pays the fixed payer the net $\\$60{,}000$. A fixed payer gains when rates rise.",
        },
      ],
    },

    {
      heading: "Why swap",
      blocks: [
        {
          kind: "list",
          items: [
            "**Transforming a liability.** A firm with a floating-rate loan pays fixed in a swap; the floating payments cancel and it is left paying fixed — its loan is now effectively fixed-rate.",
            "**Transforming an asset.** An investor holding fixed-rate bonds can receive floating to make the income track short rates.",
            "**Managing duration.** Receiving fixed adds duration to a portfolio, paying fixed removes it — often cheaper than buying or selling bonds.",
            "**Comparative advantage.** Two borrowers who each have a relative edge in a different market can each borrow where they are strongest and swap, lowering both costs.",
          ],
        },
      ],
    },

    {
      heading: "Valuing a swap",
      blocks: [
        {
          kind: "formula",
          latex: "V_{\\text{fixed payer}} = B_{\\text{float}} - B_{\\text{fixed}}",
          caption: "Receive the floating leg, pay the fixed leg — each valued as if it were a bond with notional $N$",
        },
        {
          kind: "prose",
          text:
            "Adding the notional to both legs at maturity changes nothing (it cancels) and turns each leg into a " +
            "bond. A floating-rate bond is worth par right after each reset, because its coupons always pay the " +
            "current market rate. So the value comes down to how the fixed bond is priced off today's discount " +
            "factors $d_t$. At inception the **par swap rate** is the $K$ that makes the swap worth zero:",
        },
        {
          kind: "formula",
          latex: "K = \\frac{1 - d_n}{\\sum_{t=1}^{n} d_t}",
          caption: "Annual payments; $d_t$ is the discount factor for year $t$",
        },
        {
          kind: "example",
          title: "A two-year par swap rate",
          problem: "Spot rates are $s_1 = 4\\%$ and $s_2 = 5\\%$. What fixed rate makes a two-year annual swap fair?",
          steps: [
            "$d_1 = \\frac{1}{1.04} \\approx 0.9615$ and $d_2 = \\frac{1}{1.05^{2}} \\approx 0.9070$.",
            "$K = \\frac{1 - 0.9070}{0.9615 + 0.9070} = \\frac{0.0930}{1.8686}$.",
          ],
          answer: "$K \\approx 4.98\\%$ — the yield of a two-year par bond on this curve.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A swap is also a strip of forwards",
          text:
            "Each net payment $N\\tau(L - K)$ is a forward contract on that period's floating rate. Valued that " +
            "way, the swap is worth the sum of $N\\tau(f_t - K)\\,d_t$ over periods, where $f_t$ is the forward " +
            "rate. Both views give the same number; the bond view is quicker, the forward view shows which " +
            "periods the value comes from.",
        },
      ],
    },

    {
      heading: "Currency swaps",
      blocks: [
        {
          kind: "prose",
          text:
            "In a currency swap the two legs are in different currencies, so the principals are not the same " +
            "thing and are typically exchanged — at the start at the spot rate, and back again at maturity at " +
            "that same rate. In between, each side pays interest in the currency it received. Either leg can be " +
            "fixed or floating.",
        },
        {
          kind: "example",
          title: "Dollars for euros",
          problem:
            "A US firm needs euros for a European subsidiary. It enters a $5$-year swap: it pays $\\$10$ million and receives €$9$ million now, then pays $3\\%$ on the euros and receives $5\\%$ on the dollars each year. What are the cash flows?",
          steps: [
            "Start: pay $\\$10$ million, receive €$9$ million.",
            "Each year: pay €$270{,}000$ (that is, $3\\%$ of €$9$ million) and receive $\\$500{,}000$.",
            "End: pay back €$9$ million and receive $\\$10$ million.",
          ],
          answer: "The firm has effectively turned a dollar loan into a euro loan, matching its euro income — and the final exchange is at the original rate, whatever the exchange rate has done.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Currency swaps carry much more counterparty risk",
          text:
            "Because principal is exchanged at the end at a rate fixed years earlier, a large exchange-rate move " +
            "can leave one side owing far more than any single interest payment. An interest rate swap's exposure " +
            "is just the net interest differences, a small fraction of notional.",
        },
      ],
    },
  ],

  references: [
    { source: "Hull, Options, Futures, and Other Derivatives", locator: "Ch. 7, Swaps" },
    { source: "Bodie, Kane & Marcus, Investments", locator: "Ch. 23, Futures, Swaps, and Risk Management" },
  ],
};
