import type { WikiArticle } from "./types";

export const oneSampleProportionsZTestWiki: WikiArticle = {
  conceptId: "one-sample-proportions-z-test",
  summary:
    "The one-sample proportions z-test asks whether a population proportion equals a hypothesised " +
    "value p₀. Because a Bernoulli distribution's variance is determined by its mean, the null " +
    "hypothesis fixes the variance too — so the test uses p₀ in the standard error, not p̂. That " +
    "asymmetry between the test and the corresponding confidence interval is the detail most often " +
    "got wrong.",

  sections: [
    {
      heading: "The test",
      blocks: [
        {
          kind: "formula",
          latex: "Z = (p̂ − p₀) / √(p₀(1 − p₀)/n)   ~  N(0, 1) under H₀",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "p₀ in the test, p̂ in the interval",
          text:
            "For a Bernoulli variable, Var = p(1 − p) is a function of the mean. Under H₀ we are " +
            "asserting p = p₀, so the null variance is p₀(1 − p₀)/n and that is what belongs in the " +
            "test's denominator. A confidence interval makes no such assertion, so it uses " +
            "√(p̂(1 − p̂)/n). Using p̂ in the test is a common and avoidable error.",
        },
        {
          kind: "prose",
          text:
            "This is a normal approximation to a binomial. The usual adequacy check is that both " +
            "np₀ ≥ 10 and n(1 − p₀) ≥ 10; below that, use an exact binomial test instead.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Is the conversion rate still 10%?",
          problem:
            "Historic conversion is 10%. After a redesign, 1,120 of 10,000 visitors convert. Test " +
            "H₀: p = 0.10 at α = 0.05.",
          steps: [
            "p̂ = 1,120/10,000 = 0.112.",
            "Null SE = √(0.10 × 0.90 / 10,000) = √(9 × 10⁻⁶) = 0.003.",
            "Z = (0.112 − 0.100)/0.003 = 4.0.",
            "Check the approximation: np₀ = 1,000 and n(1 − p₀) = 9,000, both far above 10.",
          ],
          answer:
            "Reject decisively; two-sided p ≈ 0.00006. The 95% interval uses p̂ in its SE: " +
            "√(0.112 × 0.888/10,000) = 0.00315, giving 0.112 ± 0.0062 = [0.1058, 0.1182].",
        },
        {
          kind: "prose",
          text:
            "Note that the two standard errors — 0.00300 for the test and 0.00315 for the interval — " +
            "differ slightly, exactly because one assumes H₀ and the other does not. With p̂ far from " +
            "p₀ the gap grows, and so does the importance of using the right one.",
        },
      ],
    },

    {
      heading: "Intervals for a proportion",
      blocks: [
        {
          kind: "prose",
          text:
            "The Wald interval p̂ ± z√(p̂(1 − p̂)/n) is standard and badly behaved near 0 and 1, where " +
            "its width collapses toward zero and its coverage falls well below nominal. Two better " +
            "defaults exist:",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Agresti–Coull: add 2 successes and 2 failures, then apply Wald. A one-line change, and " +
              "equivalent to shrinking toward ½ with a Beta(2,2) prior.",
            "Wilson score: invert the test using the null variance rather than the plug-in variance. " +
              "Asymmetric, never leaves [0, 1], and accurate at small n.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The rule of three",
          text:
            "If 0 successes are observed in n trials, an approximate 95% upper bound on p is 3/n. " +
            "Zero events in 300 trials is consistent with a rate as high as about 1%, which is a far " +
            "more useful statement than the Wald interval's assertion that p = 0.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "Ch. 9–10, Interval Estimation and Asymptotic Evaluations" },
    { source: "Mathlingo assessment bank", locator: "assessments/named-tests-and-resampling.md" },
  ],
};
