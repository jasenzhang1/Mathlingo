import type { WikiArticle } from "./types";

export const pairedTTestWiki: WikiArticle = {
  conceptId: "paired-t-test",
  summary:
    "When two measurements come from the same subject, the paired t-test collapses each pair into " +
    "its difference and runs a one-sample t-test on those differences. That reduction removes " +
    "between-subject variability from the comparison entirely, which is why pairing often multiplies " +
    "power several times over on exactly the same data.",

  sections: [
    {
      heading: "The reduction",
      blocks: [
        {
          kind: "formula",
          latex: "dᵢ = X₁ᵢ − X₂ᵢ,    T = d̄ / (s_d/√n)   ~  t_{n−1} under H₀: μ_d = 0",
          caption: "n is the number of pairs, not the number of measurements",
        },
        {
          kind: "prose",
          text:
            "There is no new theory here — it is the one-sample t-test applied to a derived dataset. " +
            "The statistical content is entirely in the decision to difference, which is licensed by " +
            "the design of the study rather than by anything visible in the numbers.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The degrees of freedom are n − 1 in pairs",
          text:
            "With 40 subjects measured twice you have 80 measurements but 40 differences, so df = 39, " +
            "not 78. Counting measurements instead of pairs is a frequent slip and makes the test " +
            "anti-conservative.",
        },
      ],
    },

    {
      heading: "Why pairing wins",
      blocks: [
        {
          kind: "prose",
          text:
            "For paired data, Var(X₁ − X₂) = σ₁² + σ₂² − 2·Cov(X₁, X₂). When the two measurements are " +
            "positively correlated — which is the whole point of measuring the same subject twice — " +
            "the covariance term subtracts, and the variance of the difference is smaller than the " +
            "unpaired analysis assumes. Treating paired data as independent discards that subtraction " +
            "and inflates the standard error.",
        },
        {
          kind: "example",
          title: "The same data, analysed two ways",
          problem:
            "Ten subjects are measured before and after. Between-subject SD is 15 in both conditions; " +
            "the before/after correlation is 0.9. Each subject improves by about 3 units.",
          steps: [
            "Unpaired SE of the difference: √(15²/10 + 15²/10) = √45 ≈ 6.7. T ≈ 3/6.7 = 0.45 — nowhere near significant.",
            "Paired: Var(d) = 225 + 225 − 2(0.9)(225) = 90, so s_d ≈ 9.49.",
            "Paired SE = 9.49/√10 ≈ 3.0. T ≈ 3/3.0 = 1.0 — still not significant here, but the " +
              "statistic has more than doubled.",
          ],
          answer:
            "Pairing cut the standard error from 6.7 to 3.0 — a factor of 2.2 — on identical " +
            "measurements. Achieving that by brute force would have required roughly five times the " +
            "subjects.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Pairing is a design decision, not an analysis choice",
          text:
            "You cannot pair data that was not collected in pairs, and you must pair data that was. " +
            "The gain comes from the study design; the analysis merely has to respect it.",
        },
      ],
    },

    {
      heading: "Assumptions and limits",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "The differences are approximately normal — not the original measurements. Differencing " +
              "often normalises skewed data, so this is a weaker requirement than it sounds.",
            "Pairs are independent of one another, even though the two members of a pair are not.",
            "Pairing must be genuine: the same subject, matched twins, or a matched-pairs design — " +
              "not two groups sorted and lined up.",
          ],
        },
        {
          kind: "prose",
          text:
            "The cost of pairing is one degree of freedom per pair relative to an unpaired design of " +
            "the same total size. When the correlation is near zero that trade is a slight loss; the " +
            "break-even is around ρ = 0. In practice repeated measures on the same subject correlate " +
            "far above that, so pairing is almost always the right call when the design permits it.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§11.2, Comparing Two Treatments" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Mathlingo assessment bank", locator: "assessments/named-tests-and-resampling.md" },
  ],
};
