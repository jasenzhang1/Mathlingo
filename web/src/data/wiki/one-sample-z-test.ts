import type { WikiArticle } from "./types";

export const oneSampleZTestWiki: WikiArticle = {
  conceptId: "one-sample-z-test",
  summary:
    "The one-sample z-test asks whether a population mean equals a hypothesised value, in the " +
    "special case where the population standard deviation σ is already known. That case is rare in " +
    "practice, which makes the test more valuable as the template every other test is built from " +
    "than as a tool you will often reach for.",

  sections: [
    {
      heading: "The test",
      blocks: [
        {
          kind: "formula",
          latex: "Z = (X̄ − μ₀) / (σ/√n)   ~  N(0, 1) under H₀",
        },
        {
          kind: "definitions",
          items: [
            { term: "H₀", description: "μ = μ₀" },
            { term: "H₁", description: "μ ≠ μ₀ (two-sided), or μ > μ₀ / μ < μ₀ (one-sided)" },
            { term: "Reject when", description: "|Z| > 1.96 at α = 0.05 two-sided" },
          ],
        },
        {
          kind: "prose",
          text:
            "The numerator is the distance between what you observed and what H₀ predicted; the " +
            "denominator is the standard error of that distance. Dividing converts an answer in the " +
            "data's units into a count of standard errors, which is what makes the tail probability " +
            "computable from a single standard table.",
        },
      ],
    },

    {
      heading: "Assumptions, and which ones bite",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "σ is known — genuinely known, not estimated from this sample.",
            "Observations are independent, drawn from the population of interest.",
            "X̄ is approximately normal — automatic if the population is normal, otherwise via the CLT " +
              "for large enough n.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Independence is the assumption that actually fails",
          text:
            "Non-normality is handled by the CLT at moderate n. Dependence is not handled by anything: " +
            "clustered or time-series data has an effective sample size well below n, so σ/√n " +
            "understates the true standard error and every p-value is too small.",
        },
        {
          kind: "prose",
          text:
            "When is σ genuinely known? Occasionally in manufacturing and instrument calibration, " +
            "where a process's variability has been characterised over years and only its centre is in " +
            "question. Almost never elsewhere — which is what the t-test exists to handle.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A calibrated filling machine",
          problem:
            "A machine is specified to fill 500 ml with a long-established σ = 4 ml. A sample of " +
            "n = 25 bottles averages 502.1 ml. Test at α = 0.05 whether the machine is off-target.",
          steps: [
            "H₀: μ = 500 versus H₁: μ ≠ 500.",
            "SE = 4/√25 = 0.8.",
            "Z = (502.1 − 500)/0.8 = 2.625.",
            "|2.625| > 1.96, so reject. Two-sided p = 2 × P(Z > 2.625) ≈ 0.0087.",
          ],
          answer:
            "Reject H₀ — the machine is overfilling. The 95% interval for μ is 502.1 ± 1.96(0.8) = " +
            "[500.53, 503.67], which excludes 500, as the duality with the test guarantees.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Significant does not mean important",
          text:
            "A 2.1 ml overfill on a 500 ml bottle is 0.4%. Whether that is worth a maintenance stop " +
            "is a business question the test cannot answer — which is why the interval, giving the " +
            "plausible range of the overfill, is the more useful output.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "Ch. 8, Hypothesis Testing" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Mathlingo assessment bank", locator: "assessments/named-tests-and-resampling.md" },
  ],
};
