import type { WikiArticle } from "./types";

export const wassersteinDistanceWiki: WikiArticle = {
  conceptId: "wasserstein-distance",
  summary:
    "The Wasserstein distance measures how far apart two distributions are by asking how much work " +
    "it takes to turn one into the other — mass moved, times the distance it travels. Unlike KL " +
    "divergence it is a genuine metric, and unlike KL divergence it stays finite and informative when " +
    "the two distributions have no overlapping support. That second property is why it became the " +
    "basis for a more stable way of training generative models.",

  sections: [
    {
      heading: "The optimal-transport definition",
      blocks: [
        {
          kind: "formula",
          latex: "W_p(P, Q) = ( inf_{γ ∈ Π(P,Q)} E_{(x,y)~γ}[‖x − y‖^p] )^{1/p}",
          caption:
            "Π(P, Q) is the set of couplings — joint distributions with marginals P and Q. p = 1 gives the earth mover's distance",
        },
        {
          kind: "prose",
          text:
            "A coupling γ is a transport plan: γ(x, y) says how much mass moves from location x to " +
            "location y. The marginal constraints say the plan must remove exactly what P has at each " +
            "point and deliver exactly what Q needs at each point. Among all valid plans, take the one " +
            "minimising total cost. That minimum is the distance.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Earth mover's intuition",
              description:
                "Picture P as a pile of dirt shaped like its density and Q as a hole shaped like " +
                "its density. W₁ is the minimum total work — summed over every grain, the mass of the " +
                "grain times how far it is carried — to fill the hole using the pile.",
            },
            {
              term: "Ground metric",
              description:
                "The ‖x − y‖ inside is the geometry of the underlying space. Wasserstein inherits it; KL divergence has no notion of the space at all.",
            },
            {
              term: "Kantorovich duality",
              description:
                "W₁(P, Q) = sup over 1-Lipschitz f of E_P[f] − E_Q[f]. The dual form is what makes the distance estimable from samples with a neural network.",
            },
          ],
        },
        {
          kind: "example",
          title: "Two point masses",
          problem:
            "P puts all its mass at 0; Q puts all its mass at θ > 0. Compute W₁(P, Q) and " +
            "D_KL(P ‖ Q).",
          steps: [
            "Only one transport plan exists: move all the mass from 0 to θ.",
            "Cost = 1 × |θ − 0| = θ.",
            "For the KL: P has probability 1 at 0, where Q has probability 0.",
            "The term log(P(0)/Q(0)) = log(1/0) = +∞.",
          ],
          answer:
            "W₁ = θ, D_KL = +∞ for every θ > 0. Wasserstein reports how far apart they are and varies " +
            "smoothly with θ; KL reports only that they are disjoint and says the same thing whether " +
            "θ is 0.001 or 1000.",
        },
      ],
    },

    {
      heading: "Why it is a metric and KL is not",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "KL divergence", "Wasserstein"],
          rows: [
            ["Non-negative", "Yes (Gibbs' inequality)", "Yes"],
            ["Zero iff equal", "Yes", "Yes"],
            ["Symmetric", "No — D_KL(P‖Q) ≠ D_KL(Q‖P)", "Yes"],
            ["Triangle inequality", "No", "Yes"],
            ["Disjoint support", "+∞ or undefined", "Finite and meaningful"],
            ["Uses the geometry of the space", "No", "Yes, through the ground metric"],
            ["Cheap to compute", "Often closed-form", "An optimisation problem"],
          ],
        },
        {
          kind: "prose",
          text:
            "The asymmetry of KL is not a defect so much as a signature of what it measures: an " +
            "expected log-likelihood ratio under one of the two distributions, which is inherently " +
            "directional. But it does mean “KL distance” is a misnomer, and it means the intuitions you " +
            "have about distances — that a detour cannot be shorter, that the gap looks the same from " +
            "both ends — do not transfer.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The infinity is structural, not a numerical accident",
          text:
            "D_KL(P‖Q) = E_P[log(P(X)/Q(X))]. Wherever P puts mass and Q does not, the ratio is " +
            "division by zero and the log diverges. No amount of care in implementation avoids this — " +
            "it is what the definition says. And “disjoint support” is not an exotic case: two " +
            "distributions supported on different low-dimensional manifolds inside a high-dimensional " +
            "space almost never overlap, which is exactly the situation for generative models of images.",
        },
      ],
    },

    {
      heading: "Computing it",
      blocks: [
        {
          kind: "list",
          items: [
            "In one dimension, W_p has a closed form: the L^p distance between the two quantile functions, W₁(P,Q) = ∫|F_P⁻¹(u) − F_Q⁻¹(u)|du. Equivalently, sort both samples and average the pairwise gaps.",
            "Between two Gaussians there is also a closed form; for N(μ₁,σ₁²) and N(μ₂,σ₂²) in one dimension, W₂² = (μ₁−μ₂)² + (σ₁−σ₂)².",
            "In general it is a linear program over the coupling, costing roughly O(n³ log n) for n support points — expensive.",
            "Entropic regularisation (adding a small entropy penalty to the transport plan) makes it solvable by the Sinkhorn algorithm in near-quadratic time, at the cost of a slightly blurred plan. This is what most practical implementations use.",
          ],
        },
        {
          kind: "example",
          title: "W₂ between two Gaussians",
          problem: "P = N(0, 1), Q = N(3, 4). Compute W₂.",
          steps: [
            "σ₁ = 1, σ₂ = 2.",
            "W₂² = (0 − 3)² + (1 − 2)² = 9 + 1 = 10.",
            "W₂ = √10.",
          ],
          answer:
            "≈ 3.162. Note it decomposes cleanly into a location gap and a scale gap — the distance " +
            "responds to both how far apart the distributions sit and how differently they are spread.",
        },
      ],
    },

    {
      heading: "Why WGANs",
      blocks: [
        {
          kind: "prose",
          text:
            "A generative adversarial network starts with a generator whose output distribution is " +
            "nothing like the data distribution. Both live on low-dimensional manifolds in a very " +
            "high-dimensional pixel space, so early in training their supports are effectively disjoint " +
            "— precisely the regime where KL-like objectives break down.",
        },
        {
          kind: "prose",
          text:
            "The original GAN objective is related to the Jensen–Shannon divergence, which is bounded " +
            "and saturates when the discriminator can separate real from fake perfectly. A saturated " +
            "objective means vanishing gradients: the generator is told it is wrong but not in which " +
            "direction to move. That is the mechanism behind the training instability and mode collapse " +
            "GANs became notorious for.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What Wasserstein fixes",
          text:
            "Because W₁ measures how far the mass has to move, it keeps varying smoothly with the " +
            "generator's parameters even when the supports do not overlap — the two-point-mass example " +
            "above is the whole argument in miniature, with W₁ = θ giving a usable gradient at every θ " +
            "where KL gives none. A WGAN uses the Kantorovich dual, training a 1-Lipschitz critic " +
            "(enforced by weight clipping or, better, a gradient penalty) instead of a saturating " +
            "classifier. The critic's loss also correlates with sample quality, which gives GAN training " +
            "something it previously lacked: a number worth watching.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Not a complete cure",
          text:
            "WGANs are more stable, not unconditionally stable. The Lipschitz constraint is only " +
            "approximately enforced, the critic must be trained close to optimality for the gradient to " +
            "mean what the theory says, and the estimator of W₁ from finite samples is biased. " +
            "Wasserstein distance also suffers badly from the curse of dimensionality as a statistical " +
            "estimator — sample complexity scales exponentially in the dimension — which is why the " +
            "dual formulation with a parameterised critic, rather than a direct estimate, is what gets " +
            "used.",
        },
      ],
    },
  ],

  references: [
    { source: "Arjovsky, Chintala & Bottou, Wasserstein GAN (2017)", locator: "§2–3, why the EM distance is better behaved than JS/KL" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§6.3, Divergence measures; §20.4 GANs" },
    { source: "Villani, Optimal Transport: Old and New", locator: "Ch. 6, The Wasserstein distances" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-03-variational-inference-and-kernels.md" },
  ],
};
