import type { WikiArticle } from "../types";

export const bondsAndFixedIncomeWiki: WikiArticle = {
  conceptId: "bonds-and-fixed-income",

  summary:
    "A bond is a loan sold as a security: the issuer receives cash today and promises a fixed schedule of " +
    "coupon payments plus the face value at maturity. Because the promised cash flows are known in " +
    "advance, pricing a bond is pure time value of money — discount each payment and add. The interesting " +
    "consequences all follow from that sum: prices move opposite to yields, and a bond trades above or " +
    "below face value depending on how its coupon compares with current rates.",

  sections: [
    {
      heading: "Anatomy of a bond",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Face value $F$", description: "The principal repaid at maturity, also called par. Usually $\\$1{,}000$ for a corporate bond, quoted as $100$." },
            { term: "Coupon rate $c$", description: "Annual interest as a fraction of face value. A $5\\%$ coupon on $\\$1{,}000$ pays $\\$50$ a year, often as two $\\$25$ payments." },
            { term: "Maturity $T$", description: "The date of the final coupon and principal payment." },
            { term: "Issuer", description: "Governments (Treasuries), municipalities, and corporations. The issuer's creditworthiness determines how much extra yield investors demand." },
            { term: "Yield $y$", description: "The discount rate the market applies to the bond's cash flows — the next lesson treats it in detail." },
          ],
        },
        {
          kind: "prose",
          text:
            "Bondholders are creditors, not owners. They are paid before shareholders, which makes bonds " +
            "less risky than the same firm's stock, but their upside is capped at the promised payments. " +
            "That fixed, contractual cash flow is what *fixed income* refers to.",
        },
      ],
    },

    {
      heading: "Pricing by discounting",
      blocks: [
        {
          kind: "formula",
          latex: "P = \\sum_{k=1}^{N} \\frac{C}{\\left(1 + \\frac{y}{m}\\right)^{k}} + \\frac{F}{\\left(1 + \\frac{y}{m}\\right)^{N}}",
          caption: "$m$ coupons per year, each $C = \\frac{cF}{m}$, over $N = mT$ periods",
        },
        {
          kind: "prose",
          text:
            "The coupons form an annuity and the face value is a single lump sum, so the price is an annuity " +
            "plus a discounted principal. A **zero-coupon bond** has no coupons at all and is priced by the " +
            "single term $P = \\frac{F}{(1 + y)^{T}}$; it is sold at a discount and the whole return comes from " +
            "the climb to par.",
        },
        {
          kind: "example",
          title: "Pricing a coupon bond",
          problem: "A $3$-year bond with face $\\$1{,}000$ pays a $5\\%$ annual coupon. The market yield is $6\\%$. What is its price?",
          steps: [
            "Cash flows: $\\$50$, $\\$50$, $\\$1{,}050$.",
            "$\\frac{50}{1.06} \\approx 47.17$, $\\frac{50}{1.06^{2}} \\approx 44.50$, $\\frac{1{,}050}{1.06^{3}} \\approx 881.61$.",
            "Sum: $47.17 + 44.50 + 881.61$.",
          ],
          answer: "$P \\approx \\$973.27$ — below par, because the bond's $5\\%$ coupon is less than the $6\\%$ the market now demands.",
        },
      ],
    },

    {
      heading: "Premium, par and discount",
      blocks: [
        {
          kind: "table",
          headers: ["Coupon vs. yield", "Price", "Name"],
          rows: [
            ["$c > y$", "$P > F$", "Premium bond"],
            ["$c = y$", "$P = F$", "Par bond"],
            ["$c < y$", "$P < F$", "Discount bond"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why prices and yields move in opposite directions",
          text:
            "The cash flows are fixed; only the discount rate changes. Raising $y$ shrinks every term of the " +
            "price sum, so $P$ falls. Put economically: when new bonds pay $6\\%$, nobody will pay full price " +
            "for an old bond paying $5\\%$ — its price drops until its yield matches the market. As maturity " +
            "approaches, a premium or discount bond's price is pulled toward par regardless (*pull to par*).",
        },
      ],
    },

    {
      heading: "Quoted prices and accrued interest",
      blocks: [
        {
          kind: "prose",
          text:
            "Bonds trade between coupon dates, so the seller is owed the interest that has built up since the " +
            "last coupon. The market quotes the **clean price**, which excludes it; the buyer actually pays " +
            "the **dirty** (full) price, which includes it. Quoting clean prices stops the quote from " +
            "saw-toothing up and down around every coupon date.",
        },
        {
          kind: "formula",
          latex: "\\text{dirty price} = \\text{clean price} + C \\times \\frac{\\text{days since last coupon}}{\\text{days in coupon period}}",
        },
        {
          kind: "example",
          title: "Accrued interest",
          problem: "A $6\\%$ semiannual bond with face $\\$1{,}000$ is quoted at $98.50$, two months into a six-month coupon period. What does the buyer pay?",
          steps: [
            "Each coupon is $\\frac{0.06 \\times 1{,}000}{2} = \\$30$.",
            "Accrued interest: $30 \\times \\frac{2}{6} = \\$10$.",
            "Clean price: $0.985 \\times 1{,}000 = \\$985$.",
          ],
          answer: "The buyer pays $\\$985 + \\$10 = \\$995$.",
        },
      ],
    },

    {
      heading: "Risks a bondholder bears",
      blocks: [
        {
          kind: "list",
          items: [
            "**Interest rate risk** — rising yields lower the price of a bond you already hold. Measured by duration.",
            "**Credit (default) risk** — the issuer may not pay. Compensated by a *credit spread* over Treasuries and traded directly with credit default swaps.",
            "**Reinvestment risk** — coupons may have to be reinvested at lower rates than the original yield.",
            "**Inflation risk** — fixed nominal payments buy less if prices rise; inflation-indexed bonds (TIPS) address this.",
            "**Liquidity risk** — some bonds trade rarely, and selling quickly can mean accepting a lower price.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Fabozzi, Bond Markets, Analysis, and Strategies", locator: "Ch. 2, Pricing of Bonds" },
    { source: "Bodie, Kane & Marcus, Investments", locator: "Ch. 14, Bond Prices and Yields" },
    { source: "Luenberger, Investment Science", locator: "Ch. 3, Fixed-Income Securities" },
  ],
};
