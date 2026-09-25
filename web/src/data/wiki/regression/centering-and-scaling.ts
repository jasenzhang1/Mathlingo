import type { WikiArticle } from "../types";

export const centeringAndScalingWiki: WikiArticle = {
  conceptId: "centering-and-scaling",

  summary:
    "Subtracting each predictor's mean separates the intercept from the slopes: the intercept becomes ȳ, " +
    "estimated independently of everything else, and the slopes are unchanged. Dividing each centred " +
    "predictor by its length (or standard deviation) then puts all predictors on one scale, turning XᵀX " +
    "into the predictors' correlation matrix. Neither move changes the fit; both change what the " +
    "coefficients and the matrix you invert are telling you.",

  sections: [
    {
      heading: "Centering",
      blocks: [
        {
          kind: "formula",
          latex: "yᵢ = α + Σⱼ βⱼ(xᵢⱼ − x̄ⱼ) + εᵢ,   α = β₀ + Σⱼ βⱼx̄ⱼ",
          caption: "The centred model is a reparametrisation: same column space, same fit, same slopes.",
        },
        {
          kind: "prose",
          text:
            "With centred columns X̃, the intercept column is orthogonal to every other column, so XᵀX is " +
            "block-diagonal and α̂ = ȳ, independently of β̂ = (X̃ᵀX̃)⁻¹X̃ᵀy. Var(α̂) = σ²/n, and α̂ is " +
            "uncorrelated with every slope. X̃ᵀX̃ is (n − 1) times the sample covariance matrix of the " +
            "predictors.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Centering is Frisch–Waugh–Lovell with X₁ = 1",
          text:
            "Removing the intercept's contribution from each column is exactly multiplying by the centering " +
            "matrix M₁ = I − 11ᵀ/n. FWL then says the slopes from the centred regression equal the slopes " +
            "from the original one.",
        },
      ],
    },

    {
      heading: "Scaling",
      blocks: [
        {
          kind: "formula",
          latex: "zᵢⱼ = (xᵢⱼ − x̄ⱼ)/sⱼ,   sⱼ² = Σᵢ(xᵢⱼ − x̄ⱼ)²,   ZᵀZ = R_xx",
          caption: "Scaling each centred column to unit length makes ZᵀZ the correlation matrix of the predictors.",
        },
        {
          kind: "prose",
          text:
            "The coefficient on zⱼ is γⱼ = sⱼβⱼ, so β̂ⱼ = γ̂ⱼ/sⱼ recovers the original slope. Scaled " +
            "coefficients are unit-free and comparable in magnitude — the 'standardised coefficients' " +
            "applied work reports — and ZᵀZ has ones on the diagonal, which is what makes its eigenvalues " +
            "and inverse diagonal (the VIFs) interpretable as collinearity measures independent of units.",
        },
        {
          kind: "example",
          title: "Undoing the scaling",
          problem:
            "A predictor has centred length sⱼ = 20 and its coefficient in the unit-length-scaled regression " +
            "is γ̂ⱼ = 5. What is its slope in the original units?",
          steps: ["β̂ⱼ = γ̂ⱼ / sⱼ = 5 / 20 = 0.25."],
          answer: "β̂ⱼ = 0.25 per original unit of xⱼ.",
        },
      ],
    },

    {
      heading: "What changes and what does not",
      blocks: [
        {
          kind: "table",
          headers: ["Quantity", "Centering", "Scaling"],
          rows: [
            ["Fitted values, residuals, RSS, R²", "Unchanged", "Unchanged"],
            ["Slopes", "Unchanged", "Multiplied by sⱼ"],
            ["Intercept", "Becomes ȳ", "Unchanged (after centering)"],
            ["t-statistics and p-values for slopes", "Unchanged", "Unchanged"],
            ["Condition number of XᵀX", "Usually reduced", "Usually reduced further"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Centering can hide collinearity with the intercept",
          text:
            "Seber & Lee (§10.7.1) point out a drawback: if a predictor barely varies relative to its mean, " +
            "it is nearly collinear with the intercept column. Centering removes that near-dependency from " +
            "the matrix you inspect — so a diagnostic computed on centred data can declare the design fine " +
            "when the intercept itself is very poorly determined.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.11, Centering and Scaling the Explanatory Variables" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.7.1, Drawbacks of Centering" },
  ],
};
