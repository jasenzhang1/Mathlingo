import type { WikiArticle } from "../types";

export const likelihoodVsProbability: WikiArticle = {
  conceptId: "likelihood-vs-probability",
  summary:
    "Probability and likelihood are the same formula read in opposite directions. Probability fixes the parameter and asks about data; likelihood fixes the data and asks about the parameter. The distinction sounds pedantic and is not — it is why likelihoods do not integrate to 1, why \"the likelihood that $\\theta = 0.6$\" is a category error, and why frequentist and Bayesian answers differ.",
  sections: [
    {
      heading: "One formula, two readings",
      blocks: [
        {
          kind: "formula",
          latex: "f(x \\mid \\theta) \\quad\\text{read as}\\quad \\underbrace{P(\\text{data} \\mid \\theta \\text{ fixed})}_{\\text{probability}} \\quad\\text{or}\\quad \\underbrace{L(\\theta \\mid \\text{data fixed})}_{\\text{likelihood}}",
          caption: "Which argument varies is the entire difference",
        },
        {
          kind: "table",
          headers: ["", "Probability", "Likelihood"],
          rows: [
            ["What is fixed", "the parameter $\\theta$", "the observed data $x$"],
            ["What varies", "the data $x$", "the parameter $\\theta$"],
            ["Asks", "how often would this data occur?", "how well does this $\\theta$ explain what I saw?"],
            ["Sums/integrates to 1", "yes, over $x$", "**no** — over $\\theta$ it is not a distribution"],
            ["Used before or after", "before observing", "after observing"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "\"The likelihood that $\\theta = 0.6$\" is not a thing",
          text: "Likelihood is not a probability distribution over parameters and cannot be interpreted as one. Only ratios are meaningful: $L(0.6)/L(0.5) = 3$ says the data are three times more probable under $\\theta = 0.6$ than under $\\theta = 0.5$. It does not say $\\theta = 0.6$ is three times as likely to be true — that would require a prior and Bayes' rule, at which point you have a posterior, not a likelihood.",
        },
      ],
    },
    {
      heading: "Worked comparison",
      blocks: [
        {
          kind: "example",
          title: "The same coin, both directions",
          problem:
            "A coin is flipped 10 times. Compute a probability and a likelihood from the same binomial formula.",
          steps: [
            "**Probability question.** Given a fair coin ($p = 0.5$), what is $P(7 \\text{ heads})$?",
            "$\\binom{10}{7}(0.5)^{7}(0.5)^{3} = 120 \\times 0.0009766 \\approx 0.117$. Summing this over all $k = 0,\\ldots,10$ gives exactly 1.",
            "**Likelihood question.** Having *observed* 7 heads, how does $p$ fare?",
            "$L(p) = \\binom{10}{7}p^{7}(1-p)^{3}$, now a function of $p$.",
            "$L(0.5) \\approx 0.117$, $L(0.7) \\approx 0.267$, $L(0.9) \\approx 0.057$.",
            "Integrating $L(p)$ over $p \\in [0,1]$ gives $1/11$, not 1 — it is not a density in $p$.",
          ],
          answer:
            "Identical arithmetic at $p = 0.5$ and $k = 7$; entirely different objects. The likelihood peaks at $p = 0.7$, which is the MLE.",
        },
      ],
    },
    {
      heading: "Why it matters",
      blocks: [
        {
          kind: "prose",
          text: "Bayes' rule is precisely the machinery for converting one into the other. It takes a likelihood — which you can compute from a model — and a prior, and returns a posterior, which *is* a distribution over $\\theta$:",
        },
        {
          kind: "formula",
          latex: "\\underbrace{p(\\theta \\mid x)}_{\\text{posterior}} \\ \\propto \\ \\underbrace{L(\\theta \\mid x)}_{\\text{likelihood}} \\times \\underbrace{p(\\theta)}_{\\text{prior}}",
          caption: "The likelihood is the bridge, not the destination",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is the frequentist–Bayesian fault line",
          text: "A frequentist treats $\\theta$ as fixed and unknown, so probability statements about it are meaningless — only the likelihood exists, and inference means finding the $\\theta$ that best explains the data. A Bayesian treats $\\theta$ as uncertain, supplies a prior, and obtains a genuine probability distribution over it. Both use the identical likelihood function; they disagree about whether $\\theta$ is the kind of thing that can have a distribution.",
        },
        {
          kind: "prose",
          text: "The confusion also underlies the misreading of p-values. A p-value is $P(\\text{data this extreme} \\mid H_0)$ — a probability, conditioning on the hypothesis. It is routinely reported as though it were $P(H_0 \\mid \\text{data})$, which is a posterior and requires a prior. The two can differ enormously, exactly as $P(A \\mid B)$ and $P(B \\mid A)$ do in medical screening.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§6.3" },
    { source: "Wasserman, All of Statistics", locator: "§9.3, §11.1" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 8.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/mgf-likelihood-and-estimation.md" },
  ],
};
