import type { WikiArticle } from "../types";

export const timeValueOfMoneyWiki: WikiArticle = {
  conceptId: "time-value-of-money",

  summary:
    "A dollar today is worth more than a dollar a year from now, because today's dollar can be invested " +
    "and earn a return in the meantime. Compounding carries a present amount forward to a future date; " +
    "discounting carries a future amount back to today. Every price in this chapter — bonds, stocks, " +
    "forwards, swaps — is built from this one operation: move each cash flow to a common date, then add.",

  sections: [
    {
      heading: "Compounding and discounting",
      blocks: [
        {
          kind: "formula",
          latex: "FV = PV\\,(1 + r)^{n} \\qquad\\qquad PV = \\frac{FV}{(1 + r)^{n}}",
          caption: "Future value after $n$ periods at rate $r$ per period, and its inverse, present value",
        },
        {
          kind: "prose",
          text:
            "The factor $(1 + r)^{n}$ is the growth of one dollar over $n$ periods when interest is earned " +
            "on interest. Its reciprocal $\\frac{1}{(1 + r)^{n}}$ is the **discount factor**: the price today " +
            "of one dollar delivered at time $n$. The rate $r$ plays the role of an exchange rate between " +
            "dates — it is the opportunity cost of waiting, which is why it is often called the *discount " +
            "rate* or *required return*.",
        },
        {
          kind: "example",
          title: "Growing a deposit",
          problem: "Deposit $\\$1{,}000$ at $5\\%$ compounded annually. What is it worth after $3$ years?",
          steps: [
            "$FV = 1{,}000 \\times 1.05^{3}$.",
            "$1.05^{3} = 1.157625$.",
          ],
          answer: "$FV \\approx \\$1{,}157.63$. Simple interest would give only $\\$1{,}150$; the extra $\\$7.63$ is interest on interest.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The rule of $72$",
          text:
            "Money doubles in roughly $\\frac{72}{100r}$ periods. At $6\\%$ that is about $12$ years " +
            "($1.06^{12} \\approx 2.01$). It works because $\\ln 2 \\approx 0.693$ and $\\ln(1 + r) \\approx r$ " +
            "for small $r$; $72$ is used instead of $69$ because it divides evenly by many rates and corrects " +
            "for the approximation at typical rates.",
        },
      ],
    },

    {
      heading: "Compounding frequency",
      blocks: [
        {
          kind: "formula",
          latex: "FV = PV\\left(1 + \\frac{r}{m}\\right)^{mt} \\;\\xrightarrow{\\;m \\to \\infty\\;}\\; PV\\, e^{rt}",
          caption: "A quoted annual rate $r$ compounded $m$ times a year, and its continuous limit",
        },
        {
          kind: "prose",
          text:
            "A quoted annual rate (the APR) means little until its compounding frequency is stated. Monthly " +
            "compounding at $12\\%$ is not the same as $12\\%$ once a year. The comparable number is the " +
            "**effective annual rate**, the growth actually achieved in one year:",
        },
        {
          kind: "formula",
          latex: "EAR = \\left(1 + \\frac{r}{m}\\right)^{m} - 1 \\qquad\\qquad EAR_{\\text{cont}} = e^{r} - 1",
        },
        {
          kind: "example",
          title: "Comparing quotes",
          problem: "Which is better for a saver: $12\\%$ compounded monthly or $12.5\\%$ compounded annually?",
          steps: [
            "Monthly: $EAR = 1.01^{12} - 1 \\approx 0.1268$.",
            "Annual: $EAR = 0.125$.",
          ],
          answer: "$12\\%$ monthly, at $12.68\\%$ effective, beats $12.5\\%$ annual.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why derivatives pricing uses $e^{rt}$",
          text:
            "Continuous compounding makes growth additive in the exponent: $e^{r t_1} e^{r t_2} = e^{r(t_1 + t_2)}$. " +
            "That is why forward prices, Black–Scholes–Merton and put–call parity are usually written with " +
            "$e^{-rT}$ — the algebra is cleaner, and any discrete quote can be converted to an equivalent " +
            "continuous rate $r_c = m \\ln\\left(1 + \\frac{r}{m}\\right)$.",
        },
      ],
    },

    {
      heading: "Streams of cash flows",
      blocks: [
        {
          kind: "prose",
          text:
            "Present value is linear: the value of a stream is the sum of the values of its pieces. For " +
            "cash flows $C_1, \\ldots, C_n$ at the end of periods $1, \\ldots, n$, " +
            "$PV = \\sum_{t=1}^{n} \\frac{C_t}{(1 + r)^{t}}$. Three patterns recur often enough to have closed forms.",
        },
        {
          kind: "table",
          headers: ["Stream", "Present value", "Notes"],
          rows: [
            ["Annuity: $C$ per period for $n$ periods", "$\\dfrac{C}{r}\\left(1 - \\dfrac{1}{(1 + r)^{n}}\\right)$", "Mortgages, car loans, bond coupons"],
            ["Perpetuity: $C$ per period forever", "$\\dfrac{C}{r}$", "Limit of the annuity as $n \\to \\infty$"],
            ["Growing perpetuity: $C$, then growing at $g$", "$\\dfrac{C}{r - g}$", "Requires $g < r$; the Gordon growth model for stocks"],
          ],
        },
        {
          kind: "example",
          title: "Valuing an annuity",
          problem: "What is $\\$100$ a year for $5$ years worth today at $6\\%$?",
          steps: [
            "$1.06^{5} \\approx 1.338226$, so $\\frac{1}{1.06^{5}} \\approx 0.747258$.",
            "$PV = \\frac{100}{0.06}\\left(1 - 0.747258\\right) = 1{,}666.67 \\times 0.252742$.",
          ],
          answer: "$PV \\approx \\$421.24$ — less than the $\\$500$ paid in total, because the later payments are discounted more.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Match the rate to the period",
          text:
            "Monthly payments need a monthly rate and a count of months. Plugging an annual rate into a " +
            "monthly annuity formula is the most common time-value error, and it is not small: it overstates " +
            "discounting by roughly a factor of twelve.",
        },
      ],
    },

    {
      heading: "Net present value",
      blocks: [
        {
          kind: "formula",
          latex: "NPV = -C_0 + \\sum_{t=1}^{n} \\frac{C_t}{(1 + r)^{t}}",
          caption: "Accept a project when $NPV > 0$: it returns more than the next-best use of the money",
        },
        {
          kind: "prose",
          text:
            "Net present value turns an investment decision into a single comparison against zero. The " +
            "rate that makes $NPV = 0$ is the **internal rate of return**; for a bond, the same idea is " +
            "called the yield to maturity. Everything later in this chapter — bond prices, stock valuation, " +
            "the no-arbitrage forward price — is an application of this sum.",
        },
      ],
    },
  ],

  references: [
    { source: "Berk & DeMarzo, Corporate Finance", locator: "Ch. 4, The Time Value of Money" },
    { source: "Luenberger, Investment Science", locator: "Ch. 2, The Basic Theory of Interest" },
    { source: "Hull, Options, Futures, and Other Derivatives", locator: "Ch. 4, Interest Rates" },
  ],
};
