import type { WikiArticle } from "../types";

export const creditDefaultSwapsWiki: WikiArticle = {
  conceptId: "credit-default-swaps",

  summary:
    "A credit default swap is insurance against a borrower defaulting. The protection buyer pays a regular " +
    "premium, the CDS spread, on a notional amount; if the reference entity suffers a credit event, the " +
    "protection seller pays the loss — notional times one minus the recovery rate. Pricing a CDS comes down to " +
    "one question: how likely is default, and how much is recovered when it happens? Turned around, CDS " +
    "spreads are the market's most direct readout of default probabilities.",

  sections: [
    {
      heading: "Mechanics",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Reference entity", description: "The company or government whose default is insured. Neither party needs to own its bonds." },
            { term: "Spread $s$", description: "Annual premium as a fraction of notional, quoted in basis points and usually paid quarterly." },
            { term: "Credit event", description: "Bankruptcy, failure to pay, and (for some contracts) restructuring, as defined by standard ISDA terms." },
            { term: "Recovery rate $R$", description: "The fraction of face value bondholders recover after default, typically set by an industry auction of the defaulted bonds." },
            { term: "Settlement", description: "Physical — deliver a defaulted bond and receive par — or cash — receive $(1 - R) \\times$ notional. Cash settlement via auction is now standard." },
          ],
        },
        {
          kind: "example",
          title: "Cash flows of a CDS",
          problem:
            "Buy $5$-year protection on $\\$10$ million notional at a spread of $150$ basis points, paid quarterly. The entity defaults in year $3$ with $30\\%$ recovery. What changes hands?",
          steps: [
            "Each quarter until default, the buyer pays $\\frac{0.015 \\times 10{,}000{,}000}{4} = \\$37{,}500$.",
            "On default the seller pays $(1 - 0.30) \\times 10{,}000{,}000 = \\$7{,}000{,}000$.",
            "Premiums stop, apart from the accrued premium owed up to the default date.",
          ],
          answer: "The buyer has paid roughly $\\$400{,}000$ in premiums and receives $\\$7$ million.",
        },
      ],
    },

    {
      heading: "Pricing: the two legs",
      blocks: [
        {
          kind: "prose",
          text:
            "A CDS is fairly priced when the expected present value of the premiums (the **premium leg**) equals " +
            "the expected present value of the default payment (the **protection leg**). Modelling default as " +
            "the first jump of a Poisson process with constant **hazard rate** $\\lambda$ gives survival " +
            "probability $Q(t) = e^{-\\lambda t}$, so default is a rate-$\\lambda$ event per year of survival.",
        },
        {
          kind: "formula",
          latex: "s \\approx \\lambda\\,(1 - R)",
          caption: "The credit triangle: spread $\\approx$ default intensity $\\times$ loss given default",
        },
        {
          kind: "prose",
          text:
            "Intuitively, each year the seller receives $s$ and expects to pay $(1 - R)$ with probability about " +
            "$\\lambda$. Setting the two equal gives the triangle, which is exact for continuous premiums and a " +
            "flat hazard rate, and a very good approximation otherwise.",
        },
        {
          kind: "example",
          title: "Reading a default probability from a spread",
          problem: "A $5$-year CDS trades at $200$ basis points and the market assumes $40\\%$ recovery. What default probabilities are implied?",
          steps: [
            "$\\lambda \\approx \\frac{0.02}{1 - 0.40} \\approx 0.0333$ per year.",
            "One year: $1 - e^{-0.0333} \\approx 3.3\\%$.",
            "Five years: $1 - e^{-0.1667} \\approx 15.4\\%$.",
          ],
          answer: "About $3.3\\%$ in the first year and $15.4\\%$ over five years.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Risk-neutral, not real-world",
          text:
            "These are risk-neutral probabilities. They include a premium for bearing default risk, liquidity " +
            "and uncertainty about recovery, and are typically several times higher than default rates " +
            "historically observed for the same rating.",
        },
      ],
    },

    {
      heading: "Uses and the CDS–bond basis",
      blocks: [
        {
          kind: "list",
          items: [
            "**Hedging.** A bank with a large loan to a company buys protection rather than selling the loan.",
            "**Expressing a credit view.** Selling protection is like owning the company's bond without funding it; buying protection without owning the bond (a *naked* CDS) is a short bet on its credit.",
            "**Arbitrage.** A bond plus CDS protection is close to riskless, so its yield should be near the risk-free rate. The gap — the CDS spread minus the bond's spread over the risk-free rate — is the **CDS–bond basis**, and traders bet on it closing.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Who insures the insurer?",
          text:
            "Protection is only as good as the seller's ability to pay, and defaults tend to cluster in crises — " +
            "exactly when sellers are weakest. In $2008$ AIG had sold protection on a huge scale without " +
            "holding enough collateral and needed a government rescue. Since then most standardised CDS clear " +
            "through central counterparties, trade with fixed coupons ($100$ or $500$ basis points) plus an " +
            "upfront payment, and require daily margin.",
        },
      ],
    },
  ],

  references: [
    { source: "Hull, Options, Futures, and Other Derivatives", locator: "Ch. 24, Credit Risk; Ch. 25, Credit Derivatives" },
    { source: "O'Kane, Modelling Single-name and Multi-name Credit Derivatives", locator: "Ch. 5, The CDS Contract; Ch. 6, A Valuation Model for Credit Default Swaps" },
  ],
};
