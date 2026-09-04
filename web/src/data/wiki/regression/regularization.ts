import type { WikiArticle } from "../types";

export const regularizationWiki: WikiArticle = {
  conceptId: "regularization",

  summary:
    "Regularization adds a penalty on the size of the coefficients to the least-squares objective. " +
    "The result is a biased estimator — which sounds like a step backwards until you notice that " +
    "Gauss–Markov only promises minimum variance among unbiased estimators, and that total error " +
    "is bias² plus variance. Accepting a little bias to remove a lot of variance is usually a good " +
    "trade, and it becomes the only option at all when p ≥ n, where OLS has no unique solution.",

  sections: [
    {
      heading: "The general form",
      blocks: [
        {
          kind: "formula",
          latex: "β̂ = argmin_β [ ‖y − Xβ‖² + λ · P(β) ]",
          caption: "Fit plus penalty. The penalty function P and the tuning parameter λ define the method.",
        },
        {
          kind: "table",
          headers: ["Method", "Penalty P(β)", "Effect on coefficients"],
          rows: [
            ["OLS", "0", "No shrinkage"],
            ["Ridge", "Σβⱼ²  (L2)", "All shrink smoothly; none reach zero"],
            ["LASSO", "Σ|βⱼ|  (L1)", "Some reach exactly zero — automatic selection"],
            ["Elastic net", "α·Σ|βⱼ| + (1−α)·Σβⱼ²", "Sparse, and stable across correlated groups"],
            ["Best subset", "‖β‖₀, the count of nonzeros", "Hard selection; not convex, so infeasible at scale"],
          ],
        },
        {
          kind: "prose",
          text:
            "λ ≥ 0 controls the strength. At λ = 0 the penalty vanishes and the estimator is exactly " +
            "OLS. As λ → ∞ the penalty dominates and every coefficient is driven to zero, leaving a " +
            "model that predicts the mean of y for everything. Useful models live strictly between " +
            "these two extremes, and finding where is the tuning problem.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Standardise the predictors, and do not penalise the intercept",
          text:
            "The penalty sums coefficients across predictors, so it compares quantities in different " +
            "units unless the columns are put on a common scale. A variable measured in metres gets " +
            "a coefficient a thousand times smaller than the same variable in millimetres, and the " +
            "penalty would treat them completely differently. Standardise every predictor to unit " +
            "variance first. The intercept is excluded from the penalty for a related reason: " +
            "shrinking it would make the fit depend on where the origin of y happens to be.",
        },
      ],
    },

    {
      heading: "Why a biased estimator can win",
      blocks: [
        {
          kind: "formula",
          latex: "E[(β̂ − β)²] = Bias(β̂)² + Var(β̂)",
          caption: "Mean squared error. OLS sets the first term to zero and takes whatever the second turns out to be.",
        },
        {
          kind: "prose",
          text:
            "Gauss–Markov guarantees OLS the smallest variance among linear unbiased estimators. " +
            "That is a real guarantee about a restricted class, and regularised estimators are " +
            "simply not in the class — they are biased by construction. So there is no contradiction " +
            "in ridge having smaller total error: it is not competing in the same event.",
        },
        {
          kind: "prose",
          text:
            "The theoretical result behind this is stronger than it first appears. For ridge " +
            "regression there always exists some λ > 0 whose mean squared error is strictly lower " +
            "than OLS's, regardless of the data. The catch is that the optimal λ depends on the " +
            "unknown true β, so it has to be estimated — which is exactly what cross-validation does.",
        },
        {
          kind: "example",
          title: "The trade in numbers",
          problem:
            "Two predictors correlate at 0.99. Across many simulated samples, OLS gives β̂₁ with " +
            "mean 2.0 (the truth) and standard deviation 15. Ridge at a small λ gives mean 1.6 and " +
            "standard deviation 1.2. Which has lower expected squared error?",
          steps: [
            "OLS: bias = 0, so MSE = 0² + 15² = 225.",
            "Ridge: bias = 1.6 − 2.0 = −0.4, so MSE = 0.16 + 1.44 = 1.60.",
          ],
          answer:
            "Ridge, by a factor of roughly 140. OLS is right on average and wrong in every individual sample; ridge is slightly off on average and close every time. If you only get to run the study once, unbiasedness is a weak consolation.",
        },
      ],
    },

    {
      heading: "When regularization is needed",
      blocks: [
        {
          kind: "table",
          headers: ["Situation", "What goes wrong with OLS", "What regularization does"],
          rows: [
            ["p ≥ n", "XᵀX singular; infinitely many perfect fits", "Ridge's XᵀX + λI is always invertible"],
            ["Severe multicollinearity", "Var(β̂) inflated by VIF; unstable signs", "Shrinks the unstable directions hardest"],
            ["Many weak predictors", "Overfitting; poor test error", "Trades in-sample fit for generalisation"],
            ["Sparse true signal", "Fits noise in the irrelevant coordinates", "LASSO zeroes them out"],
            ["Small n, moderate p", "High variance across samples", "Stabilises the estimates"],
            ["Large n, few uncorrelated predictors", "Nothing", "λ ≈ 0 is chosen; regularization is unnecessary"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It shrinks the ill-conditioned directions most",
          text:
            "In terms of the singular values dⱼ of X, ridge multiplies the j-th principal direction " +
            "of the fit by dⱼ²/(dⱼ² + λ). Directions with large dⱼ — those in which the predictors " +
            "vary a lot and are therefore well determined — are barely touched. Directions with " +
            "small dⱼ, precisely the collinear ones where OLS's variance explodes, are shrunk " +
            "heavily. The penalty is not a blunt instrument: it removes variance exactly where the " +
            "data is uninformative.",
        },
      ],
    },

    {
      heading: "Choosing λ",
      blocks: [
        {
          kind: "prose",
          text:
            "λ is a hyperparameter: it cannot be estimated by minimising the training objective, " +
            "because that objective is minimised at λ = 0 by definition. It has to be chosen by " +
            "reference to performance on data the fit did not see.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Choose a grid of λ values, usually spaced evenly on a log scale over several orders of magnitude.",
            "Split the training data into K folds, typically 5 or 10.",
            "For each λ and each fold, fit on the other K − 1 folds and record the error on the held-out fold.",
            "Average across folds to get a cross-validated error curve, which is U-shaped: underfitting on the right, overfitting on the left.",
            "Take λ at the minimum — or the 'one standard error' rule: the largest λ whose CV error is within one standard error of the minimum, which buys a simpler model at negligible cost in accuracy.",
            "Refit on the full training set at the chosen λ.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Standardise inside the cross-validation loop",
          text:
            "Computing the predictor means and standard deviations on the whole dataset before " +
            "splitting leaks information from the held-out fold into the fit. The leak is small for " +
            "standardisation and large for anything more elaborate — imputation, feature selection, " +
            "outlier removal — but the principle is the same: every step that uses the response or " +
            "the full predictor distribution belongs inside the loop.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Every penalty is a prior",
          text:
            "Maximising the posterior under a normal prior β ~ N(0, τ²I) gives exactly the ridge " +
            "estimate with λ = σ²/τ². A Laplace prior gives exactly LASSO. Regularization strength " +
            "is prior strength: a large λ is a confident prior belief that the coefficients are " +
            "small, and 'shrinking toward zero' is 'the prior pulling toward its mean'. The two " +
            "framings are the same computation with different vocabulary.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§3.4, Shrinkage Methods" },
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§6.2, Shrinkage Methods" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§3.1.4 and §3.3, Regularized Least Squares and Bayesian Linear Regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-04-model-selection-and-regularization.md" },
  ],
};
