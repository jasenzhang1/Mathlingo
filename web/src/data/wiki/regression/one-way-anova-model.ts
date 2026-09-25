import type { WikiArticle } from "../types";

export const oneWayAnovaModelWiki: WikiArticle = {
  conceptId: "one-way-anova-model",

  summary:
    "One-way analysis of variance is a linear model whose design matrix holds group indicators. Written " +
    "with one mean per group it is full rank and least squares simply returns the group averages; written " +
    "as an overall mean plus group effects it is rank-deficient, and only contrasts among the effects are " +
    "estimable. Seeing ANOVA this way means everything from Chapters 3–5 — F-tests, simultaneous intervals, " +
    "estimability — applies to it unchanged.",

  sections: [
    {
      heading: "Two parametrisations",
      blocks: [
        {
          kind: "formula",
          latex: "yᵢⱼ = μᵢ + εᵢⱼ   \\text{(cell means)}  \\quad\\text{or}\\quad  yᵢⱼ = μ + αᵢ + εᵢⱼ   \\text{(effects)}",
          caption: "i = 1, …, k groups; j = 1, …, nᵢ observations in group i; n = Σnᵢ.",
        },
        {
          kind: "prose",
          text:
            "In the cell-means form X has one indicator column per group, XᵀX = diag(n₁, …, n_k), and " +
            "μ̂ᵢ = ȳᵢ. The effects form adds an intercept column, which equals the sum of the indicators, so " +
            "X has rank k with k + 1 columns. A side condition (Σαᵢ = 0, Σnᵢαᵢ = 0, or α_k = 0) picks one " +
            "solution; each changes what 'μ' and 'αᵢ' mean but none changes the fit.",
        },
      ],
    },

    {
      heading: "The F-test as a general linear hypothesis",
      blocks: [
        {
          kind: "formula",
          latex: "F = \\frac{Σᵢ nᵢ(ȳᵢ − ȳ)²/(k − 1)}{ΣᵢΣⱼ(yᵢⱼ − ȳᵢ)²/(n − k)} ~ F_{k−1, n−k}  \\text{ under } μ₁ = ⋯ = μ_k",
        },
        {
          kind: "prose",
          text:
            "H: μ₁ = ⋯ = μ_k is k − 1 independent restrictions. The restricted model is a single mean with " +
            "RSS_H = total sum of squares; the unrestricted RSS is the within-group sum of squares. Their " +
            "difference is the between-group sum of squares, and the F-statistic above is the general-linear-" +
            "hypothesis F exactly.",
        },
      ],
    },

    {
      heading: "Contrasts",
      blocks: [
        {
          kind: "formula",
          latex: "ψ = Σcᵢμᵢ,  Σcᵢ = 0;   ψ̂ = Σcᵢȳᵢ,   Var(ψ̂) = σ² Σcᵢ²/nᵢ",
        },
        {
          kind: "prose",
          text:
            "Contrasts are exactly the estimable functions of the αᵢ that do not involve μ. Two contrasts are " +
            "orthogonal when Σcᵢdᵢ/nᵢ = 0; a full set of k − 1 orthogonal contrasts splits the between-group " +
            "sum of squares into k − 1 independent one-degree-of-freedom pieces.",
        },
        {
          kind: "example",
          title: "A control-versus-treatments contrast",
          problem:
            "Three groups of 5 have means 12 (control), 15, and 17, and s² = 10. Estimate ψ = μ₁ − (μ₂ + μ₃)/2 " +
            "and its standard error.",
          steps: [
            "ψ̂ = 12 − (15 + 17)/2 = 12 − 16 = −4.",
            "Σcᵢ²/nᵢ = (1 + 0.25 + 0.25)/5 = 0.3.",
            "se(ψ̂) = √(10 × 0.3) = √3 ≈ 1.73, on n − k = 12 df.",
          ],
          answer: "ψ̂ = −4 with standard error ≈ 1.73 (t ≈ −2.31 on 12 df).",
        },
      ],
    },

    {
      heading: "Assumptions",
      blocks: [
        {
          kind: "list",
          items: [
            "Independence: the one assumption with no robustness at all.",
            "Normality: the F-test is robust with moderate, balanced samples (§9.5).",
            "Equal variances: harmless when the nᵢ are equal; with unequal nᵢ, larger variances in the smaller groups make the test liberal, and the reverse makes it conservative.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Balance buys robustness",
          text:
            "Almost every robustness result for ANOVA is best when the groups are the same size. That — not " +
            "just aesthetic neatness — is why designed experiments aim for balance.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§8.1–8.2.1, One-Way Classification: General Theory" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§8.2.3, Underlying Assumptions" },
  ],
};
