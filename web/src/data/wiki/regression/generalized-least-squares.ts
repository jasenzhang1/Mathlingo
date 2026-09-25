import type { WikiArticle } from "../types";

export const generalizedLeastSquaresWiki: WikiArticle = {
  conceptId: "generalized-least-squares",

  summary:
    "Generalized least squares handles errors that are correlated or unequally variable: Var(ε) = σ²V for " +
    "a known positive-definite V. Factor V, transform the model so its errors become spherical, and run " +
    "OLS on the result. The estimator (XᵀV⁻¹X)⁻¹XᵀV⁻¹y is BLUE — Aitken's theorem — and weighted least " +
    "squares is its diagonal special case. The other half of the story is what happens when you use OLS " +
    "anyway, or use the wrong V.",

  sections: [
    {
      heading: "Whitening the model",
      blocks: [
        {
          kind: "prose",
          text:
            "Since V is positive definite, it has a Cholesky factor V = KKᵀ (or a symmetric square root). " +
            "Multiply the model through by K⁻¹:",
        },
        {
          kind: "formula",
          latex: "K⁻¹y = K⁻¹Xβ + K⁻¹ε,   Var(K⁻¹ε) = σ²K⁻¹VK⁻ᵀ = σ²I",
          caption: "The transformed errors satisfy every Gauss–Markov assumption.",
        },
        {
          kind: "formula",
          latex: "β* = (XᵀV⁻¹X)⁻¹XᵀV⁻¹y,   Var(β*) = σ²(XᵀV⁻¹X)⁻¹",
          caption: "OLS on the whitened data, rewritten in the original variables.",
        },
        {
          kind: "prose",
          text:
            "Everything proved for OLS now transfers: β* is BLUE, s² = (y − Xβ*)ᵀV⁻¹(y − Xβ*)/(n − p) is " +
            "unbiased for σ², and under normality the usual t- and F-tests hold with the weighted residual " +
            "sum of squares in place of RSS.",
        },
      ],
    },

    {
      heading: "Common structures for V",
      blocks: [
        {
          kind: "table",
          headers: ["Structure", "V", "What GLS does"],
          rows: [
            ["Heteroskedastic, independent", "diag(v₁, …, vₙ)", "Weighted least squares with wᵢ = 1/vᵢ"],
            ["AR(1) serial correlation", "Vᵢⱼ = ρ^|i−j| / (1 − ρ²)", "Quasi-differences: yₜ − ρyₜ₋₁ on xₜ − ρxₜ₋₁"],
            ["Equicorrelated (exchangeable)", "(1 − ρ)I + ρ11ᵀ", "Down-weights the shared component within a cluster"],
            ["Grouped means", "diag(1/nᵢ)", "Weights each group mean by its size"],
          ],
        },
      ],
    },

    {
      heading: "Using the wrong variance matrix",
      blocks: [
        {
          kind: "prose",
          text:
            "Suppose the truth is Var(ε) = σ²V but you fit OLS. β̂ = (XᵀX)⁻¹Xᵀy is still unbiased — " +
            "unbiasedness never needed the variance assumption — but it is no longer best, and its true " +
            "covariance is the sandwich below, not the σ²(XᵀX)⁻¹ that software prints.",
        },
        {
          kind: "formula",
          latex: "Var(β̂_OLS) = σ²(XᵀX)⁻¹XᵀVX(XᵀX)⁻¹",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The expensive mistake is in s², not in β̂",
          text:
            "Seber & Lee's §9.3 shows the bias in the usual variance estimate can go either way. With " +
            "positively autocorrelated errors and a slowly varying regressor — the typical time-series case — " +
            "σ²(XᵀX)⁻¹ understates the true variance badly, so t-statistics are inflated and intervals are " +
            "far too narrow. The point estimates look fine; the inference does not.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "When OLS and GLS coincide",
          text:
            "OLS equals GLS for every y exactly when C(VX) ⊆ C(X) — for instance, equicorrelated errors in a " +
            "model with an intercept. Then there is nothing to gain from knowing V for the estimate itself, " +
            "though the variance formula still changes.",
        },
      ],
    },

    {
      heading: "Feasible GLS",
      blocks: [
        {
          kind: "prose",
          text:
            "V is rarely known. Feasible GLS estimates it — typically a few parameters, like ρ in AR(1) — from " +
            "OLS residuals and then plugs the estimate in, often iterating (Cochrane–Orcutt for AR(1)). The " +
            "exact finite-sample guarantees are lost, but FGLS is asymptotically as efficient as GLS when the " +
            "parametric form of V is right.",
        },
        {
          kind: "example",
          title: "GLS for two measurements with different precision",
          problem:
            "Estimate a common mean μ from y₁ = 10 with variance 1 and y₂ = 16 with variance 4 (independent). " +
            "Give the GLS estimate and its variance.",
          steps: [
            "X = (1, 1)ᵀ, V = diag(1, 4), so V⁻¹ = diag(1, 0.25).",
            "XᵀV⁻¹X = 1 + 0.25 = 1.25 and XᵀV⁻¹y = 10 + 0.25·16 = 14.",
            "μ* = 14/1.25 = 11.2, and Var(μ*) = 1/1.25 = 0.8.",
            "Compare OLS: ȳ = 13 with variance (1 + 4)/4 = 1.25 — larger than 0.8.",
          ],
          answer: "μ* = 11.2 with variance 0.8, versus 13 with variance 1.25 for the unweighted mean.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.10, Generalized Least Squares" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§9.3, Incorrect Variance Matrix" },
  ],
};
