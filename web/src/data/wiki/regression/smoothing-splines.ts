import type { WikiArticle } from "../types";

export const smoothingSplinesWiki: WikiArticle = {
  conceptId: "smoothing-splines",

  summary:
    "Regression splines make you choose the knots. Smoothing splines sidestep the choice: put a knot at " +
    "every distinct x, which could interpolate the data exactly, and then penalise roughness so it does " +
    "not. A single smoothing parameter λ slides the fit from the interpolating curve (λ = 0) to the least-" +
    "squares straight line (λ → ∞). The fit is still linear in y, ŷ = S_λy, and the trace of S_λ plays " +
    "the role that the number of parameters plays in ordinary regression.",

  sections: [
    {
      heading: "The penalised criterion",
      blocks: [
        {
          kind: "formula",
          latex: "\\min_f \\; Σᵢ (yᵢ − f(xᵢ))² + λ \\int f''(t)² \\, dt",
          caption: "Fidelity to the data plus a penalty on total curvature.",
        },
        {
          kind: "prose",
          text:
            "Remarkably, the minimiser over all twice-differentiable functions is a natural cubic spline with " +
            "knots at the distinct xᵢ. So the infinite-dimensional problem reduces to a finite one: writing " +
            "f = Nθ in a natural-spline basis, the criterion is ‖y − Nθ‖² + λθᵀΩθ, a generalised ridge " +
            "regression with solution θ̂ = (NᵀN + λΩ)⁻¹Nᵀy.",
        },
      ],
    },

    {
      heading: "The smoother matrix and effective degrees of freedom",
      blocks: [
        {
          kind: "formula",
          latex: "ŷ = S_λ y,   S_λ = N(NᵀN + λΩ)⁻¹Nᵀ,   df_λ = tr(S_λ)",
        },
        {
          kind: "table",
          headers: ["λ", "Fit", "df_λ = tr(S_λ)"],
          rows: [
            ["0", "Interpolating natural cubic spline", "n (for n distinct x)"],
            ["moderate", "Smooth curve", "between 2 and n"],
            ["→ ∞", "Least-squares straight line (∫f″² = 0 forces linearity)", "2"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A smoother, not a projection",
          text:
            "Unlike a hat matrix, S_λ is not idempotent: its eigenvalues lie between 0 and 1 rather than " +
            "being exactly 0 or 1. Components of y that are smooth (the constant and linear ones) pass " +
            "through untouched with eigenvalue 1; wigglier components are shrunk more the rougher they are. " +
            "That is why the trace — a sum of partial eigenvalues — is a sensible 'effective' parameter count.",
        },
      ],
    },

    {
      heading: "Choosing λ",
      blocks: [
        {
          kind: "prose",
          text:
            "Leave-one-out cross-validation has the same shortcut as for least squares: the deleted residual " +
            "is (yᵢ − ŷᵢ)/(1 − Sᵢᵢ), so CV(λ) = (1/n)Σ[(yᵢ − ŷᵢ)/(1 − Sᵢᵢ)]². Generalised cross-validation " +
            "replaces each Sᵢᵢ by the average tr(S_λ)/n. Either is minimised over a grid of λ values, often " +
            "parametrised by df_λ because degrees of freedom are easier to reason about than λ itself.",
        },
        {
          kind: "example",
          title: "GCV at one λ",
          problem:
            "At some λ, n = 50, RSS = 36 and tr(S_λ) = 5. Compute GCV(λ) = n·RSS / (n − tr S_λ)².",
          steps: ["n − tr(S) = 45, squared is 2025.", "GCV = 50·36/2025 = 1800/2025 ≈ 0.889."],
          answer: "GCV ≈ 0.889; repeat over λ and pick the minimum.",
        },
      ],
    },

    {
      heading: "More than one predictor",
      blocks: [
        {
          kind: "prose",
          text:
            "Seber & Lee §7.3.2 extends the idea to several variables. Thin-plate splines penalise the " +
            "integrated squared second derivatives in every direction and have a similar closed form; " +
            "additive models fit a smoothing spline to each predictor separately, avoiding the curse of " +
            "dimensionality at the price of ignoring interactions.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§7.2.3, Smoothing Splines" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§7.3.2, Multidimensional Smoothing" },
  ],
};
