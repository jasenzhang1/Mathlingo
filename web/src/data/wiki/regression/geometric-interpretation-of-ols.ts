import type { WikiArticle } from "../types";

export const geometricInterpretationOfOlsWiki: WikiArticle = {
  conceptId: "geometric-interpretation-of-ols",

  summary:
    "Geometrically, OLS does exactly one thing: it drops a perpendicular from the response vector y " +
    "onto the column space of X. The fitted values ŷ are the foot of that perpendicular, the " +
    "residuals are the perpendicular itself, and the hat matrix H = X(XᵀX)⁻¹Xᵀ is the operator " +
    "that performs the projection. Once you see the picture, three otherwise-separate facts — " +
    "H² = H, trace(H) = p, and SST = SSR + SSE — become the same fact told three ways.",

  sections: [
    {
      heading: "The picture",
      blocks: [
        {
          kind: "prose",
          text:
            "Take the n observations not as n points in a plane but as a single vector y in ℝⁿ. " +
            "Each predictor is likewise a vector in ℝⁿ. Any model prediction Xβ is a linear " +
            "combination of the predictor columns, so the set of all achievable predictions is " +
            "exactly the column space C(X) — a subspace of dimension p+1 (with an intercept) sitting " +
            "inside ℝⁿ. Since n is normally much larger than p, y almost never lies in that " +
            "subspace, and the fitting problem becomes: which point of C(X) is closest to y?",
        },
        {
          kind: "formula",
          latex: "ŷ = argmin_{v ∈ C(X)} ‖y − v‖   ⟹   y − ŷ ⟂ C(X)",
          caption: "The orthogonality principle: the closest point is the one whose error is perpendicular to the subspace.",
        },
        {
          kind: "definitions",
          items: [
            { term: "y", description: "The response, a vector in ℝⁿ." },
            { term: "C(X)", description: "The column space of the design matrix — the set of all fits the model can produce. Dimension p+1 when X has full rank." },
            { term: "ŷ = Xβ̂", description: "The orthogonal projection of y onto C(X). Lives in the subspace." },
            { term: "e = y − ŷ", description: "The residual vector. Lives in the orthogonal complement C(X)⊥, of dimension n − p − 1." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The residual degrees of freedom is a dimension count",
          text:
            "ℝⁿ splits into C(X) of dimension p+1 and its orthogonal complement of dimension " +
            "n − p − 1. The residual vector is confined to the second piece, so it has n − p − 1 " +
            "free coordinates rather than n. That is where the denominator of σ̂² = SSE/(n − p − 1) " +
            "comes from — degrees of freedom is literally the dimension of the space the residual " +
            "is allowed to live in.",
        },
      ],
    },

    {
      heading: "The hat matrix",
      blocks: [
        {
          kind: "formula",
          latex: "H = X(XᵀX)⁻¹Xᵀ,   ŷ = Hy,   e = (I − H)y",
          caption: "H puts the hat on y. I − H is the complementary projection onto the residual space.",
        },
        {
          kind: "prose",
          text:
            "Substituting β̂ = (XᵀX)⁻¹Xᵀy into ŷ = Xβ̂ gives ŷ = X(XᵀX)⁻¹Xᵀy = Hy. So the whole " +
            "fitting procedure is a single fixed linear operator applied to y — fixed because H " +
            "depends only on the design matrix, not on the responses at all. Two datasets with the " +
            "same predictors and different outcomes share a hat matrix.",
        },
        {
          kind: "table",
          headers: ["Property", "Statement", "What it means"],
          rows: [
            ["Symmetry", "Hᵀ = H", "The projection is orthogonal, not oblique"],
            ["Idempotence", "H² = H", "Projecting twice is projecting once"],
            ["Eigenvalues", "λ ∈ {0, 1}", "Directions in C(X) are kept, directions perpendicular are killed"],
            ["Trace", "trace(H) = p + 1", "Counts the kept directions — the effective number of parameters"],
            ["Complement", "(I − H)H = 0", "Fitted values and residuals are orthogonal"],
          ],
        },
        {
          kind: "example",
          title: "Verifying idempotence",
          problem: "Show algebraically that H² = H.",
          steps: [
            "H² = [X(XᵀX)⁻¹Xᵀ][X(XᵀX)⁻¹Xᵀ].",
            "Regroup the middle: X(XᵀX)⁻¹(XᵀX)(XᵀX)⁻¹Xᵀ.",
            "The middle pair (XᵀX)⁻¹(XᵀX) is the identity and cancels.",
            "What remains is X(XᵀX)⁻¹Xᵀ = H.",
          ],
          answer:
            "H² = H. Geometrically it is obvious without the algebra: Hy already lies in C(X), and projecting a point that is already in the subspace onto the subspace leaves it exactly where it is.",
        },
      ],
    },

    {
      heading: "Why trace(H) equals the number of parameters",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Let v be an eigenvector of H with eigenvalue λ, so Hv = λv.",
            "Apply H again: H²v = λHv = λ²v. But H² = H, so H²v = Hv = λv.",
            "Therefore λ²v = λv, and since v ≠ 0, λ² = λ — forcing λ ∈ {0, 1}.",
            "The trace of any matrix is the sum of its eigenvalues, so trace(H) simply counts the eigenvalues equal to 1.",
            "The eigenvalue-1 eigenspace is exactly C(X), whose dimension is rank(X) = p + 1.",
          ],
        },
        {
          kind: "prose",
          text:
            "So trace(H) = p + 1, and there was never any need to compute the matrix. This quantity " +
            "is used far beyond OLS: for smoothers with no obvious parameter count — LOESS, " +
            "smoothing splines, ridge regression — the trace of the equivalent smoother matrix is " +
            "taken as the definition of the effective degrees of freedom, and it is what makes AIC " +
            "and cross-validation comparisons possible across methods that have no p to count.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Ridge shrinks the effective degrees of freedom",
          text:
            "The ridge smoother is H_λ = X(XᵀX + λI)⁻¹Xᵀ, and its trace equals Σⱼ dⱼ²/(dⱼ² + λ) " +
            "where the dⱼ are the singular values of X. At λ = 0 every term is 1 and the trace is " +
            "p + 1, recovering OLS. As λ grows each term shrinks toward 0. That continuous number " +
            "between 0 and p+1 is a precise sense in which ridge uses 'fewer parameters' than OLS " +
            "while still estimating all of them.",
        },
      ],
    },

    {
      heading: "Leverage: the diagonal of H",
      blocks: [
        {
          kind: "prose",
          text:
            "The i-th diagonal entry hᵢᵢ is called the leverage of observation i. Since " +
            "ŷᵢ = Σⱼ hᵢⱼyⱼ, the leverage is exactly ∂ŷᵢ/∂yᵢ — how much observation i's own response " +
            "pulls its own fitted value.",
        },
        {
          kind: "list",
          items: [
            "0 ≤ hᵢᵢ ≤ 1 always, and Σᵢ hᵢᵢ = trace(H) = p + 1, so the average leverage is (p+1)/n.",
            "A common rule of thumb flags observations with hᵢᵢ > 2(p+1)/n as high leverage.",
            "Leverage depends only on X — an observation can have high leverage with a perfectly ordinary response value.",
            "Var(eᵢ) = σ²(1 − hᵢᵢ): high-leverage points have small residuals almost by construction, because the line is dragged toward them.",
            "Leverage plus a large residual is influence, which is what Cook's distance measures.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A high-leverage point can hide its own misfit",
          text:
            "Because Var(eᵢ) = σ²(1 − hᵢᵢ) shrinks toward zero as leverage approaches one, the most " +
            "influential observation in a dataset often shows one of the smallest raw residuals. " +
            "Scanning raw residuals for outliers therefore systematically misses the points that " +
            "matter most, which is exactly why studentised residuals divide by √(1 − hᵢᵢ).",
        },
      ],
    },

    {
      heading: "The variance decomposition, geometrically",
      blocks: [
        {
          kind: "prose",
          text:
            "Centre y by subtracting ȳ. The centred response decomposes into the part inside C(X) " +
            "and the part perpendicular to it, and because the two pieces are orthogonal, Pythagoras " +
            "applies directly:",
        },
        {
          kind: "formula",
          latex: "‖y − ȳ1‖² = ‖ŷ − ȳ1‖² + ‖y − ŷ‖²   i.e.   SST = SSR + SSE",
          caption: "The ANOVA identity is the Pythagorean theorem in ℝⁿ.",
        },
        {
          kind: "prose",
          text:
            "It follows that R² = SSR/SST = cos²θ, where θ is the angle between the centred response " +
            "and its projection. A model explaining 64% of the variance sits at an angle of 37° from " +
            "the response. And because the right angle is guaranteed by the normal equations rather " +
            "than assumed, the identity is exact for every OLS fit with an intercept — never " +
            "approximate, and never asymptotic.",
        },
      ],
    },
  ],

  references: [
    { source: "Strang, Linear Algebra and Its Applications", locator: "§4.2–4.3, Projections and Least Squares" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§3.2, Linear Regression Models and Least Squares" },
    { source: "Banerjee & Roy, Linear Algebra and Matrix Analysis for Statistics", locator: "Ch. 10, Projections and the Hat Matrix" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-02-ols-geometry-and-multiple-regression.md" },
  ],
};
