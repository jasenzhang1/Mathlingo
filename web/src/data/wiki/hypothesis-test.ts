import type { WikiArticle } from "./types";

export const hypothesisTestWiki: WikiArticle = {
  conceptId: "hypothesis-test",
  summary:
    "A hypothesis test is a decision procedure with a controlled error rate. You assume H₀, compute " +
    "how surprising the data would be under that assumption, and reject if it is surprising enough. " +
    "The logic is deliberately asymmetric — rejecting is a strong conclusion, failing to reject is a " +
    "weak one — and almost every misuse of testing comes from forgetting that asymmetry.",

  sections: [
    {
      heading: "The procedure",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "State H₀ and H₁, and pick α — all before seeing the data.",
            "Check the assumptions the intended test requires.",
            "Compute the test statistic.",
            "Compare it to its null distribution: rejection region, or equivalently a p-value.",
            "Report the decision alongside the effect size and a confidence interval.",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "H₀, the null",
              description:
                "The boring hypothesis: no effect, no difference, no association. Always contains the " +
                "equality, because it must pin down a specific distribution to compute against.",
            },
            {
              term: "H₁, the alternative",
              description: "What you suspect. Gets the strict inequality, and sets the test's direction.",
            },
          ],
        },
      ],
    },

    {
      heading: "The asymmetry, and what it forbids",
      blocks: [
        {
          kind: "prose",
          text:
            "The structure is proof by contradiction with a probabilistic contradiction. Finding the " +
            "data too surprising under H₀ lets you reject it. Failing to find it surprising establishes " +
            "nothing: an underpowered study fails to reject almost everything, including large real " +
            "effects. Absence of evidence is not evidence of absence.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "You never accept H₀",
          text:
            "“p > 0.05, so there is no effect” is the single most common error in applied statistics. " +
            "The honest phrasing is “we did not detect an effect,” and it should be accompanied by the " +
            "confidence interval, which shows which effect sizes remain plausible.",
        },
        {
          kind: "prose",
          text:
            "If you genuinely need to establish that an effect is negligible, testing cannot be run in " +
            "reverse — you need an equivalence test (two one-sided tests against a pre-specified " +
            "margin), or a confidence interval narrow enough to exclude everything that would matter. " +
            "Establishing equivalence generally requires more data than detecting an effect.",
        },
      ],
    },

    {
      heading: "Worked example: an A/B test",
      blocks: [
        {
          kind: "example",
          title: "A conversion lift that does not clear the bar",
          problem:
            "20,000 users per arm. Control: 2,000 conversions (10.0%). Treatment: 2,080 (10.4%). " +
            "Test H₀: p₁ = p₂ at α = 0.05.",
          steps: [
            "Under H₀ the rates are equal, so pool: p̂ = 4,080/40,000 = 0.102.",
            "SE = √(0.102 × 0.898 × (1/20,000 + 1/20,000)) = 0.00303.",
            "z = (0.104 − 0.100)/0.00303 = 1.32, so two-sided p ≈ 0.19.",
            "1.32 does not exceed 1.96, so we fail to reject.",
          ],
          answer:
            "Not significant. The 95% interval for the difference is 0.004 ± 1.96(0.00303) = " +
            "[−0.0019, 0.0099] — anywhere from a small loss to a full point of gain.",
        },
        {
          kind: "prose",
          text:
            "The interval is what makes this reportable. It says the study was consistent with a " +
            "meaningful gain and also with a small loss — that is, it was uninformative. Detecting a " +
            "0.4-point lift on a 10% base at 80% power needs roughly 90,000 per arm, so this " +
            "experiment was about a quarter of the size required. “Not significant” here means “we " +
            "learned little,” not “no effect.”",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Pool for the test, don't pool for the interval",
          text:
            "The test uses the pooled proportion because H₀ asserts the rates are equal. The " +
            "confidence interval does not assume that, so it uses the separate p̂₁ and p̂₂. Using the " +
            "wrong one is a common slip.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "Ch. 8, Hypothesis Testing" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Mathlingo assessment bank", locator: "assessments/hypothesis-testing-machinery.md" },
  ],
};
