import type { WikiArticle } from "./types";

export const dirichletProcessWiki: WikiArticle = {
  conceptId: "dirichlet-process",
  summary:
    "A `gaussian-mixture-models` fit needs the number of clusters K fixed in advance. A Dirichlet " +
    "process (DP) is a prior over *infinite* mixtures instead: it puts a distribution on distributions " +
    "themselves, in a way that lets the number of clusters actually used adapt to the data — more data " +
    "can reveal more clusters, but nothing forces a specific count up front.",
  sections: [
    {
      heading: "What it is",
      blocks: [
        {
          kind: "prose",
          text: "A DP is parameterized by a concentration parameter α > 0 and a base distribution H over some space (e.g. the space of Gaussian means and variances). A draw G ~ DP(α, H) is itself a random probability distribution — not a single number or vector, a whole distribution — and it comes out discrete almost surely, even when H is continuous: a countably infinite set of atoms (locations, drawn from H) each with its own weight, the weights summing to 1.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why 'Dirichlet' process",
          text: "The defining property is that for *any* finite partition of the base space into measurable sets A₁, …, Aₖ, the vector (G(A₁), …, G(Aₖ)) has a Dirichlet distribution with parameters (αH(A₁), …, αH(Aₖ)) — the same Dirichlet already seen as the conjugate prior for the Multinomial in `conjugate-priors`. The DP is the (mathematically delicate) infinite-dimensional generalization of that finite-dimensional Dirichlet, consistent across every way you choose to partition.",
        },
      ],
    },
    {
      heading: "The concentration parameter",
      blocks: [
        {
          kind: "prose",
          text: "α controls how much mass gets spread across many atoms versus concentrated on a few. Small α: a draw from G looks like a handful of atoms with most of the weight. Large α: G looks increasingly like H itself, spread thin across very many atoms. In a DP mixture model this is exactly the knob that controls how many clusters the model tends to use — not by setting a count directly, but by setting a prior tendency toward more or fewer.",
        },
      ],
    },
    {
      heading: "As a clustering prior",
      blocks: [
        {
          kind: "prose",
          text: "A DP mixture model draws cluster parameters θᵢ for each data point from a DP, then draws the data point from a likelihood conditioned on θᵢ. Because G is discrete, many data points end up sharing the exact same atom — that shared atom *is* a cluster. This is the nonparametric generalization of `gaussian-mixture-models`: same generative story, except the number of distinct atoms actually used is itself random and grows (logarithmically) with the amount of data, rather than being fixed as K in advance.",
        },
        {
          kind: "prose",
          text: "Fitting one is exactly where `gibbs-sampling` earns its keep: the full conditional for each point's cluster assignment, given every other point's current assignment, is available in closed form (the Chinese Restaurant Process representation) precisely because the DP is conjugate to itself in this sense — which is what makes a DP mixture Gibbs sampler straightforward to write down rather than needing general Metropolis-Hastings.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Reading off the concentration parameter's effect",
          problem:
            "Two DP mixture models are fit to the same 1,000-point dataset: one with α = 0.1, one with α = 50. Without running either, which is more likely to end up using more distinct clusters, and why?",
          steps: [
            "α controls the prior tendency to introduce new atoms rather than reuse existing ones.",
            "α = 0.1 is small — strong preference for reusing existing atoms, so the model concentrates mass on relatively few clusters.",
            "α = 50 is large — weak preference against introducing new atoms, so the model spreads mass across many more distinct clusters.",
          ],
          answer: "α = 50 is expected to use substantially more clusters than α = 0.1, all else equal.",
        },
      ],
    },
  ],
  references: [
    { source: "Ferguson (1973), A Bayesian Analysis of Some Nonparametric Problems", locator: "Annals of Statistics 1(2)" },
    { source: "Murphy, Probabilistic Machine Learning: Advanced Topics", locator: "Ch. 31, Nonparametric Bayesian models" },
  ],
};
