import type { WikiArticle } from "./types";

export const standardErrorWiki: WikiArticle = {
  conceptId: "standard-error",
  summary:
    "The standard error is the standard deviation of a statistic's own sampling distribution. It " +
    "answers “how much would this estimate move if I ran the study again?” — a different question " +
    "from “how spread out is my data?”, which is what the standard deviation answers. Nearly every " +
    "interval and test in the domain is built as estimate ± (critical value × standard error).",

  sections: [
    {
      heading: "Standard deviation versus standard error",
      blocks: [
        {
          kind: "table",
          headers: ["", "Standard deviation (s)", "Standard error (SE)"],
          rows: [
            ["Describes", "Spread of individual observations", "Spread of a statistic across repeat samples"],
            ["As n grows", "Converges to σ — does not shrink", "Shrinks like 1/√n"],
            ["Answers", "How variable are the units?", "How precise is my estimate?"],
            ["For a mean", "s", "s/√n"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Error bars are ambiguous unless labelled",
          text:
            "A plot with ±1 SD bars and one with ±1 SE bars look identical and differ by a factor of " +
            "√n. Papers that do not say which they used cannot be read. SE bars are typically much " +
            "shorter and make groups look more separated.",
        },
      ],
    },

    {
      heading: "The standard errors worth knowing cold",
      blocks: [
        {
          kind: "table",
          headers: ["Estimate", "Standard error"],
          rows: [
            ["Sample mean X̄", "s/√n"],
            ["Proportion p̂", "√(p̂(1 − p̂)/n)"],
            ["Difference of independent means", "√(s₁²/n₁ + s₂²/n₂)"],
            ["Difference of independent proportions", "√(p̂₁(1 − p̂₁)/n₁ + p̂₂(1 − p̂₂)/n₂)"],
            ["Paired difference", "s_d/√n, where s_d is the SD of the within-pair differences"],
          ],
        },
        {
          kind: "prose",
          text:
            "Two structural points. First, the SE of a difference combines the two SEs in quadrature " +
            "— √(a² + b²), not a + b — because variances add for independent quantities. Second, the " +
            "paired formula is a one-sample SE applied to differences, which is exactly why pairing " +
            "is so much more powerful: between-subject variability never enters.",
        },
      ],
    },

    {
      heading: "The √n tax, quantified",
      blocks: [
        {
          kind: "prose",
          text:
            "Because SE ∝ 1/√n, reducing it by a factor k requires k² times the data. This one " +
            "relationship governs the cost of every experiment.",
        },
        {
          kind: "table",
          headers: ["To reduce SE by", "Multiply n by"],
          rows: [["Half (2×)", "4"], ["A third (3×)", "9"], ["A tenth (10×)", "100"]],
        },
        {
          kind: "example",
          title: "Sizing a conversion experiment",
          problem:
            "Baseline conversion is 10%. With n = 10,000 per arm, what difference can be resolved?",
          steps: [
            "SE(p̂) = √(0.10 × 0.90 / 10,000) = √(9 × 10⁻⁶) = 0.003.",
            "For a difference of two independent arms, SE = √(0.003² + 0.003²) ≈ 0.0042.",
            "Two standard errors is about 0.0085 — roughly 0.85 percentage points.",
          ],
          answer:
            "Differences below about 0.85 points are inside the noise at this size. Resolving half " +
            "that needs 40,000 per arm; a quarter of it needs 160,000.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The population size almost never matters",
          text:
            "SE depends on n, not on the population size N. Sampling 1,000 people tells you about a " +
            "country of 300 million about as precisely as about a town of 30,000. The finite-population " +
            "correction √((N − n)/(N − 1)) only bites once n is a sizeable fraction of N.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 6, Models, Statistical Inference and Learning" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§5.2, Sums of Random Variables from a Random Sample" },
    { source: "Mathlingo assessment bank", locator: "assessments/hypothesis-testing-machinery.md" },
  ],
};
