import type { WikiArticle } from "../types";

export const normalEquationsWiki: WikiArticle = {
  conceptId: "normal-equations",

  summary:
    "The normal equations, XᵀXβ̂ = Xᵀy, are what OLS looks like once the predictors are stacked " +
    "into a matrix. They come from differentiating ‖y − Xβ‖² and setting the gradient to zero, and " +
    "they are worth reading twice: once as algebra, which gives β̂ = (XᵀX)⁻¹Xᵀy, and once as " +
    "geometry, since the equivalent form Xᵀ(y − Xβ̂) = 0 says the residual is orthogonal to every " +
    "column of X. 'Normal' in the name means perpendicular, not Gaussian.",

  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "XᵀX β̂ = Xᵀy",
          caption: "The normal equations — a square (p+1) × (p+1) linear system in β̂.",
        },
        {
          kind: "formula",
          latex: "β̂ = (XᵀX)⁻¹Xᵀy   (when XᵀX is invertible)",
          caption: "The closed-form OLS solution.",
        },
        {
          kind: "definitions",
          items: [
            { term: "X", description: "The n × (p+1) design matrix: a column of ones, then one column per predictor." },
            { term: "y", description: "The n × 1 vector of observed responses." },
            { term: "XᵀX", description: "A (p+1) × (p+1) matrix of predictor cross-products — symmetric and positive semi-definite." },
            { term: "Xᵀy", description: "A (p+1) × 1 vector of predictor–response cross-products." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The system is small, whatever n is",
          text:
            "XᵀX is (p+1) × (p+1) — its size depends on the number of predictors, not the number " +
            "of observations. A regression on ten million rows and four predictors solves a 5 × 5 " +
            "system. This is why OLS scales gracefully in n and painfully in p, and it is the same " +
            "reason p > n breaks the method entirely: XᵀX is then singular, because rank(XᵀX) = " +
            "rank(X) ≤ min(n, p+1).",
        },
      ],
    },

    {
      heading: "Derivation by differentiation",
      blocks: [
        {
          kind: "prose",
          text:
            "Write the objective as a quadratic form and take its gradient with respect to β. The " +
            "objective is convex — XᵀX is positive semi-definite — so a stationary point is a global " +
            "minimum, and no second-order check is needed beyond that observation.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "S(β) = ‖y − Xβ‖² = (y − Xβ)ᵀ(y − Xβ).",
            "Expand: S(β) = yᵀy − 2βᵀXᵀy + βᵀXᵀXβ. The two cross terms are equal scalars, hence the factor of 2.",
            "Differentiate: ∇_β S = −2Xᵀy + 2XᵀXβ, using ∇(βᵀa) = a and ∇(βᵀAβ) = 2Aβ for symmetric A.",
            "Set ∇_β S = 0: −2Xᵀ(y − Xβ) = 0.",
            "Divide by −2 and rearrange: XᵀXβ̂ = Xᵀy.",
          ],
        },
        {
          kind: "prose",
          text:
            "Step 4 is worth pausing on before it is rearranged. In the form Xᵀ(y − Xβ̂) = 0 the " +
            "equation says: the residual vector has zero dot product with every column of X. That " +
            "is not an incidental rewriting — it is the entire geometric content of least squares, " +
            "and the next section is just that sentence taken seriously.",
        },
      ],
    },

    {
      heading: "The same equations as orthogonality",
      blocks: [
        {
          kind: "formula",
          latex: "Xᵀ(y − Xβ̂) = 0   ⟺   ⟨xⱼ, y − ŷ⟩ = 0 for every column xⱼ of X",
          caption: "Every predictor is perpendicular to the residual.",
        },
        {
          kind: "prose",
          text:
            "The fitted vector ŷ = Xβ̂ lives in the column space C(X) — it is a linear combination " +
            "of the predictor columns, which is exactly what Xβ means. The normal equations say the " +
            "error y − ŷ is orthogonal to that entire subspace. The orthogonality principle from " +
            "vector projection says exactly one point of a subspace has this property, and it is the " +
            "closest point. So OLS is not merely analogous to projection: the defining condition is " +
            "identical, and the normal equations are the projection's normal equations.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the residuals sum to zero",
          text:
            "The first column of X is all ones, so the first row of Xᵀ(y − Xβ̂) = 0 reads " +
            "Σᵢ(yᵢ − ŷᵢ) = 0. The vanishing residual sum is not a separate result about OLS — it is " +
            "one scalar equation of the normal equations, and it holds precisely because the model " +
            "includes an intercept. Fit without one and it fails.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Solving a 2 × 2 normal-equation system by hand",
          problem:
            "Fit Y = β₀ + β₁X by least squares to the three points (1, 2), (2, 2), (3, 5), using the " +
            "matrix form.",
          steps: [
            "X has rows (1, 1), (1, 2), (1, 3); y = (2, 2, 5)ᵀ.",
            "XᵀX = [[3, 6], [6, 14]] — the entries are n, Σxᵢ, Σxᵢ, and Σxᵢ².",
            "Xᵀy = (Σyᵢ, Σxᵢyᵢ)ᵀ = (9, 21)ᵀ.",
            "Solve 3β₀ + 6β₁ = 9 and 6β₀ + 14β₁ = 21. Doubling the first gives 6β₀ + 12β₁ = 18; subtract from the second: 2β₁ = 3.",
            "β₁ = 1.5, and back-substituting, 3β₀ = 9 − 9, so β₀ = 0.",
          ],
          answer:
            "Ŷ = 0 + 1.5X. Check: fitted values 1.5, 3, 4.5; residuals 0.5, −1, 0.5, which sum to zero and have Σeᵢxᵢ = 0.5 − 2 + 1.5 = 0, as the normal equations require.",
        },
      ],
    },

    {
      heading: "When XᵀX is not invertible",
      blocks: [
        {
          kind: "prose",
          text:
            "XᵀX is invertible exactly when X has full column rank — that is, when no predictor is " +
            "an exact linear combination of the others. Three situations break it, and they call for " +
            "different responses.",
        },
        {
          kind: "table",
          headers: ["Cause", "Example", "Fix"],
          rows: [
            ["Exact duplication", "Height in cm and height in inches both included", "Drop one column"],
            ["The dummy-variable trap", "Indicators for all k categories plus an intercept", "Drop one category as the baseline"],
            ["p ≥ n", "20,000 genes, 100 patients", "Regularise (ridge, LASSO) or reduce dimension"],
          ],
        },
        {
          kind: "prose",
          text:
            "When XᵀX is singular the normal equations still have solutions — infinitely many of " +
            "them, since any vector in the null space of X can be added to β̂ without changing Xβ̂. " +
            "The Moore–Penrose pseudo-inverse picks the one of minimum norm: β̂ = X⁺y. Ridge " +
            "regression takes a different route, replacing XᵀX with XᵀX + λI, which shifts every " +
            "eigenvalue up by λ and so is invertible for any λ > 0.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Near-singular is the dangerous case, not singular",
          text:
            "Exact collinearity is easy: the software errors or silently drops a column, and you " +
            "notice. Near-collinearity produces a matrix that inverts successfully and gives " +
            "coefficients with vast standard errors that flip sign when one observation is added. " +
            "That is what VIF is for, and it is why practical solvers use a QR or SVD factorisation " +
            "of X rather than forming XᵀX and inverting it — squaring the matrix squares its " +
            "condition number, doubling the digits of precision lost.",
        },
      ],
    },
  ],

  references: [
    { source: "Strang, Linear Algebra and Its Applications", locator: "§4.3, Least Squares Approximations" },
    { source: "Banerjee & Roy, Linear Algebra and Matrix Analysis for Statistics", locator: "Ch. 10, Least Squares and the Normal Equations" },
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§3.2, Multiple Linear Regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-01-foundations.md" },
  ],
};
