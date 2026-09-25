import type { WikiArticle } from "../types";

export const noncentralChiSquareAndFWiki: WikiArticle = {
  conceptId: "noncentral-chi-square-and-f",

  summary:
    "The F-test's null distribution tells you how often it rejects when H is true. To know how often it " +
    "rejects when H is false — its power — you need the distribution of the same statistic under the " +
    "alternative. A sum of squared normals with non-zero means is a noncentral χ², and the F-statistic " +
    "becomes a noncentral F. Everything about the alternative collapses into one number, the " +
    "noncentrality parameter, and the power of the test increases with it.",

  sections: [
    {
      heading: "Noncentral χ²",
      blocks: [
        {
          kind: "formula",
          latex: "Z ~ N_r(μ, I)  ⟹  ZᵀZ ~ χ²_r(λ),   λ = μᵀμ",
          caption: "Only the length of the mean vector matters, not its direction.",
        },
        {
          kind: "formula",
          latex: "E[χ²_r(λ)] = r + λ,   Var[χ²_r(λ)] = 2r + 4λ",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Watch the factor of two",
          text:
            "Texts disagree on the parametrisation: some, as here, use λ = μᵀμ, others use half of it. " +
            "Always check which one a table or software function expects — mixing them halves or doubles " +
            "every power calculation. On this page λ = μᵀμ, so the mean is r + λ.",
        },
        {
          kind: "prose",
          text:
            "More generally, if Y ~ Nₙ(μ, σ²I) and A is symmetric idempotent of rank r, then YᵀAY/σ² ~ " +
            "χ²_r(μᵀAμ/σ²). This is the quadratic-form theorem of Seber & Lee §2.4 with the mean left in.",
        },
      ],
    },

    {
      heading: "The F-test under the alternative",
      blocks: [
        {
          kind: "formula",
          latex: "F ~ F_{q, n−p}(λ),   λ = (Aβ − c)ᵀ[A(XᵀX)⁻¹Aᵀ]⁻¹(Aβ − c)/σ²",
          caption: "The numerator becomes noncentral; the denominator, RSS/σ², stays central χ²_{n−p} whatever β is.",
        },
        {
          kind: "prose",
          text:
            "λ is the squared distance between the true Aβ and the hypothesised c, measured in units of the " +
            "estimator's covariance. It is zero exactly when H is true. Power = P(F_{q,n−p}(λ) > F^α_{q,n−p}) " +
            "increases with λ, decreases as q grows for fixed λ (the same signal spread over more " +
            "numerator degrees of freedom), and increases with n − p.",
        },
        {
          kind: "example",
          title: "Noncentrality for a single slope",
          problem:
            "Testing β₁ = 0 in simple regression with σ² = 4, Σ(xᵢ − x̄)² = 25, and a true slope of 0.8. " +
            "Find λ.",
          steps: [
            "For one coefficient, A(XᵀX)⁻¹Aᵀ = Var(β̂₁)/σ² = 1/Σ(xᵢ − x̄)² = 1/25.",
            "λ = (0.8)² · 25 / 4 = 0.64 · 25/4 = 4.",
            "The expected numerator chi-square is q + λ = 1 + 4 = 5 instead of 1.",
          ],
          answer: "λ = 4.",
        },
      ],
    },

    {
      heading: "Designing for power",
      blocks: [
        {
          kind: "prose",
          text:
            "λ depends on the design through A(XᵀX)⁻¹Aᵀ. Spreading the x values out, balancing groups, and " +
            "adding observations all shrink that matrix and so raise λ for a given true effect. This is the " +
            "quantitative reason behind 'put your design points at the extremes' for a straight line and " +
            "'equal group sizes' for ANOVA — and why power calculations must be done for the design you " +
            "will actually run.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Unbiasedness of the F-test",
          text:
            "Because noncentral F is stochastically increasing in λ, the power is never below α: the F-test " +
            "is unbiased. Among tests invariant to the natural rotations and rescalings of the problem it " +
            "is in fact uniformly most powerful.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§2.4, Distribution of Quadratic Forms" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§4.3.2, F-Test Derivation (distribution under the alternative)" },
  ],
};
