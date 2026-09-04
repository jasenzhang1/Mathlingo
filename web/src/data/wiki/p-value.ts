import type { WikiArticle } from "./types";

export const pValueWiki: WikiArticle = {
  conceptId: "p-value",
  summary:
    "The p-value is the probability, computed assuming H₀ is true, of observing a test statistic at " +
    "least as extreme as the one you got. Everything difficult about it follows from the phrase " +
    "“assuming H₀ is true”: it is a conditional probability of data given a hypothesis, not of a " +
    "hypothesis given data, and reversing those is the most consequential error in applied statistics.",

  sections: [
    {
      heading: "Definition, and four things it is not",
      blocks: [
        {
          kind: "formula",
          latex: "p = P(statistic at least as extreme as observed | H₀ true)",
        },
        {
          kind: "table",
          headers: ["Claim about p = 0.03", "Verdict"],
          rows: [
            ["Data this extreme occurs 3% of the time when H₀ holds", "Correct"],
            ["There is a 3% probability H₀ is true", "Wrong — that is P(H₀ | data), a posterior"],
            ["There is a 3% chance the result is a fluke", "Wrong — same inversion, informally worded"],
            ["The effect is large", "Wrong — p conflates effect size with precision"],
            ["The result will replicate 97% of the time", "Wrong — replication probability is a different quantity"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Getting to P(H₀ | data) requires a prior",
          text:
            "Converting the p-value into a statement about the hypothesis needs Bayes' rule, and " +
            "therefore a prior probability on H₀. That is exactly what the frequentist framework " +
            "declines to supply, which is why the inversion is not a rounding error but a category error.",
        },
      ],
    },

    {
      heading: "Uniform under the null",
      blocks: [
        {
          kind: "prose",
          text:
            "For a continuous test statistic, the p-value is Uniform(0, 1) when H₀ is true. This " +
            "follows from the probability integral transform: if T has continuous CDF F under H₀, then " +
            "F(T) is uniform, and the p-value is a monotone function of it. Consequently " +
            "P(p ≤ α | H₀) = α exactly, which is what makes α the actual false-positive rate.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two corollaries fall straight out",
          text:
            "First, running m independent tests on pure noise scatters p-values uniformly, so about " +
            "αm of them land below α by construction — the multiplicity problem is not bad luck, it is " +
            "arithmetic. Second, a histogram of many p-values is a diagnostic: flat means nothing is " +
            "happening, a spike near zero means real effects are present.",
        },
        {
          kind: "prose",
          text:
            "For discrete test statistics the transform fails, the p-value is stochastically larger " +
            "than uniform, and the true error rate falls below α. Fisher's exact test and binomial " +
            "tests are conservative for exactly this reason.",
        },
      ],
    },

    {
      heading: "Why sample size makes p-values hard to read",
      blocks: [
        {
          kind: "example",
          title: "The same effect at two sample sizes",
          problem:
            "A treatment raises conversion from 10.00% to 10.05%. What is the p-value at n = 1,000 " +
            "per arm, and at n = 10,000,000 per arm?",
          steps: [
            "At n = 1,000: SE of the difference ≈ 0.0134, z ≈ 0.037, p ≈ 0.97.",
            "At n = 10,000,000: SE ≈ 0.000134, z ≈ 3.7, p ≈ 0.0002.",
          ],
          answer:
            "Identical, commercially worthless effect; p ranges from 0.97 to 0.0002 purely with n. " +
            "The p-value measures the evidence against exact equality, and exact equality is rarely a " +
            "hypothesis anyone believed.",
        },
        {
          kind: "prose",
          text:
            "The practical consequence is to report the effect size and its confidence interval " +
            "alongside — or instead of — the p-value. “+0.4 points, 95% CI [0.05, 0.75]” answers the " +
            "decision-relevant question; “p = 0.03” does not. At very large n, statistical " +
            "significance is nearly automatic and practical significance is the only live question.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§8.3.4, p-Values" },
    { source: "Mathlingo assessment bank", locator: "assessments/hypothesis-testing-machinery.md" },
  ],
};
