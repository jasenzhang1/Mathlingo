import type { WikiArticle } from "../types";

export const kalmanFilterWiki: WikiArticle = {
  conceptId: "kalman-filter",
  summary:
    "The Kalman filter is what `hmm` becomes when the hidden state is continuous and everything is " +
    "linear and Gaussian instead of discrete. A state evolves by a linear transition plus Gaussian noise, " +
    "and emits a linear, noisy observation. Because Gaussians stay Gaussian under linear maps and under " +
    "conditioning, the exact posterior over the state given all observations so far is always another " +
    "Gaussian — tracked in closed form, recursively, with no integral ever approximated.",
  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "x_t = A x_{t-1} + w_t, \\qquad w_t \\sim \\mathcal{N}(0, Q)",
          caption: "State transition",
        },
        {
          kind: "formula",
          latex: "y_t = C x_t + v_t, \\qquad v_t \\sim \\mathcal{N}(0, R)",
          caption: "Observation",
        },
        {
          kind: "prose",
          text: "Same two-layer picture as `hmm`: a hidden chain x₁ → x₂ → ⋯ and an observed layer hanging off it. The difference is entirely in what's allowed to replace 'discrete states and an emission table' — here it's 'vectors and matrices', and that swap is what makes exact inference tractable instead of merely enumerable.",
        },
      ],
    },
    {
      heading: "Predict and update",
      blocks: [
        {
          kind: "prose",
          text: "The filter alternates two steps, carrying a Gaussian belief (mean, covariance) forward in time.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Predict",
              description: "Push the previous belief through the transition: mean' = A·mean, covariance' = A·cov·Aᵀ + Q. Pure forecasting, no data used yet.",
            },
            {
              term: "Update",
              description: "Condition the predicted belief on the new observation yₜ, using exactly the conditional-Gaussian formulas from `conditional-multivariate-normal` applied to the joint of (xₜ, yₜ). The result is the Kalman gain, which weights the observation against the prediction in proportion to their relative uncertainties.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It's just Bayes' rule with two Gaussians",
          text: "There's no separate 'Kalman theory' being invoked — predict is the law of total expectation/variance applied to a linear-Gaussian transition, and update is a Gaussian prior combined with a Gaussian likelihood, which is conjugate and yields a Gaussian posterior in closed form. The filter is the accounting that makes running this every timestep cheap: O(1) work per step instead of re-deriving the joint over all of x₁:ₜ.",
        },
      ],
    },
    {
      heading: "Trusting the model vs. trusting the data",
      blocks: [
        {
          kind: "prose",
          text: "The Kalman gain K interpolates between the prediction and the observation. When Q is tiny relative to R (a trustworthy dynamics model, noisy sensor), the filter leans on the prediction and barely moves toward each new observation. When R is tiny relative to Q (a noisy or poorly-understood dynamics model, precise sensor), it leans toward the raw observation instead. Getting Q and R wrong doesn't crash the filter — it just makes it over- or under-confident in a way that is silently wrong rather than loudly broken.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Tracking a scalar position",
          problem:
            "A stationary object's true position is 10. Your prior belief is mean 8, variance 4. A sensor reads yₜ = 11 with observation variance R = 1 (C = 1, A = 1, Q = 0 since the object doesn't move). Find the updated (posterior) mean and variance.",
          steps: [
            "No transition noise and A = 1, so the predicted belief is unchanged: mean = 8, variance = 4.",
            "Kalman gain: K = Var_pred / (Var_pred + R) = 4 / (4 + 1) = 0.8.",
            "Updated mean = 8 + K·(11 − 8) = 8 + 0.8·3 = 10.4.",
            "Updated variance = (1 − K)·4 = 0.2·4 = 0.8.",
          ],
          answer: "Posterior ≈ N(10.4, 0.8) — pulled most of the way toward the sensor reading because the sensor (R = 1) is far more precise than the prior (variance 4).",
        },
      ],
    },
  ],
  references: [
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "Ch. 8, State-space models" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§13.3, Linear Dynamical Systems" },
  ],
};
