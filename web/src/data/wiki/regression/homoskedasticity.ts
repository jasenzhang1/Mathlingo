import type { WikiArticle } from "../types";

export const homoskedasticityWiki: WikiArticle = {
  conceptId: "homoskedasticity",

  summary:
    "Homoskedasticity is the assumption that the error variance is the same at every value of the " +
    "predictors. Its opposite, heteroskedasticity, is extremely common in real data — spending, " +
    "income, and firm-level outcomes almost always vary more at the top than at the bottom. The " +
    "consequence is narrow: coefficients stay unbiased, but the standard-error formula is derived " +
    "under constant variance and is simply wrong without it, usually in the direction of " +
    "overconfidence.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "Var(εᵢ | Xᵢ) = σ²  for every i    (homoskedastic)",
          caption: "One variance, shared by every observation regardless of its predictor values.",
        },
        {
          kind: "formula",
          latex: "Var(εᵢ | Xᵢ) = σᵢ²  varying with i    (heteroskedastic)",
          caption: "The spread of the errors changes across the predictor space.",
        },
        {
          kind: "prose",
          text:
            "The names come from Greek: homo- 'same', hetero- 'different', skedasis 'dispersion'. " +
            "In matrix form the assumption is Var(ε | X) = σ²I — the identity matrix is doing both " +
            "jobs at once, constant variance on the diagonal and zero correlation off it.",
        },
      ],
    },

    {
      heading: "Where heteroskedasticity comes from",
      blocks: [
        {
          kind: "table",
          headers: ["Setting", "Why the variance grows"],
          rows: [
            ["Spending vs income", "Someone earning $30k has little room to vary; someone earning $3M has enormous room"],
            ["Firm profit vs firm size", "Larger firms have larger absolute swings in every direction"],
            ["Test score vs study time", "Very low effort produces uniformly low scores; high effort produces a wide range"],
            ["Group means vs group size", "Var(x̄) = σ²/m, so small groups are mechanically noisier"],
            ["Any count or duration outcome", "Poisson-like variance grows with the mean by construction"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is the default, not the exception",
          text:
            "For most economic, biological, and count-valued outcomes, the natural scale of " +
            "variation grows with the level. Homoskedasticity is the special case, which is why " +
            "many practitioners use robust standard errors by default rather than testing first.",
        },
      ],
    },

    {
      heading: "What actually breaks",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Survives heteroskedasticity?"],
          rows: [
            ["β̂ unbiased", "Yes — unbiasedness needs only E[ε | X] = 0"],
            ["β̂ consistent", "Yes"],
            ["β̂ is BLUE", "No — a weighted estimator has smaller variance"],
            ["Var(β̂) = σ²(XᵀX)⁻¹", "No — this formula assumed σ²I and is now the wrong formula"],
            ["Reported t-statistics and p-values", "No — computed from the wrong variance"],
            ["Confidence intervals have 95% coverage", "No — typically too narrow"],
          ],
        },
        {
          kind: "prose",
          text:
            "The correct variance under a general error covariance Ω is the sandwich " +
            "(XᵀX)⁻¹XᵀΩX(XᵀX)⁻¹. When Ω = σ²I the middle collapses and the familiar σ²(XᵀX)⁻¹ " +
            "falls out. Otherwise it does not, and no amount of extra data makes the naive formula " +
            "converge to the right answer — it converges to a different number.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The bias in standard errors is usually downward",
          text:
            "In the common case where variance rises with a predictor whose extreme values are also " +
            "high-leverage, the naive formula understates Var(β̂). Confidence intervals come out too " +
            "narrow, t-statistics too large, and marginal findings become significant ones. This is " +
            "the reason heteroskedasticity is worth taking seriously even though it biases nothing " +
            "about the coefficients themselves.",
        },
      ],
    },

    {
      heading: "Detection",
      blocks: [
        {
          kind: "prose",
          text:
            "The residual-vs-fitted plot is the primary tool. Under homoskedasticity the residuals " +
            "form a horizontal band of roughly constant width. Under heteroskedasticity they fan " +
            "out — the classic funnel or megaphone shape — or form a bow-tie if variance is highest " +
            "at both ends.",
        },
        {
          kind: "example",
          title: "Reading a funnel",
          problem:
            "A residual-vs-fitted plot shows residuals within ±2 near fitted values of 10, and " +
            "within ±30 near fitted values of 500. What does this indicate, and does it invalidate " +
            "the coefficients?",
          steps: [
            "The spread of residuals grows with the fitted value: this is the signature of heteroskedasticity, not homoskedasticity.",
            "There is no systematic curvature described, so linearity is not implicated.",
            "Unbiasedness of β̂ depends on E[ε | X] = 0, which is untouched by a change in variance.",
          ],
          answer:
            "Evidence against homoskedasticity. The coefficient estimates remain unbiased and usable; the reported standard errors, t-statistics and p-values should not be trusted until they are recomputed robustly.",
        },
        {
          kind: "list",
          items: [
            "Scale–location plot: √|standardised residuals| against fitted values, where a flat trend line indicates constant variance and an upward slope indicates otherwise.",
            "Breusch–Pagan test: regress the squared residuals on the predictors and test whether they explain anything.",
            "White test: a more general version, including squares and cross-products, so it catches more forms at the cost of power.",
            "Both formal tests share the standard sample-size problem — near-certain rejection at large n, near-zero power at small n — so treat them as supplements to the plot, not substitutes.",
          ],
        },
      ],
    },

    {
      heading: "Remedies",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Robust (White / HC) standard errors",
              description:
                "Estimate the sandwich variance directly using the observed squared residuals in place of Ω. Requires no knowledge of how the variance varies, costs a small amount of efficiency when homoskedasticity actually holds, and is the default in most applied work. Variants HC0–HC3 differ in small-sample corrections; HC3 is the usual recommendation.",
            },
            {
              term: "Weighted least squares",
              description:
                "If the variance structure is known up to a constant, weight each observation by 1/σᵢ². This restores full efficiency and is genuinely BLUE — but a wrong weighting model can do more harm than the problem it fixes.",
            },
            {
              term: "Transform the response",
              description:
                "Modelling log(Y) instead of Y often stabilises variance when the spread is proportional to the level. This changes what the coefficients mean — they become approximate percentage effects — which is sometimes an improvement and sometimes not what you wanted.",
            },
            {
              term: "Use a model that expects it",
              description:
                "Poisson, negative binomial, and gamma GLMs have a mean–variance relationship built in, so the heteroskedasticity is part of the model rather than a violation of it.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why robust standard errors became the default",
          text:
            "They are valid under heteroskedasticity of unknown form and remain valid when there is " +
            "none — the only cost is slightly wider intervals in the homoskedastic case, which is " +
            "a small price for not having to be right about the variance structure. Their one real " +
            "weakness is small samples, where they can be noticeably anti-conservative; HC3 exists " +
            "to address that, and below roughly n = 50 they should be used with care.",
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§3.3.3, Non-constant Variance of Error Terms" },
    { source: "NIST/SEMATECH e-Handbook of Statistical Methods", locator: "§4.4.4, Model Validation and Residual Analysis" },
    { source: "Wasserman, All of Statistics", locator: "§13.5, Model Checking" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-02-ols-geometry-and-multiple-regression.md" },
  ],
};
