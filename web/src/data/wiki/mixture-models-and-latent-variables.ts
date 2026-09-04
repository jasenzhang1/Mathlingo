import type { WikiArticle } from "./types";

export const mixtureModelsAndLatentVariablesWiki: WikiArticle = {
  conceptId: "mixture-models-and-latent-variables",
  summary:
    "A mixture model says the data came from several subpopulations, and records which one by a " +
    "latent variable Z that is never observed. Marginalising Z out — the ordinary sum-out-the-other-" +
    "variable operation — produces a density that is a weighted sum of component densities. That is " +
    "enough to give simple unimodal building blocks arbitrarily complicated shapes, and it is the " +
    "template for essentially every latent-variable model that follows.",

  sections: [
    {
      heading: "The generative story",
      blocks: [
        {
          kind: "prose",
          text:
            "Mixture models are easiest to state as a two-step recipe for producing one observation. " +
            "First draw a component; then draw the data point from that component's distribution. The " +
            "component label is the latent variable.",
        },
        {
          kind: "formula",
          latex: "Z ~ Categorical(π₁, …, π_K),   X | Z = k  ~  f_k(· ; θ_k)",
          caption: "π_k ≥ 0 are the mixing weights, summing to 1; f_k is the kth component density",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Latent variable Z",
              description:
                "Which component generated this observation. Never recorded in the data — that is what makes it latent.",
            },
            {
              term: "Mixing weight π_k",
              description: "P(Z = k) — the proportion of the population in component k.",
            },
            {
              term: "Component f_k",
              description:
                "The distribution within a subpopulation. Usually a simple family: Gaussian, Poisson, exponential.",
            },
            {
              term: "Responsibility γ_k(x)",
              description:
                "P(Z = k | X = x), the posterior over components given the observation. The soft assignment the E-step computes.",
            },
          ],
        },
      ],
    },

    {
      heading: "Marginalising out the latent variable",
      blocks: [
        {
          kind: "prose",
          text:
            "The mixture density is not a new construction — it is the marginal distribution formula " +
            "p_X(x) = Σ_z p(x, z), applied with Z as the variable being summed out. Expand the joint by " +
            "the chain rule and the mixture form falls out with no further steps.",
        },
        {
          kind: "formula",
          latex: "p(x) = Σ_z p(x, z) = Σ_{k=1}^{K} P(Z = k)·p(x | Z = k) = Σ_{k=1}^{K} π_k f_k(x)",
          caption: "The mixture density is a marginal, nothing more exotic",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why sum-out is the hard step later",
          text:
            "Summing Z out is trivial for one observation. It is fitting the model that hurts: the " +
            "log-likelihood of n observations is Σᵢ log(Σ_k π_k f_k(xᵢ)), a log of a sum. The log " +
            "cannot get inside to split the product apart, so the tidy separable maximisation that " +
            "makes ordinary MLE easy is destroyed. That single obstruction is the entire reason the EM " +
            "algorithm exists.",
        },
        {
          kind: "prose",
          text:
            "Responsibilities come from Bayes' rule applied to the same joint, in the other direction: " +
            "γ_k(x) = π_k f_k(x) / Σ_j π_j f_j(x). The numerator is the joint p(x, Z = k) and the " +
            "denominator is the marginal p(x) just computed.",
        },
      ],
    },

    {
      heading: "Why simple components make complex shapes",
      blocks: [
        {
          kind: "prose",
          text:
            "Each f_k may be unimodal and symmetric, but a weighted sum of them need not be either. " +
            "Place two Gaussians far apart and the mixture is bimodal; place them close with different " +
            "variances and it is skewed with a heavy tail. Given enough components, a Gaussian mixture " +
            "can approximate any reasonably smooth density to arbitrary accuracy.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The Fourier analogy",
          text:
            "It is the same move a Fourier series makes. A single sine wave is about as simple as a " +
            "function gets, yet weighted sums of them reconstruct square waves and sawtooths. Complexity " +
            "here comes from the combination, not from any individual piece — which is why you get " +
            "flexibility without giving up the tractable maths of the components.",
        },
        {
          kind: "example",
          title: "A bimodal mixture",
          problem:
            "0.5·N(0, 1) + 0.5·N(6, 1). Compute the density at x = 3, midway between the components, " +
            "and compare it to the density at either mode.",
          steps: [
            "At x = 3 each component is 3 standard deviations from its mean: φ(3) = φ(−3) ≈ 0.004432.",
            "p(3) = 0.5(0.004432) + 0.5(0.004432) ≈ 0.004432.",
            "At x = 0 the near component contributes 0.5·φ(0) = 0.5(0.39894) ≈ 0.19947; the far one adds 0.5·φ(6) ≈ 3×10⁻⁹.",
            "p(0) ≈ 0.19947.",
          ],
          answer:
            "p(0) ≈ 0.199 versus p(3) ≈ 0.0044 — a valley 45× lower than the peaks. No single Gaussian " +
            "has a shape remotely like this, yet it is built from two of them.",
        },
      ],
    },

    {
      heading: "Latent variables as a modelling idea",
      blocks: [
        {
          kind: "prose",
          text:
            "The mixture is the simplest instance of a pattern that runs through the rest of this " +
            "domain: posit an unobserved quantity, write down how it would generate the data, then " +
            "infer it. The latent variable is not a bookkeeping trick — it is usually the thing you " +
            "actually care about.",
        },
        {
          kind: "table",
          headers: ["Model", "Latent variable", "Observed"],
          rows: [
            ["Gaussian mixture", "Cluster label", "Feature vector"],
            ["HMM", "State sequence", "Emission sequence"],
            ["Topic model (LDA)", "Topic per word", "Words in documents"],
            ["Factor analysis / PCA", "Low-dimensional factors", "High-dimensional measurements"],
            ["VAE", "Continuous code z", "Image or other data"],
          ],
        },
        {
          kind: "prose",
          text:
            "Customer segmentation makes the point plainly. A company has no column in its database " +
            "recording whether a shopper is budget-conscious or luxury-oriented; nobody fills that in. " +
            "But purchase histories are visibly generated by something like it, and the model's inferred " +
            "segment membership — a statistical inference, not an observed fact — is precise enough to " +
            "target campaigns against.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Inferred is not observed",
          text:
            "A responsibility of 0.7 for “luxury” is a belief under a model you chose, with a component " +
            "count you picked. Treating it as a recorded attribute — and especially feeding it into a " +
            "downstream model as if it were data — propagates the model's assumptions while hiding its " +
            "uncertainty. Carry the responsibilities forward rather than hard-assigning where you can.",
        },
      ],
    },

    {
      heading: "Identifiability, and other things that go wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Label switching",
          text:
            "Permuting the component labels leaves the mixture density completely unchanged, so the " +
            "likelihood has K! equivalent maxima. This is harmless for density estimation and a real " +
            "problem for interpretation and for MCMC, where a chain can swap labels mid-run and make " +
            "the posterior mean of “component 1's mean” meaningless.",
        },
        {
          kind: "list",
          items: [
            "The likelihood is not concave, so fitting finds a local optimum — multiple restarts are standard.",
            "For Gaussian components with free variances the likelihood is unbounded: put one component's mean exactly on a data point and shrink its variance to zero. Regularisation or a variance floor is needed.",
            "Choosing K is a model-selection problem; AIC/BIC or held-out likelihood are the usual tools, and they disagree often enough to be worth checking against each other.",
            "A mixture that fits well is not evidence that the subpopulations are real. Mixtures are flexible enough to fit non-clustered data.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§9.2, Mixtures of Gaussians; §9.4 latent-variable view" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§3.5, Mixture models" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§8.5, The EM Algorithm and mixture modelling" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-02-latent-variables-and-em.md" },
  ],
};
