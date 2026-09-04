import type { WikiArticle } from "./types";

export const twoSampleProportionsZTestWiki: WikiArticle = {
  conceptId: "two-sample-proportions-z-test",
  summary:
    "Comparing two rates is the test nearly every A/B experiment actually runs. It combines two " +
    "ideas already in place: the variance of a Bernoulli is fixed by its mean, so the null " +
    "determines the spread, and for independent samples variances add. The one detail that trips " +
    "people is that the test pools the two rates while the interval does not.",

  sections: [
    {
      heading: "The test",
      blocks: [
        {
          kind: "formula",
          latex: "Z = (p̂₁ − p̂₂) / √( p̂(1 − p̂) (1/n₁ + 1/n₂) ),   p̂ = (x₁ + x₂)/(n₁ + n₂)",
          caption: "p̂ is the pooled rate, used because H₀ says the two are equal",
        },
        {
          kind: "prose",
          text:
            "Under H₀: p₁ = p₂ there is a single common rate, and the best estimate of it uses all " +
            "the data — hence the pooled p̂. Since a Bernoulli's variance is p(1 − p), fixing the " +
            "rate fixes the variance too, so no separate spread parameter is estimated.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Pool for the test, not for the interval",
          text:
            "The confidence interval for p₁ − p₂ asserts nothing about equality, so it uses the " +
            "separate rates: √(p̂₁(1 − p̂₁)/n₁ + p̂₂(1 − p̂₂)/n₂). Using the pooled value there imports " +
            "an assumption the interval never made, and using the separate values in the test " +
            "discards the one H₀ gave you.",
        },
      ],
    },

    {
      heading: "Worked example: a checkout experiment",
      blocks: [
        {
          kind: "example",
          title: "A lift that does not clear the bar",
          problem:
            "20,000 users per arm. Control converts 2,000 (10.0%); treatment converts 2,080 (10.4%). " +
            "Test at α = 0.05 and give an interval for the difference.",
          steps: [
            "Pooled rate: p̂ = 4,080 / 40,000 = 0.102.",
            "Test SE = √(0.102 × 0.898 × (1/20,000 + 1/20,000)) = 0.00303.",
            "Z = 0.004 / 0.00303 = 1.32, so two-sided p ≈ 0.19 — not significant.",
            "Interval SE (unpooled) = √(0.10×0.90/20,000 + 0.104×0.896/20,000) = 0.00303.",
            "95% interval: 0.004 ± 1.96(0.00303) = [−0.0019, 0.0099].",
          ],
          answer:
            "No detectable difference. The interval runs from a small loss to a full point of gain, " +
            "so the experiment is consistent with both — which means it was uninformative, not that " +
            "the treatment does nothing.",
        },
        {
          kind: "prose",
          text:
            "Here the pooled and unpooled standard errors agree to three decimals, because the two " +
            "rates are close. They separate as the rates diverge, and that is exactly when the " +
            "distinction starts to matter.",
        },
      ],
    },

    {
      heading: "Sizing the experiment",
      blocks: [
        {
          kind: "prose",
          text:
            "Because the variance is determined by the baseline rate, the sample size needed to " +
            "detect a lift δ on a base rate p is roughly",
        },
        {
          kind: "formula",
          latex: "n ≈ 16 p(1 − p) / δ²   per arm   (α = 0.05, 80% power, two-sided)",
        },
        {
          kind: "prose",
          text:
            "For the example above — detecting 0.4 points on a 10% base — that is " +
            "16(0.1)(0.9)/0.004² = 90,000 per arm. The test ran at 20,000, under a quarter of what " +
            "the effect it was looking for required. The δ² in the denominator is the punishing " +
            "term: halving the lift you want to detect quadruples the cost.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Relative lift is the number people actually mean",
          text:
            "A 0.4-point move on a 10% base is a 4% relative lift. Product teams reason in relative " +
            "terms and the formula takes absolute δ — mixing them up understates the required sample " +
            "by orders of magnitude.",
        },
      ],
    },

    {
      heading: "Assumptions and their failure modes",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "Independence between and within arms. Repeat visits by the same user break it, and the " +
              "effective sample size is then well below the row count.",
            "Adequate expected counts — the usual check is at least about 10 successes and 10 " +
              "failures in each arm.",
            "A fixed sample size decided in advance. Stopping when the result first looks good is a " +
              "different procedure with a much higher error rate.",
            "Stable assignment: users are randomised once and stay in their arm.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The unit of randomisation is the unit of analysis",
          text:
            "If you randomise by user but count sessions, the sessions from one user are correlated " +
            "and the standard error is too small. Analyse at the level you randomised, or use a " +
            "method that accounts for the clustering.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§10.4, comparing two populations" },
    { source: "Mathlingo assessment bank", locator: "assessments/beyond-a-single-comparison.md" },
  ],
};
