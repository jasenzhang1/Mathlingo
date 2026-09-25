import type { WikiArticle } from "../types";

export const errorsInVariablesWiki: WikiArticle = {
  conceptId: "errors-in-variables",

  summary:
    "Least-squares theory treats x as known exactly. When the predictor is itself measured with error, " +
    "that assumption fails in a way more data cannot fix: the slope is biased toward zero by a factor equal " +
    "to the proportion of observed-x variance that is real signal. But not all measurement error is " +
    "harmful — when x is a target value the experimenter sets and the error is in achieving it (the Berkson " +
    "case), least squares is still unbiased.",

  sections: [
    {
      heading: "Classical measurement error",
      blocks: [
        {
          kind: "formula",
          latex: "y = β₀ + β₁x + ε,   w = x + u,   u ⊥ x, ε",
          caption: "We observe w, a noisy version of the true predictor x, and regress y on w.",
        },
        {
          kind: "formula",
          latex: "β̂₁ → κβ₁,   κ = \\frac{σ_x²}{σ_x² + σ_u²}",
          caption: "κ is the reliability ratio: the share of the variance of w that is variance of x.",
        },
        {
          kind: "prose",
          text:
            "The noise in w spreads the points horizontally without moving them vertically, which flattens " +
            "the fitted line. The attenuation factor κ < 1 does not shrink with n, so β̂₁ is inconsistent. With " +
            "several predictors the bias can go in either direction for the other coefficients, since the " +
            "noisy predictor fails to fully control for what it was supposed to.",
        },
        {
          kind: "example",
          title: "Attenuation",
          problem:
            "True x has variance 9 and measurement error has variance 3. The true slope is 2. What slope does " +
            "least squares on the observed w estimate in large samples?",
          steps: ["κ = 9/(9 + 3) = 0.75.", "β̂₁ → 0.75 × 2 = 1.5."],
          answer: "1.5 — a 25% underestimate that no sample size will remove.",
        },
      ],
    },

    {
      heading: "The Berkson case",
      blocks: [
        {
          kind: "formula",
          latex: "x = w + u,   u ⊥ w   \\text{(the error is independent of the recorded value)}",
        },
        {
          kind: "prose",
          text:
            "An oven dial is set to w = 200°; the actual temperature x fluctuates around it. Now the error is " +
            "independent of the recorded w rather than of the true x. Substituting, y = β₀ + β₁w + (β₁u + ε): " +
            "the composite error is uncorrelated with w, so least squares on w is unbiased for β₁. Only the " +
            "error variance grows. Seber & Lee call this the controlled-variables model.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Ask which variable the error is independent of",
          text:
            "Classical error: the observed value scatters around the truth (a noisy instrument). Berkson error: " +
            "the truth scatters around the recorded value (an imprecise setting). The algebra is almost " +
            "identical, and the consequences are opposite.",
        },
      ],
    },

    {
      heading: "Remedies and working rules",
      blocks: [
        {
          kind: "list",
          items: [
            "If the reliability κ (or σ_u²) is known from a validation study, correct: β̂₁/κ̂ (method-of-moments correction).",
            "Repeated measurements of x estimate σ_u² directly.",
            "Instrumental variables use a second variable correlated with x but not with u or ε.",
            "Orthogonal (Deming) regression applies when the ratio of error variances in y and x is known.",
            "Round-off error in recording x behaves like a small classical error and is usually negligible (§9.6.3).",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Random x is not the same as noisy x",
          text:
            "If x is random but measured without error, conditional-on-x inference is fully valid — random " +
            "regressors are not a problem. Only error in the recorded x relative to the x that drives y " +
            "causes attenuation.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§9.6.1–9.6.2, Random and Fixed Explanatory Variables Measured with Error" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§9.6.3–9.6.6, Round-off Errors, Working Rules, Controlled Variables Model" },
  ],
};
