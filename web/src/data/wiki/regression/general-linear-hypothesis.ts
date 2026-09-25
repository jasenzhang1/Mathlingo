import type { WikiArticle } from "../types";

export const generalLinearHypothesisWiki: WikiArticle = {
  conceptId: "general-linear-hypothesis",

  summary:
    "Almost every test in a linear model — a single coefficient is zero, several are, two slopes are equal, " +
    "a group of dummies can be dropped, all the group means coincide — is an instance of one hypothesis, " +
    "H: Aβ = c, and one statistic. The F-statistic compares how much worse the model fits when forced to " +
    "obey H with how noisy the data are anyway. It is the likelihood-ratio test in disguise, it has an " +
    "exact F distribution under normality, and it reduces to the familiar t-test when only one " +
    "restriction is tested.",

  sections: [
    {
      heading: "The statistic, two ways",
      blocks: [
        {
          kind: "formula",
          latex: "F = \\frac{(RSS_H − RSS)/q}{RSS/(n − p)} ~ F_{q, n−p}  under H",
          caption: "Extra residual sum of squares per restriction, over the error mean square.",
        },
        {
          kind: "formula",
          latex: "F = \\frac{(Aβ̂ − c)ᵀ[A(XᵀX)⁻¹Aᵀ]⁻¹(Aβ̂ − c)}{q s²}",
          caption: "The same number computed from the unrestricted fit alone: a standardised distance of Aβ̂ from c.",
        },
        {
          kind: "prose",
          text:
            "Here A is q × p with rank q (q independent restrictions), X has rank p, and s² = RSS/(n − p). " +
            "The two forms are equal because RSS_H − RSS is exactly the quadratic form in the numerator of " +
            "the second — the cost of the restriction worked out in restricted least squares.",
        },
      ],
    },

    {
      heading: "Why it has an F distribution",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Aβ̂ − c ~ N_q(Aβ − c, σ²A(XᵀX)⁻¹Aᵀ), because β̂ is normal.",
            "Under H the mean is zero, so the numerator quadratic form divided by σ² is χ²_q.",
            "RSS/σ² ~ χ²_{n−p}, and RSS is independent of β̂ (they live in orthogonal subspaces).",
            "The ratio of two independent chi-squares, each divided by its degrees of freedom, is F_{q, n−p}; σ² cancels.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is a likelihood-ratio test",
          text:
            "Maximising the normal likelihood with and without H gives σ̂² = RSS/n and σ̂²_H = RSS_H/n, so the " +
            "likelihood ratio is Λ = (RSS/RSS_H)^{n/2}. Small Λ means large RSS_H/RSS, which is a monotone " +
            "function of F. The F-test is the exact finite-sample version of the LRT that asymptotics would " +
            "only approximate with a χ².",
        },
      ],
    },

    {
      heading: "Special cases",
      blocks: [
        {
          kind: "table",
          headers: ["Hypothesis", "A", "q", "What F becomes"],
          rows: [
            ["βⱼ = 0", "unit row eⱼᵀ", "1", "t² for the usual t-statistic of β̂ⱼ"],
            ["β₁ = ⋯ = β_{p−1} = 0 (all slopes)", "[0 | I]", "p − 1", "The overall regression F = MSR/MSE"],
            ["A block of k coefficients is zero", "k rows of the identity", "k", "The partial (extra sum of squares) F-test"],
            ["β₁ = β₂", "(0, 1, −1, 0, …)", "1", "t² for the difference of two coefficients"],
            ["All group means equal (one-way)", "k − 1 contrasts", "k − 1", "The ANOVA F"],
          ],
        },
        {
          kind: "example",
          title: "Dropping two predictors",
          problem:
            "A model with an intercept and 4 predictors fitted to n = 30 observations has RSS = 250. Dropping " +
            "two of the predictors raises the RSS to 290. Compute F.",
          steps: [
            "q = 2 restrictions; n − p = 30 − 5 = 25.",
            "Numerator: (290 − 250)/2 = 20.",
            "Denominator: 250/25 = 10.",
            "F = 20/10 = 2.0, compared against F_{2,25}.",
          ],
          answer: "F = 2.0 on (2, 25) degrees of freedom — well below the 5% critical value of about 3.39.",
        },
      ],
    },

    {
      heading: "Canonical form and projections",
      blocks: [
        {
          kind: "prose",
          text:
            "Seber & Lee's canonical form rotates y by an orthogonal matrix whose first columns span the " +
            "hypothesis space ω, the next ones complete Ω = C(X), and the rest span Ω⊥. In the new coordinates " +
            "the zᵢ are independent normals with variance σ²; H says the q coordinates in Ω ∩ ω⊥ have mean " +
            "zero, and the n − p coordinates in Ω⊥ always do. F is then literally the average of q squared " +
            "coordinates over the average of n − p others. In projection language:",
        },
        {
          kind: "formula",
          latex: "RSS_H − RSS = yᵀ(P_Ω − P_ω)y,   RSS = yᵀ(I − P_Ω)y",
          caption: "Two idempotent quadratic forms with orthogonal ranges — Cochran's theorem does the rest.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§4.1–4.3, Likelihood Ratio Test and F-Test" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§4.5, Canonical Form for H; §4.7, F-Test and Projection Matrices" },
  ],
};
