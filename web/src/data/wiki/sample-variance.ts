import type { WikiArticle } from "./types";

export const sampleVarianceWiki: WikiArticle = {
  conceptId: "sample-variance",
  summary:
    "The sample variance s² = (1/(n−1))Σ(Xᵢ − X̄)² estimates the population variance σ². The n − 1 " +
    "in the denominator is not a convention or a small-sample fudge: dividing by n gives an estimator " +
    "that is biased low at every sample size, for a reason that is easy to state and worth " +
    "understanding, because the identical accounting reappears as n − p in regression.",

  sections: [
    {
      heading: "Why n − 1",
      blocks: [
        { kind: "formula", latex: "s² = (1/(n−1)) Σᵢ (Xᵢ − X̄)²", caption: "Unbiased for σ²" },
        {
          kind: "prose",
          text:
            "What we would like to compute is Σ(Xᵢ − μ)², but μ is unknown, so X̄ is substituted. " +
            "X̄ is precisely the value that minimises Σ(Xᵢ − c)² over all c. So the sum of squared " +
            "deviations from X̄ is smaller than the sum from μ — strictly smaller whenever X̄ ≠ μ, " +
            "which is almost always. Dividing that too-small sum by n inherits the shortfall.",
        },
        {
          kind: "prose",
          text:
            "The size of the shortfall is exact. From the identity Σ(Xᵢ − μ)² = Σ(Xᵢ − X̄)² + n(X̄ − μ)², " +
            "taking expectations gives nσ² = E[Σ(Xᵢ − X̄)²] + σ², since E[(X̄ − μ)²] = σ²/n. Hence " +
            "E[Σ(Xᵢ − X̄)²] = (n − 1)σ², and dividing by n − 1 restores unbiasedness exactly.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The degrees-of-freedom view",
          text:
            "The n residuals Xᵢ − X̄ satisfy one linear constraint: they sum to zero. Knowing any " +
            "n − 1 of them determines the last, so only n − 1 are free. Estimating the mean consumed " +
            "one degree of freedom, and the divisor counts what is left. In regression, p parameters " +
            "are estimated and the divisor is n − p — the same accounting.",
        },
      ],
    },

    {
      heading: "s is not unbiased for σ",
      blocks: [
        {
          kind: "prose",
          text:
            "s² is unbiased for σ², but s is biased low for σ. The square root is concave, so by " +
            "Jensen's inequality E[√(s²)] < √(E[s²]) = σ. Unbiasedness does not survive nonlinear " +
            "transformation, and the bias-correcting constant for s depends on both n and the " +
            "distribution. In practice the bias is small and nobody corrects it — but the claim " +
            "“s is an unbiased estimator of the standard deviation” is simply false.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Two conventions in software",
          text:
            "NumPy's np.var and np.std default to dividing by n (ddof=0). R's var and sd divide by " +
            "n − 1. Pandas defaults to n − 1. Check ddof before comparing numbers across tools; at " +
            "small n the difference is not cosmetic.",
        },
      ],
    },

    {
      heading: "Worked example: the two denominators",
      blocks: [
        {
          kind: "example",
          title: "n = 5, by hand",
          problem: "Data: 2, 4, 4, 4, 6. Compute the sample variance both ways.",
          steps: [
            "X̄ = 20/5 = 4.",
            "Squared deviations: 4, 0, 0, 0, 4. Sum = 8.",
            "Divide by n − 1 = 4: s² = 2, so s ≈ 1.41.",
            "Divide by n = 5: 1.6 — smaller, as the bias argument predicts.",
          ],
          answer:
            "s² = 2. The n-divisor answer of 1.6 is 20% low here; the gap is (n − 1)/n and closes " +
            "slowly, so it matters most exactly when data is scarcest.",
        },
        {
          kind: "prose",
          text:
            "One more consequence worth carrying forward: under normality, (n − 1)s²/σ² follows a " +
            "chi-square distribution with n − 1 degrees of freedom, and s² is independent of X̄. That " +
            "independence is what makes the t-statistic's denominator legitimate, and it is the reason " +
            "the t-distribution has n − 1 degrees of freedom rather than n.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§5.3, Sampling from the Normal Distribution" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 6, Models, Statistical Inference and Learning" },
    { source: "Mathlingo assessment bank", locator: "assessments/statistics-foundations.md" },
  ],
};
