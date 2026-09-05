import type { WikiArticle } from "./types";

export const oneSampleTTestWiki: WikiArticle = {
  conceptId: "one-sample-t-test",
  summary:
    "The one-sample t-test is the z-test with σ replaced by the sample standard deviation s. That " +
    "single substitution changes the null distribution from N(0,1) to t with n − 1 degrees of " +
    "freedom, because the denominator is now itself random. Understanding why the distribution " +
    "changes — rather than memorising that it does — is what the concept is for.",

  sections: [
    {
      heading: "The test",
      blocks: [
        {
          kind: "formula",
          latex: "T = (X̄ − μ₀) / (s/√n)   ~  t_{n−1} under H₀",
        },
        {
          kind: "prose",
          text:
            "The arithmetic is identical to the z-test. What differs is the reference curve. Since s " +
            "varies from sample to sample, and sometimes comes out too small, the ratio takes extreme " +
            "values more often than a standard normal would. The t-distribution's heavier tails are " +
            "exactly that extra risk, priced in.",
        },
        {
          kind: "table",
          headers: ["n", "df", "t critical (two-sided, 0.05)", "vs z = 1.96"],
          rows: [
            ["5", "4", "2.776", "+42%"],
            ["10", "9", "2.262", "+15%"],
            ["30", "29", "2.045", "+4%"],
            ["100", "99", "1.984", "+1%"],
            ["∞", "∞", "1.960", "—"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where n − 1 comes from",
          text:
            "It is the same degree of freedom that s² spent estimating the mean. Under normality, " +
            "(n − 1)s²/σ² is chi-square with n − 1 df and is independent of X̄ — and a standard normal " +
            "divided by the root of an independent scaled chi-square is precisely the definition of a " +
            "t variable. The df in the test is inherited from the df in the variance estimate.",
        },
      ],
    },

    {
      heading: "Robustness",
      blocks: [
        {
          kind: "prose",
          text:
            "The t-test assumes the data are normal, but it is fairly robust to that assumption for " +
            "moderate n, because the CLT is doing the work for X̄. It is much less robust to heavy " +
            "skew at small n, and not robust at all to dependence or to outliers — a single extreme " +
            "value inflates s and can move X̄, degrading the test from both directions at once.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The t-test does not fix non-normality; it fixes unknown σ",
          text:
            "A common misreading is that the t-distribution is “for non-normal data.” It is the exact " +
            "null distribution *under normality* when σ is estimated. For genuinely non-normal small " +
            "samples, a rank-based test such as Wilcoxon or a bootstrap interval is the better tool.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Testing a mean with σ unknown",
          problem: "n = 16, X̄ = 52, s = 8. Test H₀: μ = 50 at α = 0.05, two-sided.",
          steps: [
            "SE = s/√n = 8/4 = 2.",
            "T = (52 − 50)/2 = 1.00, on 15 degrees of freedom.",
            "Critical value t_{15, 0.025} = 2.131.",
            "1.00 < 2.131, so fail to reject. p ≈ 0.333.",
          ],
          answer:
            "No evidence against μ = 50. The 95% interval is 52 ± 2.131(2) = [47.74, 56.26] — wide " +
            "enough to include 50 comfortably, which is the same conclusion stated more usefully.",
        },
        {
          kind: "prose",
          text:
            "Had we wrongly used z = 1.96, the interval would have been [48.08, 55.92] — narrower, " +
            "and still containing 50 here, but systematically overconfident. At n = 5 the same " +
            "shortcut understates the interval width by more than 40%.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§5.3, Sampling from the Normal Distribution" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Mathlingo assessment bank", locator: "assessments/named-tests-and-resampling.md" },
  ],
};
