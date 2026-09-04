import type { WikiArticle } from "./types";

export const confidenceIntervalWiki: WikiArticle = {
  conceptId: "confidence-interval",
  summary:
    "A confidence interval is a random interval constructed so that, across repeated samples, a " +
    "stated fraction of the intervals it produces contain the fixed unknown parameter. The " +
    "randomness lives in the interval, not in the parameter — which is why the most natural-sounding " +
    "interpretation of a computed interval is the wrong one. Intervals are strictly more informative " +
    "than the corresponding tests, and should be reported wherever a p-value would be.",

  sections: [
    {
      heading: "What 95% confidence means",
      blocks: [
        {
          kind: "formula",
          latex: "P( L(X) ≤ θ ≤ U(X) ) = 1 − α,  for every θ",
          caption: "Coverage is a property of the procedure, and must hold for all θ",
        },
        {
          kind: "prose",
          text:
            "θ is a fixed unknown constant. L and U are functions of the data and therefore random. " +
            "Once you compute [0.82, 0.91], that specific interval either contains θ or it does not — " +
            "the probability is 0 or 1, and you do not know which. What is 95% is the long-run hit " +
            "rate of the method that produced it.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "“There is a 95% probability that θ is in [0.82, 0.91]” is wrong",
          text:
            "It attributes randomness to a constant. The statement people want to make is a Bayesian " +
            "credible-interval statement, and it is entirely valid there — because in that framework " +
            "θ is a random variable with a posterior. It is not valid for a frequentist interval.",
        },
      ],
    },

    {
      heading: "Construction, and the standard forms",
      blocks: [
        {
          kind: "prose",
          text:
            "The general recipe is to find a pivot — a function of data and parameter whose " +
            "distribution is free of unknowns — bracket it between its quantiles, and invert the " +
            "inequality to isolate the parameter. For a normal mean with σ known, " +
            "Z = (X̄ − μ)/(σ/√n) is N(0,1) for every μ, and inverting gives the familiar form.",
        },
        {
          kind: "table",
          headers: ["Parameter", "Interval", "Critical value"],
          rows: [
            ["Mean, σ known", "X̄ ± z_{α/2}·σ/√n", "1.96 at 95%"],
            ["Mean, σ unknown", "X̄ ± t_{n−1,α/2}·s/√n", "t, n − 1 df"],
            ["Proportion (Wald)", "p̂ ± z_{α/2}·√(p̂(1−p̂)/n)", "1.96 at 95%"],
            ["Proportion (Agresti–Coull)", "add 2 successes and 2 failures, then Wald", "1.96 at 95%"],
            ["Difference of means", "(X̄₁ − X̄₂) ± t·√(s₁²/n₁ + s₂²/n₂)", "t, Welch df"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The Wald interval fails at the boundary",
          text:
            "At p̂ = 0 its width is zero — it claims certainty that the event is impossible, from " +
            "having merely not seen it yet. Its actual coverage can fall well below 95% for moderate n " +
            "and extreme p. Agresti–Coull fixes this with a one-line change and should be the default.",
        },
      ],
    },

    {
      heading: "Reading intervals correctly",
      blocks: [
        {
          kind: "example",
          title: "Two intervals that overlap, and a significant difference",
          problem:
            "Group A: 10 ± 1.96, Group B: 13.2 ± 1.96 (each SE = 1). The intervals overlap. Is the " +
            "difference significant?",
          steps: [
            "Intervals are [8.04, 11.96] and [11.24, 15.16] — they overlap on [11.24, 11.96].",
            "But the SE of the difference is √(1² + 1²) = 1.414, not 1 + 1 = 2.",
            "z = 3.2/1.414 = 2.26, p ≈ 0.024.",
          ],
          answer:
            "Significant, despite the overlap. Non-overlap requires the gap to exceed 1.96(SE₁) + " +
            "1.96(SE₂); significance requires only that it exceed 1.96√(SE₁² + SE₂²), which is smaller. " +
            "Always test the difference directly rather than eyeballing two intervals.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "An interval contains a test for every null value",
          text:
            "A two-sided level-α test rejects θ₀ exactly when θ₀ falls outside the 1 − α interval. So " +
            "the interval reports the test's conclusion for every possible null at once, plus the " +
            "effect size — strictly more than a single p-value conveys.",
        },
        {
          kind: "prose",
          text:
            "One further distinction worth keeping straight: a confidence interval covers a parameter " +
            "and narrows toward zero width as n grows. A prediction interval covers a future " +
            "observation, carries an extra √(1 + 1/n) factor, and converges to the population spread " +
            "rather than to zero. Reporting the former where the latter is meant produces forecasts " +
            "that are far too confident.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "Ch. 9, Interval Estimation" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 6–7, Inference and the Bootstrap" },
    { source: "Mathlingo assessment bank", locator: "assessments/hypothesis-testing-machinery.md" },
  ],
};
