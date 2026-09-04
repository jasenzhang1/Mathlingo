import type { WikiArticle } from "../types";

export const glmWiki: WikiArticle = {
  conceptId: "glm",

  summary:
    "A generalized linear model has exactly three parts: a response distribution from the " +
    "exponential family, a linear predictor η = xᵀβ, and a link function connecting η to the " +
    "response's mean. Linear regression, logistic regression, probit and Poisson regression are " +
    "all the same object with different settings of the first and third parts. The restriction to " +
    "the exponential family is what makes this more than a filing system: it guarantees a natural " +
    "link and lets one algorithm — iteratively reweighted least squares — fit every member.",

  sections: [
    {
      heading: "The three components",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "1. Random component",
              description:
                "The conditional distribution of Y given x, drawn from the exponential family: normal, Bernoulli, binomial, Poisson, gamma, inverse Gaussian, negative binomial with known dispersion.",
            },
            {
              term: "2. Systematic component",
              description:
                "The linear predictor η = β₀ + β₁x₁ + ⋯ + β_p x_p. Always linear in β — this is the part that never changes.",
            },
            {
              term: "3. Link function",
              description:
                "A monotone, differentiable g with g(μ) = η, where μ = E[Y | x]. It maps the mean's natural range onto the whole real line, so that the unbounded linear predictor is never asked to produce an impossible mean.",
            },
          ],
        },
        {
          kind: "table",
          headers: ["Distribution", "Canonical link", "Range of μ", "Method"],
          rows: [
            ["Normal", "identity: μ", "(−∞, ∞)", "Linear regression"],
            ["Bernoulli / binomial", "logit: ln(μ/(1−μ))", "(0, 1)", "Logistic regression"],
            ["Poisson", "log: ln μ", "(0, ∞)", "Poisson regression for counts"],
            ["Gamma", "inverse: 1/μ (log in practice)", "(0, ∞)", "Gamma regression for positive skewed data"],
            ["Negative binomial", "log", "(0, ∞)", "Overdispersed counts"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The link's job is to respect the mean's range",
          text:
            "A probability lives in (0, 1) and a count's mean in (0, ∞), while xᵀβ ranges over all " +
            "of ℝ. Without a link, a linear model would predict negative counts and probabilities " +
            "above 1. The link is a change of scale on which unbounded linear modelling is " +
            "coherent — and it is applied to the mean, not to the data. Regressing log(y) is a " +
            "different model, and it breaks the moment any y is zero.",
        },
      ],
    },

    {
      heading: "Why the exponential family, specifically",
      blocks: [
        {
          kind: "formula",
          latex: "f(y | θ, φ) = exp{ (yθ − b(θ))/a(φ) + c(y, φ) }",
          caption: "The exponential dispersion family. θ is the natural parameter, φ the dispersion.",
        },
        {
          kind: "prose",
          text:
            "Three consequences follow from this form, and together they are the whole reason the " +
            "framework exists rather than being a list of separate methods.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "The mean and variance come from derivatives of b: μ = b′(θ) and Var(Y) = a(φ)·b″(θ). So the mean–variance relationship is determined by the distribution rather than assumed separately — Poisson variance equals its mean because b″ says so.",
            "The canonical link is g = (b′)⁻¹, which makes η = θ. The linear predictor and the natural parameter become the same object, which is why the logit is the 'natural' link for Bernoulli rather than merely a convenient one.",
            "Under the canonical link the score equations take the single form Xᵀ(y − μ̂) = 0 for every member of the family — the same orthogonality condition as the normal equations, with μ̂ in place of Xβ̂.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "One algorithm fits them all",
          text:
            "Because the score equations share a form, Fisher scoring applied to any GLM reduces to " +
            "iteratively reweighted least squares: form a working response, form weights from the " +
            "variance function and the link's derivative, run a weighted least-squares fit, repeat. " +
            "Only two small functions change between logistic, Poisson and gamma regression. This " +
            "is why one function in every statistical package fits the entire family, and it is the " +
            "practical payoff the exponential family delivers.",
        },
      ],
    },

    {
      heading: "Working with a GLM",
      blocks: [
        {
          kind: "table",
          headers: ["Linear regression concept", "GLM counterpart"],
          rows: [
            ["SSE", "Deviance, −2(ℓ_model − ℓ_saturated)"],
            ["F-test between nested models", "Likelihood-ratio test on the deviance difference"],
            ["R²", "Pseudo-R², e.g. McFadden's 1 − ℓ_model/ℓ_null"],
            ["Residuals", "Deviance or Pearson residuals, not raw ones"],
            ["σ²", "Dispersion φ — fixed at 1 for Bernoulli and Poisson"],
            ["t-test on a coefficient", "Wald z-test, or better a likelihood-ratio test"],
          ],
        },
        {
          kind: "example",
          title: "Reading a Poisson regression coefficient",
          problem:
            "A Poisson model of website visits per day has a log link and a coefficient of 0.25 on " +
            "an indicator for whether a promotion was running. What does it mean?",
          steps: [
            "The model is ln(μ) = xᵀβ, so μ = exp(xᵀβ).",
            "Turning the indicator on adds 0.25 to ln(μ).",
            "That multiplies μ by e^0.25 ≈ 1.284.",
          ],
          answer:
            "Promotion days have about 28% more visits on average. Under a log link every coefficient is multiplicative on the mean — the same structure as logistic regression's odds ratios, and a general feature of the log link rather than anything specific to counts.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Overdispersion is the usual failure of Poisson regression",
          text:
            "The Poisson distribution forces Var(Y) = μ. Real count data is almost always more " +
            "variable than that — heterogeneity, clustering, or excess zeros — and the consequence " +
            "is standard errors that are much too small, with spuriously significant coefficients. " +
            "Check the residual deviance against its degrees of freedom: a ratio well above 1 is " +
            "the signal. The fixes are quasi-Poisson (inflate the standard errors), negative " +
            "binomial (an extra dispersion parameter), or a zero-inflated model when the excess is " +
            "concentrated at zero.",
        },
      ],
    },

    {
      heading: "What the framework buys you",
      blocks: [
        {
          kind: "list",
          items: [
            "A new outcome type is a small change, not a new subject: choose the distribution, choose the link, keep everything else.",
            "Model selection, diagnostics and inference transfer wholesale — AIC, likelihood-ratio tests, and residual analysis all work the same way across the family.",
            "Software support is uniform, since one fitting routine covers every member.",
            "The framework extends naturally: generalized additive models replace xᵀβ with a sum of smooth functions, and generalized linear mixed models add random effects for clustered data.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The unifying framework does not make the models interchangeable",
          text:
            "Sharing a structure is not being the same model. Poisson and logistic regression make " +
            "genuinely different distributional claims and answer different questions, and fitting " +
            "a count outcome with a logistic model is an error the framework does nothing to " +
            "prevent. The framework tells you what to specify; it does not tell you what is true " +
            "about your data.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§4.4 and §9.1, Logistic Regression and Generalized Additive Models" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§4.3.6, Canonical Link Functions" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "Ch. 12, Generalized Linear Models" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-05-generalized-and-special-regression.md" },
  ],
};
