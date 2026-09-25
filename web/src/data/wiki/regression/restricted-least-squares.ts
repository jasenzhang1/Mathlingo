import type { WikiArticle } from "../types";

export const restrictedLeastSquaresWiki: WikiArticle = {
  conceptId: "restricted-least-squares",

  summary:
    "Sometimes theory fixes part of the answer before the data arrive: coefficients must sum to one, two " +
    "slopes must be equal, an effect must be exactly zero. Restricted least squares minimises the residual " +
    "sum of squares subject to q linear constraints Aβ = c. The solution is the unrestricted β̂ nudged back " +
    "onto the constraint set by the cheapest possible move — and the RSS it costs to make that move is " +
    "precisely the numerator of the F-test for the hypothesis Aβ = c.",

  sections: [
    {
      heading: "The problem and its solution",
      blocks: [
        {
          kind: "formula",
          latex: "minimise ‖y − Xβ‖²  subject to  Aβ = c,   A is q × p of rank q",
        },
        {
          kind: "formula",
          latex: "β̂_H = β̂ − (XᵀX)⁻¹Aᵀ[A(XᵀX)⁻¹Aᵀ]⁻¹(Aβ̂ − c)",
          caption: "The restricted estimator: the unrestricted β̂ minus a correction proportional to how badly β̂ violates the constraint.",
        },
        {
          kind: "prose",
          text:
            "Derivation by Lagrange multipliers: minimise ‖y − Xβ‖² + 2λᵀ(Aβ − c). Setting the gradient to " +
            "zero gives XᵀXβ = Xᵀy − Aᵀλ, so β = β̂ − (XᵀX)⁻¹Aᵀλ; substituting into Aβ = c pins down λ. " +
            "If β̂ already satisfies the constraint, the correction is zero and β̂_H = β̂.",
        },
      ],
    },

    {
      heading: "The cost of the restriction",
      blocks: [
        {
          kind: "formula",
          latex: "RSS_H − RSS = (Aβ̂ − c)ᵀ[A(XᵀX)⁻¹Aᵀ]⁻¹(Aβ̂ − c) = ‖Xβ̂ − Xβ̂_H‖²",
          caption: "Pythagoras: the restricted fit is the projection of the unrestricted fit onto a smaller (affine) subspace.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two derivations, one geometry",
          text:
            "Seber & Lee give a second derivation by orthogonal projection. When c = 0, the constraint " +
            "Aβ = 0 carves out a subspace ω of the column space Ω = C(X); ŷ_H is the projection of y onto " +
            "ω, and since ω ⊂ Ω it is also the projection of ŷ onto ω. The extra residual sum of squares " +
            "is then ‖ŷ − ŷ_H‖², a squared length in Ω ∩ ω⊥ — a space of dimension q, which is why the " +
            "F-test built from it has q numerator degrees of freedom.",
        },
        {
          kind: "prose",
          text:
            "Restrictions never lower the RSS (you are minimising over a smaller set), and when the " +
            "restriction is true they lower the variance of every estimable quantity. When it is false " +
            "they introduce bias. That trade — bias if wrong, precision if right — is the same trade " +
            "made by every subset-selection and shrinkage method later in the unit.",
        },
      ],
    },

    {
      heading: "Reparametrising instead",
      blocks: [
        {
          kind: "prose",
          text:
            "Most restrictions can also be imposed by substitution. The constraint β₁ + β₂ = 1 in " +
            "y = β₀ + β₁x₁ + β₂x₂ + ε becomes y − x₂ = β₀ + β₁(x₁ − x₂) + ε: an ordinary unrestricted " +
            "regression with a transformed response and one fewer coefficient. Both routes give identical " +
            "fitted values; the substitution route is what software does in practice.",
        },
        {
          kind: "example",
          title: "Equal slopes by substitution",
          problem:
            "Impose β₁ = β₂ on y = β₀ + β₁x₁ + β₂x₂ + ε with n = 30 observations. What model do you fit, " +
            "and how many residual degrees of freedom does it have?",
          steps: [
            "Write the common slope as β: y = β₀ + β(x₁ + x₂) + ε.",
            "Fit a simple regression of y on the single derived predictor s = x₁ + x₂.",
            "Parameters: β₀ and β, so p_H = 2 and the residual degrees of freedom are 30 − 2 = 28.",
            "The unrestricted model had 30 − 3 = 27; the difference, 1, is q — the number of restrictions.",
          ],
          answer: "Regress y on x₁ + x₂; 28 residual degrees of freedom, one more than the unrestricted fit.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.8.1, Method of Lagrange Multipliers" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.8.2, Method of Orthogonal Projections" },
  ],
};
