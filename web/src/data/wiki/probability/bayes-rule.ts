import type { WikiArticle } from "../types";

export const bayesRule: WikiArticle = {
  conceptId: "bayes-rule",
  summary:
    "Bayes' rule reverses a conditional probability: it turns $P(\\text{evidence} \\mid \\text{cause})$, which is usually what you can measure, into $P(\\text{cause} \\mid \\text{evidence})$, which is usually what you want to know. The rule itself is a one-line rearrangement of the definition. What makes it consequential is the base rate — the prior — which is exactly the term intuition drops.",
  sections: [
    {
      heading: "The rule",
      blocks: [
        {
          kind: "formula",
          latex: "P(A \\mid B) = \\frac{P(B \\mid A)\\,P(A)}{P(B)}",
          caption: "Bayes' rule",
        },
        {
          kind: "prose",
          text: "It follows in one step: the multiplication rule gives $P(A \\cap B)$ two ways, as $P(A \\mid B)P(B)$ and as $P(B \\mid A)P(A)$. Setting them equal and dividing by $P(B)$ is the whole derivation. Expanding the denominator by total probability gives the form used in practice:",
        },
        {
          kind: "formula",
          latex: "P(A \\mid B) = \\frac{P(B \\mid A)\\,P(A)}{P(B \\mid A)\\,P(A) + P(B \\mid A^{c})\\,P(A^{c})}",
          caption: "The two-hypothesis form, with the denominator expanded",
        },
        {
          kind: "definitions",
          items: [
            { term: "Prior $P(A)$", description: "What you believed before seeing the evidence — often a base rate or prevalence." },
            { term: "Likelihood $P(B \\mid A)$", description: "How probable this evidence is if $A$ holds. A property of the test or measurement, not of the population." },
            { term: "Evidence $P(B)$", description: "How probable the evidence is overall, averaging across hypotheses. A normalising constant." },
            { term: "Posterior $P(A \\mid B)$", description: "What you should believe after seeing the evidence." },
          ],
        },
      ],
    },
    {
      heading: "Why the base rate dominates",
      blocks: [
        {
          kind: "example",
          title: "Medical screening",
          problem:
            "A disease affects 1 in 1000 people. A test has a 99% true positive rate and a 5% false positive rate. A patient tests positive. What is the probability they have the disease?",
          steps: [
            "Prior: $P(D) = 0.001$, so $P(D^{c}) = 0.999$.",
            "True positives: $P(+ \\mid D)P(D) = (0.99)(0.001) = 0.00099$.",
            "False positives: $P(+ \\mid D^{c})P(D^{c}) = (0.05)(0.999) = 0.04995$.",
            "$P(+) = 0.00099 + 0.04995 = 0.05094$.",
            "$P(D \\mid +) = 0.00099 / 0.05094 \\approx 0.0194$.",
          ],
          answer: "About $1.9\\%$ — not 99%.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where the intuition breaks",
          text: "The instinct that a positive result means \"99% chance of disease\" reads the test's accuracy as the answer. But in a population of 100,000 there are only about 100 genuine cases, while 5% of the ~99,900 healthy people — roughly 4,995 — also test positive. False positives outnumber true ones fifty to one, because the disease is rare and the healthy group is enormous. The 99% figure is $P(+ \\mid D)$; the question asks for $P(D \\mid +)$.",
        },
      ],
    },
    {
      heading: "Odds form",
      blocks: [
        {
          kind: "prose",
          text: "Dividing the rule for $A$ by the rule for $A^{c}$ cancels the awkward denominator entirely, which makes the structure much clearer:",
        },
        {
          kind: "formula",
          latex: "\\underbrace{\\frac{P(A \\mid B)}{P(A^{c} \\mid B)}}_{\\text{posterior odds}} = \\underbrace{\\frac{P(B \\mid A)}{P(B \\mid A^{c})}}_{\\text{likelihood ratio}} \\times \\underbrace{\\frac{P(A)}{P(A^{c})}}_{\\text{prior odds}}",
          caption: "Bayes' rule in odds form",
        },
        {
          kind: "prose",
          text: "Evidence multiplies the odds by its likelihood ratio. In the screening example the prior odds are $1{:}999$ and the likelihood ratio is $0.99/0.05 = 19.8$, so the posterior odds are about $19.8{:}999 \\approx 1{:}50$ — the same 2% answer, reached without a denominator. This form also shows why one strong piece of evidence rarely overturns a very low prior: multiplying $1/999$ by 20 still leaves you well short of even.",
        },
      ],
    },
    {
      heading: "Common errors",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Ignoring the prior.** Reporting the likelihood as the posterior — the prosecutor's fallacy. This is the error above, and it is the reason Bayes' rule is worth memorising as a *structure* rather than a formula.",
            "**Forgetting the false-positive branch.** The denominator must average over every hypothesis, not just the one under test.",
            "**Treating the posterior as fixed.** It is only as good as the prior. A different population — screening symptomatic patients rather than the general public — changes $P(D)$ and so changes the answer entirely, with the same test.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 2.5–2.6" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.3.2" },
    { source: "Gigerenzer & Hoffrage, 'How to improve Bayesian reasoning without instruction'", locator: "Psychological Review 102(4), 1995" },
    { source: "Mathlingo assessment bank", locator: "assessments/foundations-of-probability.md" },
  ],
};
