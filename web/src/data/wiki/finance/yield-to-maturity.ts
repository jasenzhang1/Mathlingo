import type { WikiArticle } from "../types";

export const yieldToMaturityWiki: WikiArticle = {
  conceptId: "yield-to-maturity",

  summary:
    "Yield to maturity runs the bond pricing formula backwards: given the market price, find the single " +
    "discount rate $y$ that makes the present value of the promised cash flows equal that price. It is the " +
    "bond's internal rate of return, and it lets bonds with different coupons and maturities be compared " +
    "on one scale. It is also a summary that rests on assumptions — hold to maturity, no default, " +
    "coupons reinvested at $y$ — and it is only as meaningful as those are.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "P = \\sum_{k=1}^{N} \\frac{CF_k}{(1 + y)^{t_k}} \\quad\\text{solved for } y",
          caption: "One equation, one unknown — but for a coupon bond, no closed-form solution",
        },
        {
          kind: "prose",
          text:
            "The right-hand side is strictly decreasing in $y$, so there is exactly one solution, and it is " +
            "found numerically — by bisection, Newton's method, or a financial calculator doing either. A " +
            "zero-coupon bond is the exception: with a single cash flow the equation inverts directly to " +
            "$y = \\left(\\frac{F}{P}\\right)^{1/T} - 1$.",
        },
        {
          kind: "example",
          title: "Yield on a zero",
          problem: "A $5$-year zero-coupon bond with face $\\$1{,}000$ costs $\\$800$. What is its yield to maturity?",
          steps: [
            "$y = \\left(\\frac{1{,}000}{800}\\right)^{1/5} - 1 = 1.25^{0.2} - 1$.",
            "$\\ln 1.25 \\approx 0.2231$, divided by $5$ is $0.04463$, and $e^{0.04463} \\approx 1.0456$.",
          ],
          answer: "$y \\approx 4.56\\%$ per year.",
        },
      ],
    },

    {
      heading: "Solving for yield numerically",
      blocks: [
        {
          kind: "example",
          title: "Bracketing the yield",
          problem: "A $2$-year bond with face $\\$1{,}000$ and a $5\\%$ annual coupon trades at $\\$981.67$. Find its yield.",
          steps: [
            "At $y = 5\\%$ the bond prices at par, $\\$1{,}000$ — too high, so $y > 5\\%$.",
            "At $y = 7\\%$: $\\frac{50}{1.07} + \\frac{1{,}050}{1.07^{2}} \\approx 46.73 + 917.11 = \\$963.84$ — too low, so $y < 7\\%$.",
            "Linear interpolation: $5\\% + \\frac{1{,}000 - 981.67}{1{,}000 - 963.84} \\times 2\\% \\approx 6.01\\%$.",
            "Check $y = 6\\%$: $\\frac{50}{1.06} + \\frac{1{,}050}{1.06^{2}} \\approx 47.17 + 934.50 = \\$981.67$. ✓",
          ],
          answer: "$y = 6\\%$. Interpolation overshoots slightly because the price–yield curve is convex, not linear.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Coupon rate is not yield",
          text:
            "The coupon rate is fixed in the contract on the day the bond is issued. The yield changes every " +
            "time the price does. A $5\\%$ coupon bond can yield $6\\%$ (bought at a discount) or $4\\%$ (bought " +
            "at a premium) — the coupon tells you the cash flows; the yield tells you the return at today's price.",
        },
      ],
    },

    {
      heading: "Other yield measures",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Current yield", description: "Annual coupon divided by price, $\\frac{cF}{P}$. Ignores the gain or loss from price converging to par, so it is a poor guide for bonds far from par." },
            { term: "Bond-equivalent yield", description: "For semiannual bonds, the market quotes twice the semiannual yield. A quoted $6\\%$ means $3\\%$ per half-year, an effective annual rate of $1.03^{2} - 1 = 6.09\\%$." },
            { term: "Yield to call", description: "For a callable bond, the yield computed as if the issuer redeems at the first call date. Investors look at the lower of this and YTM (*yield to worst*)." },
          ],
        },
        {
          kind: "table",
          headers: ["Bond", "Ordering"],
          rows: [
            ["Premium ($P > F$)", "coupon rate $>$ current yield $>$ YTM"],
            ["Par ($P = F$)", "coupon rate $=$ current yield $=$ YTM"],
            ["Discount ($P < F$)", "coupon rate $<$ current yield $<$ YTM"],
          ],
          caption: "A premium bond's YTM is lowest because it includes the certain loss as price falls to par",
        },
        {
          kind: "example",
          title: "Current yield on a premium bond",
          problem: "An $8\\%$ annual coupon bond with face $\\$1{,}000$ trades at $\\$1{,}050$. What is its current yield?",
          steps: ["$\\frac{80}{1{,}050} \\approx 0.0762$."],
          answer: "$7.62\\%$ — below the $8\\%$ coupon, and the YTM is lower still.",
        },
      ],
    },

    {
      heading: "What YTM assumes",
      blocks: [
        {
          kind: "list",
          items: [
            "**The bond is held to maturity.** Selling early realises whatever the market price is at that time.",
            "**Every payment is made.** For a risky issuer the YTM is a *promised* yield; the expected return is lower once defaults are priced in.",
            "**Coupons are reinvested at $y$.** If rates fall, coupons are reinvested at less and the realised return falls short of the YTM.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "One rate for every date is a simplification",
          text:
            "YTM discounts a payment in one year and a payment in ten years at the same rate. The market does " +
            "not: it has a different rate for each maturity, which is the subject of the yield curve. Two " +
            "bonds with the same maturity but different coupons can therefore have different YTMs even from " +
            "the same issuer — the *coupon effect*.",
        },
      ],
    },
  ],

  references: [
    { source: "Fabozzi, Bond Markets, Analysis, and Strategies", locator: "Ch. 3, Measuring Yield" },
    { source: "Bodie, Kane & Marcus, Investments", locator: "Ch. 14, Bond Prices and Yields" },
    { source: "Luenberger, Investment Science", locator: "Ch. 3, Fixed-Income Securities" },
  ],
};
