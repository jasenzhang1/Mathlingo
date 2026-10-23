import type { WikiArticle } from "../types";

export const yieldCurveAndTermStructureWiki: WikiArticle = {
  conceptId: "yield-curve-and-term-structure",

  summary:
    "Yield to maturity uses one rate for every date. The market actually has a different rate for every " +
    "maturity, and the yield curve plots them: yield against time to maturity, for bonds that are otherwise " +
    "alike (usually Treasuries). The underlying object is the term structure of **spot rates** — the yield " +
    "on a zero-coupon bond for each maturity — from which discount factors, forward rates and the price of " +
    "any default-free bond follow. Its shape is read as a forecast of future rates and growth.",

  sections: [
    {
      heading: "Spot rates and discount factors",
      blocks: [
        {
          kind: "formula",
          latex: "d_t = \\frac{1}{(1 + s_t)^{t}} \\qquad\\qquad P = \\sum_{t} CF_t \\, d_t",
          caption: "Each cash flow is discounted at the spot rate for its own date",
        },
        {
          kind: "prose",
          text:
            "The spot rate $s_t$ is the annual yield on a zero-coupon bond maturing at $t$, and $d_t$ is the " +
            "price today of $\\$1$ paid at $t$. A coupon bond is a bundle of zeros — one per payment — so its " +
            "no-arbitrage price uses each $d_t$ separately. Its YTM is then a kind of weighted average of the " +
            "spot rates, dominated by the maturity where most of the value sits.",
        },
      ],
    },

    {
      heading: "Bootstrapping the curve",
      blocks: [
        {
          kind: "prose",
          text:
            "Few maturities have liquid zero-coupon bonds, so spot rates are extracted from coupon bonds one " +
            "maturity at a time. The shortest bond gives $s_1$ directly; each longer bond then has exactly one " +
            "unknown — its final spot rate — because all earlier payments are discounted with rates already found.",
        },
        {
          kind: "example",
          title: "Bootstrapping a two-year spot rate",
          problem:
            "A $1$-year zero yields $4\\%$. A $2$-year bond with face $100$ and a $6\\%$ annual coupon trades at $101.50$. Find $s_2$.",
          steps: [
            "$101.50 = \\frac{6}{1.04} + \\frac{106}{(1 + s_2)^{2}}$.",
            "$\\frac{6}{1.04} \\approx 5.769$, so $\\frac{106}{(1 + s_2)^{2}} \\approx 95.731$.",
            "$(1 + s_2)^{2} \\approx \\frac{106}{95.731} \\approx 1.10727$, and $\\sqrt{1.10727} \\approx 1.0523$.",
          ],
          answer: "$s_2 \\approx 5.23\\%$.",
        },
      ],
    },

    {
      heading: "Forward rates",
      blocks: [
        {
          kind: "formula",
          latex: "(1 + s_2)^{2} = (1 + s_1)(1 + f_{1,2}) \\quad\\Longrightarrow\\quad f_{1,2} = \\frac{(1 + s_2)^{2}}{1 + s_1} - 1",
          caption: "Two routes to year $2$ must grow money identically, or one could be borrowed and the other lent",
        },
        {
          kind: "prose",
          text:
            "The forward rate $f_{1,2}$ is the rate for borrowing between years $1$ and $2$ that can be locked " +
            "in today. In general $(1 + s_{t_2})^{t_2} = (1 + s_{t_1})^{t_1}(1 + f_{t_1,t_2})^{t_2 - t_1}$; with " +
            "continuous compounding this becomes the cleaner $f_{t_1,t_2} = \\frac{s_{t_2} t_2 - s_{t_1} t_1}{t_2 - t_1}$. " +
            "An upward-sloping spot curve implies forward rates above the spot rates.",
        },
        {
          kind: "example",
          title: "Implied forward rate",
          problem: "Spot rates are $s_1 = 4\\%$ and $s_2 = 5\\%$. What one-year rate, one year from now, is implied?",
          steps: ["$f_{1,2} = \\frac{1.05^{2}}{1.04} - 1 = \\frac{1.1025}{1.04} - 1 \\approx 0.0601$."],
          answer: "$f_{1,2} \\approx 6.01\\%$ — the two-year spot rate is roughly the average of $4\\%$ and $6.01\\%$.",
        },
      ],
    },

    {
      heading: "Shapes and what they suggest",
      blocks: [
        {
          kind: "table",
          headers: ["Shape", "Pattern", "Usual reading"],
          rows: [
            ["Normal (upward)", "Long yields above short", "Steady growth; investors paid extra to lend longer"],
            ["Flat", "Similar yields at all maturities", "Transition; the market sees rates roughly unchanged"],
            ["Inverted (downward)", "Short yields above long", "Expected rate cuts — historically a leading recession signal"],
            ["Humped", "Middle maturities highest", "Rates expected to rise, then fall"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why an inversion is watched",
          text:
            "Central banks set short rates; long rates reflect where the market expects short rates to go. " +
            "When long yields fall below short ones, the market is forecasting that the central bank will " +
            "cut — which it typically does when the economy weakens. The $10$-year minus $3$-month Treasury " +
            "spread has turned negative ahead of most US recessions since the $1960$s, though the lag varies widely.",
        },
      ],
    },

    {
      heading: "Theories of the term structure",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Expectations hypothesis", description: "Forward rates equal expected future spot rates. An upward curve means rates are expected to rise." },
            { term: "Liquidity preference", description: "Lenders demand a premium for tying money up longer, so forward rates exceed expected spot rates. Explains why the curve slopes up on average even when no rise is expected." },
            { term: "Market segmentation", description: "Different investors (banks short, pension funds long) stick to their own maturities, so each segment's rate is set by its own supply and demand." },
            { term: "Preferred habitat", description: "Investors have favourite maturities but will move for a high enough premium — a middle ground between the last two." },
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Luenberger, Investment Science", locator: "Ch. 4, The Term Structure of Interest Rates" },
    { source: "Hull, Options, Futures, and Other Derivatives", locator: "Ch. 4, Interest Rates" },
    { source: "Bodie, Kane & Marcus, Investments", locator: "Ch. 15, The Term Structure of Interest Rates" },
  ],
};
