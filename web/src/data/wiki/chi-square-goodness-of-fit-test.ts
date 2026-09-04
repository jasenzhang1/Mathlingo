import type { WikiArticle } from "./types";

export const chiSquareGoodnessOfFitTestWiki: WikiArticle = {
  conceptId: "chi-square-goodness-of-fit-test",
  summary:
    "The goodness-of-fit test asks whether observed category counts are consistent with a " +
    "hypothesised distribution. The statistic is the same Σ(O − E)²/E as the test of independence; " +
    "what changes is where the expected counts come from — a claimed distribution rather than the " +
    "product of table margins — and how the degrees of freedom are counted.",

  sections: [
    {
      heading: "The test",
      blocks: [
        {
          kind: "formula",
          latex: "X² = Σᵢ (Oᵢ − Eᵢ)² / Eᵢ,    Eᵢ = n·pᵢ   ~  χ²_{k−1−m} under H₀",
          caption: "k categories, m parameters estimated from the data",
        },
        {
          kind: "prose",
          text:
            "The degrees of freedom deserve attention. Start with k categories. Subtract 1 because the " +
            "counts must sum to n, so the last is determined by the others. Subtract one more for each " +
            "parameter you estimated from the same data in order to compute the expected counts.",
        },
        {
          kind: "table",
          headers: ["Hypothesis", "Parameters estimated", "df"],
          rows: [
            ["A fair die, 6 faces", "0 — all pᵢ = 1/6 specified", "5"],
            ["Poisson with λ given", "0", "k − 1"],
            ["Poisson with λ estimated by X̄", "1", "k − 2"],
            ["Normal with μ, σ estimated", "2", "k − 3"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Estimating parameters costs degrees of freedom",
          text:
            "Fitting λ or (μ, σ) to the same data you then test against makes the fit look better than " +
            "it is. Failing to subtract for those parameters inflates the df, which inflates the " +
            "critical value's tail area and makes the test too willing to accept the model.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Is the die fair?",
          problem:
            "A die is rolled 120 times with counts 15, 18, 22, 20, 25, 20 for faces 1 through 6. " +
            "Test fairness at α = 0.05.",
          steps: [
            "Under H₀ each Eᵢ = 120/6 = 20.",
            "Deviations: −5, −2, 2, 0, 5, 0. Squares: 25, 4, 4, 0, 25, 0. Sum = 58.",
            "X² = 58/20 = 2.9.",
            "df = 6 − 1 = 5; critical value 11.07.",
          ],
          answer:
            "2.9 < 11.07, so no evidence against fairness (p ≈ 0.72). The counts vary, but by no more " +
            "than 120 rolls of a fair die routinely would.",
        },
        {
          kind: "prose",
          text:
            "This is a good illustration of why “failing to reject” is not proof: 120 rolls has little " +
            "power against mild unfairness. A die weighted to give face 6 a probability of 0.2 instead " +
            "of 0.167 would usually pass this test. The result says the data is consistent with " +
            "fairness, not that the die is fair.",
        },
      ],
    },

    {
      heading: "Limitations",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "Requires binning for continuous data, and the result depends on the bins chosen — " +
              "Kolmogorov–Smirnov or Anderson–Darling avoid that arbitrariness.",
            "Expected counts must be adequate (≥ 5 as a rule of thumb); sparse categories are usually " +
              "merged, which is itself a data-dependent choice.",
            "It detects any departure from the hypothesised distribution without saying which — " +
              "inspect the per-cell contributions to find out.",
            "At very large n it rejects nearly every model, because no real distribution is exactly " +
              "Poisson or exactly normal.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The same statistic, two tests",
          text:
            "Goodness of fit and the test of independence share the Σ(O − E)²/E form and differ only " +
            "in how E is computed and how df is counted. Recognising them as one idea applied twice " +
            "is easier than memorising them as two procedures.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§10.3, Asymptotic Evaluations" },
    { source: "Mathlingo assessment bank", locator: "assessments/named-tests-and-resampling.md" },
  ],
};
