import type { WikiArticle } from "./types";

export const fischersExactTestWiki: WikiArticle = {
  conceptId: "fischers-exact-test",
  summary:
    "Fisher's exact test gives an exact p-value for independence in a 2×2 table by enumerating " +
    "every table with the same margins and summing the hypergeometric probabilities of those at " +
    "least as extreme as the one observed. It requires no large-sample approximation, which is " +
    "precisely why it is the tool to reach for when the chi-square test's expected-count condition " +
    "fails.",

  sections: [
    {
      heading: "Where the hypergeometric comes from",
      blocks: [
        {
          kind: "prose",
          text:
            "Condition on both sets of margins as fixed. Then filling the table amounts to choosing " +
            "which of the row-1 units land in column 1 — a draw without replacement from a finite " +
            "population. That is exactly a hypergeometric experiment, so the probability of any " +
            "particular table is a hypergeometric probability.",
        },
        {
          kind: "formula",
          latex: "P(table) = [C(a+b, a) · C(c+d, c)] / C(n, a+c)",
          caption: "For a 2×2 table with cells a, b / c, d and n = a + b + c + d",
        },
        {
          kind: "prose",
          text:
            "The p-value is the sum of P(table) over all tables with the same margins whose " +
            "probability is no greater than the observed table's — for a two-sided test — or over " +
            "those at least as extreme in one direction for a one-sided test. Because the " +
            "distribution is enumerated rather than approximated, the result is exact for any sample " +
            "size.",
        },
      ],
    },

    {
      heading: "When to use it",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "Any expected cell count below about 5, where the chi-square approximation is unreliable.",
            "Small total samples, common in pilot studies, rare-disease work, and lab experiments.",
            "Any 2×2 table where you want a guarantee rather than an approximation — it is always valid, " +
              "just computationally heavier.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Exact means exactly valid, not exactly α",
          text:
            "Because the sampling distribution is discrete, achievable p-values come in jumps and the " +
            "true Type I error rate is generally *below* the nominal α rather than equal to it. " +
            "Fisher's test is conservative — it under-rejects — which is a guarantee of validity " +
            "bought at some cost in power. Mid-p variants recover part of that power.",
        },
        {
          kind: "prose",
          text:
            "The conditioning on both margins is the test's one genuinely contested feature. It is " +
            "unarguable in designs where both margins really were fixed by the experimenter, and it " +
            "is a modelling choice in designs where only one was. Unconditional exact tests exist and " +
            "are more powerful, at the price of much heavier computation.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "The lady tasting tea",
          problem:
            "Eight cups, four with milk poured first and four with tea first; the taster knows there " +
            "are four of each and correctly identifies all four milk-first cups. How surprising is " +
            "that under pure guessing?",
          steps: [
            "Both margins are fixed at 4 and 4 by design, so the hypergeometric applies exactly.",
            "The number of ways to choose 4 cups from 8 is C(8,4) = 70.",
            "Exactly one of those selections is all-correct.",
            "One-sided p = 1/70 ≈ 0.0143.",
          ],
          answer:
            "p ≈ 0.014, so a perfect score is significant at α = 0.05 while three-of-four would not be " +
            "(p = 17/70 ≈ 0.243). This is Fisher's original example, and the design is why both " +
            "margins are legitimately fixed.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§10.3, Asymptotic Evaluations and exact tests" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Mathlingo assessment bank", locator: "assessments/named-tests-and-resampling.md" },
  ],
};
