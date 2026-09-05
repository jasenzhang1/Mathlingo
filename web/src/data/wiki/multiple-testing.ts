import type { WikiArticle } from "./types";

export const multipleTestingWiki: WikiArticle = {
  conceptId: "multiple-testing",
  summary:
    "Run enough tests and something will be significant whether or not anything is happening. This " +
    "is not bad luck — it is arithmetic, and it follows directly from the p-value being uniform " +
    "under the null. The question is which error rate you want to control, because the two standard " +
    "answers, family-wise error and false discovery, lead to very different procedures.",

  sections: [
    {
      heading: "The arithmetic",
      blocks: [
        {
          kind: "formula",
          latex: "P(at least one false positive) = 1 − (1 − α)^m,   for m independent true nulls",
        },
        {
          kind: "table",
          headers: ["m tests at α = 0.05", "P(at least one false positive)"],
          rows: [["1", "5%"], ["5", "23%"], ["20", "64%"], ["100", "99.4%"]],
        },
        {
          kind: "prose",
          text:
            "Under the null the p-value is uniform on (0,1), so each test puts probability α below " +
            "the threshold by construction. Across m tests roughly αm of them land there whatever " +
            "the truth. At m = 20 a significant result is the most likely outcome even when every " +
            "null holds.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The count includes what you did not report",
          text:
            "m is the number of tests conducted, not the number written up. Trying six outcome " +
            "definitions and reporting the one that worked is m = 6, and analysis choices made after " +
            "seeing the data — subgroups, exclusions, transformations — enlarge it further.",
        },
      ],
    },

    {
      heading: "Two error rates",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Family-wise error rate (FWER)",
              description:
                "The probability of making even one false rejection across the whole family. " +
                "Controlled by Bonferroni: test each hypothesis at α/m.",
            },
            {
              term: "False discovery rate (FDR)",
              description:
                "The expected proportion of your rejections that are false. Controlled by " +
                "Benjamini–Hochberg: sort the p-values and reject the largest k with p₍ₖ₎ ≤ (k/m)α.",
            },
          ],
        },
        {
          kind: "prose",
          text:
            "The difference is what the guarantee is about. FWER says \"probably nothing in this " +
            "list is wrong.\" FDR says \"most of this list is right.\" Neither is stricter in every " +
            "sense — they answer different questions — but at large m Bonferroni is far more " +
            "conservative, and the power cost is severe.",
        },
        {
          kind: "table",
          headers: ["", "Bonferroni (FWER)", "Benjamini–Hochberg (FDR)"],
          rows: [
            ["Controls", "P(any false positive)", "E[false / total rejections]"],
            ["Threshold", "α/m for every test", "Step-up: (k/m)α"],
            ["Needs independence?", "No — it is the union bound", "Holds under independence and positive dependence"],
            ["At m = 20,000", "Each test at 2.5×10⁻⁶ — power collapses", "Retains substantial power"],
            ["Right when", "One false claim is unacceptable", "Output is a shortlist for follow-up"],
          ],
        },
      ],
    },

    {
      heading: "Choosing between them",
      blocks: [
        {
          kind: "prose",
          text:
            "Use Bonferroni when m is small and a single false positive is costly — a confirmatory " +
            "trial with a handful of pre-specified endpoints, or a regulatory submission where one " +
            "erroneous claim discredits the whole. Use Benjamini–Hochberg when m is large and you " +
            "are screening rather than confirming: 20,000 genes tested for differential expression, " +
            "or thousands of candidate features, where the output is a shortlist someone will " +
            "validate and tolerating 5% false discoveries among the hits is entirely reasonable.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Bonferroni needs no independence at all",
          text:
            "It follows from the union bound, P(∪Aᵢ) ≤ ΣP(Aᵢ), which holds for any dependence " +
            "structure. That is why it is conservative: overlapping rejection events are counted " +
            "more than once. The looseness is the price of assuming nothing.",
        },
        {
          kind: "prose",
          text:
            "The alternative to correcting is not correcting *and saying so*: pre-register which " +
            "comparison is primary, report the rest as exploratory, and let the reader apply their " +
            "own discount. What is not defensible is running many and presenting one as though it " +
            "had been the only question.",
        },
      ],
    },

    {
      heading: "Worked example: a screening study",
      blocks: [
        {
          kind: "example",
          title: "Bonferroni versus BH on the same p-values",
          problem:
            "Ten tests give p-values 0.001, 0.008, 0.019, 0.024, 0.041, 0.06, 0.30, 0.44, 0.71, 0.90. " +
            "Apply both procedures at α = 0.05.",
          steps: [
            "Bonferroni: threshold 0.05/10 = 0.005. Only p = 0.001 survives — 1 rejection.",
            "BH: compare p₍ₖ₎ against (k/10)(0.05) = 0.005, 0.010, 0.015, 0.020, 0.025, 0.030, …",
            "k=1: 0.001 ≤ 0.005 ✓;  k=2: 0.008 ≤ 0.010 ✓;  k=3: 0.019 > 0.015 ✗;",
            "k=4: 0.024 > 0.020 ✗;  k=5: 0.041 > 0.025 ✗. Largest k satisfying the rule is k = 2.",
            "BH is a step-up procedure: reject all hypotheses up to that largest k — 2 rejections.",
          ],
          answer:
            "Bonferroni rejects 1, BH rejects 2. With ten tests the gap is modest; at ten thousand it " +
            "is the difference between finding nothing and finding a usable shortlist.",
        },
      ],
    },
  ],

  references: [
    { source: "Benjamini & Hochberg (1995), JRSS-B", locator: "Controlling the false discovery rate" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, multiple testing" },
    { source: "Mathlingo assessment bank", locator: "assessments/beyond-a-single-comparison.md" },
  ],
};
