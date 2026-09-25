import type { WikiArticle } from "../types";

export const confidenceBandsRegressionSurfaceWiki: WikiArticle = {
  conceptId: "confidence-bands-regression-surface",

  summary:
    "A confidence interval for the mean response at one x₀ covers that one point. A confidence band covers " +
    "the entire regression surface at once, so you can look anywhere along the fitted line and trust what " +
    "you see. The Working–Hotelling band achieves this by using Scheffé's multiplier in place of t. " +
    "Prediction intervals and bands do the same for new observations, which are wider because they carry " +
    "the new observation's own error.",

  sections: [
    {
      heading: "Pointwise intervals",
      blocks: [
        {
          kind: "formula",
          latex: "x₀ᵀβ̂ ± t^{α/2}_{n−p} s √(x₀ᵀ(XᵀX)⁻¹x₀)",
          caption: "For the mean response E(y | x₀) at one pre-specified x₀.",
        },
        {
          kind: "formula",
          latex: "x₀ᵀβ̂ ± t^{α/2}_{n−p} s √(1 + x₀ᵀ(XᵀX)⁻¹x₀)",
          caption: "For a single new response y₀ at x₀ — the extra 1 is Var(new error)/σ².",
        },
        {
          kind: "prose",
          text:
            "For a straight line, x₀ᵀ(XᵀX)⁻¹x₀ = 1/n + (x₀ − x̄)²/Σ(xᵢ − x̄)², so both intervals are " +
            "narrowest at x̄ and flare hyperbolically as x₀ moves away from it.",
        },
      ],
    },

    {
      heading: "The Working–Hotelling band",
      blocks: [
        {
          kind: "formula",
          latex: "x₀ᵀβ̂ ± √(p F^α_{p, n−p}) · s √(x₀ᵀ(XᵀX)⁻¹x₀)   for all x₀ simultaneously",
        },
        {
          kind: "prose",
          text:
            "This is Scheffé's method applied to the family {x₀ᵀβ : x₀ ∈ ℝᵖ}, which lives in a p-dimensional " +
            "space. Since the family is infinite and the coverage statement must hold for all of it, no " +
            "finite-family method will do. For a straight line p = 2 and the multiplier is √(2F_{2,n−2}).",
        },
        {
          kind: "example",
          title: "How much wider?",
          problem:
            "For a straight line with n = 22, t^{0.025}_{20} ≈ 2.086 and F^{0.05}_{2,20} ≈ 3.49. Compare the " +
            "pointwise and Working–Hotelling multipliers.",
          steps: [
            "Pointwise: 2.086.",
            "Working–Hotelling: √(2 × 3.49) = √6.98 ≈ 2.642.",
            "Ratio ≈ 1.27.",
          ],
          answer: "The simultaneous band is about 27% wider than the pointwise one at every x₀.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Restricting the range shortens the band",
          text:
            "If you only care about x₀ in a bounded interval, the family is smaller than all of ℝᵖ and " +
            "narrower exact bands exist (Seber & Lee discuss several). Working–Hotelling is the price of " +
            "covering the whole line, including regions with no data.",
        },
      ],
    },

    {
      heading: "Simultaneous prediction",
      blocks: [
        {
          kind: "prose",
          text:
            "To predict k new responses jointly, apply Bonferroni (t^{α/(2k)}) or Scheffé (√(kF_{k,n−p})) to " +
            "the prediction-interval form with the 1 + x₀ᵀ(XᵀX)⁻¹x₀ inside the root. A band meant to contain " +
            "an unlimited number of future responses cannot exist at a fixed confidence level; Seber & Lee's " +
            "prediction bands instead cover a stated number of future observations.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Enlarging the model widens every band",
          text:
            "Adding columns to X can only increase x₀ᵀ(XᵀX)⁻¹x₀ at a given x₀ (§5.4). Extra predictors that " +
            "do not reduce s² enough buy wider intervals for every prediction.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§5.2, Confidence Bands for the Regression Surface" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§5.3, Prediction Intervals and Bands for the Response; §5.4, Enlarging the Regression Matrix" },
  ],
};
