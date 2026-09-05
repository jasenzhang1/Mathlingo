import type { WikiArticle } from "../types";

export const quantileRegressionWiki: WikiArticle = {
  conceptId: "quantile-regression",

  summary:
    "Quantile regression models a conditional quantile of the response — the median, or the 90th " +
    "percentile, or any τ you choose — rather than its conditional mean. It replaces squared error " +
    "with the pinball loss, an asymmetric penalty whose minimiser is provably the τ-th quantile rather " +
    "than the mean. The payoff is a model that answers a genuinely different question: not 'what is Y " +
    "typically', but 'how does the whole shape of Y's distribution, including its spread and skew, " +
    "shift with X'.",

  sections: [
    {
      heading: "The objective",
      blocks: [
        {
          kind: "formula",
          latex: "ρ_τ(u) = u·(τ − 𝟙[u < 0]),   β̂_τ = argmin_β Σᵢ ρ_τ(yᵢ − xᵢᵀβ)",
          caption: "The pinball (or check) loss ρ_τ, and the quantile regression estimator built from it.",
        },
        {
          kind: "prose",
          text:
            "ρ_τ charges a positive residual (an under-prediction) at rate τ per unit, and a negative " +
            "residual (an over-prediction) at rate 1 − τ per unit. At τ = 0.5 the two rates are equal " +
            "and ρ_0.5(u) = ½|u| — least absolute deviations, which is exactly ordinary least squares' " +
            "companion for the median rather than the mean. Every other τ breaks that symmetry on " +
            "purpose.",
        },
        {
          kind: "table",
          headers: ["τ", "Penalty for over-predicting", "Penalty for under-predicting", "What the minimiser targets"],
          rows: [
            ["0.5", "Equal", "Equal", "The conditional median"],
            ["0.1", "Cheap (0.1 per unit)", "Expensive (0.9 per unit)", "The conditional 10th percentile"],
            ["0.9", "Expensive (0.9 per unit)", "Cheap (0.1 per unit)", "The conditional 90th percentile"],
          ],
          caption: "Asymmetric penalties are what push the minimiser away from the mean toward a specific quantile.",
        },
      ],
    },

    {
      heading: "Why minimising this loss finds a quantile",
      blocks: [
        {
          kind: "prose",
          text:
            "For a single unconditional random variable Y, minimise E[ρ_τ(Y − c)] over the constant c. " +
            "Differentiating the expectation with respect to c and setting the result to zero gives " +
            "τ = P(Y ≤ c) — precisely the definition of the τ-th quantile of Y. Squared error, by the " +
            "same style of argument, is minimised at c = E[Y]. Quantile regression is that fact applied " +
            "conditionally: minimising Σρ_τ(yᵢ − xᵢᵀβ) finds the β whose fitted values track the " +
            "conditional τ-th quantile, exactly as OLS finds the β whose fitted values track the " +
            "conditional mean.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "OLS and median regression are the same idea at two different losses",
          text:
            "This is precisely the ordinary-least-squares wiki's point about squared error versus " +
            "absolute error, generalised: the loss you minimise decides which functional of the " +
            "conditional distribution you are estimating. Quantile regression makes that choice " +
            "explicit and lets it be any τ, not only the mean (squared loss) or the median (absolute " +
            "loss).",
        },
      ],
    },

    {
      heading: "Why fit more than the median",
      blocks: [
        {
          kind: "prose",
          text:
            "Fitting several τ at once — 0.1, 0.25, 0.5, 0.75, 0.9, say — traces out how the entire " +
            "conditional distribution moves with X, not just its centre. Two datasets with an identical " +
            "conditional mean function can have completely different conditional spreads or skew, and " +
            "only a family of quantile fits shows the difference.",
        },
        {
          kind: "example",
          title: "Same mean effect, different quantile effects",
          problem:
            "A wage regression finds an OLS coefficient of $2,000 per year of education. Separate " +
            "quantile fits at τ = 0.1 and τ = 0.9 give coefficients of $800 and $3,600 respectively. " +
            "Interpret the difference.",
          steps: [
            "The OLS number describes the average shift in wages per year of education — one summary number.",
            "The τ = 0.1 estimate says the bottom of the wage distribution, conditional on education, rises by only $800 per year.",
            "The τ = 0.9 estimate says the top of the distribution rises by $3,600 — more than four times as much.",
          ],
          answer:
            "Education is associated not just with higher average wages but with a wider spread of wages — the return to education is far larger for people already near the top of the conditional distribution than for those near the bottom. A single mean coefficient hides this entirely.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Crossing quantiles are a warning sign, not just an annoyance",
          text:
            "Fitted quantile curves for different τ should never cross — the 90th percentile must sit " +
            "above the 10th percentile everywhere. Because each τ is fitted as a separate optimisation, " +
            "nothing in the basic method enforces this, and crossing in practice usually signals either " +
            "too small a sample at the extreme quantiles or a genuine misspecification of the linear " +
            "form. Non-crossing constrained versions of the estimator exist specifically to rule this " +
            "out.",
        },
      ],
    },

    {
      heading: "Robustness to outliers in y",
      blocks: [
        {
          kind: "prose",
          text:
            "Because ρ_τ grows linearly rather than quadratically in the residual, a single extreme " +
            "response value has bounded influence on β̂_τ — the same robustness OLS's own wiki notes " +
            "for absolute-error loss generally, inherited here at every τ, not only the median.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Robust to outliers in y, not in x",
          text:
            "This robustness is about the response only. A point with an extreme predictor value still " +
            "carries high leverage in exactly the sense the outliers-leverage-influence wiki describes, " +
            "and can still pull a quantile fit substantially — the check loss protects against a " +
            "surprising y, not against an unusual x.",
        },
      ],
    },

    {
      heading: "Fitting and interpreting",
      blocks: [
        {
          kind: "list",
          items: [
            "The pinball loss is piecewise linear, not differentiable at zero, so — exactly as for least absolute deviations — there is no closed-form normal-equations solution; it is solved by linear programming.",
            "Each coefficient βⱼ,τ is interpreted as the change in the τ-th conditional quantile of Y per unit change in Xⱼ, holding the other predictors fixed — the same partial-effect reading multiple-linear-regression gives its coefficients, just for a different functional of Y.",
            "No single R² serves every τ; goodness of fit is usually reported per quantile via a pseudo-R² built from the pinball loss itself.",
            "Standard errors typically come from bootstrapping rather than a closed-form formula, since the asymptotic theory is more involved than OLS's.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "§13.7, Quantile Regression" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§1.4, Robustness and Alternative Loss Functions" },
    { source: "Koenker & Bassett, Regression Quantiles (Econometrica, 1978)", locator: "The original construction of the estimator" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-04-model-selection-and-regularization.md" },
  ],
};
