import type { WikiArticle } from "./types";

export const conjugatePriorsWiki: WikiArticle = {
  conceptId: "conjugate-priors",
  summary:
    "By `bayes-rule`, the posterior is proportional to the likelihood times the prior — but for most " +
    "likelihood/prior pairs the resulting posterior has no clean closed form, and you'd need numerical " +
    "integration just to normalize it. A conjugate prior is chosen so the posterior lands back in the " +
    "*same family* as the prior, which turns 'update my belief given new data' into updating a handful of " +
    "parameters by simple arithmetic, no integral required.",
  sections: [
    {
      heading: "The idea",
      blocks: [
        {
          kind: "prose",
          text: "A prior family is conjugate to a likelihood if multiplying a member of that family by the likelihood and renormalizing always produces another member of the same family. The posterior's parameters are then some simple function of the prior's parameters and the data — no integration needed to find the normalizing constant, because you already know what family (and hence what normalizing constant) the answer belongs to.",
        },
      ],
    },
    {
      heading: "The classic pairs",
      blocks: [
        {
          kind: "table",
          headers: ["Likelihood", "Conjugate prior", "Posterior"],
          rows: [
            ["Bernoulli/Binomial(n, θ)", "Beta(α, β)", "Beta(α + successes, β + failures)"],
            ["Poisson(λ)", "Gamma(α, β)", "Gamma(α + Σxᵢ, β + n)"],
            ["Normal(μ, known σ²)", "Normal(μ₀, τ₀²)", "Normal, precision-weighted average of prior and data means"],
            ["Multinomial", "Dirichlet(α)", "Dirichlet(α + category counts)"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The Beta-Binomial pattern is 'pseudo-counts'",
          text: "Beta(α, β) as a prior for a coin's bias θ behaves exactly like having already observed α − 1 heads and β − 1 tails before any real data arrives. Seeing k heads in n flips just adds those counts on: posterior Beta(α + k, β + n − k). The prior's hyperparameters are literally denominated in the same units as the data — which is both what makes the update trivial and what makes a conjugate prior easy to reason about as 'how much data is my prior opinion worth.'",
        },
      ],
    },
    {
      heading: "Why it matters beyond convenience",
      blocks: [
        {
          kind: "prose",
          text: "Before general-purpose approximate inference (`gibbs-sampling`, `markov-chain-monte-carlo`, `variational-inference-elbo`) existed, conjugacy was often the *only* way to do Bayesian updating at all — and it still matters today, because a conjugate full conditional is exactly what makes a Gibbs sampler's steps sample-able in closed form in the first place. A hierarchical model built entirely from conjugate pairs, layer by layer, is the standard setting where Gibbs sampling is straightforward to implement rather than requiring a more general Metropolis-Hastings step.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Updating a Beta prior",
          problem:
            "Prior belief about a website's conversion rate θ is Beta(2, 8) (mean 0.2, consistent with historical data). You observe 15 conversions out of 50 visitors. Find the posterior and its mean.",
          steps: [
            "Beta is conjugate to the Binomial likelihood: posterior is Beta(α + successes, β + failures).",
            "α + successes = 2 + 15 = 17. β + failures = 8 + 35 = 43.",
            "Posterior: Beta(17, 43). Mean = 17/(17+43) = 17/60 ≈ 0.283.",
          ],
          answer: "Posterior ≈ Beta(17, 43), mean ≈ 0.283 — pulled from the prior's 0.2 toward the data's raw rate of 15/50 = 0.3, landing between the two.",
        },
      ],
    },
  ],
  references: [
    { source: "Gelman et al., Bayesian Data Analysis", locator: "Ch. 2–3" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§3.4, Conjugate priors" },
  ],
};
