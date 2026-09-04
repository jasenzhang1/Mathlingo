import type { WikiArticle } from "./types";

export const pearsonCorrelationWiki: WikiArticle = {
  conceptId: "pearson-correlation",
  summary:
    "The sample Pearson correlation r estimates the population correlation ρ from data, by " +
    "substituting sample moments for population ones term by term. It measures linear association " +
    "only, always lands in [−1, 1], and is unchanged by any linear rescaling of either variable. " +
    "Because it is a statistic rather than a parameter, it carries sampling variability — which is " +
    "why an r reported without a sample size is close to uninterpretable.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "r = Σᵢ(xᵢ − x̄)(yᵢ − ȳ) / √( Σᵢ(xᵢ − x̄)² · Σᵢ(yᵢ − ȳ)² )",
          caption: "Sample Pearson correlation coefficient",
        },
        {
          kind: "prose",
          text:
            "Compare it to the population definition ρ = Cov(X, Y)/(σ_X σ_Y). The numerator is the " +
            "sample covariance's sum of cross-products; each denominator factor is the sample " +
            "standard deviation's sum of squares. Every population quantity in ρ has been replaced " +
            "by its sample analogue, and the (n − 1) divisors cancel between numerator and " +
            "denominator, so they never need to be written.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "r = +1",
              description: "The points lie exactly on a line of positive slope. Not “a strong relationship” — an exact one.",
            },
            { term: "r = 0", description: "No linear association. Says nothing about any other kind." },
            { term: "r = −1", description: "The points lie exactly on a line of negative slope." },
            {
              term: "r²",
              description:
                "The fraction of variance in y explained by the least-squares line on x. For simple " +
                "linear regression this is exactly the R² of the fit.",
            },
          ],
        },
        {
          kind: "example",
          title: "Computing r by hand",
          problem: "For the points (1, 2), (2, 4), (3, 5), (4, 8), compute r.",
          steps: [
            "x̄ = 2.5, ȳ = 4.75.",
            "Deviations in x: −1.5, −0.5, 0.5, 1.5. In y: −2.75, −0.75, 0.25, 3.25.",
            "Σ(xᵢ − x̄)(yᵢ − ȳ) = 4.125 + 0.375 + 0.125 + 4.875 = 9.5.",
            "Σ(xᵢ − x̄)² = 5.0;  Σ(yᵢ − ȳ)² = 18.75.",
            "r = 9.5 / √(5 · 18.75) = 9.5 / √93.75.",
          ],
          answer:
            "r ≈ 0.9812, so r² ≈ 0.963. With n = 4 that is a very high correlation on very little " +
            "evidence — see the sampling-variability section below before believing it.",
        },
      ],
    },

    {
      heading: "Why it is bounded, and what that bound means",
      blocks: [
        {
          kind: "prose",
          text:
            "The bound |r| ≤ 1 is the Cauchy–Schwarz inequality applied to the centred data " +
            "vectors u = (xᵢ − x̄) and v = (yᵢ − ȳ): |⟨u, v⟩| ≤ ‖u‖·‖v‖, which is exactly " +
            "|numerator| ≤ denominator. Equality holds if and only if u and v are parallel — that " +
            "is, if and only if the points lie exactly on a line.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "r is the cosine of an angle",
          text:
            "Written as r = ⟨u, v⟩/(‖u‖‖v‖), the sample correlation is literally the cosine of the " +
            "angle between the two centred data vectors in ℝⁿ. Uncorrelated means orthogonal; " +
            "r = ±1 means collinear. That geometric reading is what connects correlation to " +
            "orthogonal projection in regression, and it explains why r is unchanged by scaling: " +
            "stretching a vector does not change the angle it makes with another.",
        },
        {
          kind: "list",
          items: [
            "Invariant under any positive linear rescaling: replacing x by a + bx (b > 0) leaves r " +
              "unchanged. Units, centigrade versus Fahrenheit, and standardisation are all invisible " +
              "to it.",
            "A negative b flips the sign of r but not its magnitude.",
            "Symmetric: r(x, y) = r(y, x), unlike a regression slope.",
            "Equal to the least-squares slope when both variables are standardised — which is the " +
              "cleanest statement of what the coefficient is.",
          ],
        },
      ],
    },

    {
      heading: "What r does not tell you",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Linear only",
          text:
            "Take x = −3, −2, −1, 0, 1, 2, 3 and y = x². The relationship is exact and " +
            "deterministic, and r = 0. Correlation measures how well a straight line describes " +
            "the cloud; a perfect curved relationship with symmetric spread registers as nothing at " +
            "all. Always plot the data.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Anscombe's quartet",
          text:
            "Four datasets with identical means, identical variances, and r = 0.816 to three " +
            "decimals: one genuinely linear, one exactly quadratic, one linear with a single " +
            "outlier, and one where ten points share an x value and an eleventh outlier creates the " +
            "correlation by itself. A single number cannot distinguish them, and no summary " +
            "statistic replaces a scatterplot.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Sensitive to outliers, and to which points you kept",
          text:
            "r is built from products of deviations, so one distant point can dominate both sums. " +
            "Restricting the range has the opposite effect: correlating SAT score with college GPA " +
            "within the admitted pool only attenuates r badly, because the range has been " +
            "truncated. Neither effect is a flaw in the estimator; both are reasons the number " +
            "cannot be read without knowing how the sample was formed.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Correlation is not causation, and aggregation lies",
          text:
            "Beyond the familiar slogan, note Simpson's paradox: r can be positive within every " +
            "subgroup and negative in the pooled data, or the reverse. A correlation computed " +
            "across groups is a statement about the pooled population, and it need not describe " +
            "any individual group at all.",
        },
      ],
    },

    {
      heading: "r is a statistic: sampling variability",
      blocks: [
        {
          kind: "prose",
          text:
            "ρ is a fixed property of a population; r is a random variable computed from a sample, " +
            "and it has a sampling distribution. That distribution is skewed except when ρ = 0, " +
            "which is why inference about correlation is usually done after Fisher's " +
            "variance-stabilising transformation.",
        },
        {
          kind: "formula",
          latex: "z = ½ ln((1 + r)/(1 − r)) ≈ N( ½ ln((1+ρ)/(1−ρ)),  1/(n − 3) )",
          caption: "Fisher's z-transformation — build the interval on this scale, then map back",
        },
        {
          kind: "prose",
          text:
            "For the specific null H₀: ρ = 0, a simpler exact test is available under bivariate " +
            "normality: t = r√(n − 2)/√(1 − r²) follows a t distribution with n − 2 degrees of " +
            "freedom. Both procedures assume the pair is bivariate normal; both are approximate at " +
            "best without it.",
        },
        {
          kind: "table",
          headers: ["n", "|r| needed for significance at α = 0.05", "Reading"],
          rows: [
            ["5", "0.878", "Almost anything short of a straight line is consistent with ρ = 0"],
            ["10", "0.632", "Still very weak evidence from a moderate-looking r"],
            ["30", "0.361", "The point where r starts carrying real information"],
            ["100", "0.197", "Small correlations become detectable"],
            ["1000", "0.062", "Statistically significant, and probably too small to care about"],
          ],
          caption: "Two-sided critical values for the t test of H₀: ρ = 0.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "An r with no n attached is not a finding",
          text:
            "The r ≈ 0.98 from the worked example above came from four points; the table says the " +
            "threshold at n = 5 is 0.878, so even that impressive-looking value is thin evidence. " +
            "Small samples produce large |r| by chance routinely. Report r with n and an interval, " +
            "and read the interval rather than the point estimate — at the bottom of the table, the " +
            "opposite failure appears, where a significant r = 0.07 explains half a percent of the " +
            "variance and means nothing practically.",
        },
      ],
    },

    {
      heading: "Alternatives, and when to reach for them",
      blocks: [
        {
          kind: "table",
          headers: ["Measure", "Detects", "Use when"],
          rows: [
            ["Pearson r", "Linear association", "Roughly linear, roughly elliptical data with no wild outliers"],
            ["Spearman ρ_s", "Any monotone association", "Ordinal data, or a curved but monotone relationship"],
            ["Kendall τ", "Concordance of pairs", "Small samples, many ties, robustness matters"],
            ["Distance correlation", "Any dependence at all", "Zero if and only if independent — a genuine independence test"],
            ["Mutual information", "Any dependence at all", "Information-theoretic settings; needs more data to estimate"],
          ],
        },
        {
          kind: "prose",
          text:
            "Spearman's coefficient is just Pearson's r computed on the ranks, which is why it " +
            "inherits all of Pearson's algebra while gaining robustness and monotone-invariance. " +
            "The last two rows matter for a specific reason: r = 0 does not imply independence, but " +
            "distance correlation zero does — which is why independence-seeking methods such as ICA " +
            "cannot stop at decorrelating the data.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where r reappears later",
          text:
            "In simple linear regression, R² = r² exactly, and the fitted slope is r·(s_y/s_x). " +
            "The correlation matrix is what PCA is usually run on. And r is the standardised " +
            "quantity behind covariance shrinkage, factor models, and every heatmap of pairwise " +
            "associations you will ever be handed.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§4.5 and §11.3, Correlation and Regression" },
    { source: "Wasserman, All of Statistics", locator: "§3.3, Covariance and Correlation" },
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§3.1, Simple Linear Regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-01-multivariate-probability.md" },
  ],
};
