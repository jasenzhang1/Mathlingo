import type { WikiArticle } from "./types";

export const samplingDistributionWiki: WikiArticle = {
  conceptId: "sampling-distribution",
  summary:
    "The sampling distribution is the distribution of a statistic across hypothetical repeated " +
    "samples from the same population. It is the single most important idea in inferential " +
    "statistics and the one most often skipped: standard errors, confidence intervals, p-values, and " +
    "power are all statements about a sampling distribution. It is not the distribution of the data, " +
    "and confusing the two is the central error of the topic.",

  sections: [
    {
      heading: "Three distributions, kept apart",
      blocks: [
        {
          kind: "table",
          headers: ["Distribution", "What varies", "Spread"],
          rows: [
            ["Population", "Individual units in the population", "σ"],
            ["Sample (the data)", "The n values you actually observed", "≈ σ, and does not shrink with n"],
            ["Sampling distribution of X̄", "X̄ across hypothetical repeat samples", "σ/√n — shrinks with n"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A histogram of your data is not a sampling distribution",
          text:
            "Plotting the n observations shows the population's shape, and it does not get narrower " +
            "as you collect more data — it gets better resolved. The sampling distribution is a " +
            "distribution over a statistic, and it is the one that concentrates.",
        },
      ],
    },

    {
      heading: "The sampling distribution of the sample mean",
      blocks: [
        {
          kind: "formula",
          latex: "E[X̄] = μ        SD(X̄) = σ/√n",
          caption: "Centre and spread, for any population with finite variance",
        },
        {
          kind: "prose",
          text:
            "These two facts require only i.i.d. sampling and a finite variance — no normality. What " +
            "normality would add is the shape. Two separate results supply it:",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "If the population is normal, X̄ is exactly normal for every n, including n = 1.",
            "If the population is not normal, the central limit theorem makes X̄ approximately normal " +
              "for large n, whatever the population's shape — provided σ² is finite.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "There is no universal “large enough n”",
          text:
            "n ≥ 30 is a rule of thumb, not a theorem. Symmetric light-tailed populations are fine at " +
            "n = 10; strongly skewed ones can still show visible skew in X̄ at n = 1000. The relevant " +
            "quantity is the population's skewness, which is what the Berry–Esseen bound formalises.",
        },
      ],
    },

    {
      heading: "Why the whole framework needs it",
      blocks: [
        {
          kind: "prose",
          text:
            "Every inferential statement is a claim about where an observed statistic sits within its " +
            "sampling distribution. A p-value is a tail area of one. A confidence interval is built by " +
            "inverting one. Power is the probability of landing in the rejection region under the " +
            "alternative's sampling distribution. Remove the concept and none of the others can even " +
            "be stated.",
        },
        {
          kind: "example",
          title: "Reading a single sample against the distribution it came from",
          problem:
            "A population has μ = 100 and σ = 15. You draw n = 25 and observe X̄ = 106. Is that surprising?",
          steps: [
            "The sampling distribution of X̄ has centre 100 and SD 15/√25 = 3.",
            "106 sits (106 − 100)/3 = 2 standard errors above the centre.",
            "Under approximate normality, values at least 2 SEs from centre occur about 4.6% of the time.",
          ],
          answer:
            "Mildly surprising — roughly a 1-in-22 outcome two-sided. Note that 106 is entirely " +
            "unremarkable as an individual observation, which would sit only 0.4 population SDs out. " +
            "The same number is ordinary for a unit and unusual for a mean of 25.",
        },
        {
          kind: "prose",
          text:
            "That last contrast is the concept in miniature. Whether a number is surprising depends " +
            "on which distribution you are asking about, and inference is always asking about the " +
            "sampling distribution.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§5.2–5.3, Sampling from the Normal Distribution" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 5, Convergence of Random Variables" },
    { source: "Mathlingo assessment bank", locator: "assessments/hypothesis-testing-machinery.md" },
  ],
};
