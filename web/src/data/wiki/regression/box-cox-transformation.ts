import type { WikiArticle } from "../types";

export const boxCoxTransformationWiki: WikiArticle = {
  conceptId: "box-cox-transformation",

  summary:
    "When residual plots show curvature, non-constant variance, or skewness, a power transformation of the " +
    "response can often fix all three at once. Box and Cox turned the choice of power into an estimation " +
    "problem: include λ as a parameter, maximise the normal likelihood over it, and read off a confidence " +
    "interval. Transform-both-sides is the variant for when the mean model is already right and only the " +
    "error structure needs repair.",

  sections: [
    {
      heading: "The family",
      blocks: [
        {
          kind: "formula",
          latex: "y^{(λ)} = \\begin{cases} (y^λ − 1)/λ & λ ≠ 0 \\\\ \\log y & λ = 0 \\end{cases}",
          caption: "Defined for y > 0; the shift and scale make the family continuous in λ at 0.",
        },
        {
          kind: "table",
          headers: ["λ", "Transformation"],
          rows: [["1", "None (a shift)"], ["½", "Square root"], ["0", "Log"], ["−½", "Reciprocal square root"], ["−1", "Reciprocal"]],
        },
      ],
    },

    {
      heading: "Estimating λ",
      blocks: [
        {
          kind: "formula",
          latex: "ℓ(λ) = −\\frac{n}{2}\\log\\frac{RSS(λ)}{n} + (λ − 1)Σ\\log yᵢ",
          caption: "Profile log-likelihood. The second term is the Jacobian of the transformation.",
        },
        {
          kind: "prose",
          text:
            "Without the Jacobian, comparing RSS across λ would compare residuals on different scales. An " +
            "equivalent trick is to divide y^{(λ)} by ẏ^{λ−1}, where ẏ is the geometric mean of y; then the " +
            "λ minimising the plain RSS is the MLE. Profile over a grid, take λ̂, and form the confidence set " +
            "{λ : 2[ℓ(λ̂) − ℓ(λ)] ≤ χ²₁(0.95) = 3.84}. In practice choose a simple value (1, ½, 0, −1) inside " +
            "that interval.",
        },
        {
          kind: "example",
          title: "Is a log transformation supported?",
          problem: "The profile log-likelihood is maximised at λ̂ = 0.2 with ℓ(λ̂) = −41.0; ℓ(0) = −42.1 and ℓ(1) = −47.5. Which of λ = 0 and λ = 1 are in the 95% interval?",
          steps: [
            "λ = 0: 2(−41.0 + 42.1) = 2.2 ≤ 3.84 — inside.",
            "λ = 1: 2(−41.0 + 47.5) = 13.0 > 3.84 — outside.",
          ],
          answer: "The log (λ = 0) is supported; leaving y untransformed (λ = 1) is not.",
        },
      ],
    },

    {
      heading: "What the transformation is trying to do",
      blocks: [
        {
          kind: "prose",
          text:
            "The MLE of λ trades off three goals — linearity of the mean, constant variance, and normality — " +
            "with no guarantee all three are achieved by the same power. Always re-examine residuals after " +
            "transforming. Seber & Lee (§10.3.2) also use Box–Cox-type families on the predictors (Box–Tidwell) " +
            "to remove curvature.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Coefficients change meaning",
          text:
            "After transforming y, coefficients describe effects on y^{(λ)}. With logs they are approximately " +
            "proportional effects on y; back-transforming the fitted mean of log y gives the median of y, not " +
            "its mean.",
        },
      ],
    },

    {
      heading: "Transform both sides",
      blocks: [
        {
          kind: "formula",
          latex: "y^{(λ)} = [f(x; β)]^{(λ)} + ε",
          caption: "Apply the same transformation to the response and to the mean function.",
        },
        {
          kind: "prose",
          text:
            "If theory supplies the right mean function f — a growth curve, a physical law — transforming only " +
            "y would destroy it. Transforming both sides keeps the median of y equal to f(x; β) while letting λ " +
            "repair skewness and heteroskedasticity in the errors (Seber & Lee §10.5.3).",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.5.2, Transforming the Response" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.3.2, Transforming to Remove Curvature; §10.5.3, Transforming Both Sides" },
  ],
};
