import type { WikiArticle } from "../types";

export const orthogonalPolynomialsWiki: WikiArticle = {
  conceptId: "orthogonal-polynomials",

  summary:
    "The columns 1, x, x², x³, … of a polynomial regression are nearly collinear over any range of x, which " +
    "makes XᵀX badly conditioned and every coefficient change when a degree is added. Replacing them with " +
    "polynomials φ₀, φ₁, φ₂, … that are mutually orthogonal over the observed x values fixes both problems: " +
    "XᵀX becomes diagonal, each coefficient is computed on its own, and the regression sum of squares " +
    "splits into one independent piece per degree.",

  sections: [
    {
      heading: "The ill-conditioning problem",
      blocks: [
        {
          kind: "prose",
          text:
            "For x spread evenly on [0, 1], the matrix XᵀX/n for the columns 1, x, …, x^d approaches the " +
            "Hilbert matrix with entries 1/(i + j + 1), one of the classic ill-conditioned matrices: its " +
            "condition number grows roughly like e^{3.5d}. By degree 6 or 7, normal-equation solutions in " +
            "double precision lose most of their digits. Centering x helps a little; orthogonalising helps " +
            "completely.",
        },
      ],
    },

    {
      heading: "Construction",
      blocks: [
        {
          kind: "formula",
          latex: "Σᵢ φⱼ(xᵢ) φₖ(xᵢ) = 0  (j ≠ k),   φⱼ \\text{ a polynomial of degree } j",
        },
        {
          kind: "prose",
          text:
            "Apply Gram–Schmidt to the columns 1, x, x², … in order: φ₀ = 1, φ₁ = x − x̄, and each φⱼ is x^j " +
            "minus its projection on the earlier φ's. A three-term recurrence does the same job cheaply. For " +
            "equally spaced x the values are tabulated as small integers:",
        },
        {
          kind: "table",
          headers: ["n points", "Linear φ₁", "Quadratic φ₂", "Cubic φ₃"],
          rows: [
            ["3", "−1, 0, 1", "1, −2, 1", "—"],
            ["4", "−3, −1, 1, 3", "1, −1, −1, 1", "−1, 3, −3, 1"],
            ["5", "−2, −1, 0, 1, 2", "2, −1, −2, −1, 2", "−1, 2, 0, −2, 1"],
          ],
        },
      ],
    },

    {
      heading: "What orthogonality buys",
      blocks: [
        {
          kind: "formula",
          latex: "α̂ⱼ = \\frac{Σᵢ φⱼ(xᵢ) yᵢ}{Σᵢ φⱼ(xᵢ)²},   SS_j = \\frac{(Σᵢ φⱼ(xᵢ) yᵢ)²}{Σᵢ φⱼ(xᵢ)²}",
          caption: "Each coefficient and its sum of squares, independently of every other degree.",
        },
        {
          kind: "list",
          items: [
            "Adding a degree-(d + 1) term leaves α̂₀, …, α̂_d unchanged.",
            "SS_j is the reduction in RSS from adding degree j, so choosing the degree is a sequence of one-df F-tests on independent pieces.",
            "The fitted curve is identical to the ordinary polynomial fit of the same degree — only the parametrisation differs.",
          ],
        },
        {
          kind: "example",
          title: "Linear and quadratic components from five equally spaced points",
          problem: "Responses at five equally spaced doses are y = (3, 5, 6, 6, 5). Compute the linear and quadratic sums of squares.",
          steps: [
            "Linear φ₁ = (−2, −1, 0, 1, 2): Σφ₁y = −6 − 5 + 0 + 6 + 10 = 5; Σφ₁² = 10; SS₁ = 25/10 = 2.5.",
            "Quadratic φ₂ = (2, −1, −2, −1, 2): Σφ₂y = 6 − 5 − 12 − 6 + 10 = −7; Σφ₂² = 14; SS₂ = 49/14 = 3.5.",
            "The curvature (3.5) accounts for more variation than the linear trend (2.5).",
          ],
          answer: "SS_linear = 2.5 and SS_quadratic = 3.5 — a clearly curved, rise-then-level response.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§7.1.1, Problem of Ill-Conditioning" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§7.1.2, Using Orthogonal Polynomials" },
  ],
};
