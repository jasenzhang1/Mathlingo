import type { WikiArticle } from "./types";

export const kolmogorovSmirnovTestWiki: WikiArticle = {
  conceptId: "kolmogorov-smirnov-test",
  summary:
    "The KS test compares distributions through the largest vertical gap between their cumulative " +
    "distribution functions. Because it works on the CDF directly it needs no binning, which is the " +
    "arbitrary choice that weakens a chi-square goodness-of-fit test on continuous data. Its null " +
    "distribution is also free of the distribution being tested — a genuinely distribution-free test.",

  sections: [
    {
      heading: "The statistic",
      blocks: [
        {
          kind: "formula",
          latex: "D = supₓ | Fₙ(x) − F(x) |",
          caption: "One-sample: empirical CDF against a hypothesised F",
        },
        {
          kind: "formula",
          latex: "D = supₓ | F₁,ₙ(x) − F₂,ₘ(x) |",
          caption: "Two-sample: two empirical CDFs against each other",
        },
        {
          kind: "prose",
          text:
            "The empirical CDF Fₙ is a step function rising by 1/n at each observation, so the " +
            "supremum is attained at a data point and the computation is a finite scan rather than " +
            "a true supremum. Check the gap immediately before and immediately after each step: the " +
            "largest discrepancy can sit on either side of a jump.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the null distribution is universal",
          text:
            "By the probability integral transform, F(X) is Uniform(0,1) for any continuous F. So " +
            "testing against any continuous distribution is equivalent to testing uniformity after " +
            "transforming, and the null distribution of D does not depend on which F you named. One " +
            "table of critical values serves every continuous distribution.",
        },
      ],
    },

    {
      heading: "Against the chi-square goodness-of-fit test",
      blocks: [
        {
          kind: "table",
          headers: ["", "Chi-square GoF", "Kolmogorov-Smirnov"],
          rows: [
            ["Data", "Counts, or continuous data forced into bins", "Continuous data directly"],
            ["Arbitrary choices", "Bin boundaries and bin count", "None"],
            ["Sensitive to", "Departures anywhere, weighted by cell", "Departures near the centre of the distribution"],
            ["Estimated parameters", "Handled by subtracting df", "Invalidates the standard critical values"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Estimating parameters from the same data breaks the test",
          text:
            "The standard KS critical values assume F is fully specified in advance. Fit μ and σ to " +
            "the data and then test normality against the fitted curve, and the test becomes far too " +
            "conservative — the fitted distribution tracks the data by construction. The Lilliefors " +
            "correction exists precisely for that case, and the Anderson–Darling test is the usual " +
            "modern choice.",
        },
        {
          kind: "prose",
          text:
            "KS is also comparatively insensitive in the tails, because the CDF is pinned near 0 and " +
            "1 at the extremes and the vertical gap cannot be large there. When tail behaviour is the " +
            "thing you care about — risk work, extreme values — Anderson–Darling, which weights the " +
            "tails up, is the better instrument.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Testing four observations against Uniform(0,1)",
          problem:
            "Observed values 0.1, 0.2, 0.5, 0.7. Compute D against the Uniform(0,1) CDF, F(x) = x.",
          steps: [
            "The empirical CDF steps to 0.25, 0.50, 0.75, 1.00 at the four observations.",
            "Just before each jump, Fₙ is 0, 0.25, 0.50, 0.75 and F is 0.1, 0.2, 0.5, 0.7 — gaps 0.10, 0.05, 0.00, 0.05.",
            "Just after each jump, Fₙ is 0.25, 0.50, 0.75, 1.00 — gaps 0.15, 0.30, 0.25, 0.30.",
            "The largest of all eight is 0.30.",
          ],
          answer:
            "D = 0.30. The 0.05 critical value for n = 4 is about 0.624, so there is no evidence " +
            "against uniformity — as expected, since four observations can rule out very little.",
        },
        {
          kind: "prose",
          text:
            "Checking both sides of every jump is the step people skip. Here the maximum happens to " +
            "occur after a jump; had we looked only before them we would have reported 0.10 and been " +
            "wrong by a factor of three.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Givens & Hoeting, Computational Statistics", locator: "goodness-of-fit and EDF tests" },
    { source: "Mathlingo assessment bank", locator: "assessments/distribution-free-methods.md" },
  ],
};
