import type { WikiArticle } from "../types";

export const lassoWiki: WikiArticle = {
  conceptId: "lasso",

  summary:
    "LASSO — least absolute shrinkage and selection operator — penalises the sum of absolute " +
    "coefficient values. That one change from ridge's squared penalty produces a qualitatively " +
    "different behaviour: coefficients are driven to exactly zero, not merely close to it, so the " +
    "method performs variable selection and fitting in a single convex optimisation. The geometric " +
    "reason is that the L1 constraint region is a diamond with corners on the axes, and a " +
    "corner is where the solution tends to land.",

  sections: [
    {
      heading: "The objective",
      blocks: [
        {
          kind: "formula",
          latex: "β̂_lasso = argmin_β [ ‖y − Xβ‖² + λ Σⱼ |βⱼ| ]",
          caption: "Squared-error fit plus an L1 penalty. The intercept is not penalised.",
        },
        {
          kind: "formula",
          latex: "equivalently:  min ‖y − Xβ‖²  subject to  Σⱼ|βⱼ| ≤ t",
          caption: "The constrained form. Every λ corresponds to some budget t, and vice versa.",
        },
        {
          kind: "prose",
          text:
            "The constrained form is the one to picture. The coefficient vector must fit inside a " +
            "budget on total absolute size, and the fit is made as good as possible subject to that. " +
            "Larger λ means smaller t means a tighter budget, and at t = 0 every coefficient is zero.",
        },
      ],
    },

    {
      heading: "Why the solutions are sparse",
      blocks: [
        {
          kind: "prose",
          text:
            "The contours of the squared-error objective are ellipses centred on the OLS solution. " +
            "The constraint region is {β : Σ|βⱼ| ≤ t}, which in two dimensions is a diamond with " +
            "vertices on the axes. The solution is the first point where an expanding ellipse " +
            "touches the region.",
        },
        {
          kind: "table",
          headers: ["", "LASSO (L1)", "Ridge (L2)"],
          rows: [
            ["Constraint region in 2D", "Diamond, |β₁| + |β₂| ≤ t", "Circle, β₁² + β₂² ≤ t"],
            ["Boundary", "Has corners on the axes", "Perfectly smooth"],
            ["Where contact happens", "Often at a corner", "Almost never on an axis"],
            ["A corner means", "One coefficient is exactly zero", "n/a"],
            ["Result", "Sparse solution", "All coefficients nonzero"],
          ],
        },
        {
          kind: "prose",
          text:
            "A corner is a set of measure zero on a smooth boundary, so contact there would be a " +
            "coincidence — but the diamond's corners are points of high curvature where the normal " +
            "direction changes discontinuously, and an entire range of ellipse orientations touches " +
            "there first. In p dimensions the region is a cross-polytope with faces of every " +
            "dimension from 0 to p−1, and landing on a k-dimensional face means exactly p − k " +
            "coefficients are zero. Sparsity is generic, not accidental.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The one-dimensional case makes it concrete",
          text:
            "With orthonormal predictors the LASSO solution has a closed form: the soft-thresholding " +
            "operator β̂ⱼ = sign(β̂_OLS,ⱼ)·max(0, |β̂_OLS,ⱼ| − λ/2). Every coefficient is pulled " +
            "toward zero by a fixed amount, and any coefficient smaller than that amount is set to " +
            "zero rather than pushed past it. Ridge, by contrast, multiplies each coefficient by " +
            "1/(1 + λ) — a proportional shrink that never quite arrives at zero.",
        },
      ],
    },

    {
      heading: "The regularization path",
      blocks: [
        {
          kind: "prose",
          text:
            "Plotting the coefficients against λ traces the LASSO path. At very large λ every " +
            "coefficient is zero. As λ decreases they enter one at a time, in order of how strongly " +
            "each correlates with the current residual, and grow from zero continuously. The " +
            "smallest λ recovers OLS when p < n.",
        },
        {
          kind: "list",
          items: [
            "The path is piecewise linear in λ, which is what makes the LARS algorithm able to compute the entire path at roughly the cost of one least-squares fit.",
            "The number of nonzero coefficients is bounded by min(n, p), so with p > n the LASSO can select at most n variables however small λ becomes.",
            "The order of entry is a useful, if informal, ranking of predictor importance.",
            "Coefficients can leave the active set again as λ shrinks, when a newly entered correlated predictor explains their contribution better.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Selection and estimation happen together",
          text:
            "Stepwise selection makes a discrete include/exclude decision and then estimates the " +
            "coefficients as if the choice had been made in advance. LASSO does both in one convex " +
            "problem, which makes the result far more stable under resampling — the reason it has " +
            "largely replaced stepwise methods. The price is that the surviving coefficients are " +
            "biased toward zero, since the same penalty that selected them is also shrinking them.",
        },
      ],
    },

    {
      heading: "Where LASSO is the right tool — and where it is not",
      blocks: [
        {
          kind: "table",
          headers: ["Situation", "LASSO"],
          rows: [
            ["p ≫ n with a genuinely sparse signal", "Ideal — this is what it was designed for"],
            ["Interpretability matters", "Strong — it hands you a short list of variables"],
            ["A group of correlated relevant predictors", "Weak — it picks one arbitrarily and zeroes the rest"],
            ["All predictors matter a little", "Weak — the sparsity assumption is simply wrong"],
            ["Need unbiased coefficients for the selected set", "Weak — refit by OLS on the selected variables, or use the relaxed LASSO"],
            ["Need valid p-values", "Weak — post-selection inference is required"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Arbitrary choice among correlated predictors",
          text:
            "Given several nearly identical predictors, LASSO keeps roughly one and zeroes the " +
            "others — and which one survives can change with a small perturbation of the data. For " +
            "prediction this is harmless, since the retained variable carries the shared signal. For " +
            "interpretation it is seriously misleading: a report saying 'gene 4,182 predicts the " +
            "outcome' may really mean 'one of these forty correlated genes does, and this is the one " +
            "that happened to win'. Elastic net was designed for exactly this failure, and its " +
            "ridge component makes correlated predictors enter and leave together.",
        },
        {
          kind: "example",
          title: "Reading a cross-validation curve",
          problem:
            "Ten-fold CV over a λ grid gives minimum error at λ = 0.03, where 42 of 500 predictors " +
            "are nonzero. At λ = 0.11 the CV error is one standard error higher and 9 predictors are " +
            "nonzero. Which λ should be reported?",
          steps: [
            "λ = 0.03 minimises estimated prediction error, so it is the choice if forecasting is the only goal.",
            "The CV curve is itself estimated with noise, so a difference within one standard error is not evidence of a real difference in accuracy.",
            "The one-standard-error rule takes the largest λ within that margin, buying a much simpler model at no reliable cost.",
          ],
          answer:
            "Report λ = 0.11 with 9 predictors for an interpretable model, or λ = 0.03 if raw predictive accuracy is what matters. Say which rule was used — the choice is not a detail.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§3.4.2–3.4.3, The Lasso and Least Angle Regression" },
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§6.2.2, The Lasso" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§3.1.4, Regularized Least Squares" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-04-model-selection-and-regularization.md" },
  ],
};
