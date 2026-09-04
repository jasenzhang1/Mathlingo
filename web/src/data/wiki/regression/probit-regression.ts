import type { WikiArticle } from "../types";

export const probitRegressionWiki: WikiArticle = {
  conceptId: "probit-regression",

  summary:
    "Probit regression models a binary outcome with the standard normal CDF as its link: " +
    "P(Y = 1 | x) = Φ(xᵀβ). It differs from logistic regression only in the shape of the curve, " +
    "and the two curves are almost indistinguishable over the range where most data lives — fitted " +
    "probabilities typically agree to a couple of decimal places. What probit offers instead is a " +
    "derivation: it falls out exactly from a latent normal variable crossing a threshold, which is " +
    "why it is the default in fields that think in those terms.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "P(Y = 1 | x) = Φ(xᵀβ),   Φ the standard normal CDF",
          caption: "Any CDF is a valid link, since every CDF maps ℝ into [0, 1] monotonically.",
        },
        {
          kind: "prose",
          text:
            "Seen this way, logistic and probit regression are the same idea with different CDFs: " +
            "the logistic distribution's for one, the standard normal's for the other. The complement " +
            "log-log link uses the Gumbel distribution's, and is preferred when the response " +
            "probability approaches 1 much faster than it leaves 0.",
        },
      ],
    },

    {
      heading: "The latent-variable derivation",
      blocks: [
        {
          kind: "prose",
          text:
            "Suppose there is an unobserved continuous quantity — a propensity, a utility, a level of " +
            "tolerance — and the binary outcome records only whether it crossed a threshold.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Let Y* = xᵀβ + ε with ε ~ N(0, 1), and set Y = 1 exactly when Y* > 0.",
            "Then P(Y = 1 | x) = P(xᵀβ + ε > 0) = P(ε > −xᵀβ).",
            "By the symmetry of the standard normal, P(ε > −xᵀβ) = P(ε < xᵀβ) = Φ(xᵀβ).",
            "So the threshold-crossing story produces the probit model exactly.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The variance of ε is fixed at 1 because it has to be",
          text:
            "Only the sign of Y* is observed, so scaling both β and ε by the same constant leaves " +
            "every observable probability unchanged. The scale is unidentifiable, and fixing " +
            "Var(ε) = 1 is the normalisation that pins it down. The same issue is why logistic " +
            "coefficients run about 1.6–1.8 times larger than probit ones on the same data: the " +
            "standard logistic distribution has variance π²/3 ≈ 3.29, so its standard deviation is " +
            "about 1.81, and the coefficients differ by roughly that factor with nothing " +
            "substantive behind it.",
        },
        {
          kind: "prose",
          text:
            "This derivation is why probit dominates in econometrics and psychometrics. A discrete " +
            "choice model says a consumer buys when unobserved utility exceeds zero; an item " +
            "response model says a subject answers correctly when latent ability exceeds item " +
            "difficulty; a toxicology model says an organism responds when dose exceeds an " +
            "individual tolerance. In each case a normally distributed latent variable is the " +
            "substantive hypothesis, and probit is what that hypothesis implies.",
        },
      ],
    },

    {
      heading: "How different are the two in practice?",
      blocks: [
        {
          kind: "table",
          headers: ["", "Logit", "Probit"],
          rows: [
            ["Link", "ln(p/(1−p))", "Φ⁻¹(p)"],
            ["Latent error distribution", "Logistic", "Standard normal"],
            ["Tail behaviour", "Heavier — approaches 0 and 1 more slowly", "Lighter"],
            ["Coefficient interpretation", "Log-odds; e^β is an odds ratio", "Change in a latent z-score; no odds reading"],
            ["Closed-form link", "Yes", "No — Φ requires numerical evaluation"],
            ["Typical coefficient ratio", "1", "≈ 0.55–0.62 of the logit value"],
            ["Extends to multinomial", "Cleanly", "Requires multivariate normal integrals"],
          ],
        },
        {
          kind: "example",
          title: "Comparing fitted probabilities",
          problem:
            "A logit model gives a linear predictor of 1.0; the probit fit on the same data gives " +
            "about 0.58 (the usual rescaling). Compare the fitted probabilities, and then compare " +
            "them far out in the tail.",
          steps: [
            "Logit: 1/(1 + e^(−1.0)) = 0.731.",
            "Probit: Φ(0.58) ≈ 0.719.",
            "In the tail, take logit 4.0 and the corresponding probit 2.32.",
            "Logit: 1/(1 + e^(−4)) = 0.982. Probit: Φ(2.32) ≈ 0.990.",
          ],
          answer:
            "Near the centre the two agree to about a percentage point — indistinguishable given sampling error. Out in the tail the probit is closer to 1, because the normal has lighter tails. This is the whole practical difference: the models can only be told apart where the probabilities are extreme, which is exactly where data is scarcest.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Do not compare raw coefficients across the two models",
          text:
            "A logit coefficient of 0.8 and a probit coefficient of 0.5 on the same predictor are " +
            "not a disagreement — they are the same effect on two different scales. Compare marginal " +
            "effects or fitted probabilities, which are scale-free, rather than the coefficients " +
            "themselves.",
        },
      ],
    },

    {
      heading: "Choosing between them",
      blocks: [
        {
          kind: "list",
          items: [
            "Default to logistic. The odds-ratio interpretation is concrete and communicable, the link has a closed form, and it extends cleanly to multinomial and conditional variants.",
            "Choose probit when a latent normal variable is part of the substantive theory — discrete choice, item response, dose–tolerance models.",
            "Choose probit when the field expects it, since comparability with the existing literature is a real consideration.",
            "Choose complementary log-log when the outcome process is asymmetric, as in survival or extreme-value settings.",
            "Do not choose between them on fit statistics. The difference in log-likelihood is almost always too small to be meaningful, and selecting on it is choosing noise.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the odds-ratio interpretation is worth so much",
          text:
            "The logit is the natural parameter of the Bernoulli exponential family, so its " +
            "coefficients correspond directly to a familiar quantity — multiplicative changes in " +
            "odds. Φ⁻¹ has no comparable inverse relationship to anything people reason with, so " +
            "probit coefficients have to be reported as marginal effects or fitted probabilities to " +
            "be interpretable at all. That practical asymmetry, not any statistical superiority, is " +
            "why logistic regression is the default.",
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§4.3 and §4.6, Classification and Generalized Linear Models" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§4.3.5, Probit Regression" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "Ch. 10, Logistic Regression and its Variants" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-05-generalized-and-special-regression.md" },
  ],
};
