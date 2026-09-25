import type { WikiArticle } from "../types";

export const bayesianModelAveragingWiki: WikiArticle = {
  conceptId: "bayesian-model-averaging",

  summary:
    "Selecting one model and then predicting as if it were known to be true ignores the uncertainty in the " +
    "selection. The Bayesian alternative keeps every candidate model, weights each by its posterior " +
    "probability given the data, and averages their predictions. The weights come from marginal " +
    "likelihoods, which BIC approximates; the averaged prediction is typically better calibrated than " +
    "any single model's.",

  sections: [
    {
      heading: "Predictive densities",
      blocks: [
        {
          kind: "formula",
          latex: "p(y₀ | y, M) = \\int p(y₀ | β, σ², M) \\, p(β, σ² | y, M) \\, dβ \\, dσ²",
          caption: "Within one model, integrate the parameters out against their posterior.",
        },
        {
          kind: "prose",
          text:
            "Under the conjugate normal–inverse-gamma prior this is a t density centred at x₀ᵀm* — the " +
            "Bayesian counterpart of the prediction interval, but with the parameter uncertainty folded in " +
            "exactly rather than approximated.",
        },
      ],
    },

    {
      heading: "Posterior model probabilities",
      blocks: [
        {
          kind: "formula",
          latex: "P(Mₖ | y) = \\frac{p(y | Mₖ) P(Mₖ)}{Σⱼ p(y | Mⱼ) P(Mⱼ)},   p(y | Mₖ) = \\int p(y | θₖ, Mₖ) p(θₖ | Mₖ) \\, dθₖ",
        },
        {
          kind: "formula",
          latex: "\\log p(y | Mₖ) ≈ −\\tfrac12 BICₖ   ⟹   P(Mₖ | y) ≈ \\frac{e^{−BICₖ/2}}{Σⱼ e^{−BICⱼ/2}}  \\text{ (equal priors)}",
          caption: "The BIC approximation, which Seber & Lee §12.3.4 use to motivate BIC itself.",
        },
        {
          kind: "example",
          title: "Weights from BIC",
          problem: "Two models have BIC values 100 and 104, with equal prior probability. Approximate their posterior probabilities.",
          steps: [
            "Relative weights: e^{−50} and e^{−52}; divide both by e^{−50}: 1 and e^{−2} ≈ 0.135.",
            "Normalise: 1/1.135 ≈ 0.881 and 0.135/1.135 ≈ 0.119.",
          ],
          answer: "About 0.88 and 0.12: a BIC difference of 4 is decisive but not overwhelming.",
        },
      ],
    },

    {
      heading: "Averaging",
      blocks: [
        {
          kind: "formula",
          latex: "E(y₀ | y) = Σₖ P(Mₖ | y) \\, E(y₀ | y, Mₖ),   Var(y₀ | y) = Σₖ P(Mₖ | y)[Var(y₀ | y, Mₖ) + (E_k − E)²]",
          caption: "The predictive variance adds the between-model spread of the predictions to the within-model variance.",
        },
        {
          kind: "list",
          items: [
            "Averaging hedges against picking the wrong model; its predictions are, on average under the prior, at least as good as any single model's in log score.",
            "Posterior inclusion probabilities P(βⱼ ≠ 0 | y) = Σ over models containing xⱼ summarise each variable's importance.",
            "With many candidates, the sum is restricted to plausible models (Occam's window) or explored by MCMC over model space.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Priors on coefficients matter for model probabilities",
          text:
            "Marginal likelihoods depend strongly on the prior spread of the coefficients: an extremely vague " +
            "prior penalises every larger model heavily (Lindley's paradox). Default choices such as Zellner's " +
            "g-prior exist largely to make these probabilities sensible.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§12.6, Bayesian Methods (predictive densities, Bayesian prediction, model averaging)" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§12.3.4, Approximating Posterior Probabilities" },
  ],
};
