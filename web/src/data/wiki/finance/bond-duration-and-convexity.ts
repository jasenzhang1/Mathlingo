import type { WikiArticle } from "../types";

export const bondDurationAndConvexityWiki: WikiArticle = {
  conceptId: "bond-duration-and-convexity",

  summary:
    "A bond's price is a smooth, decreasing, convex function of its yield. Duration is the first-order " +
    "term of its Taylor expansion — how much the price moves, in percent, per unit change in yield. " +
    "Convexity is the second-order term, correcting for the curvature that makes duration underestimate " +
    "gains and overstate losses. Together they are the working tools of interest-rate risk management.",

  sections: [
    {
      heading: "Macaulay and modified duration",
      blocks: [
        {
          kind: "formula",
          latex: "D_{\\text{Mac}} = \\sum_{t} t \\cdot \\frac{CF_t / (1 + y)^{t}}{P} \\qquad\\qquad D_{\\text{mod}} = \\frac{D_{\\text{Mac}}}{1 + y/m}",
          caption: "Macaulay duration is a present-value-weighted average time to payment",
        },
        {
          kind: "prose",
          text:
            "Each weight $\\frac{CF_t/(1 + y)^{t}}{P}$ is the share of the bond's value paid at time $t$, and " +
            "the weights sum to $1$. So $D_{\\text{Mac}}$ is measured in years and lies between the first " +
            "payment date and maturity. A zero-coupon bond has all its value at $T$, so $D_{\\text{Mac}} = T$. " +
            "Modified duration is the version that answers the price question directly:",
        },
        {
          kind: "formula",
          latex: "D_{\\text{mod}} = -\\frac{1}{P}\\frac{dP}{dy} \\qquad\\Longrightarrow\\qquad \\frac{\\Delta P}{P} \\approx -D_{\\text{mod}}\\,\\Delta y",
        },
        {
          kind: "definitions",
          items: [
            { term: "Longer maturity", description: "Raises duration — more value sits far in the future." },
            { term: "Higher coupon", description: "Lowers duration — more value arrives early." },
            { term: "Higher yield", description: "Lowers duration — distant payments are discounted more, so near ones weigh more." },
          ],
        },
        {
          kind: "prose",
          text:
            "Traders often quote **DV01** (dollar value of a basis point): $D_{\\text{mod}} \\times P \\times 0.0001$, " +
            "the dollar price change for a one-basis-point move in yield.",
        },
      ],
    },

    {
      heading: "Convexity",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{\\Delta P}{P} \\approx -D_{\\text{mod}}\\,\\Delta y + \\frac{1}{2}\\,\\mathcal{C}\\,(\\Delta y)^{2} \\qquad \\mathcal{C} = \\frac{1}{P}\\frac{d^{2}P}{dy^{2}}",
          caption: "The second-order Taylor expansion of price in yield",
        },
        {
          kind: "prose",
          text:
            "For annual cash flows, $\\mathcal{C} = \\frac{1}{P(1 + y)^{2}} \\sum_{t} t(t + 1) \\frac{CF_t}{(1 + y)^{t}}$. " +
            "Because every term is positive, an option-free bond has positive convexity: the price curve bends " +
            "upward, lying above its tangent line. The duration-only estimate is that tangent line, so it is " +
            "always too pessimistic — it overstates the fall when yields rise and understates the gain when they fall.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Convexity is valuable",
          text:
            "Of two bonds with the same duration and yield, the more convex one gains more when rates fall and " +
            "loses less when they rise. Investors pay for that, accepting a slightly lower yield. Callable bonds " +
            "and mortgage-backed securities can have *negative* convexity: as rates fall, borrowers refinance " +
            "and the price gain is capped.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Estimating a price change",
          problem:
            "A $2$-year bond with face $\\$1{,}000$ and a $5\\%$ annual coupon yields $6\\%$, so $P = \\$981.67$. Estimate its price if the yield rises to $7\\%$.",
          steps: [
            "Present values: $\\frac{50}{1.06} = 47.17$ at $t = 1$, $\\frac{1{,}050}{1.06^{2}} = 934.50$ at $t = 2$.",
            "$D_{\\text{Mac}} = \\frac{1 \\times 47.17 + 2 \\times 934.50}{981.67} \\approx 1.952$ years.",
            "$D_{\\text{mod}} = \\frac{1.952}{1.06} \\approx 1.842$. Duration alone: $\\frac{\\Delta P}{P} \\approx -1.842 \\times 0.01 = -1.842\\%$, giving $\\$963.59$.",
            "$\\mathcal{C} = \\frac{2 \\times 47.17 + 6 \\times 934.50}{981.67 \\times 1.06^{2}} \\approx 5.17$, adding $\\frac{1}{2} \\times 5.17 \\times 0.01^{2} \\approx +0.026\\%$.",
            "Combined: $-1.842\\% + 0.026\\% = -1.816\\%$, giving $\\$963.84$.",
          ],
          answer: "About $\\$963.84$, which matches the exact repricing at $7\\%$ to the cent. Duration alone was $25$ cents too low.",
        },
      ],
    },

    {
      heading: "Using duration",
      blocks: [
        {
          kind: "list",
          items: [
            "**Portfolio duration** is the value-weighted average of the holdings' durations, so risk can be added up across bonds.",
            "**Immunisation**: a pension fund with a liability due in $10$ years can hold bonds with duration $10$. A rise in rates lowers the bonds' price but raises the return on reinvested coupons, and the two effects offset to first order.",
            "**Hedging**: a position's DV01 can be offset with Treasury futures or an interest rate swap of equal and opposite DV01.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Duration assumes a parallel shift",
          text:
            "Both measures treat the whole yield curve as moving by the same $\\Delta y$. Real curves also " +
            "steepen, flatten and twist, and a portfolio matched on duration can still lose money when short " +
            "and long rates move differently. *Key-rate durations* measure sensitivity to each maturity separately.",
        },
      ],
    },
  ],

  references: [
    { source: "Fabozzi, Bond Markets, Analysis, and Strategies", locator: "Ch. 4, Bond Price Volatility" },
    { source: "Bodie, Kane & Marcus, Investments", locator: "Ch. 16, Managing Bond Portfolios" },
    { source: "Luenberger, Investment Science", locator: "Ch. 3, Fixed-Income Securities" },
  ],
};
