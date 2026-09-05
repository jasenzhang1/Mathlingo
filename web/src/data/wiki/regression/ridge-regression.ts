import type { WikiArticle } from "../types";

export const ridgeRegressionWiki: WikiArticle = {
  conceptId: "ridge-regression",

  summary:
    "Ridge regression penalises the sum of squared coefficients, giving the closed form " +
    "β̂ = (XᵀX + λI)⁻¹Xᵀy. Adding λI to XᵀX shifts every eigenvalue up by λ, which guarantees " +
    "invertibility even when XᵀX is singular — so ridge has a unique solution when OLS has none " +
    "at all. It shrinks all coefficients smoothly toward zero without setting any to exactly zero, " +
    "which makes it the natural choice when the predictors are correlated and most of them " +
    "genuinely matter.",

  sections: [
    {
      heading: "The estimator",
      blocks: [
        {
          kind: "formula",
          latex: "β̂_ridge = argmin_β [ ‖y − Xβ‖² + λ Σⱼ βⱼ² ] = (XᵀX + λI)⁻¹ Xᵀy",
          caption: "Unlike LASSO, ridge has a closed form — the penalty is smooth, so the gradient can be set to zero.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "The objective is (y − Xβ)ᵀ(y − Xβ) + λβᵀβ.",
            "Its gradient is −2Xᵀ(y − Xβ) + 2λβ.",
            "Setting the gradient to zero: XᵀXβ + λβ = Xᵀy.",
            "Factor the left side: (XᵀX + λI)β = Xᵀy.",
            "Since XᵀX + λI is invertible for every λ > 0, β̂ = (XᵀX + λI)⁻¹Xᵀy.",
          ],
        },
        {
          kind: "prose",
          text:
            "Compare this with the normal equations XᵀXβ̂ = Xᵀy. The only change is λI on the " +
            "diagonal — hence the name 'ridge', from the ridge added along the diagonal of the " +
            "cross-product matrix.",
        },
      ],
    },

    {
      heading: "Why λI repairs singularity",
      blocks: [
        {
          kind: "prose",
          text:
            "XᵀX is symmetric and positive semi-definite, so all its eigenvalues are real and " +
            "non-negative. It is singular exactly when one of them is zero, which happens when the " +
            "predictor columns are linearly dependent — including whenever p ≥ n.",
        },
        {
          kind: "formula",
          latex: "eig(XᵀX + λI) = { d₁² + λ, d₂² + λ, …, d_p² + λ }",
          caption: "Adding λI shifts every eigenvalue up by exactly λ, leaving the eigenvectors unchanged.",
        },
        {
          kind: "prose",
          text:
            "Since every dⱼ² ≥ 0, every shifted eigenvalue is at least λ > 0. The matrix is " +
            "therefore strictly positive definite, hence invertible, regardless of whether XᵀX was. " +
            "This is not a numerical trick that merely improves conditioning: it changes a singular " +
            "matrix into an invertible one exactly.",
        },
        {
          kind: "example",
          title: "Repairing a genuinely singular matrix",
          problem:
            "X has two columns, the second exactly twice the first, with XᵀX = [[5, 10], [10, 20]]. " +
            "Show that OLS fails and ridge does not.",
          steps: [
            "det(XᵀX) = 5(20) − 10(10) = 100 − 100 = 0, so XᵀX is singular and (XᵀX)⁻¹ does not exist.",
            "The eigenvalues are 25 and 0 — the zero confirms the collinearity.",
            "With λ = 0.1: XᵀX + λI = [[5.1, 10], [10, 20.1]].",
            "det = 5.1(20.1) − 100 = 102.51 − 100 = 2.51 ≠ 0, and the eigenvalues are 25.1 and 0.1.",
          ],
          answer:
            "OLS has infinitely many solutions and no unique β̂. Ridge at λ = 0.1 has a unique solution, obtained by shifting the zero eigenvalue to 0.1. Note also that ridge splits the coefficient between the two identical directions rather than picking one, which is the behaviour LASSO lacks.",
        },
      ],
    },

    {
      heading: "What shrinkage does, direction by direction",
      blocks: [
        {
          kind: "formula",
          latex: "Xβ̂_ridge = Σⱼ uⱼ · [dⱼ²/(dⱼ² + λ)] · uⱼᵀy",
          caption: "In the SVD basis of X, ridge scales the j-th component of the fit by dⱼ²/(dⱼ² + λ).",
        },
        {
          kind: "table",
          headers: ["Singular value dⱼ", "Shrinkage factor dⱼ²/(dⱼ² + λ)", "Interpretation"],
          rows: [
            ["Large (dⱼ² ≫ λ)", "Near 1", "A direction of high predictor variance — well determined, barely touched"],
            ["dⱼ² = λ", "Exactly 0.5", "Halved"],
            ["Small (dⱼ² ≪ λ)", "Near 0", "A collinear direction where OLS's variance explodes — heavily suppressed"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The penalty is targeted, not blunt",
          text:
            "Ridge does not shrink everything equally. It leaves the directions the data determines " +
            "well almost untouched and crushes the directions the data barely constrains — which " +
            "are exactly the directions where OLS's variance is largest. Summing the shrinkage " +
            "factors gives the effective degrees of freedom, a number that falls continuously from " +
            "p toward 0 as λ grows.",
        },
      ],
    },

    {
      heading: "Ridge against LASSO",
      blocks: [
        {
          kind: "table",
          headers: ["", "Ridge (L2)", "LASSO (L1)"],
          rows: [
            ["Penalty", "λΣβⱼ²", "λΣ|βⱼ|"],
            ["Closed form", "Yes", "No — solved numerically"],
            ["Sets coefficients to zero", "No", "Yes"],
            ["Variable selection", "No", "Yes"],
            ["Correlated predictors", "Shrinks them together", "Picks one arbitrarily"],
            ["Best when", "Many predictors each contributing a little", "Few predictors matter and the rest are noise"],
            ["Constraint region", "Circle — smooth", "Diamond — has corners"],
            ["Bayesian reading", "Normal prior on β", "Laplace prior on β"],
          ],
        },
        {
          kind: "prose",
          text:
            "Neither dominates. The right choice depends on whether the true signal is sparse, " +
            "which is a substantive assumption about the problem rather than something the data " +
            "settles on its own. When the predictors form correlated groups and all of them matter " +
            "— gene expression within a pathway, questionnaire items measuring one construct — " +
            "ridge is usually better, and elastic net exists to blend the two.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Ridge does not simplify the model",
          text:
            "Every predictor keeps a nonzero coefficient no matter how large λ is. Ridge improves " +
            "prediction and stability but hands back a model with all p variables in it — so it is " +
            "the wrong tool if the goal is a short, communicable list of what matters. LASSO or " +
            "elastic net is what that question needs.",
        },
      ],
    },

    {
      heading: "The two extremes of λ",
      blocks: [
        {
          kind: "table",
          headers: ["λ", "Estimator", "Bias", "Variance", "Behaviour"],
          rows: [
            ["0", "OLS exactly", "Zero", "Maximal", "Overfits when p is large or predictors are collinear"],
            ["Small", "Lightly shrunk", "Small", "Much reduced", "Usually the sweet spot"],
            ["Large", "Heavily shrunk", "Large", "Small", "Underfits"],
            ["→ ∞", "All coefficients zero", "Maximal", "Zero", "Predicts ȳ for every observation"],
          ],
        },
        {
          kind: "prose",
          text:
            "The two ends of this table are the two ends of the bias–variance spectrum, and λ moves " +
            "continuously between them. Cross-validation picks the point minimising total error, " +
            "which is essentially never at either extreme. When the cross-validated λ does come out " +
            "at zero, that is informative: it says the data has enough information that OLS was " +
            "not overfitting, and regularization was not needed.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§3.4.1, Ridge Regression" },
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§6.2.1, Ridge Regression" },
    { source: "Strang, Linear Algebra and Its Applications", locator: "Ch. 6, Positive Definite Matrices and the SVD" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-04-model-selection-and-regularization.md" },
  ],
};
