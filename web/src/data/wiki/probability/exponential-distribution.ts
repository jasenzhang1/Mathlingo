import type { WikiArticle } from "../types";

export const exponentialDistribution: WikiArticle = {
  conceptId: "exponential-distribution",
  summary:
    "The exponential distribution models waiting time until an event when the event arrives at a constant rate. It is the unique continuous distribution with the memoryless property — having waited an hour tells you nothing about how much longer you will wait — which makes it both mathematically special and frequently the wrong model for anything that ages.",
  sections: [
    {
      heading: "Density, CDF, moments",
      blocks: [
        {
          kind: "formula",
          latex: "f_X(x) = \\lambda e^{-\\lambda x}, \\qquad F_X(x) = 1 - e^{-\\lambda x}, \\qquad x \\ge 0",
          caption: "Exponential$(\\lambda)$ — $\\lambda$ is the rate",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = \\frac{1}{\\lambda}, \\qquad \\operatorname{Var}(X) = \\frac{1}{\\lambda^{2}}, \\qquad \\text{SD}(X) = \\frac{1}{\\lambda}",
          caption: "Mean and standard deviation are equal",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Rate or mean — check which parameterisation you are in",
          text: "Some texts and software parameterise by the rate $\\lambda$, others by the mean $\\beta = 1/\\lambda$. R's `rexp` takes a rate; many textbooks write $f(x) = \\frac{1}{\\beta}e^{-x/\\beta}$. Getting this backwards inverts your answer, and the error is silent because both forms are valid densities. Always check whether a stated \"parameter of 5\" means five events per unit time or an average wait of five.",
        },
      ],
    },
    {
      heading: "Memorylessness",
      blocks: [
        {
          kind: "formula",
          latex: "P(X > s + t \\mid X > s) = P(X > t) \\qquad \\text{for all } s, t \\ge 0",
          caption: "The memoryless property",
        },
        {
          kind: "prose",
          text: "The proof is two lines. $P(X > t) = e^{-\\lambda t}$, so the conditional probability is $e^{-\\lambda(s+t)}/e^{-\\lambda s} = e^{-\\lambda t}$ — the $s$ cancels entirely. Among continuous distributions, the exponential is the *only* one with this property; among discrete ones, the geometric is.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What memorylessness actually claims",
          text: "A component that has already run 1,000 hours has exactly the same remaining-life distribution as a brand new one. That is reasonable for failures caused by external random shocks — a power surge does not care how old the device is. It is clearly false for anything that wears out, corrodes, or fatigues, and equally false for anything that gets more reliable after surviving an initial burn-in period.",
        },
        {
          kind: "example",
          title: "Worked example",
          problem:
            "A bulb's lifetime is Exponential with mean 1000 hours. (a) $P(\\text{lasts beyond } 1500)$? (b) Given it has already lasted 1000 hours, $P(\\text{lasts another } 1500)$?",
          steps: [
            "Mean $1000$ means $\\lambda = 1/1000$.",
            "(a) $P(X > 1500) = e^{-1500/1000} = e^{-1.5} \\approx 0.2231$.",
            "(b) By memorylessness this equals $P(X > 1500)$ — unconditionally.",
            "$= e^{-1.5} \\approx 0.2231$, the same number.",
          ],
          answer:
            "Both $\\approx 0.223$. The 1,000 hours already survived are irrelevant — which is exactly the claim to be sceptical of for a real bulb.",
        },
      ],
    },
    {
      heading: "Relationship to the Poisson process",
      blocks: [
        {
          kind: "prose",
          text: "The exponential and the Poisson are two views of one process. If events arrive as a Poisson process at rate $\\lambda$, then the number of events in a unit window is Poisson$(\\lambda)$ and the gap between consecutive events is Exponential$(\\lambda)$.",
        },
        {
          kind: "formula",
          latex: "P(\\text{no event by time } t) = P(N(t) = 0) = e^{-\\lambda t} = P(X > t)",
          caption: "The same quantity, computed by counts or by waiting time",
        },
        {
          kind: "prose",
          text: "This identity is why the two distributions share the memorylessness: the independence of disjoint intervals in the Poisson process is precisely what makes the waiting time forget how long it has already been.",
        },
        {
          kind: "table",
          headers: ["Question", "Distribution"],
          rows: [
            ["How many events in a fixed window?", "Poisson$(\\lambda t)$"],
            ["How long until the next event?", "Exponential$(\\lambda)$"],
            ["How long until the $k$th event?", "Gamma$(k, \\lambda)$"],
            ["Minimum of $n$ independent waits", "Exponential$(n\\lambda)$"],
          ],
        },
      ],
    },
    {
      heading: "When to use something else",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Wear-out.** Failure rate rising with age needs the Weibull, whose shape parameter lets the hazard increase or decrease.",
            "**Sums of waits.** The time until the $k$th event is Gamma, not exponential — its density is zero at the origin, whereas the exponential's is maximal there.",
            "**Heavy tails.** Exponential tails decay geometrically. File sizes, city populations, and income follow power laws, where extreme values are far more common.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A constant hazard rate is the real assumption",
          text: "The exponential has hazard $h(x) = f(x)/(1 - F(x)) = \\lambda$, constant for all $x$. Every criticism above is a statement that the hazard is not constant. Plotting an empirical hazard against time is the direct way to check the model rather than eyeballing the histogram.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 5.5, 13.1" },
    { source: "Casella & Berger, Statistical Inference", locator: "§3.3.1" },
    { source: "Wasserman, All of Statistics", locator: "§2.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/continuous-distributions.md" },
  ],
};
