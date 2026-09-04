import type { WikiArticle } from "../types";

export const poissonDistribution: WikiArticle = {
  conceptId: "poisson-distribution",
  summary:
    "The Poisson distribution counts events in a fixed window when those events happen at a constant average rate, independently of one another. Its defining oddity — mean and variance both equal $\\lambda$ — is also its most useful diagnostic: real count data whose variance far exceeds its mean is telling you the independence assumption has failed.",
  sections: [
    {
      heading: "The distribution",
      blocks: [
        {
          kind: "formula",
          latex: "P(X = k) = \\frac{e^{-\\lambda}\\lambda^{k}}{k!}, \\qquad k = 0, 1, 2, \\ldots",
          caption: "Poisson$(\\lambda)$ probability mass function",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = \\lambda, \\qquad \\operatorname{Var}(X) = \\lambda",
          caption: "Mean and variance coincide — the signature property",
        },
        {
          kind: "prose",
          text: "The support is unbounded: there is no largest number of events, though probabilities fall away very fast beyond a few multiples of $\\lambda$. Note that $\\lambda$ is a *rate times a window*, so doubling the observation period doubles $\\lambda$.",
        },
      ],
    },
    {
      heading: "When it applies",
      blocks: [
        {
          kind: "prose",
          text: "Poisson counts arise from a Poisson process, which requires three conditions. Each is a real assumption that can fail.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "**Constant rate.** The average number of events per unit time or space does not change across the window.",
            "**Independence.** Events in disjoint intervals do not influence one another — no clustering, no refractory period.",
            "**No simultaneity.** Two events do not occur at exactly the same instant; in a short enough interval the chance of two is negligible relative to the chance of one.",
          ],
        },
        {
          kind: "table",
          headers: ["Plausible", "Doubtful, and why"],
          rows: [
            [
              "Radioactive decays in a second",
              "Goals in a football match — a goal changes both teams' behaviour, so the rate is not constant",
            ],
            [
              "Typos on a page of manuscript",
              "Earthquakes in a region — aftershocks cluster, violating independence",
            ],
            [
              "Calls arriving at a switchboard overnight",
              "Website visits during a product launch — the rate spikes",
            ],
          ],
        },
      ],
    },
    {
      heading: "As a limit of the binomial",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{Binomial}(n, p) \\ \\longrightarrow \\ \\text{Poisson}(\\lambda) \\quad \\text{as } n \\to \\infty,\\ p \\to 0,\\ np \\to \\lambda",
          caption: "The law of rare events",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Many trials, each unlikely",
          text: "This is where Poisson comes from conceptually. Split an hour into a million instants; in each, an event either happens or does not, with tiny probability. The count is Binomial with huge $n$ and minute $p$, and the limit is Poisson with $\\lambda = np$. It also explains the mean–variance equality: the binomial variance $np(1-p)$ tends to $np = \\lambda$ as $p \\to 0$.",
        },
        {
          kind: "prose",
          text: "As an approximation it is good when $n \\ge 20$ and $p \\le 0.05$, and very good when $n \\ge 100$ and $np \\le 10$. It is far more accurate than the normal approximation in this regime, because the binomial is strongly skewed when $p$ is small.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Rate times window",
          problem:
            "A call centre receives 4 calls per minute on average. What is the probability of exactly 2 calls in a given minute? Of at least one call in 30 seconds?",
          steps: [
            "One minute: $\\lambda = 4$. $P(X = 2) = e^{-4}4^{2}/2! = e^{-4} \\cdot 8 \\approx 0.1465$.",
            "For 30 seconds the window halves, so $\\lambda = 2$ — the rate is per minute, and $\\lambda$ must match the window.",
            "$P(\\text{at least one}) = 1 - P(X = 0) = 1 - e^{-2}$.",
            "$e^{-2} \\approx 0.1353$.",
          ],
          answer: "$P(X = 2) \\approx 0.147$ in a minute; $P(\\ge 1) \\approx 0.865$ in 30 seconds.",
        },
      ],
    },
    {
      heading: "Overdispersion",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Variance greater than the mean means Poisson is wrong",
          text: "Because Poisson forces $\\operatorname{Var} = \\mathbb{E}$, comparing the sample variance to the sample mean is a one-line model check. If the variance is much larger — overdispersion — the events are clustering, or the rate varies across the data, and both violate the assumptions. Fitting Poisson anyway produces standard errors that are too small and confidence intervals that are too narrow, so effects look more significant than they are. The negative binomial distribution is the standard remedy, since it adds a second parameter that lets variance exceed the mean.",
        },
        {
          kind: "prose",
          text: "Two closure properties are worth remembering. Independent Poissons add: if $X \\sim \\text{Poisson}(\\lambda_1)$ and $Y \\sim \\text{Poisson}(\\lambda_2)$ independently, then $X + Y \\sim \\text{Poisson}(\\lambda_1 + \\lambda_2)$. And the waiting time between consecutive events in a Poisson process is Exponential$(\\lambda)$ — the same process described by counts or by gaps.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 4.7–4.8, 13.1" },
    { source: "Casella & Berger, Statistical Inference", locator: "§3.2.3" },
    { source: "Wasserman, All of Statistics", locator: "§2.3" },
    { source: "Mathlingo assessment bank", locator: "assessments/discrete-distributions.md" },
  ],
};
