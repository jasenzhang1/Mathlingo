import type { WikiArticle } from "../types";

export const confidenceRegionsForBetaWiki: WikiArticle = {
  conceptId: "confidence-regions-for-beta",

  summary:
    "A joint confidence region for several coefficients is not a rectangle made of individual intervals — " +
    "it is an ellipsoid centred at β̂, oriented and stretched by XᵀX. Correlated estimates give a tilted, " +
    "elongated ellipse, and a point can sit inside both individual intervals while lying outside the " +
    "joint region. The ellipsoid is exactly the set of β₀ that the F-test of β = β₀ would not reject.",

  sections: [
    {
      heading: "The region",
      blocks: [
        {
          kind: "formula",
          latex: "\\{β : (β − β̂)ᵀXᵀX(β − β̂) ≤ p s² F^α_{p, n−p}\\}",
          caption: "A 100(1 − α)% confidence ellipsoid for the full vector β.",
        },
        {
          kind: "formula",
          latex: "\\{φ : (φ − Aβ̂)ᵀ[A(XᵀX)⁻¹Aᵀ]⁻¹(φ − Aβ̂) ≤ q s² F^α_{q, n−p}\\}",
          caption: "For a q-dimensional sub-vector φ = Aβ.",
        },
        {
          kind: "prose",
          text:
            "The shape comes from the positive-definite matrix XᵀX: its eigenvectors give the axes and its " +
            "eigenvalues the (inverse squared) half-lengths. Directions in which the design is weak — small " +
            "eigenvalues — are directions in which the ellipsoid is long.",
        },
      ],
    },

    {
      heading: "Ellipse versus rectangle",
      blocks: [
        {
          kind: "prose",
          text:
            "For two slopes with strongly negatively correlated estimates, the ellipse runs along the " +
            "line where β₁ + β₂ is roughly constant. Their sum is well determined; each separately is not. " +
            "The rectangle formed by two marginal intervals contains points in its corners that are " +
            "jointly implausible, and misses points near the ends of the ellipse's long axis that are " +
            "jointly plausible.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Two non-significant t-tests do not add up to a non-significant F",
          text:
            "Nor the reverse. Correlated estimates can each have |t| < 2 while the joint test rejects " +
            "strongly, because the origin lies far outside the ellipse along its short axis.",
        },
      ],
    },

    {
      heading: "Duality with testing",
      blocks: [
        {
          kind: "prose",
          text:
            "β₀ lies inside the region exactly when the F-statistic for H: β = β₀ is below its critical " +
            "value. So the region is the set of all hypotheses the data cannot reject, and conversely an " +
            "F-test can be carried out by checking whether β₀ is inside the ellipsoid. Seber & Lee's " +
            "§5.1.4 uses the same duality to relate simultaneous intervals to tests.",
        },
        {
          kind: "example",
          title: "Is a point inside?",
          problem:
            "With p = 2, s² = 1, XᵀX = diag(10, 40), β̂ = (1, 1), and F^{0.05}_{2,n−p} = 3.5, is β₀ = (0, 1.2) " +
            "in the 95% region?",
          steps: [
            "Quadratic form: 10·(0 − 1)² + 40·(1.2 − 1)² = 10 + 1.6 = 11.6.",
            "Threshold: p s² F = 2 · 1 · 3.5 = 7.",
            "11.6 > 7, so β₀ is outside the region.",
          ],
          answer: "Outside — the F-test of β = (0, 1.2) rejects at 5%.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§5.1.3, Confidence Regions" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§5.1.4, Hypothesis Testing and Confidence Intervals" },
  ],
};
