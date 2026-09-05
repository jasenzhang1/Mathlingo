import type { WikiArticle } from "./types";

export const variationalInferenceVaesWiki: WikiArticle = {
  conceptId: "variational-inference-vaes",
  summary:
    "A variational autoencoder is classical variational inference with neural networks doing the two " +
    "hard jobs. An encoder network outputs the parameters of the approximate posterior q(Z | X); a " +
    "decoder network defines the likelihood p(X | Z). Both are trained together by maximising the " +
    "ELBO with gradient ascent — which is possible only because the reparameterization trick moves " +
    "the sampling operation out of the path that backpropagation has to differentiate through.",

  sections: [
    {
      heading: "Two networks, one objective",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Encoder q_φ(Z | X)",
              description:
                "Also called the recognition or inference network. Takes a data point and outputs the mean and log-variance of a Gaussian over the latent code. Parameters φ.",
            },
            {
              term: "Decoder p_θ(X | Z)",
              description:
                "The generative network. Takes a latent code and outputs the parameters of a distribution over data — Bernoulli logits for binary images, a Gaussian mean for continuous data. Parameters θ.",
            },
            {
              term: "Prior p(Z)",
              description:
                "Fixed, almost always N(0, I). Being able to sample from it easily is what makes generation trivial after training.",
            },
          ],
        },
        {
          kind: "formula",
          latex: "L(θ, φ; x) = E_{q_φ(z|x)}[log p_θ(x | z)] − D_KL(q_φ(z | x) ‖ p(z))",
          caption: "The ELBO in reconstruction-minus-regularisation form",
        },
        {
          kind: "prose",
          text:
            "The first term rewards codes that let the decoder reconstruct x. The second penalises the " +
            "encoder for drifting away from the prior. With Gaussian q and Gaussian prior the KL term " +
            "has a closed form — no sampling needed for it — which is a large part of why that pairing " +
            "is standard.",
        },
        {
          kind: "formula",
          latex: "D_KL(N(μ, diag(σ²)) ‖ N(0, I)) = ½ Σⱼ (μⱼ² + σⱼ² − log σⱼ² − 1)",
          caption: "Closed-form KL for the standard VAE setup",
        },
      ],
    },

    {
      heading: "What is new relative to classical VI",
      blocks: [
        {
          kind: "table",
          headers: ["", "Classical mean-field VI", "VAE"],
          rows: [
            ["Form of q", "Hand-chosen conjugate family", "Whatever a neural network can output"],
            ["Fitted per", "Each data point separately", "Amortised — one network for all points"],
            ["Likelihood p(X|Z)", "Hand-specified, usually simple", "A neural network, arbitrarily flexible"],
            ["Optimisation", "Coordinate ascent, closed-form updates", "Stochastic gradient ascent on minibatches"],
            ["Cost for a new point", "Run the whole optimisation again", "One forward pass through the encoder"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Amortisation is the scaling idea",
          text:
            "Classical VI fits a separate variational distribution for every observation, so inference " +
            "on a new point means solving a fresh optimisation problem. A VAE instead learns a function " +
            "from data points to posterior parameters, paying the optimisation cost once at training " +
            "time. The price is the amortisation gap: a shared network will not match what per-point " +
            "optimisation would have found. Trading a little accuracy for millions of data points is " +
            "usually worth it.",
        },
      ],
    },

    {
      heading: "The reparameterization trick",
      blocks: [
        {
          kind: "prose",
          text:
            "Training needs ∂L/∂φ, and the encoder's parameters φ appear inside the distribution the " +
            "expectation is taken over. Written naively, the forward pass is: encoder outputs μ_φ(x) " +
            "and σ_φ(x); sample z ~ N(μ, σ²); decode. The sampling node has no derivative with respect " +
            "to μ and σ — drawing a random number is not a differentiable function of the parameters " +
            "that governed the draw — so backpropagation stops dead at that node.",
        },
        {
          kind: "formula",
          latex: "z = μ_φ(x) + σ_φ(x) ⊙ ε,   ε ~ N(0, I)",
          caption: "The randomness is moved into ε, which carries no parameters",
        },
        {
          kind: "prose",
          text:
            "Now the only stochastic node is ε, drawn from a fixed distribution with nothing to " +
            "differentiate. Everything from μ and σ onward is a deterministic, differentiable function " +
            "of φ, so gradients flow through the sample to the encoder. The distribution of z is " +
            "unchanged — this is the same sample, generated differently.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Not merely a variance reduction",
          text:
            "The score-function (REINFORCE) estimator gives an unbiased gradient without " +
            "reparameterization, so the problem is not that no estimator exists. But its variance is " +
            "typically orders of magnitude higher, because it never uses the gradient of the decoder " +
            "with respect to z — it only reweights whole samples. The reparameterized estimator " +
            "propagates ∂/∂z through the decoder, and that pathwise information is what makes training " +
            "practical rather than merely possible.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "It needs a location-scale family",
          text:
            "The trick requires writing the sample as a differentiable transform of parameter-free " +
            "noise. Gaussians and other location-scale families oblige. Discrete latents do not — there " +
            "is no differentiable reparameterization of a categorical draw — which is why discrete " +
            "VAEs need Gumbel-softmax relaxations or score-function estimators instead.",
        },
      ],
    },

    {
      heading: "Why the two networks must be trained jointly",
      blocks: [
        {
          kind: "prose",
          text:
            "Both φ and θ appear in the reconstruction term: the encoder chooses which z is sampled, " +
            "the decoder maps it back. The KL term involves only φ, but it constrains the encoder in a " +
            "way that changes what the decoder must learn to handle. Optimising either alone has no " +
            "well-defined target — a decoder trained against a fixed bad encoder learns to invert " +
            "codes that the final encoder will not produce.",
        },
        {
          kind: "prose",
          text:
            "The two terms also pull in opposite directions, and the balance is the model. Pure " +
            "reconstruction pressure would push the encoder toward near-deterministic codes spread far " +
            "apart — an ordinary autoencoder, with a latent space full of holes that decode to nothing. " +
            "Pure KL pressure would push every q(z | x) onto the prior, discarding all information " +
            "about x. Maximising the sum yields a latent space that is both informative and densely " +
            "covered, which is exactly what makes sampling from the prior produce plausible data.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Posterior collapse",
          text:
            "With a sufficiently powerful decoder — an autoregressive one, especially — the model can " +
            "achieve good reconstruction while ignoring z entirely. The KL term then drives q(z | x) " +
            "exactly to the prior, the latent variable carries no information, and the VAE has quietly " +
            "become an unconditional density model. KL annealing (warming the KL weight up from zero) " +
            "and free-bits constraints are the standard countermeasures.",
        },
      ],
    },

    {
      heading: "VAEs as generative models",
      blocks: [
        {
          kind: "prose",
          text:
            "The generative-versus-discriminative distinction turns on whether a model represents the " +
            "distribution of the data itself or only a conditional boundary. A VAE models p(X) through " +
            "the latent-variable decomposition ∫p(X | Z)p(Z)dZ, and that gives it the capability the " +
            "distinction identifies as generative models' distinctive advantage: it can produce new " +
            "data. Sample z ~ N(0, I), push it through the decoder, and you have a fresh sample that " +
            "was never in the training set. No discriminative model can do that at any price.",
        },
        {
          kind: "list",
          items: [
            "Generate: sample from the prior, decode.",
            "Interpolate: decode points along a line between two encoded inputs, giving smooth morphs — evidence the latent space is genuinely structured rather than a lookup table.",
            "Impute: infer the posterior over z from a partial observation and decode the rest.",
            "Represent: use the encoder's mean as a compressed feature vector for downstream tasks.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The characteristic blurriness",
          text:
            "VAE samples are famously softer than GAN samples. A Gaussian likelihood on pixels makes " +
            "the reconstruction term a squared error, and squared error is minimised by averaging over " +
            "the plausible outputs rather than committing to one of them. The mode-seeking direction of " +
            "the KL compounds it. This is a consequence of the objective, not a training failure — and " +
            "it comes with the compensating advantage that a VAE optimises a bound on likelihood, so its " +
            "training is stable in a way GAN training is not.",
        },
      ],
    },
  ],

  references: [
    { source: "Kingma & Welling, Auto-Encoding Variational Bayes (2014)", locator: "§2.3–2.4, the SGVB estimator and reparameterization" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§20.3, Variational autoencoders" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "§20.10.3, Variational autoencoders" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-03-variational-inference-and-kernels.md" },
  ],
};
