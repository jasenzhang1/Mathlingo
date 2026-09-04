import type { WikiArticle } from "./types";

export const emAlgorithmWiki: WikiArticle = {
  conceptId: "em-algorithm",
  summary:
    "EM fits latent-variable models by alternating two steps that are each easy, in place of one " +
    "maximisation that is hard. The E-step infers a distribution over the latent variables given the " +
    "current parameters; the M-step maximises the likelihood as though those inferred values were " +
    "observed. Each round provably does not decrease the marginal likelihood, because the two steps " +
    "are together constructing and maximising a lower bound on it.",

  sections: [
    {
      heading: "The problem EM solves",
      blocks: [
        {
          kind: "prose",
          text:
            "For fully observed data, maximum likelihood is usually pleasant: the log of a product " +
            "becomes a sum, terms separate, and closed forms often follow. Latent variables destroy " +
            "that. Marginalising Z out puts a sum inside the log, and the log can no longer be " +
            "distributed over it.",
        },
        {
          kind: "formula",
          latex: "ℓ(θ) = Σᵢ log Σ_{z} p(xᵢ, z | θ)",
          caption: "The observed-data log-likelihood: a log of a sum, which does not decompose",
        },
        {
          kind: "prose",
          text:
            "Compare the complete-data log-likelihood you would have had if Z were observed: " +
            "Σᵢ log p(xᵢ, zᵢ | θ). Here the log sits directly on the joint, terms separate by component, " +
            "and each component's parameters can be fitted independently by its usual closed form. EM " +
            "is a way of getting back to that convenient expression by supplying the missing Z with a " +
            "best current guess.",
        },
      ],
    },

    {
      heading: "The two steps",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "E-step",
              description:
                "With θ fixed at its current value, compute the posterior q(z) = p(z | x, θ_old) over " +
                "the latent variables — for a mixture, the responsibilities γ_{ik} = P(Z_i = k | x_i, θ_old). " +
                "Then form Q(θ | θ_old) = E_q[log p(x, Z | θ)], the expected complete-data log-likelihood.",
            },
            {
              term: "M-step",
              description:
                "Maximise Q(θ | θ_old) over θ. Because the expectation was taken outside the log, this is " +
                "the same shape as the fully-observed maximisation, weighted by the responsibilities — " +
                "usually a closed form.",
            },
          ],
        },
        {
          kind: "formula",
          latex: "θ_new = argmax_θ  Σᵢ Σ_k γ_{ik} log p(xᵢ, Z = k | θ)",
          caption: "The M-step: a responsibility-weighted version of ordinary maximum likelihood",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The chicken and egg, resolved by alternation",
          text:
            "Knowing the parameters makes the assignments easy; knowing the assignments makes the " +
            "parameters easy. Neither is known. EM breaks the circle by fixing one and solving for the " +
            "other, repeatedly. What is not obvious in advance — and is the theorem below — is that this " +
            "alternation cannot make things worse.",
        },
      ],
    },

    {
      heading: "Why the likelihood cannot decrease",
      blocks: [
        {
          kind: "prose",
          text:
            "For any distribution q over the latent variables, the observed log-likelihood decomposes " +
            "exactly as a lower bound plus a non-negative gap:",
        },
        {
          kind: "formula",
          latex: "log p(x | θ) = L(q, θ) + D_KL(q(z) ‖ p(z | x, θ))",
          caption: "L(q, θ) = E_q[log p(x, z | θ)] − E_q[log q(z)] is the ELBO; the KL term is ≥ 0",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "The E-step sets q(z) = p(z | x, θ_old). This makes the KL term exactly zero, so the bound L touches the true log-likelihood at θ_old — it is tight there.",
            "The M-step increases L by moving θ, holding q fixed. Since L ≤ log p(x | θ) always, and L was equal to log p(x | θ_old) before the move, the new log-likelihood is at least the new L, which is at least the old one.",
            "Therefore log p(x | θ_new) ≥ log p(x | θ_old), with equality only at a stationary point.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is variational inference in disguise",
          text:
            "L(q, θ) is the evidence lower bound — the ELBO — and EM is coordinate ascent on it: the " +
            "E-step maximises over q, the M-step over θ. The only thing special about EM is that the " +
            "E-step's maximisation over q has an exact solution, because the true posterior is " +
            "tractable. When it is not, you restrict q to a manageable family and get variational " +
            "inference proper. EM is not analogous to VI; it is the special case where step one is exact.",
        },
      ],
    },

    {
      heading: "EM is soft K-means",
      blocks: [
        {
          kind: "prose",
          text:
            "Run EM on a Gaussian mixture and the correspondence with K-means is structural, not " +
            "merely suggestive. Both alternate an assignment step with a parameter-update step, in the " +
            "same order, over the same quantities.",
        },
        {
          kind: "table",
          headers: ["", "K-means", "EM on a Gaussian mixture"],
          rows: [
            ["Assignment", "Hard: each point to its nearest centroid", "Soft: responsibility γ_{ik} spread over all K"],
            ["Update", "Centroid = mean of assigned points", "Mean = responsibility-weighted mean of all points"],
            ["Also fits", "Nothing else", "Covariances and mixing weights"],
            ["Objective", "Within-cluster sum of squares", "Log-likelihood"],
            ["Guarantee", "Monotone decrease, local optimum", "Monotone increase, local optimum"],
          ],
        },
        {
          kind: "prose",
          text:
            "K-means is the limiting case: shrink every component's covariance toward a common σ²I with " +
            "σ² → 0 and the responsibilities collapse onto the nearest centroid, putting essentially all " +
            "the mass on one component. Hard assignment is soft assignment with the temperature turned " +
            "to zero.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The shared weakness comes with the shared structure",
          text:
            "Because the correspondence is structural, so is the failure mode: both climb a non-convex " +
            "objective and both stop at whatever local optimum they reach first. Hence the identical " +
            "mitigation — several random restarts, keeping the run with the best objective value. It is " +
            "the same fix for the same reason, not two coincidentally similar pieces of advice. " +
            "K-means++ style initialisation of the mixture is another shared trick.",
        },
      ],
    },

    {
      heading: "Worked example: one EM round",
      blocks: [
        {
          kind: "example",
          title: "Responsibilities and an updated mean",
          problem:
            "A 1-D two-component Gaussian mixture with π = (0.5, 0.5), μ = (0, 4), both variances 1. " +
            "Data point x = 1. Compute its responsibility for component 1.",
          steps: [
            "Component 1, unnormalised: π₁·(1/√(2π))e^{−(1−0)²/2} = 0.5 × 0.241971 = 0.120985.",
            "Component 2: 0.5·(1/√(2π))e^{−(1−4)²/2} = 0.5 × 0.0044318 = 0.0022159.",
            "Sum = 0.123201.",
            "γ₁ = 0.120985 / 0.123201.",
          ],
          answer:
            "γ₁ ≈ 0.982, γ₂ ≈ 0.018. K-means would assign this point wholly to component 1; EM keeps " +
            "the 1.8% of doubt, and that fraction still contributes to component 2's updated mean.",
        },
      ],
    },

    {
      heading: "Practicalities",
      blocks: [
        {
          kind: "list",
          items: [
            "EM finds a local optimum, never a guaranteed global one. Anyone claiming otherwise has confused monotone improvement with global optimality.",
            "Convergence is typically first-order and can be slow near the optimum, especially when components overlap heavily; Newton-type methods converge faster but lack the monotonicity guarantee.",
            "Monitor the log-likelihood every iteration — it must be non-decreasing. A decrease is a bug in your implementation, and one of the most useful assertions you can add.",
            "Degenerate solutions exist: a component collapsing onto a single point drives its variance to zero and the likelihood to infinity. Floor the variances or add a prior (giving MAP-EM).",
            "Baum–Welch for HMMs, factor analysis, and missing-data imputation are all EM with a different complete-data likelihood; the two-step skeleton is unchanged.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "Ch. 9, Mixture Models and EM — §9.4 the general EM view" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§8.5, The EM Algorithm" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§8.7, The EM algorithm" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-02-latent-variables-and-em.md" },
  ],
};
