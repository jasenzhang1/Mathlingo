import type { WikiArticle } from "../types";

export const linearRegressionProbabilisticVersionWiki: WikiArticle = {
  conceptId: "linear-regression-probabilistic-version",

  summary:
    "Assume the errors are normal with constant variance and least squares stops being a " +
    "reasonable-looking convention: β̂_OLS becomes exactly the maximum likelihood estimator. The " +
    "reframing costs one assumption and buys a great deal — a sampling distribution for β̂, hence " +
    "standard errors, confidence intervals and t-tests; a likelihood, hence AIC and BIC; and a " +
    "template that generalises by swapping the response distribution, which is precisely how " +
    "logistic regression and the whole GLM family arise.",

  sections: [
    {
      heading: "The probabilistic model",
      blocks: [
        {
          kind: "formula",
          latex: "Yᵢ | Xᵢ ~ Normal(xᵢᵀβ, σ²),  independently across i",
          caption: "Equivalently εᵢ ~ iid Normal(0, σ²) with Yᵢ = xᵢᵀβ + εᵢ.",
        },
        {
          kind: "prose",
          text:
            "The conditional mean is linear in the predictors, the conditional variance is the same " +
            "everywhere, and observations are independent given X. Note what is not assumed: " +
            "nothing about the marginal distribution of Y, and nothing about the distribution of X, " +
            "which is treated as fixed or conditioned upon throughout.",
        },
      ],
    },

    {
      heading: "OLS is the MLE",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "The joint density is L(β, σ²) = ∏ᵢ (2πσ²)^(−1/2) exp(−(yᵢ − xᵢᵀβ)²/(2σ²)).",
            "Take logs: ℓ(β, σ²) = −(n/2)ln(2πσ²) − (1/(2σ²)) Σᵢ (yᵢ − xᵢᵀβ)².",
            "The only term involving β is −(1/(2σ²))Σ(yᵢ − xᵢᵀβ)², and its coefficient is negative.",
            "Maximising over β therefore means minimising Σ(yᵢ − xᵢᵀβ)² — the OLS objective, unchanged.",
            "So β̂_MLE = β̂_OLS = (XᵀX)⁻¹Xᵀy, exactly and not approximately.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Squared error was never arbitrary",
          text:
            "'Minimise squared error' and 'assume normal errors and maximise likelihood' are the " +
            "same instruction. The negative log-likelihood of a normal is a squared error, up to " +
            "constants. The same identity in reverse explains cross-entropy loss: assume a Bernoulli " +
            "response and its negative log-likelihood is exactly the log-loss used to train " +
            "classifiers. Loss functions in machine learning are usually negative log-likelihoods " +
            "wearing a different hat.",
        },
        {
          kind: "prose",
          text:
            "One caveat on σ². Maximising the likelihood over σ² gives σ̂²_MLE = SSE/n, which is " +
            "biased downward. The unbiased estimator divides by the residual degrees of freedom, " +
            "SSE/(n − p − 1), and is what software reports. The MLE is not automatically unbiased, " +
            "and this is the standard example.",
        },
      ],
    },

    {
      heading: "What the assumption buys: inference",
      blocks: [
        {
          kind: "formula",
          latex: "β̂ ~ Normal(β, σ²(XᵀX)⁻¹)",
          caption: "The exact sampling distribution of the coefficient vector under normal errors.",
        },
        {
          kind: "prose",
          text:
            "This is immediate rather than deep: β̂ = (XᵀX)⁻¹Xᵀy is a fixed linear map applied to " +
            "y, and a linear transformation of a multivariate normal is multivariate normal. Its " +
            "mean is (XᵀX)⁻¹XᵀXβ = β, giving unbiasedness, and its covariance is " +
            "(XᵀX)⁻¹Xᵀ(σ²I)X(XᵀX)⁻¹ = σ²(XᵀX)⁻¹.",
        },
        {
          kind: "table",
          headers: ["Quantity", "Distribution", "Used for"],
          rows: [
            ["β̂ⱼ", "Normal(βⱼ, σ²[(XᵀX)⁻¹]ⱼⱼ)", "Point estimate and its standard error"],
            ["(β̂ⱼ − βⱼ)/SE(β̂ⱼ)", "t with n − p − 1 df", "Coefficient t-tests and confidence intervals"],
            ["SSE/σ²", "χ² with n − p − 1 df", "Inference about the error variance"],
            ["(SSR/p)/(SSE/(n−p−1))", "F(p, n−p−1) under H₀", "The overall ANOVA F-test"],
          ],
          caption: "Every classical regression inference in the software output traces back to this one assumption.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The t rather than the z is about σ, not about β̂",
          text:
            "If σ were known, (β̂ⱼ − βⱼ)/(σ√[(XᵀX)⁻¹]ⱼⱼ) would be exactly standard normal. " +
            "Substituting σ̂ for σ introduces a second source of randomness, and the ratio of a " +
            "normal to an independent square-root-of-chi-square is precisely a t distribution. That " +
            "is where the degrees of freedom in a regression t-test comes from.",
        },
      ],
    },

    {
      heading: "How much does normality matter?",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Needs normality?", "Comment"],
          rows: [
            ["β̂ unbiased", "No", "Follows from E[ε | X] = 0 alone"],
            ["β̂ is BLUE", "No", "Gauss–Markov needs only the five conditions"],
            ["β̂ = MLE", "Yes", "This is the identity normality delivers"],
            ["Exact t and F tests", "Yes", "Exact in finite samples only under normality"],
            ["Approximate t and F tests", "No", "CLT rescues them for large n"],
            ["Prediction intervals", "Yes, and strongly", "These describe individual outcomes, so the shape of the error distribution never averages away"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Confidence intervals are robust; prediction intervals are not",
          text:
            "A confidence interval for βⱼ concerns an average over n observations, so the central " +
            "limit theorem repairs non-normality as n grows. A prediction interval for a single " +
            "future Y depends on the error distribution directly and does not improve with sample " +
            "size at all. With skewed or heavy-tailed errors, a 95% prediction interval can have " +
            "badly wrong coverage no matter how much data you collect.",
        },
      ],
    },

    {
      heading: "Why this framing is the gateway to everything downstream",
      blocks: [
        {
          kind: "prose",
          text:
            "The geometric view — project y onto C(X) — is elegant and completely stuck when Y is " +
            "binary. There is no useful sense in which a vector of zeros and ones should be " +
            "projected onto a subspace. The likelihood view generalises immediately: keep the linear " +
            "predictor xᵀβ, swap the distribution assumed for Y, and connect the two with a link " +
            "function.",
        },
        {
          kind: "table",
          headers: ["Response distribution", "Link", "Resulting method"],
          rows: [
            ["Normal", "identity", "Linear regression"],
            ["Bernoulli", "logit", "Logistic regression"],
            ["Bernoulli", "probit (Φ⁻¹)", "Probit regression"],
            ["Poisson", "log", "Poisson regression"],
            ["Gamma", "inverse or log", "Gamma regression"],
          ],
          caption:
            "One template, one column changed per row. This table is the GLM framework in miniature.",
        },
        {
          kind: "prose",
          text:
            "Two further consequences follow from having a likelihood at all. AIC and BIC are " +
            "defined in terms of the maximised likelihood, so model selection by information " +
            "criteria only exists once regression is framed this way. And a Bayesian treatment " +
            "requires a likelihood to combine with a prior — a normal prior on β with this " +
            "likelihood yields a posterior mode that is exactly the ridge estimate, which is why " +
            "ridge regression can be described equivalently as maximum a posteriori estimation.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§11.3, The Normal Linear Model" },
    { source: "Wasserman, All of Statistics", locator: "§13.4, Inference for Linear Regression" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§3.1, Linear Basis Function Models" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-02-ols-geometry-and-multiple-regression.md" },
  ],
};
