import type { WikiArticle } from "../types";

export const poissonRegressionWiki: WikiArticle = {
  conceptId: "poisson-regression",

  summary:
    "Poisson regression is the GLM instance for count data: a log link connecting the linear predictor " +
    "to the mean, and a Poisson response whose variance is forced to equal that same mean. The log " +
    "link guarantees every prediction is a positive count, coefficients become clean multiplicative " +
    "effects once exponentiated, and the whole model is fitted by exactly the iteratively reweighted " +
    "least squares machinery every other GLM shares. Its one real vulnerability — real count data is " +
    "almost always more variable than the Poisson assumption allows — is common enough to have its own " +
    "name and its own standard fixes.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "Y | X ~ Poisson(μ),   ln(μ) = xᵀβ,   equivalently μ = exp(xᵀβ)",
          caption: "Log link on the mean; the response distribution is Poisson.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Why the log link, specifically",
              description:
                "A Poisson mean must be positive. exp(xᵀβ) is positive for every real value of xᵀβ, so the unconstrained linear predictor can never produce an invalid mean — exactly the problem the same wiki's discussion of the sigmoid link solves for a bounded [0,1] mean, solved here for a (0, ∞) one.",
            },
            {
              term: "Poisson variance function",
              description:
                "Var(Y | X) = μ — the mean and variance are forced equal by the distribution itself, not fitted separately. This is what the exponential-family machinery behind GLM calls the variance function, and it is Poisson's defining commitment.",
            },
          ],
        },
      ],
    },

    {
      heading: "Reading a coefficient",
      blocks: [
        {
          kind: "formula",
          latex: "μ(x + 1 in Xⱼ) / μ(x) = e^{βⱼ}",
          caption: "A one-unit increase in Xⱼ multiplies the expected count by e^{βⱼ}, holding the rest fixed.",
        },
        {
          kind: "example",
          title: "From a coefficient to a rate change",
          problem:
            "A model of weekly customer complaints has a coefficient of −0.22 on an indicator for a new " +
            "support process. What is the estimated percentage change in expected complaints?",
          steps: [
            "The multiplicative effect is e^{−0.22}.",
            "e^{−0.22} ≈ 0.8025.",
            "A multiplier below 1 is a reduction; express it as a percentage change: 1 − 0.8025.",
          ],
          answer: "≈ 19.75% fewer expected complaints per week under the new process, holding everything else in the model fixed.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The exponentiated-coefficient reading is the log link's whole payoff",
          text:
            "Because the link is log rather than identity, coefficients are additive on the log scale " +
            "and multiplicative on the count scale — precisely the same structure the logistic-regression " +
            "wiki describes for log-odds and odds ratios, with 'rate' in place of 'odds'. Reading a raw " +
            "coefficient of −0.22 as 'a 22% decrease' rather than exponentiating first is the single most " +
            "common misstatement of a Poisson result, and it is wrong except for coefficients very close " +
            "to zero, where e^{β} ≈ 1 + β is a fair approximation.",
        },
      ],
    },

    {
      heading: "Offsets: modelling rates, not raw counts",
      blocks: [
        {
          kind: "prose",
          text:
            "Comparing raw counts across units observed for different lengths of time or of different " +
            "sizes is meaningless — ten accidents at a large factory and ten at a small one are not the " +
            "same rate. An offset folds the exposure directly into the model rather than treating it as " +
            "an ordinary predictor.",
        },
        {
          kind: "formula",
          latex: "ln(μᵢ) = ln(tᵢ) + xᵢᵀβ,   equivalently   μᵢ/tᵢ = exp(xᵢᵀβ)",
          caption: "ln(tᵢ), the log of exposure time or size, enters with its coefficient fixed at exactly 1.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "An offset is not just another predictor",
          text:
            "Including ln(exposure) as an ordinary covariate lets the data estimate its coefficient, " +
            "which could come out anywhere. An offset fixes that coefficient at exactly 1 by " +
            "construction, because the modelling claim is that doubling the exposure time should exactly " +
            "double the expected count, all else equal — a substantive assumption being asserted, not a " +
            "quantity being estimated from the data.",
        },
      ],
    },

    {
      heading: "Overdispersion",
      blocks: [
        {
          kind: "prose",
          text:
            "Var(Y) = μ is a strong, falsifiable commitment, and real count data routinely violates it: " +
            "unobserved heterogeneity between units, clustering, or a genuine excess of zeros all inflate " +
            "the variance beyond what the mean alone predicts.",
        },
        {
          kind: "table",
          headers: ["Diagnostic", "Reading"],
          rows: [
            ["Residual deviance ÷ residual degrees of freedom", "Should be near 1 under a correctly specified Poisson model; well above 1 signals overdispersion"],
            ["Sample variance far exceeding the sample mean within predictor strata", "The same signal, seen directly in the raw data before any model is fitted"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Overdispersion does not bias the coefficients — it breaks the standard errors",
          text:
            "This is the identical pattern homoskedasticity's own wiki describes for ordinary regression: " +
            "the point estimates β̂ remain consistent, but the standard errors computed under the Poisson " +
            "model's built-in Var = μ assumption are too small whenever the true variance is larger, so " +
            "confidence intervals are too narrow and p-values are spuriously significant.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Quasi-Poisson",
              description:
                "Keeps μ as the mean but allows Var(Y) = φμ for an estimated dispersion φ > 1, inflating every standard error by √φ without changing β̂ or requiring a fully specified alternative distribution.",
            },
            {
              term: "Negative binomial regression",
              description:
                "A genuinely different response distribution with Var(Y) = μ + αμ², an explicit extra parameter α capturing the excess variance rather than a post-hoc correction.",
            },
            {
              term: "Zero-inflated Poisson",
              description:
                "For data with far more zeros than a Poisson model predicts — a separate process determining whether a count is 'structurally' zero at all, mixed with an ordinary Poisson process for the rest.",
            },
          ],
        },
      ],
    },

    {
      heading: "Fitting and where it sits",
      blocks: [
        {
          kind: "prose",
          text:
            "Poisson regression is fitted by the same iteratively reweighted least squares routine that " +
            "fits logistic regression, with the weights and working response recomputed from the Poisson " +
            "variance function rather than the Bernoulli one — exactly the payoff the GLM wiki describes " +
            "for restricting to the exponential family: one algorithm, different weight and link " +
            "functions per response type. As glm's own blurb already names it, Poisson regression is not " +
            "a separate technique bolted onto GLM; it is the framework's own worked example for count " +
            "data, in the same way logistic regression is its worked example for binary data.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§4.4, Logistic Regression and Poisson Log-Linear Models" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§4.3.6, Canonical Link Functions" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "Ch. 12, Generalized Linear Models" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-05-generalized-and-special-regression.md" },
  ],
};
