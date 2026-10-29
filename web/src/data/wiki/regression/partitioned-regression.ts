import type { WikiArticle } from "../types";

export const partitionedRegressionWiki: WikiArticle = {
  conceptId: "partitioned-regression",

  summary:
    "Split the design into two blocks, X = [X₁, X₂], and ask what the coefficient on X₂ really is. The " +
    "answer — the Frisch–Waugh–Lovell theorem — is that β̂₂ is exactly what you get by first removing " +
    "from both y and X₂ everything X₁ can explain, then regressing one set of residuals on the other. " +
    "That single fact explains what 'holding the other variables fixed' means, why orthogonal columns " +
    "can be fitted one at a time, and how every quantity changes when a variable is added.",

  sections: [
    {
      heading: "The partitioned model",
      blocks: [
        {
          kind: "formula",
          latex: "y = X₁β₁ + X₂β₂ + ε,   M₁ = I − X₁(X₁ᵀX₁)⁻¹X₁ᵀ",
          caption: "M₁ is the residual-maker for X₁: it projects onto the orthogonal complement of C(X₁).",
        },
        {
          kind: "formula",
          latex: "β̂₂ = (X₂ᵀM₁X₂)⁻¹X₂ᵀM₁y",
          caption: "The Frisch–Waugh–Lovell formula for the second block of coefficients.",
        },
        {
          kind: "prose",
          text:
            "Because M₁ is symmetric and idempotent, X₂ᵀM₁y = (M₁X₂)ᵀ(M₁y). So β̂₂ is the OLS slope of " +
            "the residuals M₁y (y purged of X₁) on the residuals M₁X₂ (X₂ purged of X₁). The residuals " +
            "of that small regression are also exactly the residuals of the full regression, so the " +
            "RSS — and hence s², apart from the degrees of freedom — agrees too.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What 'controlling for X₁' actually does",
          text:
            "A coefficient in a multiple regression uses only the part of its predictor that the other " +
            "predictors cannot linearly reproduce. If X₂ is almost a linear combination of X₁, then M₁X₂ " +
            "is tiny, the denominator X₂ᵀM₁X₂ is small, and Var(β̂₂) = σ²(X₂ᵀM₁X₂)⁻¹ is large. That is " +
            "collinearity, seen from the partitioned side.",
        },
      ],
    },

    {
      heading: "Orthogonal columns",
      blocks: [
        {
          kind: "prose",
          text:
            "If X₁ᵀX₂ = 0 then M₁X₂ = X₂, and the formula collapses to β̂₂ = (X₂ᵀX₂)⁻¹X₂ᵀy — the " +
            "coefficient you would get regressing y on X₂ alone. With mutually orthogonal columns, " +
            "XᵀX is block-diagonal, every block of β̂ is estimated independently of the others, adding " +
            "or removing a block changes nothing else, and the regression sum of squares splits into " +
            "one piece per block. Designed experiments and orthogonal polynomials are built to exploit " +
            "exactly this.",
        },
        {
          kind: "formula",
          latex: "X₁ᵀX₂ = 0  ⟹  β̂₁ = (X₁ᵀX₁)⁻¹X₁ᵀy,  β̂₂ = (X₂ᵀX₂)⁻¹X₂ᵀy,  SSR = SSR₁ + SSR₂",
        },
      ],
    },

    {
      heading: "Introducing one extra variable",
      blocks: [
        {
          kind: "prose",
          text:
            "Add a single column z to a model with design X. Writing e = M_X y for the old residuals and " +
            "z̃ = M_X z for the part of z the old model cannot explain, the new coefficient, the drop " +
            "in RSS, and the updated old coefficients all follow from FWL:",
        },
        {
          kind: "formula",
          latex: "γ̂ = z̃ᵀe / z̃ᵀz̃,   RSS_new = RSS_old − (z̃ᵀe)²/z̃ᵀz̃,   β̂_new = β̂_old − (XᵀX)⁻¹Xᵀz γ̂",
          caption: "RSS can only fall, and falls by zero exactly when z̃ is orthogonal to the old residuals.",
        },
        {
          kind: "example",
          title: "Coefficient from two residual vectors",
          problem:
            "After regressing y and z on an intercept and x, the residual vectors satisfy z̃ᵀz̃ = 40 and " +
            "z̃ᵀe = 10, and the old RSS was 55. Find the coefficient on z in the enlarged model and the new RSS.",
          steps: [
            "γ̂ = z̃ᵀe / z̃ᵀz̃ = 10/40 = 0.25.",
            "Reduction in RSS = (z̃ᵀe)²/z̃ᵀz̃ = 100/40 = 2.5.",
            "RSS_new = 55 − 2.5 = 52.5.",
          ],
          answer: "γ̂ = 0.25 and the RSS drops from 55 to 52.5.",
        },
      ],
    },

    {
      heading: "Where the theorem gets used",
      blocks: [
        {
          kind: "list",
          items: [
            "Added-variable plots draw exactly the FWL regression: M₁y against M₁x_j, whose slope is β̂_j.",
            "Centering is FWL with X₁ = 1: the slopes of a model with an intercept equal the slopes of the centred data with no intercept.",
            "Omitted-variable bias is read off the same algebra: drop X₂ and β̂₁ absorbs (X₁ᵀX₁)⁻¹X₁ᵀX₂β₂.",
            "Unbalanced ANOVA's 'adjusted' sums of squares are FWL reductions in RSS for one factor after the other.",
            "Fixed-effects panel regressions demean within each group — FWL with X₁ the group indicators.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Purge both sides or neither",
          text:
            "Regressing the raw y on the residualised M₁X₂ gives the same β̂₂ (because M₁ is idempotent) " +
            "but the wrong residuals and so the wrong standard error. Regressing M₁y on the raw X₂ gives " +
            "the wrong coefficient altogether. The clean statement residualises both.",
        },
      ],
    },
    {
      heading: "Further results from Ding",
      blocks: [
        {
          kind: "prose",
          text: "FWL gives far more than the coefficient. Leverages add across the two stages: $h_{ii}$ from the long fit equals the leverage from regressing on $X_1$ plus the leverage from regressing on $\\tilde{X}_2 = (I - H_1)X_2$. The squared EHW standard error of a single $\\hat{\\beta}_2$ is a weighted sum of squared residuals, $\\sum_i \\tilde{x}_{i2}^2\\hat{\\varepsilon}_i^2/(\\sum_k \\tilde{x}_{k2}^2)^2$. Gram–Schmidt orthogonalisation, and hence the QR decomposition used by `lm`, is FWL applied one column at a time.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Applications",
          text: "Fixed-effects panel regressions are FWL with unit dummies: demean within units (or two-way demean, $y_{it} - \\bar{y}_{i\\cdot} - \\bar{y}_{\\cdot t} + \\bar{y}_{\\cdot\\cdot}$) and run one small regression. The $t$-statistic of $\\hat{\\beta}_1$ is a function of the partial correlation alone, $\\hat{\\rho}/\\sqrt{(1 - \\hat{\\rho}^2)/(n - p)}$. And when $X_1$ and $X_2$ are positively correlated, $\\hat{\\beta}_1$ and $\\hat{\\beta}_2$ are negatively correlated.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Simpson’s paradox is FWL",
          text: "The long coefficient is the within-$w$ slope, after residualising on $w$. When $w$ drives both $x$ and $y$, the between-group trend can dominate the raw slope and give it the opposite sign.",
        },
      ],
    },
  ],

  references: [
    { source: "Peng Ding, Linear Model and Extensions", locator: "Ch. 7–8, The Frisch–Waugh–Lovell Theorem and its Applications" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.6, Orthogonal Columns in the Regression Matrix" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.7, Introducing Further Explanatory Variables" },
  ],
};
